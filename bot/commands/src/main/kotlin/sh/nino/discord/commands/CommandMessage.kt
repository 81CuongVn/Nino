/*
 * Copyright (c) 2019-2022 Nino
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

package sh.nino.discord.commands

import dev.kord.core.behavior.channel.createMessage
import dev.kord.core.entity.Message
import dev.kord.core.entity.channel.TextChannel
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.rest.builder.message.EmbedBuilder
import dev.kord.rest.builder.message.create.allowedMentions
import sh.nino.discord.common.COLOR
import sh.nino.discord.core.localization.Locale
import sh.nino.discord.core.messaging.PaginationEmbed
import sh.nino.discord.database.tables.GuildSettingsEntity
import sh.nino.discord.database.tables.UserEntity

class CommandMessage(
    private val event: MessageCreateEvent,
    val args: List<String>,
    val settings: GuildSettingsEntity,
    val userSettings: UserEntity,
    val locale: Locale
) {
    val attachments = event.message.attachments.toList()
    val message = event.message
    val author = message.author!!

    suspend fun createPaginationEmbed(embeds: List<EmbedBuilder>): PaginationEmbed {
        val channel = message.channel.asChannel() as TextChannel
        return PaginationEmbed(channel, author, embeds)
    }

    suspend fun reply(content: String, reply: Boolean = true, embedBuilder: EmbedBuilder.() -> Unit): Message {
        val embed = EmbedBuilder().apply(embedBuilder)
        embed.color = COLOR

        return message.channel.createMessage {
            this.content = content
            this.embeds += embed

            if (reply) {
                messageReference = message.id
                allowedMentions {
                    repliedUser = false
                }
            }
        }
    }

    suspend fun reply(content: String, reply: Boolean = true): Message {
        return message.channel.createMessage {
            this.content = content

            if (reply) {
                messageReference = message.id
                allowedMentions {
                    repliedUser = false
                }
            }
        }
    }

    suspend fun reply(content: String): Message = reply(content, true)
    suspend fun reply(reply: Boolean = true, embedBuilder: EmbedBuilder.() -> Unit): Message {
        val embed = EmbedBuilder().apply(embedBuilder)
        embed.color = COLOR

        return message.channel.createMessage {
            this.embeds += embed
            if (reply) {
                messageReference = message.id
                allowedMentions {
                    repliedUser = false
                }
            }
        }
    }
}
