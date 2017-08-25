var pullers = require("./pullers");

var updated = 0;
var found = 0;

module.exports = function (cb) {
  async.parallel(pullers, function (err, jobResults) {
    if (err)
      return sails.log.warn(err);
    async.each(jobResults, function (jobs, Callback) {
      async.each(jobs, function (job, callback) {
        Job.findOne({sourceId: job.sourceId, originalId: job.originalId}, function (err, exist) {
          if (err)
            return callback(err);
          if (!exist)
            Job.create(job, function (err, job) {
              if (err)
                return callback(err);
              sails.log.info("Added new job: " + job.position + " from source: " + job.source);
              updated++;
              found++;
              callback();
            });
          else {
            sails.log.info("Found an already existant job: " + exist.position + " from source: " + exist.source);
            found++;
            callback();
          }
        });
      }, function (err) {
        if (err)
          return Callback(err);
        Callback();
      });
    }, function (err) {
      if (err)
        cb(err, null);
      cb(null, {found: found, updated: updated});
    });
  });
}