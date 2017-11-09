const Express = require('express');
const Rivescript = require('rivescript');
const bodyParser = require('body-parser');

//creating app and server
const app = Express();
app.listen(8080);
app.use(Express.static('public'));

// Creating bot

const bot = new Rivescript();
bot.loadFile('./brain.rive', function(){
    bot.sortReplies();
  },function(error){
    console.log(error);
  })

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
// create json parser
var jsonParser = bodyParser.json();



app.get('/', function(req,res){
    res.send('hello world');

});

app.post('/api/v1/answerme',jsonParser, function(req, res){
    const userquestion = req.body.question;
    console.log(req.body.question);
    const reply = bot.reply('local-user', userquestion);

    //building conversation
    const conversation={question: req.body.question, answer:reply}
    res.setHeader('Content-Type', 'application/json');
    res.json(conversation);

});
