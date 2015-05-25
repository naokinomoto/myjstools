var Queue = function(queue, callback) {
  this.queue = queue || [];
  this.callback = callback;
  this.isRunning = false;
};
Queue.prototype = {
  push: function(item) {
    this.queue.push(item);
    if (this.queue.length === 1) {
      this.process();
    }
  },
  start: function() {
    this.isRunning = true;
    this.process();
  },
  resume: function() {
    this.isRunning = true;
    this.process();
  },
  suspend: function() {
    this.isRunning = false;
  },
  process: function() {
    var self = this, item;
    if (this.isRunning === false) return;
    if (self.queue.length > 0) {
      item = self.queue.shift();
      if (this.callback) this.callback(item);
      setTimeout(function() {
        if (self.queue.length > 0) {
          self.process();
        }
      }, 0);
    }
  }
};
exports.Queue = Queue;
