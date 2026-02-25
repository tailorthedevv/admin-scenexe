// =========================================================================
// LOCAL MOCK BACKEND (FETCH INTERCEPTOR)
// This intercepts all requests to the backend and simulates them locally.
// =========================================================================
(function() {
  const originalFetch = window.fetch;
  let fakeServers = {};
  const fakeHubs =[
    {
      id: "hub-main",
      name: "eu1.scnx.cc",
      version: "1.0.0",
      players: 0,
      spectators: 0,
    }
  ];

  window.fetch = async function(url, options) {
    if (typeof url === 'string' && url.includes("wet-poolwater.glitch.me")) {
      console.log("[LOCAL MOCK] Intercepted request to:", url);
      let body = {};
      if (options && options.body) {
        body = JSON.parse(options.body);
      }
      const endpoint = url.split("wet-poolwater.glitch.me")[1];
      let responseJson = {};
      switch(endpoint) {
        case "/token":
          responseJson = { sessionID: "local_mock_session_" + Date.now() };
          break;
          
        case "/validatesession":
          responseJson = { valid: true };
          break;
          
        case "/getservers":
          const allServers = Object.values(fakeServers);
          const totalPlayers = allServers.reduce((sum, s) => sum + (s.players || 0), 0);
          fakeHubs[0].players = totalPlayers;

          responseJson = {
            servers: allServers,
            hubServers: fakeHubs
          };
          break;
          
        case "/createserver":
          const numServers = Math.max(1, parseInt(body.count) || 1);
          const baseId = body.serverID || ("server_" + Math.random().toString(36).substring(2, 6));
          
          for(let i = 0; i < numServers; i++) {
            const newId = numServers === 1 ? baseId : `${baseId}-${i+1}`;
            fakeServers[newId] = {
              id: newId,
              name: newId,
              version: "1.0.0",
              gamemode: body.gamemode || 0,
              region: body.region || "LON",
              players: 0,
              spectators: 0,
              status: "online",
              hub: body.hubServer || "eu1.scnx.cc",
              canRestart: true,
              canUpdate: true,
              canEdit: true,
              created: Date.now(),
              updated: Date.now(),
            };
          }
          responseJson = { success: true };
          break;
          
        case "/deleteserver":
          if (body.serverID) {
            if(fakeServers[body.serverID]) {
                fakeServers[body.serverID].status = "closing";
                setTimeout(() => {
                    delete fakeServers[body.serverID];
                }, 2000);
            }
          }
          responseJson = { success: true };
          break;
          
        case "/updatehubserver":
          console.log("[LOCAL MOCK] Hub Update Triggered");
          responseJson = { success: true };
          break;
          
        default:
          responseJson = { error: "Unknown mock endpoint" };
      }
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        ok: true,
        json: async () => responseJson
      };
    }
    return originalFetch.apply(this, arguments);
  };
})();

//  real script >>>

(function (e) {
  var t = {};
  function n(r) {
    if (t[r]) {
      return t[r].exports;
    }
    var i = (t[r] = {
      i: r,
      l: false,
      exports: {},
    });
    e[r].call(i.exports, i, i.exports, n);
    i.l = true;
    return i.exports;
  }
  n.m = e;
  n.c = t;
  n.d = function (e, t, r) {
    if (!n.o(e, t)) {
      Object.defineProperty(e, t, {
        enumerable: true,
        get: r,
      });
    }
  };
  n.r = function (e) {
    if (typeof Symbol != "undefined" && Symbol.toStringTag) {
      Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module",
      });
    }
    Object.defineProperty(e, "__esModule", {
      value: true,
    });
  };
  n.t = function (e, t) {
    if (t & 1) {
      e = n(e);
    }
    if (t & 8) {
      return e;
    }
    if (t & 4 && typeof e == "object" && e && e.__esModule) {
      return e;
    }
    var r = Object.create(null);
    n.r(r);
    Object.defineProperty(r, "default", {
      enumerable: true,
      value: e,
    });
    if (t & 2 && typeof e != "string") {
      for (var i in e) {
        n.d(
          r,
          i,
          function (t) {
            return e[t];
          }.bind(null, i)
        );
      }
    }
    return r;
  };
  n.n = function (e) {
    var t =
      e && e.__esModule
        ? function () {
            return e.default;
          }
        : function () {
            return e;
          };
    n.d(t, "a", t);
    return t;
  };
  n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  };
  n.p = "";
  n((n.s = 4));
})([
  function (e, t) {
    function n(e, t) {
      var n =
        (typeof Symbol != "undefined" && e[Symbol.iterator]) || e["@@iterator"];
      if (!n) {
        if (
          Array.isArray(e) ||
          (n = (function (e, t) {
            if (!e) {
              return;
            }
            if (typeof e == "string") {
              return r(e, t);
            }
            var n = Object.prototype.toString.call(e).slice(8, -1);
            if (n === "Object" && e.constructor) {
              n = e.constructor.name;
            }
            if (n === "Map" || n === "Set") {
              return Array.from(e);
            }
            if (
              n === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ) {
              return r(e, t);
            }
          })(e)) ||
          (t && e && typeof e.length == "number")
        ) {
          if (n) {
            e = n;
          }
          var i = 0;
          function o() {}
          return {
            s: o,
            n: function () {
              if (i >= e.length) {
                return {
                  done: true,
                };
              } else {
                return {
                  done: false,
                  value: e[i++],
                };
              }
            },
            e: function (e) {
              throw e;
            },
            f: o,
          };
        }
        throw new TypeError(
          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      }
      var a;
      var u = true;
      var s = false;
      return {
        s: function () {
          n = n.call(e);
        },
        n: function () {
          var e = n.next();
          u = e.done;
          return e;
        },
        e: function (e) {
          s = true;
          a = e;
        },
        f: function () {
          try {
            if (!u && n.return != null) {
              n.return();
            }
          } finally {
            if (s) {
              throw a;
            }
          }
        },
      };
    }
    function r(e, t) {
      if (t == null || t > e.length) {
        t = e.length;
      }
      for (var n = 0, r = new Array(t); n < t; n++) {
        r[n] = e[n];
      }
      return r;
    }
    function i(e, t) {
      return Math.log(t) / Math.log(e);
    }
    function o(e, t = 0) {
      var n = Math.pow(10, t);
      return Math.round(e * n) / n;
    }
    e.exports = {
      degreesToRadians: function (e) {
        return e * (Math.PI / 180);
      },
      radiansToDegrees: function (e) {
        return e * (180 / Math.PI);
      },
      formatURL: function (e) {
        var t = e.indexOf("://");
        if (t != -1) {
          e = e.substring(t + 3);
        }
        var n = e.indexOf("/");
        if (n != -1) {
          e = e.substring(0, n);
        }
        return e;
      },
      round: o,
      roundToScope: function (e, t) {
        return o(e, Math.round(-i(10, t)) + 4);
      },
      baseLog: i,
      generateSign: function () {
        if (Math.random() < 0.5) {
          return -1;
        } else {
          return 1;
        }
      },
      formatTime: function (e) {
        var t = parseInt(e, 10);
        var n = Math.floor(t / 3600);
        var r = Math.floor((t - n * 3600) / 60);
        var i = t - n * 3600 - r * 60;
        if (n < 10) {
          n = "0" + n;
        }
        if (r < 10) {
          r = "0" + r;
        }
        if (i < 10) {
          i = "0" + i;
        }
        return n + ":" + r + ":" + i;
      },
      arrayToSentence: function (e) {
        if (e.length == 0) {
          return "nothing";
        }
        if (e.length == 1) {
          return e[0];
        }
        var t = e.pop();
        return e.join(", ") + (e.length === 1 ? " and " : ", and ") + t;
      },
      getXPLevel: function (e) {
        var t = 1;
        for (var n = 100; e > n; ) {
          e -= n;
          n *= 1.2;
          t++;
        }
        return t;
      },
      addChild: function (e, t, r = []) {
        var i = document.createElement(t);
        e.appendChild(i);
        var o;
        var a = n(r);
        try {
          for (a.s(); !(o = a.n()).done; ) {
            var u = o.value;
            i.classList.add(u);
          }
        } catch (e) {
          a.e(e);
        } finally {
          a.f();
        }
        return i;
      },
      removeAllChildren: function (e) {
        while (e.firstChild) {
          e.removeChild(e.firstChild);
        }
      },
      removeAllChildrenButFirst: function (e) {
        for (var t = e.rows.length - 1; t > 0; t--) {
          e.deleteRow(t);
        }
      },
      replaceAll: function (e, t, n) {
        return e.replace(
          new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
          n
        );
      },
    };
  },
  function (e, t) {
    e.exports = Object.freeze({
      CAMERA_SHAKE_DIST: 100000,
      MAX_PARTICLES: 1000,
      CAMERA_SIZE: 2000,
      GRID_STROKE: 5,
      POLYGON_COLORS: [
        "#ffe46b",
        "#fc7676",
        "#768cfc",
        "#fca644",
        "#38b764",
        "#4a66bd",
        "#5d275d",
        "#1a1c2c",
        "#060011",
        "#403645",
        "#ededff",
        "#000000",
      ],
      TEAM_COLORS: ["#00b0e1", "#f04f54", "#00e06c", "#be7ff5"],
      FALLEN_COLOR: "#c0c0c0",
      CELESTIAL_COLOR: "#f177dd",
      BARREL_COLOR: "#999999",
      BACKGROUND_UI_COLOR: "#545454",
      SPIKE_COLOR: "#5F676C",
      STROKE_SIZE: 5,
      STROKE_SHADE: -30,
      TEXT_STROKE: 10,
      GAMEMODES: {
        "-4": {
          name: "The Abyss",
          id: "abyss",
        },
        "-2": {
          name: "The Crossroads",
          id: "crossroads",
        },
        "-1": {
          name: "The Sancturary",
          id: "sanctuary",
        },
        0: {
          name: "Free For All",
          id: "ffa",
        },
        1: {
          name: "4 Teams",
          id: "4teams",
        },
        2: {
          name: "Tank Editor",
          id: "tankeditor",
        },
        10: {
          name: "Private Tank Editor",
          id: "privatetest",
        },
        3: {
          name: "2 Teams",
          id: "2teams",
        },
        4: {
          name: "Spawn Capture",
          id: "spawncapture",
        },
        5: {
          name: "Titans",
          id: "titans",
        },
      },
      REGIONS: [
        {
          id: "NYC",
          slug: "nyc1",
          name: "New York",
        },
        {
          id: "LON",
          slug: "lon1",
          name: "London",
        },
        {
          id: "FRA",
          slug: "fra1",
          name: "Frankfurt",
        },
      ],
      MESSAGE:
        "feel free to look around in the code here, but there isn't much to see if you don't have the token. all the data is server-sided.",
    });
  },
  function (e, t, n) {
    var r = (function (e) {
      "use strict";

      var t = Object.prototype;
      var n = t.hasOwnProperty;
      var r = typeof Symbol == "function" ? Symbol : {};
      var i = r.iterator || "@@iterator";
      var o = r.asyncIterator || "@@asyncIterator";
      var a = r.toStringTag || "@@toStringTag";
      function u(e, t, n) {
        Object.defineProperty(e, t, {
          value: n,
          enumerable: true,
          configurable: true,
          writable: true,
        });
        return e[t];
      }
      try {
        u({}, "");
      } catch (e) {
        u = function (e, t, n) {
          return (e[t] = n);
        };
      }
      function s(e, t, n, r) {
        var i = t && t.prototype instanceof l ? t : l;
        var o = Object.create(i.prototype);
        var a = new R(r || []);
        o._invoke = (function (e, t, n) {
          var r = "suspendedStart";
          return function (i, o) {
            if (r === "executing") {
              throw new Error("Generator is already running");
            }
            if (r === "completed") {
              if (i === "throw") {
                throw o;
              }
              return T();
            }
            n.method = i;
            n.arg = o;
            while (true) {
              var a = n.delegate;
              if (a) {
                var u = b(a, n);
                if (u) {
                  if (u === f) {
                    continue;
                  }
                  return u;
                }
              }
              if (n.method === "next") {
                n.sent = n._sent = n.arg;
              } else if (n.method === "throw") {
                if (r === "suspendedStart") {
                  r = "completed";
                  throw n.arg;
                }
                n.dispatchException(n.arg);
              } else if (n.method === "return") {
                n.abrupt("return", n.arg);
              }
              r = "executing";
              var s = c(e, t, n);
              if (s.type === "normal") {
                r = n.done ? "completed" : "suspendedYield";
                if (s.arg === f) {
                  continue;
                }
                return {
                  value: s.arg,
                  done: n.done,
                };
              }
              if (s.type === "throw") {
                r = "completed";
                n.method = "throw";
                n.arg = s.arg;
              }
            }
          };
        })(e, n, a);
        return o;
      }
      function c(e, t, n) {
        try {
          return {
            type: "normal",
            arg: e.call(t, n),
          };
        } catch (e) {
          return {
            type: "throw",
            arg: e,
          };
        }
      }
      e.wrap = s;
      var f = {};
      function l() {}
      function d() {}
      function h() {}
      var v = {};
      u(v, i, function () {
        return this;
      });
      var g = Object.getPrototypeOf;
      var p = g && g(g(x([])));
      if (p && p !== t && n.call(p, i)) {
        v = p;
      }
      var y = (h.prototype = l.prototype = Object.create(v));
      function m(e) {
        ["next", "throw", "return"].forEach(function (t) {
          u(e, t, function (e) {
            return this._invoke(t, e);
          });
        });
      }
      function _(e, t) {
        var r;
        this._invoke = function (i, o) {
          function a() {
            return new t(function (r, a) {
              (function r(i, o, a, u) {
                var s = c(e[i], e, o);
                if (s.type !== "throw") {
                  var f = s.arg;
                  var l = f.value;
                  if (l && typeof l == "object" && n.call(l, "__await")) {
                    return t.resolve(l.__await).then(
                      function (e) {
                        r("next", e, a, u);
                      },
                      function (e) {
                        r("throw", e, a, u);
                      }
                    );
                  } else {
                    return t.resolve(l).then(
                      function (e) {
                        f.value = e;
                        a(f);
                      },
                      function (e) {
                        return r("throw", e, a, u);
                      }
                    );
                  }
                }
                u(s.arg);
              })(i, o, r, a);
            });
          }
          return (r = r ? r.then(a, a) : a());
        };
      }
      function b(e, t) {
        var n = e.iterator[t.method];
        if (n === undefined) {
          t.delegate = null;
          if (t.method === "throw") {
            if (
              e.iterator.return &&
              ((t.method = "return"),
              (t.arg = undefined),
              b(e, t),
              t.method === "throw")
            ) {
              return f;
            }
            t.method = "throw";
            t.arg = new TypeError(
              "The iterator does not provide a 'throw' method"
            );
          }
          return f;
        }
        var r = c(n, e.iterator, t.arg);
        if (r.type === "throw") {
          t.method = "throw";
          t.arg = r.arg;
          t.delegate = null;
          return f;
        }
        var i = r.arg;
        if (i) {
          if (i.done) {
            t[e.resultName] = i.value;
            t.next = e.nextLoc;
            if (t.method !== "return") {
              t.method = "next";
              t.arg = undefined;
            }
            t.delegate = null;
            return f;
          } else {
            return i;
          }
        } else {
          t.method = "throw";
          t.arg = new TypeError("iterator result is not an object");
          t.delegate = null;
          return f;
        }
      }
      function w(e) {
        var t = {
          tryLoc: e[0],
        };
        if (1 in e) {
          t.catchLoc = e[1];
        }
        if (2 in e) {
          t.finallyLoc = e[2];
          t.afterLoc = e[3];
        }
        this.tryEntries.push(t);
      }
      function O(e) {
        var t = e.completion || {};
        t.type = "normal";
        delete t.arg;
        e.completion = t;
      }
      function R(e) {
        this.tryEntries = [
          {
            tryLoc: "root",
          },
        ];
        e.forEach(w, this);
        this.reset(true);
      }
      function x(e) {
        if (e) {
          var t = e[i];
          if (t) {
            return t.call(e);
          }
          if (typeof e.next == "function") {
            return e;
          }
          if (!isNaN(e.length)) {
            var r = -1;
            var o = function t() {
              while (++r < e.length) {
                if (n.call(e, r)) {
                  t.value = e[r];
                  t.done = false;
                  return t;
                }
              }
              t.value = undefined;
              t.done = true;
              return t;
            };
            return (o.next = o);
          }
        }
        return {
          next: T,
        };
      }
      function T() {
        return {
          value: undefined,
          done: true,
        };
      }
      d.prototype = h;
      u(y, "constructor", h);
      u(h, "constructor", d);
      d.displayName = u(h, a, "GeneratorFunction");
      e.isGeneratorFunction = function (e) {
        var t = typeof e == "function" && e.constructor;
        return (
          !!t && (t === d || (t.displayName || t.name) === "GeneratorFunction")
        );
      };
      e.mark = function (e) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(e, h);
        } else {
          e.__proto__ = h;
          u(e, a, "GeneratorFunction");
        }
        e.prototype = Object.create(y);
        return e;
      };
      e.awrap = function (e) {
        return {
          __await: e,
        };
      };
      m(_.prototype);
      u(_.prototype, o, function () {
        return this;
      });
      e.AsyncIterator = _;
      e.async = function (t, n, r, i, o = Promise) {
        var a = new _(s(t, n, r, i), o);
        if (e.isGeneratorFunction(n)) {
          return a;
        } else {
          return a.next().then(function (e) {
            if (e.done) {
              return e.value;
            } else {
              return a.next();
            }
          });
        }
      };
      m(y);
      u(y, a, "Generator");
      u(y, i, function () {
        return this;
      });
      u(y, "toString", function () {
        return "[object Generator]";
      });
      e.keys = function (e) {
        var t = [];
        for (var n in e) {
          t.push(n);
        }
        t.reverse();
        return function n() {
          while (t.length) {
            var r = t.pop();
            if (r in e) {
              n.value = r;
              n.done = false;
              return n;
            }
          }
          n.done = true;
          return n;
        };
      };
      e.values = x;
      R.prototype = {
        constructor: R,
        reset: function (e) {
          this.prev = 0;
          this.next = 0;
          this.sent = this._sent = undefined;
          this.done = false;
          this.delegate = null;
          this.method = "next";
          this.arg = undefined;
          this.tryEntries.forEach(O);
          if (!e) {
            for (var t in this) {
              if (
                t.charAt(0) === "t" &&
                n.call(this, t) &&
                !isNaN(+t.slice(1))
              ) {
                this[t] = undefined;
              }
            }
          }
        },
        stop: function () {
          this.done = true;
          var e = this.tryEntries[0].completion;
          if (e.type === "throw") {
            throw e.arg;
          }
          return this.rval;
        },
        dispatchException: function (e) {
          if (this.done) {
            throw e;
          }
          var t = this;
          function r(n, r) {
            a.type = "throw";
            a.arg = e;
            t.next = n;
            if (r) {
              t.method = "next";
              t.arg = undefined;
            }
            return !!r;
          }
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var o = this.tryEntries[i];
            var a = o.completion;
            if (o.tryLoc === "root") {
              return r("end");
            }
            if (o.tryLoc <= this.prev) {
              var u = n.call(o, "catchLoc");
              var s = n.call(o, "finallyLoc");
              if (u && s) {
                if (this.prev < o.catchLoc) {
                  return r(o.catchLoc, true);
                }
                if (this.prev < o.finallyLoc) {
                  return r(o.finallyLoc);
                }
              } else if (u) {
                if (this.prev < o.catchLoc) {
                  return r(o.catchLoc, true);
                }
              } else {
                if (!s) {
                  throw new Error("try statement without catch or finally");
                }
                if (this.prev < o.finallyLoc) {
                  return r(o.finallyLoc);
                }
              }
            }
          }
        },
        abrupt: function (e, t) {
          for (var r = this.tryEntries.length - 1; r >= 0; --r) {
            var i = this.tryEntries[r];
            if (
              i.tryLoc <= this.prev &&
              n.call(i, "finallyLoc") &&
              this.prev < i.finallyLoc
            ) {
              var o = i;
              break;
            }
          }
          if (
            o &&
            (e === "break" || e === "continue") &&
            o.tryLoc <= t &&
            t <= o.finallyLoc
          ) {
            o = null;
          }
          var a = o ? o.completion : {};
          a.type = e;
          a.arg = t;
          if (o) {
            this.method = "next";
            this.next = o.finallyLoc;
            return f;
          } else {
            return this.complete(a);
          }
        },
        complete: function (e, t) {
          if (e.type === "throw") {
            throw e.arg;
          }
          if (e.type === "break" || e.type === "continue") {
            this.next = e.arg;
          } else if (e.type === "return") {
            this.rval = this.arg = e.arg;
            this.method = "return";
            this.next = "end";
          } else if (e.type === "normal" && t) {
            this.next = t;
          }
          return f;
        },
        finish: function (e) {
          for (var t = this.tryEntries.length - 1; t >= 0; --t) {
            var n = this.tryEntries[t];
            if (n.finallyLoc === e) {
              this.complete(n.completion, n.afterLoc);
              O(n);
              return f;
            }
          }
        },
        catch: function (e) {
          for (var t = this.tryEntries.length - 1; t >= 0; --t) {
            var n = this.tryEntries[t];
            if (n.tryLoc === e) {
              var r = n.completion;
              if (r.type === "throw") {
                var i = r.arg;
                O(n);
              }
              return i;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function (e, t, n) {
          this.delegate = {
            iterator: x(e),
            resultName: t,
            nextLoc: n,
          };
          if (this.method === "next") {
            this.arg = undefined;
          }
          return f;
        },
      };
      return e;
    })(e.exports);
    try {
      regeneratorRuntime = r;
    } catch (e) {
      if (typeof globalThis == "object") {
        globalThis.regeneratorRuntime = r;
      } else {
        Function("r", "regeneratorRuntime = r")(r);
      }
    }
  },
  function (e, t, n) {
    (function (e) {
      "use strict";

      function t(e, t, n, r) {
        var i;
        var o = false;
        var a = 0;
        function u() {
          if (i) {
            clearTimeout(i);
          }
        }
        function s() {
          for (var s = arguments.length, c = new Array(s), f = 0; f < s; f++) {
            c[f] = arguments[f];
          }
          var l = this;
          var d = Date.now() - a;
          function h() {
            a = Date.now();
            n.apply(l, c);
          }
          function v() {
            i = undefined;
          }
          if (!o) {
            if (r && !i) {
              h();
            }
            u();
            if (r === undefined && d > e) {
              h();
            } else if (t !== true) {
              i = setTimeout(r ? v : h, r === undefined ? e - d : e);
            }
          }
        }
        if (typeof t != "boolean") {
          r = n;
          n = t;
          t = undefined;
        }
        s.cancel = function () {
          u();
          o = true;
        };
        return s;
      }
      e.debounce = function (e, n, r) {
        if (r === undefined) {
          return t(e, n, false);
        } else {
          return t(e, r, n !== false);
        }
      };
      e.throttle = t;
      Object.defineProperty(e, "__esModule", {
        value: true,
      });
    })(t);
  },
  function (e, t, n) {
    n(2);
    e.exports = n(10);
  },
  function (e, t, n) {
    (function (e, r) {
      var i;
      /**
       * @license
       * Lodash <https://lodash.com/>
       * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
       * Released under MIT license <https://lodash.com/license>
       * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
       * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
       */
      (function () {
        var o = "Expected a function";
        var a = "__lodash_placeholder__";
        var u = [
          ["ary", 128],
          ["bind", 1],
          ["bindKey", 2],
          ["curry", 8],
          ["curryRight", 16],
          ["flip", 512],
          ["partial", 32],
          ["partialRight", 64],
          ["rearg", 256],
        ];
        var s = "[object Arguments]";
        var c = "[object Array]";
        var f = "[object Boolean]";
        var l = "[object Date]";
        var d = "[object Error]";
        var h = "[object Function]";
        var v = "[object GeneratorFunction]";
        var g = "[object Map]";
        var p = "[object Number]";
        var y = "[object Object]";
        var m = "[object RegExp]";
        var _ = "[object Set]";
        var b = "[object String]";
        var w = "[object Symbol]";
        var O = "[object WeakMap]";
        var R = "[object ArrayBuffer]";
        var x = "[object DataView]";
        var T = "[object Float32Array]";
        var j = "[object Float64Array]";
        var S = "[object Int8Array]";
        var M = "[object Int16Array]";
        var E = "[object Int32Array]";
        var L = "[object Uint8Array]";
        var k = "[object Uint16Array]";
        var C = "[object Uint32Array]";
        var A = /\b__p \+= '';/g;
        var I = /\b(__p \+=) '' \+/g;
        var z = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
        var P = /&(?:amp|lt|gt|quot|#39);/g;
        var D = /[&<>"']/g;
        var Y = RegExp(P.source);
        var N = RegExp(D.source);
        var B = /<%-([\s\S]+?)%>/g;
        var W = /<%([\s\S]+?)%>/g;
        var G = /<%=([\s\S]+?)%>/g;
        var X = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
        var U = /^\w*$/;
        var F =
          /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
        var $ = /[\\^$.*+?()[\]{}|]/g;
        var K = RegExp($.source);
        var Z = /^\s+/;
        var V = /\s/;
        var q = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;
        var H = /\{\n\/\* \[wrapped with (.+)\] \*/;
        var J = /,? & /;
        var Q = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
        var v2 = /[()=,{}\[\]\/\s]/;
        var v3 = /\\(\\)?/g;
        var v4 = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
        var v5 = /\w*$/;
        var v6 = /^[-+]0x[0-9a-f]+$/i;
        var v7 = /^0b[01]+$/i;
        var v8 = /^\[object .+?Constructor\]$/;
        var v9 = /^0o[0-7]+$/i;
        var v10 = /^(?:0|[1-9]\d*)$/;
        var v11 = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
        var v12 = /($^)/;
        var v13 = /['\n\r\u2028\u2029\\]/g;
        var vLSu0300u036fufe20ufe2f =
          "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff";
        var vLSxacxb1xd7xf7x00x2fx3 =
          "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000";
        var vLSud800udfff = "[\\ud800-\\udfff]";
        var v14 = "[" + vLSxacxb1xd7xf7x00x2fx3 + "]";
        var v15 = "[" + vLSu0300u036fufe20ufe2f + "]";
        var vLSd = "\\d+";
        var vLSu2700u27bf = "[\\u2700-\\u27bf]";
        var vLSazxdfxf6xf8xff = "[a-z\\xdf-\\xf6\\xf8-\\xff]";
        var v16 =
          "[^\\ud800-\\udfff" +
          vLSxacxb1xd7xf7x00x2fx3 +
          vLSd +
          "\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]";
        var vLSud83cudffbudfff = "\\ud83c[\\udffb-\\udfff]";
        var vLSud800udfff2 = "[^\\ud800-\\udfff]";
        var vLSud83cudde6uddff2 = "(?:\\ud83c[\\udde6-\\uddff]){2}";
        var vLSud800udbffudc00udfff = "[\\ud800-\\udbff][\\udc00-\\udfff]";
        var vLSAZxc0xd6xd8xde = "[A-Z\\xc0-\\xd6\\xd8-\\xde]";
        var v17 = "(?:" + vLSazxdfxf6xf8xff + "|" + v16 + ")";
        var v18 = "(?:" + vLSAZxc0xd6xd8xde + "|" + v16 + ")";
        var v19 = "(?:" + v15 + "|" + vLSud83cudffbudfff + ")?";
        var v20 =
          "[\\ufe0e\\ufe0f]?" +
          v19 +
          ("(?:\\u200d(?:" +
            [vLSud800udfff2, vLSud83cudde6uddff2, vLSud800udbffudc00udfff].join(
              "|"
            ) +
            ")[\\ufe0e\\ufe0f]?" +
            v19 +
            ")*");
        var v21 =
          "(?:" +
          [vLSu2700u27bf, vLSud83cudde6uddff2, vLSud800udbffudc00udfff].join(
            "|"
          ) +
          ")" +
          v20;
        var v22 =
          "(?:" +
          [
            vLSud800udfff2 + v15 + "?",
            v15,
            vLSud83cudde6uddff2,
            vLSud800udbffudc00udfff,
            vLSud800udfff,
          ].join("|") +
          ")";
        var vRegExp = RegExp("['’]", "g");
        var vRegExp2 = RegExp(v15, "g");
        var vRegExp3 = RegExp(
          vLSud83cudffbudfff + "(?=" + vLSud83cudffbudfff + ")|" + v22 + v20,
          "g"
        );
        var vRegExp4 = RegExp(
          [
            vLSAZxc0xd6xd8xde +
              "?" +
              vLSazxdfxf6xf8xff +
              "+(?:['’](?:d|ll|m|re|s|t|ve))?(?=" +
              [v14, vLSAZxc0xd6xd8xde, "$"].join("|") +
              ")",
            v18 +
              "+(?:['’](?:D|LL|M|RE|S|T|VE))?(?=" +
              [v14, vLSAZxc0xd6xd8xde + v17, "$"].join("|") +
              ")",
            vLSAZxc0xd6xd8xde + "?" + v17 + "+(?:['’](?:d|ll|m|re|s|t|ve))?",
            vLSAZxc0xd6xd8xde + "+(?:['’](?:D|LL|M|RE|S|T|VE))?",
            "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
            "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
            vLSd,
            v21,
          ].join("|"),
          "g"
        );
        var vRegExp5 = RegExp(
          "[\\u200d\\ud800-\\udfff" +
            vLSu0300u036fufe20ufe2f +
            "\\ufe0e\\ufe0f]"
        );
        var v23 =
          /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
        var vA = [
          "Array",
          "Buffer",
          "DataView",
          "Date",
          "Error",
          "Float32Array",
          "Float64Array",
          "Function",
          "Int8Array",
          "Int16Array",
          "Int32Array",
          "Map",
          "Math",
          "Object",
          "Promise",
          "RegExp",
          "Set",
          "String",
          "Symbol",
          "TypeError",
          "Uint8Array",
          "Uint8ClampedArray",
          "Uint16Array",
          "Uint32Array",
          "WeakMap",
          "_",
          "clearTimeout",
          "isFinite",
          "parseInt",
          "setTimeout",
        ];
        var v24 = -1;
        var vO = {};
        vO[T] =
          vO[j] =
          vO[S] =
          vO[M] =
          vO[E] =
          vO[L] =
          vO["[object Uint8ClampedArray]"] =
          vO[k] =
          vO[C] =
            true;
        vO[s] =
          vO[c] =
          vO[R] =
          vO[f] =
          vO[x] =
          vO[l] =
          vO[d] =
          vO[h] =
          vO[g] =
          vO[p] =
          vO[y] =
          vO[m] =
          vO[_] =
          vO[b] =
          vO[O] =
            false;
        var vO2 = {};
        vO2[s] =
          vO2[c] =
          vO2[R] =
          vO2[x] =
          vO2[f] =
          vO2[l] =
          vO2[T] =
          vO2[j] =
          vO2[S] =
          vO2[M] =
          vO2[E] =
          vO2[g] =
          vO2[p] =
          vO2[y] =
          vO2[m] =
          vO2[_] =
          vO2[b] =
          vO2[w] =
          vO2[L] =
          vO2["[object Uint8ClampedArray]"] =
          vO2[k] =
          vO2[C] =
            true;
        vO2[d] = vO2[h] = vO2[O] = false;
        var vO3 = {
          "\\": "\\",
          "'": "'",
          "\n": "n",
          "\r": "r",
          "\u2028": "u2028",
          "\u2029": "u2029",
        };
        var vParseFloat = parseFloat;
        var vParseInt = parseInt;
        var v25 = typeof e == "object" && e && e.Object === Object && e;
        var v26 =
          typeof self == "object" && self && self.Object === Object && self;
        var v27 = v25 || v26 || Function("return this")();
        var v28 = t && !t.nodeType && t;
        var v29 = v28 && typeof r == "object" && r && !r.nodeType && r;
        var v30 = v29 && v29.exports === v28;
        var v31 = v30 && v25.process;
        var vF = (function () {
          try {
            var e = v29 && v29.require && v29.require("util").types;
            return e || (v31 && v31.binding && v31.binding("util"));
          } catch (e) {}
        })();
        var v32 = vF && vF.isArrayBuffer;
        var v33 = vF && vF.isDate;
        var v34 = vF && vF.isMap;
        var v35 = vF && vF.isRegExp;
        var v36 = vF && vF.isSet;
        var v37 = vF && vF.isTypedArray;
        function f2(e, t, n) {
          switch (n.length) {
            case 0:
              return e.call(t);
            case 1:
              return e.call(t, n[0]);
            case 2:
              return e.call(t, n[0], n[1]);
            case 3:
              return e.call(t, n[0], n[1], n[2]);
          }
          return e.apply(t, n);
        }
        function f3(e, t, n, r) {
          for (var i = -1, o = e == null ? 0 : e.length; ++i < o; ) {
            var a = e[i];
            t(r, a, n(a), e);
          }
          return r;
        }
        function f4(e, t) {
          for (
            var n = -1, r = e == null ? 0 : e.length;
            ++n < r && t(e[n], n, e) !== false;

          );
          return e;
        }
        function f5(e, t) {
          for (
            var n = e == null ? 0 : e.length;
            n-- && t(e[n], n, e) !== false;

          );
          return e;
        }
        function f6(e, t) {
          for (var n = -1, r = e == null ? 0 : e.length; ++n < r; ) {
            if (!t(e[n], n, e)) {
              return false;
            }
          }
          return true;
        }
        function f7(e, t) {
          for (
            var n = -1, r = e == null ? 0 : e.length, i = 0, o = [];
            ++n < r;

          ) {
            var a = e[n];
            if (t(a, n, e)) {
              o[i++] = a;
            }
          }
          return o;
        }
        function f8(e, t) {
          return !!(e == null ? 0 : e.length) && f17(e, t, 0) > -1;
        }
        function f9(e, t, n) {
          for (var r = -1, i = e == null ? 0 : e.length; ++r < i; ) {
            if (n(t, e[r])) {
              return true;
            }
          }
          return false;
        }
        function f10(e, t) {
          for (
            var n = -1, r = e == null ? 0 : e.length, i = Array(r);
            ++n < r;

          ) {
            i[n] = t(e[n], n, e);
          }
          return i;
        }
        function f11(e, t) {
          for (var n = -1, r = t.length, i = e.length; ++n < r; ) {
            e[i + n] = t[n];
          }
          return e;
        }
        function f12(e, t, n, r) {
          var i = -1;
          var o = e == null ? 0 : e.length;
          for (r && o && (n = e[++i]); ++i < o; ) {
            n = t(n, e[i], i, e);
          }
          return n;
        }
        function f13(e, t, n, r) {
          var i = e == null ? 0 : e.length;
          for (r && i && (n = e[--i]); i--; ) {
            n = t(n, e[i], i, e);
          }
          return n;
        }
        function f14(e, t) {
          for (var n = -1, r = e == null ? 0 : e.length; ++n < r; ) {
            if (t(e[n], n, e)) {
              return true;
            }
          }
          return false;
        }
        var vTt = f21("length");
        function f15(e, t, n) {
          var r;
          n(e, function (e, n, i) {
            if (t(e, n, i)) {
              r = n;
              return false;
            }
          });
          return r;
        }
        function f16(e, t, n, r) {
          for (var i = e.length, o = n + (r ? 1 : -1); r ? o-- : ++o < i; ) {
            if (t(e[o], o, e)) {
              return o;
            }
          }
          return -1;
        }
        function f17(e, t, n) {
          if (t == t) {
            return (function (e, t, n) {
              var r = n - 1;
              var i = e.length;
              while (++r < i) {
                if (e[r] === t) {
                  return r;
                }
              }
              return -1;
            })(e, t, n);
          } else {
            return f16(e, f19, n);
          }
        }
        function f18(e, t, n, r) {
          for (var i = n - 1, o = e.length; ++i < o; ) {
            if (r(e[i], t)) {
              return i;
            }
          }
          return -1;
        }
        function f19(e) {
          return e != e;
        }
        function f20(e, t) {
          var n = e == null ? 0 : e.length;
          if (n) {
            return f24(e, t) / n;
          } else {
            return NaN;
          }
        }
        function f21(e) {
          return function (t) {
            if (t == null) {
              return undefined;
            } else {
              return t[e];
            }
          };
        }
        function f22(e) {
          return function (t) {
            if (e == null) {
              return undefined;
            } else {
              return e[t];
            }
          };
        }
        function f23(e, t, n, r, i) {
          i(e, function (e, i, o) {
            n = r ? ((r = false), e) : t(n, e, i, o);
          });
          return n;
        }
        function f24(e, t) {
          var n;
          for (var r = -1, i = e.length; ++r < i; ) {
            var o = t(e[r]);
            if (o !== undefined) {
              n = n === undefined ? o : n + o;
            }
          }
          return n;
        }
        function f25(e, t) {
          for (var n = -1, r = Array(e); ++n < e; ) {
            r[n] = t(n);
          }
          return r;
        }
        function f26(e) {
          if (e) {
            return e.slice(0, f42(e) + 1).replace(Z, "");
          } else {
            return e;
          }
        }
        function f27(e) {
          return function (t) {
            return e(t);
          };
        }
        function f28(e, t) {
          return f10(t, function (t) {
            return e[t];
          });
        }
        function f29(e, t) {
          return e.has(t);
        }
        function f30(e, t) {
          for (var n = -1, r = e.length; ++n < r && f17(t, e[n], 0) > -1; );
          return n;
        }
        function f31(e, t) {
          for (var n = e.length; n-- && f17(t, e[n], 0) > -1; );
          return n;
        }
        function f32(e, t) {
          for (var n = e.length, r = 0; n--; ) {
            if (e[n] === t) {
              ++r;
            }
          }
          return r;
        }
        var vF22 = f22({
          À: "A",
          Á: "A",
          Â: "A",
          Ã: "A",
          Ä: "A",
          Å: "A",
          à: "a",
          á: "a",
          â: "a",
          ã: "a",
          ä: "a",
          å: "a",
          Ç: "C",
          ç: "c",
          Ð: "D",
          ð: "d",
          È: "E",
          É: "E",
          Ê: "E",
          Ë: "E",
          è: "e",
          é: "e",
          ê: "e",
          ë: "e",
          Ì: "I",
          Í: "I",
          Î: "I",
          Ï: "I",
          ì: "i",
          í: "i",
          î: "i",
          ï: "i",
          Ñ: "N",
          ñ: "n",
          Ò: "O",
          Ó: "O",
          Ô: "O",
          Õ: "O",
          Ö: "O",
          Ø: "O",
          ò: "o",
          ó: "o",
          ô: "o",
          õ: "o",
          ö: "o",
          ø: "o",
          Ù: "U",
          Ú: "U",
          Û: "U",
          Ü: "U",
          ù: "u",
          ú: "u",
          û: "u",
          ü: "u",
          Ý: "Y",
          ý: "y",
          ÿ: "y",
          Æ: "Ae",
          æ: "ae",
          Þ: "Th",
          þ: "th",
          ß: "ss",
          Ā: "A",
          Ă: "A",
          Ą: "A",
          ā: "a",
          ă: "a",
          ą: "a",
          Ć: "C",
          Ĉ: "C",
          Ċ: "C",
          Č: "C",
          ć: "c",
          ĉ: "c",
          ċ: "c",
          č: "c",
          Ď: "D",
          Đ: "D",
          ď: "d",
          đ: "d",
          Ē: "E",
          Ĕ: "E",
          Ė: "E",
          Ę: "E",
          Ě: "E",
          ē: "e",
          ĕ: "e",
          ė: "e",
          ę: "e",
          ě: "e",
          Ĝ: "G",
          Ğ: "G",
          Ġ: "G",
          Ģ: "G",
          ĝ: "g",
          ğ: "g",
          ġ: "g",
          ģ: "g",
          Ĥ: "H",
          Ħ: "H",
          ĥ: "h",
          ħ: "h",
          Ĩ: "I",
          Ī: "I",
          Ĭ: "I",
          Į: "I",
          İ: "I",
          ĩ: "i",
          ī: "i",
          ĭ: "i",
          į: "i",
          ı: "i",
          Ĵ: "J",
          ĵ: "j",
          Ķ: "K",
          ķ: "k",
          ĸ: "k",
          Ĺ: "L",
          Ļ: "L",
          Ľ: "L",
          Ŀ: "L",
          Ł: "L",
          ĺ: "l",
          ļ: "l",
          ľ: "l",
          ŀ: "l",
          ł: "l",
          Ń: "N",
          Ņ: "N",
          Ň: "N",
          Ŋ: "N",
          ń: "n",
          ņ: "n",
          ň: "n",
          ŋ: "n",
          Ō: "O",
          Ŏ: "O",
          Ő: "O",
          ō: "o",
          ŏ: "o",
          ő: "o",
          Ŕ: "R",
          Ŗ: "R",
          Ř: "R",
          ŕ: "r",
          ŗ: "r",
          ř: "r",
          Ś: "S",
          Ŝ: "S",
          Ş: "S",
          Š: "S",
          ś: "s",
          ŝ: "s",
          ş: "s",
          š: "s",
          Ţ: "T",
          Ť: "T",
          Ŧ: "T",
          ţ: "t",
          ť: "t",
          ŧ: "t",
          Ũ: "U",
          Ū: "U",
          Ŭ: "U",
          Ů: "U",
          Ű: "U",
          Ų: "U",
          ũ: "u",
          ū: "u",
          ŭ: "u",
          ů: "u",
          ű: "u",
          ų: "u",
          Ŵ: "W",
          ŵ: "w",
          Ŷ: "Y",
          ŷ: "y",
          Ÿ: "Y",
          Ź: "Z",
          Ż: "Z",
          Ž: "Z",
          ź: "z",
          ż: "z",
          ž: "z",
          Ĳ: "IJ",
          ĳ: "ij",
          Œ: "Oe",
          œ: "oe",
          ŉ: "'n",
          ſ: "s",
        });
        var vF222 = f22({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        });
        function f33(e) {
          return "\\" + vO3[e];
        }
        function f34(e) {
          return vRegExp5.test(e);
        }
        function f35(e) {
          var t = -1;
          var n = Array(e.size);
          e.forEach(function (e, r) {
            n[++t] = [r, e];
          });
          return n;
        }
        function f36(e, t) {
          return function (n) {
            return e(t(n));
          };
        }
        function f37(e, t) {
          for (var n = -1, r = e.length, i = 0, o = []; ++n < r; ) {
            var u = e[n];
            if (u === t || u === a) {
              e[n] = a;
              o[i++] = n;
            }
          }
          return o;
        }
        function f38(e) {
          var t = -1;
          var n = Array(e.size);
          e.forEach(function (e) {
            n[++t] = e;
          });
          return n;
        }
        function f39(e) {
          var t = -1;
          var n = Array(e.size);
          e.forEach(function (e) {
            n[++t] = [e, e];
          });
          return n;
        }
        function f40(e) {
          if (f34(e)) {
            return (function (e) {
              var t = (vRegExp3.lastIndex = 0);
              while (vRegExp3.test(e)) {
                ++t;
              }
              return t;
            })(e);
          } else {
            return vTt(e);
          }
        }
        function f41(e) {
          if (f34(e)) {
            return (function (e) {
              return e.match(vRegExp3) || [];
            })(e);
          } else {
            return (function (e) {
              return e.split("");
            })(e);
          }
        }
        function f42(e) {
          for (var t = e.length; t-- && V.test(e.charAt(t)); );
          return t;
        }
        var vF223 = f22({
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&quot;": '"',
          "&#39;": "'",
        });
        var vE = (function e(t) {
          var n;
          var r = (t =
            t == null ? v27 : vE.defaults(v27.Object(), t, vE.pick(v27, vA)))
            .Array;
          var i = t.Date;
          var V = t.Error;
          var v38 = t.Function;
          var v39 = t.Math;
          var v40 = t.Object;
          var v41 = t.RegExp;
          var v42 = t.String;
          var v43 = t.TypeError;
          var v44 = r.prototype;
          var v45 = v38.prototype;
          var v46 = v40.prototype;
          var v47 = t["__core-js_shared__"];
          var v48 = v45.toString;
          var v49 = v46.hasOwnProperty;
          var vLN0 = 0;
          var v50 = (n = /[^.]+$/.exec(
            (v47 && v47.keys && v47.keys.IE_PROTO) || ""
          ))
            ? "Symbol(src)_1." + n
            : "";
          var v51 = v46.toString;
          var v52 = v48.call(v40);
          var v53 = v27._;
          var vV41 = v41(
            "^" +
              v48
                .call(v49)
                .replace($, "\\$&")
                .replace(
                  /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                  "$1.*?"
                ) +
              "$"
          );
          var v54 = v30 ? t.Buffer : undefined;
          var v55 = t.Symbol;
          var v56 = t.Uint8Array;
          var v57 = v54 ? v54.allocUnsafe : undefined;
          var vF36 = f36(v40.getPrototypeOf, v40);
          var v58 = v40.create;
          var v59 = v46.propertyIsEnumerable;
          var v60 = v44.splice;
          var v61 = v55 ? v55.isConcatSpreadable : undefined;
          var v62 = v55 ? v55.iterator : undefined;
          var v63 = v55 ? v55.toStringTag : undefined;
          var vF2 = (function () {
            try {
              var e = f165(v40, "defineProperty");
              e({}, "", {});
              return e;
            } catch (e) {}
          })();
          var v64 = t.clearTimeout !== v27.clearTimeout && t.clearTimeout;
          var v65 = i && i.now !== v27.Date.now && i.now;
          var v66 = t.setTimeout !== v27.setTimeout && t.setTimeout;
          var v67 = v39.ceil;
          var v68 = v39.floor;
          var v69 = v40.getOwnPropertySymbols;
          var v70 = v54 ? v54.isBuffer : undefined;
          var v71 = t.isFinite;
          var v72 = v44.join;
          var vF362 = f36(v40.keys, v40);
          var v73 = v39.max;
          var v74 = v39.min;
          var v75 = i.now;
          var v76 = t.parseInt;
          var v77 = v39.random;
          var v78 = v44.reverse;
          var vEo = f165(t, "DataView");
          var vEo2 = f165(t, "Map");
          var vEo3 = f165(t, "Promise");
          var vEo4 = f165(t, "Set");
          var vEo5 = f165(t, "WeakMap");
          var vEo6 = f165(v40, "create");
          var v79 = vEo5 && new vEo5();
          var vO4 = {};
          var vMo = f184(vEo);
          var vMo2 = f184(vEo2);
          var vMo3 = f184(vEo3);
          var vMo4 = f184(vEo4);
          var vMo5 = f184(vEo5);
          var v80 = v55 ? v55.prototype : undefined;
          var v81 = v80 ? v80.valueOf : undefined;
          var v82 = v80 ? v80.toString : undefined;
          function f43(e) {
            if (f213(e) && !v94(e) && !(e instanceof f46)) {
              if (e instanceof f45) {
                return e;
              }
              if (v49.call(e, "__wrapped__")) {
                return f185(e);
              }
            }
            return new f45(e);
          }
          var vF3 = (function () {
            function e() {}
            return function (t) {
              if (!f212(t)) {
                return {};
              }
              if (v58) {
                return v58(t);
              }
              e.prototype = t;
              var n = new e();
              e.prototype = undefined;
              return n;
            };
          })();
          function f44() {}
          function f45(e, t) {
            this.__wrapped__ = e;
            this.__actions__ = [];
            this.__chain__ = !!t;
            this.__index__ = 0;
            this.__values__ = undefined;
          }
          function f46(e) {
            this.__wrapped__ = e;
            this.__actions__ = [];
            this.__dir__ = 1;
            this.__filtered__ = false;
            this.__iteratees__ = [];
            this.__takeCount__ = 4294967295;
            this.__views__ = [];
          }
          function f47(e) {
            var t = -1;
            var n = e == null ? 0 : e.length;
            for (this.clear(); ++t < n; ) {
              var r = e[t];
              this.set(r[0], r[1]);
            }
          }
          function f48(e) {
            var t = -1;
            var n = e == null ? 0 : e.length;
            for (this.clear(); ++t < n; ) {
              var r = e[t];
              this.set(r[0], r[1]);
            }
          }
          function f49(e) {
            var t = -1;
            var n = e == null ? 0 : e.length;
            for (this.clear(); ++t < n; ) {
              var r = e[t];
              this.set(r[0], r[1]);
            }
          }
          function f50(e) {
            var t = -1;
            var n = e == null ? 0 : e.length;
            for (this.__data__ = new f49(); ++t < n; ) {
              this.add(e[t]);
            }
          }
          function f51(e) {
            var t = (this.__data__ = new f48(e));
            this.size = t.size;
          }
          function f52(e, t) {
            var n = v94(e);
            var r = !n && v93(e);
            var i = !n && !r && v96(e);
            var o = !n && !r && !i && v101(e);
            var a = n || r || i || o;
            var u = a ? f25(e.length, v42) : [];
            var s = u.length;
            for (var c in e) {
              if (
                (!!t || !!v49.call(e, c)) &&
                (!a ||
                  (c != "length" &&
                    (!i || (c != "offset" && c != "parent")) &&
                    (!o ||
                      (c != "buffer" &&
                        c != "byteLength" &&
                        c != "byteOffset")) &&
                    !f169(c, s)))
              ) {
                u.push(c);
              }
            }
            return u;
          }
          function f53(e) {
            var t = e.length;
            if (t) {
              return e[f100(0, t - 1)];
            } else {
              return undefined;
            }
          }
          function f54(e, t) {
            return f182(f131(e), f63(t, 0, e.length));
          }
          function f55(e) {
            return f182(f131(e));
          }
          function f56(e, t, n) {
            if (
              (n !== undefined && !f205(e[t], n)) ||
              (n === undefined && !(t in e))
            ) {
              f61(e, t, n);
            }
          }
          function f57(e, t, n) {
            var r = e[t];
            if (
              !v49.call(e, t) ||
              !f205(r, n) ||
              (n === undefined && !(t in e))
            ) {
              f61(e, t, n);
            }
          }
          function f58(e, t) {
            for (var n = e.length; n--; ) {
              if (f205(e[n][0], t)) {
                return n;
              }
            }
            return -1;
          }
          function f59(e, t, n, r) {
            vOi(e, function (e, i, o) {
              t(r, e, n(e), o);
            });
            return r;
          }
          function f60(e, t) {
            return e && f132(t, f227(t), e);
          }
          function f61(e, t, n) {
            if (t == "__proto__" && vF2) {
              vF2(e, t, {
                configurable: true,
                enumerable: true,
                value: n,
                writable: true,
              });
            } else {
              e[t] = n;
            }
          }
          function f62(e, t) {
            for (var n = -1, i = t.length, o = r(i), a = e == null; ++n < i; ) {
              o[n] = a ? undefined : f225(e, t[n]);
            }
            return o;
          }
          function f63(e, t, n) {
            if (e == e) {
              if (n !== undefined) {
                e = e <= n ? e : n;
              }
              if (t !== undefined) {
                e = e >= t ? e : t;
              }
            }
            return e;
          }
          function f64(e, t, n, r, i, o) {
            var a;
            var u = t & 1;
            var c = t & 2;
            var d = t & 4;
            if (n) {
              a = i ? n(e, r, i, o) : n(e);
            }
            if (a !== undefined) {
              return a;
            }
            if (!f212(e)) {
              return e;
            }
            var O = v94(e);
            if (O) {
              a = (function (e) {
                var t = e.length;
                var n = new e.constructor(t);
                if (t && typeof e[0] == "string" && v49.call(e, "index")) {
                  n.index = e.index;
                  n.input = e.input;
                }
                return n;
              })(e);
              if (!u) {
                return f131(e, a);
              }
            } else {
              var A = vF77(e);
              var I = A == h || A == v;
              if (v96(e)) {
                return f125(e, u);
              }
              if (A == y || A == s || (I && !i)) {
                a = c || I ? {} : f167(e);
                if (!u) {
                  if (c) {
                    return (function (e, t) {
                      return f132(e, v89(e), t);
                    })(
                      e,
                      (function (e, t) {
                        return e && f132(t, f228(t), e);
                      })(a, e)
                    );
                  } else {
                    return (function (e, t) {
                      return f132(e, v88(e), t);
                    })(e, f60(a, e));
                  }
                }
              } else {
                if (!vO2[A]) {
                  if (i) {
                    return e;
                  } else {
                    return {};
                  }
                }
                a = (function (e, t, n) {
                  var r = e.constructor;
                  switch (t) {
                    case R:
                      return f126(e);
                    case f:
                    case l:
                      return new r(+e);
                    case x:
                      return (function (e, t) {
                        var n = t ? f126(e.buffer) : e.buffer;
                        return new e.constructor(n, e.byteOffset, e.byteLength);
                      })(e, n);
                    case T:
                    case j:
                    case S:
                    case M:
                    case E:
                    case L:
                    case "[object Uint8ClampedArray]":
                    case k:
                    case C:
                      return f127(e, n);
                    case g:
                      return new r();
                    case p:
                    case b:
                      return new r(e);
                    case m:
                      return (function (e) {
                        var t = new e.constructor(e.source, v5.exec(e));
                        t.lastIndex = e.lastIndex;
                        return t;
                      })(e);
                    case _:
                      return new r();
                    case w:
                      i = e;
                      if (v81) {
                        return v40(v81.call(i));
                      } else {
                        return {};
                      }
                  }
                  var i;
                })(e, A, u);
              }
            }
            o ||= new f51();
            var z = o.get(e);
            if (z) {
              return z;
            }
            o.set(e, a);
            if (v100(e)) {
              e.forEach(function (r) {
                a.add(f64(r, t, n, r, e, o));
              });
            } else if (v98(e)) {
              e.forEach(function (r, i) {
                a.set(i, f64(r, t, n, i, e, o));
              });
            }
            var P = O
              ? undefined
              : (d ? (c ? f159 : f158) : c ? f228 : f227)(e);
            f4(P || e, function (r, i) {
              if (P) {
                r = e[(i = r)];
              }
              f57(a, i, f64(r, t, n, i, e, o));
            });
            return a;
          }
          function f65(e, t, n) {
            var r = n.length;
            if (e == null) {
              return !r;
            }
            for (e = v40(e); r--; ) {
              var i = n[r];
              var o = t[i];
              var a = e[i];
              if ((a === undefined && !(i in e)) || !o(a)) {
                return false;
              }
            }
            return true;
          }
          function f66(e, t, n) {
            if (typeof e != "function") {
              throw new v43(o);
            }
            return v91(function () {
              e.apply(undefined, n);
            }, t);
          }
          function f67(e, t, n, r) {
            var i = -1;
            var o = f8;
            var a = true;
            var u = e.length;
            var s = [];
            var c = t.length;
            if (!u) {
              return s;
            }
            if (n) {
              t = f10(t, f27(n));
            }
            if (r) {
              o = f9;
              a = false;
            } else if (t.length >= 200) {
              o = f29;
              a = false;
              t = new f50(t);
            }
            e: while (++i < u) {
              var f = e[i];
              var l = n == null ? f : n(f);
              f = r || f !== 0 ? f : 0;
              if (a && l == l) {
                for (var d = c; d--; ) {
                  if (t[d] === l) {
                    continue e;
                  }
                }
                s.push(f);
              } else if (!o(t, l, r)) {
                s.push(f);
              }
            }
            return s;
          }
          f43.templateSettings = {
            escape: B,
            evaluate: W,
            interpolate: G,
            variable: "",
            imports: {
              _: f43,
            },
          };
          f43.prototype = f44.prototype;
          f43.prototype.constructor = f43;
          f45.prototype = vF3(f44.prototype);
          f45.prototype.constructor = f45;
          f46.prototype = vF3(f44.prototype);
          f46.prototype.constructor = f46;
          f47.prototype.clear = function () {
            this.__data__ = vEo6 ? vEo6(null) : {};
            this.size = 0;
          };
          f47.prototype.delete = function (e) {
            var t = this.has(e) && delete this.__data__[e];
            this.size -= t ? 1 : 0;
            return t;
          };
          f47.prototype.get = function (e) {
            var t = this.__data__;
            if (vEo6) {
              var n = t[e];
              if (n === "__lodash_hash_undefined__") {
                return undefined;
              } else {
                return n;
              }
            }
            if (v49.call(t, e)) {
              return t[e];
            } else {
              return undefined;
            }
          };
          f47.prototype.has = function (e) {
            var t = this.__data__;
            if (vEo6) {
              return t[e] !== undefined;
            } else {
              return v49.call(t, e);
            }
          };
          f47.prototype.set = function (e, t) {
            var n = this.__data__;
            this.size += this.has(e) ? 0 : 1;
            n[e] = vEo6 && t === undefined ? "__lodash_hash_undefined__" : t;
            return this;
          };
          f48.prototype.clear = function () {
            this.__data__ = [];
            this.size = 0;
          };
          f48.prototype.delete = function (e) {
            var t = this.__data__;
            var n = f58(t, e);
            return (
              !(n < 0) &&
              (n == t.length - 1 ? t.pop() : v60.call(t, n, 1),
              --this.size,
              true)
            );
          };
          f48.prototype.get = function (e) {
            var t = this.__data__;
            var n = f58(t, e);
            if (n < 0) {
              return undefined;
            } else {
              return t[n][1];
            }
          };
          f48.prototype.has = function (e) {
            return f58(this.__data__, e) > -1;
          };
          f48.prototype.set = function (e, t) {
            var n = this.__data__;
            var r = f58(n, e);
            if (r < 0) {
              ++this.size;
              n.push([e, t]);
            } else {
              n[r][1] = t;
            }
            return this;
          };
          f49.prototype.clear = function () {
            this.size = 0;
            this.__data__ = {
              hash: new f47(),
              map: new (vEo2 || f48)(),
              string: new f47(),
            };
          };
          f49.prototype.delete = function (e) {
            var t = f163(this, e).delete(e);
            this.size -= t ? 1 : 0;
            return t;
          };
          f49.prototype.get = function (e) {
            return f163(this, e).get(e);
          };
          f49.prototype.has = function (e) {
            return f163(this, e).has(e);
          };
          f49.prototype.set = function (e, t) {
            var n = f163(this, e);
            var r = n.size;
            n.set(e, t);
            this.size += n.size == r ? 0 : 1;
            return this;
          };
          f50.prototype.add = f50.prototype.push = function (e) {
            this.__data__.set(e, "__lodash_hash_undefined__");
            return this;
          };
          f50.prototype.has = function (e) {
            return this.__data__.has(e);
          };
          f51.prototype.clear = function () {
            this.__data__ = new f48();
            this.size = 0;
          };
          f51.prototype.delete = function (e) {
            var t = this.__data__;
            var n = t.delete(e);
            this.size = t.size;
            return n;
          };
          f51.prototype.get = function (e) {
            return this.__data__.get(e);
          };
          f51.prototype.has = function (e) {
            return this.__data__.has(e);
          };
          f51.prototype.set = function (e, t) {
            var n = this.__data__;
            if (n instanceof f48) {
              var r = n.__data__;
              if (!vEo2 || r.length < 199) {
                r.push([e, t]);
                this.size = ++n.size;
                return this;
              }
              n = this.__data__ = new f49(r);
            }
            n.set(e, t);
            this.size = n.size;
            return this;
          };
          var vOi = f135(f72);
          var vOi2 = f135(f73, true);
          function f68(e, t) {
            var n = true;
            vOi(e, function (e, r, i) {
              return (n = !!t(e, r, i));
            });
            return n;
          }
          function f69(e, t, n) {
            for (var r = -1, i = e.length; ++r < i; ) {
              var o = e[r];
              var a = t(o);
              if (
                a != null &&
                (u === undefined ? a == a && !f217(a) : n(a, u))
              ) {
                var u = a;
                var s = o;
              }
            }
            return s;
          }
          function f70(e, t) {
            var n = [];
            vOi(e, function (e, r, i) {
              if (t(e, r, i)) {
                n.push(e);
              }
            });
            return n;
          }
          function f71(e, t, n, r, i) {
            var o = -1;
            var a = e.length;
            n ||= f168;
            i ||= [];
            while (++o < a) {
              var u = e[o];
              if (t > 0 && n(u)) {
                if (t > 1) {
                  f71(u, t - 1, n, r, i);
                } else {
                  f11(i, u);
                }
              } else if (!r) {
                i[i.length] = u;
              }
            }
            return i;
          }
          var vRi = f136();
          var vRi2 = f136(true);
          function f72(e, t) {
            return e && vRi(e, t, f227);
          }
          function f73(e, t) {
            return e && vRi2(e, t, f227);
          }
          function f74(e, t) {
            return f7(t, function (t) {
              return f209(e[t]);
            });
          }
          function f75(e, t) {
            for (var n = 0, r = (t = f123(t, e)).length; e != null && n < r; ) {
              e = e[f183(t[n++])];
            }
            if (n && n == r) {
              return e;
            } else {
              return undefined;
            }
          }
          function f76(e, t, n) {
            var r = t(e);
            if (v94(e)) {
              return r;
            } else {
              return f11(r, n(e));
            }
          }
          function f77(e) {
            if (e == null) {
              if (e === undefined) {
                return "[object Undefined]";
              } else {
                return "[object Null]";
              }
            } else if (v63 && v63 in v40(e)) {
              return (function (e) {
                var t = v49.call(e, v63);
                var n = e[v63];
                try {
                  e[v63] = undefined;
                  var r = true;
                } catch (e) {}
                var i = v51.call(e);
                if (r) {
                  if (t) {
                    e[v63] = n;
                  } else {
                    delete e[v63];
                  }
                }
                return i;
              })(e);
            } else {
              return (function (e) {
                return v51.call(e);
              })(e);
            }
          }
          function f78(e, t) {
            return e > t;
          }
          function f79(e, t) {
            return e != null && v49.call(e, t);
          }
          function f80(e, t) {
            return e != null && t in v40(e);
          }
          function f81(e, t, n) {
            var i = n ? f9 : f8;
            var o = e[0].length;
            var a = e.length;
            for (var u = a, s = r(a), c = Infinity, f = []; u--; ) {
              var l = e[u];
              if (u && t) {
                l = f10(l, f27(t));
              }
              c = v74(l.length, c);
              s[u] =
                !n && (t || (o >= 120 && l.length >= 120))
                  ? new f50(u && l)
                  : undefined;
            }
            l = e[0];
            var d = -1;
            var h = s[0];
            e: while (++d < o && f.length < c) {
              var v = l[d];
              var g = t ? t(v) : v;
              v = n || v !== 0 ? v : 0;
              if (!(h ? f29(h, g) : i(f, g, n))) {
                for (u = a; --u; ) {
                  var p = s[u];
                  if (!(p ? f29(p, g) : i(e[u], g, n))) {
                    continue e;
                  }
                }
                if (h) {
                  h.push(g);
                }
                f.push(v);
              }
            }
            return f;
          }
          function f82(e, t, n) {
            var r =
              (e = f177(e, (t = f123(t, e)))) == null ? e : e[f183(f190(t))];
            if (r == null) {
              return undefined;
            } else {
              return f2(r, e, n);
            }
          }
          function f83(e) {
            return f213(e) && f77(e) == s;
          }
          function f84(e, t, n, r, i) {
            return (
              e === t ||
              (e == null || t == null || (!f213(e) && !f213(t))
                ? e != e && t != t
                : (function (e, t, n, r, i, o) {
                    var a = v94(e);
                    var u = v94(t);
                    var h = a ? c : vF77(e);
                    var v = u ? c : vF77(t);
                    var O = (h = h == s ? y : h) == y;
                    var T = (v = v == s ? y : v) == y;
                    var j = h == v;
                    if (j && v96(e)) {
                      if (!v96(t)) {
                        return false;
                      }
                      a = true;
                      O = false;
                    }
                    if (j && !O) {
                      o ||= new f51();
                      if (a || v101(e)) {
                        return f156(e, t, n, r, i, o);
                      } else {
                        return (function (e, t, n, r, i, o, a) {
                          switch (n) {
                            case x:
                              if (
                                e.byteLength != t.byteLength ||
                                e.byteOffset != t.byteOffset
                              ) {
                                return false;
                              }
                              e = e.buffer;
                              t = t.buffer;
                            case R:
                              return (
                                e.byteLength == t.byteLength &&
                                !!o(new v56(e), new v56(t))
                              );
                            case f:
                            case l:
                            case p:
                              return f205(+e, +t);
                            case d:
                              return e.name == t.name && e.message == t.message;
                            case m:
                            case b:
                              return e == t + "";
                            case g:
                              var u = f35;
                            case _:
                              var s = r & 1;
                              u ||= f38;
                              if (e.size != t.size && !s) {
                                return false;
                              }
                              var c = a.get(e);
                              if (c) {
                                return c == t;
                              }
                              r |= 2;
                              a.set(e, t);
                              var h = f156(u(e), u(t), r, i, o, a);
                              a.delete(e);
                              return h;
                            case w:
                              if (v81) {
                                return v81.call(e) == v81.call(t);
                              }
                          }
                          return false;
                        })(e, t, h, n, r, i, o);
                      }
                    }
                    if (!(n & 1)) {
                      var S = O && v49.call(e, "__wrapped__");
                      var M = T && v49.call(t, "__wrapped__");
                      if (S || M) {
                        var E = S ? e.value() : e;
                        var L = M ? t.value() : t;
                        o ||= new f51();
                        return i(E, L, n, r, o);
                      }
                    }
                    if (!j) {
                      return false;
                    }
                    o ||= new f51();
                    return (function (e, t, n, r, i, o) {
                      var a = n & 1;
                      var u = f158(e);
                      var s = u.length;
                      var c = f158(t).length;
                      if (s != c && !a) {
                        return false;
                      }
                      var f = s;
                      while (f--) {
                        var l = u[f];
                        if (!(a ? l in t : v49.call(t, l))) {
                          return false;
                        }
                      }
                      var d = o.get(e);
                      var h = o.get(t);
                      if (d && h) {
                        return d == t && h == e;
                      }
                      var v = true;
                      o.set(e, t);
                      o.set(t, e);
                      var g = a;
                      while (++f < s) {
                        l = u[f];
                        var p = e[l];
                        var y = t[l];
                        if (r) {
                          var m = a ? r(y, p, l, t, e, o) : r(p, y, l, e, t, o);
                        }
                        if (
                          !(m === undefined ? p === y || i(p, y, n, r, o) : m)
                        ) {
                          v = false;
                          break;
                        }
                        g ||= l == "constructor";
                      }
                      if (v && !g) {
                        var _ = e.constructor;
                        var b = t.constructor;
                        if (
                          _ != b &&
                          !!("constructor" in e) &&
                          !!("constructor" in t) &&
                          (typeof _ != "function" ||
                            !(_ instanceof _) ||
                            typeof b != "function" ||
                            !(b instanceof b))
                        ) {
                          v = false;
                        }
                      }
                      o.delete(e);
                      o.delete(t);
                      return v;
                    })(e, t, n, r, i, o);
                  })(e, t, n, r, f84, i))
            );
          }
          function f85(e, t, n, r) {
            var i = n.length;
            var o = i;
            var a = !r;
            if (e == null) {
              return !o;
            }
            for (e = v40(e); i--; ) {
              var u = n[i];
              if (a && u[2] ? u[1] !== e[u[0]] : !(u[0] in e)) {
                return false;
              }
            }
            while (++i < o) {
              var s = (u = n[i])[0];
              var c = e[s];
              var f = u[1];
              if (a && u[2]) {
                if (c === undefined && !(s in e)) {
                  return false;
                }
              } else {
                var l = new f51();
                if (r) {
                  var d = r(c, f, s, e, t, l);
                }
                if (!(d === undefined ? f84(f, c, 3, r, l) : d)) {
                  return false;
                }
              }
            }
            return true;
          }
          function f86(e) {
            return (
              !!f212(e) &&
              !((t = e), v50 && v50 in t) &&
              (f209(e) ? vV41 : v8).test(f184(e))
            );
            var t;
          }
          function f87(e) {
            if (typeof e == "function") {
              return e;
            } else if (e == null) {
              return f235;
            } else if (typeof e == "object") {
              if (v94(e)) {
                return f93(e[0], e[1]);
              } else {
                return f92(e);
              }
            } else {
              return f239(e);
            }
          }
          function f88(e) {
            if (!f173(e)) {
              return vF362(e);
            }
            var t = [];
            for (var n in v40(e)) {
              if (v49.call(e, n) && n != "constructor") {
                t.push(n);
              }
            }
            return t;
          }
          function f89(e) {
            if (!f212(e)) {
              return (function (e) {
                var t = [];
                if (e != null) {
                  for (var n in v40(e)) {
                    t.push(n);
                  }
                }
                return t;
              })(e);
            }
            var t = f173(e);
            var n = [];
            for (var r in e) {
              if (r != "constructor" || (!t && v49.call(e, r))) {
                n.push(r);
              }
            }
            return n;
          }
          function f90(e, t) {
            return e < t;
          }
          function f91(e, t) {
            var n = -1;
            var i = f206(e) ? r(e.length) : [];
            vOi(e, function (e, r, o) {
              i[++n] = t(e, r, o);
            });
            return i;
          }
          function f92(e) {
            var t = f164(e);
            if (t.length == 1 && t[0][2]) {
              return f175(t[0][0], t[0][1]);
            } else {
              return function (n) {
                return n === e || f85(n, e, t);
              };
            }
          }
          function f93(e, t) {
            if (f171(e) && f174(t)) {
              return f175(f183(e), t);
            } else {
              return function (n) {
                var r = f225(n, e);
                if (r === undefined && r === t) {
                  return f226(n, e);
                } else {
                  return f84(t, r, 3);
                }
              };
            }
          }
          function f94(e, t, n, r, i) {
            if (e !== t) {
              vRi(
                t,
                function (o, a) {
                  i ||= new f51();
                  if (f212(o)) {
                    (function (e, t, n, r, i, o, a) {
                      var u = f179(e, n);
                      var s = f179(t, n);
                      var c = a.get(s);
                      if (c) {
                        f56(e, n, c);
                        return;
                      }
                      var f = o ? o(u, s, n + "", e, t, a) : undefined;
                      var l = f === undefined;
                      if (l) {
                        var d = v94(s);
                        var h = !d && v96(s);
                        var v = !d && !h && v101(s);
                        f = s;
                        if (d || h || v) {
                          if (v94(u)) {
                            f = u;
                          } else if (f207(u)) {
                            f = f131(u);
                          } else if (h) {
                            l = false;
                            f = f125(s, true);
                          } else if (v) {
                            l = false;
                            f = f127(s, true);
                          } else {
                            f = [];
                          }
                        } else if (f215(s) || v93(s)) {
                          f = u;
                          if (v93(u)) {
                            f = f223(u);
                          } else if (!f212(u) || !!f209(u)) {
                            f = f167(s);
                          }
                        } else {
                          l = false;
                        }
                      }
                      if (l) {
                        a.set(s, f);
                        i(f, s, r, o, a);
                        a.delete(s);
                      }
                      f56(e, n, f);
                    })(e, t, a, n, f94, r, i);
                  } else {
                    var u = r ? r(f179(e, a), o, a + "", e, t, i) : undefined;
                    if (u === undefined) {
                      u = o;
                    }
                    f56(e, a, u);
                  }
                },
                f228
              );
            }
          }
          function f95(e, t) {
            var n = e.length;
            if (n) {
              if (f169((t += t < 0 ? n : 0), n)) {
                return e[t];
              } else {
                return undefined;
              }
            }
          }
          function f96(e, t, n) {
            t = t.length
              ? f10(t, function (e) {
                  if (v94(e)) {
                    return function (t) {
                      return f75(t, e.length === 1 ? e[0] : e);
                    };
                  } else {
                    return e;
                  }
                })
              : [f235];
            var r = -1;
            t = f10(t, f27(f162()));
            return (function (e, t) {
              var n = e.length;
              for (e.sort(t); n--; ) {
                e[n] = e[n].value;
              }
              return e;
            })(
              f91(e, function (e, n, i) {
                return {
                  criteria: f10(t, function (t) {
                    return t(e);
                  }),
                  index: ++r,
                  value: e,
                };
              }),
              function (e, t) {
                return (function (e, t, n) {
                  var r = -1;
                  var i = e.criteria;
                  var o = t.criteria;
                  var a = i.length;
                  var u = n.length;
                  while (++r < a) {
                    var s = f128(i[r], o[r]);
                    if (s) {
                      if (r >= u) {
                        return s;
                      }
                      var c = n[r];
                      return s * (c == "desc" ? -1 : 1);
                    }
                  }
                  return e.index - t.index;
                })(e, t, n);
              }
            );
          }
          function f97(e, t, n) {
            for (var r = -1, i = t.length, o = {}; ++r < i; ) {
              var a = t[r];
              var u = f75(e, a);
              if (n(u, a)) {
                f105(o, f123(a, e), u);
              }
            }
            return o;
          }
          function f98(e, t, n, r) {
            var i = r ? f18 : f17;
            var o = -1;
            var a = t.length;
            var u = e;
            if (e === t) {
              t = f131(t);
            }
            if (n) {
              u = f10(e, f27(n));
            }
            while (++o < a) {
              for (
                var s = 0, c = t[o], f = n ? n(c) : c;
                (s = i(u, f, s, r)) > -1;

              ) {
                if (u !== e) {
                  v60.call(u, s, 1);
                }
                v60.call(e, s, 1);
              }
            }
            return e;
          }
          function f99(e, t) {
            for (var n = e ? t.length : 0, r = n - 1; n--; ) {
              var i = t[n];
              if (n == r || i !== o) {
                var o = i;
                if (f169(i)) {
                  v60.call(e, i, 1);
                } else {
                  f115(e, i);
                }
              }
            }
            return e;
          }
          function f100(e, t) {
            return e + v68(v77() * (t - e + 1));
          }
          function f101(e, t) {
            var n = "";
            if (!e || t < 1 || t > 9007199254740991) {
              return n;
            }
            do {
              if (t % 2) {
                n += e;
              }
              if ((t = v68(t / 2))) {
                e += e;
              }
            } while (t);
            return n;
          }
          function f102(e, t) {
            return vXo2(f176(e, t, f235), e + "");
          }
          function f103(e) {
            return f53(f230(e));
          }
          function f104(e, t) {
            var n = f230(e);
            return f182(n, f63(t, 0, n.length));
          }
          function f105(e, t, n, r) {
            if (!f212(e)) {
              return e;
            }
            for (
              var i = -1, o = (t = f123(t, e)).length, a = o - 1, u = e;
              u != null && ++i < o;

            ) {
              var s = f183(t[i]);
              var c = n;
              if (
                s === "__proto__" ||
                s === "constructor" ||
                s === "prototype"
              ) {
                return e;
              }
              if (i != a) {
                var f = u[s];
                if ((c = r ? r(f, s, u) : undefined) === undefined) {
                  c = f212(f) ? f : f169(t[i + 1]) ? [] : {};
                }
              }
              f57(u, s, c);
              u = u[s];
            }
            return e;
          }
          var v83 = v79
            ? function (e, t) {
                v79.set(e, t);
                return e;
              }
            : f235;
          var v84 = vF2
            ? function (e, t) {
                return vF2(e, "toString", {
                  configurable: true,
                  enumerable: false,
                  value: f234(t),
                  writable: true,
                });
              }
            : f235;
          function f106(e) {
            return f182(f230(e));
          }
          function f107(e, t, n) {
            var i = -1;
            var o = e.length;
            if (t < 0) {
              t = -t > o ? 0 : o + t;
            }
            if ((n = n > o ? o : n) < 0) {
              n += o;
            }
            o = t > n ? 0 : (n - t) >>> 0;
            t >>>= 0;
            var a = r(o);
            while (++i < o) {
              a[i] = e[i + t];
            }
            return a;
          }
          function f108(e, t) {
            var n;
            vOi(e, function (e, r, i) {
              return !(n = t(e, r, i));
            });
            return !!n;
          }
          function f109(e, t, n) {
            var r = 0;
            var i = e == null ? r : e.length;
            if (typeof t == "number" && t == t && i <= 2147483647) {
              while (r < i) {
                var o = (r + i) >>> 1;
                var a = e[o];
                if (a !== null && !f217(a) && (n ? a <= t : a < t)) {
                  r = o + 1;
                } else {
                  i = o;
                }
              }
              return i;
            }
            return f110(e, t, f235, n);
          }
          function f110(e, t, n, r) {
            var i = 0;
            var o = e == null ? 0 : e.length;
            if (o === 0) {
              return 0;
            }
            var a = (t = n(t)) != t;
            var u = t === null;
            var s = f217(t);
            var c = t === undefined;
            while (i < o) {
              var f = v68((i + o) / 2);
              var l = n(e[f]);
              var d = l !== undefined;
              var h = l === null;
              var v = l == l;
              var g = f217(l);
              if (a) {
                var p = r || v;
              } else {
                p = c
                  ? v && (r || d)
                  : u
                  ? v && d && (r || !h)
                  : s
                  ? v && d && !h && (r || !g)
                  : !h && !g && (r ? l <= t : l < t);
              }
              if (p) {
                i = f + 1;
              } else {
                o = f;
              }
            }
            return v74(o, 4294967294);
          }
          function f111(e, t) {
            for (var n = -1, r = e.length, i = 0, o = []; ++n < r; ) {
              var a = e[n];
              var u = t ? t(a) : a;
              if (!n || !f205(u, s)) {
                var s = u;
                o[i++] = a === 0 ? 0 : a;
              }
            }
            return o;
          }
          function f112(e) {
            if (typeof e == "number") {
              return e;
            } else if (f217(e)) {
              return NaN;
            } else {
              return +e;
            }
          }
          function f113(e) {
            if (typeof e == "string") {
              return e;
            }
            if (v94(e)) {
              return f10(e, f113) + "";
            }
            if (f217(e)) {
              if (v82) {
                return v82.call(e);
              } else {
                return "";
              }
            }
            var t = e + "";
            if (t == "0" && 1 / e == -Infinity) {
              return "-0";
            } else {
              return t;
            }
          }
          function f114(e, t, n) {
            var r = -1;
            var i = f8;
            var o = e.length;
            var a = true;
            var u = [];
            var s = u;
            if (n) {
              a = false;
              i = f9;
            } else if (o >= 200) {
              var c = t ? null : v86(e);
              if (c) {
                return f38(c);
              }
              a = false;
              i = f29;
              s = new f50();
            } else {
              s = t ? [] : u;
            }
            e: while (++r < o) {
              var f = e[r];
              var l = t ? t(f) : f;
              f = n || f !== 0 ? f : 0;
              if (a && l == l) {
                for (var d = s.length; d--; ) {
                  if (s[d] === l) {
                    continue e;
                  }
                }
                if (t) {
                  s.push(l);
                }
                u.push(f);
              } else if (!i(s, l, n)) {
                if (s !== u) {
                  s.push(l);
                }
                u.push(f);
              }
            }
            return u;
          }
          function f115(e, t) {
            return (
              (e = f177(e, (t = f123(t, e)))) == null || delete e[f183(f190(t))]
            );
          }
          function f116(e, t, n, r) {
            return f105(e, t, n(f75(e, t)), r);
          }
          function f117(e, t, n, r) {
            for (
              var i = e.length, o = r ? i : -1;
              (r ? o-- : ++o < i) && t(e[o], o, e);

            );
            if (n) {
              return f107(e, r ? 0 : o, r ? o + 1 : i);
            } else {
              return f107(e, r ? o + 1 : 0, r ? i : o);
            }
          }
          function f118(e, t) {
            var n = e;
            if (n instanceof f46) {
              n = n.value();
            }
            return f12(
              t,
              function (e, t) {
                return t.func.apply(t.thisArg, f11([e], t.args));
              },
              n
            );
          }
          function f119(e, t, n) {
            var i = e.length;
            if (i < 2) {
              if (i) {
                return f114(e[0]);
              } else {
                return [];
              }
            }
            for (var o = -1, a = r(i); ++o < i; ) {
              var u = e[o];
              for (var s = -1; ++s < i; ) {
                if (s != o) {
                  a[o] = f67(a[o] || u, e[s], t, n);
                }
              }
            }
            return f114(f71(a, 1), t, n);
          }
          function f120(e, t, n) {
            for (var r = -1, i = e.length, o = t.length, a = {}; ++r < i; ) {
              var u = r < o ? t[r] : undefined;
              n(a, e[r], u);
            }
            return a;
          }
          function f121(e) {
            if (f207(e)) {
              return e;
            } else {
              return [];
            }
          }
          function f122(e) {
            if (typeof e == "function") {
              return e;
            } else {
              return f235;
            }
          }
          function f123(e, t) {
            if (v94(e)) {
              return e;
            } else if (f171(e, t)) {
              return [e];
            } else {
              return vF4(f224(e));
            }
          }
          var vF102 = f102;
          function f124(e, t, n) {
            var r = e.length;
            n = n === undefined ? r : n;
            if (!t && n >= r) {
              return e;
            } else {
              return f107(e, t, n);
            }
          }
          var v85 =
            v64 ||
            function (e) {
              return v27.clearTimeout(e);
            };
          function f125(e, t) {
            if (t) {
              return e.slice();
            }
            var n = e.length;
            var r = v57 ? v57(n) : new e.constructor(n);
            e.copy(r);
            return r;
          }
          function f126(e) {
            var t = new e.constructor(e.byteLength);
            new v56(t).set(new v56(e));
            return t;
          }
          function f127(e, t) {
            var n = t ? f126(e.buffer) : e.buffer;
            return new e.constructor(n, e.byteOffset, e.length);
          }
          function f128(e, t) {
            if (e !== t) {
              var n = e !== undefined;
              var r = e === null;
              var i = e == e;
              var o = f217(e);
              var a = t !== undefined;
              var u = t === null;
              var s = t == t;
              var c = f217(t);
              if (
                (!u && !c && !o && e > t) ||
                (o && a && s && !u && !c) ||
                (r && a && s) ||
                (!n && s) ||
                !i
              ) {
                return 1;
              }
              if (
                (!r && !o && !c && e < t) ||
                (c && n && i && !r && !o) ||
                (u && n && i) ||
                (!a && i) ||
                !s
              ) {
                return -1;
              }
            }
            return 0;
          }
          function f129(e, t, n, i) {
            var o = -1;
            var a = e.length;
            var u = n.length;
            for (
              var s = -1, c = t.length, f = v73(a - u, 0), l = r(c + f), d = !i;
              ++s < c;

            ) {
              l[s] = t[s];
            }
            while (++o < u) {
              if (d || o < a) {
                l[n[o]] = e[o];
              }
            }
            while (f--) {
              l[s++] = e[o++];
            }
            return l;
          }
          function f130(e, t, n, i) {
            for (
              var o = -1,
                a = e.length,
                u = -1,
                s = n.length,
                c = -1,
                f = t.length,
                l = v73(a - s, 0),
                d = r(l + f),
                h = !i;
              ++o < l;

            ) {
              d[o] = e[o];
            }
            var v = o;
            while (++c < f) {
              d[v + c] = t[c];
            }
            while (++u < s) {
              if (h || o < a) {
                d[v + n[u]] = e[o++];
              }
            }
            return d;
          }
          function f131(e, t) {
            var n = -1;
            var i = e.length;
            for (t ||= r(i); ++n < i; ) {
              t[n] = e[n];
            }
            return t;
          }
          function f132(e, t, n, r) {
            var i = !n;
            n ||= {};
            for (var o = -1, a = t.length; ++o < a; ) {
              var u = t[o];
              var s = r ? r(n[u], e[u], u, n, e) : undefined;
              if (s === undefined) {
                s = e[u];
              }
              if (i) {
                f61(n, u, s);
              } else {
                f57(n, u, s);
              }
            }
            return n;
          }
          function f133(e, t) {
            return function (n, r) {
              var i = v94(n) ? f3 : f59;
              var o = t ? t() : {};
              return i(n, e, f162(r, 2), o);
            };
          }
          function f134(e) {
            return f102(function (t, n) {
              var r = -1;
              var i = n.length;
              var o = i > 1 ? n[i - 1] : undefined;
              var a = i > 2 ? n[2] : undefined;
              o = e.length > 3 && typeof o == "function" ? (i--, o) : undefined;
              if (a && f170(n[0], n[1], a)) {
                o = i < 3 ? undefined : o;
                i = 1;
              }
              t = v40(t);
              while (++r < i) {
                var u = n[r];
                if (u) {
                  e(t, u, r, o);
                }
              }
              return t;
            });
          }
          function f135(e, t) {
            return function (n, r) {
              if (n == null) {
                return n;
              }
              if (!f206(n)) {
                return e(n, r);
              }
              for (
                var i = n.length, o = t ? i : -1, a = v40(n);
                (t ? o-- : ++o < i) && r(a[o], o, a) !== false;

              );
              return n;
            };
          }
          function f136(e) {
            return function (t, n, r) {
              var i = -1;
              var o = v40(t);
              var a = r(t);
              for (var u = a.length; u--; ) {
                var s = a[e ? u : ++i];
                if (n(o[s], s, o) === false) {
                  break;
                }
              }
              return t;
            };
          }
          function f137(e) {
            return function (t) {
              var n = f34((t = f224(t))) ? f41(t) : undefined;
              var r = n ? n[0] : t.charAt(0);
              var i = n ? f124(n, 1).join("") : t.slice(1);
              return r[e]() + i;
            };
          }
          function f138(e) {
            return function (t) {
              return f12(f233(f232(t).replace(vRegExp, "")), e, "");
            };
          }
          function f139(e) {
            return function () {
              var t = arguments;
              switch (t.length) {
                case 0:
                  return new e();
                case 1:
                  return new e(t[0]);
                case 2:
                  return new e(t[0], t[1]);
                case 3:
                  return new e(t[0], t[1], t[2]);
                case 4:
                  return new e(t[0], t[1], t[2], t[3]);
                case 5:
                  return new e(t[0], t[1], t[2], t[3], t[4]);
                case 6:
                  return new e(t[0], t[1], t[2], t[3], t[4], t[5]);
                case 7:
                  return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
              }
              var n = vF3(e.prototype);
              var r = e.apply(n, t);
              if (f212(r)) {
                return r;
              } else {
                return n;
              }
            };
          }
          function f140(e) {
            return function (t, n, r) {
              var i = v40(t);
              if (!f206(t)) {
                var o = f162(n, 3);
                t = f227(t);
                n = function (e) {
                  return o(i[e], e, i);
                };
              }
              var a = e(t, n, r);
              if (a > -1) {
                return i[o ? t[a] : a];
              } else {
                return undefined;
              }
            };
          }
          function f141(e) {
            return f157(function (t) {
              var n = t.length;
              var r = n;
              var i = f45.prototype.thru;
              for (e && t.reverse(); r--; ) {
                var a = t[r];
                if (typeof a != "function") {
                  throw new v43(o);
                }
                if (i && !u && f160(a) == "wrapper") {
                  var u = new f45([], true);
                }
              }
              for (r = u ? r : n; ++r < n; ) {
                var s = f160((a = t[r]));
                var c = s == "wrapper" ? v87(a) : undefined;
                u =
                  c && f172(c[0]) && c[1] == 424 && !c[4].length && c[9] == 1
                    ? u[f160(c[0])].apply(u, c[3])
                    : a.length == 1 && f172(a)
                    ? u[s]()
                    : u.thru(a);
              }
              return function () {
                var e = arguments;
                var r = e[0];
                if (u && e.length == 1 && v94(r)) {
                  return u.plant(r).value();
                }
                for (var i = 0, o = n ? t[i].apply(this, e) : r; ++i < n; ) {
                  o = t[i].call(this, o);
                }
                return o;
              };
            });
          }
          function f142(e, t, n, i, o, a, u, s, c, f) {
            var l = t & 128;
            var d = t & 1;
            var h = t & 2;
            var v = t & 24;
            var g = t & 512;
            var p = h ? undefined : f139(e);
            return function y() {
              var m = arguments.length;
              var _ = r(m);
              for (var b = m; b--; ) {
                _[b] = arguments[b];
              }
              if (v) {
                var w = f161(y);
                var O = f32(_, w);
              }
              if (i) {
                _ = f129(_, i, o, v);
              }
              if (a) {
                _ = f130(_, a, u, v);
              }
              m -= O;
              if (v && m < f) {
                var R = f37(_, w);
                return f149(e, t, f142, y.placeholder, n, _, R, s, c, f - m);
              }
              var x = d ? n : this;
              var T = h ? x[e] : e;
              m = _.length;
              if (s) {
                _ = f178(_, s);
              } else if (g && m > 1) {
                _.reverse();
              }
              if (l && c < m) {
                _.length = c;
              }
              if (this && this !== v27 && this instanceof y) {
                T = p || f139(T);
              }
              return T.apply(x, _);
            };
          }
          function f143(e, t) {
            return function (n, r) {
              return (function (e, t, n, r) {
                f72(e, function (e, i, o) {
                  t(r, n(e), i, o);
                });
                return r;
              })(n, e, t(r), {});
            };
          }
          function f144(e, t) {
            return function (n, r) {
              var i;
              if (n === undefined && r === undefined) {
                return t;
              }
              if (n !== undefined) {
                i = n;
              }
              if (r !== undefined) {
                if (i === undefined) {
                  return r;
                }
                if (typeof n == "string" || typeof r == "string") {
                  n = f113(n);
                  r = f113(r);
                } else {
                  n = f112(n);
                  r = f112(r);
                }
                i = e(n, r);
              }
              return i;
            };
          }
          function f145(e) {
            return f157(function (t) {
              t = f10(t, f27(f162()));
              return f102(function (n) {
                var r = this;
                return e(t, function (e) {
                  return f2(e, r, n);
                });
              });
            });
          }
          function f146(e, t) {
            var n = (t = t === undefined ? " " : f113(t)).length;
            if (n < 2) {
              if (n) {
                return f101(t, e);
              } else {
                return t;
              }
            }
            var r = f101(t, v67(e / f40(t)));
            if (f34(t)) {
              return f124(f41(r), 0, e).join("");
            } else {
              return r.slice(0, e);
            }
          }
          function f147(e) {
            return function (t, n, i) {
              if (i && typeof i != "number" && f170(t, n, i)) {
                n = i = undefined;
              }
              t = f219(t);
              if (n === undefined) {
                n = t;
                t = 0;
              } else {
                n = f219(n);
              }
              return (function (e, t, n, i) {
                var o = -1;
                for (var a = v73(v67((t - e) / (n || 1)), 0), u = r(a); a--; ) {
                  u[i ? a : ++o] = e;
                  e += n;
                }
                return u;
              })(t, n, (i = i === undefined ? (t < n ? 1 : -1) : f219(i)), e);
            };
          }
          function f148(e) {
            return function (t, n) {
              if (typeof t != "string" || typeof n != "string") {
                t = f222(t);
                n = f222(n);
              }
              return e(t, n);
            };
          }
          function f149(e, t, n, r, i, o, a, u, s, c) {
            var f = t & 8;
            t |= f ? 32 : 64;
            if (!((t &= ~(f ? 64 : 32)) & 4)) {
              t &= -4;
            }
            var l = [
              e,
              t,
              i,
              f ? o : undefined,
              f ? a : undefined,
              f ? undefined : o,
              f ? undefined : a,
              u,
              s,
              c,
            ];
            var d = n.apply(undefined, l);
            if (f172(e)) {
              vXo(d, l);
            }
            d.placeholder = r;
            return f180(d, e, t);
          }
          function f150(e) {
            var t = v39[e];
            return function (e, n) {
              e = f222(e);
              if ((n = n == null ? 0 : v74(f220(n), 292)) && v71(e)) {
                var r = (f224(e) + "e").split("e");
                return +(
                  (r = (f224(t(r[0] + "e" + (+r[1] + n))) + "e").split(
                    "e"
                  ))[0] +
                  "e" +
                  (+r[1] - n)
                );
              }
              return t(e);
            };
          }
          var v86 =
            vEo4 && 1 / f38(new vEo4([, -0]))[1] == Infinity
              ? function (e) {
                  return new vEo4(e);
                }
              : f238;
          function f151(e) {
            return function (t) {
              var n = vF77(t);
              if (n == g) {
                return f35(t);
              } else if (n == _) {
                return f39(t);
              } else {
                return (function (e, t) {
                  return f10(t, function (t) {
                    return [t, e[t]];
                  });
                })(t, e(t));
              }
            };
          }
          function f152(e, t, n, i, u, s, c, f) {
            var l = t & 2;
            if (!l && typeof e != "function") {
              throw new v43(o);
            }
            var d = i ? i.length : 0;
            if (!d) {
              t &= -97;
              i = u = undefined;
            }
            c = c === undefined ? c : v73(f220(c), 0);
            f = f === undefined ? f : f220(f);
            d -= u ? u.length : 0;
            if (t & 64) {
              var h = i;
              var v = u;
              i = u = undefined;
            }
            var g = l ? undefined : v87(e);
            var p = [e, t, n, i, u, h, v, s, c, f];
            if (g) {
              (function (e, t) {
                var n = e[1];
                var r = t[1];
                var i = n | r;
                var o = i < 131;
                var u =
                  (r == 128 && n == 8) ||
                  (r == 128 && n == 256 && e[7].length <= t[8]) ||
                  (r == 384 && t[7].length <= t[8] && n == 8);
                if (!o && !u) {
                  return e;
                }
                if (r & 1) {
                  e[2] = t[2];
                  i |= n & 1 ? 0 : 4;
                }
                var s = t[3];
                if (s) {
                  var c = e[3];
                  e[3] = c ? f129(c, s, t[4]) : s;
                  e[4] = c ? f37(e[3], a) : t[4];
                }
                if ((s = t[5])) {
                  c = e[5];
                  e[5] = c ? f130(c, s, t[6]) : s;
                  e[6] = c ? f37(e[5], a) : t[6];
                }
                if ((s = t[7])) {
                  e[7] = s;
                }
                if (r & 128) {
                  e[8] = e[8] == null ? t[8] : v74(e[8], t[8]);
                }
                if (e[9] == null) {
                  e[9] = t[9];
                }
                e[0] = t[0];
                e[1] = i;
              })(p, g);
            }
            e = p[0];
            t = p[1];
            n = p[2];
            i = p[3];
            u = p[4];
            if (
              !(f = p[9] =
                p[9] === undefined ? (l ? 0 : e.length) : v73(p[9] - d, 0)) &&
              t & 24
            ) {
              t &= -25;
            }
            if (t && t != 1) {
              y =
                t == 8 || t == 16
                  ? (function (e, t, n) {
                      var i = f139(e);
                      return function o() {
                        var a = arguments.length;
                        var u = r(a);
                        for (var s = a, c = f161(o); s--; ) {
                          u[s] = arguments[s];
                        }
                        var f =
                          a < 3 && u[0] !== c && u[a - 1] !== c
                            ? []
                            : f37(u, c);
                        if ((a -= f.length) < n) {
                          return f149(
                            e,
                            t,
                            f142,
                            o.placeholder,
                            undefined,
                            u,
                            f,
                            undefined,
                            undefined,
                            n - a
                          );
                        }
                        var l =
                          this && this !== v27 && this instanceof o ? i : e;
                        return f2(l, this, u);
                      };
                    })(e, t, f)
                  : (t != 32 && t != 33) || u.length
                  ? f142.apply(undefined, p)
                  : (function (e, t, n, i) {
                      var o = t & 1;
                      var a = f139(e);
                      return function t() {
                        var u = -1;
                        var s = arguments.length;
                        for (
                          var c = -1,
                            f = i.length,
                            l = r(f + s),
                            d =
                              this && this !== v27 && this instanceof t ? a : e;
                          ++c < f;

                        ) {
                          l[c] = i[c];
                        }
                        while (s--) {
                          l[c++] = arguments[++u];
                        }
                        return f2(d, o ? n : this, l);
                      };
                    })(e, t, n, i);
            } else {
              var y = (function (e, t, n) {
                var r = t & 1;
                var i = f139(e);
                return function t() {
                  var o = this && this !== v27 && this instanceof t ? i : e;
                  return o.apply(r ? n : this, arguments);
                };
              })(e, t, n);
            }
            return f180((g ? v83 : vXo)(y, p), e, t);
          }
          function f153(e, t, n, r) {
            if (e === undefined || (f205(e, v46[n]) && !v49.call(r, n))) {
              return t;
            } else {
              return e;
            }
          }
          function f154(e, t, n, r, i, o) {
            if (f212(e) && f212(t)) {
              o.set(t, e);
              f94(e, t, undefined, f154, o);
              o.delete(t);
            }
            return e;
          }
          function f155(e) {
            if (f215(e)) {
              return undefined;
            } else {
              return e;
            }
          }
          function f156(e, t, n, r, i, o) {
            var a = n & 1;
            var u = e.length;
            var s = t.length;
            if (u != s && (!a || !(s > u))) {
              return false;
            }
            var c = o.get(e);
            var f = o.get(t);
            if (c && f) {
              return c == t && f == e;
            }
            var l = -1;
            var d = true;
            var h = n & 2 ? new f50() : undefined;
            o.set(e, t);
            o.set(t, e);
            while (++l < u) {
              var v = e[l];
              var g = t[l];
              if (r) {
                var p = a ? r(g, v, l, t, e, o) : r(v, g, l, e, t, o);
              }
              if (p !== undefined) {
                if (p) {
                  continue;
                }
                d = false;
                break;
              }
              if (h) {
                if (
                  !f14(t, function (e, t) {
                    if (!f29(h, t) && (v === e || i(v, e, n, r, o))) {
                      return h.push(t);
                    }
                  })
                ) {
                  d = false;
                  break;
                }
              } else if (v !== g && !i(v, g, n, r, o)) {
                d = false;
                break;
              }
            }
            o.delete(e);
            o.delete(t);
            return d;
          }
          function f157(e) {
            return vXo2(f176(e, undefined, f188), e + "");
          }
          function f158(e) {
            return f76(e, f227, v88);
          }
          function f159(e) {
            return f76(e, f228, v89);
          }
          var v87 = v79
            ? function (e) {
                return v79.get(e);
              }
            : f238;
          function f160(e) {
            var t = e.name + "";
            var n = vO4[t];
            for (var r = v49.call(vO4, t) ? n.length : 0; r--; ) {
              var i = n[r];
              var o = i.func;
              if (o == null || o == e) {
                return i.name;
              }
            }
            return t;
          }
          function f161(e) {
            return (v49.call(f43, "placeholder") ? f43 : e).placeholder;
          }
          function f162() {
            var e = f43.iteratee || f236;
            e = e === f236 ? f87 : e;
            if (arguments.length) {
              return e(arguments[0], arguments[1]);
            } else {
              return e;
            }
          }
          function f163(e, t) {
            var n;
            var r;
            var i = e.__data__;
            if (
              (r = typeof (n = t)) == "string" ||
              r == "number" ||
              r == "symbol" ||
              r == "boolean"
                ? n !== "__proto__"
                : n === null
            ) {
              return i[typeof t == "string" ? "string" : "hash"];
            } else {
              return i.map;
            }
          }
          function f164(e) {
            var t = f227(e);
            for (var n = t.length; n--; ) {
              var r = t[n];
              var i = e[r];
              t[n] = [r, i, f174(i)];
            }
            return t;
          }
          function f165(e, t) {
            var n = (function (e, t) {
              if (e == null) {
                return undefined;
              } else {
                return e[t];
              }
            })(e, t);
            if (f86(n)) {
              return n;
            } else {
              return undefined;
            }
          }
          var v88 = v69
            ? function (e) {
                if (e == null) {
                  return [];
                } else {
                  e = v40(e);
                  return f7(v69(e), function (t) {
                    return v59.call(e, t);
                  });
                }
              }
            : f240;
          var v89 = v69
            ? function (e) {
                var t = [];
                while (e) {
                  f11(t, v88(e));
                  e = vF36(e);
                }
                return t;
              }
            : f240;
          var vF77 = f77;
          function f166(e, t, n) {
            for (
              var r = -1, i = (t = f123(t, e)).length, o = false;
              ++r < i;

            ) {
              var a = f183(t[r]);
              if (!(o = e != null && n(e, a))) {
                break;
              }
              e = e[a];
            }
            if (o || ++r != i) {
              return o;
            } else {
              return (
                !!(i = e == null ? 0 : e.length) &&
                f211(i) &&
                f169(a, i) &&
                (v94(e) || v93(e))
              );
            }
          }
          function f167(e) {
            if (typeof e.constructor != "function" || f173(e)) {
              return {};
            } else {
              return vF3(vF36(e));
            }
          }
          function f168(e) {
            return v94(e) || v93(e) || (!!v61 && !!e && !!e[v61]);
          }
          function f169(e, t) {
            var n = typeof e;
            return (
              !!(t = t == null ? 9007199254740991 : t) &&
              (n == "number" || (n != "symbol" && v10.test(e))) &&
              e > -1 &&
              e % 1 == 0 &&
              e < t
            );
          }
          function f170(e, t, n) {
            if (!f212(n)) {
              return false;
            }
            var r = typeof t;
            return (
              !!(r == "number"
                ? f206(n) && f169(t, n.length)
                : r == "string" && t in n) && f205(n[t], e)
            );
          }
          function f171(e, t) {
            if (v94(e)) {
              return false;
            }
            var n = typeof e;
            return (
              n == "number" ||
              n == "symbol" ||
              n == "boolean" ||
              e == null ||
              !!f217(e) ||
              U.test(e) ||
              !X.test(e) ||
              (t != null && e in v40(t))
            );
          }
          function f172(e) {
            var t = f160(e);
            var n = f43[t];
            if (typeof n != "function" || !(t in f46.prototype)) {
              return false;
            }
            if (e === n) {
              return true;
            }
            var r = v87(n);
            return !!r && e === r[0];
          }
          if (
            (vEo && vF77(new vEo(new ArrayBuffer(1))) != x) ||
            (vEo2 && vF77(new vEo2()) != g) ||
            (vEo3 && vF77(vEo3.resolve()) != "[object Promise]") ||
            (vEo4 && vF77(new vEo4()) != _) ||
            (vEo5 && vF77(new vEo5()) != O)
          ) {
            vF77 = function (e) {
              var t = f77(e);
              var n = t == y ? e.constructor : undefined;
              var r = n ? f184(n) : "";
              if (r) {
                switch (r) {
                  case vMo:
                    return x;
                  case vMo2:
                    return g;
                  case vMo3:
                    return "[object Promise]";
                  case vMo4:
                    return _;
                  case vMo5:
                    return O;
                }
              }
              return t;
            };
          }
          var v90 = v47 ? f209 : f241;
          function f173(e) {
            var t = e && e.constructor;
            return e === ((typeof t == "function" && t.prototype) || v46);
          }
          function f174(e) {
            return e == e && !f212(e);
          }
          function f175(e, t) {
            return function (n) {
              return (
                n != null && n[e] === t && (t !== undefined || e in v40(n))
              );
            };
          }
          function f176(e, t, n) {
            t = v73(t === undefined ? e.length - 1 : t, 0);
            return function () {
              var i = arguments;
              for (var o = -1, a = v73(i.length - t, 0), u = r(a); ++o < a; ) {
                u[o] = i[t + o];
              }
              o = -1;
              var s = r(t + 1);
              while (++o < t) {
                s[o] = i[o];
              }
              s[t] = n(u);
              return f2(e, this, s);
            };
          }
          function f177(e, t) {
            if (t.length < 2) {
              return e;
            } else {
              return f75(e, f107(t, 0, -1));
            }
          }
          function f178(e, t) {
            var n = e.length;
            for (var r = v74(t.length, n), i = f131(e); r--; ) {
              var o = t[r];
              e[r] = f169(o, n) ? i[o] : undefined;
            }
            return e;
          }
          function f179(e, t) {
            if (
              (t !== "constructor" || typeof e[t] != "function") &&
              t != "__proto__"
            ) {
              return e[t];
            }
          }
          var vXo = f181(v83);
          var v91 =
            v66 ||
            function (e, t) {
              return v27.setTimeout(e, t);
            };
          var vXo2 = f181(v84);
          function f180(e, t, n) {
            var r = t + "";
            return vXo2(
              e,
              (function (e, t) {
                var n = t.length;
                if (!n) {
                  return e;
                }
                var r = n - 1;
                t[r] = (n > 1 ? "& " : "") + t[r];
                t = t.join(n > 2 ? ", " : " ");
                return e.replace(q, "{\n/* [wrapped with " + t + "] */\n");
              })(
                r,
                (function (e, t) {
                  f4(u, function (n) {
                    var r = "_." + n[0];
                    if (t & n[1] && !f8(e, r)) {
                      e.push(r);
                    }
                  });
                  return e.sort();
                })(
                  (function (e) {
                    var t = e.match(H);
                    if (t) {
                      return t[1].split(J);
                    } else {
                      return [];
                    }
                  })(r),
                  n
                )
              )
            );
          }
          function f181(e) {
            var t = 0;
            var n = 0;
            return function () {
              var r = v75();
              var i = 16 - (r - n);
              n = r;
              if (i > 0) {
                if (++t >= 800) {
                  return arguments[0];
                }
              } else {
                t = 0;
              }
              return e.apply(undefined, arguments);
            };
          }
          function f182(e, t) {
            var n = -1;
            var r = e.length;
            var i = r - 1;
            for (t = t === undefined ? r : t; ++n < t; ) {
              var o = f100(n, i);
              var a = e[o];
              e[o] = e[n];
              e[n] = a;
            }
            e.length = t;
            return e;
          }
          var vF4 = (function (e) {
            var t = f203(e, function (e) {
              if (n.size === 500) {
                n.clear();
              }
              return e;
            });
            var n = t.cache;
            return t;
          })(function (e) {
            var t = [];
            if (e.charCodeAt(0) === 46) {
              t.push("");
            }
            e.replace(F, function (e, n, r, i) {
              t.push(r ? i.replace(v3, "$1") : n || e);
            });
            return t;
          });
          function f183(e) {
            if (typeof e == "string" || f217(e)) {
              return e;
            }
            var t = e + "";
            if (t == "0" && 1 / e == -Infinity) {
              return "-0";
            } else {
              return t;
            }
          }
          function f184(e) {
            if (e != null) {
              try {
                return v48.call(e);
              } catch (e) {}
              try {
                return e + "";
              } catch (e) {}
            }
            return "";
          }
          function f185(e) {
            if (e instanceof f46) {
              return e.clone();
            }
            var t = new f45(e.__wrapped__, e.__chain__);
            t.__actions__ = f131(e.__actions__);
            t.__index__ = e.__index__;
            t.__values__ = e.__values__;
            return t;
          }
          var vF1022 = f102(function (e, t) {
            if (f207(e)) {
              return f67(e, f71(t, 1, f207, true));
            } else {
              return [];
            }
          });
          var vF1023 = f102(function (e, t) {
            var n = f190(t);
            if (f207(n)) {
              n = undefined;
            }
            if (f207(e)) {
              return f67(e, f71(t, 1, f207, true), f162(n, 2));
            } else {
              return [];
            }
          });
          var vF1024 = f102(function (e, t) {
            var n = f190(t);
            if (f207(n)) {
              n = undefined;
            }
            if (f207(e)) {
              return f67(e, f71(t, 1, f207, true), undefined, n);
            } else {
              return [];
            }
          });
          function f186(e, t, n) {
            var r = e == null ? 0 : e.length;
            if (!r) {
              return -1;
            }
            var i = n == null ? 0 : f220(n);
            if (i < 0) {
              i = v73(r + i, 0);
            }
            return f16(e, f162(t, 3), i);
          }
          function f187(e, t, n) {
            var r = e == null ? 0 : e.length;
            if (!r) {
              return -1;
            }
            var i = r - 1;
            if (n !== undefined) {
              i = f220(n);
              i = n < 0 ? v73(r + i, 0) : v74(i, r - 1);
            }
            return f16(e, f162(t, 3), i, true);
          }
          function f188(e) {
            if (e == null ? 0 : e.length) {
              return f71(e, 1);
            } else {
              return [];
            }
          }
          function f189(e) {
            if (e && e.length) {
              return e[0];
            } else {
              return undefined;
            }
          }
          var vF1025 = f102(function (e) {
            var t = f10(e, f121);
            if (t.length && t[0] === e[0]) {
              return f81(t);
            } else {
              return [];
            }
          });
          var vF1026 = f102(function (e) {
            var t = f190(e);
            var n = f10(e, f121);
            if (t === f190(n)) {
              t = undefined;
            } else {
              n.pop();
            }
            if (n.length && n[0] === e[0]) {
              return f81(n, f162(t, 2));
            } else {
              return [];
            }
          });
          var vF1027 = f102(function (e) {
            var t = f190(e);
            var n = f10(e, f121);
            if ((t = typeof t == "function" ? t : undefined)) {
              n.pop();
            }
            if (n.length && n[0] === e[0]) {
              return f81(n, undefined, t);
            } else {
              return [];
            }
          });
          function f190(e) {
            var t = e == null ? 0 : e.length;
            if (t) {
              return e[t - 1];
            } else {
              return undefined;
            }
          }
          var vF1028 = f102(f191);
          function f191(e, t) {
            if (e && e.length && t && t.length) {
              return f98(e, t);
            } else {
              return e;
            }
          }
          var vF157 = f157(function (e, t) {
            var n = e == null ? 0 : e.length;
            var r = f62(e, t);
            f99(
              e,
              f10(t, function (e) {
                if (f169(e, n)) {
                  return +e;
                } else {
                  return e;
                }
              }).sort(f128)
            );
            return r;
          });
          function f192(e) {
            if (e == null) {
              return e;
            } else {
              return v78.call(e);
            }
          }
          var vF1029 = f102(function (e) {
            return f114(f71(e, 1, f207, true));
          });
          var vF10210 = f102(function (e) {
            var t = f190(e);
            if (f207(t)) {
              t = undefined;
            }
            return f114(f71(e, 1, f207, true), f162(t, 2));
          });
          var vF10211 = f102(function (e) {
            var t = f190(e);
            t = typeof t == "function" ? t : undefined;
            return f114(f71(e, 1, f207, true), undefined, t);
          });
          function f193(e) {
            if (!e || !e.length) {
              return [];
            }
            var t = 0;
            e = f7(e, function (e) {
              if (f207(e)) {
                t = v73(e.length, t);
                return true;
              }
            });
            return f25(t, function (t) {
              return f10(e, f21(t));
            });
          }
          function f194(e, t) {
            if (!e || !e.length) {
              return [];
            }
            var n = f193(e);
            if (t == null) {
              return n;
            } else {
              return f10(n, function (e) {
                return f2(t, undefined, e);
              });
            }
          }
          var vF10212 = f102(function (e, t) {
            if (f207(e)) {
              return f67(e, t);
            } else {
              return [];
            }
          });
          var vF10213 = f102(function (e) {
            return f119(f7(e, f207));
          });
          var vF10214 = f102(function (e) {
            var t = f190(e);
            if (f207(t)) {
              t = undefined;
            }
            return f119(f7(e, f207), f162(t, 2));
          });
          var vF10215 = f102(function (e) {
            var t = f190(e);
            t = typeof t == "function" ? t : undefined;
            return f119(f7(e, f207), undefined, t);
          });
          var vF10216 = f102(f193);
          var vF10217 = f102(function (e) {
            var t = e.length;
            var n = t > 1 ? e[t - 1] : undefined;
            n = typeof n == "function" ? (e.pop(), n) : undefined;
            return f194(e, n);
          });
          function f195(e) {
            var t = f43(e);
            t.__chain__ = true;
            return t;
          }
          function f196(e, t) {
            return t(e);
          }
          var vF1572 = f157(function (e) {
            var t = e.length;
            var n = t ? e[0] : 0;
            var r = this.__wrapped__;
            function i(t) {
              return f62(t, e);
            }
            if (
              !(t > 1) &&
              !this.__actions__.length &&
              r instanceof f46 &&
              f169(n)
            ) {
              (r = r.slice(n, +n + (t ? 1 : 0))).__actions__.push({
                func: f196,
                args: [i],
                thisArg: undefined,
              });
              return new f45(r, this.__chain__).thru(function (e) {
                if (t && !e.length) {
                  e.push(undefined);
                }
                return e;
              });
            } else {
              return this.thru(i);
            }
          });
          var vF133 = f133(function (e, t, n) {
            if (v49.call(e, n)) {
              ++e[n];
            } else {
              f61(e, n, 1);
            }
          });
          var vF140 = f140(f186);
          var vF1402 = f140(f187);
          function f197(e, t) {
            return (v94(e) ? f4 : vOi)(e, f162(t, 3));
          }
          function f198(e, t) {
            return (v94(e) ? f5 : vOi2)(e, f162(t, 3));
          }
          var vF1332 = f133(function (e, t, n) {
            if (v49.call(e, n)) {
              e[n].push(t);
            } else {
              f61(e, n, [t]);
            }
          });
          var vF10218 = f102(function (e, t, n) {
            var i = -1;
            var o = typeof t == "function";
            var a = f206(e) ? r(e.length) : [];
            vOi(e, function (e) {
              a[++i] = o ? f2(t, e, n) : f82(e, t, n);
            });
            return a;
          });
          var vF1333 = f133(function (e, t, n) {
            f61(e, n, t);
          });
          function f199(e, t) {
            return (v94(e) ? f10 : f91)(e, f162(t, 3));
          }
          var vF1334 = f133(
            function (e, t, n) {
              e[n ? 0 : 1].push(t);
            },
            function () {
              return [[], []];
            }
          );
          var vF10219 = f102(function (e, t) {
            if (e == null) {
              return [];
            }
            var n = t.length;
            if (n > 1 && f170(e, t[0], t[1])) {
              t = [];
            } else if (n > 2 && f170(t[0], t[1], t[2])) {
              t = [t[0]];
            }
            return f96(e, f71(t, 1), []);
          });
          var v92 =
            v65 ||
            function () {
              return v27.Date.now();
            };
          function f200(e, t, n) {
            t = n ? undefined : t;
            return f152(
              e,
              128,
              undefined,
              undefined,
              undefined,
              undefined,
              (t = e && t == null ? e.length : t)
            );
          }
          function f201(e, t) {
            var n;
            if (typeof t != "function") {
              throw new v43(o);
            }
            e = f220(e);
            return function () {
              if (--e > 0) {
                n = t.apply(this, arguments);
              }
              if (e <= 1) {
                t = undefined;
              }
              return n;
            };
          }
          var vF10220 = f102(function (e, t, n) {
            var r = 1;
            if (n.length) {
              var i = f37(n, f161(vF10220));
              r |= 32;
            }
            return f152(e, r, t, n, i);
          });
          var vF10221 = f102(function (e, t, n) {
            var r = 3;
            if (n.length) {
              var i = f37(n, f161(vF10221));
              r |= 32;
            }
            return f152(t, r, e, n, i);
          });
          function f202(e, t, n) {
            var r;
            var i;
            var a;
            var u;
            var s;
            var c;
            var f = 0;
            var l = false;
            var d = false;
            var h = true;
            if (typeof e != "function") {
              throw new v43(o);
            }
            function v(t) {
              var n = r;
              var o = i;
              r = i = undefined;
              f = t;
              return (u = e.apply(o, n));
            }
            function g(e) {
              f = e;
              s = v91(y, t);
              if (l) {
                return v(e);
              } else {
                return u;
              }
            }
            function p(e) {
              var n = e - c;
              return c === undefined || n >= t || n < 0 || (d && e - f >= a);
            }
            function y() {
              var e = v92();
              if (p(e)) {
                return m(e);
              }
              s = v91(
                y,
                (function (e) {
                  var n = t - (e - c);
                  if (d) {
                    return v74(n, a - (e - f));
                  } else {
                    return n;
                  }
                })(e)
              );
            }
            function m(e) {
              s = undefined;
              if (h && r) {
                return v(e);
              } else {
                r = i = undefined;
                return u;
              }
            }
            function _() {
              var e = v92();
              var n = p(e);
              r = arguments;
              i = this;
              c = e;
              if (n) {
                if (s === undefined) {
                  return g(c);
                }
                if (d) {
                  v85(s);
                  s = v91(y, t);
                  return v(c);
                }
              }
              if (s === undefined) {
                s = v91(y, t);
              }
              return u;
            }
            t = f222(t) || 0;
            if (f212(n)) {
              l = !!n.leading;
              a = (d = "maxWait" in n) ? v73(f222(n.maxWait) || 0, t) : a;
              h = "trailing" in n ? !!n.trailing : h;
            }
            _.cancel = function () {
              if (s !== undefined) {
                v85(s);
              }
              f = 0;
              r = c = i = s = undefined;
            };
            _.flush = function () {
              if (s === undefined) {
                return u;
              } else {
                return m(v92());
              }
            };
            return _;
          }
          var vF10222 = f102(function (e, t) {
            return f66(e, 1, t);
          });
          var vF10223 = f102(function (e, t, n) {
            return f66(e, f222(t) || 0, n);
          });
          function f203(e, t) {
            if (
              typeof e != "function" ||
              (t != null && typeof t != "function")
            ) {
              throw new v43(o);
            }
            function n() {
              var r = arguments;
              var i = t ? t.apply(this, r) : r[0];
              var o = n.cache;
              if (o.has(i)) {
                return o.get(i);
              }
              var a = e.apply(this, r);
              n.cache = o.set(i, a) || o;
              return a;
            }
            n.cache = new (f203.Cache || f49)();
            return n;
          }
          function f204(e) {
            if (typeof e != "function") {
              throw new v43(o);
            }
            return function () {
              var t = arguments;
              switch (t.length) {
                case 0:
                  return !e.call(this);
                case 1:
                  return !e.call(this, t[0]);
                case 2:
                  return !e.call(this, t[0], t[1]);
                case 3:
                  return !e.call(this, t[0], t[1], t[2]);
              }
              return !e.apply(this, t);
            };
          }
          f203.Cache = f49;
          var vVF102 = vF102(function (e, t) {
            var n = (t =
              t.length == 1 && v94(t[0])
                ? f10(t[0], f27(f162()))
                : f10(f71(t, 1), f27(f162()))).length;
            return f102(function (r) {
              for (var i = -1, o = v74(r.length, n); ++i < o; ) {
                r[i] = t[i].call(this, r[i]);
              }
              return f2(e, this, r);
            });
          });
          var vF10224 = f102(function (e, t) {
            return f152(e, 32, undefined, t, f37(t, f161(vF10224)));
          });
          var vF10225 = f102(function (e, t) {
            return f152(e, 64, undefined, t, f37(t, f161(vF10225)));
          });
          var vF1573 = f157(function (e, t) {
            return f152(e, 256, undefined, undefined, undefined, t);
          });
          function f205(e, t) {
            return e === t || (e != e && t != t);
          }
          var vF148 = f148(f78);
          var vF1482 = f148(function (e, t) {
            return e >= t;
          });
          var v93 = f83(
            (function () {
              return arguments;
            })()
          )
            ? f83
            : function (e) {
                return (
                  f213(e) && v49.call(e, "callee") && !v59.call(e, "callee")
                );
              };
          var v94 = r.isArray;
          var v95 = v32
            ? f27(v32)
            : function (e) {
                return f213(e) && f77(e) == R;
              };
          function f206(e) {
            return e != null && f211(e.length) && !f209(e);
          }
          function f207(e) {
            return f213(e) && f206(e);
          }
          var v96 = v70 || f241;
          var v97 = v33
            ? f27(v33)
            : function (e) {
                return f213(e) && f77(e) == l;
              };
          function f208(e) {
            if (!f213(e)) {
              return false;
            }
            var t = f77(e);
            return (
              t == d ||
              t == "[object DOMException]" ||
              (typeof e.message == "string" &&
                typeof e.name == "string" &&
                !f215(e))
            );
          }
          function f209(e) {
            if (!f212(e)) {
              return false;
            }
            var t = f77(e);
            return (
              t == h ||
              t == v ||
              t == "[object AsyncFunction]" ||
              t == "[object Proxy]"
            );
          }
          function f210(e) {
            return typeof e == "number" && e == f220(e);
          }
          function f211(e) {
            return (
              typeof e == "number" &&
              e > -1 &&
              e % 1 == 0 &&
              e <= 9007199254740991
            );
          }
          function f212(e) {
            var t = typeof e;
            return e != null && (t == "object" || t == "function");
          }
          function f213(e) {
            return e != null && typeof e == "object";
          }
          var v98 = v34
            ? f27(v34)
            : function (e) {
                return f213(e) && vF77(e) == g;
              };
          function f214(e) {
            return typeof e == "number" || (f213(e) && f77(e) == p);
          }
          function f215(e) {
            if (!f213(e) || f77(e) != y) {
              return false;
            }
            var t = vF36(e);
            if (t === null) {
              return true;
            }
            var n = v49.call(t, "constructor") && t.constructor;
            return (
              typeof n == "function" && n instanceof n && v48.call(n) == v52
            );
          }
          var v99 = v35
            ? f27(v35)
            : function (e) {
                return f213(e) && f77(e) == m;
              };
          var v100 = v36
            ? f27(v36)
            : function (e) {
                return f213(e) && vF77(e) == _;
              };
          function f216(e) {
            return typeof e == "string" || (!v94(e) && f213(e) && f77(e) == b);
          }
          function f217(e) {
            return typeof e == "symbol" || (f213(e) && f77(e) == w);
          }
          var v101 = v37
            ? f27(v37)
            : function (e) {
                return f213(e) && f211(e.length) && !!vO[f77(e)];
              };
          var vF1483 = f148(f90);
          var vF1484 = f148(function (e, t) {
            return e <= t;
          });
          function f218(e) {
            if (!e) {
              return [];
            }
            if (f206(e)) {
              if (f216(e)) {
                return f41(e);
              } else {
                return f131(e);
              }
            }
            if (v62 && e[v62]) {
              return (function (e) {
                for (var t, n = []; !(t = e.next()).done; ) {
                  n.push(t.value);
                }
                return n;
              })(e[v62]());
            }
            var t = vF77(e);
            return (t == g ? f35 : t == _ ? f38 : f230)(e);
          }
          function f219(e) {
            if (e) {
              if ((e = f222(e)) === Infinity || e === -Infinity) {
                return (e < 0 ? -1 : 1) * 1.7976931348623157e308;
              } else if (e == e) {
                return e;
              } else {
                return 0;
              }
            } else if (e === 0) {
              return e;
            } else {
              return 0;
            }
          }
          function f220(e) {
            var t = f219(e);
            var n = t % 1;
            if (t == t) {
              if (n) {
                return t - n;
              } else {
                return t;
              }
            } else {
              return 0;
            }
          }
          function f221(e) {
            if (e) {
              return f63(f220(e), 0, 4294967295);
            } else {
              return 0;
            }
          }
          function f222(e) {
            if (typeof e == "number") {
              return e;
            }
            if (f217(e)) {
              return NaN;
            }
            if (f212(e)) {
              var t = typeof e.valueOf == "function" ? e.valueOf() : e;
              e = f212(t) ? t + "" : t;
            }
            if (typeof e != "string") {
              if (e === 0) {
                return e;
              } else {
                return +e;
              }
            }
            e = f26(e);
            var n = v7.test(e);
            if (n || v9.test(e)) {
              return vParseInt(e.slice(2), n ? 2 : 8);
            } else if (v6.test(e)) {
              return NaN;
            } else {
              return +e;
            }
          }
          function f223(e) {
            return f132(e, f228(e));
          }
          function f224(e) {
            if (e == null) {
              return "";
            } else {
              return f113(e);
            }
          }
          var vF134 = f134(function (e, t) {
            if (f173(t) || f206(t)) {
              f132(t, f227(t), e);
            } else {
              for (var n in t) {
                if (v49.call(t, n)) {
                  f57(e, n, t[n]);
                }
              }
            }
          });
          var vF1342 = f134(function (e, t) {
            f132(t, f228(t), e);
          });
          var vF1343 = f134(function (e, t, n, r) {
            f132(t, f228(t), e, r);
          });
          var vF1344 = f134(function (e, t, n, r) {
            f132(t, f227(t), e, r);
          });
          var vF1574 = f157(f62);
          var vF10226 = f102(function (e, t) {
            e = v40(e);
            var n = -1;
            var r = t.length;
            var i = r > 2 ? t[2] : undefined;
            for (i && f170(t[0], t[1], i) && (r = 1); ++n < r; ) {
              var o = t[n];
              var a = f228(o);
              for (var u = -1, s = a.length; ++u < s; ) {
                var c = a[u];
                var f = e[c];
                if (f === undefined || (f205(f, v46[c]) && !v49.call(e, c))) {
                  e[c] = o[c];
                }
              }
            }
            return e;
          });
          var vF10227 = f102(function (e) {
            e.push(undefined, f154);
            return f2(vF1346, undefined, e);
          });
          function f225(e, t, n) {
            var r = e == null ? undefined : f75(e, t);
            if (r === undefined) {
              return n;
            } else {
              return r;
            }
          }
          function f226(e, t) {
            return e != null && f166(e, t, f80);
          }
          var vF143 = f143(function (e, t, n) {
            if (t != null && typeof t.toString != "function") {
              t = v51.call(t);
            }
            e[t] = n;
          }, f234(f235));
          var vF1432 = f143(function (e, t, n) {
            if (t != null && typeof t.toString != "function") {
              t = v51.call(t);
            }
            if (v49.call(e, t)) {
              e[t].push(n);
            } else {
              e[t] = [n];
            }
          }, f162);
          var vF10228 = f102(f82);
          function f227(e) {
            if (f206(e)) {
              return f52(e);
            } else {
              return f88(e);
            }
          }
          function f228(e) {
            if (f206(e)) {
              return f52(e, true);
            } else {
              return f89(e);
            }
          }
          var vF1345 = f134(function (e, t, n) {
            f94(e, t, n);
          });
          var vF1346 = f134(function (e, t, n, r) {
            f94(e, t, n, r);
          });
          var vF1575 = f157(function (e, t) {
            var n = {};
            if (e == null) {
              return n;
            }
            var r = false;
            t = f10(t, function (t) {
              t = f123(t, e);
              r ||= t.length > 1;
              return t;
            });
            f132(e, f159(e), n);
            if (r) {
              n = f64(n, 7, f155);
            }
            for (var i = t.length; i--; ) {
              f115(n, t[i]);
            }
            return n;
          });
          var vF1576 = f157(function (e, t) {
            if (e == null) {
              return {};
            } else {
              return (function (e, t) {
                return f97(e, t, function (t, n) {
                  return f226(e, n);
                });
              })(e, t);
            }
          });
          function f229(e, t) {
            if (e == null) {
              return {};
            }
            var n = f10(f159(e), function (e) {
              return [e];
            });
            t = f162(t);
            return f97(e, n, function (e, n) {
              return t(e, n[0]);
            });
          }
          var vF151 = f151(f227);
          var vF1512 = f151(f228);
          function f230(e) {
            if (e == null) {
              return [];
            } else {
              return f28(e, f227(e));
            }
          }
          var vF138 = f138(function (e, t, n) {
            t = t.toLowerCase();
            return e + (n ? f231(t) : t);
          });
          function f231(e) {
            return vF1372(f224(e).toLowerCase());
          }
          function f232(e) {
            return (e = f224(e)) && e.replace(v11, vF22).replace(vRegExp2, "");
          }
          var vF1382 = f138(function (e, t, n) {
            return e + (n ? "-" : "") + t.toLowerCase();
          });
          var vF1383 = f138(function (e, t, n) {
            return e + (n ? " " : "") + t.toLowerCase();
          });
          var vF137 = f137("toLowerCase");
          var vF1384 = f138(function (e, t, n) {
            return e + (n ? "_" : "") + t.toLowerCase();
          });
          var vF1385 = f138(function (e, t, n) {
            return e + (n ? " " : "") + vF1372(t);
          });
          var vF1386 = f138(function (e, t, n) {
            return e + (n ? " " : "") + t.toUpperCase();
          });
          var vF1372 = f137("toUpperCase");
          function f233(e, t, n) {
            e = f224(e);
            if ((t = n ? undefined : t) === undefined) {
              if (
                (function (e) {
                  return v23.test(e);
                })(e)
              ) {
                return (function (e) {
                  return e.match(vRegExp4) || [];
                })(e);
              } else {
                return (function (e) {
                  return e.match(Q) || [];
                })(e);
              }
            } else {
              return e.match(t) || [];
            }
          }
          var vF10229 = f102(function (e, t) {
            try {
              return f2(e, undefined, t);
            } catch (e) {
              if (f208(e)) {
                return e;
              } else {
                return new V(e);
              }
            }
          });
          var vF1577 = f157(function (e, t) {
            f4(t, function (t) {
              t = f183(t);
              f61(e, t, vF10220(e[t], e));
            });
            return e;
          });
          function f234(e) {
            return function () {
              return e;
            };
          }
          var vF141 = f141();
          var vF1412 = f141(true);
          function f235(e) {
            return e;
          }
          function f236(e) {
            return f87(typeof e == "function" ? e : f64(e, 1));
          }
          var vF10230 = f102(function (e, t) {
            return function (n) {
              return f82(n, e, t);
            };
          });
          var vF10231 = f102(function (e, t) {
            return function (n) {
              return f82(e, n, t);
            };
          });
          function f237(e, t, n) {
            var r = f227(t);
            var i = f74(t, r);
            if (n == null && (!f212(t) || (!i.length && !!r.length))) {
              n = t;
              t = e;
              e = this;
              i = f74(t, f227(t));
            }
            var o = !f212(n) || !("chain" in n) || !!n.chain;
            var a = f209(e);
            f4(i, function (n) {
              var r = t[n];
              e[n] = r;
              if (a) {
                e.prototype[n] = function () {
                  var t = this.__chain__;
                  if (o || t) {
                    var n = e(this.__wrapped__);
                    var i = (n.__actions__ = f131(this.__actions__));
                    i.push({
                      func: r,
                      args: arguments,
                      thisArg: e,
                    });
                    n.__chain__ = t;
                    return n;
                  }
                  return r.apply(e, f11([this.value()], arguments));
                };
              }
            });
            return e;
          }
          function f238() {}
          var vF145 = f145(f10);
          var vF1452 = f145(f6);
          var vF1453 = f145(f14);
          function f239(e) {
            if (f171(e)) {
              return f21(f183(e));
            } else {
              return (function (e) {
                return function (t) {
                  return f75(t, e);
                };
              })(e);
            }
          }
          var vF147 = f147();
          var vF1472 = f147(true);
          function f240() {
            return [];
          }
          function f241() {
            return false;
          }
          var vF144 = f144(function (e, t) {
            return e + t;
          }, 0);
          var vF150 = f150("ceil");
          var vF1442 = f144(function (e, t) {
            return e / t;
          }, 1);
          var vF1502 = f150("floor");
          var v102;
          var vF1443 = f144(function (e, t) {
            return e * t;
          }, 1);
          var vF1503 = f150("round");
          var vF1444 = f144(function (e, t) {
            return e - t;
          }, 0);
          f43.after = function (e, t) {
            if (typeof t != "function") {
              throw new v43(o);
            }
            e = f220(e);
            return function () {
              if (--e < 1) {
                return t.apply(this, arguments);
              }
            };
          };
          f43.ary = f200;
          f43.assign = vF134;
          f43.assignIn = vF1342;
          f43.assignInWith = vF1343;
          f43.assignWith = vF1344;
          f43.at = vF1574;
          f43.before = f201;
          f43.bind = vF10220;
          f43.bindAll = vF1577;
          f43.bindKey = vF10221;
          f43.castArray = function () {
            if (!arguments.length) {
              return [];
            }
            var e = arguments[0];
            if (v94(e)) {
              return e;
            } else {
              return [e];
            }
          };
          f43.chain = f195;
          f43.chunk = function (e, t, n) {
            t = (n ? f170(e, t, n) : t === undefined) ? 1 : v73(f220(t), 0);
            var i = e == null ? 0 : e.length;
            if (!i || t < 1) {
              return [];
            }
            for (var o = 0, a = 0, u = r(v67(i / t)); o < i; ) {
              u[a++] = f107(e, o, (o += t));
            }
            return u;
          };
          f43.compact = function (e) {
            for (
              var t = -1, n = e == null ? 0 : e.length, r = 0, i = [];
              ++t < n;

            ) {
              var o = e[t];
              if (o) {
                i[r++] = o;
              }
            }
            return i;
          };
          f43.concat = function () {
            var e = arguments.length;
            if (!e) {
              return [];
            }
            var t = r(e - 1);
            var n = arguments[0];
            for (var i = e; i--; ) {
              t[i - 1] = arguments[i];
            }
            return f11(v94(n) ? f131(n) : [n], f71(t, 1));
          };
          f43.cond = function (e) {
            var t = e == null ? 0 : e.length;
            var n = f162();
            e = t
              ? f10(e, function (e) {
                  if (typeof e[1] != "function") {
                    throw new v43(o);
                  }
                  return [n(e[0]), e[1]];
                })
              : [];
            return f102(function (n) {
              for (var r = -1; ++r < t; ) {
                var i = e[r];
                if (f2(i[0], this, n)) {
                  return f2(i[1], this, n);
                }
              }
            });
          };
          f43.conforms = function (e) {
            return (function (e) {
              var t = f227(e);
              return function (n) {
                return f65(n, e, t);
              };
            })(f64(e, 1));
          };
          f43.constant = f234;
          f43.countBy = vF133;
          f43.create = function (e, t) {
            var n = vF3(e);
            if (t == null) {
              return n;
            } else {
              return f60(n, t);
            }
          };
          f43.curry = function e(t, n, r) {
            var i = f152(
              t,
              8,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              (n = r ? undefined : n)
            );
            i.placeholder = e.placeholder;
            return i;
          };
          f43.curryRight = function e(t, n, r) {
            var i = f152(
              t,
              16,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              (n = r ? undefined : n)
            );
            i.placeholder = e.placeholder;
            return i;
          };
          f43.debounce = f202;
          f43.defaults = vF10226;
          f43.defaultsDeep = vF10227;
          f43.defer = vF10222;
          f43.delay = vF10223;
          f43.difference = vF1022;
          f43.differenceBy = vF1023;
          f43.differenceWith = vF1024;
          f43.drop = function (e, t, n) {
            var r = e == null ? 0 : e.length;
            if (r) {
              return f107(
                e,
                (t = n || t === undefined ? 1 : f220(t)) < 0 ? 0 : t,
                r
              );
            } else {
              return [];
            }
          };
          f43.dropRight = function (e, t, n) {
            var r = e == null ? 0 : e.length;
            if (r) {
              return f107(
                e,
                0,
                (t = r - (t = n || t === undefined ? 1 : f220(t))) < 0 ? 0 : t
              );
            } else {
              return [];
            }
          };
          f43.dropRightWhile = function (e, t) {
            if (e && e.length) {
              return f117(e, f162(t, 3), true, true);
            } else {
              return [];
            }
          };
          f43.dropWhile = function (e, t) {
            if (e && e.length) {
              return f117(e, f162(t, 3), true);
            } else {
              return [];
            }
          };
          f43.fill = function (e, t, n, r) {
            var i = e == null ? 0 : e.length;
            if (i) {
              if (n && typeof n != "number" && f170(e, t, n)) {
                n = 0;
                r = i;
              }
              return (function (e, t, n, r) {
                var i = e.length;
                if ((n = f220(n)) < 0) {
                  n = -n > i ? 0 : i + n;
                }
                if ((r = r === undefined || r > i ? i : f220(r)) < 0) {
                  r += i;
                }
                r = n > r ? 0 : f221(r);
                while (n < r) {
                  e[n++] = t;
                }
                return e;
              })(e, t, n, r);
            } else {
              return [];
            }
          };
          f43.filter = function (e, t) {
            return (v94(e) ? f7 : f70)(e, f162(t, 3));
          };
          f43.flatMap = function (e, t) {
            return f71(f199(e, t), 1);
          };
          f43.flatMapDeep = function (e, t) {
            return f71(f199(e, t), Infinity);
          };
          f43.flatMapDepth = function (e, t, n) {
            n = n === undefined ? 1 : f220(n);
            return f71(f199(e, t), n);
          };
          f43.flatten = f188;
          f43.flattenDeep = function (e) {
            if (e == null ? 0 : e.length) {
              return f71(e, Infinity);
            } else {
              return [];
            }
          };
          f43.flattenDepth = function (e, t) {
            if (e == null ? 0 : e.length) {
              return f71(e, (t = t === undefined ? 1 : f220(t)));
            } else {
              return [];
            }
          };
          f43.flip = function (e) {
            return f152(e, 512);
          };
          f43.flow = vF141;
          f43.flowRight = vF1412;
          f43.fromPairs = function (e) {
            for (var t = -1, n = e == null ? 0 : e.length, r = {}; ++t < n; ) {
              var i = e[t];
              r[i[0]] = i[1];
            }
            return r;
          };
          f43.functions = function (e) {
            if (e == null) {
              return [];
            } else {
              return f74(e, f227(e));
            }
          };
          f43.functionsIn = function (e) {
            if (e == null) {
              return [];
            } else {
              return f74(e, f228(e));
            }
          };
          f43.groupBy = vF1332;
          f43.initial = function (e) {
            if (e == null ? 0 : e.length) {
              return f107(e, 0, -1);
            } else {
              return [];
            }
          };
          f43.intersection = vF1025;
          f43.intersectionBy = vF1026;
          f43.intersectionWith = vF1027;
          f43.invert = vF143;
          f43.invertBy = vF1432;
          f43.invokeMap = vF10218;
          f43.iteratee = f236;
          f43.keyBy = vF1333;
          f43.keys = f227;
          f43.keysIn = f228;
          f43.map = f199;
          f43.mapKeys = function (e, t) {
            var n = {};
            t = f162(t, 3);
            f72(e, function (e, r, i) {
              f61(n, t(e, r, i), e);
            });
            return n;
          };
          f43.mapValues = function (e, t) {
            var n = {};
            t = f162(t, 3);
            f72(e, function (e, r, i) {
              f61(n, r, t(e, r, i));
            });
            return n;
          };
          f43.matches = function (e) {
            return f92(f64(e, 1));
          };
          f43.matchesProperty = function (e, t) {
            return f93(e, f64(t, 1));
          };
          f43.memoize = f203;
          f43.merge = vF1345;
          f43.mergeWith = vF1346;
          f43.method = vF10230;
          f43.methodOf = vF10231;
          f43.mixin = f237;
          f43.negate = f204;
          f43.nthArg = function (e) {
            e = f220(e);
            return f102(function (t) {
              return f95(t, e);
            });
          };
          f43.omit = vF1575;
          f43.omitBy = function (e, t) {
            return f229(e, f204(f162(t)));
          };
          f43.once = function (e) {
            return f201(2, e);
          };
          f43.orderBy = function (e, t, n, r) {
            if (e == null) {
              return [];
            } else {
              if (!v94(t)) {
                t = t == null ? [] : [t];
              }
              if (!v94((n = r ? undefined : n))) {
                n = n == null ? [] : [n];
              }
              return f96(e, t, n);
            }
          };
          f43.over = vF145;
          f43.overArgs = vVF102;
          f43.overEvery = vF1452;
          f43.overSome = vF1453;
          f43.partial = vF10224;
          f43.partialRight = vF10225;
          f43.partition = vF1334;
          f43.pick = vF1576;
          f43.pickBy = f229;
          f43.property = f239;
          f43.propertyOf = function (e) {
            return function (t) {
              if (e == null) {
                return undefined;
              } else {
                return f75(e, t);
              }
            };
          };
          f43.pull = vF1028;
          f43.pullAll = f191;
          f43.pullAllBy = function (e, t, n) {
            if (e && e.length && t && t.length) {
              return f98(e, t, f162(n, 2));
            } else {
              return e;
            }
          };
          f43.pullAllWith = function (e, t, n) {
            if (e && e.length && t && t.length) {
              return f98(e, t, undefined, n);
            } else {
              return e;
            }
          };
          f43.pullAt = vF157;
          f43.range = vF147;
          f43.rangeRight = vF1472;
          f43.rearg = vF1573;
          f43.reject = function (e, t) {
            return (v94(e) ? f7 : f70)(e, f204(f162(t, 3)));
          };
          f43.remove = function (e, t) {
            var n = [];
            if (!e || !e.length) {
              return n;
            }
            var r = -1;
            var i = [];
            var o = e.length;
            for (t = f162(t, 3); ++r < o; ) {
              var a = e[r];
              if (t(a, r, e)) {
                n.push(a);
                i.push(r);
              }
            }
            f99(e, i);
            return n;
          };
          f43.rest = function (e, t) {
            if (typeof e != "function") {
              throw new v43(o);
            }
            return f102(e, (t = t === undefined ? t : f220(t)));
          };
          f43.reverse = f192;
          f43.sampleSize = function (e, t, n) {
            t = (n ? f170(e, t, n) : t === undefined) ? 1 : f220(t);
            return (v94(e) ? f54 : f104)(e, t);
          };
          f43.set = function (e, t, n) {
            if (e == null) {
              return e;
            } else {
              return f105(e, t, n);
            }
          };
          f43.setWith = function (e, t, n, r) {
            r = typeof r == "function" ? r : undefined;
            if (e == null) {
              return e;
            } else {
              return f105(e, t, n, r);
            }
          };
          f43.shuffle = function (e) {
            return (v94(e) ? f55 : f106)(e);
          };
          f43.slice = function (e, t, n) {
            var r = e == null ? 0 : e.length;
            if (r) {
              if (n && typeof n != "number" && f170(e, t, n)) {
                t = 0;
                n = r;
              } else {
                t = t == null ? 0 : f220(t);
                n = n === undefined ? r : f220(n);
              }
              return f107(e, t, n);
            } else {
              return [];
            }
          };
          f43.sortBy = vF10219;
          f43.sortedUniq = function (e) {
            if (e && e.length) {
              return f111(e);
            } else {
              return [];
            }
          };
          f43.sortedUniqBy = function (e, t) {
            if (e && e.length) {
              return f111(e, f162(t, 2));
            } else {
              return [];
            }
          };
          f43.split = function (e, t, n) {
            if (n && typeof n != "number" && f170(e, t, n)) {
              t = n = undefined;
            }
            if ((n = n === undefined ? 4294967295 : n >>> 0)) {
              if (
                (e = f224(e)) &&
                (typeof t == "string" || (t != null && !v99(t))) &&
                !(t = f113(t)) &&
                f34(e)
              ) {
                return f124(f41(e), 0, n);
              } else {
                return e.split(t, n);
              }
            } else {
              return [];
            }
          };
          f43.spread = function (e, t) {
            if (typeof e != "function") {
              throw new v43(o);
            }
            t = t == null ? 0 : v73(f220(t), 0);
            return f102(function (n) {
              var r = n[t];
              var i = f124(n, 0, t);
              if (r) {
                f11(i, r);
              }
              return f2(e, this, i);
            });
          };
          f43.tail = function (e) {
            var t = e == null ? 0 : e.length;
            if (t) {
              return f107(e, 1, t);
            } else {
              return [];
            }
          };
          f43.take = function (e, t, n) {
            if (e && e.length) {
              return f107(
                e,
                0,
                (t = n || t === undefined ? 1 : f220(t)) < 0 ? 0 : t
              );
            } else {
              return [];
            }
          };
          f43.takeRight = function (e, t, n) {
            var r = e == null ? 0 : e.length;
            if (r) {
              return f107(
                e,
                (t = r - (t = n || t === undefined ? 1 : f220(t))) < 0 ? 0 : t,
                r
              );
            } else {
              return [];
            }
          };
          f43.takeRightWhile = function (e, t) {
            if (e && e.length) {
              return f117(e, f162(t, 3), false, true);
            } else {
              return [];
            }
          };
          f43.takeWhile = function (e, t) {
            if (e && e.length) {
              return f117(e, f162(t, 3));
            } else {
              return [];
            }
          };
          f43.tap = function (e, t) {
            t(e);
            return e;
          };
          f43.throttle = function (e, t, n) {
            var r = true;
            var i = true;
            if (typeof e != "function") {
              throw new v43(o);
            }
            if (f212(n)) {
              r = "leading" in n ? !!n.leading : r;
              i = "trailing" in n ? !!n.trailing : i;
            }
            return f202(e, t, {
              leading: r,
              maxWait: t,
              trailing: i,
            });
          };
          f43.thru = f196;
          f43.toArray = f218;
          f43.toPairs = vF151;
          f43.toPairsIn = vF1512;
          f43.toPath = function (e) {
            if (v94(e)) {
              return f10(e, f183);
            } else if (f217(e)) {
              return [e];
            } else {
              return f131(vF4(f224(e)));
            }
          };
          f43.toPlainObject = f223;
          f43.transform = function (e, t, n) {
            var r = v94(e);
            var i = r || v96(e) || v101(e);
            t = f162(t, 4);
            if (n == null) {
              var o = e && e.constructor;
              n = i
                ? r
                  ? new o()
                  : []
                : f212(e) && f209(o)
                ? vF3(vF36(e))
                : {};
            }
            (i ? f4 : f72)(e, function (e, r, i) {
              return t(n, e, r, i);
            });
            return n;
          };
          f43.unary = function (e) {
            return f200(e, 1);
          };
          f43.union = vF1029;
          f43.unionBy = vF10210;
          f43.unionWith = vF10211;
          f43.uniq = function (e) {
            if (e && e.length) {
              return f114(e);
            } else {
              return [];
            }
          };
          f43.uniqBy = function (e, t) {
            if (e && e.length) {
              return f114(e, f162(t, 2));
            } else {
              return [];
            }
          };
          f43.uniqWith = function (e, t) {
            t = typeof t == "function" ? t : undefined;
            if (e && e.length) {
              return f114(e, undefined, t);
            } else {
              return [];
            }
          };
          f43.unset = function (e, t) {
            return e == null || f115(e, t);
          };
          f43.unzip = f193;
          f43.unzipWith = f194;
          f43.update = function (e, t, n) {
            if (e == null) {
              return e;
            } else {
              return f116(e, t, f122(n));
            }
          };
          f43.updateWith = function (e, t, n, r) {
            r = typeof r == "function" ? r : undefined;
            if (e == null) {
              return e;
            } else {
              return f116(e, t, f122(n), r);
            }
          };
          f43.values = f230;
          f43.valuesIn = function (e) {
            if (e == null) {
              return [];
            } else {
              return f28(e, f228(e));
            }
          };
          f43.without = vF10212;
          f43.words = f233;
          f43.wrap = function (e, t) {
            return vF10224(f122(t), e);
          };
          f43.xor = vF10213;
          f43.xorBy = vF10214;
          f43.xorWith = vF10215;
          f43.zip = vF10216;
          f43.zipObject = function (e, t) {
            return f120(e || [], t || [], f57);
          };
          f43.zipObjectDeep = function (e, t) {
            return f120(e || [], t || [], f105);
          };
          f43.zipWith = vF10217;
          f43.entries = vF151;
          f43.entriesIn = vF1512;
          f43.extend = vF1342;
          f43.extendWith = vF1343;
          f237(f43, f43);
          f43.add = vF144;
          f43.attempt = vF10229;
          f43.camelCase = vF138;
          f43.capitalize = f231;
          f43.ceil = vF150;
          f43.clamp = function (e, t, n) {
            if (n === undefined) {
              n = t;
              t = undefined;
            }
            if (n !== undefined) {
              n = (n = f222(n)) == n ? n : 0;
            }
            if (t !== undefined) {
              t = (t = f222(t)) == t ? t : 0;
            }
            return f63(f222(e), t, n);
          };
          f43.clone = function (e) {
            return f64(e, 4);
          };
          f43.cloneDeep = function (e) {
            return f64(e, 5);
          };
          f43.cloneDeepWith = function (e, t) {
            return f64(e, 5, (t = typeof t == "function" ? t : undefined));
          };
          f43.cloneWith = function (e, t) {
            return f64(e, 4, (t = typeof t == "function" ? t : undefined));
          };
          f43.conformsTo = function (e, t) {
            return t == null || f65(e, t, f227(t));
          };
          f43.deburr = f232;
          f43.defaultTo = function (e, t) {
            if (e == null || e != e) {
              return t;
            } else {
              return e;
            }
          };
          f43.divide = vF1442;
          f43.endsWith = function (e, t, n) {
            e = f224(e);
            t = f113(t);
            var r = e.length;
            var i = (n = n === undefined ? r : f63(f220(n), 0, r));
            return (n -= t.length) >= 0 && e.slice(n, i) == t;
          };
          f43.eq = f205;
          f43.escape = function (e) {
            if ((e = f224(e)) && N.test(e)) {
              return e.replace(D, vF222);
            } else {
              return e;
            }
          };
          f43.escapeRegExp = function (e) {
            if ((e = f224(e)) && K.test(e)) {
              return e.replace($, "\\$&");
            } else {
              return e;
            }
          };
          f43.every = function (e, t, n) {
            var r = v94(e) ? f6 : f68;
            if (n && f170(e, t, n)) {
              t = undefined;
            }
            return r(e, f162(t, 3));
          };
          f43.find = vF140;
          f43.findIndex = f186;
          f43.findKey = function (e, t) {
            return f15(e, f162(t, 3), f72);
          };
          f43.findLast = vF1402;
          f43.findLastIndex = f187;
          f43.findLastKey = function (e, t) {
            return f15(e, f162(t, 3), f73);
          };
          f43.floor = vF1502;
          f43.forEach = f197;
          f43.forEachRight = f198;
          f43.forIn = function (e, t) {
            if (e == null) {
              return e;
            } else {
              return vRi(e, f162(t, 3), f228);
            }
          };
          f43.forInRight = function (e, t) {
            if (e == null) {
              return e;
            } else {
              return vRi2(e, f162(t, 3), f228);
            }
          };
          f43.forOwn = function (e, t) {
            return e && f72(e, f162(t, 3));
          };
          f43.forOwnRight = function (e, t) {
            return e && f73(e, f162(t, 3));
          };
          f43.get = f225;
          f43.gt = vF148;
          f43.gte = vF1482;
          f43.has = function (e, t) {
            return e != null && f166(e, t, f79);
          };
          f43.hasIn = f226;
          f43.head = f189;
          f43.identity = f235;
          f43.includes = function (e, t, n, r) {
            e = f206(e) ? e : f230(e);
            n = n && !r ? f220(n) : 0;
            var i = e.length;
            if (n < 0) {
              n = v73(i + n, 0);
            }
            if (f216(e)) {
              return n <= i && e.indexOf(t, n) > -1;
            } else {
              return !!i && f17(e, t, n) > -1;
            }
          };
          f43.indexOf = function (e, t, n) {
            var r = e == null ? 0 : e.length;
            if (!r) {
              return -1;
            }
            var i = n == null ? 0 : f220(n);
            if (i < 0) {
              i = v73(r + i, 0);
            }
            return f17(e, t, i);
          };
          f43.inRange = function (e, t, n) {
            t = f219(t);
            if (n === undefined) {
              n = t;
              t = 0;
            } else {
              n = f219(n);
            }
            return (function (e, t, n) {
              return e >= v74(t, n) && e < v73(t, n);
            })((e = f222(e)), t, n);
          };
          f43.invoke = vF10228;
          f43.isArguments = v93;
          f43.isArray = v94;
          f43.isArrayBuffer = v95;
          f43.isArrayLike = f206;
          f43.isArrayLikeObject = f207;
          f43.isBoolean = function (e) {
            return e === true || e === false || (f213(e) && f77(e) == f);
          };
          f43.isBuffer = v96;
          f43.isDate = v97;
          f43.isElement = function (e) {
            return f213(e) && e.nodeType === 1 && !f215(e);
          };
          f43.isEmpty = function (e) {
            if (e == null) {
              return true;
            }
            if (
              f206(e) &&
              (v94(e) ||
                typeof e == "string" ||
                typeof e.splice == "function" ||
                v96(e) ||
                v101(e) ||
                v93(e))
            ) {
              return !e.length;
            }
            var t = vF77(e);
            if (t == g || t == _) {
              return !e.size;
            }
            if (f173(e)) {
              return !f88(e).length;
            }
            for (var n in e) {
              if (v49.call(e, n)) {
                return false;
              }
            }
            return true;
          };
          f43.isEqual = function (e, t) {
            return f84(e, t);
          };
          f43.isEqualWith = function (e, t, n) {
            var r = (n = typeof n == "function" ? n : undefined)
              ? n(e, t)
              : undefined;
            if (r === undefined) {
              return f84(e, t, undefined, n);
            } else {
              return !!r;
            }
          };
          f43.isError = f208;
          f43.isFinite = function (e) {
            return typeof e == "number" && v71(e);
          };
          f43.isFunction = f209;
          f43.isInteger = f210;
          f43.isLength = f211;
          f43.isMap = v98;
          f43.isMatch = function (e, t) {
            return e === t || f85(e, t, f164(t));
          };
          f43.isMatchWith = function (e, t, n) {
            n = typeof n == "function" ? n : undefined;
            return f85(e, t, f164(t), n);
          };
          f43.isNaN = function (e) {
            return f214(e) && e != +e;
          };
          f43.isNative = function (e) {
            if (v90(e)) {
              throw new V(
                "Unsupported core-js use. Try https://npms.io/search?q=ponyfill."
              );
            }
            return f86(e);
          };
          f43.isNil = function (e) {
            return e == null;
          };
          f43.isNull = function (e) {
            return e === null;
          };
          f43.isNumber = f214;
          f43.isObject = f212;
          f43.isObjectLike = f213;
          f43.isPlainObject = f215;
          f43.isRegExp = v99;
          f43.isSafeInteger = function (e) {
            return f210(e) && e >= -9007199254740991 && e <= 9007199254740991;
          };
          f43.isSet = v100;
          f43.isString = f216;
          f43.isSymbol = f217;
          f43.isTypedArray = v101;
          f43.isUndefined = function (e) {
            return e === undefined;
          };
          f43.isWeakMap = function (e) {
            return f213(e) && vF77(e) == O;
          };
          f43.isWeakSet = function (e) {
            return f213(e) && f77(e) == "[object WeakSet]";
          };
          f43.join = function (e, t) {
            if (e == null) {
              return "";
            } else {
              return v72.call(e, t);
            }
          };
          f43.kebabCase = vF1382;
          f43.last = f190;
          f43.lastIndexOf = function (e, t, n) {
            var r = e == null ? 0 : e.length;
            if (!r) {
              return -1;
            }
            var i = r;
            if (n !== undefined) {
              i = (i = f220(n)) < 0 ? v73(r + i, 0) : v74(i, r - 1);
            }
            if (t == t) {
              return (function (e, t, n) {
                for (var r = n + 1; r--; ) {
                  if (e[r] === t) {
                    return r;
                  }
                }
                return r;
              })(e, t, i);
            } else {
              return f16(e, f19, i, true);
            }
          };
          f43.lowerCase = vF1383;
          f43.lowerFirst = vF137;
          f43.lt = vF1483;
          f43.lte = vF1484;
          f43.max = function (e) {
            if (e && e.length) {
              return f69(e, f235, f78);
            } else {
              return undefined;
            }
          };
          f43.maxBy = function (e, t) {
            if (e && e.length) {
              return f69(e, f162(t, 2), f78);
            } else {
              return undefined;
            }
          };
          f43.mean = function (e) {
            return f20(e, f235);
          };
          f43.meanBy = function (e, t) {
            return f20(e, f162(t, 2));
          };
          f43.min = function (e) {
            if (e && e.length) {
              return f69(e, f235, f90);
            } else {
              return undefined;
            }
          };
          f43.minBy = function (e, t) {
            if (e && e.length) {
              return f69(e, f162(t, 2), f90);
            } else {
              return undefined;
            }
          };
          f43.stubArray = f240;
          f43.stubFalse = f241;
          f43.stubObject = function () {
            return {};
          };
          f43.stubString = function () {
            return "";
          };
          f43.stubTrue = function () {
            return true;
          };
          f43.multiply = vF1443;
          f43.nth = function (e, t) {
            if (e && e.length) {
              return f95(e, f220(t));
            } else {
              return undefined;
            }
          };
          f43.noConflict = function () {
            if (v27._ === this) {
              v27._ = v53;
            }
            return this;
          };
          f43.noop = f238;
          f43.now = v92;
          f43.pad = function (e, t, n) {
            e = f224(e);
            var r = (t = f220(t)) ? f40(e) : 0;
            if (!t || r >= t) {
              return e;
            }
            var i = (t - r) / 2;
            return f146(v68(i), n) + e + f146(v67(i), n);
          };
          f43.padEnd = function (e, t, n) {
            e = f224(e);
            var r = (t = f220(t)) ? f40(e) : 0;
            if (t && r < t) {
              return e + f146(t - r, n);
            } else {
              return e;
            }
          };
          f43.padStart = function (e, t, n) {
            e = f224(e);
            var r = (t = f220(t)) ? f40(e) : 0;
            if (t && r < t) {
              return f146(t - r, n) + e;
            } else {
              return e;
            }
          };
          f43.parseInt = function (e, t, n) {
            if (n || t == null) {
              t = 0;
            } else {
              t &&= +t;
            }
            return v76(f224(e).replace(Z, ""), t || 0);
          };
          f43.random = function (e, t, n) {
            if (n && typeof n != "boolean" && f170(e, t, n)) {
              t = n = undefined;
            }
            if (n === undefined) {
              if (typeof t == "boolean") {
                n = t;
                t = undefined;
              } else if (typeof e == "boolean") {
                n = e;
                e = undefined;
              }
            }
            if (e === undefined && t === undefined) {
              e = 0;
              t = 1;
            } else {
              e = f219(e);
              if (t === undefined) {
                t = e;
                e = 0;
              } else {
                t = f219(t);
              }
            }
            if (e > t) {
              var r = e;
              e = t;
              t = r;
            }
            if (n || e % 1 || t % 1) {
              var i = v77();
              return v74(
                e + i * (t - e + vParseFloat("1e-" + ((i + "").length - 1))),
                t
              );
            }
            return f100(e, t);
          };
          f43.reduce = function (e, t, n) {
            var r = v94(e) ? f12 : f23;
            var i = arguments.length < 3;
            return r(e, f162(t, 4), n, i, vOi);
          };
          f43.reduceRight = function (e, t, n) {
            var r = v94(e) ? f13 : f23;
            var i = arguments.length < 3;
            return r(e, f162(t, 4), n, i, vOi2);
          };
          f43.repeat = function (e, t, n) {
            t = (n ? f170(e, t, n) : t === undefined) ? 1 : f220(t);
            return f101(f224(e), t);
          };
          f43.replace = function () {
            var e = arguments;
            var t = f224(e[0]);
            if (e.length < 3) {
              return t;
            } else {
              return t.replace(e[1], e[2]);
            }
          };
          f43.result = function (e, t, n) {
            var r = -1;
            var i = (t = f123(t, e)).length;
            for (i || ((i = 1), (e = undefined)); ++r < i; ) {
              var o = e == null ? undefined : e[f183(t[r])];
              if (o === undefined) {
                r = i;
                o = n;
              }
              e = f209(o) ? o.call(e) : o;
            }
            return e;
          };
          f43.round = vF1503;
          f43.runInContext = e;
          f43.sample = function (e) {
            return (v94(e) ? f53 : f103)(e);
          };
          f43.size = function (e) {
            if (e == null) {
              return 0;
            }
            if (f206(e)) {
              if (f216(e)) {
                return f40(e);
              } else {
                return e.length;
              }
            }
            var t = vF77(e);
            if (t == g || t == _) {
              return e.size;
            } else {
              return f88(e).length;
            }
          };
          f43.snakeCase = vF1384;
          f43.some = function (e, t, n) {
            var r = v94(e) ? f14 : f108;
            if (n && f170(e, t, n)) {
              t = undefined;
            }
            return r(e, f162(t, 3));
          };
          f43.sortedIndex = function (e, t) {
            return f109(e, t);
          };
          f43.sortedIndexBy = function (e, t, n) {
            return f110(e, t, f162(n, 2));
          };
          f43.sortedIndexOf = function (e, t) {
            var n = e == null ? 0 : e.length;
            if (n) {
              var r = f109(e, t);
              if (r < n && f205(e[r], t)) {
                return r;
              }
            }
            return -1;
          };
          f43.sortedLastIndex = function (e, t) {
            return f109(e, t, true);
          };
          f43.sortedLastIndexBy = function (e, t, n) {
            return f110(e, t, f162(n, 2), true);
          };
          f43.sortedLastIndexOf = function (e, t) {
            if (e == null ? 0 : e.length) {
              var n = f109(e, t, true) - 1;
              if (f205(e[n], t)) {
                return n;
              }
            }
            return -1;
          };
          f43.startCase = vF1385;
          f43.startsWith = function (e, t, n) {
            e = f224(e);
            n = n == null ? 0 : f63(f220(n), 0, e.length);
            t = f113(t);
            return e.slice(n, n + t.length) == t;
          };
          f43.subtract = vF1444;
          f43.sum = function (e) {
            if (e && e.length) {
              return f24(e, f235);
            } else {
              return 0;
            }
          };
          f43.sumBy = function (e, t) {
            if (e && e.length) {
              return f24(e, f162(t, 2));
            } else {
              return 0;
            }
          };
          f43.template = function (e, t, n) {
            var r = f43.templateSettings;
            if (n && f170(e, t, n)) {
              t = undefined;
            }
            e = f224(e);
            t = vF1343({}, t, r, f153);
            var i;
            var o;
            var a = vF1343({}, t.imports, r.imports, f153);
            var u = f227(a);
            var s = f28(a, u);
            var c = 0;
            var f = t.interpolate || v12;
            var l = "__p += '";
            var d = v41(
              (t.escape || v12).source +
                "|" +
                f.source +
                "|" +
                (f === G ? v4 : v12).source +
                "|" +
                (t.evaluate || v12).source +
                "|$",
              "g"
            );
            var h =
              "//# sourceURL=" +
              (v49.call(t, "sourceURL")
                ? (t.sourceURL + "").replace(/\s/g, " ")
                : "lodash.templateSources[" + ++v24 + "]") +
              "\n";
            e.replace(d, function (t, n, r, a, u, s) {
              r ||= a;
              l += e.slice(c, s).replace(v13, f33);
              if (n) {
                i = true;
                l += "' +\n__e(" + n + ") +\n'";
              }
              if (u) {
                o = true;
                l += "';\n" + u + ";\n__p += '";
              }
              if (r) {
                l += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'";
              }
              c = s + t.length;
              return t;
            });
            l += "';\n";
            var v = v49.call(t, "variable") && t.variable;
            if (v) {
              if (v2.test(v)) {
                throw new V(
                  "Invalid `variable` option passed into `_.template`"
                );
              }
            } else {
              l = "with (obj) {\n" + l + "\n}\n";
            }
            l = (o ? l.replace(A, "") : l).replace(I, "$1").replace(z, "$1;");
            l =
              "function(" +
              (v || "obj") +
              ") {\n" +
              (v ? "" : "obj || (obj = {});\n") +
              "var __t, __p = ''" +
              (i ? ", __e = _.escape" : "") +
              (o
                ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n"
                : ";\n") +
              l +
              "return __p\n}";
            var g = vF10229(function () {
              return v38(u, h + "return " + l).apply(undefined, s);
            });
            g.source = l;
            if (f208(g)) {
              throw g;
            }
            return g;
          };
          f43.times = function (e, t) {
            if ((e = f220(e)) < 1 || e > 9007199254740991) {
              return [];
            }
            var n = 4294967295;
            var r = v74(e, 4294967295);
            e -= 4294967295;
            var i = f25(r, (t = f162(t)));
            while (++n < e) {
              t(n);
            }
            return i;
          };
          f43.toFinite = f219;
          f43.toInteger = f220;
          f43.toLength = f221;
          f43.toLower = function (e) {
            return f224(e).toLowerCase();
          };
          f43.toNumber = f222;
          f43.toSafeInteger = function (e) {
            if (e) {
              return f63(f220(e), -9007199254740991, 9007199254740991);
            } else if (e === 0) {
              return e;
            } else {
              return 0;
            }
          };
          f43.toString = f224;
          f43.toUpper = function (e) {
            return f224(e).toUpperCase();
          };
          f43.trim = function (e, t, n) {
            if ((e = f224(e)) && (n || t === undefined)) {
              return f26(e);
            }
            if (!e || !(t = f113(t))) {
              return e;
            }
            var r = f41(e);
            var i = f41(t);
            return f124(r, f30(r, i), f31(r, i) + 1).join("");
          };
          f43.trimEnd = function (e, t, n) {
            if ((e = f224(e)) && (n || t === undefined)) {
              return e.slice(0, f42(e) + 1);
            }
            if (!e || !(t = f113(t))) {
              return e;
            }
            var r = f41(e);
            return f124(r, 0, f31(r, f41(t)) + 1).join("");
          };
          f43.trimStart = function (e, t, n) {
            if ((e = f224(e)) && (n || t === undefined)) {
              return e.replace(Z, "");
            }
            if (!e || !(t = f113(t))) {
              return e;
            }
            var r = f41(e);
            return f124(r, f30(r, f41(t))).join("");
          };
          f43.truncate = function (e, t) {
            var n = 30;
            var r = "...";
            if (f212(t)) {
              var i = "separator" in t ? t.separator : i;
              n = "length" in t ? f220(t.length) : n;
              r = "omission" in t ? f113(t.omission) : r;
            }
            var o = (e = f224(e)).length;
            if (f34(e)) {
              var a = f41(e);
              o = a.length;
            }
            if (n >= o) {
              return e;
            }
            var u = n - f40(r);
            if (u < 1) {
              return r;
            }
            var s = a ? f124(a, 0, u).join("") : e.slice(0, u);
            if (i === undefined) {
              return s + r;
            }
            if (a) {
              u += s.length - u;
            }
            if (v99(i)) {
              if (e.slice(u).search(i)) {
                var c;
                var f = s;
                if (!i.global) {
                  i = v41(i.source, f224(v5.exec(i)) + "g");
                }
                i.lastIndex = 0;
                while ((c = i.exec(f))) {
                  var l = c.index;
                }
                s = s.slice(0, l === undefined ? u : l);
              }
            } else if (e.indexOf(f113(i), u) != u) {
              var d = s.lastIndexOf(i);
              if (d > -1) {
                s = s.slice(0, d);
              }
            }
            return s + r;
          };
          f43.unescape = function (e) {
            if ((e = f224(e)) && Y.test(e)) {
              return e.replace(P, vF223);
            } else {
              return e;
            }
          };
          f43.uniqueId = function (e) {
            var t = ++vLN0;
            return f224(e) + t;
          };
          f43.upperCase = vF1386;
          f43.upperFirst = vF1372;
          f43.each = f197;
          f43.eachRight = f198;
          f43.first = f189;
          f237(
            f43,
            ((v102 = {}),
            f72(f43, function (e, t) {
              if (!v49.call(f43.prototype, t)) {
                v102[t] = e;
              }
            }),
            v102),
            {
              chain: false,
            }
          );
          f43.VERSION = "4.17.21";
          f4(
            [
              "bind",
              "bindKey",
              "curry",
              "curryRight",
              "partial",
              "partialRight",
            ],
            function (e) {
              f43[e].placeholder = f43;
            }
          );
          f4(["drop", "take"], function (e, t) {
            f46.prototype[e] = function (n) {
              n = n === undefined ? 1 : v73(f220(n), 0);
              var r = this.__filtered__ && !t ? new f46(this) : this.clone();
              if (r.__filtered__) {
                r.__takeCount__ = v74(n, r.__takeCount__);
              } else {
                r.__views__.push({
                  size: v74(n, 4294967295),
                  type: e + (r.__dir__ < 0 ? "Right" : ""),
                });
              }
              return r;
            };
            f46.prototype[e + "Right"] = function (t) {
              return this.reverse()[e](t).reverse();
            };
          });
          f4(["filter", "map", "takeWhile"], function (e, t) {
            var n = t + 1;
            var r = n == 1 || n == 3;
            f46.prototype[e] = function (e) {
              var t = this.clone();
              t.__iteratees__.push({
                iteratee: f162(e, 3),
                type: n,
              });
              t.__filtered__ = t.__filtered__ || r;
              return t;
            };
          });
          f4(["head", "last"], function (e, t) {
            var n = "take" + (t ? "Right" : "");
            f46.prototype[e] = function () {
              return this[n](1).value()[0];
            };
          });
          f4(["initial", "tail"], function (e, t) {
            var n = "drop" + (t ? "" : "Right");
            f46.prototype[e] = function () {
              if (this.__filtered__) {
                return new f46(this);
              } else {
                return this[n](1);
              }
            };
          });
          f46.prototype.compact = function () {
            return this.filter(f235);
          };
          f46.prototype.find = function (e) {
            return this.filter(e).head();
          };
          f46.prototype.findLast = function (e) {
            return this.reverse().find(e);
          };
          f46.prototype.invokeMap = f102(function (e, t) {
            if (typeof e == "function") {
              return new f46(this);
            } else {
              return this.map(function (n) {
                return f82(n, e, t);
              });
            }
          });
          f46.prototype.reject = function (e) {
            return this.filter(f204(f162(e)));
          };
          f46.prototype.slice = function (e, t) {
            e = f220(e);
            var n = this;
            if (n.__filtered__ && (e > 0 || t < 0)) {
              return new f46(n);
            } else {
              if (e < 0) {
                n = n.takeRight(-e);
              } else if (e) {
                n = n.drop(e);
              }
              if (t !== undefined) {
                n = (t = f220(t)) < 0 ? n.dropRight(-t) : n.take(t - e);
              }
              return n;
            }
          };
          f46.prototype.takeRightWhile = function (e) {
            return this.reverse().takeWhile(e).reverse();
          };
          f46.prototype.toArray = function () {
            return this.take(4294967295);
          };
          f72(f46.prototype, function (e, t) {
            var n = /^(?:filter|find|map|reject)|While$/.test(t);
            var r = /^(?:head|last)$/.test(t);
            var i = f43[r ? "take" + (t == "last" ? "Right" : "") : t];
            var o = r || /^find/.test(t);
            if (i) {
              f43.prototype[t] = function () {
                var t = this.__wrapped__;
                var a = r ? [1] : arguments;
                var u = t instanceof f46;
                var s = a[0];
                var c = u || v94(t);
                function f(e) {
                  var t = i.apply(f43, f11([e], a));
                  if (r && l) {
                    return t[0];
                  } else {
                    return t;
                  }
                }
                if (c && n && typeof s == "function" && s.length != 1) {
                  u = c = false;
                }
                var l = this.__chain__;
                var d = !!this.__actions__.length;
                var h = o && !l;
                var v = u && !d;
                if (!o && c) {
                  t = v ? t : new f46(this);
                  var g = e.apply(t, a);
                  g.__actions__.push({
                    func: f196,
                    args: [f],
                    thisArg: undefined,
                  });
                  return new f45(g, l);
                }
                if (h && v) {
                  return e.apply(this, a);
                } else {
                  g = this.thru(f);
                  if (h) {
                    if (r) {
                      return g.value()[0];
                    } else {
                      return g.value();
                    }
                  } else {
                    return g;
                  }
                }
              };
            }
          });
          f4(
            ["pop", "push", "shift", "sort", "splice", "unshift"],
            function (e) {
              var t = v44[e];
              var n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru";
              var r = /^(?:pop|shift)$/.test(e);
              f43.prototype[e] = function () {
                var e = arguments;
                if (r && !this.__chain__) {
                  var i = this.value();
                  return t.apply(v94(i) ? i : [], e);
                }
                return this[n](function (n) {
                  return t.apply(v94(n) ? n : [], e);
                });
              };
            }
          );
          f72(f46.prototype, function (e, t) {
            var n = f43[t];
            if (n) {
              var r = n.name + "";
              if (!v49.call(vO4, r)) {
                vO4[r] = [];
              }
              vO4[r].push({
                name: t,
                func: n,
              });
            }
          });
          vO4[f142(undefined, 2).name] = [
            {
              name: "wrapper",
              func: undefined,
            },
          ];
          f46.prototype.clone = function () {
            var e = new f46(this.__wrapped__);
            e.__actions__ = f131(this.__actions__);
            e.__dir__ = this.__dir__;
            e.__filtered__ = this.__filtered__;
            e.__iteratees__ = f131(this.__iteratees__);
            e.__takeCount__ = this.__takeCount__;
            e.__views__ = f131(this.__views__);
            return e;
          };
          f46.prototype.reverse = function () {
            if (this.__filtered__) {
              var e = new f46(this);
              e.__dir__ = -1;
              e.__filtered__ = true;
            } else {
              (e = this.clone()).__dir__ *= -1;
            }
            return e;
          };
          f46.prototype.value = function () {
            var e = this.__wrapped__.value();
            var t = this.__dir__;
            var n = v94(e);
            var r = t < 0;
            var i = n ? e.length : 0;
            var o = (function (e, t, n) {
              var r = -1;
              var i = n.length;
              while (++r < i) {
                var o = n[r];
                var a = o.size;
                switch (o.type) {
                  case "drop":
                    e += a;
                    break;
                  case "dropRight":
                    t -= a;
                    break;
                  case "take":
                    t = v74(t, e + a);
                    break;
                  case "takeRight":
                    e = v73(e, t - a);
                }
              }
              return {
                start: e,
                end: t,
              };
            })(0, i, this.__views__);
            var a = o.start;
            var u = o.end;
            var s = u - a;
            var c = r ? u : a - 1;
            var f = this.__iteratees__;
            var l = f.length;
            var d = 0;
            var h = v74(s, this.__takeCount__);
            if (!n || (!r && i == s && h == s)) {
              return f118(e, this.__actions__);
            }
            var v = [];
            e: while (s-- && d < h) {
              for (var g = -1, p = e[(c += t)]; ++g < l; ) {
                var y = f[g];
                var m = y.iteratee;
                var _ = y.type;
                var b = m(p);
                if (_ == 2) {
                  p = b;
                } else if (!b) {
                  if (_ == 1) {
                    continue e;
                  }
                  break e;
                }
              }
              v[d++] = p;
            }
            return v;
          };
          f43.prototype.at = vF1572;
          f43.prototype.chain = function () {
            return f195(this);
          };
          f43.prototype.commit = function () {
            return new f45(this.value(), this.__chain__);
          };
          f43.prototype.next = function () {
            if (this.__values__ === undefined) {
              this.__values__ = f218(this.value());
            }
            var e = this.__index__ >= this.__values__.length;
            return {
              done: e,
              value: e ? undefined : this.__values__[this.__index__++],
            };
          };
          f43.prototype.plant = function (e) {
            var t;
            for (var n = this; n instanceof f44; ) {
              var r = f185(n);
              r.__index__ = 0;
              r.__values__ = undefined;
              if (t) {
                i.__wrapped__ = r;
              } else {
                t = r;
              }
              var i = r;
              n = n.__wrapped__;
            }
            i.__wrapped__ = e;
            return t;
          };
          f43.prototype.reverse = function () {
            var e = this.__wrapped__;
            if (e instanceof f46) {
              var t = e;
              if (this.__actions__.length) {
                t = new f46(this);
              }
              (t = t.reverse()).__actions__.push({
                func: f196,
                args: [f192],
                thisArg: undefined,
              });
              return new f45(t, this.__chain__);
            }
            return this.thru(f192);
          };
          f43.prototype.toJSON =
            f43.prototype.valueOf =
            f43.prototype.value =
              function () {
                return f118(this.__wrapped__, this.__actions__);
              };
          f43.prototype.first = f43.prototype.head;
          if (v62) {
            f43.prototype[v62] = function () {
              return this;
            };
          }
          return f43;
        })();
        v27._ = vE;
        if (
          (i = function () {
            return vE;
          }.call(t, n, t, r)) !== undefined
        ) {
          r.exports = i;
        }
      }.call(this));
    }.call(this, n(6), n(7)(e)));
  },
  function (e, t) {
    var n;
    n = (function () {
      return this;
    })();
    try {
      n = n || new Function("return this")();
    } catch (e) {
      if (typeof window == "object") {
        n = window;
      }
    }
    e.exports = n;
  },
  function (e, t) {
    e.exports = function (e) {
      if (!e.webpackPolyfill) {
        e.deprecate = function () {};
        e.paths = [];
        e.children ||= [];
        Object.defineProperty(e, "loaded", {
          enumerable: true,
          get: function () {
            return e.l;
          },
        });
        Object.defineProperty(e, "id", {
          enumerable: true,
          get: function () {
            return e.i;
          },
        });
        e.webpackPolyfill = 1;
      }
      return e;
    };
  },
  function (e, t, n) {},
  function (e, t, n) {},
  function (e, t, n) {
    "use strict";

    n.r(t);
    n.d(t, "svgs", function () {
      return vO7;
    });
    n.d(t, "getServers", function () {
      return f290;
    });
    n.d(t, "createServer", function () {
      return f292;
    });
    n.d(t, "deleteServer", function () {
      return f294;
    });
    n.d(t, "updateHubServer", function () {
      return f296;
    });
    n.d(t, "setCookie", function () {
      return f300;
    });
    n.d(t, "getCookie", function () {
      return f301;
    });
    n.d(t, "eraseCookie", function () {
      return f302;
    });
    var r = n(3);
    n(5);
    var i = n(1);
    var o = n(0);
    var a = [
      {
        type: 0,
        rot: Object(o.degreesToRadians)(0),
        offset: 0,
        width: 0.5,
        length: 1,
        damage: 1,
        reload: 1,
        delay: 0,
      },
    ];
    var u = [
      {
        type: 0,
        rot: Object(o.degreesToRadians)(0),
        offset: 0,
        width: 0.5,
        length: 1.25,
        damage: 3,
        penetration: 2.5,
        reload: 2,
        delay: 0,
        speed: 1.5,
      },
    ];
    var s = [
      {
        type: 0,
        rot: Object(o.degreesToRadians)(35),
        offset: 0,
        distance: 0,
        width: 0.25,
        length: 0.75,
        damage: 0.75,
        reload: 1,
        delay: 0,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(-35),
        offset: 0,
        distance: 0,
        width: 0.25,
        length: 0.75,
        damage: 0.75,
        reload: 1,
        delay: 0,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(0),
        offset: 0,
        distance: 0,
        width: 0.5,
        length: 1,
        damage: 1,
        reload: 1,
        delay: 0,
      },
    ];
    var c = [
      {
        type: 0,
        rot: Object(o.degreesToRadians)(0),
        offset: 0,
        width: 1,
        length: 1.1,
        damage: 8,
        reload: 4,
        delay: 0,
      },
    ];
    var f = [
      {
        type: 0,
        rot: Object(o.degreesToRadians)(-60),
        offset: 0,
        distance: 0,
        width: 0.25,
        length: 0.7,
        damage: 0.5,
        reload: 1,
        delay: 0.75,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(60),
        offset: 0,
        distance: 0,
        width: 0.25,
        length: 0.7,
        damage: 0.5,
        reload: 1,
        delay: 0.75,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(-40),
        offset: 0,
        distance: 0,
        width: 0.25,
        length: 0.8,
        damage: 0.5,
        reload: 1,
        delay: 0.5,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(40),
        offset: 0,
        distance: 0,
        width: 0.25,
        length: 0.8,
        damage: 0.5,
        reload: 1,
        delay: 0.5,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(20),
        offset: 0,
        distance: 0,
        width: 0.25,
        length: 0.9,
        damage: 0.5,
        reload: 1,
        delay: 0.25,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(-20),
        offset: 0,
        distance: 0,
        width: 0.25,
        length: 0.9,
        damage: 0.5,
        reload: 1,
        delay: 0.25,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(0),
        offset: 0,
        distance: 0,
        width: 0.5,
        length: 1,
        damage: 1,
        reload: 1,
        delay: 0,
      },
    ];
    var l = [
      {
        type: 0,
        rot: Object(o.degreesToRadians)(-75),
        offset: 0,
        width: 0.25,
        length: 0.7,
        damage: 0.5,
        reload: 1.5,
        delay: 0.8333,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(75),
        offset: 0,
        width: 0.25,
        length: 0.7,
        damage: 0.5,
        reload: 1.5,
        delay: 0.8333,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(-60),
        offset: 0,
        width: 0.25,
        length: 0.8,
        damage: 0.5,
        reload: 1.5,
        delay: 0.6666,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(60),
        offset: 0,
        width: 0.25,
        length: 0.8,
        damage: 0.5,
        reload: 1.5,
        delay: 0.6666,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(-45),
        offset: 0,
        width: 0.25,
        length: 0.9,
        damage: 0.5,
        reload: 1.5,
        delay: 0.5,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(45),
        offset: 0,
        width: 0.25,
        length: 0.9,
        damage: 0.5,
        reload: 1.5,
        delay: 0.5,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(-30),
        offset: 0,
        width: 0.25,
        length: 1,
        damage: 0.5,
        reload: 1.5,
        delay: 0.3333,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(30),
        offset: 0,
        width: 0.25,
        length: 1,
        damage: 0.5,
        reload: 1.5,
        delay: 0.3333,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(15),
        offset: 0,
        width: 0.25,
        length: 1.1,
        damage: 0.5,
        reload: 1.5,
        delay: 0.1666,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(-15),
        offset: 0,
        width: 0.25,
        length: 1.1,
        damage: 0.5,
        reload: 1.5,
        delay: 0.1666,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(0),
        offset: 0,
        width: 0.5,
        length: 1.2,
        damage: 1.5,
        penetration: 2,
        reload: 1.5,
        delay: 0,
      },
    ];
    var d = [
      {
        type: 0,
        rot: Object(o.degreesToRadians)(0),
        offset: 0,
        distance: 0,
        width: 0.5,
        length: 1,
        damage: 1,
        reload: 1,
        delay: 0,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(180),
        offset: 0,
        distance: 0,
        width: 0.5,
        length: 1,
        damage: 1,
        reload: 1,
        delay: 0,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(90),
        offset: 0,
        distance: 0,
        width: 0.5,
        length: 1,
        damage: 1,
        reload: 1,
        delay: 0,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(-90),
        offset: 0,
        distance: 0,
        width: 0.5,
        length: 1,
        damage: 1,
        reload: 1,
        delay: 0,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(45),
        offset: 0,
        distance: 0,
        width: 0.5,
        length: 1,
        damage: 1,
        reload: 1,
        delay: 0,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(-45),
        offset: 0,
        distance: 0,
        width: 0.5,
        length: 1,
        damage: 1,
        reload: 1,
        delay: 0,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(135),
        offset: 0,
        distance: 0,
        width: 0.5,
        length: 1,
        damage: 1,
        reload: 1,
        delay: 0,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(-135),
        offset: 0,
        distance: 0,
        width: 0.5,
        length: 1,
        damage: 1,
        reload: 1,
        delay: 0,
      },
    ];
    var h = [
      {
        type: 0,
        rot: Object(o.degreesToRadians)(0),
        offset: 0,
        width: 0.5,
        length: 1.4,
        damage: 4.5,
        reload: 2.3,
        delay: 0,
        speed: 2,
      },
    ];
    var v = [
      {
        type: 2,
        rot: Object(o.degreesToRadians)(180),
        offset: 0,
        distance: 0,
        width: 0.2,
        length: 0.45,
        damage: 4,
        reload: 12,
        delay: 0,
      },
      {
        type: 2,
        rot: Object(o.degreesToRadians)(180),
        offset: 0.5,
        distance: 0,
        width: 0.1,
        length: 0.35,
        damage: 2,
        reload: 3,
        delay: 0,
      },
      {
        type: 2,
        rot: Object(o.degreesToRadians)(180),
        offset: -0.5,
        distance: 0,
        width: 0.1,
        length: 0.35,
        damage: 2,
        reload: 3,
        delay: 0,
      },
      {
        type: 2,
        rot: Object(o.degreesToRadians)(60),
        offset: 0,
        distance: 0,
        width: 0.2,
        length: 0.45,
        damage: 4,
        reload: 12,
        delay: 0,
      },
      {
        type: 2,
        rot: Object(o.degreesToRadians)(60),
        offset: 0.5,
        distance: 0,
        width: 0.1,
        length: 0.35,
        damage: 2,
        reload: 3,
        delay: 0,
      },
      {
        type: 2,
        rot: Object(o.degreesToRadians)(60),
        offset: -0.5,
        distance: 0,
        width: 0.1,
        length: 0.35,
        damage: 2,
        reload: 3,
        delay: 0,
      },
      {
        type: 2,
        rot: Object(o.degreesToRadians)(-60),
        offset: 0,
        distance: 0,
        width: 0.2,
        length: 0.45,
        damage: 4,
        reload: 12,
        delay: 0,
      },
      {
        type: 2,
        rot: Object(o.degreesToRadians)(-60),
        offset: 0.5,
        distance: 0,
        width: 0.1,
        length: 0.35,
        damage: 2,
        reload: 3,
        delay: 0,
      },
      {
        type: 2,
        rot: Object(o.degreesToRadians)(-60),
        offset: -0.5,
        distance: 0,
        width: 0.1,
        length: 0.35,
        damage: 2,
        reload: 3,
        delay: 0,
      },
    ];
    var g = [
      {
        type: 1,
        rot: Object(o.degreesToRadians)(180),
        offset: 0,
        distance: 0,
        width: 0.2,
        length: 0.45,
        damage: 1.5,
        reload: 4,
        delay: 0,
      },
      {
        type: 1,
        rot: Object(o.degreesToRadians)(180),
        offset: 0.5,
        distance: 0,
        width: 0.1,
        length: 0.35,
        damage: 0.25,
        reload: 1,
        delay: 0,
      },
      {
        type: 1,
        rot: Object(o.degreesToRadians)(180),
        offset: -0.5,
        distance: 0,
        width: 0.1,
        length: 0.35,
        damage: 0.25,
        reload: 1,
        delay: 0,
      },
      {
        type: 1,
        rot: Object(o.degreesToRadians)(60),
        offset: 0,
        distance: 0,
        width: 0.2,
        length: 0.45,
        damage: 1.5,
        reload: 4,
        delay: 0,
      },
      {
        type: 1,
        rot: Object(o.degreesToRadians)(60),
        offset: 0.5,
        distance: 0,
        width: 0.1,
        length: 0.35,
        damage: 0.25,
        reload: 1,
        delay: 0,
      },
      {
        type: 1,
        rot: Object(o.degreesToRadians)(60),
        offset: -0.5,
        distance: 0,
        width: 0.1,
        length: 0.35,
        damage: 0.25,
        reload: 1,
        delay: 0,
      },
      {
        type: 1,
        rot: Object(o.degreesToRadians)(-60),
        offset: 0,
        distance: 0,
        width: 0.2,
        length: 0.45,
        damage: 1.5,
        reload: 4,
        delay: 0,
      },
      {
        type: 1,
        rot: Object(o.degreesToRadians)(-60),
        offset: 0.5,
        distance: 0,
        width: 0.1,
        length: 0.35,
        damage: 0.25,
        reload: 1,
        delay: 0,
      },
      {
        type: 1,
        rot: Object(o.degreesToRadians)(-60),
        offset: -0.5,
        distance: 0,
        width: 0.1,
        length: 0.35,
        damage: 0.25,
        reload: 1,
        delay: 0,
      },
    ];
    var p = [
      {
        type: 2,
        rot: Object(o.degreesToRadians)(-60),
        offset: 0,
        width: 0.55,
        length: 0.5,
        damage: 8,
        reload: 12,
        delay: 0,
        speed: 1,
        distance: 0,
        penetration: 3.5,
      },
      {
        type: 2,
        rot: Object(o.degreesToRadians)(60),
        offset: 0,
        width: 0.55,
        length: 0.5,
        damage: 8,
        reload: 12,
        delay: 0,
        speed: 1,
        distance: 0,
        penetration: 3.5,
      },
      {
        type: 2,
        rot: Object(o.degreesToRadians)(180),
        offset: 0,
        width: 0.55,
        length: 0.5,
        damage: 8,
        reload: 12,
        delay: 0,
        speed: 1,
        distance: 0,
        penetration: 3.5,
      },
    ];
    var y = [
      {
        type: 4,
        rot: Object(o.degreesToRadians)(180),
        offset: 0,
        distance: 0.4,
        width: 0.4,
        length: 0.225,
        damage: 0.1,
        penetration: 40,
        reload: 6,
        delay: 0,
      },
      {
        type: 4,
        rot: Object(o.degreesToRadians)(60),
        offset: 0,
        distance: 0.4,
        width: 0.4,
        length: 0.225,
        damage: 0.1,
        penetration: 40,
        reload: 6,
        delay: 0,
      },
      {
        type: 4,
        rot: Object(o.degreesToRadians)(-60),
        offset: 0,
        distance: 0.4,
        width: 0.4,
        length: 0.225,
        damage: 0.1,
        penetration: 40,
        reload: 6,
        delay: 0,
      },
      {
        type: 5,
        rot: Object(o.degreesToRadians)(180),
        offset: -0.6,
        distance: 0.4,
        width: 0.1,
        length: 0.15,
        damage: 0.1,
        reload: 12,
        delay: 0,
      },
      {
        type: 5,
        rot: Object(o.degreesToRadians)(180),
        offset: 0.6,
        distance: 0.4,
        width: 0.1,
        length: 0.15,
        damage: 0.1,
        reload: 12,
        delay: 0,
      },
      {
        type: 5,
        rot: Object(o.degreesToRadians)(60),
        offset: -0.6,
        distance: 0.4,
        width: 0.1,
        length: 0.15,
        damage: 0.1,
        reload: 12,
        delay: 0,
      },
      {
        type: 5,
        rot: Object(o.degreesToRadians)(60),
        offset: 0.6,
        distance: 0.4,
        width: 0.1,
        length: 0.15,
        damage: 0.1,
        reload: 12,
        delay: 0,
      },
      {
        type: 5,
        rot: Object(o.degreesToRadians)(-60),
        offset: -0.6,
        distance: 0.4,
        width: 0.1,
        length: 0.15,
        damage: 0.1,
        reload: 12,
        delay: 0,
      },
      {
        type: 5,
        rot: Object(o.degreesToRadians)(-60),
        offset: 0.6,
        distance: 0.4,
        width: 0.1,
        length: 0.15,
        damage: 0.1,
        reload: 12,
        delay: 0,
      },
    ];
    var m = [
      {
        type: 3,
        rot: Object(o.degreesToRadians)(180),
        offset: 0,
        width: 0.4,
        length: 0.45,
        penetration: 2,
        speed: 0.75,
        damage: 1,
        reload: 30,
        delay: 0,
      },
      {
        type: 3,
        rot: Object(o.degreesToRadians)(60),
        offset: 0,
        width: 0.4,
        length: 0.45,
        penetration: 2,
        speed: 0.75,
        damage: 1,
        reload: 30,
        delay: 0,
      },
      {
        type: 3,
        rot: Object(o.degreesToRadians)(-60),
        offset: 0,
        width: 0.4,
        length: 0.45,
        penetration: 2,
        speed: 0.75,
        damage: 1,
        reload: 30,
        delay: 0,
      },
    ];
    var _ = [
      {
        type: 0,
        rot: Object(o.degreesToRadians)(0),
        offset: 0,
        distance: 0,
        width: 0.2,
        length: 1.2,
        damage: 0.6,
        reload: 1,
        delay: 0,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(0),
        offset: -0.5,
        distance: 0,
        width: 0.2,
        length: 1.2,
        damage: 0.6,
        reload: 1,
        delay: 0.33,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(0),
        offset: 0.5,
        distance: 0,
        width: 0.2,
        length: 1.2,
        damage: 0.6,
        reload: 1,
        delay: 0.66,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(0),
        offset: 0,
        distance: 0,
        width: 0.2,
        length: 0.8,
        damage: 0.6,
        reload: 1,
        delay: 0.66,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(0),
        offset: -0.5,
        distance: 0,
        width: 0.2,
        length: 0.8,
        damage: 0.6,
        reload: 1,
        delay: 0.33,
      },
      {
        type: 0,
        rot: Object(o.degreesToRadians)(0),
        offset: 0.5,
        distance: 0,
        width: 0.2,
        length: 0.8,
        damage: 0.6,
        reload: 1,
        delay: 0,
      },
    ];
    var b = [
      {
        rot: Object(o.degreesToRadians)(-12),
        type: 0,
        offsetX: Math.sin(Object(o.degreesToRadians)(135)) * 0.8,
        offsetY: Math.cos(Object(o.degreesToRadians)(135)) * 0.8,
        length: 0.5,
        width: 0.25,
        reload: 1,
        damage: 0.4,
        minDistance: 15,
        maxDistance: 25,
      },
      {
        rot: Object(o.degreesToRadians)(-16),
        type: 0,
        offsetX: Math.sin(Object(o.degreesToRadians)(45)) * 0.8,
        offsetY: Math.cos(Object(o.degreesToRadians)(45)) * 0.8,
        length: 0.5,
        width: 0.25,
        reload: 1,
        damage: 0.4,
        minDistance: 15,
        maxDistance: 25,
      },
      {
        rot: Object(o.degreesToRadians)(245),
        type: 0,
        offsetX: Math.sin(Object(o.degreesToRadians)(-135)) * 0.8,
        offsetY: Math.cos(Object(o.degreesToRadians)(-135)) * 0.8,
        length: 0.5,
        width: 0.25,
        reload: 1,
        damage: 0.4,
        minDistance: 15,
        maxDistance: 25,
      },
      {
        rot: Object(o.degreesToRadians)(257),
        type: 0,
        offsetX: Math.sin(Object(o.degreesToRadians)(-45)) * 0.8,
        offsetY: Math.cos(Object(o.degreesToRadians)(-45)) * 0.8,
        length: 0.5,
        width: 0.25,
        reload: 1,
        damage: 0.4,
        minDistance: 15,
        maxDistance: 25,
      },
    ];
    var w = [
      {
        type: 0,
        offsetX: 0,
        offsetY: 0,
        length: 0.7,
        width: 0.4,
        reload: 2.5,
        damage: 2,
        minDistance: 25,
        maxDistance: 45,
        speed: 1.3,
        rot: Object(o.degreesToRadians)(-45),
      },
    ];
    var O = [
      {
        type: 0,
        offsetX: 0,
        offsetY: 0,
        length: 0.75,
        width: 0.4,
        reload: 2,
        damage: 3.5,
        minDistance: 25,
        maxDistance: 45,
        speed: 1.5,
        rot: Object(o.degreesToRadians)(170),
      },
    ];
    var R = [
      {
        type: 2,
        sides: 0,
        subtype: 0,
        offsetX: Math.sin(Object(o.degreesToRadians)(0)) * 0.7,
        offsetY: Math.cos(Object(o.degreesToRadians)(0)) * -0.7,
        radius: 1.75,
        width: 0.15,
        damage: 0.125,
        reload: 0.25,
      },
      {
        type: 2,
        sides: 0,
        subtype: 0,
        offsetX: Math.sin(Object(o.degreesToRadians)(120)) * 0.7,
        offsetY: Math.cos(Object(o.degreesToRadians)(120)) * -0.7,
        radius: 1.75,
        width: 0.15,
        damage: 0.125,
        reload: 0.25,
      },
      {
        type: 2,
        sides: 0,
        subtype: 0,
        offsetX: Math.sin(Object(o.degreesToRadians)(-120)) * 0.7,
        offsetY: Math.cos(Object(o.degreesToRadians)(-120)) * -0.7,
        radius: 1.75,
        width: 0.15,
        damage: 0.125,
        reload: 0.25,
      },
      {
        type: 2,
        sides: 0,
        subtype: 0,
        offsetX: 0,
        offsetY: 0,
        radius: 2,
        width: 0.1,
        damage: 0.15,
        reload: 0.25,
      },
      {
        type: 2,
        sides: 0,
        subtype: 0,
        offsetX: 0,
        offsetY: 0,
        radius: 4,
        width: 0.3,
        damage: 0.15,
        reload: 0.25,
      },
    ];
    var x = [
      {
        type: 0,
        offsetX: Math.sin(Object(o.degreesToRadians)(0)) * 0.7,
        offsetY: Math.cos(Object(o.degreesToRadians)(0)) * -0.7,
        length: 0.15,
        width: 0.075,
        reload: 0.75,
        damage: 0.3,
        minDistance: 15,
        maxDistance: 25,
        rot: Object(o.degreesToRadians)(75),
      },
      {
        type: 0,
        offsetX: Math.sin(Object(o.degreesToRadians)(120)) * 0.7,
        offsetY: Math.cos(Object(o.degreesToRadians)(120)) * -0.7,
        length: 0.15,
        width: 0.075,
        reload: 0.75,
        damage: 0.3,
        minDistance: 15,
        maxDistance: 25,
        rot: Object(o.degreesToRadians)(75),
      },
      {
        type: 0,
        offsetX: Math.sin(Object(o.degreesToRadians)(-120)) * 0.7,
        offsetY: Math.cos(Object(o.degreesToRadians)(-120)) * -0.7,
        length: 0.15,
        width: 0.075,
        reload: 0.75,
        damage: 0.3,
        minDistance: 15,
        maxDistance: 25,
        rot: Object(o.degreesToRadians)(75),
      },
      {
        type: 0,
        offsetX: Math.sin(Object(o.degreesToRadians)(60)) * 0.35,
        offsetY: Math.cos(Object(o.degreesToRadians)(60)) * -0.35,
        length: 0.15,
        width: 0.075,
        reload: 0.75,
        damage: 0.3,
        minDistance: 15,
        maxDistance: 25,
        rot: Object(o.degreesToRadians)(75),
      },
      {
        type: 0,
        offsetX: Math.sin(Object(o.degreesToRadians)(-60)) * 0.35,
        offsetY: Math.cos(Object(o.degreesToRadians)(-60)) * -0.35,
        length: 0.15,
        width: 0.075,
        reload: 0.75,
        damage: 0.3,
        minDistance: 15,
        maxDistance: 25,
        rot: Object(o.degreesToRadians)(75),
      },
      {
        type: 0,
        offsetX: Math.sin(Object(o.degreesToRadians)(180)) * 0.35,
        offsetY: Math.cos(Object(o.degreesToRadians)(180)) * -0.35,
        length: 0.15,
        width: 0.075,
        reload: 0.75,
        damage: 0.3,
        minDistance: 15,
        maxDistance: 25,
        rot: Object(o.degreesToRadians)(75),
      },
      {
        type: 0,
        offsetX: 0,
        offsetY: 0,
        length: 0.35,
        width: 0.2,
        reload: 0.75,
        damage: 1.25,
        minDistance: 30,
        maxDistance: 40,
        speed: 1.6,
        rot: Object(o.degreesToRadians)(75),
      },
    ];
    var T = [
      {
        size: 0.8,
        sides: 6,
        rot: 0,
        offsetX: 0,
        offsetY: 0,
      },
    ];
    var j = [
      {
        size: 0.7,
        sides: 6,
        rot: 0,
        offsetX: 0,
        offsetY: 0,
      },
      {
        size: 0.4,
        sides: 4,
        rot: 0,
        offsetX: 0,
        offsetY: 0,
      },
    ];
    var S = [
      {
        size: 0.8,
        sides: 3,
        rot: 0,
        offsetX: 0,
        offsetY: 0,
      },
      {
        size: 0.4,
        sides: 3,
        rot: 0,
        offsetX: 0,
        offsetY: 0,
      },
    ];
    var M = Math.random() * 360;
    var E = [
      {
        tanks: [
          {
            x: 0,
            y: 0,
            size: 40,
            d: Object(o.degreesToRadians)(135),
            sides: 6,
            outerSides: 0,
            outerSize: 0,
            color: i.TEAM_COLORS[0],
            barrels: s,
            gadgets: [],
            layers: [],
          },
          {
            x: 400,
            y: 100,
            size: 30,
            d: Object(o.degreesToRadians)(-68),
            sides: 0,
            outerSides: 0,
            outerSize: 0,
            color: i.TEAM_COLORS[1],
            barrels: a,
            gadgets: [],
            layers: [],
          },
          {
            x: -700,
            y: -100,
            size: 60,
            d: Object(o.degreesToRadians)(74),
            sides: 8,
            outerSides: 0,
            outerSize: 0,
            color: i.TEAM_COLORS[2],
            barrels: c,
            gadgets: [],
            layers: j,
          },
          {
            x: 400,
            y: -500,
            size: 60,
            d: Object(o.degreesToRadians)(28),
            sides: 8,
            outerSides: 5,
            outerSize: 0.55,
            color: i.TEAM_COLORS[3],
            barrels: d,
            gadgets: w,
            layers: T,
          },
          {
            x: -200,
            y: 600,
            size: 50,
            d: Object(o.degreesToRadians)(10),
            sides: 0,
            outerSides: 0,
            outerSize: 0,
            color: i.FALLEN_COLOR,
            barrels: f,
            gadgets: O,
            layers: [],
          },
          {
            x: -900,
            y: -800,
            size: 60,
            d: Object(o.degreesToRadians)(69),
            sides: 0,
            outerSides: 4,
            outerSize: 0.6,
            color: i.TEAM_COLORS[1],
            barrels: h,
            gadgets: [],
            layers: [],
          },
          {
            x: 900,
            y: 200,
            size: 100,
            d: Object(o.degreesToRadians)(69),
            sides: 3,
            outerSides: 3,
            outerSize: 0.3,
            color: i.CELESTIAL_COLOR,
            barrels: v,
            gadgets: [],
            layers: S,
          },
          {
            x: -1100,
            y: 1000,
            size: 120,
            d: Object(o.degreesToRadians)(69),
            sides: 3,
            outerSides: 0,
            outerSize: 0,
            color: i.CELESTIAL_COLOR,
            barrels: g,
            gadgets: R,
            layers: [
              {
                size: 0.6,
                sides: 3,
                rot: 0,
                offsetX: 0,
                offsetY: 0,
              },
            ],
          },
        ],
        polygons: [
          {
            x: 200,
            y: -300,
            level: 4,
            d: Object(o.degreesToRadians)(32),
          },
          {
            x: 500,
            y: 750,
            level: 4,
            d: Object(o.degreesToRadians)(89),
          },
          {
            x: -150,
            y: -250,
            level: 3,
            d: Object(o.degreesToRadians)(57),
          },
          {
            x: -170,
            y: 800,
            level: 3,
            d: Object(o.degreesToRadians)(-57),
          },
          {
            x: -750,
            y: -600,
            level: 3,
            d: Object(o.degreesToRadians)(-98),
          },
          {
            x: -690,
            y: 100,
            level: 2,
            d: Object(o.degreesToRadians)(-23),
          },
          {
            x: -600,
            y: 180,
            level: 2,
            d: Object(o.degreesToRadians)(85),
          },
          {
            x: 420,
            y: 520,
            level: 2,
            d: Object(o.degreesToRadians)(85),
          },
          {
            x: 700,
            y: 700,
            level: 2,
            d: Object(o.degreesToRadians)(-74),
          },
          {
            x: 650,
            y: -700,
            level: 2,
            d: Object(o.degreesToRadians)(40),
          },
          {
            x: 770,
            y: -90,
            level: 2,
            d: Object(o.degreesToRadians)(40),
          },
          {
            x: -630,
            y: 670,
            level: 1,
            d: Object(o.degreesToRadians)(40),
          },
          {
            x: -680,
            y: 600,
            level: 1,
            d: Object(o.degreesToRadians)(74),
          },
          {
            x: -250,
            y: 1580,
            level: 1,
            d: Object(o.degreesToRadians)(-6),
          },
          {
            x: -200,
            y: 1500,
            level: 1,
            d: Object(o.degreesToRadians)(-49),
          },
          {
            x: 910,
            y: 40,
            level: 1,
            d: Object(o.degreesToRadians)(-49),
          },
          {
            x: -910,
            y: 310,
            level: 1,
            d: Object(o.degreesToRadians)(32),
          },
          {
            x: -160,
            y: 400,
            level: 1,
            d: Object(o.degreesToRadians)(74),
          },
          {
            x: -100,
            y: 50,
            level: 0,
            d: Object(o.degreesToRadians)(32),
          },
          {
            x: 500,
            y: -870,
            level: 0,
            d: Object(o.degreesToRadians)(79),
          },
          {
            x: -300,
            y: -800,
            level: 0,
            d: Object(o.degreesToRadians)(-82),
          },
          {
            x: -500,
            y: 800,
            level: 0,
            d: Object(o.degreesToRadians)(4),
          },
          {
            x: 800,
            y: 850,
            level: 0,
            d: Object(o.degreesToRadians)(2),
          },
          {
            x: -200,
            y: 200,
            level: 0,
            d: Object(o.degreesToRadians)(-32),
          },
          {
            x: -500,
            y: 300,
            level: 0,
            d: Object(o.degreesToRadians)(-32),
          },
          {
            x: 500,
            y: 280,
            level: 0,
            d: Object(o.degreesToRadians)(-84),
          },
          {
            x: -650,
            y: -280,
            level: 0,
            d: Object(o.degreesToRadians)(-84),
          },
          {
            x: -600,
            y: -270,
            level: 0,
            d: Object(o.degreesToRadians)(-24),
          },
          {
            x: 580,
            y: -320,
            level: 0,
            d: Object(o.degreesToRadians)(-24),
          },
        ],
        dimension: {
          visual: {
            gridSize: 30,
            backgroundColor: "#CDCDCD",
            gridColor: "#C8C8C8",
            particles: {
              spawnrate: 0 / (i.CAMERA_SIZE * i.CAMERA_SIZE),
              speed: {
                min: 0,
                max: 0,
              },
              d: {
                min: 0,
                max: 360,
              },
              size: {
                min: 6,
                max: 6,
              },
              lifetime: {
                min: 30,
                max: 60,
              },
              sides: {
                min: 0,
                max: 0,
              },
              transparency: {
                min: 1,
                max: 1,
              },
              color: {
                min: "#CDCDCD",
                max: "#C8C8C8",
              },
            },
          },
          bases: [],
          walls: [],
          gates: [],
          mapSize: 1500,
          trueMapSize: 1,
        },
      },
      {
        polygons: [],
        tanks: [
          {
            x: 0,
            y: 0,
            size: 400,
            d: Object(o.degreesToRadians)(135),
            sides: 3,
            outerSides: 3,
            outerSize: 0.15,
            color: i.CELESTIAL_COLOR,
            barrels: y,
            gadgets: [
              {
                showParticles: 0,
                type: 2,
                sides: 3,
                backSides: 3,
                subtype: 2,
                offsetX: 0,
                offsetY: 0,
                radius: 3,
                width: 0.3,
                rotationType: 0,
              },
            ],
            layers: [
              {
                size: 0.7,
                sides: 3,
                outerSides: 3,
                outerSize: 0.15,
                rot: 0,
                offsetX: 0,
                offsetY: 0,
              },
              {
                size: 0.3,
                sides: 3,
                outerSides: 3,
                outerSize: 0.15,
                rot: 0,
                offsetX: 0,
                offsetY: 0,
              },
            ],
          },
          {
            x: 900,
            y: 200,
            size: 100,
            d: Object(o.degreesToRadians)(69),
            sides: 3,
            outerSides: 3,
            outerSize: 0.3,
            color: i.CELESTIAL_COLOR,
            barrels: v,
            gadgets: [],
            layers: S,
          },
          {
            x: -700,
            y: -600,
            size: 120,
            d: Object(o.degreesToRadians)(35),
            sides: 3,
            outerSides: 0,
            outerSize: 0,
            color: i.CELESTIAL_COLOR,
            barrels: g,
            gadgets: x,
            layers: [
              {
                size: 0.6,
                sides: 3,
              },
            ],
          },
          {
            x: -840,
            y: 400,
            size: 120,
            d: Object(o.degreesToRadians)(-72),
            sides: 3,
            outerSides: 3,
            outerSize: 0.5,
            color: i.CELESTIAL_COLOR,
            barrels: m,
            gadgets: [],
            layers: [
              {
                size: 0.8,
                sides: 3,
              },
              {
                size: 0.4,
                sides: 3,
              },
            ],
          },
        ],
        dimension: {
          visual: {
            gridSize: 30,
            backgroundColor: "#595959",
            gridColor: "#4E4D4D",
            particles: {
              spawnrate: 0.5 / (i.CAMERA_SIZE * i.CAMERA_SIZE),
              speed: {
                min: 2,
                max: 5,
              },
              d: {
                min: 0 + M,
                max: 90 + M,
              },
              size: {
                min: 4,
                max: 8,
              },
              lifetime: {
                min: 30,
                max: 60,
              },
              sides: {
                min: 0,
                max: 0,
              },
              transparency: {
                min: 1,
                max: 1,
              },
              color: {
                min: "#595959",
                max: "#4E4D4D",
              },
            },
          },
          bases: [
            {
              width: 0.5,
              height: 0.5,
              x: 0,
              y: 0,
              team: 2,
            },
          ],
          walls: [],
          gates: [],
          mapSize: 3000,
          trueMapSize: 1,
        },
      },
      {
        tanks: [
          {
            x: 60,
            y: -60,
            size: 54,
            d: Object(o.degreesToRadians)(135),
            sides: 8,
            outerSides: 0,
            outerSize: 0,
            color: i.TEAM_COLORS[0],
            barrels: l,
            gadgets: [],
            layers: j,
          },
          {
            x: -60,
            y: 60,
            size: 54,
            d: Object(o.degreesToRadians)(315),
            sides: 0,
            outerSides: 0,
            outerSize: 0,
            color: i.TEAM_COLORS[0],
            barrels: _,
            gadgets: b,
            layers: [],
          },
          {
            x: 400,
            y: 100,
            size: 40,
            d: Object(o.degreesToRadians)(-110),
            sides: 0,
            outerSides: 0,
            outerSize: 0,
            color: i.TEAM_COLORS[1],
            barrels: u,
            gadgets: O,
            layers: [],
          },
          {
            x: -600,
            y: -100,
            size: 62,
            d: Object(o.degreesToRadians)(74),
            sides: 8,
            outerSides: 0,
            outerSize: 0,
            color: i.TEAM_COLORS[2],
            barrels: c,
            gadgets: [],
            layers: j,
          },
          {
            x: -100,
            y: -450,
            size: 50,
            d: Object(o.degreesToRadians)(10),
            sides: 0,
            outerSides: 0,
            outerSize: 0,
            color: i.FALLEN_COLOR,
            barrels: f,
            gadgets: O,
            layers: [],
          },
          {
            x: 600,
            y: -600,
            size: 62,
            d: Object(o.degreesToRadians)(28),
            sides: 8,
            outerSides: 5,
            outerSize: 0.55,
            color: i.TEAM_COLORS[3],
            barrels: d,
            gadgets: w,
            layers: T,
          },
          {
            x: 900,
            y: -730,
            size: 60,
            d: Object(o.degreesToRadians)(-69),
            sides: 0,
            outerSides: 4,
            outerSize: 0.6,
            color: i.TEAM_COLORS[1],
            barrels: h,
            gadgets: [],
            layers: [],
          },
          {
            x: 800,
            y: 400,
            size: 150,
            d: Object(o.degreesToRadians)(69),
            sides: 3,
            outerSides: 3,
            outerSize: 0.3,
            color: i.CELESTIAL_COLOR,
            barrels: p,
            gadgets: [],
            layers: [
              {
                size: 0.35,
                sides: 3,
                outerSides: -3,
                outerSize: 0.5,
              },
            ],
          },
          {
            x: -700,
            y: -600,
            size: 120,
            d: Object(o.degreesToRadians)(35),
            sides: 3,
            outerSides: 0,
            outerSize: 0,
            color: i.CELESTIAL_COLOR,
            barrels: g,
            gadgets: x,
            layers: [
              {
                size: 0.6,
                sides: 3,
              },
            ],
          },
          {
            x: -840,
            y: 400,
            size: 120,
            d: Object(o.degreesToRadians)(-72),
            sides: 3,
            outerSides: 3,
            outerSize: 0.5,
            color: i.CELESTIAL_COLOR,
            barrels: m,
            gadgets: [],
            layers: [
              {
                size: 0.8,
                sides: 3,
              },
              {
                size: 0.4,
                sides: 3,
              },
            ],
          },
        ],
        polygons: [],
        dimension: {
          visual: {
            gridSize: 120,
            showMinimap: false,
            backgroundColor: "#303030",
            gridColor: "#232323",
            wallColor: "#00000054",
            particles: {
              spawnrate: 0.45 / (i.CAMERA_SIZE * i.CAMERA_SIZE),
              speed: {
                min: 8,
                max: 15,
              },
              d: {
                min: 0 + M,
                max: 90 + M,
              },
              size: {
                min: 40,
                max: 150,
              },
              lifetime: {
                min: 30,
                max: 60,
              },
              sides: {
                min: 0,
                max: 0,
              },
              transparency: {
                min: 0.5,
                max: 0.8,
              },
              color: {
                min: "#595959",
                max: "#4E4D4D",
              },
            },
            darkness: {
              intensity: 1,
              color: "#000000",
            },
            lights: [
              {
                x: 0,
                y: 0,
                size: 300,
                d: 0,
                sides: 0,
                transparency: 1,
              },
              {
                x: 800,
                y: -400,
                size: 180,
                d: 0,
                sides: 0,
                transparency: 0.5,
              },
              {
                x: -700,
                y: 600,
                size: 180,
                d: 0,
                sides: 0,
                transparency: 0.5,
              },
              {
                x: -840,
                y: -400,
                size: 225,
                d: 0,
                sides: 0,
                transparency: 0.5,
              },
              {
                x: 600,
                y: 600,
                size: 180,
                d: 0,
                sides: 0,
                transparency: 0.5,
              },
            ],
          },
          bases: [],
          walls: [],
          gates: [],
          mapSize: 3000,
          trueMapSize: 1,
        },
      },
    ];
    var L = n(1);
    var k = true;
    var C = [];
    i.TEAM_COLORS[10];
    var A = [];
    var I = Math.floor(Math.random() * E.length);
    var z = {};
    var P = Date.now();
    var D = performance.now();
    var Y = 16.6666667;
    var N = document.getElementById("darkness-canvas");
    var B = document.getElementById("game-canvas");
    var W = B.getContext("2d");
    q();
    var G = 1;
    var X = 1;
    var U = 0;
    var F = 0;
    var $ = L.MAP_SIZE;
    function K() {
      J = false;
      var e = Date.now();
      D = performance.now();
      Y = (e - P) / 1000;
      P = e;
      var t;
      performance.now();
      try {
        t = Y;
        A.forEach(function (e) {
          e.lifetime -= t;
          e.x += e.xVel * 60 * t;
          e.y += e.yVel * 60 * t;
          if (e.friction != 1) {
            var n = 1 - (1 - e.friction) * 60 * t;
            e.xVel *= n;
            e.yVel *= n;
          }
          if (e.lifetime < 0) {
            A.splice(A.indexOf(e), 1);
          }
        });
        (function (e) {
          0;
          0;
          vA2.forEach(function (t) {
            var n =
              1 /
              (Math.pow(
                (function (e) {
                  var t = U - e.x;
                  var n = F - e.y;
                  return Math.sqrt(t * t + n * n);
                })(t),
                2
              ) /
                i.CAMERA_SHAKE_DIST);
            n = Math.min(1, n);
            n * t.power * (t.time / t.maxTime) * (1 - Math.random() * 2);
            n * t.power * (t.time / t.maxTime) * (1 - Math.random() * 2);
            t.time -= e;
            if (t.time < 0) {
              vA2.splice(vA2.indexOf(t), 1);
            }
          });
        })(Y);
        X = (function (e, t, n) {
          return e + (t - e) * n;
        })(X, L.CAMERA_SIZE * 1, 0.05);
        G = X / Math.max(B.height, B.width);
        var n = e / 7500;
        U = Math.cos(n) * 200;
        F = Math.sin(n) * 200;
        var r = E[I];
        $ = r.dimension.mapSize;
        (function () {
          var e;
          var t = B.width / 2 - U / G;
          var n = B.height / 2 - F / G;
          e = E[I].dimension;
          z = e;
          var r = e.visual;
          var a = r.particles;
          var u = X * 1.2;
          for (
            var s = Math.min(i.MAX_PARTICLES, X * X * a.spawnrate),
              c = Math.random();
            c < s;
            c += Math.random()
          ) {
            var f = Object(o.degreesToRadians)(f269(a.d.min, a.d.max));
            var l = f269(a.speed.min, a.speed.max);
            f254(
              U + Math.random() * u - u / 2,
              F + Math.random() * u - u / 2,
              l * Math.sin(f),
              l * Math.cos(f),
              f269(a.size.min, a.size.max),
              Math.random() * Math.PI * 2,
              Math.round(f269(a.sides.min, a.sides.max)),
              f249(f250(f248(a.color.min), f248(a.color.max), Math.random())),
              f269(a.lifetime.min, a.lifetime.max),
              f269(a.transparency.min, a.transparency.max),
              a.radiant ? 1 : 0
            );
          }
          W.fillStyle = r.backgroundColor;
          W.fillRect(0, 0, W.canvas.width, W.canvas.height);
          var d = L.GRID_STROKE / G;
          if (d > 0.3) {
            var h = r.gridSize / G;
            var v = Math.round(t / h) * h;
            var g = Math.round(n / h) * h;
            W.lineWidth = d;
            W.strokeStyle = r.gridColor;
            W.beginPath();
            for (var p = t; p < W.canvas.width + t; p += h) {
              W.moveTo(p - v, 0);
              W.lineTo(p - v, W.canvas.height);
            }
            for (var y = n; y < W.canvas.height + n; y += h) {
              W.moveTo(0, y - g);
              W.lineTo(W.canvas.width, y - g);
            }
            W.closePath();
            W.stroke();
          }
          (function (e, t, n) {
            for (var r = 0; r < t.length; r++) {
              var i = t[r];
              W.fillStyle = f244(0, i.team, 0, 0) + "29";
              var o = i.width * $;
              var a = i.height * $;
              W.fillRect(
                B.width / 2 - (-i.x * $ + U + o / 2) / G,
                B.height / 2 - (-i.y * $ + F + a / 2) / G,
                o / G,
                a / G
              );
            }
            W.fillStyle = e;
            for (var u = 0; u < n.length; u++) {
              var s = n[u];
              var c = s.width * $;
              var f = s.height * $;
              W.fillRect(
                B.width / 2 - (-s.x * $ + U + c / 2) / G,
                B.height / 2 - (-s.y * $ + F + f / 2) / G,
                c / G,
                f / G
              );
            }
            W.fillRect(
              0,
              B.height / 2 - (F + $) / G,
              B.width / 2 - (U + $) / G,
              ($ * 2) / G
            );
            W.fillRect(
              B.width,
              B.height / 2 - (F + $) / G,
              (-U + $) / G - B.width / 2,
              ($ * 2) / G
            );
            W.fillRect(0, 0, B.width, B.height / 2 - (F + $) / G);
            W.fillRect(0, B.height, B.width, (-F + $) / G - B.height / 2);
          })(e.visual.wallColor || "#00000029", e.bases, e.walls);
        })();
        for (var a = 0; a < r.tanks.length; a++) {
          var u = r.tanks[a];
          f256(
            u.x,
            u.y,
            u.size,
            u.d,
            u.sides,
            u.outerSides,
            u.outerSize,
            u.color,
            u.barrels,
            u.gadgets,
            u.layers
          );
        }
        for (var s = 0; s < r.tanks.length; s++) {
          var c = r.tanks[s];
          c.y *= -1;
          c.lastColor = c.color;
          f258(c);
          c.y *= -1;
        }
        for (var f = 0; f < r.polygons.length; f++) {
          var l = r.polygons[f];
          f255(l.x, l.y, l.level, l.d);
        }
        (function () {
          A.forEach(function (e) {
            if (H(e) && e.below) {
              f252(e);
            }
          });
          A.forEach(function (e) {
            if (H(e) && !e.below) {
              f252(e);
            }
          });
          W = N.getContext("2d");
          if (z.visual.darkness) {
            var e = B.width / 2 - U / G;
            var t = B.height / 2 - F / G;
            W.globalAlpha = 1;
            W.fillStyle = z.visual.darkness.color;
            W.fillRect(0, 0, N.width, N.height);
            var n =
              z.visual.darkness.intensity *
              (1 + Math.sin(performance.now() / 1000) * 0.1);
            A.forEach(function (r) {
              if (H(r) && r.radiant > 0) {
                (function (e, t, n, r) {
                  f268(
                    e + r.x / G,
                    t + r.y / G,
                    r.d,
                    Math.max(r.size, (r.size * 1.2) / n) / G,
                    r.sides,
                    r.transparency *
                      f251(r.lifetime, r.maxLifetime) *
                      (1 - 1 / (r.radiant + 0.5))
                  );
                })(e, t, n, r);
              }
            });
            if (z.visual.lights) {
              z.visual.lights.forEach(function (r) {
                f268(
                  e + r.x / G,
                  t + r.y / G,
                  r.d,
                  r.size / n / G,
                  r.sides,
                  r.transparency
                );
                f268(
                  e + r.x / G,
                  t + r.y / G,
                  r.d,
                  (r.size * 1.5) / n / G,
                  r.sides,
                  r.transparency * 0.2
                );
              });
            }
          } else {
            W.clearRect(0, 0, N.width, N.height);
          }
        })();
        W = B.getContext("2d");
      } catch (e) {
        console.error(e);
      } finally {
        setTimeout(Z, 1);
      }
    }
    function Z() {
      requestAnimationFrame(function () {
        K();
      });
    }
    var V = 1;
    function q() {
      V = Math.max(1, 800 / Math.min(window.innerWidth, window.innerHeight));
      B.width = V * window.innerWidth;
      B.height = V * window.innerHeight;
      N.width = B.width;
      N.height = B.height;
      Math.min(B.height, B.width) / 100;
    }
    function H(e, t = 1) {
      var n = Math.max(Math.abs(U - e.x), Math.abs(F - e.y));
      return X / 2 > n - e.size * t;
    }
    window.addEventListener(
      "resize",
      Object(r.debounce)(40, function () {
        q();
      })
    );
    var J = false;
    var Q = "#ff0000";
    function f242(e, t, n) {
      var r = e;
      if (n > 0) {
        if (!J) {
          Q = [
            (1 + Math.sin(D / 500)) * 128,
            (1 + Math.sin(D / 500 + Math.PI * (1 / 3))) * 128,
            (1 + Math.sin(D / 500 + Math.PI * (2 / 3))) * 128,
          ];
        }
        r = f246(r.substr(1), f249(Q).substr(1), 0.5 / n);
      }
      if (t) {
        r = f247(r, Math.round(Math.abs(Math.sin(D / 50)) * 30));
      }
      return r;
    }
    function f243(e, t, n) {
      if (t != null) {
        return f244(t, t);
      }
      switch (e) {
        case 0:
          return i.POLYGON_COLORS[1];
        case 1:
          return i.POLYGON_COLORS[4];
        case 3:
          return i.POLYGON_COLORS[0];
        case 4:
          return i.POLYGON_COLORS[5];
        default:
          return n;
      }
    }
    function f244(e, t, n, r) {
      var o;
      switch (t) {
        default:
          o = t <= 0 && n == r ? i.TEAM_COLORS[0] : i.TEAM_COLORS[1];
          break;
        case -1:
          o = L.FALLEN_COLOR;
          break;
        case 1:
          o = i.POLYGON_COLORS[1];
          break;
        case 2:
          o = L.CELESTIAL_COLOR;
          break;
        case 3:
          o = i.BARREL_COLOR;
          break;
        case 4:
          o = L.POLYGON_COLORS[0];
          break;
        case 5:
          o = "#000000";
          break;
        case 6:
          o = "#ffffff";
          break;
        case 7:
          o = i.SPIKE_COLOR;
          break;
        case 10:
          o = i.TEAM_COLORS[0];
          break;
        case 11:
          o = i.TEAM_COLORS[1];
          break;
        case 12:
          o = i.TEAM_COLORS[2];
          break;
        case 13:
          o = i.TEAM_COLORS[3];
          break;
        case 20:
          o = i.POLYGON_COLORS[0];
          break;
        case 21:
          o = i.POLYGON_COLORS[1];
          break;
        case 22:
          o = i.POLYGON_COLORS[2];
          break;
        case 23:
          o = i.POLYGON_COLORS[3];
          break;
        case 24:
          o = i.POLYGON_COLORS[4];
          break;
        case 25:
          o = i.POLYGON_COLORS[5];
          break;
        case 26:
          o = i.POLYGON_COLORS[6];
          break;
        case 27:
          o = i.POLYGON_COLORS[7];
          break;
        case 28:
          o = i.POLYGON_COLORS[8];
          break;
        case 29:
          o = i.POLYGON_COLORS[9];
          break;
        case 30:
          o = i.POLYGON_COLORS[10];
      }
      return o;
    }
    var vO5 = {};
    function f245(e) {
      vO5[e] ||= f247(e, i.STROKE_SHADE);
      return vO5[e];
    }
    function f246(e, t, n = 0.25) {
      function r(e) {
        return e.toString(16);
      }
      function i(e) {
        return parseInt(e, 16);
      }
      var o = "#";
      for (var a = 0; a <= 5; a += 2) {
        var u = i(e.substr(a, 2));
        var s = i(t.substr(a, 2));
        for (var c = r(Math.floor(s + (u - s) * n)); c.length < 2; ) {
          c = "0" + c;
        }
        o += c;
      }
      return o;
    }
    function f247(e, t) {
      return (
        "#" +
        e.replace(/^#/, "").replace(/../g, function (e) {
          return (
            "0" + Math.min(255, Math.max(0, parseInt(e, 16) + t)).toString(16)
          ).substr(-2);
        })
      );
    }
    function f248(e) {
      var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
      if (t) {
        return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)];
      } else {
        return null;
      }
    }
    function f249(e) {
      return (
        "#" +
        (16777216 + (e[0] << 16) + (e[1] << 8) + e[2]).toString(16).slice(1)
      );
    }
    function f250(e, t, n) {
      if (arguments.length < 3) {
        n = 0.5;
      }
      var r = e.slice();
      for (var i = 0; i < 3; i++) {
        r[i] = Math.round(r[i] + n * (t[i] - e[i]));
      }
      return r;
    }
    function f251(e, t, n = 20) {
      var r = 1;
      var i = (t /= 60) - e;
      if (i < (n /= 60)) {
        r = i / n;
      } else if (i > t - n) {
        r = 1 - (i - (t - n)) / n;
      }
      return r;
    }
    var v103 = false;
    function f252(e) {
      var t = f242(e.color, false, e.radiant);
      var n = e.size;
      W.globalAlpha = e.transparency * f251(e.lifetime, e.maxLifetime);
      f253(e.x, e.y, n, t, e.sides, e.d, true);
      W.globalAlpha = 1;
    }
    function f253(e, t, n, r, i, o, a, u = 1, s) {
      if (s == null) {
        s = n / 2;
      }
      var c;
      var f;
      var l = a ? G : 1;
      if (a) {
        c = B.width / 2 + (e - U) / l;
        f = B.height / 2 + (t - F) / l;
      } else {
        c = e;
        f = t;
      }
      if (i == 0) {
        f264(c, f, n / l, r, f245(r), (u * L.STROKE_SIZE) / l);
      } else if (i > 0) {
        f267(c, f, n / l, i, r, f245(r), (u * L.STROKE_SIZE) / l, o);
      } else {
        f266(c, f, n / l, s / l, -i, r, f245(r), (u * L.STROKE_SIZE) / l, o);
      }
      W.setTransform(1, 0, 0, 1, 0, 0);
    }
    var vA2 = [];
    function f254(e, t, n, r, o, a, u, s, c, f = 1, l = 0, d = 1, h = false) {
      if (A.length < i.MAX_PARTICLES) {
        A.push({
          x: e,
          y: t,
          xVel: n,
          yVel: r,
          size: o,
          d: a,
          sides: u,
          color: s,
          lifetime: c / 60,
          maxLifetime: c,
          transparency: f,
          radiant: l,
          friction: d,
          below: h,
        });
      }
    }
    function f255(e, t, n, r) {
      var i = e;
      var o = -t;
      var a = L.POLYGON_COLORS[n];
      var u = 20;
      for (var s = 0; s < n; s++) {
        u *= 1.5;
      }
      f253(i, o, u, a, 3 + n, r, true);
    }
    function f256(e, t, n, r, i, o, a, u, s, c = [], f = []) {
      var l = e;
      var d = -t;
      if (a > 0) {
        f253(l, d, n + a * n, L.SPIKE_COLOR, o, r, true, 1, n);
      }
      f262(l, d, n, r, s, true);
      f253(l, d, n, u, i, r, true);
      f257(l, d, r, n, u, f, 0, 0, false, true);
      f260(l, d, n, r, c, u, true);
    }
    function f257(e, t, n, r, i, o, a, u, s) {
      var c =
        !(arguments.length > 9) || arguments[9] === undefined || arguments[9];
      var f =
        arguments.length > 10 && arguments[10] !== undefined
          ? arguments[10]
          : 1;
      for (var l = 0; l < o.length; l++) {
        var d = o[l];
        var h = i;
        if (d.hasOwnProperty("team")) {
          h = f247(f242(f244(d.team, d.team, 0, 0), s, u), a);
        }
        d.offsetX ||= 0;
        d.offsetY ||= 0;
        var v = n + (d.rot || 0);
        var g =
          e +
          (d.offsetX * Math.sin(1.57079633 - n) +
            d.offsetY * Math.cos(n + 1.57079633)) *
            r;
        var p =
          t +
          (d.offsetY * Math.cos(n) + d.offsetX * Math.sin(-n + Math.PI)) * r;
        if (d.outerSize > 0) {
          f253(
            g,
            p,
            (d.size + d.outerSize) * r,
            d.selected
              ? f246(
                  L.SPIKE_COLOR.substr(1),
                  "ffffff",
                  0.2 + ((1 + Math.sin(performance.now() / 250)) / 2) * 0.8
                )
              : L.SPIKE_COLOR,
            d.outerSides,
            v,
            c,
            f,
            d.size * r
          );
        }
        f253(
          g,
          p,
          d.size * r,
          d.selected
            ? f246(
                h.substr(1),
                "ffffff",
                0.2 + ((1 + Math.sin(performance.now() / 250)) / 2) * 0.8
              )
            : h,
          d.sides,
          v,
          c,
          f
        );
        if (v103 && k) {
          var y =
            e + (-d.offsetY * Math.sin(n) + d.offsetX * Math.sin(n + v104)) * r;
          var m =
            t - (d.offsetX * Math.cos(n + v104) + -d.offsetY * Math.cos(n)) * r;
          var _ = {
            x: B.width / 2 + (y - U) / G,
            y: B.height / 2 + (m - F) / G,
            r: ((d.size + d.outerSize) * r) / G,
            rot: n,
          };
          if (isInsideCircle(undefined, _)) {
            C.push({
              type: "layer",
              index: l,
            });
          }
        }
      }
    }
    function f258(e) {
      var t =
        !(arguments.length > 1) || arguments[1] === undefined || arguments[1];
      if (e.gadgets) {
        var r = e.size * (1 + (1 - (e.fadeTime || 1)) * 0.5);
        var i = e.lastColor ?? "#ffffff";
        var o = Math.min(e.fadeTime || 1, 1);
        for (var a = 0; a < e.gadgets.length; a++) {
          var u = e.gadgets[a];
          if (u.type == 2 && u.alpha != 0) {
            W.globalAlpha = o * (u.alpha || 0.3);
            f259(
              e.x,
              e.y,
              u.offsetX,
              u.offsetY,
              u.subtype,
              u.auraColor,
              u.rotationType,
              e.d,
              u.rot,
              r,
              u.sides,
              u.radius,
              i,
              u.alpha,
              t && u.showParticles == 0
            );
          }
        }
        W.globalAlpha = 1;
      }
    }
    function f259(e, t, n, r, i, o, a, u, s, c, f, l, d, h) {
      var v =
        !(arguments.length > 14) ||
        arguments[14] === undefined ||
        arguments[14];
      var g = f243(i, o, d);
      var p = B.width / 2 + (e - U) / G;
      var y = B.height / 2 + (t - F) / G;
      if (v && Math.random() < 1 / (300 / (c * l))) {
        var m = Math.random() * Math.PI * 2;
        var _ = Math.random() * (c * l);
        f254(
          e +
            _ * Math.sin(m) +
            (n * Math.sin(1.57079633 - u) + r * Math.cos(u + 1.57079633)) * c,
          t +
            _ * Math.cos(m) +
            (r * Math.cos(u) + n * Math.sin(-u + Math.PI)) * c,
          Math.random() * 1 - 0.5,
          Math.random() * 1 - 0.5,
          6,
          Math.random() * Math.PI * 2,
          f,
          g,
          30,
          h
        );
      }
      W.translate(p, y);
      W.rotate(u);
      W.translate(-p, -y);
      f253(e + n * c, t + r * c, c * l, g, f, (a == 0 ? 0 : -u) + s, true);
    }
    function f260(e, t, n, r, i, o, a, u = 1) {
      for (var s = 0; s < i.length; s++) {
        var c = i[s];
        f261(s, e, t, n, r, c, o, a, u);
      }
    }
    function f261(e, t, n, r, o, a, u, s) {
      var c;
      var f;
      var l =
        arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 1;
      var d = s ? G : 1;
      var h = a.width * (1.5 - Math.max(0, a.animTime || 0) * 0.8) * r;
      var v = a.length * (1 - Math.max(0, a.animTime || 0) * 0.2);
      if (s) {
        c = B.width / 2 + (t - U) / d;
        f = B.height / 2 + (n - F) / d;
      } else {
        c = t;
        f = n;
      }
      var g = a.color == null ? i.BARREL_COLOR : f244(a.color, a.color);
      W.lineJoin = "round";
      W.fillStyle = a.selected
        ? f246(
            g.substr(1),
            "ffffff",
            0.2 + ((1 + Math.sin(performance.now() / 250)) / 2) * 0.8
          )
        : g;
      W.lineWidth = (l * L.STROKE_SIZE) / d;
      W.strokeStyle = f245(W.fillStyle);
      W.beginPath();
      W.translate(c, f);
      W.rotate(o);
      W.translate((a.offsetX * r) / d, (a.offsetY * r) / d);
      switch (a.type) {
        case 0:
          W.rotate(-o);
          W.rotate(a.rot);
          W.rect(
            (a.width * -1 * r) / d,
            (v * -2 * r) / d,
            (a.width * r * 2) / d,
            (r * 2 * v) / d
          );
      }
      W.fill();
      W.stroke();
      switch (a.type) {
        case 0:
          f264(
            0,
            0,
            (a.width * 1.5 * r) / d,
            W.fillStyle,
            W.strokeStyle,
            (l * L.STROKE_SIZE) / d
          );
          break;
        case 1:
          W.rotate(a.rot);
          W.beginPath();
          W.rect((h / d) * -0.5, (h / d) * -0.5, h / d, h / d);
          W.fill();
          W.stroke();
          break;
        case 2:
          W.setTransform(1, 0, 0, 1, 0, 0);
          W.translate(c, f);
          W.rotate(o);
          W.translate(-c, -f);
          f253(
            t + a.offsetX * r,
            n + a.offsetY * r,
            a.width * r,
            W.fillStyle,
            a.backSides,
            a.rot,
            s,
            l
          );
          W.translate(c, f);
          W.rotate(o);
          W.translate(-c, -f);
          f253(
            t + a.offsetX * r,
            n + a.offsetY * r,
            a.width * r * 0.5,
            f243(a.subtype, a.auraColor, u),
            a.sides,
            (a.rotationType == 0 ? 0 : -o) + a.rot,
            s,
            l
          );
      }
      if (v103 && k) {
        var p =
          t + (-a.offsetY * Math.sin(o) + a.offsetX * Math.sin(o + v104)) * r;
        var y =
          n - (a.offsetX * Math.cos(o + v104) + -a.offsetY * Math.cos(o)) * r;
        var m = {
          x: B.width / 2 + (p - U) / G,
          y: B.height / 2 + (y - F) / G,
          r: (a.width * r * (a.type == 0 ? 1.5 : 1)) / G,
        };
        if (isInsideCircle(undefined, m)) {
          C.push({
            type: "gadget",
            index: e,
          });
        }
      }
      W.setTransform(1, 0, 0, 1, 0, 0);
    }
    function f262(e, t, n, r, i, o, a = 1) {
      for (var u = 0; u < i.length; u++) {
        var s = i[u];
        f263(
          u,
          e,
          t,
          n,
          r + s.rot,
          s.offset,
          s.distance,
          s.width,
          s.length,
          s.animTime,
          s.visualType == null ? s.type : s.visualType,
          o,
          a,
          s.selected,
          s.color
        );
      }
    }
    var v104 = Math.PI / 2;
    function f263(e, t, n, r, o, a, u, s, c, f, l, d) {
      var h;
      var v;
      var g =
        arguments.length > 12 && arguments[12] !== undefined
          ? arguments[12]
          : 1;
      var p = arguments.length > 13 ? arguments[13] : undefined;
      var y = arguments.length > 14 ? arguments[14] : undefined;
      var m = d ? G : 1;
      var _ = c * (1 - Math.max(0, f || 0) * 0.2);
      if (d) {
        h = B.width / 2 + (t - U) / m;
        v = B.height / 2 + (n - F) / m;
      } else {
        h = t;
        v = n;
      }
      var b = y == null ? i.BARREL_COLOR : f244(0, y);
      W.lineJoin = "round";
      W.fillStyle = p
        ? f246(
            b.substr(1),
            "ffffff",
            0.2 + ((1 + Math.sin(performance.now() / 250)) / 2) * 0.8
          )
        : b;
      W.lineWidth = (g * L.STROKE_SIZE) / m;
      W.strokeStyle = f245(W.fillStyle);
      W.beginPath();
      W.translate(h, v);
      W.rotate(o);
      W.translate((a * r) / m, (-u * r) / m);
      switch (l) {
        case 0:
          W.rect(
            (s * -1 * r) / m,
            (_ * -2 * r) / m,
            (s * r * 2) / m,
            (r * 2 * _) / m
          );
          break;
        case 1:
          f265(
            (s * -1 * r) / m,
            0 / m,
            (s * r * 2) / m,
            (r * -2 * _) / m,
            (s * r) / m
          );
          break;
        case 2:
          W.rect(
            (s * -0.5 * r) / m,
            (_ * -1.5 * r) / m,
            (s * r) / m,
            (r * 1.5 * _) / m
          );
          W.fill();
          W.stroke();
          f265(
            (s * -1 * r) / m,
            (r * -1.5 * _) / m,
            (s * r * 2) / m,
            (r * -2 * _) / m,
            (s * r) / m
          );
          break;
        case 3:
          W.rect(
            (-s * r) / m,
            (_ * -1.33333333333 * r) / m,
            (s * r * 2) / m,
            (r * 1.33333333333 * _) / m
          );
          W.fill();
          W.stroke();
          W.rect(
            (s * -0.7 * r) / m,
            (_ * -1.3333333333 * r) / m,
            (s * 1.4 * r) / m,
            (r * -0.3333333333 * _) / m
          );
          W.fill();
          W.stroke();
          W.rect(
            (-s * r) / m,
            (_ * -1.66666666666666 * r) / m,
            (s * r * 2) / m,
            (r * -0.3333333333 * _) / m
          );
          W.fill();
          W.stroke();
          break;
        case 4:
          f265(
            (s * -1 * r) / m,
            0 / m,
            (s * r * 2) / m,
            (r * -1.3333333333 * _) / m,
            (s * r) / m
          );
          W.rect(
            (s * -0.7 * r) / m,
            (_ * -1.3333333333 * r) / m,
            (s * 1.4 * r) / m,
            (r * -0.3333333333 * _) / m
          );
          W.fill();
          W.stroke();
          f265(
            (s * -0.5 * r) / m,
            (_ * -1.66666666666666 * r) / m,
            (s * r) / m,
            (r * -2 * _) / m,
            (s * r * 2) / m
          );
          break;
        case 5:
          f265(
            (s * -1 * r) / m,
            0 / m,
            (s * r * 2) / m,
            (r * -1.3333333333 * _) / m,
            (s * r) / m
          );
          W.rect(
            (s * -0.7 * r) / m,
            (_ * -1.3333333333 * r) / m,
            (s * 1.4 * r) / m,
            (r * -0.3333333333 * _) / m
          );
          W.fill();
          W.stroke();
          f265(
            (s * -1 * r) / m,
            (_ * -1.66666666666666 * r) / m,
            (s * 2 * r) / m,
            (r * -2 * _) / m,
            (s * r) / m
          );
          break;
        case 6:
          f265(
            (s * -0.5 * r) / m,
            0 / m,
            (s * r * 1) / m,
            (r * -2 * _) / m,
            (s * r * 2) / m
          );
          break;
        case 7:
          W.rect(
            (-s * r) / m,
            (_ * -1.33333333333 * r) / m,
            (s * r * 2) / m,
            (r * 1.33333333333 * _) / m
          );
          W.fill();
          W.stroke();
          f265(
            (s * -1 * r) / m,
            (_ * -1.33333333333 * r) / m,
            (s * 2 * r) / m,
            (r * -1.6666666666666 * _) / m,
            (s * r) / m
          );
          W.rect(
            (-s * r) / m,
            (_ * -1.66666666666666 * r) / m,
            (s * r * 2) / m,
            (r * -0.3333333333 * _) / m
          );
          W.fill();
          W.stroke();
          break;
        case 8:
          W.rect(
            (s * -0.5 * r) / m,
            (_ * -1.33333333333 * r) / m,
            (s * r) / m,
            (r * 1.33333333333 * _) / m
          );
          W.fill();
          W.stroke();
          f265(
            (s * -1 * r) / m,
            (_ * -1.33333333333 * r) / m,
            (s * 2 * r) / m,
            (r * -1.6666666666666 * _) / m,
            (s * r) / m
          );
          W.rect(
            (-s * r) / m,
            (_ * -1.66666666666666 * r) / m,
            (s * r * 2) / m,
            (r * -0.3333333333 * _) / m
          );
          W.fill();
          W.stroke();
          break;
        case 9:
          f265(
            (s * -0.5 * r) / m,
            0 / m,
            (s * r) / m,
            (r * -1.3333333333 * _) / m,
            (s * r * 2) / m
          );
          W.fill();
          W.stroke();
          W.rect(
            (s * -0.6666666666666 * r) / m,
            (_ * -1.3333333333 * r) / m,
            (s * 1.3333333333 * r) / m,
            (r * -0.3333333333 * _) / m
          );
          W.fill();
          W.stroke();
          f265(
            (s * -1 * r) / m,
            (_ * -1.66666666666666 * r) / m,
            (s * 2 * r) / m,
            (r * -2 * _) / m,
            (s * r) / m
          );
      }
      W.fill();
      W.stroke();
      W.setTransform(1, 0, 0, 1, 0, 0);
      if (v103 && k) {
        var w = _;
        var O = u + w;
        var R = a;
        var x = t + (O * Math.sin(o) + R * Math.sin(o + v104)) * r;
        var T = n - (R * Math.cos(o + v104) + O * Math.cos(o)) * r;
        var j = s * r * 2;
        var S = w * r * 2;
        var M = {
          x: B.width / 2 + (x - U) / m,
          y: B.height / 2 + (T - F) / m,
          height: S / m,
          width: j / m,
          rot: o,
        };
        if (isInsideRotated(undefined, M)) {
          C.push({
            type: "barrel",
            index: e,
          });
        }
      }
    }
    function f264(e, t, n, r, i, o) {
      W.lineJoin = "round";
      W.beginPath();
      W.arc(e, t, n, 0, Math.PI * 2, false);
      W.fillStyle = r;
      W.lineWidth = o;
      W.strokeStyle = i;
      W.fill();
      W.stroke();
    }
    function f265(e, t, n, r, i) {
      W.lineJoin = "round";
      W.beginPath();
      W.moveTo(e + (n - i) / 2, t);
      W.lineTo(e + n - (n - i) / 2, t);
      W.lineTo(e + n, r);
      W.lineTo(e, r);
      W.closePath();
    }
    function f266(e, t, n, r, i, o, a, u, s) {
      W.lineJoin = "round";
      W.beginPath();
      W.translate(e, t);
      W.rotate(s);
      if (i % 2 != 0) {
        W.rotate((Math.PI * -90) / 180);
      }
      W.moveTo(n * Math.cos(0), n * Math.sin(0));
      W.lineTo(
        r * Math.cos((Math.PI * 1) / i),
        r * Math.sin((Math.PI * 1) / i)
      );
      for (var c = 1; c <= i; c += 1) {
        W.lineTo(
          n * Math.cos((c * 2 * Math.PI) / i),
          n * Math.sin((c * 2 * Math.PI) / i)
        );
        W.lineTo(
          r * Math.cos(((c + 0.5) * 2 * Math.PI) / i),
          r * Math.sin(((c + 0.5) * 2 * Math.PI) / i)
        );
      }
      W.fillStyle = o;
      W.lineWidth = u;
      W.strokeStyle = a;
      W.fill();
      W.stroke();
    }
    function f267(e, t, n, r, i, o, a, u) {
      W.lineJoin = "round";
      W.beginPath();
      W.translate(e, t);
      W.rotate(u);
      if (r % 2 != 0) {
        W.rotate((Math.PI * -90) / 180);
      }
      W.moveTo(n * Math.cos(0), n * Math.sin(0));
      for (var s = 1; s <= r + 1; s += 1) {
        W.lineTo(
          n * Math.cos((s * 2 * Math.PI) / r),
          n * Math.sin((s * 2 * Math.PI) / r)
        );
      }
      W.fillStyle = i;
      W.fill();
      W.lineWidth = a;
      W.strokeStyle = o;
      W.stroke();
    }
    function f268(e, t, n, r, i, o) {
      if (i == 0) {
        (function (e, t, n, r) {
          var i = W.globalAlpha;
          W.globalAlpha = r;
          W.globalCompositeOperation = "destination-out";
          W.beginPath();
          W.arc(e, t, n, 0, Math.PI * 2, true);
          W.fill();
          W.globalCompositeOperation = "source-over";
          W.globalAlpha = i;
        })(e, t, r, o);
      } else if (i > 0) {
        (function (e, t, n, r, i, o) {
          var a = W.globalAlpha;
          W.globalAlpha = o;
          W.globalCompositeOperation = "destination-out";
          W.beginPath();
          W.translate(e, t);
          W.rotate(n);
          if (i % 2 != 0) {
            W.rotate((Math.PI * -90) / 180);
          }
          W.moveTo(r * Math.cos(0), r * Math.sin(0));
          for (var u = 1; u <= i + 1; u += 1) {
            W.lineTo(
              r * Math.cos((u * 2 * Math.PI) / i),
              r * Math.sin((u * 2 * Math.PI) / i)
            );
          }
          W.fill();
          W.setTransform(1, 0, 0, 1, 0, 0);
          W.globalCompositeOperation = "source-over";
          W.globalAlpha = a;
        })(e, t, n, r, i, o);
      } else {
        (function (e, t, n, r, i, o, a) {
          var u = W.globalAlpha;
          W.globalAlpha = a;
          W.globalCompositeOperation = "destination-out";
          W.beginPath();
          W.translate(e, t);
          W.rotate(n);
          if (i % 2 != 0) {
            W.rotate((Math.PI * -90) / 180);
          }
          W.moveTo(r * Math.cos(0), r * Math.sin(0));
          W.lineTo(
            o * Math.cos((Math.PI * 1) / i),
            o * Math.sin((Math.PI * 1) / i)
          );
          for (var s = 1; s <= i; s += 1) {
            W.lineTo(
              r * Math.cos((s * 2 * Math.PI) / i),
              r * Math.sin((s * 2 * Math.PI) / i)
            );
            W.lineTo(
              o * Math.cos(((s + 0.5) * 2 * Math.PI) / i),
              o * Math.sin(((s + 0.5) * 2 * Math.PI) / i)
            );
          }
          W.fill();
          W.setTransform(1, 0, 0, 1, 0, 0);
          W.globalCompositeOperation = "source-over";
          W.globalAlpha = u;
        })(e, t, n, r, -i, r / 2, o);
      }
    }
    function f269(e, t) {
      return Math.random() * (t - e) + e;
    }
    n(8);
    n(9);
    n(2);
    function f270(e, t) {
      var n =
        (typeof Symbol != "undefined" && e[Symbol.iterator]) || e["@@iterator"];
      if (!n) {
        if (
          Array.isArray(e) ||
          (n = f274(e)) ||
          (t && e && typeof e.length == "number")
        ) {
          if (n) {
            e = n;
          }
          var r = 0;
          function i() {}
          return {
            s: i,
            n: function () {
              if (r >= e.length) {
                return {
                  done: true,
                };
              } else {
                return {
                  done: false,
                  value: e[r++],
                };
              }
            },
            e: function (e) {
              throw e;
            },
            f: i,
          };
        }
        throw new TypeError(
          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      }
      var o;
      var a = true;
      var u = false;
      return {
        s: function () {
          n = n.call(e);
        },
        n: function () {
          var e = n.next();
          a = e.done;
          return e;
        },
        e: function (e) {
          u = true;
          o = e;
        },
        f: function () {
          try {
            if (!a && n.return != null) {
              n.return();
            }
          } finally {
            if (u) {
              throw o;
            }
          }
        },
      };
    }
    function f271(e, t, n, r, i, o, a) {
      try {
        var u = e[o](a);
        var s = u.value;
      } catch (e) {
        n(e);
        return;
      }
      if (u.done) {
        t(s);
      } else {
        Promise.resolve(s).then(r, i);
      }
    }
    function f272(e) {
      return function () {
        var t = this;
        var n = arguments;
        return new Promise(function (r, i) {
          var o = e.apply(t, n);
          function a(e) {
            f271(o, r, i, a, u, "next", e);
          }
          function u(e) {
            f271(o, r, i, a, u, "throw", e);
          }
          a(undefined);
        });
      };
    }
    function f273(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) {
            return e;
          }
        })(e) ||
        (function (e, t) {
          var n =
            e == null
              ? null
              : (typeof Symbol != "undefined" && e[Symbol.iterator]) ||
                e["@@iterator"];
          if (n == null) {
            return;
          }
          var r;
          var i;
          var o = [];
          var a = true;
          var u = false;
          try {
            for (
              n = n.call(e);
              !(a = (r = n.next()).done) &&
              (o.push(r.value), !t || o.length !== t);
              a = true
            );
          } catch (e) {
            u = true;
            i = e;
          } finally {
            try {
              if (!a && n.return != null) {
                n.return();
              }
            } finally {
              if (u) {
                throw i;
              }
            }
          }
          return o;
        })(e, t) ||
        f274(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function f274(e, t) {
      if (e) {
        if (typeof e == "string") {
          return f275(e, t);
        }
        var n = Object.prototype.toString.call(e).slice(8, -1);
        if (n === "Object" && e.constructor) {
          n = e.constructor.name;
        }
        if (n === "Map" || n === "Set") {
          return Array.from(e);
        } else if (
          n === "Arguments" ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        ) {
          return f275(e, t);
        } else {
          return undefined;
        }
      }
    }
    function f275(e, t) {
      if (t == null || t > e.length) {
        t = e.length;
      }
      for (var n = 0, r = new Array(t); n < t; n++) {
        r[n] = e[n];
      }
      return r;
    }
    var v105 = document.getElementById("hub-server-list");
    var v106 = document.getElementById("create-server-region");
    var v107 = document.getElementById("create-server-gamemode");
    var v108 = document.getElementById("create-server-count");
    var v109 = document.getElementById("create-server-button");
    var v110 = document.getElementById("create-server-modal");
    document.getElementById("refresh-servers-button");
    var v111 = document.getElementById("cancel-add-server-button");
    function f276() {
      var e = i.GAMEMODES[v107.value];
      var t = i.REGIONS.find(function (e) {
        return e.id === v106.value;
      });
      var n = Math.max(1, v108.value);
      v109.innerText = `CREATE ${n} ${t.id} ${e.id.toUpperCase()} SERVER${
        n != 1 ? "S" : ""
      }`;
    }
    Object.entries(i.GAMEMODES).forEach(function (e) {
      var t = f273(e, 2);
      var n = t[0];
      var r = t[1];
      var i = Object(o.addChild)(v107, "option");
      i.value = n;
      i.innerText = r.name;
    });
    i.REGIONS.forEach(function (e) {
      var t = Object(o.addChild)(v106, "option");
      t.value = e.id;
      t.innerText = e.name;
    });
    v108.onchange = f276;
    v107.onchange = f276;
    v106.onchange = f276;
    var vLS = "";
    v111.onclick = function () {
      v110.classList.add("hide");
    };
    v109.onclick = f272(
      regeneratorRuntime.mark(function e() {
        var t;
        var n;
        var r;
        return regeneratorRuntime.wrap(function (e) {
          while (true) {
            switch ((e.prev = e.next)) {
              case 0:
                v110.classList.add("hide");
                t = v107.value;
                n = v106.value;
                r = Math.max(1, v108.value);
                e.next = 6;
                return f292(t, n, r, vLS);
              case 6:
                f277();
              case 7:
              case "end":
                return e.stop();
            }
          }
        }, e);
      })
    );
    var v112 = false;
    var v113 = null;
    function f277() {
      return f278.apply(this, arguments);
    }
    function f278() {
      return (f278 = f272(
        regeneratorRuntime.mark(function e() {
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch ((e.prev = e.next)) {
                case 0:
                  if (v112) {
                    e.next = 11;
                    break;
                  }
                  v112 = true;
                  e.t0 = f279;
                  e.next = 5;
                  return f290();
                case 5:
                  e.t1 = e.sent;
                  (0, e.t0)(e.t1);
                  v112 = false;
                  f280();
                  if (v113) {
                    clearInterval(v113);
                  }
                  v113 = setTimeout(function () {
                    f277();
                  }, 2000);
                case 11:
                case "end":
                  return e.stop();
              }
            }
          }, e);
        })
      )).apply(this, arguments);
    }
    f276();
    var vO6 = {};
    var vA3 = [];
    var vA4 = [];
    function f279() {
      vA3 = arguments[0].servers;
      vA4 = arguments[0].hubServers;
    }
    function f280() {
      Object(o.removeAllChildren)(v105);
      var e;
      var t = f270(vA4);
      try {
        function n() {
          var a = e.value;
          var u = Object(o.addChild)(v105, "div", ["hub-server"]);
          Object(o.addChild)(u, "h1", [
            "hub-server-name",
          ]).innerHTML = `<a href="https://${a.name}/" target="_blank">${
            a.name
          }</a> - ${a.version ?? "-"} - ${a.players ?? "-"}:${
            a.spectators ?? "-"
          }`;
          var s = Object(o.addChild)(
            Object(o.addChild)(u, "table", ["server-list", "unselectable"]),
            "tbody"
          );
          var c = Object(o.addChild)(s, "tr");
          ["", "Address", "Version", "Gamemode", "Region", "Players"].forEach(
            function (e) {
              Object(o.addChild)(c, "th").innerText = e;
            }
          );
          [
            [
              "restart",
              function () {
                f277();
              },
            ],
            [
              "update",
              function () {
                f296(a);
              },
            ],
            [
              "add",
              function () {
                vLS = a.name;
                v110.classList.remove("hide");
                f276();
              },
            ],
          ].forEach(function (e) {
            var t = f273(e, 2);
            var n = t[0];
            var r = t[1];
            var i = Object(o.addChild)(c, "th", ["server-list-button"]);
            i.innerHTML = vO7[n];
            i.onclick = r;
          });
          var f;
          var l = f270(
            vA3.filter(function (e) {
              return e.hub === a.name;
            })
          );
          try {
            function d() {
              var r = f.value;
              var a = Object(o.addChild)(s, "tr");
              var u = i.GAMEMODES[r.gamemode];
              for (
                var c = 0,
                  l = [
                    r.name,
                    r.version ?? "-",
                    u.name,
                    r.region,
                    `${r.players ?? "-"}:${r.spectators ?? "-"}`,
                  ];
                c < l.length;
                c++
              ) {
                var d = l[c];
                a.insertCell().innerText = d;
              }
              var h = function () {
                var e = g[v];
                var t = a.insertCell();
                t.innerHTML = vO7[e];
                t.classList.add("server-list-button");
                t.onclick = f272(
                  regeneratorRuntime.mark(function n() {
                    return regeneratorRuntime.wrap(function (n) {
                      while (true) {
                        switch ((n.prev = n.next)) {
                          case 0:
                            n.t0 = e;
                            n.next = n.t0 === "delete" ? 3 : 11;
                            break;
                          case 3:
                            if (vO6[r.id]) {
                              n.next = 10;
                              break;
                            }
                            vO6[r.id] = true;
                            t.classList.add("disabled");
                            n.next = 8;
                            return f294(r.id);
                          case 8:
                            console.log(`Deleted server ${r.id}`);
                            f277();
                          case 10:
                            return n.abrupt("break", 11);
                          case 11:
                          case "end":
                            return n.stop();
                        }
                      }
                    }, n);
                  })
                );
                switch (e) {
                  case "delete":
                    if (
                      vO6[r.id] ||
                      ["updating", "closing", "loading"].includes(r.status)
                    ) {
                      t.classList.add("disabled");
                    }
                    break;
                  default:
                    t.classList.add("disabled");
                }
              };
              for (
                var v = 0, g = ["restart", "update", "delete", "edit"];
                v < g.length;
                v++
              ) {
                h();
              }
              var p = a.insertCell(0);
              var y = document.createElement("img");
              p.appendChild(y);
              p.classList.add("server-list-icon");
              p.classList.add("unselectable");
              switch (r.status) {
                case "offline":
                  y.src = "/assets/warning.gif";
                  break;
                case "loading":
                  y.src = "/assets/restarting.gif";
                  break;
                case "updating":
                  y.src = "/assets/updating.gif";
                  break;
                case "errored":
                  y.src = "/assets/warning.gif";
                  break;
                case "closing":
                  y.src = "/assets/deleting.gif";
                  break;
                default:
                  y.classList.add("hidden");
              }
            }
            for (l.s(); !(f = l.n()).done; ) {
              d();
            }
          } catch (e) {
            l.e(e);
          } finally {
            l.f();
          }
        }
        for (t.s(); !(e = t.n()).done; ) {
          n();
        }
      } catch (e) {
        t.e(e);
      } finally {
        t.f();
      }
    }
    function f281(e, t, n, r, i, o, a) {
      try {
        var u = e[o](a);
        var s = u.value;
      } catch (e) {
        n(e);
        return;
      }
      if (u.done) {
        t(s);
      } else {
        Promise.resolve(s).then(r, i);
      }
    }
    function f282(e) {
      return function () {
        var t = this;
        var n = arguments;
        return new Promise(function (r, i) {
          var o = e.apply(t, n);
          function a(e) {
            f281(o, r, i, a, u, "next", e);
          }
          function u(e) {
            f281(o, r, i, a, u, "throw", e);
          }
          a(undefined);
        });
      };
    }
    var v114;
    var v115 = document.getElementById("token-input");
    var v116 = document.getElementById("show-token");
    var v117 = document.getElementById("login-screen");
    var v118 = document.getElementById("log-in");
    var v119 = document.getElementById("login-loading");
    var v120 = document.getElementById("login-error");
    var v121 = document.getElementById("admin-panel");
    var vO7 = {
      restart:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440.982 440.983"><path d="M376.497 64.677c-86.055-86.16-225.66-86.246-311.821-.191-86.159 86.055-86.246 225.659-.19 311.822 86.053 86.157 225.661 86.243 311.821.188 86.16-86.052 86.246-225.659.19-311.819zM220.49 367.665c-81.199 0-147.26-66.062-147.26-147.259 0-25.983 6.87-51.536 19.87-73.894l-11.404-13.016a7.002 7.002 0 01-1.364-6.865 7.002 7.002 0 015.266-4.613l77.536-16.767a6.998 6.998 0 017.987 9.116l-22.781 79.086a6.997 6.997 0 01-11.89 2.36l-10.795-12.153c-4.537 11.709-6.838 24.07-6.838 36.744 0 56.062 45.61 101.672 101.673 101.673 56.063 0 101.673-45.609 101.673-101.674 0-53.487-41.782-98.056-95.121-101.464a6.997 6.997 0 01-6.552-6.984V80.313a7 7 0 017.345-6.989c37.723 1.861 72.93 18.004 99.137 45.45 26.298 27.542 40.779 63.634 40.779 101.63 0 81.199-66.063 147.261-147.261 147.261z"/></svg>',
      update:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 466.008 466.008"><path d="M397.763 68.245C353.754 24.236 295.241 0 233.004 0S112.254 24.236 68.245 68.245C24.236 112.254 0 170.767 0 233.004s24.236 120.75 68.245 164.759c44.009 44.009 102.521 68.245 164.759 68.245s120.75-24.236 164.759-68.245c44.009-44.009 68.245-102.521 68.245-164.759s-24.236-120.75-68.245-164.759zm-61.779 143.763a15 15 0 01-13.858 9.26h-38.473v127.596c0 8.284-6.716 15-15 15h-71.298c-8.284 0-15-6.716-15-15V221.268h-38.474a14.999 14.999 0 01-10.606-25.607l89.122-89.123a15 15 0 0121.212 0l89.122 89.123a14.998 14.998 0 013.253 16.347z"/></svg>',
      delete:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 459 459"><path d="M229.5 0C102.751 0 0 102.751 0 229.5S102.751 459 229.5 459 459 356.249 459 229.5 356.249 0 229.5 0zm77.605 271.629c9.797 9.797 9.797 25.68 0 35.477a25.007 25.007 0 01-17.738 7.347c-6.42 0-12.84-2.449-17.738-7.347L229.5 264.977l-42.128 42.129a25.007 25.007 0 01-17.738 7.347c-6.42 0-12.84-2.449-17.738-7.347-9.797-9.796-9.797-25.68 0-35.477l42.129-42.129-42.129-42.129c-9.797-9.797-9.797-25.68 0-35.477s25.68-9.797 35.477 0l42.128 42.129 42.128-42.129c9.797-9.797 25.68-9.797 35.477 0 9.797 9.796 9.797 25.68 0 35.477l-42.13 42.129 42.129 42.129z"/></svg>',
      edit: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330"><path d="M165 0C74.019 0 0 74.019 0 165s74.019 165 165 165 165-74.019 165-165S255.981 0 165 0zM85 190c-13.785 0-25-11.215-25-25s11.215-25 25-25 25 11.215 25 25-11.215 25-25 25zm80 0c-13.785 0-25-11.215-25-25s11.215-25 25-25 25 11.215 25 25-11.215 25-25 25zm80 0c-13.785 0-25-11.215-25-25s11.215-25 25-25 25 11.215 25 25-11.215 25-25 25z"/></svg>',
      loading:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100"><path d="M3.5 2a.502.502 0 00-.354.854L5.094 4.8C3.195 6.62 2 9.169 2 12c0 5.511 4.489 10 10 10s10-4.489 10-10c0-5.136-3.894-9.382-8.89-9.936a1 1 0 00-.1-.005 1 1 0 00-.12 1.994C16.893 4.496 20 7.872 20 12c0 4.43-3.57 8-8 8s-8-3.57-8-8c0-2.29.968-4.336 2.504-5.79l1.642 1.644A.5.5 0 009 7.5V3a1 1 0 00-1-1H3.5z"/></svg>',
      add: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300.003 300.003"><path d="M150 0C67.159 0 .001 67.159.001 150c0 82.838 67.157 150.003 149.997 150.003S300.002 232.838 300.002 150C300.002 67.159 232.839 0 150 0zm63.281 166.501h-48.27v50.469c-.003 8.463-6.863 15.323-15.328 15.323-8.468 0-15.328-6.86-15.328-15.328v-50.464H87.37c-8.466-.003-15.323-6.863-15.328-15.328 0-8.463 6.863-15.326 15.328-15.328l46.984.003V91.057c0-8.466 6.863-15.328 15.326-15.328 8.468 0 15.331 6.863 15.328 15.328l.003 44.787 48.265.005c8.466-.005 15.331 6.86 15.328 15.328.003 8.466-6.862 15.324-15.323 15.324z"/></svg>',
    };
    v116.onclick = function () {
      if (v116.checked) {
        v115.type = "text";
      } else {
        v115.type = "password";
      }
    };
    v118.onclick = function () {
      if (!v122) {
        f288();
      }
    };
    v115.onkeyup = function (e) {
      if ((e.key === "Enter" || e.keyCode === 13) && !v122) {
        f288();
      }
    };
    var v122 = false;
    function f283() {
      return (f283 = f282(
        regeneratorRuntime.mark(function e() {
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch ((e.prev = e.next)) {
                case 0:
                  K();
                  if (!(v114 = f301("sessionID"))) {
                    e.next = 11;
                    break;
                  }
                  e.next = 5;
                  return f284();
                case 5:
                  if (e.sent) {
                    e.next = 9;
                    break;
                  }
                  v114 = undefined;
                  f302("sessionID");
                  v117.classList.remove("hide");
                case 9:
                  e.next = 12;
                  break;
                case 11:
                  v117.classList.remove("hide");
                case 12:
                case "end":
                  return e.stop();
              }
            }
          }, e);
        })
      )).apply(this, arguments);
    }
    function f284() {
      return f285.apply(this, arguments);
    }
    function f285() {
      return (f285 = f282(
        regeneratorRuntime.mark(function e() {
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch ((e.prev = e.next)) {
                case 0:
                  return e.abrupt(
                    "return",
                    new Promise(
                      (function () {
                        var e = f282(
                          regeneratorRuntime.mark(function e(t) {
                            return regeneratorRuntime.wrap(function (e) {
                              while (true) {
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    e.next = 2;
                                    return f298(
                                      "/validatesession",
                                      {},
                                      true,
                                      false
                                    );
                                  case 2:
                                    if (e.sent.valid) {
                                      console.log("Validated Session");
                                      f286();
                                      t(true);
                                    } else {
                                      console.log("Invalid Session");
                                      t(false);
                                    }
                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                              }
                            }, e);
                          })
                        );
                        return function (t) {
                          return e.apply(this, arguments);
                        };
                      })()
                    )
                  );
                case 1:
                case "end":
                  return e.stop();
              }
            }
          }, e);
        })
      )).apply(this, arguments);
    }
    var vLN02 = 0;
    function f286() {
      return f287.apply(this, arguments);
    }
    function f287() {
      return (f287 = f282(
        regeneratorRuntime.mark(function e() {
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch ((e.prev = e.next)) {
                case 0:
                  e.next = 2;
                  return f277();
                case 2:
                  v121.classList.remove("hide");
                case 3:
                case "end":
                  return e.stop();
              }
            }
          }, e);
        })
      )).apply(this, arguments);
    }
    function f288() {
      return f289.apply(this, arguments);
    }
    function f289() {
      return (f289 = f282(
        regeneratorRuntime.mark(function e() {
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch ((e.prev = e.next)) {
                case 0:
                  return e.abrupt(
                    "return",
                    new Promise(
                      (function () {
                        var e = f282(
                          regeneratorRuntime.mark(function e(t) {
                            var n;
                            var r;
                            return regeneratorRuntime.wrap(function (e) {
                              while (true) {
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    if (!((n = v115.value.trim()).length < 1)) {
                                      e.next = 5;
                                      break;
                                    }
                                    v120.innerText = "Provide a token.";
                                    t(false);
                                    return e.abrupt("return");
                                  case 5:
                                    v119.classList.remove("hide");
                                    v122 = true;
                                    e.next = 9;
                                    return f298(
                                      "/token",
                                      {
                                        token: n,
                                      },
                                      false,
                                      false
                                    );
                                  case 9:
                                    r = e.sent;
                                    vLN02++;
                                    if (!r.sessionID) {
                                      e.next = 21;
                                      break;
                                    }
                                    console.log("Logged in");
                                    f300("sessionID", (v114 = r.sessionID), 10);
                                    v117.classList.add("hide");
                                    document
                                      .getElementById("create-server-modal")
                                      .classList.remove("hide");
                                    f284();
                                    t(true);
                                    return e.abrupt("return");
                                  case 21:
                                    if (r.error) {
                                      if (vLN02 > 4) {
                                        v120.innerHTML = r.error;
                                      } else {
                                        v120.innerText = "Invalid token.";
                                      }
                                    }
                                  case 22:
                                    v119.classList.add("hide");
                                    v122 = false;
                                    t(false);
                                  case 25:
                                  case "end":
                                    return e.stop();
                                }
                              }
                            }, e);
                          })
                        );
                        return function (t) {
                          return e.apply(this, arguments);
                        };
                      })()
                    )
                  );
                case 1:
                case "end":
                  return e.stop();
              }
            }
          }, e);
        })
      )).apply(this, arguments);
    }
    function f290() {
      return f291.apply(this, arguments);
    }
    function f291() {
      return (f291 = f282(
        regeneratorRuntime.mark(function e() {
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch ((e.prev = e.next)) {
                case 0:
                  return e.abrupt(
                    "return",
                    new Promise(
                      (function () {
                        var e = f282(
                          regeneratorRuntime.mark(function e(t) {
                            var n;
                            return regeneratorRuntime.wrap(function (e) {
                              while (true) {
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    e.next = 2;
                                    return f298("/getservers");
                                  case 2:
                                    if ((n = e.sent).error) {
                                      console.log("Invalid Session");
                                      t(false);
                                    } else {
                                      t({
                                        servers: n.servers,
                                        hubServers: n.hubServers,
                                      });
                                    }
                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                              }
                            }, e);
                          })
                        );
                        return function (t) {
                          return e.apply(this, arguments);
                        };
                      })()
                    )
                  );
                case 1:
                case "end":
                  return e.stop();
              }
            }
          }, e);
        })
      )).apply(this, arguments);
    }
    function f292(e, t, n, r) {
      return f293.apply(this, arguments);
    }
    function f293() {
      return (f293 = f282(
        regeneratorRuntime.mark(function e(t, n, r, i) {
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch ((e.prev = e.next)) {
                case 0:
                  return e.abrupt(
                    "return",
                    new Promise(
                      (function () {
                        var e = f282(
                          regeneratorRuntime.mark(function e(o) {
                            return regeneratorRuntime.wrap(function (e) {
                              while (true) {
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    e.next = 2;
                                    return f298("/createserver", {
                                      serverID: `hub-${Math.random().toString(36).slice(2, 6)}`,
                                      gamemode: t,
                                      region: n,
                                      count: r,
                                      hubServer: i,
                                    });
                                  case 2:
                                    if (e.sent.error) {
                                      console.log("Invalid Session");
                                      o(false);
                                    } else {
                                      o(true);
                                    }
                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                              }
                            }, e);
                          })
                        );
                        return function (t) {
                          return e.apply(this, arguments);
                        };
                      })()
                    )
                  );
                case 1:
                case "end":
                  return e.stop();
              }
            }
          }, e);
        })
      )).apply(this, arguments);
    }
    function f294(e) {
      return f295.apply(this, arguments);
    }
    function f295() {
      return (f295 = f282(
        regeneratorRuntime.mark(function e(t) {
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch ((e.prev = e.next)) {
                case 0:
                  return e.abrupt(
                    "return",
                    new Promise(
                      (function () {
                        var e = f282(
                          regeneratorRuntime.mark(function e(n) {
                            return regeneratorRuntime.wrap(function (e) {
                              while (true) {
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    e.next = 2;
                                    return f298("/deleteserver", {
                                      serverID: t,
                                    });
                                  case 2:
                                    if (e.sent.error) {
                                      console.log("Invalid Session");
                                      n(false);
                                    } else {
                                      n(true);
                                    }
                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                              }
                            }, e);
                          })
                        );
                        return function (t) {
                          return e.apply(this, arguments);
                        };
                      })()
                    )
                  );
                case 1:
                case "end":
                  return e.stop();
              }
            }
          }, e);
        })
      )).apply(this, arguments);
    }
    function f296(e) {
      return f297.apply(this, arguments);
    }
    function f297() {
      return (f297 = f282(
        regeneratorRuntime.mark(function e(t) {
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch ((e.prev = e.next)) {
                case 0:
                  return e.abrupt(
                    "return",
                    new Promise(
                      (function () {
                        var e = f282(
                          regeneratorRuntime.mark(function e(n) {
                            return regeneratorRuntime.wrap(function (e) {
                              while (true) {
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    e.next = 2;
                                    return f298(
                                      "/updatehubserver",
                                      { serverID: t.id },
                                      true,
                                      false
                                    );
                                  case 2:
                                    if (e.sent.error) {
                                      console.log("Invalid Session");
                                      n(false);
                                    } else {
                                      n(true);
                                    }
                                  case 4:
                                  case "end":
                                    return e.stop();
                                }
                              }
                            }, e);
                          })
                        );
                        return function (t) {
                          return e.apply(this, arguments);
                        };
                      })()
                    )
                  );
                case 1:
                case "end":
                  return e.stop();
              }
            }
          }, e);
        })
      )).apply(this, arguments);
    }
    function f298(e, t) {
      return f299.apply(this, arguments);
    }
    function f299() {
      return (f299 = f282(
        regeneratorRuntime.mark(function e(t, n) {
          var r;
          var i;
          var o = arguments;
          return regeneratorRuntime.wrap(function (e) {
            while (true) {
              switch ((e.prev = e.next)) {
                case 0:
                  r = !(o.length > 2) || o[2] === undefined || o[2];
                  i = !(o.length > 3) || o[3] === undefined || o[3];
                  return e.abrupt(
                    "return",
                    new Promise(function (e) {
                      n ||= {};
                      if (r) {
                        n.sessionID = v114;
                      }
                      fetch(
                        "https://wet-poolwater.glitch.me" + t,
                        {
                          method: "POST",
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(n),
                        }
                      )
                        .catch(function (t) {
                          console.error(t);
                          if (i) {
                            window.location.reload();
                          }
                          e({
                            error: "Failed to connect to server.",
                          });
                        })
                        .then(function (e) {
                          return e.json();
                        })
                        .then(function (t) {
                          if (t.error) {
                            console.error(t.error);
                            if (i) {
                              window.location.reload();
                            }
                          }
                          e(t);
                        });
                    })
                  );
                case 3:
                case "end":
                  return e.stop();
              }
            }
          }, e);
        })
      )).apply(this, arguments);
    }
    function f300(e, t, n) {
      var r = "";
      if (n) {
        var i = new Date();
        i.setTime(i.getTime() + n * 24 * 60 * 60 * 1000);
        r = "; expires=" + i.toUTCString();
      }
      document.cookie = e + "=" + (t || "") + r + "; path=/";
    }
    function f301(e) {
      var t = e + "=";
      for (var n = document.cookie.split(";"), r = 0; r < n.length; r++) {
        for (var i = n[r]; i.charAt(0) == " "; ) {
          i = i.substring(1, i.length);
        }
        if (i.indexOf(t) == 0) {
          return i.substring(t.length, i.length);
        }
      }
      return null;
    }
    function f302(e) {
      document.cookie = e + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
    (function () {
      f283.apply(this, arguments);
    })();
  },
]);
