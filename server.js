var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
app.use(morgan('combined'));
var path = require('path');
var pool = require('pg').Pool;
var crypto = require('crypto');

var config = 
{
    user: 'ahujaaditya7',
    database: 'ahujaaditya7',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
    
};

var articles = {
    
   'article-one': {  
       title: 'Article one by aditya',
       heading:'Article one',
       date: '22 feburary, 2018',
       content: `
             <p>
                The article contains all the shit that runs through my mind.
             </p>
             <p>
                Not so important paragraph. don't waste your time reaing this. Get a life 
             </p>
             <p>
                 if you are reading keep one thing in mind that you are a complete asshole fuckface dickhead.
             </p> `
             
   } ,
   'article-two': {
         title: 'Article two by aditya',
         heading:'Article two'  ,
     date: '23 feburary, 2018' ,
         content:  `
             <p>
                The article two contains all the shit that runs through your mind.
             </p>
             <p>
                Not so important paragraph. don't waste your time reaing this. Get a life 
             </p> `
           },
    'article-three' : {
          title: 'Article three by aditya',
         heading:'Article three'  ,
     date: '24 feburary, 2018' ,
         content:  `
             <p>
                The article three contains all the shit that runs through everyone's mind.
             </p>
             <p>
                Not so important paragraph. don't waste your time reaing this. Get a life asshole. 
             </p> `
    }
           
};
function createTemplate (data){
    var title= data.title;
    var heading= data.heading;
    var date= data.date;
    var content= data.content;
    
var htmltemplate = `
   <html>
    <head>
        <title>${title}</title>
       <link href="/ui/style.css" rel="stylesheet" />
    </head>
 <body>
     <div class='container'>
           <a href= '/'>Home</a>
           <hr/>
          <h3>${heading}</h3>
     <div>
        ${date}
     </div>
         <div>
           ${content}
      </div>
 </body>    
</html>
`;
return htmltemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return hashed.toString('hex');
}

app-get('/hash/:input', function(req, res) {
    
    var hashedString = hash(req.params.input, 'some-string');
    res.send(hashedString);
    
});
var pool = new Pool(config);
app.get('/test-db', function(req,res) {
    pool.query('Select * from test', function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else {
            res.send(JSON.stringify(result));
        }
        
    }
    
    );
    
});
var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
   res.send(counter.toString());
});
var names = [];
app.get('/submit-name', function(req,res){
    
    var name= req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});


app.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName;    
  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
