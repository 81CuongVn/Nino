import { VERSION as __version__ } from 'eris';
import { stripIndents } from 'common-tags';
import { humanize } from '../../util';
import NinoClient from '../../structures/Client';
import Command from '../../structures/Command';
import Context from '../../structures/Context';
import GuildModel from '../../models/GuildSchema';

export default class StatisticsCommand extends Command {
    constructor(client: NinoClient) {
        super(client, {
            name: 'statistics',
            description: 'Gives you the bot\'s statistics',
            aliases: ['stats', 'info', 'bot', 'botinfo'],
            category: 'Generic',
            ownerOnly: false
        });
    }

    getMostUsedCommand() {
        const name = Object.keys(this.client.stats.commandUsage)
            .map(key => ({ key, uses: this.client.stats.commandUsage[key].size })) // map key array to {key uses} array
            .sort((a, b) => b.uses - a.uses) // Sort by uses
            [0].key;

        return {
            command: name,
            size: this.client.stats.commandUsage[name].size,
            users: this.client.stats.commandUsage[name].users.length
        }
    }

    async run(ctx: Context) {
        const command = this.getMostUsedCommand();
        const ping    = await this.client.database.admin.ping();

        return ctx.send(stripIndents`
            \`\`\`prolog
            Guilds              ~> ${this.client.guilds.size.toLocaleString()}
            Users               ~> ${this.client.users.size.toLocaleString()}
            Channels            ~> ${Object.keys(this.client.channelGuildMap).length.toLocaleString()}
            Shards [C/T]        ~> [${ctx.guild.shard.id}/${this.client.shards.size}]
            Uptime              ~> ${humanize(Date.now() - this.client.startTime)}
            Commands            ~> ${this.client.manager.commands.size}
            Messages Seen       ~> ${this.client.stats.messagesSeen.toLocaleString()}
            Commands Executed   ~> ${this.client.stats.commandsExecuted.toLocaleString()}
            Most Used Command   ~> ${command.command} (${command.size} executions)
            Database Connection ~> ${ping}ms
            \`\`\`
        `);
    }
}