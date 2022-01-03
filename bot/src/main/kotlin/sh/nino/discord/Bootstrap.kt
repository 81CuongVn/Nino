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

package sh.nino.discord

import com.charleskorn.kaml.Yaml
import dev.kord.cache.map.MapLikeCollection
import dev.kord.cache.map.internal.MapEntryCache
import dev.kord.core.Kord
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.core.on
import gay.floof.utils.slf4j.logging
import kotlinx.coroutines.runBlocking
import org.koin.core.context.startKoin
import org.koin.dsl.module
import sh.nino.discord.api.apiModule
import sh.nino.discord.commands.CommandHandler
import sh.nino.discord.commands.commandsModule
import sh.nino.discord.common.NinoInfo
import sh.nino.discord.common.data.Config
import sh.nino.discord.core.NinoBot
import sh.nino.discord.core.globalModule
import sh.nino.discord.punishments.punishmentsModule
import java.io.File
import kotlin.system.exitProcess

object Bootstrap {
    private val logger by logging<Bootstrap>()

    @JvmStatic
    fun main(args: Array<String>) {
        Thread.currentThread().name = "Nino-MainThread"

        val bannerFile = File("./assets/banner.txt").readText(Charsets.UTF_8)
        for (line in bannerFile.split("\n")) {
            val l = line
                .replace("{{.Version}}", NinoInfo.VERSION)
                .replace("{{.CommitSha}}", NinoInfo.COMMIT_SHA)
                .replace("{{.BuildDate}}", NinoInfo.BUILD_DATE)

            println(l)
        }

        val configFile = File("./config.yml")
        val config = Yaml.default.decodeFromString(Config.serializer(), configFile.readText())
        val kord = runBlocking {
            Kord(config.token) {
                enableShutdownHook = false

                cache {
                    // cache members
                    members { cache, description ->
                        MapEntryCache(cache, description, MapLikeCollection.concurrentHashMap())
                    }

                    // cache users
                    users { cache, description ->
                        MapEntryCache(cache, description, MapLikeCollection.concurrentHashMap())
                    }
                }
            }
        }

        logger.info("* Initializing Koin...")
        val koin = startKoin {
            modules(
                globalModule,
                *apiModule.toTypedArray(),
                *commandsModule.toTypedArray(),
                module {
                    single {
                        config
                    }

                    single {
                        kord
                    }
                },

                punishmentsModule
            )
        }

        val bot = koin.koin.get<NinoBot>()
        runBlocking {
            try {
                // set up the command handler before the bot starts,
                // so we don't do circular dependencies.
                val handler = koin.koin.get<CommandHandler>()

                // setup slash commands also! for the same reason above.
                // koin.koin.get<SlashCommandHandler>()

                // setup kord events here (read ABOVE >:c)
                kord.on<MessageCreateEvent> { handler.onCommand(this) }

                bot.start()
            } catch (e: Exception) {
                logger.error("Unable to initialize Nino:", e)
                exitProcess(1)
            }
        }
    }
}
