var CookieUtil = {
  write : function(key, value, expires, domain) {
    if (!key || key === "" || !value) return;
    var valueStr = key + '=' + value + "; ",
        domainStr = 'domain=' + ((!domain || domain === "") ? document.domain : domain) + ";",
        pathStr = 'path=/; ',
        expiresStr = '';
    if (expires) {
      expiresStr = 'expires=' + (new Date((new Date()).getTime() + expires)).toGMTString() + "; ";
    }
    var cookieValue = valueStr + expiresStr + pathStr + domainStr;
    document.cookie = cookieValue;
  },
  read: function(key) {
    var cookieObj = this.getCookieObj();
    for (var cookieKey in cookieObj) {
      if (cookieKey === key) {
        return cookieObj[cookieKey];
      }
    }
    return '';
  },
  readMatchAll: function(reg) {
    var cookieObj = this.getCookieObj(),
        results = [];
    for (var cookieKey in cookieObj) {
      if (cookieKey.match(reg)) {
        results.push(cookieObj[cookieKey]);
      }
    }
    return results;
  },
  getCookieObj: function() {
    var cookies = document.cookie;
    if (!cookies || cookies === '') return {};
    var list = cookies.split(';'),
        result = {},
        len = list.length,
        i;
    for (i = 0; i < len; i++) {
      var cookieStr = (list[i] || "").replace( /^\s+/g,''),
          index = cookieStr.indexOf('='),
          key = cookieStr.substring(0, index),
          value = cookieStr.substring(key.length + 1);
      result[key] = value;
    }
    return result;
  },
  remove : function(key, domain) {
    if (!key || key === "") return;
    var setValue = key + '=; ';
    var setDomain = 'domain=' + ((!domain || domain === "") ? document.domain : domain) + "; ";
    var setPath = 'path=/; ';
    var setExpires = 'expires=' + (new Date((new Date()).getTime() - 1000)).toGMTString() + "; ";
    var cookieValue = setValue + setExpires + setPath + setDomain;
    document.cookie = cookieValue;
  },
  years : function(value) {
    return 1000 * 60 * 60 * 24 * 365 * value;
  },
  months : function(value) {
    return 1000 * 60 * 60 * 24 * 31 * value;
  },
  days : function(value) {
    return 1000 * 60 * 60 * 24 * value;
  },
  hours : function(value) {
    return 1000 * 60 * 60 * value;
  },
  minutes : function(value) {
    return 1000 * 60 * value;
  },
  seconds : function(value) {
    return 1000 * value;
  }
};

exports.CookieUtil = CookieUtil;