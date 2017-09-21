var moment = require('moment');

var Job = function (job) {
  this.title = job.position;
  this.image_url = job.logo || (sails.config.parameters.serverURL + '/images/job96.png');
  this.subtitle = "Published: " + moment(job.publishedAt).fromNow() + "\n" +
      "Company: " + job.company;
  this.default_action = {
    type: "web_url",
    url: sails.config.parameters.serverURL,
    messenger_extensions: true,
    webview_height_ratio: "tall",
    fallback_url: sails.config.parameters.serverURL
  };
  this.buttons = [
    {
      title: "Apply Now!",
      type: "web_url",
      url: job.url
    }
  ];
};
module.exports = {
  list: function (jobs) {
    var items = [];
    for (var i = 0; i < jobs.length; i++) {
      items.push(new Job(jobs[i]));
    }
    return items;
  }
}