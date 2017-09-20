/**
 * JobController
 *
 * @description :: Server-side logic for managing jobs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var persist = require("../puller/persist");

module.exports = {
  index: function(req, res) {
    var skip = req.param('page') ? parseInt(req.param('page')) : 0;
    Job.find().sort('publishedAt DESC').limit(50).skip(50 * skip).exec(function(err, jobs){
      if(err)
        return res.serverError(err);
      if(!jobs.length)
        return res.notFound();
      return res.json(jobs);
    });
  },
  count: function(req, res) {
    Job.count().exec(function(err, total){
      if(err)
        return res.serverError(err);
      return res.json({total: total});
    });
  },
  pull: function (req, res) {
    persist(function (err, result) {
      if (err) {
        if (!res.headersSent) {
          return res.serverError(err);
        }
      }
      res.json(result);
    });
  },
  refer: function(req, res) {
    
  }
};

