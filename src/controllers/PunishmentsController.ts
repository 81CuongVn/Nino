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

import PunishmentEntity, { PunishmentType } from '../entities/PunishmentsEntity';
import Database from '../components/Database';

interface CreatePunishmentOptions {
  warnings: number;
  roleID?: string;
  guildID: string;
  soft?: boolean;
  time?: number;
  type: PunishmentType;
}

export default class PunishmentsController {
  constructor(private database: Database) {}

  private get repository() {
    return this.database.connection.getRepository(PunishmentEntity);
  }

  create({
    warnings,
    guildID,
    roleID,
    soft,
    time,
    type
  }: CreatePunishmentOptions) {
    const entry = new PunishmentEntity();
    entry.warnings = warnings;
    entry.guildID = guildID;
    entry.type = type;

    if (roleID !== undefined)
      entry.roleID = roleID;

    if (soft !== undefined && soft === true)
      entry.soft = true;

    if (time !== undefined)
      entry.time = time;

    return this.repository.save(entry);
  }

  getAll(guildID: string) {
    return this.repository.find({ guildID });
  }

  async shouldBeSoft(guildID: string, index: number, soft: boolean) {
    const entry = await this.repository.findOneOrFail({ guildID, index });
    entry.soft = soft;
    await this.repository.save(entry);

    return entry.soft;
  }

  async setTime(guildID: string, index: number, time: number) {
    const entry = await this.repository.findOneOrFail({ guildID, index });
    entry.time = time;

    await this.repository.save(entry);
  }

  async setRoleTo(guildID: string, roleID: string, index: number) {
    const entry = await this.repository.findOneOrFail({ guildID, index });
    if (entry.type !== PunishmentType.RoleAdd && entry.type !== PunishmentType.RoleRemove)
      throw new TypeError(`Cannot add role to type ${entry.type}`);

    entry.roleID = roleID;
    await this.repository.save(entry);
  }
}
