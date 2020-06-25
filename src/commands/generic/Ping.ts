import { injectable, inject } from 'inversify';
import { TYPES } from '../../types';
import Command from '../../structures/Command';
import Context from '../../structures/Context';
import Bot from '../../structures/Bot';

@injectable()
export default class PingCommand extends Command {
  constructor(@inject(TYPES.Bot) client: Bot) {
    super(client, {
      name: 'ping',
      description: 'Shows you the bot\'s ping.',
      aliases: ['pong', 'pang'],
      guildOnly: true
    });
  }

  async run(ctx: Context) {

    const startedAt = Date.now();
    const message = await ctx.sendTranslate('commands.generic.ping.oldMessage');
    
    const ws = this.bot.client.shards.reduce((a, b) => a + b.latency, 0);
    const m = ctx.translate('commands.generic.ping.message', {
      id: ctx.guild ? ctx.guild.shard.id : 0,
      shard: ws,
      messageLatency: Date.now() - startedAt
    });

    return message.edit(m);
  }
}
