/**
 * a base core lib for me
 * @see https://github.com/w446108264/core-base
 */

"use strict";

var events = require('events')
    , logs = require('./lib/logs/log')
    , download = require('./lib/download')
    , fileUtil = require('./lib/fileUtil')

function getLogger() {
    return logs;
}

function getDownload() {
    return download;
}

function getFileUtil() {
    return fileUtil;
}

module.exports = {
    getLogger: getLogger,
    getDownload: getDownload,
    getFileUtil: getFileUtil
};