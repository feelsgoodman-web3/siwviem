"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps = (a, b2) => __defProps(a, __getOwnPropDescs(b2));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// ../../node_modules/.pnpm/universalify@2.0.0/node_modules/universalify/index.js
var require_universalify = __commonJS({
  "../../node_modules/.pnpm/universalify@2.0.0/node_modules/universalify/index.js"(exports) {
    "use strict";
    exports.fromCallback = function(fn) {
      return Object.defineProperty(function(...args) {
        if (typeof args[args.length - 1] === "function")
          fn.apply(this, args);
        else {
          return new Promise((resolve, reject) => {
            fn.call(
              this,
              ...args,
              (err, res) => err != null ? reject(err) : resolve(res)
            );
          });
        }
      }, "name", { value: fn.name });
    };
    exports.fromPromise = function(fn) {
      return Object.defineProperty(function(...args) {
        const cb = args[args.length - 1];
        if (typeof cb !== "function")
          return fn.apply(this, args);
        else
          fn.apply(this, args.slice(0, -1)).then((r3) => cb(null, r3), cb);
      }, "name", { value: fn.name });
    };
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/polyfills.js
var require_polyfills = __commonJS({
  "../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/polyfills.js"(exports, module2) {
    "use strict";
    var constants = require("constants");
    var origCwd = process.cwd;
    var cwd = null;
    var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function() {
      if (!cwd)
        cwd = origCwd.call(process);
      return cwd;
    };
    try {
      process.cwd();
    } catch (er) {
    }
    if (typeof process.chdir === "function") {
      chdir = process.chdir;
      process.chdir = function(d2) {
        cwd = null;
        chdir.call(process, d2);
      };
      if (Object.setPrototypeOf)
        Object.setPrototypeOf(process.chdir, chdir);
    }
    var chdir;
    module2.exports = patch;
    function patch(fs3) {
      if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
        patchLchmod(fs3);
      }
      if (!fs3.lutimes) {
        patchLutimes(fs3);
      }
      fs3.chown = chownFix(fs3.chown);
      fs3.fchown = chownFix(fs3.fchown);
      fs3.lchown = chownFix(fs3.lchown);
      fs3.chmod = chmodFix(fs3.chmod);
      fs3.fchmod = chmodFix(fs3.fchmod);
      fs3.lchmod = chmodFix(fs3.lchmod);
      fs3.chownSync = chownFixSync(fs3.chownSync);
      fs3.fchownSync = chownFixSync(fs3.fchownSync);
      fs3.lchownSync = chownFixSync(fs3.lchownSync);
      fs3.chmodSync = chmodFixSync(fs3.chmodSync);
      fs3.fchmodSync = chmodFixSync(fs3.fchmodSync);
      fs3.lchmodSync = chmodFixSync(fs3.lchmodSync);
      fs3.stat = statFix(fs3.stat);
      fs3.fstat = statFix(fs3.fstat);
      fs3.lstat = statFix(fs3.lstat);
      fs3.statSync = statFixSync(fs3.statSync);
      fs3.fstatSync = statFixSync(fs3.fstatSync);
      fs3.lstatSync = statFixSync(fs3.lstatSync);
      if (fs3.chmod && !fs3.lchmod) {
        fs3.lchmod = function(path, mode, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs3.lchmodSync = function() {
        };
      }
      if (fs3.chown && !fs3.lchown) {
        fs3.lchown = function(path, uid, gid, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs3.lchownSync = function() {
        };
      }
      if (platform === "win32") {
        fs3.rename = typeof fs3.rename !== "function" ? fs3.rename : function(fs$rename) {
          function rename(from, to, cb) {
            var start2 = Date.now();
            var backoff = 0;
            fs$rename(from, to, function CB(er) {
              if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start2 < 6e4) {
                setTimeout(function() {
                  fs3.stat(to, function(stater, st) {
                    if (stater && stater.code === "ENOENT")
                      fs$rename(from, to, CB);
                    else
                      cb(er);
                  });
                }, backoff);
                if (backoff < 100)
                  backoff += 10;
                return;
              }
              if (cb)
                cb(er);
            });
          }
          if (Object.setPrototypeOf)
            Object.setPrototypeOf(rename, fs$rename);
          return rename;
        }(fs3.rename);
      }
      fs3.read = typeof fs3.read !== "function" ? fs3.read : function(fs$read) {
        function read(fd, buffer, offset, length, position2, callback_) {
          var callback;
          if (callback_ && typeof callback_ === "function") {
            var eagCounter = 0;
            callback = function(er, _2, __) {
              if (er && er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                return fs$read.call(fs3, fd, buffer, offset, length, position2, callback);
              }
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs3, fd, buffer, offset, length, position2, callback);
        }
        if (Object.setPrototypeOf)
          Object.setPrototypeOf(read, fs$read);
        return read;
      }(fs3.read);
      fs3.readSync = typeof fs3.readSync !== "function" ? fs3.readSync : function(fs$readSync) {
        return function(fd, buffer, offset, length, position2) {
          var eagCounter = 0;
          while (true) {
            try {
              return fs$readSync.call(fs3, fd, buffer, offset, length, position2);
            } catch (er) {
              if (er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                continue;
              }
              throw er;
            }
          }
        };
      }(fs3.readSync);
      function patchLchmod(fs4) {
        fs4.lchmod = function(path, mode, callback) {
          fs4.open(
            path,
            constants.O_WRONLY | constants.O_SYMLINK,
            mode,
            function(err, fd) {
              if (err) {
                if (callback)
                  callback(err);
                return;
              }
              fs4.fchmod(fd, mode, function(err2) {
                fs4.close(fd, function(err22) {
                  if (callback)
                    callback(err2 || err22);
                });
              });
            }
          );
        };
        fs4.lchmodSync = function(path, mode) {
          var fd = fs4.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode);
          var threw = true;
          var ret;
          try {
            ret = fs4.fchmodSync(fd, mode);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs4.closeSync(fd);
              } catch (er) {
              }
            } else {
              fs4.closeSync(fd);
            }
          }
          return ret;
        };
      }
      function patchLutimes(fs4) {
        if (constants.hasOwnProperty("O_SYMLINK") && fs4.futimes) {
          fs4.lutimes = function(path, at, mt2, cb) {
            fs4.open(path, constants.O_SYMLINK, function(er, fd) {
              if (er) {
                if (cb)
                  cb(er);
                return;
              }
              fs4.futimes(fd, at, mt2, function(er2) {
                fs4.close(fd, function(er22) {
                  if (cb)
                    cb(er2 || er22);
                });
              });
            });
          };
          fs4.lutimesSync = function(path, at, mt2) {
            var fd = fs4.openSync(path, constants.O_SYMLINK);
            var ret;
            var threw = true;
            try {
              ret = fs4.futimesSync(fd, at, mt2);
              threw = false;
            } finally {
              if (threw) {
                try {
                  fs4.closeSync(fd);
                } catch (er) {
                }
              } else {
                fs4.closeSync(fd);
              }
            }
            return ret;
          };
        } else if (fs4.futimes) {
          fs4.lutimes = function(_a, _b, _c, cb) {
            if (cb)
              process.nextTick(cb);
          };
          fs4.lutimesSync = function() {
          };
        }
      }
      function chmodFix(orig) {
        if (!orig)
          return orig;
        return function(target, mode, cb) {
          return orig.call(fs3, target, mode, function(er) {
            if (chownErOk(er))
              er = null;
            if (cb)
              cb.apply(this, arguments);
          });
        };
      }
      function chmodFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, mode) {
          try {
            return orig.call(fs3, target, mode);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function chownFix(orig) {
        if (!orig)
          return orig;
        return function(target, uid, gid, cb) {
          return orig.call(fs3, target, uid, gid, function(er) {
            if (chownErOk(er))
              er = null;
            if (cb)
              cb.apply(this, arguments);
          });
        };
      }
      function chownFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, uid, gid) {
          try {
            return orig.call(fs3, target, uid, gid);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function statFix(orig) {
        if (!orig)
          return orig;
        return function(target, options, cb) {
          if (typeof options === "function") {
            cb = options;
            options = null;
          }
          function callback(er, stats) {
            if (stats) {
              if (stats.uid < 0)
                stats.uid += 4294967296;
              if (stats.gid < 0)
                stats.gid += 4294967296;
            }
            if (cb)
              cb.apply(this, arguments);
          }
          return options ? orig.call(fs3, target, options, callback) : orig.call(fs3, target, callback);
        };
      }
      function statFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, options) {
          var stats = options ? orig.call(fs3, target, options) : orig.call(fs3, target);
          if (stats) {
            if (stats.uid < 0)
              stats.uid += 4294967296;
            if (stats.gid < 0)
              stats.gid += 4294967296;
          }
          return stats;
        };
      }
      function chownErOk(er) {
        if (!er)
          return true;
        if (er.code === "ENOSYS")
          return true;
        var nonroot = !process.getuid || process.getuid() !== 0;
        if (nonroot) {
          if (er.code === "EINVAL" || er.code === "EPERM")
            return true;
        }
        return false;
      }
    }
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = __commonJS({
  "../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/legacy-streams.js"(exports, module2) {
    "use strict";
    var Stream = require("stream").Stream;
    module2.exports = legacy;
    function legacy(fs3) {
      return {
        ReadStream,
        WriteStream
      };
      function ReadStream(path, options) {
        if (!(this instanceof ReadStream))
          return new ReadStream(path, options);
        Stream.call(this);
        var self = this;
        this.path = path;
        this.fd = null;
        this.readable = true;
        this.paused = false;
        this.flags = "r";
        this.mode = 438;
        this.bufferSize = 64 * 1024;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.encoding)
          this.setEncoding(this.encoding);
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.end === void 0) {
            this.end = Infinity;
          } else if ("number" !== typeof this.end) {
            throw TypeError("end must be a Number");
          }
          if (this.start > this.end) {
            throw new Error("start must be <= end");
          }
          this.pos = this.start;
        }
        if (this.fd !== null) {
          process.nextTick(function() {
            self._read();
          });
          return;
        }
        fs3.open(this.path, this.flags, this.mode, function(err, fd) {
          if (err) {
            self.emit("error", err);
            self.readable = false;
            return;
          }
          self.fd = fd;
          self.emit("open", fd);
          self._read();
        });
      }
      function WriteStream(path, options) {
        if (!(this instanceof WriteStream))
          return new WriteStream(path, options);
        Stream.call(this);
        this.path = path;
        this.fd = null;
        this.writable = true;
        this.flags = "w";
        this.encoding = "binary";
        this.mode = 438;
        this.bytesWritten = 0;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.start < 0) {
            throw new Error("start must be >= zero");
          }
          this.pos = this.start;
        }
        this.busy = false;
        this._queue = [];
        if (this.fd === null) {
          this._open = fs3.open;
          this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
          this.flush();
        }
      }
    }
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/clone.js
var require_clone = __commonJS({
  "../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/clone.js"(exports, module2) {
    "use strict";
    module2.exports = clone;
    var getPrototypeOf = Object.getPrototypeOf || function(obj) {
      return obj.__proto__;
    };
    function clone(obj) {
      if (obj === null || typeof obj !== "object")
        return obj;
      if (obj instanceof Object)
        var copy = { __proto__: getPrototypeOf(obj) };
      else
        var copy = /* @__PURE__ */ Object.create(null);
      Object.getOwnPropertyNames(obj).forEach(function(key) {
        Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
      });
      return copy;
    }
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = __commonJS({
  "../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/graceful-fs.js"(exports, module2) {
    "use strict";
    var fs3 = require("fs");
    var polyfills = require_polyfills();
    var legacy = require_legacy_streams();
    var clone = require_clone();
    var util = require("util");
    var gracefulQueue;
    var previousSymbol;
    if (typeof Symbol === "function" && typeof Symbol.for === "function") {
      gracefulQueue = Symbol.for("graceful-fs.queue");
      previousSymbol = Symbol.for("graceful-fs.previous");
    } else {
      gracefulQueue = "___graceful-fs.queue";
      previousSymbol = "___graceful-fs.previous";
    }
    function noop() {
    }
    function publishQueue(context, queue2) {
      Object.defineProperty(context, gracefulQueue, {
        get: function() {
          return queue2;
        }
      });
    }
    var debug = noop;
    if (util.debuglog)
      debug = util.debuglog("gfs4");
    else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
      debug = function() {
        var m3 = util.format.apply(util, arguments);
        m3 = "GFS4: " + m3.split(/\n/).join("\nGFS4: ");
        console.error(m3);
      };
    if (!fs3[gracefulQueue]) {
      queue = global[gracefulQueue] || [];
      publishQueue(fs3, queue);
      fs3.close = function(fs$close) {
        function close(fd, cb) {
          return fs$close.call(fs3, fd, function(err) {
            if (!err) {
              resetQueue();
            }
            if (typeof cb === "function")
              cb.apply(this, arguments);
          });
        }
        Object.defineProperty(close, previousSymbol, {
          value: fs$close
        });
        return close;
      }(fs3.close);
      fs3.closeSync = function(fs$closeSync) {
        function closeSync(fd) {
          fs$closeSync.apply(fs3, arguments);
          resetQueue();
        }
        Object.defineProperty(closeSync, previousSymbol, {
          value: fs$closeSync
        });
        return closeSync;
      }(fs3.closeSync);
      if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
        process.on("exit", function() {
          debug(fs3[gracefulQueue]);
          require("assert").equal(fs3[gracefulQueue].length, 0);
        });
      }
    }
    var queue;
    if (!global[gracefulQueue]) {
      publishQueue(global, fs3[gracefulQueue]);
    }
    module2.exports = patch(clone(fs3));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs3.__patched) {
      module2.exports = patch(fs3);
      fs3.__patched = true;
    }
    function patch(fs4) {
      polyfills(fs4);
      fs4.gracefulify = patch;
      fs4.createReadStream = createReadStream;
      fs4.createWriteStream = createWriteStream;
      var fs$readFile = fs4.readFile;
      fs4.readFile = readFile;
      function readFile(path, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$readFile(path, options, cb);
        function go$readFile(path2, options2, cb2, startTime) {
          return fs$readFile(path2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$readFile, [path2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$writeFile = fs4.writeFile;
      fs4.writeFile = writeFile;
      function writeFile(path, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$writeFile(path, data, options, cb);
        function go$writeFile(path2, data2, options2, cb2, startTime) {
          return fs$writeFile(path2, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$writeFile, [path2, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$appendFile = fs4.appendFile;
      if (fs$appendFile)
        fs4.appendFile = appendFile;
      function appendFile(path, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$appendFile(path, data, options, cb);
        function go$appendFile(path2, data2, options2, cb2, startTime) {
          return fs$appendFile(path2, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$appendFile, [path2, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$copyFile = fs4.copyFile;
      if (fs$copyFile)
        fs4.copyFile = copyFile;
      function copyFile(src, dest, flags, cb) {
        if (typeof flags === "function") {
          cb = flags;
          flags = 0;
        }
        return go$copyFile(src, dest, flags, cb);
        function go$copyFile(src2, dest2, flags2, cb2, startTime) {
          return fs$copyFile(src2, dest2, flags2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$readdir = fs4.readdir;
      fs4.readdir = readdir;
      var noReaddirOptionVersions = /^v[0-5]\./;
      function readdir(path, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir2(path2, options2, cb2, startTime) {
          return fs$readdir(path2, fs$readdirCallback(
            path2,
            options2,
            cb2,
            startTime
          ));
        } : function go$readdir2(path2, options2, cb2, startTime) {
          return fs$readdir(path2, options2, fs$readdirCallback(
            path2,
            options2,
            cb2,
            startTime
          ));
        };
        return go$readdir(path, options, cb);
        function fs$readdirCallback(path2, options2, cb2, startTime) {
          return function(err, files) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([
                go$readdir,
                [path2, options2, cb2],
                err,
                startTime || Date.now(),
                Date.now()
              ]);
            else {
              if (files && files.sort)
                files.sort();
              if (typeof cb2 === "function")
                cb2.call(this, err, files);
            }
          };
        }
      }
      if (process.version.substr(0, 4) === "v0.8") {
        var legStreams = legacy(fs4);
        ReadStream = legStreams.ReadStream;
        WriteStream = legStreams.WriteStream;
      }
      var fs$ReadStream = fs4.ReadStream;
      if (fs$ReadStream) {
        ReadStream.prototype = Object.create(fs$ReadStream.prototype);
        ReadStream.prototype.open = ReadStream$open;
      }
      var fs$WriteStream = fs4.WriteStream;
      if (fs$WriteStream) {
        WriteStream.prototype = Object.create(fs$WriteStream.prototype);
        WriteStream.prototype.open = WriteStream$open;
      }
      Object.defineProperty(fs4, "ReadStream", {
        get: function() {
          return ReadStream;
        },
        set: function(val) {
          ReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(fs4, "WriteStream", {
        get: function() {
          return WriteStream;
        },
        set: function(val) {
          WriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileReadStream = ReadStream;
      Object.defineProperty(fs4, "FileReadStream", {
        get: function() {
          return FileReadStream;
        },
        set: function(val) {
          FileReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileWriteStream = WriteStream;
      Object.defineProperty(fs4, "FileWriteStream", {
        get: function() {
          return FileWriteStream;
        },
        set: function(val) {
          FileWriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      function ReadStream(path, options) {
        if (this instanceof ReadStream)
          return fs$ReadStream.apply(this, arguments), this;
        else
          return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
      }
      function ReadStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            if (that.autoClose)
              that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
            that.read();
          }
        });
      }
      function WriteStream(path, options) {
        if (this instanceof WriteStream)
          return fs$WriteStream.apply(this, arguments), this;
        else
          return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
      }
      function WriteStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
          }
        });
      }
      function createReadStream(path, options) {
        return new fs4.ReadStream(path, options);
      }
      function createWriteStream(path, options) {
        return new fs4.WriteStream(path, options);
      }
      var fs$open = fs4.open;
      fs4.open = open;
      function open(path, flags, mode, cb) {
        if (typeof mode === "function")
          cb = mode, mode = null;
        return go$open(path, flags, mode, cb);
        function go$open(path2, flags2, mode2, cb2, startTime) {
          return fs$open(path2, flags2, mode2, function(err, fd) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$open, [path2, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      return fs4;
    }
    function enqueue(elem) {
      debug("ENQUEUE", elem[0].name, elem[1]);
      fs3[gracefulQueue].push(elem);
      retry();
    }
    var retryTimer;
    function resetQueue() {
      var now = Date.now();
      for (var i = 0; i < fs3[gracefulQueue].length; ++i) {
        if (fs3[gracefulQueue][i].length > 2) {
          fs3[gracefulQueue][i][3] = now;
          fs3[gracefulQueue][i][4] = now;
        }
      }
      retry();
    }
    function retry() {
      clearTimeout(retryTimer);
      retryTimer = void 0;
      if (fs3[gracefulQueue].length === 0)
        return;
      var elem = fs3[gracefulQueue].shift();
      var fn = elem[0];
      var args = elem[1];
      var err = elem[2];
      var startTime = elem[3];
      var lastTime = elem[4];
      if (startTime === void 0) {
        debug("RETRY", fn.name, args);
        fn.apply(null, args);
      } else if (Date.now() - startTime >= 6e4) {
        debug("TIMEOUT", fn.name, args);
        var cb = args.pop();
        if (typeof cb === "function")
          cb.call(null, err);
      } else {
        var sinceAttempt = Date.now() - lastTime;
        var sinceStart = Math.max(lastTime - startTime, 1);
        var desiredDelay = Math.min(sinceStart * 1.2, 100);
        if (sinceAttempt >= desiredDelay) {
          debug("RETRY", fn.name, args);
          fn.apply(null, args.concat([startTime]));
        } else {
          fs3[gracefulQueue].push(elem);
        }
      }
      if (retryTimer === void 0) {
        retryTimer = setTimeout(retry, 0);
      }
    }
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/fs/index.js
var require_fs = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/fs/index.js"(exports) {
    "use strict";
    var u2 = require_universalify().fromCallback;
    var fs3 = require_graceful_fs();
    var api = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((key) => {
      return typeof fs3[key] === "function";
    });
    Object.assign(exports, fs3);
    api.forEach((method) => {
      exports[method] = u2(fs3[method]);
    });
    exports.exists = function(filename, callback) {
      if (typeof callback === "function") {
        return fs3.exists(filename, callback);
      }
      return new Promise((resolve) => {
        return fs3.exists(filename, resolve);
      });
    };
    exports.read = function(fd, buffer, offset, length, position2, callback) {
      if (typeof callback === "function") {
        return fs3.read(fd, buffer, offset, length, position2, callback);
      }
      return new Promise((resolve, reject) => {
        fs3.read(fd, buffer, offset, length, position2, (err, bytesRead, buffer2) => {
          if (err)
            return reject(err);
          resolve({ bytesRead, buffer: buffer2 });
        });
      });
    };
    exports.write = function(fd, buffer, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs3.write(fd, buffer, ...args);
      }
      return new Promise((resolve, reject) => {
        fs3.write(fd, buffer, ...args, (err, bytesWritten, buffer2) => {
          if (err)
            return reject(err);
          resolve({ bytesWritten, buffer: buffer2 });
        });
      });
    };
    exports.readv = function(fd, buffers, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs3.readv(fd, buffers, ...args);
      }
      return new Promise((resolve, reject) => {
        fs3.readv(fd, buffers, ...args, (err, bytesRead, buffers2) => {
          if (err)
            return reject(err);
          resolve({ bytesRead, buffers: buffers2 });
        });
      });
    };
    exports.writev = function(fd, buffers, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs3.writev(fd, buffers, ...args);
      }
      return new Promise((resolve, reject) => {
        fs3.writev(fd, buffers, ...args, (err, bytesWritten, buffers2) => {
          if (err)
            return reject(err);
          resolve({ bytesWritten, buffers: buffers2 });
        });
      });
    };
    if (typeof fs3.realpath.native === "function") {
      exports.realpath.native = u2(fs3.realpath.native);
    } else {
      process.emitWarning(
        "fs.realpath.native is not a function. Is fs being monkey-patched?",
        "Warning",
        "fs-extra-WARN0003"
      );
    }
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/mkdirs/utils.js
var require_utils = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/mkdirs/utils.js"(exports, module2) {
    "use strict";
    var path = require("path");
    module2.exports.checkPath = function checkPath(pth) {
      if (process.platform === "win32") {
        const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path.parse(pth).root, ""));
        if (pathHasInvalidWinCharacters) {
          const error = new Error(`Path contains invalid characters: ${pth}`);
          error.code = "EINVAL";
          throw error;
        }
      }
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/mkdirs/make-dir.js
var require_make_dir = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/mkdirs/make-dir.js"(exports, module2) {
    "use strict";
    var fs3 = require_fs();
    var { checkPath } = require_utils();
    var getMode = (options) => {
      const defaults = { mode: 511 };
      if (typeof options === "number")
        return options;
      return __spreadValues(__spreadValues({}, defaults), options).mode;
    };
    module2.exports.makeDir = (dir, options) => __async(exports, null, function* () {
      checkPath(dir);
      return fs3.mkdir(dir, {
        mode: getMode(options),
        recursive: true
      });
    });
    module2.exports.makeDirSync = (dir, options) => {
      checkPath(dir);
      return fs3.mkdirSync(dir, {
        mode: getMode(options),
        recursive: true
      });
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/mkdirs/index.js
var require_mkdirs = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/mkdirs/index.js"(exports, module2) {
    "use strict";
    var u2 = require_universalify().fromPromise;
    var { makeDir: _makeDir, makeDirSync } = require_make_dir();
    var makeDir = u2(_makeDir);
    module2.exports = {
      mkdirs: makeDir,
      mkdirsSync: makeDirSync,
      // alias
      mkdirp: makeDir,
      mkdirpSync: makeDirSync,
      ensureDir: makeDir,
      ensureDirSync: makeDirSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/path-exists/index.js
var require_path_exists = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/path-exists/index.js"(exports, module2) {
    "use strict";
    var u2 = require_universalify().fromPromise;
    var fs3 = require_fs();
    function pathExists(path) {
      return fs3.access(path).then(() => true).catch(() => false);
    }
    module2.exports = {
      pathExists: u2(pathExists),
      pathExistsSync: fs3.existsSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/util/utimes.js
var require_utimes = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/util/utimes.js"(exports, module2) {
    "use strict";
    var fs3 = require_graceful_fs();
    function utimesMillis(path, atime, mtime, callback) {
      fs3.open(path, "r+", (err, fd) => {
        if (err)
          return callback(err);
        fs3.futimes(fd, atime, mtime, (futimesErr) => {
          fs3.close(fd, (closeErr) => {
            if (callback)
              callback(futimesErr || closeErr);
          });
        });
      });
    }
    function utimesMillisSync(path, atime, mtime) {
      const fd = fs3.openSync(path, "r+");
      fs3.futimesSync(fd, atime, mtime);
      return fs3.closeSync(fd);
    }
    module2.exports = {
      utimesMillis,
      utimesMillisSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/util/stat.js
var require_stat = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/util/stat.js"(exports, module2) {
    "use strict";
    var fs3 = require_fs();
    var path = require("path");
    var util = require("util");
    function getStats(src, dest, opts) {
      const statFunc = opts.dereference ? (file) => fs3.stat(file, { bigint: true }) : (file) => fs3.lstat(file, { bigint: true });
      return Promise.all([
        statFunc(src),
        statFunc(dest).catch((err) => {
          if (err.code === "ENOENT")
            return null;
          throw err;
        })
      ]).then(([srcStat, destStat]) => ({ srcStat, destStat }));
    }
    function getStatsSync(src, dest, opts) {
      let destStat;
      const statFunc = opts.dereference ? (file) => fs3.statSync(file, { bigint: true }) : (file) => fs3.lstatSync(file, { bigint: true });
      const srcStat = statFunc(src);
      try {
        destStat = statFunc(dest);
      } catch (err) {
        if (err.code === "ENOENT")
          return { srcStat, destStat: null };
        throw err;
      }
      return { srcStat, destStat };
    }
    function checkPaths(src, dest, funcName, opts, cb) {
      util.callbackify(getStats)(src, dest, opts, (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat, destStat } = stats;
        if (destStat) {
          if (areIdentical(srcStat, destStat)) {
            const srcBaseName = path.basename(src);
            const destBaseName = path.basename(dest);
            if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
              return cb(null, { srcStat, destStat, isChangingCase: true });
            }
            return cb(new Error("Source and destination must not be the same."));
          }
          if (srcStat.isDirectory() && !destStat.isDirectory()) {
            return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`));
          }
          if (!srcStat.isDirectory() && destStat.isDirectory()) {
            return cb(new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`));
          }
        }
        if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
          return cb(new Error(errMsg(src, dest, funcName)));
        }
        return cb(null, { srcStat, destStat });
      });
    }
    function checkPathsSync(src, dest, funcName, opts) {
      const { srcStat, destStat } = getStatsSync(src, dest, opts);
      if (destStat) {
        if (areIdentical(srcStat, destStat)) {
          const srcBaseName = path.basename(src);
          const destBaseName = path.basename(dest);
          if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
            return { srcStat, destStat, isChangingCase: true };
          }
          throw new Error("Source and destination must not be the same.");
        }
        if (srcStat.isDirectory() && !destStat.isDirectory()) {
          throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
        }
        if (!srcStat.isDirectory() && destStat.isDirectory()) {
          throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
        }
      }
      if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return { srcStat, destStat };
    }
    function checkParentPaths(src, srcStat, dest, funcName, cb) {
      const srcParent = path.resolve(path.dirname(src));
      const destParent = path.resolve(path.dirname(dest));
      if (destParent === srcParent || destParent === path.parse(destParent).root)
        return cb();
      fs3.stat(destParent, { bigint: true }, (err, destStat) => {
        if (err) {
          if (err.code === "ENOENT")
            return cb();
          return cb(err);
        }
        if (areIdentical(srcStat, destStat)) {
          return cb(new Error(errMsg(src, dest, funcName)));
        }
        return checkParentPaths(src, srcStat, destParent, funcName, cb);
      });
    }
    function checkParentPathsSync(src, srcStat, dest, funcName) {
      const srcParent = path.resolve(path.dirname(src));
      const destParent = path.resolve(path.dirname(dest));
      if (destParent === srcParent || destParent === path.parse(destParent).root)
        return;
      let destStat;
      try {
        destStat = fs3.statSync(destParent, { bigint: true });
      } catch (err) {
        if (err.code === "ENOENT")
          return;
        throw err;
      }
      if (areIdentical(srcStat, destStat)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return checkParentPathsSync(src, srcStat, destParent, funcName);
    }
    function areIdentical(srcStat, destStat) {
      return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev;
    }
    function isSrcSubdir(src, dest) {
      const srcArr = path.resolve(src).split(path.sep).filter((i) => i);
      const destArr = path.resolve(dest).split(path.sep).filter((i) => i);
      return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true);
    }
    function errMsg(src, dest, funcName) {
      return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
    }
    module2.exports = {
      checkPaths,
      checkPathsSync,
      checkParentPaths,
      checkParentPathsSync,
      isSrcSubdir,
      areIdentical
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/copy/copy.js
var require_copy = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/copy/copy.js"(exports, module2) {
    "use strict";
    var fs3 = require_graceful_fs();
    var path = require("path");
    var mkdirs = require_mkdirs().mkdirs;
    var pathExists = require_path_exists().pathExists;
    var utimesMillis = require_utimes().utimesMillis;
    var stat = require_stat();
    function copy(src, dest, opts, cb) {
      if (typeof opts === "function" && !cb) {
        cb = opts;
        opts = {};
      } else if (typeof opts === "function") {
        opts = { filter: opts };
      }
      cb = cb || function() {
      };
      opts = opts || {};
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        process.emitWarning(
          "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
          "Warning",
          "fs-extra-WARN0001"
        );
      }
      stat.checkPaths(src, dest, "copy", opts, (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat, destStat } = stats;
        stat.checkParentPaths(src, srcStat, dest, "copy", (err2) => {
          if (err2)
            return cb(err2);
          runFilter(src, dest, opts, (err3, include) => {
            if (err3)
              return cb(err3);
            if (!include)
              return cb();
            checkParentDir(destStat, src, dest, opts, cb);
          });
        });
      });
    }
    function checkParentDir(destStat, src, dest, opts, cb) {
      const destParent = path.dirname(dest);
      pathExists(destParent, (err, dirExists) => {
        if (err)
          return cb(err);
        if (dirExists)
          return getStats(destStat, src, dest, opts, cb);
        mkdirs(destParent, (err2) => {
          if (err2)
            return cb(err2);
          return getStats(destStat, src, dest, opts, cb);
        });
      });
    }
    function runFilter(src, dest, opts, cb) {
      if (!opts.filter)
        return cb(null, true);
      Promise.resolve(opts.filter(src, dest)).then((include) => cb(null, include), (error) => cb(error));
    }
    function getStats(destStat, src, dest, opts, cb) {
      const stat2 = opts.dereference ? fs3.stat : fs3.lstat;
      stat2(src, (err, srcStat) => {
        if (err)
          return cb(err);
        if (srcStat.isDirectory())
          return onDir(srcStat, destStat, src, dest, opts, cb);
        else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
          return onFile(srcStat, destStat, src, dest, opts, cb);
        else if (srcStat.isSymbolicLink())
          return onLink(destStat, src, dest, opts, cb);
        else if (srcStat.isSocket())
          return cb(new Error(`Cannot copy a socket file: ${src}`));
        else if (srcStat.isFIFO())
          return cb(new Error(`Cannot copy a FIFO pipe: ${src}`));
        return cb(new Error(`Unknown file: ${src}`));
      });
    }
    function onFile(srcStat, destStat, src, dest, opts, cb) {
      if (!destStat)
        return copyFile(srcStat, src, dest, opts, cb);
      return mayCopyFile(srcStat, src, dest, opts, cb);
    }
    function mayCopyFile(srcStat, src, dest, opts, cb) {
      if (opts.overwrite) {
        fs3.unlink(dest, (err) => {
          if (err)
            return cb(err);
          return copyFile(srcStat, src, dest, opts, cb);
        });
      } else if (opts.errorOnExist) {
        return cb(new Error(`'${dest}' already exists`));
      } else
        return cb();
    }
    function copyFile(srcStat, src, dest, opts, cb) {
      fs3.copyFile(src, dest, (err) => {
        if (err)
          return cb(err);
        if (opts.preserveTimestamps)
          return handleTimestampsAndMode(srcStat.mode, src, dest, cb);
        return setDestMode(dest, srcStat.mode, cb);
      });
    }
    function handleTimestampsAndMode(srcMode, src, dest, cb) {
      if (fileIsNotWritable(srcMode)) {
        return makeFileWritable(dest, srcMode, (err) => {
          if (err)
            return cb(err);
          return setDestTimestampsAndMode(srcMode, src, dest, cb);
        });
      }
      return setDestTimestampsAndMode(srcMode, src, dest, cb);
    }
    function fileIsNotWritable(srcMode) {
      return (srcMode & 128) === 0;
    }
    function makeFileWritable(dest, srcMode, cb) {
      return setDestMode(dest, srcMode | 128, cb);
    }
    function setDestTimestampsAndMode(srcMode, src, dest, cb) {
      setDestTimestamps(src, dest, (err) => {
        if (err)
          return cb(err);
        return setDestMode(dest, srcMode, cb);
      });
    }
    function setDestMode(dest, srcMode, cb) {
      return fs3.chmod(dest, srcMode, cb);
    }
    function setDestTimestamps(src, dest, cb) {
      fs3.stat(src, (err, updatedSrcStat) => {
        if (err)
          return cb(err);
        return utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime, cb);
      });
    }
    function onDir(srcStat, destStat, src, dest, opts, cb) {
      if (!destStat)
        return mkDirAndCopy(srcStat.mode, src, dest, opts, cb);
      return copyDir(src, dest, opts, cb);
    }
    function mkDirAndCopy(srcMode, src, dest, opts, cb) {
      fs3.mkdir(dest, (err) => {
        if (err)
          return cb(err);
        copyDir(src, dest, opts, (err2) => {
          if (err2)
            return cb(err2);
          return setDestMode(dest, srcMode, cb);
        });
      });
    }
    function copyDir(src, dest, opts, cb) {
      fs3.readdir(src, (err, items2) => {
        if (err)
          return cb(err);
        return copyDirItems(items2, src, dest, opts, cb);
      });
    }
    function copyDirItems(items2, src, dest, opts, cb) {
      const item = items2.pop();
      if (!item)
        return cb();
      return copyDirItem(items2, item, src, dest, opts, cb);
    }
    function copyDirItem(items2, item, src, dest, opts, cb) {
      const srcItem = path.join(src, item);
      const destItem = path.join(dest, item);
      runFilter(srcItem, destItem, opts, (err, include) => {
        if (err)
          return cb(err);
        if (!include)
          return copyDirItems(items2, src, dest, opts, cb);
        stat.checkPaths(srcItem, destItem, "copy", opts, (err2, stats) => {
          if (err2)
            return cb(err2);
          const { destStat } = stats;
          getStats(destStat, srcItem, destItem, opts, (err3) => {
            if (err3)
              return cb(err3);
            return copyDirItems(items2, src, dest, opts, cb);
          });
        });
      });
    }
    function onLink(destStat, src, dest, opts, cb) {
      fs3.readlink(src, (err, resolvedSrc) => {
        if (err)
          return cb(err);
        if (opts.dereference) {
          resolvedSrc = path.resolve(process.cwd(), resolvedSrc);
        }
        if (!destStat) {
          return fs3.symlink(resolvedSrc, dest, cb);
        } else {
          fs3.readlink(dest, (err2, resolvedDest) => {
            if (err2) {
              if (err2.code === "EINVAL" || err2.code === "UNKNOWN")
                return fs3.symlink(resolvedSrc, dest, cb);
              return cb(err2);
            }
            if (opts.dereference) {
              resolvedDest = path.resolve(process.cwd(), resolvedDest);
            }
            if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
              return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`));
            }
            if (stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
              return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`));
            }
            return copyLink(resolvedSrc, dest, cb);
          });
        }
      });
    }
    function copyLink(resolvedSrc, dest, cb) {
      fs3.unlink(dest, (err) => {
        if (err)
          return cb(err);
        return fs3.symlink(resolvedSrc, dest, cb);
      });
    }
    module2.exports = copy;
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/copy/copy-sync.js
var require_copy_sync = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/copy/copy-sync.js"(exports, module2) {
    "use strict";
    var fs3 = require_graceful_fs();
    var path = require("path");
    var mkdirsSync = require_mkdirs().mkdirsSync;
    var utimesMillisSync = require_utimes().utimesMillisSync;
    var stat = require_stat();
    function copySync(src, dest, opts) {
      if (typeof opts === "function") {
        opts = { filter: opts };
      }
      opts = opts || {};
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        process.emitWarning(
          "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
          "Warning",
          "fs-extra-WARN0002"
        );
      }
      const { srcStat, destStat } = stat.checkPathsSync(src, dest, "copy", opts);
      stat.checkParentPathsSync(src, srcStat, dest, "copy");
      if (opts.filter && !opts.filter(src, dest))
        return;
      const destParent = path.dirname(dest);
      if (!fs3.existsSync(destParent))
        mkdirsSync(destParent);
      return getStats(destStat, src, dest, opts);
    }
    function getStats(destStat, src, dest, opts) {
      const statSync = opts.dereference ? fs3.statSync : fs3.lstatSync;
      const srcStat = statSync(src);
      if (srcStat.isDirectory())
        return onDir(srcStat, destStat, src, dest, opts);
      else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
        return onFile(srcStat, destStat, src, dest, opts);
      else if (srcStat.isSymbolicLink())
        return onLink(destStat, src, dest, opts);
      else if (srcStat.isSocket())
        throw new Error(`Cannot copy a socket file: ${src}`);
      else if (srcStat.isFIFO())
        throw new Error(`Cannot copy a FIFO pipe: ${src}`);
      throw new Error(`Unknown file: ${src}`);
    }
    function onFile(srcStat, destStat, src, dest, opts) {
      if (!destStat)
        return copyFile(srcStat, src, dest, opts);
      return mayCopyFile(srcStat, src, dest, opts);
    }
    function mayCopyFile(srcStat, src, dest, opts) {
      if (opts.overwrite) {
        fs3.unlinkSync(dest);
        return copyFile(srcStat, src, dest, opts);
      } else if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`);
      }
    }
    function copyFile(srcStat, src, dest, opts) {
      fs3.copyFileSync(src, dest);
      if (opts.preserveTimestamps)
        handleTimestamps(srcStat.mode, src, dest);
      return setDestMode(dest, srcStat.mode);
    }
    function handleTimestamps(srcMode, src, dest) {
      if (fileIsNotWritable(srcMode))
        makeFileWritable(dest, srcMode);
      return setDestTimestamps(src, dest);
    }
    function fileIsNotWritable(srcMode) {
      return (srcMode & 128) === 0;
    }
    function makeFileWritable(dest, srcMode) {
      return setDestMode(dest, srcMode | 128);
    }
    function setDestMode(dest, srcMode) {
      return fs3.chmodSync(dest, srcMode);
    }
    function setDestTimestamps(src, dest) {
      const updatedSrcStat = fs3.statSync(src);
      return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
    }
    function onDir(srcStat, destStat, src, dest, opts) {
      if (!destStat)
        return mkDirAndCopy(srcStat.mode, src, dest, opts);
      return copyDir(src, dest, opts);
    }
    function mkDirAndCopy(srcMode, src, dest, opts) {
      fs3.mkdirSync(dest);
      copyDir(src, dest, opts);
      return setDestMode(dest, srcMode);
    }
    function copyDir(src, dest, opts) {
      fs3.readdirSync(src).forEach((item) => copyDirItem(item, src, dest, opts));
    }
    function copyDirItem(item, src, dest, opts) {
      const srcItem = path.join(src, item);
      const destItem = path.join(dest, item);
      if (opts.filter && !opts.filter(srcItem, destItem))
        return;
      const { destStat } = stat.checkPathsSync(srcItem, destItem, "copy", opts);
      return getStats(destStat, srcItem, destItem, opts);
    }
    function onLink(destStat, src, dest, opts) {
      let resolvedSrc = fs3.readlinkSync(src);
      if (opts.dereference) {
        resolvedSrc = path.resolve(process.cwd(), resolvedSrc);
      }
      if (!destStat) {
        return fs3.symlinkSync(resolvedSrc, dest);
      } else {
        let resolvedDest;
        try {
          resolvedDest = fs3.readlinkSync(dest);
        } catch (err) {
          if (err.code === "EINVAL" || err.code === "UNKNOWN")
            return fs3.symlinkSync(resolvedSrc, dest);
          throw err;
        }
        if (opts.dereference) {
          resolvedDest = path.resolve(process.cwd(), resolvedDest);
        }
        if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
          throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
        }
        if (stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
          throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
        }
        return copyLink(resolvedSrc, dest);
      }
    }
    function copyLink(resolvedSrc, dest) {
      fs3.unlinkSync(dest);
      return fs3.symlinkSync(resolvedSrc, dest);
    }
    module2.exports = copySync;
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/copy/index.js
var require_copy2 = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/copy/index.js"(exports, module2) {
    "use strict";
    var u2 = require_universalify().fromCallback;
    module2.exports = {
      copy: u2(require_copy()),
      copySync: require_copy_sync()
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/remove/index.js
var require_remove = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/remove/index.js"(exports, module2) {
    "use strict";
    var fs3 = require_graceful_fs();
    var u2 = require_universalify().fromCallback;
    function remove(path, callback) {
      fs3.rm(path, { recursive: true, force: true }, callback);
    }
    function removeSync(path) {
      fs3.rmSync(path, { recursive: true, force: true });
    }
    module2.exports = {
      remove: u2(remove),
      removeSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/empty/index.js
var require_empty = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/empty/index.js"(exports, module2) {
    "use strict";
    var u2 = require_universalify().fromPromise;
    var fs3 = require_fs();
    var path = require("path");
    var mkdir = require_mkdirs();
    var remove = require_remove();
    var emptyDir = u2(function emptyDir2(dir) {
      return __async(this, null, function* () {
        let items2;
        try {
          items2 = yield fs3.readdir(dir);
        } catch (e) {
          return mkdir.mkdirs(dir);
        }
        return Promise.all(items2.map((item) => remove.remove(path.join(dir, item))));
      });
    });
    function emptyDirSync(dir) {
      let items2;
      try {
        items2 = fs3.readdirSync(dir);
      } catch (e) {
        return mkdir.mkdirsSync(dir);
      }
      items2.forEach((item) => {
        item = path.join(dir, item);
        remove.removeSync(item);
      });
    }
    module2.exports = {
      emptyDirSync,
      emptydirSync: emptyDirSync,
      emptyDir,
      emptydir: emptyDir
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/file.js
var require_file = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/file.js"(exports, module2) {
    "use strict";
    var u2 = require_universalify().fromCallback;
    var path = require("path");
    var fs3 = require_graceful_fs();
    var mkdir = require_mkdirs();
    function createFile(file, callback) {
      function makeFile() {
        fs3.writeFile(file, "", (err) => {
          if (err)
            return callback(err);
          callback();
        });
      }
      fs3.stat(file, (err, stats) => {
        if (!err && stats.isFile())
          return callback();
        const dir = path.dirname(file);
        fs3.stat(dir, (err2, stats2) => {
          if (err2) {
            if (err2.code === "ENOENT") {
              return mkdir.mkdirs(dir, (err3) => {
                if (err3)
                  return callback(err3);
                makeFile();
              });
            }
            return callback(err2);
          }
          if (stats2.isDirectory())
            makeFile();
          else {
            fs3.readdir(dir, (err3) => {
              if (err3)
                return callback(err3);
            });
          }
        });
      });
    }
    function createFileSync(file) {
      let stats;
      try {
        stats = fs3.statSync(file);
      } catch (e) {
      }
      if (stats && stats.isFile())
        return;
      const dir = path.dirname(file);
      try {
        if (!fs3.statSync(dir).isDirectory()) {
          fs3.readdirSync(dir);
        }
      } catch (err) {
        if (err && err.code === "ENOENT")
          mkdir.mkdirsSync(dir);
        else
          throw err;
      }
      fs3.writeFileSync(file, "");
    }
    module2.exports = {
      createFile: u2(createFile),
      createFileSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/link.js
var require_link = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/link.js"(exports, module2) {
    "use strict";
    var u2 = require_universalify().fromCallback;
    var path = require("path");
    var fs3 = require_graceful_fs();
    var mkdir = require_mkdirs();
    var pathExists = require_path_exists().pathExists;
    var { areIdentical } = require_stat();
    function createLink(srcpath, dstpath, callback) {
      function makeLink(srcpath2, dstpath2) {
        fs3.link(srcpath2, dstpath2, (err) => {
          if (err)
            return callback(err);
          callback(null);
        });
      }
      fs3.lstat(dstpath, (_2, dstStat) => {
        fs3.lstat(srcpath, (err, srcStat) => {
          if (err) {
            err.message = err.message.replace("lstat", "ensureLink");
            return callback(err);
          }
          if (dstStat && areIdentical(srcStat, dstStat))
            return callback(null);
          const dir = path.dirname(dstpath);
          pathExists(dir, (err2, dirExists) => {
            if (err2)
              return callback(err2);
            if (dirExists)
              return makeLink(srcpath, dstpath);
            mkdir.mkdirs(dir, (err3) => {
              if (err3)
                return callback(err3);
              makeLink(srcpath, dstpath);
            });
          });
        });
      });
    }
    function createLinkSync(srcpath, dstpath) {
      let dstStat;
      try {
        dstStat = fs3.lstatSync(dstpath);
      } catch (e) {
      }
      try {
        const srcStat = fs3.lstatSync(srcpath);
        if (dstStat && areIdentical(srcStat, dstStat))
          return;
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureLink");
        throw err;
      }
      const dir = path.dirname(dstpath);
      const dirExists = fs3.existsSync(dir);
      if (dirExists)
        return fs3.linkSync(srcpath, dstpath);
      mkdir.mkdirsSync(dir);
      return fs3.linkSync(srcpath, dstpath);
    }
    module2.exports = {
      createLink: u2(createLink),
      createLinkSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/symlink-paths.js
var require_symlink_paths = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/symlink-paths.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var fs3 = require_graceful_fs();
    var pathExists = require_path_exists().pathExists;
    function symlinkPaths(srcpath, dstpath, callback) {
      if (path.isAbsolute(srcpath)) {
        return fs3.lstat(srcpath, (err) => {
          if (err) {
            err.message = err.message.replace("lstat", "ensureSymlink");
            return callback(err);
          }
          return callback(null, {
            toCwd: srcpath,
            toDst: srcpath
          });
        });
      } else {
        const dstdir = path.dirname(dstpath);
        const relativeToDst = path.join(dstdir, srcpath);
        return pathExists(relativeToDst, (err, exists) => {
          if (err)
            return callback(err);
          if (exists) {
            return callback(null, {
              toCwd: relativeToDst,
              toDst: srcpath
            });
          } else {
            return fs3.lstat(srcpath, (err2) => {
              if (err2) {
                err2.message = err2.message.replace("lstat", "ensureSymlink");
                return callback(err2);
              }
              return callback(null, {
                toCwd: srcpath,
                toDst: path.relative(dstdir, srcpath)
              });
            });
          }
        });
      }
    }
    function symlinkPathsSync(srcpath, dstpath) {
      let exists;
      if (path.isAbsolute(srcpath)) {
        exists = fs3.existsSync(srcpath);
        if (!exists)
          throw new Error("absolute srcpath does not exist");
        return {
          toCwd: srcpath,
          toDst: srcpath
        };
      } else {
        const dstdir = path.dirname(dstpath);
        const relativeToDst = path.join(dstdir, srcpath);
        exists = fs3.existsSync(relativeToDst);
        if (exists) {
          return {
            toCwd: relativeToDst,
            toDst: srcpath
          };
        } else {
          exists = fs3.existsSync(srcpath);
          if (!exists)
            throw new Error("relative srcpath does not exist");
          return {
            toCwd: srcpath,
            toDst: path.relative(dstdir, srcpath)
          };
        }
      }
    }
    module2.exports = {
      symlinkPaths,
      symlinkPathsSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/symlink-type.js
var require_symlink_type = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/symlink-type.js"(exports, module2) {
    "use strict";
    var fs3 = require_graceful_fs();
    function symlinkType(srcpath, type, callback) {
      callback = typeof type === "function" ? type : callback;
      type = typeof type === "function" ? false : type;
      if (type)
        return callback(null, type);
      fs3.lstat(srcpath, (err, stats) => {
        if (err)
          return callback(null, "file");
        type = stats && stats.isDirectory() ? "dir" : "file";
        callback(null, type);
      });
    }
    function symlinkTypeSync(srcpath, type) {
      let stats;
      if (type)
        return type;
      try {
        stats = fs3.lstatSync(srcpath);
      } catch (e) {
        return "file";
      }
      return stats && stats.isDirectory() ? "dir" : "file";
    }
    module2.exports = {
      symlinkType,
      symlinkTypeSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/symlink.js
var require_symlink = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/symlink.js"(exports, module2) {
    "use strict";
    var u2 = require_universalify().fromCallback;
    var path = require("path");
    var fs3 = require_fs();
    var _mkdirs = require_mkdirs();
    var mkdirs = _mkdirs.mkdirs;
    var mkdirsSync = _mkdirs.mkdirsSync;
    var _symlinkPaths = require_symlink_paths();
    var symlinkPaths = _symlinkPaths.symlinkPaths;
    var symlinkPathsSync = _symlinkPaths.symlinkPathsSync;
    var _symlinkType = require_symlink_type();
    var symlinkType = _symlinkType.symlinkType;
    var symlinkTypeSync = _symlinkType.symlinkTypeSync;
    var pathExists = require_path_exists().pathExists;
    var { areIdentical } = require_stat();
    function createSymlink(srcpath, dstpath, type, callback) {
      callback = typeof type === "function" ? type : callback;
      type = typeof type === "function" ? false : type;
      fs3.lstat(dstpath, (err, stats) => {
        if (!err && stats.isSymbolicLink()) {
          Promise.all([
            fs3.stat(srcpath),
            fs3.stat(dstpath)
          ]).then(([srcStat, dstStat]) => {
            if (areIdentical(srcStat, dstStat))
              return callback(null);
            _createSymlink(srcpath, dstpath, type, callback);
          });
        } else
          _createSymlink(srcpath, dstpath, type, callback);
      });
    }
    function _createSymlink(srcpath, dstpath, type, callback) {
      symlinkPaths(srcpath, dstpath, (err, relative) => {
        if (err)
          return callback(err);
        srcpath = relative.toDst;
        symlinkType(relative.toCwd, type, (err2, type2) => {
          if (err2)
            return callback(err2);
          const dir = path.dirname(dstpath);
          pathExists(dir, (err3, dirExists) => {
            if (err3)
              return callback(err3);
            if (dirExists)
              return fs3.symlink(srcpath, dstpath, type2, callback);
            mkdirs(dir, (err4) => {
              if (err4)
                return callback(err4);
              fs3.symlink(srcpath, dstpath, type2, callback);
            });
          });
        });
      });
    }
    function createSymlinkSync(srcpath, dstpath, type) {
      let stats;
      try {
        stats = fs3.lstatSync(dstpath);
      } catch (e) {
      }
      if (stats && stats.isSymbolicLink()) {
        const srcStat = fs3.statSync(srcpath);
        const dstStat = fs3.statSync(dstpath);
        if (areIdentical(srcStat, dstStat))
          return;
      }
      const relative = symlinkPathsSync(srcpath, dstpath);
      srcpath = relative.toDst;
      type = symlinkTypeSync(relative.toCwd, type);
      const dir = path.dirname(dstpath);
      const exists = fs3.existsSync(dir);
      if (exists)
        return fs3.symlinkSync(srcpath, dstpath, type);
      mkdirsSync(dir);
      return fs3.symlinkSync(srcpath, dstpath, type);
    }
    module2.exports = {
      createSymlink: u2(createSymlink),
      createSymlinkSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/index.js
var require_ensure = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/ensure/index.js"(exports, module2) {
    "use strict";
    var { createFile, createFileSync } = require_file();
    var { createLink, createLinkSync } = require_link();
    var { createSymlink, createSymlinkSync } = require_symlink();
    module2.exports = {
      // file
      createFile,
      createFileSync,
      ensureFile: createFile,
      ensureFileSync: createFileSync,
      // link
      createLink,
      createLinkSync,
      ensureLink: createLink,
      ensureLinkSync: createLinkSync,
      // symlink
      createSymlink,
      createSymlinkSync,
      ensureSymlink: createSymlink,
      ensureSymlinkSync: createSymlinkSync
    };
  }
});

// ../../node_modules/.pnpm/jsonfile@6.1.0/node_modules/jsonfile/utils.js
var require_utils2 = __commonJS({
  "../../node_modules/.pnpm/jsonfile@6.1.0/node_modules/jsonfile/utils.js"(exports, module2) {
    "use strict";
    function stringify(obj, { EOL = "\n", finalEOL = true, replacer = null, spaces } = {}) {
      const EOF = finalEOL ? EOL : "";
      const str = JSON.stringify(obj, replacer, spaces);
      return str.replace(/\n/g, EOL) + EOF;
    }
    function stripBom(content2) {
      if (Buffer.isBuffer(content2))
        content2 = content2.toString("utf8");
      return content2.replace(/^\uFEFF/, "");
    }
    module2.exports = { stringify, stripBom };
  }
});

// ../../node_modules/.pnpm/jsonfile@6.1.0/node_modules/jsonfile/index.js
var require_jsonfile = __commonJS({
  "../../node_modules/.pnpm/jsonfile@6.1.0/node_modules/jsonfile/index.js"(exports, module2) {
    "use strict";
    var _fs;
    try {
      _fs = require_graceful_fs();
    } catch (_2) {
      _fs = require("fs");
    }
    var universalify = require_universalify();
    var { stringify, stripBom } = require_utils2();
    function _readFile(_0) {
      return __async(this, arguments, function* (file, options = {}) {
        if (typeof options === "string") {
          options = { encoding: options };
        }
        const fs3 = options.fs || _fs;
        const shouldThrow = "throws" in options ? options.throws : true;
        let data = yield universalify.fromCallback(fs3.readFile)(file, options);
        data = stripBom(data);
        let obj;
        try {
          obj = JSON.parse(data, options ? options.reviver : null);
        } catch (err) {
          if (shouldThrow) {
            err.message = `${file}: ${err.message}`;
            throw err;
          } else {
            return null;
          }
        }
        return obj;
      });
    }
    var readFile = universalify.fromPromise(_readFile);
    function readFileSync(file, options = {}) {
      if (typeof options === "string") {
        options = { encoding: options };
      }
      const fs3 = options.fs || _fs;
      const shouldThrow = "throws" in options ? options.throws : true;
      try {
        let content2 = fs3.readFileSync(file, options);
        content2 = stripBom(content2);
        return JSON.parse(content2, options.reviver);
      } catch (err) {
        if (shouldThrow) {
          err.message = `${file}: ${err.message}`;
          throw err;
        } else {
          return null;
        }
      }
    }
    function _writeFile(_0, _1) {
      return __async(this, arguments, function* (file, obj, options = {}) {
        const fs3 = options.fs || _fs;
        const str = stringify(obj, options);
        yield universalify.fromCallback(fs3.writeFile)(file, str, options);
      });
    }
    var writeFile = universalify.fromPromise(_writeFile);
    function writeFileSync(file, obj, options = {}) {
      const fs3 = options.fs || _fs;
      const str = stringify(obj, options);
      return fs3.writeFileSync(file, str, options);
    }
    var jsonfile = {
      readFile,
      readFileSync,
      writeFile,
      writeFileSync
    };
    module2.exports = jsonfile;
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/json/jsonfile.js
var require_jsonfile2 = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/json/jsonfile.js"(exports, module2) {
    "use strict";
    var jsonFile = require_jsonfile();
    module2.exports = {
      // jsonfile exports
      readJson: jsonFile.readFile,
      readJsonSync: jsonFile.readFileSync,
      writeJson: jsonFile.writeFile,
      writeJsonSync: jsonFile.writeFileSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/output-file/index.js
var require_output_file = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/output-file/index.js"(exports, module2) {
    "use strict";
    var u2 = require_universalify().fromCallback;
    var fs3 = require_graceful_fs();
    var path = require("path");
    var mkdir = require_mkdirs();
    var pathExists = require_path_exists().pathExists;
    function outputFile(file, data, encoding, callback) {
      if (typeof encoding === "function") {
        callback = encoding;
        encoding = "utf8";
      }
      const dir = path.dirname(file);
      pathExists(dir, (err, itDoes) => {
        if (err)
          return callback(err);
        if (itDoes)
          return fs3.writeFile(file, data, encoding, callback);
        mkdir.mkdirs(dir, (err2) => {
          if (err2)
            return callback(err2);
          fs3.writeFile(file, data, encoding, callback);
        });
      });
    }
    function outputFileSync(file, ...args) {
      const dir = path.dirname(file);
      if (fs3.existsSync(dir)) {
        return fs3.writeFileSync(file, ...args);
      }
      mkdir.mkdirsSync(dir);
      fs3.writeFileSync(file, ...args);
    }
    module2.exports = {
      outputFile: u2(outputFile),
      outputFileSync
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/json/output-json.js
var require_output_json = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/json/output-json.js"(exports, module2) {
    "use strict";
    var { stringify } = require_utils2();
    var { outputFile } = require_output_file();
    function outputJson(_0, _1) {
      return __async(this, arguments, function* (file, data, options = {}) {
        const str = stringify(data, options);
        yield outputFile(file, str, options);
      });
    }
    module2.exports = outputJson;
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/json/output-json-sync.js
var require_output_json_sync = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/json/output-json-sync.js"(exports, module2) {
    "use strict";
    var { stringify } = require_utils2();
    var { outputFileSync } = require_output_file();
    function outputJsonSync(file, data, options) {
      const str = stringify(data, options);
      outputFileSync(file, str, options);
    }
    module2.exports = outputJsonSync;
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/json/index.js
var require_json = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/json/index.js"(exports, module2) {
    "use strict";
    var u2 = require_universalify().fromPromise;
    var jsonFile = require_jsonfile2();
    jsonFile.outputJson = u2(require_output_json());
    jsonFile.outputJsonSync = require_output_json_sync();
    jsonFile.outputJSON = jsonFile.outputJson;
    jsonFile.outputJSONSync = jsonFile.outputJsonSync;
    jsonFile.writeJSON = jsonFile.writeJson;
    jsonFile.writeJSONSync = jsonFile.writeJsonSync;
    jsonFile.readJSON = jsonFile.readJson;
    jsonFile.readJSONSync = jsonFile.readJsonSync;
    module2.exports = jsonFile;
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/move/move.js
var require_move = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/move/move.js"(exports, module2) {
    "use strict";
    var fs3 = require_graceful_fs();
    var path = require("path");
    var copy = require_copy2().copy;
    var remove = require_remove().remove;
    var mkdirp = require_mkdirs().mkdirp;
    var pathExists = require_path_exists().pathExists;
    var stat = require_stat();
    function move(src, dest, opts, cb) {
      if (typeof opts === "function") {
        cb = opts;
        opts = {};
      }
      opts = opts || {};
      const overwrite = opts.overwrite || opts.clobber || false;
      stat.checkPaths(src, dest, "move", opts, (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat, isChangingCase = false } = stats;
        stat.checkParentPaths(src, srcStat, dest, "move", (err2) => {
          if (err2)
            return cb(err2);
          if (isParentRoot(dest))
            return doRename(src, dest, overwrite, isChangingCase, cb);
          mkdirp(path.dirname(dest), (err3) => {
            if (err3)
              return cb(err3);
            return doRename(src, dest, overwrite, isChangingCase, cb);
          });
        });
      });
    }
    function isParentRoot(dest) {
      const parent = path.dirname(dest);
      const parsedPath = path.parse(parent);
      return parsedPath.root === parent;
    }
    function doRename(src, dest, overwrite, isChangingCase, cb) {
      if (isChangingCase)
        return rename(src, dest, overwrite, cb);
      if (overwrite) {
        return remove(dest, (err) => {
          if (err)
            return cb(err);
          return rename(src, dest, overwrite, cb);
        });
      }
      pathExists(dest, (err, destExists) => {
        if (err)
          return cb(err);
        if (destExists)
          return cb(new Error("dest already exists."));
        return rename(src, dest, overwrite, cb);
      });
    }
    function rename(src, dest, overwrite, cb) {
      fs3.rename(src, dest, (err) => {
        if (!err)
          return cb();
        if (err.code !== "EXDEV")
          return cb(err);
        return moveAcrossDevice(src, dest, overwrite, cb);
      });
    }
    function moveAcrossDevice(src, dest, overwrite, cb) {
      const opts = {
        overwrite,
        errorOnExist: true,
        preserveTimestamps: true
      };
      copy(src, dest, opts, (err) => {
        if (err)
          return cb(err);
        return remove(src, cb);
      });
    }
    module2.exports = move;
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/move/move-sync.js
var require_move_sync = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/move/move-sync.js"(exports, module2) {
    "use strict";
    var fs3 = require_graceful_fs();
    var path = require("path");
    var copySync = require_copy2().copySync;
    var removeSync = require_remove().removeSync;
    var mkdirpSync = require_mkdirs().mkdirpSync;
    var stat = require_stat();
    function moveSync(src, dest, opts) {
      opts = opts || {};
      const overwrite = opts.overwrite || opts.clobber || false;
      const { srcStat, isChangingCase = false } = stat.checkPathsSync(src, dest, "move", opts);
      stat.checkParentPathsSync(src, srcStat, dest, "move");
      if (!isParentRoot(dest))
        mkdirpSync(path.dirname(dest));
      return doRename(src, dest, overwrite, isChangingCase);
    }
    function isParentRoot(dest) {
      const parent = path.dirname(dest);
      const parsedPath = path.parse(parent);
      return parsedPath.root === parent;
    }
    function doRename(src, dest, overwrite, isChangingCase) {
      if (isChangingCase)
        return rename(src, dest, overwrite);
      if (overwrite) {
        removeSync(dest);
        return rename(src, dest, overwrite);
      }
      if (fs3.existsSync(dest))
        throw new Error("dest already exists.");
      return rename(src, dest, overwrite);
    }
    function rename(src, dest, overwrite) {
      try {
        fs3.renameSync(src, dest);
      } catch (err) {
        if (err.code !== "EXDEV")
          throw err;
        return moveAcrossDevice(src, dest, overwrite);
      }
    }
    function moveAcrossDevice(src, dest, overwrite) {
      const opts = {
        overwrite,
        errorOnExist: true,
        preserveTimestamps: true
      };
      copySync(src, dest, opts);
      return removeSync(src);
    }
    module2.exports = moveSync;
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/move/index.js
var require_move2 = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/move/index.js"(exports, module2) {
    "use strict";
    var u2 = require_universalify().fromCallback;
    module2.exports = {
      move: u2(require_move()),
      moveSync: require_move_sync()
    };
  }
});

// ../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/.pnpm/fs-extra@11.1.1/node_modules/fs-extra/lib/index.js"(exports, module2) {
    "use strict";
    module2.exports = __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, require_fs()), require_copy2()), require_empty()), require_ensure()), require_json()), require_mkdirs()), require_move2()), require_output_file()), require_path_exists()), require_remove());
  }
});

// ../../node_modules/.pnpm/tailwindcss@3.3.3/node_modules/tailwindcss/lib/util/createPlugin.js
var require_createPlugin = __commonJS({
  "../../node_modules/.pnpm/tailwindcss@3.3.3/node_modules/tailwindcss/lib/util/createPlugin.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "default", {
      enumerable: true,
      get: function() {
        return _default;
      }
    });
    function createPlugin(plugin, config) {
      return {
        handler: plugin,
        config
      };
    }
    createPlugin.withOptions = function(pluginFunction, configFunction = () => ({})) {
      const optionsFunction = function(options) {
        return {
          __options: options,
          handler: pluginFunction(options),
          config: configFunction(options)
        };
      };
      optionsFunction.__isOptionsFunction = true;
      optionsFunction.__pluginFunction = pluginFunction;
      optionsFunction.__configFunction = configFunction;
      return optionsFunction;
    };
    var _default = createPlugin;
  }
});

// ../../node_modules/.pnpm/tailwindcss@3.3.3/node_modules/tailwindcss/lib/public/create-plugin.js
var require_create_plugin = __commonJS({
  "../../node_modules/.pnpm/tailwindcss@3.3.3/node_modules/tailwindcss/lib/public/create-plugin.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "default", {
      enumerable: true,
      get: function() {
        return _default;
      }
    });
    var _createPlugin = /* @__PURE__ */ _interop_require_default(require_createPlugin());
    function _interop_require_default(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var _default = _createPlugin.default;
  }
});

// ../../node_modules/.pnpm/tailwindcss@3.3.3/node_modules/tailwindcss/plugin.js
var require_plugin = __commonJS({
  "../../node_modules/.pnpm/tailwindcss@3.3.3/node_modules/tailwindcss/plugin.js"(exports, module2) {
    "use strict";
    var createPlugin = require_create_plugin();
    module2.exports = (createPlugin.__esModule ? createPlugin : { default: createPlugin }).default;
  }
});

// ../../node_modules/.pnpm/tailwindcss@3.3.3/node_modules/tailwindcss/lib/util/cloneDeep.js
var require_cloneDeep = __commonJS({
  "../../node_modules/.pnpm/tailwindcss@3.3.3/node_modules/tailwindcss/lib/util/cloneDeep.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "cloneDeep", {
      enumerable: true,
      get: function() {
        return cloneDeep;
      }
    });
    function cloneDeep(value) {
      if (Array.isArray(value)) {
        return value.map((child) => cloneDeep(child));
      }
      if (typeof value === "object" && value !== null) {
        return Object.fromEntries(Object.entries(value).map(([k2, v2]) => [
          k2,
          cloneDeep(v2)
        ]));
      }
      return value;
    }
  }
});

// ../../node_modules/.pnpm/tailwindcss@3.3.3/node_modules/tailwindcss/stubs/config.full.js
var require_config_full = __commonJS({
  "../../node_modules/.pnpm/tailwindcss@3.3.3/node_modules/tailwindcss/stubs/config.full.js"(exports, module2) {
    "use strict";
    module2.exports = {
      content: [],
      presets: [],
      darkMode: "media",
      // or 'class'
      theme: {
        accentColor: ({ theme }) => __spreadProps(__spreadValues({}, theme("colors")), {
          auto: "auto"
        }),
        animation: {
          none: "none",
          spin: "spin 1s linear infinite",
          ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
          pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          bounce: "bounce 1s infinite"
        },
        aria: {
          busy: 'busy="true"',
          checked: 'checked="true"',
          disabled: 'disabled="true"',
          expanded: 'expanded="true"',
          hidden: 'hidden="true"',
          pressed: 'pressed="true"',
          readonly: 'readonly="true"',
          required: 'required="true"',
          selected: 'selected="true"'
        },
        aspectRatio: {
          auto: "auto",
          square: "1 / 1",
          video: "16 / 9"
        },
        backdropBlur: ({ theme }) => theme("blur"),
        backdropBrightness: ({ theme }) => theme("brightness"),
        backdropContrast: ({ theme }) => theme("contrast"),
        backdropGrayscale: ({ theme }) => theme("grayscale"),
        backdropHueRotate: ({ theme }) => theme("hueRotate"),
        backdropInvert: ({ theme }) => theme("invert"),
        backdropOpacity: ({ theme }) => theme("opacity"),
        backdropSaturate: ({ theme }) => theme("saturate"),
        backdropSepia: ({ theme }) => theme("sepia"),
        backgroundColor: ({ theme }) => theme("colors"),
        backgroundImage: {
          none: "none",
          "gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))",
          "gradient-to-tr": "linear-gradient(to top right, var(--tw-gradient-stops))",
          "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
          "gradient-to-br": "linear-gradient(to bottom right, var(--tw-gradient-stops))",
          "gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
          "gradient-to-bl": "linear-gradient(to bottom left, var(--tw-gradient-stops))",
          "gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))",
          "gradient-to-tl": "linear-gradient(to top left, var(--tw-gradient-stops))"
        },
        backgroundOpacity: ({ theme }) => theme("opacity"),
        backgroundPosition: {
          bottom: "bottom",
          center: "center",
          left: "left",
          "left-bottom": "left bottom",
          "left-top": "left top",
          right: "right",
          "right-bottom": "right bottom",
          "right-top": "right top",
          top: "top"
        },
        backgroundSize: {
          auto: "auto",
          cover: "cover",
          contain: "contain"
        },
        blur: {
          0: "0",
          none: "0",
          sm: "4px",
          DEFAULT: "8px",
          md: "12px",
          lg: "16px",
          xl: "24px",
          "2xl": "40px",
          "3xl": "64px"
        },
        borderColor: ({ theme }) => __spreadProps(__spreadValues({}, theme("colors")), {
          DEFAULT: theme("colors.gray.200", "currentColor")
        }),
        borderOpacity: ({ theme }) => theme("opacity"),
        borderRadius: {
          none: "0px",
          sm: "0.125rem",
          DEFAULT: "0.25rem",
          md: "0.375rem",
          lg: "0.5rem",
          xl: "0.75rem",
          "2xl": "1rem",
          "3xl": "1.5rem",
          full: "9999px"
        },
        borderSpacing: ({ theme }) => __spreadValues({}, theme("spacing")),
        borderWidth: {
          DEFAULT: "1px",
          0: "0px",
          2: "2px",
          4: "4px",
          8: "8px"
        },
        boxShadow: {
          sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
          inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
          none: "none"
        },
        boxShadowColor: ({ theme }) => theme("colors"),
        brightness: {
          0: "0",
          50: ".5",
          75: ".75",
          90: ".9",
          95: ".95",
          100: "1",
          105: "1.05",
          110: "1.1",
          125: "1.25",
          150: "1.5",
          200: "2"
        },
        caretColor: ({ theme }) => theme("colors"),
        colors: ({ colors }) => ({
          inherit: colors.inherit,
          current: colors.current,
          transparent: colors.transparent,
          black: colors.black,
          white: colors.white,
          slate: colors.slate,
          gray: colors.gray,
          zinc: colors.zinc,
          neutral: colors.neutral,
          stone: colors.stone,
          red: colors.red,
          orange: colors.orange,
          amber: colors.amber,
          yellow: colors.yellow,
          lime: colors.lime,
          green: colors.green,
          emerald: colors.emerald,
          teal: colors.teal,
          cyan: colors.cyan,
          sky: colors.sky,
          blue: colors.blue,
          indigo: colors.indigo,
          violet: colors.violet,
          purple: colors.purple,
          fuchsia: colors.fuchsia,
          pink: colors.pink,
          rose: colors.rose
        }),
        columns: {
          auto: "auto",
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
          6: "6",
          7: "7",
          8: "8",
          9: "9",
          10: "10",
          11: "11",
          12: "12",
          "3xs": "16rem",
          "2xs": "18rem",
          xs: "20rem",
          sm: "24rem",
          md: "28rem",
          lg: "32rem",
          xl: "36rem",
          "2xl": "42rem",
          "3xl": "48rem",
          "4xl": "56rem",
          "5xl": "64rem",
          "6xl": "72rem",
          "7xl": "80rem"
        },
        container: {},
        content: {
          none: "none"
        },
        contrast: {
          0: "0",
          50: ".5",
          75: ".75",
          100: "1",
          125: "1.25",
          150: "1.5",
          200: "2"
        },
        cursor: {
          auto: "auto",
          default: "default",
          pointer: "pointer",
          wait: "wait",
          text: "text",
          move: "move",
          help: "help",
          "not-allowed": "not-allowed",
          none: "none",
          "context-menu": "context-menu",
          progress: "progress",
          cell: "cell",
          crosshair: "crosshair",
          "vertical-text": "vertical-text",
          alias: "alias",
          copy: "copy",
          "no-drop": "no-drop",
          grab: "grab",
          grabbing: "grabbing",
          "all-scroll": "all-scroll",
          "col-resize": "col-resize",
          "row-resize": "row-resize",
          "n-resize": "n-resize",
          "e-resize": "e-resize",
          "s-resize": "s-resize",
          "w-resize": "w-resize",
          "ne-resize": "ne-resize",
          "nw-resize": "nw-resize",
          "se-resize": "se-resize",
          "sw-resize": "sw-resize",
          "ew-resize": "ew-resize",
          "ns-resize": "ns-resize",
          "nesw-resize": "nesw-resize",
          "nwse-resize": "nwse-resize",
          "zoom-in": "zoom-in",
          "zoom-out": "zoom-out"
        },
        divideColor: ({ theme }) => theme("borderColor"),
        divideOpacity: ({ theme }) => theme("borderOpacity"),
        divideWidth: ({ theme }) => theme("borderWidth"),
        dropShadow: {
          sm: "0 1px 1px rgb(0 0 0 / 0.05)",
          DEFAULT: ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"],
          md: ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"],
          lg: ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"],
          xl: ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"],
          "2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
          none: "0 0 #0000"
        },
        fill: ({ theme }) => __spreadValues({
          none: "none"
        }, theme("colors")),
        flex: {
          1: "1 1 0%",
          auto: "1 1 auto",
          initial: "0 1 auto",
          none: "none"
        },
        flexBasis: ({ theme }) => __spreadProps(__spreadValues({
          auto: "auto"
        }, theme("spacing")), {
          "1/2": "50%",
          "1/3": "33.333333%",
          "2/3": "66.666667%",
          "1/4": "25%",
          "2/4": "50%",
          "3/4": "75%",
          "1/5": "20%",
          "2/5": "40%",
          "3/5": "60%",
          "4/5": "80%",
          "1/6": "16.666667%",
          "2/6": "33.333333%",
          "3/6": "50%",
          "4/6": "66.666667%",
          "5/6": "83.333333%",
          "1/12": "8.333333%",
          "2/12": "16.666667%",
          "3/12": "25%",
          "4/12": "33.333333%",
          "5/12": "41.666667%",
          "6/12": "50%",
          "7/12": "58.333333%",
          "8/12": "66.666667%",
          "9/12": "75%",
          "10/12": "83.333333%",
          "11/12": "91.666667%",
          full: "100%"
        }),
        flexGrow: {
          0: "0",
          DEFAULT: "1"
        },
        flexShrink: {
          0: "0",
          DEFAULT: "1"
        },
        fontFamily: {
          sans: [
            "ui-sans-serif",
            "system-ui",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            '"Noto Sans"',
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"'
          ],
          serif: ["ui-serif", "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
          mono: [
            "ui-monospace",
            "SFMono-Regular",
            "Menlo",
            "Monaco",
            "Consolas",
            '"Liberation Mono"',
            '"Courier New"',
            "monospace"
          ]
        },
        fontSize: {
          xs: ["0.75rem", { lineHeight: "1rem" }],
          sm: ["0.875rem", { lineHeight: "1.25rem" }],
          base: ["1rem", { lineHeight: "1.5rem" }],
          lg: ["1.125rem", { lineHeight: "1.75rem" }],
          xl: ["1.25rem", { lineHeight: "1.75rem" }],
          "2xl": ["1.5rem", { lineHeight: "2rem" }],
          "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
          "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
          "5xl": ["3rem", { lineHeight: "1" }],
          "6xl": ["3.75rem", { lineHeight: "1" }],
          "7xl": ["4.5rem", { lineHeight: "1" }],
          "8xl": ["6rem", { lineHeight: "1" }],
          "9xl": ["8rem", { lineHeight: "1" }]
        },
        fontWeight: {
          thin: "100",
          extralight: "200",
          light: "300",
          normal: "400",
          medium: "500",
          semibold: "600",
          bold: "700",
          extrabold: "800",
          black: "900"
        },
        gap: ({ theme }) => theme("spacing"),
        gradientColorStops: ({ theme }) => theme("colors"),
        gradientColorStopPositions: {
          "0%": "0%",
          "5%": "5%",
          "10%": "10%",
          "15%": "15%",
          "20%": "20%",
          "25%": "25%",
          "30%": "30%",
          "35%": "35%",
          "40%": "40%",
          "45%": "45%",
          "50%": "50%",
          "55%": "55%",
          "60%": "60%",
          "65%": "65%",
          "70%": "70%",
          "75%": "75%",
          "80%": "80%",
          "85%": "85%",
          "90%": "90%",
          "95%": "95%",
          "100%": "100%"
        },
        grayscale: {
          0: "0",
          DEFAULT: "100%"
        },
        gridAutoColumns: {
          auto: "auto",
          min: "min-content",
          max: "max-content",
          fr: "minmax(0, 1fr)"
        },
        gridAutoRows: {
          auto: "auto",
          min: "min-content",
          max: "max-content",
          fr: "minmax(0, 1fr)"
        },
        gridColumn: {
          auto: "auto",
          "span-1": "span 1 / span 1",
          "span-2": "span 2 / span 2",
          "span-3": "span 3 / span 3",
          "span-4": "span 4 / span 4",
          "span-5": "span 5 / span 5",
          "span-6": "span 6 / span 6",
          "span-7": "span 7 / span 7",
          "span-8": "span 8 / span 8",
          "span-9": "span 9 / span 9",
          "span-10": "span 10 / span 10",
          "span-11": "span 11 / span 11",
          "span-12": "span 12 / span 12",
          "span-full": "1 / -1"
        },
        gridColumnEnd: {
          auto: "auto",
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
          6: "6",
          7: "7",
          8: "8",
          9: "9",
          10: "10",
          11: "11",
          12: "12",
          13: "13"
        },
        gridColumnStart: {
          auto: "auto",
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
          6: "6",
          7: "7",
          8: "8",
          9: "9",
          10: "10",
          11: "11",
          12: "12",
          13: "13"
        },
        gridRow: {
          auto: "auto",
          "span-1": "span 1 / span 1",
          "span-2": "span 2 / span 2",
          "span-3": "span 3 / span 3",
          "span-4": "span 4 / span 4",
          "span-5": "span 5 / span 5",
          "span-6": "span 6 / span 6",
          "span-full": "1 / -1"
        },
        gridRowEnd: {
          auto: "auto",
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
          6: "6",
          7: "7"
        },
        gridRowStart: {
          auto: "auto",
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
          6: "6",
          7: "7"
        },
        gridTemplateColumns: {
          none: "none",
          1: "repeat(1, minmax(0, 1fr))",
          2: "repeat(2, minmax(0, 1fr))",
          3: "repeat(3, minmax(0, 1fr))",
          4: "repeat(4, minmax(0, 1fr))",
          5: "repeat(5, minmax(0, 1fr))",
          6: "repeat(6, minmax(0, 1fr))",
          7: "repeat(7, minmax(0, 1fr))",
          8: "repeat(8, minmax(0, 1fr))",
          9: "repeat(9, minmax(0, 1fr))",
          10: "repeat(10, minmax(0, 1fr))",
          11: "repeat(11, minmax(0, 1fr))",
          12: "repeat(12, minmax(0, 1fr))"
        },
        gridTemplateRows: {
          none: "none",
          1: "repeat(1, minmax(0, 1fr))",
          2: "repeat(2, minmax(0, 1fr))",
          3: "repeat(3, minmax(0, 1fr))",
          4: "repeat(4, minmax(0, 1fr))",
          5: "repeat(5, minmax(0, 1fr))",
          6: "repeat(6, minmax(0, 1fr))"
        },
        height: ({ theme }) => __spreadProps(__spreadValues({
          auto: "auto"
        }, theme("spacing")), {
          "1/2": "50%",
          "1/3": "33.333333%",
          "2/3": "66.666667%",
          "1/4": "25%",
          "2/4": "50%",
          "3/4": "75%",
          "1/5": "20%",
          "2/5": "40%",
          "3/5": "60%",
          "4/5": "80%",
          "1/6": "16.666667%",
          "2/6": "33.333333%",
          "3/6": "50%",
          "4/6": "66.666667%",
          "5/6": "83.333333%",
          full: "100%",
          screen: "100vh",
          min: "min-content",
          max: "max-content",
          fit: "fit-content"
        }),
        hueRotate: {
          0: "0deg",
          15: "15deg",
          30: "30deg",
          60: "60deg",
          90: "90deg",
          180: "180deg"
        },
        inset: ({ theme }) => __spreadProps(__spreadValues({
          auto: "auto"
        }, theme("spacing")), {
          "1/2": "50%",
          "1/3": "33.333333%",
          "2/3": "66.666667%",
          "1/4": "25%",
          "2/4": "50%",
          "3/4": "75%",
          full: "100%"
        }),
        invert: {
          0: "0",
          DEFAULT: "100%"
        },
        keyframes: {
          spin: {
            to: {
              transform: "rotate(360deg)"
            }
          },
          ping: {
            "75%, 100%": {
              transform: "scale(2)",
              opacity: "0"
            }
          },
          pulse: {
            "50%": {
              opacity: ".5"
            }
          },
          bounce: {
            "0%, 100%": {
              transform: "translateY(-25%)",
              animationTimingFunction: "cubic-bezier(0.8,0,1,1)"
            },
            "50%": {
              transform: "none",
              animationTimingFunction: "cubic-bezier(0,0,0.2,1)"
            }
          }
        },
        letterSpacing: {
          tighter: "-0.05em",
          tight: "-0.025em",
          normal: "0em",
          wide: "0.025em",
          wider: "0.05em",
          widest: "0.1em"
        },
        lineHeight: {
          none: "1",
          tight: "1.25",
          snug: "1.375",
          normal: "1.5",
          relaxed: "1.625",
          loose: "2",
          3: ".75rem",
          4: "1rem",
          5: "1.25rem",
          6: "1.5rem",
          7: "1.75rem",
          8: "2rem",
          9: "2.25rem",
          10: "2.5rem"
        },
        listStyleType: {
          none: "none",
          disc: "disc",
          decimal: "decimal"
        },
        listStyleImage: {
          none: "none"
        },
        margin: ({ theme }) => __spreadValues({
          auto: "auto"
        }, theme("spacing")),
        lineClamp: {
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
          6: "6"
        },
        maxHeight: ({ theme }) => __spreadProps(__spreadValues({}, theme("spacing")), {
          none: "none",
          full: "100%",
          screen: "100vh",
          min: "min-content",
          max: "max-content",
          fit: "fit-content"
        }),
        maxWidth: ({ theme, breakpoints: breakpoints2 }) => __spreadValues({
          none: "none",
          0: "0rem",
          xs: "20rem",
          sm: "24rem",
          md: "28rem",
          lg: "32rem",
          xl: "36rem",
          "2xl": "42rem",
          "3xl": "48rem",
          "4xl": "56rem",
          "5xl": "64rem",
          "6xl": "72rem",
          "7xl": "80rem",
          full: "100%",
          min: "min-content",
          max: "max-content",
          fit: "fit-content",
          prose: "65ch"
        }, breakpoints2(theme("screens"))),
        minHeight: {
          0: "0px",
          full: "100%",
          screen: "100vh",
          min: "min-content",
          max: "max-content",
          fit: "fit-content"
        },
        minWidth: {
          0: "0px",
          full: "100%",
          min: "min-content",
          max: "max-content",
          fit: "fit-content"
        },
        objectPosition: {
          bottom: "bottom",
          center: "center",
          left: "left",
          "left-bottom": "left bottom",
          "left-top": "left top",
          right: "right",
          "right-bottom": "right bottom",
          "right-top": "right top",
          top: "top"
        },
        opacity: {
          0: "0",
          5: "0.05",
          10: "0.1",
          20: "0.2",
          25: "0.25",
          30: "0.3",
          40: "0.4",
          50: "0.5",
          60: "0.6",
          70: "0.7",
          75: "0.75",
          80: "0.8",
          90: "0.9",
          95: "0.95",
          100: "1"
        },
        order: {
          first: "-9999",
          last: "9999",
          none: "0",
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
          6: "6",
          7: "7",
          8: "8",
          9: "9",
          10: "10",
          11: "11",
          12: "12"
        },
        outlineColor: ({ theme }) => theme("colors"),
        outlineOffset: {
          0: "0px",
          1: "1px",
          2: "2px",
          4: "4px",
          8: "8px"
        },
        outlineWidth: {
          0: "0px",
          1: "1px",
          2: "2px",
          4: "4px",
          8: "8px"
        },
        padding: ({ theme }) => theme("spacing"),
        placeholderColor: ({ theme }) => theme("colors"),
        placeholderOpacity: ({ theme }) => theme("opacity"),
        ringColor: ({ theme }) => __spreadValues({
          DEFAULT: theme("colors.blue.500", "#3b82f6")
        }, theme("colors")),
        ringOffsetColor: ({ theme }) => theme("colors"),
        ringOffsetWidth: {
          0: "0px",
          1: "1px",
          2: "2px",
          4: "4px",
          8: "8px"
        },
        ringOpacity: ({ theme }) => __spreadValues({
          DEFAULT: "0.5"
        }, theme("opacity")),
        ringWidth: {
          DEFAULT: "3px",
          0: "0px",
          1: "1px",
          2: "2px",
          4: "4px",
          8: "8px"
        },
        rotate: {
          0: "0deg",
          1: "1deg",
          2: "2deg",
          3: "3deg",
          6: "6deg",
          12: "12deg",
          45: "45deg",
          90: "90deg",
          180: "180deg"
        },
        saturate: {
          0: "0",
          50: ".5",
          100: "1",
          150: "1.5",
          200: "2"
        },
        scale: {
          0: "0",
          50: ".5",
          75: ".75",
          90: ".9",
          95: ".95",
          100: "1",
          105: "1.05",
          110: "1.1",
          125: "1.25",
          150: "1.5"
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px"
        },
        scrollMargin: ({ theme }) => __spreadValues({}, theme("spacing")),
        scrollPadding: ({ theme }) => theme("spacing"),
        sepia: {
          0: "0",
          DEFAULT: "100%"
        },
        skew: {
          0: "0deg",
          1: "1deg",
          2: "2deg",
          3: "3deg",
          6: "6deg",
          12: "12deg"
        },
        space: ({ theme }) => __spreadValues({}, theme("spacing")),
        spacing: {
          px: "1px",
          0: "0px",
          0.5: "0.125rem",
          1: "0.25rem",
          1.5: "0.375rem",
          2: "0.5rem",
          2.5: "0.625rem",
          3: "0.75rem",
          3.5: "0.875rem",
          4: "1rem",
          5: "1.25rem",
          6: "1.5rem",
          7: "1.75rem",
          8: "2rem",
          9: "2.25rem",
          10: "2.5rem",
          11: "2.75rem",
          12: "3rem",
          14: "3.5rem",
          16: "4rem",
          20: "5rem",
          24: "6rem",
          28: "7rem",
          32: "8rem",
          36: "9rem",
          40: "10rem",
          44: "11rem",
          48: "12rem",
          52: "13rem",
          56: "14rem",
          60: "15rem",
          64: "16rem",
          72: "18rem",
          80: "20rem",
          96: "24rem"
        },
        stroke: ({ theme }) => __spreadValues({
          none: "none"
        }, theme("colors")),
        strokeWidth: {
          0: "0",
          1: "1",
          2: "2"
        },
        supports: {},
        data: {},
        textColor: ({ theme }) => theme("colors"),
        textDecorationColor: ({ theme }) => theme("colors"),
        textDecorationThickness: {
          auto: "auto",
          "from-font": "from-font",
          0: "0px",
          1: "1px",
          2: "2px",
          4: "4px",
          8: "8px"
        },
        textIndent: ({ theme }) => __spreadValues({}, theme("spacing")),
        textOpacity: ({ theme }) => theme("opacity"),
        textUnderlineOffset: {
          auto: "auto",
          0: "0px",
          1: "1px",
          2: "2px",
          4: "4px",
          8: "8px"
        },
        transformOrigin: {
          center: "center",
          top: "top",
          "top-right": "top right",
          right: "right",
          "bottom-right": "bottom right",
          bottom: "bottom",
          "bottom-left": "bottom left",
          left: "left",
          "top-left": "top left"
        },
        transitionDelay: {
          0: "0s",
          75: "75ms",
          100: "100ms",
          150: "150ms",
          200: "200ms",
          300: "300ms",
          500: "500ms",
          700: "700ms",
          1e3: "1000ms"
        },
        transitionDuration: {
          DEFAULT: "150ms",
          0: "0s",
          75: "75ms",
          100: "100ms",
          150: "150ms",
          200: "200ms",
          300: "300ms",
          500: "500ms",
          700: "700ms",
          1e3: "1000ms"
        },
        transitionProperty: {
          none: "none",
          all: "all",
          DEFAULT: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
          colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
          opacity: "opacity",
          shadow: "box-shadow",
          transform: "transform"
        },
        transitionTimingFunction: {
          DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
          linear: "linear",
          in: "cubic-bezier(0.4, 0, 1, 1)",
          out: "cubic-bezier(0, 0, 0.2, 1)",
          "in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
        },
        translate: ({ theme }) => __spreadProps(__spreadValues({}, theme("spacing")), {
          "1/2": "50%",
          "1/3": "33.333333%",
          "2/3": "66.666667%",
          "1/4": "25%",
          "2/4": "50%",
          "3/4": "75%",
          full: "100%"
        }),
        width: ({ theme }) => __spreadProps(__spreadValues({
          auto: "auto"
        }, theme("spacing")), {
          "1/2": "50%",
          "1/3": "33.333333%",
          "2/3": "66.666667%",
          "1/4": "25%",
          "2/4": "50%",
          "3/4": "75%",
          "1/5": "20%",
          "2/5": "40%",
          "3/5": "60%",
          "4/5": "80%",
          "1/6": "16.666667%",
          "2/6": "33.333333%",
          "3/6": "50%",
          "4/6": "66.666667%",
          "5/6": "83.333333%",
          "1/12": "8.333333%",
          "2/12": "16.666667%",
          "3/12": "25%",
          "4/12": "33.333333%",
          "5/12": "41.666667%",
          "6/12": "50%",
          "7/12": "58.333333%",
          "8/12": "66.666667%",
          "9/12": "75%",
          "10/12": "83.333333%",
          "11/12": "91.666667%",
          full: "100%",
          screen: "100vw",
          min: "min-content",
          max: "max-content",
          fit: "fit-content"
        }),
        willChange: {
          auto: "auto",
          scroll: "scroll-position",
          contents: "contents",
          transform: "transform"
        },
        zIndex: {
          auto: "auto",
          0: "0",
          10: "10",
          20: "20",
          30: "30",
          40: "40",
          50: "50"
        }
      },
      plugins: []
    };
  }
});

// ../../node_modules/.pnpm/tailwindcss@3.3.3/node_modules/tailwindcss/lib/public/default-theme.js
var require_default_theme = __commonJS({
  "../../node_modules/.pnpm/tailwindcss@3.3.3/node_modules/tailwindcss/lib/public/default-theme.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "default", {
      enumerable: true,
      get: function() {
        return _default;
      }
    });
    var _cloneDeep = require_cloneDeep();
    var _configfull = /* @__PURE__ */ _interop_require_default(require_config_full());
    function _interop_require_default(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var _default = (0, _cloneDeep.cloneDeep)(_configfull.default.theme);
  }
});

// ../../node_modules/.pnpm/tailwindcss@3.3.3/node_modules/tailwindcss/defaultTheme.js
var require_defaultTheme = __commonJS({
  "../../node_modules/.pnpm/tailwindcss@3.3.3/node_modules/tailwindcss/defaultTheme.js"(exports, module2) {
    "use strict";
    var defaultTheme = require_default_theme();
    module2.exports = (defaultTheme.__esModule ? defaultTheme : { default: defaultTheme }).default;
  }
});

// ../../node_modules/.pnpm/clsx@2.0.0/node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f2, n = "";
  if ("string" == typeof e || "number" == typeof e)
    n += e;
  else if ("object" == typeof e)
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (f2 = r(e[t])) && (n && (n += " "), n += f2);
    else
      for (t in e)
        e[t] && (n && (n += " "), n += t);
  return n;
}
function clsx() {
  for (var e, t, f2 = 0, n = ""; f2 < arguments.length; )
    (e = arguments[f2++]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}

// src/utils/cvaWithBreakpoints.ts
var falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
var cx = clsx;
function transform(input) {
  if (!input)
    return {};
  return Object.keys(input).reduce((acc, key) => {
    const innerObj = input[key];
    for (const breakpoint in innerObj) {
      const bp = breakpoint;
      if (innerObj.hasOwnProperty(breakpoint)) {
        if (!acc[bp]) {
          acc[bp] = { [key]: innerObj[bp] };
        } else {
          acc[bp] = __spreadProps(__spreadValues({}, acc[bp]), {
            [key]: innerObj[bp]
          });
        }
      }
    }
    return acc;
  }, {});
}
function hasBreakpointKey(obj) {
  if (!obj)
    return false;
  const breakpointKeys = [
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "initial"
  ];
  return breakpointKeys.some((key) => key in obj);
}
function hasKey(obj, key) {
  return key in obj;
}
var cvaWithBreakpoints = (base, config) => (props) => {
  var _c;
  if ((config == null ? void 0 : config.variants) == null)
    return cx(base, props == null ? void 0 : props.class, props == null ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const processBreakpointVariant = (variantProp, variant) => {
    return Object.keys(variantProp).map((v2) => {
      var _a, _b, _c2;
      if (props && hasKey(props, variant)) {
        if (typeof props[variant] === "object" && hasKey(props[variant], v2)) {
          const bpVariantProp = props[variant][v2];
          const variantKey = falsyToString(bpVariantProp);
          if (variants && variant in variants) {
            if (v2 === "initial") {
              return ((_a = variants == null ? void 0 : variants[variant]) == null ? void 0 : _a[variantKey]) || null;
            }
            return ((_b = variants == null ? void 0 : variants[variant]) == null ? void 0 : _b[variantKey]) ? cx((_c2 = variants == null ? void 0 : variants[variant]) == null ? void 0 : _c2[variantKey]).replace(
              /([^\s]+)/g,
              `${v2}:$1`
            ) : null;
          }
        }
      }
      return null;
    });
  };
  const getVariantClassName = (variant, variantProp) => {
    var _a;
    const defaultVariantProp = defaultVariants == null ? void 0 : defaultVariants[variant];
    if (typeof variantProp === "undefined" && typeof defaultVariantProp === "undefined")
      return null;
    const variantKey = falsyToString(variantProp) || falsyToString(
      defaultVariantProp
    );
    return ((_a = variants[variant]) == null ? void 0 : _a[variantKey]) || null;
  };
  const getVariantClassNames = Object.keys(variants).map(
    (variant) => {
      let variantProp = props == null ? void 0 : props[variant];
      if (variantProp === null)
        return null;
      if (typeof variantProp === "object" && hasBreakpointKey(variantProp)) {
        return processBreakpointVariant(variantProp, variant);
      }
      return getVariantClassName(variant, variantProp);
    }
  );
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, [key, value]) => {
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = (_c = config == null ? void 0 : config.compoundVariants) == null ? void 0 : _c.reduce(
    (acc, _a) => {
      var _b = _a, { class: cvClass, className: cvClassName } = _b, compoundVariantOptions = __objRest(_b, ["class", "className"]);
      return Object.entries(compoundVariantOptions).every(
        ([key, value]) => Array.isArray(value) ? value.includes(
          __spreadValues(__spreadValues({}, defaultVariants), propsWithoutUndefined)[key]
        ) : __spreadValues(__spreadValues({}, defaultVariants), propsWithoutUndefined)[key] === value
      ) ? [...acc, cvClass, cvClassName] : acc;
    },
    []
  );
  const getBreakpointCompoundVariantClassNames = ((config == null ? void 0 : config.compoundVariants) || []).reduce((acc, compoundVariant) => {
    const _a = compoundVariant, {
      class: cvClass,
      className: cvClassName
    } = _a, options = __objRest(_a, [
      "class",
      "className"
    ]);
    if (!propsWithoutUndefined)
      return acc;
    const breakPointsProps = transform(propsWithoutUndefined);
    for (const [bpKey, bpValue] of Object.entries(breakPointsProps)) {
      const matches = Object.entries(options).every(([key, value]) => {
        if (typeof bpValue === "object" && bpValue && hasKey(bpValue, key)) {
          const propValue = bpValue[key];
          return Array.isArray(value) ? value.includes(propValue) : propValue === value;
        }
        return null;
      });
      if (matches) {
        if (bpKey === "initial") {
          acc.push(cvClass, cvClassName);
        } else {
          acc.push(
            cx(cvClass).replace(/([^\s]+)/g, `${bpKey}:$1`),
            cx(cvClassName).replace(/([^\s]+)/g, `${bpKey}:$1`)
          );
        }
      }
    }
    return acc;
  }, []);
  return cx(
    base,
    getVariantClassNames,
    getCompoundVariantClassNames,
    getBreakpointCompoundVariantClassNames,
    props == null ? void 0 : props.class,
    props == null ? void 0 : props.className
  );
};

// src/components/Button/variants.ts
var buttonBaseVariants = cvaWithBreakpoints(
  "fs-inline-flex fs-gap-2 fs-items-center fs-font-medium fs-justify-center fs-transition-colors focus-visible:fs-outline-none disabled:fs-pointer-events-none active:fs-brightness-110",
  {
    variants: {
      variant: {
        solid: "",
        soft: "",
        outline: "",
        surface: "",
        ghost: ""
      },
      color: {
        accent: "",
        blue: "",
        gray: "",
        green: "",
        orange: "",
        purple: "",
        red: "",
        yellow: ""
      },
      radius: {
        none: "",
        default: "fs-rounded",
        md: "fs-rounded-md",
        lg: "fs-rounded-lg",
        full: "fs-rounded-full"
      },
      fullWidth: {
        true: "fs-w-full",
        false: ""
      }
    },
    compoundVariants: [
      {
        variant: "solid",
        color: "accent",
        class: "fs-bg-accent-9 fs-text-accent-9-contrast hover:fs-bg-accent-10 focus-visible:fs-shadow-[0_0_0_2px_var(--accent-3)_,_0_0_0_4px_var(--accent-a8)]"
      },
      {
        variant: "solid",
        color: "blue",
        class: "fs-bg-blue-9 fs-text-blue-9-contrast hover:fs-bg-blue-10 focus-visible:fs-shadow-[0_0_0_2px_var(--blue-3)_,_0_0_0_4px_var(--blue-a8)]"
      },
      {
        variant: "solid",
        color: "gray",
        class: "fs-bg-gray-9 fs-text-gray-9-contrast hover:fs-bg-gray-10 focus-visible:fs-shadow-[0_0_0_2px_var(--gray-3)_,_0_0_0_4px_var(--gray-a8)]"
      },
      {
        variant: "solid",
        color: "green",
        class: "fs-bg-green-9 fs-text-green-9-contrast hover:fs-bg-green-10 focus-visible:fs-shadow-[0_0_0_2px_var(--green-3)_,_0_0_0_4px_var(--green-a8)]"
      },
      {
        variant: "solid",
        color: "orange",
        class: "fs-bg-orange-9 fs-text-orange-9-contrast hover:fs-bg-orange-10 focus-visible:fs-shadow-[0_0_0_2px_var(--orange-3)_,_0_0_0_4px_var(--orange-a8)]"
      },
      {
        variant: "solid",
        color: "purple",
        class: "fs-bg-purple-9 fs-text-purple-9-contrast hover:fs-bg-purple-10 focus-visible:fs-shadow-[0_0_0_2px_var(--purple-3)_,_0_0_0_4px_var(--purple-a8)]"
      },
      {
        variant: "solid",
        color: "red",
        class: "fs-bg-red-9 fs-text-red-9-contrast hover:fs-bg-red-10 focus-visible:fs-shadow-[0_0_0_2px_var(--red-3)_,_0_0_0_4px_var(--red-a8)]"
      },
      {
        variant: "solid",
        color: "yellow",
        class: "fs-bg-yellow-9 fs-text-yellow-9-contrast hover:fs-bg-yellow-10 focus-visible:fs-shadow-[0_0_0_2px_var(--yellow-3)_,_0_0_0_4px_var(--yellow-a8)]"
      },
      {
        variant: "soft",
        color: "accent",
        class: "fs-bg-accent-a-3 fs-text-accent-a-11 hover:fs-bg-accent-a-4 focus-visible:fs-shadow-[0_0_0_1px_var(--accent-8)_,_0_0_0_1px_var(--accent-a8)]"
      },
      {
        variant: "soft",
        color: "blue",
        class: "fs-bg-blue-a-3 fs-text-blue-a-11 hover:fs-bg-blue-a-4 focus-visible:fs-shadow-[0_0_0_1px_var(--blue-8)_,_0_0_0_1px_var(--blue-a8)]"
      },
      {
        variant: "soft",
        color: "gray",
        class: "fs-bg-gray-a-3 fs-text-gray-a-11 hover:fs-bg-gray-a-4 focus-visible:fs-shadow-[0_0_0_1px_var(--gray-8)_,_0_0_0_1px_var(--gray-a8)]"
      },
      {
        variant: "soft",
        color: "green",
        class: "fs-bg-green-a-3 fs-text-green-a-11 hover:fs-bg-green-a-4 focus-visible:fs-shadow-[0_0_0_1px_var(--green-8)_,_0_0_0_1px_var(--green-a8)]"
      },
      {
        variant: "soft",
        color: "orange",
        class: "fs-bg-orange-a-3 fs-text-orange-a-11 hover:fs-bg-orange-a-4 focus-visible:fs-shadow-[0_0_0_1px_var(--orange-8)_,_0_0_0_1px_var(--orange-a8)]"
      },
      {
        variant: "soft",
        color: "purple",
        class: "fs-bg-purple-a-3 fs-text-purple-a-11 hover:fs-bg-purple-a-4 focus-visible:fs-shadow-[0_0_0_1px_var(--purple-8)_,_0_0_0_1px_var(--purple-a8)]"
      },
      {
        variant: "soft",
        color: "red",
        class: "fs-bg-red-a-3 fs-text-red-a-11 hover:fs-bg-red-a-4 focus-visible:fs-shadow-[0_0_0_1px_var(--red-8)_,_0_0_0_1px_var(--red-a8)]"
      },
      {
        variant: "soft",
        color: "yellow",
        class: "fs-bg-yellow-a-3 fs-text-yellow-a-11 hover:fs-bg-yellow-a-4 focus-visible:fs-shadow-[0_0_0_1px_var(--yellow-8)_,_0_0_0_1px_var(--yellow-a8)]"
      },
      {
        variant: "outline",
        color: "accent",
        class: "fs-shadow-[inset_0_0_0_1px_var(--accent-a8)] fs-text-accent-a-11 hover:fs-bg-accent-a-2 focus-visible:fs-shadow-[0_0_0_1px_var(--accent-8)_,_0_0_0_1px_var(--accent-a8)]"
      },
      {
        variant: "outline",
        color: "blue",
        class: "fs-shadow-[inset_0_0_0_1px_var(--blue-a8)] fs-text-blue-a-11 hover:fs-bg-blue-a-2 focus-visible:fs-shadow-[0_0_0_1px_var(--blue-8)_,_0_0_0_1px_var(--blue-a8)]"
      },
      {
        variant: "outline",
        color: "gray",
        class: "fs-shadow-[inset_0_0_0_1px_var(--gray-a8)] fs-text-gray-a-11 hover:fs-bg-gray-a-2 focus-visible:fs-shadow-[0_0_0_1px_var(--gray-8)_,_0_0_0_1px_var(--gray-a8)]"
      },
      {
        variant: "outline",
        color: "green",
        class: "fs-shadow-[inset_0_0_0_1px_var(--green-a8)] fs-text-green-a-11 hover:fs-bg-green-a-2 focus-visible:fs-shadow-[0_0_0_1px_var(--green-8)_,_0_0_0_1px_var(--green-a8)]"
      },
      {
        variant: "outline",
        color: "orange",
        class: "fs-shadow-[inset_0_0_0_1px_var(--orange-a8)] fs-text-orange-a-11 hover:fs-bg-orange-a-2 focus-visible:fs-shadow-[0_0_0_1px_var(--orange-8)_,_0_0_0_1px_var(--orange-a8)]"
      },
      {
        variant: "outline",
        color: "purple",
        class: "fs-shadow-[inset_0_0_0_1px_var(--purple-a8)] fs-text-purple-a-11 hover:fs-bg-purple-a-2 focus-visible:fs-shadow-[0_0_0_1px_var(--purple-8)_,_0_0_0_1px_var(--purple-a8)]"
      },
      {
        variant: "outline",
        color: "red",
        class: "fs-shadow-[inset_0_0_0_1px_var(--red-a8)] fs-text-red-a-11 hover:fs-bg-red-a-2 focus-visible:fs-shadow-[0_0_0_1px_var(--red-8)_,_0_0_0_1px_var(--red-a8)]"
      },
      {
        variant: "outline",
        color: "yellow",
        class: "fs-shadow-[inset_0_0_0_1px_var(--yellow-a8)] fs-text-yellow-a-11 hover:fs-bg-yellow-a-2 focus-visible:fs-shadow-[0_0_0_1px_var(--yellow-8)_,_0_0_0_1px_var(--yellow-a8)]"
      },
      {
        variant: "surface",
        color: "accent",
        class: "fs-bg-accent-surface fs-shadow-[inset_0_0_0_1px_var(--accent-a7)] fs-text-accent-a-11 hover:fs-shadow-[inset_0_0_0_1px_var(--accent-a7)] focus-visible:fs-shadow-[0_0_0_1px_var(--accent-8)_,_0_0_0_1px_var(--accent-a8)]"
      },
      {
        variant: "surface",
        color: "blue",
        class: "fs-bg-blue-surface fs-shadow-[inset_0_0_0_1px_var(--blue-a7)] fs-text-blue-a-11 hover:fs-shadow-[inset_0_0_0_1px_var(--blue-a7)] focus-visible:fs-shadow-[0_0_0_1px_var(--blue-8)_,_0_0_0_1px_var(--blue-a8)]"
      },
      {
        variant: "surface",
        color: "gray",
        class: "fs-bg-gray-surface fs-shadow-[inset_0_0_0_1px_var(--gray-a7)] fs-text-gray-a-11 hover:fs-shadow-[inset_0_0_0_1px_var(--gray-a7)] focus-visible:fs-shadow-[0_0_0_1px_var(--gray-8)_,_0_0_0_1px_var(--gray-a8)]"
      },
      {
        variant: "surface",
        color: "green",
        class: "fs-bg-green-surface fs-shadow-[inset_0_0_0_1px_var(--green-a7)] fs-text-green-a-11 hover:fs-shadow-[inset_0_0_0_1px_var(--green-a7)] focus-visible:fs-shadow-[0_0_0_1px_var(--green-8)_,_0_0_0_1px_var(--green-a8)]"
      },
      {
        variant: "surface",
        color: "orange",
        class: "fs-bg-orange-surface fs-shadow-[inset_0_0_0_1px_var(--orange-a7)] fs-text-orange-a-11 hover:fs-shadow-[inset_0_0_0_1px_var(--orange-a7)] focus-visible:fs-shadow-[0_0_0_1px_var(--orange-8)_,_0_0_0_1px_var(--orange-a8)]"
      },
      {
        variant: "surface",
        color: "purple",
        class: "fs-bg-purple-surface fs-shadow-[inset_0_0_0_1px_var(--purple-a7)] fs-text-purple-a-11 hover:fs-shadow-[inset_0_0_0_1px_var(--purple-a7)] focus-visible:fs-shadow-[0_0_0_1px_var(--purple-8)_,_0_0_0_1px_var(--purple-a8)]"
      },
      {
        variant: "surface",
        color: "red",
        class: "fs-bg-red-surface fs-shadow-[inset_0_0_0_1px_var(--red-a7)] fs-text-red-a-11 hover:fs-shadow-[inset_0_0_0_1px_var(--red-a7)] focus-visible:fs-shadow-[0_0_0_1px_var(--red-8)_,_0_0_0_1px_var(--red-a8)]"
      },
      {
        variant: "surface",
        color: "yellow",
        class: "fs-bg-yellow-surface fs-shadow-[inset_0_0_0_1px_var(--yellow-a7)] fs-text-yellow-a-11 hover:fs-shadow-[inset_0_0_0_1px_var(--yellow-a7)] focus-visible:fs-shadow-[0_0_0_1px_var(--yellow-8)_,_0_0_0_1px_var(--yellow-a8)]"
      },
      {
        variant: "surface",
        color: "accent",
        class: "fs-text-accent-a-11 hover:fs-bg-accent-a-3 focus-visible:fs-shadow-[0_0_0_1px_var(--accent-8)_,_0_0_0_1px_var(--accent-a8)]"
      },
      {
        variant: "surface",
        color: "blue",
        class: "fs-text-blue-a-11 hover:fs-bg-blue-a-3 focus-visible:fs-shadow-[0_0_0_1px_var(--blue-8)_,_0_0_0_1px_var(--blue-a8)]"
      },
      {
        variant: "surface",
        color: "gray",
        class: "fs-text-gray-a-11 hover:fs-bg-gray-a-3 focus-visible:fs-shadow-[0_0_0_1px_var(--gray-8)_,_0_0_0_1px_var(--gray-a8)]"
      },
      {
        variant: "surface",
        color: "green",
        class: "fs-text-green-a-11 hover:fs-bg-green-a-3 focus-visible:fs-shadow-[0_0_0_1px_var(--green-8)_,_0_0_0_1px_var(--green-a8)]"
      },
      {
        variant: "surface",
        color: "orange",
        class: "fs-text-orange-a-11 hover:fs-bg-orange-a-3 focus-visible:fs-shadow-[0_0_0_1px_var(--orange-8)_,_0_0_0_1px_var(--orange-a8)]"
      },
      {
        variant: "surface",
        color: "purple",
        class: "fs-text-purple-a-11 hover:fs-bg-purple-a-3 focus-visible:fs-shadow-[0_0_0_1px_var(--purple-8)_,_0_0_0_1px_var(--purple-a8)]"
      },
      {
        variant: "surface",
        color: "red",
        class: "fs-text-red-a-11 hover:fs-bg-red-a-3 focus-visible:fs-shadow-[0_0_0_1px_var(--red-8)_,_0_0_0_1px_var(--red-a8)]"
      },
      {
        variant: "surface",
        color: "yellow",
        class: "fs-text-yellow-a-11 hover:fs-bg-yellow-a-3 focus-visible:fs-shadow-[0_0_0_1px_var(--yellow-8)_,_0_0_0_1px_var(--yellow-a8)]"
      }
    ],
    defaultVariants: {
      variant: "solid",
      color: "accent",
      radius: "default",
      fullWidth: false
    }
  }
);
var buttonVariants = cvaWithBreakpoints("fs-button", {
  variants: {
    size: {
      default: "fs-px-3 fs-py-2 fs-text-sm",
      small: "fs-px-3 fs-py-2 fs-text-xs fs-text-sm",
      large: "fs-px-4 fs-py-3 fs-text-md",
      xLarge: "fs-px-6 fs-py-3 fs-text-lg"
    }
  },
  defaultVariants: {
    size: "default"
  }
});
var variants_default = buttonVariants;

// src/scripts/classes/button.ts
var import_fs_extra = __toESM(require_lib(), 1);
var import_path = require("path");
var variantFuncs = [
  {
    func: variants_default,
    props: {
      size: ["default", "small", "large", "xLarge"]
    }
  },
  {
    func: buttonBaseVariants,
    compoundVariants: [
      { variant: "solid", color: "accent" },
      { variant: "solid", color: "blue" },
      { variant: "solid", color: "gray" },
      { variant: "solid", color: "green" },
      { variant: "solid", color: "orange" },
      { variant: "solid", color: "purple" },
      { variant: "solid", color: "red" },
      { variant: "solid", color: "yellow" },
      { variant: "soft", color: "accent" },
      { variant: "soft", color: "blue" },
      { variant: "soft", color: "gray" },
      { variant: "soft", color: "green" },
      { variant: "soft", color: "orange" },
      { variant: "soft", color: "purple" },
      { variant: "soft", color: "red" },
      { variant: "soft", color: "yellow" },
      { variant: "outline", color: "accent" },
      { variant: "outline", color: "blue" },
      { variant: "outline", color: "gray" },
      { variant: "outline", color: "green" },
      { variant: "outline", color: "orange" },
      { variant: "outline", color: "purple" },
      { variant: "outline", color: "red" },
      { variant: "outline", color: "yellow" },
      { variant: "surface", color: "accent" },
      { variant: "surface", color: "blue" },
      { variant: "surface", color: "gray" },
      { variant: "surface", color: "green" },
      { variant: "surface", color: "orange" },
      { variant: "surface", color: "purple" },
      { variant: "surface", color: "red" },
      { variant: "surface", color: "yellow" },
      { variant: "surface", color: "accent" },
      { variant: "surface", color: "blue" },
      { variant: "surface", color: "gray" },
      { variant: "surface", color: "green" },
      { variant: "surface", color: "orange" },
      { variant: "surface", color: "purple" },
      { variant: "surface", color: "red" },
      { variant: "surface", color: "yellow" }
    ],
    props: {
      radius: ["none", "default", "md", "lg", "full"],
      fullWidth: [true, false]
    }
  }
];
function removeDuplicateWords(str) {
  const words = str.split(/\s+/);
  const uniqueWords = new Set(words);
  return [...uniqueWords].join(" ");
}
var buttonClasses = () => __async(void 0, null, function* () {
  const variants = variantFuncs.reduce(
    (acc, { func, props, compoundVariants }) => {
      const defaults = func({});
      acc.push(defaults);
      Object.entries(props).forEach(([prop, values]) => {
        values.forEach((value) => {
          acc.push(
            func({
              [prop]: {
                initial: value,
                sm: value,
                md: value,
                lg: value,
                xl: value,
                ["2xl"]: value
              }
            })
          );
        });
      });
      compoundVariants == null ? void 0 : compoundVariants.forEach((compoundVariant) => {
        acc.push(
          func({
            variant: {
              initial: compoundVariant.variant,
              sm: compoundVariant.variant,
              md: compoundVariant.variant,
              lg: compoundVariant.variant,
              xl: compoundVariant.variant,
              ["2xl"]: compoundVariant.variant
            },
            color: {
              initial: compoundVariant.color,
              sm: compoundVariant.color,
              md: compoundVariant.color,
              lg: compoundVariant.color,
              xl: compoundVariant.color,
              ["2xl"]: compoundVariant.color
            }
          })
        );
      });
      return acc;
    },
    []
  );
  const content2 = "/// " + removeDuplicateWords(variants.join(" ")) + ";";
  yield import_fs_extra.default.ensureDir((0, import_path.dirname)("./dist/classes/buttonClasses.js"));
  import_fs_extra.default.writeFileSync("./dist/classes/buttonClasses.js", content2, "utf8");
});

// src/scripts/classes/utilitiy.ts
var import_fs_extra2 = __toESM(require_lib(), 1);
var import_path2 = require("path");
function removeDuplicateWords2(str) {
  const words = str.split(/\s+/);
  const uniqueWords = new Set(words);
  return [...uniqueWords].join(" ");
}
var utilityClasses = (safeList, comp) => __async(void 0, null, function* () {
  const content2 = "/// " + removeDuplicateWords2(safeList.join(" ")) + ";";
  const fileName = `./dist/classes/${comp.toLowerCase()}Classes.js`;
  yield import_fs_extra2.default.ensureDir((0, import_path2.dirname)(fileName));
  import_fs_extra2.default.writeFileSync(fileName, content2, "utf8");
});

// ../plugin/dist/index.js
var import_plugin = __toESM(require_plugin(), 1);
var import_defaultTheme = __toESM(require_defaultTheme(), 1);
function c(l) {
  return l !== null && typeof l == "object" && l.constructor === Object;
}
function k(l) {
  if (!c(l))
    return l;
  let e = {};
  return Object.keys(l).forEach((a) => {
    e[a] = k(l[a]);
  }), e;
}
function u(l, e, a = { clone: true }) {
  let s = a.clone ? __spreadValues({}, l) : l;
  return c(l) && c(e) && Object.keys(e).forEach((t) => {
    t !== "__proto__" && (c(e[t]) && t in l && c(l[t]) ? s[t] = u(l[t], e[t], a) : a.clone ? s[t] = c(e[t]) ? k(e[t]) : e[t] : s[t] = e[t]);
  }), s;
}
function f(l) {
  return { "--rounded": l.base, "--rounded-none": l.none, "--rounded-sm": l.sm, "--rounded-md": l.md, "--rounded-lg": l.lg, "--rounded-xl": l.xl, "--rounded-2xl": l["2xl"], "--rounded-3xl": l["3xl"], "--rounded-full": l.full };
}
function v(l) {
  return { none: `var(--rounded-none, ${l.none})`, sm: `var(--rounded-sm, ${l.sm})`, DEFAULT: `var(--rounded, ${l.base})`, md: `var(--rounded-md, ${l.md})`, lg: `var(--rounded-lg, ${l.lg})`, xl: `var(--rounded-xl, ${l.xl})`, "2xl": `var(--rounded-2xl, ${l["2xl"]})`, "3xl": `var(--rounded-3xl, ${l["3xl"]})`, full: `var(--rounded-full, ${l.full})` };
}
function r2(l, e, a) {
  let s = Array.from(Array(e).keys()).reduce((t, i, n) => (t[n + 1] = `var(--${l}-${a ? "a" : ""}${n + 1})`, t), {});
  return a || (s["9-contrast"] = `var(--${l}-9-contrast)`, s.surface = `var(--${l}-surface)`), s;
}
function p(l) {
  return Object.entries(l).reduce((e, [a, s]) => a === "default" ? __spreadProps(__spreadValues({}, e), { "--default-font-size": s.fontSize, "--default-line-height": s.lineHeight }) : __spreadProps(__spreadValues({}, e), { [`--font-size-${a}`]: s.fontSize, [`--line-height-${a}`]: s.lineHeight }), {});
}
function b(l) {
  return Object.entries(l).reduce((e, [a, s]) => a === "default" ? e : __spreadProps(__spreadValues({}, e), { [a]: [`calc(var(--font-size-${a}, ${s.fontSize}) * var(--variant-font-adjust, 1))`, `var(--line-height-${a}, ${s.lineHeight})`] }), {});
}
function x(l) {
  return { "--font-thin": l.thin, "--font-extralight": l.extralight, "--font-light": l.light, "--font-normal": l.normal, "--font-medium": l.medium, "--font-semibold": l.semibold, "--font-bold": l.bold, "--font-extrabold": l.extrabold, "--font-black": l.black, "--default-font-weight": l.default };
}
function w(l) {
  return { thin: `var(--font-thin, ${l.thin})`, extralight: `var(--font-extralight, ${l.extralight})`, light: `var(--font-light, ${l.light})`, normal: `var(--font-normal, ${l.normal})`, medium: `var(--font-medium, ${l.medium})`, semibold: `var(--font-semibold, ${l.semibold})`, bold: `var(--font-bold, ${l.bold})`, extrabold: `var(--font-extrabold, ${l.extrabold})`, black: `var(--font-black, ${l.black})` };
}
function h(l, e, a = false) {
  return Object.entries(e).reduce((s, [t, i]) => {
    let n = a ? `a${t}` : t;
    return s[`--${l}-${n}`] = i, s;
  }, {});
}
function d(l) {
  return __spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, h("accent", l.accent)), h("accent", l["accent-a"], true)), h("blue", l.blue)), h("blue", l["blue-a"], true)), h("gray", l.gray)), h("gray", l["gray-a"], true)), h("green", l.green)), h("green", l["green-a"], true)), h("orange", l.orange)), h("orange", l["orange-a"], true)), h("purple", l.purple)), h("purple", l["purple-a"], true)), h("red", l.red)), h("red", l["red-a"], true)), h("yellow", l.yellow)), h("yellow", l["yellow-a"], true)), { "--color-background": l["color-background"], "--color-panel-solid": l["color-panel-solid"], "--text-color": l["text-color"], "--text-color-contrast": l["text-color-contrast"], "--text-muted": l["text-muted"], "--tw-shadow-color": l["tw-shadow-color"] || null });
}
function m(l) {
  return { "--screen-sm": l.sm, "--screen-md": l.md, "--screen-lg": l.lg, "--screen-xl": l.xl, "--screen-2xl": l["2xl"] };
}
function $(l) {
  return { sm: l.sm, md: l.md, lg: l.lg, xl: l.xl, "2xl": l["2xl"] };
}
var y = [0, "px", 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96];
function g() {
  return y.reduce((l, e) => {
    let a = e.toString().replace(".", "-");
    return __spreadProps(__spreadValues({}, l), { [`--spacing-${a}`]: typeof e == "string" ? "1px" : `calc(var(--spacing-scale, 4) * ${e})` });
  }, {});
}
function z() {
  let l = g();
  return y.reduce((e, a) => {
    let s = a.toString().replace(".", "-");
    return __spreadProps(__spreadValues({}, e), { [a]: `var(--spacing-${s}, ${l[`--spacing-${s}`]})` });
  }, {});
}
var j = { accent: { 1: "hsl(152, 53%, 6.5%)", 2: "hsl(153, 47.6%, 8.2%)", 3: "hsl(154, 46.7%, 11%)", 4: "hsl(155, 47%, 13.2%)", 5: "hsl(156, 47.7%, 15.3%)", 6: "hsl(158, 49%, 18.5%)", 7: "hsl(160, 52%, 24.2%)", 8: "hsl(164, 59.8%, 34.1%)", 9: "hsl(164, 60%, 40%)", 10: "hsl(164, 66.8%, 43.7%)", 11: "hsl(163, 75%, 48.4%)", 12: "hsl(155, 70%, 81%)" }, "accent-a": { 1: "hsla(120, 100%, 43.9%, 0.005)", 2: "hsla(120, 100%, 49%, 0.031)", 3: "hsla(145, 100%, 49.8%, 0.074)", 4: "hsla(152, 100%, 49.7%, 0.109)", 5: "hsla(156, 100%, 49.8%, 0.148)", 6: "hsla(158, 99.1%, 54.5%, 0.2)", 7: "hsla(159, 99.3%, 58.4%, 0.304)", 8: "hsla(164, 99.9%, 59%, 0.498)", 9: "hsla(164, 99.9%, 60.2%, 0.602)", 10: "hsla(164, 99.8%, 58.3%, 0.702)", 11: "hsla(163, 99.8%, 56.3%, 0.832)", 12: "hsla(155, 99.4%, 85.9%, 0.936)" }, blue: { 1: "hsl(212, 35%, 9.2%)", 2: "hsl(216, 50%, 11.8%)", 3: "hsl(214, 57.6%, 15.6%)", 4: "hsl(214, 62.3%, 18.4%)", 5: "hsl(213, 66.6%, 21.1%)", 6: "hsl(212, 72.6%, 25.2%)", 7: "hsl(211, 81.3%, 32.4%)", 8: "hsl(211, 85.2%, 47.8%)", 9: "hsl(206, 100%, 50%)", 10: "hsl(206, 100%, 61.8%)", 11: "hsl(205, 100%, 71%)", 12: "hsl(205, 100%, 88%)" }, "blue-a": { 1: "hsla(240, 100%, 49.5%, 0.035)", 2: "hsla(227, 100%, 50%, 0.091)", 3: "hsla(216, 100%, 50%, 0.169)", 4: "hsla(214, 100%, 49.8%, 0.226)", 5: "hsla(213, 99.8%, 50.5%, 0.286)", 6: "hsla(212, 99.8%, 51.5%, 0.377)", 7: "hsla(211, 99.8%, 51.4%, 0.546)", 8: "hsla(211, 99.9%, 53.3%, 0.875)", 9: "hsla(206, 100%, 50%, 1)", 10: "hsla(206, 100%, 61.8%, 1)", 11: "hsla(205, 100%, 71%, 1)", 12: "hsla(206, 100%, 88%, 1)" }, gray: { 1: "hsl(155, 7%, 9.2%)", 2: "hsl(150, 7.7%, 10.2%)", 3: "hsl(151, 5.5%, 15.2%)", 4: "hsl(152, 4.7%, 18.3%)", 5: "hsl(153, 4.2%, 21.1%)", 6: "hsl(153, 3.7%, 24.2%)", 7: "hsl(154, 3.3%, 28.7%)", 8: "hsl(156, 2.6%, 37.1%)", 9: "hsl(155, 6%, 41.5%)", 10: "hsl(157, 4.6%, 49.2%)", 11: "hsl(155, 5%, 68.3%)", 12: "hsl(155, 7%, 93%)" }, "gray-a": { 1: "hsla(126, 100%, 43.9%, 0.005)", 2: "hsla(150, 92.7%, 53%, 0.018)", 3: "hsla(150, 95.5%, 88.9%, 0.074)", 4: "hsla(156, 93.3%, 90.4%, 0.109)", 5: "hsla(150, 94.8%, 94%, 0.139)", 6: "hsla(156, 92.8%, 93.9%, 0.174)", 7: "hsla(156, 92.4%, 95.3%, 0.226)", 8: "hsla(156, 91.7%, 96.6%, 0.317)", 9: "hsla(157, 99.8%, 93.3%, 0.381)", 10: "hsla(158, 96.8%, 95.2%, 0.464)", 11: "hsla(158, 98.1%, 97.6%, 0.667)", 12: "hsla(150, 88%, 99.5%, 0.927)" }, green: { 1: "hsl(146, 30%, 7.4%)", 2: "hsl(138, 20.8%, 9.4%)", 3: "hsl(138, 25.8%, 12.5%)", 4: "hsl(138, 28.4%, 14.8%)", 5: "hsl(137, 30.3%, 17.1%)", 6: "hsl(137, 32.3%, 20.6%)", 7: "hsl(135, 34.4%, 27.1%)", 8: "hsl(131, 35.3%, 40%)", 9: "hsl(131, 41%, 46.5%)", 10: "hsl(131, 41.7%, 55%)", 11: "hsl(131, 50%, 63%)", 12: "hsl(120, 60%, 85%)" }, "green-a": { 1: "hsla(120, 100%, 43.9%, 0.005)", 2: "hsla(120, 100%, 49.3%, 0.022)", 3: "hsla(139, 97.9%, 54.2%, 0.07)", 4: "hsla(137, 99.8%, 60.3%, 0.104)", 5: "hsla(138, 99.8%, 62.9%, 0.143)", 6: "hsla(136, 99.7%, 66.7%, 0.195)", 7: "hsla(135, 99.7%, 68.4%, 0.299)", 8: "hsla(131, 99.7%, 71.3%, 0.494)", 9: "hsla(131, 99.5%, 69.2%, 0.62)", 10: "hsla(131, 100%, 73.5%, 0.71)", 11: "hsla(131, 99.8%, 76.6%, 0.797)", 12: "hsla(120, 99.1%, 90.3%, 0.936)" }, orange: { 1: "hsl(30, 70%, 7.2%)", 2: "hsl(29, 81.4%, 8.4%)", 3: "hsl(26, 68.4%, 12%)", 4: "hsl(25, 64.6%, 14.9%)", 5: "hsl(25, 64.3%, 17.8%)", 6: "hsl(25, 65.7%, 21.9%)", 7: "hsl(25, 67.7%, 29.4%)", 8: "hsl(25, 70.3%, 44.9%)", 9: "hsl(24, 94%, 50%)", 10: "hsl(24, 100%, 58.5%)", 11: "hsl(24, 100%, 70%)", 12: "hsl(30, 100%, 88%)" }, "orange-a": { 1: "hsla(0, 100%, 49%, 0.031)", 2: "hsla(0, 100%, 50%, 0.065)", 3: "hsla(13, 100%, 49.7%, 0.122)", 4: "hsla(20, 100%, 50%, 0.169)", 5: "hsla(24, 100%, 50%, 0.221)", 6: "hsla(25, 99.8%, 51.4%, 0.299)", 7: "hsla(25, 99.8%, 54.7%, 0.442)", 8: "hsla(25, 99.8%, 57.3%, 0.741)", 9: "hsla(24, 99.9%, 51.4%, 0.966)", 10: "hsla(24, 100%, 58.4%, 1)", 11: "hsla(24, 100%, 70%, 1)", 12: "hsla(30, 100%, 88%, 1)" }, purple: { 1: "hsl(250, 20%, 10.2%)", 2: "hsl(255, 30.3%, 12.9%)", 3: "hsl(254, 33.3%, 18.4%)", 4: "hsl(253, 34.6%, 22.1%)", 5: "hsl(253, 35.5%, 25.5%)", 6: "hsl(252, 36.6%, 30.5%)", 7: "hsl(251, 37.8%, 39%)", 8: "hsl(250, 46.2%, 54.1%)", 9: "hsl(252, 56%, 57.5%)", 10: "hsl(253, 63.2%, 64.1%)", 11: "hsl(255, 100%, 80%)", 12: "hsl(250, 93%, 93%)" }, "purple-a": { 1: "hsla(240, 100%, 49%, 0.031)", 2: "hsla(255, 98.3%, 51.9%, 0.083)", 3: "hsla(255, 99.8%, 62.8%, 0.169)", 4: "hsla(252, 99%, 65.8%, 0.226)", 5: "hsla(253, 99.1%, 67.2%, 0.278)", 6: "hsla(253, 100%, 68.5%, 0.355)", 7: "hsla(251, 99.5%, 69.8%, 0.49)", 8: "hsla(250, 99.7%, 70.8%, 0.728)", 9: "hsla(252, 99.7%, 70%, 0.793)", 10: "hsla(253, 99.9%, 73.5%, 0.853)", 11: "hsla(255, 100%, 80%, 1)", 12: "hsla(249, 99.5%, 93.5%, 0.996)" }, red: { 1: "hsl(353, 23%, 9.8%)", 2: "hsl(354, 30.2%, 12.4%)", 3: "hsl(353, 40.8%, 16.4%)", 4: "hsl(353, 46.3%, 19.2%)", 5: "hsl(353, 51.2%, 22.1%)", 6: "hsl(353, 57.3%, 26.2%)", 7: "hsl(354, 65.7%, 33.2%)", 8: "hsl(358, 75%, 47.1%)", 9: "hsl(358, 75%, 59%)", 10: "hsl(359, 84.8%, 67.6%)", 11: "hsl(358, 100%, 76%)", 12: "hsl(350, 100%, 91%)" }, "red-a": { 1: "hsla(0, 100%, 49%, 0.031)", 2: "hsla(354, 100%, 49.8%, 0.074)", 3: "hsla(353, 99.3%, 55.9%, 0.152)", 4: "hsla(352, 99.8%, 56.5%, 0.208)", 5: "hsla(354, 99.3%, 57.5%, 0.265)", 6: "hsla(354, 99.8%, 57.5%, 0.351)", 7: "hsla(354, 99.7%, 56.6%, 0.503)", 8: "hsla(358, 99.8%, 56.1%, 0.806)", 9: "hsla(358, 99.8%, 65.3%, 0.888)", 10: "hsla(359, 99.9%, 70.9%, 0.944)", 11: "hsla(358, 100%, 76.1%, 1)", 12: "hsla(350, 100%, 91%, 1)" }, yellow: { 1: "hsl(36, 100%, 6.1%)", 2: "hsl(36, 80.5%, 8%)", 3: "hsl(35, 63.4%, 11.4%)", 4: "hsl(34, 58.8%, 14.1%)", 5: "hsl(34, 58.1%, 16.7%)", 6: "hsl(35, 58.3%, 20.5%)", 7: "hsl(35, 59%, 27.4%)", 8: "hsl(36, 60.2%, 41.4%)", 9: "hsl(42, 100%, 62%)", 10: "hsl(43, 100%, 64%)", 11: "hsl(43, 100%, 65%)", 12: "hsl(41, 100%, 85%)" }, "yellow-a": { 1: "hsla(0, 100%, 49%, 0.031)", 2: "hsla(6, 100%, 49.4%, 0.057)", 3: "hsla(24, 100%, 50%, 0.104)", 4: "hsla(30, 100%, 50%, 0.143)", 5: "hsla(33, 100%, 49.8%, 0.187)", 6: "hsla(34, 99.6%, 53.1%, 0.256)", 7: "hsla(35, 99.8%, 57.3%, 0.377)", 8: "hsla(36, 99.9%, 60.3%, 0.628)", 9: "hsla(42, 100%, 62%, 1)", 10: "hsla(43, 100%, 63.9%, 1)", 11: "hsla(43, 100%, 65.1%, 1)", 12: "hsla(41, 100%, 85.1%, 1)" }, "color-background": "var(--gray-1)", "color-panel-solid": "var(--gray-2)", "text-color": "var(--gray-12)", "text-color-contrast": "var(--gray-1)", "text-muted": "var(--gray-a11)" };
var C = j;
var B = { accent: { 1: "hsl(151, 60%, 99%)", 2: "hsl(150, 77.8%, 96.5%)", 3: "hsl(151, 65.9%, 93.7%)", 4: "hsl(152, 56.5%, 90%)", 5: "hsl(154, 49.1%, 85%)", 6: "hsl(156, 43.5%, 78.3%)", 7: "hsl(159, 40.2%, 68.7%)", 8: "hsl(164, 42%, 53.3%)", 9: "hsl(164, 60%, 40%)", 10: "hsl(164, 60.8%, 36.7%)", 11: "hsl(163, 65%, 28.9%)", 12: "hsl(160, 34%, 17.2%)", "9-contrast": "white", surface: "var(--accent-a2)" }, "accent-a": { 1: "hsla(160, 94.9%, 38.7%, 0.016)", 2: "hsla(150, 99.1%, 44%, 0.063)", 3: "hsla(150, 99.7%, 40.8%, 0.106)", 4: "hsla(151, 99.8%, 36.3%, 0.157)", 5: "hsla(153, 99.4%, 33.5%, 0.224)", 6: "hsla(155, 99.8%, 30.4%, 0.31)", 7: "hsla(159, 99.4%, 28.7%, 0.44)", 8: "hsla(164, 99.9%, 29.6%, 0.663)", 9: "hsla(164, 99.7%, 28.6%, 0.84)", 10: "hsla(164, 100%, 25.9%, 0.855)", 11: "hsla(163, 99.5%, 21%, 0.899)", 12: "hsla(160, 98.8%, 6.7%, 0.887)" }, blue: { 1: "hsl(206, 100%, 99.2%)", 2: "hsl(210, 100%, 98%)", 3: "hsl(209, 100%, 96.5%)", 4: "hsl(210, 98.8%, 94%)", 5: "hsl(209, 95%, 90.1%)", 6: "hsl(209, 81.2%, 84.5%)", 7: "hsl(208, 77.5%, 76.9%)", 8: "hsl(206, 81.9%, 65.3%)", 9: "hsl(206, 100%, 50%)", 10: "hsl(208, 93.5%, 47.4%)", 11: "hsl(211, 90%, 42%)", 12: "hsl(216, 71%, 23%)", "9-contrast": "white", surface: "var(--blue-a2)" }, "blue-a": { 1: "hsla(210, 100%, 51%, 0.016)", 2: "hsla(210, 100%, 51%, 0.04)", 3: "hsla(210, 100%, 50.3%, 0.071)", 4: "hsla(210, 100%, 50.1%, 0.118)", 5: "hsla(209, 99.1%, 49.2%, 0.193)", 6: "hsla(209, 99.5%, 45.3%, 0.283)", 7: "hsla(208, 99.9%, 43.8%, 0.412)", 8: "hsla(206, 99.8%, 45.1%, 0.632)", 9: "hsla(206, 100%, 50%, 1)", 10: "hsla(208, 99.9%, 45.8%, 0.969)", 11: "hsla(211, 100%, 39.4%, 0.957)", 12: "hsla(216, 99.6%, 17.5%, 0.934)" }, gray: { 1: "hsl(155, 30%, 98.8%)", 2: "hsl(150, 14.3%, 97.3%)", 3: "hsl(150, 8%, 94.5%)", 4: "hsl(150, 6%, 92%)", 5: "hsl(150, 4.9%, 89.5%)", 6: "hsl(150, 4.3%, 86.7%)", 7: "hsl(150, 3.7%, 82.8%)", 8: "hsl(150, 2.9%, 72.9%)", 9: "hsl(155, 3.5%, 54.2%)", 10: "hsl(158, 2.9%, 49.3%)", 11: "hsl(155, 3%, 38.5%)", 12: "hsl(155, 12%, 11.5%)", "9-contrast": "white", surface: "var(--gray-a2)" }, "gray-a": { 1: "hsla(150, 92.6%, 26.5%, 0.016)", 2: "hsla(150, 86.2%, 14.2%, 0.032)", 3: "hsla(150, 95.7%, 6.9%, 0.059)", 4: "hsla(160, 89%, 7.6%, 0.087)", 5: "hsla(140, 96.8%, 5.5%, 0.11)", 6: "hsla(140, 88.8%, 4.8%, 0.138)", 7: "hsla(140, 91.7%, 3.6%, 0.177)", 8: "hsla(150, 93.2%, 3%, 0.279)", 9: "hsla(158, 97%, 3.4%, 0.475)", 10: "hsla(163, 97%, 2.7%, 0.522)", 11: "hsla(160, 95.5%, 2%, 0.628)", 12: "hsla(154, 93.5%, 1.6%, 0.899)" }, green: { 1: "hsl(116, 50%, 98.9%)", 2: "hsl(120, 60%, 97.1%)", 3: "hsl(120, 53.6%, 94.8%)", 4: "hsl(121, 47.5%, 91.4%)", 5: "hsl(122, 42.6%, 86.5%)", 6: "hsl(124, 39%, 79.7%)", 7: "hsl(126, 37.1%, 70.2%)", 8: "hsl(131, 38.1%, 56.3%)", 9: "hsl(131, 41%, 46.5%)", 10: "hsl(132, 43.1%, 42.2%)", 11: "hsl(133, 50%, 32.5%)", 12: "hsl(131, 30%, 18%)", "9-contrast": "white", surface: "var(--green-a2)" }, "green-a": { 1: "hsla(120, 94.9%, 38.7%, 0.016)", 2: "hsla(120, 94.9%, 38.7%, 0.048)", 3: "hsla(120, 98%, 35.5%, 0.079)", 4: "hsla(120, 98.7%, 31.5%, 0.126)", 5: "hsla(122, 98.5%, 29.9%, 0.193)", 6: "hsla(125, 99.2%, 27.9%, 0.283)", 7: "hsla(125, 99.9%, 27%, 0.408)", 8: "hsla(131, 100%, 27.6%, 0.604)", 9: "hsla(131, 99.7%, 26.3%, 0.726)", 10: "hsla(132, 99.9%, 24%, 0.761)", 11: "hsla(133, 99.5%, 19.5%, 0.84)", 12: "hsla(131, 99.1%, 6.3%, 0.875)" }, orange: { 1: "hsl(24, 70%, 99%)", 2: "hsl(22, 100%, 97.8%)", 3: "hsl(34, 100%, 91.7%)", 4: "hsl(33, 100%, 86.6%)", 5: "hsl(31, 100%, 82.2%)", 6: "hsl(27, 100%, 78.4%)", 7: "hsl(21, 100%, 74.5%)", 8: "hsl(19, 80.1%, 64.5%)", 9: "hsl(24, 94%, 50%)", 10: "hsl(24, 100%, 46.5%)", 11: "hsl(16, 45%, 41.5%)", 12: "hsl(16, 50%, 23%)", "9-contrast": "hsl(50, 8%, 12%)", surface: "var(--orange-a2)" }, "orange-a": { 1: "hsla(20, 94.9%, 38.7%, 0.016)", 2: "hsla(22, 100%, 51%, 0.044)", 3: "hsla(34, 100%, 50.1%, 0.165)", 4: "hsla(33, 100%, 50.1%, 0.267)", 5: "hsla(31, 100%, 50%, 0.357)", 6: "hsla(27, 100%, 50.1%, 0.432)", 7: "hsla(21, 100%, 50%, 0.51)", 8: "hsla(19, 99.7%, 44.5%, 0.64)", 9: "hsla(24, 99.9%, 48.4%, 0.969)", 10: "hsla(24, 100%, 46.5%, 1)", 11: "hsla(16, 99.8%, 24.2%, 0.773)", 12: "hsla(16, 99.4%, 13.1%, 0.887)" }, purple: { 1: "hsl(255, 65%, 99.4%)", 2: "hsl(252, 100%, 99%)", 3: "hsl(252, 96.9%, 97.4%)", 4: "hsl(252, 91.5%, 95.5%)", 5: "hsl(252, 85.1%, 93%)", 6: "hsl(252, 77.8%, 89.4%)", 7: "hsl(252, 71%, 83.7%)", 8: "hsl(252, 68.6%, 76.3%)", 9: "hsl(252, 56%, 57.5%)", 10: "hsl(251, 48.1%, 53.5%)", 11: "hsl(250, 43%, 48%)", 12: "hsl(250, 43%, 26%)", "9-contrast": "white", surface: "var(--purple-a2)" }, "purple-a": { 1: "hsla(270, 94.3%, 34.6%, 0.012)", 2: "hsla(252, 100%, 51%, 0.02)", 3: "hsla(254, 100%, 50%, 0.051)", 4: "hsla(251, 98.3%, 48.2%, 0.087)", 5: "hsla(252, 99%, 45.7%, 0.13)", 6: "hsla(251, 99.1%, 44%, 0.189)", 7: "hsla(252, 99.5%, 41.7%, 0.279)", 8: "hsla(252, 100%, 40.7%, 0.4)", 9: "hsla(252, 99.9%, 35.8%, 0.663)", 10: "hsla(251, 99.6%, 32.5%, 0.691)", 11: "hsla(250, 99.8%, 28.4%, 0.726)", 12: "hsla(249, 100%, 13.1%, 0.851)" }, red: { 1: "hsl(359, 100%, 99.4%)", 2: "hsl(0, 100%, 98.4%)", 3: "hsl(360, 100%, 96.8%)", 4: "hsl(360, 97.9%, 94.8%)", 5: "hsl(360, 90.2%, 91.9%)", 6: "hsl(360, 81.7%, 87.8%)", 7: "hsl(359, 74.2%, 81.7%)", 8: "hsl(359, 69.5%, 74.3%)", 9: "hsl(358, 75%, 59%)", 10: "hsl(358, 67.4%, 54.6%)", 11: "hsl(358, 65%, 47%)", 12: "hsl(350, 63%, 24%)", "9-contrast": "white", surface: "var(--red-a2)" }, "red-a": { 1: "hsla(0, 100%, 51%, 0.012)", 2: "hsla(0, 100%, 51%, 0.032)", 3: "hsla(0, 100%, 50.2%, 0.063)", 4: "hsla(0, 100%, 50%, 0.102)", 5: "hsla(0, 99.9%, 47.5%, 0.153)", 6: "hsla(0, 99.5%, 44.9%, 0.224)", 7: "hsla(359, 99.7%, 42.7%, 0.318)", 8: "hsla(359, 99.6%, 41.1%, 0.436)", 9: "hsla(358, 99.9%, 42.9%, 0.718)", 10: "hsla(358, 99.9%, 40.2%, 0.761)", 11: "hsla(358, 99.8%, 36.7%, 0.836)", 12: "hsla(351, 99.9%, 16.6%, 0.91)" }, yellow: { 1: "hsl(39, 70%, 99%)", 2: "hsl(40, 100%, 96.5%)", 3: "hsl(45, 100%, 90.8%)", 4: "hsl(44, 100%, 85.8%)", 5: "hsl(40, 100%, 81.5%)", 6: "hsl(39, 83.6%, 75.4%)", 7: "hsl(37, 66.9%, 68.2%)", 8: "hsl(35, 59.8%, 60%)", 9: "hsl(42, 100%, 62%)", 10: "hsl(42, 100%, 55%)", 11: "hsl(25, 50%, 38%)", 12: "hsl(25, 40%, 22%)", "9-contrast": "white", surface: "var(--yellow-a2)" }, "yellow-a": { 1: "hsla(40, 94.9%, 38.7%, 0.016)", 2: "hsla(40, 100%, 50.3%, 0.071)", 3: "hsla(45, 100%, 50.2%, 0.185)", 4: "hsla(44, 100%, 50.1%, 0.283)", 5: "hsla(40, 100%, 50.1%, 0.369)", 6: "hsla(39, 100%, 45.7%, 0.451)", 7: "hsla(37, 99.7%, 40.1%, 0.53)", 8: "hsla(35, 99.7%, 37.5%, 0.64)", 9: "hsla(42, 100%, 50%, 0.761)", 10: "hsla(42, 100%, 50.1%, 0.899)", 11: "hsla(25, 99.9%, 23.5%, 0.812)", 12: "hsla(24, 99.6%, 10.2%, 0.867)" }, "color-background": "white", "color-panel-solid": "white", "text-color": "var(--gray-12)", "text-color-contrast": "var(--gray-1)", "text-muted": "var(--gray-a11)", "tw-shadow-color": "var(--gray-a4)" };
var F = B;
var A = { dark: C, light: F };
var D = A;
var M = { base: "0.25rem", none: "0", sm: "calc(var(--rounded) / 2)", md: "calc(var(--rounded) * 1.5)", lg: "calc(var(--rounded) * 2)", xl: "calc(var(--rounded) * 3)", "2xl": "calc(var(--rounded) * 4)", "3xl": "calc(var(--rounded) * 6)", full: "9999px" };
var _ = { xs: { fontSize: "12px", lineHeight: "16px" }, sm: { fontSize: "14px", lineHeight: "20px" }, base: { fontSize: "16px", lineHeight: "24px" }, lg: { fontSize: "18px", lineHeight: "26px" }, xl: { fontSize: "20px", lineHeight: "28px" }, "2xl": { fontSize: "24px", lineHeight: "30px" }, "3xl": { fontSize: "28px", lineHeight: "36px" }, "4xl": { fontSize: "35px", lineHeight: "40px" }, "5xl": { fontSize: "60px", lineHeight: "60px" }, default: { fontSize: "var(--font-size-base)", lineHeight: "var(--line-height-base)" } };
var E = { thin: "100", extralight: "200", light: "300", normal: "400", medium: "500", semibold: "600", bold: "700", extrabold: "800", black: "900", default: "var(--font-normal)" };
var P = { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px" };
var L = { colors: D, fontWeight: E, fontSize: _, borderRadius: M, spacingScale: 4, screens: P };
var S = L;
var o = 12;
var N = import_plugin.default.withOptions((l) => ({ addBase: e, addComponents: a }) => {
  let s = u(S, l), t = d(s.colors.light), i = d(s.colors.dark), n = f(s.borderRadius), R = x(s.fontWeight), H = p(s.fontSize), O = g(), T = m(s.screens);
  a({ ".code": { "--variant-font-adjust": "0.96" } }), e({ ":root": __spreadProps(__spreadValues(__spreadValues(__spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, t), n), R), H), { "--spacing-scale": `${s.spacingScale}px` }), O), T), { "--variant-font-adjust": "1", backgroundColor: "var(--color-background)", color: "var(--text-color)", fontSize: "var(--default-font-size)", lineHeight: "var(--default-line-height)", fontWeight: "var(--default-font-weight)", '&:not(.light-theme):not(.light):not([data-theme="light"])': { "@media (prefers-color-scheme: dark)": i } }), ':root.dark, :root.dark-theme, :root[data-theme="dark"]': i });
}, (l) => {
  let e = u(S, l), a = v(e.borderRadius), s = w(e.fontWeight), t = b(e.fontSize), i = z(), n = $(e.screens);
  return { prefix: "fs-", safelist: [{ pattern: /\b(dark|dark-theme|light|light-theme)\b/ }], theme: __spreadProps(__spreadValues({}, import_defaultTheme.default), { colors: { accent: r2("accent", o), "accent-a": r2("accent", o, true), blue: r2("blue", o), "blue-a": r2("blue", o, true), gray: r2("gray", o), "gray-a": r2("gray", o, true), green: r2("green", o), "green-a": r2("green", o, true), orange: r2("orange", o), "orange-a": r2("orange", o, true), purple: r2("purple", o), "purple-a": r2("purple", o, true), red: r2("red", o), "red-a": r2("red", o, true), yellow: r2("yellow", o), "yellow-a": r2("yellow", o, true), transparent: "transparent", overlay: "var(--color-overlay)", "panel-solid": "var(--color-panel-solid)" }, spacing: i, screens: n, borderRadius: a, fontWeight: s, fontSize: t }) };
});

// src/definitions/padding.props.ts
var p2 = y;
var pb = p2;
var pe = p2;
var pl = p2;
var pr = p2;
var ps = p2;
var pt = p2;
var px = p2;
var py = p2;
var paddingDefs = {
  p: { type: "enum", values: p2, default: void 0, responsive: true },
  pb: { type: "enum", values: pb, default: void 0, responsive: true },
  pe: { type: "enum", values: pe, default: void 0, responsive: true },
  pl: { type: "enum", values: pl, default: void 0, responsive: true },
  pr: { type: "enum", values: pr, default: void 0, responsive: true },
  ps: { type: "enum", values: ps, default: void 0, responsive: true },
  pt: { type: "enum", values: pt, default: void 0, responsive: true },
  px: { type: "enum", values: px, default: void 0, responsive: true },
  py: { type: "enum", values: py, default: void 0, responsive: true }
};

// src/definitions/margin.props.ts
var m2 = [...y, "auto"];
var mx = m2;
var my = m2;
var mt = m2;
var mr = m2;
var mb = m2;
var ml = m2;
var ms = m2;
var me = m2;
var marginDefs = {
  m: { type: "enum", values: m2, default: void 0, responsive: true },
  mb: { type: "enum", values: mb, default: void 0, responsive: true },
  me: { type: "enum", values: me, default: void 0, responsive: true },
  ml: { type: "enum", values: ml, default: void 0, responsive: true },
  mr: { type: "enum", values: mr, default: void 0, responsive: true },
  ms: { type: "enum", values: ms, default: void 0, responsive: true },
  mt: { type: "enum", values: mt, default: void 0, responsive: true },
  mx: { type: "enum", values: mx, default: void 0, responsive: true },
  my: { type: "enum", values: my, default: void 0, responsive: true }
};

// src/definitions/position.props.ts
var insert = [
  ...y,
  "full",
  "auto",
  "1/2",
  "1/3",
  "2/3",
  "1/4",
  "2/4",
  "3/4"
];
var insetX = insert;
var insetY = insert;
var start = insert;
var end = insert;
var top = insert;
var bottom = insert;
var left = insert;
var right = insert;
var position = [
  "static",
  "relative",
  "absolute",
  "fixed",
  "sticky"
];
var positionDefs = {
  position: {
    type: "enum",
    values: position,
    default: void 0,
    responsive: true
  },
  inset: { type: "enum", values: insert, default: void 0, responsive: true },
  insetX: {
    type: "enum",
    values: insetX,
    default: void 0,
    responsive: true
  },
  insetY: {
    type: "enum",
    values: insetY,
    default: void 0,
    responsive: true
  },
  start: { type: "enum", values: start, default: void 0, responsive: true },
  end: { type: "enum", values: end, default: void 0, responsive: true },
  top: { type: "enum", values: top, default: void 0, responsive: true },
  bottom: {
    type: "enum",
    values: bottom,
    default: void 0,
    responsive: true
  },
  left: { type: "enum", values: left, default: void 0, responsive: true },
  right: { type: "enum", values: right, default: void 0, responsive: true }
};

// src/definitions/box.props.ts
var alignSelf = ["auto", "center", "end", "start", "stretch"];
var content = [
  "around",
  "baseline",
  "between",
  "center",
  "end",
  "evenly",
  "normal",
  "start",
  "stretch"
];
var items = ["center", "end", "normal", "start", "stretch"];
var justify = [
  "center",
  "end",
  "normal",
  "space-around",
  "space-between",
  "space-evenly",
  "start"
];
var justifyItems = items;
var justifySelf = alignSelf;
var placeContent = [
  "around",
  "baseline",
  "between",
  "center",
  "end",
  "evenly",
  "start",
  "stretch"
];
var gap = y;
var gapY = gap;
var gapX = gap;
var display = [
  "block",
  "inline-block",
  "inline",
  "flex",
  "inline-flex",
  "grid",
  "inline-grid",
  "table",
  "table-row",
  "table-cell",
  "none"
];
var spaceX = [...y, "reverse"];
var spaceY = [...y, "reverse"];
var boxDefs = __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, paddingDefs), positionDefs), marginDefs), {
  content: {
    type: "enum",
    values: content,
    default: void 0,
    responsive: true
  },
  display: {
    type: "enum",
    values: display,
    default: void 0,
    responsive: true
  },
  gap: { type: "enum", values: gap, default: void 0, responsive: true },
  gapX: { type: "enum", values: gapX, default: void 0, responsive: true },
  gapY: { type: "enum", values: gapY, default: void 0, responsive: true },
  items: { type: "enum", values: items, default: void 0, responsive: true },
  placeContent: {
    type: "enum",
    values: placeContent,
    default: void 0,
    responsive: true
  },
  justify: {
    type: "enum",
    values: justify,
    default: void 0,
    responsive: true
  },
  justifyItems: {
    type: "enum",
    values: justifyItems,
    default: void 0,
    responsive: true
  },
  justifySelf: {
    type: "enum",
    values: justifySelf,
    default: void 0,
    responsive: true
  },
  spaceX: {
    type: "enum",
    values: spaceX,
    default: void 0,
    responsive: true
  },
  spaceY: {
    type: "enum",
    values: spaceY,
    default: void 0,
    responsive: true
  },
  alignSelf: {
    type: "enum",
    values: alignSelf,
    default: void 0,
    responsive: true
  }
});

// src/definitions/typography.props.ts
var size = [
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl"
];
var weight = [
  "thin",
  "extralight",
  "light",
  "normal",
  "medium",
  "semibold",
  "bold",
  "extrabold",
  "black"
];
var alignValues = ["left", "center", "right"];
var typographyDefs = __spreadProps(__spreadValues({}, marginDefs), {
  size: { type: "enum", values: size, default: "base", responsive: true },
  weight: { type: "enum", values: weight, default: "normal", responsive: true },
  align: {
    type: "enum",
    values: alignValues,
    default: void 0,
    responsive: true
  },
  highContrast: { type: "boolean", default: false }
});

// src/components/Flex/props.ts
var direction = ["row", "row-reverse", "col", "col-reverse"];
var wrap = ["nowrap", "wrap", "wrap-reverse"];

// src/scripts/classes/classLists.ts
var breakpoints = ["sm", "md", "lg", "xl", "2xl"];
function makeClassList(prefix, values) {
  return values.map((value) => {
    const className = `fs-${prefix}-${value}`;
    return [className, ...breakpoints.map((bp) => `${bp}:${className}`)];
  }).flat();
}
var boxClassList = [
  makeClassList("self", alignSelf),
  makeClassList("content", content),
  makeClassList("", display),
  makeClassList("gap", gap),
  makeClassList("gap-x", gapX),
  makeClassList("gap-y", gapY),
  makeClassList("items", items),
  makeClassList("justify", justify),
  makeClassList("justify-items", justifyItems),
  makeClassList("justify-self", justifySelf),
  makeClassList("place-content", placeContent),
  makeClassList("space-x", spaceX),
  makeClassList("space-y", spaceY)
].flat();
var flexClassList = [
  makeClassList("flex", wrap),
  makeClassList("flex", direction)
].flat();
var marginClassList = [
  makeClassList("m", m2),
  makeClassList("mb", mb),
  makeClassList("me", me),
  makeClassList("ml", ml),
  makeClassList("mr", mr),
  makeClassList("ms", ms),
  makeClassList("mt", mt),
  makeClassList("mx", mx),
  makeClassList("my", my)
].flat();
var paddingClassList = [
  makeClassList("p", p2),
  makeClassList("pb", pb),
  makeClassList("pe", pe),
  makeClassList("pl", pl),
  makeClassList("pr", pr),
  makeClassList("ps", ps),
  makeClassList("pt", pt),
  makeClassList("px", px),
  makeClassList("py", py)
].flat();
var typographyClassList = [
  makeClassList("text", size),
  makeClassList("font", weight),
  makeClassList("text", alignValues)
].flat();
var positionClassList = [
  makeClassList("", position),
  makeClassList("top", top),
  makeClassList("bottom", bottom),
  makeClassList("left", left),
  makeClassList("right", right),
  makeClassList("inset-x", insetX),
  makeClassList("inset-y", insetY),
  makeClassList("inset", insert),
  makeClassList("start", start),
  makeClassList("end", end)
].flat();

// src/scripts/classes/index.ts
var run = () => __async(void 0, null, function* () {
  yield buttonClasses();
  console.log("Button classes generated");
  yield utilityClasses(boxClassList, "box");
  console.log("Box classes generated");
  yield utilityClasses(flexClassList, "flex");
  console.log("Flex classes generated");
  yield utilityClasses(marginClassList, "margin");
  console.log("Margin classes generated");
  yield utilityClasses(paddingClassList, "padding");
  console.log("Padding classes generated");
  yield utilityClasses(typographyClassList, "typography");
  console.log("Text classes generated");
  yield utilityClasses(positionClassList, "position");
  console.log("Position classes generated");
});
run();
