import { injectable, inject } from 'inversify';
import PermissionUtils from '../../util/PermissionUtils';
import { Constants } from 'eris';
import { Module } from '../../util';
import { TYPES } from '../../types';
import findUser from '../../util/UserUtil';
import Command from '../../structures/Command';
import Context from '../../structures/Context';
import Bot from '../../structures/Bot';
import WarningService from '../../structures/services/WarningService';
import PunishmentService, { Punishment, PunishmentType } from '../../structures/services/PunishmentService';

@injectable()
export default class PardonCommand extends Command {
  constructor(
    @inject(TYPES.Bot) bot: Bot,
    @inject(TYPES.WarningService) private warningService: WarningService,
    @inject(TYPES.PunishmentService) private punishmentService: PunishmentService
  ) {
    super(bot, {
      name: 'pardon',
      description: 'Pardon a member from this guild',
      usage: '<user> <amount>',
      aliases: ['unwarn', 'forgive'],
      category: Module.Moderation,
      userPermissions: Constants.Permissions.manageRoles,
      botPermissions: Constants.Permissions.manageRoles,
      guildOnly: true
    });
  }

  async run(ctx: Context) {
    if (!ctx.args.has(0)) return ctx.sendTranslate('global.noUser');
    if (!ctx.args.has(1) || !(/^[0-9]+$/).test(ctx.args.get(1))) return ctx.sendTranslate('commands.moderation.pardon.notSpecified');

    const userID = ctx.args.get(0);
    const user = await findUser(this.bot, ctx.guild!.id, userID);
    if (!user) return ctx.sendTranslate('global.unableToFind');

    const member = ctx.guild!.members.get(user.id);
    const amount = Number(ctx.args.get(1));
    if (!member) return ctx.sendTranslate('commands.moderation.notInGuild', {
      user: `${user.username}#${user.discriminator}`
    });

    if (!PermissionUtils.above(ctx.message.member!, member)) return ctx.sendTranslate('global.hierarchy');
    else if (!PermissionUtils.above(ctx.me!, member)) return ctx.sendTranslate('global.botHierarchy');

    const reason = ctx.args.has(2) ? ctx.args.slice(2).join(' ') : undefined;
    const punishment = new Punishment(PunishmentType.RemoveWarning, {
      moderator: ctx.sender,
      amount
    });

    const r = reason === undefined
      ? ctx.translate('global.pardon.noReason', { amount })
      : ctx.translate('global.pardon.reason', { reason, amount });

    await this.punishmentService.punish(member!, punishment, r);
    const warns = await this.warningService.get(ctx.guild!.id, member.id);

    return warns === null
      ? ctx.sendTranslate('commands.moderation.pardon.noWarnings', { user: `${user.username}#${user.discriminator}`, reason: reason === undefined ? '' : ` (*${reason}*)` })
      : ctx.sendTranslate('commands.moderation.pardon.warnings', {
        warnings: warns.amount,
        user: `${user.username}#${user.discriminator}`,
        reason: reason === undefined ? '' : ` (*${reason}*)`
      });
  }
}
