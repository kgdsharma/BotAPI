const Express = require('express');
const https = require('https');


const app = new Express();
app.listen(5000);

var options={
    host:'jsonplaceholder.typicode.com',
    port: 443,
    path: '/posts/1',
    method : 'GET',
    // headers:{
    //     'content-type': 'application/json'
    // }
    
}

app.get('/', function(req,res){

    var rslt ='';

    getJSON(options, function(err,result){
        if(err){
            console.log('error in service calling',err);
        }
        console.log(result);
        rslt=result
        res.send(result);

    });

   

});

function getJSON(options, cb){
    https.request(options, function(res){
        var body ='';
        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end',function(){
            var result = JSON.parse(body);           
            cb(null,result);
        });

        res.on('error', cb);
    }).on('error',cb)
      .end();
    
}