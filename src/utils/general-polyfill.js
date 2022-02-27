window.openHashUrl = (url, prefix = '') => {
    console.log(`${window.location.origin}${window.location.pathname}${prefix}#${url}`)
    window.open(`${window.location.origin}${window.location.pathname}${prefix}#${url}`)
  }
  
  window.matchMedia || (window.matchMedia = function() {
      'use strict';
  
      // For browsers that support matchMedium api such as IE 9 and webkit
      var styleMedia = (window.styleMedia || window.media)
  
      // For those that don't support matchMedium
      if (!styleMedia) {
          var style = document.createElement('style'),
              script = document.getElementsByTagName('script')[0],
              info = null
  
          style.type = 'text/css'
          style.id = 'matchmediajs-test.scss'
  
          script.parentNode.insertBefore(style, script)
  
          // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
          info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle
  
          styleMedia = {
              matchMedium: function(media) {
                  var text = '@media ' + media + '{ #matchmediajs-test.scss { width: 1px; } }'
  
                  // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                  if (style.styleSheet) {
                      style.styleSheet.cssText = text
                  } else {
                      style.textContent = text
                  }
  
                  // Test if media query is true or false
                  return info.width === '1px'
              }
          }
      }
  
      return function(media) {
          return {
              matches: styleMedia.matchMedium(media || 'all'),
              media: media || 'all'
          }
      };
  }())
  
  if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function(searchElement, fromIndex) {
  
          var k
  
          // 1. Let o be the result of calling ToObject passing
          //    the this value as the argument.
          if (this == null) {
              throw new TypeError('"this" is null or not defined')
          }
  
          var o = Object(this)
  
          // 2. Let lenValue be the result of calling the Get
          //    internal method of o with the argument "length".
          // 3. Let len be ToUint32(lenValue).
          var len = o.length >>> 0
  
          // 4. If len is 0, return -1.
          if (len === 0) {
              return -1
          }
  
          // 5. If argument fromIndex was passed let n be
          //    ToInteger(fromIndex); else let n be 0.
          var n = fromIndex | 0
  
          // 6. If n >= len, return -1.
          if (n >= len) {
              return -1
          }
  
          // 7. If n >= 0, then Let k be n.
          // 8. Else, n<0, Let k be len - abs(n).
          //    If k is less than 0, then let k be 0.
          k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)
  
          // 9. Repeat, while k < len
          while (k < len) {
              // a. Let Pk be ToString(k).
              //   This is implicit for LHS operands of the in operator
              // b. Let kPresent be the result of calling the
              //    HasProperty internal method of o with argument Pk.
              //   This step can be combined with c
              // c. If kPresent is true, then
              //    i.  Let elementK be the result of calling the Get
              //        internal method of o with the argument ToString(k).
              //   ii.  Let same be the result of applying the
              //        Strict Equality Comparison Algorithm to
              //        searchElement and elementK.
              //  iii.  If same is true, return k.
              if (k in o && o[k] === searchElement) {
                  return k
              }
              k++
          }
          return -1
      };
  }
  
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (prefix){
      return this.slice(0, prefix.length) === prefix
    }
  }
  
  /**
  * Does the browser not have the FileReader already
  */
  (function () {
    if (('FileReader' in window)) {
      return
    }
  
    /**
     * Base64 Encoding as documented at...
     * http://www.webtoolkit.info/javascript-base64.html
     */
    /*
    * base64.js - Base64 encoding and decoding functions
    *
    * See: http://developer.mozilla.org/en/docs/DOM:window.btoa
    *      http://developer.mozilla.org/en/docs/DOM:window.atob
    *
    * Copyright (c) 2007, David Lindquist <david.lindquist@gmail.com>
    * Released under the MIT license
    *
    * Modified by Andrew Dodson
    */
    window.btoa = function(s) {
      var c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
        e = [],
        i = 0,
        b,
        buf
  
      while (i < s.length) {
        b = [s.charCodeAt(i++), s.charCodeAt(i++), s.charCodeAt(i++)]
        buf = (b[0] << 16) + ((b[1] || 0) << 8) + (b[2] || 0)
        e.push(
          c.charAt((buf & (63 << 18)) >> 18),
          c.charAt((buf & (63 << 12)) >> 12),
          c.charAt(isNaN(b[1]) ? 64 : (buf & (63 << 6)) >> 6),
          c.charAt(isNaN(b[2]) ? 64 : (buf & 63))
        )
      }
      return e.join('')
    }
  
    window.atob = function(s) {
      var c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
        buf,
        a = b = d = [],
        j = i = 0
  
      if ((s.length % 4 != 0) || (new RegExp('[^' + c + ']').test(s)) || (/=/.test(s) && (/=[^=]/.test(s) || /={3}/.test(s))))
        throw new Error('Invalid base64 data')
  
      while (i < s.length) {
        j = i
        a = []
        for (; i < j + 4; i++)
          a.push(c.indexOf(s.charAt(i)))
  
        buf = (a[0] << 18) + (a[1] << 12) + ((a[2] & 63) << 6) + (a[3] & 63)
        b = [((buf & (255 << 16)) >> 16), ((a[2] == 64) ? -1 : (buf & (255 << 8)) >> 8), ((a[3] == 64) ? -1 : (buf & 255))]
  
        for (j = 0; j < 3; j++)
          if (b[j] >= 0 || j === 0)
            d.push(String.fromCharCode(b[j]))
      }
      return d.join('')
    }
  
    /**
    * Add FileReader to the window object
    */
    window.FileReader = function () {
  
      this.onload
      this.result
      this.readAsDataURL = function (file) {
        // Use the extension from the filename to determine the MIME-TYPE
        this.read('data:' + file.type + ';base64,' + file.data)
      };
      this.readAsBinaryString = function (file) {
        this.read(atob(file.data))
      };
      this.readAsText = function (file, encoding) {
        this.read(atob(file.data))
      };
      this.readAsArrayBuffer = function (file) {
        throw ('Whoops FileReader.readAsArrayBuffer is unimplemented')
      }
  
      // Generic response
      // Passes a fake ProgressEvent
      this.read = function (result, opt) {
        this.result = result
        if (this.onload) {
          this.onload({
            target: { result: result }
          })
        }
        else throw ('Please define the onload event handler first')
      };
    }
  })();
  
  /* Blob.js
   * A Blob implementation.
   * 2014-07-24
   *
   * By Eli Grey, http://eligrey.com
   * By Devin Samarin, https://github.com/dsamarin
   * License: X11/MIT
   *   See https://github.com/eligrey/Blob.js/blob/master/LICENSE.md
   */
  
  /*global self, unescape */
  /*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
    plusplus: true */
  
  /*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */
  
  (function (view) {
    'use strict';
  
    view.URL = view.URL || view.webkitURL
  
    if (view.Blob && view.URL) {
      try {
        new Blob
        return;
      } catch (e) {}
    }
  
    // Internally we use a BlobBuilder implementation to base Blob off of
    // in order to support older browsers that only have BlobBuilder
    var BlobBuilder = view.BlobBuilder || view.WebKitBlobBuilder || view.MozBlobBuilder || (function(view) {
      var
          get_class = function(object) {
          return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1]
        }
        , FakeBlobBuilder = function BlobBuilder() {
          this.data = []
        }
        , FakeBlob = function Blob(data, type, encoding) {
          this.data = data
          this.size = data.length
          this.type = type
          this.encoding = encoding
        }
        , FBB_proto = FakeBlobBuilder.prototype
        , FB_proto = FakeBlob.prototype
        , FileReaderSync = view.FileReaderSync
        , FileException = function(type) {
          this.code = this[this.name = type]
        }
        , file_ex_codes = (
            'NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR '
          + 'NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR'
        ).split(' ')
        , file_ex_code = file_ex_codes.length
        , real_URL = view.URL || view.webkitURL || view
        , real_create_object_URL = real_URL.createObjectURL
        , real_revoke_object_URL = real_URL.revokeObjectURL
        , URL = real_URL
        , btoa = view.btoa
        , atob = view.atob
  
        , ArrayBuffer = view.ArrayBuffer
        , Uint8Array = view.Uint8Array
  
        , origin = /^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/
      
      FakeBlob.fake = FB_proto.fake = true
      while (file_ex_code--) {
        FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1
      }
      // Polyfill URL
      if (!real_URL.createObjectURL) {
        URL = view.URL = function(uri) {
          var
              uri_info = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
            , uri_origin
          
          uri_info.href = uri
          if (!('origin' in uri_info)) {
            if (uri_info.protocol.toLowerCase() === 'data:') {
              uri_info.origin = null
            } else {
              uri_origin = uri.match(origin)
              uri_info.origin = uri_origin && uri_origin[1]
            }
          }
          return uri_info
        };
      }
      URL.createObjectURL = function(blob) {
        var
            type = blob.type
          , data_URI_header
        
        if (type === null) {
          type = 'application/octet-stream';
        }
        if (blob instanceof FakeBlob) {
          data_URI_header = 'data:' + type
          if (blob.encoding === 'base64') {
            return data_URI_header + ';base64,' + blob.data
          } else if (blob.encoding === 'URI') {
            return data_URI_header + ',' + decodeURIComponent(blob.data)
          } if (btoa) {
            return data_URI_header + ';base64,' + btoa(blob.data)
          } else {
            return data_URI_header + ',' + encodeURIComponent(blob.data)
          }
        } else if (real_create_object_URL) {
          return real_create_object_URL.call(real_URL, blob)
        }
      }
      URL.revokeObjectURL = function(object_URL) {
        if (object_URL.substring(0, 5) !== 'data:' && real_revoke_object_URL) {
          real_revoke_object_URL.call(real_URL, object_URL)
        }
      }
      FBB_proto.append = function(data/*, endings*/) {
        var bb = this.data
        // decode data to a binary string
        if (Uint8Array && (data instanceof ArrayBuffer || data instanceof Uint8Array)) {
          var
              str = ''
            , buf = new Uint8Array(data)
            , i = 0
            , buf_len = buf.length
          
          for (; i < buf_len; i++) {
            str += String.fromCharCode(buf[i])
          }
          bb.push(str)
        } else if (get_class(data) === 'Blob' || get_class(data) === 'File') {
          if (FileReaderSync) {
            var fr = new FileReaderSync
            bb.push(fr.readAsBinaryString(data))
          } else {
            // async FileReader won't work as BlobBuilder is sync
            throw new FileException('NOT_READABLE_ERR')
          }
        } else if (data instanceof FakeBlob) {
          if (data.encoding === 'base64' && atob) {
            bb.push(atob(data.data))
          } else if (data.encoding === 'URI') {
            bb.push(decodeURIComponent(data.data))
          } else if (data.encoding === 'raw') {
            bb.push(data.data)
          }
        } else {
          if (typeof data !== 'string') {
            data += ''; // convert unsupported types to strings
          }
          // decode UTF-16 to binary string
          bb.push(unescape(encodeURIComponent(data)))
        }
      }
      FBB_proto.getBlob = function(type) {
        if (!arguments.length) {
          type = null
        }
        return new FakeBlob(this.data.join(''), type, 'raw')
      };
      FBB_proto.toString = function() {
        return '[object BlobBuilder]';
      }
      FB_proto.slice = function(start, end, type) {
        var args = arguments.length
        if (args < 3) {
          type = null
        }
        return new FakeBlob(
            this.data.slice(start, args > 1 ? end : this.data.length)
          , type
          , this.encoding
        )
      };
      FB_proto.toString = function() {
        return '[object Blob]';
      }
      FB_proto.close = function() {
        this.size = 0
        delete this.data
      };
      return FakeBlobBuilder
    }(view))
  
    view.Blob = function(blobParts, options) {
      var type = options ? (options.type || '') : '';
      var builder = new BlobBuilder()
      if (blobParts) {
        for (var i = 0, len = blobParts.length; i < len; i++) {
          if (Uint8Array && blobParts[i] instanceof Uint8Array) {
            builder.append(blobParts[i].buffer)
          }
          else {
            builder.append(blobParts[i])
          }
        }
      }
      var blob = builder.getBlob(type)
      if (!blob.slice && blob.webkitSlice) {
        blob.slice = blob.webkitSlice
      }
      return blob
    };
  
    var getPrototypeOf = Object.getPrototypeOf || function(object) {
      return object.__proto__
    };
    view.Blob.prototype = getPrototypeOf(new view.Blob())
  }(typeof self !== 'undefined' && self || typeof window !== 'undefined' && window || this.content || this));
  
  
  /*
   * FormData for XMLHttpRequest 2  -  Polyfill for Web Worker
   * (c) 2014 Rob Wu <rob@robwu.nl>
   * License: MIT
   * - append(name, value[, filename])
   * - XMLHttpRequest.prototype.send(object FormData)
   *
   * Specification: http://www.w3.org/TR/XMLHttpRequest/#formdata
   *                http://www.w3.org/TR/XMLHttpRequest/#the-send-method
   * The .append() implementation also accepts Uint8Array and ArrayBuffer objects
   * Web Workers do not natively support FormData:
   *                http://dev.w3.org/html5/workers/#apis-available-to-workers
   * Originally released in 2012 as a part of http://stackoverflow.com/a/10002486.
   * Updates since initial release:
   * - Forward-compatibility by testing whether FormData exists before defining it.
   * - Increased robustness of .append.
   * - Allow any typed array in .append.
   * - Remove use of String.prototype.toString to work around a Firefox bug.
   * - Use typed array in xhr.send instead of arraybuffer to get rid of deprecation
   *   warnings.
   **/
  (function(exports) {
      if (exports.FormData) {
          // Don't replace FormData if it already exists
          return
      }
      // Export variable to the global scope
      exports.FormData = FormData
  
      var ___send$rw = XMLHttpRequest.prototype.send
      XMLHttpRequest.prototype.send = function(data) {
          if (data instanceof FormData) {
              if (!data.__endedMultipart) data.__append('--' + data.boundary + '--\r\n')
              data.__endedMultipart = true
              this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + data.boundary)
              data = new Uint8Array(data.data)
          }
          // Invoke original XHR.send
          return ___send$rw.call(this, data)
      };
  
      function FormData() {
          // Force a Constructor
          if (!(this instanceof FormData)) return new FormData()
          // Generate a random boundary - This must be unique with respect to the form's contents.
          this.boundary = '------RWWorkerFormDataBoundary' + Math.random().toString(36)
          var internal_data = this.data = []
          /**
          * Internal method.
          * @param inp String | ArrayBuffer | Uint8Array  Input
          */
          this.__append = function(inp) {
              var i = 0, len
              if (typeof inp == 'string') {
                  for (len = inp.length; i < len; ++i)
                      internal_data.push(inp.charCodeAt(i) & 0xff)
              } else if (inp && inp.byteLength) {/*If ArrayBuffer or typed array */
                  if (!('byteOffset' in inp)) /* If ArrayBuffer, wrap in view */
                      inp = new Uint8Array(inp)
                  for (len = inp.byteLength; i < len; ++i)
                      internal_data.push(inp[i] & 0xff)
              }
          }
      }
  
      var get_class = function(object) {
          return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1]
        }
      /**
      * @param name     String                                   Key name
      * @param value    String|Blob|File|typed array|ArrayBuffer Value
      * @param filename String                                   Optional File name (when value is not a string).
      **/
      FormData.prototype.append = function(name, value, filename) {
          if (this.__endedMultipart) {
              // Truncate the closing boundary
              this.data.length -= this.boundary.length + 6
              this.__endedMultipart = false
          }
          if (arguments.length < 2) {
              throw new SyntaxError('Not enough arguments')
          }
          var part = '--' + this.boundary + '\r\n' +
                  'Content-Disposition: form-data; name="' + name + '"'
  
          if (get_class(value) === 'Blob' || get_class(value) === 'File') {
              return this.append(name,
                              new Uint8Array(new FileReaderSync().readAsArrayBuffer(value)),
                              filename || value.name)
          } else if (typeof value.byteLength == 'number') {
              // Duck-typed typed array or array buffer
              part += '; filename="' + (filename || 'blob').replace(/"/g, '%22') + '"\r\n'
              part += 'Content-Type: application/octet-stream\r\n\r\n'
              this.__append(part)
              this.__append(value)
              part = '\r\n'
          } else {
              part += '\r\n\r\n' + value + '\r\n'
          }
          this.__append(part)
      };
  })(this || self)
  