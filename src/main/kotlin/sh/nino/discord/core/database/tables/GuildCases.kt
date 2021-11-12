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

package sh.nino.discord.core.database.tables

import kotlinx.datetime.Clock
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime
import org.jetbrains.exposed.dao.LongEntity
import org.jetbrains.exposed.dao.LongEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.LongIdTable
import org.jetbrains.exposed.sql.TextColumnType
import org.jetbrains.exposed.sql.kotlin.datetime.datetime
import sh.nino.discord.core.database.columns.array

enum class PunishmentType(val key: String) {
    THREAD_MESSAGES_REMOVED("thread message removed"),
    THREAD_MESSAGES_ADDED("thread message added"),
    WARNING_REMOVED("warning removed"),
    VOICE_UNDEAFEN("voice undeafen"),
    WARNING_ADDED("warning added"),
    VOICE_DEAFEN("voice deafened"),
    VOICE_UNMUTE("voice unmute"),
    VOICE_MUTE("voice mute"),
    UNMUTE("unmute"),
    UNBAN("unban"),
    MUTE("mute"),
    KICK("kick"),
    BAN("ban");

    companion object {
        fun get(key: String): PunishmentType = values().find { it.key == key } ?: error("Unable to find key '$key' in PunishmentType.")
    }
}

object GuildCases: LongIdTable("guild_cases") {
    val attachments = array<String>("attachments", TextColumnType()).default(arrayOf())
    val moderatorId = long("moderator_id")
    val messageId = long("message_id").nullable()
    val createdAt = datetime("created_at").default(Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault()))
    val updatedAt = datetime("updated_at").default(Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault()))
    val victimId = long("victim_id")
    val reason = text("reason").nullable()
    val index = integer("index").autoIncrement()
    val soft = bool("soft").default(false)
    val time = long("time").nullable().default(null)
    val type = customEnumeration(
        "type",
        "PunishmentTypeEnum",
        { value -> PunishmentType.get(value as String) },
        { toDb -> toDb.key }
    )

    override val primaryKey: PrimaryKey = PrimaryKey(id, index, name = "PK_GuildCases_ID")
}

class GuildCasesEntity(id: EntityID<Long>): LongEntity(id) {
    companion object: LongEntityClass<GuildCasesEntity>(GuildCases)

    var attachments by GuildCases.attachments
    var moderatorId by GuildCases.moderatorId
    var messageId by GuildCases.messageId
    var createdAt by GuildCases.createdAt
    var updatedAt by GuildCases.updatedAt
    var victimId by GuildCases.victimId
    var reason by GuildCases.reason
    var index by GuildCases.index
    var type by GuildCases.type
    var soft by GuildCases.soft
    var time by GuildCases.time
}
