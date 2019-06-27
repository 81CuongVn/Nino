import { Message, TextChannel } from 'eris';
import RedisQueue from '../../util/RedisQueue';
import NinoClient from '../Client';
import PermissionUtils from '../../util/PermissionUtils';

export default class AutoModSpam {
    public client: NinoClient;

    constructor(client: NinoClient) {
        this.client = client;
    }

    async handle(m: Message) {
        const guild = (m.channel as TextChannel).guild;
        const me = guild.members.get(this.client.user.id)!;
        if (!PermissionUtils.above(me, m.member!)) // TODO: add permission checks. I will need to figure out those!
            return;

        const settings = await this.client.settings.get(guild.id);
        
        if (!settings || !settings.automod.raid) return;

        const queue = new RedisQueue(this.client.redis, `${m.author.id}:${guild.id}`); // go finish the command parser
        await queue.push(m.timestamp.toString());
        if ((await queue.length()) >= 5) {
            const oldtime = Number.parseInt(await queue.pop());
            if (oldtime - m.timestamp <= 5000) {
                await m.channel.createMessage('Stop right there! Spamming is not allowed!')
            }
        }

    }
}