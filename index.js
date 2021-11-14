const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())

const redis = require("redis");
const client = redis.createClient({
    host: '192.168.2.122',
    port: '6379',
});

client.on('error', err => {
    console.log('Error:' + err);
});

app.get('/', (req, res) => {
    res.send("Oh. Hai. This is an API. You have to talk to me in JSON");
});

app.post('/message', (req, res) => {

   var d = new Date();
   var todayDate = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
   var name = req.body.name;
   var message = req.body.message;

   const currentMessage = {
        "date" : todayDate,
        "name" : name,
        "message" : message
   }

   client.incr('id', function(err, id) {
    client.hmset('mid:' + id, {'date': todayDate,'name': name, 'message': message});
   });



   console.log(currentMessage);
});

app.listen(port, () => {
    console.log("Running contact service");
});