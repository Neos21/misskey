/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

const enRegex1 = /(?<=n)a/gi;
const enRegex2 = /(?<=morn)ing/gi;
const enRegex3 = /(?<=every)one/gi;
const koRegex1 = /[나-낳]/g;
const koRegex2 = /(다$)|(다(?=\.))|(다(?= ))|(다(?=!))|(다(?=\?))/gm;
const koRegex3 = /(야(?=\?))|(야$)|(야(?= ))/gm;

export function nyaize(text: string): string {
	return text;
}
