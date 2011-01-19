
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

var write = process.stdout.write;
var displaySummary = function(summary) {
  for(key in summary) {
      write("The total for " + key + " is " + summary[key] + ".");
  }
}


var reduceFileData = function(data) {    
  var lines = data.split('\n');
  var summary = lines.reduce(reducer, {});
  displaySummary(summary);
}


var assert = require('assert');

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



var test_displaySummary = function(summary) {
  var data = [];
  write = function(msg) { data.push(msg); }
  displaySummary( { A:1, B:2, C:3 } );
  assert.ok(data.length == 3)
  assert.ok(data[0] == "The total for A is 1."); 
  assert.ok(data[1] == "The total for B is 2.");
  assert.ok(data[2] == "The total for C is 3.");
}

var run_tests = function() {
  test_displaySummary();
  test_getCount();
  test_reducer();    
}

exports.invalidFormatMessage = invalidFormatMessage;
exports.reduceFileData = reduceFileData;
exports.run_tests = run_tests;