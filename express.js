/**
 * Created by huadu on 7/27/17.
 */
//when listening ; open 'localhost:8000' in browser//

var express = require('express');
var app = express();
var count=0;
var redis= require('redis');
var client=redis.createClient();

app.listen(8000,'localhost',function(){
    console.log('express is listening');
});
app.get('/',function(req,res){
    count++;
    res.send(`hello world ! (already ${count} times)`);
});
client.set('opentimes',count);

// --------------------------------------------


