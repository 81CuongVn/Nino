import { injectable, unmanaged } from 'inversify';
import { stripIndents } from 'common-tags';
import Context from './Context';
import Client from './Bot';
import 'reflect-metadata';

export interface CommandInfo {
  name: string;
  description: string | ((client: Client) => string);
  usage?: string;
  category?: string;
  aliases?: string[];
  guildOnly?: boolean;
  ownerOnly?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  cooldown?: number;
  botPermissions?: number;
  userPermissions?: number;
}

@injectable()
export default abstract class NinoCommand {
  public bot: Client;
  public name: string;
  public description: string;
  public usage: string;
  public category: string;
  public aliases: string[];
  public guildOnly: boolean;
  public ownerOnly: boolean;
  public disabled: boolean;
  public hidden: boolean;
  public cooldown: number;
  public botPermissions: number;
  public userPermissions: number;

  constructor(
    client: Client, 
    @unmanaged() info: CommandInfo
  ) {
    this.bot = client;
    this.name = info.name;
    this.description =
      typeof info.description === 'function'
        ? info.description(client)
        : info.description;
    this.usage = info.usage || '';
    this.category = info.category || 'Generic';
    this.aliases = info.aliases || [];
    this.guildOnly = info.guildOnly || false;
    this.ownerOnly = info.ownerOnly || false;
    this.disabled = info.disabled || false;
    this.hidden = info.hidden || false;
    this.cooldown = info.cooldown || 5;
    this.botPermissions = info.botPermissions || 0;
    this.userPermissions = info.userPermissions || 0;
  }

  public abstract run(ctx: Context): Promise<any>;

  format() {
    return `${this.bot.config.discord.prefix}${this.name}${this.usage ? ` ${this.usage}` : ''}`;
  }

  async help(ctx: Context) {
    const locale = await ctx.getLocale();
    const getPart = (type: 
      'title' |
      'name' |
      'syntax' |
      'category' |
      'aliases' |
      'guildOnly' |
      'ownerOnly' |
      'cooldown'
    ) => locale.translate(`commands.generic.help.command.${type}`);

    const getGlobalPart = (type: 'yes' | 'no') => locale.translate(`global.${type}`);

    const embed = this.bot
      .getEmbed()
      .setTitle(locale.translate('commands.generic.help.command.title', { command: this.name }))
      .setDescription(stripIndents`
        **${this.description}**

        \`\`\`apache
        ${getPart('name')}:       ${this.name}
        ${getPart('syntax')}:     ${this.format()}
        ${this.aliases.length ? `${getPart('aliases')}:    ${this.aliases.join(', ')}` : `${getPart('aliases')}:    None`}
        ${getPart('guildOnly')}: ${this.guildOnly ? getGlobalPart('yes') : getGlobalPart('no')}
        ${getPart('ownerOnly')}: ${this.ownerOnly ? getGlobalPart('yes') : getGlobalPart('no')}
        ${getPart('cooldown')}:   ${this.cooldown} second${this.cooldown > 1 ? 's' : ''}
        \`\`\`
      `);

    return embed.build();
  }
}