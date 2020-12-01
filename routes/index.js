"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientTracker_1 = require("../public/javascripts/ClientTracker");
var express = require('express');
var router = express.Router();
var clientsList = [];
/* GET home page. */
router.get('/', function (req, res, next) {
    var instance = new ClientTracker_1.ClientTracker();
    var name = clientsList.length.toString();
    instance.uniqueName = name;
    clientsList.push(instance);
    res.render('index', { title: "Chat", id: name });
    //   res.send();
});
router.put('/listen/:name', function (req, res) {
    var name = req.params.name;
    console.log("/listen/" + name);
    var found = clientsList.findIndex(function (element) {
        return element.uniqueName === name;
    });
    if (found !== -1) {
        var instance = clientsList[found];
        instance.PollIn(res);
    }
    else {
        console.log(" did not find instance for name:" + name);
    }
});
router.put('/talk/:name', function (req, res) {
    var source = req.params.name;
    console.log("/talk/" + source);
    var msg = req.body.message;
    var numOthers = 0;
    clientsList.forEach(function (ele) {
        if (ele.uniqueName !== source) {
            ele.Respond(msg);
            numOthers++;
        }
    });
    var response = {
        numberRecipients: numOthers
    };
    res.send(response);
});
module.exports = router;
//# sourceMappingURL=index.js.map