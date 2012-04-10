(function() {
  var encryption;

  encryption = {
    secret: (function(value) {
      var i, _ref, _results;
      _results = [];
      for (i = 0, _ref = value.length; i < _ref; i += 1) {
        _results.push(value.charCodeAt(i));
      }
      return _results;
    })('Martina'),
    hexIndex: (function(min, max) {
      var hex, i, _results;
      _results = [];
      for (i = min; i <= max; i += 1) {
        _results.push((hex = i.toString(16)).length === 1 ? '0' + hex : hex);
      }
      return _results;
    })(0, 255),
    dehexIndex: (function(min, max) {
      var hex, i, obj;
      obj = {};
      for (i = min; i <= max; i += 1) {
        if ((hex = i.toString(16)).length === 1) hex = '0' + hex;
        obj[hex] = i;
      }
      return obj;
    })(0, 255),
    /**
    	* Get the encrypted value
    	* @namespace App
    	* @param value {string}
    	* @return {string}
    */
    crypt: function(value) {
      var i, j, result, _ref;
      j = this.secret.length;
      result = "";
      for (i = 0, _ref = value.length; i < _ref; i += 1) {
        result += this.hexIndex[value.charCodeAt(i) ^ this.secret[i % j]];
      }
      return result;
    },
    /**
    	* Get the decrypted value
    	* @namespace App
    	* @param value {string}
    	* @return {string}
    */
    decrypt: function(value) {
      var i, j, result, _ref;
      j = this.secret.length;
      result = "";
      for (i = 0, _ref = value.length; i < _ref; i += 2) {
        result += String.fromCharCode(this.dehexIndex[value.substr(i, 2)] ^ this.secret[(i / 2) % j]);
      }
      return result;
    }
  };

  if (exports) {
    module.exports = encryption;
  } else {
    window.encryption = encryption;
  }

  /*
  # Benchmark
  i = 1000000
  
  console.time 'Benchmark'
  encryption.decrypt encryption.crypt 'olle.broms@ewebbyran.se' while(i--)
  console.timeEnd 'Benchmark'
  */

}).call(this);
