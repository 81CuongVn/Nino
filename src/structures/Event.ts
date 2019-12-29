import Client from './Bot';
import { injectable, unmanaged } from 'inversify';

export type Emittable =
  | 'ready'
  | 'disconnect'
  | 'callCreate'
  | 'callRing'
  | 'callDelete'
  | 'callUpdate'
  | 'channelCreate'
  | 'channelDelete'
  | 'channelPinUpdate'
  | 'channelRecipientAdd'
  | 'channelRecepientRemove'
  | 'channelUpdate'
  | 'friendSuggestionCreate'
  | 'friendSuggestionDelete'
  | 'guildAvaliable'
  | 'guildBanAdd'
  | 'guildBanRemove'
  | 'guildDelete'
  | 'guildUnavaliable'
  | 'guildCreate'
  | 'guildEmojisUpdate'
  | 'guildMemberAdd'
  | 'guildMemberChunk'
  | 'guildMemberRemove'
  | 'guildMemberUpdate'
  | 'guildRoleCreate'
  | 'guildRoleDelete'
  | 'guildRoleUpdate'
  | 'guildUpdate'
  | 'hello'
  | 'messageCreate'
  | 'messageDeleteBulk'
  | 'messageReactionRemoveAll'
  | 'messageDeleteBulk'
  | 'messageReactionAdd'
  | 'messageReactionRemove'
  | 'messageUpdate'
  | 'presenceUpdate'
  | 'rawWS'
  | 'unknown'
  | 'relationshipAdd'
  | 'relationshipRemove'
  | 'relationshipUpdate'
  | 'typingStart'
  | 'unavaliableGuildCreate'
  | 'userUpdate'
  | 'voiceChannelJoin'
  | 'voiceChannelLeave'
  | 'voiceChannelSwitch'
  | 'voiceStateUpdate'
  | 'warn'
  | 'debug'
  | 'shardDisconnect'
  | 'error'
  | 'shardPreReady'
  | 'connect'
  | 'shardReady'
  | 'shardResume'
  | 'messageDelete';
@injectable()
export default class NinoEvent {
  public bot: Client;
  public event: Emittable;

  constructor(client: Client, @unmanaged() event: Emittable) {
    this.bot = client;
    this.event = event;
  }

  async emit(...args: any[]) {
    throw new SyntaxError(
      `Unable to run event '${this.event}' without the 'emit' function.`
    );
  }
}
