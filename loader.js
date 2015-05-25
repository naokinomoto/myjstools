var ScriptLoader = function() {
  this.onerror = function(){};
  this.ontimeout = function(){};
  this.onload = function(){};
};
ScriptLoader.prototype = {
  load : function(url, timeout, isNoAjax) {
    var self = this,
        isAjax = isNoAjax ? !(isNoAjax) : true;
    if (Util.hasAJAX() && isAjax) {
      var ajax = new AJAX();
      ajax.onload = function(result) {
        var s = self.createScript();
        s.text = result;
        if (typeof(self.onload) == 'function') {
          self.onload();
        }
      };
      ajax.ontimeout = this.ontimeout;
      ajax.onerror = this.onerror;
      ajax.ajax(url, timeout);
    } else {
      self.loadScriptTag(url, timeout);
    }
  },
  loadScriptTag : function(url, timeout) {
    var self = this;
    setTimeout(function() {
      var s = self.createScript();
      var isTimeout = false;
      var t = setInterval(function() {
        clearInterval(t);
        isTimeout = true;
        if (typeof(self.ontimeout) == 'function') {
          self.ontimeout();
        }
      }, timeout);
      if (!document.addEventListener) {
        s.onreadystatechange = function() {
          if (s.readyState == 'loaded') {
            clearInterval(t);
            if (isTimeout) {
              return;
            }
            if (typeof(self.onload) == 'function') {
              self.onload();
            }
          }
        };
      } else {
        s.onload = function() {
          clearInterval(t);
          if (isTimeout) {
            return;
          }
          if (typeof(self.onload) == 'function') {
            self.onload();
          }
        };
      }
      s.setAttribute("async", "async");
      s.src = url;
    }, 50);
  },
  createScript : function() {
    var s = document.createElement('script'),
    h = document.getElementsByTagName('head')[0];
    h.appendChild(s);
    s.type = 'text/javascript';
    s.charset = 'UTF-8';
    return s;
  }
};
