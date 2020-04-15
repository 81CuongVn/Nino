import { Punishment, PunishmentType } from '../structures/managers/PunishmentManager';
import { inject, injectable } from 'inversify';
import { Guild, User } from 'eris';
import { TYPES } from '../types';
import Event from '../structures/Event';
import Bot from '../structures/Bot';

@injectable()
export default class GuildBanAddEvent extends Event {
  constructor(
    @inject(TYPES.Bot) bot: Bot
  ) {
    super(bot, 'guildBanAdd');
  }

  async emit(guild: Guild, user: User) {
    const logs = await guild.getAuditLogs(10);
    const botLogs = logs.entries.filter(entry =>
      // Check if the action was ban and if Nino didn't do it
      entry.actionType === 22 && entry.user.id !== this.bot.client.user.id
    );

    // Don't do anything if no logs were found 
    if (!botLogs.length) return;

    const log = botLogs[0];
    const mod = this.bot.client.users.get(log.user.id)!;
    const punishment = new Punishment(PunishmentType.Ban, {
      moderator: mod
    });

    const member = guild.members.get(user.id) || { id: user.id, guild };
    await this.bot.punishments.punish(member, punishment, log.reason);
  }
}