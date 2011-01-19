
var fs = require('fs');
var reducer = require('./lib/reducer');

fs.readFile('data.txt', 'utf-8', function(err, data) {
  if(err) throw err;
  reducer.reduceFileData(data);  
});