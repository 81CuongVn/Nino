import Event from '../structures/Event';
import Bot from '../structures/Bot';
import { User, Member } from 'eris';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';

@injectable()
export default class UserUpdateEvent extends Event {
  constructor(@inject(TYPES.Bot) client: Bot) {
    super(client, 'userUpdate');
  }

  getMutualGuilds(user: User): Member[] {
    let members: Member[] = [];
    for (let [, guild] of this.bot.client.guilds) {
      if (!!guild.members[user.id]) members.push(guild.members[user.id]);
    }
    return members;
  }

  async emit(user: User) {
    for (let member of this.getMutualGuilds(user))
      this.bot.autoModService.handleMemberNameUpdate(member);
  }
}
