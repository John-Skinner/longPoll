import {ClientTracker} from "../public/javascripts/ClientTracker";

var express = require('express');
var router = express.Router();
var clientsList = [];

/* GET home page. */
router.get('/', function(req, res, next) {
    let instance= new ClientTracker();
    let name = clientsList.length.toString();
    instance.uniqueName = name;
    clientsList.push(instance);
    res.render('index', { title: "Chat",id:name });
 //   res.send();

});
router.put('/listen/:name',(req,res)=>
{

    let name=req.params.name;
    console.log("/listen/" + name);
    let found=clientsList.findIndex((element)=>
    {
        return element.uniqueName === name;
    });
    if (found !== -1)
    {
        let instance:ClientTracker = clientsList[found];
        instance.PollIn(res);
    }
    else
    {
        console.log(" did not find instance for name:" + name);
    }
});
router.put('/talk/:name',(req,res)=>
{
    let source = req.params.name;
    console.log("/talk/" + source);
    let msg = req.body.message;
    let numOthers = 0;
    clientsList.forEach((ele)=>
    {
        if (ele.uniqueName !== source)
        {
            ele.Respond(msg);
            numOthers++;
        }
    });
    let response = {
        numberRecipients:numOthers

    }
    res.send(response);
});

module.exports = router;
