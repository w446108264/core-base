var log4js = require('log4js');
var fs = require('fs');
var cachePath = process.cwd() + "/logs/";

if (!fs.existsSync(cachePath)) {
    fs.mkdirSync(cachePath);
}

log4js.configure({
    appenders: [
        {
            type: 'console'
        },
        {
            type: "dateFile",
            filename: cachePath + 'blah',
            pattern: "-yyyy-MM-dd.log",
            alwaysIncludePattern: true
        }]
});

var logger = log4js.getLogger('normal');
logger.setLevel('INFO');

function getLogger() {
    return log4js.connectLogger(logger, {
        level: log4js.levels.INFO
    })
};

function info(content) {
    logger.info(content);
};

function error(content) {
    logger.error(content);
};

module.exports = {
    info: info,
    error: error,
    getLogger: getLogger
};