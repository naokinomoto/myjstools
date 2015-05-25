var Queue = require('./queue').Queue,
    Util = require('./util').Util;

var JobQueue = function(config, items) {
  var queue = new Queue(items);
  queue.callback = function(item) {
    var name, task, sync, args;
    if ((!Util.isArray(item)) || (item.length < 1)) return;
    args = item;
    name = args.shift();
    if ((!name) ||
        (config[name] === (void 0)) ||
        (config[name].task === (void 0))) {
        return;
    }
    task = config[name].task;
    sync = config[name].sync;
    if (sync === true) {
      queue.suspend();
      args.push(function() {
        queue.resume();
      });
      task.apply(task, args);
    } else {
      task.apply(task, args);
    }
  };
  queue.start();
  return {
    push: function(item) {
      if ((!Util.isArray(item)) || (item.length < 1)) return;
      queue.push(item);
    }
  };
};

exports.JobQueue = JobQueue;