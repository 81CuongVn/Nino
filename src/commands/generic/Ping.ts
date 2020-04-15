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
      category: 'Generic',
      guildOnly: true
    });
  }

  async run(ctx: Context) {
    const startedAt = Date.now();
    const message = await ctx.send(':ping_pong: Uhm, I was wondering why you used this command?');
    
    const ws = this.bot.client.shards.reduce((a, b) => a + b.latency, 0);
    return message.edit(`:ping_pong: Pong! (**Shard #${ctx.guild ? ctx.guild.shard.id : 0}**: \`${ws}ms\` | **Message**: \`${Date.now() - startedAt}ms\`)`);
  }
}