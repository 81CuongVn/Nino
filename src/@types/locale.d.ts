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

/**
 * Metadata for a locale, this is used in the "meta" object
 */
export interface LocalizationMeta {
  /** List of contributors (by user ID) who helped translate or fix minor issues with this Locale */
  contributors: string[];

  /** The translator's ID */
  translator: string;

  /** Any additional aliases to use when setting or resetting a locale */
  aliases: string[];

  /** The flag's emoji (example: `:flag_us:`) */
  flag: string;

  /** The full name of the Locale (i.e `English (UK)`) */
  full: string;

  /** The locale's code (i.e `en_US`) */
  code: string;
}

/**
 * List of localization strings available (scoped to namespaces)
 */
export interface LocalizationStrings {
  commands: CommandStrings;
  generic: GenericStrings;
  automod: AutomodStrings;
  errors: ErrorStrings;
}

/**
 * All localization strings for the "commands" namespace
 */
// eslint-disable-next-line
interface CommandStrings {}

/**
 * All localization strings for the "generic" namespace
 *
 * The generic namespace is for generic localization,
 * like repeating strings.
 */
// eslint-disable-next-line
interface GenericStrings {}

/**
 * All localization strings for the "automod" namespace.
 *
 * The automod namespace is generally used to translate
 * all automod-related translations.
 */
// eslint-disable-next-line
interface AutomodStrings {}

/**
 * All localization strings for the "errors" namespace.
 *
 * The errors namespace is used to translate all
 * errors that occur within Nino.
 */
// eslint-disable-next-line
interface ErrorStrings {}
