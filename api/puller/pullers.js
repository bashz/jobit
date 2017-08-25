var sources = require("./sources");
var pull = require("./pull");


var pullers = [];
for (var i = 0; i < sources.length; i++) {
  var source = sources[i];
  pullers.push(pull(source));
}

module.exports = pullers;