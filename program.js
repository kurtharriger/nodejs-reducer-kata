
var fs = require('fs');
var assert = require('assert');


// reduce list of key,count into map[key] = total
var reducer = function(acc, item) {
    
}

var testReducer = function() {
  var lines = [];
  lines.push("John,2");
  lines.push("Jane,3");
  lines.push("John,4");
  lines.push("Jane,5");
  var result = lines.reduce(reducer, {});
  assert.ok(result["John"] == 6, "total for John should be 6");
  assert.ok(result["Jane"] == 8, "total for Jane should be 8");  
}


var reduceFileData = function(data) {    
  var lines = data.split('\n');
  console.log(lines);

  var result = lines.reduce(reducer, {});
  console.log(result);
  
    
}

var displaySummary = function(summary) {
  process.stdout.write("The total for John is " + summary["John"] + ".");
  process.stdout.write("The total for Jane is " + summary["Jane"] + ".");
}


testReducer();

/*
  fs.readFile('data.txt', 'utf-8', function(err, data) {
    if(err) throw err;

    var summary = reduceFileData(data);
    displaySummary(summary);  
  });
*/