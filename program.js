
var fs = require('fs');
var assert = require('assert');

// reduce list of key,count into map[key] = total
var reducer = function(acc, item) {
  
}

fs.readFile('data.txt', 'utf-8', function(err, data) {
  if(err) throw err;

  var lines = data.split('\n');
  console.log(lines);

  var result = lines.reduce(reducer, {});
  console.log(result);

  assert.ok(result["John"] == 6, "total for John should be 6");
  assert.ok(result["Jane"] == 8, "total for Jane should be 8");

  process.stdout.write("The total for John is " + result["John"] + ".");
  process.stdout.write("The total for Jane is " + result["Jane"] + ".");

});