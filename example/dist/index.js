// /Users/vincent/dokui-menu/example/node_modules/dokui-menu/dist/index.js
var mU = function({ items: E, maxRows: _ }) {
  const [v, s] = UJ.useState(0), [m, r] = UJ.useState(0), V = UJ.useCallback(() => {
    const T = E.length.valueOf();
    r((e) => Math.min(T - (_ ?? T), e + 1));
  }, [r, E, _]), L0 = UJ.useCallback(() => r((T) => Math.max(0, T - 1)), [r]);
  UJ.useEffect(() => {
    if (_) {
      if (v - m >= _)
        V();
      else if (v - m < 0)
        L0();
    }
  }, [v, m, _, L0, V]);
  const t = UJ.useCallback((T) => {
    const e = E.length.valueOf();
    s(Math.max(0, Math.min(T, e - 1)));
  }, [s, E]), i = UJ.useCallback((T) => {
    if (T) {
      const e = E.length.valueOf();
      s((c) => Math.max(0, Math.min(c + T, e - 1)));
    }
  }, [s, E]), R0 = UJ.useMemo(() => E.at(v), [E, v]);
  return { select: t, moveSelection: i, selectedItem: R0, scroll: m, scrollUp: L0, scrollDown: V, selectedIndex: v };
};
var sU = function({ popupControl: E }) {
  const [_, v] = u4.useState([]), s = u4.useCallback((V) => {
    if (V)
      v((L0) => [...L0, V]);
  }, [v]), m = u4.useCallback((V) => {
    v((L0) => {
      return L0[L0.length - 1] === V ? L0.slice(0, L0.length - 1) : L0;
    });
  }, [v]);
  return u4.useMemo(() => ({ popupControl: E, controlsLock: _[_.length - 1], setControlsLock: s, removeControlsLock: m }), [E, _.length, s, m]);
};
var wW = function({ uid: E, listener: _ }) {
  const { popupControl: v, controlsLock: s, setControlsLock: m, removeControlsLock: r } = lU(), V = E && s === E ? d4.UNLOCKED : d4.LOCKED;
  return YX.useEffect(() => {
    if (V === d4.UNLOCKED)
      return v.addListener(_), () => {
        v.removeListener(_);
      };
  }, [_, v, V]), YX.useEffect(() => {
    if (E)
      m(E);
  }, [v, E, m]), YX.useEffect(() => {
    if (E)
      return () => r(E);
  }, [m, E]), { lockState: V, popupControl: v };
};
var aU = function({ uid: E, items: _, maxRows: v, onSelect: s, onClose: m }) {
  const { scroll: r, scrollUp: V, scrollDown: L0, select: t, moveSelection: i, selectedItem: R0 } = mU({ items: _, maxRows: v }), [T, e] = y4.useState(false), c = y4.useCallback((F1) => {
    const T1 = F1 !== undefined ? _.at(F1) : R0;
    if (!T1)
      return;
    if (s(T1), typeof T1 === "object" && T1.back)
      m();
  }, [_, i, R0, e, m]), { lockState: w0 } = wW({ uid: E, listener: y4.useMemo(() => ({ onAction: c, onUp() {
    e(false), i(-1);
  }, onDown() {
    e(false), i(1);
  } }), [i, e, c]) });
  return { selectedItem: R0, select: t, scroll: r, scrollUp: V, scrollDown: L0, disabled: w0 === d4.LOCKED, menuHoverEnabled: T, enableMenuHover: y4.useCallback(!T ? () => e(true) : () => {
  }, [T]), onMenuAction: c };
};
var IW = function() {
  if (!GX) {
    if (GX = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !GX)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  }
  return GX(TP);
};
var rU = function(E, _ = 0) {
  return X8[E[_ + 0]] + X8[E[_ + 1]] + X8[E[_ + 2]] + X8[E[_ + 3]] + "-" + X8[E[_ + 4]] + X8[E[_ + 5]] + "-" + X8[E[_ + 6]] + X8[E[_ + 7]] + "-" + X8[E[_ + 8]] + X8[E[_ + 9]] + "-" + X8[E[_ + 10]] + X8[E[_ + 11]] + X8[E[_ + 12]] + X8[E[_ + 13]] + X8[E[_ + 14]] + X8[E[_ + 15]];
};
var QV = function({ layout: E }) {
  const { getLayout: _ } = WX(), v = _(E), s = v.position?.[0] || eU, m = v.position?.[1] || JV, r = v.positionFromRight ? `calc(100% - ${s}px)` : s, V = v.positionFromBottom ? `calc(100% - ${m}px)` : m, L0 = eU, t = JV, i = v.size?.[0] || undefined, R0 = v.size?.[1] || undefined;
  return { left: r, top: V, right: L0, bottom: t, width: i, height: R0 };
};
var ZV = function({ layout: E, disabled: _ }) {
  const [v, s] = a6.useState(true), { layoutReplacementCallbacks: m } = WX(), r = a6.useCallback(() => s(false), [s]);
  return a6.useEffect(() => {
    const V = typeof E === "string" ? E : E.name;
    if (V && !_)
      m[V]?.(), m[V] = r, s(true);
  }, [_, r, E, m]), { visible: v };
};
var SW = function({ children: E, layout: _, style: v, disabled: s, removed: m }) {
  const [r, V] = KX.useState(0);
  KX.useEffect(() => {
    requestAnimationFrame(() => V(100));
  }, [V]);
  const { top: L0, left: t, right: i, bottom: R0, width: T, height: e } = QV({ layout: _ }), { visible: c } = ZV({ layout: _, disabled: s });
  return zX.jsxDEV("div", { style: { ...bP, left: t, top: L0, right: i, bottom: R0, width: T, height: e, fontSize: v?.fontSize ?? yP, display: !c ? "none" : "" }, children: zX.jsxDEV("div", { className: "pop-up", style: { ...fP, marginTop: `${m ? 80 : 0}%`, width: "100%", height: `${m ? 0 : r}%`, overflow: "hidden", transition: "height .2s, margin-top .2s", outlineColor: s ? "whitesmoke" : "white" }, children: zX.jsxDEV("div", { className: "double-border", style: { ...uP, height: `calc(100% - ${dP}px)`, pointerEvents: s ? "none" : undefined, borderColor: s ? "silver" : "white" }, children: m ? undefined : E }, undefined, false, undefined, this) }, undefined, false, undefined, this) }, undefined, false, undefined, this);
};
var qX = function({ menu: E, onSelect: _, onClose: v, removed: s }) {
  const { items: m = [], maxRows: r, style: V, layout: L0 } = E, t = X4.useId(), [i, R0] = X4.useState(), T = X4.useCallback((e0) => {
    if (typeof e0 === "object") {
      if (e0.submenu)
        R0(e0.submenu);
      if (_(e0), e0.back)
        v();
    } else
      _(e0);
  }, [_, R0, v, LW]), [e, c] = X4.useState(false), w0 = X4.useCallback(async () => {
    return c(true), new Promise((e0) => {
      setTimeout(() => {
        R0(undefined), c(false), e0();
      }, 200);
    });
  }, [R0, c]), { scroll: F1, scrollUp: T1, scrollDown: E1, selectedItem: N0, select: Y0, disabled: m0, menuHoverEnabled: A0, enableMenuHover: K1, onMenuAction: v0 } = aU({ uid: t, items: m, maxRows: r, onSelect: T, onClose: v });
  return h8.jsxDEV(h8.Fragment, { children: [h8.jsxDEV(SW, { layout: L0 ?? {}, style: V, disabled: m0, removed: s, children: [h8.jsxDEV("svg", { xmlns: "http://www.w3.org/2000/svg", style: { position: "absolute", height: 20, marginTop: -15, width: 200, display: F1 > 0 ? "" : "none", left: "calc(50% - 100px)" }, onMouseDown: () => T1(), children: h8.jsxDEV("polygon", { points: "100,10 110,20 90,20", style: { fill: "white" } }, undefined, false, undefined, this) }, undefined, false, undefined, this), h8.jsxDEV("div", { style: { paddingTop: 10, cursor: A0 ? "inherit" : "auto" }, children: h8.jsxDEV("div", { style: { height: "calc(100% - 27px)", overflow: "hidden" }, children: h8.jsxDEV("div", { style: { marginTop: F1 * -31, transition: "margin-top .2s" }, children: yU(m, (e0, i0) => {
    return h8.jsxDEV("div", { style: { color: N0 === e0 ? "black" : m0 ? "silver" : "white", backgroundColor: N0 !== e0 ? "black" : m0 ? "silver" : "white", transition: "color .05s, background-color .05s" }, onMouseMove: () => {
      K1(), Y0(i0);
    }, onMouseOver: A0 ? () => Y0(i0) : undefined, onClick: A0 ? () => v0(i0) : undefined, children: typeof e0 === "string" ? e0 : e0?.label }, i0, false, undefined, this);
  }) }, undefined, false, undefined, this) }, undefined, false, undefined, this) }, undefined, false, undefined, this), h8.jsxDEV("svg", { xmlns: "http://www.w3.org/2000/svg", style: { position: "absolute", height: 20, width: 200, marginTop: -5, display: F1 + (r ?? m.length.valueOf()) < m.length.valueOf() ? "" : "none", left: "calc(50% - 100px)" }, onMouseDown: () => E1(), children: h8.jsxDEV("polygon", { points: "100,20 110,10 90,10", style: { fill: "white" } }, undefined, false, undefined, this) }, undefined, false, undefined, this)] }, undefined, true, undefined, this), i && h8.jsxDEV(qX, { menu: i, onSelect: _, onClose: w0, removed: e }, undefined, false, undefined, this)] }, undefined, true, undefined, this);
};
var xW = function() {
  const E = c4.useMemo(() => ({}), []), _ = c4.useMemo(() => ({}), []), v = c4.useCallback((r) => {
    (Array.isArray(r) ? r : [r]).forEach((L0) => {
      if (L0.name)
        _[L0.name] = L0;
    });
  }, [_]), s = c4.useCallback((r) => {
    if (typeof r === "string")
      return _[r];
    if (r.name)
      _[r.name] = r;
    return r;
  }, [_]);
  return { context: c4.useMemo(() => ({ getLayout: s, layoutReplacementCallbacks: E }), [E, s]), registerLayout: v };
};
var iP = function(E) {
  const { context: _ } = xW(), v = E.onClose ?? E.detach, s = E.onSelect ?? ((m) => console.log(m));
  return m9.jsxDEV(NW, { context: _, children: [m9.jsxDEV(RW, { popupControl: E.popupControl, children: m9.jsxDEV(qX, { menu: { ...E.menu }, onClose: v, onSelect: s }, undefined, false, undefined, this) }, undefined, false, undefined, this), ";"] }, undefined, true, undefined, this);
};
var lP = function(E, _) {
  const v = document.createElement("div"), s = BV.default.createRoot(v), m = async () => s.unmount(), r = new p6, V = m9.jsxDEV(iP, { ..._, detach: m, popupControl: r }, undefined, false, undefined, this);
  return s.render(V), E.appendChild(v), { popupControl: r, detach: m };
};
var NP = Object.create;
var { defineProperty: dU, getPrototypeOf: SP, getOwnPropertyNames: xP } = Object;
var vP = Object.prototype.hasOwnProperty;
var G1 = (E, _, v) => {
  v = E != null ? NP(SP(E)) : {};
  const s = _ || !E || !E.__esModule ? dU(v, "default", { value: E, enumerable: true }) : v;
  for (let m of xP(E))
    if (!vP.call(s, m))
      dU(s, m, { get: () => E[m], enumerable: true });
  return s;
};
var d9 = (E, _) => () => (_ || E((_ = { exports: {} }).exports, _), _.exports);
var a8 = d9((gP, ZX) => {
  (function() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function")
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);
    var E = "18.2.0", _ = Symbol.for("react.element"), v = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), m = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), V = Symbol.for("react.provider"), L0 = Symbol.for("react.context"), t = Symbol.for("react.forward_ref"), i = Symbol.for("react.suspense"), R0 = Symbol.for("react.suspense_list"), T = Symbol.for("react.memo"), e = Symbol.for("react.lazy"), c = Symbol.for("react.offscreen"), w0 = Symbol.iterator, F1 = "@@iterator";
    function T1(K) {
      if (K === null || typeof K !== "object")
        return null;
      var $ = w0 && K[w0] || K[F1];
      if (typeof $ === "function")
        return $;
      return null;
    }
    var E1 = { current: null }, N0 = { transition: null }, Y0 = { current: null, isBatchingLegacy: false, didScheduleLegacyUpdate: false }, m0 = { current: null }, A0 = {}, K1 = null;
    function v0(K) {
      K1 = K;
    }
    A0.setExtraStackFrame = function(K) {
      K1 = K;
    }, A0.getCurrentStack = null, A0.getStackAddendum = function() {
      var K = "";
      if (K1)
        K += K1;
      var $ = A0.getCurrentStack;
      if ($)
        K += $() || "";
      return K;
    };
    var e0 = false, i0 = false, k1 = false, R1 = false, l0 = false, z0 = { ReactCurrentDispatcher: E1, ReactCurrentBatchConfig: N0, ReactCurrentOwner: m0 };
    z0.ReactDebugCurrentFrame = A0, z0.ReactCurrentActQueue = Y0;
    function J1(K) {
      {
        for (var $ = arguments.length, P = new Array($ > 1 ? $ - 1 : 0), w = 1;w < $; w++)
          P[w - 1] = arguments[w];
        O8("warn", K, P);
      }
    }
    function W0(K) {
      {
        for (var $ = arguments.length, P = new Array($ > 1 ? $ - 1 : 0), w = 1;w < $; w++)
          P[w - 1] = arguments[w];
        O8("error", K, P);
      }
    }
    function O8(K, $, P) {
      {
        var w = z0.ReactDebugCurrentFrame, g = w.getStackAddendum();
        if (g !== "")
          $ += "%s", P = P.concat([g]);
        var J0 = P.map(function(p) {
          return String(p);
        });
        J0.unshift("Warning: " + $), Function.prototype.apply.call(console[K], console, J0);
      }
    }
    var gJ = {};
    function m1(K, $) {
      {
        var P = K.constructor, w = P && (P.displayName || P.name) || "ReactClass", g = w + "." + $;
        if (gJ[g])
          return;
        W0("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", $, w), gJ[g] = true;
      }
    }
    var VJ = { isMounted: function(K) {
      return false;
    }, enqueueForceUpdate: function(K, $, P) {
      m1(K, "forceUpdate");
    }, enqueueReplaceState: function(K, $, P, w) {
      m1(K, "replaceState");
    }, enqueueSetState: function(K, $, P, w) {
      m1(K, "setState");
    } }, Y8 = Object.assign, r8 = {};
    Object.freeze(r8);
    function G8(K, $, P) {
      this.props = K, this.context = $, this.refs = r8, this.updater = P || VJ;
    }
    G8.prototype.isReactComponent = {}, G8.prototype.setState = function(K, $) {
      if (typeof K !== "object" && typeof K !== "function" && K != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, K, $, "setState");
    }, G8.prototype.forceUpdate = function(K) {
      this.updater.enqueueForceUpdate(this, K, "forceUpdate");
    };
    {
      var L8 = { isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."], replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."] }, EQ = function(K, $) {
        Object.defineProperty(G8.prototype, K, { get: function() {
          J1("%s(...) is deprecated in plain JavaScript React classes. %s", $[0], $[1]);
          return;
        } });
      };
      for (var CJ in L8)
        if (L8.hasOwnProperty(CJ))
          EQ(CJ, L8[CJ]);
    }
    function n8() {
    }
    n8.prototype = G8.prototype;
    function $J(K, $, P) {
      this.props = K, this.context = $, this.refs = r8, this.updater = P || VJ;
    }
    var b8 = $J.prototype = new n8;
    b8.constructor = $J, Y8(b8, G8.prototype), b8.isPureReactComponent = true;
    function j8() {
      var K = { current: null };
      return Object.seal(K), K;
    }
    var o8 = Array.isArray;
    function B8(K) {
      return o8(K);
    }
    function f8(K) {
      {
        var $ = typeof Symbol === "function" && Symbol.toStringTag, P = $ && K[Symbol.toStringTag] || K.constructor.name || "Object";
        return P;
      }
    }
    function c1(K) {
      try {
        return s1(K), false;
      } catch ($) {
        return true;
      }
    }
    function s1(K) {
      return "" + K;
    }
    function $1(K) {
      if (c1(K))
        return W0("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", f8(K)), s1(K);
    }
    function i1(K, $, P) {
      var w = K.displayName;
      if (w)
        return w;
      var g = $.displayName || $.name || "";
      return g !== "" ? P + "(" + g + ")" : P;
    }
    function l1(K) {
      return K.displayName || "Context";
    }
    function O1(K) {
      if (K == null)
        return null;
      if (typeof K.tag === "number")
        W0("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
      if (typeof K === "function")
        return K.displayName || K.name || null;
      if (typeof K === "string")
        return K;
      switch (K) {
        case s:
          return "Fragment";
        case v:
          return "Portal";
        case r:
          return "Profiler";
        case m:
          return "StrictMode";
        case i:
          return "Suspense";
        case R0:
          return "SuspenseList";
      }
      if (typeof K === "object")
        switch (K.$$typeof) {
          case L0:
            var $ = K;
            return l1($) + ".Consumer";
          case V:
            var P = K;
            return l1(P._context) + ".Provider";
          case t:
            return i1(K, K.render, "ForwardRef");
          case T:
            var w = K.displayName || null;
            if (w !== null)
              return w;
            return O1(K.type) || "Memo";
          case e: {
            var g = K, J0 = g._payload, p = g._init;
            try {
              return O1(p(J0));
            } catch (V0) {
              return null;
            }
          }
        }
      return null;
    }
    var M8 = Object.prototype.hasOwnProperty, RQ = { key: true, ref: true, __self: true, __source: true }, wQ, t8, W8;
    W8 = {};
    function e8(K) {
      if (M8.call(K, "ref")) {
        var $ = Object.getOwnPropertyDescriptor(K, "ref").get;
        if ($ && $.isReactWarning)
          return false;
      }
      return K.ref !== undefined;
    }
    function D8(K) {
      if (M8.call(K, "key")) {
        var $ = Object.getOwnPropertyDescriptor(K, "key").get;
        if ($ && $.isReactWarning)
          return false;
      }
      return K.key !== undefined;
    }
    function JJ(K, $) {
      var P = function() {
        if (!wQ)
          wQ = true, W0("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", $);
      };
      P.isReactWarning = true, Object.defineProperty(K, "key", { get: P, configurable: true });
    }
    function j1(K, $) {
      var P = function() {
        if (!t8)
          t8 = true, W0("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", $);
      };
      P.isReactWarning = true, Object.defineProperty(K, "ref", { get: P, configurable: true });
    }
    function QJ(K) {
      if (typeof K.ref === "string" && m0.current && K.__self && m0.current.stateNode !== K.__self) {
        var $ = O1(m0.current.type);
        if (!W8[$])
          W0('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', $, K.ref), W8[$] = true;
      }
    }
    var HJ = function(K, $, P, w, g, J0, p) {
      var V0 = { $$typeof: _, type: K, key: $, ref: P, props: p, _owner: J0 };
      if (V0._store = {}, Object.defineProperty(V0._store, "validated", { configurable: false, enumerable: false, writable: true, value: false }), Object.defineProperty(V0, "_self", { configurable: false, enumerable: false, writable: false, value: w }), Object.defineProperty(V0, "_source", { configurable: false, enumerable: false, writable: false, value: g }), Object.freeze)
        Object.freeze(V0.props), Object.freeze(V0);
      return V0;
    };
    function rJ(K, $, P) {
      var w, g = {}, J0 = null, p = null, V0 = null, S0 = null;
      if ($ != null) {
        if (e8($))
          p = $.ref, QJ($);
        if (D8($))
          $1($.key), J0 = "" + $.key;
        V0 = $.__self === undefined ? null : $.__self, S0 = $.__source === undefined ? null : $.__source;
        for (w in $)
          if (M8.call($, w) && !RQ.hasOwnProperty(w))
            g[w] = $[w];
      }
      var f0 = arguments.length - 2;
      if (f0 === 1)
        g.children = P;
      else if (f0 > 1) {
        var n0 = Array(f0);
        for (var o0 = 0;o0 < f0; o0++)
          n0[o0] = arguments[o0 + 2];
        if (Object.freeze)
          Object.freeze(n0);
        g.children = n0;
      }
      if (K && K.defaultProps) {
        var Q1 = K.defaultProps;
        for (w in Q1)
          if (g[w] === undefined)
            g[w] = Q1[w];
      }
      if (J0 || p) {
        var W1 = typeof K === "function" ? K.displayName || K.name || "Unknown" : K;
        if (J0)
          JJ(g, W1);
        if (p)
          j1(g, W1);
      }
      return HJ(K, J0, p, V0, S0, m0.current, g);
    }
    function k(K, $) {
      var P = HJ(K.type, $, K.ref, K._self, K._source, K._owner, K.props);
      return P;
    }
    function n(K, $, P) {
      if (K === null || K === undefined)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + K + ".");
      var w, g = Y8({}, K.props), J0 = K.key, p = K.ref, V0 = K._self, S0 = K._source, f0 = K._owner;
      if ($ != null) {
        if (e8($))
          p = $.ref, f0 = m0.current;
        if (D8($))
          $1($.key), J0 = "" + $.key;
        var n0;
        if (K.type && K.type.defaultProps)
          n0 = K.type.defaultProps;
        for (w in $)
          if (M8.call($, w) && !RQ.hasOwnProperty(w))
            if ($[w] === undefined && n0 !== undefined)
              g[w] = n0[w];
            else
              g[w] = $[w];
      }
      var o0 = arguments.length - 2;
      if (o0 === 1)
        g.children = P;
      else if (o0 > 1) {
        var Q1 = Array(o0);
        for (var W1 = 0;W1 < o0; W1++)
          Q1[W1] = arguments[W1 + 2];
        g.children = Q1;
      }
      return HJ(K.type, J0, p, V0, S0, f0, g);
    }
    function $0(K) {
      return typeof K === "object" && K !== null && K.$$typeof === _;
    }
    var h0 = ".", p0 = ":";
    function h1(K) {
      var $ = /[=:]/g, P = { "=": "=0", ":": "=2" }, w = K.replace($, function(g) {
        return P[g];
      });
      return "$" + w;
    }
    var q1 = false, N8 = /\/+/g;
    function a0(K) {
      return K.replace(N8, "$&/");
    }
    function A8(K, $) {
      if (typeof K === "object" && K !== null && K.key != null)
        return $1(K.key), h1("" + K.key);
      return $.toString(36);
    }
    function r0(K, $, P, w, g) {
      var J0 = typeof K;
      if (J0 === "undefined" || J0 === "boolean")
        K = null;
      var p = false;
      if (K === null)
        p = true;
      else
        switch (J0) {
          case "string":
          case "number":
            p = true;
            break;
          case "object":
            switch (K.$$typeof) {
              case _:
              case v:
                p = true;
            }
        }
      if (p) {
        var V0 = K, S0 = g(V0), f0 = w === "" ? h0 + A8(V0, 0) : w;
        if (B8(S0)) {
          var n0 = "";
          if (f0 != null)
            n0 = a0(f0) + "/";
          r0(S0, $, n0, "", function(V7) {
            return V7;
          });
        } else if (S0 != null) {
          if ($0(S0)) {
            if (S0.key && (!V0 || V0.key !== S0.key))
              $1(S0.key);
            S0 = k(S0, P + (S0.key && (!V0 || V0.key !== S0.key) ? a0("" + S0.key) + "/" : "") + f0);
          }
          $.push(S0);
        }
        return 1;
      }
      var o0, Q1, W1 = 0, w1 = w === "" ? h0 : w + p0;
      if (B8(K))
        for (var J6 = 0;J6 < K.length; J6++)
          o0 = K[J6], Q1 = w1 + A8(o0, J6), W1 += r0(o0, $, P, Q1, g);
      else {
        var I1 = T1(K);
        if (typeof I1 === "function") {
          var q7 = K;
          if (I1 === q7.entries) {
            if (!q1)
              J1("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
            q1 = true;
          }
          var e9 = I1.call(q7), U7, PX = 0;
          while (!(U7 = e9.next()).done)
            o0 = U7.value, Q1 = w1 + A8(o0, PX++), W1 += r0(o0, $, P, Q1, g);
        } else if (J0 === "object") {
          var eJ = String(K);
          throw new Error("Objects are not valid as a React child (found: " + (eJ === "[object Object]" ? "object with keys {" + Object.keys(K).join(", ") + "}" : eJ) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return W1;
    }
    function X1(K, $, P) {
      if (K == null)
        return K;
      var w = [], g = 0;
      return r0(K, w, "", "", function(J0) {
        return $.call(P, J0, g++);
      }), w;
    }
    function Y4(K) {
      var $ = 0;
      return X1(K, function() {
        $++;
      }), $;
    }
    function IQ(K, $, P) {
      X1(K, function() {
        $.apply(this, arguments);
      }, P);
    }
    function G4(K) {
      return X1(K, function($) {
        return $;
      }) || [];
    }
    function s4(K) {
      if (!$0(K))
        throw new Error("React.Children.only expected to receive a single React element child.");
      return K;
    }
    function n6(K) {
      var $ = { $$typeof: L0, _currentValue: K, _currentValue2: K, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
      $.Provider = { $$typeof: V, _context: $ };
      var P = false, w = false, g = false;
      {
        var J0 = { $$typeof: L0, _context: $ };
        Object.defineProperties(J0, { Provider: { get: function() {
          if (!w)
            w = true, W0("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
          return $.Provider;
        }, set: function(p) {
          $.Provider = p;
        } }, _currentValue: { get: function() {
          return $._currentValue;
        }, set: function(p) {
          $._currentValue = p;
        } }, _currentValue2: { get: function() {
          return $._currentValue2;
        }, set: function(p) {
          $._currentValue2 = p;
        } }, _threadCount: { get: function() {
          return $._threadCount;
        }, set: function(p) {
          $._threadCount = p;
        } }, Consumer: { get: function() {
          if (!P)
            P = true, W0("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
          return $.Consumer;
        } }, displayName: { get: function() {
          return $.displayName;
        }, set: function(p) {
          if (!g)
            J1("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", p), g = true;
        } } }), $.Consumer = J0;
      }
      return $._currentRenderer = null, $._currentRenderer2 = null, $;
    }
    var OJ = -1, nJ = 0, i4 = 1, l4 = 2;
    function B4(K) {
      if (K._status === OJ) {
        var $ = K._result, P = $();
        if (P.then(function(J0) {
          if (K._status === nJ || K._status === OJ) {
            var p = K;
            p._status = i4, p._result = J0;
          }
        }, function(J0) {
          if (K._status === nJ || K._status === OJ) {
            var p = K;
            p._status = l4, p._result = J0;
          }
        }), K._status === OJ) {
          var w = K;
          w._status = nJ, w._result = P;
        }
      }
      if (K._status === i4) {
        var g = K._result;
        if (g === undefined)
          W0("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", g);
        if (!("default" in g))
          W0("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", g);
        return g.default;
      } else
        throw K._result;
    }
    function TJ(K) {
      var $ = { _status: OJ, _result: K }, P = { $$typeof: e, _payload: $, _init: B4 };
      {
        var w, g;
        Object.defineProperties(P, { defaultProps: { configurable: true, get: function() {
          return w;
        }, set: function(J0) {
          W0("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), w = J0, Object.defineProperty(P, "defaultProps", { enumerable: true });
        } }, propTypes: { configurable: true, get: function() {
          return g;
        }, set: function(J0) {
          W0("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), g = J0, Object.defineProperty(P, "propTypes", { enumerable: true });
        } } });
      }
      return P;
    }
    function H(K) {
      {
        if (K != null && K.$$typeof === T)
          W0("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
        else if (typeof K !== "function")
          W0("forwardRef requires a render function but was given %s.", K === null ? "null" : typeof K);
        else if (K.length !== 0 && K.length !== 2)
          W0("forwardRef render functions accept exactly two parameters: props and ref. %s", K.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
        if (K != null) {
          if (K.defaultProps != null || K.propTypes != null)
            W0("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        }
      }
      var $ = { $$typeof: t, render: K };
      {
        var P;
        Object.defineProperty($, "displayName", { enumerable: false, configurable: true, get: function() {
          return P;
        }, set: function(w) {
          if (P = w, !K.name && !K.displayName)
            K.displayName = w;
        } });
      }
      return $;
    }
    var S = Symbol.for("react.module.reference");
    function h(K) {
      if (typeof K === "string" || typeof K === "function")
        return true;
      if (K === s || K === r || l0 || K === m || K === i || K === R0 || R1 || K === c || e0 || i0 || k1)
        return true;
      if (typeof K === "object" && K !== null) {
        if (K.$$typeof === e || K.$$typeof === T || K.$$typeof === V || K.$$typeof === L0 || K.$$typeof === t || K.$$typeof === S || K.getModuleId !== undefined)
          return true;
      }
      return false;
    }
    function Q0(K, $) {
      if (!h(K))
        W0("memo: The first argument must be a component. Instead received: %s", K === null ? "null" : typeof K);
      var P = { $$typeof: T, type: K, compare: $ === undefined ? null : $ };
      {
        var w;
        Object.defineProperty(P, "displayName", { enumerable: false, configurable: true, get: function() {
          return w;
        }, set: function(g) {
          if (w = g, !K.name && !K.displayName)
            K.displayName = g;
        } });
      }
      return P;
    }
    function G0() {
      var K = E1.current;
      if (K === null)
        W0("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
      return K;
    }
    function T0(K) {
      var $ = G0();
      if (K._context !== undefined) {
        var P = K._context;
        if (P.Consumer === K)
          W0("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
        else if (P.Provider === K)
          W0("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return $.useContext(K);
    }
    function O0(K) {
      var $ = G0();
      return $.useState(K);
    }
    function j0(K, $, P) {
      var w = G0();
      return w.useReducer(K, $, P);
    }
    function U1(K) {
      var $ = G0();
      return $.useRef(K);
    }
    function c0(K, $) {
      var P = G0();
      return P.useEffect(K, $);
    }
    function E0(K, $) {
      var P = G0();
      return P.useInsertionEffect(K, $);
    }
    function z8(K, $) {
      var P = G0();
      return P.useLayoutEffect(K, $);
    }
    function kJ(K, $) {
      var P = G0();
      return P.useCallback(K, $);
    }
    function W4(K, $) {
      var P = G0();
      return P.useMemo(K, $);
    }
    function u8(K, $, P) {
      var w = G0();
      return w.useImperativeHandle(K, $, P);
    }
    function UX(K, $) {
      {
        var P = G0();
        return P.useDebugValue(K, $);
      }
    }
    function VX() {
      var K = G0();
      return K.useTransition();
    }
    function c9(K) {
      var $ = G0();
      return $.useDeferredValue(K);
    }
    function $X() {
      var K = G0();
      return K.useId();
    }
    function oJ(K, $, P) {
      var w = G0();
      return w.useSyncExternalStore(K, $, P);
    }
    var D0 = 0, _Q, o6, t6, e6, J7, Q7, Z7;
    function X7() {
    }
    X7.__reactDisabledLog = true;
    function s9() {
      {
        if (D0 === 0) {
          _Q = console.log, o6 = console.info, t6 = console.warn, e6 = console.error, J7 = console.group, Q7 = console.groupCollapsed, Z7 = console.groupEnd;
          var K = { configurable: true, enumerable: true, value: X7, writable: true };
          Object.defineProperties(console, { info: K, log: K, warn: K, error: K, group: K, groupCollapsed: K, groupEnd: K });
        }
        D0++;
      }
    }
    function HX() {
      {
        if (D0--, D0 === 0) {
          var K = { configurable: true, enumerable: true, writable: true };
          Object.defineProperties(console, { log: Y8({}, K, { value: _Q }), info: Y8({}, K, { value: o6 }), warn: Y8({}, K, { value: t6 }), error: Y8({}, K, { value: e6 }), group: Y8({}, K, { value: J7 }), groupCollapsed: Y8({}, K, { value: Q7 }), groupEnd: Y8({}, K, { value: Z7 }) });
        }
        if (D0 < 0)
          W0("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Y7 = z0.ReactCurrentDispatcher, z4;
    function LQ(K, $, P) {
      {
        if (z4 === undefined)
          try {
            throw Error();
          } catch (g) {
            var w = g.stack.trim().match(/\n( *(at )?)/);
            z4 = w && w[1] || "";
          }
        return "\n" + z4 + K;
      }
    }
    var ZJ = false, NQ;
    {
      var p4 = typeof WeakMap === "function" ? WeakMap : Map;
      NQ = new p4;
    }
    function i9(K, $) {
      if (!K || ZJ)
        return "";
      {
        var P = NQ.get(K);
        if (P !== undefined)
          return P;
      }
      var w;
      ZJ = true;
      var g = Error.prepareStackTrace;
      Error.prepareStackTrace = undefined;
      var J0;
      J0 = Y7.current, Y7.current = null, s9();
      try {
        if ($) {
          var p = function() {
            throw Error();
          };
          if (Object.defineProperty(p.prototype, "props", { set: function() {
            throw Error();
          } }), typeof Reflect === "object" && Reflect.construct) {
            try {
              Reflect.construct(p, []);
            } catch (w1) {
              w = w1;
            }
            Reflect.construct(K, [], p);
          } else {
            try {
              p.call();
            } catch (w1) {
              w = w1;
            }
            K.call(p.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (w1) {
            w = w1;
          }
          K();
        }
      } catch (w1) {
        if (w1 && w && typeof w1.stack === "string") {
          var V0 = w1.stack.split("\n"), S0 = w.stack.split("\n"), f0 = V0.length - 1, n0 = S0.length - 1;
          while (f0 >= 1 && n0 >= 0 && V0[f0] !== S0[n0])
            n0--;
          for (;f0 >= 1 && n0 >= 0; f0--, n0--)
            if (V0[f0] !== S0[n0]) {
              if (f0 !== 1 || n0 !== 1)
                do
                  if (f0--, n0--, n0 < 0 || V0[f0] !== S0[n0]) {
                    var o0 = "\n" + V0[f0].replace(" at new ", " at ");
                    if (K.displayName && o0.includes("<anonymous>"))
                      o0 = o0.replace("<anonymous>", K.displayName);
                    if (typeof K === "function")
                      NQ.set(K, o0);
                    return o0;
                  }
                while (f0 >= 1 && n0 >= 0);
              break;
            }
        }
      } finally {
        ZJ = false, Y7.current = J0, HX(), Error.prepareStackTrace = g;
      }
      var Q1 = K ? K.displayName || K.name : "", W1 = Q1 ? LQ(Q1) : "";
      if (typeof K === "function")
        NQ.set(K, W1);
      return W1;
    }
    function G7(K, $, P) {
      return i9(K, false);
    }
    function OX(K) {
      var $ = K.prototype;
      return !!($ && $.isReactComponent);
    }
    function SQ(K, $, P) {
      if (K == null)
        return "";
      if (typeof K === "function")
        return i9(K, OX(K));
      if (typeof K === "string")
        return LQ(K);
      switch (K) {
        case i:
          return LQ("Suspense");
        case R0:
          return LQ("SuspenseList");
      }
      if (typeof K === "object")
        switch (K.$$typeof) {
          case t:
            return G7(K.render);
          case T:
            return SQ(K.type, $, P);
          case e: {
            var w = K, g = w._payload, J0 = w._init;
            try {
              return SQ(J0(g), $, P);
            } catch (p) {
            }
          }
        }
      return "";
    }
    var l9 = {}, a4 = z0.ReactDebugCurrentFrame;
    function r4(K) {
      if (K) {
        var $ = K._owner, P = SQ(K.type, K._source, $ ? $.type : null);
        a4.setExtraStackFrame(P);
      } else
        a4.setExtraStackFrame(null);
    }
    function p9(K, $, P, w, g) {
      {
        var J0 = Function.call.bind(M8);
        for (var p in K)
          if (J0(K, p)) {
            var V0 = undefined;
            try {
              if (typeof K[p] !== "function") {
                var S0 = Error((w || "React class") + ": " + P + " type `" + p + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof K[p] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw S0.name = "Invariant Violation", S0;
              }
              V0 = K[p]($, p, w, P, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (f0) {
              V0 = f0;
            }
            if (V0 && !(V0 instanceof Error))
              r4(g), W0("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", w || "React class", P, p, typeof V0), r4(null);
            if (V0 instanceof Error && !(V0.message in l9))
              l9[V0.message] = true, r4(g), W0("Failed %s type: %s", P, V0.message), r4(null);
          }
      }
    }
    function xQ(K) {
      if (K) {
        var $ = K._owner, P = SQ(K.type, K._source, $ ? $.type : null);
        v0(P);
      } else
        v0(null);
    }
    var B7 = false;
    function s0() {
      if (m0.current) {
        var K = O1(m0.current.type);
        if (K)
          return "\n\nCheck the render method of `" + K + "`.";
      }
      return "";
    }
    function jX(K) {
      if (K !== undefined) {
        var $ = K.fileName.replace(/^.*[\\\/]/, ""), P = K.lineNumber;
        return "\n\nCheck your code at " + $ + ":" + P + ".";
      }
      return "";
    }
    function a9(K) {
      if (K !== null && K !== undefined)
        return jX(K.__source);
      return "";
    }
    var H0 = {};
    function r9(K) {
      var $ = s0();
      if (!$) {
        var P = typeof K === "string" ? K : K.displayName || K.name;
        if (P)
          $ = "\n\nCheck the top-level render call using <" + P + ">.";
      }
      return $;
    }
    function K8(K, $) {
      if (!K._store || K._store.validated || K.key != null)
        return;
      K._store.validated = true;
      var P = r9($);
      if (H0[P])
        return;
      H0[P] = true;
      var w = "";
      if (K && K._owner && K._owner !== m0.current)
        w = " It was passed a child from " + O1(K._owner.type) + ".";
      xQ(K), W0('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', P, w), xQ(null);
    }
    function vQ(K, $) {
      if (typeof K !== "object")
        return;
      if (B8(K))
        for (var P = 0;P < K.length; P++) {
          var w = K[P];
          if ($0(w))
            K8(w, $);
        }
      else if ($0(K)) {
        if (K._store)
          K._store.validated = true;
      } else if (K) {
        var g = T1(K);
        if (typeof g === "function") {
          if (g !== K.entries) {
            var J0 = g.call(K), p;
            while (!(p = J0.next()).done)
              if ($0(p.value))
                K8(p.value, $);
          }
        }
      }
    }
    function gQ(K) {
      {
        var $ = K.type;
        if ($ === null || $ === undefined || typeof $ === "string")
          return;
        var P;
        if (typeof $ === "function")
          P = $.propTypes;
        else if (typeof $ === "object" && ($.$$typeof === t || $.$$typeof === T))
          P = $.propTypes;
        else
          return;
        if (P) {
          var w = O1($);
          p9(P, K.props, "prop", w, K);
        } else if ($.PropTypes !== undefined && !B7) {
          B7 = true;
          var g = O1($);
          W0("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", g || "Unknown");
        }
        if (typeof $.getDefaultProps === "function" && !$.getDefaultProps.isReactClassApproved)
          W0("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function MX(K) {
      {
        var $ = Object.keys(K.props);
        for (var P = 0;P < $.length; P++) {
          var w = $[P];
          if (w !== "children" && w !== "key") {
            xQ(K), W0("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", w), xQ(null);
            break;
          }
        }
        if (K.ref !== null)
          xQ(K), W0("Invalid attribute `ref` supplied to `React.Fragment`."), xQ(null);
      }
    }
    function b1(K, $, P) {
      var w = h(K);
      if (!w) {
        var g = "";
        if (K === undefined || typeof K === "object" && K !== null && Object.keys(K).length === 0)
          g += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
        var J0 = a9($);
        if (J0)
          g += J0;
        else
          g += s0();
        var p;
        if (K === null)
          p = "null";
        else if (B8(K))
          p = "array";
        else if (K !== undefined && K.$$typeof === _)
          p = "<" + (O1(K.type) || "Unknown") + " />", g = " Did you accidentally export a JSX literal instead of a component?";
        else
          p = typeof K;
        W0("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", p, g);
      }
      var V0 = rJ.apply(this, arguments);
      if (V0 == null)
        return V0;
      if (w)
        for (var S0 = 2;S0 < arguments.length; S0++)
          vQ(arguments[S0], K);
      if (K === s)
        MX(V0);
      else
        gQ(V0);
      return V0;
    }
    var B1 = false;
    function DX(K) {
      var $ = b1.bind(null, K);
      $.type = K;
      {
        if (!B1)
          B1 = true, J1("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
        Object.defineProperty($, "type", { enumerable: false, get: function() {
          return J1("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", { value: K }), K;
        } });
      }
      return $;
    }
    function XJ(K, $, P) {
      var w = n.apply(this, arguments);
      for (var g = 2;g < arguments.length; g++)
        vQ(arguments[g], w.type);
      return gQ(w), w;
    }
    function S8(K, $) {
      var P = N0.transition;
      N0.transition = {};
      var w = N0.transition;
      N0.transition._updatedFibers = new Set;
      try {
        K();
      } finally {
        if (N0.transition = P, P === null && w._updatedFibers) {
          var g = w._updatedFibers.size;
          if (g > 10)
            J1("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
          w._updatedFibers.clear();
        }
      }
    }
    var jJ = false, n4 = null;
    function W7(K) {
      if (n4 === null)
        try {
          var $ = ("require" + Math.random()).slice(0, 7), P = ZX && ZX[$];
          n4 = P.call(ZX, "timers").setImmediate;
        } catch (w) {
          n4 = function(g) {
            if (jJ === false) {
              if (jJ = true, typeof MessageChannel === "undefined")
                W0("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
            }
            var J0 = new MessageChannel;
            J0.port1.onmessage = g, J0.port2.postMessage(undefined);
          };
        }
      return n4(K);
    }
    var tJ = 0, z7 = false;
    function AX(K) {
      {
        var $ = tJ;
        if (tJ++, Y0.current === null)
          Y0.current = [];
        var P = Y0.isBatchingLegacy, w;
        try {
          if (Y0.isBatchingLegacy = true, w = K(), !P && Y0.didScheduleLegacyUpdate) {
            var g = Y0.current;
            if (g !== null)
              Y0.didScheduleLegacyUpdate = false, t4(g);
          }
        } catch (Q1) {
          throw o4($), Q1;
        } finally {
          Y0.isBatchingLegacy = P;
        }
        if (w !== null && typeof w === "object" && typeof w.then === "function") {
          var J0 = w, p = false, V0 = { then: function(Q1, W1) {
            p = true, J0.then(function(w1) {
              if (o4($), tJ === 0)
                K7(w1, Q1, W1);
              else
                Q1(w1);
            }, function(w1) {
              o4($), W1(w1);
            });
          } };
          if (!z7 && typeof Promise !== "undefined")
            Promise.resolve().then(function() {
            }).then(function() {
              if (!p)
                z7 = true, W0("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
            });
          return V0;
        } else {
          var S0 = w;
          if (o4($), tJ === 0) {
            var f0 = Y0.current;
            if (f0 !== null)
              t4(f0), Y0.current = null;
            var n0 = { then: function(Q1, W1) {
              if (Y0.current === null)
                Y0.current = [], K7(S0, Q1, W1);
              else
                Q1(S0);
            } };
            return n0;
          } else {
            var o0 = { then: function(Q1, W1) {
              Q1(S0);
            } };
            return o0;
          }
        }
      }
    }
    function o4(K) {
      {
        if (K !== tJ - 1)
          W0("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
        tJ = K;
      }
    }
    function K7(K, $, P) {
      {
        var w = Y0.current;
        if (w !== null)
          try {
            t4(w), W7(function() {
              if (w.length === 0)
                Y0.current = null, $(K);
              else
                K7(K, $, P);
            });
          } catch (g) {
            P(g);
          }
        else
          $(K);
      }
    }
    var CQ = false;
    function t4(K) {
      if (!CQ) {
        CQ = true;
        var $ = 0;
        try {
          for (;$ < K.length; $++) {
            var P = K[$];
            do
              P = P(true);
            while (P !== null);
          }
          K.length = 0;
        } catch (w) {
          throw K = K.slice($ + 1), w;
        } finally {
          CQ = false;
        }
      }
    }
    var e4 = b1, n9 = XJ, o9 = DX, t9 = { map: X1, forEach: IQ, count: Y4, toArray: G4, only: s4 };
    if (gP.Children = t9, gP.Component = G8, gP.Fragment = s, gP.Profiler = r, gP.PureComponent = $J, gP.StrictMode = m, gP.Suspense = i, gP.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = z0, gP.cloneElement = n9, gP.createContext = n6, gP.createElement = e4, gP.createFactory = o9, gP.createRef = j8, gP.forwardRef = H, gP.isValidElement = $0, gP.lazy = TJ, gP.memo = Q0, gP.startTransition = S8, gP.unstable_act = AX, gP.useCallback = kJ, gP.useContext = T0, gP.useDebugValue = UX, gP.useDeferredValue = c9, gP.useEffect = c0, gP.useId = $X, gP.useImperativeHandle = u8, gP.useInsertionEffect = E0, gP.useLayoutEffect = z8, gP.useMemo = W4, gP.useReducer = j0, gP.useRef = U1, gP.useState = O0, gP.useSyncExternalStore = oJ, gP.useTransition = VX, gP.version = E, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function")
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error);
  })();
});
var vJ = d9((CP) => {
  var E = G1(a8(), 1);
  (function() {
    var _ = Symbol.for("react.element"), v = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), m = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), V = Symbol.for("react.provider"), L0 = Symbol.for("react.context"), t = Symbol.for("react.forward_ref"), i = Symbol.for("react.suspense"), R0 = Symbol.for("react.suspense_list"), T = Symbol.for("react.memo"), e = Symbol.for("react.lazy"), c = Symbol.for("react.offscreen"), w0 = Symbol.iterator, F1 = "@@iterator";
    function T1(H) {
      if (H === null || typeof H !== "object")
        return null;
      var S = w0 && H[w0] || H[F1];
      if (typeof S === "function")
        return S;
      return null;
    }
    var E1 = E.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function N0(H) {
      {
        for (var S = arguments.length, h = new Array(S > 1 ? S - 1 : 0), Q0 = 1;Q0 < S; Q0++)
          h[Q0 - 1] = arguments[Q0];
        Y0("error", H, h);
      }
    }
    function Y0(H, S, h) {
      {
        var Q0 = E1.ReactDebugCurrentFrame, G0 = Q0.getStackAddendum();
        if (G0 !== "")
          S += "%s", h = h.concat([G0]);
        var T0 = h.map(function(O0) {
          return String(O0);
        });
        T0.unshift("Warning: " + S), Function.prototype.apply.call(console[H], console, T0);
      }
    }
    var m0 = false, A0 = false, K1 = false, v0 = false, e0 = false, i0;
    i0 = Symbol.for("react.module.reference");
    function k1(H) {
      if (typeof H === "string" || typeof H === "function")
        return true;
      if (H === s || H === r || e0 || H === m || H === i || H === R0 || v0 || H === c || m0 || A0 || K1)
        return true;
      if (typeof H === "object" && H !== null) {
        if (H.$$typeof === e || H.$$typeof === T || H.$$typeof === V || H.$$typeof === L0 || H.$$typeof === t || H.$$typeof === i0 || H.getModuleId !== undefined)
          return true;
      }
      return false;
    }
    function R1(H, S, h) {
      var Q0 = H.displayName;
      if (Q0)
        return Q0;
      var G0 = S.displayName || S.name || "";
      return G0 !== "" ? h + "(" + G0 + ")" : h;
    }
    function l0(H) {
      return H.displayName || "Context";
    }
    function z0(H) {
      if (H == null)
        return null;
      if (typeof H.tag === "number")
        N0("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
      if (typeof H === "function")
        return H.displayName || H.name || null;
      if (typeof H === "string")
        return H;
      switch (H) {
        case s:
          return "Fragment";
        case v:
          return "Portal";
        case r:
          return "Profiler";
        case m:
          return "StrictMode";
        case i:
          return "Suspense";
        case R0:
          return "SuspenseList";
      }
      if (typeof H === "object")
        switch (H.$$typeof) {
          case L0:
            var S = H;
            return l0(S) + ".Consumer";
          case V:
            var h = H;
            return l0(h._context) + ".Provider";
          case t:
            return R1(H, H.render, "ForwardRef");
          case T:
            var Q0 = H.displayName || null;
            if (Q0 !== null)
              return Q0;
            return z0(H.type) || "Memo";
          case e: {
            var G0 = H, T0 = G0._payload, O0 = G0._init;
            try {
              return z0(O0(T0));
            } catch (j0) {
              return null;
            }
          }
        }
      return null;
    }
    var J1 = Object.assign, W0 = 0, O8, gJ, m1, VJ, Y8, r8, G8;
    function L8() {
    }
    L8.__reactDisabledLog = true;
    function EQ() {
      {
        if (W0 === 0) {
          O8 = console.log, gJ = console.info, m1 = console.warn, VJ = console.error, Y8 = console.group, r8 = console.groupCollapsed, G8 = console.groupEnd;
          var H = { configurable: true, enumerable: true, value: L8, writable: true };
          Object.defineProperties(console, { info: H, log: H, warn: H, error: H, group: H, groupCollapsed: H, groupEnd: H });
        }
        W0++;
      }
    }
    function CJ() {
      {
        if (W0--, W0 === 0) {
          var H = { configurable: true, enumerable: true, writable: true };
          Object.defineProperties(console, { log: J1({}, H, { value: O8 }), info: J1({}, H, { value: gJ }), warn: J1({}, H, { value: m1 }), error: J1({}, H, { value: VJ }), group: J1({}, H, { value: Y8 }), groupCollapsed: J1({}, H, { value: r8 }), groupEnd: J1({}, H, { value: G8 }) });
        }
        if (W0 < 0)
          N0("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var n8 = E1.ReactCurrentDispatcher, $J;
    function b8(H, S, h) {
      {
        if ($J === undefined)
          try {
            throw Error();
          } catch (G0) {
            var Q0 = G0.stack.trim().match(/\n( *(at )?)/);
            $J = Q0 && Q0[1] || "";
          }
        return "\n" + $J + H;
      }
    }
    var j8 = false, o8;
    {
      var B8 = typeof WeakMap === "function" ? WeakMap : Map;
      o8 = new B8;
    }
    function f8(H, S) {
      if (!H || j8)
        return "";
      {
        var h = o8.get(H);
        if (h !== undefined)
          return h;
      }
      var Q0;
      j8 = true;
      var G0 = Error.prepareStackTrace;
      Error.prepareStackTrace = undefined;
      var T0;
      T0 = n8.current, n8.current = null, EQ();
      try {
        if (S) {
          var O0 = function() {
            throw Error();
          };
          if (Object.defineProperty(O0.prototype, "props", { set: function() {
            throw Error();
          } }), typeof Reflect === "object" && Reflect.construct) {
            try {
              Reflect.construct(O0, []);
            } catch (u8) {
              Q0 = u8;
            }
            Reflect.construct(H, [], O0);
          } else {
            try {
              O0.call();
            } catch (u8) {
              Q0 = u8;
            }
            H.call(O0.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (u8) {
            Q0 = u8;
          }
          H();
        }
      } catch (u8) {
        if (u8 && Q0 && typeof u8.stack === "string") {
          var j0 = u8.stack.split("\n"), U1 = Q0.stack.split("\n"), c0 = j0.length - 1, E0 = U1.length - 1;
          while (c0 >= 1 && E0 >= 0 && j0[c0] !== U1[E0])
            E0--;
          for (;c0 >= 1 && E0 >= 0; c0--, E0--)
            if (j0[c0] !== U1[E0]) {
              if (c0 !== 1 || E0 !== 1)
                do
                  if (c0--, E0--, E0 < 0 || j0[c0] !== U1[E0]) {
                    var z8 = "\n" + j0[c0].replace(" at new ", " at ");
                    if (H.displayName && z8.includes("<anonymous>"))
                      z8 = z8.replace("<anonymous>", H.displayName);
                    if (typeof H === "function")
                      o8.set(H, z8);
                    return z8;
                  }
                while (c0 >= 1 && E0 >= 0);
              break;
            }
        }
      } finally {
        j8 = false, n8.current = T0, CJ(), Error.prepareStackTrace = G0;
      }
      var kJ = H ? H.displayName || H.name : "", W4 = kJ ? b8(kJ) : "";
      if (typeof H === "function")
        o8.set(H, W4);
      return W4;
    }
    function c1(H, S, h) {
      return f8(H, false);
    }
    function s1(H) {
      var S = H.prototype;
      return !!(S && S.isReactComponent);
    }
    function $1(H, S, h) {
      if (H == null)
        return "";
      if (typeof H === "function")
        return f8(H, s1(H));
      if (typeof H === "string")
        return b8(H);
      switch (H) {
        case i:
          return b8("Suspense");
        case R0:
          return b8("SuspenseList");
      }
      if (typeof H === "object")
        switch (H.$$typeof) {
          case t:
            return c1(H.render);
          case T:
            return $1(H.type, S, h);
          case e: {
            var Q0 = H, G0 = Q0._payload, T0 = Q0._init;
            try {
              return $1(T0(G0), S, h);
            } catch (O0) {
            }
          }
        }
      return "";
    }
    var i1 = Object.prototype.hasOwnProperty, l1 = {}, O1 = E1.ReactDebugCurrentFrame;
    function M8(H) {
      if (H) {
        var S = H._owner, h = $1(H.type, H._source, S ? S.type : null);
        O1.setExtraStackFrame(h);
      } else
        O1.setExtraStackFrame(null);
    }
    function RQ(H, S, h, Q0, G0) {
      {
        var T0 = Function.call.bind(i1);
        for (var O0 in H)
          if (T0(H, O0)) {
            var j0 = undefined;
            try {
              if (typeof H[O0] !== "function") {
                var U1 = Error((Q0 || "React class") + ": " + h + " type `" + O0 + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof H[O0] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw U1.name = "Invariant Violation", U1;
              }
              j0 = H[O0](S, O0, Q0, h, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (c0) {
              j0 = c0;
            }
            if (j0 && !(j0 instanceof Error))
              M8(G0), N0("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Q0 || "React class", h, O0, typeof j0), M8(null);
            if (j0 instanceof Error && !(j0.message in l1))
              l1[j0.message] = true, M8(G0), N0("Failed %s type: %s", h, j0.message), M8(null);
          }
      }
    }
    var wQ = Array.isArray;
    function t8(H) {
      return wQ(H);
    }
    function W8(H) {
      {
        var S = typeof Symbol === "function" && Symbol.toStringTag, h = S && H[Symbol.toStringTag] || H.constructor.name || "Object";
        return h;
      }
    }
    function e8(H) {
      try {
        return D8(H), false;
      } catch (S) {
        return true;
      }
    }
    function D8(H) {
      return "" + H;
    }
    function JJ(H) {
      if (e8(H))
        return N0("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", W8(H)), D8(H);
    }
    var j1 = E1.ReactCurrentOwner, QJ = { key: true, ref: true, __self: true, __source: true }, HJ, rJ, k;
    k = {};
    function n(H) {
      if (i1.call(H, "ref")) {
        var S = Object.getOwnPropertyDescriptor(H, "ref").get;
        if (S && S.isReactWarning)
          return false;
      }
      return H.ref !== undefined;
    }
    function $0(H) {
      if (i1.call(H, "key")) {
        var S = Object.getOwnPropertyDescriptor(H, "key").get;
        if (S && S.isReactWarning)
          return false;
      }
      return H.key !== undefined;
    }
    function h0(H, S) {
      if (typeof H.ref === "string" && j1.current && S && j1.current.stateNode !== S) {
        var h = z0(j1.current.type);
        if (!k[h])
          N0('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', z0(j1.current.type), H.ref), k[h] = true;
      }
    }
    function p0(H, S) {
      {
        var h = function() {
          if (!HJ)
            HJ = true, N0("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", S);
        };
        h.isReactWarning = true, Object.defineProperty(H, "key", { get: h, configurable: true });
      }
    }
    function h1(H, S) {
      {
        var h = function() {
          if (!rJ)
            rJ = true, N0("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", S);
        };
        h.isReactWarning = true, Object.defineProperty(H, "ref", { get: h, configurable: true });
      }
    }
    var q1 = function(H, S, h, Q0, G0, T0, O0) {
      var j0 = { $$typeof: _, type: H, key: S, ref: h, props: O0, _owner: T0 };
      if (j0._store = {}, Object.defineProperty(j0._store, "validated", { configurable: false, enumerable: false, writable: true, value: false }), Object.defineProperty(j0, "_self", { configurable: false, enumerable: false, writable: false, value: Q0 }), Object.defineProperty(j0, "_source", { configurable: false, enumerable: false, writable: false, value: G0 }), Object.freeze)
        Object.freeze(j0.props), Object.freeze(j0);
      return j0;
    };
    function N8(H, S, h, Q0, G0) {
      {
        var T0, O0 = {}, j0 = null, U1 = null;
        if (h !== undefined)
          JJ(h), j0 = "" + h;
        if ($0(S))
          JJ(S.key), j0 = "" + S.key;
        if (n(S))
          U1 = S.ref, h0(S, G0);
        for (T0 in S)
          if (i1.call(S, T0) && !QJ.hasOwnProperty(T0))
            O0[T0] = S[T0];
        if (H && H.defaultProps) {
          var c0 = H.defaultProps;
          for (T0 in c0)
            if (O0[T0] === undefined)
              O0[T0] = c0[T0];
        }
        if (j0 || U1) {
          var E0 = typeof H === "function" ? H.displayName || H.name || "Unknown" : H;
          if (j0)
            p0(O0, E0);
          if (U1)
            h1(O0, E0);
        }
        return q1(H, j0, U1, G0, Q0, j1.current, O0);
      }
    }
    var { ReactCurrentOwner: a0, ReactDebugCurrentFrame: A8 } = E1;
    function r0(H) {
      if (H) {
        var S = H._owner, h = $1(H.type, H._source, S ? S.type : null);
        A8.setExtraStackFrame(h);
      } else
        A8.setExtraStackFrame(null);
    }
    var X1 = false;
    function Y4(H) {
      return typeof H === "object" && H !== null && H.$$typeof === _;
    }
    function IQ() {
      {
        if (a0.current) {
          var H = z0(a0.current.type);
          if (H)
            return "\n\nCheck the render method of `" + H + "`.";
        }
        return "";
      }
    }
    function G4(H) {
      {
        if (H !== undefined) {
          var S = H.fileName.replace(/^.*[\\\/]/, ""), h = H.lineNumber;
          return "\n\nCheck your code at " + S + ":" + h + ".";
        }
        return "";
      }
    }
    var s4 = {};
    function n6(H) {
      {
        var S = IQ();
        if (!S) {
          var h = typeof H === "string" ? H : H.displayName || H.name;
          if (h)
            S = "\n\nCheck the top-level render call using <" + h + ">.";
        }
        return S;
      }
    }
    function OJ(H, S) {
      {
        if (!H._store || H._store.validated || H.key != null)
          return;
        H._store.validated = true;
        var h = n6(S);
        if (s4[h])
          return;
        s4[h] = true;
        var Q0 = "";
        if (H && H._owner && H._owner !== a0.current)
          Q0 = " It was passed a child from " + z0(H._owner.type) + ".";
        r0(H), N0('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', h, Q0), r0(null);
      }
    }
    function nJ(H, S) {
      {
        if (typeof H !== "object")
          return;
        if (t8(H))
          for (var h = 0;h < H.length; h++) {
            var Q0 = H[h];
            if (Y4(Q0))
              OJ(Q0, S);
          }
        else if (Y4(H)) {
          if (H._store)
            H._store.validated = true;
        } else if (H) {
          var G0 = T1(H);
          if (typeof G0 === "function") {
            if (G0 !== H.entries) {
              var T0 = G0.call(H), O0;
              while (!(O0 = T0.next()).done)
                if (Y4(O0.value))
                  OJ(O0.value, S);
            }
          }
        }
      }
    }
    function i4(H) {
      {
        var S = H.type;
        if (S === null || S === undefined || typeof S === "string")
          return;
        var h;
        if (typeof S === "function")
          h = S.propTypes;
        else if (typeof S === "object" && (S.$$typeof === t || S.$$typeof === T))
          h = S.propTypes;
        else
          return;
        if (h) {
          var Q0 = z0(S);
          RQ(h, H.props, "prop", Q0, H);
        } else if (S.PropTypes !== undefined && !X1) {
          X1 = true;
          var G0 = z0(S);
          N0("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", G0 || "Unknown");
        }
        if (typeof S.getDefaultProps === "function" && !S.getDefaultProps.isReactClassApproved)
          N0("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function l4(H) {
      {
        var S = Object.keys(H.props);
        for (var h = 0;h < S.length; h++) {
          var Q0 = S[h];
          if (Q0 !== "children" && Q0 !== "key") {
            r0(H), N0("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Q0), r0(null);
            break;
          }
        }
        if (H.ref !== null)
          r0(H), N0("Invalid attribute `ref` supplied to `React.Fragment`."), r0(null);
      }
    }
    function B4(H, S, h, Q0, G0, T0) {
      {
        var O0 = k1(H);
        if (!O0) {
          var j0 = "";
          if (H === undefined || typeof H === "object" && H !== null && Object.keys(H).length === 0)
            j0 += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
          var U1 = G4(G0);
          if (U1)
            j0 += U1;
          else
            j0 += IQ();
          var c0;
          if (H === null)
            c0 = "null";
          else if (t8(H))
            c0 = "array";
          else if (H !== undefined && H.$$typeof === _)
            c0 = "<" + (z0(H.type) || "Unknown") + " />", j0 = " Did you accidentally export a JSX literal instead of a component?";
          else
            c0 = typeof H;
          N0("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", c0, j0);
        }
        var E0 = N8(H, S, h, G0, T0);
        if (E0 == null)
          return E0;
        if (O0) {
          var z8 = S.children;
          if (z8 !== undefined)
            if (Q0)
              if (t8(z8)) {
                for (var kJ = 0;kJ < z8.length; kJ++)
                  nJ(z8[kJ], H);
                if (Object.freeze)
                  Object.freeze(z8);
              } else
                N0("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              nJ(z8, H);
        }
        if (H === s)
          l4(E0);
        else
          i4(E0);
        return E0;
      }
    }
    var TJ = B4;
    CP.Fragment = s, CP.jsxDEV = TJ;
  })();
});
var XV = d9((mP) => {
  (function() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function")
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);
    var E = false, _ = false, v = 5;
    function s(k, n) {
      var $0 = k.length;
      k.push(n), V(k, n, $0);
    }
    function m(k) {
      return k.length === 0 ? null : k[0];
    }
    function r(k) {
      if (k.length === 0)
        return null;
      var n = k[0], $0 = k.pop();
      if ($0 !== n)
        k[0] = $0, L0(k, $0, 0);
      return n;
    }
    function V(k, n, $0) {
      var h0 = $0;
      while (h0 > 0) {
        var p0 = h0 - 1 >>> 1, h1 = k[p0];
        if (t(h1, n) > 0)
          k[p0] = n, k[h0] = h1, h0 = p0;
        else
          return;
      }
    }
    function L0(k, n, $0) {
      var h0 = $0, p0 = k.length, h1 = p0 >>> 1;
      while (h0 < h1) {
        var q1 = (h0 + 1) * 2 - 1, N8 = k[q1], a0 = q1 + 1, A8 = k[a0];
        if (t(N8, n) < 0)
          if (a0 < p0 && t(A8, N8) < 0)
            k[h0] = A8, k[a0] = n, h0 = a0;
          else
            k[h0] = N8, k[q1] = n, h0 = q1;
        else if (a0 < p0 && t(A8, n) < 0)
          k[h0] = A8, k[a0] = n, h0 = a0;
        else
          return;
      }
    }
    function t(k, n) {
      var $0 = k.sortIndex - n.sortIndex;
      return $0 !== 0 ? $0 : k.id - n.id;
    }
    var i = 1, R0 = 2, T = 3, e = 4, c = 5;
    function w0(k, n) {
    }
    var F1 = typeof performance === "object" && typeof performance.now === "function";
    if (F1) {
      var T1 = performance;
      mP.unstable_now = function() {
        return T1.now();
      };
    } else {
      var E1 = Date, N0 = E1.now();
      mP.unstable_now = function() {
        return E1.now() - N0;
      };
    }
    var Y0 = 1073741823, m0 = -1, A0 = 250, K1 = 5000, v0 = 1e4, e0 = Y0, i0 = [], k1 = [], R1 = 1, l0 = null, z0 = T, J1 = false, W0 = false, O8 = false, gJ = typeof setTimeout === "function" ? setTimeout : null, m1 = typeof clearTimeout === "function" ? clearTimeout : null, VJ = typeof setImmediate !== "undefined" ? setImmediate : null, Y8 = typeof navigator !== "undefined" && navigator.scheduling !== undefined && navigator.scheduling.isInputPending !== undefined ? navigator.scheduling.isInputPending.bind(navigator.scheduling) : null;
    function r8(k) {
      var n = m(k1);
      while (n !== null) {
        if (n.callback === null)
          r(k1);
        else if (n.startTime <= k)
          r(k1), n.sortIndex = n.expirationTime, s(i0, n);
        else
          return;
        n = m(k1);
      }
    }
    function G8(k) {
      if (O8 = false, r8(k), !W0)
        if (m(i0) !== null)
          W0 = true, JJ(L8);
        else {
          var n = m(k1);
          if (n !== null)
            j1(G8, n.startTime - k);
        }
    }
    function L8(k, n) {
      if (W0 = false, O8)
        O8 = false, QJ();
      J1 = true;
      var $0 = z0;
      try {
        if (_)
          try {
            return EQ(k, n);
          } catch (p0) {
            if (l0 !== null) {
              var h0 = mP.unstable_now();
              w0(l0, h0), l0.isQueued = false;
            }
            throw p0;
          }
        else
          return EQ(k, n);
      } finally {
        l0 = null, z0 = $0, J1 = false;
      }
    }
    function EQ(k, n) {
      var $0 = n;
      r8($0), l0 = m(i0);
      while (l0 !== null && !E) {
        if (l0.expirationTime > $0 && (!k || M8()))
          break;
        var h0 = l0.callback;
        if (typeof h0 === "function") {
          l0.callback = null, z0 = l0.priorityLevel;
          var p0 = l0.expirationTime <= $0, h1 = h0(p0);
          if ($0 = mP.unstable_now(), typeof h1 === "function")
            l0.callback = h1;
          else if (l0 === m(i0))
            r(i0);
          r8($0);
        } else
          r(i0);
        l0 = m(i0);
      }
      if (l0 !== null)
        return true;
      else {
        var q1 = m(k1);
        if (q1 !== null)
          j1(G8, q1.startTime - $0);
        return false;
      }
    }
    function CJ(k, n) {
      switch (k) {
        case i:
        case R0:
        case T:
        case e:
        case c:
          break;
        default:
          k = T;
      }
      var $0 = z0;
      z0 = k;
      try {
        return n();
      } finally {
        z0 = $0;
      }
    }
    function n8(k) {
      var n;
      switch (z0) {
        case i:
        case R0:
        case T:
          n = T;
          break;
        default:
          n = z0;
          break;
      }
      var $0 = z0;
      z0 = n;
      try {
        return k();
      } finally {
        z0 = $0;
      }
    }
    function $J(k) {
      var n = z0;
      return function() {
        var $0 = z0;
        z0 = n;
        try {
          return k.apply(this, arguments);
        } finally {
          z0 = $0;
        }
      };
    }
    function b8(k, n, $0) {
      var h0 = mP.unstable_now(), p0;
      if (typeof $0 === "object" && $0 !== null) {
        var h1 = $0.delay;
        if (typeof h1 === "number" && h1 > 0)
          p0 = h0 + h1;
        else
          p0 = h0;
      } else
        p0 = h0;
      var q1;
      switch (k) {
        case i:
          q1 = m0;
          break;
        case R0:
          q1 = A0;
          break;
        case c:
          q1 = e0;
          break;
        case e:
          q1 = v0;
          break;
        case T:
        default:
          q1 = K1;
          break;
      }
      var N8 = p0 + q1, a0 = { id: R1++, callback: n, priorityLevel: k, startTime: p0, expirationTime: N8, sortIndex: -1 };
      if (p0 > h0) {
        if (a0.sortIndex = p0, s(k1, a0), m(i0) === null && a0 === m(k1)) {
          if (O8)
            QJ();
          else
            O8 = true;
          j1(G8, p0 - h0);
        }
      } else if (a0.sortIndex = N8, s(i0, a0), !W0 && !J1)
        W0 = true, JJ(L8);
      return a0;
    }
    function j8() {
    }
    function o8() {
      if (!W0 && !J1)
        W0 = true, JJ(L8);
    }
    function B8() {
      return m(i0);
    }
    function f8(k) {
      k.callback = null;
    }
    function c1() {
      return z0;
    }
    var s1 = false, $1 = null, i1 = -1, l1 = v, O1 = -1;
    function M8() {
      var k = mP.unstable_now() - O1;
      if (k < l1)
        return false;
      return true;
    }
    function RQ() {
    }
    function wQ(k) {
      if (k < 0 || k > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      if (k > 0)
        l1 = Math.floor(1000 / k);
      else
        l1 = v;
    }
    var t8 = function() {
      if ($1 !== null) {
        var k = mP.unstable_now();
        O1 = k;
        var n = true, $0 = true;
        try {
          $0 = $1(n, k);
        } finally {
          if ($0)
            W8();
          else
            s1 = false, $1 = null;
        }
      } else
        s1 = false;
    }, W8;
    if (typeof VJ === "function")
      W8 = function() {
        VJ(t8);
      };
    else if (typeof MessageChannel !== "undefined") {
      var e8 = new MessageChannel, D8 = e8.port2;
      e8.port1.onmessage = t8, W8 = function() {
        D8.postMessage(null);
      };
    } else
      W8 = function() {
        gJ(t8, 0);
      };
    function JJ(k) {
      if ($1 = k, !s1)
        s1 = true, W8();
    }
    function j1(k, n) {
      i1 = gJ(function() {
        k(mP.unstable_now());
      }, n);
    }
    function QJ() {
      m1(i1), i1 = -1;
    }
    var HJ = RQ, rJ = null;
    if (mP.unstable_IdlePriority = c, mP.unstable_ImmediatePriority = i, mP.unstable_LowPriority = e, mP.unstable_NormalPriority = T, mP.unstable_Profiling = rJ, mP.unstable_UserBlockingPriority = R0, mP.unstable_cancelCallback = f8, mP.unstable_continueExecution = o8, mP.unstable_forceFrameRate = wQ, mP.unstable_getCurrentPriorityLevel = c1, mP.unstable_getFirstCallbackNode = B8, mP.unstable_next = n8, mP.unstable_pauseExecution = j8, mP.unstable_requestPaint = HJ, mP.unstable_runWithPriority = CJ, mP.unstable_scheduleCallback = b8, mP.unstable_shouldYield = M8, mP.unstable_wrapCallback = $J, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function")
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error);
  })();
});
var YV = d9((cP) => {
  var E = G1(a8(), 1), _ = G1(XV(), 1);
  (function() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function")
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);
    var v = E.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, s = false;
    function m(J) {
      s = J;
    }
    function r(J) {
      if (!s) {
        for (var Q = arguments.length, Z = new Array(Q > 1 ? Q - 1 : 0), X = 1;X < Q; X++)
          Z[X - 1] = arguments[X];
        L0("warn", J, Z);
      }
    }
    function V(J) {
      if (!s) {
        for (var Q = arguments.length, Z = new Array(Q > 1 ? Q - 1 : 0), X = 1;X < Q; X++)
          Z[X - 1] = arguments[X];
        L0("error", J, Z);
      }
    }
    function L0(J, Q, Z) {
      {
        var X = v.ReactDebugCurrentFrame, Y = X.getStackAddendum();
        if (Y !== "")
          Q += "%s", Z = Z.concat([Y]);
        var G = Z.map(function(B) {
          return String(B);
        });
        G.unshift("Warning: " + Q), Function.prototype.apply.call(console[J], console, G);
      }
    }
    var t = 0, i = 1, R0 = 2, T = 3, e = 4, c = 5, w0 = 6, F1 = 7, T1 = 8, E1 = 9, N0 = 10, Y0 = 11, m0 = 12, A0 = 13, K1 = 14, v0 = 15, e0 = 16, i0 = 17, k1 = 18, R1 = 19, l0 = 21, z0 = 22, J1 = 23, W0 = 24, O8 = 25, gJ = true, m1 = false, VJ = false, Y8 = false, r8 = false, G8 = true, L8 = false, EQ = false, CJ = true, n8 = true, $J = true, b8 = new Set, j8 = {}, o8 = {};
    function B8(J, Q) {
      f8(J, Q), f8(J + "Capture", Q);
    }
    function f8(J, Q) {
      if (j8[J])
        V("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", J);
      j8[J] = Q;
      {
        var Z = J.toLowerCase();
        if (o8[Z] = J, J === "onDoubleClick")
          o8.ondblclick = J;
      }
      for (var X = 0;X < Q.length; X++)
        b8.add(Q[X]);
    }
    var c1 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined", s1 = Object.prototype.hasOwnProperty;
    function $1(J) {
      {
        var Q = typeof Symbol === "function" && Symbol.toStringTag, Z = Q && J[Symbol.toStringTag] || J.constructor.name || "Object";
        return Z;
      }
    }
    function i1(J) {
      try {
        return l1(J), false;
      } catch (Q) {
        return true;
      }
    }
    function l1(J) {
      return "" + J;
    }
    function O1(J, Q) {
      if (i1(J))
        return V("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", Q, $1(J)), l1(J);
    }
    function M8(J) {
      if (i1(J))
        return V("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", $1(J)), l1(J);
    }
    function RQ(J, Q) {
      if (i1(J))
        return V("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", Q, $1(J)), l1(J);
    }
    function wQ(J, Q) {
      if (i1(J))
        return V("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", Q, $1(J)), l1(J);
    }
    function t8(J) {
      if (i1(J))
        return V("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", $1(J)), l1(J);
    }
    function W8(J) {
      if (i1(J))
        return V("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", $1(J)), l1(J);
    }
    var e8 = 0, D8 = 1, JJ = 2, j1 = 3, QJ = 4, HJ = 5, rJ = 6, k = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", n = k + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", $0 = new RegExp("^[" + k + "][" + n + "]*$"), h0 = {}, p0 = {};
    function h1(J) {
      if (s1.call(p0, J))
        return true;
      if (s1.call(h0, J))
        return false;
      if ($0.test(J))
        return p0[J] = true, true;
      return h0[J] = true, V("Invalid attribute name: `%s`", J), false;
    }
    function q1(J, Q, Z) {
      if (Q !== null)
        return Q.type === e8;
      if (Z)
        return false;
      if (J.length > 2 && (J[0] === "o" || J[0] === "O") && (J[1] === "n" || J[1] === "N"))
        return true;
      return false;
    }
    function N8(J, Q, Z, X) {
      if (Z !== null && Z.type === e8)
        return false;
      switch (typeof Q) {
        case "function":
        case "symbol":
          return true;
        case "boolean": {
          if (X)
            return false;
          if (Z !== null)
            return !Z.acceptsBooleans;
          else {
            var Y = J.toLowerCase().slice(0, 5);
            return Y !== "data-" && Y !== "aria-";
          }
        }
        default:
          return false;
      }
    }
    function a0(J, Q, Z, X) {
      if (Q === null || typeof Q === "undefined")
        return true;
      if (N8(J, Q, Z, X))
        return true;
      if (X)
        return false;
      if (Z !== null)
        switch (Z.type) {
          case j1:
            return !Q;
          case QJ:
            return Q === false;
          case HJ:
            return isNaN(Q);
          case rJ:
            return isNaN(Q) || Q < 1;
        }
      return false;
    }
    function A8(J) {
      return X1.hasOwnProperty(J) ? X1[J] : null;
    }
    function r0(J, Q, Z, X, Y, G, B) {
      this.acceptsBooleans = Q === JJ || Q === j1 || Q === QJ, this.attributeName = X, this.attributeNamespace = Y, this.mustUseProperty = Z, this.propertyName = J, this.type = Q, this.sanitizeURL = G, this.removeEmptyString = B;
    }
    var X1 = {}, Y4 = ["children", "dangerouslySetInnerHTML", "defaultValue", "defaultChecked", "innerHTML", "suppressContentEditableWarning", "suppressHydrationWarning", "style"];
    Y4.forEach(function(J) {
      X1[J] = new r0(J, e8, false, J, null, false, false);
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(J) {
      var Q = J[0], Z = J[1];
      X1[Q] = new r0(Q, D8, false, Z, null, false, false);
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(J) {
      X1[J] = new r0(J, JJ, false, J.toLowerCase(), null, false, false);
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(J) {
      X1[J] = new r0(J, JJ, false, J, null, false, false);
    }), ["allowFullScreen", "async", "autoFocus", "autoPlay", "controls", "default", "defer", "disabled", "disablePictureInPicture", "disableRemotePlayback", "formNoValidate", "hidden", "loop", "noModule", "noValidate", "open", "playsInline", "readOnly", "required", "reversed", "scoped", "seamless", "itemScope"].forEach(function(J) {
      X1[J] = new r0(J, j1, false, J.toLowerCase(), null, false, false);
    }), ["checked", "multiple", "muted", "selected"].forEach(function(J) {
      X1[J] = new r0(J, j1, true, J, null, false, false);
    }), ["capture", "download"].forEach(function(J) {
      X1[J] = new r0(J, QJ, false, J, null, false, false);
    }), ["cols", "rows", "size", "span"].forEach(function(J) {
      X1[J] = new r0(J, rJ, false, J, null, false, false);
    }), ["rowSpan", "start"].forEach(function(J) {
      X1[J] = new r0(J, HJ, false, J.toLowerCase(), null, false, false);
    });
    var IQ = /[\-\:]([a-z])/g, G4 = function(J) {
      return J[1].toUpperCase();
    };
    ["accent-height", "alignment-baseline", "arabic-form", "baseline-shift", "cap-height", "clip-path", "clip-rule", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "dominant-baseline", "enable-background", "fill-opacity", "fill-rule", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "glyph-name", "glyph-orientation-horizontal", "glyph-orientation-vertical", "horiz-adv-x", "horiz-origin-x", "image-rendering", "letter-spacing", "lighting-color", "marker-end", "marker-mid", "marker-start", "overline-position", "overline-thickness", "paint-order", "panose-1", "pointer-events", "rendering-intent", "shape-rendering", "stop-color", "stop-opacity", "strikethrough-position", "strikethrough-thickness", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-anchor", "text-decoration", "text-rendering", "underline-position", "underline-thickness", "unicode-bidi", "unicode-range", "units-per-em", "v-alphabetic", "v-hanging", "v-ideographic", "v-mathematical", "vector-effect", "vert-adv-y", "vert-origin-x", "vert-origin-y", "word-spacing", "writing-mode", "xmlns:xlink", "x-height"].forEach(function(J) {
      var Q = J.replace(IQ, G4);
      X1[Q] = new r0(Q, D8, false, J, null, false, false);
    }), ["xlink:actuate", "xlink:arcrole", "xlink:role", "xlink:show", "xlink:title", "xlink:type"].forEach(function(J) {
      var Q = J.replace(IQ, G4);
      X1[Q] = new r0(Q, D8, false, J, "http://www.w3.org/1999/xlink", false, false);
    }), ["xml:base", "xml:lang", "xml:space"].forEach(function(J) {
      var Q = J.replace(IQ, G4);
      X1[Q] = new r0(Q, D8, false, J, "http://www.w3.org/XML/1998/namespace", false, false);
    }), ["tabIndex", "crossOrigin"].forEach(function(J) {
      X1[J] = new r0(J, D8, false, J.toLowerCase(), null, false, false);
    });
    var s4 = "xlinkHref";
    X1[s4] = new r0("xlinkHref", D8, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false), ["src", "href", "action", "formAction"].forEach(function(J) {
      X1[J] = new r0(J, D8, false, J.toLowerCase(), null, true, true);
    });
    var n6 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, OJ = false;
    function nJ(J) {
      if (!OJ && n6.test(J))
        OJ = true, V("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(J));
    }
    function i4(J, Q, Z, X) {
      if (X.mustUseProperty) {
        var Y = X.propertyName;
        return J[Y];
      } else {
        if (O1(Z, Q), X.sanitizeURL)
          nJ("" + Z);
        var G = X.attributeName, B = null;
        if (X.type === QJ) {
          if (J.hasAttribute(G)) {
            var W = J.getAttribute(G);
            if (W === "")
              return true;
            if (a0(Q, Z, X, false))
              return W;
            if (W === "" + Z)
              return Z;
            return W;
          }
        } else if (J.hasAttribute(G)) {
          if (a0(Q, Z, X, false))
            return J.getAttribute(G);
          if (X.type === j1)
            return Z;
          B = J.getAttribute(G);
        }
        if (a0(Q, Z, X, false))
          return B === null ? Z : B;
        else if (B === "" + Z)
          return Z;
        else
          return B;
      }
    }
    function l4(J, Q, Z, X) {
      {
        if (!h1(Q))
          return;
        if (!J.hasAttribute(Q))
          return Z === undefined ? undefined : null;
        var Y = J.getAttribute(Q);
        if (O1(Z, Q), Y === "" + Z)
          return Z;
        return Y;
      }
    }
    function B4(J, Q, Z, X) {
      var Y = A8(Q);
      if (q1(Q, Y, X))
        return;
      if (a0(Q, Z, Y, X))
        Z = null;
      if (X || Y === null) {
        if (h1(Q)) {
          var G = Q;
          if (Z === null)
            J.removeAttribute(G);
          else
            O1(Z, Q), J.setAttribute(G, "" + Z);
        }
        return;
      }
      var B = Y.mustUseProperty;
      if (B) {
        var W = Y.propertyName;
        if (Z === null) {
          var z = Y.type;
          J[W] = z === j1 ? false : "";
        } else
          J[W] = Z;
        return;
      }
      var { attributeName: q, attributeNamespace: U } = Y;
      if (Z === null)
        J.removeAttribute(q);
      else {
        var j = Y.type, O;
        if (j === j1 || j === QJ && Z === true)
          O = "";
        else if (O1(Z, q), O = "" + Z, Y.sanitizeURL)
          nJ(O.toString());
        if (U)
          J.setAttributeNS(U, q, O);
        else
          J.setAttribute(q, O);
      }
    }
    var TJ = Symbol.for("react.element"), H = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), h = Symbol.for("react.strict_mode"), Q0 = Symbol.for("react.profiler"), G0 = Symbol.for("react.provider"), T0 = Symbol.for("react.context"), O0 = Symbol.for("react.forward_ref"), j0 = Symbol.for("react.suspense"), U1 = Symbol.for("react.suspense_list"), c0 = Symbol.for("react.memo"), E0 = Symbol.for("react.lazy"), z8 = Symbol.for("react.scope"), kJ = Symbol.for("react.debug_trace_mode"), W4 = Symbol.for("react.offscreen"), u8 = Symbol.for("react.legacy_hidden"), UX = Symbol.for("react.cache"), VX = Symbol.for("react.tracing_marker"), c9 = Symbol.iterator, $X = "@@iterator";
    function oJ(J) {
      if (J === null || typeof J !== "object")
        return null;
      var Q = c9 && J[c9] || J[$X];
      if (typeof Q === "function")
        return Q;
      return null;
    }
    var D0 = Object.assign, _Q = 0, o6, t6, e6, J7, Q7, Z7, X7;
    function s9() {
    }
    s9.__reactDisabledLog = true;
    function HX() {
      {
        if (_Q === 0) {
          o6 = console.log, t6 = console.info, e6 = console.warn, J7 = console.error, Q7 = console.group, Z7 = console.groupCollapsed, X7 = console.groupEnd;
          var J = { configurable: true, enumerable: true, value: s9, writable: true };
          Object.defineProperties(console, { info: J, log: J, warn: J, error: J, group: J, groupCollapsed: J, groupEnd: J });
        }
        _Q++;
      }
    }
    function Y7() {
      {
        if (_Q--, _Q === 0) {
          var J = { configurable: true, enumerable: true, writable: true };
          Object.defineProperties(console, { log: D0({}, J, { value: o6 }), info: D0({}, J, { value: t6 }), warn: D0({}, J, { value: e6 }), error: D0({}, J, { value: J7 }), group: D0({}, J, { value: Q7 }), groupCollapsed: D0({}, J, { value: Z7 }), groupEnd: D0({}, J, { value: X7 }) });
        }
        if (_Q < 0)
          V("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var z4 = v.ReactCurrentDispatcher, LQ;
    function ZJ(J, Q, Z) {
      {
        if (LQ === undefined)
          try {
            throw Error();
          } catch (Y) {
            var X = Y.stack.trim().match(/\n( *(at )?)/);
            LQ = X && X[1] || "";
          }
        return "\n" + LQ + J;
      }
    }
    var NQ = false, p4;
    {
      var i9 = typeof WeakMap === "function" ? WeakMap : Map;
      p4 = new i9;
    }
    function G7(J, Q) {
      if (!J || NQ)
        return "";
      {
        var Z = p4.get(J);
        if (Z !== undefined)
          return Z;
      }
      var X;
      NQ = true;
      var Y = Error.prepareStackTrace;
      Error.prepareStackTrace = undefined;
      var G;
      G = z4.current, z4.current = null, HX();
      try {
        if (Q) {
          var B = function() {
            throw Error();
          };
          if (Object.defineProperty(B.prototype, "props", { set: function() {
            throw Error();
          } }), typeof Reflect === "object" && Reflect.construct) {
            try {
              Reflect.construct(B, []);
            } catch (A) {
              X = A;
            }
            Reflect.construct(J, [], B);
          } else {
            try {
              B.call();
            } catch (A) {
              X = A;
            }
            J.call(B.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (A) {
            X = A;
          }
          J();
        }
      } catch (A) {
        if (A && X && typeof A.stack === "string") {
          var W = A.stack.split("\n"), z = X.stack.split("\n"), q = W.length - 1, U = z.length - 1;
          while (q >= 1 && U >= 0 && W[q] !== z[U])
            U--;
          for (;q >= 1 && U >= 0; q--, U--)
            if (W[q] !== z[U]) {
              if (q !== 1 || U !== 1)
                do
                  if (q--, U--, U < 0 || W[q] !== z[U]) {
                    var j = "\n" + W[q].replace(" at new ", " at ");
                    if (J.displayName && j.includes("<anonymous>"))
                      j = j.replace("<anonymous>", J.displayName);
                    if (typeof J === "function")
                      p4.set(J, j);
                    return j;
                  }
                while (q >= 1 && U >= 0);
              break;
            }
        }
      } finally {
        NQ = false, z4.current = G, Y7(), Error.prepareStackTrace = Y;
      }
      var O = J ? J.displayName || J.name : "", F = O ? ZJ(O) : "";
      if (typeof J === "function")
        p4.set(J, F);
      return F;
    }
    function OX(J, Q, Z) {
      return G7(J, true);
    }
    function SQ(J, Q, Z) {
      return G7(J, false);
    }
    function l9(J) {
      var Q = J.prototype;
      return !!(Q && Q.isReactComponent);
    }
    function a4(J, Q, Z) {
      if (J == null)
        return "";
      if (typeof J === "function")
        return G7(J, l9(J));
      if (typeof J === "string")
        return ZJ(J);
      switch (J) {
        case j0:
          return ZJ("Suspense");
        case U1:
          return ZJ("SuspenseList");
      }
      if (typeof J === "object")
        switch (J.$$typeof) {
          case O0:
            return SQ(J.render);
          case c0:
            return a4(J.type, Q, Z);
          case E0: {
            var X = J, Y = X._payload, G = X._init;
            try {
              return a4(G(Y), Q, Z);
            } catch (B) {
            }
          }
        }
      return "";
    }
    function r4(J) {
      var Q = J._debugOwner ? J._debugOwner.type : null, Z = J._debugSource;
      switch (J.tag) {
        case c:
          return ZJ(J.type);
        case e0:
          return ZJ("Lazy");
        case A0:
          return ZJ("Suspense");
        case R1:
          return ZJ("SuspenseList");
        case t:
        case R0:
        case v0:
          return SQ(J.type);
        case Y0:
          return SQ(J.type.render);
        case i:
          return OX(J.type);
        default:
          return "";
      }
    }
    function p9(J) {
      try {
        var Q = "", Z = J;
        do
          Q += r4(Z), Z = Z.return;
        while (Z);
        return Q;
      } catch (X) {
        return "\nError generating stack: " + X.message + "\n" + X.stack;
      }
    }
    function xQ(J, Q, Z) {
      var X = J.displayName;
      if (X)
        return X;
      var Y = Q.displayName || Q.name || "";
      return Y !== "" ? Z + "(" + Y + ")" : Z;
    }
    function B7(J) {
      return J.displayName || "Context";
    }
    function s0(J) {
      if (J == null)
        return null;
      if (typeof J.tag === "number")
        V("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
      if (typeof J === "function")
        return J.displayName || J.name || null;
      if (typeof J === "string")
        return J;
      switch (J) {
        case S:
          return "Fragment";
        case H:
          return "Portal";
        case Q0:
          return "Profiler";
        case h:
          return "StrictMode";
        case j0:
          return "Suspense";
        case U1:
          return "SuspenseList";
      }
      if (typeof J === "object")
        switch (J.$$typeof) {
          case T0:
            var Q = J;
            return B7(Q) + ".Consumer";
          case G0:
            var Z = J;
            return B7(Z._context) + ".Provider";
          case O0:
            return xQ(J, J.render, "ForwardRef");
          case c0:
            var X = J.displayName || null;
            if (X !== null)
              return X;
            return s0(J.type) || "Memo";
          case E0: {
            var Y = J, G = Y._payload, B = Y._init;
            try {
              return s0(B(G));
            } catch (W) {
              return null;
            }
          }
        }
      return null;
    }
    function jX(J, Q, Z) {
      var X = Q.displayName || Q.name || "";
      return J.displayName || (X !== "" ? Z + "(" + X + ")" : Z);
    }
    function a9(J) {
      return J.displayName || "Context";
    }
    function H0(J) {
      var { tag: Q, type: Z } = J;
      switch (Q) {
        case W0:
          return "Cache";
        case E1:
          var X = Z;
          return a9(X) + ".Consumer";
        case N0:
          var Y = Z;
          return a9(Y._context) + ".Provider";
        case k1:
          return "DehydratedFragment";
        case Y0:
          return jX(Z, Z.render, "ForwardRef");
        case F1:
          return "Fragment";
        case c:
          return Z;
        case e:
          return "Portal";
        case T:
          return "Root";
        case w0:
          return "Text";
        case e0:
          return s0(Z);
        case T1:
          if (Z === h)
            return "StrictMode";
          return "Mode";
        case z0:
          return "Offscreen";
        case m0:
          return "Profiler";
        case l0:
          return "Scope";
        case A0:
          return "Suspense";
        case R1:
          return "SuspenseList";
        case O8:
          return "TracingMarker";
        case i:
        case t:
        case i0:
        case R0:
        case K1:
        case v0:
          if (typeof Z === "function")
            return Z.displayName || Z.name || null;
          if (typeof Z === "string")
            return Z;
          break;
      }
      return null;
    }
    var r9 = v.ReactDebugCurrentFrame, K8 = null, vQ = false;
    function gQ() {
      {
        if (K8 === null)
          return null;
        var J = K8._debugOwner;
        if (J !== null && typeof J !== "undefined")
          return H0(J);
      }
      return null;
    }
    function MX() {
      {
        if (K8 === null)
          return "";
        return p9(K8);
      }
    }
    function b1() {
      r9.getCurrentStack = null, K8 = null, vQ = false;
    }
    function B1(J) {
      r9.getCurrentStack = J === null ? null : MX, K8 = J, vQ = false;
    }
    function DX() {
      return K8;
    }
    function XJ(J) {
      vQ = J;
    }
    function S8(J) {
      return "" + J;
    }
    function jJ(J) {
      switch (typeof J) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return J;
        case "object":
          return W8(J), J;
        default:
          return "";
      }
    }
    var n4 = { button: true, checkbox: true, image: true, hidden: true, radio: true, reset: true, submit: true };
    function W7(J, Q) {
      {
        if (!(n4[Q.type] || Q.onChange || Q.onInput || Q.readOnly || Q.disabled || Q.value == null))
          V("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.");
        if (!(Q.onChange || Q.readOnly || Q.disabled || Q.checked == null))
          V("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
      }
    }
    function tJ(J) {
      var { type: Q, nodeName: Z } = J;
      return Z && Z.toLowerCase() === "input" && (Q === "checkbox" || Q === "radio");
    }
    function z7(J) {
      return J._valueTracker;
    }
    function AX(J) {
      J._valueTracker = null;
    }
    function o4(J) {
      var Q = "";
      if (!J)
        return Q;
      if (tJ(J))
        Q = J.checked ? "true" : "false";
      else
        Q = J.value;
      return Q;
    }
    function K7(J) {
      var Q = tJ(J) ? "checked" : "value", Z = Object.getOwnPropertyDescriptor(J.constructor.prototype, Q);
      W8(J[Q]);
      var X = "" + J[Q];
      if (J.hasOwnProperty(Q) || typeof Z === "undefined" || typeof Z.get !== "function" || typeof Z.set !== "function")
        return;
      var { get: Y, set: G } = Z;
      Object.defineProperty(J, Q, { configurable: true, get: function() {
        return Y.call(this);
      }, set: function(W) {
        W8(W), X = "" + W, G.call(this, W);
      } }), Object.defineProperty(J, Q, { enumerable: Z.enumerable });
      var B = { getValue: function() {
        return X;
      }, setValue: function(W) {
        W8(W), X = "" + W;
      }, stopTracking: function() {
        AX(J), delete J[Q];
      } };
      return B;
    }
    function CQ(J) {
      if (z7(J))
        return;
      J._valueTracker = K7(J);
    }
    function t4(J) {
      if (!J)
        return false;
      var Q = z7(J);
      if (!Q)
        return true;
      var Z = Q.getValue(), X = o4(J);
      if (X !== Z)
        return Q.setValue(X), true;
      return false;
    }
    function e4(J) {
      if (J = J || (typeof document !== "undefined" ? document : undefined), typeof J === "undefined")
        return null;
      try {
        return J.activeElement || J.body;
      } catch (Q) {
        return J.body;
      }
    }
    var n9 = false, o9 = false, t9 = false, K = false;
    function $(J) {
      var Q = J.type === "checkbox" || J.type === "radio";
      return Q ? J.checked != null : J.value != null;
    }
    function P(J, Q) {
      var Z = J, X = Q.checked, Y = D0({}, Q, { defaultChecked: undefined, defaultValue: undefined, value: undefined, checked: X != null ? X : Z._wrapperState.initialChecked });
      return Y;
    }
    function w(J, Q) {
      {
        if (W7("input", Q), Q.checked !== undefined && Q.defaultChecked !== undefined && !o9)
          V("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", gQ() || "A component", Q.type), o9 = true;
        if (Q.value !== undefined && Q.defaultValue !== undefined && !n9)
          V("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", gQ() || "A component", Q.type), n9 = true;
      }
      var Z = J, X = Q.defaultValue == null ? "" : Q.defaultValue;
      Z._wrapperState = { initialChecked: Q.checked != null ? Q.checked : Q.defaultChecked, initialValue: jJ(Q.value != null ? Q.value : X), controlled: $(Q) };
    }
    function g(J, Q) {
      var Z = J, X = Q.checked;
      if (X != null)
        B4(Z, "checked", X, false);
    }
    function J0(J, Q) {
      var Z = J;
      {
        var X = $(Q);
        if (!Z._wrapperState.controlled && X && !K)
          V("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), K = true;
        if (Z._wrapperState.controlled && !X && !t9)
          V("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), t9 = true;
      }
      g(J, Q);
      var Y = jJ(Q.value), G = Q.type;
      if (Y != null) {
        if (G === "number") {
          if (Y === 0 && Z.value === "" || Z.value != Y)
            Z.value = S8(Y);
        } else if (Z.value !== S8(Y))
          Z.value = S8(Y);
      } else if (G === "submit" || G === "reset") {
        Z.removeAttribute("value");
        return;
      }
      if (Q.hasOwnProperty("value"))
        f0(Z, Q.type, Y);
      else if (Q.hasOwnProperty("defaultValue"))
        f0(Z, Q.type, jJ(Q.defaultValue));
      if (Q.checked == null && Q.defaultChecked != null)
        Z.defaultChecked = !!Q.defaultChecked;
    }
    function p(J, Q, Z) {
      var X = J;
      if (Q.hasOwnProperty("value") || Q.hasOwnProperty("defaultValue")) {
        var Y = Q.type, G = Y === "submit" || Y === "reset";
        if (G && (Q.value === undefined || Q.value === null))
          return;
        var B = S8(X._wrapperState.initialValue);
        if (!Z) {
          if (B !== X.value)
            X.value = B;
        }
        X.defaultValue = B;
      }
      var W = X.name;
      if (W !== "")
        X.name = "";
      if (X.defaultChecked = !X.defaultChecked, X.defaultChecked = !!X._wrapperState.initialChecked, W !== "")
        X.name = W;
    }
    function V0(J, Q) {
      var Z = J;
      J0(Z, Q), S0(Z, Q);
    }
    function S0(J, Q) {
      var Z = Q.name;
      if (Q.type === "radio" && Z != null) {
        var X = J;
        while (X.parentNode)
          X = X.parentNode;
        O1(Z, "name");
        var Y = X.querySelectorAll("input[name=" + JSON.stringify("" + Z) + '][type="radio"]');
        for (var G = 0;G < Y.length; G++) {
          var B = Y[G];
          if (B === J || B.form !== J.form)
            continue;
          var W = d5(B);
          if (!W)
            throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
          t4(B), J0(B, W);
        }
      }
    }
    function f0(J, Q, Z) {
      if (Q !== "number" || e4(J.ownerDocument) !== J) {
        if (Z == null)
          J.defaultValue = S8(J._wrapperState.initialValue);
        else if (J.defaultValue !== S8(Z))
          J.defaultValue = S8(Z);
      }
    }
    var n0 = false, o0 = false, Q1 = false;
    function W1(J, Q) {
      {
        if (Q.value == null) {
          if (typeof Q.children === "object" && Q.children !== null)
            E.Children.forEach(Q.children, function(Z) {
              if (Z == null)
                return;
              if (typeof Z === "string" || typeof Z === "number")
                return;
              if (!o0)
                o0 = true, V("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.");
            });
          else if (Q.dangerouslySetInnerHTML != null) {
            if (!Q1)
              Q1 = true, V("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.");
          }
        }
        if (Q.selected != null && !n0)
          V("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), n0 = true;
      }
    }
    function w1(J, Q) {
      if (Q.value != null)
        J.setAttribute("value", S8(jJ(Q.value)));
    }
    var J6 = Array.isArray;
    function I1(J) {
      return J6(J);
    }
    var q7 = false;
    function e9() {
      var J = gQ();
      if (J)
        return "\n\nCheck the render method of `" + J + "`.";
      return "";
    }
    var U7 = ["value", "defaultValue"];
    function PX(J) {
      {
        W7("select", J);
        for (var Q = 0;Q < U7.length; Q++) {
          var Z = U7[Q];
          if (J[Z] == null)
            continue;
          var X = I1(J[Z]);
          if (J.multiple && !X)
            V("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", Z, e9());
          else if (!J.multiple && X)
            V("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", Z, e9());
        }
      }
    }
    function eJ(J, Q, Z, X) {
      var Y = J.options;
      if (Q) {
        var G = Z, B = {};
        for (var W = 0;W < G.length; W++)
          B["$" + G[W]] = true;
        for (var z = 0;z < Y.length; z++) {
          var q = B.hasOwnProperty("$" + Y[z].value);
          if (Y[z].selected !== q)
            Y[z].selected = q;
          if (q && X)
            Y[z].defaultSelected = true;
        }
      } else {
        var U = S8(jJ(Z)), j = null;
        for (var O = 0;O < Y.length; O++) {
          if (Y[O].value === U) {
            if (Y[O].selected = true, X)
              Y[O].defaultSelected = true;
            return;
          }
          if (j === null && !Y[O].disabled)
            j = Y[O];
        }
        if (j !== null)
          j.selected = true;
      }
    }
    function V7(J, Q) {
      return D0({}, Q, { value: undefined });
    }
    function vW(J, Q) {
      var Z = J;
      if (PX(Q), Z._wrapperState = { wasMultiple: !!Q.multiple }, Q.value !== undefined && Q.defaultValue !== undefined && !q7)
        V("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), q7 = true;
    }
    function zV(J, Q) {
      var Z = J;
      Z.multiple = !!Q.multiple;
      var X = Q.value;
      if (X != null)
        eJ(Z, !!Q.multiple, X, false);
      else if (Q.defaultValue != null)
        eJ(Z, !!Q.multiple, Q.defaultValue, true);
    }
    function KV(J, Q) {
      var Z = J, X = Z._wrapperState.wasMultiple;
      Z._wrapperState.wasMultiple = !!Q.multiple;
      var Y = Q.value;
      if (Y != null)
        eJ(Z, !!Q.multiple, Y, false);
      else if (X !== !!Q.multiple)
        if (Q.defaultValue != null)
          eJ(Z, !!Q.multiple, Q.defaultValue, true);
        else
          eJ(Z, !!Q.multiple, Q.multiple ? [] : "", false);
    }
    function qV(J, Q) {
      var Z = J, X = Q.value;
      if (X != null)
        eJ(Z, !!Q.multiple, X, false);
    }
    var gW = false;
    function FX(J, Q) {
      var Z = J;
      if (Q.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var X = D0({}, Q, { value: undefined, defaultValue: undefined, children: S8(Z._wrapperState.initialValue) });
      return X;
    }
    function CW(J, Q) {
      var Z = J;
      if (W7("textarea", Q), Q.value !== undefined && Q.defaultValue !== undefined && !gW)
        V("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", gQ() || "A component"), gW = true;
      var X = Q.value;
      if (X == null) {
        var { children: Y, defaultValue: G } = Q;
        if (Y != null) {
          V("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (G != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (I1(Y)) {
              if (Y.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              Y = Y[0];
            }
            G = Y;
          }
        }
        if (G == null)
          G = "";
        X = G;
      }
      Z._wrapperState = { initialValue: jJ(X) };
    }
    function TW(J, Q) {
      var Z = J, X = jJ(Q.value), Y = jJ(Q.defaultValue);
      if (X != null) {
        var G = S8(X);
        if (G !== Z.value)
          Z.value = G;
        if (Q.defaultValue == null && Z.defaultValue !== G)
          Z.defaultValue = G;
      }
      if (Y != null)
        Z.defaultValue = S8(Y);
    }
    function kW(J, Q) {
      var Z = J, X = Z.textContent;
      if (X === Z._wrapperState.initialValue) {
        if (X !== "" && X !== null)
          Z.value = X;
      }
    }
    function UV(J, Q) {
      TW(J, Q);
    }
    var JQ = "http://www.w3.org/1999/xhtml", VV = "http://www.w3.org/1998/Math/MathML", EX = "http://www.w3.org/2000/svg";
    function RX(J) {
      switch (J) {
        case "svg":
          return EX;
        case "math":
          return VV;
        default:
          return JQ;
      }
    }
    function wX(J, Q) {
      if (J == null || J === JQ)
        return RX(Q);
      if (J === EX && Q === "foreignObject")
        return JQ;
      return J;
    }
    var $V = function(J) {
      if (typeof MSApp !== "undefined" && MSApp.execUnsafeLocalFunction)
        return function(Q, Z, X, Y) {
          MSApp.execUnsafeLocalFunction(function() {
            return J(Q, Z, X, Y);
          });
        };
      else
        return J;
    }, J5, hW = $V(function(J, Q) {
      if (J.namespaceURI === EX) {
        if (!("innerHTML" in J)) {
          J5 = J5 || document.createElement("div"), J5.innerHTML = "<svg>" + Q.valueOf().toString() + "</svg>";
          var Z = J5.firstChild;
          while (J.firstChild)
            J.removeChild(J.firstChild);
          while (Z.firstChild)
            J.appendChild(Z.firstChild);
          return;
        }
      }
      J.innerHTML = Q;
    }), x8 = 1, QQ = 3, M1 = 8, ZQ = 9, IX = 11, Q5 = function(J, Q) {
      if (Q) {
        var Z = J.firstChild;
        if (Z && Z === J.lastChild && Z.nodeType === QQ) {
          Z.nodeValue = Q;
          return;
        }
      }
      J.textContent = Q;
    }, HV = { animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"], background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"], backgroundPosition: ["backgroundPositionX", "backgroundPositionY"], border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"], borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"], borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"], borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"], borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"], borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"], borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"], borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"], borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"], borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"], borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"], borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"], borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"], borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"], columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"], columns: ["columnCount", "columnWidth"], flex: ["flexBasis", "flexGrow", "flexShrink"], flexFlow: ["flexDirection", "flexWrap"], font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"], fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"], gap: ["columnGap", "rowGap"], grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"], gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"], gridColumn: ["gridColumnEnd", "gridColumnStart"], gridColumnGap: ["columnGap"], gridGap: ["columnGap", "rowGap"], gridRow: ["gridRowEnd", "gridRowStart"], gridRowGap: ["rowGap"], gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"], listStyle: ["listStyleImage", "listStylePosition", "listStyleType"], margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"], marker: ["markerEnd", "markerMid", "markerStart"], mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"], maskPosition: ["maskPositionX", "maskPositionY"], outline: ["outlineColor", "outlineStyle", "outlineWidth"], overflow: ["overflowX", "overflowY"], padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"], placeContent: ["alignContent", "justifyContent"], placeItems: ["alignItems", "justifyItems"], placeSelf: ["alignSelf", "justifySelf"], textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"], textEmphasis: ["textEmphasisColor", "textEmphasisStyle"], transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"], wordWrap: ["overflowWrap"] }, $7 = { animationIterationCount: true, aspectRatio: true, borderImageOutset: true, borderImageSlice: true, borderImageWidth: true, boxFlex: true, boxFlexGroup: true, boxOrdinalGroup: true, columnCount: true, columns: true, flex: true, flexGrow: true, flexPositive: true, flexShrink: true, flexNegative: true, flexOrder: true, gridArea: true, gridRow: true, gridRowEnd: true, gridRowSpan: true, gridRowStart: true, gridColumn: true, gridColumnEnd: true, gridColumnSpan: true, gridColumnStart: true, fontWeight: true, lineClamp: true, lineHeight: true, opacity: true, order: true, orphans: true, tabSize: true, widows: true, zIndex: true, zoom: true, fillOpacity: true, floodOpacity: true, stopOpacity: true, strokeDasharray: true, strokeDashoffset: true, strokeMiterlimit: true, strokeOpacity: true, strokeWidth: true };
    function OV(J, Q) {
      return J + Q.charAt(0).toUpperCase() + Q.substring(1);
    }
    var jV = ["Webkit", "ms", "Moz", "O"];
    Object.keys($7).forEach(function(J) {
      jV.forEach(function(Q) {
        $7[OV(Q, J)] = $7[J];
      });
    });
    function _X(J, Q, Z) {
      var X = Q == null || typeof Q === "boolean" || Q === "";
      if (X)
        return "";
      if (!Z && typeof Q === "number" && Q !== 0 && !($7.hasOwnProperty(J) && $7[J]))
        return Q + "px";
      return wQ(Q, J), ("" + Q).trim();
    }
    var MV = /([A-Z])/g, DV = /^ms-/;
    function AV(J) {
      return J.replace(MV, "-$1").toLowerCase().replace(DV, "-ms-");
    }
    var bW = function() {
    };
    {
      var PV = /^(?:webkit|moz|o)[A-Z]/, FV = /^-ms-/, EV = /-(.)/g, fW = /;\s*$/, Q6 = {}, LX = {}, uW = false, dW = false, RV = function(J) {
        return J.replace(EV, function(Q, Z) {
          return Z.toUpperCase();
        });
      }, wV = function(J) {
        if (Q6.hasOwnProperty(J) && Q6[J])
          return;
        Q6[J] = true, V("Unsupported style property %s. Did you mean %s?", J, RV(J.replace(FV, "ms-")));
      }, IV = function(J) {
        if (Q6.hasOwnProperty(J) && Q6[J])
          return;
        Q6[J] = true, V("Unsupported vendor-prefixed style property %s. Did you mean %s?", J, J.charAt(0).toUpperCase() + J.slice(1));
      }, _V = function(J, Q) {
        if (LX.hasOwnProperty(Q) && LX[Q])
          return;
        LX[Q] = true, V(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, J, Q.replace(fW, ""));
      }, LV = function(J, Q) {
        if (uW)
          return;
        uW = true, V("`NaN` is an invalid value for the `%s` css style property.", J);
      }, NV = function(J, Q) {
        if (dW)
          return;
        dW = true, V("`Infinity` is an invalid value for the `%s` css style property.", J);
      };
      bW = function(J, Q) {
        if (J.indexOf("-") > -1)
          wV(J);
        else if (PV.test(J))
          IV(J);
        else if (fW.test(Q))
          _V(J, Q);
        if (typeof Q === "number") {
          if (isNaN(Q))
            LV(J, Q);
          else if (!isFinite(Q))
            NV(J, Q);
        }
      };
    }
    var SV = bW;
    function xV(J) {
      {
        var Q = "", Z = "";
        for (var X in J) {
          if (!J.hasOwnProperty(X))
            continue;
          var Y = J[X];
          if (Y != null) {
            var G = X.indexOf("--") === 0;
            Q += Z + (G ? X : AV(X)) + ":", Q += _X(X, Y, G), Z = ";";
          }
        }
        return Q || null;
      }
    }
    function yW(J, Q) {
      var Z = J.style;
      for (var X in Q) {
        if (!Q.hasOwnProperty(X))
          continue;
        var Y = X.indexOf("--") === 0;
        if (!Y)
          SV(X, Q[X]);
        var G = _X(X, Q[X], Y);
        if (X === "float")
          X = "cssFloat";
        if (Y)
          Z.setProperty(X, G);
        else
          Z[X] = G;
      }
    }
    function vV(J) {
      return J == null || typeof J === "boolean" || J === "";
    }
    function mW(J) {
      var Q = {};
      for (var Z in J) {
        var X = HV[Z] || [Z];
        for (var Y = 0;Y < X.length; Y++)
          Q[X[Y]] = Z;
      }
      return Q;
    }
    function gV(J, Q) {
      {
        if (!Q)
          return;
        var Z = mW(J), X = mW(Q), Y = {};
        for (var G in Z) {
          var B = Z[G], W = X[G];
          if (W && B !== W) {
            var z = B + "," + W;
            if (Y[z])
              continue;
            Y[z] = true, V("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", vV(J[B]) ? "Removing" : "Updating", B, W);
          }
        }
      }
    }
    var CV = { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true }, TV = D0({ menuitem: true }, CV), kV = "__html";
    function NX(J, Q) {
      if (!Q)
        return;
      if (TV[J]) {
        if (Q.children != null || Q.dangerouslySetInnerHTML != null)
          throw new Error(J + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      }
      if (Q.dangerouslySetInnerHTML != null) {
        if (Q.children != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof Q.dangerouslySetInnerHTML !== "object" || !(kV in Q.dangerouslySetInnerHTML))
          throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
      }
      if (!Q.suppressContentEditableWarning && Q.contentEditable && Q.children != null)
        V("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
      if (Q.style != null && typeof Q.style !== "object")
        throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
    }
    function K4(J, Q) {
      if (J.indexOf("-") === -1)
        return typeof Q.is === "string";
      switch (J) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return false;
        default:
          return true;
      }
    }
    var Z5 = { accept: "accept", acceptcharset: "acceptCharset", "accept-charset": "acceptCharset", accesskey: "accessKey", action: "action", allowfullscreen: "allowFullScreen", alt: "alt", as: "as", async: "async", autocapitalize: "autoCapitalize", autocomplete: "autoComplete", autocorrect: "autoCorrect", autofocus: "autoFocus", autoplay: "autoPlay", autosave: "autoSave", capture: "capture", cellpadding: "cellPadding", cellspacing: "cellSpacing", challenge: "challenge", charset: "charSet", checked: "checked", children: "children", cite: "cite", class: "className", classid: "classID", classname: "className", cols: "cols", colspan: "colSpan", content: "content", contenteditable: "contentEditable", contextmenu: "contextMenu", controls: "controls", controlslist: "controlsList", coords: "coords", crossorigin: "crossOrigin", dangerouslysetinnerhtml: "dangerouslySetInnerHTML", data: "data", datetime: "dateTime", default: "default", defaultchecked: "defaultChecked", defaultvalue: "defaultValue", defer: "defer", dir: "dir", disabled: "disabled", disablepictureinpicture: "disablePictureInPicture", disableremoteplayback: "disableRemotePlayback", download: "download", draggable: "draggable", enctype: "encType", enterkeyhint: "enterKeyHint", for: "htmlFor", form: "form", formmethod: "formMethod", formaction: "formAction", formenctype: "formEncType", formnovalidate: "formNoValidate", formtarget: "formTarget", frameborder: "frameBorder", headers: "headers", height: "height", hidden: "hidden", high: "high", href: "href", hreflang: "hrefLang", htmlfor: "htmlFor", httpequiv: "httpEquiv", "http-equiv": "httpEquiv", icon: "icon", id: "id", imagesizes: "imageSizes", imagesrcset: "imageSrcSet", innerhtml: "innerHTML", inputmode: "inputMode", integrity: "integrity", is: "is", itemid: "itemID", itemprop: "itemProp", itemref: "itemRef", itemscope: "itemScope", itemtype: "itemType", keyparams: "keyParams", keytype: "keyType", kind: "kind", label: "label", lang: "lang", list: "list", loop: "loop", low: "low", manifest: "manifest", marginwidth: "marginWidth", marginheight: "marginHeight", max: "max", maxlength: "maxLength", media: "media", mediagroup: "mediaGroup", method: "method", min: "min", minlength: "minLength", multiple: "multiple", muted: "muted", name: "name", nomodule: "noModule", nonce: "nonce", novalidate: "noValidate", open: "open", optimum: "optimum", pattern: "pattern", placeholder: "placeholder", playsinline: "playsInline", poster: "poster", preload: "preload", profile: "profile", radiogroup: "radioGroup", readonly: "readOnly", referrerpolicy: "referrerPolicy", rel: "rel", required: "required", reversed: "reversed", role: "role", rows: "rows", rowspan: "rowSpan", sandbox: "sandbox", scope: "scope", scoped: "scoped", scrolling: "scrolling", seamless: "seamless", selected: "selected", shape: "shape", size: "size", sizes: "sizes", span: "span", spellcheck: "spellCheck", src: "src", srcdoc: "srcDoc", srclang: "srcLang", srcset: "srcSet", start: "start", step: "step", style: "style", summary: "summary", tabindex: "tabIndex", target: "target", title: "title", type: "type", usemap: "useMap", value: "value", width: "width", wmode: "wmode", wrap: "wrap", about: "about", accentheight: "accentHeight", "accent-height": "accentHeight", accumulate: "accumulate", additive: "additive", alignmentbaseline: "alignmentBaseline", "alignment-baseline": "alignmentBaseline", allowreorder: "allowReorder", alphabetic: "alphabetic", amplitude: "amplitude", arabicform: "arabicForm", "arabic-form": "arabicForm", ascent: "ascent", attributename: "attributeName", attributetype: "attributeType", autoreverse: "autoReverse", azimuth: "azimuth", basefrequency: "baseFrequency", baselineshift: "baselineShift", "baseline-shift": "baselineShift", baseprofile: "baseProfile", bbox: "bbox", begin: "begin", bias: "bias", by: "by", calcmode: "calcMode", capheight: "capHeight", "cap-height": "capHeight", clip: "clip", clippath: "clipPath", "clip-path": "clipPath", clippathunits: "clipPathUnits", cliprule: "clipRule", "clip-rule": "clipRule", color: "color", colorinterpolation: "colorInterpolation", "color-interpolation": "colorInterpolation", colorinterpolationfilters: "colorInterpolationFilters", "color-interpolation-filters": "colorInterpolationFilters", colorprofile: "colorProfile", "color-profile": "colorProfile", colorrendering: "colorRendering", "color-rendering": "colorRendering", contentscripttype: "contentScriptType", contentstyletype: "contentStyleType", cursor: "cursor", cx: "cx", cy: "cy", d: "d", datatype: "datatype", decelerate: "decelerate", descent: "descent", diffuseconstant: "diffuseConstant", direction: "direction", display: "display", divisor: "divisor", dominantbaseline: "dominantBaseline", "dominant-baseline": "dominantBaseline", dur: "dur", dx: "dx", dy: "dy", edgemode: "edgeMode", elevation: "elevation", enablebackground: "enableBackground", "enable-background": "enableBackground", end: "end", exponent: "exponent", externalresourcesrequired: "externalResourcesRequired", fill: "fill", fillopacity: "fillOpacity", "fill-opacity": "fillOpacity", fillrule: "fillRule", "fill-rule": "fillRule", filter: "filter", filterres: "filterRes", filterunits: "filterUnits", floodopacity: "floodOpacity", "flood-opacity": "floodOpacity", floodcolor: "floodColor", "flood-color": "floodColor", focusable: "focusable", fontfamily: "fontFamily", "font-family": "fontFamily", fontsize: "fontSize", "font-size": "fontSize", fontsizeadjust: "fontSizeAdjust", "font-size-adjust": "fontSizeAdjust", fontstretch: "fontStretch", "font-stretch": "fontStretch", fontstyle: "fontStyle", "font-style": "fontStyle", fontvariant: "fontVariant", "font-variant": "fontVariant", fontweight: "fontWeight", "font-weight": "fontWeight", format: "format", from: "from", fx: "fx", fy: "fy", g1: "g1", g2: "g2", glyphname: "glyphName", "glyph-name": "glyphName", glyphorientationhorizontal: "glyphOrientationHorizontal", "glyph-orientation-horizontal": "glyphOrientationHorizontal", glyphorientationvertical: "glyphOrientationVertical", "glyph-orientation-vertical": "glyphOrientationVertical", glyphref: "glyphRef", gradienttransform: "gradientTransform", gradientunits: "gradientUnits", hanging: "hanging", horizadvx: "horizAdvX", "horiz-adv-x": "horizAdvX", horizoriginx: "horizOriginX", "horiz-origin-x": "horizOriginX", ideographic: "ideographic", imagerendering: "imageRendering", "image-rendering": "imageRendering", in2: "in2", in: "in", inlist: "inlist", intercept: "intercept", k1: "k1", k2: "k2", k3: "k3", k4: "k4", k: "k", kernelmatrix: "kernelMatrix", kernelunitlength: "kernelUnitLength", kerning: "kerning", keypoints: "keyPoints", keysplines: "keySplines", keytimes: "keyTimes", lengthadjust: "lengthAdjust", letterspacing: "letterSpacing", "letter-spacing": "letterSpacing", lightingcolor: "lightingColor", "lighting-color": "lightingColor", limitingconeangle: "limitingConeAngle", local: "local", markerend: "markerEnd", "marker-end": "markerEnd", markerheight: "markerHeight", markermid: "markerMid", "marker-mid": "markerMid", markerstart: "markerStart", "marker-start": "markerStart", markerunits: "markerUnits", markerwidth: "markerWidth", mask: "mask", maskcontentunits: "maskContentUnits", maskunits: "maskUnits", mathematical: "mathematical", mode: "mode", numoctaves: "numOctaves", offset: "offset", opacity: "opacity", operator: "operator", order: "order", orient: "orient", orientation: "orientation", origin: "origin", overflow: "overflow", overlineposition: "overlinePosition", "overline-position": "overlinePosition", overlinethickness: "overlineThickness", "overline-thickness": "overlineThickness", paintorder: "paintOrder", "paint-order": "paintOrder", panose1: "panose1", "panose-1": "panose1", pathlength: "pathLength", patterncontentunits: "patternContentUnits", patterntransform: "patternTransform", patternunits: "patternUnits", pointerevents: "pointerEvents", "pointer-events": "pointerEvents", points: "points", pointsatx: "pointsAtX", pointsaty: "pointsAtY", pointsatz: "pointsAtZ", prefix: "prefix", preservealpha: "preserveAlpha", preserveaspectratio: "preserveAspectRatio", primitiveunits: "primitiveUnits", property: "property", r: "r", radius: "radius", refx: "refX", refy: "refY", renderingintent: "renderingIntent", "rendering-intent": "renderingIntent", repeatcount: "repeatCount", repeatdur: "repeatDur", requiredextensions: "requiredExtensions", requiredfeatures: "requiredFeatures", resource: "resource", restart: "restart", result: "result", results: "results", rotate: "rotate", rx: "rx", ry: "ry", scale: "scale", security: "security", seed: "seed", shaperendering: "shapeRendering", "shape-rendering": "shapeRendering", slope: "slope", spacing: "spacing", specularconstant: "specularConstant", specularexponent: "specularExponent", speed: "speed", spreadmethod: "spreadMethod", startoffset: "startOffset", stddeviation: "stdDeviation", stemh: "stemh", stemv: "stemv", stitchtiles: "stitchTiles", stopcolor: "stopColor", "stop-color": "stopColor", stopopacity: "stopOpacity", "stop-opacity": "stopOpacity", strikethroughposition: "strikethroughPosition", "strikethrough-position": "strikethroughPosition", strikethroughthickness: "strikethroughThickness", "strikethrough-thickness": "strikethroughThickness", string: "string", stroke: "stroke", strokedasharray: "strokeDasharray", "stroke-dasharray": "strokeDasharray", strokedashoffset: "strokeDashoffset", "stroke-dashoffset": "strokeDashoffset", strokelinecap: "strokeLinecap", "stroke-linecap": "strokeLinecap", strokelinejoin: "strokeLinejoin", "stroke-linejoin": "strokeLinejoin", strokemiterlimit: "strokeMiterlimit", "stroke-miterlimit": "strokeMiterlimit", strokewidth: "strokeWidth", "stroke-width": "strokeWidth", strokeopacity: "strokeOpacity", "stroke-opacity": "strokeOpacity", suppresscontenteditablewarning: "suppressContentEditableWarning", suppresshydrationwarning: "suppressHydrationWarning", surfacescale: "surfaceScale", systemlanguage: "systemLanguage", tablevalues: "tableValues", targetx: "targetX", targety: "targetY", textanchor: "textAnchor", "text-anchor": "textAnchor", textdecoration: "textDecoration", "text-decoration": "textDecoration", textlength: "textLength", textrendering: "textRendering", "text-rendering": "textRendering", to: "to", transform: "transform", typeof: "typeof", u1: "u1", u2: "u2", underlineposition: "underlinePosition", "underline-position": "underlinePosition", underlinethickness: "underlineThickness", "underline-thickness": "underlineThickness", unicode: "unicode", unicodebidi: "unicodeBidi", "unicode-bidi": "unicodeBidi", unicoderange: "unicodeRange", "unicode-range": "unicodeRange", unitsperem: "unitsPerEm", "units-per-em": "unitsPerEm", unselectable: "unselectable", valphabetic: "vAlphabetic", "v-alphabetic": "vAlphabetic", values: "values", vectoreffect: "vectorEffect", "vector-effect": "vectorEffect", version: "version", vertadvy: "vertAdvY", "vert-adv-y": "vertAdvY", vertoriginx: "vertOriginX", "vert-origin-x": "vertOriginX", vertoriginy: "vertOriginY", "vert-origin-y": "vertOriginY", vhanging: "vHanging", "v-hanging": "vHanging", videographic: "vIdeographic", "v-ideographic": "vIdeographic", viewbox: "viewBox", viewtarget: "viewTarget", visibility: "visibility", vmathematical: "vMathematical", "v-mathematical": "vMathematical", vocab: "vocab", widths: "widths", wordspacing: "wordSpacing", "word-spacing": "wordSpacing", writingmode: "writingMode", "writing-mode": "writingMode", x1: "x1", x2: "x2", x: "x", xchannelselector: "xChannelSelector", xheight: "xHeight", "x-height": "xHeight", xlinkactuate: "xlinkActuate", "xlink:actuate": "xlinkActuate", xlinkarcrole: "xlinkArcrole", "xlink:arcrole": "xlinkArcrole", xlinkhref: "xlinkHref", "xlink:href": "xlinkHref", xlinkrole: "xlinkRole", "xlink:role": "xlinkRole", xlinkshow: "xlinkShow", "xlink:show": "xlinkShow", xlinktitle: "xlinkTitle", "xlink:title": "xlinkTitle", xlinktype: "xlinkType", "xlink:type": "xlinkType", xmlbase: "xmlBase", "xml:base": "xmlBase", xmllang: "xmlLang", "xml:lang": "xmlLang", xmlns: "xmlns", "xml:space": "xmlSpace", xmlnsxlink: "xmlnsXlink", "xmlns:xlink": "xmlnsXlink", xmlspace: "xmlSpace", y1: "y1", y2: "y2", y: "y", ychannelselector: "yChannelSelector", z: "z", zoomandpan: "zoomAndPan" }, cW = { "aria-current": 0, "aria-description": 0, "aria-details": 0, "aria-disabled": 0, "aria-hidden": 0, "aria-invalid": 0, "aria-keyshortcuts": 0, "aria-label": 0, "aria-roledescription": 0, "aria-autocomplete": 0, "aria-checked": 0, "aria-expanded": 0, "aria-haspopup": 0, "aria-level": 0, "aria-modal": 0, "aria-multiline": 0, "aria-multiselectable": 0, "aria-orientation": 0, "aria-placeholder": 0, "aria-pressed": 0, "aria-readonly": 0, "aria-required": 0, "aria-selected": 0, "aria-sort": 0, "aria-valuemax": 0, "aria-valuemin": 0, "aria-valuenow": 0, "aria-valuetext": 0, "aria-atomic": 0, "aria-busy": 0, "aria-live": 0, "aria-relevant": 0, "aria-dropeffect": 0, "aria-grabbed": 0, "aria-activedescendant": 0, "aria-colcount": 0, "aria-colindex": 0, "aria-colspan": 0, "aria-controls": 0, "aria-describedby": 0, "aria-errormessage": 0, "aria-flowto": 0, "aria-labelledby": 0, "aria-owns": 0, "aria-posinset": 0, "aria-rowcount": 0, "aria-rowindex": 0, "aria-rowspan": 0, "aria-setsize": 0 }, Z6 = {}, hV = new RegExp("^(aria)-[" + n + "]*$"), bV = new RegExp("^(aria)[A-Z][" + n + "]*$");
    function fV(J, Q) {
      {
        if (s1.call(Z6, Q) && Z6[Q])
          return true;
        if (bV.test(Q)) {
          var Z = "aria-" + Q.slice(4).toLowerCase(), X = cW.hasOwnProperty(Z) ? Z : null;
          if (X == null)
            return V("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", Q), Z6[Q] = true, true;
          if (Q !== X)
            return V("Invalid ARIA attribute `%s`. Did you mean `%s`?", Q, X), Z6[Q] = true, true;
        }
        if (hV.test(Q)) {
          var Y = Q.toLowerCase(), G = cW.hasOwnProperty(Y) ? Y : null;
          if (G == null)
            return Z6[Q] = true, false;
          if (Q !== G)
            return V("Unknown ARIA attribute `%s`. Did you mean `%s`?", Q, G), Z6[Q] = true, true;
        }
      }
      return true;
    }
    function uV(J, Q) {
      {
        var Z = [];
        for (var X in Q) {
          var Y = fV(J, X);
          if (!Y)
            Z.push(X);
        }
        var G = Z.map(function(B) {
          return "`" + B + "`";
        }).join(", ");
        if (Z.length === 1)
          V("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", G, J);
        else if (Z.length > 1)
          V("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", G, J);
      }
    }
    function dV(J, Q) {
      if (K4(J, Q))
        return;
      uV(J, Q);
    }
    var sW = false;
    function yV(J, Q) {
      {
        if (J !== "input" && J !== "textarea" && J !== "select")
          return;
        if (Q != null && Q.value === null && !sW)
          if (sW = true, J === "select" && Q.multiple)
            V("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", J);
          else
            V("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", J);
      }
    }
    var iW = function() {
    };
    {
      var P8 = {}, lW = /^on./, mV = /^on[^A-Z]/, cV = new RegExp("^(aria)-[" + n + "]*$"), sV = new RegExp("^(aria)[A-Z][" + n + "]*$");
      iW = function(J, Q, Z, X) {
        if (s1.call(P8, Q) && P8[Q])
          return true;
        var Y = Q.toLowerCase();
        if (Y === "onfocusin" || Y === "onfocusout")
          return V("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), P8[Q] = true, true;
        if (X != null) {
          var { registrationNameDependencies: G, possibleRegistrationNames: B } = X;
          if (G.hasOwnProperty(Q))
            return true;
          var W = B.hasOwnProperty(Y) ? B[Y] : null;
          if (W != null)
            return V("Invalid event handler property `%s`. Did you mean `%s`?", Q, W), P8[Q] = true, true;
          if (lW.test(Q))
            return V("Unknown event handler property `%s`. It will be ignored.", Q), P8[Q] = true, true;
        } else if (lW.test(Q)) {
          if (mV.test(Q))
            V("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", Q);
          return P8[Q] = true, true;
        }
        if (cV.test(Q) || sV.test(Q))
          return true;
        if (Y === "innerhtml")
          return V("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), P8[Q] = true, true;
        if (Y === "aria")
          return V("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), P8[Q] = true, true;
        if (Y === "is" && Z !== null && Z !== undefined && typeof Z !== "string")
          return V("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof Z), P8[Q] = true, true;
        if (typeof Z === "number" && isNaN(Z))
          return V("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", Q), P8[Q] = true, true;
        var z = A8(Q), q = z !== null && z.type === e8;
        if (Z5.hasOwnProperty(Y)) {
          var U = Z5[Y];
          if (U !== Q)
            return V("Invalid DOM property `%s`. Did you mean `%s`?", Q, U), P8[Q] = true, true;
        } else if (!q && Q !== Y)
          return V("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", Q, Y), P8[Q] = true, true;
        if (typeof Z === "boolean" && N8(Q, Z, z, false)) {
          if (Z)
            V('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', Z, Q, Q, Z, Q);
          else
            V('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', Z, Q, Q, Z, Q, Q, Q);
          return P8[Q] = true, true;
        }
        if (q)
          return true;
        if (N8(Q, Z, z, false))
          return P8[Q] = true, false;
        if ((Z === "false" || Z === "true") && z !== null && z.type === j1)
          return V("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", Z, Q, Z === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', Q, Z), P8[Q] = true, true;
        return true;
      };
    }
    var iV = function(J, Q, Z) {
      {
        var X = [];
        for (var Y in Q) {
          var G = iW(J, Y, Q[Y], Z);
          if (!G)
            X.push(Y);
        }
        var B = X.map(function(W) {
          return "`" + W + "`";
        }).join(", ");
        if (X.length === 1)
          V("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", B, J);
        else if (X.length > 1)
          V("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", B, J);
      }
    };
    function lV(J, Q, Z) {
      if (K4(J, Q))
        return;
      iV(J, Q, Z);
    }
    var pW = 1, SX = 1 << 1, H7 = 1 << 2, pV = pW | SX | H7, O7 = null;
    function aV(J) {
      if (O7 !== null)
        V("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue.");
      O7 = J;
    }
    function rV() {
      if (O7 === null)
        V("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue.");
      O7 = null;
    }
    function nV(J) {
      return J === O7;
    }
    function xX(J) {
      var Q = J.target || J.srcElement || window;
      if (Q.correspondingUseElement)
        Q = Q.correspondingUseElement;
      return Q.nodeType === QQ ? Q.parentNode : Q;
    }
    var vX = null, X6 = null, Y6 = null;
    function aW(J) {
      var Q = yQ(J);
      if (!Q)
        return;
      if (typeof vX !== "function")
        throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
      var Z = Q.stateNode;
      if (Z) {
        var X = d5(Z);
        vX(Q.stateNode, Q.type, X);
      }
    }
    function oV(J) {
      vX = J;
    }
    function rW(J) {
      if (X6)
        if (Y6)
          Y6.push(J);
        else
          Y6 = [J];
      else
        X6 = J;
    }
    function tV() {
      return X6 !== null || Y6 !== null;
    }
    function nW() {
      if (!X6)
        return;
      var J = X6, Q = Y6;
      if (X6 = null, Y6 = null, aW(J), Q)
        for (var Z = 0;Z < Q.length; Z++)
          aW(Q[Z]);
    }
    var oW = function(J, Q) {
      return J(Q);
    }, tW = function() {
    }, gX = false;
    function eV() {
      var J = tV();
      if (J)
        tW(), nW();
    }
    function eW(J, Q, Z) {
      if (gX)
        return J(Q, Z);
      gX = true;
      try {
        return oW(J, Q, Z);
      } finally {
        gX = false, eV();
      }
    }
    function J2(J, Q, Z) {
      oW = J, tW = Z;
    }
    function Q2(J) {
      return J === "button" || J === "input" || J === "select" || J === "textarea";
    }
    function Z2(J, Q, Z) {
      switch (J) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          return !!(Z.disabled && Q2(Q));
        default:
          return false;
      }
    }
    function j7(J, Q) {
      var Z = J.stateNode;
      if (Z === null)
        return null;
      var X = d5(Z);
      if (X === null)
        return null;
      var Y = X[Q];
      if (Z2(Q, J.type, X))
        return null;
      if (Y && typeof Y !== "function")
        throw new Error("Expected `" + Q + "` listener to be a function, instead got a value of `" + typeof Y + "` type.");
      return Y;
    }
    var CX = false;
    if (c1)
      try {
        var M7 = {};
        Object.defineProperty(M7, "passive", { get: function() {
          CX = true;
        } }), window.addEventListener("test", M7, M7), window.removeEventListener("test", M7, M7);
      } catch (J) {
        CX = false;
      }
    function Jz(J, Q, Z, X, Y, G, B, W, z) {
      var q = Array.prototype.slice.call(arguments, 3);
      try {
        Q.apply(Z, q);
      } catch (U) {
        this.onError(U);
      }
    }
    var Qz = Jz;
    if (typeof window !== "undefined" && typeof window.dispatchEvent === "function" && typeof document !== "undefined" && typeof document.createEvent === "function") {
      var TX = document.createElement("react");
      Qz = function J(Q, Z, X, Y, G, B, W, z, q) {
        if (typeof document === "undefined" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var U = document.createEvent("Event"), j = false, O = true, F = window.event, A = Object.getOwnPropertyDescriptor(window, "event");
        function R() {
          if (TX.removeEventListener(I, o, false), typeof window.event !== "undefined" && window.hasOwnProperty("event"))
            window.event = F;
        }
        var u = Array.prototype.slice.call(arguments, 3);
        function o() {
          j = true, R(), Z.apply(X, u), O = false;
        }
        var a, P0 = false, F0 = false;
        function M(D) {
          if (a = D.error, P0 = true, a === null && D.colno === 0 && D.lineno === 0)
            F0 = true;
          if (D.defaultPrevented) {
            if (a != null && typeof a === "object")
              try {
                a._suppressLogging = true;
              } catch (x) {
              }
          }
        }
        var I = "react-" + (Q ? Q : "invokeguardedcallback");
        if (window.addEventListener("error", M), TX.addEventListener(I, o, false), U.initEvent(I, false, false), TX.dispatchEvent(U), A)
          Object.defineProperty(window, "event", A);
        if (j && O) {
          if (!P0)
            a = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`);
          else if (F0)
            a = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.");
          this.onError(a);
        }
        if (window.removeEventListener("error", M), !j)
          return R(), Jz.apply(this, arguments);
      };
    }
    var X2 = Qz, G6 = false, X5 = null, Y5 = false, kX = null, Y2 = { onError: function(J) {
      G6 = true, X5 = J;
    } };
    function hX(J, Q, Z, X, Y, G, B, W, z) {
      G6 = false, X5 = null, X2.apply(Y2, arguments);
    }
    function G2(J, Q, Z, X, Y, G, B, W, z) {
      if (hX.apply(this, arguments), G6) {
        var q = bX();
        if (!Y5)
          Y5 = true, kX = q;
      }
    }
    function B2() {
      if (Y5) {
        var J = kX;
        throw Y5 = false, kX = null, J;
      }
    }
    function W2() {
      return G6;
    }
    function bX() {
      if (G6) {
        var J = X5;
        return G6 = false, X5 = null, J;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function B6(J) {
      return J._reactInternals;
    }
    function z2(J) {
      return J._reactInternals !== undefined;
    }
    function K2(J, Q) {
      J._reactInternals = Q;
    }
    var Z0 = 0, W6 = 1, D1 = 2, x0 = 4, q4 = 16, D7 = 32, fX = 64, k0 = 128, XQ = 256, TQ = 512, U4 = 1024, MJ = 2048, YQ = 4096, V4 = 8192, G5 = 16384, q2 = MJ | x0 | fX | TQ | U4 | G5, U2 = 32767, A7 = 32768, F8 = 65536, uX = 131072, Zz = 1048576, dX = 2097152, $4 = 4194304, yX = 8388608, GQ = 16777216, B5 = 33554432, mX = x0 | U4 | 0, cX = D1 | x0 | q4 | D7 | TQ | YQ | V4, P7 = x0 | fX | TQ | V4, z6 = MJ | q4, BQ = $4 | yX | dX, V2 = v.ReactCurrentOwner;
    function H4(J) {
      var Q = J, Z = J;
      if (!J.alternate) {
        var X = Q;
        do {
          if (Q = X, (Q.flags & (D1 | YQ)) !== Z0)
            Z = Q.return;
          X = Q.return;
        } while (X);
      } else
        while (Q.return)
          Q = Q.return;
      if (Q.tag === T)
        return Z;
      return null;
    }
    function Xz(J) {
      if (J.tag === A0) {
        var Q = J.memoizedState;
        if (Q === null) {
          var Z = J.alternate;
          if (Z !== null)
            Q = Z.memoizedState;
        }
        if (Q !== null)
          return Q.dehydrated;
      }
      return null;
    }
    function Yz(J) {
      return J.tag === T ? J.stateNode.containerInfo : null;
    }
    function $2(J) {
      return H4(J) === J;
    }
    function H2(J) {
      {
        var Q = V2.current;
        if (Q !== null && Q.tag === i) {
          var Z = Q, X = Z.stateNode;
          if (!X._warnedAboutRefsInRender)
            V("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", H0(Z) || "A component");
          X._warnedAboutRefsInRender = true;
        }
      }
      var Y = B6(J);
      if (!Y)
        return false;
      return H4(Y) === Y;
    }
    function Gz(J) {
      if (H4(J) !== J)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function Bz(J) {
      var Q = J.alternate;
      if (!Q) {
        var Z = H4(J);
        if (Z === null)
          throw new Error("Unable to find node on an unmounted component.");
        if (Z !== J)
          return null;
        return J;
      }
      var X = J, Y = Q;
      while (true) {
        var G = X.return;
        if (G === null)
          break;
        var B = G.alternate;
        if (B === null) {
          var W = G.return;
          if (W !== null) {
            X = Y = W;
            continue;
          }
          break;
        }
        if (G.child === B.child) {
          var z = G.child;
          while (z) {
            if (z === X)
              return Gz(G), J;
            if (z === Y)
              return Gz(G), Q;
            z = z.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (X.return !== Y.return)
          X = G, Y = B;
        else {
          var q = false, U = G.child;
          while (U) {
            if (U === X) {
              q = true, X = G, Y = B;
              break;
            }
            if (U === Y) {
              q = true, Y = G, X = B;
              break;
            }
            U = U.sibling;
          }
          if (!q) {
            U = B.child;
            while (U) {
              if (U === X) {
                q = true, X = B, Y = G;
                break;
              }
              if (U === Y) {
                q = true, Y = B, X = G;
                break;
              }
              U = U.sibling;
            }
            if (!q)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (X.alternate !== Y)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (X.tag !== T)
        throw new Error("Unable to find node on an unmounted component.");
      if (X.stateNode.current === X)
        return J;
      return Q;
    }
    function Wz(J) {
      var Q = Bz(J);
      return Q !== null ? zz(Q) : null;
    }
    function zz(J) {
      if (J.tag === c || J.tag === w0)
        return J;
      var Q = J.child;
      while (Q !== null) {
        var Z = zz(Q);
        if (Z !== null)
          return Z;
        Q = Q.sibling;
      }
      return null;
    }
    function O2(J) {
      var Q = Bz(J);
      return Q !== null ? Kz(Q) : null;
    }
    function Kz(J) {
      if (J.tag === c || J.tag === w0)
        return J;
      var Q = J.child;
      while (Q !== null) {
        if (Q.tag !== e) {
          var Z = Kz(Q);
          if (Z !== null)
            return Z;
        }
        Q = Q.sibling;
      }
      return null;
    }
    var { unstable_scheduleCallback: qz, unstable_cancelCallback: j2, unstable_shouldYield: M2, unstable_requestPaint: D2, unstable_now: f1, unstable_getCurrentPriorityLevel: A2, unstable_ImmediatePriority: W5, unstable_UserBlockingPriority: sX, unstable_NormalPriority: O4, unstable_LowPriority: P2, unstable_IdlePriority: iX, unstable_yieldValue: F2, unstable_setDisableYieldValue: E2 } = _, j4 = null, p1 = null, f = null, hJ = false, DJ = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined";
    function R2(J) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined")
        return false;
      var Q = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (Q.isDisabled)
        return true;
      if (!Q.supportsFiber)
        return V("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), true;
      try {
        if (CJ)
          J = D0({}, J, { getLaneLabelMap: S2, injectProfilingHooks: N2 });
        j4 = Q.inject(J), p1 = Q;
      } catch (Z) {
        V("React instrumentation encountered an error: %s.", Z);
      }
      if (Q.checkDCE)
        return true;
      else
        return false;
    }
    function w2(J, Q) {
      if (p1 && typeof p1.onScheduleFiberRoot === "function")
        try {
          p1.onScheduleFiberRoot(j4, J, Q);
        } catch (Z) {
          if (!hJ)
            hJ = true, V("React instrumentation encountered an error: %s", Z);
        }
    }
    function I2(J, Q) {
      if (p1 && typeof p1.onCommitFiberRoot === "function")
        try {
          var Z = (J.current.flags & k0) === k0;
          if (n8) {
            var X;
            switch (Q) {
              case m8:
                X = W5;
                break;
              case zQ:
                X = sX;
                break;
              case KQ:
                X = O4;
                break;
              case O5:
                X = iX;
                break;
              default:
                X = O4;
                break;
            }
            p1.onCommitFiberRoot(j4, J, X, Z);
          } else
            p1.onCommitFiberRoot(j4, J, undefined, Z);
        } catch (Y) {
          if (!hJ)
            hJ = true, V("React instrumentation encountered an error: %s", Y);
        }
    }
    function _2(J) {
      if (p1 && typeof p1.onPostCommitFiberRoot === "function")
        try {
          p1.onPostCommitFiberRoot(j4, J);
        } catch (Q) {
          if (!hJ)
            hJ = true, V("React instrumentation encountered an error: %s", Q);
        }
    }
    function L2(J) {
      if (p1 && typeof p1.onCommitFiberUnmount === "function")
        try {
          p1.onCommitFiberUnmount(j4, J);
        } catch (Q) {
          if (!hJ)
            hJ = true, V("React instrumentation encountered an error: %s", Q);
        }
    }
    function u1(J) {
      {
        if (typeof F2 === "function")
          E2(J), m(J);
        if (p1 && typeof p1.setStrictMode === "function")
          try {
            p1.setStrictMode(j4, J);
          } catch (Q) {
            if (!hJ)
              hJ = true, V("React instrumentation encountered an error: %s", Q);
          }
      }
    }
    function N2(J) {
      f = J;
    }
    function S2() {
      {
        var J = new Map, Q = 1;
        for (var Z = 0;Z < pX; Z++) {
          var X = r2(Q);
          J.set(Q, X), Q *= 2;
        }
        return J;
      }
    }
    function x2(J) {
      if (f !== null && typeof f.markCommitStarted === "function")
        f.markCommitStarted(J);
    }
    function Uz() {
      if (f !== null && typeof f.markCommitStopped === "function")
        f.markCommitStopped();
    }
    function F7(J) {
      if (f !== null && typeof f.markComponentRenderStarted === "function")
        f.markComponentRenderStarted(J);
    }
    function K6() {
      if (f !== null && typeof f.markComponentRenderStopped === "function")
        f.markComponentRenderStopped();
    }
    function v2(J) {
      if (f !== null && typeof f.markComponentPassiveEffectMountStarted === "function")
        f.markComponentPassiveEffectMountStarted(J);
    }
    function g2() {
      if (f !== null && typeof f.markComponentPassiveEffectMountStopped === "function")
        f.markComponentPassiveEffectMountStopped();
    }
    function C2(J) {
      if (f !== null && typeof f.markComponentPassiveEffectUnmountStarted === "function")
        f.markComponentPassiveEffectUnmountStarted(J);
    }
    function T2() {
      if (f !== null && typeof f.markComponentPassiveEffectUnmountStopped === "function")
        f.markComponentPassiveEffectUnmountStopped();
    }
    function k2(J) {
      if (f !== null && typeof f.markComponentLayoutEffectMountStarted === "function")
        f.markComponentLayoutEffectMountStarted(J);
    }
    function h2() {
      if (f !== null && typeof f.markComponentLayoutEffectMountStopped === "function")
        f.markComponentLayoutEffectMountStopped();
    }
    function Vz(J) {
      if (f !== null && typeof f.markComponentLayoutEffectUnmountStarted === "function")
        f.markComponentLayoutEffectUnmountStarted(J);
    }
    function $z() {
      if (f !== null && typeof f.markComponentLayoutEffectUnmountStopped === "function")
        f.markComponentLayoutEffectUnmountStopped();
    }
    function b2(J, Q, Z) {
      if (f !== null && typeof f.markComponentErrored === "function")
        f.markComponentErrored(J, Q, Z);
    }
    function f2(J, Q, Z) {
      if (f !== null && typeof f.markComponentSuspended === "function")
        f.markComponentSuspended(J, Q, Z);
    }
    function u2(J) {
      if (f !== null && typeof f.markLayoutEffectsStarted === "function")
        f.markLayoutEffectsStarted(J);
    }
    function d2() {
      if (f !== null && typeof f.markLayoutEffectsStopped === "function")
        f.markLayoutEffectsStopped();
    }
    function y2(J) {
      if (f !== null && typeof f.markPassiveEffectsStarted === "function")
        f.markPassiveEffectsStarted(J);
    }
    function m2() {
      if (f !== null && typeof f.markPassiveEffectsStopped === "function")
        f.markPassiveEffectsStopped();
    }
    function Hz(J) {
      if (f !== null && typeof f.markRenderStarted === "function")
        f.markRenderStarted(J);
    }
    function c2() {
      if (f !== null && typeof f.markRenderYielded === "function")
        f.markRenderYielded();
    }
    function Oz() {
      if (f !== null && typeof f.markRenderStopped === "function")
        f.markRenderStopped();
    }
    function s2(J) {
      if (f !== null && typeof f.markRenderScheduled === "function")
        f.markRenderScheduled(J);
    }
    function i2(J, Q) {
      if (f !== null && typeof f.markForceUpdateScheduled === "function")
        f.markForceUpdateScheduled(J, Q);
    }
    function lX(J, Q) {
      if (f !== null && typeof f.markStateUpdateScheduled === "function")
        f.markStateUpdateScheduled(J, Q);
    }
    var X0 = 0, I0 = 1, u0 = 2, A1 = 8, bJ = 16, jz = Math.clz32 ? Math.clz32 : a2, l2 = Math.log, p2 = Math.LN2;
    function a2(J) {
      var Q = J >>> 0;
      if (Q === 0)
        return 32;
      return 31 - (l2(Q) / p2 | 0) | 0;
    }
    var pX = 31, N = 0, d1 = 0, K0 = 1, q6 = 2, WQ = 4, M4 = 8, fJ = 16, E7 = 32, U6 = 4194240, R7 = 64, aX = 128, rX = 256, nX = 512, oX = 1024, tX = 2048, eX = 4096, JY = 8192, QY = 16384, ZY = 32768, XY = 65536, YY = 131072, GY = 262144, BY = 524288, WY = 1048576, zY = 2097152, z5 = 130023424, V6 = 4194304, KY = 8388608, qY = 16777216, UY = 33554432, VY = 67108864, Mz = V6, w7 = 134217728, Dz = 268435455, I7 = 268435456, D4 = 536870912, d8 = 1073741824;
    function r2(J) {
      {
        if (J & K0)
          return "Sync";
        if (J & q6)
          return "InputContinuousHydration";
        if (J & WQ)
          return "InputContinuous";
        if (J & M4)
          return "DefaultHydration";
        if (J & fJ)
          return "Default";
        if (J & E7)
          return "TransitionHydration";
        if (J & U6)
          return "Transition";
        if (J & z5)
          return "Retry";
        if (J & w7)
          return "SelectiveHydration";
        if (J & I7)
          return "IdleHydration";
        if (J & D4)
          return "Idle";
        if (J & d8)
          return "Offscreen";
      }
    }
    var Z1 = -1, K5 = R7, q5 = V6;
    function _7(J) {
      switch (A4(J)) {
        case K0:
          return K0;
        case q6:
          return q6;
        case WQ:
          return WQ;
        case M4:
          return M4;
        case fJ:
          return fJ;
        case E7:
          return E7;
        case R7:
        case aX:
        case rX:
        case nX:
        case oX:
        case tX:
        case eX:
        case JY:
        case QY:
        case ZY:
        case XY:
        case YY:
        case GY:
        case BY:
        case WY:
        case zY:
          return J & U6;
        case V6:
        case KY:
        case qY:
        case UY:
        case VY:
          return J & z5;
        case w7:
          return w7;
        case I7:
          return I7;
        case D4:
          return D4;
        case d8:
          return d8;
        default:
          return V("Should have found matching lanes. This is a bug in React."), J;
      }
    }
    function U5(J, Q) {
      var Z = J.pendingLanes;
      if (Z === N)
        return N;
      var X = N, Y = J.suspendedLanes, G = J.pingedLanes, B = Z & Dz;
      if (B !== N) {
        var W = B & ~Y;
        if (W !== N)
          X = _7(W);
        else {
          var z = B & G;
          if (z !== N)
            X = _7(z);
        }
      } else {
        var q = Z & ~Y;
        if (q !== N)
          X = _7(q);
        else if (G !== N)
          X = _7(G);
      }
      if (X === N)
        return N;
      if (Q !== N && Q !== X && (Q & Y) === N) {
        var U = A4(X), j = A4(Q);
        if (U >= j || U === fJ && (j & U6) !== N)
          return Q;
      }
      if ((X & WQ) !== N)
        X |= Z & fJ;
      var O = J.entangledLanes;
      if (O !== N) {
        var F = J.entanglements, A = X & O;
        while (A > 0) {
          var R = P4(A), u = 1 << R;
          X |= F[R], A &= ~u;
        }
      }
      return X;
    }
    function n2(J, Q) {
      var Z = J.eventTimes, X = Z1;
      while (Q > 0) {
        var Y = P4(Q), G = 1 << Y, B = Z[Y];
        if (B > X)
          X = B;
        Q &= ~G;
      }
      return X;
    }
    function o2(J, Q) {
      switch (J) {
        case K0:
        case q6:
        case WQ:
          return Q + 250;
        case M4:
        case fJ:
        case E7:
        case R7:
        case aX:
        case rX:
        case nX:
        case oX:
        case tX:
        case eX:
        case JY:
        case QY:
        case ZY:
        case XY:
        case YY:
        case GY:
        case BY:
        case WY:
        case zY:
          return Q + 5000;
        case V6:
        case KY:
        case qY:
        case UY:
        case VY:
          return Z1;
        case w7:
        case I7:
        case D4:
        case d8:
          return Z1;
        default:
          return V("Should have found matching lanes. This is a bug in React."), Z1;
      }
    }
    function t2(J, Q) {
      var { pendingLanes: Z, suspendedLanes: X, pingedLanes: Y, expirationTimes: G } = J, B = Z;
      while (B > 0) {
        var W = P4(B), z = 1 << W, q = G[W];
        if (q === Z1) {
          if ((z & X) === N || (z & Y) !== N)
            G[W] = o2(z, Q);
        } else if (q <= Q)
          J.expiredLanes |= z;
        B &= ~z;
      }
    }
    function e2(J) {
      return _7(J.pendingLanes);
    }
    function $Y(J) {
      var Q = J.pendingLanes & ~d8;
      if (Q !== N)
        return Q;
      if (Q & d8)
        return d8;
      return N;
    }
    function J$(J) {
      return (J & K0) !== N;
    }
    function HY(J) {
      return (J & Dz) !== N;
    }
    function Az(J) {
      return (J & z5) === J;
    }
    function Q$(J) {
      var Q = K0 | WQ | fJ;
      return (J & Q) === N;
    }
    function Z$(J) {
      return (J & U6) === J;
    }
    function V5(J, Q) {
      var Z = q6 | WQ | M4 | fJ;
      return (Q & Z) !== N;
    }
    function X$(J, Q) {
      return (Q & J.expiredLanes) !== N;
    }
    function Pz(J) {
      return (J & U6) !== N;
    }
    function Fz() {
      var J = K5;
      if (K5 <<= 1, (K5 & U6) === N)
        K5 = R7;
      return J;
    }
    function Y$() {
      var J = q5;
      if (q5 <<= 1, (q5 & z5) === N)
        q5 = V6;
      return J;
    }
    function A4(J) {
      return J & -J;
    }
    function L7(J) {
      return A4(J);
    }
    function P4(J) {
      return 31 - jz(J);
    }
    function OY(J) {
      return P4(J);
    }
    function y8(J, Q) {
      return (J & Q) !== N;
    }
    function $6(J, Q) {
      return (J & Q) === Q;
    }
    function M0(J, Q) {
      return J | Q;
    }
    function $5(J, Q) {
      return J & ~Q;
    }
    function Ez(J, Q) {
      return J & Q;
    }
    function H5(J) {
      return J;
    }
    function G$(J, Q) {
      return J !== d1 && J < Q ? J : Q;
    }
    function jY(J) {
      var Q = [];
      for (var Z = 0;Z < pX; Z++)
        Q.push(J);
      return Q;
    }
    function N7(J, Q, Z) {
      if (J.pendingLanes |= Q, Q !== D4)
        J.suspendedLanes = N, J.pingedLanes = N;
      var X = J.eventTimes, Y = OY(Q);
      X[Y] = Z;
    }
    function B$(J, Q) {
      J.suspendedLanes |= Q, J.pingedLanes &= ~Q;
      var Z = J.expirationTimes, X = Q;
      while (X > 0) {
        var Y = P4(X), G = 1 << Y;
        Z[Y] = Z1, X &= ~G;
      }
    }
    function Rz(J, Q, Z) {
      J.pingedLanes |= J.suspendedLanes & Q;
    }
    function W$(J, Q) {
      var Z = J.pendingLanes & ~Q;
      J.pendingLanes = Q, J.suspendedLanes = N, J.pingedLanes = N, J.expiredLanes &= Q, J.mutableReadLanes &= Q, J.entangledLanes &= Q;
      var { entanglements: X, eventTimes: Y, expirationTimes: G } = J, B = Z;
      while (B > 0) {
        var W = P4(B), z = 1 << W;
        X[W] = N, Y[W] = Z1, G[W] = Z1, B &= ~z;
      }
    }
    function MY(J, Q) {
      var Z = J.entangledLanes |= Q, X = J.entanglements, Y = Z;
      while (Y) {
        var G = P4(Y), B = 1 << G;
        if (B & Q | X[G] & Q)
          X[G] |= Q;
        Y &= ~B;
      }
    }
    function z$(J, Q) {
      var Z = A4(Q), X;
      switch (Z) {
        case WQ:
          X = q6;
          break;
        case fJ:
          X = M4;
          break;
        case R7:
        case aX:
        case rX:
        case nX:
        case oX:
        case tX:
        case eX:
        case JY:
        case QY:
        case ZY:
        case XY:
        case YY:
        case GY:
        case BY:
        case WY:
        case zY:
        case V6:
        case KY:
        case qY:
        case UY:
        case VY:
          X = E7;
          break;
        case D4:
          X = I7;
          break;
        default:
          X = d1;
          break;
      }
      if ((X & (J.suspendedLanes | Q)) !== d1)
        return d1;
      return X;
    }
    function wz(J, Q, Z) {
      if (!DJ)
        return;
      var X = J.pendingUpdatersLaneMap;
      while (Z > 0) {
        var Y = OY(Z), G = 1 << Y, B = X[Y];
        B.add(Q), Z &= ~G;
      }
    }
    function Iz(J, Q) {
      if (!DJ)
        return;
      var { pendingUpdatersLaneMap: Z, memoizedUpdaters: X } = J;
      while (Q > 0) {
        var Y = OY(Q), G = 1 << Y, B = Z[Y];
        if (B.size > 0)
          B.forEach(function(W) {
            var z = W.alternate;
            if (z === null || !X.has(z))
              X.add(W);
          }), B.clear();
        Q &= ~G;
      }
    }
    function _z(J, Q) {
      return null;
    }
    var m8 = K0, zQ = WQ, KQ = fJ, O5 = D4, S7 = d1;
    function AJ() {
      return S7;
    }
    function y1(J) {
      S7 = J;
    }
    function K$(J, Q) {
      var Z = S7;
      try {
        return S7 = J, Q();
      } finally {
        S7 = Z;
      }
    }
    function q$(J, Q) {
      return J !== 0 && J < Q ? J : Q;
    }
    function U$(J, Q) {
      return J === 0 || J > Q ? J : Q;
    }
    function DY(J, Q) {
      return J !== 0 && J < Q;
    }
    function Lz(J) {
      var Q = A4(J);
      if (!DY(m8, Q))
        return m8;
      if (!DY(zQ, Q))
        return zQ;
      if (HY(Q))
        return KQ;
      return O5;
    }
    function j5(J) {
      var Q = J.current.memoizedState;
      return Q.isDehydrated;
    }
    var Nz;
    function V$(J) {
      Nz = J;
    }
    function $$(J) {
      Nz(J);
    }
    var AY;
    function H$(J) {
      AY = J;
    }
    var Sz;
    function O$(J) {
      Sz = J;
    }
    var xz;
    function j$(J) {
      xz = J;
    }
    var vz;
    function M$(J) {
      vz = J;
    }
    var PY = false, M5 = [], kQ = null, hQ = null, bQ = null, x7 = new Map, v7 = new Map, fQ = [], D$ = ["mousedown", "mouseup", "touchcancel", "touchend", "touchstart", "auxclick", "dblclick", "pointercancel", "pointerdown", "pointerup", "dragend", "dragstart", "drop", "compositionend", "compositionstart", "keydown", "keypress", "keyup", "input", "textInput", "copy", "cut", "paste", "click", "change", "contextmenu", "reset", "submit"];
    function A$(J) {
      return D$.indexOf(J) > -1;
    }
    function P$(J, Q, Z, X, Y) {
      return { blockedOn: J, domEventName: Q, eventSystemFlags: Z, nativeEvent: Y, targetContainers: [X] };
    }
    function gz(J, Q) {
      switch (J) {
        case "focusin":
        case "focusout":
          kQ = null;
          break;
        case "dragenter":
        case "dragleave":
          hQ = null;
          break;
        case "mouseover":
        case "mouseout":
          bQ = null;
          break;
        case "pointerover":
        case "pointerout": {
          var Z = Q.pointerId;
          x7.delete(Z);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var X = Q.pointerId;
          v7.delete(X);
          break;
        }
      }
    }
    function g7(J, Q, Z, X, Y, G) {
      if (J === null || J.nativeEvent !== G) {
        var B = P$(Q, Z, X, Y, G);
        if (Q !== null) {
          var W = yQ(Q);
          if (W !== null)
            AY(W);
        }
        return B;
      }
      J.eventSystemFlags |= X;
      var z = J.targetContainers;
      if (Y !== null && z.indexOf(Y) === -1)
        z.push(Y);
      return J;
    }
    function F$(J, Q, Z, X, Y) {
      switch (Q) {
        case "focusin": {
          var G = Y;
          return kQ = g7(kQ, J, Q, Z, X, G), true;
        }
        case "dragenter": {
          var B = Y;
          return hQ = g7(hQ, J, Q, Z, X, B), true;
        }
        case "mouseover": {
          var W = Y;
          return bQ = g7(bQ, J, Q, Z, X, W), true;
        }
        case "pointerover": {
          var z = Y, q = z.pointerId;
          return x7.set(q, g7(x7.get(q) || null, J, Q, Z, X, z)), true;
        }
        case "gotpointercapture": {
          var U = Y, j = U.pointerId;
          return v7.set(j, g7(v7.get(j) || null, J, Q, Z, X, U)), true;
        }
      }
      return false;
    }
    function Cz(J) {
      var Q = R4(J.target);
      if (Q !== null) {
        var Z = H4(Q);
        if (Z !== null) {
          var X = Z.tag;
          if (X === A0) {
            var Y = Xz(Z);
            if (Y !== null) {
              J.blockedOn = Y, vz(J.priority, function() {
                Sz(Z);
              });
              return;
            }
          } else if (X === T) {
            var G = Z.stateNode;
            if (j5(G)) {
              J.blockedOn = Yz(Z);
              return;
            }
          }
        }
      }
      J.blockedOn = null;
    }
    function E$(J) {
      var Q = xz(), Z = { blockedOn: null, target: J, priority: Q }, X = 0;
      for (;X < fQ.length; X++)
        if (!DY(Q, fQ[X].priority))
          break;
      if (fQ.splice(X, 0, Z), X === 0)
        Cz(Z);
    }
    function D5(J) {
      if (J.blockedOn !== null)
        return false;
      var Q = J.targetContainers;
      while (Q.length > 0) {
        var Z = Q[0], X = RY(J.domEventName, J.eventSystemFlags, Z, J.nativeEvent);
        if (X === null) {
          var Y = J.nativeEvent, G = new Y.constructor(Y.type, Y);
          aV(G), Y.target.dispatchEvent(G), rV();
        } else {
          var B = yQ(X);
          if (B !== null)
            AY(B);
          return J.blockedOn = X, false;
        }
        Q.shift();
      }
      return true;
    }
    function Tz(J, Q, Z) {
      if (D5(J))
        Z.delete(Q);
    }
    function R$() {
      if (PY = false, kQ !== null && D5(kQ))
        kQ = null;
      if (hQ !== null && D5(hQ))
        hQ = null;
      if (bQ !== null && D5(bQ))
        bQ = null;
      x7.forEach(Tz), v7.forEach(Tz);
    }
    function C7(J, Q) {
      if (J.blockedOn === Q) {
        if (J.blockedOn = null, !PY)
          PY = true, _.unstable_scheduleCallback(_.unstable_NormalPriority, R$);
      }
    }
    function T7(J) {
      if (M5.length > 0) {
        C7(M5[0], J);
        for (var Q = 1;Q < M5.length; Q++) {
          var Z = M5[Q];
          if (Z.blockedOn === J)
            Z.blockedOn = null;
        }
      }
      if (kQ !== null)
        C7(kQ, J);
      if (hQ !== null)
        C7(hQ, J);
      if (bQ !== null)
        C7(bQ, J);
      var X = function(W) {
        return C7(W, J);
      };
      x7.forEach(X), v7.forEach(X);
      for (var Y = 0;Y < fQ.length; Y++) {
        var G = fQ[Y];
        if (G.blockedOn === J)
          G.blockedOn = null;
      }
      while (fQ.length > 0) {
        var B = fQ[0];
        if (B.blockedOn !== null)
          break;
        else if (Cz(B), B.blockedOn === null)
          fQ.shift();
      }
    }
    var H6 = v.ReactCurrentBatchConfig, FY = true;
    function kz(J) {
      FY = !!J;
    }
    function w$() {
      return FY;
    }
    function I$(J, Q, Z) {
      var X = hz(Q), Y;
      switch (X) {
        case m8:
          Y = _$;
          break;
        case zQ:
          Y = L$;
          break;
        case KQ:
        default:
          Y = EY;
          break;
      }
      return Y.bind(null, Q, Z, J);
    }
    function _$(J, Q, Z, X) {
      var Y = AJ(), G = H6.transition;
      H6.transition = null;
      try {
        y1(m8), EY(J, Q, Z, X);
      } finally {
        y1(Y), H6.transition = G;
      }
    }
    function L$(J, Q, Z, X) {
      var Y = AJ(), G = H6.transition;
      H6.transition = null;
      try {
        y1(zQ), EY(J, Q, Z, X);
      } finally {
        y1(Y), H6.transition = G;
      }
    }
    function EY(J, Q, Z, X) {
      if (!FY)
        return;
      N$(J, Q, Z, X);
    }
    function N$(J, Q, Z, X) {
      var Y = RY(J, Q, Z, X);
      if (Y === null) {
        bY(J, Q, X, A5, Z), gz(J, X);
        return;
      }
      if (F$(Y, J, Q, Z, X)) {
        X.stopPropagation();
        return;
      }
      if (gz(J, X), Q & H7 && A$(J)) {
        while (Y !== null) {
          var G = yQ(Y);
          if (G !== null)
            $$(G);
          var B = RY(J, Q, Z, X);
          if (B === null)
            bY(J, Q, X, A5, Z);
          if (B === Y)
            break;
          Y = B;
        }
        if (Y !== null)
          X.stopPropagation();
        return;
      }
      bY(J, Q, X, null, Z);
    }
    var A5 = null;
    function RY(J, Q, Z, X) {
      A5 = null;
      var Y = xX(X), G = R4(Y);
      if (G !== null) {
        var B = H4(G);
        if (B === null)
          G = null;
        else {
          var W = B.tag;
          if (W === A0) {
            var z = Xz(B);
            if (z !== null)
              return z;
            G = null;
          } else if (W === T) {
            var q = B.stateNode;
            if (j5(q))
              return Yz(B);
            G = null;
          } else if (B !== G)
            G = null;
        }
      }
      return A5 = G, null;
    }
    function hz(J) {
      switch (J) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return m8;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return zQ;
        case "message": {
          var Q = A2();
          switch (Q) {
            case W5:
              return m8;
            case sX:
              return zQ;
            case O4:
            case P2:
              return KQ;
            case iX:
              return O5;
            default:
              return KQ;
          }
        }
        default:
          return KQ;
      }
    }
    function S$(J, Q, Z) {
      return J.addEventListener(Q, Z, false), Z;
    }
    function x$(J, Q, Z) {
      return J.addEventListener(Q, Z, true), Z;
    }
    function v$(J, Q, Z, X) {
      return J.addEventListener(Q, Z, { capture: true, passive: X }), Z;
    }
    function g$(J, Q, Z, X) {
      return J.addEventListener(Q, Z, { passive: X }), Z;
    }
    var k7 = null, wY = null, h7 = null;
    function C$(J) {
      return k7 = J, wY = fz(), true;
    }
    function T$() {
      k7 = null, wY = null, h7 = null;
    }
    function bz() {
      if (h7)
        return h7;
      var J, Q = wY, Z = Q.length, X, Y = fz(), G = Y.length;
      for (J = 0;J < Z; J++)
        if (Q[J] !== Y[J])
          break;
      var B = Z - J;
      for (X = 1;X <= B; X++)
        if (Q[Z - X] !== Y[G - X])
          break;
      var W = X > 1 ? 1 - X : undefined;
      return h7 = Y.slice(J, W), h7;
    }
    function fz() {
      if ("value" in k7)
        return k7.value;
      return k7.textContent;
    }
    function P5(J) {
      var Q, Z = J.keyCode;
      if ("charCode" in J) {
        if (Q = J.charCode, Q === 0 && Z === 13)
          Q = 13;
      } else
        Q = Z;
      if (Q === 10)
        Q = 13;
      if (Q >= 32 || Q === 13)
        return Q;
      return 0;
    }
    function F5() {
      return true;
    }
    function uz() {
      return false;
    }
    function c8(J) {
      function Q(Z, X, Y, G, B) {
        this._reactName = Z, this._targetInst = Y, this.type = X, this.nativeEvent = G, this.target = B, this.currentTarget = null;
        for (var W in J) {
          if (!J.hasOwnProperty(W))
            continue;
          var z = J[W];
          if (z)
            this[W] = z(G);
          else
            this[W] = G[W];
        }
        var q = G.defaultPrevented != null ? G.defaultPrevented : G.returnValue === false;
        if (q)
          this.isDefaultPrevented = F5;
        else
          this.isDefaultPrevented = uz;
        return this.isPropagationStopped = uz, this;
      }
      return D0(Q.prototype, { preventDefault: function() {
        this.defaultPrevented = true;
        var Z = this.nativeEvent;
        if (!Z)
          return;
        if (Z.preventDefault)
          Z.preventDefault();
        else if (typeof Z.returnValue !== "unknown")
          Z.returnValue = false;
        this.isDefaultPrevented = F5;
      }, stopPropagation: function() {
        var Z = this.nativeEvent;
        if (!Z)
          return;
        if (Z.stopPropagation)
          Z.stopPropagation();
        else if (typeof Z.cancelBubble !== "unknown")
          Z.cancelBubble = true;
        this.isPropagationStopped = F5;
      }, persist: function() {
      }, isPersistent: F5 }), Q;
    }
    var O6 = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(J) {
      return J.timeStamp || Date.now();
    }, defaultPrevented: 0, isTrusted: 0 }, IY = c8(O6), b7 = D0({}, O6, { view: 0, detail: 0 }), k$ = c8(b7), _Y, LY, f7;
    function h$(J) {
      if (J !== f7) {
        if (f7 && J.type === "mousemove")
          _Y = J.screenX - f7.screenX, LY = J.screenY - f7.screenY;
        else
          _Y = 0, LY = 0;
        f7 = J;
      }
    }
    var E5 = D0({}, b7, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: SY, button: 0, buttons: 0, relatedTarget: function(J) {
      if (J.relatedTarget === undefined)
        return J.fromElement === J.srcElement ? J.toElement : J.fromElement;
      return J.relatedTarget;
    }, movementX: function(J) {
      if ("movementX" in J)
        return J.movementX;
      return h$(J), _Y;
    }, movementY: function(J) {
      if ("movementY" in J)
        return J.movementY;
      return LY;
    } }), dz = c8(E5), b$ = D0({}, E5, { dataTransfer: 0 }), f$ = c8(b$), u$ = D0({}, b7, { relatedTarget: 0 }), NY = c8(u$), d$ = D0({}, O6, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), y$ = c8(d$), m$ = D0({}, O6, { clipboardData: function(J) {
      return "clipboardData" in J ? J.clipboardData : window.clipboardData;
    } }), c$ = c8(m$), s$ = D0({}, O6, { data: 0 }), yz = c8(s$), i$ = yz, l$ = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, p$ = { "8": "Backspace", "9": "Tab", "12": "Clear", "13": "Enter", "16": "Shift", "17": "Control", "18": "Alt", "19": "Pause", "20": "CapsLock", "27": "Escape", "32": " ", "33": "PageUp", "34": "PageDown", "35": "End", "36": "Home", "37": "ArrowLeft", "38": "ArrowUp", "39": "ArrowRight", "40": "ArrowDown", "45": "Insert", "46": "Delete", "112": "F1", "113": "F2", "114": "F3", "115": "F4", "116": "F5", "117": "F6", "118": "F7", "119": "F8", "120": "F9", "121": "F10", "122": "F11", "123": "F12", "144": "NumLock", "145": "ScrollLock", "224": "Meta" };
    function a$(J) {
      if (J.key) {
        var Q = l$[J.key] || J.key;
        if (Q !== "Unidentified")
          return Q;
      }
      if (J.type === "keypress") {
        var Z = P5(J);
        return Z === 13 ? "Enter" : String.fromCharCode(Z);
      }
      if (J.type === "keydown" || J.type === "keyup")
        return p$[J.keyCode] || "Unidentified";
      return "";
    }
    var r$ = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
    function n$(J) {
      var Q = this, Z = Q.nativeEvent;
      if (Z.getModifierState)
        return Z.getModifierState(J);
      var X = r$[J];
      return X ? !!Z[X] : false;
    }
    function SY(J) {
      return n$;
    }
    var o$ = D0({}, b7, { key: a$, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: SY, charCode: function(J) {
      if (J.type === "keypress")
        return P5(J);
      return 0;
    }, keyCode: function(J) {
      if (J.type === "keydown" || J.type === "keyup")
        return J.keyCode;
      return 0;
    }, which: function(J) {
      if (J.type === "keypress")
        return P5(J);
      if (J.type === "keydown" || J.type === "keyup")
        return J.keyCode;
      return 0;
    } }), t$ = c8(o$), e$ = D0({}, E5, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), mz = c8(e$), JH = D0({}, b7, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: SY }), QH = c8(JH), ZH = D0({}, O6, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), XH = c8(ZH), YH = D0({}, E5, { deltaX: function(J) {
      return "deltaX" in J ? J.deltaX : ("wheelDeltaX" in J) ? -J.wheelDeltaX : 0;
    }, deltaY: function(J) {
      return "deltaY" in J ? J.deltaY : ("wheelDeltaY" in J) ? -J.wheelDeltaY : ("wheelDelta" in J) ? -J.wheelDelta : 0;
    }, deltaZ: 0, deltaMode: 0 }), GH = c8(YH), BH = [9, 13, 27, 32], cz = 229, xY = c1 && "CompositionEvent" in window, u7 = null;
    if (c1 && "documentMode" in document)
      u7 = document.documentMode;
    var WH = c1 && "TextEvent" in window && !u7, sz = c1 && (!xY || u7 && u7 > 8 && u7 <= 11), iz = 32, lz = String.fromCharCode(iz);
    function zH() {
      B8("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), B8("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), B8("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), B8("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var pz = false;
    function KH(J) {
      return (J.ctrlKey || J.altKey || J.metaKey) && !(J.ctrlKey && J.altKey);
    }
    function qH(J) {
      switch (J) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function UH(J, Q) {
      return J === "keydown" && Q.keyCode === cz;
    }
    function az(J, Q) {
      switch (J) {
        case "keyup":
          return BH.indexOf(Q.keyCode) !== -1;
        case "keydown":
          return Q.keyCode !== cz;
        case "keypress":
        case "mousedown":
        case "focusout":
          return true;
        default:
          return false;
      }
    }
    function rz(J) {
      var Q = J.detail;
      if (typeof Q === "object" && "data" in Q)
        return Q.data;
      return null;
    }
    function nz(J) {
      return J.locale === "ko";
    }
    var j6 = false;
    function VH(J, Q, Z, X, Y) {
      var G, B;
      if (xY)
        G = qH(Q);
      else if (!j6) {
        if (UH(Q, X))
          G = "onCompositionStart";
      } else if (az(Q, X))
        G = "onCompositionEnd";
      if (!G)
        return null;
      if (sz && !nz(X)) {
        if (!j6 && G === "onCompositionStart")
          j6 = C$(Y);
        else if (G === "onCompositionEnd") {
          if (j6)
            B = bz();
        }
      }
      var W = L5(Z, G);
      if (W.length > 0) {
        var z = new yz(G, Q, null, X, Y);
        if (J.push({ event: z, listeners: W }), B)
          z.data = B;
        else {
          var q = rz(X);
          if (q !== null)
            z.data = q;
        }
      }
    }
    function $H(J, Q) {
      switch (J) {
        case "compositionend":
          return rz(Q);
        case "keypress":
          var Z = Q.which;
          if (Z !== iz)
            return null;
          return pz = true, lz;
        case "textInput":
          var X = Q.data;
          if (X === lz && pz)
            return null;
          return X;
        default:
          return null;
      }
    }
    function HH(J, Q) {
      if (j6) {
        if (J === "compositionend" || !xY && az(J, Q)) {
          var Z = bz();
          return T$(), j6 = false, Z;
        }
        return null;
      }
      switch (J) {
        case "paste":
          return null;
        case "keypress":
          if (!KH(Q)) {
            if (Q.char && Q.char.length > 1)
              return Q.char;
            else if (Q.which)
              return String.fromCharCode(Q.which);
          }
          return null;
        case "compositionend":
          return sz && !nz(Q) ? null : Q.data;
        default:
          return null;
      }
    }
    function OH(J, Q, Z, X, Y) {
      var G;
      if (WH)
        G = $H(Q, X);
      else
        G = HH(Q, X);
      if (!G)
        return null;
      var B = L5(Z, "onBeforeInput");
      if (B.length > 0) {
        var W = new i$("onBeforeInput", "beforeinput", null, X, Y);
        J.push({ event: W, listeners: B }), W.data = G;
      }
    }
    function jH(J, Q, Z, X, Y, G, B) {
      VH(J, Q, Z, X, Y), OH(J, Q, Z, X, Y);
    }
    var MH = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
    function oz(J) {
      var Q = J && J.nodeName && J.nodeName.toLowerCase();
      if (Q === "input")
        return !!MH[J.type];
      if (Q === "textarea")
        return true;
      return false;
    }
    function DH(J) {
      if (!c1)
        return false;
      var Q = "on" + J, Z = Q in document;
      if (!Z) {
        var X = document.createElement("div");
        X.setAttribute(Q, "return;"), Z = typeof X[Q] === "function";
      }
      return Z;
    }
    function AH() {
      B8("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function tz(J, Q, Z, X) {
      rW(X);
      var Y = L5(Q, "onChange");
      if (Y.length > 0) {
        var G = new IY("onChange", "change", null, Z, X);
        J.push({ event: G, listeners: Y });
      }
    }
    var d7 = null, y7 = null;
    function PH(J) {
      var Q = J.nodeName && J.nodeName.toLowerCase();
      return Q === "select" || Q === "input" && J.type === "file";
    }
    function FH(J) {
      var Q = [];
      tz(Q, y7, J, xX(J)), eW(EH, Q);
    }
    function EH(J) {
      jK(J, 0);
    }
    function R5(J) {
      var Q = E6(J);
      if (t4(Q))
        return J;
    }
    function RH(J, Q) {
      if (J === "change")
        return Q;
    }
    var ez = false;
    if (c1)
      ez = DH("input") && (!document.documentMode || document.documentMode > 9);
    function wH(J, Q) {
      d7 = J, y7 = Q, d7.attachEvent("onpropertychange", QK);
    }
    function JK() {
      if (!d7)
        return;
      d7.detachEvent("onpropertychange", QK), d7 = null, y7 = null;
    }
    function QK(J) {
      if (J.propertyName !== "value")
        return;
      if (R5(y7))
        FH(J);
    }
    function IH(J, Q, Z) {
      if (J === "focusin")
        JK(), wH(Q, Z);
      else if (J === "focusout")
        JK();
    }
    function _H(J, Q) {
      if (J === "selectionchange" || J === "keyup" || J === "keydown")
        return R5(y7);
    }
    function LH(J) {
      var Q = J.nodeName;
      return Q && Q.toLowerCase() === "input" && (J.type === "checkbox" || J.type === "radio");
    }
    function NH(J, Q) {
      if (J === "click")
        return R5(Q);
    }
    function SH(J, Q) {
      if (J === "input" || J === "change")
        return R5(Q);
    }
    function xH(J) {
      var Q = J._wrapperState;
      if (!Q || !Q.controlled || J.type !== "number")
        return;
      f0(J, "number", J.value);
    }
    function vH(J, Q, Z, X, Y, G, B) {
      var W = Z ? E6(Z) : window, z, q;
      if (PH(W))
        z = RH;
      else if (oz(W))
        if (ez)
          z = SH;
        else
          z = _H, q = IH;
      else if (LH(W))
        z = NH;
      if (z) {
        var U = z(Q, Z);
        if (U) {
          tz(J, U, X, Y);
          return;
        }
      }
      if (q)
        q(Q, W, Z);
      if (Q === "focusout")
        xH(W);
    }
    function gH() {
      f8("onMouseEnter", ["mouseout", "mouseover"]), f8("onMouseLeave", ["mouseout", "mouseover"]), f8("onPointerEnter", ["pointerout", "pointerover"]), f8("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function CH(J, Q, Z, X, Y, G, B) {
      var W = Q === "mouseover" || Q === "pointerover", z = Q === "mouseout" || Q === "pointerout";
      if (W && !nV(X)) {
        var q = X.relatedTarget || X.fromElement;
        if (q) {
          if (R4(q) || Z9(q))
            return;
        }
      }
      if (!z && !W)
        return;
      var U;
      if (Y.window === Y)
        U = Y;
      else {
        var j = Y.ownerDocument;
        if (j)
          U = j.defaultView || j.parentWindow;
        else
          U = window;
      }
      var O, F;
      if (z) {
        var A = X.relatedTarget || X.toElement;
        if (O = Z, F = A ? R4(A) : null, F !== null) {
          var R = H4(F);
          if (F !== R || F.tag !== c && F.tag !== w0)
            F = null;
        }
      } else
        O = null, F = Z;
      if (O === F)
        return;
      var u = dz, o = "onMouseLeave", a = "onMouseEnter", P0 = "mouse";
      if (Q === "pointerout" || Q === "pointerover")
        u = mz, o = "onPointerLeave", a = "onPointerEnter", P0 = "pointer";
      var F0 = O == null ? U : E6(O), M = F == null ? U : E6(F), I = new u(o, P0 + "leave", O, X, Y);
      I.target = F0, I.relatedTarget = M;
      var D = null, x = R4(Y);
      if (x === Z) {
        var y = new u(a, P0 + "enter", F, X, Y);
        y.target = M, y.relatedTarget = F0, D = y;
      }
      XO(J, I, D, O, F);
    }
    function TH(J, Q) {
      return J === Q && (J !== 0 || 1 / J === 1 / Q) || J !== J && Q !== Q;
    }
    var s8 = typeof Object.is === "function" ? Object.is : TH;
    function m7(J, Q) {
      if (s8(J, Q))
        return true;
      if (typeof J !== "object" || J === null || typeof Q !== "object" || Q === null)
        return false;
      var Z = Object.keys(J), X = Object.keys(Q);
      if (Z.length !== X.length)
        return false;
      for (var Y = 0;Y < Z.length; Y++) {
        var G = Z[Y];
        if (!s1.call(Q, G) || !s8(J[G], Q[G]))
          return false;
      }
      return true;
    }
    function ZK(J) {
      while (J && J.firstChild)
        J = J.firstChild;
      return J;
    }
    function kH(J) {
      while (J) {
        if (J.nextSibling)
          return J.nextSibling;
        J = J.parentNode;
      }
    }
    function XK(J, Q) {
      var Z = ZK(J), X = 0, Y = 0;
      while (Z) {
        if (Z.nodeType === QQ) {
          if (Y = X + Z.textContent.length, X <= Q && Y >= Q)
            return { node: Z, offset: Q - X };
          X = Y;
        }
        Z = ZK(kH(Z));
      }
    }
    function hH(J) {
      var Q = J.ownerDocument, Z = Q && Q.defaultView || window, X = Z.getSelection && Z.getSelection();
      if (!X || X.rangeCount === 0)
        return null;
      var { anchorNode: Y, anchorOffset: G, focusNode: B, focusOffset: W } = X;
      try {
        Y.nodeType, B.nodeType;
      } catch (z) {
        return null;
      }
      return bH(J, Y, G, B, W);
    }
    function bH(J, Q, Z, X, Y) {
      var G = 0, B = -1, W = -1, z = 0, q = 0, U = J, j = null;
      J:
        while (true) {
          var O = null;
          while (true) {
            if (U === Q && (Z === 0 || U.nodeType === QQ))
              B = G + Z;
            if (U === X && (Y === 0 || U.nodeType === QQ))
              W = G + Y;
            if (U.nodeType === QQ)
              G += U.nodeValue.length;
            if ((O = U.firstChild) === null)
              break;
            j = U, U = O;
          }
          while (true) {
            if (U === J)
              break J;
            if (j === Q && ++z === Z)
              B = G;
            if (j === X && ++q === Y)
              W = G;
            if ((O = U.nextSibling) !== null)
              break;
            U = j, j = U.parentNode;
          }
          U = O;
        }
      if (B === -1 || W === -1)
        return null;
      return { start: B, end: W };
    }
    function fH(J, Q) {
      var Z = J.ownerDocument || document, X = Z && Z.defaultView || window;
      if (!X.getSelection)
        return;
      var Y = X.getSelection(), G = J.textContent.length, B = Math.min(Q.start, G), W = Q.end === undefined ? B : Math.min(Q.end, G);
      if (!Y.extend && B > W) {
        var z = W;
        W = B, B = z;
      }
      var q = XK(J, B), U = XK(J, W);
      if (q && U) {
        if (Y.rangeCount === 1 && Y.anchorNode === q.node && Y.anchorOffset === q.offset && Y.focusNode === U.node && Y.focusOffset === U.offset)
          return;
        var j = Z.createRange();
        if (j.setStart(q.node, q.offset), Y.removeAllRanges(), B > W)
          Y.addRange(j), Y.extend(U.node, U.offset);
        else
          j.setEnd(U.node, U.offset), Y.addRange(j);
      }
    }
    function YK(J) {
      return J && J.nodeType === QQ;
    }
    function GK(J, Q) {
      if (!J || !Q)
        return false;
      else if (J === Q)
        return true;
      else if (YK(J))
        return false;
      else if (YK(Q))
        return GK(J, Q.parentNode);
      else if ("contains" in J)
        return J.contains(Q);
      else if (J.compareDocumentPosition)
        return !!(J.compareDocumentPosition(Q) & 16);
      else
        return false;
    }
    function uH(J) {
      return J && J.ownerDocument && GK(J.ownerDocument.documentElement, J);
    }
    function dH(J) {
      try {
        return typeof J.contentWindow.location.href === "string";
      } catch (Q) {
        return false;
      }
    }
    function BK() {
      var J = window, Q = e4();
      while (Q instanceof J.HTMLIFrameElement) {
        if (dH(Q))
          J = Q.contentWindow;
        else
          return Q;
        Q = e4(J.document);
      }
      return Q;
    }
    function vY(J) {
      var Q = J && J.nodeName && J.nodeName.toLowerCase();
      return Q && (Q === "input" && (J.type === "text" || J.type === "search" || J.type === "tel" || J.type === "url" || J.type === "password") || Q === "textarea" || J.contentEditable === "true");
    }
    function yH() {
      var J = BK();
      return { focusedElem: J, selectionRange: vY(J) ? cH(J) : null };
    }
    function mH(J) {
      var Q = BK(), Z = J.focusedElem, X = J.selectionRange;
      if (Q !== Z && uH(Z)) {
        if (X !== null && vY(Z))
          sH(Z, X);
        var Y = [], G = Z;
        while (G = G.parentNode)
          if (G.nodeType === x8)
            Y.push({ element: G, left: G.scrollLeft, top: G.scrollTop });
        if (typeof Z.focus === "function")
          Z.focus();
        for (var B = 0;B < Y.length; B++) {
          var W = Y[B];
          W.element.scrollLeft = W.left, W.element.scrollTop = W.top;
        }
      }
    }
    function cH(J) {
      var Q;
      if ("selectionStart" in J)
        Q = { start: J.selectionStart, end: J.selectionEnd };
      else
        Q = hH(J);
      return Q || { start: 0, end: 0 };
    }
    function sH(J, Q) {
      var { start: Z, end: X } = Q;
      if (X === undefined)
        X = Z;
      if ("selectionStart" in J)
        J.selectionStart = Z, J.selectionEnd = Math.min(X, J.value.length);
      else
        fH(J, Q);
    }
    var iH = c1 && "documentMode" in document && document.documentMode <= 11;
    function lH() {
      B8("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var M6 = null, gY = null, c7 = null, CY = false;
    function pH(J) {
      if ("selectionStart" in J && vY(J))
        return { start: J.selectionStart, end: J.selectionEnd };
      else {
        var Q = J.ownerDocument && J.ownerDocument.defaultView || window, Z = Q.getSelection();
        return { anchorNode: Z.anchorNode, anchorOffset: Z.anchorOffset, focusNode: Z.focusNode, focusOffset: Z.focusOffset };
      }
    }
    function aH(J) {
      return J.window === J ? J.document : J.nodeType === ZQ ? J : J.ownerDocument;
    }
    function WK(J, Q, Z) {
      var X = aH(Z);
      if (CY || M6 == null || M6 !== e4(X))
        return;
      var Y = pH(M6);
      if (!c7 || !m7(c7, Y)) {
        c7 = Y;
        var G = L5(gY, "onSelect");
        if (G.length > 0) {
          var B = new IY("onSelect", "select", null, Q, Z);
          J.push({ event: B, listeners: G }), B.target = M6;
        }
      }
    }
    function rH(J, Q, Z, X, Y, G, B) {
      var W = Z ? E6(Z) : window;
      switch (Q) {
        case "focusin":
          if (oz(W) || W.contentEditable === "true")
            M6 = W, gY = Z, c7 = null;
          break;
        case "focusout":
          M6 = null, gY = null, c7 = null;
          break;
        case "mousedown":
          CY = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          CY = false, WK(J, X, Y);
          break;
        case "selectionchange":
          if (iH)
            break;
        case "keydown":
        case "keyup":
          WK(J, X, Y);
      }
    }
    function w5(J, Q) {
      var Z = {};
      return Z[J.toLowerCase()] = Q.toLowerCase(), Z["Webkit" + J] = "webkit" + Q, Z["Moz" + J] = "moz" + Q, Z;
    }
    var D6 = { animationend: w5("Animation", "AnimationEnd"), animationiteration: w5("Animation", "AnimationIteration"), animationstart: w5("Animation", "AnimationStart"), transitionend: w5("Transition", "TransitionEnd") }, TY = {}, zK = {};
    if (c1) {
      if (zK = document.createElement("div").style, !("AnimationEvent" in window))
        delete D6.animationend.animation, delete D6.animationiteration.animation, delete D6.animationstart.animation;
      if (!("TransitionEvent" in window))
        delete D6.transitionend.transition;
    }
    function I5(J) {
      if (TY[J])
        return TY[J];
      else if (!D6[J])
        return J;
      var Q = D6[J];
      for (var Z in Q)
        if (Q.hasOwnProperty(Z) && Z in zK)
          return TY[J] = Q[Z];
      return J;
    }
    var KK = I5("animationend"), qK = I5("animationiteration"), UK = I5("animationstart"), VK = I5("transitionend"), $K = new Map, HK = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function uQ(J, Q) {
      $K.set(J, Q), B8(Q, [J]);
    }
    function nH() {
      for (var J = 0;J < HK.length; J++) {
        var Q = HK[J], Z = Q.toLowerCase(), X = Q[0].toUpperCase() + Q.slice(1);
        uQ(Z, "on" + X);
      }
      uQ(KK, "onAnimationEnd"), uQ(qK, "onAnimationIteration"), uQ(UK, "onAnimationStart"), uQ("dblclick", "onDoubleClick"), uQ("focusin", "onFocus"), uQ("focusout", "onBlur"), uQ(VK, "onTransitionEnd");
    }
    function oH(J, Q, Z, X, Y, G, B) {
      var W = $K.get(Q);
      if (W === undefined)
        return;
      var z = IY, q = Q;
      switch (Q) {
        case "keypress":
          if (P5(X) === 0)
            return;
        case "keydown":
        case "keyup":
          z = t$;
          break;
        case "focusin":
          q = "focus", z = NY;
          break;
        case "focusout":
          q = "blur", z = NY;
          break;
        case "beforeblur":
        case "afterblur":
          z = NY;
          break;
        case "click":
          if (X.button === 2)
            return;
        case "auxclick":
        case "dblclick":
        case "mousedown":
        case "mousemove":
        case "mouseup":
        case "mouseout":
        case "mouseover":
        case "contextmenu":
          z = dz;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          z = f$;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          z = QH;
          break;
        case KK:
        case qK:
        case UK:
          z = y$;
          break;
        case VK:
          z = XH;
          break;
        case "scroll":
          z = k$;
          break;
        case "wheel":
          z = GH;
          break;
        case "copy":
        case "cut":
        case "paste":
          z = c$;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          z = mz;
          break;
      }
      var U = (G & H7) !== 0;
      {
        var j = !U && Q === "scroll", O = QO(Z, W, X.type, U, j);
        if (O.length > 0) {
          var F = new z(W, q, null, X, Y);
          J.push({ event: F, listeners: O });
        }
      }
    }
    nH(), gH(), AH(), lH(), zH();
    function tH(J, Q, Z, X, Y, G, B) {
      oH(J, Q, Z, X, Y, G);
      var W = (G & pV) === 0;
      if (W)
        CH(J, Q, Z, X, Y), vH(J, Q, Z, X, Y), rH(J, Q, Z, X, Y), jH(J, Q, Z, X, Y);
    }
    var s7 = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], kY = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(s7));
    function OK(J, Q, Z) {
      var X = J.type || "unknown-event";
      J.currentTarget = Z, G2(X, Q, undefined, J), J.currentTarget = null;
    }
    function eH(J, Q, Z) {
      var X;
      if (Z)
        for (var Y = Q.length - 1;Y >= 0; Y--) {
          var G = Q[Y], B = G.instance, W = G.currentTarget, z = G.listener;
          if (B !== X && J.isPropagationStopped())
            return;
          OK(J, z, W), X = B;
        }
      else
        for (var q = 0;q < Q.length; q++) {
          var U = Q[q], j = U.instance, O = U.currentTarget, F = U.listener;
          if (j !== X && J.isPropagationStopped())
            return;
          OK(J, F, O), X = j;
        }
    }
    function jK(J, Q) {
      var Z = (Q & H7) !== 0;
      for (var X = 0;X < J.length; X++) {
        var Y = J[X], G = Y.event, B = Y.listeners;
        eH(G, B, Z);
      }
      B2();
    }
    function JO(J, Q, Z, X, Y) {
      var G = xX(Z), B = [];
      tH(B, J, X, Z, G, Q), jK(B, Q);
    }
    function Y1(J, Q) {
      if (!kY.has(J))
        V('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', J);
      var Z = false, X = xj(Q), Y = YO(J, Z);
      if (!X.has(Y))
        MK(Q, J, SX, Z), X.add(Y);
    }
    function hY(J, Q, Z) {
      if (kY.has(J) && !Q)
        V('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', J);
      var X = 0;
      if (Q)
        X |= H7;
      MK(Z, J, X, Q);
    }
    var _5 = "_reactListening" + Math.random().toString(36).slice(2);
    function i7(J) {
      if (!J[_5]) {
        J[_5] = true, b8.forEach(function(Z) {
          if (Z !== "selectionchange") {
            if (!kY.has(Z))
              hY(Z, false, J);
            hY(Z, true, J);
          }
        });
        var Q = J.nodeType === ZQ ? J : J.ownerDocument;
        if (Q !== null) {
          if (!Q[_5])
            Q[_5] = true, hY("selectionchange", false, Q);
        }
      }
    }
    function MK(J, Q, Z, X, Y) {
      var G = I$(J, Q, Z), B = undefined;
      if (CX) {
        if (Q === "touchstart" || Q === "touchmove" || Q === "wheel")
          B = true;
      }
      J = J;
      var W;
      if (X)
        if (B !== undefined)
          W = v$(J, Q, G, B);
        else
          W = x$(J, Q, G);
      else if (B !== undefined)
        W = g$(J, Q, G, B);
      else
        W = S$(J, Q, G);
    }
    function DK(J, Q) {
      return J === Q || J.nodeType === M1 && J.parentNode === Q;
    }
    function bY(J, Q, Z, X, Y) {
      var G = X;
      if ((Q & pW) === 0 && (Q & SX) === 0) {
        var B = Y;
        if (X !== null) {
          var W = X;
          J:
            while (true) {
              if (W === null)
                return;
              var z = W.tag;
              if (z === T || z === e) {
                var q = W.stateNode.containerInfo;
                if (DK(q, B))
                  break;
                if (z === e) {
                  var U = W.return;
                  while (U !== null) {
                    var j = U.tag;
                    if (j === T || j === e) {
                      var O = U.stateNode.containerInfo;
                      if (DK(O, B))
                        return;
                    }
                    U = U.return;
                  }
                }
                while (q !== null) {
                  var F = R4(q);
                  if (F === null)
                    return;
                  var A = F.tag;
                  if (A === c || A === w0) {
                    W = G = F;
                    continue J;
                  }
                  q = q.parentNode;
                }
              }
              W = W.return;
            }
        }
      }
      eW(function() {
        return JO(J, Q, Z, G);
      });
    }
    function l7(J, Q, Z) {
      return { instance: J, listener: Q, currentTarget: Z };
    }
    function QO(J, Q, Z, X, Y, G) {
      var B = Q !== null ? Q + "Capture" : null, W = X ? B : Q, z = [], q = J, U = null;
      while (q !== null) {
        var j = q, O = j.stateNode, F = j.tag;
        if (F === c && O !== null) {
          if (U = O, W !== null) {
            var A = j7(q, W);
            if (A != null)
              z.push(l7(q, A, U));
          }
        }
        if (Y)
          break;
        q = q.return;
      }
      return z;
    }
    function L5(J, Q) {
      var Z = Q + "Capture", X = [], Y = J;
      while (Y !== null) {
        var G = Y, B = G.stateNode, W = G.tag;
        if (W === c && B !== null) {
          var z = B, q = j7(Y, Z);
          if (q != null)
            X.unshift(l7(Y, q, z));
          var U = j7(Y, Q);
          if (U != null)
            X.push(l7(Y, U, z));
        }
        Y = Y.return;
      }
      return X;
    }
    function A6(J) {
      if (J === null)
        return null;
      do
        J = J.return;
      while (J && J.tag !== c);
      if (J)
        return J;
      return null;
    }
    function ZO(J, Q) {
      var Z = J, X = Q, Y = 0;
      for (var G = Z;G; G = A6(G))
        Y++;
      var B = 0;
      for (var W = X;W; W = A6(W))
        B++;
      while (Y - B > 0)
        Z = A6(Z), Y--;
      while (B - Y > 0)
        X = A6(X), B--;
      var z = Y;
      while (z--) {
        if (Z === X || X !== null && Z === X.alternate)
          return Z;
        Z = A6(Z), X = A6(X);
      }
      return null;
    }
    function AK(J, Q, Z, X, Y) {
      var G = Q._reactName, B = [], W = Z;
      while (W !== null) {
        if (W === X)
          break;
        var z = W, q = z.alternate, U = z.stateNode, j = z.tag;
        if (q !== null && q === X)
          break;
        if (j === c && U !== null) {
          var O = U;
          if (Y) {
            var F = j7(W, G);
            if (F != null)
              B.unshift(l7(W, F, O));
          } else if (!Y) {
            var A = j7(W, G);
            if (A != null)
              B.push(l7(W, A, O));
          }
        }
        W = W.return;
      }
      if (B.length !== 0)
        J.push({ event: Q, listeners: B });
    }
    function XO(J, Q, Z, X, Y) {
      var G = X && Y ? ZO(X, Y) : null;
      if (X !== null)
        AK(J, Q, X, G, false);
      if (Y !== null && Z !== null)
        AK(J, Z, Y, G, true);
    }
    function YO(J, Q) {
      return J + "__" + (Q ? "capture" : "bubble");
    }
    var v8 = false, p7 = "dangerouslySetInnerHTML", N5 = "suppressContentEditableWarning", dQ = "suppressHydrationWarning", PK = "autoFocus", F4 = "children", E4 = "style", S5 = "__html", fY, x5, a7, FK, v5, EK, RK;
    fY = { dialog: true, webview: true }, x5 = function(J, Q) {
      dV(J, Q), yV(J, Q), lV(J, Q, { registrationNameDependencies: j8, possibleRegistrationNames: o8 });
    }, EK = c1 && !document.documentMode, a7 = function(J, Q, Z) {
      if (v8)
        return;
      var X = g5(Z), Y = g5(Q);
      if (Y === X)
        return;
      v8 = true, V("Prop `%s` did not match. Server: %s Client: %s", J, JSON.stringify(Y), JSON.stringify(X));
    }, FK = function(J) {
      if (v8)
        return;
      v8 = true;
      var Q = [];
      J.forEach(function(Z) {
        Q.push(Z);
      }), V("Extra attributes from the server: %s", Q);
    }, v5 = function(J, Q) {
      if (Q === false)
        V("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", J, J, J);
      else
        V("Expected `%s` listener to be a function, instead got a value of `%s` type.", J, typeof Q);
    }, RK = function(J, Q) {
      var Z = J.namespaceURI === JQ ? J.ownerDocument.createElement(J.tagName) : J.ownerDocument.createElementNS(J.namespaceURI, J.tagName);
      return Z.innerHTML = Q, Z.innerHTML;
    };
    var GO = /\r\n?/g, BO = /\u0000|\uFFFD/g;
    function g5(J) {
      t8(J);
      var Q = typeof J === "string" ? J : "" + J;
      return Q.replace(GO, "\n").replace(BO, "");
    }
    function C5(J, Q, Z, X) {
      var Y = g5(Q), G = g5(J);
      if (G === Y)
        return;
      if (X) {
        if (!v8)
          v8 = true, V('Text content did not match. Server: "%s" Client: "%s"', G, Y);
      }
      if (Z && gJ)
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function wK(J) {
      return J.nodeType === ZQ ? J : J.ownerDocument;
    }
    function WO() {
    }
    function T5(J) {
      J.onclick = WO;
    }
    function zO(J, Q, Z, X, Y) {
      for (var G in X) {
        if (!X.hasOwnProperty(G))
          continue;
        var B = X[G];
        if (G === E4) {
          if (B)
            Object.freeze(B);
          yW(Q, B);
        } else if (G === p7) {
          var W = B ? B[S5] : undefined;
          if (W != null)
            hW(Q, W);
        } else if (G === F4) {
          if (typeof B === "string") {
            var z = J !== "textarea" || B !== "";
            if (z)
              Q5(Q, B);
          } else if (typeof B === "number")
            Q5(Q, "" + B);
        } else if (G === N5 || G === dQ)
          ;
        else if (G === PK)
          ;
        else if (j8.hasOwnProperty(G)) {
          if (B != null) {
            if (typeof B !== "function")
              v5(G, B);
            if (G === "onScroll")
              Y1("scroll", Q);
          }
        } else if (B != null)
          B4(Q, G, B, Y);
      }
    }
    function KO(J, Q, Z, X) {
      for (var Y = 0;Y < Q.length; Y += 2) {
        var G = Q[Y], B = Q[Y + 1];
        if (G === E4)
          yW(J, B);
        else if (G === p7)
          hW(J, B);
        else if (G === F4)
          Q5(J, B);
        else
          B4(J, G, B, X);
      }
    }
    function qO(J, Q, Z, X) {
      var Y, G = wK(Z), B, W = X;
      if (W === JQ)
        W = RX(J);
      if (W === JQ) {
        if (Y = K4(J, Q), !Y && J !== J.toLowerCase())
          V("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", J);
        if (J === "script") {
          var z = G.createElement("div");
          z.innerHTML = "<script></script>";
          var q = z.firstChild;
          B = z.removeChild(q);
        } else if (typeof Q.is === "string")
          B = G.createElement(J, { is: Q.is });
        else if (B = G.createElement(J), J === "select") {
          var U = B;
          if (Q.multiple)
            U.multiple = true;
          else if (Q.size)
            U.size = Q.size;
        }
      } else
        B = G.createElementNS(W, J);
      if (W === JQ) {
        if (!Y && Object.prototype.toString.call(B) === "[object HTMLUnknownElement]" && !s1.call(fY, J))
          fY[J] = true, V("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", J);
      }
      return B;
    }
    function UO(J, Q) {
      return wK(Q).createTextNode(J);
    }
    function VO(J, Q, Z, X) {
      var Y = K4(Q, Z);
      x5(Q, Z);
      var G;
      switch (Q) {
        case "dialog":
          Y1("cancel", J), Y1("close", J), G = Z;
          break;
        case "iframe":
        case "object":
        case "embed":
          Y1("load", J), G = Z;
          break;
        case "video":
        case "audio":
          for (var B = 0;B < s7.length; B++)
            Y1(s7[B], J);
          G = Z;
          break;
        case "source":
          Y1("error", J), G = Z;
          break;
        case "img":
        case "image":
        case "link":
          Y1("error", J), Y1("load", J), G = Z;
          break;
        case "details":
          Y1("toggle", J), G = Z;
          break;
        case "input":
          w(J, Z), G = P(J, Z), Y1("invalid", J);
          break;
        case "option":
          W1(J, Z), G = Z;
          break;
        case "select":
          vW(J, Z), G = V7(J, Z), Y1("invalid", J);
          break;
        case "textarea":
          CW(J, Z), G = FX(J, Z), Y1("invalid", J);
          break;
        default:
          G = Z;
      }
      switch (NX(Q, G), zO(Q, J, X, G, Y), Q) {
        case "input":
          CQ(J), p(J, Z, false);
          break;
        case "textarea":
          CQ(J), kW(J);
          break;
        case "option":
          w1(J, Z);
          break;
        case "select":
          zV(J, Z);
          break;
        default:
          if (typeof G.onClick === "function")
            T5(J);
          break;
      }
    }
    function $O(J, Q, Z, X, Y) {
      x5(Q, X);
      var G = null, B, W;
      switch (Q) {
        case "input":
          B = P(J, Z), W = P(J, X), G = [];
          break;
        case "select":
          B = V7(J, Z), W = V7(J, X), G = [];
          break;
        case "textarea":
          B = FX(J, Z), W = FX(J, X), G = [];
          break;
        default:
          if (B = Z, W = X, typeof B.onClick !== "function" && typeof W.onClick === "function")
            T5(J);
          break;
      }
      NX(Q, W);
      var z, q, U = null;
      for (z in B) {
        if (W.hasOwnProperty(z) || !B.hasOwnProperty(z) || B[z] == null)
          continue;
        if (z === E4) {
          var j = B[z];
          for (q in j)
            if (j.hasOwnProperty(q)) {
              if (!U)
                U = {};
              U[q] = "";
            }
        } else if (z === p7 || z === F4)
          ;
        else if (z === N5 || z === dQ)
          ;
        else if (z === PK)
          ;
        else if (j8.hasOwnProperty(z)) {
          if (!G)
            G = [];
        } else
          (G = G || []).push(z, null);
      }
      for (z in W) {
        var O = W[z], F = B != null ? B[z] : undefined;
        if (!W.hasOwnProperty(z) || O === F || O == null && F == null)
          continue;
        if (z === E4) {
          if (O)
            Object.freeze(O);
          if (F) {
            for (q in F)
              if (F.hasOwnProperty(q) && (!O || !O.hasOwnProperty(q))) {
                if (!U)
                  U = {};
                U[q] = "";
              }
            for (q in O)
              if (O.hasOwnProperty(q) && F[q] !== O[q]) {
                if (!U)
                  U = {};
                U[q] = O[q];
              }
          } else {
            if (!U) {
              if (!G)
                G = [];
              G.push(z, U);
            }
            U = O;
          }
        } else if (z === p7) {
          var A = O ? O[S5] : undefined, R = F ? F[S5] : undefined;
          if (A != null) {
            if (R !== A)
              (G = G || []).push(z, A);
          }
        } else if (z === F4) {
          if (typeof O === "string" || typeof O === "number")
            (G = G || []).push(z, "" + O);
        } else if (z === N5 || z === dQ)
          ;
        else if (j8.hasOwnProperty(z)) {
          if (O != null) {
            if (typeof O !== "function")
              v5(z, O);
            if (z === "onScroll")
              Y1("scroll", J);
          }
          if (!G && F !== O)
            G = [];
        } else
          (G = G || []).push(z, O);
      }
      if (U)
        gV(U, W[E4]), (G = G || []).push(E4, U);
      return G;
    }
    function HO(J, Q, Z, X, Y) {
      if (Z === "input" && Y.type === "radio" && Y.name != null)
        g(J, Y);
      var G = K4(Z, X), B = K4(Z, Y);
      switch (KO(J, Q, G, B), Z) {
        case "input":
          J0(J, Y);
          break;
        case "textarea":
          TW(J, Y);
          break;
        case "select":
          KV(J, Y);
          break;
      }
    }
    function OO(J) {
      {
        var Q = J.toLowerCase();
        if (!Z5.hasOwnProperty(Q))
          return null;
        return Z5[Q] || null;
      }
    }
    function jO(J, Q, Z, X, Y, G, B) {
      var W, z;
      switch (W = K4(Q, Z), x5(Q, Z), Q) {
        case "dialog":
          Y1("cancel", J), Y1("close", J);
          break;
        case "iframe":
        case "object":
        case "embed":
          Y1("load", J);
          break;
        case "video":
        case "audio":
          for (var q = 0;q < s7.length; q++)
            Y1(s7[q], J);
          break;
        case "source":
          Y1("error", J);
          break;
        case "img":
        case "image":
        case "link":
          Y1("error", J), Y1("load", J);
          break;
        case "details":
          Y1("toggle", J);
          break;
        case "input":
          w(J, Z), Y1("invalid", J);
          break;
        case "option":
          W1(J, Z);
          break;
        case "select":
          vW(J, Z), Y1("invalid", J);
          break;
        case "textarea":
          CW(J, Z), Y1("invalid", J);
          break;
      }
      NX(Q, Z);
      {
        z = new Set;
        var U = J.attributes;
        for (var j = 0;j < U.length; j++) {
          var O = U[j].name.toLowerCase();
          switch (O) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              z.add(U[j].name);
          }
        }
      }
      var F = null;
      for (var A in Z) {
        if (!Z.hasOwnProperty(A))
          continue;
        var R = Z[A];
        if (A === F4) {
          if (typeof R === "string") {
            if (J.textContent !== R) {
              if (Z[dQ] !== true)
                C5(J.textContent, R, G, B);
              F = [F4, R];
            }
          } else if (typeof R === "number") {
            if (J.textContent !== "" + R) {
              if (Z[dQ] !== true)
                C5(J.textContent, R, G, B);
              F = [F4, "" + R];
            }
          }
        } else if (j8.hasOwnProperty(A)) {
          if (R != null) {
            if (typeof R !== "function")
              v5(A, R);
            if (A === "onScroll")
              Y1("scroll", J);
          }
        } else if (B && true && typeof W === "boolean") {
          var u = undefined, o = W && L8 ? null : A8(A);
          if (Z[dQ] === true)
            ;
          else if (A === N5 || A === dQ || A === "value" || A === "checked" || A === "selected")
            ;
          else if (A === p7) {
            var a = J.innerHTML, P0 = R ? R[S5] : undefined;
            if (P0 != null) {
              var F0 = RK(J, P0);
              if (F0 !== a)
                a7(A, a, F0);
            }
          } else if (A === E4) {
            if (z.delete(A), EK) {
              var M = xV(R);
              if (u = J.getAttribute("style"), M !== u)
                a7(A, u, M);
            }
          } else if (W && !L8) {
            if (z.delete(A.toLowerCase()), u = l4(J, A, R), R !== u)
              a7(A, u, R);
          } else if (!q1(A, o, W) && !a0(A, R, o, W)) {
            var I = false;
            if (o !== null)
              z.delete(o.attributeName), u = i4(J, A, R, o);
            else {
              var D = X;
              if (D === JQ)
                D = RX(Q);
              if (D === JQ)
                z.delete(A.toLowerCase());
              else {
                var x = OO(A);
                if (x !== null && x !== A)
                  I = true, z.delete(x);
                z.delete(A);
              }
              u = l4(J, A, R);
            }
            var y = L8;
            if (!y && R !== u && !I)
              a7(A, u, R);
          }
        }
      }
      if (B) {
        if (z.size > 0 && Z[dQ] !== true)
          FK(z);
      }
      switch (Q) {
        case "input":
          CQ(J), p(J, Z, true);
          break;
        case "textarea":
          CQ(J), kW(J);
          break;
        case "select":
        case "option":
          break;
        default:
          if (typeof Z.onClick === "function")
            T5(J);
          break;
      }
      return F;
    }
    function MO(J, Q, Z) {
      var X = J.nodeValue !== Q;
      return X;
    }
    function uY(J, Q) {
      {
        if (v8)
          return;
        v8 = true, V("Did not expect server HTML to contain a <%s> in <%s>.", Q.nodeName.toLowerCase(), J.nodeName.toLowerCase());
      }
    }
    function dY(J, Q) {
      {
        if (v8)
          return;
        v8 = true, V('Did not expect server HTML to contain the text node "%s" in <%s>.', Q.nodeValue, J.nodeName.toLowerCase());
      }
    }
    function yY(J, Q, Z) {
      {
        if (v8)
          return;
        v8 = true, V("Expected server HTML to contain a matching <%s> in <%s>.", Q, J.nodeName.toLowerCase());
      }
    }
    function mY(J, Q) {
      {
        if (Q === "")
          return;
        if (v8)
          return;
        v8 = true, V('Expected server HTML to contain a matching text node for "%s" in <%s>.', Q, J.nodeName.toLowerCase());
      }
    }
    function DO(J, Q, Z) {
      switch (Q) {
        case "input":
          V0(J, Z);
          return;
        case "textarea":
          UV(J, Z);
          return;
        case "select":
          qV(J, Z);
          return;
      }
    }
    var r7 = function() {
    }, n7 = function() {
    };
    {
      var AO = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], IK = ["applet", "caption", "html", "table", "td", "th", "marquee", "object", "template", "foreignObject", "desc", "title"], PO = IK.concat(["button"]), FO = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], _K = { current: null, formTag: null, aTagInScope: null, buttonTagInScope: null, nobrTagInScope: null, pTagInButtonScope: null, listItemTagAutoclosing: null, dlItemTagAutoclosing: null };
      n7 = function(J, Q) {
        var Z = D0({}, J || _K), X = { tag: Q };
        if (IK.indexOf(Q) !== -1)
          Z.aTagInScope = null, Z.buttonTagInScope = null, Z.nobrTagInScope = null;
        if (PO.indexOf(Q) !== -1)
          Z.pTagInButtonScope = null;
        if (AO.indexOf(Q) !== -1 && Q !== "address" && Q !== "div" && Q !== "p")
          Z.listItemTagAutoclosing = null, Z.dlItemTagAutoclosing = null;
        if (Z.current = X, Q === "form")
          Z.formTag = X;
        if (Q === "a")
          Z.aTagInScope = X;
        if (Q === "button")
          Z.buttonTagInScope = X;
        if (Q === "nobr")
          Z.nobrTagInScope = X;
        if (Q === "p")
          Z.pTagInButtonScope = X;
        if (Q === "li")
          Z.listItemTagAutoclosing = X;
        if (Q === "dd" || Q === "dt")
          Z.dlItemTagAutoclosing = X;
        return Z;
      };
      var EO = function(J, Q) {
        switch (Q) {
          case "select":
            return J === "option" || J === "optgroup" || J === "#text";
          case "optgroup":
            return J === "option" || J === "#text";
          case "option":
            return J === "#text";
          case "tr":
            return J === "th" || J === "td" || J === "style" || J === "script" || J === "template";
          case "tbody":
          case "thead":
          case "tfoot":
            return J === "tr" || J === "style" || J === "script" || J === "template";
          case "colgroup":
            return J === "col" || J === "template";
          case "table":
            return J === "caption" || J === "colgroup" || J === "tbody" || J === "tfoot" || J === "thead" || J === "style" || J === "script" || J === "template";
          case "head":
            return J === "base" || J === "basefont" || J === "bgsound" || J === "link" || J === "meta" || J === "title" || J === "noscript" || J === "noframes" || J === "style" || J === "script" || J === "template";
          case "html":
            return J === "head" || J === "body" || J === "frameset";
          case "frameset":
            return J === "frame";
          case "#document":
            return J === "html";
        }
        switch (J) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return Q !== "h1" && Q !== "h2" && Q !== "h3" && Q !== "h4" && Q !== "h5" && Q !== "h6";
          case "rp":
          case "rt":
            return FO.indexOf(Q) === -1;
          case "body":
          case "caption":
          case "col":
          case "colgroup":
          case "frameset":
          case "frame":
          case "head":
          case "html":
          case "tbody":
          case "td":
          case "tfoot":
          case "th":
          case "thead":
          case "tr":
            return Q == null;
        }
        return true;
      }, RO = function(J, Q) {
        switch (J) {
          case "address":
          case "article":
          case "aside":
          case "blockquote":
          case "center":
          case "details":
          case "dialog":
          case "dir":
          case "div":
          case "dl":
          case "fieldset":
          case "figcaption":
          case "figure":
          case "footer":
          case "header":
          case "hgroup":
          case "main":
          case "menu":
          case "nav":
          case "ol":
          case "p":
          case "section":
          case "summary":
          case "ul":
          case "pre":
          case "listing":
          case "table":
          case "hr":
          case "xmp":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return Q.pTagInButtonScope;
          case "form":
            return Q.formTag || Q.pTagInButtonScope;
          case "li":
            return Q.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return Q.dlItemTagAutoclosing;
          case "button":
            return Q.buttonTagInScope;
          case "a":
            return Q.aTagInScope;
          case "nobr":
            return Q.nobrTagInScope;
        }
        return null;
      }, LK = {};
      r7 = function(J, Q, Z) {
        Z = Z || _K;
        var X = Z.current, Y = X && X.tag;
        if (Q != null) {
          if (J != null)
            V("validateDOMNesting: when childText is passed, childTag should be null");
          J = "#text";
        }
        var G = EO(J, Y) ? null : X, B = G ? null : RO(J, Z), W = G || B;
        if (!W)
          return;
        var z = W.tag, q = !!G + "|" + J + "|" + z;
        if (LK[q])
          return;
        LK[q] = true;
        var U = J, j = "";
        if (J === "#text")
          if (/\S/.test(Q))
            U = "Text nodes";
          else
            U = "Whitespace text nodes", j = " Make sure you don't have any extra whitespace between tags on each line of your source code.";
        else
          U = "<" + J + ">";
        if (G) {
          var O = "";
          if (z === "table" && J === "tr")
            O += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser.";
          V("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", U, z, j, O);
        } else
          V("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", U, z);
      };
    }
    var k5 = "suppressHydrationWarning", h5 = "$", b5 = "/$", o7 = "$?", t7 = "$!", wO = "style", cY = null, sY = null;
    function IO(J) {
      var Q, Z, X = J.nodeType;
      switch (X) {
        case ZQ:
        case IX: {
          Q = X === ZQ ? "#document" : "#fragment";
          var Y = J.documentElement;
          Z = Y ? Y.namespaceURI : wX(null, "");
          break;
        }
        default: {
          var G = X === M1 ? J.parentNode : J, B = G.namespaceURI || null;
          Q = G.tagName, Z = wX(B, Q);
          break;
        }
      }
      {
        var W = Q.toLowerCase(), z = n7(null, W);
        return { namespace: Z, ancestorInfo: z };
      }
    }
    function _O(J, Q, Z) {
      {
        var X = J, Y = wX(X.namespace, Q), G = n7(X.ancestorInfo, Q);
        return { namespace: Y, ancestorInfo: G };
      }
    }
    function iY(J) {
      return J;
    }
    function LO(J) {
      cY = w$(), sY = yH();
      var Q = null;
      return kz(false), Q;
    }
    function NO(J) {
      mH(sY), kz(cY), cY = null, sY = null;
    }
    function SO(J, Q, Z, X, Y) {
      var G;
      {
        var B = X;
        if (r7(J, null, B.ancestorInfo), typeof Q.children === "string" || typeof Q.children === "number") {
          var W = "" + Q.children, z = n7(B.ancestorInfo, J);
          r7(null, W, z);
        }
        G = B.namespace;
      }
      var q = qO(J, Q, Z, G);
      return Q9(Y, q), eY(q, Q), q;
    }
    function xO(J, Q) {
      J.appendChild(Q);
    }
    function vO(J, Q, Z, X, Y) {
      switch (VO(J, Q, Z, X), Q) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!Z.autoFocus;
        case "img":
          return true;
        default:
          return false;
      }
    }
    function gO(J, Q, Z, X, Y, G) {
      {
        var B = G;
        if (typeof X.children !== typeof Z.children && (typeof X.children === "string" || typeof X.children === "number")) {
          var W = "" + X.children, z = n7(B.ancestorInfo, Q);
          r7(null, W, z);
        }
      }
      return $O(J, Q, Z, X);
    }
    function lY(J, Q) {
      return J === "textarea" || J === "noscript" || typeof Q.children === "string" || typeof Q.children === "number" || typeof Q.dangerouslySetInnerHTML === "object" && Q.dangerouslySetInnerHTML !== null && Q.dangerouslySetInnerHTML.__html != null;
    }
    function CO(J, Q, Z, X) {
      {
        var Y = Z;
        r7(null, J, Y.ancestorInfo);
      }
      var G = UO(J, Q);
      return Q9(X, G), G;
    }
    function TO() {
      var J = window.event;
      if (J === undefined)
        return KQ;
      return hz(J.type);
    }
    var pY = typeof setTimeout === "function" ? setTimeout : undefined, kO = typeof clearTimeout === "function" ? clearTimeout : undefined, aY = -1, NK = typeof Promise === "function" ? Promise : undefined, hO = typeof queueMicrotask === "function" ? queueMicrotask : typeof NK !== "undefined" ? function(J) {
      return NK.resolve(null).then(J).catch(bO);
    } : pY;
    function bO(J) {
      setTimeout(function() {
        throw J;
      });
    }
    function fO(J, Q, Z, X) {
      switch (Q) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          if (Z.autoFocus)
            J.focus();
          return;
        case "img": {
          if (Z.src)
            J.src = Z.src;
          return;
        }
      }
    }
    function uO(J, Q, Z, X, Y, G) {
      HO(J, Q, Z, X, Y), eY(J, Y);
    }
    function SK(J) {
      Q5(J, "");
    }
    function dO(J, Q, Z) {
      J.nodeValue = Z;
    }
    function yO(J, Q) {
      J.appendChild(Q);
    }
    function mO(J, Q) {
      var Z;
      if (J.nodeType === M1)
        Z = J.parentNode, Z.insertBefore(Q, J);
      else
        Z = J, Z.appendChild(Q);
      var X = J._reactRootContainer;
      if ((X === null || X === undefined) && Z.onclick === null)
        T5(Z);
    }
    function cO(J, Q, Z) {
      J.insertBefore(Q, Z);
    }
    function sO(J, Q, Z) {
      if (J.nodeType === M1)
        J.parentNode.insertBefore(Q, Z);
      else
        J.insertBefore(Q, Z);
    }
    function iO(J, Q) {
      J.removeChild(Q);
    }
    function lO(J, Q) {
      if (J.nodeType === M1)
        J.parentNode.removeChild(Q);
      else
        J.removeChild(Q);
    }
    function rY(J, Q) {
      var Z = Q, X = 0;
      do {
        var Y = Z.nextSibling;
        if (J.removeChild(Z), Y && Y.nodeType === M1) {
          var G = Y.data;
          if (G === b5)
            if (X === 0) {
              J.removeChild(Y), T7(Q);
              return;
            } else
              X--;
          else if (G === h5 || G === o7 || G === t7)
            X++;
        }
        Z = Y;
      } while (Z);
      T7(Q);
    }
    function pO(J, Q) {
      if (J.nodeType === M1)
        rY(J.parentNode, Q);
      else if (J.nodeType === x8)
        rY(J, Q);
      T7(J);
    }
    function aO(J) {
      J = J;
      var Q = J.style;
      if (typeof Q.setProperty === "function")
        Q.setProperty("display", "none", "important");
      else
        Q.display = "none";
    }
    function rO(J) {
      J.nodeValue = "";
    }
    function nO(J, Q) {
      J = J;
      var Z = Q[wO], X = Z !== undefined && Z !== null && Z.hasOwnProperty("display") ? Z.display : null;
      J.style.display = _X("display", X);
    }
    function oO(J, Q) {
      J.nodeValue = Q;
    }
    function tO(J) {
      if (J.nodeType === x8)
        J.textContent = "";
      else if (J.nodeType === ZQ) {
        if (J.documentElement)
          J.removeChild(J.documentElement);
      }
    }
    function eO(J, Q, Z) {
      if (J.nodeType !== x8 || Q.toLowerCase() !== J.nodeName.toLowerCase())
        return null;
      return J;
    }
    function Jj(J, Q) {
      if (Q === "" || J.nodeType !== QQ)
        return null;
      return J;
    }
    function Qj(J) {
      if (J.nodeType !== M1)
        return null;
      return J;
    }
    function xK(J) {
      return J.data === o7;
    }
    function nY(J) {
      return J.data === t7;
    }
    function Zj(J) {
      var Q = J.nextSibling && J.nextSibling.dataset, Z, X, Y;
      if (Q)
        Z = Q.dgst, X = Q.msg, Y = Q.stck;
      return { message: X, digest: Z, stack: Y };
    }
    function Xj(J, Q) {
      J._reactRetry = Q;
    }
    function f5(J) {
      for (;J != null; J = J.nextSibling) {
        var Q = J.nodeType;
        if (Q === x8 || Q === QQ)
          break;
        if (Q === M1) {
          var Z = J.data;
          if (Z === h5 || Z === t7 || Z === o7)
            break;
          if (Z === b5)
            return null;
        }
      }
      return J;
    }
    function e7(J) {
      return f5(J.nextSibling);
    }
    function Yj(J) {
      return f5(J.firstChild);
    }
    function Gj(J) {
      return f5(J.firstChild);
    }
    function Bj(J) {
      return f5(J.nextSibling);
    }
    function Wj(J, Q, Z, X, Y, G, B) {
      Q9(G, J), eY(J, Z);
      var W;
      {
        var z = Y;
        W = z.namespace;
      }
      var q = (G.mode & I0) !== X0;
      return jO(J, Q, Z, W, X, q, B);
    }
    function zj(J, Q, Z, X) {
      Q9(Z, J);
      var Y = (Z.mode & I0) !== X0;
      return MO(J, Q);
    }
    function Kj(J, Q) {
      Q9(Q, J);
    }
    function qj(J) {
      var Q = J.nextSibling, Z = 0;
      while (Q) {
        if (Q.nodeType === M1) {
          var X = Q.data;
          if (X === b5)
            if (Z === 0)
              return e7(Q);
            else
              Z--;
          else if (X === h5 || X === t7 || X === o7)
            Z++;
        }
        Q = Q.nextSibling;
      }
      return null;
    }
    function vK(J) {
      var Q = J.previousSibling, Z = 0;
      while (Q) {
        if (Q.nodeType === M1) {
          var X = Q.data;
          if (X === h5 || X === t7 || X === o7)
            if (Z === 0)
              return Q;
            else
              Z--;
          else if (X === b5)
            Z++;
        }
        Q = Q.previousSibling;
      }
      return null;
    }
    function Uj(J) {
      T7(J);
    }
    function Vj(J) {
      T7(J);
    }
    function $j(J) {
      return J !== "head" && J !== "body";
    }
    function Hj(J, Q, Z, X) {
      var Y = true;
      C5(Q.nodeValue, Z, X, Y);
    }
    function Oj(J, Q, Z, X, Y, G) {
      if (Q[k5] !== true) {
        var B = true;
        C5(X.nodeValue, Y, G, B);
      }
    }
    function jj(J, Q) {
      if (Q.nodeType === x8)
        uY(J, Q);
      else if (Q.nodeType === M1)
        ;
      else
        dY(J, Q);
    }
    function Mj(J, Q) {
      {
        var Z = J.parentNode;
        if (Z !== null)
          if (Q.nodeType === x8)
            uY(Z, Q);
          else if (Q.nodeType === M1)
            ;
          else
            dY(Z, Q);
      }
    }
    function Dj(J, Q, Z, X, Y) {
      if (Y || Q[k5] !== true)
        if (X.nodeType === x8)
          uY(Z, X);
        else if (X.nodeType === M1)
          ;
        else
          dY(Z, X);
    }
    function Aj(J, Q, Z) {
      yY(J, Q);
    }
    function Pj(J, Q) {
      mY(J, Q);
    }
    function Fj(J, Q, Z) {
      {
        var X = J.parentNode;
        if (X !== null)
          yY(X, Q);
      }
    }
    function Ej(J, Q) {
      {
        var Z = J.parentNode;
        if (Z !== null)
          mY(Z, Q);
      }
    }
    function Rj(J, Q, Z, X, Y, G) {
      if (G || Q[k5] !== true)
        yY(Z, X);
    }
    function wj(J, Q, Z, X, Y) {
      if (Y || Q[k5] !== true)
        mY(Z, X);
    }
    function Ij(J) {
      V("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", J.nodeName.toLowerCase());
    }
    function _j(J) {
      i7(J);
    }
    var P6 = Math.random().toString(36).slice(2), F6 = "__reactFiber$" + P6, oY = "__reactProps$" + P6, J9 = "__reactContainer$" + P6, tY = "__reactEvents$" + P6, Lj = "__reactListeners$" + P6, Nj = "__reactHandles$" + P6;
    function Sj(J) {
      delete J[F6], delete J[oY], delete J[tY], delete J[Lj], delete J[Nj];
    }
    function Q9(J, Q) {
      Q[F6] = J;
    }
    function u5(J, Q) {
      Q[J9] = J;
    }
    function gK(J) {
      J[J9] = null;
    }
    function Z9(J) {
      return !!J[J9];
    }
    function R4(J) {
      var Q = J[F6];
      if (Q)
        return Q;
      var Z = J.parentNode;
      while (Z) {
        if (Q = Z[J9] || Z[F6], Q) {
          var X = Q.alternate;
          if (Q.child !== null || X !== null && X.child !== null) {
            var Y = vK(J);
            while (Y !== null) {
              var G = Y[F6];
              if (G)
                return G;
              Y = vK(Y);
            }
          }
          return Q;
        }
        J = Z, Z = J.parentNode;
      }
      return null;
    }
    function yQ(J) {
      var Q = J[F6] || J[J9];
      if (Q)
        if (Q.tag === c || Q.tag === w0 || Q.tag === A0 || Q.tag === T)
          return Q;
        else
          return null;
      return null;
    }
    function E6(J) {
      if (J.tag === c || J.tag === w0)
        return J.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function d5(J) {
      return J[oY] || null;
    }
    function eY(J, Q) {
      J[oY] = Q;
    }
    function xj(J) {
      var Q = J[tY];
      if (Q === undefined)
        Q = J[tY] = new Set;
      return Q;
    }
    var CK = {}, TK = v.ReactDebugCurrentFrame;
    function y5(J) {
      if (J) {
        var Q = J._owner, Z = a4(J.type, J._source, Q ? Q.type : null);
        TK.setExtraStackFrame(Z);
      } else
        TK.setExtraStackFrame(null);
    }
    function PJ(J, Q, Z, X, Y) {
      {
        var G = Function.call.bind(s1);
        for (var B in J)
          if (G(J, B)) {
            var W = undefined;
            try {
              if (typeof J[B] !== "function") {
                var z = Error((X || "React class") + ": " + Z + " type `" + B + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof J[B] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw z.name = "Invariant Violation", z;
              }
              W = J[B](Q, B, X, Z, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (q) {
              W = q;
            }
            if (W && !(W instanceof Error))
              y5(Y), V("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", X || "React class", Z, B, typeof W), y5(null);
            if (W instanceof Error && !(W.message in CK))
              CK[W.message] = true, y5(Y), V("Failed %s type: %s", Z, W.message), y5(null);
          }
      }
    }
    var JG = [], m5;
    m5 = [];
    var qQ = -1;
    function mQ(J) {
      return { current: J };
    }
    function q8(J, Q) {
      if (qQ < 0) {
        V("Unexpected pop.");
        return;
      }
      if (Q !== m5[qQ])
        V("Unexpected Fiber popped.");
      J.current = JG[qQ], JG[qQ] = null, m5[qQ] = null, qQ--;
    }
    function U8(J, Q, Z) {
      qQ++, JG[qQ] = J.current, m5[qQ] = Z, J.current = Q;
    }
    var kK = {}, i8 = {};
    Object.freeze(i8);
    var UQ = mQ(i8), uJ = mQ(false), QG = i8;
    function R6(J, Q, Z) {
      {
        if (Z && dJ(Q))
          return QG;
        return UQ.current;
      }
    }
    function hK(J, Q, Z) {
      {
        var X = J.stateNode;
        X.__reactInternalMemoizedUnmaskedChildContext = Q, X.__reactInternalMemoizedMaskedChildContext = Z;
      }
    }
    function w6(J, Q) {
      {
        var Z = J.type, X = Z.contextTypes;
        if (!X)
          return i8;
        var Y = J.stateNode;
        if (Y && Y.__reactInternalMemoizedUnmaskedChildContext === Q)
          return Y.__reactInternalMemoizedMaskedChildContext;
        var G = {};
        for (var B in X)
          G[B] = Q[B];
        {
          var W = H0(J) || "Unknown";
          PJ(X, G, "context", W);
        }
        if (Y)
          hK(J, Q, G);
        return G;
      }
    }
    function c5() {
      return uJ.current;
    }
    function dJ(J) {
      {
        var Q = J.childContextTypes;
        return Q !== null && Q !== undefined;
      }
    }
    function s5(J) {
      q8(uJ, J), q8(UQ, J);
    }
    function ZG(J) {
      q8(uJ, J), q8(UQ, J);
    }
    function bK(J, Q, Z) {
      {
        if (UQ.current !== i8)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        U8(UQ, Q, J), U8(uJ, Z, J);
      }
    }
    function fK(J, Q, Z) {
      {
        var X = J.stateNode, Y = Q.childContextTypes;
        if (typeof X.getChildContext !== "function") {
          {
            var G = H0(J) || "Unknown";
            if (!kK[G])
              kK[G] = true, V("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", G, G);
          }
          return Z;
        }
        var B = X.getChildContext();
        for (var W in B)
          if (!(W in Y))
            throw new Error((H0(J) || "Unknown") + ".getChildContext(): key \"" + W + "\" is not defined in childContextTypes.");
        {
          var z = H0(J) || "Unknown";
          PJ(Y, B, "child context", z);
        }
        return D0({}, Z, B);
      }
    }
    function i5(J) {
      {
        var Q = J.stateNode, Z = Q && Q.__reactInternalMemoizedMergedChildContext || i8;
        return QG = UQ.current, U8(UQ, Z, J), U8(uJ, uJ.current, J), true;
      }
    }
    function uK(J, Q, Z) {
      {
        var X = J.stateNode;
        if (!X)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (Z) {
          var Y = fK(J, Q, QG);
          X.__reactInternalMemoizedMergedChildContext = Y, q8(uJ, J), q8(UQ, J), U8(UQ, Y, J), U8(uJ, Z, J);
        } else
          q8(uJ, J), U8(uJ, Z, J);
      }
    }
    function vj(J) {
      {
        if (!$2(J) || J.tag !== i)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var Q = J;
        do {
          switch (Q.tag) {
            case T:
              return Q.stateNode.context;
            case i: {
              var Z = Q.type;
              if (dJ(Z))
                return Q.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          Q = Q.return;
        } while (Q !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var cQ = 0, l5 = 1, VQ = null, XG = false, YG = false;
    function dK(J) {
      if (VQ === null)
        VQ = [J];
      else
        VQ.push(J);
    }
    function gj(J) {
      XG = true, dK(J);
    }
    function yK() {
      if (XG)
        sQ();
    }
    function sQ() {
      if (!YG && VQ !== null) {
        YG = true;
        var J = 0, Q = AJ();
        try {
          var Z = true, X = VQ;
          y1(m8);
          for (;J < X.length; J++) {
            var Y = X[J];
            do
              Y = Y(Z);
            while (Y !== null);
          }
          VQ = null, XG = false;
        } catch (G) {
          if (VQ !== null)
            VQ = VQ.slice(J + 1);
          throw qz(W5, sQ), G;
        } finally {
          y1(Q), YG = false;
        }
      }
      return null;
    }
    var I6 = [], _6 = 0, p5 = null, a5 = 0, YJ = [], GJ = 0, w4 = null, $Q = 1, HQ = "";
    function Cj(J) {
      return _4(), (J.flags & Zz) !== Z0;
    }
    function Tj(J) {
      return _4(), a5;
    }
    function kj() {
      var J = HQ, Q = $Q, Z = Q & ~hj(Q);
      return Z.toString(32) + J;
    }
    function I4(J, Q) {
      _4(), I6[_6++] = a5, I6[_6++] = p5, p5 = J, a5 = Q;
    }
    function mK(J, Q, Z) {
      _4(), YJ[GJ++] = $Q, YJ[GJ++] = HQ, YJ[GJ++] = w4, w4 = J;
      var X = $Q, Y = HQ, G = r5(X) - 1, B = X & ~(1 << G), W = Z + 1, z = r5(Q) + G;
      if (z > 30) {
        var q = G - G % 5, U = (1 << q) - 1, j = (B & U).toString(32), O = B >> q, F = G - q, A = r5(Q) + F, R = W << F, u = R | O, o = j + Y;
        $Q = 1 << A | u, HQ = o;
      } else {
        var a = W << G, P0 = a | B, F0 = Y;
        $Q = 1 << z | P0, HQ = F0;
      }
    }
    function GG(J) {
      _4();
      var Q = J.return;
      if (Q !== null) {
        var Z = 1, X = 0;
        I4(J, Z), mK(J, Z, X);
      }
    }
    function r5(J) {
      return 32 - jz(J);
    }
    function hj(J) {
      return 1 << r5(J) - 1;
    }
    function BG(J) {
      while (J === p5)
        p5 = I6[--_6], I6[_6] = null, a5 = I6[--_6], I6[_6] = null;
      while (J === w4)
        w4 = YJ[--GJ], YJ[GJ] = null, HQ = YJ[--GJ], YJ[GJ] = null, $Q = YJ[--GJ], YJ[GJ] = null;
    }
    function bj() {
      if (_4(), w4 !== null)
        return { id: $Q, overflow: HQ };
      else
        return null;
    }
    function fj(J, Q) {
      _4(), YJ[GJ++] = $Q, YJ[GJ++] = HQ, YJ[GJ++] = w4, $Q = Q.id, HQ = Q.overflow, w4 = J;
    }
    function _4() {
      if (!r1())
        V("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var a1 = null, BJ = null, FJ = false, L4 = false, iQ = null;
    function uj() {
      if (FJ)
        V("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function cK() {
      L4 = true;
    }
    function dj() {
      return L4;
    }
    function yj(J) {
      var Q = J.stateNode.containerInfo;
      return BJ = Gj(Q), a1 = J, FJ = true, iQ = null, L4 = false, true;
    }
    function mj(J, Q, Z) {
      if (BJ = Bj(Q), a1 = J, FJ = true, iQ = null, L4 = false, Z !== null)
        fj(J, Z);
      return true;
    }
    function sK(J, Q) {
      switch (J.tag) {
        case T: {
          jj(J.stateNode.containerInfo, Q);
          break;
        }
        case c: {
          var Z = (J.mode & I0) !== X0;
          Dj(J.type, J.memoizedProps, J.stateNode, Q, Z);
          break;
        }
        case A0: {
          var X = J.memoizedState;
          if (X.dehydrated !== null)
            Mj(X.dehydrated, Q);
          break;
        }
      }
    }
    function iK(J, Q) {
      sK(J, Q);
      var Z = rA();
      Z.stateNode = Q, Z.return = J;
      var X = J.deletions;
      if (X === null)
        J.deletions = [Z], J.flags |= q4;
      else
        X.push(Z);
    }
    function WG(J, Q) {
      {
        if (L4)
          return;
        switch (J.tag) {
          case T: {
            var Z = J.stateNode.containerInfo;
            switch (Q.tag) {
              case c:
                var { type: X, pendingProps: Y } = Q;
                Aj(Z, X);
                break;
              case w0:
                var G = Q.pendingProps;
                Pj(Z, G);
                break;
            }
            break;
          }
          case c: {
            var { type: B, memoizedProps: W, stateNode: z } = J;
            switch (Q.tag) {
              case c: {
                var { type: q, pendingProps: U } = Q, j = (J.mode & I0) !== X0;
                Rj(B, W, z, q, U, j);
                break;
              }
              case w0: {
                var O = Q.pendingProps, F = (J.mode & I0) !== X0;
                wj(B, W, z, O, F);
                break;
              }
            }
            break;
          }
          case A0: {
            var A = J.memoizedState, R = A.dehydrated;
            if (R !== null)
              switch (Q.tag) {
                case c:
                  var { type: u, pendingProps: o } = Q;
                  Fj(R, u);
                  break;
                case w0:
                  var a = Q.pendingProps;
                  Ej(R, a);
                  break;
              }
            break;
          }
          default:
            return;
        }
      }
    }
    function lK(J, Q) {
      Q.flags = Q.flags & ~YQ | D1, WG(J, Q);
    }
    function pK(J, Q) {
      switch (J.tag) {
        case c: {
          var { type: Z, pendingProps: X } = J, Y = eO(Q, Z);
          if (Y !== null)
            return J.stateNode = Y, a1 = J, BJ = Yj(Y), true;
          return false;
        }
        case w0: {
          var G = J.pendingProps, B = Jj(Q, G);
          if (B !== null)
            return J.stateNode = B, a1 = J, BJ = null, true;
          return false;
        }
        case A0: {
          var W = Qj(Q);
          if (W !== null) {
            var z = { dehydrated: W, treeContext: bj(), retryLane: d8 };
            J.memoizedState = z;
            var q = nA(W);
            return q.return = J, J.child = q, a1 = J, BJ = null, true;
          }
          return false;
        }
        default:
          return false;
      }
    }
    function zG(J) {
      return (J.mode & I0) !== X0 && (J.flags & k0) === Z0;
    }
    function KG(J) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function qG(J) {
      if (!FJ)
        return;
      var Q = BJ;
      if (!Q) {
        if (zG(J))
          WG(a1, J), KG();
        lK(a1, J), FJ = false, a1 = J;
        return;
      }
      var Z = Q;
      if (!pK(J, Q)) {
        if (zG(J))
          WG(a1, J), KG();
        Q = e7(Z);
        var X = a1;
        if (!Q || !pK(J, Q)) {
          lK(a1, J), FJ = false, a1 = J;
          return;
        }
        iK(X, Z);
      }
    }
    function cj(J, Q, Z) {
      var X = J.stateNode, Y = !L4, G = Wj(X, J.type, J.memoizedProps, Q, Z, J, Y);
      if (J.updateQueue = G, G !== null)
        return true;
      return false;
    }
    function sj(J) {
      var { stateNode: Q, memoizedProps: Z } = J, X = zj(Q, Z, J);
      if (X) {
        var Y = a1;
        if (Y !== null)
          switch (Y.tag) {
            case T: {
              var G = Y.stateNode.containerInfo, B = (Y.mode & I0) !== X0;
              Hj(G, Q, Z, B);
              break;
            }
            case c: {
              var { type: W, memoizedProps: z, stateNode: q } = Y, U = (Y.mode & I0) !== X0;
              Oj(W, z, q, Q, Z, U);
              break;
            }
          }
      }
      return X;
    }
    function ij(J) {
      var Q = J.memoizedState, Z = Q !== null ? Q.dehydrated : null;
      if (!Z)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      Kj(Z, J);
    }
    function lj(J) {
      var Q = J.memoizedState, Z = Q !== null ? Q.dehydrated : null;
      if (!Z)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return qj(Z);
    }
    function aK(J) {
      var Q = J.return;
      while (Q !== null && Q.tag !== c && Q.tag !== T && Q.tag !== A0)
        Q = Q.return;
      a1 = Q;
    }
    function n5(J) {
      if (J !== a1)
        return false;
      if (!FJ)
        return aK(J), FJ = true, false;
      if (J.tag !== T && (J.tag !== c || $j(J.type) && !lY(J.type, J.memoizedProps))) {
        var Q = BJ;
        if (Q)
          if (zG(J))
            rK(J), KG();
          else
            while (Q)
              iK(J, Q), Q = e7(Q);
      }
      if (aK(J), J.tag === A0)
        BJ = lj(J);
      else
        BJ = a1 ? e7(J.stateNode) : null;
      return true;
    }
    function pj() {
      return FJ && BJ !== null;
    }
    function rK(J) {
      var Q = BJ;
      while (Q)
        sK(J, Q), Q = e7(Q);
    }
    function L6() {
      a1 = null, BJ = null, FJ = false, L4 = false;
    }
    function nK() {
      if (iQ !== null)
        iq(iQ), iQ = null;
    }
    function r1() {
      return FJ;
    }
    function UG(J) {
      if (iQ === null)
        iQ = [J];
      else
        iQ.push(J);
    }
    var aj = v.ReactCurrentBatchConfig, rj = null;
    function nj() {
      return aj.transition;
    }
    var EJ = { recordUnsafeLifecycleWarnings: function(J, Q) {
    }, flushPendingUnsafeLifecycleWarnings: function() {
    }, recordLegacyContextWarning: function(J, Q) {
    }, flushLegacyContextWarning: function() {
    }, discardPendingWarnings: function() {
    } };
    {
      var oj = function(J) {
        var Q = null, Z = J;
        while (Z !== null) {
          if (Z.mode & A1)
            Q = Z;
          Z = Z.return;
        }
        return Q;
      }, N4 = function(J) {
        var Q = [];
        return J.forEach(function(Z) {
          Q.push(Z);
        }), Q.sort().join(", ");
      }, X9 = [], Y9 = [], G9 = [], B9 = [], W9 = [], z9 = [], S4 = new Set;
      EJ.recordUnsafeLifecycleWarnings = function(J, Q) {
        if (S4.has(J.type))
          return;
        if (typeof Q.componentWillMount === "function" && Q.componentWillMount.__suppressDeprecationWarning !== true)
          X9.push(J);
        if (J.mode & A1 && typeof Q.UNSAFE_componentWillMount === "function")
          Y9.push(J);
        if (typeof Q.componentWillReceiveProps === "function" && Q.componentWillReceiveProps.__suppressDeprecationWarning !== true)
          G9.push(J);
        if (J.mode & A1 && typeof Q.UNSAFE_componentWillReceiveProps === "function")
          B9.push(J);
        if (typeof Q.componentWillUpdate === "function" && Q.componentWillUpdate.__suppressDeprecationWarning !== true)
          W9.push(J);
        if (J.mode & A1 && typeof Q.UNSAFE_componentWillUpdate === "function")
          z9.push(J);
      }, EJ.flushPendingUnsafeLifecycleWarnings = function() {
        var J = new Set;
        if (X9.length > 0)
          X9.forEach(function(O) {
            J.add(H0(O) || "Component"), S4.add(O.type);
          }), X9 = [];
        var Q = new Set;
        if (Y9.length > 0)
          Y9.forEach(function(O) {
            Q.add(H0(O) || "Component"), S4.add(O.type);
          }), Y9 = [];
        var Z = new Set;
        if (G9.length > 0)
          G9.forEach(function(O) {
            Z.add(H0(O) || "Component"), S4.add(O.type);
          }), G9 = [];
        var X = new Set;
        if (B9.length > 0)
          B9.forEach(function(O) {
            X.add(H0(O) || "Component"), S4.add(O.type);
          }), B9 = [];
        var Y = new Set;
        if (W9.length > 0)
          W9.forEach(function(O) {
            Y.add(H0(O) || "Component"), S4.add(O.type);
          }), W9 = [];
        var G = new Set;
        if (z9.length > 0)
          z9.forEach(function(O) {
            G.add(H0(O) || "Component"), S4.add(O.type);
          }), z9 = [];
        if (Q.size > 0) {
          var B = N4(Q);
          V("Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n\nPlease update the following components: %s", B);
        }
        if (X.size > 0) {
          var W = N4(X);
          V("Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state\n\nPlease update the following components: %s", W);
        }
        if (G.size > 0) {
          var z = N4(G);
          V("Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n\nPlease update the following components: %s", z);
        }
        if (J.size > 0) {
          var q = N4(J);
          r("componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", q);
        }
        if (Z.size > 0) {
          var U = N4(Z);
          r("componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state\n* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", U);
        }
        if (Y.size > 0) {
          var j = N4(Y);
          r("componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", j);
        }
      };
      var o5 = new Map, oK = new Set;
      EJ.recordLegacyContextWarning = function(J, Q) {
        var Z = oj(J);
        if (Z === null) {
          V("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (oK.has(J.type))
          return;
        var X = o5.get(Z);
        if (J.type.contextTypes != null || J.type.childContextTypes != null || Q !== null && typeof Q.getChildContext === "function") {
          if (X === undefined)
            X = [], o5.set(Z, X);
          X.push(J);
        }
      }, EJ.flushLegacyContextWarning = function() {
        o5.forEach(function(J, Q) {
          if (J.length === 0)
            return;
          var Z = J[0], X = new Set;
          J.forEach(function(G) {
            X.add(H0(G) || "Component"), oK.add(G.type);
          });
          var Y = N4(X);
          try {
            B1(Z), V("Legacy context API has been detected within a strict-mode tree.\n\nThe old API will be supported in all 16.x releases, but applications using it should migrate to the new version.\n\nPlease update the following components: %s\n\nLearn more about this warning here: https://reactjs.org/link/legacy-context", Y);
          } finally {
            b1();
          }
        });
      }, EJ.discardPendingWarnings = function() {
        X9 = [], Y9 = [], G9 = [], B9 = [], W9 = [], z9 = [], o5 = new Map;
      };
    }
    function RJ(J, Q) {
      if (J && J.defaultProps) {
        var Z = D0({}, Q), X = J.defaultProps;
        for (var Y in X)
          if (Z[Y] === undefined)
            Z[Y] = X[Y];
        return Z;
      }
      return Q;
    }
    var VG = mQ(null), $G;
    $G = {};
    var t5 = null, N6 = null, HG = null, e5 = false;
    function JZ() {
      t5 = null, N6 = null, HG = null, e5 = false;
    }
    function tK() {
      e5 = true;
    }
    function eK() {
      e5 = false;
    }
    function J3(J, Q, Z) {
      {
        U8(VG, Q._currentValue, J), Q._currentValue = Z;
        {
          if (Q._currentRenderer !== undefined && Q._currentRenderer !== null && Q._currentRenderer !== $G)
            V("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
          Q._currentRenderer = $G;
        }
      }
    }
    function OG(J, Q) {
      var Z = VG.current;
      q8(VG, Q), J._currentValue = Z;
    }
    function jG(J, Q, Z) {
      var X = J;
      while (X !== null) {
        var Y = X.alternate;
        if (!$6(X.childLanes, Q)) {
          if (X.childLanes = M0(X.childLanes, Q), Y !== null)
            Y.childLanes = M0(Y.childLanes, Q);
        } else if (Y !== null && !$6(Y.childLanes, Q))
          Y.childLanes = M0(Y.childLanes, Q);
        if (X === Z)
          break;
        X = X.return;
      }
      if (X !== Z)
        V("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function tj(J, Q, Z) {
      ej(J, Q, Z);
    }
    function ej(J, Q, Z) {
      var X = J.child;
      if (X !== null)
        X.return = J;
      while (X !== null) {
        var Y = undefined, G = X.dependencies;
        if (G !== null) {
          Y = X.child;
          var B = G.firstContext;
          while (B !== null) {
            if (B.context === Q) {
              if (X.tag === i) {
                var W = L7(Z), z = OQ(Z1, W);
                z.tag = ZZ;
                var q = X.updateQueue;
                if (q === null)
                  ;
                else {
                  var U = q.shared, j = U.pending;
                  if (j === null)
                    z.next = z;
                  else
                    z.next = j.next, j.next = z;
                  U.pending = z;
                }
              }
              X.lanes = M0(X.lanes, Z);
              var O = X.alternate;
              if (O !== null)
                O.lanes = M0(O.lanes, Z);
              jG(X.return, Z, J), G.lanes = M0(G.lanes, Z);
              break;
            }
            B = B.next;
          }
        } else if (X.tag === N0)
          Y = X.type === J.type ? null : X.child;
        else if (X.tag === k1) {
          var F = X.return;
          if (F === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          F.lanes = M0(F.lanes, Z);
          var A = F.alternate;
          if (A !== null)
            A.lanes = M0(A.lanes, Z);
          jG(F, Z, J), Y = X.sibling;
        } else
          Y = X.child;
        if (Y !== null)
          Y.return = X;
        else {
          Y = X;
          while (Y !== null) {
            if (Y === J) {
              Y = null;
              break;
            }
            var R = Y.sibling;
            if (R !== null) {
              R.return = Y.return, Y = R;
              break;
            }
            Y = Y.return;
          }
        }
        X = Y;
      }
    }
    function S6(J, Q) {
      t5 = J, N6 = null, HG = null;
      var Z = J.dependencies;
      if (Z !== null) {
        var X = Z.firstContext;
        if (X !== null) {
          if (y8(Z.lanes, Q))
            E9();
          Z.firstContext = null;
        }
      }
    }
    function P1(J) {
      if (e5)
        V("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var Q = J._currentValue;
      if (HG === J)
        ;
      else {
        var Z = { context: J, memoizedValue: Q, next: null };
        if (N6 === null) {
          if (t5 === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          N6 = Z, t5.dependencies = { lanes: N, firstContext: Z };
        } else
          N6 = N6.next = Z;
      }
      return Q;
    }
    var x4 = null;
    function MG(J) {
      if (x4 === null)
        x4 = [J];
      else
        x4.push(J);
    }
    function JM() {
      if (x4 !== null) {
        for (var J = 0;J < x4.length; J++) {
          var Q = x4[J], Z = Q.interleaved;
          if (Z !== null) {
            Q.interleaved = null;
            var X = Z.next, Y = Q.pending;
            if (Y !== null) {
              var G = Y.next;
              Y.next = X, Z.next = G;
            }
            Q.pending = Z;
          }
        }
        x4 = null;
      }
    }
    function Q3(J, Q, Z, X) {
      var Y = Q.interleaved;
      if (Y === null)
        Z.next = Z, MG(Q);
      else
        Z.next = Y.next, Y.next = Z;
      return Q.interleaved = Z, QZ(J, X);
    }
    function QM(J, Q, Z, X) {
      var Y = Q.interleaved;
      if (Y === null)
        Z.next = Z, MG(Q);
      else
        Z.next = Y.next, Y.next = Z;
      Q.interleaved = Z;
    }
    function ZM(J, Q, Z, X) {
      var Y = Q.interleaved;
      if (Y === null)
        Z.next = Z, MG(Q);
      else
        Z.next = Y.next, Y.next = Z;
      return Q.interleaved = Z, QZ(J, X);
    }
    function g8(J, Q) {
      return QZ(J, Q);
    }
    var XM = QZ;
    function QZ(J, Q) {
      J.lanes = M0(J.lanes, Q);
      var Z = J.alternate;
      if (Z !== null)
        Z.lanes = M0(Z.lanes, Q);
      if (Z === null && (J.flags & (D1 | YQ)) !== Z0)
        XU(J);
      var X = J, Y = J.return;
      while (Y !== null) {
        if (Y.childLanes = M0(Y.childLanes, Q), Z = Y.alternate, Z !== null)
          Z.childLanes = M0(Z.childLanes, Q);
        else if ((Y.flags & (D1 | YQ)) !== Z0)
          XU(J);
        X = Y, Y = Y.return;
      }
      if (X.tag === T) {
        var G = X.stateNode;
        return G;
      } else
        return null;
    }
    var Z3 = 0, X3 = 1, ZZ = 2, DG = 3, XZ = false, AG, YZ;
    AG = false, YZ = null;
    function PG(J) {
      var Q = { baseState: J.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: N }, effects: null };
      J.updateQueue = Q;
    }
    function Y3(J, Q) {
      var Z = Q.updateQueue, X = J.updateQueue;
      if (Z === X) {
        var Y = { baseState: X.baseState, firstBaseUpdate: X.firstBaseUpdate, lastBaseUpdate: X.lastBaseUpdate, shared: X.shared, effects: X.effects };
        Q.updateQueue = Y;
      }
    }
    function OQ(J, Q) {
      var Z = { eventTime: J, lane: Q, tag: Z3, payload: null, callback: null, next: null };
      return Z;
    }
    function lQ(J, Q, Z) {
      var X = J.updateQueue;
      if (X === null)
        return null;
      var Y = X.shared;
      if (YZ === Y && !AG)
        V("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), AG = true;
      if (WA()) {
        var G = Y.pending;
        if (G === null)
          Q.next = Q;
        else
          Q.next = G.next, G.next = Q;
        return Y.pending = Q, XM(J, Z);
      } else
        return ZM(J, Y, Q, Z);
    }
    function GZ(J, Q, Z) {
      var X = Q.updateQueue;
      if (X === null)
        return;
      var Y = X.shared;
      if (Pz(Z)) {
        var G = Y.lanes;
        G = Ez(G, J.pendingLanes);
        var B = M0(G, Z);
        Y.lanes = B, MY(J, B);
      }
    }
    function FG(J, Q) {
      var { updateQueue: Z, alternate: X } = J;
      if (X !== null) {
        var Y = X.updateQueue;
        if (Z === Y) {
          var G = null, B = null, W = Z.firstBaseUpdate;
          if (W !== null) {
            var z = W;
            do {
              var q = { eventTime: z.eventTime, lane: z.lane, tag: z.tag, payload: z.payload, callback: z.callback, next: null };
              if (B === null)
                G = B = q;
              else
                B.next = q, B = q;
              z = z.next;
            } while (z !== null);
            if (B === null)
              G = B = Q;
            else
              B.next = Q, B = Q;
          } else
            G = B = Q;
          Z = { baseState: Y.baseState, firstBaseUpdate: G, lastBaseUpdate: B, shared: Y.shared, effects: Y.effects }, J.updateQueue = Z;
          return;
        }
      }
      var U = Z.lastBaseUpdate;
      if (U === null)
        Z.firstBaseUpdate = Q;
      else
        U.next = Q;
      Z.lastBaseUpdate = Q;
    }
    function YM(J, Q, Z, X, Y, G) {
      switch (Z.tag) {
        case X3: {
          var B = Z.payload;
          if (typeof B === "function") {
            tK();
            var W = B.call(G, X, Y);
            {
              if (J.mode & A1) {
                u1(true);
                try {
                  B.call(G, X, Y);
                } finally {
                  u1(false);
                }
              }
              eK();
            }
            return W;
          }
          return B;
        }
        case DG:
          J.flags = J.flags & ~F8 | k0;
        case Z3: {
          var z = Z.payload, q;
          if (typeof z === "function") {
            tK(), q = z.call(G, X, Y);
            {
              if (J.mode & A1) {
                u1(true);
                try {
                  z.call(G, X, Y);
                } finally {
                  u1(false);
                }
              }
              eK();
            }
          } else
            q = z;
          if (q === null || q === undefined)
            return X;
          return D0({}, X, q);
        }
        case ZZ:
          return XZ = true, X;
      }
      return X;
    }
    function BZ(J, Q, Z, X) {
      var Y = J.updateQueue;
      XZ = false, YZ = Y.shared;
      var { firstBaseUpdate: G, lastBaseUpdate: B } = Y, W = Y.shared.pending;
      if (W !== null) {
        Y.shared.pending = null;
        var z = W, q = z.next;
        if (z.next = null, B === null)
          G = q;
        else
          B.next = q;
        B = z;
        var U = J.alternate;
        if (U !== null) {
          var j = U.updateQueue, O = j.lastBaseUpdate;
          if (O !== B) {
            if (O === null)
              j.firstBaseUpdate = q;
            else
              O.next = q;
            j.lastBaseUpdate = z;
          }
        }
      }
      if (G !== null) {
        var F = Y.baseState, A = N, R = null, u = null, o = null, a = G;
        do {
          var { lane: P0, eventTime: F0 } = a;
          if (!$6(X, P0)) {
            var M = { eventTime: F0, lane: P0, tag: a.tag, payload: a.payload, callback: a.callback, next: null };
            if (o === null)
              u = o = M, R = F;
            else
              o = o.next = M;
            A = M0(A, P0);
          } else {
            if (o !== null) {
              var I = { eventTime: F0, lane: d1, tag: a.tag, payload: a.payload, callback: a.callback, next: null };
              o = o.next = I;
            }
            F = YM(J, Y, a, F, Q, Z);
            var D = a.callback;
            if (D !== null && a.lane !== d1) {
              J.flags |= fX;
              var x = Y.effects;
              if (x === null)
                Y.effects = [a];
              else
                x.push(a);
            }
          }
          if (a = a.next, a === null)
            if (W = Y.shared.pending, W === null)
              break;
            else {
              var y = W, b = y.next;
              y.next = null, a = b, Y.lastBaseUpdate = y, Y.shared.pending = null;
            }
        } while (true);
        if (o === null)
          R = F;
        Y.baseState = R, Y.firstBaseUpdate = u, Y.lastBaseUpdate = o;
        var B0 = Y.shared.interleaved;
        if (B0 !== null) {
          var U0 = B0;
          do
            A = M0(A, U0.lane), U0 = U0.next;
          while (U0 !== B0);
        } else if (G === null)
          Y.shared.lanes = N;
        T9(A), J.lanes = A, J.memoizedState = F;
      }
      YZ = null;
    }
    function GM(J, Q) {
      if (typeof J !== "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + J));
      J.call(Q);
    }
    function G3() {
      XZ = false;
    }
    function WZ() {
      return XZ;
    }
    function B3(J, Q, Z) {
      var X = Q.effects;
      if (Q.effects = null, X !== null)
        for (var Y = 0;Y < X.length; Y++) {
          var G = X[Y], B = G.callback;
          if (B !== null)
            G.callback = null, GM(B, Z);
        }
    }
    var EG = {}, W3 = new E.Component().refs, RG, wG, IG, _G, LG, z3, zZ, NG, SG, xG;
    {
      RG = new Set, wG = new Set, IG = new Set, _G = new Set, NG = new Set, LG = new Set, SG = new Set, xG = new Set;
      var K3 = new Set;
      zZ = function(J, Q) {
        if (J === null || typeof J === "function")
          return;
        var Z = Q + "_" + J;
        if (!K3.has(Z))
          K3.add(Z), V("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", Q, J);
      }, z3 = function(J, Q) {
        if (Q === undefined) {
          var Z = s0(J) || "Component";
          if (!LG.has(Z))
            LG.add(Z), V("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", Z);
        }
      }, Object.defineProperty(EG, "_processChildContext", { enumerable: false, value: function() {
        throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
      } }), Object.freeze(EG);
    }
    function vG(J, Q, Z, X) {
      var Y = J.memoizedState, G = Z(X, Y);
      {
        if (J.mode & A1) {
          u1(true);
          try {
            G = Z(X, Y);
          } finally {
            u1(false);
          }
        }
        z3(Q, G);
      }
      var B = G === null || G === undefined ? Y : D0({}, Y, G);
      if (J.memoizedState = B, J.lanes === N) {
        var W = J.updateQueue;
        W.baseState = B;
      }
    }
    var gG = { isMounted: H2, enqueueSetState: function(J, Q, Z) {
      var X = B6(J), Y = w8(), G = J4(X), B = OQ(Y, G);
      if (B.payload = Q, Z !== undefined && Z !== null)
        zZ(Z, "setState"), B.callback = Z;
      var W = lQ(X, B, G);
      if (W !== null)
        C1(W, X, G, Y), GZ(W, X, G);
      lX(X, G);
    }, enqueueReplaceState: function(J, Q, Z) {
      var X = B6(J), Y = w8(), G = J4(X), B = OQ(Y, G);
      if (B.tag = X3, B.payload = Q, Z !== undefined && Z !== null)
        zZ(Z, "replaceState"), B.callback = Z;
      var W = lQ(X, B, G);
      if (W !== null)
        C1(W, X, G, Y), GZ(W, X, G);
      lX(X, G);
    }, enqueueForceUpdate: function(J, Q) {
      var Z = B6(J), X = w8(), Y = J4(Z), G = OQ(X, Y);
      if (G.tag = ZZ, Q !== undefined && Q !== null)
        zZ(Q, "forceUpdate"), G.callback = Q;
      var B = lQ(Z, G, Y);
      if (B !== null)
        C1(B, Z, Y, X), GZ(B, Z, Y);
      i2(Z, Y);
    } };
    function q3(J, Q, Z, X, Y, G, B) {
      var W = J.stateNode;
      if (typeof W.shouldComponentUpdate === "function") {
        var z = W.shouldComponentUpdate(X, G, B);
        {
          if (J.mode & A1) {
            u1(true);
            try {
              z = W.shouldComponentUpdate(X, G, B);
            } finally {
              u1(false);
            }
          }
          if (z === undefined)
            V("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", s0(Q) || "Component");
        }
        return z;
      }
      if (Q.prototype && Q.prototype.isPureReactComponent)
        return !m7(Z, X) || !m7(Y, G);
      return true;
    }
    function BM(J, Q, Z) {
      var X = J.stateNode;
      {
        var Y = s0(Q) || "Component", G = X.render;
        if (!G)
          if (Q.prototype && typeof Q.prototype.render === "function")
            V("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", Y);
          else
            V("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", Y);
        if (X.getInitialState && !X.getInitialState.isReactClassApproved && !X.state)
          V("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", Y);
        if (X.getDefaultProps && !X.getDefaultProps.isReactClassApproved)
          V("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", Y);
        if (X.propTypes)
          V("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", Y);
        if (X.contextType)
          V("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", Y);
        {
          if (X.contextTypes)
            V("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", Y);
          if (Q.contextType && Q.contextTypes && !SG.has(Q))
            SG.add(Q), V("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", Y);
        }
        if (typeof X.componentShouldUpdate === "function")
          V("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", Y);
        if (Q.prototype && Q.prototype.isPureReactComponent && typeof X.shouldComponentUpdate !== "undefined")
          V("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", s0(Q) || "A pure component");
        if (typeof X.componentDidUnmount === "function")
          V("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", Y);
        if (typeof X.componentDidReceiveProps === "function")
          V("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", Y);
        if (typeof X.componentWillRecieveProps === "function")
          V("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", Y);
        if (typeof X.UNSAFE_componentWillRecieveProps === "function")
          V("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", Y);
        var B = X.props !== Z;
        if (X.props !== undefined && B)
          V("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", Y, Y);
        if (X.defaultProps)
          V("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", Y, Y);
        if (typeof X.getSnapshotBeforeUpdate === "function" && typeof X.componentDidUpdate !== "function" && !IG.has(Q))
          IG.add(Q), V("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", s0(Q));
        if (typeof X.getDerivedStateFromProps === "function")
          V("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", Y);
        if (typeof X.getDerivedStateFromError === "function")
          V("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", Y);
        if (typeof Q.getSnapshotBeforeUpdate === "function")
          V("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", Y);
        var W = X.state;
        if (W && (typeof W !== "object" || I1(W)))
          V("%s.state: must be set to an object or null", Y);
        if (typeof X.getChildContext === "function" && typeof Q.childContextTypes !== "object")
          V("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", Y);
      }
    }
    function U3(J, Q) {
      Q.updater = gG, J.stateNode = Q, K2(Q, J), Q._reactInternalInstance = EG;
    }
    function V3(J, Q, Z) {
      var X = false, Y = i8, G = i8, B = Q.contextType;
      if ("contextType" in Q) {
        var W = B === null || B !== undefined && B.$$typeof === T0 && B._context === undefined;
        if (!W && !xG.has(Q)) {
          xG.add(Q);
          var z = "";
          if (B === undefined)
            z = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.";
          else if (typeof B !== "object")
            z = " However, it is set to a " + typeof B + ".";
          else if (B.$$typeof === G0)
            z = " Did you accidentally pass the Context.Provider instead?";
          else if (B._context !== undefined)
            z = " Did you accidentally pass the Context.Consumer instead?";
          else
            z = " However, it is set to an object with keys {" + Object.keys(B).join(", ") + "}.";
          V("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", s0(Q) || "Component", z);
        }
      }
      if (typeof B === "object" && B !== null)
        G = P1(B);
      else {
        Y = R6(J, Q, true);
        var q = Q.contextTypes;
        X = q !== null && q !== undefined, G = X ? w6(J, Y) : i8;
      }
      var U = new Q(Z, G);
      if (J.mode & A1) {
        u1(true);
        try {
          U = new Q(Z, G);
        } finally {
          u1(false);
        }
      }
      var j = J.memoizedState = U.state !== null && U.state !== undefined ? U.state : null;
      U3(J, U);
      {
        if (typeof Q.getDerivedStateFromProps === "function" && j === null) {
          var O = s0(Q) || "Component";
          if (!wG.has(O))
            wG.add(O), V("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", O, U.state === null ? "null" : "undefined", O);
        }
        if (typeof Q.getDerivedStateFromProps === "function" || typeof U.getSnapshotBeforeUpdate === "function") {
          var F = null, A = null, R = null;
          if (typeof U.componentWillMount === "function" && U.componentWillMount.__suppressDeprecationWarning !== true)
            F = "componentWillMount";
          else if (typeof U.UNSAFE_componentWillMount === "function")
            F = "UNSAFE_componentWillMount";
          if (typeof U.componentWillReceiveProps === "function" && U.componentWillReceiveProps.__suppressDeprecationWarning !== true)
            A = "componentWillReceiveProps";
          else if (typeof U.UNSAFE_componentWillReceiveProps === "function")
            A = "UNSAFE_componentWillReceiveProps";
          if (typeof U.componentWillUpdate === "function" && U.componentWillUpdate.__suppressDeprecationWarning !== true)
            R = "componentWillUpdate";
          else if (typeof U.UNSAFE_componentWillUpdate === "function")
            R = "UNSAFE_componentWillUpdate";
          if (F !== null || A !== null || R !== null) {
            var u = s0(Q) || "Component", o = typeof Q.getDerivedStateFromProps === "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            if (!_G.has(u))
              _G.add(u), V("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://reactjs.org/link/unsafe-component-lifecycles", u, o, F !== null ? "\n  " + F : "", A !== null ? "\n  " + A : "", R !== null ? "\n  " + R : "");
          }
        }
      }
      if (X)
        hK(J, Y, G);
      return U;
    }
    function WM(J, Q) {
      var Z = Q.state;
      if (typeof Q.componentWillMount === "function")
        Q.componentWillMount();
      if (typeof Q.UNSAFE_componentWillMount === "function")
        Q.UNSAFE_componentWillMount();
      if (Z !== Q.state)
        V("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", H0(J) || "Component"), gG.enqueueReplaceState(Q, Q.state, null);
    }
    function $3(J, Q, Z, X) {
      var Y = Q.state;
      if (typeof Q.componentWillReceiveProps === "function")
        Q.componentWillReceiveProps(Z, X);
      if (typeof Q.UNSAFE_componentWillReceiveProps === "function")
        Q.UNSAFE_componentWillReceiveProps(Z, X);
      if (Q.state !== Y) {
        {
          var G = H0(J) || "Component";
          if (!RG.has(G))
            RG.add(G), V("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", G);
        }
        gG.enqueueReplaceState(Q, Q.state, null);
      }
    }
    function CG(J, Q, Z, X) {
      BM(J, Q, Z);
      var Y = J.stateNode;
      Y.props = Z, Y.state = J.memoizedState, Y.refs = W3, PG(J);
      var G = Q.contextType;
      if (typeof G === "object" && G !== null)
        Y.context = P1(G);
      else {
        var B = R6(J, Q, true);
        Y.context = w6(J, B);
      }
      {
        if (Y.state === Z) {
          var W = s0(Q) || "Component";
          if (!NG.has(W))
            NG.add(W), V("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", W);
        }
        if (J.mode & A1)
          EJ.recordLegacyContextWarning(J, Y);
        EJ.recordUnsafeLifecycleWarnings(J, Y);
      }
      Y.state = J.memoizedState;
      var z = Q.getDerivedStateFromProps;
      if (typeof z === "function")
        vG(J, Q, z, Z), Y.state = J.memoizedState;
      if (typeof Q.getDerivedStateFromProps !== "function" && typeof Y.getSnapshotBeforeUpdate !== "function" && (typeof Y.UNSAFE_componentWillMount === "function" || typeof Y.componentWillMount === "function"))
        WM(J, Y), BZ(J, Z, Y, X), Y.state = J.memoizedState;
      if (typeof Y.componentDidMount === "function") {
        var q = x0;
        if (q |= $4, (J.mode & bJ) !== X0)
          q |= GQ;
        J.flags |= q;
      }
    }
    function zM(J, Q, Z, X) {
      var { stateNode: Y, memoizedProps: G } = J;
      Y.props = G;
      var B = Y.context, W = Q.contextType, z = i8;
      if (typeof W === "object" && W !== null)
        z = P1(W);
      else {
        var q = R6(J, Q, true);
        z = w6(J, q);
      }
      var U = Q.getDerivedStateFromProps, j = typeof U === "function" || typeof Y.getSnapshotBeforeUpdate === "function";
      if (!j && (typeof Y.UNSAFE_componentWillReceiveProps === "function" || typeof Y.componentWillReceiveProps === "function")) {
        if (G !== Z || B !== z)
          $3(J, Y, Z, z);
      }
      G3();
      var O = J.memoizedState, F = Y.state = O;
      if (BZ(J, Z, Y, X), F = J.memoizedState, G === Z && O === F && !c5() && !WZ()) {
        if (typeof Y.componentDidMount === "function") {
          var A = x0;
          if (A |= $4, (J.mode & bJ) !== X0)
            A |= GQ;
          J.flags |= A;
        }
        return false;
      }
      if (typeof U === "function")
        vG(J, Q, U, Z), F = J.memoizedState;
      var R = WZ() || q3(J, Q, G, Z, O, F, z);
      if (R) {
        if (!j && (typeof Y.UNSAFE_componentWillMount === "function" || typeof Y.componentWillMount === "function")) {
          if (typeof Y.componentWillMount === "function")
            Y.componentWillMount();
          if (typeof Y.UNSAFE_componentWillMount === "function")
            Y.UNSAFE_componentWillMount();
        }
        if (typeof Y.componentDidMount === "function") {
          var u = x0;
          if (u |= $4, (J.mode & bJ) !== X0)
            u |= GQ;
          J.flags |= u;
        }
      } else {
        if (typeof Y.componentDidMount === "function") {
          var o = x0;
          if (o |= $4, (J.mode & bJ) !== X0)
            o |= GQ;
          J.flags |= o;
        }
        J.memoizedProps = Z, J.memoizedState = F;
      }
      return Y.props = Z, Y.state = F, Y.context = z, R;
    }
    function KM(J, Q, Z, X, Y) {
      var G = Q.stateNode;
      Y3(J, Q);
      var B = Q.memoizedProps, W = Q.type === Q.elementType ? B : RJ(Q.type, B);
      G.props = W;
      var z = Q.pendingProps, q = G.context, U = Z.contextType, j = i8;
      if (typeof U === "object" && U !== null)
        j = P1(U);
      else {
        var O = R6(Q, Z, true);
        j = w6(Q, O);
      }
      var F = Z.getDerivedStateFromProps, A = typeof F === "function" || typeof G.getSnapshotBeforeUpdate === "function";
      if (!A && (typeof G.UNSAFE_componentWillReceiveProps === "function" || typeof G.componentWillReceiveProps === "function")) {
        if (B !== z || q !== j)
          $3(Q, G, X, j);
      }
      G3();
      var R = Q.memoizedState, u = G.state = R;
      if (BZ(Q, X, G, Y), u = Q.memoizedState, B === z && R === u && !c5() && !WZ() && !VJ) {
        if (typeof G.componentDidUpdate === "function") {
          if (B !== J.memoizedProps || R !== J.memoizedState)
            Q.flags |= x0;
        }
        if (typeof G.getSnapshotBeforeUpdate === "function") {
          if (B !== J.memoizedProps || R !== J.memoizedState)
            Q.flags |= U4;
        }
        return false;
      }
      if (typeof F === "function")
        vG(Q, Z, F, X), u = Q.memoizedState;
      var o = WZ() || q3(Q, Z, W, X, R, u, j) || VJ;
      if (o) {
        if (!A && (typeof G.UNSAFE_componentWillUpdate === "function" || typeof G.componentWillUpdate === "function")) {
          if (typeof G.componentWillUpdate === "function")
            G.componentWillUpdate(X, u, j);
          if (typeof G.UNSAFE_componentWillUpdate === "function")
            G.UNSAFE_componentWillUpdate(X, u, j);
        }
        if (typeof G.componentDidUpdate === "function")
          Q.flags |= x0;
        if (typeof G.getSnapshotBeforeUpdate === "function")
          Q.flags |= U4;
      } else {
        if (typeof G.componentDidUpdate === "function") {
          if (B !== J.memoizedProps || R !== J.memoizedState)
            Q.flags |= x0;
        }
        if (typeof G.getSnapshotBeforeUpdate === "function") {
          if (B !== J.memoizedProps || R !== J.memoizedState)
            Q.flags |= U4;
        }
        Q.memoizedProps = X, Q.memoizedState = u;
      }
      return G.props = X, G.state = u, G.context = j, o;
    }
    var TG, kG, hG, bG, fG, H3 = function(J, Q) {
    };
    TG = false, kG = false, hG = {}, bG = {}, fG = {}, H3 = function(J, Q) {
      if (J === null || typeof J !== "object")
        return;
      if (!J._store || J._store.validated || J.key != null)
        return;
      if (typeof J._store !== "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      J._store.validated = true;
      var Z = H0(Q) || "Component";
      if (bG[Z])
        return;
      bG[Z] = true, V('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.');
    };
    function K9(J, Q, Z) {
      var X = Z.ref;
      if (X !== null && typeof X !== "function" && typeof X !== "object") {
        if ((J.mode & A1 || EQ) && !(Z._owner && Z._self && Z._owner.stateNode !== Z._self)) {
          var Y = H0(J) || "Component";
          if (!hG[Y])
            V('A string ref, "%s", has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', X), hG[Y] = true;
        }
        if (Z._owner) {
          var G = Z._owner, B;
          if (G) {
            var W = G;
            if (W.tag !== i)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            B = W.stateNode;
          }
          if (!B)
            throw new Error("Missing owner for string ref " + X + ". This error is likely caused by a bug in React. Please file an issue.");
          var z = B;
          RQ(X, "ref");
          var q = "" + X;
          if (Q !== null && Q.ref !== null && typeof Q.ref === "function" && Q.ref._stringRef === q)
            return Q.ref;
          var U = function(j) {
            var O = z.refs;
            if (O === W3)
              O = z.refs = {};
            if (j === null)
              delete O[q];
            else
              O[q] = j;
          };
          return U._stringRef = q, U;
        } else {
          if (typeof X !== "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!Z._owner)
            throw new Error("Element ref was specified as a string (" + X + ") but no owner was set. This could happen for one of the following reasons:\n1. You may be adding a ref to a function component\n2. You may be adding a ref to a component that was not created inside a component's render method\n3. You have multiple copies of React loaded\nSee https://reactjs.org/link/refs-must-have-owner for more information.");
        }
      }
      return X;
    }
    function KZ(J, Q) {
      var Z = Object.prototype.toString.call(Q);
      throw new Error("Objects are not valid as a React child (found: " + (Z === "[object Object]" ? "object with keys {" + Object.keys(Q).join(", ") + "}" : Z) + "). If you meant to render a collection of children, use an array instead.");
    }
    function qZ(J) {
      {
        var Q = H0(J) || "Component";
        if (fG[Q])
          return;
        fG[Q] = true, V("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function O3(J) {
      var { _payload: Q, _init: Z } = J;
      return Z(Q);
    }
    function j3(J) {
      function Q(M, I) {
        if (!J)
          return;
        var D = M.deletions;
        if (D === null)
          M.deletions = [I], M.flags |= q4;
        else
          D.push(I);
      }
      function Z(M, I) {
        if (!J)
          return null;
        var D = I;
        while (D !== null)
          Q(M, D), D = D.sibling;
        return null;
      }
      function X(M, I) {
        var D = new Map, x = I;
        while (x !== null) {
          if (x.key !== null)
            D.set(x.key, x);
          else
            D.set(x.index, x);
          x = x.sibling;
        }
        return D;
      }
      function Y(M, I) {
        var D = f4(M, I);
        return D.index = 0, D.sibling = null, D;
      }
      function G(M, I, D) {
        if (M.index = D, !J)
          return M.flags |= Zz, I;
        var x = M.alternate;
        if (x !== null) {
          var y = x.index;
          if (y < I)
            return M.flags |= D1, I;
          else
            return y;
        } else
          return M.flags |= D1, I;
      }
      function B(M) {
        if (J && M.alternate === null)
          M.flags |= D1;
        return M;
      }
      function W(M, I, D, x) {
        if (I === null || I.tag !== w0) {
          var y = $W(D, M.mode, x);
          return y.return = M, y;
        } else {
          var b = Y(I, D);
          return b.return = M, b;
        }
      }
      function z(M, I, D, x) {
        var y = D.type;
        if (y === S)
          return U(M, I, D.props.children, x, D.key);
        if (I !== null) {
          if (I.elementType === y || WU(I, D) || typeof y === "object" && y !== null && y.$$typeof === E0 && O3(y) === I.type) {
            var b = Y(I, D.props);
            return b.ref = K9(M, I, D), b.return = M, b._debugSource = D._source, b._debugOwner = D._owner, b;
          }
        }
        var B0 = VW(D, M.mode, x);
        return B0.ref = K9(M, I, D), B0.return = M, B0;
      }
      function q(M, I, D, x) {
        if (I === null || I.tag !== e || I.stateNode.containerInfo !== D.containerInfo || I.stateNode.implementation !== D.implementation) {
          var y = HW(D, M.mode, x);
          return y.return = M, y;
        } else {
          var b = Y(I, D.children || []);
          return b.return = M, b;
        }
      }
      function U(M, I, D, x, y) {
        if (I === null || I.tag !== F1) {
          var b = Z4(D, M.mode, x, y);
          return b.return = M, b;
        } else {
          var B0 = Y(I, D);
          return B0.return = M, B0;
        }
      }
      function j(M, I, D) {
        if (typeof I === "string" && I !== "" || typeof I === "number") {
          var x = $W("" + I, M.mode, D);
          return x.return = M, x;
        }
        if (typeof I === "object" && I !== null) {
          switch (I.$$typeof) {
            case TJ: {
              var y = VW(I, M.mode, D);
              return y.ref = K9(M, null, I), y.return = M, y;
            }
            case H: {
              var b = HW(I, M.mode, D);
              return b.return = M, b;
            }
            case E0: {
              var { _payload: B0, _init: U0 } = I;
              return j(M, U0(B0), D);
            }
          }
          if (I1(I) || oJ(I)) {
            var y0 = Z4(I, M.mode, D, null);
            return y0.return = M, y0;
          }
          KZ(M, I);
        }
        if (typeof I === "function")
          qZ(M);
        return null;
      }
      function O(M, I, D, x) {
        var y = I !== null ? I.key : null;
        if (typeof D === "string" && D !== "" || typeof D === "number") {
          if (y !== null)
            return null;
          return W(M, I, "" + D, x);
        }
        if (typeof D === "object" && D !== null) {
          switch (D.$$typeof) {
            case TJ:
              if (D.key === y)
                return z(M, I, D, x);
              else
                return null;
            case H:
              if (D.key === y)
                return q(M, I, D, x);
              else
                return null;
            case E0: {
              var { _payload: b, _init: B0 } = D;
              return O(M, I, B0(b), x);
            }
          }
          if (I1(D) || oJ(D)) {
            if (y !== null)
              return null;
            return U(M, I, D, x, null);
          }
          KZ(M, D);
        }
        if (typeof D === "function")
          qZ(M);
        return null;
      }
      function F(M, I, D, x, y) {
        if (typeof x === "string" && x !== "" || typeof x === "number") {
          var b = M.get(D) || null;
          return W(I, b, "" + x, y);
        }
        if (typeof x === "object" && x !== null) {
          switch (x.$$typeof) {
            case TJ: {
              var B0 = M.get(x.key === null ? D : x.key) || null;
              return z(I, B0, x, y);
            }
            case H: {
              var U0 = M.get(x.key === null ? D : x.key) || null;
              return q(I, U0, x, y);
            }
            case E0:
              var { _payload: y0, _init: g0 } = x;
              return F(M, I, D, g0(y0), y);
          }
          if (I1(x) || oJ(x)) {
            var H1 = M.get(D) || null;
            return U(I, H1, x, y, null);
          }
          KZ(I, x);
        }
        if (typeof x === "function")
          qZ(I);
        return null;
      }
      function A(M, I, D) {
        {
          if (typeof M !== "object" || M === null)
            return I;
          switch (M.$$typeof) {
            case TJ:
            case H:
              H3(M, D);
              var x = M.key;
              if (typeof x !== "string")
                break;
              if (I === null) {
                I = new Set, I.add(x);
                break;
              }
              if (!I.has(x)) {
                I.add(x);
                break;
              }
              V("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be " + "duplicated and/or omitted \u2014 the behavior is unsupported and " + "could change in a future version.", x);
              break;
            case E0:
              var { _payload: y, _init: b } = M;
              A(b(y), I, D);
              break;
          }
        }
        return I;
      }
      function R(M, I, D, x) {
        {
          var y = null;
          for (var b = 0;b < D.length; b++) {
            var B0 = D[b];
            y = A(B0, y, M);
          }
        }
        var U0 = null, y0 = null, g0 = I, H1 = 0, C0 = 0, V1 = null;
        for (;g0 !== null && C0 < D.length; C0++) {
          if (g0.index > C0)
            V1 = g0, g0 = null;
          else
            V1 = g0.sibling;
          var $8 = O(M, g0, D[C0], x);
          if ($8 === null) {
            if (g0 === null)
              g0 = V1;
            break;
          }
          if (J) {
            if (g0 && $8.alternate === null)
              Q(M, g0);
          }
          if (H1 = G($8, H1, C0), y0 === null)
            U0 = $8;
          else
            y0.sibling = $8;
          y0 = $8, g0 = V1;
        }
        if (C0 === D.length) {
          if (Z(M, g0), r1()) {
            var Z8 = C0;
            I4(M, Z8);
          }
          return U0;
        }
        if (g0 === null) {
          for (;C0 < D.length; C0++) {
            var p8 = j(M, D[C0], x);
            if (p8 === null)
              continue;
            if (H1 = G(p8, H1, C0), y0 === null)
              U0 = p8;
            else
              y0.sibling = p8;
            y0 = p8;
          }
          if (r1()) {
            var I8 = C0;
            I4(M, I8);
          }
          return U0;
        }
        var _8 = X(M, g0);
        for (;C0 < D.length; C0++) {
          var H8 = F(_8, M, C0, D[C0], x);
          if (H8 !== null) {
            if (J) {
              if (H8.alternate !== null)
                _8.delete(H8.key === null ? C0 : H8.key);
            }
            if (H1 = G(H8, H1, C0), y0 === null)
              U0 = H8;
            else
              y0.sibling = H8;
            y0 = H8;
          }
        }
        if (J)
          _8.forEach(function(l6) {
            return Q(M, l6);
          });
        if (r1()) {
          var FQ = C0;
          I4(M, FQ);
        }
        return U0;
      }
      function u(M, I, D, x) {
        var y = oJ(D);
        if (typeof y !== "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          if (typeof Symbol === "function" && D[Symbol.toStringTag] === "Generator") {
            if (!kG)
              V("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers.");
            kG = true;
          }
          if (D.entries === y) {
            if (!TG)
              V("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
            TG = true;
          }
          var b = y.call(D);
          if (b) {
            var B0 = null, U0 = b.next();
            for (;!U0.done; U0 = b.next()) {
              var y0 = U0.value;
              B0 = A(y0, B0, M);
            }
          }
        }
        var g0 = y.call(D);
        if (g0 == null)
          throw new Error("An iterable object provided no iterator.");
        var H1 = null, C0 = null, V1 = I, $8 = 0, Z8 = 0, p8 = null, I8 = g0.next();
        for (;V1 !== null && !I8.done; Z8++, I8 = g0.next()) {
          if (V1.index > Z8)
            p8 = V1, V1 = null;
          else
            p8 = V1.sibling;
          var _8 = O(M, V1, I8.value, x);
          if (_8 === null) {
            if (V1 === null)
              V1 = p8;
            break;
          }
          if (J) {
            if (V1 && _8.alternate === null)
              Q(M, V1);
          }
          if ($8 = G(_8, $8, Z8), C0 === null)
            H1 = _8;
          else
            C0.sibling = _8;
          C0 = _8, V1 = p8;
        }
        if (I8.done) {
          if (Z(M, V1), r1()) {
            var H8 = Z8;
            I4(M, H8);
          }
          return H1;
        }
        if (V1 === null) {
          for (;!I8.done; Z8++, I8 = g0.next()) {
            var FQ = j(M, I8.value, x);
            if (FQ === null)
              continue;
            if ($8 = G(FQ, $8, Z8), C0 === null)
              H1 = FQ;
            else
              C0.sibling = FQ;
            C0 = FQ;
          }
          if (r1()) {
            var l6 = Z8;
            I4(M, l6);
          }
          return H1;
        }
        var u9 = X(M, V1);
        for (;!I8.done; Z8++, I8 = g0.next()) {
          var aJ = F(u9, M, Z8, I8.value, x);
          if (aJ !== null) {
            if (J) {
              if (aJ.alternate !== null)
                u9.delete(aJ.key === null ? Z8 : aJ.key);
            }
            if ($8 = G(aJ, $8, Z8), C0 === null)
              H1 = aJ;
            else
              C0.sibling = aJ;
            C0 = aJ;
          }
        }
        if (J)
          u9.forEach(function(LP) {
            return Q(M, LP);
          });
        if (r1()) {
          var _P = Z8;
          I4(M, _P);
        }
        return H1;
      }
      function o(M, I, D, x) {
        if (I !== null && I.tag === w0) {
          Z(M, I.sibling);
          var y = Y(I, D);
          return y.return = M, y;
        }
        Z(M, I);
        var b = $W(D, M.mode, x);
        return b.return = M, b;
      }
      function a(M, I, D, x) {
        var y = D.key, b = I;
        while (b !== null) {
          if (b.key === y) {
            var B0 = D.type;
            if (B0 === S) {
              if (b.tag === F1) {
                Z(M, b.sibling);
                var U0 = Y(b, D.props.children);
                return U0.return = M, U0._debugSource = D._source, U0._debugOwner = D._owner, U0;
              }
            } else if (b.elementType === B0 || WU(b, D) || typeof B0 === "object" && B0 !== null && B0.$$typeof === E0 && O3(B0) === b.type) {
              Z(M, b.sibling);
              var y0 = Y(b, D.props);
              return y0.ref = K9(M, b, D), y0.return = M, y0._debugSource = D._source, y0._debugOwner = D._owner, y0;
            }
            Z(M, b);
            break;
          } else
            Q(M, b);
          b = b.sibling;
        }
        if (D.type === S) {
          var g0 = Z4(D.props.children, M.mode, x, D.key);
          return g0.return = M, g0;
        } else {
          var H1 = VW(D, M.mode, x);
          return H1.ref = K9(M, I, D), H1.return = M, H1;
        }
      }
      function P0(M, I, D, x) {
        var y = D.key, b = I;
        while (b !== null) {
          if (b.key === y)
            if (b.tag === e && b.stateNode.containerInfo === D.containerInfo && b.stateNode.implementation === D.implementation) {
              Z(M, b.sibling);
              var B0 = Y(b, D.children || []);
              return B0.return = M, B0;
            } else {
              Z(M, b);
              break;
            }
          else
            Q(M, b);
          b = b.sibling;
        }
        var U0 = HW(D, M.mode, x);
        return U0.return = M, U0;
      }
      function F0(M, I, D, x) {
        var y = typeof D === "object" && D !== null && D.type === S && D.key === null;
        if (y)
          D = D.props.children;
        if (typeof D === "object" && D !== null) {
          switch (D.$$typeof) {
            case TJ:
              return B(a(M, I, D, x));
            case H:
              return B(P0(M, I, D, x));
            case E0:
              var { _payload: b, _init: B0 } = D;
              return F0(M, I, B0(b), x);
          }
          if (I1(D))
            return R(M, I, D, x);
          if (oJ(D))
            return u(M, I, D, x);
          KZ(M, D);
        }
        if (typeof D === "string" && D !== "" || typeof D === "number")
          return B(o(M, I, "" + D, x));
        if (typeof D === "function")
          qZ(M);
        return Z(M, I);
      }
      return F0;
    }
    var x6 = j3(true), M3 = j3(false);
    function qM(J, Q) {
      if (J !== null && Q.child !== J.child)
        throw new Error("Resuming work not yet implemented.");
      if (Q.child === null)
        return;
      var Z = Q.child, X = f4(Z, Z.pendingProps);
      Q.child = X, X.return = Q;
      while (Z.sibling !== null)
        Z = Z.sibling, X = X.sibling = f4(Z, Z.pendingProps), X.return = Q;
      X.sibling = null;
    }
    function UM(J, Q) {
      var Z = J.child;
      while (Z !== null)
        sA(Z, Q), Z = Z.sibling;
    }
    var q9 = {}, pQ = mQ(q9), U9 = mQ(q9), UZ = mQ(q9);
    function VZ(J) {
      if (J === q9)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return J;
    }
    function D3() {
      var J = VZ(UZ.current);
      return J;
    }
    function uG(J, Q) {
      U8(UZ, Q, J), U8(U9, J, J), U8(pQ, q9, J);
      var Z = IO(Q);
      q8(pQ, J), U8(pQ, Z, J);
    }
    function v6(J) {
      q8(pQ, J), q8(U9, J), q8(UZ, J);
    }
    function dG() {
      var J = VZ(pQ.current);
      return J;
    }
    function A3(J) {
      var Q = VZ(UZ.current), Z = VZ(pQ.current), X = _O(Z, J.type);
      if (Z === X)
        return;
      U8(U9, J, J), U8(pQ, X, J);
    }
    function yG(J) {
      if (U9.current !== J)
        return;
      q8(pQ, J), q8(U9, J);
    }
    var VM = 0, P3 = 1, F3 = 1, V9 = 2, wJ = mQ(VM);
    function mG(J, Q) {
      return (J & Q) !== 0;
    }
    function g6(J) {
      return J & P3;
    }
    function cG(J, Q) {
      return J & P3 | Q;
    }
    function $M(J, Q) {
      return J | Q;
    }
    function aQ(J, Q) {
      U8(wJ, Q, J);
    }
    function C6(J) {
      q8(wJ, J);
    }
    function HM(J, Q) {
      var Z = J.memoizedState;
      if (Z !== null) {
        if (Z.dehydrated !== null)
          return true;
        return false;
      }
      var X = J.memoizedProps;
      return true;
    }
    function $Z(J) {
      var Q = J;
      while (Q !== null) {
        if (Q.tag === A0) {
          var Z = Q.memoizedState;
          if (Z !== null) {
            var X = Z.dehydrated;
            if (X === null || xK(X) || nY(X))
              return Q;
          }
        } else if (Q.tag === R1 && Q.memoizedProps.revealOrder !== undefined) {
          var Y = (Q.flags & k0) !== Z0;
          if (Y)
            return Q;
        } else if (Q.child !== null) {
          Q.child.return = Q, Q = Q.child;
          continue;
        }
        if (Q === J)
          return null;
        while (Q.sibling === null) {
          if (Q.return === null || Q.return === J)
            return null;
          Q = Q.return;
        }
        Q.sibling.return = Q.return, Q = Q.sibling;
      }
      return null;
    }
    var C8 = 0, _1 = 1, yJ = 2, L1 = 4, n1 = 8, sG = [];
    function iG() {
      for (var J = 0;J < sG.length; J++) {
        var Q = sG[J];
        Q._workInProgressVersionPrimary = null;
      }
      sG.length = 0;
    }
    function OM(J, Q) {
      var Z = Q._getVersion, X = Z(Q._source);
      if (J.mutableSourceEagerHydrationData == null)
        J.mutableSourceEagerHydrationData = [Q, X];
      else
        J.mutableSourceEagerHydrationData.push(Q, X);
    }
    var { ReactCurrentDispatcher: d, ReactCurrentBatchConfig: $9 } = v, lG, T6;
    lG = new Set;
    var v4 = N, d0 = null, N1 = null, S1 = null, HZ = false, H9 = false, O9 = 0, jM = 0, MM = 25, L = null, WJ = null, rQ = -1, pG = false;
    function b0() {
      {
        var J = L;
        if (WJ === null)
          WJ = [J];
        else
          WJ.push(J);
      }
    }
    function C() {
      {
        var J = L;
        if (WJ !== null) {
          if (rQ++, WJ[rQ] !== J)
            DM(J);
        }
      }
    }
    function k6(J) {
      if (J !== undefined && J !== null && !I1(J))
        V("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", L, typeof J);
    }
    function DM(J) {
      {
        var Q = H0(d0);
        if (!lG.has(Q)) {
          if (lG.add(Q), WJ !== null) {
            var Z = "", X = 30;
            for (var Y = 0;Y <= rQ; Y++) {
              var G = WJ[Y], B = Y === rQ ? J : G, W = Y + 1 + ". " + G;
              while (W.length < X)
                W += " ";
              W += B + "\n", Z += W;
            }
            V("React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks\n\n   Previous render            Next render\n   ------------------------------------------------------\n%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n", Q, Z);
          }
        }
      }
    }
    function V8() {
      throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
    }
    function aG(J, Q) {
      if (pG)
        return false;
      if (Q === null)
        return V("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", L), false;
      if (J.length !== Q.length)
        V("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", L, "[" + Q.join(", ") + "]", "[" + J.join(", ") + "]");
      for (var Z = 0;Z < Q.length && Z < J.length; Z++) {
        if (s8(J[Z], Q[Z]))
          continue;
        return false;
      }
      return true;
    }
    function h6(J, Q, Z, X, Y, G) {
      if (v4 = G, d0 = Q, WJ = J !== null ? J._debugHookTypes : null, rQ = -1, pG = J !== null && J.type !== Q.type, Q.memoizedState = null, Q.updateQueue = null, Q.lanes = N, J !== null && J.memoizedState !== null)
        d.current = c3;
      else if (WJ !== null)
        d.current = m3;
      else
        d.current = y3;
      var B = Z(X, Y);
      if (H9) {
        var W = 0;
        do {
          if (H9 = false, O9 = 0, W >= MM)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          W += 1, pG = false, N1 = null, S1 = null, Q.updateQueue = null, rQ = -1, d.current = s3, B = Z(X, Y);
        } while (H9);
      }
      d.current = SZ, Q._debugHookTypes = WJ;
      var z = N1 !== null && N1.next !== null;
      if (v4 = N, d0 = null, N1 = null, S1 = null, L = null, WJ = null, rQ = -1, J !== null && (J.flags & BQ) !== (Q.flags & BQ) && (J.mode & I0) !== X0)
        V("Internal React error: Expected static flag was missing. Please notify the React team.");
      if (HZ = false, z)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return B;
    }
    function b6() {
      var J = O9 !== 0;
      return O9 = 0, J;
    }
    function E3(J, Q, Z) {
      if (Q.updateQueue = J.updateQueue, (Q.mode & bJ) !== X0)
        Q.flags &= ~(B5 | GQ | MJ | x0);
      else
        Q.flags &= ~(MJ | x0);
      J.lanes = $5(J.lanes, Z);
    }
    function R3() {
      if (d.current = SZ, HZ) {
        var J = d0.memoizedState;
        while (J !== null) {
          var Q = J.queue;
          if (Q !== null)
            Q.pending = null;
          J = J.next;
        }
        HZ = false;
      }
      v4 = N, d0 = null, N1 = null, S1 = null, WJ = null, rQ = -1, L = null, h3 = false, H9 = false, O9 = 0;
    }
    function mJ() {
      var J = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
      if (S1 === null)
        d0.memoizedState = S1 = J;
      else
        S1 = S1.next = J;
      return S1;
    }
    function zJ() {
      var J;
      if (N1 === null) {
        var Q = d0.alternate;
        if (Q !== null)
          J = Q.memoizedState;
        else
          J = null;
      } else
        J = N1.next;
      var Z;
      if (S1 === null)
        Z = d0.memoizedState;
      else
        Z = S1.next;
      if (Z !== null)
        S1 = Z, Z = S1.next, N1 = J;
      else {
        if (J === null)
          throw new Error("Rendered more hooks than during the previous render.");
        N1 = J;
        var X = { memoizedState: N1.memoizedState, baseState: N1.baseState, baseQueue: N1.baseQueue, queue: N1.queue, next: null };
        if (S1 === null)
          d0.memoizedState = S1 = X;
        else
          S1 = S1.next = X;
      }
      return S1;
    }
    function w3() {
      return { lastEffect: null, stores: null };
    }
    function rG(J, Q) {
      return typeof Q === "function" ? Q(J) : Q;
    }
    function nG(J, Q, Z) {
      var X = mJ(), Y;
      if (Z !== undefined)
        Y = Z(Q);
      else
        Y = Q;
      X.memoizedState = X.baseState = Y;
      var G = { pending: null, interleaved: null, lanes: N, dispatch: null, lastRenderedReducer: J, lastRenderedState: Y };
      X.queue = G;
      var B = G.dispatch = FM.bind(null, d0, G);
      return [X.memoizedState, B];
    }
    function oG(J, Q, Z) {
      var X = zJ(), Y = X.queue;
      if (Y === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      Y.lastRenderedReducer = J;
      var G = N1, B = G.baseQueue, W = Y.pending;
      if (W !== null) {
        if (B !== null) {
          var z = B.next, q = W.next;
          B.next = q, W.next = z;
        }
        if (G.baseQueue !== B)
          V("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React.");
        G.baseQueue = B = W, Y.pending = null;
      }
      if (B !== null) {
        var U = B.next, j = G.baseState, O = null, F = null, A = null, R = U;
        do {
          var u = R.lane;
          if (!$6(v4, u)) {
            var o = { lane: u, action: R.action, hasEagerState: R.hasEagerState, eagerState: R.eagerState, next: null };
            if (A === null)
              F = A = o, O = j;
            else
              A = A.next = o;
            d0.lanes = M0(d0.lanes, u), T9(u);
          } else {
            if (A !== null) {
              var a = { lane: d1, action: R.action, hasEagerState: R.hasEagerState, eagerState: R.eagerState, next: null };
              A = A.next = a;
            }
            if (R.hasEagerState)
              j = R.eagerState;
            else {
              var P0 = R.action;
              j = J(j, P0);
            }
          }
          R = R.next;
        } while (R !== null && R !== U);
        if (A === null)
          O = j;
        else
          A.next = F;
        if (!s8(j, X.memoizedState))
          E9();
        X.memoizedState = j, X.baseState = O, X.baseQueue = A, Y.lastRenderedState = j;
      }
      var F0 = Y.interleaved;
      if (F0 !== null) {
        var M = F0;
        do {
          var I = M.lane;
          d0.lanes = M0(d0.lanes, I), T9(I), M = M.next;
        } while (M !== F0);
      } else if (B === null)
        Y.lanes = N;
      var D = Y.dispatch;
      return [X.memoizedState, D];
    }
    function tG(J, Q, Z) {
      var X = zJ(), Y = X.queue;
      if (Y === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      Y.lastRenderedReducer = J;
      var { dispatch: G, pending: B } = Y, W = X.memoizedState;
      if (B !== null) {
        Y.pending = null;
        var z = B.next, q = z;
        do {
          var U = q.action;
          W = J(W, U), q = q.next;
        } while (q !== z);
        if (!s8(W, X.memoizedState))
          E9();
        if (X.memoizedState = W, X.baseQueue === null)
          X.baseState = W;
        Y.lastRenderedState = W;
      }
      return [W, G];
    }
    function eG(J, Q, Z) {
      return;
    }
    function OZ(J, Q, Z) {
      return;
    }
    function JB(J, Q, Z) {
      var X = d0, Y = mJ(), G, B = r1();
      if (B) {
        if (Z === undefined)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        if (G = Z(), !T6) {
          if (G !== Z())
            V("The result of getServerSnapshot should be cached to avoid an infinite loop"), T6 = true;
        }
      } else {
        if (G = Q(), !T6) {
          var W = Q();
          if (!s8(G, W))
            V("The result of getSnapshot should be cached to avoid an infinite loop"), T6 = true;
        }
        var z = pZ();
        if (z === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        if (!V5(z, v4))
          I3(X, Q, G);
      }
      Y.memoizedState = G;
      var q = { value: G, getSnapshot: Q };
      return Y.queue = q, PZ(L3.bind(null, X, q, J), [J]), X.flags |= MJ, j9(_1 | n1, _3.bind(null, X, q, G, Q), undefined, null), G;
    }
    function jZ(J, Q, Z) {
      var X = d0, Y = zJ(), G = Q();
      if (!T6) {
        var B = Q();
        if (!s8(G, B))
          V("The result of getSnapshot should be cached to avoid an infinite loop"), T6 = true;
      }
      var W = Y.memoizedState, z = !s8(W, G);
      if (z)
        Y.memoizedState = G, E9();
      var q = Y.queue;
      if (D9(L3.bind(null, X, q, J), [J]), q.getSnapshot !== Q || z || S1 !== null && S1.memoizedState.tag & _1) {
        X.flags |= MJ, j9(_1 | n1, _3.bind(null, X, q, G, Q), undefined, null);
        var U = pZ();
        if (U === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        if (!V5(U, v4))
          I3(X, Q, G);
      }
      return G;
    }
    function I3(J, Q, Z) {
      J.flags |= G5;
      var X = { getSnapshot: Q, value: Z }, Y = d0.updateQueue;
      if (Y === null)
        Y = w3(), d0.updateQueue = Y, Y.stores = [X];
      else {
        var G = Y.stores;
        if (G === null)
          Y.stores = [X];
        else
          G.push(X);
      }
    }
    function _3(J, Q, Z, X) {
      if (Q.value = Z, Q.getSnapshot = X, N3(Q))
        S3(J);
    }
    function L3(J, Q, Z) {
      var X = function() {
        if (N3(Q))
          S3(J);
      };
      return Z(X);
    }
    function N3(J) {
      var { getSnapshot: Q, value: Z } = J;
      try {
        var X = Q();
        return !s8(Z, X);
      } catch (Y) {
        return true;
      }
    }
    function S3(J) {
      var Q = g8(J, K0);
      if (Q !== null)
        C1(Q, J, K0, Z1);
    }
    function MZ(J) {
      var Q = mJ();
      if (typeof J === "function")
        J = J();
      Q.memoizedState = Q.baseState = J;
      var Z = { pending: null, interleaved: null, lanes: N, dispatch: null, lastRenderedReducer: rG, lastRenderedState: J };
      Q.queue = Z;
      var X = Z.dispatch = EM.bind(null, d0, Z);
      return [Q.memoizedState, X];
    }
    function QB(J) {
      return oG(rG);
    }
    function ZB(J) {
      return tG(rG);
    }
    function j9(J, Q, Z, X) {
      var Y = { tag: J, create: Q, destroy: Z, deps: X, next: null }, G = d0.updateQueue;
      if (G === null)
        G = w3(), d0.updateQueue = G, G.lastEffect = Y.next = Y;
      else {
        var B = G.lastEffect;
        if (B === null)
          G.lastEffect = Y.next = Y;
        else {
          var W = B.next;
          B.next = Y, Y.next = W, G.lastEffect = Y;
        }
      }
      return Y;
    }
    function XB(J) {
      var Q = mJ();
      {
        var Z = { current: J };
        return Q.memoizedState = Z, Z;
      }
    }
    function DZ(J) {
      var Q = zJ();
      return Q.memoizedState;
    }
    function M9(J, Q, Z, X) {
      var Y = mJ(), G = X === undefined ? null : X;
      d0.flags |= J, Y.memoizedState = j9(_1 | Q, Z, undefined, G);
    }
    function AZ(J, Q, Z, X) {
      var Y = zJ(), G = X === undefined ? null : X, B = undefined;
      if (N1 !== null) {
        var W = N1.memoizedState;
        if (B = W.destroy, G !== null) {
          var z = W.deps;
          if (aG(G, z)) {
            Y.memoizedState = j9(Q, Z, B, G);
            return;
          }
        }
      }
      d0.flags |= J, Y.memoizedState = j9(_1 | Q, Z, B, G);
    }
    function PZ(J, Q) {
      if ((d0.mode & bJ) !== X0)
        return M9(B5 | MJ | yX, n1, J, Q);
      else
        return M9(MJ | yX, n1, J, Q);
    }
    function D9(J, Q) {
      return AZ(MJ, n1, J, Q);
    }
    function YB(J, Q) {
      return M9(x0, yJ, J, Q);
    }
    function FZ(J, Q) {
      return AZ(x0, yJ, J, Q);
    }
    function GB(J, Q) {
      var Z = x0;
      if (Z |= $4, (d0.mode & bJ) !== X0)
        Z |= GQ;
      return M9(Z, L1, J, Q);
    }
    function EZ(J, Q) {
      return AZ(x0, L1, J, Q);
    }
    function x3(J, Q) {
      if (typeof Q === "function") {
        var Z = Q, X = J();
        return Z(X), function() {
          Z(null);
        };
      } else if (Q !== null && Q !== undefined) {
        var Y = Q;
        if (!Y.hasOwnProperty("current"))
          V("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(Y).join(", ") + "}");
        var G = J();
        return Y.current = G, function() {
          Y.current = null;
        };
      }
    }
    function BB(J, Q, Z) {
      if (typeof Q !== "function")
        V("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", Q !== null ? typeof Q : "null");
      var X = Z !== null && Z !== undefined ? Z.concat([J]) : null, Y = x0;
      if (Y |= $4, (d0.mode & bJ) !== X0)
        Y |= GQ;
      return M9(Y, L1, x3.bind(null, Q, J), X);
    }
    function RZ(J, Q, Z) {
      if (typeof Q !== "function")
        V("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", Q !== null ? typeof Q : "null");
      var X = Z !== null && Z !== undefined ? Z.concat([J]) : null;
      return AZ(x0, L1, x3.bind(null, Q, J), X);
    }
    function wZ(J, Q) {
    }
    var IZ = wZ;
    function WB(J, Q) {
      var Z = mJ(), X = Q === undefined ? null : Q;
      return Z.memoizedState = [J, X], J;
    }
    function _Z(J, Q) {
      var Z = zJ(), X = Q === undefined ? null : Q, Y = Z.memoizedState;
      if (Y !== null) {
        if (X !== null) {
          var G = Y[1];
          if (aG(X, G))
            return Y[0];
        }
      }
      return Z.memoizedState = [J, X], J;
    }
    function zB(J, Q) {
      var Z = mJ(), X = Q === undefined ? null : Q, Y = J();
      return Z.memoizedState = [Y, X], Y;
    }
    function LZ(J, Q) {
      var Z = zJ(), X = Q === undefined ? null : Q, Y = Z.memoizedState;
      if (Y !== null) {
        if (X !== null) {
          var G = Y[1];
          if (aG(X, G))
            return Y[0];
        }
      }
      var B = J();
      return Z.memoizedState = [B, X], B;
    }
    function KB(J) {
      var Q = mJ();
      return Q.memoizedState = J, J;
    }
    function v3(J) {
      var Q = zJ(), Z = N1, X = Z.memoizedState;
      return C3(Q, X, J);
    }
    function g3(J) {
      var Q = zJ();
      if (N1 === null)
        return Q.memoizedState = J, J;
      else {
        var Z = N1.memoizedState;
        return C3(Q, Z, J);
      }
    }
    function C3(J, Q, Z) {
      var X = !Q$(v4);
      if (X) {
        if (!s8(Z, Q)) {
          var Y = Fz();
          d0.lanes = M0(d0.lanes, Y), T9(Y), J.baseState = true;
        }
        return Q;
      } else {
        if (J.baseState)
          J.baseState = false, E9();
        return J.memoizedState = Z, Z;
      }
    }
    function AM(J, Q, Z) {
      var X = AJ();
      y1(q$(X, zQ)), J(true);
      var Y = $9.transition;
      $9.transition = {};
      var G = $9.transition;
      $9.transition._updatedFibers = new Set;
      try {
        J(false), Q();
      } finally {
        if (y1(X), $9.transition = Y, Y === null && G._updatedFibers) {
          var B = G._updatedFibers.size;
          if (B > 10)
            r("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
          G._updatedFibers.clear();
        }
      }
    }
    function qB() {
      var J = MZ(false), Q = J[0], Z = J[1], X = AM.bind(null, Z), Y = mJ();
      return Y.memoizedState = X, [Q, X];
    }
    function T3() {
      var J = QB(), Q = J[0], Z = zJ(), X = Z.memoizedState;
      return [Q, X];
    }
    function k3() {
      var J = ZB(), Q = J[0], Z = zJ(), X = Z.memoizedState;
      return [Q, X];
    }
    var h3 = false;
    function PM() {
      return h3;
    }
    function UB() {
      var J = mJ(), Q = pZ(), Z = Q.identifierPrefix, X;
      if (r1()) {
        var Y = kj();
        X = ":" + Z + "R" + Y;
        var G = O9++;
        if (G > 0)
          X += "H" + G.toString(32);
        X += ":";
      } else {
        var B = jM++;
        X = ":" + Z + "r" + B.toString(32) + ":";
      }
      return J.memoizedState = X, X;
    }
    function NZ() {
      var J = zJ(), Q = J.memoizedState;
      return Q;
    }
    function FM(J, Q, Z) {
      if (typeof arguments[3] === "function")
        V("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var X = J4(J), Y = { lane: X, action: Z, hasEagerState: false, eagerState: null, next: null };
      if (b3(J))
        f3(Q, Y);
      else {
        var G = Q3(J, Q, Y, X);
        if (G !== null) {
          var B = w8();
          C1(G, J, X, B), u3(G, Q, X);
        }
      }
      d3(J, X);
    }
    function EM(J, Q, Z) {
      if (typeof arguments[3] === "function")
        V("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var X = J4(J), Y = { lane: X, action: Z, hasEagerState: false, eagerState: null, next: null };
      if (b3(J))
        f3(Q, Y);
      else {
        var G = J.alternate;
        if (J.lanes === N && (G === null || G.lanes === N)) {
          var B = Q.lastRenderedReducer;
          if (B !== null) {
            var W;
            W = d.current, d.current = IJ;
            try {
              var z = Q.lastRenderedState, q = B(z, Z);
              if (Y.hasEagerState = true, Y.eagerState = q, s8(q, z)) {
                QM(J, Q, Y, X);
                return;
              }
            } catch (O) {
            } finally {
              d.current = W;
            }
          }
        }
        var U = Q3(J, Q, Y, X);
        if (U !== null) {
          var j = w8();
          C1(U, J, X, j), u3(U, Q, X);
        }
      }
      d3(J, X);
    }
    function b3(J) {
      var Q = J.alternate;
      return J === d0 || Q !== null && Q === d0;
    }
    function f3(J, Q) {
      H9 = HZ = true;
      var Z = J.pending;
      if (Z === null)
        Q.next = Q;
      else
        Q.next = Z.next, Z.next = Q;
      J.pending = Q;
    }
    function u3(J, Q, Z) {
      if (Pz(Z)) {
        var X = Q.lanes;
        X = Ez(X, J.pendingLanes);
        var Y = M0(X, Z);
        Q.lanes = Y, MY(J, Y);
      }
    }
    function d3(J, Q, Z) {
      lX(J, Q);
    }
    var SZ = { readContext: P1, useCallback: V8, useContext: V8, useEffect: V8, useImperativeHandle: V8, useInsertionEffect: V8, useLayoutEffect: V8, useMemo: V8, useReducer: V8, useRef: V8, useState: V8, useDebugValue: V8, useDeferredValue: V8, useTransition: V8, useMutableSource: V8, useSyncExternalStore: V8, useId: V8, unstable_isNewReconciler: m1 }, y3 = null, m3 = null, c3 = null, s3 = null, cJ = null, IJ = null, xZ = null;
    {
      var VB = function() {
        V("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, q0 = function() {
        V("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      y3 = { readContext: function(J) {
        return P1(J);
      }, useCallback: function(J, Q) {
        return L = "useCallback", b0(), k6(Q), WB(J, Q);
      }, useContext: function(J) {
        return L = "useContext", b0(), P1(J);
      }, useEffect: function(J, Q) {
        return L = "useEffect", b0(), k6(Q), PZ(J, Q);
      }, useImperativeHandle: function(J, Q, Z) {
        return L = "useImperativeHandle", b0(), k6(Z), BB(J, Q, Z);
      }, useInsertionEffect: function(J, Q) {
        return L = "useInsertionEffect", b0(), k6(Q), YB(J, Q);
      }, useLayoutEffect: function(J, Q) {
        return L = "useLayoutEffect", b0(), k6(Q), GB(J, Q);
      }, useMemo: function(J, Q) {
        L = "useMemo", b0(), k6(Q);
        var Z = d.current;
        d.current = cJ;
        try {
          return zB(J, Q);
        } finally {
          d.current = Z;
        }
      }, useReducer: function(J, Q, Z) {
        L = "useReducer", b0();
        var X = d.current;
        d.current = cJ;
        try {
          return nG(J, Q, Z);
        } finally {
          d.current = X;
        }
      }, useRef: function(J) {
        return L = "useRef", b0(), XB(J);
      }, useState: function(J) {
        L = "useState", b0();
        var Q = d.current;
        d.current = cJ;
        try {
          return MZ(J);
        } finally {
          d.current = Q;
        }
      }, useDebugValue: function(J, Q) {
        return L = "useDebugValue", b0(), wZ();
      }, useDeferredValue: function(J) {
        return L = "useDeferredValue", b0(), KB(J);
      }, useTransition: function() {
        return L = "useTransition", b0(), qB();
      }, useMutableSource: function(J, Q, Z) {
        return L = "useMutableSource", b0(), eG();
      }, useSyncExternalStore: function(J, Q, Z) {
        return L = "useSyncExternalStore", b0(), JB(J, Q, Z);
      }, useId: function() {
        return L = "useId", b0(), UB();
      }, unstable_isNewReconciler: m1 }, m3 = { readContext: function(J) {
        return P1(J);
      }, useCallback: function(J, Q) {
        return L = "useCallback", C(), WB(J, Q);
      }, useContext: function(J) {
        return L = "useContext", C(), P1(J);
      }, useEffect: function(J, Q) {
        return L = "useEffect", C(), PZ(J, Q);
      }, useImperativeHandle: function(J, Q, Z) {
        return L = "useImperativeHandle", C(), BB(J, Q, Z);
      }, useInsertionEffect: function(J, Q) {
        return L = "useInsertionEffect", C(), YB(J, Q);
      }, useLayoutEffect: function(J, Q) {
        return L = "useLayoutEffect", C(), GB(J, Q);
      }, useMemo: function(J, Q) {
        L = "useMemo", C();
        var Z = d.current;
        d.current = cJ;
        try {
          return zB(J, Q);
        } finally {
          d.current = Z;
        }
      }, useReducer: function(J, Q, Z) {
        L = "useReducer", C();
        var X = d.current;
        d.current = cJ;
        try {
          return nG(J, Q, Z);
        } finally {
          d.current = X;
        }
      }, useRef: function(J) {
        return L = "useRef", C(), XB(J);
      }, useState: function(J) {
        L = "useState", C();
        var Q = d.current;
        d.current = cJ;
        try {
          return MZ(J);
        } finally {
          d.current = Q;
        }
      }, useDebugValue: function(J, Q) {
        return L = "useDebugValue", C(), wZ();
      }, useDeferredValue: function(J) {
        return L = "useDeferredValue", C(), KB(J);
      }, useTransition: function() {
        return L = "useTransition", C(), qB();
      }, useMutableSource: function(J, Q, Z) {
        return L = "useMutableSource", C(), eG();
      }, useSyncExternalStore: function(J, Q, Z) {
        return L = "useSyncExternalStore", C(), JB(J, Q, Z);
      }, useId: function() {
        return L = "useId", C(), UB();
      }, unstable_isNewReconciler: m1 }, c3 = { readContext: function(J) {
        return P1(J);
      }, useCallback: function(J, Q) {
        return L = "useCallback", C(), _Z(J, Q);
      }, useContext: function(J) {
        return L = "useContext", C(), P1(J);
      }, useEffect: function(J, Q) {
        return L = "useEffect", C(), D9(J, Q);
      }, useImperativeHandle: function(J, Q, Z) {
        return L = "useImperativeHandle", C(), RZ(J, Q, Z);
      }, useInsertionEffect: function(J, Q) {
        return L = "useInsertionEffect", C(), FZ(J, Q);
      }, useLayoutEffect: function(J, Q) {
        return L = "useLayoutEffect", C(), EZ(J, Q);
      }, useMemo: function(J, Q) {
        L = "useMemo", C();
        var Z = d.current;
        d.current = IJ;
        try {
          return LZ(J, Q);
        } finally {
          d.current = Z;
        }
      }, useReducer: function(J, Q, Z) {
        L = "useReducer", C();
        var X = d.current;
        d.current = IJ;
        try {
          return oG(J, Q, Z);
        } finally {
          d.current = X;
        }
      }, useRef: function(J) {
        return L = "useRef", C(), DZ();
      }, useState: function(J) {
        L = "useState", C();
        var Q = d.current;
        d.current = IJ;
        try {
          return QB(J);
        } finally {
          d.current = Q;
        }
      }, useDebugValue: function(J, Q) {
        return L = "useDebugValue", C(), IZ();
      }, useDeferredValue: function(J) {
        return L = "useDeferredValue", C(), v3(J);
      }, useTransition: function() {
        return L = "useTransition", C(), T3();
      }, useMutableSource: function(J, Q, Z) {
        return L = "useMutableSource", C(), OZ();
      }, useSyncExternalStore: function(J, Q, Z) {
        return L = "useSyncExternalStore", C(), jZ(J, Q);
      }, useId: function() {
        return L = "useId", C(), NZ();
      }, unstable_isNewReconciler: m1 }, s3 = { readContext: function(J) {
        return P1(J);
      }, useCallback: function(J, Q) {
        return L = "useCallback", C(), _Z(J, Q);
      }, useContext: function(J) {
        return L = "useContext", C(), P1(J);
      }, useEffect: function(J, Q) {
        return L = "useEffect", C(), D9(J, Q);
      }, useImperativeHandle: function(J, Q, Z) {
        return L = "useImperativeHandle", C(), RZ(J, Q, Z);
      }, useInsertionEffect: function(J, Q) {
        return L = "useInsertionEffect", C(), FZ(J, Q);
      }, useLayoutEffect: function(J, Q) {
        return L = "useLayoutEffect", C(), EZ(J, Q);
      }, useMemo: function(J, Q) {
        L = "useMemo", C();
        var Z = d.current;
        d.current = xZ;
        try {
          return LZ(J, Q);
        } finally {
          d.current = Z;
        }
      }, useReducer: function(J, Q, Z) {
        L = "useReducer", C();
        var X = d.current;
        d.current = xZ;
        try {
          return tG(J, Q, Z);
        } finally {
          d.current = X;
        }
      }, useRef: function(J) {
        return L = "useRef", C(), DZ();
      }, useState: function(J) {
        L = "useState", C();
        var Q = d.current;
        d.current = xZ;
        try {
          return ZB(J);
        } finally {
          d.current = Q;
        }
      }, useDebugValue: function(J, Q) {
        return L = "useDebugValue", C(), IZ();
      }, useDeferredValue: function(J) {
        return L = "useDeferredValue", C(), g3(J);
      }, useTransition: function() {
        return L = "useTransition", C(), k3();
      }, useMutableSource: function(J, Q, Z) {
        return L = "useMutableSource", C(), OZ();
      }, useSyncExternalStore: function(J, Q, Z) {
        return L = "useSyncExternalStore", C(), jZ(J, Q);
      }, useId: function() {
        return L = "useId", C(), NZ();
      }, unstable_isNewReconciler: m1 }, cJ = { readContext: function(J) {
        return VB(), P1(J);
      }, useCallback: function(J, Q) {
        return L = "useCallback", q0(), b0(), WB(J, Q);
      }, useContext: function(J) {
        return L = "useContext", q0(), b0(), P1(J);
      }, useEffect: function(J, Q) {
        return L = "useEffect", q0(), b0(), PZ(J, Q);
      }, useImperativeHandle: function(J, Q, Z) {
        return L = "useImperativeHandle", q0(), b0(), BB(J, Q, Z);
      }, useInsertionEffect: function(J, Q) {
        return L = "useInsertionEffect", q0(), b0(), YB(J, Q);
      }, useLayoutEffect: function(J, Q) {
        return L = "useLayoutEffect", q0(), b0(), GB(J, Q);
      }, useMemo: function(J, Q) {
        L = "useMemo", q0(), b0();
        var Z = d.current;
        d.current = cJ;
        try {
          return zB(J, Q);
        } finally {
          d.current = Z;
        }
      }, useReducer: function(J, Q, Z) {
        L = "useReducer", q0(), b0();
        var X = d.current;
        d.current = cJ;
        try {
          return nG(J, Q, Z);
        } finally {
          d.current = X;
        }
      }, useRef: function(J) {
        return L = "useRef", q0(), b0(), XB(J);
      }, useState: function(J) {
        L = "useState", q0(), b0();
        var Q = d.current;
        d.current = cJ;
        try {
          return MZ(J);
        } finally {
          d.current = Q;
        }
      }, useDebugValue: function(J, Q) {
        return L = "useDebugValue", q0(), b0(), wZ();
      }, useDeferredValue: function(J) {
        return L = "useDeferredValue", q0(), b0(), KB(J);
      }, useTransition: function() {
        return L = "useTransition", q0(), b0(), qB();
      }, useMutableSource: function(J, Q, Z) {
        return L = "useMutableSource", q0(), b0(), eG();
      }, useSyncExternalStore: function(J, Q, Z) {
        return L = "useSyncExternalStore", q0(), b0(), JB(J, Q, Z);
      }, useId: function() {
        return L = "useId", q0(), b0(), UB();
      }, unstable_isNewReconciler: m1 }, IJ = { readContext: function(J) {
        return VB(), P1(J);
      }, useCallback: function(J, Q) {
        return L = "useCallback", q0(), C(), _Z(J, Q);
      }, useContext: function(J) {
        return L = "useContext", q0(), C(), P1(J);
      }, useEffect: function(J, Q) {
        return L = "useEffect", q0(), C(), D9(J, Q);
      }, useImperativeHandle: function(J, Q, Z) {
        return L = "useImperativeHandle", q0(), C(), RZ(J, Q, Z);
      }, useInsertionEffect: function(J, Q) {
        return L = "useInsertionEffect", q0(), C(), FZ(J, Q);
      }, useLayoutEffect: function(J, Q) {
        return L = "useLayoutEffect", q0(), C(), EZ(J, Q);
      }, useMemo: function(J, Q) {
        L = "useMemo", q0(), C();
        var Z = d.current;
        d.current = IJ;
        try {
          return LZ(J, Q);
        } finally {
          d.current = Z;
        }
      }, useReducer: function(J, Q, Z) {
        L = "useReducer", q0(), C();
        var X = d.current;
        d.current = IJ;
        try {
          return oG(J, Q, Z);
        } finally {
          d.current = X;
        }
      }, useRef: function(J) {
        return L = "useRef", q0(), C(), DZ();
      }, useState: function(J) {
        L = "useState", q0(), C();
        var Q = d.current;
        d.current = IJ;
        try {
          return QB(J);
        } finally {
          d.current = Q;
        }
      }, useDebugValue: function(J, Q) {
        return L = "useDebugValue", q0(), C(), IZ();
      }, useDeferredValue: function(J) {
        return L = "useDeferredValue", q0(), C(), v3(J);
      }, useTransition: function() {
        return L = "useTransition", q0(), C(), T3();
      }, useMutableSource: function(J, Q, Z) {
        return L = "useMutableSource", q0(), C(), OZ();
      }, useSyncExternalStore: function(J, Q, Z) {
        return L = "useSyncExternalStore", q0(), C(), jZ(J, Q);
      }, useId: function() {
        return L = "useId", q0(), C(), NZ();
      }, unstable_isNewReconciler: m1 }, xZ = { readContext: function(J) {
        return VB(), P1(J);
      }, useCallback: function(J, Q) {
        return L = "useCallback", q0(), C(), _Z(J, Q);
      }, useContext: function(J) {
        return L = "useContext", q0(), C(), P1(J);
      }, useEffect: function(J, Q) {
        return L = "useEffect", q0(), C(), D9(J, Q);
      }, useImperativeHandle: function(J, Q, Z) {
        return L = "useImperativeHandle", q0(), C(), RZ(J, Q, Z);
      }, useInsertionEffect: function(J, Q) {
        return L = "useInsertionEffect", q0(), C(), FZ(J, Q);
      }, useLayoutEffect: function(J, Q) {
        return L = "useLayoutEffect", q0(), C(), EZ(J, Q);
      }, useMemo: function(J, Q) {
        L = "useMemo", q0(), C();
        var Z = d.current;
        d.current = IJ;
        try {
          return LZ(J, Q);
        } finally {
          d.current = Z;
        }
      }, useReducer: function(J, Q, Z) {
        L = "useReducer", q0(), C();
        var X = d.current;
        d.current = IJ;
        try {
          return tG(J, Q, Z);
        } finally {
          d.current = X;
        }
      }, useRef: function(J) {
        return L = "useRef", q0(), C(), DZ();
      }, useState: function(J) {
        L = "useState", q0(), C();
        var Q = d.current;
        d.current = IJ;
        try {
          return ZB(J);
        } finally {
          d.current = Q;
        }
      }, useDebugValue: function(J, Q) {
        return L = "useDebugValue", q0(), C(), IZ();
      }, useDeferredValue: function(J) {
        return L = "useDeferredValue", q0(), C(), g3(J);
      }, useTransition: function() {
        return L = "useTransition", q0(), C(), k3();
      }, useMutableSource: function(J, Q, Z) {
        return L = "useMutableSource", q0(), C(), OZ();
      }, useSyncExternalStore: function(J, Q, Z) {
        return L = "useSyncExternalStore", q0(), C(), jZ(J, Q);
      }, useId: function() {
        return L = "useId", q0(), C(), NZ();
      }, unstable_isNewReconciler: m1 };
    }
    var nQ = _.unstable_now, i3 = 0, vZ = -1, A9 = -1, gZ = -1, $B = false, CZ = false;
    function l3() {
      return $B;
    }
    function RM() {
      CZ = true;
    }
    function wM() {
      $B = false, CZ = false;
    }
    function IM() {
      $B = CZ, CZ = false;
    }
    function p3() {
      return i3;
    }
    function a3() {
      i3 = nQ();
    }
    function HB(J) {
      if (A9 = nQ(), J.actualStartTime < 0)
        J.actualStartTime = nQ();
    }
    function r3(J) {
      A9 = -1;
    }
    function TZ(J, Q) {
      if (A9 >= 0) {
        var Z = nQ() - A9;
        if (J.actualDuration += Z, Q)
          J.selfBaseDuration = Z;
        A9 = -1;
      }
    }
    function sJ(J) {
      if (vZ >= 0) {
        var Q = nQ() - vZ;
        vZ = -1;
        var Z = J.return;
        while (Z !== null) {
          switch (Z.tag) {
            case T:
              var X = Z.stateNode;
              X.effectDuration += Q;
              return;
            case m0:
              var Y = Z.stateNode;
              Y.effectDuration += Q;
              return;
          }
          Z = Z.return;
        }
      }
    }
    function OB(J) {
      if (gZ >= 0) {
        var Q = nQ() - gZ;
        gZ = -1;
        var Z = J.return;
        while (Z !== null) {
          switch (Z.tag) {
            case T:
              var X = Z.stateNode;
              if (X !== null)
                X.passiveEffectDuration += Q;
              return;
            case m0:
              var Y = Z.stateNode;
              if (Y !== null)
                Y.passiveEffectDuration += Q;
              return;
          }
          Z = Z.return;
        }
      }
    }
    function iJ() {
      vZ = nQ();
    }
    function jB() {
      gZ = nQ();
    }
    function MB(J) {
      var Q = J.child;
      while (Q)
        J.actualDuration += Q.actualDuration, Q = Q.sibling;
    }
    function g4(J, Q) {
      return { value: J, source: Q, stack: p9(Q), digest: null };
    }
    function DB(J, Q, Z) {
      return { value: J, source: null, stack: Z != null ? Z : null, digest: Q != null ? Q : null };
    }
    function _M(J, Q) {
      return true;
    }
    function AB(J, Q) {
      try {
        var Z = _M(J, Q);
        if (Z === false)
          return;
        var { value: X, source: Y, stack: G } = Q, B = G !== null ? G : "";
        if (X != null && X._suppressLogging) {
          if (J.tag === i)
            return;
          console.error(X);
        }
        var W = Y ? H0(Y) : null, z = W ? "The above error occurred in the <" + W + "> component:" : "The above error occurred in one of your React components:", q;
        if (J.tag === T)
          q = "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://reactjs.org/link/error-boundaries to learn more about error boundaries.";
        else {
          var U = H0(J) || "Anonymous";
          q = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + U + ".");
        }
        var j = z + "\n" + B + "\n\n" + ("" + q);
        console.error(j);
      } catch (O) {
        setTimeout(function() {
          throw O;
        });
      }
    }
    var LM = typeof WeakMap === "function" ? WeakMap : Map;
    function n3(J, Q, Z) {
      var X = OQ(Z1, Z);
      X.tag = DG, X.payload = { element: null };
      var Y = Q.value;
      return X.callback = function() {
        wA(Y), AB(J, Q);
      }, X;
    }
    function PB(J, Q, Z) {
      var X = OQ(Z1, Z);
      X.tag = DG;
      var Y = J.type.getDerivedStateFromError;
      if (typeof Y === "function") {
        var G = Q.value;
        X.payload = function() {
          return Y(G);
        }, X.callback = function() {
          zU(J), AB(J, Q);
        };
      }
      var B = J.stateNode;
      if (B !== null && typeof B.componentDidCatch === "function")
        X.callback = function W() {
          if (zU(J), AB(J, Q), typeof Y !== "function")
            EA(this);
          var { value: z, stack: q } = Q;
          if (this.componentDidCatch(z, { componentStack: q !== null ? q : "" }), typeof Y !== "function") {
            if (!y8(J.lanes, K0))
              V("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", H0(J) || "Unknown");
          }
        };
      return X;
    }
    function o3(J, Q, Z) {
      var X = J.pingCache, Y;
      if (X === null)
        X = J.pingCache = new LM, Y = new Set, X.set(Q, Y);
      else if (Y = X.get(Q), Y === undefined)
        Y = new Set, X.set(Q, Y);
      if (!Y.has(Z)) {
        Y.add(Z);
        var G = IA.bind(null, J, Q, Z);
        if (DJ)
          k9(J, Z);
        Q.then(G, G);
      }
    }
    function NM(J, Q, Z, X) {
      var Y = J.updateQueue;
      if (Y === null) {
        var G = new Set;
        G.add(Z), J.updateQueue = G;
      } else
        Y.add(Z);
    }
    function SM(J, Q) {
      var Z = J.tag;
      if ((J.mode & I0) === X0 && (Z === t || Z === Y0 || Z === v0)) {
        var X = J.alternate;
        if (X)
          J.updateQueue = X.updateQueue, J.memoizedState = X.memoizedState, J.lanes = X.lanes;
        else
          J.updateQueue = null, J.memoizedState = null;
      }
    }
    function t3(J) {
      var Q = J;
      do {
        if (Q.tag === A0 && HM(Q))
          return Q;
        Q = Q.return;
      } while (Q !== null);
      return null;
    }
    function e3(J, Q, Z, X, Y) {
      if ((J.mode & I0) === X0) {
        if (J === Q)
          J.flags |= F8;
        else {
          if (J.flags |= k0, Z.flags |= uX, Z.flags &= ~(q2 | A7), Z.tag === i) {
            var G = Z.alternate;
            if (G === null)
              Z.tag = i0;
            else {
              var B = OQ(Z1, K0);
              B.tag = ZZ, lQ(Z, B, K0);
            }
          }
          Z.lanes = M0(Z.lanes, K0);
        }
        return J;
      }
      return J.flags |= F8, J.lanes = Y, J;
    }
    function xM(J, Q, Z, X, Y) {
      if (Z.flags |= A7, DJ)
        k9(J, Y);
      if (X !== null && typeof X === "object" && typeof X.then === "function") {
        var G = X;
        if (SM(Z), r1() && Z.mode & I0)
          cK();
        var B = t3(Q);
        if (B !== null) {
          if (B.flags &= ~XQ, e3(B, Q, Z, J, Y), B.mode & I0)
            o3(J, G, Y);
          NM(B, J, G);
          return;
        } else {
          if (!J$(Y)) {
            o3(J, G, Y), JW();
            return;
          }
          var W = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          X = W;
        }
      } else if (r1() && Z.mode & I0) {
        cK();
        var z = t3(Q);
        if (z !== null) {
          if ((z.flags & F8) === Z0)
            z.flags |= XQ;
          e3(z, Q, Z, J, Y), UG(g4(X, Z));
          return;
        }
      }
      X = g4(X, Z), HA(X);
      var q = Q;
      do {
        switch (q.tag) {
          case T: {
            var U = X;
            q.flags |= F8;
            var j = L7(Y);
            q.lanes = M0(q.lanes, j);
            var O = n3(q, U, j);
            FG(q, O);
            return;
          }
          case i:
            var F = X, A = q.type, R = q.stateNode;
            if ((q.flags & k0) === Z0 && (typeof A.getDerivedStateFromError === "function" || R !== null && typeof R.componentDidCatch === "function" && !eq(R))) {
              q.flags |= F8;
              var u = L7(Y);
              q.lanes = M0(q.lanes, u);
              var o = PB(q, F, u);
              FG(q, o);
              return;
            }
            break;
        }
        q = q.return;
      } while (q !== null);
    }
    function vM() {
      return null;
    }
    var P9 = v.ReactCurrentOwner, _J = false, FB, F9, EB, RB, wB, C4, IB, kZ;
    FB = {}, F9 = {}, EB = {}, RB = {}, wB = {}, C4 = false, IB = {}, kZ = {};
    function E8(J, Q, Z, X) {
      if (J === null)
        Q.child = M3(Q, null, Z, X);
      else
        Q.child = x6(Q, J.child, Z, X);
    }
    function gM(J, Q, Z, X) {
      Q.child = x6(Q, J.child, null, X), Q.child = x6(Q, null, Z, X);
    }
    function Jq(J, Q, Z, X, Y) {
      if (Q.type !== Q.elementType) {
        var G = Z.propTypes;
        if (G)
          PJ(G, X, "prop", s0(Z));
      }
      var B = Z.render, W = Q.ref, z, q;
      S6(Q, Y), F7(Q);
      {
        if (P9.current = Q, XJ(true), z = h6(J, Q, B, X, W, Y), q = b6(), Q.mode & A1) {
          u1(true);
          try {
            z = h6(J, Q, B, X, W, Y), q = b6();
          } finally {
            u1(false);
          }
        }
        XJ(false);
      }
      if (K6(), J !== null && !_J)
        return E3(J, Q, Y), jQ(J, Q, Y);
      if (r1() && q)
        GG(Q);
      return Q.flags |= W6, E8(J, Q, z, Y), Q.child;
    }
    function Qq(J, Q, Z, X, Y) {
      if (J === null) {
        var G = Z.type;
        if (mA(G) && Z.compare === null && Z.defaultProps === undefined) {
          var B = G;
          return B = i6(G), Q.tag = v0, Q.type = B, NB(Q, G), Zq(J, Q, B, X, Y);
        }
        {
          var W = G.propTypes;
          if (W)
            PJ(W, X, "prop", s0(G));
        }
        var z = UW(Z.type, null, X, Q, Q.mode, Y);
        return z.ref = Q.ref, z.return = Q, Q.child = z, z;
      }
      {
        var q = Z.type, U = q.propTypes;
        if (U)
          PJ(U, X, "prop", s0(q));
      }
      var j = J.child, O = TB(J, Y);
      if (!O) {
        var F = j.memoizedProps, A = Z.compare;
        if (A = A !== null ? A : m7, A(F, X) && J.ref === Q.ref)
          return jQ(J, Q, Y);
      }
      Q.flags |= W6;
      var R = f4(j, X);
      return R.ref = Q.ref, R.return = Q, Q.child = R, R;
    }
    function Zq(J, Q, Z, X, Y) {
      if (Q.type !== Q.elementType) {
        var G = Q.elementType;
        if (G.$$typeof === E0) {
          var B = G, W = B._payload, z = B._init;
          try {
            G = z(W);
          } catch (j) {
            G = null;
          }
          var q = G && G.propTypes;
          if (q)
            PJ(q, X, "prop", s0(G));
        }
      }
      if (J !== null) {
        var U = J.memoizedProps;
        if (m7(U, X) && J.ref === Q.ref && Q.type === J.type) {
          if (_J = false, Q.pendingProps = X = U, !TB(J, Y))
            return Q.lanes = J.lanes, jQ(J, Q, Y);
          else if ((J.flags & uX) !== Z0)
            _J = true;
        }
      }
      return _B(J, Q, Z, X, Y);
    }
    function Xq(J, Q, Z) {
      var X = Q.pendingProps, Y = X.children, G = J !== null ? J.memoizedState : null;
      if (X.mode === "hidden" || Y8)
        if ((Q.mode & I0) === X0) {
          var B = { baseLanes: N, cachePool: null, transitions: null };
          Q.memoizedState = B, aZ(Q, Z);
        } else if (!y8(Z, d8)) {
          var W = null, z;
          if (G !== null) {
            var q = G.baseLanes;
            z = M0(q, Z);
          } else
            z = Z;
          Q.lanes = Q.childLanes = H5(d8);
          var U = { baseLanes: z, cachePool: W, transitions: null };
          return Q.memoizedState = U, Q.updateQueue = null, aZ(Q, z), null;
        } else {
          var j = { baseLanes: N, cachePool: null, transitions: null };
          Q.memoizedState = j;
          var O = G !== null ? G.baseLanes : Z;
          aZ(Q, O);
        }
      else {
        var F;
        if (G !== null)
          F = M0(G.baseLanes, Z), Q.memoizedState = null;
        else
          F = Z;
        aZ(Q, F);
      }
      return E8(J, Q, Y, Z), Q.child;
    }
    function CM(J, Q, Z) {
      var X = Q.pendingProps;
      return E8(J, Q, X, Z), Q.child;
    }
    function TM(J, Q, Z) {
      var X = Q.pendingProps.children;
      return E8(J, Q, X, Z), Q.child;
    }
    function kM(J, Q, Z) {
      {
        Q.flags |= x0;
        {
          var X = Q.stateNode;
          X.effectDuration = 0, X.passiveEffectDuration = 0;
        }
      }
      var Y = Q.pendingProps, G = Y.children;
      return E8(J, Q, G, Z), Q.child;
    }
    function Yq(J, Q) {
      var Z = Q.ref;
      if (J === null && Z !== null || J !== null && J.ref !== Z)
        Q.flags |= TQ, Q.flags |= dX;
    }
    function _B(J, Q, Z, X, Y) {
      if (Q.type !== Q.elementType) {
        var G = Z.propTypes;
        if (G)
          PJ(G, X, "prop", s0(Z));
      }
      var B;
      {
        var W = R6(Q, Z, true);
        B = w6(Q, W);
      }
      var z, q;
      S6(Q, Y), F7(Q);
      {
        if (P9.current = Q, XJ(true), z = h6(J, Q, Z, X, B, Y), q = b6(), Q.mode & A1) {
          u1(true);
          try {
            z = h6(J, Q, Z, X, B, Y), q = b6();
          } finally {
            u1(false);
          }
        }
        XJ(false);
      }
      if (K6(), J !== null && !_J)
        return E3(J, Q, Y), jQ(J, Q, Y);
      if (r1() && q)
        GG(Q);
      return Q.flags |= W6, E8(J, Q, z, Y), Q.child;
    }
    function Gq(J, Q, Z, X, Y) {
      {
        switch (XP(Q)) {
          case false: {
            var { stateNode: G, type: B } = Q, W = new B(Q.memoizedProps, G.context), z = W.state;
            G.updater.enqueueSetState(G, z, null);
            break;
          }
          case true: {
            Q.flags |= k0, Q.flags |= F8;
            var q = new Error("Simulated error coming from DevTools"), U = L7(Y);
            Q.lanes = M0(Q.lanes, U);
            var j = PB(Q, g4(q, Q), U);
            FG(Q, j);
            break;
          }
        }
        if (Q.type !== Q.elementType) {
          var O = Z.propTypes;
          if (O)
            PJ(O, X, "prop", s0(Z));
        }
      }
      var F;
      if (dJ(Z))
        F = true, i5(Q);
      else
        F = false;
      S6(Q, Y);
      var A = Q.stateNode, R;
      if (A === null)
        bZ(J, Q), V3(Q, Z, X), CG(Q, Z, X, Y), R = true;
      else if (J === null)
        R = zM(Q, Z, X, Y);
      else
        R = KM(J, Q, Z, X, Y);
      var u = LB(J, Q, Z, R, F, Y);
      {
        var o = Q.stateNode;
        if (R && o.props !== X) {
          if (!C4)
            V("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", H0(Q) || "a component");
          C4 = true;
        }
      }
      return u;
    }
    function LB(J, Q, Z, X, Y, G) {
      Yq(J, Q);
      var B = (Q.flags & k0) !== Z0;
      if (!X && !B) {
        if (Y)
          uK(Q, Z, false);
        return jQ(J, Q, G);
      }
      var W = Q.stateNode;
      P9.current = Q;
      var z;
      if (B && typeof Z.getDerivedStateFromError !== "function")
        z = null, r3();
      else {
        F7(Q);
        {
          if (XJ(true), z = W.render(), Q.mode & A1) {
            u1(true);
            try {
              W.render();
            } finally {
              u1(false);
            }
          }
          XJ(false);
        }
        K6();
      }
      if (Q.flags |= W6, J !== null && B)
        gM(J, Q, z, G);
      else
        E8(J, Q, z, G);
      if (Q.memoizedState = W.state, Y)
        uK(Q, Z, true);
      return Q.child;
    }
    function Bq(J) {
      var Q = J.stateNode;
      if (Q.pendingContext)
        bK(J, Q.pendingContext, Q.pendingContext !== Q.context);
      else if (Q.context)
        bK(J, Q.context, false);
      uG(J, Q.containerInfo);
    }
    function hM(J, Q, Z) {
      if (Bq(Q), J === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var { pendingProps: X, memoizedState: Y } = Q, G = Y.element;
      Y3(J, Q), BZ(Q, X, null, Z);
      var { memoizedState: B, stateNode: W } = Q, z = B.element;
      if (Y.isDehydrated) {
        var q = { element: z, isDehydrated: false, cache: B.cache, pendingSuspenseBoundaries: B.pendingSuspenseBoundaries, transitions: B.transitions }, U = Q.updateQueue;
        if (U.baseState = q, Q.memoizedState = q, Q.flags & XQ) {
          var j = g4(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), Q);
          return Wq(J, Q, z, Z, j);
        } else if (z !== G) {
          var O = g4(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), Q);
          return Wq(J, Q, z, Z, O);
        } else {
          yj(Q);
          var F = M3(Q, null, z, Z);
          Q.child = F;
          var A = F;
          while (A)
            A.flags = A.flags & ~D1 | YQ, A = A.sibling;
        }
      } else {
        if (L6(), z === G)
          return jQ(J, Q, Z);
        E8(J, Q, z, Z);
      }
      return Q.child;
    }
    function Wq(J, Q, Z, X, Y) {
      return L6(), UG(Y), Q.flags |= XQ, E8(J, Q, Z, X), Q.child;
    }
    function bM(J, Q, Z) {
      if (A3(Q), J === null)
        qG(Q);
      var { type: X, pendingProps: Y } = Q, G = J !== null ? J.memoizedProps : null, B = Y.children, W = lY(X, Y);
      if (W)
        B = null;
      else if (G !== null && lY(X, G))
        Q.flags |= D7;
      return Yq(J, Q), E8(J, Q, B, Z), Q.child;
    }
    function fM(J, Q) {
      if (J === null)
        qG(Q);
      return null;
    }
    function uM(J, Q, Z, X) {
      bZ(J, Q);
      var Y = Q.pendingProps, G = Z, B = G._payload, W = G._init, z = W(B);
      Q.type = z;
      var q = Q.tag = cA(z), U = RJ(z, Y), j;
      switch (q) {
        case t:
          return NB(Q, z), Q.type = z = i6(z), j = _B(null, Q, z, U, X), j;
        case i:
          return Q.type = z = GW(z), j = Gq(null, Q, z, U, X), j;
        case Y0:
          return Q.type = z = BW(z), j = Jq(null, Q, z, U, X), j;
        case K1: {
          if (Q.type !== Q.elementType) {
            var O = z.propTypes;
            if (O)
              PJ(O, U, "prop", s0(z));
          }
          return j = Qq(null, Q, z, RJ(z.type, U), X), j;
        }
      }
      var F = "";
      if (z !== null && typeof z === "object" && z.$$typeof === E0)
        F = " Did you wrap a component in React.lazy() more than once?";
      throw new Error("Element type is invalid. Received a promise that resolves to: " + z + ". " + ("Lazy element type must resolve to a class or function." + F));
    }
    function dM(J, Q, Z, X, Y) {
      bZ(J, Q), Q.tag = i;
      var G;
      if (dJ(Z))
        G = true, i5(Q);
      else
        G = false;
      return S6(Q, Y), V3(Q, Z, X), CG(Q, Z, X, Y), LB(null, Q, Z, true, G, Y);
    }
    function yM(J, Q, Z, X) {
      bZ(J, Q);
      var Y = Q.pendingProps, G;
      {
        var B = R6(Q, Z, false);
        G = w6(Q, B);
      }
      S6(Q, X);
      var W, z;
      F7(Q);
      {
        if (Z.prototype && typeof Z.prototype.render === "function") {
          var q = s0(Z) || "Unknown";
          if (!FB[q])
            V("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", q, q), FB[q] = true;
        }
        if (Q.mode & A1)
          EJ.recordLegacyContextWarning(Q, null);
        XJ(true), P9.current = Q, W = h6(null, Q, Z, Y, G, X), z = b6(), XJ(false);
      }
      if (K6(), Q.flags |= W6, typeof W === "object" && W !== null && typeof W.render === "function" && W.$$typeof === undefined) {
        var U = s0(Z) || "Unknown";
        if (!F9[U])
          V("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", U, U, U), F9[U] = true;
      }
      if (typeof W === "object" && W !== null && typeof W.render === "function" && W.$$typeof === undefined) {
        {
          var j = s0(Z) || "Unknown";
          if (!F9[j])
            V("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", j, j, j), F9[j] = true;
        }
        Q.tag = i, Q.memoizedState = null, Q.updateQueue = null;
        var O = false;
        if (dJ(Z))
          O = true, i5(Q);
        else
          O = false;
        return Q.memoizedState = W.state !== null && W.state !== undefined ? W.state : null, PG(Q), U3(Q, W), CG(Q, Z, Y, X), LB(null, Q, Z, true, O, X);
      } else {
        if (Q.tag = t, Q.mode & A1) {
          u1(true);
          try {
            W = h6(null, Q, Z, Y, G, X), z = b6();
          } finally {
            u1(false);
          }
        }
        if (r1() && z)
          GG(Q);
        return E8(null, Q, W, X), NB(Q, Z), Q.child;
      }
    }
    function NB(J, Q) {
      {
        if (Q) {
          if (Q.childContextTypes)
            V("%s(...): childContextTypes cannot be defined on a function component.", Q.displayName || Q.name || "Component");
        }
        if (J.ref !== null) {
          var Z = "", X = gQ();
          if (X)
            Z += "\n\nCheck the render method of `" + X + "`.";
          var Y = X || "", G = J._debugSource;
          if (G)
            Y = G.fileName + ":" + G.lineNumber;
          if (!wB[Y])
            wB[Y] = true, V("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", Z);
        }
        if (typeof Q.getDerivedStateFromProps === "function") {
          var B = s0(Q) || "Unknown";
          if (!RB[B])
            V("%s: Function components do not support getDerivedStateFromProps.", B), RB[B] = true;
        }
        if (typeof Q.contextType === "object" && Q.contextType !== null) {
          var W = s0(Q) || "Unknown";
          if (!EB[W])
            V("%s: Function components do not support contextType.", W), EB[W] = true;
        }
      }
    }
    var SB = { dehydrated: null, treeContext: null, retryLane: d1 };
    function xB(J) {
      return { baseLanes: J, cachePool: vM(), transitions: null };
    }
    function mM(J, Q) {
      var Z = null;
      return { baseLanes: M0(J.baseLanes, Q), cachePool: Z, transitions: J.transitions };
    }
    function cM(J, Q, Z, X) {
      if (Q !== null) {
        var Y = Q.memoizedState;
        if (Y === null)
          return false;
      }
      return mG(J, V9);
    }
    function sM(J, Q) {
      return $5(J.childLanes, Q);
    }
    function zq(J, Q, Z) {
      var X = Q.pendingProps;
      if (YP(Q))
        Q.flags |= k0;
      var Y = wJ.current, G = false, B = (Q.flags & k0) !== Z0;
      if (B || cM(Y, J))
        G = true, Q.flags &= ~k0;
      else if (J === null || J.memoizedState !== null)
        Y = $M(Y, F3);
      if (Y = g6(Y), aQ(Q, Y), J === null) {
        qG(Q);
        var W = Q.memoizedState;
        if (W !== null) {
          var z = W.dehydrated;
          if (z !== null)
            return rM(Q, z);
        }
        var { children: q, fallback: U } = X;
        if (G) {
          var j = iM(Q, q, U, Z), O = Q.child;
          return O.memoizedState = xB(Z), Q.memoizedState = SB, j;
        } else
          return vB(Q, q);
      } else {
        var F = J.memoizedState;
        if (F !== null) {
          var A = F.dehydrated;
          if (A !== null)
            return nM(J, Q, B, X, A, F, Z);
        }
        if (G) {
          var { fallback: R, children: u } = X, o = pM(J, Q, u, R, Z), a = Q.child, P0 = J.child.memoizedState;
          return a.memoizedState = P0 === null ? xB(Z) : mM(P0, Z), a.childLanes = sM(J, Z), Q.memoizedState = SB, o;
        } else {
          var F0 = X.children, M = lM(J, Q, F0, Z);
          return Q.memoizedState = null, M;
        }
      }
    }
    function vB(J, Q, Z) {
      var X = J.mode, Y = { mode: "visible", children: Q }, G = gB(Y, X);
      return G.return = J, J.child = G, G;
    }
    function iM(J, Q, Z, X) {
      var { mode: Y, child: G } = J, B = { mode: "hidden", children: Q }, W, z;
      if ((Y & I0) === X0 && G !== null) {
        if (W = G, W.childLanes = N, W.pendingProps = B, J.mode & u0)
          W.actualDuration = 0, W.actualStartTime = -1, W.selfBaseDuration = 0, W.treeBaseDuration = 0;
        z = Z4(Z, Y, X, null);
      } else
        W = gB(B, Y), z = Z4(Z, Y, X, null);
      return W.return = J, z.return = J, W.sibling = z, J.child = W, z;
    }
    function gB(J, Q, Z) {
      return qU(J, Q, N, null);
    }
    function Kq(J, Q) {
      return f4(J, Q);
    }
    function lM(J, Q, Z, X) {
      var Y = J.child, G = Y.sibling, B = Kq(Y, { mode: "visible", children: Z });
      if ((Q.mode & I0) === X0)
        B.lanes = X;
      if (B.return = Q, B.sibling = null, G !== null) {
        var W = Q.deletions;
        if (W === null)
          Q.deletions = [G], Q.flags |= q4;
        else
          W.push(G);
      }
      return Q.child = B, B;
    }
    function pM(J, Q, Z, X, Y) {
      var G = Q.mode, B = J.child, W = B.sibling, z = { mode: "hidden", children: Z }, q;
      if ((G & I0) === X0 && Q.child !== B) {
        var U = Q.child;
        if (q = U, q.childLanes = N, q.pendingProps = z, Q.mode & u0)
          q.actualDuration = 0, q.actualStartTime = -1, q.selfBaseDuration = B.selfBaseDuration, q.treeBaseDuration = B.treeBaseDuration;
        Q.deletions = null;
      } else
        q = Kq(B, z), q.subtreeFlags = B.subtreeFlags & BQ;
      var j;
      if (W !== null)
        j = f4(W, X);
      else
        j = Z4(X, G, Y, null), j.flags |= D1;
      return j.return = Q, q.return = Q, q.sibling = j, Q.child = q, j;
    }
    function hZ(J, Q, Z, X) {
      if (X !== null)
        UG(X);
      x6(Q, J.child, null, Z);
      var Y = Q.pendingProps, G = Y.children, B = vB(Q, G);
      return B.flags |= D1, Q.memoizedState = null, B;
    }
    function aM(J, Q, Z, X, Y) {
      var G = Q.mode, B = { mode: "visible", children: Z }, W = gB(B, G), z = Z4(X, G, Y, null);
      if (z.flags |= D1, W.return = Q, z.return = Q, W.sibling = z, Q.child = W, (Q.mode & I0) !== X0)
        x6(Q, J.child, null, Y);
      return z;
    }
    function rM(J, Q, Z) {
      if ((J.mode & I0) === X0)
        V("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), J.lanes = H5(K0);
      else if (nY(Q))
        J.lanes = H5(M4);
      else
        J.lanes = H5(d8);
      return null;
    }
    function nM(J, Q, Z, X, Y, G, B) {
      if (!Z) {
        if (uj(), (Q.mode & I0) === X0)
          return hZ(J, Q, B, null);
        if (nY(Y)) {
          var W, z, q;
          {
            var U = Zj(Y);
            W = U.digest, z = U.message, q = U.stack;
          }
          var j;
          if (z)
            j = new Error(z);
          else
            j = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var O = DB(j, W, q);
          return hZ(J, Q, B, O);
        }
        var F = y8(B, J.childLanes);
        if (_J || F) {
          var A = pZ();
          if (A !== null) {
            var R = z$(A, B);
            if (R !== d1 && R !== G.retryLane) {
              G.retryLane = R;
              var u = Z1;
              g8(J, R), C1(A, J, R, u);
            }
          }
          JW();
          var o = DB(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return hZ(J, Q, B, o);
        } else if (xK(Y)) {
          Q.flags |= k0, Q.child = J.child;
          var a = _A.bind(null, J);
          return Xj(Y, a), null;
        } else {
          mj(Q, Y, G.treeContext);
          var P0 = X.children, F0 = vB(Q, P0);
          return F0.flags |= YQ, F0;
        }
      } else if (Q.flags & XQ) {
        Q.flags &= ~XQ;
        var M = DB(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return hZ(J, Q, B, M);
      } else if (Q.memoizedState !== null)
        return Q.child = J.child, Q.flags |= k0, null;
      else {
        var { children: I, fallback: D } = X, x = aM(J, Q, I, D, B), y = Q.child;
        return y.memoizedState = xB(B), Q.memoizedState = SB, x;
      }
    }
    function qq(J, Q, Z) {
      J.lanes = M0(J.lanes, Q);
      var X = J.alternate;
      if (X !== null)
        X.lanes = M0(X.lanes, Q);
      jG(J.return, Q, Z);
    }
    function oM(J, Q, Z) {
      var X = Q;
      while (X !== null) {
        if (X.tag === A0) {
          var Y = X.memoizedState;
          if (Y !== null)
            qq(X, Z, J);
        } else if (X.tag === R1)
          qq(X, Z, J);
        else if (X.child !== null) {
          X.child.return = X, X = X.child;
          continue;
        }
        if (X === J)
          return;
        while (X.sibling === null) {
          if (X.return === null || X.return === J)
            return;
          X = X.return;
        }
        X.sibling.return = X.return, X = X.sibling;
      }
    }
    function tM(J) {
      var Q = J, Z = null;
      while (Q !== null) {
        var X = Q.alternate;
        if (X !== null && $Z(X) === null)
          Z = Q;
        Q = Q.sibling;
      }
      return Z;
    }
    function eM(J) {
      if (J !== undefined && J !== "forwards" && J !== "backwards" && J !== "together" && !IB[J])
        if (IB[J] = true, typeof J === "string")
          switch (J.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              V('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', J, J.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              V('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', J, J.toLowerCase());
              break;
            }
            default:
              V('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', J);
              break;
          }
        else
          V('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', J);
    }
    function JD(J, Q) {
      if (J !== undefined && !kZ[J]) {
        if (J !== "collapsed" && J !== "hidden")
          kZ[J] = true, V('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', J);
        else if (Q !== "forwards" && Q !== "backwards")
          kZ[J] = true, V('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', J);
      }
    }
    function Uq(J, Q) {
      {
        var Z = I1(J), X = !Z && typeof oJ(J) === "function";
        if (Z || X) {
          var Y = Z ? "array" : "iterable";
          return V("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", Y, Q, Y), false;
        }
      }
      return true;
    }
    function QD(J, Q) {
      if ((Q === "forwards" || Q === "backwards") && J !== undefined && J !== null && J !== false)
        if (I1(J)) {
          for (var Z = 0;Z < J.length; Z++)
            if (!Uq(J[Z], Z))
              return;
        } else {
          var X = oJ(J);
          if (typeof X === "function") {
            var Y = X.call(J);
            if (Y) {
              var G = Y.next(), B = 0;
              for (;!G.done; G = Y.next()) {
                if (!Uq(G.value, B))
                  return;
                B++;
              }
            }
          } else
            V('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', Q);
        }
    }
    function CB(J, Q, Z, X, Y) {
      var G = J.memoizedState;
      if (G === null)
        J.memoizedState = { isBackwards: Q, rendering: null, renderingStartTime: 0, last: X, tail: Z, tailMode: Y };
      else
        G.isBackwards = Q, G.rendering = null, G.renderingStartTime = 0, G.last = X, G.tail = Z, G.tailMode = Y;
    }
    function Vq(J, Q, Z) {
      var X = Q.pendingProps, Y = X.revealOrder, G = X.tail, B = X.children;
      eM(Y), JD(G, Y), QD(B, Y), E8(J, Q, B, Z);
      var W = wJ.current, z = mG(W, V9);
      if (z)
        W = cG(W, V9), Q.flags |= k0;
      else {
        var q = J !== null && (J.flags & k0) !== Z0;
        if (q)
          oM(Q, Q.child, Z);
        W = g6(W);
      }
      if (aQ(Q, W), (Q.mode & I0) === X0)
        Q.memoizedState = null;
      else
        switch (Y) {
          case "forwards": {
            var U = tM(Q.child), j;
            if (U === null)
              j = Q.child, Q.child = null;
            else
              j = U.sibling, U.sibling = null;
            CB(Q, false, j, U, G);
            break;
          }
          case "backwards": {
            var O = null, F = Q.child;
            Q.child = null;
            while (F !== null) {
              var A = F.alternate;
              if (A !== null && $Z(A) === null) {
                Q.child = F;
                break;
              }
              var R = F.sibling;
              F.sibling = O, O = F, F = R;
            }
            CB(Q, true, O, null, G);
            break;
          }
          case "together": {
            CB(Q, false, null, null, undefined);
            break;
          }
          default:
            Q.memoizedState = null;
        }
      return Q.child;
    }
    function ZD(J, Q, Z) {
      uG(Q, Q.stateNode.containerInfo);
      var X = Q.pendingProps;
      if (J === null)
        Q.child = x6(Q, null, X, Z);
      else
        E8(J, Q, X, Z);
      return Q.child;
    }
    var $q = false;
    function XD(J, Q, Z) {
      var X = Q.type, Y = X._context, G = Q.pendingProps, B = Q.memoizedProps, W = G.value;
      {
        if (!("value" in G)) {
          if (!$q)
            $q = true, V("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?");
        }
        var z = Q.type.propTypes;
        if (z)
          PJ(z, G, "prop", "Context.Provider");
      }
      if (J3(Q, Y, W), B !== null) {
        var q = B.value;
        if (s8(q, W)) {
          if (B.children === G.children && !c5())
            return jQ(J, Q, Z);
        } else
          tj(Q, Y, Z);
      }
      var U = G.children;
      return E8(J, Q, U, Z), Q.child;
    }
    var Hq = false;
    function YD(J, Q, Z) {
      var X = Q.type;
      if (X._context === undefined) {
        if (X !== X.Consumer) {
          if (!Hq)
            Hq = true, V("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
        }
      } else
        X = X._context;
      var Y = Q.pendingProps, G = Y.children;
      if (typeof G !== "function")
        V("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it.");
      S6(Q, Z);
      var B = P1(X);
      F7(Q);
      var W;
      return P9.current = Q, XJ(true), W = G(B), XJ(false), K6(), Q.flags |= W6, E8(J, Q, W, Z), Q.child;
    }
    function E9() {
      _J = true;
    }
    function bZ(J, Q) {
      if ((Q.mode & I0) === X0) {
        if (J !== null)
          J.alternate = null, Q.alternate = null, Q.flags |= D1;
      }
    }
    function jQ(J, Q, Z) {
      if (J !== null)
        Q.dependencies = J.dependencies;
      if (r3(), T9(Q.lanes), !y8(Z, Q.childLanes))
        return null;
      return qM(J, Q), Q.child;
    }
    function GD(J, Q, Z) {
      {
        var X = Q.return;
        if (X === null)
          throw new Error("Cannot swap the root fiber.");
        if (J.alternate = null, Q.alternate = null, Z.index = Q.index, Z.sibling = Q.sibling, Z.return = Q.return, Z.ref = Q.ref, Q === X.child)
          X.child = Z;
        else {
          var Y = X.child;
          if (Y === null)
            throw new Error("Expected parent to have a child.");
          while (Y.sibling !== Q)
            if (Y = Y.sibling, Y === null)
              throw new Error("Expected to find the previous sibling.");
          Y.sibling = Z;
        }
        var G = X.deletions;
        if (G === null)
          X.deletions = [J], X.flags |= q4;
        else
          G.push(J);
        return Z.flags |= D1, Z;
      }
    }
    function TB(J, Q) {
      var Z = J.lanes;
      if (y8(Z, Q))
        return true;
      return false;
    }
    function BD(J, Q, Z) {
      switch (Q.tag) {
        case T:
          Bq(Q);
          var X = Q.stateNode;
          L6();
          break;
        case c:
          A3(Q);
          break;
        case i: {
          var Y = Q.type;
          if (dJ(Y))
            i5(Q);
          break;
        }
        case e:
          uG(Q, Q.stateNode.containerInfo);
          break;
        case N0: {
          var G = Q.memoizedProps.value, B = Q.type._context;
          J3(Q, B, G);
          break;
        }
        case m0:
          {
            var W = y8(Z, Q.childLanes);
            if (W)
              Q.flags |= x0;
            {
              var z = Q.stateNode;
              z.effectDuration = 0, z.passiveEffectDuration = 0;
            }
          }
          break;
        case A0: {
          var q = Q.memoizedState;
          if (q !== null) {
            if (q.dehydrated !== null)
              return aQ(Q, g6(wJ.current)), Q.flags |= k0, null;
            var U = Q.child, j = U.childLanes;
            if (y8(Z, j))
              return zq(J, Q, Z);
            else {
              aQ(Q, g6(wJ.current));
              var O = jQ(J, Q, Z);
              if (O !== null)
                return O.sibling;
              else
                return null;
            }
          } else
            aQ(Q, g6(wJ.current));
          break;
        }
        case R1: {
          var F = (J.flags & k0) !== Z0, A = y8(Z, Q.childLanes);
          if (F) {
            if (A)
              return Vq(J, Q, Z);
            Q.flags |= k0;
          }
          var R = Q.memoizedState;
          if (R !== null)
            R.rendering = null, R.tail = null, R.lastEffect = null;
          if (aQ(Q, wJ.current), A)
            break;
          else
            return null;
        }
        case z0:
        case J1:
          return Q.lanes = N, Xq(J, Q, Z);
      }
      return jQ(J, Q, Z);
    }
    function Oq(J, Q, Z) {
      if (Q._debugNeedsRemount && J !== null)
        return GD(J, Q, UW(Q.type, Q.key, Q.pendingProps, Q._debugOwner || null, Q.mode, Q.lanes));
      if (J !== null) {
        var X = J.memoizedProps, Y = Q.pendingProps;
        if (X !== Y || c5() || Q.type !== J.type)
          _J = true;
        else {
          var G = TB(J, Z);
          if (!G && (Q.flags & k0) === Z0)
            return _J = false, BD(J, Q, Z);
          if ((J.flags & uX) !== Z0)
            _J = true;
          else
            _J = false;
        }
      } else if (_J = false, r1() && Cj(Q)) {
        var B = Q.index, W = Tj();
        mK(Q, W, B);
      }
      switch (Q.lanes = N, Q.tag) {
        case R0:
          return yM(J, Q, Q.type, Z);
        case e0: {
          var z = Q.elementType;
          return uM(J, Q, z, Z);
        }
        case t: {
          var { type: q, pendingProps: U } = Q, j = Q.elementType === q ? U : RJ(q, U);
          return _B(J, Q, q, j, Z);
        }
        case i: {
          var { type: O, pendingProps: F } = Q, A = Q.elementType === O ? F : RJ(O, F);
          return Gq(J, Q, O, A, Z);
        }
        case T:
          return hM(J, Q, Z);
        case c:
          return bM(J, Q, Z);
        case w0:
          return fM(J, Q);
        case A0:
          return zq(J, Q, Z);
        case e:
          return ZD(J, Q, Z);
        case Y0: {
          var { type: R, pendingProps: u } = Q, o = Q.elementType === R ? u : RJ(R, u);
          return Jq(J, Q, R, o, Z);
        }
        case F1:
          return CM(J, Q, Z);
        case T1:
          return TM(J, Q, Z);
        case m0:
          return kM(J, Q, Z);
        case N0:
          return XD(J, Q, Z);
        case E1:
          return YD(J, Q, Z);
        case K1: {
          var { type: a, pendingProps: P0 } = Q, F0 = RJ(a, P0);
          if (Q.type !== Q.elementType) {
            var M = a.propTypes;
            if (M)
              PJ(M, F0, "prop", s0(a));
          }
          return F0 = RJ(a.type, F0), Qq(J, Q, a, F0, Z);
        }
        case v0:
          return Zq(J, Q, Q.type, Q.pendingProps, Z);
        case i0: {
          var { type: I, pendingProps: D } = Q, x = Q.elementType === I ? D : RJ(I, D);
          return dM(J, Q, I, x, Z);
        }
        case R1:
          return Vq(J, Q, Z);
        case l0:
          break;
        case z0:
          return Xq(J, Q, Z);
      }
      throw new Error("Unknown unit of work tag (" + Q.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function f6(J) {
      J.flags |= x0;
    }
    function jq(J) {
      J.flags |= TQ, J.flags |= dX;
    }
    var Mq, kB, Dq, Aq;
    Mq = function(J, Q, Z, X) {
      var Y = Q.child;
      while (Y !== null) {
        if (Y.tag === c || Y.tag === w0)
          xO(J, Y.stateNode);
        else if (Y.tag === e)
          ;
        else if (Y.child !== null) {
          Y.child.return = Y, Y = Y.child;
          continue;
        }
        if (Y === Q)
          return;
        while (Y.sibling === null) {
          if (Y.return === null || Y.return === Q)
            return;
          Y = Y.return;
        }
        Y.sibling.return = Y.return, Y = Y.sibling;
      }
    }, kB = function(J, Q) {
    }, Dq = function(J, Q, Z, X, Y) {
      var G = J.memoizedProps;
      if (G === X)
        return;
      var B = Q.stateNode, W = dG(), z = gO(B, Z, G, X, Y, W);
      if (Q.updateQueue = z, z)
        f6(Q);
    }, Aq = function(J, Q, Z, X) {
      if (Z !== X)
        f6(Q);
    };
    function R9(J, Q) {
      if (r1())
        return;
      switch (J.tailMode) {
        case "hidden": {
          var Z = J.tail, X = null;
          while (Z !== null) {
            if (Z.alternate !== null)
              X = Z;
            Z = Z.sibling;
          }
          if (X === null)
            J.tail = null;
          else
            X.sibling = null;
          break;
        }
        case "collapsed": {
          var Y = J.tail, G = null;
          while (Y !== null) {
            if (Y.alternate !== null)
              G = Y;
            Y = Y.sibling;
          }
          if (G === null)
            if (!Q && J.tail !== null)
              J.tail.sibling = null;
            else
              J.tail = null;
          else
            G.sibling = null;
          break;
        }
      }
    }
    function o1(J) {
      var Q = J.alternate !== null && J.alternate.child === J.child, Z = N, X = Z0;
      if (!Q) {
        if ((J.mode & u0) !== X0) {
          var { actualDuration: Y, selfBaseDuration: G, child: B } = J;
          while (B !== null)
            Z = M0(Z, M0(B.lanes, B.childLanes)), X |= B.subtreeFlags, X |= B.flags, Y += B.actualDuration, G += B.treeBaseDuration, B = B.sibling;
          J.actualDuration = Y, J.treeBaseDuration = G;
        } else {
          var W = J.child;
          while (W !== null)
            Z = M0(Z, M0(W.lanes, W.childLanes)), X |= W.subtreeFlags, X |= W.flags, W.return = J, W = W.sibling;
        }
        J.subtreeFlags |= X;
      } else {
        if ((J.mode & u0) !== X0) {
          var { selfBaseDuration: z, child: q } = J;
          while (q !== null)
            Z = M0(Z, M0(q.lanes, q.childLanes)), X |= q.subtreeFlags & BQ, X |= q.flags & BQ, z += q.treeBaseDuration, q = q.sibling;
          J.treeBaseDuration = z;
        } else {
          var U = J.child;
          while (U !== null)
            Z = M0(Z, M0(U.lanes, U.childLanes)), X |= U.subtreeFlags & BQ, X |= U.flags & BQ, U.return = J, U = U.sibling;
        }
        J.subtreeFlags |= X;
      }
      return J.childLanes = Z, Q;
    }
    function WD(J, Q, Z) {
      if (pj() && (Q.mode & I0) !== X0 && (Q.flags & k0) === Z0)
        return rK(Q), L6(), Q.flags |= XQ | A7 | F8, false;
      var X = n5(Q);
      if (Z !== null && Z.dehydrated !== null)
        if (J === null) {
          if (!X)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (ij(Q), o1(Q), (Q.mode & u0) !== X0) {
            var Y = Z !== null;
            if (Y) {
              var G = Q.child;
              if (G !== null)
                Q.treeBaseDuration -= G.treeBaseDuration;
            }
          }
          return false;
        } else {
          if (L6(), (Q.flags & k0) === Z0)
            Q.memoizedState = null;
          if (Q.flags |= x0, o1(Q), (Q.mode & u0) !== X0) {
            var B = Z !== null;
            if (B) {
              var W = Q.child;
              if (W !== null)
                Q.treeBaseDuration -= W.treeBaseDuration;
            }
          }
          return false;
        }
      else
        return nK(), true;
    }
    function Pq(J, Q, Z) {
      var X = Q.pendingProps;
      switch (BG(Q), Q.tag) {
        case R0:
        case e0:
        case v0:
        case t:
        case Y0:
        case F1:
        case T1:
        case m0:
        case E1:
        case K1:
          return o1(Q), null;
        case i: {
          var Y = Q.type;
          if (dJ(Y))
            s5(Q);
          return o1(Q), null;
        }
        case T: {
          var G = Q.stateNode;
          if (v6(Q), ZG(Q), iG(), G.pendingContext)
            G.context = G.pendingContext, G.pendingContext = null;
          if (J === null || J.child === null) {
            var B = n5(Q);
            if (B)
              f6(Q);
            else if (J !== null) {
              var W = J.memoizedState;
              if (!W.isDehydrated || (Q.flags & XQ) !== Z0)
                Q.flags |= U4, nK();
            }
          }
          return kB(J, Q), o1(Q), null;
        }
        case c: {
          yG(Q);
          var z = D3(), q = Q.type;
          if (J !== null && Q.stateNode != null) {
            if (Dq(J, Q, q, X, z), J.ref !== Q.ref)
              jq(Q);
          } else {
            if (!X) {
              if (Q.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return o1(Q), null;
            }
            var U = dG(), j = n5(Q);
            if (j) {
              if (cj(Q, z, U))
                f6(Q);
            } else {
              var O = SO(q, X, z, U, Q);
              if (Mq(O, Q, false, false), Q.stateNode = O, vO(O, q, X, z))
                f6(Q);
            }
            if (Q.ref !== null)
              jq(Q);
          }
          return o1(Q), null;
        }
        case w0: {
          var F = X;
          if (J && Q.stateNode != null) {
            var A = J.memoizedProps;
            Aq(J, Q, A, F);
          } else {
            if (typeof F !== "string") {
              if (Q.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            }
            var R = D3(), u = dG(), o = n5(Q);
            if (o) {
              if (sj(Q))
                f6(Q);
            } else
              Q.stateNode = CO(F, R, u, Q);
          }
          return o1(Q), null;
        }
        case A0: {
          C6(Q);
          var a = Q.memoizedState;
          if (J === null || J.memoizedState !== null && J.memoizedState.dehydrated !== null) {
            var P0 = WD(J, Q, a);
            if (!P0)
              if (Q.flags & F8)
                return Q;
              else
                return null;
          }
          if ((Q.flags & k0) !== Z0) {
            if (Q.lanes = Z, (Q.mode & u0) !== X0)
              MB(Q);
            return Q;
          }
          var F0 = a !== null, M = J !== null && J.memoizedState !== null;
          if (F0 !== M) {
            if (F0) {
              var I = Q.child;
              if (I.flags |= V4, (Q.mode & I0) !== X0) {
                var D = J === null && (Q.memoizedProps.unstable_avoidThisFallback !== true || !r8);
                if (D || mG(wJ.current, F3))
                  $A();
                else
                  JW();
              }
            }
          }
          var x = Q.updateQueue;
          if (x !== null)
            Q.flags |= x0;
          if (o1(Q), (Q.mode & u0) !== X0) {
            if (F0) {
              var y = Q.child;
              if (y !== null)
                Q.treeBaseDuration -= y.treeBaseDuration;
            }
          }
          return null;
        }
        case e:
          if (v6(Q), kB(J, Q), J === null)
            _j(Q.stateNode.containerInfo);
          return o1(Q), null;
        case N0:
          var b = Q.type._context;
          return OG(b, Q), o1(Q), null;
        case i0: {
          var B0 = Q.type;
          if (dJ(B0))
            s5(Q);
          return o1(Q), null;
        }
        case R1: {
          C6(Q);
          var U0 = Q.memoizedState;
          if (U0 === null)
            return o1(Q), null;
          var y0 = (Q.flags & k0) !== Z0, g0 = U0.rendering;
          if (g0 === null)
            if (!y0) {
              var H1 = OA() && (J === null || (J.flags & k0) === Z0);
              if (!H1) {
                var C0 = Q.child;
                while (C0 !== null) {
                  var V1 = $Z(C0);
                  if (V1 !== null) {
                    y0 = true, Q.flags |= k0, R9(U0, false);
                    var $8 = V1.updateQueue;
                    if ($8 !== null)
                      Q.updateQueue = $8, Q.flags |= x0;
                    return Q.subtreeFlags = Z0, UM(Q, Z), aQ(Q, cG(wJ.current, V9)), Q.child;
                  }
                  C0 = C0.sibling;
                }
              }
              if (U0.tail !== null && f1() > mq())
                Q.flags |= k0, y0 = true, R9(U0, false), Q.lanes = Mz;
            } else
              R9(U0, false);
          else {
            if (!y0) {
              var Z8 = $Z(g0);
              if (Z8 !== null) {
                Q.flags |= k0, y0 = true;
                var p8 = Z8.updateQueue;
                if (p8 !== null)
                  Q.updateQueue = p8, Q.flags |= x0;
                if (R9(U0, true), U0.tail === null && U0.tailMode === "hidden" && !g0.alternate && !r1())
                  return o1(Q), null;
              } else if (f1() * 2 - U0.renderingStartTime > mq() && Z !== d8)
                Q.flags |= k0, y0 = true, R9(U0, false), Q.lanes = Mz;
            }
            if (U0.isBackwards)
              g0.sibling = Q.child, Q.child = g0;
            else {
              var I8 = U0.last;
              if (I8 !== null)
                I8.sibling = g0;
              else
                Q.child = g0;
              U0.last = g0;
            }
          }
          if (U0.tail !== null) {
            var _8 = U0.tail;
            U0.rendering = _8, U0.tail = _8.sibling, U0.renderingStartTime = f1(), _8.sibling = null;
            var H8 = wJ.current;
            if (y0)
              H8 = cG(H8, V9);
            else
              H8 = g6(H8);
            return aQ(Q, H8), _8;
          }
          return o1(Q), null;
        }
        case l0:
          break;
        case z0:
        case J1: {
          eB(Q);
          var FQ = Q.memoizedState, l6 = FQ !== null;
          if (J !== null) {
            var u9 = J.memoizedState, aJ = u9 !== null;
            if (aJ !== l6 && !Y8)
              Q.flags |= V4;
          }
          if (!l6 || (Q.mode & I0) === X0)
            o1(Q);
          else if (y8(pJ, d8)) {
            if (o1(Q), Q.subtreeFlags & (D1 | x0))
              Q.flags |= V4;
          }
          return null;
        }
        case W0:
          return null;
        case O8:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + Q.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function zD(J, Q, Z) {
      switch (BG(Q), Q.tag) {
        case i: {
          var X = Q.type;
          if (dJ(X))
            s5(Q);
          var Y = Q.flags;
          if (Y & F8) {
            if (Q.flags = Y & ~F8 | k0, (Q.mode & u0) !== X0)
              MB(Q);
            return Q;
          }
          return null;
        }
        case T: {
          var G = Q.stateNode;
          v6(Q), ZG(Q), iG();
          var B = Q.flags;
          if ((B & F8) !== Z0 && (B & k0) === Z0)
            return Q.flags = B & ~F8 | k0, Q;
          return null;
        }
        case c:
          return yG(Q), null;
        case A0: {
          C6(Q);
          var W = Q.memoizedState;
          if (W !== null && W.dehydrated !== null) {
            if (Q.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            L6();
          }
          var z = Q.flags;
          if (z & F8) {
            if (Q.flags = z & ~F8 | k0, (Q.mode & u0) !== X0)
              MB(Q);
            return Q;
          }
          return null;
        }
        case R1:
          return C6(Q), null;
        case e:
          return v6(Q), null;
        case N0:
          var q = Q.type._context;
          return OG(q, Q), null;
        case z0:
        case J1:
          return eB(Q), null;
        case W0:
          return null;
        default:
          return null;
      }
    }
    function Fq(J, Q, Z) {
      switch (BG(Q), Q.tag) {
        case i: {
          var X = Q.type.childContextTypes;
          if (X !== null && X !== undefined)
            s5(Q);
          break;
        }
        case T: {
          var Y = Q.stateNode;
          v6(Q), ZG(Q), iG();
          break;
        }
        case c: {
          yG(Q);
          break;
        }
        case e:
          v6(Q);
          break;
        case A0:
          C6(Q);
          break;
        case R1:
          C6(Q);
          break;
        case N0:
          var G = Q.type._context;
          OG(G, Q);
          break;
        case z0:
        case J1:
          eB(Q);
          break;
      }
    }
    var Eq = null;
    Eq = new Set;
    var fZ = false, t1 = false, KD = typeof WeakSet === "function" ? WeakSet : Set, l = null, u6 = null, d6 = null;
    function qD(J) {
      hX(null, function() {
        throw J;
      }), bX();
    }
    var UD = function(J, Q) {
      if (Q.props = J.memoizedProps, Q.state = J.memoizedState, J.mode & u0)
        try {
          iJ(), Q.componentWillUnmount();
        } finally {
          sJ(J);
        }
      else
        Q.componentWillUnmount();
    };
    function Rq(J, Q) {
      try {
        oQ(L1, J);
      } catch (Z) {
        t0(J, Q, Z);
      }
    }
    function hB(J, Q, Z) {
      try {
        UD(J, Z);
      } catch (X) {
        t0(J, Q, X);
      }
    }
    function VD(J, Q, Z) {
      try {
        Z.componentDidMount();
      } catch (X) {
        t0(J, Q, X);
      }
    }
    function wq(J, Q) {
      try {
        Lq(J);
      } catch (Z) {
        t0(J, Q, Z);
      }
    }
    function y6(J, Q) {
      var Z = J.ref;
      if (Z !== null)
        if (typeof Z === "function") {
          var X;
          try {
            if (n8 && $J && J.mode & u0)
              try {
                iJ(), X = Z(null);
              } finally {
                sJ(J);
              }
            else
              X = Z(null);
          } catch (Y) {
            t0(J, Q, Y);
          }
          if (typeof X === "function")
            V("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", H0(J));
        } else
          Z.current = null;
    }
    function uZ(J, Q, Z) {
      try {
        Z();
      } catch (X) {
        t0(J, Q, X);
      }
    }
    var Iq = null, _q = false;
    function $D(J, Q) {
      Iq = LO(J.containerInfo), l = Q, HD();
      var Z = _q;
      return _q = false, Iq = null, Z;
    }
    function HD() {
      while (l !== null) {
        var J = l, Q = J.child;
        if ((J.subtreeFlags & mX) !== Z0 && Q !== null)
          Q.return = J, l = Q;
        else
          OD();
      }
    }
    function OD() {
      while (l !== null) {
        var J = l;
        B1(J);
        try {
          jD(J);
        } catch (Z) {
          t0(J, J.return, Z);
        }
        b1();
        var Q = J.sibling;
        if (Q !== null) {
          Q.return = J.return, l = Q;
          return;
        }
        l = J.return;
      }
    }
    function jD(J) {
      var { alternate: Q, flags: Z } = J;
      if ((Z & U4) !== Z0) {
        switch (B1(J), J.tag) {
          case t:
          case Y0:
          case v0:
            break;
          case i: {
            if (Q !== null) {
              var { memoizedProps: X, memoizedState: Y } = Q, G = J.stateNode;
              if (J.type === J.elementType && !C4) {
                if (G.props !== J.memoizedProps)
                  V("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", H0(J) || "instance");
                if (G.state !== J.memoizedState)
                  V("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", H0(J) || "instance");
              }
              var B = G.getSnapshotBeforeUpdate(J.elementType === J.type ? X : RJ(J.type, X), Y);
              {
                var W = Eq;
                if (B === undefined && !W.has(J.type))
                  W.add(J.type), V("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", H0(J));
              }
              G.__reactInternalSnapshotBeforeUpdate = B;
            }
            break;
          }
          case T: {
            {
              var z = J.stateNode;
              tO(z.containerInfo);
            }
            break;
          }
          case c:
          case w0:
          case e:
          case i0:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        b1();
      }
    }
    function LJ(J, Q, Z) {
      var X = Q.updateQueue, Y = X !== null ? X.lastEffect : null;
      if (Y !== null) {
        var G = Y.next, B = G;
        do {
          if ((B.tag & J) === J) {
            var W = B.destroy;
            if (B.destroy = undefined, W !== undefined) {
              if ((J & n1) !== C8)
                C2(Q);
              else if ((J & L1) !== C8)
                Vz(Q);
              if ((J & yJ) !== C8)
                h9(true);
              if (uZ(Q, Z, W), (J & yJ) !== C8)
                h9(false);
              if ((J & n1) !== C8)
                T2();
              else if ((J & L1) !== C8)
                $z();
            }
          }
          B = B.next;
        } while (B !== G);
      }
    }
    function oQ(J, Q) {
      var Z = Q.updateQueue, X = Z !== null ? Z.lastEffect : null;
      if (X !== null) {
        var Y = X.next, G = Y;
        do {
          if ((G.tag & J) === J) {
            if ((J & n1) !== C8)
              v2(Q);
            else if ((J & L1) !== C8)
              k2(Q);
            var B = G.create;
            if ((J & yJ) !== C8)
              h9(true);
            if (G.destroy = B(), (J & yJ) !== C8)
              h9(false);
            if ((J & n1) !== C8)
              g2();
            else if ((J & L1) !== C8)
              h2();
            {
              var W = G.destroy;
              if (W !== undefined && typeof W !== "function") {
                var z = undefined;
                if ((G.tag & L1) !== Z0)
                  z = "useLayoutEffect";
                else if ((G.tag & yJ) !== Z0)
                  z = "useInsertionEffect";
                else
                  z = "useEffect";
                var q = undefined;
                if (W === null)
                  q = " You returned null. If your effect does not require clean up, return undefined (or nothing).";
                else if (typeof W.then === "function")
                  q = "\n\nIt looks like you wrote " + z + "(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\n" + z + "(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching";
                else
                  q = " You returned: " + W;
                V("%s must not return anything besides a function, which is used for clean-up.%s", z, q);
              }
            }
          }
          G = G.next;
        } while (G !== Y);
      }
    }
    function MD(J, Q) {
      if ((Q.flags & x0) !== Z0)
        switch (Q.tag) {
          case m0: {
            var Z = Q.stateNode.passiveEffectDuration, X = Q.memoizedProps, Y = X.id, G = X.onPostCommit, B = p3(), W = Q.alternate === null ? "mount" : "update";
            if (l3())
              W = "nested-update";
            if (typeof G === "function")
              G(Y, W, Z, B);
            var z = Q.return;
            J:
              while (z !== null) {
                switch (z.tag) {
                  case T:
                    var q = z.stateNode;
                    q.passiveEffectDuration += Z;
                    break J;
                  case m0:
                    var U = z.stateNode;
                    U.passiveEffectDuration += Z;
                    break J;
                }
                z = z.return;
              }
            break;
          }
        }
    }
    function DD(J, Q, Z, X) {
      if ((Z.flags & P7) !== Z0)
        switch (Z.tag) {
          case t:
          case Y0:
          case v0: {
            if (!t1)
              if (Z.mode & u0)
                try {
                  iJ(), oQ(L1 | _1, Z);
                } finally {
                  sJ(Z);
                }
              else
                oQ(L1 | _1, Z);
            break;
          }
          case i: {
            var Y = Z.stateNode;
            if (Z.flags & x0) {
              if (!t1)
                if (Q === null) {
                  if (Z.type === Z.elementType && !C4) {
                    if (Y.props !== Z.memoizedProps)
                      V("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", H0(Z) || "instance");
                    if (Y.state !== Z.memoizedState)
                      V("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", H0(Z) || "instance");
                  }
                  if (Z.mode & u0)
                    try {
                      iJ(), Y.componentDidMount();
                    } finally {
                      sJ(Z);
                    }
                  else
                    Y.componentDidMount();
                } else {
                  var G = Z.elementType === Z.type ? Q.memoizedProps : RJ(Z.type, Q.memoizedProps), B = Q.memoizedState;
                  if (Z.type === Z.elementType && !C4) {
                    if (Y.props !== Z.memoizedProps)
                      V("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", H0(Z) || "instance");
                    if (Y.state !== Z.memoizedState)
                      V("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", H0(Z) || "instance");
                  }
                  if (Z.mode & u0)
                    try {
                      iJ(), Y.componentDidUpdate(G, B, Y.__reactInternalSnapshotBeforeUpdate);
                    } finally {
                      sJ(Z);
                    }
                  else
                    Y.componentDidUpdate(G, B, Y.__reactInternalSnapshotBeforeUpdate);
                }
            }
            var W = Z.updateQueue;
            if (W !== null) {
              if (Z.type === Z.elementType && !C4) {
                if (Y.props !== Z.memoizedProps)
                  V("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", H0(Z) || "instance");
                if (Y.state !== Z.memoizedState)
                  V("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", H0(Z) || "instance");
              }
              B3(Z, W, Y);
            }
            break;
          }
          case T: {
            var z = Z.updateQueue;
            if (z !== null) {
              var q = null;
              if (Z.child !== null)
                switch (Z.child.tag) {
                  case c:
                    q = iY(Z.child.stateNode);
                    break;
                  case i:
                    q = Z.child.stateNode;
                    break;
                }
              B3(Z, z, q);
            }
            break;
          }
          case c: {
            var U = Z.stateNode;
            if (Q === null && Z.flags & x0) {
              var { type: j, memoizedProps: O } = Z;
              fO(U, j, O);
            }
            break;
          }
          case w0:
            break;
          case e:
            break;
          case m0: {
            {
              var F = Z.memoizedProps, A = F.onCommit, R = F.onRender, u = Z.stateNode.effectDuration, o = p3(), a = Q === null ? "mount" : "update";
              if (l3())
                a = "nested-update";
              if (typeof R === "function")
                R(Z.memoizedProps.id, a, Z.actualDuration, Z.treeBaseDuration, Z.actualStartTime, o);
              {
                if (typeof A === "function")
                  A(Z.memoizedProps.id, a, u, o);
                PA(Z);
                var P0 = Z.return;
                J:
                  while (P0 !== null) {
                    switch (P0.tag) {
                      case T:
                        var F0 = P0.stateNode;
                        F0.effectDuration += u;
                        break J;
                      case m0:
                        var M = P0.stateNode;
                        M.effectDuration += u;
                        break J;
                    }
                    P0 = P0.return;
                  }
              }
            }
            break;
          }
          case A0: {
            _D(J, Z);
            break;
          }
          case R1:
          case i0:
          case l0:
          case z0:
          case J1:
          case O8:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      if (!t1) {
        if (Z.flags & TQ)
          Lq(Z);
      }
    }
    function AD(J) {
      switch (J.tag) {
        case t:
        case Y0:
        case v0: {
          if (J.mode & u0)
            try {
              iJ(), Rq(J, J.return);
            } finally {
              sJ(J);
            }
          else
            Rq(J, J.return);
          break;
        }
        case i: {
          var Q = J.stateNode;
          if (typeof Q.componentDidMount === "function")
            VD(J, J.return, Q);
          wq(J, J.return);
          break;
        }
        case c: {
          wq(J, J.return);
          break;
        }
      }
    }
    function PD(J, Q) {
      var Z = null;
      {
        var X = J;
        while (true) {
          if (X.tag === c) {
            if (Z === null) {
              Z = X;
              try {
                var Y = X.stateNode;
                if (Q)
                  aO(Y);
                else
                  nO(X.stateNode, X.memoizedProps);
              } catch (B) {
                t0(J, J.return, B);
              }
            }
          } else if (X.tag === w0) {
            if (Z === null)
              try {
                var G = X.stateNode;
                if (Q)
                  rO(G);
                else
                  oO(G, X.memoizedProps);
              } catch (B) {
                t0(J, J.return, B);
              }
          } else if ((X.tag === z0 || X.tag === J1) && X.memoizedState !== null && X !== J)
            ;
          else if (X.child !== null) {
            X.child.return = X, X = X.child;
            continue;
          }
          if (X === J)
            return;
          while (X.sibling === null) {
            if (X.return === null || X.return === J)
              return;
            if (Z === X)
              Z = null;
            X = X.return;
          }
          if (Z === X)
            Z = null;
          X.sibling.return = X.return, X = X.sibling;
        }
      }
    }
    function Lq(J) {
      var Q = J.ref;
      if (Q !== null) {
        var Z = J.stateNode, X;
        switch (J.tag) {
          case c:
            X = iY(Z);
            break;
          default:
            X = Z;
        }
        if (typeof Q === "function") {
          var Y;
          if (J.mode & u0)
            try {
              iJ(), Y = Q(X);
            } finally {
              sJ(J);
            }
          else
            Y = Q(X);
          if (typeof Y === "function")
            V("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", H0(J));
        } else {
          if (!Q.hasOwnProperty("current"))
            V("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", H0(J));
          Q.current = X;
        }
      }
    }
    function FD(J) {
      var Q = J.alternate;
      if (Q !== null)
        Q.return = null;
      J.return = null;
    }
    function Nq(J) {
      var Q = J.alternate;
      if (Q !== null)
        J.alternate = null, Nq(Q);
      {
        if (J.child = null, J.deletions = null, J.sibling = null, J.tag === c) {
          var Z = J.stateNode;
          if (Z !== null)
            Sj(Z);
        }
        J.stateNode = null, J._debugOwner = null, J.return = null, J.dependencies = null, J.memoizedProps = null, J.memoizedState = null, J.pendingProps = null, J.stateNode = null, J.updateQueue = null;
      }
    }
    function ED(J) {
      var Q = J.return;
      while (Q !== null) {
        if (Sq(Q))
          return Q;
        Q = Q.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Sq(J) {
      return J.tag === c || J.tag === T || J.tag === e;
    }
    function xq(J) {
      var Q = J;
      J:
        while (true) {
          while (Q.sibling === null) {
            if (Q.return === null || Sq(Q.return))
              return null;
            Q = Q.return;
          }
          Q.sibling.return = Q.return, Q = Q.sibling;
          while (Q.tag !== c && Q.tag !== w0 && Q.tag !== k1) {
            if (Q.flags & D1)
              continue J;
            if (Q.child === null || Q.tag === e)
              continue J;
            else
              Q.child.return = Q, Q = Q.child;
          }
          if (!(Q.flags & D1))
            return Q.stateNode;
        }
    }
    function RD(J) {
      var Q = ED(J);
      switch (Q.tag) {
        case c: {
          var Z = Q.stateNode;
          if (Q.flags & D7)
            SK(Z), Q.flags &= ~D7;
          var X = xq(J);
          fB(J, X, Z);
          break;
        }
        case T:
        case e: {
          var Y = Q.stateNode.containerInfo, G = xq(J);
          bB(J, G, Y);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function bB(J, Q, Z) {
      var X = J.tag, Y = X === c || X === w0;
      if (Y) {
        var G = J.stateNode;
        if (Q)
          sO(Z, G, Q);
        else
          mO(Z, G);
      } else if (X === e)
        ;
      else {
        var B = J.child;
        if (B !== null) {
          bB(B, Q, Z);
          var W = B.sibling;
          while (W !== null)
            bB(W, Q, Z), W = W.sibling;
        }
      }
    }
    function fB(J, Q, Z) {
      var X = J.tag, Y = X === c || X === w0;
      if (Y) {
        var G = J.stateNode;
        if (Q)
          cO(Z, G, Q);
        else
          yO(Z, G);
      } else if (X === e)
        ;
      else {
        var B = J.child;
        if (B !== null) {
          fB(B, Q, Z);
          var W = B.sibling;
          while (W !== null)
            fB(W, Q, Z), W = W.sibling;
        }
      }
    }
    var e1 = null, NJ = false;
    function wD(J, Q, Z) {
      {
        var X = Q;
        J:
          while (X !== null) {
            switch (X.tag) {
              case c: {
                e1 = X.stateNode, NJ = false;
                break J;
              }
              case T: {
                e1 = X.stateNode.containerInfo, NJ = true;
                break J;
              }
              case e: {
                e1 = X.stateNode.containerInfo, NJ = true;
                break J;
              }
            }
            X = X.return;
          }
        if (e1 === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        vq(J, Q, Z), e1 = null, NJ = false;
      }
      FD(Z);
    }
    function tQ(J, Q, Z) {
      var X = Z.child;
      while (X !== null)
        vq(J, Q, X), X = X.sibling;
    }
    function vq(J, Q, Z) {
      switch (L2(Z), Z.tag) {
        case c:
          if (!t1)
            y6(Z, Q);
        case w0: {
          {
            var X = e1, Y = NJ;
            if (e1 = null, tQ(J, Q, Z), e1 = X, NJ = Y, e1 !== null)
              if (NJ)
                lO(e1, Z.stateNode);
              else
                iO(e1, Z.stateNode);
          }
          return;
        }
        case k1: {
          if (e1 !== null)
            if (NJ)
              pO(e1, Z.stateNode);
            else
              rY(e1, Z.stateNode);
          return;
        }
        case e: {
          {
            var G = e1, B = NJ;
            e1 = Z.stateNode.containerInfo, NJ = true, tQ(J, Q, Z), e1 = G, NJ = B;
          }
          return;
        }
        case t:
        case Y0:
        case K1:
        case v0: {
          if (!t1) {
            var W = Z.updateQueue;
            if (W !== null) {
              var z = W.lastEffect;
              if (z !== null) {
                var q = z.next, U = q;
                do {
                  var j = U, O = j.destroy, F = j.tag;
                  if (O !== undefined) {
                    if ((F & yJ) !== C8)
                      uZ(Z, Q, O);
                    else if ((F & L1) !== C8) {
                      if (Vz(Z), Z.mode & u0)
                        iJ(), uZ(Z, Q, O), sJ(Z);
                      else
                        uZ(Z, Q, O);
                      $z();
                    }
                  }
                  U = U.next;
                } while (U !== q);
              }
            }
          }
          tQ(J, Q, Z);
          return;
        }
        case i: {
          if (!t1) {
            y6(Z, Q);
            var A = Z.stateNode;
            if (typeof A.componentWillUnmount === "function")
              hB(Z, Q, A);
          }
          tQ(J, Q, Z);
          return;
        }
        case l0: {
          tQ(J, Q, Z);
          return;
        }
        case z0: {
          if (Z.mode & I0) {
            var R = t1;
            t1 = R || Z.memoizedState !== null, tQ(J, Q, Z), t1 = R;
          } else
            tQ(J, Q, Z);
          break;
        }
        default: {
          tQ(J, Q, Z);
          return;
        }
      }
    }
    function ID(J) {
      var Q = J.memoizedState;
    }
    function _D(J, Q) {
      var Z = Q.memoizedState;
      if (Z === null) {
        var X = Q.alternate;
        if (X !== null) {
          var Y = X.memoizedState;
          if (Y !== null) {
            var G = Y.dehydrated;
            if (G !== null)
              Vj(G);
          }
        }
      }
    }
    function gq(J) {
      var Q = J.updateQueue;
      if (Q !== null) {
        J.updateQueue = null;
        var Z = J.stateNode;
        if (Z === null)
          Z = J.stateNode = new KD;
        Q.forEach(function(X) {
          var Y = LA.bind(null, J, X);
          if (!Z.has(X)) {
            if (Z.add(X), DJ)
              if (u6 !== null && d6 !== null)
                k9(d6, u6);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            X.then(Y, Y);
          }
        });
      }
    }
    function LD(J, Q, Z) {
      u6 = Z, d6 = J, B1(Q), Cq(Q, J), B1(Q), u6 = null, d6 = null;
    }
    function SJ(J, Q, Z) {
      var X = Q.deletions;
      if (X !== null)
        for (var Y = 0;Y < X.length; Y++) {
          var G = X[Y];
          try {
            wD(J, Q, G);
          } catch (z) {
            t0(G, Q, z);
          }
        }
      var B = DX();
      if (Q.subtreeFlags & cX) {
        var W = Q.child;
        while (W !== null)
          B1(W), Cq(W, J), W = W.sibling;
      }
      B1(B);
    }
    function Cq(J, Q, Z) {
      var { alternate: X, flags: Y } = J;
      switch (J.tag) {
        case t:
        case Y0:
        case K1:
        case v0: {
          if (SJ(Q, J), lJ(J), Y & x0) {
            try {
              LJ(yJ | _1, J, J.return), oQ(yJ | _1, J);
            } catch (B0) {
              t0(J, J.return, B0);
            }
            if (J.mode & u0) {
              try {
                iJ(), LJ(L1 | _1, J, J.return);
              } catch (B0) {
                t0(J, J.return, B0);
              }
              sJ(J);
            } else
              try {
                LJ(L1 | _1, J, J.return);
              } catch (B0) {
                t0(J, J.return, B0);
              }
          }
          return;
        }
        case i: {
          if (SJ(Q, J), lJ(J), Y & TQ) {
            if (X !== null)
              y6(X, X.return);
          }
          return;
        }
        case c: {
          if (SJ(Q, J), lJ(J), Y & TQ) {
            if (X !== null)
              y6(X, X.return);
          }
          {
            if (J.flags & D7) {
              var G = J.stateNode;
              try {
                SK(G);
              } catch (B0) {
                t0(J, J.return, B0);
              }
            }
            if (Y & x0) {
              var B = J.stateNode;
              if (B != null) {
                var W = J.memoizedProps, z = X !== null ? X.memoizedProps : W, q = J.type, U = J.updateQueue;
                if (J.updateQueue = null, U !== null)
                  try {
                    uO(B, U, q, z, W, J);
                  } catch (B0) {
                    t0(J, J.return, B0);
                  }
              }
            }
          }
          return;
        }
        case w0: {
          if (SJ(Q, J), lJ(J), Y & x0) {
            if (J.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var { stateNode: j, memoizedProps: O } = J, F = X !== null ? X.memoizedProps : O;
            try {
              dO(j, F, O);
            } catch (B0) {
              t0(J, J.return, B0);
            }
          }
          return;
        }
        case T: {
          if (SJ(Q, J), lJ(J), Y & x0) {
            if (X !== null) {
              var A = X.memoizedState;
              if (A.isDehydrated)
                try {
                  Uj(Q.containerInfo);
                } catch (B0) {
                  t0(J, J.return, B0);
                }
            }
          }
          return;
        }
        case e: {
          SJ(Q, J), lJ(J);
          return;
        }
        case A0: {
          SJ(Q, J), lJ(J);
          var R = J.child;
          if (R.flags & V4) {
            var { stateNode: u, memoizedState: o } = R, a = o !== null;
            if (u.isHidden = a, a) {
              var P0 = R.alternate !== null && R.alternate.memoizedState !== null;
              if (!P0)
                VA();
            }
          }
          if (Y & x0) {
            try {
              ID(J);
            } catch (B0) {
              t0(J, J.return, B0);
            }
            gq(J);
          }
          return;
        }
        case z0: {
          var F0 = X !== null && X.memoizedState !== null;
          if (J.mode & I0) {
            var M = t1;
            t1 = M || F0, SJ(Q, J), t1 = M;
          } else
            SJ(Q, J);
          if (lJ(J), Y & V4) {
            var { stateNode: I, memoizedState: D } = J, x = D !== null, y = J;
            if (I.isHidden = x, x) {
              if (!F0) {
                if ((y.mode & I0) !== X0) {
                  l = y;
                  var b = y.child;
                  while (b !== null)
                    l = b, SD(b), b = b.sibling;
                }
              }
            }
            PD(y, x);
          }
          return;
        }
        case R1: {
          if (SJ(Q, J), lJ(J), Y & x0)
            gq(J);
          return;
        }
        case l0:
          return;
        default: {
          SJ(Q, J), lJ(J);
          return;
        }
      }
    }
    function lJ(J) {
      var Q = J.flags;
      if (Q & D1) {
        try {
          RD(J);
        } catch (Z) {
          t0(J, J.return, Z);
        }
        J.flags &= ~D1;
      }
      if (Q & YQ)
        J.flags &= ~YQ;
    }
    function ND(J, Q, Z) {
      u6 = Z, d6 = Q, l = J, Tq(J, Q, Z), u6 = null, d6 = null;
    }
    function Tq(J, Q, Z) {
      var X = (J.mode & I0) !== X0;
      while (l !== null) {
        var Y = l, G = Y.child;
        if (Y.tag === z0 && X) {
          var B = Y.memoizedState !== null, W = B || fZ;
          if (W) {
            uB(J, Q, Z);
            continue;
          } else {
            var z = Y.alternate, q = z !== null && z.memoizedState !== null, U = q || t1, j = fZ, O = t1;
            if (fZ = W, t1 = U, t1 && !O)
              l = Y, xD(Y);
            var F = G;
            while (F !== null)
              l = F, Tq(F, Q, Z), F = F.sibling;
            l = Y, fZ = j, t1 = O, uB(J, Q, Z);
            continue;
          }
        }
        if ((Y.subtreeFlags & P7) !== Z0 && G !== null)
          G.return = Y, l = G;
        else
          uB(J, Q, Z);
      }
    }
    function uB(J, Q, Z) {
      while (l !== null) {
        var X = l;
        if ((X.flags & P7) !== Z0) {
          var Y = X.alternate;
          B1(X);
          try {
            DD(Q, Y, X, Z);
          } catch (B) {
            t0(X, X.return, B);
          }
          b1();
        }
        if (X === J) {
          l = null;
          return;
        }
        var G = X.sibling;
        if (G !== null) {
          G.return = X.return, l = G;
          return;
        }
        l = X.return;
      }
    }
    function SD(J) {
      while (l !== null) {
        var Q = l, Z = Q.child;
        switch (Q.tag) {
          case t:
          case Y0:
          case K1:
          case v0: {
            if (Q.mode & u0)
              try {
                iJ(), LJ(L1, Q, Q.return);
              } finally {
                sJ(Q);
              }
            else
              LJ(L1, Q, Q.return);
            break;
          }
          case i: {
            y6(Q, Q.return);
            var X = Q.stateNode;
            if (typeof X.componentWillUnmount === "function")
              hB(Q, Q.return, X);
            break;
          }
          case c: {
            y6(Q, Q.return);
            break;
          }
          case z0: {
            var Y = Q.memoizedState !== null;
            if (Y) {
              kq(J);
              continue;
            }
            break;
          }
        }
        if (Z !== null)
          Z.return = Q, l = Z;
        else
          kq(J);
      }
    }
    function kq(J) {
      while (l !== null) {
        var Q = l;
        if (Q === J) {
          l = null;
          return;
        }
        var Z = Q.sibling;
        if (Z !== null) {
          Z.return = Q.return, l = Z;
          return;
        }
        l = Q.return;
      }
    }
    function xD(J) {
      while (l !== null) {
        var Q = l, Z = Q.child;
        if (Q.tag === z0) {
          var X = Q.memoizedState !== null;
          if (X) {
            hq(J);
            continue;
          }
        }
        if (Z !== null)
          Z.return = Q, l = Z;
        else
          hq(J);
      }
    }
    function hq(J) {
      while (l !== null) {
        var Q = l;
        B1(Q);
        try {
          AD(Q);
        } catch (X) {
          t0(Q, Q.return, X);
        }
        if (b1(), Q === J) {
          l = null;
          return;
        }
        var Z = Q.sibling;
        if (Z !== null) {
          Z.return = Q.return, l = Z;
          return;
        }
        l = Q.return;
      }
    }
    function vD(J, Q, Z, X) {
      l = Q, gD(Q, J, Z, X);
    }
    function gD(J, Q, Z, X) {
      while (l !== null) {
        var Y = l, G = Y.child;
        if ((Y.subtreeFlags & z6) !== Z0 && G !== null)
          G.return = Y, l = G;
        else
          CD(J, Q, Z, X);
      }
    }
    function CD(J, Q, Z, X) {
      while (l !== null) {
        var Y = l;
        if ((Y.flags & MJ) !== Z0) {
          B1(Y);
          try {
            TD(Q, Y, Z, X);
          } catch (B) {
            t0(Y, Y.return, B);
          }
          b1();
        }
        if (Y === J) {
          l = null;
          return;
        }
        var G = Y.sibling;
        if (G !== null) {
          G.return = Y.return, l = G;
          return;
        }
        l = Y.return;
      }
    }
    function TD(J, Q, Z, X) {
      switch (Q.tag) {
        case t:
        case Y0:
        case v0: {
          if (Q.mode & u0) {
            jB();
            try {
              oQ(n1 | _1, Q);
            } finally {
              OB(Q);
            }
          } else
            oQ(n1 | _1, Q);
          break;
        }
      }
    }
    function kD(J) {
      l = J, hD();
    }
    function hD() {
      while (l !== null) {
        var J = l, Q = J.child;
        if ((l.flags & q4) !== Z0) {
          var Z = J.deletions;
          if (Z !== null) {
            for (var X = 0;X < Z.length; X++) {
              var Y = Z[X];
              l = Y, uD(Y, J);
            }
            {
              var G = J.alternate;
              if (G !== null) {
                var B = G.child;
                if (B !== null) {
                  G.child = null;
                  do {
                    var W = B.sibling;
                    B.sibling = null, B = W;
                  } while (B !== null);
                }
              }
            }
            l = J;
          }
        }
        if ((J.subtreeFlags & z6) !== Z0 && Q !== null)
          Q.return = J, l = Q;
        else
          bD();
      }
    }
    function bD() {
      while (l !== null) {
        var J = l;
        if ((J.flags & MJ) !== Z0)
          B1(J), fD(J), b1();
        var Q = J.sibling;
        if (Q !== null) {
          Q.return = J.return, l = Q;
          return;
        }
        l = J.return;
      }
    }
    function fD(J) {
      switch (J.tag) {
        case t:
        case Y0:
        case v0: {
          if (J.mode & u0)
            jB(), LJ(n1 | _1, J, J.return), OB(J);
          else
            LJ(n1 | _1, J, J.return);
          break;
        }
      }
    }
    function uD(J, Q) {
      while (l !== null) {
        var Z = l;
        B1(Z), yD(Z, Q), b1();
        var X = Z.child;
        if (X !== null)
          X.return = Z, l = X;
        else
          dD(J);
      }
    }
    function dD(J) {
      while (l !== null) {
        var Q = l, Z = Q.sibling, X = Q.return;
        if (Nq(Q), Q === J) {
          l = null;
          return;
        }
        if (Z !== null) {
          Z.return = X, l = Z;
          return;
        }
        l = X;
      }
    }
    function yD(J, Q) {
      switch (J.tag) {
        case t:
        case Y0:
        case v0: {
          if (J.mode & u0)
            jB(), LJ(n1, J, Q), OB(J);
          else
            LJ(n1, J, Q);
          break;
        }
      }
    }
    function mD(J) {
      switch (J.tag) {
        case t:
        case Y0:
        case v0: {
          try {
            oQ(L1 | _1, J);
          } catch (Z) {
            t0(J, J.return, Z);
          }
          break;
        }
        case i: {
          var Q = J.stateNode;
          try {
            Q.componentDidMount();
          } catch (Z) {
            t0(J, J.return, Z);
          }
          break;
        }
      }
    }
    function cD(J) {
      switch (J.tag) {
        case t:
        case Y0:
        case v0: {
          try {
            oQ(n1 | _1, J);
          } catch (Q) {
            t0(J, J.return, Q);
          }
          break;
        }
      }
    }
    function sD(J) {
      switch (J.tag) {
        case t:
        case Y0:
        case v0: {
          try {
            LJ(L1 | _1, J, J.return);
          } catch (Z) {
            t0(J, J.return, Z);
          }
          break;
        }
        case i: {
          var Q = J.stateNode;
          if (typeof Q.componentWillUnmount === "function")
            hB(J, J.return, Q);
          break;
        }
      }
    }
    function iD(J) {
      switch (J.tag) {
        case t:
        case Y0:
        case v0:
          try {
            LJ(n1 | _1, J, J.return);
          } catch (Q) {
            t0(J, J.return, Q);
          }
      }
    }
    var lD = 0, pD = 1, aD = 2, rD = 3, nD = 4;
    if (typeof Symbol === "function" && Symbol.for) {
      var w9 = Symbol.for;
      lD = w9("selector.component"), pD = w9("selector.has_pseudo_class"), aD = w9("selector.role"), rD = w9("selector.test_id"), nD = w9("selector.text");
    }
    var oD = [];
    function tD() {
      oD.forEach(function(J) {
        return J();
      });
    }
    var eD = v.ReactCurrentActQueue;
    function JA(J) {
      {
        var Q = typeof IS_REACT_ACT_ENVIRONMENT !== "undefined" ? IS_REACT_ACT_ENVIRONMENT : undefined, Z = typeof jest !== "undefined";
        return Z && Q !== false;
      }
    }
    function bq() {
      {
        var J = typeof IS_REACT_ACT_ENVIRONMENT !== "undefined" ? IS_REACT_ACT_ENVIRONMENT : undefined;
        if (!J && eD.current !== null)
          V("The current testing environment is not configured to support act(...)");
        return J;
      }
    }
    var QA = Math.ceil, dB = v.ReactCurrentDispatcher, yB = v.ReactCurrentOwner, J8 = v.ReactCurrentBatchConfig, xJ = v.ReactCurrentActQueue, x1 = 0, fq = 1, Q8 = 2, KJ = 4, MQ = 0, I9 = 1, T4 = 2, dZ = 3, _9 = 4, uq = 5, mB = 6, _0 = x1, R8 = null, z1 = null, v1 = N, pJ = N, cB = mQ(N), g1 = MQ, L9 = null, sB = N, yZ = N, N9 = N, mZ = N, S9 = null, T8 = null, iB = 0, dq = 500, yq = Infinity, ZA = 500, DQ = null;
    function x9() {
      yq = f1() + ZA;
    }
    function mq() {
      return yq;
    }
    var cZ = false, lB = null, m6 = null, k4 = false, eQ = null, v9 = N, pB = [], aB = null, XA = 50, g9 = 0, rB = null, nB = false, sZ = false, YA = 50, c6 = 0, iZ = null, C9 = Z1, lZ = N, cq = false;
    function pZ() {
      return R8;
    }
    function w8() {
      if ((_0 & (Q8 | KJ)) !== x1)
        return f1();
      if (C9 !== Z1)
        return C9;
      return C9 = f1(), C9;
    }
    function J4(J) {
      var Q = J.mode;
      if ((Q & I0) === X0)
        return K0;
      else if ((_0 & Q8) !== x1 && v1 !== N)
        return L7(v1);
      var Z = nj() !== rj;
      if (Z) {
        if (J8.transition !== null) {
          var X = J8.transition;
          if (!X._updatedFibers)
            X._updatedFibers = new Set;
          X._updatedFibers.add(J);
        }
        if (lZ === d1)
          lZ = Fz();
        return lZ;
      }
      var Y = AJ();
      if (Y !== d1)
        return Y;
      var G = TO();
      return G;
    }
    function GA(J) {
      var Q = J.mode;
      if ((Q & I0) === X0)
        return K0;
      return Y$();
    }
    function C1(J, Q, Z, X) {
      if (SA(), cq)
        V("useInsertionEffect must not schedule updates.");
      if (nB)
        sZ = true;
      if (N7(J, Z, X), (_0 & Q8) !== N && J === R8)
        gA(Q);
      else {
        if (DJ)
          wz(J, Q, Z);
        if (CA(Q), J === R8) {
          if ((_0 & Q8) === x1)
            N9 = M0(N9, Z);
          if (g1 === _9)
            Q4(J, v1);
        }
        if (k8(J, X), Z === K0 && _0 === x1 && (Q.mode & I0) === X0 && !xJ.isBatchingLegacy)
          x9(), yK();
      }
    }
    function BA(J, Q, Z) {
      var X = J.current;
      X.lanes = Q, N7(J, Q, Z), k8(J, Z);
    }
    function WA(J) {
      return (_0 & Q8) !== x1;
    }
    function k8(J, Q) {
      var Z = J.callbackNode;
      t2(J, Q);
      var X = U5(J, J === R8 ? v1 : N);
      if (X === N) {
        if (Z !== null)
          GU(Z);
        J.callbackNode = null, J.callbackPriority = d1;
        return;
      }
      var Y = A4(X), G = J.callbackPriority;
      if (G === Y && !(xJ.current !== null && Z !== XW)) {
        if (Z == null && G !== K0)
          V("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      if (Z != null)
        GU(Z);
      var B;
      if (Y === K0) {
        if (J.tag === cQ) {
          if (xJ.isBatchingLegacy !== null)
            xJ.didScheduleLegacyUpdate = true;
          gj(lq.bind(null, J));
        } else
          dK(lq.bind(null, J));
        if (xJ.current !== null)
          xJ.current.push(sQ);
        else
          hO(function() {
            if ((_0 & (Q8 | KJ)) === x1)
              sQ();
          });
        B = null;
      } else {
        var W;
        switch (Lz(X)) {
          case m8:
            W = W5;
            break;
          case zQ:
            W = sX;
            break;
          case KQ:
            W = O4;
            break;
          case O5:
            W = iX;
            break;
          default:
            W = O4;
            break;
        }
        B = YW(W, sq.bind(null, J));
      }
      J.callbackPriority = Y, J.callbackNode = B;
    }
    function sq(J, Q) {
      if (wM(), C9 = Z1, lZ = N, (_0 & (Q8 | KJ)) !== x1)
        throw new Error("Should not already be working.");
      var Z = J.callbackNode, X = PQ();
      if (X) {
        if (J.callbackNode !== Z)
          return null;
      }
      var Y = U5(J, J === R8 ? v1 : N);
      if (Y === N)
        return null;
      var G = !V5(J, Y) && !X$(J, Y) && !Q, B = G ? MA(J, Y) : rZ(J, Y);
      if (B !== MQ) {
        if (B === T4) {
          var W = $Y(J);
          if (W !== N)
            Y = W, B = oB(J, W);
        }
        if (B === I9) {
          var z = L9;
          throw h4(J, N), Q4(J, Y), k8(J, f1()), z;
        }
        if (B === mB)
          Q4(J, Y);
        else {
          var q = !V5(J, Y), U = J.current.alternate;
          if (q && !KA(U)) {
            if (B = rZ(J, Y), B === T4) {
              var j = $Y(J);
              if (j !== N)
                Y = j, B = oB(J, j);
            }
            if (B === I9) {
              var O = L9;
              throw h4(J, N), Q4(J, Y), k8(J, f1()), O;
            }
          }
          J.finishedWork = U, J.finishedLanes = Y, zA(J, B, Y);
        }
      }
      if (k8(J, f1()), J.callbackNode === Z)
        return sq.bind(null, J);
      return null;
    }
    function oB(J, Q) {
      var Z = S9;
      if (j5(J)) {
        var X = h4(J, Q);
        X.flags |= XQ, Ij(J.containerInfo);
      }
      var Y = rZ(J, Q);
      if (Y !== T4) {
        var G = T8;
        if (T8 = Z, G !== null)
          iq(G);
      }
      return Y;
    }
    function iq(J) {
      if (T8 === null)
        T8 = J;
      else
        T8.push.apply(T8, J);
    }
    function zA(J, Q, Z) {
      switch (Q) {
        case MQ:
        case I9:
          throw new Error("Root did not complete. This is a bug in React.");
        case T4: {
          b4(J, T8, DQ);
          break;
        }
        case dZ: {
          if (Q4(J, Z), Az(Z) && !BU()) {
            var X = iB + dq - f1();
            if (X > 10) {
              var Y = U5(J, N);
              if (Y !== N)
                break;
              var G = J.suspendedLanes;
              if (!$6(G, Z)) {
                var B = w8();
                Rz(J, G);
                break;
              }
              J.timeoutHandle = pY(b4.bind(null, J, T8, DQ), X);
              break;
            }
          }
          b4(J, T8, DQ);
          break;
        }
        case _9: {
          if (Q4(J, Z), Z$(Z))
            break;
          if (!BU()) {
            var W = n2(J, Z), z = W, q = f1() - z, U = NA(q) - q;
            if (U > 10) {
              J.timeoutHandle = pY(b4.bind(null, J, T8, DQ), U);
              break;
            }
          }
          b4(J, T8, DQ);
          break;
        }
        case uq: {
          b4(J, T8, DQ);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function KA(J) {
      var Q = J;
      while (true) {
        if (Q.flags & G5) {
          var Z = Q.updateQueue;
          if (Z !== null) {
            var X = Z.stores;
            if (X !== null)
              for (var Y = 0;Y < X.length; Y++) {
                var G = X[Y], B = G.getSnapshot, W = G.value;
                try {
                  if (!s8(B(), W))
                    return false;
                } catch (q) {
                  return false;
                }
              }
          }
        }
        var z = Q.child;
        if (Q.subtreeFlags & G5 && z !== null) {
          z.return = Q, Q = z;
          continue;
        }
        if (Q === J)
          return true;
        while (Q.sibling === null) {
          if (Q.return === null || Q.return === J)
            return true;
          Q = Q.return;
        }
        Q.sibling.return = Q.return, Q = Q.sibling;
      }
      return true;
    }
    function Q4(J, Q) {
      Q = $5(Q, mZ), Q = $5(Q, N9), B$(J, Q);
    }
    function lq(J) {
      if (IM(), (_0 & (Q8 | KJ)) !== x1)
        throw new Error("Should not already be working.");
      PQ();
      var Q = U5(J, N);
      if (!y8(Q, K0))
        return k8(J, f1()), null;
      var Z = rZ(J, Q);
      if (J.tag !== cQ && Z === T4) {
        var X = $Y(J);
        if (X !== N)
          Q = X, Z = oB(J, X);
      }
      if (Z === I9) {
        var Y = L9;
        throw h4(J, N), Q4(J, Q), k8(J, f1()), Y;
      }
      if (Z === mB)
        throw new Error("Root did not complete. This is a bug in React.");
      var G = J.current.alternate;
      return J.finishedWork = G, J.finishedLanes = Q, b4(J, T8, DQ), k8(J, f1()), null;
    }
    function qA(J, Q) {
      if (Q !== N) {
        if (MY(J, M0(Q, K0)), k8(J, f1()), (_0 & (Q8 | KJ)) === x1)
          x9(), sQ();
      }
    }
    function tB(J, Q) {
      var Z = _0;
      _0 |= fq;
      try {
        return J(Q);
      } finally {
        if (_0 = Z, _0 === x1 && !xJ.isBatchingLegacy)
          x9(), yK();
      }
    }
    function UA(J, Q, Z, X, Y) {
      var G = AJ(), B = J8.transition;
      try {
        return J8.transition = null, y1(m8), J(Q, Z, X, Y);
      } finally {
        if (y1(G), J8.transition = B, _0 === x1)
          x9();
      }
    }
    function AQ(J) {
      if (eQ !== null && eQ.tag === cQ && (_0 & (Q8 | KJ)) === x1)
        PQ();
      var Q = _0;
      _0 |= fq;
      var Z = J8.transition, X = AJ();
      try {
        if (J8.transition = null, y1(m8), J)
          return J();
        else
          return;
      } finally {
        if (y1(X), J8.transition = Z, _0 = Q, (_0 & (Q8 | KJ)) === x1)
          sQ();
      }
    }
    function pq() {
      return (_0 & (Q8 | KJ)) !== x1;
    }
    function aZ(J, Q) {
      U8(cB, pJ, J), pJ = M0(pJ, Q), sB = M0(sB, Q);
    }
    function eB(J) {
      pJ = cB.current, q8(cB, J);
    }
    function h4(J, Q) {
      J.finishedWork = null, J.finishedLanes = N;
      var Z = J.timeoutHandle;
      if (Z !== aY)
        J.timeoutHandle = aY, kO(Z);
      if (z1 !== null) {
        var X = z1.return;
        while (X !== null) {
          var Y = X.alternate;
          Fq(Y, X), X = X.return;
        }
      }
      R8 = J;
      var G = f4(J.current, null);
      return z1 = G, v1 = pJ = sB = Q, g1 = MQ, L9 = null, yZ = N, N9 = N, mZ = N, S9 = null, T8 = null, JM(), EJ.discardPendingWarnings(), G;
    }
    function aq(J, Q) {
      do {
        var Z = z1;
        try {
          if (JZ(), R3(), b1(), yB.current = null, Z === null || Z.return === null) {
            g1 = I9, L9 = Q, z1 = null;
            return;
          }
          if (n8 && Z.mode & u0)
            TZ(Z, true);
          if (CJ)
            if (K6(), Q !== null && typeof Q === "object" && typeof Q.then === "function") {
              var X = Q;
              f2(Z, X, v1);
            } else
              b2(Z, Q, v1);
          xM(J, Z.return, Z, Q, v1), tq(Z);
        } catch (Y) {
          if (Q = Y, z1 === Z && Z !== null)
            Z = Z.return, z1 = Z;
          else
            Z = z1;
          continue;
        }
        return;
      } while (true);
    }
    function rq() {
      var J = dB.current;
      if (dB.current = SZ, J === null)
        return SZ;
      else
        return J;
    }
    function nq(J) {
      dB.current = J;
    }
    function VA() {
      iB = f1();
    }
    function T9(J) {
      yZ = M0(J, yZ);
    }
    function $A() {
      if (g1 === MQ)
        g1 = dZ;
    }
    function JW() {
      if (g1 === MQ || g1 === dZ || g1 === T4)
        g1 = _9;
      if (R8 !== null && (HY(yZ) || HY(N9)))
        Q4(R8, v1);
    }
    function HA(J) {
      if (g1 !== _9)
        g1 = T4;
      if (S9 === null)
        S9 = [J];
      else
        S9.push(J);
    }
    function OA() {
      return g1 === MQ;
    }
    function rZ(J, Q) {
      var Z = _0;
      _0 |= Q8;
      var X = rq();
      if (R8 !== J || v1 !== Q) {
        if (DJ) {
          var Y = J.memoizedUpdaters;
          if (Y.size > 0)
            k9(J, v1), Y.clear();
          Iz(J, Q);
        }
        DQ = _z(), h4(J, Q);
      }
      Hz(Q);
      do
        try {
          jA();
          break;
        } catch (G) {
          aq(J, G);
        }
      while (true);
      if (JZ(), _0 = Z, nq(X), z1 !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Oz(), R8 = null, v1 = N, g1;
    }
    function jA() {
      while (z1 !== null)
        oq(z1);
    }
    function MA(J, Q) {
      var Z = _0;
      _0 |= Q8;
      var X = rq();
      if (R8 !== J || v1 !== Q) {
        if (DJ) {
          var Y = J.memoizedUpdaters;
          if (Y.size > 0)
            k9(J, v1), Y.clear();
          Iz(J, Q);
        }
        DQ = _z(), x9(), h4(J, Q);
      }
      Hz(Q);
      do
        try {
          DA();
          break;
        } catch (G) {
          aq(J, G);
        }
      while (true);
      if (JZ(), nq(X), _0 = Z, z1 !== null)
        return c2(), MQ;
      else
        return Oz(), R8 = null, v1 = N, g1;
    }
    function DA() {
      while (z1 !== null && !M2())
        oq(z1);
    }
    function oq(J) {
      var Q = J.alternate;
      B1(J);
      var Z;
      if ((J.mode & u0) !== X0)
        HB(J), Z = QW(Q, J, pJ), TZ(J, true);
      else
        Z = QW(Q, J, pJ);
      if (b1(), J.memoizedProps = J.pendingProps, Z === null)
        tq(J);
      else
        z1 = Z;
      yB.current = null;
    }
    function tq(J) {
      var Q = J;
      do {
        var { alternate: Z, return: X } = Q;
        if ((Q.flags & A7) === Z0) {
          B1(Q);
          var Y = undefined;
          if ((Q.mode & u0) === X0)
            Y = Pq(Z, Q, pJ);
          else
            HB(Q), Y = Pq(Z, Q, pJ), TZ(Q, false);
          if (b1(), Y !== null) {
            z1 = Y;
            return;
          }
        } else {
          var G = zD(Z, Q);
          if (G !== null) {
            G.flags &= U2, z1 = G;
            return;
          }
          if ((Q.mode & u0) !== X0) {
            TZ(Q, false);
            var { actualDuration: B, child: W } = Q;
            while (W !== null)
              B += W.actualDuration, W = W.sibling;
            Q.actualDuration = B;
          }
          if (X !== null)
            X.flags |= A7, X.subtreeFlags = Z0, X.deletions = null;
          else {
            g1 = mB, z1 = null;
            return;
          }
        }
        var z = Q.sibling;
        if (z !== null) {
          z1 = z;
          return;
        }
        Q = X, z1 = Q;
      } while (Q !== null);
      if (g1 === MQ)
        g1 = uq;
    }
    function b4(J, Q, Z) {
      var X = AJ(), Y = J8.transition;
      try {
        J8.transition = null, y1(m8), AA(J, Q, Z, X);
      } finally {
        J8.transition = Y, y1(X);
      }
      return null;
    }
    function AA(J, Q, Z, X) {
      do
        PQ();
      while (eQ !== null);
      if (xA(), (_0 & (Q8 | KJ)) !== x1)
        throw new Error("Should not already be working.");
      var { finishedWork: Y, finishedLanes: G } = J;
      if (x2(G), Y === null)
        return Uz(), null;
      else if (G === N)
        V("root.finishedLanes should not be empty during a commit. This is a bug in React.");
      if (J.finishedWork = null, J.finishedLanes = N, Y === J.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      J.callbackNode = null, J.callbackPriority = d1;
      var B = M0(Y.lanes, Y.childLanes);
      if (W$(J, B), J === R8)
        R8 = null, z1 = null, v1 = N;
      if ((Y.subtreeFlags & z6) !== Z0 || (Y.flags & z6) !== Z0) {
        if (!k4)
          k4 = true, aB = Z, YW(O4, function() {
            return PQ(), null;
          });
      }
      var W = (Y.subtreeFlags & (mX | cX | P7 | z6)) !== Z0, z = (Y.flags & (mX | cX | P7 | z6)) !== Z0;
      if (W || z) {
        var q = J8.transition;
        J8.transition = null;
        var U = AJ();
        y1(m8);
        var j = _0;
        _0 |= KJ, yB.current = null;
        var O = $D(J, Y);
        a3(), LD(J, Y, G), NO(J.containerInfo), J.current = Y, u2(G), ND(Y, J, G), d2(), D2(), _0 = j, y1(U), J8.transition = q;
      } else
        J.current = Y, a3();
      var F = k4;
      if (k4)
        k4 = false, eQ = J, v9 = G;
      else
        c6 = 0, iZ = null;
      if (B = J.pendingLanes, B === N)
        m6 = null;
      if (!F)
        ZU(J.current, false);
      if (I2(Y.stateNode, X), DJ)
        J.memoizedUpdaters.clear();
      if (tD(), k8(J, f1()), Q !== null) {
        var A = J.onRecoverableError;
        for (var R = 0;R < Q.length; R++) {
          var u = Q[R], o = u.stack, a = u.digest;
          A(u.value, { componentStack: o, digest: a });
        }
      }
      if (cZ) {
        cZ = false;
        var P0 = lB;
        throw lB = null, P0;
      }
      if (y8(v9, K0) && J.tag !== cQ)
        PQ();
      if (B = J.pendingLanes, y8(B, K0))
        if (RM(), J === rB)
          g9++;
        else
          g9 = 0, rB = J;
      else
        g9 = 0;
      return sQ(), Uz(), null;
    }
    function PQ() {
      if (eQ !== null) {
        var J = Lz(v9), Q = U$(KQ, J), Z = J8.transition, X = AJ();
        try {
          return J8.transition = null, y1(Q), FA();
        } finally {
          y1(X), J8.transition = Z;
        }
      }
      return false;
    }
    function PA(J) {
      if (pB.push(J), !k4)
        k4 = true, YW(O4, function() {
          return PQ(), null;
        });
    }
    function FA() {
      if (eQ === null)
        return false;
      var J = aB;
      aB = null;
      var Q = eQ, Z = v9;
      if (eQ = null, v9 = N, (_0 & (Q8 | KJ)) !== x1)
        throw new Error("Cannot flush passive effects while already rendering.");
      nB = true, sZ = false, y2(Z);
      var X = _0;
      _0 |= KJ, kD(Q.current), vD(Q, Q.current, Z, J);
      {
        var Y = pB;
        pB = [];
        for (var G = 0;G < Y.length; G++) {
          var B = Y[G];
          MD(Q, B);
        }
      }
      m2(), ZU(Q.current, true), _0 = X, sQ();
      {
        if (sZ)
          if (Q === iZ)
            c6++;
          else
            c6 = 0, iZ = Q;
        else
          c6 = 0;
        nB = false, sZ = false;
      }
      _2(Q);
      {
        var W = Q.current.stateNode;
        W.effectDuration = 0, W.passiveEffectDuration = 0;
      }
      return true;
    }
    function eq(J) {
      return m6 !== null && m6.has(J);
    }
    function EA(J) {
      if (m6 === null)
        m6 = new Set([J]);
      else
        m6.add(J);
    }
    function RA(J) {
      if (!cZ)
        cZ = true, lB = J;
    }
    var wA = RA;
    function JU(J, Q, Z) {
      var X = g4(Z, Q), Y = n3(J, X, K0), G = lQ(J, Y, K0), B = w8();
      if (G !== null)
        N7(G, K0, B), k8(G, B);
    }
    function t0(J, Q, Z) {
      if (qD(Z), h9(false), J.tag === T) {
        JU(J, J, Z);
        return;
      }
      var X = null;
      X = Q;
      while (X !== null) {
        if (X.tag === T) {
          JU(X, J, Z);
          return;
        } else if (X.tag === i) {
          var { type: Y, stateNode: G } = X;
          if (typeof Y.getDerivedStateFromError === "function" || typeof G.componentDidCatch === "function" && !eq(G)) {
            var B = g4(Z, J), W = PB(X, B, K0), z = lQ(X, W, K0), q = w8();
            if (z !== null)
              N7(z, K0, q), k8(z, q);
            return;
          }
        }
        X = X.return;
      }
      V("Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.\n\nError message:\n\n%s", Z);
    }
    function IA(J, Q, Z) {
      var X = J.pingCache;
      if (X !== null)
        X.delete(Q);
      var Y = w8();
      if (Rz(J, Z), TA(J), R8 === J && $6(v1, Z))
        if (g1 === _9 || g1 === dZ && Az(v1) && f1() - iB < dq)
          h4(J, N);
        else
          mZ = M0(mZ, Z);
      k8(J, Y);
    }
    function QU(J, Q) {
      if (Q === d1)
        Q = GA(J);
      var Z = w8(), X = g8(J, Q);
      if (X !== null)
        N7(X, Q, Z), k8(X, Z);
    }
    function _A(J) {
      var Q = J.memoizedState, Z = d1;
      if (Q !== null)
        Z = Q.retryLane;
      QU(J, Z);
    }
    function LA(J, Q) {
      var Z = d1, X;
      switch (J.tag) {
        case A0:
          X = J.stateNode;
          var Y = J.memoizedState;
          if (Y !== null)
            Z = Y.retryLane;
          break;
        case R1:
          X = J.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      if (X !== null)
        X.delete(Q);
      QU(J, Z);
    }
    function NA(J) {
      return J < 120 ? 120 : J < 480 ? 480 : J < 1080 ? 1080 : J < 1920 ? 1920 : J < 3000 ? 3000 : J < 4320 ? 4320 : QA(J / 1960) * 1960;
    }
    function SA() {
      if (g9 > XA)
        throw g9 = 0, rB = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      if (c6 > YA)
        c6 = 0, iZ = null, V("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.");
    }
    function xA() {
      EJ.flushLegacyContextWarning(), EJ.flushPendingUnsafeLifecycleWarnings();
    }
    function ZU(J, Q) {
      {
        if (B1(J), nZ(J, GQ, sD), Q)
          nZ(J, B5, iD);
        if (nZ(J, GQ, mD), Q)
          nZ(J, B5, cD);
        b1();
      }
    }
    function nZ(J, Q, Z) {
      {
        var X = J, Y = null;
        while (X !== null) {
          var G = X.subtreeFlags & Q;
          if (X !== Y && X.child !== null && G !== Z0)
            X = X.child;
          else {
            if ((X.flags & Q) !== Z0)
              Z(X);
            if (X.sibling !== null)
              X = X.sibling;
            else
              X = Y = X.return;
          }
        }
      }
    }
    var oZ = null;
    function XU(J) {
      {
        if ((_0 & Q8) !== x1)
          return;
        if (!(J.mode & I0))
          return;
        var Q = J.tag;
        if (Q !== R0 && Q !== T && Q !== i && Q !== t && Q !== Y0 && Q !== K1 && Q !== v0)
          return;
        var Z = H0(J) || "ReactComponent";
        if (oZ !== null) {
          if (oZ.has(Z))
            return;
          oZ.add(Z);
        } else
          oZ = new Set([Z]);
        var X = K8;
        try {
          B1(J), V("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          if (X)
            B1(J);
          else
            b1();
        }
      }
    }
    var QW;
    {
      var vA = null;
      QW = function(J, Q, Z) {
        var X = UU(vA, Q);
        try {
          return Oq(J, Q, Z);
        } catch (G) {
          if (dj() || G !== null && typeof G === "object" && typeof G.then === "function")
            throw G;
          if (JZ(), R3(), Fq(J, Q), UU(Q, X), Q.mode & u0)
            HB(Q);
          if (hX(null, Oq, null, J, Q, Z), W2()) {
            var Y = bX();
            if (typeof Y === "object" && Y !== null && Y._suppressLogging && typeof G === "object" && G !== null && !G._suppressLogging)
              G._suppressLogging = true;
          }
          throw G;
        }
      };
    }
    var YU = false, ZW;
    ZW = new Set;
    function gA(J) {
      if (vQ && !PM())
        switch (J.tag) {
          case t:
          case Y0:
          case v0: {
            var Q = z1 && H0(z1) || "Unknown", Z = Q;
            if (!ZW.has(Z)) {
              ZW.add(Z);
              var X = H0(J) || "Unknown";
              V("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", X, Q, Q);
            }
            break;
          }
          case i: {
            if (!YU)
              V("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), YU = true;
            break;
          }
        }
    }
    function k9(J, Q) {
      if (DJ) {
        var Z = J.memoizedUpdaters;
        Z.forEach(function(X) {
          wz(J, X, Q);
        });
      }
    }
    var XW = {};
    function YW(J, Q) {
      {
        var Z = xJ.current;
        if (Z !== null)
          return Z.push(Q), XW;
        else
          return qz(J, Q);
      }
    }
    function GU(J) {
      if (J === XW)
        return;
      return j2(J);
    }
    function BU() {
      return xJ.current !== null;
    }
    function CA(J) {
      {
        if (J.mode & I0) {
          if (!bq())
            return;
        } else {
          if (!JA())
            return;
          if (_0 !== x1)
            return;
          if (J.tag !== t && J.tag !== Y0 && J.tag !== v0)
            return;
        }
        if (xJ.current === null) {
          var Q = K8;
          try {
            B1(J), V("An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act", H0(J));
          } finally {
            if (Q)
              B1(J);
            else
              b1();
          }
        }
      }
    }
    function TA(J) {
      if (J.tag !== cQ && bq() && xJ.current === null)
        V("A suspended resource finished loading inside a test, but the event was not wrapped in act(...).\n\nWhen testing, code that resolves suspended data should be wrapped into act(...):\n\nact(() => {\n  /* finish loading suspended data */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act");
    }
    function h9(J) {
      cq = J;
    }
    var qJ = null, s6 = null, kA = function(J) {
      qJ = J;
    };
    function i6(J) {
      {
        if (qJ === null)
          return J;
        var Q = qJ(J);
        if (Q === undefined)
          return J;
        return Q.current;
      }
    }
    function GW(J) {
      return i6(J);
    }
    function BW(J) {
      {
        if (qJ === null)
          return J;
        var Q = qJ(J);
        if (Q === undefined) {
          if (J !== null && J !== undefined && typeof J.render === "function") {
            var Z = i6(J.render);
            if (J.render !== Z) {
              var X = { $$typeof: O0, render: Z };
              if (J.displayName !== undefined)
                X.displayName = J.displayName;
              return X;
            }
          }
          return J;
        }
        return Q.current;
      }
    }
    function WU(J, Q) {
      {
        if (qJ === null)
          return false;
        var Z = J.elementType, X = Q.type, Y = false, G = typeof X === "object" && X !== null ? X.$$typeof : null;
        switch (J.tag) {
          case i: {
            if (typeof X === "function")
              Y = true;
            break;
          }
          case t: {
            if (typeof X === "function")
              Y = true;
            else if (G === E0)
              Y = true;
            break;
          }
          case Y0: {
            if (G === O0)
              Y = true;
            else if (G === E0)
              Y = true;
            break;
          }
          case K1:
          case v0: {
            if (G === c0)
              Y = true;
            else if (G === E0)
              Y = true;
            break;
          }
          default:
            return false;
        }
        if (Y) {
          var B = qJ(Z);
          if (B !== undefined && B === qJ(X))
            return true;
        }
        return false;
      }
    }
    function zU(J) {
      {
        if (qJ === null)
          return;
        if (typeof WeakSet !== "function")
          return;
        if (s6 === null)
          s6 = new WeakSet;
        s6.add(J);
      }
    }
    var hA = function(J, Q) {
      {
        if (qJ === null)
          return;
        var { staleFamilies: Z, updatedFamilies: X } = Q;
        PQ(), AQ(function() {
          WW(J.current, X, Z);
        });
      }
    }, bA = function(J, Q) {
      {
        if (J.context !== i8)
          return;
        PQ(), AQ(function() {
          b9(Q, J, null, null);
        });
      }
    };
    function WW(J, Q, Z) {
      {
        var { alternate: X, child: Y, sibling: G, tag: B, type: W } = J, z = null;
        switch (B) {
          case t:
          case v0:
          case i:
            z = W;
            break;
          case Y0:
            z = W.render;
            break;
        }
        if (qJ === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var q = false, U = false;
        if (z !== null) {
          var j = qJ(z);
          if (j !== undefined) {
            if (Z.has(j))
              U = true;
            else if (Q.has(j))
              if (B === i)
                U = true;
              else
                q = true;
          }
        }
        if (s6 !== null) {
          if (s6.has(J) || X !== null && s6.has(X))
            U = true;
        }
        if (U)
          J._debugNeedsRemount = true;
        if (U || q) {
          var O = g8(J, K0);
          if (O !== null)
            C1(O, J, K0, Z1);
        }
        if (Y !== null && !U)
          WW(Y, Q, Z);
        if (G !== null)
          WW(G, Q, Z);
      }
    }
    var fA = function(J, Q) {
      {
        var Z = new Set, X = new Set(Q.map(function(Y) {
          return Y.current;
        }));
        return zW(J.current, X, Z), Z;
      }
    };
    function zW(J, Q, Z) {
      {
        var { child: X, sibling: Y, tag: G, type: B } = J, W = null;
        switch (G) {
          case t:
          case v0:
          case i:
            W = B;
            break;
          case Y0:
            W = B.render;
            break;
        }
        var z = false;
        if (W !== null) {
          if (Q.has(W))
            z = true;
        }
        if (z)
          uA(J, Z);
        else if (X !== null)
          zW(X, Q, Z);
        if (Y !== null)
          zW(Y, Q, Z);
      }
    }
    function uA(J, Q) {
      {
        var Z = dA(J, Q);
        if (Z)
          return;
        var X = J;
        while (true) {
          switch (X.tag) {
            case c:
              Q.add(X.stateNode);
              return;
            case e:
              Q.add(X.stateNode.containerInfo);
              return;
            case T:
              Q.add(X.stateNode.containerInfo);
              return;
          }
          if (X.return === null)
            throw new Error("Expected to reach root first.");
          X = X.return;
        }
      }
    }
    function dA(J, Q) {
      {
        var Z = J, X = false;
        while (true) {
          if (Z.tag === c)
            X = true, Q.add(Z.stateNode);
          else if (Z.child !== null) {
            Z.child.return = Z, Z = Z.child;
            continue;
          }
          if (Z === J)
            return X;
          while (Z.sibling === null) {
            if (Z.return === null || Z.return === J)
              return X;
            Z = Z.return;
          }
          Z.sibling.return = Z.return, Z = Z.sibling;
        }
      }
      return false;
    }
    var KW;
    {
      KW = false;
      try {
        var KU = Object.preventExtensions({});
      } catch (J) {
        KW = true;
      }
    }
    function yA(J, Q, Z, X) {
      if (this.tag = J, this.key = Z, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = Q, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = X, this.flags = Z0, this.subtreeFlags = Z0, this.deletions = null, this.lanes = N, this.childLanes = N, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = false, this._debugHookTypes = null, !KW && typeof Object.preventExtensions === "function")
        Object.preventExtensions(this);
    }
    var l8 = function(J, Q, Z, X) {
      return new yA(J, Q, Z, X);
    };
    function qW(J) {
      var Q = J.prototype;
      return !!(Q && Q.isReactComponent);
    }
    function mA(J) {
      return typeof J === "function" && !qW(J) && J.defaultProps === undefined;
    }
    function cA(J) {
      if (typeof J === "function")
        return qW(J) ? i : t;
      else if (J !== undefined && J !== null) {
        var Q = J.$$typeof;
        if (Q === O0)
          return Y0;
        if (Q === c0)
          return K1;
      }
      return R0;
    }
    function f4(J, Q) {
      var Z = J.alternate;
      if (Z === null)
        Z = l8(J.tag, Q, J.key, J.mode), Z.elementType = J.elementType, Z.type = J.type, Z.stateNode = J.stateNode, Z._debugSource = J._debugSource, Z._debugOwner = J._debugOwner, Z._debugHookTypes = J._debugHookTypes, Z.alternate = J, J.alternate = Z;
      else
        Z.pendingProps = Q, Z.type = J.type, Z.flags = Z0, Z.subtreeFlags = Z0, Z.deletions = null, Z.actualDuration = 0, Z.actualStartTime = -1;
      Z.flags = J.flags & BQ, Z.childLanes = J.childLanes, Z.lanes = J.lanes, Z.child = J.child, Z.memoizedProps = J.memoizedProps, Z.memoizedState = J.memoizedState, Z.updateQueue = J.updateQueue;
      var X = J.dependencies;
      switch (Z.dependencies = X === null ? null : { lanes: X.lanes, firstContext: X.firstContext }, Z.sibling = J.sibling, Z.index = J.index, Z.ref = J.ref, Z.selfBaseDuration = J.selfBaseDuration, Z.treeBaseDuration = J.treeBaseDuration, Z._debugNeedsRemount = J._debugNeedsRemount, Z.tag) {
        case R0:
        case t:
        case v0:
          Z.type = i6(J.type);
          break;
        case i:
          Z.type = GW(J.type);
          break;
        case Y0:
          Z.type = BW(J.type);
          break;
      }
      return Z;
    }
    function sA(J, Q) {
      J.flags &= BQ | D1;
      var Z = J.alternate;
      if (Z === null)
        J.childLanes = N, J.lanes = Q, J.child = null, J.subtreeFlags = Z0, J.memoizedProps = null, J.memoizedState = null, J.updateQueue = null, J.dependencies = null, J.stateNode = null, J.selfBaseDuration = 0, J.treeBaseDuration = 0;
      else {
        J.childLanes = Z.childLanes, J.lanes = Z.lanes, J.child = Z.child, J.subtreeFlags = Z0, J.deletions = null, J.memoizedProps = Z.memoizedProps, J.memoizedState = Z.memoizedState, J.updateQueue = Z.updateQueue, J.type = Z.type;
        var X = Z.dependencies;
        J.dependencies = X === null ? null : { lanes: X.lanes, firstContext: X.firstContext }, J.selfBaseDuration = Z.selfBaseDuration, J.treeBaseDuration = Z.treeBaseDuration;
      }
      return J;
    }
    function iA(J, Q, Z) {
      var X;
      if (J === l5) {
        if (X = I0, Q === true)
          X |= A1, X |= bJ;
      } else
        X = X0;
      if (DJ)
        X |= u0;
      return l8(T, null, null, X);
    }
    function UW(J, Q, Z, X, Y, G) {
      var B = R0, W = J;
      if (typeof J === "function")
        if (qW(J))
          B = i, W = GW(W);
        else
          W = i6(W);
      else if (typeof J === "string")
        B = c;
      else
        J:
          switch (J) {
            case S:
              return Z4(Z.children, Y, G, Q);
            case h:
              if (B = T1, Y |= A1, (Y & I0) !== X0)
                Y |= bJ;
              break;
            case Q0:
              return lA(Z, Y, G, Q);
            case j0:
              return pA(Z, Y, G, Q);
            case U1:
              return aA(Z, Y, G, Q);
            case W4:
              return qU(Z, Y, G, Q);
            case u8:
            case z8:
            case UX:
            case VX:
            case kJ:
            default: {
              if (typeof J === "object" && J !== null)
                switch (J.$$typeof) {
                  case G0:
                    B = N0;
                    break J;
                  case T0:
                    B = E1;
                    break J;
                  case O0:
                    B = Y0, W = BW(W);
                    break J;
                  case c0:
                    B = K1;
                    break J;
                  case E0:
                    B = e0, W = null;
                    break J;
                }
              var z = "";
              {
                if (J === undefined || typeof J === "object" && J !== null && Object.keys(J).length === 0)
                  z += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
                var q = X ? H0(X) : null;
                if (q)
                  z += "\n\nCheck the render method of `" + q + "`.";
              }
              throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (J == null ? J : typeof J) + "." + z));
            }
          }
      var U = l8(B, Z, Q, Y);
      return U.elementType = J, U.type = W, U.lanes = G, U._debugOwner = X, U;
    }
    function VW(J, Q, Z) {
      var X = null;
      X = J._owner;
      var { type: Y, key: G, props: B } = J, W = UW(Y, G, B, X, Q, Z);
      return W._debugSource = J._source, W._debugOwner = J._owner, W;
    }
    function Z4(J, Q, Z, X) {
      var Y = l8(F1, J, X, Q);
      return Y.lanes = Z, Y;
    }
    function lA(J, Q, Z, X) {
      if (typeof J.id !== "string")
        V('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof J.id);
      var Y = l8(m0, J, X, Q | u0);
      return Y.elementType = Q0, Y.lanes = Z, Y.stateNode = { effectDuration: 0, passiveEffectDuration: 0 }, Y;
    }
    function pA(J, Q, Z, X) {
      var Y = l8(A0, J, X, Q);
      return Y.elementType = j0, Y.lanes = Z, Y;
    }
    function aA(J, Q, Z, X) {
      var Y = l8(R1, J, X, Q);
      return Y.elementType = U1, Y.lanes = Z, Y;
    }
    function qU(J, Q, Z, X) {
      var Y = l8(z0, J, X, Q);
      Y.elementType = W4, Y.lanes = Z;
      var G = { isHidden: false };
      return Y.stateNode = G, Y;
    }
    function $W(J, Q, Z) {
      var X = l8(w0, J, null, Q);
      return X.lanes = Z, X;
    }
    function rA() {
      var J = l8(c, null, null, X0);
      return J.elementType = "DELETED", J;
    }
    function nA(J) {
      var Q = l8(k1, null, null, X0);
      return Q.stateNode = J, Q;
    }
    function HW(J, Q, Z) {
      var X = J.children !== null ? J.children : [], Y = l8(e, X, J.key, Q);
      return Y.lanes = Z, Y.stateNode = { containerInfo: J.containerInfo, pendingChildren: null, implementation: J.implementation }, Y;
    }
    function UU(J, Q) {
      if (J === null)
        J = l8(R0, null, null, X0);
      return J.tag = Q.tag, J.key = Q.key, J.elementType = Q.elementType, J.type = Q.type, J.stateNode = Q.stateNode, J.return = Q.return, J.child = Q.child, J.sibling = Q.sibling, J.index = Q.index, J.ref = Q.ref, J.pendingProps = Q.pendingProps, J.memoizedProps = Q.memoizedProps, J.updateQueue = Q.updateQueue, J.memoizedState = Q.memoizedState, J.dependencies = Q.dependencies, J.mode = Q.mode, J.flags = Q.flags, J.subtreeFlags = Q.subtreeFlags, J.deletions = Q.deletions, J.lanes = Q.lanes, J.childLanes = Q.childLanes, J.alternate = Q.alternate, J.actualDuration = Q.actualDuration, J.actualStartTime = Q.actualStartTime, J.selfBaseDuration = Q.selfBaseDuration, J.treeBaseDuration = Q.treeBaseDuration, J._debugSource = Q._debugSource, J._debugOwner = Q._debugOwner, J._debugNeedsRemount = Q._debugNeedsRemount, J._debugHookTypes = Q._debugHookTypes, J;
    }
    function oA(J, Q, Z, X, Y) {
      this.tag = Q, this.containerInfo = J, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = aY, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = d1, this.eventTimes = jY(N), this.expirationTimes = jY(Z1), this.pendingLanes = N, this.suspendedLanes = N, this.pingedLanes = N, this.expiredLanes = N, this.mutableReadLanes = N, this.finishedLanes = N, this.entangledLanes = N, this.entanglements = jY(N), this.identifierPrefix = X, this.onRecoverableError = Y, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = new Set;
        var G = this.pendingUpdatersLaneMap = [];
        for (var B = 0;B < pX; B++)
          G.push(new Set);
      }
      switch (Q) {
        case l5:
          this._debugRootType = Z ? "hydrateRoot()" : "createRoot()";
          break;
        case cQ:
          this._debugRootType = Z ? "hydrate()" : "render()";
          break;
      }
    }
    function VU(J, Q, Z, X, Y, G, B, W, z, q) {
      var U = new oA(J, Q, Z, W, z), j = iA(Q, G);
      U.current = j, j.stateNode = U;
      {
        var O = { element: X, isDehydrated: Z, cache: null, transitions: null, pendingSuspenseBoundaries: null };
        j.memoizedState = O;
      }
      return PG(j), U;
    }
    var OW = "18.2.0";
    function tA(J, Q, Z) {
      var X = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      return M8(X), { $$typeof: H, key: X == null ? null : "" + X, children: J, containerInfo: Q, implementation: Z };
    }
    var jW, MW;
    jW = false, MW = {};
    function $U(J) {
      if (!J)
        return i8;
      var Q = B6(J), Z = vj(Q);
      if (Q.tag === i) {
        var X = Q.type;
        if (dJ(X))
          return fK(Q, X, Z);
      }
      return Z;
    }
    function eA(J, Q) {
      {
        var Z = B6(J);
        if (Z === undefined)
          if (typeof J.render === "function")
            throw new Error("Unable to find node on an unmounted component.");
          else {
            var X = Object.keys(J).join(",");
            throw new Error("Argument appears to not be a ReactComponent. Keys: " + X);
          }
        var Y = Wz(Z);
        if (Y === null)
          return null;
        if (Y.mode & A1) {
          var G = H0(Z) || "Component";
          if (!MW[G]) {
            MW[G] = true;
            var B = K8;
            try {
              if (B1(Y), Z.mode & A1)
                V("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", Q, Q, G);
              else
                V("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", Q, Q, G);
            } finally {
              if (B)
                B1(B);
              else
                b1();
            }
          }
        }
        return Y.stateNode;
      }
    }
    function HU(J, Q, Z, X, Y, G, B, W) {
      var z = false, q = null;
      return VU(J, Q, z, q, Z, X, Y, G, B);
    }
    function OU(J, Q, Z, X, Y, G, B, W, z, q) {
      var U = true, j = VU(Z, X, U, J, Y, G, B, W, z);
      j.context = $U(null);
      var O = j.current, F = w8(), A = J4(O), R = OQ(F, A);
      return R.callback = Q !== undefined && Q !== null ? Q : null, lQ(O, R, A), BA(j, A, F), j;
    }
    function b9(J, Q, Z, X) {
      w2(Q, J);
      var Y = Q.current, G = w8(), B = J4(Y);
      s2(B);
      var W = $U(Z);
      if (Q.context === null)
        Q.context = W;
      else
        Q.pendingContext = W;
      if (vQ && K8 !== null && !jW)
        jW = true, V("Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.", H0(K8) || "Unknown");
      var z = OQ(G, B);
      if (z.payload = { element: J }, X = X === undefined ? null : X, X !== null) {
        if (typeof X !== "function")
          V("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", X);
        z.callback = X;
      }
      var q = lQ(Y, z, B);
      if (q !== null)
        C1(q, Y, B, G), GZ(q, Y, B);
      return B;
    }
    function tZ(J) {
      var Q = J.current;
      if (!Q.child)
        return null;
      switch (Q.child.tag) {
        case c:
          return iY(Q.child.stateNode);
        default:
          return Q.child.stateNode;
      }
    }
    function JP(J) {
      switch (J.tag) {
        case T: {
          var Q = J.stateNode;
          if (j5(Q)) {
            var Z = e2(Q);
            qA(Q, Z);
          }
          break;
        }
        case A0: {
          AQ(function() {
            var Y = g8(J, K0);
            if (Y !== null) {
              var G = w8();
              C1(Y, J, K0, G);
            }
          });
          var X = K0;
          DW(J, X);
          break;
        }
      }
    }
    function jU(J, Q) {
      var Z = J.memoizedState;
      if (Z !== null && Z.dehydrated !== null)
        Z.retryLane = G$(Z.retryLane, Q);
    }
    function DW(J, Q) {
      jU(J, Q);
      var Z = J.alternate;
      if (Z)
        jU(Z, Q);
    }
    function QP(J) {
      if (J.tag !== A0)
        return;
      var Q = w7, Z = g8(J, Q);
      if (Z !== null) {
        var X = w8();
        C1(Z, J, Q, X);
      }
      DW(J, Q);
    }
    function ZP(J) {
      if (J.tag !== A0)
        return;
      var Q = J4(J), Z = g8(J, Q);
      if (Z !== null) {
        var X = w8();
        C1(Z, J, Q, X);
      }
      DW(J, Q);
    }
    function MU(J) {
      var Q = O2(J);
      if (Q === null)
        return null;
      return Q.stateNode;
    }
    var DU = function(J) {
      return null;
    };
    function XP(J) {
      return DU(J);
    }
    var AU = function(J) {
      return false;
    };
    function YP(J) {
      return AU(J);
    }
    var PU = null, FU = null, EU = null, RU = null, wU = null, IU = null, _U = null, LU = null, NU = null;
    {
      var SU = function(J, Q, Z) {
        var X = Q[Z], Y = I1(J) ? J.slice() : D0({}, J);
        if (Z + 1 === Q.length) {
          if (I1(Y))
            Y.splice(X, 1);
          else
            delete Y[X];
          return Y;
        }
        return Y[X] = SU(J[X], Q, Z + 1), Y;
      }, xU = function(J, Q) {
        return SU(J, Q, 0);
      }, vU = function(J, Q, Z, X) {
        var Y = Q[X], G = I1(J) ? J.slice() : D0({}, J);
        if (X + 1 === Q.length) {
          var B = Z[X];
          if (G[B] = G[Y], I1(G))
            G.splice(Y, 1);
          else
            delete G[Y];
        } else
          G[Y] = vU(J[Y], Q, Z, X + 1);
        return G;
      }, gU = function(J, Q, Z) {
        if (Q.length !== Z.length) {
          r("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var X = 0;X < Z.length - 1; X++)
            if (Q[X] !== Z[X]) {
              r("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return vU(J, Q, Z, 0);
      }, CU = function(J, Q, Z, X) {
        if (Z >= Q.length)
          return X;
        var Y = Q[Z], G = I1(J) ? J.slice() : D0({}, J);
        return G[Y] = CU(J[Y], Q, Z + 1, X), G;
      }, TU = function(J, Q, Z) {
        return CU(J, Q, 0, Z);
      }, AW = function(J, Q) {
        var Z = J.memoizedState;
        while (Z !== null && Q > 0)
          Z = Z.next, Q--;
        return Z;
      };
      PU = function(J, Q, Z, X) {
        var Y = AW(J, Q);
        if (Y !== null) {
          var G = TU(Y.memoizedState, Z, X);
          Y.memoizedState = G, Y.baseState = G, J.memoizedProps = D0({}, J.memoizedProps);
          var B = g8(J, K0);
          if (B !== null)
            C1(B, J, K0, Z1);
        }
      }, FU = function(J, Q, Z) {
        var X = AW(J, Q);
        if (X !== null) {
          var Y = xU(X.memoizedState, Z);
          X.memoizedState = Y, X.baseState = Y, J.memoizedProps = D0({}, J.memoizedProps);
          var G = g8(J, K0);
          if (G !== null)
            C1(G, J, K0, Z1);
        }
      }, EU = function(J, Q, Z, X) {
        var Y = AW(J, Q);
        if (Y !== null) {
          var G = gU(Y.memoizedState, Z, X);
          Y.memoizedState = G, Y.baseState = G, J.memoizedProps = D0({}, J.memoizedProps);
          var B = g8(J, K0);
          if (B !== null)
            C1(B, J, K0, Z1);
        }
      }, RU = function(J, Q, Z) {
        if (J.pendingProps = TU(J.memoizedProps, Q, Z), J.alternate)
          J.alternate.pendingProps = J.pendingProps;
        var X = g8(J, K0);
        if (X !== null)
          C1(X, J, K0, Z1);
      }, wU = function(J, Q) {
        if (J.pendingProps = xU(J.memoizedProps, Q), J.alternate)
          J.alternate.pendingProps = J.pendingProps;
        var Z = g8(J, K0);
        if (Z !== null)
          C1(Z, J, K0, Z1);
      }, IU = function(J, Q, Z) {
        if (J.pendingProps = gU(J.memoizedProps, Q, Z), J.alternate)
          J.alternate.pendingProps = J.pendingProps;
        var X = g8(J, K0);
        if (X !== null)
          C1(X, J, K0, Z1);
      }, _U = function(J) {
        var Q = g8(J, K0);
        if (Q !== null)
          C1(Q, J, K0, Z1);
      }, LU = function(J) {
        DU = J;
      }, NU = function(J) {
        AU = J;
      };
    }
    function GP(J) {
      var Q = Wz(J);
      if (Q === null)
        return null;
      return Q.stateNode;
    }
    function BP(J) {
      return null;
    }
    function WP() {
      return K8;
    }
    function zP(J) {
      var Q = J.findFiberByHostInstance, Z = v.ReactCurrentDispatcher;
      return R2({ bundleType: J.bundleType, version: J.version, rendererPackageName: J.rendererPackageName, rendererConfig: J.rendererConfig, overrideHookState: PU, overrideHookStateDeletePath: FU, overrideHookStateRenamePath: EU, overrideProps: RU, overridePropsDeletePath: wU, overridePropsRenamePath: IU, setErrorHandler: LU, setSuspenseHandler: NU, scheduleUpdate: _U, currentDispatcherRef: Z, findHostInstanceByFiber: GP, findFiberByHostInstance: Q || BP, findHostInstancesForRefresh: fA, scheduleRefresh: hA, scheduleRoot: bA, setRefreshHandler: kA, getCurrentFiber: WP, reconcilerVersion: OW });
    }
    var kU = typeof reportError === "function" ? reportError : function(J) {
      console.error(J);
    };
    function PW(J) {
      this._internalRoot = J;
    }
    eZ.prototype.render = PW.prototype.render = function(J) {
      var Q = this._internalRoot;
      if (Q === null)
        throw new Error("Cannot update an unmounted root.");
      {
        if (typeof arguments[1] === "function")
          V("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
        else if (JX(arguments[1]))
          V("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.");
        else if (typeof arguments[1] !== "undefined")
          V("You passed a second argument to root.render(...) but it only accepts one argument.");
        var Z = Q.containerInfo;
        if (Z.nodeType !== M1) {
          var X = MU(Q.current);
          if (X) {
            if (X.parentNode !== Z)
              V("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
          }
        }
      }
      b9(J, Q, null, null);
    }, eZ.prototype.unmount = PW.prototype.unmount = function() {
      if (typeof arguments[0] === "function")
        V("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var J = this._internalRoot;
      if (J !== null) {
        this._internalRoot = null;
        var Q = J.containerInfo;
        if (pq())
          V("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition.");
        AQ(function() {
          b9(null, J, null, null);
        }), gK(Q);
      }
    };
    function KP(J, Q) {
      if (!JX(J))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      hU(J);
      var Z = false, X = false, Y = "", G = kU, B = null;
      if (Q !== null && Q !== undefined) {
        if (Q.hydrate)
          r("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.");
        else if (typeof Q === "object" && Q !== null && Q.$$typeof === TJ)
          V("You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:\n\n  let root = createRoot(domContainer);\n  root.render(<App />);");
        if (Q.unstable_strictMode === true)
          Z = true;
        if (Q.identifierPrefix !== undefined)
          Y = Q.identifierPrefix;
        if (Q.onRecoverableError !== undefined)
          G = Q.onRecoverableError;
        if (Q.transitionCallbacks !== undefined)
          B = Q.transitionCallbacks;
      }
      var W = HU(J, l5, null, Z, X, Y, G);
      u5(W.current, J);
      var z = J.nodeType === M1 ? J.parentNode : J;
      return i7(z), new PW(W);
    }
    function eZ(J) {
      this._internalRoot = J;
    }
    function qP(J) {
      if (J)
        E$(J);
    }
    eZ.prototype.unstable_scheduleHydration = qP;
    function UP(J, Q, Z) {
      if (!JX(J))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      if (hU(J), Q === undefined)
        V("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var X = Z != null ? Z : null, Y = Z != null && Z.hydratedSources || null, G = false, B = false, W = "", z = kU;
      if (Z !== null && Z !== undefined) {
        if (Z.unstable_strictMode === true)
          G = true;
        if (Z.identifierPrefix !== undefined)
          W = Z.identifierPrefix;
        if (Z.onRecoverableError !== undefined)
          z = Z.onRecoverableError;
      }
      var q = OU(Q, null, J, l5, X, G, B, W, z);
      if (u5(q.current, J), i7(J), Y)
        for (var U = 0;U < Y.length; U++) {
          var j = Y[U];
          OM(q, j);
        }
      return new eZ(q);
    }
    function JX(J) {
      return !!(J && (J.nodeType === x8 || J.nodeType === ZQ || J.nodeType === IX || !G8));
    }
    function f9(J) {
      return !!(J && (J.nodeType === x8 || J.nodeType === ZQ || J.nodeType === IX || J.nodeType === M1 && J.nodeValue === " react-mount-point-unstable "));
    }
    function hU(J) {
      {
        if (J.nodeType === x8 && J.tagName && J.tagName.toUpperCase() === "BODY")
          V("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app.");
        if (Z9(J))
          if (J._reactRootContainer)
            V("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.");
          else
            V("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it.");
      }
    }
    var VP = v.ReactCurrentOwner, bU;
    bU = function(J) {
      if (J._reactRootContainer && J.nodeType !== M1) {
        var Q = MU(J._reactRootContainer.current);
        if (Q) {
          if (Q.parentNode !== J)
            V("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
        }
      }
      var Z = !!J._reactRootContainer, X = FW(J), Y = !!(X && yQ(X));
      if (Y && !Z)
        V("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render.");
      if (J.nodeType === x8 && J.tagName && J.tagName.toUpperCase() === "BODY")
        V("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function FW(J) {
      if (!J)
        return null;
      if (J.nodeType === ZQ)
        return J.documentElement;
      else
        return J.firstChild;
    }
    function fU() {
    }
    function $P(J, Q, Z, X, Y) {
      if (Y) {
        if (typeof X === "function") {
          var G = X;
          X = function() {
            var O = tZ(B);
            G.call(O);
          };
        }
        var B = OU(Q, X, J, cQ, null, false, false, "", fU);
        J._reactRootContainer = B, u5(B.current, J);
        var W = J.nodeType === M1 ? J.parentNode : J;
        return i7(W), AQ(), B;
      } else {
        var z;
        while (z = J.lastChild)
          J.removeChild(z);
        if (typeof X === "function") {
          var q = X;
          X = function() {
            var O = tZ(U);
            q.call(O);
          };
        }
        var U = HU(J, cQ, null, false, false, "", fU);
        J._reactRootContainer = U, u5(U.current, J);
        var j = J.nodeType === M1 ? J.parentNode : J;
        return i7(j), AQ(function() {
          b9(Q, U, Z, X);
        }), U;
      }
    }
    function HP(J, Q) {
      if (J !== null && typeof J !== "function")
        V("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", Q, J);
    }
    function QX(J, Q, Z, X, Y) {
      bU(Z), HP(Y === undefined ? null : Y, "render");
      var G = Z._reactRootContainer, B;
      if (!G)
        B = $P(Z, Q, J, Y, X);
      else {
        if (B = G, typeof Y === "function") {
          var W = Y;
          Y = function() {
            var z = tZ(B);
            W.call(z);
          };
        }
        b9(Q, B, J, Y);
      }
      return tZ(B);
    }
    function OP(J) {
      {
        var Q = VP.current;
        if (Q !== null && Q.stateNode !== null) {
          var Z = Q.stateNode._warnedAboutRefsInRender;
          if (!Z)
            V("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", s0(Q.type) || "A component");
          Q.stateNode._warnedAboutRefsInRender = true;
        }
      }
      if (J == null)
        return null;
      if (J.nodeType === x8)
        return J;
      return eA(J, "findDOMNode");
    }
    function jP(J, Q, Z) {
      if (V("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !f9(Q))
        throw new Error("Target container is not a DOM element.");
      {
        var X = Z9(Q) && Q._reactRootContainer === undefined;
        if (X)
          V("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return QX(null, J, Q, true, Z);
    }
    function MP(J, Q, Z) {
      if (V("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !f9(Q))
        throw new Error("Target container is not a DOM element.");
      {
        var X = Z9(Q) && Q._reactRootContainer === undefined;
        if (X)
          V("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return QX(null, J, Q, false, Z);
    }
    function DP(J, Q, Z, X) {
      if (V("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !f9(Z))
        throw new Error("Target container is not a DOM element.");
      if (J == null || !z2(J))
        throw new Error("parentComponent must be a valid React Component");
      return QX(J, Q, Z, false, X);
    }
    function AP(J) {
      if (!f9(J))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var Q = Z9(J) && J._reactRootContainer === undefined;
        if (Q)
          V("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (J._reactRootContainer) {
        {
          var Z = FW(J), X = Z && !yQ(Z);
          if (X)
            V("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return AQ(function() {
          QX(null, null, J, false, function() {
            J._reactRootContainer = null, gK(J);
          });
        }), true;
      } else {
        {
          var Y = FW(J), G = !!(Y && yQ(Y)), B = J.nodeType === x8 && f9(J.parentNode) && !!J.parentNode._reactRootContainer;
          if (G)
            V("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", B ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return false;
      }
    }
    if (V$(JP), H$(QP), O$(ZP), j$(AJ), M$(K$), typeof Map !== "function" || Map.prototype == null || typeof Map.prototype.forEach !== "function" || typeof Set !== "function" || Set.prototype == null || typeof Set.prototype.clear !== "function" || typeof Set.prototype.forEach !== "function")
      V("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
    oV(DO), J2(tB, UA, AQ);
    function PP(J, Q) {
      var Z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (!JX(Q))
        throw new Error("Target container is not a DOM element.");
      return tA(J, Q, null, Z);
    }
    function FP(J, Q, Z, X) {
      return DP(J, Q, Z, X);
    }
    var EW = { usingClientEntryPoint: false, Events: [yQ, E6, d5, rW, nW, tB] };
    function EP(J, Q) {
      if (!EW.usingClientEntryPoint)
        V('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".');
      return KP(J, Q);
    }
    function RP(J, Q, Z) {
      if (!EW.usingClientEntryPoint)
        V('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".');
      return UP(J, Q, Z);
    }
    function wP(J) {
      if (pq())
        V("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.");
      return AQ(J);
    }
    var IP = zP({ findFiberByHostInstance: R4, bundleType: 1, version: OW, rendererPackageName: "react-dom" });
    if (!IP && c1 && window.top === window.self) {
      if (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1) {
        var uU = window.location.protocol;
        if (/^(https?|file):$/.test(uU))
          console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (uU === "file:" ? "\nYou might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq" : ""), "font-weight:bold");
      }
    }
    if (cP.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = EW, cP.createPortal = PP, cP.createRoot = EP, cP.findDOMNode = OP, cP.flushSync = wP, cP.hydrate = jP, cP.hydrateRoot = RP, cP.render = MP, cP.unmountComponentAtNode = AP, cP.unstable_batchedUpdates = tB, cP.unstable_renderSubtreeIntoContainer = FP, cP.version = OW, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function")
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error);
  })();
});
var GV = d9((sP) => {
  var r6 = G1(YV(), 1);
  y9 = r6.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, sP.createRoot = function(E, _) {
    y9.usingClientEntryPoint = true;
    try {
      return r6.createRoot(E, _);
    } finally {
      y9.usingClientEntryPoint = false;
    }
  }, sP.hydrateRoot = function(E, _, v) {
    y9.usingClientEntryPoint = true;
    try {
      return r6.hydrateRoot(E, _, v);
    } finally {
      y9.usingClientEntryPoint = false;
    }
  };
  var y9;
});
var yU = function(E, _, v = []) {
  const s = v ?? [], m = E.length.valueOf();
  s.length = m;
  for (let r = 0;r < m; r++) {
    const V = E.at(r);
    s[r] = _(V, r);
  }
  return s;
};
var y4 = G1(a8(), 1);
var UJ = G1(a8(), 1);
var YX = G1(a8(), 1);
var XX = G1(a8(), 1);

class p6 {
  #J = new Set;
  onUp() {
    for (let E of this.#J)
      E.onUp?.();
  }
  onDown() {
    for (let E of this.#J)
      E.onDown?.();
  }
  onLeft() {
    for (let E of this.#J)
      E.onLeft?.();
  }
  onRight() {
    for (let E of this.#J)
      E.onRight?.();
  }
  onAction() {
    for (let E of this.#J)
      E.onAction?.();
  }
  addListener(E) {
    this.#J.add(E);
  }
  removeListener(E) {
    this.#J.delete(E);
  }
}
var cU = { popupControl: new p6, setControlsLock() {
}, removeControlsLock() {
} };
var u4 = G1(a8(), 1);
var pU = G1(vJ(), 1);
var iU = XX.default.createContext(cU);
var RW = ({ children: E, popupControl: _ }) => {
  const v = sU({ popupControl: _ });
  return pU.jsxDEV(iU.Provider, { value: v, children: E }, undefined, false, undefined, null);
};
var lU = () => {
  const E = XX.useContext(iU);
  if (!E)
    throw new Error("useControlContext must be used within a Provider");
  return E;
};
var d4;
(function(v) {
  v[v["UNLOCKED"] = 0] = "UNLOCKED";
  v[v["LOCKED"] = 1] = "LOCKED";
})(d4 || (d4 = {}));
var X4 = G1(a8(), 1);
var GX;
var TP = new Uint8Array(16);
var X8 = [];
for (let E = 0;E < 256; ++E)
  X8.push((E + 256).toString(16).slice(1));
var kP = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var _W = { randomUUID: kP };
var hP = function(E, _, v) {
  if (_W.randomUUID && !_ && !E)
    return _W.randomUUID();
  E = E || {};
  const s = E.random || (E.rng || IW)();
  if (s[6] = s[6] & 15 | 64, s[8] = s[8] & 63 | 128, _) {
    v = v || 0;
    for (let m = 0;m < 16; ++m)
      _[v + m] = s[m];
    return _;
  }
  return rU(s);
};
var LW = hP;
var KX = G1(a8(), 1);
var BX = G1(a8(), 1);
var nU = { layoutReplacementCallbacks: {}, getLayout: (E) => typeof E === "object" ? E : {} };
var tU = G1(vJ(), 1);
var oU = BX.default.createContext(nU);
var NW = ({ children: E, context: _ }) => {
  return tU.jsxDEV(oU.Provider, { value: _, children: E }, undefined, false, undefined, null);
};
var WX = () => {
  const E = BX.useContext(oU);
  if (!E)
    throw new Error("useDialogContext must be used within a Provider");
  return E;
};
var eU = 100;
var JV = 50;
var a6 = G1(a8(), 1);
var zX = G1(vJ(), 1);
var bP = { position: "absolute" };
var fP = { outline: "3px solid #fff", backgroundColor: "black", borderRadius: 12, padding: 3, boxShadow: "10px 10px 0px #000000cc", transition: "outline-color .3s" };
var uP = { border: "3px solid white", borderRadius: 10, outline: "3px solid black", color: "white", padding: 10, cursor: "pointer", transition: "border-color .3s" };
var dP = 27;
var yP = 24;
var h8 = G1(vJ(), 1);
var BV = G1(GV(), 1);
var c4 = G1(a8(), 1);
var m9 = G1(vJ(), 1);

class WV {
  constructor(E) {
    let _ = false;
    document.addEventListener("keyup", (v) => {
      _ = false;
    }), document.addEventListener("keydown", (v) => {
      if (_)
        return;
      switch (_ = true, v.code) {
        case "KeyS":
        case "ArrowDown":
          E.onDown();
          break;
        case "KeyW":
        case "ArrowUp":
          E.onUp();
          break;
        case "Space":
          E.onAction();
          break;
      }
      v.preventDefault();
    });
  }
}

// src/index.ts
function showMenu() {
  const { popupControl } = lP(document.body, {
    menu: {
      items: [
        "first",
        "second",
        {
          label: "third",
          submenu: {
            maxRows: 3,
            layout: {
              position: [150, 100],
              size: [200, 130]
            },
            items: [
              "3.1",
              "3.2",
              "3.3",
              "3.4",
              "------",
              {
                label: "exit",
                back: true
              }
            ]
          }
        }
      ]
    },
    onSelect(item) {
      console.log(item);
    }
  });
  return { keyboard: new WV(popupControl) };
}
export {
  showMenu
};
