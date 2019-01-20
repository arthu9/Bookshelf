cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-autostart/www/auto-start.js",
        "id": "cordova-plugin-autostart.AutoStart",
        "pluginId": "cordova-plugin-autostart",
        "clobbers": [
            "cordova.plugins.autoStart"
        ]
    },
    {
        "file": "plugins/cordova-plugin-battery-status/www/battery.js",
        "id": "cordova-plugin-battery-status.battery",
        "pluginId": "cordova-plugin-battery-status",
        "clobbers": [
            "navigator.battery"
        ]
    },
    {
        "file": "plugins/cordova-plugin-battery-status/src/browser/BatteryProxy.js",
        "id": "cordova-plugin-battery-status.Battery",
        "pluginId": "cordova-plugin-battery-status",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-autostart": "2.3.0",
    "cordova-plugin-battery-status": "1.1.2",
    "cordova-plugin-console": "1.0.7",
    "cordova-plugin-statusbar": "1.0.1",
    "cordova-plugin-whitelist": "1.2.2"
}
// BOTTOM OF METADATA
});