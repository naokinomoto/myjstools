var Util = {
  loadCss: function(url) {
    var link = document.createElement("link"),
        head = document.getElementsByTagName('head');
    link.href = url + "?r=" + Math.floor(Math.random() * 10000);
    link.rel="stylesheet";
    link.type="text/css";
    link.charset="UTF-8";
    head.item(0).appendChild(link);
  },
  getCustomContent: function(name) {
    if (!name) return null;
    if (!window.__gyrrcm) return null;
    if (!window.__gyrrcm.extensions) return null;
    if (!window.__gyrrcm.extensions[name]) return null;
    return window.__gyrrcm.extensions[name].CustomContent;
  },
  bind: function(element, eventName, callback, useCapture) {
    if (element.addEventListener) {
      element.addEventListener(eventName, callback, useCapture);
    } else if (element.attachEvent ) {
      element.attachEvent('on' + eventName, callback);
    }
  },
  extend: function(dest, src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        dest[key] = src[key];
      }
    }
    return dest;
  },
  merge: function(obj1, obj2) {
    var result = {}, key;
    for (key in obj1) {
      result[key] = obj1[key];
    }
    for (key in obj2) {
      result[key] = obj2[key];
    }
    return result;
  },
  isType: function(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
  },
  isArray: function(obj) {
    return Util.isType("Array", obj);
  },
  encode: function(val) {
    return typeof(encodeURIComponent) !== "undefined" ? encodeURIComponent(val) : escape(val);
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
  }
};

exports.Util = Util;