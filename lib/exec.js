var _ = require('underscore');

/**
 * Represents an Exec
 * @param {Object} modem docker-modem
 * @param {String} id    Exec's ID
 */
var Exec = function(modem, id) {
  this.modem = modem;
  this.id = id;
};

/**
 * Start the exec call that was setup.
 *
 * @param {object} options
 * @param {function} callback
 */
Exec.prototype.start = function(opts, callback) {
  if (!callback && typeof(opts) === 'function') {
    callback = opts;
    opts = {};
  }

  var optsf = {
    path: '/exec/' + this.id + '/start',
    method: 'POST',
    isStream: true,
    openStdin: opts.stdin,
    statusCodes: {
      200: true,
      404: "no such exec",
      500: "container not running"
    },
    options: opts
  };

  this.modem.dial(optsf, function(err, data) {
    callback(err, data);
  });
};

/**
 * Resize the exec call that was setup.
 *
 * @param {object} options
 * @param {function} callback
 */
Exec.prototype.resize = function(opts, callback) {
  if (!callback && typeof(opts) === 'function') {
    callback = opts;
    opts = null;
  }
  var optsf = {
    path: '/exec/' + this.id + '/resize?',
    method: 'POST',
    statusCodes: {
      200: true,
      404: "no such exec",
      500: "container not running"
    },
    options: opts
  };

  this.modem.dial(optsf, function(err, data) {
    callback(err, data);
  });
};


module.exports = Exec;
