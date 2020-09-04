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

    // set to reload only if the extension is running
    if (Main.extensionManager.lookup("arc-menu@linxgem33.com")) {
        arcMenu.set_boolean('reload-theme', 'true');
    }
}

// Changes: GTK theme, Icon theme, Gnome-shell theme
function changeThemes() {
    let isDark = Me.settings.get_string('panel-style') == 'DARK';

    let gtkAndIcons = Convenience.getSettings('org.gnome.desktop.interface');
    let shellTheme = Convenience.getSettings('org.gnome.shell.extensions.user-theme');

    let gtkThemeName = _checkTheme(gtkAndIcons.get_string('gtk-theme'), isDark, 'gtk');
    if (gtkThemeName) gtkAndIcons.set_string('gtk-theme', gtkThemeName);

    let iconsThemeName = _checkTheme(gtkAndIcons.get_string('icon-theme'), isDark, 'icon');
    if (iconsThemeName) gtkAndIcons.set_string('icon-theme', iconThemeName);

    let shellThemeName = _checkTheme(shellTheme.get_string('name'), isDark, 'shell');
    if (shellThemeName) shellTheme.set_string('name', shellThemeName);
}

function _checkTheme(name, isDark, type){
    let themename = {Adwaita: {dark: 'Adwaita-dark', light: 'Adwaita'},
                     Yaru: {dark: 'Yaru-dark', light: 'Yaru'}};
    let themetype = {Adwaita: {gtk: true, icon: false, shell: false},
                     Yaru: {gtk: true, icon: false, shell: true}};

    let regEx1 = /^(Adwaita|Yaru)(-dark|-light)?$/g;
    let regEx2 = /^(Adwaita|Yaru)/g;

    let newName = name.match(regEx1) ? name.match(regEx2) : '';

    if (newName && themetype[newName][type]) {
        newName = themename[newName][isDark ? 'dark' : 'light'];
        newName = (newName == 'Yaru' && type == 'gtk') ? 'Yaru-light' : newName;
    }

    return newName;
}
