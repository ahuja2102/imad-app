var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
app.use(morgan('combined'));

var articleone = {
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
             </p>
          </div>`
    
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

app.get('/article-one', function (req, res) {
  res.send(createTemplate(articleone));
});
app.get('/article-two', function (req, res) {
    res.send('Article two requested and will be served here');
});

app.get('/article-three', function (req, res) {
    res.send('Article three requested and will be served here');
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
