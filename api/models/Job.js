/**
 * Job.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    sourceId: {
      type: "integer",
      index: true,
      required: true
    },
    source: {
      type: "string",
      required: true
    },
    originalId: {
      type: "string",
      index: true,
      required: true
    },
    url: {
      type: "string",
      required: true,
      url: true
    },
    publishedAt: {
      type: "date",
      required: true
    },
    position: {
      type: "string",
      required: true
    },
    description: {
      type: "text"
    },
    company: {
      type: "string"
    },
    logo: {
      type: "string"
    },
    tags: {
      type: "array"
    }
  }
};

