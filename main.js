'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');

var win = null;

var gravity  = 2.4;
var interval = 13;
var maxX     = 0;
var maxY     = 0;
var unitH    = 0;
var unitV    = 0;
var v        = 0;
var w        = 0;
var x        = 0;
var y        = 0;

app.on('ready', function() {
    win  = new BrowserWindow({width: 320, height: 240});

    maxX  = win.getPosition()[0];
    maxY  = win.getPosition()[1];
    unitH = maxX / 133.0;
    unitV = Math.sqrt(maxY * gravity * 2);
    v     = -unitH;
    w     = unitV;
    x     = maxX;
    y     = 0;

    win.loadUrl('file://' + __dirname + '/index.html');

    startPyonPyon(win);

    win.on('closed', function() {
        win = null;
    });
});


function startPyonPyon(win) {
    setInterval(function () { pyonPyon(win); }, interval);
}

function pyonPyon(win) {
    x = x + v;
    if (x < 0) {
        x = 0;
        v = -v;
    } else if (x > maxX) {
        x = maxX;
        v = -v;
    }

    y = y + w;
    if (y < 0) {
        y = 0;
        w = unitV;
    } else if (y > maxY) {
        y = maxY;
    }

    w = w - gravity;
    win.setPosition(Math.round(x), Math.round(maxY - y));
}
