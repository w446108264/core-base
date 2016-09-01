var fs = require('fs');
var request = require('request');
var log = require('./logs/log');

/**
 * download and save
 * @param url
 * @param dir
 * @param filename
 * @param callback
 */
exports.downloadAndSave = function (url, dir, filename, callback) {
    if (url == null) {
        log.error("downloadImage Error:url can't be null");
        callback("downloadImage Error:url can't be null", null);
        return;
    }
    if (dir == null) {
        log.error("downloadImage Error:dir can't be null");
        callback("downloadImage Error:dir can't be null", null);
        return;
    }
    if (filename == null) {
        log.error("downloadImage Error:filename can't be null");
        callback("downloadImage Error:filename can't be null", null);
        return;
    }

    var saveFilePath = dir + "/" + filename;
    request(url)
        .on('response', function (response) {
            if (response == null) {
                callback("download fail, can't find response!", saveFilePath);
                return;
            }
            response.on('end', function () {
                /**
                 * download fail
                 */
                if (response.statusCode !== 200) {
                    callback("download fail, statusCode:" + response.statusCode, saveFilePath);
                    return;
                }

                var contentType = response.headers["content-type"];

                /**
                 * return a html (some webserver will redirect when fail)
                 */
                if (contentType !== null && contentType.indexOf("html") > -1) {
                    callback("download fail and has been redirected", saveFilePath);
                    return;
                }

                /**
                 * return success
                 */
                callback(null, saveFilePath);
            });
        })
        .on('error', function (err) {
            callback(err, saveFilePath);
        })
        .pipe(fs.createWriteStream(saveFilePath));
}