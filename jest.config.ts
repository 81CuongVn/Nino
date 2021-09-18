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

import type { ProjectConfig } from '@jest/types/build/Config';

/**
 * Represents the Jest configuration for Nino.
 */
const config: Partial<ProjectConfig> = {
  testRegex: ['(/__tests__/.*|(\\.|/)(test|spec)).(jsx?|tsx?)$'],
  testEnvironment: 'node',
  // @ts-ignore
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  globalSetup: './src/jest-setup.js',
  displayName: {
    color: 'magentaBright',
    name: 'Nino',
  },
  moduleNameMapper: {
    // @ts-ignore
    '@/(.*)': '<rootDir>/$1',
    '~/(.*)': '<rootDir>/src/$1',
  },
  resolver: undefined,
};

export default config;
