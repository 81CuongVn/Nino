/*
 * 🔨 Nino: Cute, advanced discord moderation bot made in Kord.
 * Copyright (c) 2019-2022 Nino Team
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

import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    groovy
    `kotlin-dsl`
}

repositories {
    mavenCentral()
    gradlePluginPortal()
    maven("https://maven.floofy.dev/repo/releases")
}

dependencies {
    implementation("org.jetbrains.kotlinx:atomicfu-gradle-plugin:0.25.0")
    implementation("com.diffplug.spotless:spotless-plugin-gradle:6.25.0")
    implementation("io.kotest:kotest-gradle-plugin:0.4.11")
    implementation("gay.floof.utils:gradle-utils:1.3.0")
    implementation(kotlin("gradle-plugin", version = "2.0.21"))
    implementation(kotlin("serialization", version = "2.0.21"))
    implementation(gradleApi())
}
