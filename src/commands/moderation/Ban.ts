import { Punishment, PunishmentType } from '../../structures/managers/PunishmentManager';
import { Constants, Member, Guild } from 'eris';
import { injectable, inject } from 'inversify';
import PermissionUtils from '../../util/PermissionUtils';
import { findId } from '../../util/UserUtil'; 
import { TYPES } from '../../types';
import Command from '../../structures/Command';
import Context from '../../structures/Context';
import Bot from '../../structures/Bot';
import ms = require('ms');

@injectable()
export default class BanCommand extends Command {
  constructor(
    @inject(TYPES.Bot) client: Bot
  ) {
    super(client, {
      name: 'ban',
      description: 'Ban a member in the current guild',
      usage: '<user> <reason> [--soft] [--days]',
      aliases: ['banne', 'bean'],
      category: 'Moderation',
      guildOnly: true,
      userPermissions: Constants.Permissions.banMembers,
      botPermissions: Constants.Permissions.banMembers
    });
  }

  async run(ctx: Context) {
    const locale = await ctx.getLocale();
    if (!ctx.args.has(0)) return ctx.send(locale.translate('global.noUser'));

    const userID = ctx.args.get(0);
    const user = findId(userID);
    if (!user) return ctx.send(locale.translate('global.unableToFind'));

    let member: Member | { id: string; guild: Guild } | undefined = ctx.guild!.members.get(user);
    if (!member || !(member instanceof Member)) member = { id: userID, guild: ctx.guild! };
    else {
      if (!PermissionUtils.above(ctx.member!, member)) return ctx.send(locale.translate('global.heirarchy'));
    }

    const baseReason = ctx.args.has(1) ? ctx.args.slice(1).join(' ') : undefined;
    let reason!: string;
    let time!: string;

    if (baseReason) {
      const sliced = baseReason.split(' | ');
      reason = sliced[0];
      time = sliced[1];
    }

    const days = ctx.flags.get('days') || ctx.flags.get('d');
    if (days && (typeof days === 'boolean' || !(/[0-9]+/).test(days))) return ctx.send(locale.translate('global.invalidFlag.string'));

    const t = time ? ms(time) : undefined;
    const soft = ctx.flags.get('soft');
    if (soft && typeof soft === 'string') return ctx.send(locale.translate('global.invalidFlag.boolean'));

    const punishment = new Punishment(PunishmentType.Ban, {
      moderator: ctx.sender,
      soft: soft as boolean,
      temp: t,
      days: Number(days)
    });

    try {
      await this.bot.punishments.punish(member!, punishment, reason);

      const prefix = member instanceof Member ? member.user.bot ? 'Bot' : 'User' : 'User';
      return ctx.send(locale.translate('commands.moderation.ban', {
        type: prefix
      }));
    } catch(e) {
      if (e.message.includes('snowflake')) return ctx.send(locale.translate('commands.moderation.invalidSnowflake', {
        type: 'banned'
      }));

      return ctx.send(locale.translate('commands.moderation.unable', {
        type: member instanceof Member ? member.user.bot ? 'bot' : 'user' : 'user',
        message: e.message
      }));
    }
  }
}