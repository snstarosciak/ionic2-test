cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-sqlite-2/dist/sqlite-plugin.js",
        "id": "cordova-plugin-sqlite-2.sqlitePlugin",
        "clobbers": [
            "sqlitePlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "cordova-plugin-sqlite-2": "1.0.3"
}
// BOTTOM OF METADATA
});