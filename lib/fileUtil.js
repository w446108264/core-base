var fs = require("fs");
var path = require("path");

/**
 * mkdir
 * @param dirname   the dir name
 * @param callback
 */
exports.mkdirs = function (dirName, callback) {
    fs.exists(dirName, function (exists) {
        if (exists) {
            callback();
        } else {
            exports.mkdirs(path.dirname(dirName), function () {
                fs.mkdir(dirName, callback);
            });
        }
    });
}

/**
 * mkdir sync
 * @param dirName
 */
exports.mkdirsSync = function (dirName) {
    if (fs.existsSync(dirName)) {
        return;
    } else {
        if (mkdirsSync(path.dirname(dirName))) {
            fs.mkdirSync(dirName);
        }
    }
}