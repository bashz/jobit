var Job = function (entry) {
  this.sourceId = entry.sourceId;
  this.source = entry.source;
  this.originalId = entry.originalId;
  this.url = entry.url;
  this.publishedAt = entry.publishedAt;
  this.position = entry.position;
  this.description = entry.description;
  this.company = entry.company;
  this.logo = entry.logo;
  this.tags = entry.tags;
};
module.exports = Job;