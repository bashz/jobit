/**
 * BotController
 *
 * @description :: Server-side logic for managing bots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var sendAPI = require('../utils/sendAPI');
var normalizer = require('../utils/normalize');

unreconizedPostback = function (postback) {
  sails.log.warn("Recived an unreconized postback, as bellow :");
  sails.log.info(postback);
};
fallback = function (err, info) {
  sails.log.info(new Date());
  if (err)
    return sails.log.error(err);
  sails.log.info(info);
};
reportError = function (user, err) {
  if (err)
    return sendAPI.reportError(user, err, fallback);
};

module.exports = {
  subscribe: function (req, res) {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === sails.config.parameters.validationToken) {
      sails.log.info("Validating webhook");
      res.ok(req.query['hub.challenge']);
    } else {
      sails.log.error("Failed validation. Make sure the validation tokens match.");
      res.forbidden({err: "Failed validation. Make sure the validation tokens match."});
    }
  },
  handleMessage: function (req, res) {
    var data = req.allParams();
    data.entry.forEach(function (entry) {
      entry.messaging.forEach(function (messaging) {
        //Uncomment to display the famous typing 3 dots to the user until your bot reply
        //sendAPI.typingOn(message.sender.id, function (m) {
        //  return;
        //});
        getUser(messaging.sender, function (err, user) {
          if (err)
            sails.log.error(err);
          if (messaging.message) {
            
          } else if (messaging.postback) {
            try {
              var payload = JSON.parse(messaging.postback.payload);
            }catch(e) {
              reportError(user, e);
            }
            if (payload.action === "RECENT") {
              var page = payload.page || 0;
              return Job.recent(page, reportError, function (jobs) {
                var options = {payload: JSON.stringify({action: "RECENT", page: page + 1})};
                sendAPI.list(user, normalizer.jobs(jobs), options, fallback);
              });
            }
          } else if (messaging.optin) {
            /*
             * Authorization Event
             *
             * The value for 'messaging.optin.ref' is defined in the entry point.
             * For the "Send to Messenger" plugin, it is the 'data-ref' field. 
             * https://developers.facebook.com/docs/messenger-platform/webhook-reference/authentication
             *
             */
            return;
          } else if (messaging.delivery) {
            /*
             * Delivery Confirmation Event
             *
             * This event is sent to confirm the delivery of a messaging.
             * https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-delivered
             *
             */
            return;
          } else if (messaging.read) {
            /*
             * Message Read Event
             *
             * This event is called when a previously-sent message has been read.
             * https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-read
             * 
             */
            return;
          } else if (messaging.account_linking) {
            /*
             * Account Link Event
             *
             * This event is called when the Link Account or UnLink Account action has been tapped.
             * https://developers.facebook.com/docs/messenger-platform/webhook-reference/account-linking
             * 
             */
            return;
          } else
            sails.log.error("unknow message type recieved: " + messaging);
        });
      });
    });
    res.ok();
  },
  authorize: function (req, res) {
    var accountLinkingToken = req.query.account_linking_token;
    var redirectURI = req.query.redirect_uri;
    // authCode must be a generated unique string
    var authCode = "1234567890";
    var redirectURISuccess = redirectURI + "&authorization_code=" + authCode;

    res.render('authorize', {
      accountLinkingToken: accountLinkingToken,
      redirectURI: redirectURI,
      redirectURISuccess: redirectURISuccess
    });
  }
};

getUser = function (sender, cb) {
  if (!sender)
    cb('can not find sender', null);
  User.findOne({fbId: sender.id})
      .exec(function (err, user) {
        if (err)
          cb(err, null);
        if (!user) {
          User.createFromFb(sender.id, function (err, user) {
            if (!err)
              sendAPI.welcome(user, function (message) {
                sendAPI.typingOff(user, function (message) {
                  cb(err, user);
                });
              });
          });
        } else {
          cb(null, user);
        }
      });
};