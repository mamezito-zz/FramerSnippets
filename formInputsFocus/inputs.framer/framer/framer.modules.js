require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"InputField":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.InputField = (function(superClass) {
  var INPUT_HIDE_PSUEDO_UI, INPUT_SELECTOR_NUMBER, INPUT_SELECTOR_SEARCH, PATTERN_NUMBER;

  extend(InputField, superClass);

  PATTERN_NUMBER = "[0-9]*";

  INPUT_HIDE_PSUEDO_UI = "{ -webkit-appearance: none; display: none; }";

  INPUT_SELECTOR_NUMBER = "input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button";

  INPUT_SELECTOR_SEARCH = "input[type=search]::-webkit-search-cancel-button";

  Events.Input = "InputField.OnInput";

  Events.Focus = "InputField.OnFocus";

  Events.Blur = "InputField.OnBlur";

  Events.Valid = "InputField.OnValid";

  Events.Invalid = "InputField.OnInvalid";

  Events.Match = "InputField.OnMatch";

  InputField.define("value", {
    get: function() {
      return this.input.value;
    },
    set: function(v) {
      if (!v) {
        return;
      }
      if (this.input) {
        return this.changeInputValue(v);
      }
    }
  });

  function InputField(options) {
    var base, base1, base10, base11, base2, base3, base4, base5, base6, base7, base8, base9, inputStyle, key, ref, val;
    this.options = options != null ? options : {};
    this.isNumber = false;
    this.isSearch = false;
    this.isEmpty = true;
    this.isValid = null;
    this.originalTextColor = null;
    if ((this.options.pattern != null) || (this.options.match != null)) {
      this.shouldCheckValidity = true;
    }
    if (this.options.lineHeight != null) {
      this.options.lineHeight = this.options.lineHeight + "px";
    }
    if ((base = this.options).name == null) {
      base.name = this.options.type + "Input";
    }
    if ((base1 = this.options).color == null) {
      base1.color = "black";
    }
    if ((base2 = this.options).backgroundColor == null) {
      base2.backgroundColor = "";
    }
    if ((base3 = this.options).borderRadius == null) {
      base3.borderRadius = 0;
    }
    if ((base4 = this.options).type == null) {
      base4.type = "text";
    }
    if ((base5 = this.options).fontSize == null) {
      base5.fontSize = 32;
    }
    if ((base6 = this.options).fontWeight == null) {
      base6.fontWeight = 300;
    }
    if ((base7 = this.options).fontFamily == null) {
      base7.fontFamily = "-apple-system, Helvetica Neue";
    }
    if ((base8 = this.options).lineHeight == null) {
      base8.lineHeight = 1.25;
    }
    if ((base9 = this.options).indent == null) {
      base9.indent = 0;
    }
    if ((base10 = this.options).placeHolderFocus == null) {
      base10.placeHolderFocus = null;
    }
    if ((base11 = this.options).placeHolderColor == null) {
      base11.placeHolderColor = null;
    }
    InputField.__super__.constructor.call(this, this.options);
    switch (this.options.type) {
      case "search":
        this.isSearch = true;
        break;
      case "number":
        this.isNumber = true;
        break;
      case "numbers-only":
      case "number-only":
        this.isNumber = true;
        this.options.type = this.options.pattern != null ? "number" : "text";
        this.options.pattern = this.options.pattern != null ? this.options.pattern : PATTERN_NUMBER;
    }
    this.html += (function() {
      switch (false) {
        case !this.isNumber:
          return "<style type='text/css'>" + INPUT_SELECTOR_NUMBER + INPUT_HIDE_PSUEDO_UI + "</style>";
        case !this.isSearch:
          return "<style type='text/css'>" + INPUT_SELECTOR_SEARCH + INPUT_HIDE_PSUEDO_UI + "</style>";
        default:
          return "";
      }
    }).call(this);
    if (this.options.placeHolderColor != null) {
      this.html += "<style type='text/css'>::-webkit-input-placeholder { color: " + this.options.placeHolderColor + "; } ::-moz-placeholder { color: " + this.options.placeHolderColor + "; } :-ms-input-placeholder { color: " + this.options.placeHolderColor + "; } ::-ms-input-placeholder { color: " + this.options.placeHolderColor + "; } :placeholder-shown { color: " + this.options.placeHolderColor + "; }</style>";
    }
    this.input = document.createElement("input");
    this.input.type = this.options.type;
    if (this.options.value != null) {
      this.input.value = this.options.value;
    }
    if (this.options.placeHolder != null) {
      this.input.placeholder = this.options.placeHolder;
    }
    if (this.options.pattern != null) {
      this.input.pattern = this.options.pattern;
    }
    if (this.options.maxLength != null) {
      this.input.setAttribute("maxLength", this.options.maxLength);
    }
    this.input.setAttribute("autocapitalize", (this.options.autoCapitalize === true ? "on" : "off"));
    this.input.setAttribute("autocomplete", (this.options.autoComplete === true ? "on" : "off"));
    this.input.setAttribute("autocorrect", (this.options.autoCorrect === true ? "on" : "off"));
    this._element.appendChild(this.input);
    this.isEmpty = !(((ref = this.options.value) != null ? ref.length : void 0) > 0);
    this.originalTextColor = this.options.color;
    inputStyle = {
      font: this.options.fontWeight + " " + this.options.fontSize + "px/" + this.options.lineHeight + " " + this.options.fontFamily,
      outline: "none",
      textIndent: this.options.indent + "px",
      backgroundColor: "transparent",
      height: "100%",
      width: "100%",
      pointerEvents: "none",
      margin: "0",
      padding: "0",
      "-webkit-appearance": "none"
    };
    for (key in inputStyle) {
      val = inputStyle[key];
      this.input.style[key] = val;
    }
    if (this.options.color != null) {
      this.input.style.color = this.options.color;
    }
    this.input.onfocus = (function(_this) {
      return function() {
        document.body.scrollTop = 0;
        if (_this.options.placeHolderFocus != null) {
          _this.input.placeholder = _this.options.placeHolderFocus;
        }
        document.body.scrollTop = 0;
        return _this.emit(Events.Focus, _this.input.value, _this);
      };
    })(this);
    this.input.onblur = (function(_this) {
      return function() {
        document.body.scrollTop = 0;
        if (!(_this.input.placeholder === _this.options.placeHolder || (_this.options.placeHolder == null))) {
          _this.input.placeholder = _this.options.placeHolder;
        }
        return _this.emit(Events.Blur, _this.input.value, _this);
      };
    })(this);
    this.input.oninput = (function(_this) {
      return function() {
        var ref1;
        _this.isEmpty = !(((ref1 = _this.input.value) != null ? ref1.length : void 0) > 0);
        _this.emit(Events.Input, _this.input.value, _this);
        return _this.checkValidity();
      };
    })(this);
    this.on(Events.TouchEnd, function() {
      return this.input.focus();
    });
    this.on("change:color", function() {
      return this.changeInputTextColor();
    });
  }

  InputField.prototype.checkValidity = function() {
    var ref, validity;
    if (!this.shouldCheckValidity) {
      return;
    }
    if (this.options.pattern != null) {
      validity = this.input.checkValidity();
      this.isEmpty = !(((ref = this.input.value) != null ? ref.length : void 0) > 0);
      if (this.isValid !== validity || this.isEmpty) {
        if (this.isEmpty || !validity) {
          this.isValid = false;
          this.emit(Events.Invalid, this.input.value, this);
        } else {
          this.isValid = true;
          this.emit(Events.Valid, this.input.value, this);
        }
      }
    }
    if (this.checkMatch()) {
      this.isValid = true;
      return this.emit(Events.Match, this.input.value, this);
    }
  };

  InputField.prototype.checkMatch = function() {
    var i, len, match, ref;
    if (this.options.match == null) {
      return false;
    }
    if (Array.isArray(this.options.match)) {
      ref = this.options.match;
      for (i = 0, len = ref.length; i < len; i++) {
        match = ref[i];
        if (this.input.value.indexOf(match) > -1) {
          return true;
        }
      }
    } else {
      if (this.input.value.indexOf(this.options.match) > -1) {
        return true;
      }
    }
    return false;
  };

  InputField.prototype.clear = function() {
    this.input.value = "";
    this.isValid = null;
    return this.isEmpty = true;
  };

  InputField.prototype.changeInputTextColor = function() {
    return this.input.style.color = this.color.toHexString();
  };

  InputField.prototype.changeInputValue = function(v) {
    this.input.value = v;
    return this.input.oninput();
  };

  return InputField;

})(Layer);


},{}],"TextLayer":[function(require,module,exports){
var TextLayer, convertTextLayers, convertToTextLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TextLayer = (function(superClass) {
  extend(TextLayer, superClass);

  function TextLayer(options) {
    if (options == null) {
      options = {};
    }
    this.doAutoSize = false;
    this.doAutoSizeHeight = false;
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "hsla(60, 90%, 47%, .4)" : "transparent";
    }
    if (options.color == null) {
      options.color = "red";
    }
    if (options.lineHeight == null) {
      options.lineHeight = 1.25;
    }
    if (options.fontFamily == null) {
      options.fontFamily = "Helvetica";
    }
    if (options.fontSize == null) {
      options.fontSize = 20;
    }
    if (options.text == null) {
      options.text = "Use layer.text to add text";
    }
    TextLayer.__super__.constructor.call(this, options);
    this.style.whiteSpace = "pre-line";
    this.style.outline = "none";
  }

  TextLayer.prototype.setStyle = function(property, value, pxSuffix) {
    if (pxSuffix == null) {
      pxSuffix = false;
    }
    this.style[property] = pxSuffix ? value + "px" : value;
    this.emit("change:" + property, value);
    if (this.doAutoSize) {
      return this.calcSize();
    }
  };

  TextLayer.prototype.calcSize = function() {
    var constraints, size, sizeAffectingStyles;
    sizeAffectingStyles = {
      lineHeight: this.style["line-height"],
      fontSize: this.style["font-size"],
      fontWeight: this.style["font-weight"],
      paddingTop: this.style["padding-top"],
      paddingRight: this.style["padding-right"],
      paddingBottom: this.style["padding-bottom"],
      paddingLeft: this.style["padding-left"],
      textTransform: this.style["text-transform"],
      borderWidth: this.style["border-width"],
      letterSpacing: this.style["letter-spacing"],
      fontFamily: this.style["font-family"],
      fontStyle: this.style["font-style"],
      fontVariant: this.style["font-variant"]
    };
    constraints = {};
    if (this.doAutoSizeHeight) {
      constraints.width = this.width;
    }
    size = Utils.textSize(this.text, sizeAffectingStyles, constraints);
    if (this.style.textAlign === "right") {
      this.width = size.width;
      this.x = this.x - this.width;
    } else {
      this.width = size.width;
    }
    return this.height = size.height;
  };

  TextLayer.define("autoSize", {
    get: function() {
      return this.doAutoSize;
    },
    set: function(value) {
      this.doAutoSize = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("autoSizeHeight", {
    set: function(value) {
      this.doAutoSize = value;
      this.doAutoSizeHeight = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("contentEditable", {
    set: function(boolean) {
      this._element.contentEditable = boolean;
      this.ignoreEvents = !boolean;
      return this.on("input", function() {
        if (this.doAutoSize) {
          return this.calcSize();
        }
      });
    }
  });

  TextLayer.define("text", {
    get: function() {
      return this._element.textContent;
    },
    set: function(value) {
      this._element.textContent = value;
      this.emit("change:text", value);
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("fontFamily", {
    get: function() {
      return this.style.fontFamily;
    },
    set: function(value) {
      return this.setStyle("fontFamily", value);
    }
  });

  TextLayer.define("fontSize", {
    get: function() {
      return this.style.fontSize.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("fontSize", value, true);
    }
  });

  TextLayer.define("lineHeight", {
    get: function() {
      return this.style.lineHeight;
    },
    set: function(value) {
      return this.setStyle("lineHeight", value);
    }
  });

  TextLayer.define("fontWeight", {
    get: function() {
      return this.style.fontWeight;
    },
    set: function(value) {
      return this.setStyle("fontWeight", value);
    }
  });

  TextLayer.define("fontStyle", {
    get: function() {
      return this.style.fontStyle;
    },
    set: function(value) {
      return this.setStyle("fontStyle", value);
    }
  });

  TextLayer.define("fontVariant", {
    get: function() {
      return this.style.fontVariant;
    },
    set: function(value) {
      return this.setStyle("fontVariant", value);
    }
  });

  TextLayer.define("padding", {
    set: function(value) {
      this.setStyle("paddingTop", value, true);
      this.setStyle("paddingRight", value, true);
      this.setStyle("paddingBottom", value, true);
      return this.setStyle("paddingLeft", value, true);
    }
  });

  TextLayer.define("paddingTop", {
    get: function() {
      return this.style.paddingTop.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingTop", value, true);
    }
  });

  TextLayer.define("paddingRight", {
    get: function() {
      return this.style.paddingRight.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingRight", value, true);
    }
  });

  TextLayer.define("paddingBottom", {
    get: function() {
      return this.style.paddingBottom.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingBottom", value, true);
    }
  });

  TextLayer.define("paddingLeft", {
    get: function() {
      return this.style.paddingLeft.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingLeft", value, true);
    }
  });

  TextLayer.define("textAlign", {
    set: function(value) {
      return this.setStyle("textAlign", value);
    }
  });

  TextLayer.define("textTransform", {
    get: function() {
      return this.style.textTransform;
    },
    set: function(value) {
      return this.setStyle("textTransform", value);
    }
  });

  TextLayer.define("letterSpacing", {
    get: function() {
      return this.style.letterSpacing.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("letterSpacing", value, true);
    }
  });

  TextLayer.define("length", {
    get: function() {
      return this.text.length;
    }
  });

  return TextLayer;

})(Layer);

convertToTextLayer = function(layer) {
  var css, cssObj, importPath, t;
  t = new TextLayer({
    name: layer.name,
    frame: layer.frame,
    parent: layer.parent
  });
  cssObj = {};
  css = layer._info.metadata.css;
  css.forEach(function(rule) {
    var arr;
    if (_.includes(rule, '/*')) {
      return;
    }
    arr = rule.split(': ');
    return cssObj[arr[0]] = arr[1].replace(';', '');
  });
  t.style = cssObj;
  importPath = layer.__framerImportedFromPath;
  if (_.includes(importPath, '@2x')) {
    t.fontSize *= 2;
    t.lineHeight = (parseInt(t.lineHeight) * 2) + 'px';
    t.letterSpacing *= 2;
  }
  t.y -= (parseInt(t.lineHeight) - t.fontSize) / 2;
  t.y -= t.fontSize * 0.1;
  t.x -= t.fontSize * 0.08;
  t.width += t.fontSize * 0.5;
  t.text = layer._info.metadata.string;
  layer.destroy();
  return t;
};

Layer.prototype.convertToTextLayer = function() {
  return convertToTextLayer(this);
};

convertTextLayers = function(obj) {
  var layer, prop, results;
  results = [];
  for (prop in obj) {
    layer = obj[prop];
    if (layer._info.kind === "text") {
      results.push(obj[prop] = convertToTextLayer(layer));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

Layer.prototype.frameAsTextLayer = function(properties) {
  var t;
  t = new TextLayer;
  t.frame = this.frame;
  t.superLayer = this.superLayer;
  _.extend(t, properties);
  this.destroy();
  return t;
};

exports.TextLayer = TextLayer;

exports.convertTextLayers = convertTextLayers;


},{}],"firebase":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Firebase = (function(superClass) {
  var request;

  extend(Firebase, superClass);

  Firebase.define("status", {
    get: function() {
      return this._status;
    }
  });

  function Firebase(options) {
    var base, base1, base2;
    this.options = options != null ? options : {};
    this.projectID = (base = this.options).projectID != null ? base.projectID : base.projectID = null;
    this.secret = (base1 = this.options).secret != null ? base1.secret : base1.secret = null;
    this.debug = (base2 = this.options).debug != null ? base2.debug : base2.debug = false;
    if (this._status == null) {
      this._status = "disconnected";
    }
    Firebase.__super__.constructor.apply(this, arguments);
    if (this.debug) {
      console.log("Firebase: Connecting to Firebase Project '" + this.projectID + "' ... \n URL: 'https://" + this.projectID + ".firebaseio.com'");
    }
    this.onChange("connection");
  }

  request = function(project, secret, path, callback, method, data, parameters, debug) {
    var url, xhttp;
    url = "https://" + project + ".firebaseio.com" + path + ".json?auth=" + secret;
    if (parameters !== void 0) {
      if (parameters.shallow) {
        url += "&shallow=true";
      }
      if (parameters.format === "export") {
        url += "&format=export";
      }
      switch (parameters.print) {
        case "pretty":
          url += "&print=pretty";
          break;
        case "silent":
          url += "&print=silent";
      }
      if (typeof parameters.download === "string") {
        url += "&download=" + parameters.download;
        window.open(url, "_self");
      }
      if (typeof parameters.orderBy === "string") {
        url += "&orderBy=" + '"' + parameters.orderBy + '"';
      }
      if (typeof parameters.limitToFirst === "number") {
        url += "&limitToFirst=" + parameters.limitToFirst;
      }
      if (typeof parameters.limitToLast === "number") {
        url += "&limitToLast=" + parameters.limitToLast;
      }
      if (typeof parameters.startAt === "number") {
        url += "&startAt=" + parameters.startAt;
      }
      if (typeof parameters.endAt === "number") {
        url += "&endAt=" + parameters.endAt;
      }
      if (typeof parameters.equalTo === "number") {
        url += "&equalTo=" + parameters.equalTo;
      }
    }
    xhttp = new XMLHttpRequest;
    if (debug) {
      console.log("Firebase: New '" + method + "'-request with data: '" + (JSON.stringify(data)) + "' \n URL: '" + url + "'");
    }
    xhttp.onreadystatechange = (function(_this) {
      return function() {
        if (parameters !== void 0) {
          if (parameters.print === "silent" || typeof parameters.download === "string") {
            return;
          }
        }
        switch (xhttp.readyState) {
          case 0:
            if (debug) {
              console.log("Firebase: Request not initialized \n URL: '" + url + "'");
            }
            break;
          case 1:
            if (debug) {
              console.log("Firebase: Server connection established \n URL: '" + url + "'");
            }
            break;
          case 2:
            if (debug) {
              console.log("Firebase: Request received \n URL: '" + url + "'");
            }
            break;
          case 3:
            if (debug) {
              console.log("Firebase: Processing request \n URL: '" + url + "'");
            }
            break;
          case 4:
            if (callback != null) {
              callback(JSON.parse(xhttp.responseText));
            }
            if (debug) {
              console.log("Firebase: Request finished, response: '" + (JSON.parse(xhttp.responseText)) + "' \n URL: '" + url + "'");
            }
        }
        if (xhttp.status === "404") {
          if (debug) {
            return console.warn("Firebase: Invalid request, page not found \n URL: '" + url + "'");
          }
        }
      };
    })(this);
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    return xhttp.send(data = "" + (JSON.stringify(data)));
  };

  Firebase.prototype.get = function(path, callback, parameters) {
    return request(this.projectID, this.secret, path, callback, "GET", null, parameters, this.debug);
  };

  Firebase.prototype.put = function(path, data, callback, parameters) {
    return request(this.projectID, this.secret, path, callback, "PUT", data, parameters, this.debug);
  };

  Firebase.prototype.post = function(path, data, callback, parameters) {
    return request(this.projectID, this.secret, path, callback, "POST", data, parameters, this.debug);
  };

  Firebase.prototype.patch = function(path, data, callback, parameters) {
    return request(this.projectID, this.secret, path, callback, "PATCH", data, parameters, this.debug);
  };

  Firebase.prototype["delete"] = function(path, callback, parameters) {
    return request(this.projectID, this.secret, path, callback, "DELETE", null, parameters, this.debug);
  };

  Firebase.prototype.onChange = function(path, callback) {
    var currentStatus, source, url;
    if (path === "connection") {
      url = "https://" + this.projectID + ".firebaseio.com/.json?auth=" + this.secret;
      currentStatus = "disconnected";
      source = new EventSource(url);
      source.addEventListener("open", (function(_this) {
        return function() {
          if (currentStatus === "disconnected") {
            _this._status = "connected";
            if (callback != null) {
              callback("connected");
            }
            if (_this.debug) {
              console.log("Firebase: Connection to Firebase Project '" + _this.projectID + "' established");
            }
          }
          return currentStatus = "connected";
        };
      })(this));
      return source.addEventListener("error", (function(_this) {
        return function() {
          if (currentStatus === "connected") {
            _this._status = "disconnected";
            if (callback != null) {
              callback("disconnected");
            }
            if (_this.debug) {
              console.warn("Firebase: Connection to Firebase Project '" + _this.projectID + "' closed");
            }
          }
          return currentStatus = "disconnected";
        };
      })(this));
    } else {
      url = "https://" + this.projectID + ".firebaseio.com" + path + ".json?auth=" + this.secret;
      source = new EventSource(url);
      if (this.debug) {
        console.log("Firebase: Listening to changes made to '" + path + "' \n URL: '" + url + "'");
      }
      source.addEventListener("put", (function(_this) {
        return function(ev) {
          if (callback != null) {
            callback(JSON.parse(ev.data).data, "put", JSON.parse(ev.data).path, _.tail(JSON.parse(ev.data).path.split("/"), 1));
          }
          if (_this.debug) {
            return console.log("Firebase: Received changes made to '" + path + "' via 'PUT': " + (JSON.parse(ev.data).data) + " \n URL: '" + url + "'");
          }
        };
      })(this));
      return source.addEventListener("patch", (function(_this) {
        return function(ev) {
          if (callback != null) {
            callback(JSON.parse(ev.data).data, "patch", JSON.parse(ev.data).path, _.tail(JSON.parse(ev.data).path.split("/"), 1));
          }
          if (_this.debug) {
            return console.log("Firebase: Received changes made to '" + path + "' via 'PATCH': " + (JSON.parse(ev.data).data) + " \n URL: '" + url + "'");
          }
        };
      })(this));
    }
  };

  return Firebase;

})(Framer.BaseClass);


},{}],"input":[function(require,module,exports){
var growthRatio, imageHeight,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.keyboardLayer = new Layer({
  x: 0,
  y: Screen.height,
  width: Screen.width,
  height: 432,
  html: "<img style='width: 100%;' src='modules/keyboard.png'/>"
});

growthRatio = Screen.width / 732;

imageHeight = growthRatio * 432;

exports.keyboardLayer.states = {
  shown: {
    y: Screen.height - imageHeight
  }
};

exports.keyboardLayer.states.animationOptions = {
  curve: "spring(500,50,15)"
};

exports.Input = (function(superClass) {
  extend(Input, superClass);

  Input.define("style", {
    get: function() {
      return this.input.style;
    },
    set: function(value) {
      return _.extend(this.input.style, value);
    }
  });

  Input.define("value", {
    get: function() {
      return this.input.value;
    },
    set: function(value) {
      return this.input.value = value;
    }
  });

  function Input(options) {
    if (options == null) {
      options = {};
    }
    if (options.setup == null) {
      options.setup = false;
    }
    if (options.width == null) {
      options.width = Screen.width;
    }
    if (options.clip == null) {
      options.clip = false;
    }
    if (options.height == null) {
      options.height = 60;
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "rgba(255, 60, 47, .5)" : "transparent";
    }
    if (options.fontSize == null) {
      options.fontSize = 30;
    }
    if (options.lineHeight == null) {
      options.lineHeight = 30;
    }
    if (options.padding == null) {
      options.padding = 10;
    }
    if (options.text == null) {
      options.text = "";
    }
    if (options.placeholder == null) {
      options.placeholder = "";
    }
    if (options.virtualKeyboard == null) {
      options.virtualKeyboard = Utils.isMobile() ? false : true;
    }
    if (options.type == null) {
      options.type = "text";
    }
    if (options.goButton == null) {
      options.goButton = false;
    }
    Input.__super__.constructor.call(this, options);
    if (options.placeholderColor != null) {
      this.placeholderColor = options.placeholderColor;
    }
    this.input = document.createElement("input");
    this.input.id = "input-" + (_.now());
    this.input.style.cssText = "font-size: " + options.fontSize + "px; line-height: " + options.lineHeight + "px; padding: " + options.padding + "px; width: " + options.width + "px; height: " + options.height + "px; border: none; outline-width: 0; background-image: url(about:blank); background-color: " + options.backgroundColor + ";";
    this.input.value = options.text;
    this.input.type = options.type;
    this.input.placeholder = options.placeholder;
    this.form = document.createElement("form");
    if (options.goButton) {
      this.form.action = "#";
      this.form.addEventListener("submit", function(event) {
        return event.preventDefault();
      });
    }
    this.form.appendChild(this.input);
    this._element.appendChild(this.form);
    this.backgroundColor = "transparent";
    if (this.placeholderColor) {
      this.updatePlaceholderColor(options.placeholderColor);
    }
    if (!Utils.isMobile() && options.virtualKeyboard === true) {
      this.input.addEventListener("focus", function() {
        exports.keyboardLayer.bringToFront();
        return exports.keyboardLayer.states.next();
      });
      this.input.addEventListener("blur", function() {
        return exports.keyboardLayer.states["switch"]("default");
      });
    }
  }

  Input.prototype.updatePlaceholderColor = function(color) {
    var css;
    this.placeholderColor = color;
    if (this.pageStyle != null) {
      document.head.removeChild(this.pageStyle);
    }
    this.pageStyle = document.createElement("style");
    this.pageStyle.type = "text/css";
    css = "#" + this.input.id + "::-webkit-input-placeholder { color: " + this.placeholderColor + "; }";
    this.pageStyle.appendChild(document.createTextNode(css));
    return document.head.appendChild(this.pageStyle);
  };

  Input.prototype.focus = function() {
    return this.input.focus();
  };

  Input.prototype.onFocus = function(cb) {
    return this.input.addEventListener("focus", function() {
      return cb.apply(this);
    });
  };

  Input.prototype.onBlur = function(cb) {
    return this.input.addEventListener("blur", function() {
      return cb.apply(this);
    });
  };

  return Input;

})(Layer);


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vbW9kdWxlcy9pbnB1dC5jb2ZmZWUiLCIuLi9tb2R1bGVzL2ZpcmViYXNlLmNvZmZlZSIsIi4uL21vZHVsZXMvVGV4dExheWVyLmNvZmZlZSIsIi4uL21vZHVsZXMvSW5wdXRGaWVsZC5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCJleHBvcnRzLmtleWJvYXJkTGF5ZXIgPSBuZXcgTGF5ZXJcblx0eDowLCB5OlNjcmVlbi5oZWlnaHQsIHdpZHRoOlNjcmVlbi53aWR0aCwgaGVpZ2h0OjQzMlxuXHRodG1sOlwiPGltZyBzdHlsZT0nd2lkdGg6IDEwMCU7JyBzcmM9J21vZHVsZXMva2V5Ym9hcmQucG5nJy8+XCJcblxuI3NjcmVlbiB3aWR0aCB2cy4gc2l6ZSBvZiBpbWFnZSB3aWR0aFxuZ3Jvd3RoUmF0aW8gPSBTY3JlZW4ud2lkdGggLyA3MzJcbmltYWdlSGVpZ2h0ID0gZ3Jvd3RoUmF0aW8gKiA0MzJcblxuZXhwb3J0cy5rZXlib2FyZExheWVyLnN0YXRlcyA9XG5cdHNob3duOiBcblx0XHR5OiBTY3JlZW4uaGVpZ2h0IC0gaW1hZ2VIZWlnaHRcblxuZXhwb3J0cy5rZXlib2FyZExheWVyLnN0YXRlcy5hbmltYXRpb25PcHRpb25zID1cblx0Y3VydmU6IFwic3ByaW5nKDUwMCw1MCwxNSlcIlxuXG5jbGFzcyBleHBvcnRzLklucHV0IGV4dGVuZHMgTGF5ZXJcblx0QGRlZmluZSBcInN0eWxlXCIsXG5cdFx0Z2V0OiAtPiBAaW5wdXQuc3R5bGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdF8uZXh0ZW5kIEBpbnB1dC5zdHlsZSwgdmFsdWVcblxuXHRAZGVmaW5lIFwidmFsdWVcIixcblx0XHRnZXQ6IC0+IEBpbnB1dC52YWx1ZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QGlucHV0LnZhbHVlID0gdmFsdWVcblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLnNldHVwID89IGZhbHNlXG5cdFx0b3B0aW9ucy53aWR0aCA/PSBTY3JlZW4ud2lkdGhcblx0XHRvcHRpb25zLmNsaXAgPz0gZmFsc2Vcblx0XHRvcHRpb25zLmhlaWdodCA/PSA2MFxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IGlmIG9wdGlvbnMuc2V0dXAgdGhlbiBcInJnYmEoMjU1LCA2MCwgNDcsIC41KVwiIGVsc2UgXCJ0cmFuc3BhcmVudFwiXG5cdFx0b3B0aW9ucy5mb250U2l6ZSA/PSAzMFxuXHRcdG9wdGlvbnMubGluZUhlaWdodCA/PSAzMFxuXHRcdG9wdGlvbnMucGFkZGluZyA/PSAxMFxuXHRcdG9wdGlvbnMudGV4dCA/PSBcIlwiXG5cdFx0b3B0aW9ucy5wbGFjZWhvbGRlciA/PSBcIlwiXG5cdFx0b3B0aW9ucy52aXJ0dWFsS2V5Ym9hcmQgPz0gaWYgVXRpbHMuaXNNb2JpbGUoKSB0aGVuIGZhbHNlIGVsc2UgdHJ1ZVxuXHRcdG9wdGlvbnMudHlwZSA/PSBcInRleHRcIlxuXHRcdG9wdGlvbnMuZ29CdXR0b24gPz0gZmFsc2VcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEBwbGFjZWhvbGRlckNvbG9yID0gb3B0aW9ucy5wbGFjZWhvbGRlckNvbG9yIGlmIG9wdGlvbnMucGxhY2Vob2xkZXJDb2xvcj9cblx0XHRAaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiaW5wdXRcIlxuXHRcdEBpbnB1dC5pZCA9IFwiaW5wdXQtI3tfLm5vdygpfVwiXG5cdFx0QGlucHV0LnN0eWxlLmNzc1RleHQgPSBcImZvbnQtc2l6ZTogI3tvcHRpb25zLmZvbnRTaXplfXB4OyBsaW5lLWhlaWdodDogI3tvcHRpb25zLmxpbmVIZWlnaHR9cHg7IHBhZGRpbmc6ICN7b3B0aW9ucy5wYWRkaW5nfXB4OyB3aWR0aDogI3tvcHRpb25zLndpZHRofXB4OyBoZWlnaHQ6ICN7b3B0aW9ucy5oZWlnaHR9cHg7IGJvcmRlcjogbm9uZTsgb3V0bGluZS13aWR0aDogMDsgYmFja2dyb3VuZC1pbWFnZTogdXJsKGFib3V0OmJsYW5rKTsgYmFja2dyb3VuZC1jb2xvcjogI3tvcHRpb25zLmJhY2tncm91bmRDb2xvcn07XCJcblx0XHRAaW5wdXQudmFsdWUgPSBvcHRpb25zLnRleHRcblx0XHRAaW5wdXQudHlwZSA9IG9wdGlvbnMudHlwZVxuXHRcdEBpbnB1dC5wbGFjZWhvbGRlciA9IG9wdGlvbnMucGxhY2Vob2xkZXJcblx0XHRAZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJmb3JtXCJcblxuXHRcdGlmIG9wdGlvbnMuZ29CdXR0b25cblx0XHRcdEBmb3JtLmFjdGlvbiA9IFwiI1wiXG5cdFx0XHRAZm9ybS5hZGRFdmVudExpc3RlbmVyIFwic3VibWl0XCIsIChldmVudCkgLT5cblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5cdFx0QGZvcm0uYXBwZW5kQ2hpbGQgQGlucHV0XG5cdFx0QF9lbGVtZW50LmFwcGVuZENoaWxkIEBmb3JtXG5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0QHVwZGF0ZVBsYWNlaG9sZGVyQ29sb3Igb3B0aW9ucy5wbGFjZWhvbGRlckNvbG9yIGlmIEBwbGFjZWhvbGRlckNvbG9yXG5cblx0XHQjb25seSBzaG93IGhvbm9yIHZpcnR1YWwga2V5Ym9hcmQgb3B0aW9uIHdoZW4gbm90IG9uIG1vYmlsZSxcblx0XHQjb3RoZXJ3aXNlIGlnbm9yZVxuXHRcdGlmICFVdGlscy5pc01vYmlsZSgpICYmIG9wdGlvbnMudmlydHVhbEtleWJvYXJkIGlzIHRydWVcblx0XHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiZm9jdXNcIiwgLT5cblx0XHRcdFx0ZXhwb3J0cy5rZXlib2FyZExheWVyLmJyaW5nVG9Gcm9udCgpXG5cdFx0XHRcdGV4cG9ydHMua2V5Ym9hcmRMYXllci5zdGF0ZXMubmV4dCgpXG5cdFx0XHRAaW5wdXQuYWRkRXZlbnRMaXN0ZW5lciBcImJsdXJcIiwgLT5cblx0XHRcdFx0ZXhwb3J0cy5rZXlib2FyZExheWVyLnN0YXRlcy5zd2l0Y2ggXCJkZWZhdWx0XCJcblxuXHR1cGRhdGVQbGFjZWhvbGRlckNvbG9yOiAoY29sb3IpIC0+XG5cdFx0QHBsYWNlaG9sZGVyQ29sb3IgPSBjb2xvclxuXHRcdGlmIEBwYWdlU3R5bGU/XG5cdFx0XHRkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkIEBwYWdlU3R5bGVcblx0XHRAcGFnZVN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcInN0eWxlXCJcblx0XHRAcGFnZVN0eWxlLnR5cGUgPSBcInRleHQvY3NzXCJcblx0XHRjc3MgPSBcIiMje0BpbnB1dC5pZH06Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIgeyBjb2xvcjogI3tAcGxhY2Vob2xkZXJDb2xvcn07IH1cIlxuXHRcdEBwYWdlU3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUgY3NzKVxuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQgQHBhZ2VTdHlsZVxuXG5cdGZvY3VzOiAoKSAtPlxuXHRcdEBpbnB1dC5mb2N1cygpXG5cblx0b25Gb2N1czogKGNiKSAtPlxuXHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiZm9jdXNcIiwgLT5cblx0XHRcdGNiLmFwcGx5KEApXG5cblx0b25CbHVyOiAoY2IpIC0+XG5cdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJibHVyXCIsIC0+XG5cdFx0XHRjYi5hcHBseShAKVxuIiwiXG5cblxuIyAnRmlyZWJhc2UgUkVTVCBBUEkgQ2xhc3MnIG1vZHVsZSB2MS4xXG4jIGJ5IE1hcmMgS3Jlbm4sIFNlcHRlbWJlciAyMXN0LCAyMDE2IHwgbWFyYy5rcmVubkBnbWFpbC5jb20gfCBAbWFyY19rcmVublxuXG4jIERvY3VtZW50YXRpb24gb2YgdGhpcyBNb2R1bGU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJja3Jlbm4vZnJhbWVyLUZpcmViYXNlXG4jIC0tLS0tLSA6IC0tLS0tLS0gRmlyZWJhc2UgUkVTVCBBUEk6IGh0dHBzOi8vZmlyZWJhc2UuZ29vZ2xlLmNvbS9kb2NzL3JlZmVyZW5jZS9yZXN0L2RhdGFiYXNlL1xuXG5cbiMgVG9EbzpcbiMgRml4IG9uQ2hhbmdlIFwiY29ubmVjdGlvblwiLCBgdGhpc8K0IGNvbnRleHRcblxuXG5cbiMgRmlyZWJhc2UgUkVTVCBBUEkgQ2xhc3MgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jbGFzcyBleHBvcnRzLkZpcmViYXNlIGV4dGVuZHMgRnJhbWVyLkJhc2VDbGFzc1xuXG5cblx0QC5kZWZpbmUgXCJzdGF0dXNcIixcblx0XHRnZXQ6IC0+IEBfc3RhdHVzICMgcmVhZE9ubHlcblxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBwcm9qZWN0SUQgPSBAb3B0aW9ucy5wcm9qZWN0SUQgPz0gbnVsbFxuXHRcdEBzZWNyZXQgICAgPSBAb3B0aW9ucy5zZWNyZXQgICAgPz0gbnVsbFxuXHRcdEBkZWJ1ZyAgICAgPSBAb3B0aW9ucy5kZWJ1ZyAgICAgPz0gZmFsc2Vcblx0XHRAX3N0YXR1cyAgICAgICAgICAgICAgICAgICAgICAgID89IFwiZGlzY29ubmVjdGVkXCJcblx0XHRzdXBlclxuXG5cblx0XHRjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBDb25uZWN0aW5nIHRvIEZpcmViYXNlIFByb2plY3QgJyN7QHByb2plY3RJRH0nIC4uLiBcXG4gVVJMOiAnaHR0cHM6Ly8je0Bwcm9qZWN0SUR9LmZpcmViYXNlaW8uY29tJ1wiIGlmIEBkZWJ1Z1xuXHRcdEAub25DaGFuZ2UgXCJjb25uZWN0aW9uXCJcblxuXG5cdHJlcXVlc3QgPSAocHJvamVjdCwgc2VjcmV0LCBwYXRoLCBjYWxsYmFjaywgbWV0aG9kLCBkYXRhLCBwYXJhbWV0ZXJzLCBkZWJ1ZykgLT5cblxuXHRcdHVybCA9IFwiaHR0cHM6Ly8je3Byb2plY3R9LmZpcmViYXNlaW8uY29tI3twYXRofS5qc29uP2F1dGg9I3tzZWNyZXR9XCJcblxuXG5cdFx0dW5sZXNzIHBhcmFtZXRlcnMgaXMgdW5kZWZpbmVkXG5cdFx0XHRpZiBwYXJhbWV0ZXJzLnNoYWxsb3cgICAgICAgICAgICB0aGVuIHVybCArPSBcIiZzaGFsbG93PXRydWVcIlxuXHRcdFx0aWYgcGFyYW1ldGVycy5mb3JtYXQgaXMgXCJleHBvcnRcIiB0aGVuIHVybCArPSBcIiZmb3JtYXQ9ZXhwb3J0XCJcblxuXHRcdFx0c3dpdGNoIHBhcmFtZXRlcnMucHJpbnRcblx0XHRcdFx0d2hlbiBcInByZXR0eVwiIHRoZW4gdXJsICs9IFwiJnByaW50PXByZXR0eVwiXG5cdFx0XHRcdHdoZW4gXCJzaWxlbnRcIiB0aGVuIHVybCArPSBcIiZwcmludD1zaWxlbnRcIlxuXG5cdFx0XHRpZiB0eXBlb2YgcGFyYW1ldGVycy5kb3dubG9hZCBpcyBcInN0cmluZ1wiXG5cdFx0XHRcdHVybCArPSBcIiZkb3dubG9hZD0je3BhcmFtZXRlcnMuZG93bmxvYWR9XCJcblx0XHRcdFx0d2luZG93Lm9wZW4odXJsLFwiX3NlbGZcIilcblxuXG5cdFx0XHR1cmwgKz0gXCImb3JkZXJCeT1cIiArICdcIicgKyBwYXJhbWV0ZXJzLm9yZGVyQnkgKyAnXCInIGlmIHR5cGVvZiBwYXJhbWV0ZXJzLm9yZGVyQnkgICAgICBpcyBcInN0cmluZ1wiXG5cdFx0XHR1cmwgKz0gXCImbGltaXRUb0ZpcnN0PSN7cGFyYW1ldGVycy5saW1pdFRvRmlyc3R9XCIgICBpZiB0eXBlb2YgcGFyYW1ldGVycy5saW1pdFRvRmlyc3QgaXMgXCJudW1iZXJcIlxuXHRcdFx0dXJsICs9IFwiJmxpbWl0VG9MYXN0PSN7cGFyYW1ldGVycy5saW1pdFRvTGFzdH1cIiAgICAgaWYgdHlwZW9mIHBhcmFtZXRlcnMubGltaXRUb0xhc3QgIGlzIFwibnVtYmVyXCJcblx0XHRcdHVybCArPSBcIiZzdGFydEF0PSN7cGFyYW1ldGVycy5zdGFydEF0fVwiICAgICAgICAgICAgIGlmIHR5cGVvZiBwYXJhbWV0ZXJzLnN0YXJ0QXQgICAgICBpcyBcIm51bWJlclwiXG5cdFx0XHR1cmwgKz0gXCImZW5kQXQ9I3twYXJhbWV0ZXJzLmVuZEF0fVwiICAgICAgICAgICAgICAgICBpZiB0eXBlb2YgcGFyYW1ldGVycy5lbmRBdCAgICAgICAgaXMgXCJudW1iZXJcIlxuXHRcdFx0dXJsICs9IFwiJmVxdWFsVG89I3twYXJhbWV0ZXJzLmVxdWFsVG99XCIgICAgICAgICAgICAgaWYgdHlwZW9mIHBhcmFtZXRlcnMuZXF1YWxUbyAgICAgIGlzIFwibnVtYmVyXCJcblxuXG5cdFx0eGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3Rcblx0XHRjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBOZXcgJyN7bWV0aG9kfSctcmVxdWVzdCB3aXRoIGRhdGE6ICcje0pTT04uc3RyaW5naWZ5KGRhdGEpfScgXFxuIFVSTDogJyN7dXJsfSdcIiBpZiBkZWJ1Z1xuXHRcdHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ID0+XG5cblx0XHRcdHVubGVzcyBwYXJhbWV0ZXJzIGlzIHVuZGVmaW5lZFxuXHRcdFx0XHRpZiBwYXJhbWV0ZXJzLnByaW50IGlzIFwic2lsZW50XCIgb3IgdHlwZW9mIHBhcmFtZXRlcnMuZG93bmxvYWQgaXMgXCJzdHJpbmdcIiB0aGVuIHJldHVybiAjIHVnaFxuXG5cdFx0XHRzd2l0Y2ggeGh0dHAucmVhZHlTdGF0ZVxuXHRcdFx0XHR3aGVuIDAgdGhlbiBjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBSZXF1ZXN0IG5vdCBpbml0aWFsaXplZCBcXG4gVVJMOiAnI3t1cmx9J1wiICAgICAgIGlmIGRlYnVnXG5cdFx0XHRcdHdoZW4gMSB0aGVuIGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IFNlcnZlciBjb25uZWN0aW9uIGVzdGFibGlzaGVkIFxcbiBVUkw6ICcje3VybH0nXCIgaWYgZGVidWdcblx0XHRcdFx0d2hlbiAyIHRoZW4gY29uc29sZS5sb2cgXCJGaXJlYmFzZTogUmVxdWVzdCByZWNlaXZlZCBcXG4gVVJMOiAnI3t1cmx9J1wiICAgICAgICAgICAgICBpZiBkZWJ1Z1xuXHRcdFx0XHR3aGVuIDMgdGhlbiBjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBQcm9jZXNzaW5nIHJlcXVlc3QgXFxuIFVSTDogJyN7dXJsfSdcIiAgICAgICAgICAgIGlmIGRlYnVnXG5cdFx0XHRcdHdoZW4gNFxuXHRcdFx0XHRcdGNhbGxiYWNrKEpTT04ucGFyc2UoeGh0dHAucmVzcG9uc2VUZXh0KSkgaWYgY2FsbGJhY2s/XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJGaXJlYmFzZTogUmVxdWVzdCBmaW5pc2hlZCwgcmVzcG9uc2U6ICcje0pTT04ucGFyc2UoeGh0dHAucmVzcG9uc2VUZXh0KX0nIFxcbiBVUkw6ICcje3VybH0nXCIgaWYgZGVidWdcblxuXHRcdFx0aWYgeGh0dHAuc3RhdHVzIGlzIFwiNDA0XCJcblx0XHRcdFx0Y29uc29sZS53YXJuIFwiRmlyZWJhc2U6IEludmFsaWQgcmVxdWVzdCwgcGFnZSBub3QgZm91bmQgXFxuIFVSTDogJyN7dXJsfSdcIiBpZiBkZWJ1Z1xuXG5cblx0XHR4aHR0cC5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKVxuXHRcdHhodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIpXG5cdFx0eGh0dHAuc2VuZChkYXRhID0gXCIje0pTT04uc3RyaW5naWZ5KGRhdGEpfVwiKVxuXG5cblxuXHQjIEF2YWlsYWJsZSBtZXRob2RzXG5cblx0Z2V0OiAgICAocGF0aCwgY2FsbGJhY2ssICAgICAgIHBhcmFtZXRlcnMpIC0+IHJlcXVlc3QoQHByb2plY3RJRCwgQHNlY3JldCwgcGF0aCwgY2FsbGJhY2ssIFwiR0VUXCIsICAgIG51bGwsIHBhcmFtZXRlcnMsIEBkZWJ1Zylcblx0cHV0OiAgICAocGF0aCwgZGF0YSwgY2FsbGJhY2ssIHBhcmFtZXRlcnMpIC0+IHJlcXVlc3QoQHByb2plY3RJRCwgQHNlY3JldCwgcGF0aCwgY2FsbGJhY2ssIFwiUFVUXCIsICAgIGRhdGEsIHBhcmFtZXRlcnMsIEBkZWJ1Zylcblx0cG9zdDogICAocGF0aCwgZGF0YSwgY2FsbGJhY2ssIHBhcmFtZXRlcnMpIC0+IHJlcXVlc3QoQHByb2plY3RJRCwgQHNlY3JldCwgcGF0aCwgY2FsbGJhY2ssIFwiUE9TVFwiLCAgIGRhdGEsIHBhcmFtZXRlcnMsIEBkZWJ1Zylcblx0cGF0Y2g6ICAocGF0aCwgZGF0YSwgY2FsbGJhY2ssIHBhcmFtZXRlcnMpIC0+IHJlcXVlc3QoQHByb2plY3RJRCwgQHNlY3JldCwgcGF0aCwgY2FsbGJhY2ssIFwiUEFUQ0hcIiwgIGRhdGEsIHBhcmFtZXRlcnMsIEBkZWJ1Zylcblx0ZGVsZXRlOiAocGF0aCwgY2FsbGJhY2ssICAgICAgIHBhcmFtZXRlcnMpIC0+IHJlcXVlc3QoQHByb2plY3RJRCwgQHNlY3JldCwgcGF0aCwgY2FsbGJhY2ssIFwiREVMRVRFXCIsIG51bGwsIHBhcmFtZXRlcnMsIEBkZWJ1ZylcblxuXG5cblx0b25DaGFuZ2U6IChwYXRoLCBjYWxsYmFjaykgLT5cblxuXG5cdFx0aWYgcGF0aCBpcyBcImNvbm5lY3Rpb25cIlxuXG5cdFx0XHR1cmwgPSBcImh0dHBzOi8vI3tAcHJvamVjdElEfS5maXJlYmFzZWlvLmNvbS8uanNvbj9hdXRoPSN7QHNlY3JldH1cIlxuXHRcdFx0Y3VycmVudFN0YXR1cyA9IFwiZGlzY29ubmVjdGVkXCJcblx0XHRcdHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSh1cmwpXG5cblx0XHRcdHNvdXJjZS5hZGRFdmVudExpc3RlbmVyIFwib3BlblwiLCA9PlxuXHRcdFx0XHRpZiBjdXJyZW50U3RhdHVzIGlzIFwiZGlzY29ubmVjdGVkXCJcblx0XHRcdFx0XHRALl9zdGF0dXMgPSBcImNvbm5lY3RlZFwiXG5cdFx0XHRcdFx0Y2FsbGJhY2soXCJjb25uZWN0ZWRcIikgaWYgY2FsbGJhY2s/XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJGaXJlYmFzZTogQ29ubmVjdGlvbiB0byBGaXJlYmFzZSBQcm9qZWN0ICcje0Bwcm9qZWN0SUR9JyBlc3RhYmxpc2hlZFwiIGlmIEBkZWJ1Z1xuXHRcdFx0XHRjdXJyZW50U3RhdHVzID0gXCJjb25uZWN0ZWRcIlxuXG5cdFx0XHRzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lciBcImVycm9yXCIsID0+XG5cdFx0XHRcdGlmIGN1cnJlbnRTdGF0dXMgaXMgXCJjb25uZWN0ZWRcIlxuXHRcdFx0XHRcdEAuX3N0YXR1cyA9IFwiZGlzY29ubmVjdGVkXCJcblx0XHRcdFx0XHRjYWxsYmFjayhcImRpc2Nvbm5lY3RlZFwiKSBpZiBjYWxsYmFjaz9cblx0XHRcdFx0XHRjb25zb2xlLndhcm4gXCJGaXJlYmFzZTogQ29ubmVjdGlvbiB0byBGaXJlYmFzZSBQcm9qZWN0ICcje0Bwcm9qZWN0SUR9JyBjbG9zZWRcIiBpZiBAZGVidWdcblx0XHRcdFx0Y3VycmVudFN0YXR1cyA9IFwiZGlzY29ubmVjdGVkXCJcblxuXG5cdFx0ZWxzZVxuXG5cdFx0XHR1cmwgPSBcImh0dHBzOi8vI3tAcHJvamVjdElEfS5maXJlYmFzZWlvLmNvbSN7cGF0aH0uanNvbj9hdXRoPSN7QHNlY3JldH1cIlxuXHRcdFx0c291cmNlID0gbmV3IEV2ZW50U291cmNlKHVybClcblx0XHRcdGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IExpc3RlbmluZyB0byBjaGFuZ2VzIG1hZGUgdG8gJyN7cGF0aH0nIFxcbiBVUkw6ICcje3VybH0nXCIgaWYgQGRlYnVnXG5cblx0XHRcdHNvdXJjZS5hZGRFdmVudExpc3RlbmVyIFwicHV0XCIsIChldikgPT5cblx0XHRcdFx0Y2FsbGJhY2soSlNPTi5wYXJzZShldi5kYXRhKS5kYXRhLCBcInB1dFwiLCBKU09OLnBhcnNlKGV2LmRhdGEpLnBhdGgsIF8udGFpbChKU09OLnBhcnNlKGV2LmRhdGEpLnBhdGguc3BsaXQoXCIvXCIpLDEpKSBpZiBjYWxsYmFjaz9cblx0XHRcdFx0Y29uc29sZS5sb2cgXCJGaXJlYmFzZTogUmVjZWl2ZWQgY2hhbmdlcyBtYWRlIHRvICcje3BhdGh9JyB2aWEgJ1BVVCc6ICN7SlNPTi5wYXJzZShldi5kYXRhKS5kYXRhfSBcXG4gVVJMOiAnI3t1cmx9J1wiIGlmIEBkZWJ1Z1xuXG5cdFx0XHRzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lciBcInBhdGNoXCIsIChldikgPT5cblx0XHRcdFx0Y2FsbGJhY2soSlNPTi5wYXJzZShldi5kYXRhKS5kYXRhLCBcInBhdGNoXCIsIEpTT04ucGFyc2UoZXYuZGF0YSkucGF0aCwgXy50YWlsKEpTT04ucGFyc2UoZXYuZGF0YSkucGF0aC5zcGxpdChcIi9cIiksMSkpIGlmIGNhbGxiYWNrP1xuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBSZWNlaXZlZCBjaGFuZ2VzIG1hZGUgdG8gJyN7cGF0aH0nIHZpYSAnUEFUQ0gnOiAje0pTT04ucGFyc2UoZXYuZGF0YSkuZGF0YX0gXFxuIFVSTDogJyN7dXJsfSdcIiBpZiBAZGVidWciLCJjbGFzcyBUZXh0TGF5ZXIgZXh0ZW5kcyBMYXllclxuXHRcdFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnM9e30pIC0+XG5cdFx0QGRvQXV0b1NpemUgPSBmYWxzZVxuXHRcdEBkb0F1dG9TaXplSGVpZ2h0ID0gZmFsc2Vcblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBpZiBvcHRpb25zLnNldHVwIHRoZW4gXCJoc2xhKDYwLCA5MCUsIDQ3JSwgLjQpXCIgZWxzZSBcInRyYW5zcGFyZW50XCJcblx0XHRvcHRpb25zLmNvbG9yID89IFwicmVkXCJcblx0XHRvcHRpb25zLmxpbmVIZWlnaHQgPz0gMS4yNVxuXHRcdG9wdGlvbnMuZm9udEZhbWlseSA/PSBcIkhlbHZldGljYVwiXG5cdFx0b3B0aW9ucy5mb250U2l6ZSA/PSAyMFxuXHRcdG9wdGlvbnMudGV4dCA/PSBcIlVzZSBsYXllci50ZXh0IHRvIGFkZCB0ZXh0XCJcblx0XHRzdXBlciBvcHRpb25zXG5cdFx0QHN0eWxlLndoaXRlU3BhY2UgPSBcInByZS1saW5lXCIgIyBhbGxvdyBcXG4gaW4gLnRleHRcblx0XHRAc3R5bGUub3V0bGluZSA9IFwibm9uZVwiICMgbm8gYm9yZGVyIHdoZW4gc2VsZWN0ZWRcblx0XHRcblx0c2V0U3R5bGU6IChwcm9wZXJ0eSwgdmFsdWUsIHB4U3VmZml4ID0gZmFsc2UpIC0+XG5cdFx0QHN0eWxlW3Byb3BlcnR5XSA9IGlmIHB4U3VmZml4IHRoZW4gdmFsdWUrXCJweFwiIGVsc2UgdmFsdWVcblx0XHRAZW1pdChcImNoYW5nZToje3Byb3BlcnR5fVwiLCB2YWx1ZSlcblx0XHRpZiBAZG9BdXRvU2l6ZSB0aGVuIEBjYWxjU2l6ZSgpXG5cdFx0XG5cdGNhbGNTaXplOiAtPlxuXHRcdHNpemVBZmZlY3RpbmdTdHlsZXMgPVxuXHRcdFx0bGluZUhlaWdodDogQHN0eWxlW1wibGluZS1oZWlnaHRcIl1cblx0XHRcdGZvbnRTaXplOiBAc3R5bGVbXCJmb250LXNpemVcIl1cblx0XHRcdGZvbnRXZWlnaHQ6IEBzdHlsZVtcImZvbnQtd2VpZ2h0XCJdXG5cdFx0XHRwYWRkaW5nVG9wOiBAc3R5bGVbXCJwYWRkaW5nLXRvcFwiXVxuXHRcdFx0cGFkZGluZ1JpZ2h0OiBAc3R5bGVbXCJwYWRkaW5nLXJpZ2h0XCJdXG5cdFx0XHRwYWRkaW5nQm90dG9tOiBAc3R5bGVbXCJwYWRkaW5nLWJvdHRvbVwiXVxuXHRcdFx0cGFkZGluZ0xlZnQ6IEBzdHlsZVtcInBhZGRpbmctbGVmdFwiXVxuXHRcdFx0dGV4dFRyYW5zZm9ybTogQHN0eWxlW1widGV4dC10cmFuc2Zvcm1cIl1cblx0XHRcdGJvcmRlcldpZHRoOiBAc3R5bGVbXCJib3JkZXItd2lkdGhcIl1cblx0XHRcdGxldHRlclNwYWNpbmc6IEBzdHlsZVtcImxldHRlci1zcGFjaW5nXCJdXG5cdFx0XHRmb250RmFtaWx5OiBAc3R5bGVbXCJmb250LWZhbWlseVwiXVxuXHRcdFx0Zm9udFN0eWxlOiBAc3R5bGVbXCJmb250LXN0eWxlXCJdXG5cdFx0XHRmb250VmFyaWFudDogQHN0eWxlW1wiZm9udC12YXJpYW50XCJdXG5cdFx0Y29uc3RyYWludHMgPSB7fVxuXHRcdGlmIEBkb0F1dG9TaXplSGVpZ2h0IHRoZW4gY29uc3RyYWludHMud2lkdGggPSBAd2lkdGhcblx0XHRzaXplID0gVXRpbHMudGV4dFNpemUgQHRleHQsIHNpemVBZmZlY3RpbmdTdHlsZXMsIGNvbnN0cmFpbnRzXG5cdFx0aWYgQHN0eWxlLnRleHRBbGlnbiBpcyBcInJpZ2h0XCJcblx0XHRcdEB3aWR0aCA9IHNpemUud2lkdGhcblx0XHRcdEB4ID0gQHgtQHdpZHRoXG5cdFx0ZWxzZVxuXHRcdFx0QHdpZHRoID0gc2l6ZS53aWR0aFxuXHRcdEBoZWlnaHQgPSBzaXplLmhlaWdodFxuXG5cdEBkZWZpbmUgXCJhdXRvU2l6ZVwiLFxuXHRcdGdldDogLT4gQGRvQXV0b1NpemVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAZG9BdXRvU2l6ZSA9IHZhbHVlXG5cdFx0XHRpZiBAZG9BdXRvU2l6ZSB0aGVuIEBjYWxjU2l6ZSgpXG5cdEBkZWZpbmUgXCJhdXRvU2l6ZUhlaWdodFwiLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBkb0F1dG9TaXplID0gdmFsdWVcblx0XHRcdEBkb0F1dG9TaXplSGVpZ2h0ID0gdmFsdWVcblx0XHRcdGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcblx0QGRlZmluZSBcImNvbnRlbnRFZGl0YWJsZVwiLFxuXHRcdHNldDogKGJvb2xlYW4pIC0+XG5cdFx0XHRAX2VsZW1lbnQuY29udGVudEVkaXRhYmxlID0gYm9vbGVhblxuXHRcdFx0QGlnbm9yZUV2ZW50cyA9ICFib29sZWFuXG5cdFx0XHRAb24gXCJpbnB1dFwiLCAtPiBAY2FsY1NpemUoKSBpZiBAZG9BdXRvU2l6ZVxuXHRAZGVmaW5lIFwidGV4dFwiLFxuXHRcdGdldDogLT4gQF9lbGVtZW50LnRleHRDb250ZW50XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAX2VsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZVxuXHRcdFx0QGVtaXQoXCJjaGFuZ2U6dGV4dFwiLCB2YWx1ZSlcblx0XHRcdGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcblx0QGRlZmluZSBcImZvbnRGYW1pbHlcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udEZhbWlseVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250RmFtaWx5XCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwiZm9udFNpemVcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udFNpemUucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFNpemVcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJsaW5lSGVpZ2h0XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmxpbmVIZWlnaHQgXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImxpbmVIZWlnaHRcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJmb250V2VpZ2h0XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRXZWlnaHQgXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRXZWlnaHRcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJmb250U3R5bGVcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udFN0eWxlXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRTdHlsZVwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImZvbnRWYXJpYW50XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRWYXJpYW50XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRWYXJpYW50XCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ1wiLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBzZXRTdHlsZShcInBhZGRpbmdUb3BcIiwgdmFsdWUsIHRydWUpXG5cdFx0XHRAc2V0U3R5bGUoXCJwYWRkaW5nUmlnaHRcIiwgdmFsdWUsIHRydWUpXG5cdFx0XHRAc2V0U3R5bGUoXCJwYWRkaW5nQm90dG9tXCIsIHZhbHVlLCB0cnVlKVxuXHRcdFx0QHNldFN0eWxlKFwicGFkZGluZ0xlZnRcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nVG9wXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLnBhZGRpbmdUb3AucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ1RvcFwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdSaWdodFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5wYWRkaW5nUmlnaHQucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ1JpZ2h0XCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ0JvdHRvbVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5wYWRkaW5nQm90dG9tLnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInBhZGRpbmdCb3R0b21cIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nTGVmdFwiLFxuXHRcdGdldDogLT4gQHN0eWxlLnBhZGRpbmdMZWZ0LnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInBhZGRpbmdMZWZ0XCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwidGV4dEFsaWduXCIsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInRleHRBbGlnblwiLCB2YWx1ZSlcblx0QGRlZmluZSBcInRleHRUcmFuc2Zvcm1cIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUudGV4dFRyYW5zZm9ybSBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwidGV4dFRyYW5zZm9ybVwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImxldHRlclNwYWNpbmdcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUubGV0dGVyU3BhY2luZy5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJsZXR0ZXJTcGFjaW5nXCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwibGVuZ3RoXCIsIFxuXHRcdGdldDogLT4gQHRleHQubGVuZ3RoXG5cbmNvbnZlcnRUb1RleHRMYXllciA9IChsYXllcikgLT5cblx0dCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRuYW1lOiBsYXllci5uYW1lXG5cdFx0ZnJhbWU6IGxheWVyLmZyYW1lXG5cdFx0cGFyZW50OiBsYXllci5wYXJlbnRcblx0XG5cdGNzc09iaiA9IHt9XG5cdGNzcyA9IGxheWVyLl9pbmZvLm1ldGFkYXRhLmNzc1xuXHRjc3MuZm9yRWFjaCAocnVsZSkgLT5cblx0XHRyZXR1cm4gaWYgXy5pbmNsdWRlcyBydWxlLCAnLyonXG5cdFx0YXJyID0gcnVsZS5zcGxpdCgnOiAnKVxuXHRcdGNzc09ialthcnJbMF1dID0gYXJyWzFdLnJlcGxhY2UoJzsnLCcnKVxuXHR0LnN0eWxlID0gY3NzT2JqXG5cdFxuXHRpbXBvcnRQYXRoID0gbGF5ZXIuX19mcmFtZXJJbXBvcnRlZEZyb21QYXRoXG5cdGlmIF8uaW5jbHVkZXMgaW1wb3J0UGF0aCwgJ0AyeCdcblx0XHR0LmZvbnRTaXplICo9IDJcblx0XHR0LmxpbmVIZWlnaHQgPSAocGFyc2VJbnQodC5saW5lSGVpZ2h0KSoyKSsncHgnXG5cdFx0dC5sZXR0ZXJTcGFjaW5nICo9IDJcblx0XHRcdFx0XHRcblx0dC55IC09IChwYXJzZUludCh0LmxpbmVIZWlnaHQpLXQuZm9udFNpemUpLzIgIyBjb21wZW5zYXRlIGZvciBob3cgQ1NTIGhhbmRsZXMgbGluZSBoZWlnaHRcblx0dC55IC09IHQuZm9udFNpemUgKiAwLjEgIyBza2V0Y2ggcGFkZGluZ1xuXHR0LnggLT0gdC5mb250U2l6ZSAqIDAuMDggIyBza2V0Y2ggcGFkZGluZ1xuXHR0LndpZHRoICs9IHQuZm9udFNpemUgKiAwLjUgIyBza2V0Y2ggcGFkZGluZ1xuXG5cdHQudGV4dCA9IGxheWVyLl9pbmZvLm1ldGFkYXRhLnN0cmluZ1xuXHRsYXllci5kZXN0cm95KClcblx0cmV0dXJuIHRcblxuTGF5ZXI6OmNvbnZlcnRUb1RleHRMYXllciA9IC0+IGNvbnZlcnRUb1RleHRMYXllcihAKVxuXG5jb252ZXJ0VGV4dExheWVycyA9IChvYmopIC0+XG5cdGZvciBwcm9wLGxheWVyIG9mIG9ialxuXHRcdGlmIGxheWVyLl9pbmZvLmtpbmQgaXMgXCJ0ZXh0XCJcblx0XHRcdG9ialtwcm9wXSA9IGNvbnZlcnRUb1RleHRMYXllcihsYXllcilcblxuIyBCYWNrd2FyZHMgY29tcGFiaWxpdHkuIFJlcGxhY2VkIGJ5IGNvbnZlcnRUb1RleHRMYXllcigpXG5MYXllcjo6ZnJhbWVBc1RleHRMYXllciA9IChwcm9wZXJ0aWVzKSAtPlxuICAgIHQgPSBuZXcgVGV4dExheWVyXG4gICAgdC5mcmFtZSA9IEBmcmFtZVxuICAgIHQuc3VwZXJMYXllciA9IEBzdXBlckxheWVyXG4gICAgXy5leHRlbmQgdCxwcm9wZXJ0aWVzXG4gICAgQGRlc3Ryb3koKVxuICAgIHRcblxuZXhwb3J0cy5UZXh0TGF5ZXIgPSBUZXh0TGF5ZXJcbmV4cG9ydHMuY29udmVydFRleHRMYXllcnMgPSBjb252ZXJ0VGV4dExheWVyc1xuIiwiIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgQ3JlYXRlZCAwNyBKYW4gMjAxNiBieSBKb3JkYW4gUm9iZXJ0IERvYnNvbiAvIEBqb3JkYW5kb2Jzb24gLyBKb3JkYW5Eb2Jzb24uY29tXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuI1xuIyBWYWxpZCAmIFRlc3RlZCBJbnB1dEZpZWxkIFR5cGVzOiBcbiMgXHRcInRleHRcIiwgXCJlbWFpbFwiLCBcIm51bWJlclwiLCBcIm51bWJlci1vbmx5XCIsIFwidXJsXCIsIFwidGVsXCIsIFwicGFzc3dvcmRcIiwgXCJzZWFyY2hcIlxuIyBcdFwidGltZVwiLCBcIm1vbnRoXCIsIFwiZGF0ZVwiLCBcImRhdGV0aW1lLWxvY2FsXCJcbiMgXG4jIFRoZSB0aW1lICYgZGF0ZSB0eXBlcyBSRVFVSVJFIHRoZSB2YWx1ZSBwcm9wZXJ0eSBpcyBpbiBhIGNvcnJlY3QgZm9ybWF0ICYgSUdOT1JFIHRoZSBwbGFjZWhvbGRlciBwcm9wZXJ0eS5cbiMgXG4jIEhlcmUncyBhIGZldyBleGFtcGxlcyB0byB1c2UgZm9yIHRoZSB2YWx1ZTogcHJvcGVydHkgd2hlbiB5b3UgY3JlYXRlIHRoZW06XG4jXG4jIFx0KiB0aW1lOiBcIjEyOjM4XCJcbiMgXHQqIG1vbnRoOiBcIjIwMTYtMDFcIlxuIyBcdCogZGF0ZTogXCIyMDE2LTAxLTA0XCJcbiMgXHQqIGRhdGV0aW1lLWxvY2FsOiBcIjIwMTYtMDEtMDRUMTI6NDQ6MzEuMTkyXCJcbiNcbiMgTk9URVMgLyBcbiMgXHRTb21lIHR5cGVzIHdvcmsgYmV0dGVyIHRoYW4gb3RoZXJzIG9uIG1vYmlsZSBvciBkaXNwbGF5IGRpZmZlcmVudGx5IHRoYW4gZGVza3RvcC5cbiMgXHRBbGwgcHJvcGVydGllcyB3aWxsIHdvcmsgd2l0aCBpbnB1dCB0eXBlIFwidGV4dFwiIGJ1dCBtYXkgbm90IHdvcmsgd2l0aCBvdGhlciB0eXBlcy5cbiMgXHRTb21lIGV2ZW50cyB3b24ndCBmaXJlIGlmIHlvdSBlbnRlciBpbmNvcnJlY3QgY29udGVudCBmb3IgdGhlIGZpZWxkIHR5cGU6IGkuZS4gXCJoZWxsb1wiIGZvciBpbnB1dCB0eXBlIFwibnVtYmVyXCIuXG4jIFx0RmluZCBtb3JlIHBhdHRlcm5zIGZvciBWYWxpZCBhbmQgSW52YWxpZCBldmVudHMgYXQgaHR0cDovL2h0bWw1cGF0dGVybi5jb21cbiMgXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5cbmNsYXNzIGV4cG9ydHMuSW5wdXRGaWVsZCBleHRlbmRzIExheWVyXG5cblx0UEFUVEVSTl9OVU1CRVIgPSBcIlswLTldKlwiXG5cdFxuXHRJTlBVVF9ISURFX1BTVUVET19VSSAgPSBcInsgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lOyBkaXNwbGF5OiBub25lOyB9XCJcblx0SU5QVVRfU0VMRUNUT1JfTlVNQkVSID0gXCJpbnB1dFt0eXBlPW51bWJlcl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sIGlucHV0W3R5cGU9bnVtYmVyXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvblwiXG5cdElOUFVUX1NFTEVDVE9SX1NFQVJDSCA9IFwiaW5wdXRbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1jYW5jZWwtYnV0dG9uXCJcblx0XG5cdEV2ZW50cy5JbnB1dCAgID0gXCJJbnB1dEZpZWxkLk9uSW5wdXRcIlxuXHRFdmVudHMuRm9jdXMgICA9IFwiSW5wdXRGaWVsZC5PbkZvY3VzXCJcblx0RXZlbnRzLkJsdXIgICAgPSBcIklucHV0RmllbGQuT25CbHVyXCJcblx0RXZlbnRzLlZhbGlkICAgPSBcIklucHV0RmllbGQuT25WYWxpZFwiXG5cdEV2ZW50cy5JbnZhbGlkID0gXCJJbnB1dEZpZWxkLk9uSW52YWxpZFwiXG5cdEV2ZW50cy5NYXRjaCAgID0gXCJJbnB1dEZpZWxkLk9uTWF0Y2hcIlxuXHRcblx0QGRlZmluZSBcInZhbHVlXCIsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QGlucHV0LnZhbHVlXG5cdFx0XHRcblx0XHRzZXQ6ICh2KSAtPlxuXHRcdFx0cmV0dXJuIHVubGVzcyB2XG5cdFx0XHRpZiBAaW5wdXRcblx0XHRcdFx0QGNoYW5nZUlucHV0VmFsdWUgdlxuXG5cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XG5cdFx0QGlzTnVtYmVyID0gZmFsc2Vcblx0XHRAaXNTZWFyY2ggPSBmYWxzZVxuXHRcdFxuXHRcdEBpc0VtcHR5ICA9IHRydWVcblx0XHRAaXNWYWxpZCAgPSBudWxsXG5cdFx0QG9yaWdpbmFsVGV4dENvbG9yID0gbnVsbFxuXHRcdFxuXHRcdCMgTWFrZSBzdXJlIHdlIHNldCB0aGUgQ2hlY2tpbmcgRmxhZ1xuXHRcdEBzaG91bGRDaGVja1ZhbGlkaXR5ID0gdHJ1ZSBpZiBAb3B0aW9ucy5wYXR0ZXJuPyBvciBAb3B0aW9ucy5tYXRjaD9cblxuXHRcdCMgTWFrZSBzdXJlIHRoaXMgaXMgaW4gcHhcblx0XHRAb3B0aW9ucy5saW5lSGVpZ2h0ID0gXCIje0BvcHRpb25zLmxpbmVIZWlnaHR9cHhcIiBpZiBAb3B0aW9ucy5saW5lSGVpZ2h0P1xuXHRcdCBcdFx0XHRcdFx0XHRcdFx0XG5cdFx0IyBGcmFtZXIgTGF5ZXIgUHJvcHNcblx0XHRAb3B0aW9ucy5uYW1lICAgICAgICAgICAgID89IFwiI3tAb3B0aW9ucy50eXBlfUlucHV0XCJcblx0XHRAb3B0aW9ucy5jb2xvciAgICAgICAgICAgID89IFwiYmxhY2tcIlxuXHRcdEBvcHRpb25zLmJhY2tncm91bmRDb2xvciAgPz0gXCJcIlxuXHRcdEBvcHRpb25zLmJvcmRlclJhZGl1cyAgICAgPz0gMFxuXG5cdFx0IyBDdXN0b20gTGF5ZXIgUHJvcHNcdFx0XG5cdFx0QG9wdGlvbnMudHlwZSAgICAgICAgICAgICA/PSBcInRleHRcIlxuXHRcdEBvcHRpb25zLmZvbnRTaXplICAgICAgICAgPz0gMzJcblx0XHRAb3B0aW9ucy5mb250V2VpZ2h0ICAgICAgID89IDMwMFxuXHRcdEBvcHRpb25zLmZvbnRGYW1pbHkgICAgICAgPz0gXCItYXBwbGUtc3lzdGVtLCBIZWx2ZXRpY2EgTmV1ZVwiXG5cdFx0QG9wdGlvbnMubGluZUhlaWdodCAgICAgICA/PSAxLjI1XG5cdFx0QG9wdGlvbnMuaW5kZW50ICAgICAgICAgICA/PSAwXG5cdFx0QG9wdGlvbnMucGxhY2VIb2xkZXJGb2N1cyA/PSBudWxsXG5cdFx0QG9wdGlvbnMucGxhY2VIb2xkZXJDb2xvciA/PSBudWxsXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdCMgQWRqdXN0IGEgZmV3IHRoaW5ncyBmb3IgdmFyaW91cyB0eXBlc1xuXHRcdFxuXHRcdHN3aXRjaCBAb3B0aW9ucy50eXBlXG5cdFx0XHR3aGVuIFwic2VhcmNoXCIgdGhlbiBAaXNTZWFyY2ggPSB0cnVlXG5cdFx0XHR3aGVuIFwibnVtYmVyXCIgdGhlbiBAaXNOdW1iZXIgPSB0cnVlXG5cdFx0XHR3aGVuIFwibnVtYmVycy1vbmx5XCIsIFwibnVtYmVyLW9ubHlcIlxuXHRcdFx0XHRAaXNOdW1iZXIgPSB0cnVlXG5cdFx0XHRcdEBvcHRpb25zLnR5cGUgICAgPSBpZiBAb3B0aW9ucy5wYXR0ZXJuPyB0aGVuIFwibnVtYmVyXCIgICAgICAgICAgZWxzZSBcInRleHRcIlxuXHRcdFx0XHRAb3B0aW9ucy5wYXR0ZXJuID0gaWYgQG9wdGlvbnMucGF0dGVybj8gdGhlbiBAb3B0aW9ucy5wYXR0ZXJuIGVsc2UgUEFUVEVSTl9OVU1CRVJcblx0XHRcblx0XHRAaHRtbCArPSBzd2l0Y2hcblx0XHRcdHdoZW4gQGlzTnVtYmVyIHRoZW4gXCI8c3R5bGUgdHlwZT0ndGV4dC9jc3MnPiN7SU5QVVRfU0VMRUNUT1JfTlVNQkVSfSN7SU5QVVRfSElERV9QU1VFRE9fVUl9PC9zdHlsZT5cIlxuXHRcdFx0d2hlbiBAaXNTZWFyY2ggdGhlbiBcIjxzdHlsZSB0eXBlPSd0ZXh0L2Nzcyc+I3tJTlBVVF9TRUxFQ1RPUl9TRUFSQ0h9I3tJTlBVVF9ISURFX1BTVUVET19VSX08L3N0eWxlPlwiXG5cdFx0XHRlbHNlIFwiXCJcblxuXHRcdGlmIEBvcHRpb25zLnBsYWNlSG9sZGVyQ29sb3I/XG5cdFx0XHRAaHRtbCArPSBcIjxzdHlsZSB0eXBlPSd0ZXh0L2Nzcyc+Ojotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHsgY29sb3I6ICN7QG9wdGlvbnMucGxhY2VIb2xkZXJDb2xvcn07IH0gOjotbW96LXBsYWNlaG9sZGVyIHsgY29sb3I6ICN7QG9wdGlvbnMucGxhY2VIb2xkZXJDb2xvcn07IH0gOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7IGNvbG9yOiAje0BvcHRpb25zLnBsYWNlSG9sZGVyQ29sb3J9OyB9IDo6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHsgY29sb3I6ICN7QG9wdGlvbnMucGxhY2VIb2xkZXJDb2xvcn07IH0gOnBsYWNlaG9sZGVyLXNob3duIHsgY29sb3I6ICN7QG9wdGlvbnMucGxhY2VIb2xkZXJDb2xvcn07IH08L3N0eWxlPlwiXG5cdFx0XHRcblx0XHQjIENyZWF0ZSBUaGUgSW5wdXRcblx0XHRcblx0XHRAaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiaW5wdXRcIlxuXHRcdFxuXHRcdEBpbnB1dC50eXBlICAgICAgICA9IEBvcHRpb25zLnR5cGVcblx0XHRAaW5wdXQudmFsdWUgICAgICAgPSBAb3B0aW9ucy52YWx1ZSAgICAgICAgICAgICAgICAgIGlmIEBvcHRpb25zLnZhbHVlP1xuXHRcdEBpbnB1dC5wbGFjZWhvbGRlciA9IEBvcHRpb25zLnBsYWNlSG9sZGVyICAgICAgICAgICAgaWYgQG9wdGlvbnMucGxhY2VIb2xkZXI/XG5cdFx0QGlucHV0LnBhdHRlcm4gICAgID0gQG9wdGlvbnMucGF0dGVybiAgICAgICAgICAgICAgICBpZiBAb3B0aW9ucy5wYXR0ZXJuP1xuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJtYXhMZW5ndGhcIiwgQG9wdGlvbnMubWF4TGVuZ3RoKSBpZiBAb3B0aW9ucy5tYXhMZW5ndGg/XG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZShcImF1dG9jYXBpdGFsaXplXCIsIChpZiBAb3B0aW9ucy5hdXRvQ2FwaXRhbGl6ZSBpcyB0cnVlIHRoZW4gXCJvblwiIGVsc2UgXCJvZmZcIikpXG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZShcImF1dG9jb21wbGV0ZVwiLCAgIChpZiBAb3B0aW9ucy5hdXRvQ29tcGxldGUgICBpcyB0cnVlIHRoZW4gXCJvblwiIGVsc2UgXCJvZmZcIikpXG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZShcImF1dG9jb3JyZWN0XCIsICAgIChpZiBAb3B0aW9ucy5hdXRvQ29ycmVjdCAgICBpcyB0cnVlIHRoZW4gXCJvblwiIGVsc2UgXCJvZmZcIikpXG5cdFx0XG5cdFx0QF9lbGVtZW50LmFwcGVuZENoaWxkIEBpbnB1dFxuXHRcdFxuXHRcdCMgU2V0dXAgVmFsdWVzXG5cdFx0QGlzRW1wdHkgICAgICAgICAgID0gIShAb3B0aW9ucy52YWx1ZT8ubGVuZ3RoID4gMClcblx0XHRAb3JpZ2luYWxUZXh0Q29sb3IgPSBAb3B0aW9ucy5jb2xvclxuXHRcdFxuXHRcdCMgU2V0dXAgSW5wdXQgU3R5bGVcblx0XHRcblx0XHRpbnB1dFN0eWxlID1cblx0XHRcdGZvbnQ6IFwiI3tAb3B0aW9ucy5mb250V2VpZ2h0fSAje0BvcHRpb25zLmZvbnRTaXplfXB4LyN7QG9wdGlvbnMubGluZUhlaWdodH0gI3tAb3B0aW9ucy5mb250RmFtaWx5fVwiXG5cdFx0XHRvdXRsaW5lOiBcIm5vbmVcIlxuXHRcdFx0dGV4dEluZGVudDogXCIje0BvcHRpb25zLmluZGVudH1weFwiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdFx0aGVpZ2h0OiBcIjEwMCVcIlxuXHRcdFx0d2lkdGg6ICBcIjEwMCVcIlxuXHRcdFx0cG9pbnRlckV2ZW50czogXCJub25lXCJcblx0XHRcdG1hcmdpbjogXCIwXCJcblx0XHRcdHBhZGRpbmc6IFwiMFwiXG5cdFx0XHRcIi13ZWJraXQtYXBwZWFyYW5jZVwiOiBcIm5vbmVcIlxuXHRcdFx0XG5cdFx0QGlucHV0LnN0eWxlW2tleV0gID0gdmFsIGZvciBrZXksIHZhbCBvZiBpbnB1dFN0eWxlXG5cdFx0QGlucHV0LnN0eWxlLmNvbG9yID0gQG9wdGlvbnMuY29sb3IgaWYgQG9wdGlvbnMuY29sb3I/XG5cdFx0XG5cdFx0QGlucHV0Lm9uZm9jdXMgPSA9PlxuXHRcdFx0ZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwXG5cdFx0XHRAaW5wdXQucGxhY2Vob2xkZXIgPSBAb3B0aW9ucy5wbGFjZUhvbGRlckZvY3VzIGlmIEBvcHRpb25zLnBsYWNlSG9sZGVyRm9jdXM/XG5cdFx0XHRkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDBcblx0XHRcdEBlbWl0KEV2ZW50cy5Gb2N1cywgQGlucHV0LnZhbHVlLCBAKVxuXG5cdFx0QGlucHV0Lm9uYmx1ciAgPSA9PlxuXHRcdFx0ZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwXG5cdFx0XHR1bmxlc3MgQGlucHV0LnBsYWNlaG9sZGVyIGlzIEBvcHRpb25zLnBsYWNlSG9sZGVyIG9yICFAb3B0aW9ucy5wbGFjZUhvbGRlcj9cblx0XHRcdFx0QGlucHV0LnBsYWNlaG9sZGVyID0gQG9wdGlvbnMucGxhY2VIb2xkZXJcblx0XHRcdEBlbWl0KEV2ZW50cy5CbHVyLCBAaW5wdXQudmFsdWUsIEApXG5cblx0XHRAaW5wdXQub25pbnB1dCA9ID0+XG5cdFx0XHRAaXNFbXB0eSA9ICEoIEBpbnB1dC52YWx1ZT8ubGVuZ3RoID4gMClcblx0XHRcdEBlbWl0KEV2ZW50cy5JbnB1dCwgQGlucHV0LnZhbHVlLCBAKVxuXHRcdFx0QGNoZWNrVmFsaWRpdHkoKVxuXHRcdFx0XG5cdFx0QG9uIEV2ZW50cy5Ub3VjaEVuZCwgLT4gQGlucHV0LmZvY3VzKClcblx0XHRAb24gXCJjaGFuZ2U6Y29sb3JcIiwgIC0+IEBjaGFuZ2VJbnB1dFRleHRDb2xvcigpXG5cdFx0XG5cdGNoZWNrVmFsaWRpdHk6IC0+XG5cdFx0cmV0dXJuIHVubGVzcyBAc2hvdWxkQ2hlY2tWYWxpZGl0eVxuXG5cdFx0aWYgQG9wdGlvbnMucGF0dGVybj9cblx0XHRcdHZhbGlkaXR5ID0gQGlucHV0LmNoZWNrVmFsaWRpdHkoKVxuXHRcdFx0QGlzRW1wdHkgPSAhKCBAaW5wdXQudmFsdWU/Lmxlbmd0aCA+IDApXG5cdFx0XHRcblx0XHRcdGlmIEBpc1ZhbGlkIGlzbnQgdmFsaWRpdHkgb3IgQGlzRW1wdHlcblx0XHRcdFx0aWYgQGlzRW1wdHkgb3IgIXZhbGlkaXR5XG5cdFx0XHRcdFx0QGlzVmFsaWQgPSBmYWxzZVxuXHRcdFx0XHRcdEBlbWl0KEV2ZW50cy5JbnZhbGlkLCBAaW5wdXQudmFsdWUsIEApXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRAaXNWYWxpZCA9IHRydWVcblx0XHRcdFx0XHRAZW1pdChFdmVudHMuVmFsaWQsICAgQGlucHV0LnZhbHVlLCBAKVxuXHRcdFx0XHRcdFxuXHRcdGlmIEBjaGVja01hdGNoKClcblx0XHRcdEBpc1ZhbGlkID0gdHJ1ZVxuXHRcdFx0QGVtaXQoRXZlbnRzLk1hdGNoLCBAaW5wdXQudmFsdWUsIEApXG5cdFx0XHRcblx0Y2hlY2tNYXRjaDogLT5cblx0XHRyZXR1cm4gZmFsc2UgdW5sZXNzIEBvcHRpb25zLm1hdGNoP1xuXHRcdGlmIEFycmF5LmlzQXJyYXkoQG9wdGlvbnMubWF0Y2gpXG5cdFx0XHRmb3IgbWF0Y2ggaW4gQG9wdGlvbnMubWF0Y2hcblx0XHRcdFx0cmV0dXJuIHRydWUgaWYgQGlucHV0LnZhbHVlLmluZGV4T2YobWF0Y2gpID4gLTFcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdHJ1ZSBpZiBAaW5wdXQudmFsdWUuaW5kZXhPZihAb3B0aW9ucy5tYXRjaCkgPiAtMVxuXHRcdHJldHVybiBmYWxzZVxuXHRcdFx0XG5cdGNsZWFyOiAtPlxuXHRcdEBpbnB1dC52YWx1ZSA9IFwiXCJcblx0XHRAaXNWYWxpZCA9IG51bGxcblx0XHRAaXNFbXB0eSA9IHRydWVcblx0XHRcblx0Y2hhbmdlSW5wdXRUZXh0Q29sb3I6IC0+IFxuXHRcdEBpbnB1dC5zdHlsZS5jb2xvciA9IEBjb2xvci50b0hleFN0cmluZygpXG5cdFxuXHRjaGFuZ2VJbnB1dFZhbHVlOiAodikgLT5cblx0XHRAaW5wdXQudmFsdWUgPSB2XG5cdFx0QGlucHV0Lm9uaW5wdXQoKVxuXHRcdFxuXHRcdFxuXHRcdCIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBS0FBO0FEMEJBLElBQUE7OztBQUFNLE9BQU8sQ0FBQztBQUViLE1BQUE7Ozs7RUFBQSxjQUFBLEdBQWlCOztFQUVqQixvQkFBQSxHQUF3Qjs7RUFDeEIscUJBQUEsR0FBd0I7O0VBQ3hCLHFCQUFBLEdBQXdCOztFQUV4QixNQUFN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
