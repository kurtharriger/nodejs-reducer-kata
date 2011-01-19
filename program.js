
var fs = require('fs');
var assert = require('assert');

var invalidFormatMessage = "Data file is not properly formatted.";

var getKey = function(str) {
    return str.split(',')[0];
}
var getCount = function(str) {
    var count = parseInt(str.split(',')[1]);
    if(count > 0) return count;
    else throw invalidFormatMessage; 
}

// reduce list of key,count into map[key] = total
var reducer = function(acc, item) {
  var key = getKey(item);
  var count = getCount(item);
  acc[key] = (acc[key] || 0) + count;
  return acc;   
}

var test_getCount = function() {
    assert.ok( getCount("key,1") == 1, "should parse count");    
    assert.throws(function() { getCount("key,a"); }, invalidFormatMessage);

}
var test_reducer = function() {
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


test_getCount();
test_reducer();

/*
  fs.readFile('data.txt', 'utf-8', function(err, data) {
    if(err) throw err;

    var summary = reduceFileData(data);
    displaySummary(summary);  
  });
*/