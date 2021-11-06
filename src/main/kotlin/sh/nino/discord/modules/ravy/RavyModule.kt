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

package sh.nino.discord.modules.ravy

import io.ktor.client.*
import io.ktor.client.request.*
import kotlinx.serialization.Serializable
import sh.nino.discord.data.Config

@Serializable
data class User(
    val pronouns: String,
    val bans: List<Ban>,
    val trust: Int,
    val rep: List<RepProvider>
)

@Serializable
sealed class Ban(
    val provider: String,
    val reason: String,
    val moderator: String
)

@Serializable
sealed class RepProvider(
    val type: String,
    val score: Int
)

class RavyModule(private val config: Config, private val httpClient: HttpClient) {
    suspend fun getBansById(id: String): List<Ban> {
        if (config.ravy == null) return emptyList()

        return httpClient.get("https://ravy.org/api/v1/users/$id/bans") {
            header("Authorization", config.ravy)
        }
    }
}
