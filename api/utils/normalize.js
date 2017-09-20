var JobItem = require("./jobItem");

module.exports = {
  jobs: function (jobs) {
    var items = [];
    for (var i = 0; i < jobs.length; i++) {
      items.push(new JobItem(jobs[i]));
    }
    return items;
  }
}