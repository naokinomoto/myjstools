var Util = {
  encode: function(val) {
    return typeof(encodeURIComponent) !== "undefined" ? encodeURIComponent(val) : escape(val);
  },
  hasAJAX: function() {
    if ((window.ActiveXObject && !window.XDomainRequest) || (window.opera)) {
      return false;
    }
    return true;
  },
  map2QueryString: function(map, encoded) {
    var list = [],
        key;
    for (key in map) {
      var val = map[key];
      if (val !== (void 0) && val !== null) {
        val = encoded ? val : Util.encode(val);
        list.push(key + "=" + val);
      }
    }
    return list.length > 0 ? "?" + list.join("&") : "";
  },
  map2ParamString: function(map, encoded) {
    var list = [],
        key;
    for (key in map) {
      var val = map[key];
      if (val !== (void 0) && val !== null) {
        val = encoded ? val : Util.encode(val);
        list.push(key + "=" + val);
      }
    }
    return list.length > 0 ? list.join("&") : "";
  },
  bindEvent: function(element, eventName, callback, useCapture) {
    if (element.addEventListener) {
      element.addEventListener(eventName, callback, useCapture);
    } else if (element.attachEvent ) {
      element.attachEvent('on' + eventName, callback);
    }
  },
  bindLinkClick: function(target, fn) {
    Util.bindEvent(target, 'click', (function() {
      var url = target.href;
      return function(e) {
        if (fn) fn();
        e.preventDefault();
        setTimeout(function() {
          document.location = url;
        }, 100);
      };
    })(), false);
  },
  getElementsByClass: function(className) {
    var count = 0,
        result = [],
        allElements = document.getElementsByTagName("*"),
        len = allElements.length,
        re = new RegExp('(^|\\s)' + className + '(\\s|$)');

    for (var i = 0; i < len; i++) {
      if (re.test(allElements[i].className)) {
        result[count++] = allElements[i];
      }
    }
    return result;
  },
  getObjectKeys: function(o) {
    if (Object.keys) return Object.keys(o);
    var result = [];
    for(var name in o) {
      if (o.hasOwnProperty(name)) result.push(name);
    }
    return result;
  },
  indexOf: function(arr, val, start) {
    if (Array.prototype.indexOf) return (arr.indexOf(val, start));
    for (var i = (start || 0), j = arr.length; i < j; i++) {
      if (arr[i] === val) { return i; }
    }
    return -1;
  },
  getReferrerAsString: function() {
    return Util.encode(document.referrer);
  },
  getUrlAsString: function() {
    return Util.encode(location.href);
  },
  sleep: function(ms) {
    var end = (new Date()).getTime() + ms;
	while ((new Date()).getTime() < end) ;
  },
  isArray: function(obj) {
    return Util.isType("Array", obj);
  },
  isFunction: function(obj) {
    return Util.isType("Function", obj);
  },
  isString: function(obj) {
    return Util.isType("String", obj);
  },
  isType: function(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
  }
};
