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

import { Entity, Column } from 'typeorm';

export enum LoggingEvents {
  MessageDeleted = 'message_delete',
  MessageUpdated = 'message_update',
  SettingUpdated = 'settings_update'
}

@Entity({ name: 'logging' })
export default class LoggingEntity {
  @Column({ default: [], type: 'array' })
  public ignoreChannels!: string[];

  @Column({ default: [], type: 'array' })
  public ignoreUsers!: string[];

  @Column({ name: 'channel_id' })
  public channelID!: string;

  @Column({ type: 'enum', array: true, enum: LoggingEvents, default: [] })
  public events!: LoggingEvents[];

  @Column({ default: false })
  public enabled!: boolean;

  @Column({ name: 'guild_id' })
  public guildID!: string;
}
