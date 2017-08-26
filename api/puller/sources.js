var Job = require("./Job");

module.exports = [
  {
    name: 'github',
    id: 1,
    options: {
      hostname: 'jobs.github.com',
      port: 443,
      path: '/positions.json',
      qs: {location: "remote"},
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    },
    map: function (job) {
      return{
        source: this.name,
        sourceId: this.id,
        originalId: job.id,
        url: job.url,
        publishedAt: new Date(job.created_at),
        position: job.title,
        description: job.description,
        company: job.company,
        logo: job.company_logo,
        techs: []
      }
    },
    normalize: function (rawJobs) {
      var jobs = [];
      for (var i = 0; i < rawJobs.length; i++) {
        var rawJob = this.map(rawJobs[i]);
        jobs.push(new Job(rawJob));
      }
      return jobs;
    }
  },
  {
    name: 'remoteok',
    id: 2,
    options: {
      hostname: 'remoteok.io',
      port: 443,
      path: '/remote-jobs.json',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    },
    map: function (job) {
      return{
        source: this.name,
        sourceId: this.id,
        originalId: job.id,
        url: job.url,
        publishedAt: new Date(job.date),
        position: job.position,
        description: job.description,
        company: job.company,
        logo: job.logo,
        techs: job.tags
      }
    },
    normalize: function (rawJobs) {
      var jobs = [];
      for (var i = 0; i < rawJobs.length; i++) {
        var rawJob = this.map(rawJobs[i]);
        jobs.push(new Job(rawJob));
      }
      return jobs;
    }
  }
];