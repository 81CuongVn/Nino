/**
 * Copyright (c) 2019-2021 Nino
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import Argument, { ArgumentInfo } from './arguments/Argument';
import { getSubcommandsIn } from './decorators/Subcommand';
import type CommandMessage from './CommandMessage';
import { NotInjectable } from '@augu/lilith';
import { Categories } from '../util/Constants';
import Subcommand from './Subcommand';

interface CommandInfo {
  userPermissions?: string | string[];
  botPermissions?: string[];
  description?: string;
  ownerOnly?: boolean;
  category?: Categories;
  cooldown?: number;
  aliases?: string[];
  hidden?: boolean;
  args?: ArgumentInfo[];
  name: string;
}

@NotInjectable()
export default abstract class NinoCommand {
  public userPermissions: string[];
  public botPermissions:  string[];
  public description:     string;
  public ownerOnly:       boolean;
  public category:        Categories;
  public cooldown:        number;
  public aliases:         string[];
  public hidden:          boolean;
  public args:            Argument[];
  public name:            string;

  constructor(info: CommandInfo) {
    this.userPermissions = typeof info.userPermissions === 'string'
      ? [info.userPermissions]
      : Array.isArray(info.userPermissions)
        ? info.userPermissions
        : [];

    this.botPermissions = typeof info.botPermissions === 'string'
      ? [info.botPermissions]
      : Array.isArray(info.botPermissions)
        ? info.botPermissions
        : [];

    this.description  = info.description ?? 'No description is available for this command.';
    this.ownerOnly    = info.ownerOnly ?? false;
    this.category     = info.category ?? Categories.General;
    this.cooldown     = info.cooldown ?? 5;
    this.aliases      = info.aliases ?? [];
    this.hidden       = info.hidden ?? false;
    this.args         = info.args?.map(info => new Argument(info)) ?? [];
    this.name         = info.name;
  }

  get subcommands() {
    return getSubcommandsIn(this).map(sub => new Subcommand(sub));
  }

  abstract run(msg: CommandMessage): Promise<any>;
}
