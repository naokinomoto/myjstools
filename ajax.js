var AJAX = function() {
  this.onerror = function(){};
  this.ontimeout = function(){};
  this.onload = function(result){};
};
AJAX.prototype = {
  ajax : function(url, timeout) {
    var self = this;
    var xhr;
    if (window.XDomainRequest) {
      xhr = new XDomainRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    }
    if (!xhr) return;
    if (window.XDomainRequest) {
      if (timeout) {
        xhr.timeout = timeout;
      } else {
        xhr.timeout = 1000;
      }
      if (typeof(self.onerror) == 'function') {
        xhr.onerror = self.onerror;
      }
      if (typeof(self.ontimeout) == 'function') {
        xhr.ontimeout = self.ontimeout;
      }
      xhr.onload = function() {
        if (typeof(self.onload) == 'function') {
          self.onload(xhr.responseText);
        }
      };
      xhr.onprogress = function() {};
      xhr.open('GET', url);
      xhr.send();
    } else {
      xhr.open('GET', url, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      var t = setInterval(function(){
        clearInterval(t);
        if (typeof(self.ontimeout) == 'function') {
          self.ontimeout();
        }
      }, timeout);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          clearInterval(t);
          if (xhr.status == 200 || xhr.status == 304) {
            if (typeof(self.onload) == 'function') {
              self.onload(xhr.responseText);
            }
          } else {
            if (typeof(self.onerror) == 'function') {
              self.onerror();
            }
          }
        }
      };
      xhr.send();
    }
  }
};
