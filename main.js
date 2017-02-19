'use strict'
var wifi = require('Wifi');
var WebSocket = require("ws");
var VERSION = "1.0";
wifi.on("connected", () => {
    console.log('Connected as: ' + wifi.getIP().ip);
    var ws = new WebSocket('192.168.0.104', {
        port: 8080,
        path: '/'
    });
    ws.on("open", () => {
        console.log("WEB SOCKET Opened");
        var isOn = false;
        var interval = 500;
        setInterval(function() {
            isOn = !isOn;
            digitalWrite(D2, isOn);
            var msg = {
                d2: isOn
            };
            ws.send(JSON.stringify(msg));
        }, interval);
    });
    ws.on("message", (msg) => {
        console.log(msg.toString());
    });
});

wifi.connect("wificonred", {
    password: "95440279"
}, function(error) {
    if (error) {
        console.error(error);
    }
});

function main() {
    console.log("Started: " + new Date().toString());
}