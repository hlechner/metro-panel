/*
 * Metro-Panel extension for Gnome 3
 * Copyright 2020 Henrique Lechner (hlechner)
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
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const Main = imports.ui.main;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;
const Utils = Me.imports.utils;


// Extension: Arc Menu <https://gitlab.com/arcmenu-team/Arc-Menu/>
function arcMenu() {
    let arcMenu = Convenience.getSettings('org.gnome.shell.extensions.arc-menu');
    let isDark = Me.settings.get_string('panel-style') == 'DARK';

    let buttonColor = isDark ? 'rgb(255,255,255)' : 'rgb(0,0,0)';

    arcMenu.set_string('menu-button-color', buttonColor);
    arcMenu.set_string('menu-button-hover-color', 'rgb(30,145,234)');
    arcMenu.set_string('menu-button-active-color', buttonColor);

    arcMenu.set_string('menu-button-hover-backgroundcolor', 'rgba(238,238,236,0.11)');
    arcMenu.set_string('menu-button-active-backgroundcolor', 'rgba(238,238,236,0.22)');

    // set to reload only if the extension is enabled
    if (Main.extensionManager.lookup("arc-menu@linxgem33.com")) {
        arcMenu.set_boolean('reload-theme', 'true');
    }
}
