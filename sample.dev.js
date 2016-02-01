;(function (global) {
  "use strict";
  var $ = require('jquery');
  var lib = function(){};

  lib.prototype = {
    setContent: function(className) {
      var elm = document.querySelector('.' + className);
      elm.innerHTML = "contents";
    },
    ajaxRequest: function(className) {
      $.ajax({
        'method': 'post',
        'url': '/path/to/api',
        'data-Type': 'json'
      }).done(function(res){
        var elm = document.querySelector('.' + className);
        elm.innerHTML = res.data.trim();
      });
    }
  };

  if (typeof define === 'function' && define.amd) {
      define(function() { return lib; });
  } else if (typeof exports === 'object') {
      module.exports = lib;
  } else {
      global.lib = lib;
  }
})(this);
