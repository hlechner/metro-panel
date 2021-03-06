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
 * This code is originally forked from dash-to-panel extension:
 * <https://github.com/home-sweet-gnome/dash-to-panel>.
 */

var SHOW_APPS_BTN = 'showAppsButton';
var ACTIVITIES_BTN = 'activitiesButton';
var TASKBAR = 'taskbar';
var DATE_MENU = 'dateMenu';
var SYSTEM_MENU = 'systemMenu';
var LEFT_BOX = 'leftBox';
var CENTER_BOX = 'centerBox';
var RIGHT_BOX = 'rightBox';
var DESKTOP_BTN = 'desktopButton';
var NOTIFICATION = 'notificationCenter';
var ARC_MENU = 'arc-menu';
var NETWORK_IND = 'NetworkIndicator';
var VOLUME_IND = 'VolumeIndicator';

var STACKED_TL = 'stackedTL';
var STACKED_BR = 'stackedBR';
var CENTERED = 'centered';
var CENTERED_MONITOR = 'centerMonitor';

var TOP = 'TOP';
var BOTTOM = 'BOTTOM';
var LEFT = 'LEFT';
var RIGHT = 'RIGHT';

var defaults = [
    { element: ARC_MENU,        visible: true,     position: STACKED_TL },
    { element: SHOW_APPS_BTN,   visible: true,     position: STACKED_TL },
    { element: ACTIVITIES_BTN,  visible: false,    position: STACKED_TL },
    { element: LEFT_BOX,        visible: true,     position: STACKED_TL },
    { element: TASKBAR,         visible: true,     position: STACKED_TL },
    { element: CENTER_BOX,      visible: true,     position: STACKED_BR },
    { element: RIGHT_BOX,       visible: true,     position: STACKED_BR },
    { element: NETWORK_IND,     visible: true,     position: STACKED_BR },
    { element: VOLUME_IND,      visible: true,     position: STACKED_BR },
    { element: SYSTEM_MENU,     visible: false,    position: STACKED_BR },
    { element: DATE_MENU,       visible: true,     position: STACKED_BR },
    { element: NOTIFICATION,    visible: true,     position: STACKED_BR },
    { element: DESKTOP_BTN,     visible: true,     position: STACKED_BR },
];

var optionDialogFunctions = {};

optionDialogFunctions[SHOW_APPS_BTN] = '_showShowAppsButtonOptions';
optionDialogFunctions[DESKTOP_BTN] = '_showDesktopButtonOptions';
optionDialogFunctions[DATE_MENU] = '_clockOptions';

var infoDialog = {};

let baseLink = "https://extensions.gnome.org/extension/"

infoDialog[ARC_MENU] = {name: 'Arc Menu',
                        link: baseLink + '1228/arc-menu/'};

infoDialog[NETWORK_IND] = {name: 'Panel Indicators',
                           link: baseLink + '3022/panel-indicators/'};

infoDialog[VOLUME_IND] = {name: 'Panel Indicators',
                          link: baseLink + '3022/panel-indicators/'};

infoDialog[NOTIFICATION] = {name: 'Notification Center',
                            link: baseLink + '1526/notification-centerselenium-h/'};

function getSettingsPositions(settings, setting) {
    var positions = null;

    try {
        positions = JSON.parse(settings.get_string(setting));
    } catch(e) {
        log('Error parsing positions: ' + e.message);
    }

    return positions;
}

function checkIfCentered(position) {
    return position == CENTERED || position == CENTERED_MONITOR;
}
