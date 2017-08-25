/**
 * JobController
 *
 * @description :: Server-side logic for managing jobs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var persist = require("../puller/persist");

module.exports = {
  pull: function (req, res) {
    persist(function (err, result) {
      if (err) {
        if (!res.headersSent) {
          return res.json(err);
        }
      }
      res.json(result);
    });
  }
};

