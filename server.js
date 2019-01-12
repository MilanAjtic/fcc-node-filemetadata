'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer  = require('multer')
var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    var filePath = path.parse(file.originalname)
    cb(null, filePath.name + " - " + Date.now() + filePath.ext)
  }
})
 
var upload = multer({ storage: storage })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res){
  res.json({name: req.file.originalname, size: req.file.size})
})

app.listen(5000, function () {
  console.log('Node.js listening ...');
});
