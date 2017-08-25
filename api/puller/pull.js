var https = require('https');

var request = function (source, cb) {
  var req = https.request(source.options, function (res) {
    var body = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      try {
        var job = JSON.parse(body);
      } catch (err) {
        return cb(err, null);
      }
      if (!job)
        return cb(new Error('error while connecting to ' + source.name), null);
      return cb(null, job);
    });
  });
  req.on('error', function (err) {
    return cb(err, null);
  });
  req.end();
};

module.exports = function (source) {
  return function (callback) {
    request(source, function (err, data) {
      callback(err, source.normalize(data));
    });
  };
};