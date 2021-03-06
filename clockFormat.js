/*
 * This file is part of the Metro-Panel extension for Gnome 3
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

/*
 * This code is originally forked from clock-override extension:
 * <https://github.com/stuartlangridge/gnome-shell-clock-override>.
 */

const GLib = imports.gi.GLib;

var fromCodePoint = function() {
    var MAX_SIZE = 0x4000;
    var codeUnits = [];
    var highSurrogate;
    var lowSurrogate;
    var index = -1;
    var length = arguments.length;
    if (!length) { return ''; }
    var result = '';
    while (++index < length) {
        var codePoint = Number(arguments[index]);
        if (
            !isFinite(codePoint) ||       // `NaN`, `+Infinity`, or `-Infinity`
            codePoint < 0 ||              // not a valid Unicode code point
            codePoint > 0x10FFFF ||       // not a valid Unicode code point
            Math.floor(codePoint) != codePoint // not an integer
        ) {
            throw RangeError('Invalid code point: ' + codePoint);
        }
        if (codePoint <= 0xFFFF) { // BMP code point
            codeUnits.push(codePoint);
        } else { // Astral code point; split in surrogate halves
            // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            codePoint -= 0x10000;
            highSurrogate = (codePoint >> 10) + 0xD800;
            lowSurrogate = (codePoint % 0x400) + 0xDC00;
            codeUnits.push(highSurrogate, lowSurrogate);
        }
        if (index + 1 == length || codeUnits.length > MAX_SIZE) {
            result += String.fromCharCode.apply(null, codeUnits);
            codeUnits.length = 0;
        }
    }
    return result;
};

function format(FORMAT, now) {
    var desired = FORMAT;

    if (FORMAT.indexOf("%;") > -1) {
        if (FORMAT.indexOf("%;vf") > -1) {
            var quarters = Math.round(now.get_minute() / 15);
            var vulgar_fraction = ["\u2070/\u2080", "\u00B9/\u2084", "\u00B9/\u2082", "\u00B3/\u2084", "\u00B9/\u2081"][quarters];
            desired = desired.replace(/%;vf/g, vulgar_fraction);
        }
        if (FORMAT.indexOf("%;cf") > -1) {
            var hour = now.get_hour();
            // convert from 0-23 to 1-12
            if (hour > 12) {
                hour -= 12;
            }
            if (hour == 0) {
                hour = 12;
            }
            var clockFaceCodePoint = 0x1f550 + (hour - 1);
            var minute = now.get_minute();
            if (minute >= 30) {
                clockFaceCodePoint += 12;
            }
            var repl;
            if (String.fromCodePoint) {
                repl = String.fromCodePoint(clockFaceCodePoint)
            } else {
                repl = fromCodePoint(clockFaceCodePoint);
            }
            desired = desired.replace(/%;cf/g, repl);
        }
        if (FORMAT.indexOf("%;l") > -1) {
            var hour = now.get_hour();
            // convert from 0-23 to 1-12
            if (hour > 12) {
                hour -= 12;
            }
            if (hour == 0) {
                hour = 12;
            }
            desired = desired.replace(/%;l/g, hour);
        }
        if (FORMAT.indexOf("%;e") > -1) {
            var day = now.get_day_of_month();

            desired = desired.replace(/%;e/g, day);
        }
        if (FORMAT.indexOf("%;m") > -1) {
            var month = now.get_month();

            desired = desired.replace(/%;m/g, month);
        }
        if (FORMAT.indexOf("%;@") > -1) {
            var bmtnow = now.to_timezone(GLib.TimeZone.new('+01'));
            var beat_time = 0 | (bmtnow.get_hour() + (bmtnow.get_minute() / 60) + bmtnow.get_second() / 3600) * 1000 / 24;
            beat_time = ('000' + beat_time).slice(-3);
            desired = desired.replace(/%;@/g, beat_time);
        }
    }
    if (FORMAT.indexOf("%") > -1) {
        desired = now.format(desired);
    }

    return desired;
};
