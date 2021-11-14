const express = require('express');
const cors = require('cors');
const redis = require("redis");

const app = express();
const port = 80;

app.use(express.json());
app.use(cors());

const client = redis.createClient({
    host: '10.43.87.46',
    port: '6379',
});

client.on('error', err => {
    console.log('Error:' + err);
});

app.get('/contact', (req, res) => {
    res.send("Oh Hai! I'm an API. You must speak to me in JSON")
});

app.post('/contact', (req, res) => {

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

   res.sendStatus(200);

   console.log(currentMessage);
});

app.listen(port, () => {
    console.log("Running contact service");
});