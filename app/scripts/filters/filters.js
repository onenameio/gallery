'use strict';

/* Filters */

angular.module('profileviewerApp')
.filter('capitalize', function() {
  return function(input) {
    return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }) : '';
  };
})
.filter('formatFacebookUsername', function() {
  return function(input) {
    if (input) {
      input = input.replace(/http.*facebook.com\//, '')
                   .replace(/^facebook.com\//, '');
    }
    if (input.toLowerCase().match(/^[a-z\d.]{5,}$/i)) {
      return input;
    } else {
      return null;
    }
  };
})
.filter('formatGithubUsername', function() {
  return function(input) {
    if (input) {
      input = input.replace(/http.*github.com\//, '')
                   .replace(/^github.com\//, '');
    }
    if (input.toLowerCase().match(/^[0-9a-z_-]+$/)) {
      return input;
    } else {
      return null;
    }
  };
})
.filter('formatTwitterUsername', function() {
  return function(input) {
    if (input) {
      input = input.replace(/^@/, '')
        .replace(/http.*twitter.com\//, '')
        .replace(/^twitter.com\//, '');
    }
    if (input.toLowerCase().match(/^[0-9a-z_]+$/)) {
      return input;
    } else {
      return null;
    }
  };
})
.filter('formatDomain', function() {
  function urlDomain(data) {
    var    a      = document.createElement('a');
           a.href = data;
    return a.hostname;
  }

  return function(input) {
    if (input) {
      var domain = urlDomain(input);
      return domain.replace('www.', '');
    }
    return null;
  };
})
.filter('pgpFingerprintChunks', function() {
  function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
  }

  return function(input, trim) {
    if (input) {
      input = replaceAll(' ', '', input);
      if (input.length > trim) {
        input = input.substr(input.length - trim);
      }
      return input.match(/.{1,4}/g);
    }
  };
})
;