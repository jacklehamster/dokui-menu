// /Users/vincent/dokui-menu/example/node_modules/dokui-menu/dist/index.js
var o$ = function({ items: H, maxRows: D }) {
  const [S, T] = U8.useState(0), [v, s] = U8.useState(0), U = U8.useCallback(() => {
    const k = H.length.valueOf();
    s((i) => Math.min(k - (D ?? k), i + 1));
  }, [s, H, D]), $0 = U8.useCallback(() => s((k) => Math.max(0, k - 1)), [s]);
  U8.useEffect(() => {
    if (D) {
      if (S - v >= D)
        U();
      else if (S - v < 0)
        $0();
    }
  }, [S, v, D, $0, U]);
  const n = U8.useCallback((k) => {
    const i = H.length.valueOf();
    T(Math.max(0, Math.min(k, i - 1)));
  }, [T, H]), h = U8.useCallback((k) => {
    if (k) {
      const i = H.length.valueOf();
      T((p) => Math.max(0, Math.min(p + k, i - 1)));
    }
  }, [T, H]), U0 = U8.useMemo(() => H.at(S), [H, S]);
  return { select: n, moveSelection: h, selectedItem: U0, scroll: v, scrollUp: $0, scrollDown: U, selectedIndex: S };
};
var e$ = function({ popupControl: H }) {
  const [D, S] = sQ.useState([]), T = sQ.useCallback((U) => {
    if (U)
      S(($0) => [...$0, U]);
  }, [S]), v = sQ.useCallback((U) => {
    S(($0) => {
      return $0[$0.length - 1] === U ? $0.slice(0, $0.length - 1) : $0;
    });
  }, [S]);
  return sQ.useMemo(() => ({ popupControl: H, controlsLock: D[D.length - 1], setControlsLock: T, removeControlsLock: v }), [H, D.length, T, v]);
};
var xz = function({ uid: H, listener: D }) {
  const { popupControl: S, controlsLock: T, setControlsLock: v, removeControlsLock: s } = Q2(), U = H && T === H ? zQ.UNLOCKED : zQ.LOCKED;
  return B4.useEffect(() => {
    if (U === zQ.UNLOCKED)
      return S.addListener(D), () => {
        S.removeListener(D);
      };
  }, [D, S, U]), B4.useEffect(() => {
    if (H)
      v(H);
  }, [S, H, v]), B4.useEffect(() => {
    if (H)
      return () => s(H);
  }, [v, H]), { lockState: U, popupControl: S };
};
var Z2 = function({ uid: H, items: D, maxRows: S, onSelect: T, onClose: v }) {
  const { scroll: s, scrollUp: U, scrollDown: $0, select: n, moveSelection: h, selectedItem: U0 } = o$({ items: D, maxRows: S }), [k, i] = lQ.useState(false), p = lQ.useCallback((w1) => {
    const k1 = w1 !== undefined ? D.at(w1) : U0;
    if (!k1)
      return;
    if (T(k1), typeof k1 === "object" && k1.back)
      v();
  }, [D, h, U0, i, v]), { lockState: L0 } = xz({ uid: H, listener: lQ.useMemo(() => ({ onAction: p, onUp() {
    i(false), h(-1);
  }, onDown() {
    i(false), h(1);
  } }), [h, i, p]) });
  return { selectedItem: U0, select: n, scroll: s, scrollUp: U, scrollDown: $0, disabled: L0 === zQ.LOCKED, menuHoverEnabled: k, enableMenuHover: lQ.useCallback(!k ? () => i(true) : () => {
  }, [k]), onMenuAction: p };
};
var GU = function({ layout: H }) {
  const { getLayout: D } = H4(), S = D(H), T = S.position?.[0] || XU, v = S.position?.[1] || ZU, s = S.positionFromRight ? `calc(100% - ${T}px)` : T, U = S.positionFromBottom ? `calc(100% - ${v}px)` : v, $0 = XU, n = ZU, h = S.size?.[0] || undefined, U0 = S.size?.[1] || undefined;
  return { left: s, top: U, right: $0, bottom: n, width: h, height: U0 };
};
var YU = function({ layout: H, disabled: D }) {
  const [S, T] = t5.useState(true), { layoutReplacementCallbacks: v } = H4(), s = t5.useCallback(() => T(false), [T]);
  return t5.useEffect(() => {
    const U = typeof H === "string" ? H : H.name;
    if (U && !D)
      v[U]?.(), v[U] = s, T(true);
  }, [D, s, H, v]), { visible: S };
};
var fz = function({ children: H, layout: D, style: S, disabled: T, removed: v }) {
  const [s, U] = M4.useState(0);
  M4.useEffect(() => {
    requestAnimationFrame(() => U(100));
  }, [U]);
  const { top: $0, left: n, right: h, bottom: U0, width: k, height: i } = GU({ layout: D }), { visible: p } = YU({ layout: D, disabled: T });
  return O4.jsxDEV("div", { style: { ...nw, left: n, top: $0, right: h, bottom: U0, width: k, height: i, fontSize: S?.fontSize ?? JI, display: !p ? "none" : "" }, children: O4.jsxDEV("div", { className: "pop-up", style: { ...ow, marginTop: `${v ? 80 : 0}%`, width: "100%", height: `${v ? 0 : s}%`, overflow: "hidden", transition: "height .2s, margin-top .2s", outlineColor: T ? "whitesmoke" : "white" }, children: O4.jsxDEV("div", { className: "double-border", style: { ...tw, height: `calc(100% - ${ew}px)`, pointerEvents: T ? "none" : undefined, borderColor: T ? "silver" : "white" }, children: v ? undefined : H }, undefined, false, undefined, this) }, undefined, false, undefined, this) }, undefined, false, undefined, this);
};
var q4 = function({ menu: H, onSelect: D, onClose: S, removed: T }) {
  const { items: v = [], maxRows: s, style: U, layout: $0 } = H, n = KQ.useId(), [h, U0] = KQ.useState(), k = KQ.useCallback((e0) => {
    if (typeof e0 === "object") {
      if (e0.submenu)
        U0(e0.submenu);
      if (D(e0), e0.back)
        S();
    } else
      D(e0);
  }, [D, U0, S, t2]), [i, p] = KQ.useState(false), L0 = KQ.useCallback(async () => {
    return p(true), new Promise((e0) => {
      setTimeout(() => {
        U0(undefined), p(false), e0();
      }, 200);
    });
  }, [U0, p]), { scroll: w1, scrollUp: k1, scrollDown: I1, selectedItem: _0, select: G0, disabled: y0, menuHoverEnabled: E0, enableMenuHover: B1, onMenuAction: g0 } = Z2({ uid: n, items: v, maxRows: s, onSelect: k, onClose: S });
  return b7.jsxDEV(b7.Fragment, { children: [b7.jsxDEV(fz, { layout: $0 ?? {}, style: U, disabled: y0, removed: T, children: [b7.jsxDEV("svg", { xmlns: "http://www.w3.org/2000/svg", style: { position: "absolute", height: 20, marginTop: -15, width: 200, display: w1 > 0 ? "" : "none", left: "calc(50% - 100px)" }, onMouseDown: () => k1(), children: b7.jsxDEV("polygon", { points: "100,10 110,20 90,20", style: { fill: "white" } }, undefined, false, undefined, this) }, undefined, false, undefined, this), b7.jsxDEV("div", { style: { paddingTop: 10, cursor: E0 ? "inherit" : "auto" }, children: b7.jsxDEV("div", { style: { height: "calc(100% - 27px)", overflow: "hidden" }, children: b7.jsxDEV("div", { style: { marginTop: w1 * -31, transition: "margin-top .2s" }, children: n$(v, (e0, l0) => {
    return b7.jsxDEV("div", { style: { color: _0 === e0 ? "black" : y0 ? "silver" : "white", backgroundColor: _0 !== e0 ? "black" : y0 ? "silver" : "white", transition: "color .05s, background-color .05s" }, onMouseMove: () => {
      B1(), G0(l0);
    }, onMouseOver: E0 ? () => G0(l0) : undefined, onClick: E0 ? () => g0(l0) : undefined, children: typeof e0 === "string" ? e0 : e0?.label }, l0, false, undefined, this);
  }) }, undefined, false, undefined, this) }, undefined, false, undefined, this) }, undefined, false, undefined, this), b7.jsxDEV("svg", { xmlns: "http://www.w3.org/2000/svg", style: { position: "absolute", height: 20, width: 200, marginTop: -5, display: w1 + (s ?? v.length.valueOf()) < v.length.valueOf() ? "" : "none", left: "calc(50% - 100px)" }, onMouseDown: () => I1(), children: b7.jsxDEV("polygon", { points: "100,20 110,10 90,10", style: { fill: "white" } }, undefined, false, undefined, this) }, undefined, false, undefined, this)] }, undefined, true, undefined, this), h && b7.jsxDEV(q4, { menu: h, onSelect: D, onClose: L0, removed: i }, undefined, false, undefined, this)] }, undefined, true, undefined, this);
};
var dz = function() {
  const H = pQ.useMemo(() => ({}), []), D = pQ.useMemo(() => ({}), []), S = pQ.useCallback((s) => {
    (Array.isArray(s) ? s : [s]).forEach(($0) => {
      if ($0.name)
        D[$0.name] = $0;
    });
  }, [D]), T = pQ.useCallback((s) => {
    if (typeof s === "string")
      return D[s];
    if (s.name)
      D[s.name] = s;
    return s;
  }, [D]);
  return { context: pQ.useMemo(() => ({ getLayout: T, layoutReplacementCallbacks: H }), [H, T]), registerLayout: S };
};
var GI = function(H) {
  const { context: D } = dz(), S = H.onClose ?? H.detach, T = H.onSelect ?? ((v) => console.log(v));
  return pZ.jsxDEV(bz, { context: D, children: [pZ.jsxDEV(jz, { popupControl: H.popupControl, children: pZ.jsxDEV(q4, { menu: { ...H.menu }, onClose: S, onSelect: T }, undefined, false, undefined, this) }, undefined, false, undefined, this), ";"] }, undefined, true, undefined, this);
};
var YI = function(H, D) {
  const S = document.createElement("div"), T = BU.default.createRoot(S), v = async () => T.unmount(), s = new o5, U = pZ.jsxDEV(GI, { ...D, detach: v, popupControl: s }, undefined, false, undefined, this);
  return T.render(U), H.appendChild(S), { popupControl: s, detach: v };
};
var gE = Object.create;
var { defineProperty: r$, getPrototypeOf: vE, getOwnPropertyNames: CE } = Object;
var TE = Object.prototype.hasOwnProperty;
var Z1 = (H, D, S) => {
  S = H != null ? gE(vE(H)) : {};
  const T = D || !H || !H.__esModule ? r$(S, "default", { value: H, enumerable: true }) : S;
  for (let v of CE(H))
    if (!TE.call(T, v))
      r$(T, v, { get: () => H[v], enumerable: true });
  return T;
};
var M1 = (H, D) => () => (D || H((D = { exports: {} }).exports, D), D.exports);
var r7 = M1((kE, z4) => {
  (function() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function")
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);
    var H = "18.2.0", D = Symbol.for("react.element"), S = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), v = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), U = Symbol.for("react.provider"), $0 = Symbol.for("react.context"), n = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), U0 = Symbol.for("react.suspense_list"), k = Symbol.for("react.memo"), i = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), L0 = Symbol.iterator, w1 = "@@iterator";
    function k1(B) {
      if (B === null || typeof B !== "object")
        return null;
      var O = L0 && B[L0] || B[w1];
      if (typeof O === "function")
        return O;
      return null;
    }
    var I1 = { current: null }, _0 = { transition: null }, G0 = { current: null, isBatchingLegacy: false, didScheduleLegacyUpdate: false }, y0 = { current: null }, E0 = {}, B1 = null;
    function g0(B) {
      B1 = B;
    }
    E0.setExtraStackFrame = function(B) {
      B1 = B;
    }, E0.getCurrentStack = null, E0.getStackAddendum = function() {
      var B = "";
      if (B1)
        B += B1;
      var O = E0.getCurrentStack;
      if (O)
        B += O() || "";
      return B;
    };
    var e0 = false, l0 = false, h1 = false, R1 = false, i0 = false, K0 = { ReactCurrentDispatcher: I1, ReactCurrentBatchConfig: _0, ReactCurrentOwner: y0 };
    K0.ReactDebugCurrentFrame = E0, K0.ReactCurrentActQueue = G0;
    function J1(B) {
      {
        for (var O = arguments.length, w = new Array(O > 1 ? O - 1 : 0), L = 1;L < O; L++)
          w[L - 1] = arguments[L];
        q7("warn", B, w);
      }
    }
    function z0(B) {
      {
        for (var O = arguments.length, w = new Array(O > 1 ? O - 1 : 0), L = 1;L < O; L++)
          w[L - 1] = arguments[L];
        q7("error", B, w);
      }
    }
    function q7(B, O, w) {
      {
        var L = K0.ReactDebugCurrentFrame, C = L.getStackAddendum();
        if (C !== "")
          O += "%s", w = w.concat([C]);
        var J0 = w.map(function(r) {
          return String(r);
        });
        J0.unshift("Warning: " + O), Function.prototype.apply.call(console[B], console, J0);
      }
    }
    var T8 = {};
    function c1(B, O) {
      {
        var w = B.constructor, L = w && (w.displayName || w.name) || "ReactClass", C = L + "." + O;
        if (T8[C])
          return;
        z0("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", O, L), T8[C] = true;
      }
    }
    var H8 = { isMounted: function(B) {
      return false;
    }, enqueueForceUpdate: function(B, O, w) {
      c1(B, "forceUpdate");
    }, enqueueReplaceState: function(B, O, w, L) {
      c1(B, "replaceState");
    }, enqueueSetState: function(B, O, w, L) {
      c1(B, "setState");
    } }, Y7 = Object.assign, n7 = {};
    Object.freeze(n7);
    function W7(B, O, w) {
      this.props = B, this.context = O, this.refs = n7, this.updater = w || H8;
    }
    W7.prototype.isReactComponent = {}, W7.prototype.setState = function(B, O) {
      if (typeof B !== "object" && typeof B !== "function" && B != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, B, O, "setState");
    }, W7.prototype.forceUpdate = function(B) {
      this.updater.enqueueForceUpdate(this, B, "forceUpdate");
    };
    {
      var _7 = { isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."], replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."] }, NJ = function(B, O) {
        Object.defineProperty(W7.prototype, B, { get: function() {
          J1("%s(...) is deprecated in plain JavaScript React classes. %s", O[0], O[1]);
          return;
        } });
      };
      for (var k8 in _7)
        if (_7.hasOwnProperty(k8))
          NJ(k8, _7[k8]);
    }
    function o7() {
    }
    o7.prototype = W7.prototype;
    function O8(B, O, w) {
      this.props = B, this.context = O, this.refs = n7, this.updater = w || H8;
    }
    var f7 = O8.prototype = new o7;
    f7.constructor = O8, Y7(f7, W7.prototype), f7.isPureReactComponent = true;
    function A7() {
      var B = { current: null };
      return Object.seal(B), B;
    }
    var t7 = Array.isArray;
    function z7(B) {
      return t7(B);
    }
    function d7(B) {
      {
        var O = typeof Symbol === "function" && Symbol.toStringTag, w = O && B[Symbol.toStringTag] || B.constructor.name || "Object";
        return w;
      }
    }
    function s1(B) {
      try {
        return l1(B), false;
      } catch (O) {
        return true;
      }
    }
    function l1(B) {
      return "" + B;
    }
    function H1(B) {
      if (s1(B))
        return z0("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", d7(B)), l1(B);
    }
    function i1(B, O, w) {
      var L = B.displayName;
      if (L)
        return L;
      var C = O.displayName || O.name || "";
      return C !== "" ? w + "(" + C + ")" : w;
    }
    function p1(B) {
      return B.displayName || "Context";
    }
    function q1(B) {
      if (B == null)
        return null;
      if (typeof B.tag === "number")
        z0("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
      if (typeof B === "function")
        return B.displayName || B.name || null;
      if (typeof B === "string")
        return B;
      switch (B) {
        case T:
          return "Fragment";
        case S:
          return "Portal";
        case s:
          return "Profiler";
        case v:
          return "StrictMode";
        case h:
          return "Suspense";
        case U0:
          return "SuspenseList";
      }
      if (typeof B === "object")
        switch (B.$$typeof) {
          case $0:
            var O = B;
            return p1(O) + ".Consumer";
          case U:
            var w = B;
            return p1(w._context) + ".Provider";
          case n:
            return i1(B, B.render, "ForwardRef");
          case k:
            var L = B.displayName || null;
            if (L !== null)
              return L;
            return q1(B.type) || "Memo";
          case i: {
            var C = B, J0 = C._payload, r = C._init;
            try {
              return q1(r(J0));
            } catch (O0) {
              return null;
            }
          }
        }
      return null;
    }
    var P7 = Object.prototype.hasOwnProperty, SJ = { key: true, ref: true, __self: true, __source: true }, _J, e7, K7;
    K7 = {};
    function J8(B) {
      if (P7.call(B, "ref")) {
        var O = Object.getOwnPropertyDescriptor(B, "ref").get;
        if (O && O.isReactWarning)
          return false;
      }
      return B.ref !== undefined;
    }
    function F7(B) {
      if (P7.call(B, "key")) {
        var O = Object.getOwnPropertyDescriptor(B, "key").get;
        if (O && O.isReactWarning)
          return false;
      }
      return B.key !== undefined;
    }
    function Q8(B, O) {
      var w = function() {
        if (!_J)
          _J = true, z0("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", O);
      };
      w.isReactWarning = true, Object.defineProperty(B, "key", { get: w, configurable: true });
    }
    function A1(B, O) {
      var w = function() {
        if (!e7)
          e7 = true, z0("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", O);
      };
      w.isReactWarning = true, Object.defineProperty(B, "ref", { get: w, configurable: true });
    }
    function X8(B) {
      if (typeof B.ref === "string" && y0.current && B.__self && y0.current.stateNode !== B.__self) {
        var O = q1(y0.current.type);
        if (!K7[O])
          z0('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', O, B.ref), K7[O] = true;
      }
    }
    var M8 = function(B, O, w, L, C, J0, r) {
      var O0 = { $$typeof: D, type: B, key: O, ref: w, props: r, _owner: J0 };
      if (O0._store = {}, Object.defineProperty(O0._store, "validated", { configurable: false, enumerable: false, writable: true, value: false }), Object.defineProperty(O0, "_self", { configurable: false, enumerable: false, writable: false, value: L }), Object.defineProperty(O0, "_source", { configurable: false, enumerable: false, writable: false, value: C }), Object.freeze)
        Object.freeze(O0.props), Object.freeze(O0);
      return O0;
    };
    function t8(B, O, w) {
      var L, C = {}, J0 = null, r = null, O0 = null, j0 = null;
      if (O != null) {
        if (J8(O))
          r = O.ref, X8(O);
        if (F7(O))
          H1(O.key), J0 = "" + O.key;
        O0 = O.__self === undefined ? null : O.__self, j0 = O.__source === undefined ? null : O.__source;
        for (L in O)
          if (P7.call(O, L) && !SJ.hasOwnProperty(L))
            C[L] = O[L];
      }
      var f0 = arguments.length - 2;
      if (f0 === 1)
        C.children = w;
      else if (f0 > 1) {
        var n0 = Array(f0);
        for (var o0 = 0;o0 < f0; o0++)
          n0[o0] = arguments[o0 + 2];
        if (Object.freeze)
          Object.freeze(n0);
        C.children = n0;
      }
      if (B && B.defaultProps) {
        var Q1 = B.defaultProps;
        for (L in Q1)
          if (C[L] === undefined)
            C[L] = Q1[L];
      }
      if (J0 || r) {
        var z1 = typeof B === "function" ? B.displayName || B.name || "Unknown" : B;
        if (J0)
          Q8(C, z1);
        if (r)
          A1(C, z1);
      }
      return M8(B, J0, r, O0, j0, y0.current, C);
    }
    function f(B, O) {
      var w = M8(B.type, O, B.ref, B._self, B._source, B._owner, B.props);
      return w;
    }
    function t(B, O, w) {
      if (B === null || B === undefined)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + B + ".");
      var L, C = Y7({}, B.props), J0 = B.key, r = B.ref, O0 = B._self, j0 = B._source, f0 = B._owner;
      if (O != null) {
        if (J8(O))
          r = O.ref, f0 = y0.current;
        if (F7(O))
          H1(O.key), J0 = "" + O.key;
        var n0;
        if (B.type && B.type.defaultProps)
          n0 = B.type.defaultProps;
        for (L in O)
          if (P7.call(O, L) && !SJ.hasOwnProperty(L))
            if (O[L] === undefined && n0 !== undefined)
              C[L] = n0[L];
            else
              C[L] = O[L];
      }
      var o0 = arguments.length - 2;
      if (o0 === 1)
        C.children = w;
      else if (o0 > 1) {
        var Q1 = Array(o0);
        for (var z1 = 0;z1 < o0; z1++)
          Q1[z1] = arguments[z1 + 2];
        C.children = Q1;
      }
      return M8(B.type, J0, r, O0, j0, f0, C);
    }
    function M0(B) {
      return typeof B === "object" && B !== null && B.$$typeof === D;
    }
    var h0 = ".", p0 = ":";
    function b1(B) {
      var O = /[=:]/g, w = { "=": "=0", ":": "=2" }, L = B.replace(O, function(C) {
        return w[C];
      });
      return "$" + L;
    }
    var V1 = false, j7 = /\/+/g;
    function a0(B) {
      return B.replace(j7, "$&/");
    }
    function D7(B, O) {
      if (typeof B === "object" && B !== null && B.key != null)
        return H1(B.key), b1("" + B.key);
      return O.toString(36);
    }
    function r0(B, O, w, L, C) {
      var J0 = typeof B;
      if (J0 === "undefined" || J0 === "boolean")
        B = null;
      var r = false;
      if (B === null)
        r = true;
      else
        switch (J0) {
          case "string":
          case "number":
            r = true;
            break;
          case "object":
            switch (B.$$typeof) {
              case D:
              case S:
                r = true;
            }
        }
      if (r) {
        var O0 = B, j0 = C(O0), f0 = L === "" ? h0 + D7(O0, 0) : L;
        if (z7(j0)) {
          var n0 = "";
          if (f0 != null)
            n0 = a0(f0) + "/";
          r0(j0, O, n0, "", function(qX) {
            return qX;
          });
        } else if (j0 != null) {
          if (M0(j0)) {
            if (j0.key && (!O0 || O0.key !== j0.key))
              H1(j0.key);
            j0 = f(j0, w + (j0.key && (!O0 || O0.key !== j0.key) ? a0("" + j0.key) + "/" : "") + f0);
          }
          O.push(j0);
        }
        return 1;
      }
      var o0, Q1, z1 = 0, L1 = L === "" ? h0 : L + p0;
      if (z7(B))
        for (var G5 = 0;G5 < B.length; G5++)
          o0 = B[G5], Q1 = L1 + D7(o0, G5), z1 += r0(o0, O, w, Q1, C);
      else {
        var N1 = k1(B);
        if (typeof N1 === "function") {
          var OX = B;
          if (N1 === OX.entries) {
            if (!V1)
              J1("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
            V1 = true;
          }
          var G9 = N1.call(OX), MX, N4 = 0;
          while (!(MX = G9.next()).done)
            o0 = MX.value, Q1 = L1 + D7(o0, N4++), z1 += r0(o0, O, w, Q1, C);
        } else if (J0 === "object") {
          var XJ = String(B);
          throw new Error("Objects are not valid as a React child (found: " + (XJ === "[object Object]" ? "object with keys {" + Object.keys(B).join(", ") + "}" : XJ) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return z1;
    }
    function G1(B, O, w) {
      if (B == null)
        return B;
      var L = [], C = 0;
      return r0(B, L, "", "", function(J0) {
        return O.call(w, J0, C++);
      }), L;
    }
    function BQ(B) {
      var O = 0;
      return G1(B, function() {
        O++;
      }), O;
    }
    function jJ(B, O, w) {
      G1(B, function() {
        O.apply(this, arguments);
      }, w);
    }
    function VQ(B) {
      return G1(B, function(O) {
        return O;
      }) || [];
    }
    function aQ(B) {
      if (!M0(B))
        throw new Error("React.Children.only expected to receive a single React element child.");
      return B;
    }
    function JX(B) {
      var O = { $$typeof: $0, _currentValue: B, _currentValue2: B, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
      O.Provider = { $$typeof: U, _context: O };
      var w = false, L = false, C = false;
      {
        var J0 = { $$typeof: $0, _context: O };
        Object.defineProperties(J0, { Provider: { get: function() {
          if (!L)
            L = true, z0("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
          return O.Provider;
        }, set: function(r) {
          O.Provider = r;
        } }, _currentValue: { get: function() {
          return O._currentValue;
        }, set: function(r) {
          O._currentValue = r;
        } }, _currentValue2: { get: function() {
          return O._currentValue2;
        }, set: function(r) {
          O._currentValue2 = r;
        } }, _threadCount: { get: function() {
          return O._threadCount;
        }, set: function(r) {
          O._threadCount = r;
        } }, Consumer: { get: function() {
          if (!w)
            w = true, z0("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
          return O.Consumer;
        } }, displayName: { get: function() {
          return O.displayName;
        }, set: function(r) {
          if (!C)
            J1("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", r), C = true;
        } } }), O.Consumer = J0;
      }
      return O._currentRenderer = null, O._currentRenderer2 = null, O;
    }
    var q8 = -1, e8 = 0, rQ = 1, nQ = 2;
    function $Q(B) {
      if (B._status === q8) {
        var O = B._result, w = O();
        if (w.then(function(J0) {
          if (B._status === e8 || B._status === q8) {
            var r = B;
            r._status = rQ, r._result = J0;
          }
        }, function(J0) {
          if (B._status === e8 || B._status === q8) {
            var r = B;
            r._status = nQ, r._result = J0;
          }
        }), B._status === q8) {
          var L = B;
          L._status = e8, L._result = w;
        }
      }
      if (B._status === rQ) {
        var C = B._result;
        if (C === undefined)
          z0("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", C);
        if (!("default" in C))
          z0("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", C);
        return C.default;
      } else
        throw B._result;
    }
    function h8(B) {
      var O = { _status: q8, _result: B }, w = { $$typeof: i, _payload: O, _init: $Q };
      {
        var L, C;
        Object.defineProperties(w, { defaultProps: { configurable: true, get: function() {
          return L;
        }, set: function(J0) {
          z0("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), L = J0, Object.defineProperty(w, "defaultProps", { enumerable: true });
        } }, propTypes: { configurable: true, get: function() {
          return C;
        }, set: function(J0) {
          z0("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), C = J0, Object.defineProperty(w, "propTypes", { enumerable: true });
        } } });
      }
      return w;
    }
    function M(B) {
      {
        if (B != null && B.$$typeof === k)
          z0("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
        else if (typeof B !== "function")
          z0("forwardRef requires a render function but was given %s.", B === null ? "null" : typeof B);
        else if (B.length !== 0 && B.length !== 2)
          z0("forwardRef render functions accept exactly two parameters: props and ref. %s", B.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
        if (B != null) {
          if (B.defaultProps != null || B.propTypes != null)
            z0("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        }
      }
      var O = { $$typeof: n, render: B };
      {
        var w;
        Object.defineProperty(O, "displayName", { enumerable: false, configurable: true, get: function() {
          return w;
        }, set: function(L) {
          if (w = L, !B.name && !B.displayName)
            B.displayName = L;
        } });
      }
      return O;
    }
    var x = Symbol.for("react.module.reference");
    function d(B) {
      if (typeof B === "string" || typeof B === "function")
        return true;
      if (B === T || B === s || i0 || B === v || B === h || B === U0 || R1 || B === p || e0 || l0 || h1)
        return true;
      if (typeof B === "object" && B !== null) {
        if (B.$$typeof === i || B.$$typeof === k || B.$$typeof === U || B.$$typeof === $0 || B.$$typeof === n || B.$$typeof === x || B.getModuleId !== undefined)
          return true;
      }
      return false;
    }
    function Q0(B, O) {
      if (!d(B))
        z0("memo: The first argument must be a component. Instead received: %s", B === null ? "null" : typeof B);
      var w = { $$typeof: k, type: B, compare: O === undefined ? null : O };
      {
        var L;
        Object.defineProperty(w, "displayName", { enumerable: false, configurable: true, get: function() {
          return L;
        }, set: function(C) {
          if (L = C, !B.name && !B.displayName)
            B.displayName = C;
        } });
      }
      return w;
    }
    function Y0() {
      var B = I1.current;
      if (B === null)
        z0("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
      return B;
    }
    function T0(B) {
      var O = Y0();
      if (B._context !== undefined) {
        var w = B._context;
        if (w.Consumer === B)
          z0("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
        else if (w.Provider === B)
          z0("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return O.useContext(B);
    }
    function A0(B) {
      var O = Y0();
      return O.useState(B);
    }
    function P0(B, O, w) {
      var L = Y0();
      return L.useReducer(B, O, w);
    }
    function $1(B) {
      var O = Y0();
      return O.useRef(B);
    }
    function c0(B, O) {
      var w = Y0();
      return w.useEffect(B, O);
    }
    function R0(B, O) {
      var w = Y0();
      return w.useInsertionEffect(B, O);
    }
    function B7(B, O) {
      var w = Y0();
      return w.useLayoutEffect(B, O);
    }
    function b8(B, O) {
      var w = Y0();
      return w.useCallback(B, O);
    }
    function UQ(B, O) {
      var w = Y0();
      return w.useMemo(B, O);
    }
    function u7(B, O, w) {
      var L = Y0();
      return L.useImperativeHandle(B, O, w);
    }
    function A4(B, O) {
      {
        var w = Y0();
        return w.useDebugValue(B, O);
      }
    }
    function P4() {
      var B = Y0();
      return B.useTransition();
    }
    function aZ(B) {
      var O = Y0();
      return O.useDeferredValue(B);
    }
    function F4() {
      var B = Y0();
      return B.useId();
    }
    function JJ(B, O, w) {
      var L = Y0();
      return L.useSyncExternalStore(B, O, w);
    }
    var D0 = 0, xJ, QX, XX, ZX, GX, YX, WX;
    function zX() {
    }
    zX.__reactDisabledLog = true;
    function rZ() {
      {
        if (D0 === 0) {
          xJ = console.log, QX = console.info, XX = console.warn, ZX = console.error, GX = console.group, YX = console.groupCollapsed, WX = console.groupEnd;
          var B = { configurable: true, enumerable: true, value: zX, writable: true };
          Object.defineProperties(console, { info: B, log: B, warn: B, error: B, group: B, groupCollapsed: B, groupEnd: B });
        }
        D0++;
      }
    }
    function D4() {
      {
        if (D0--, D0 === 0) {
          var B = { configurable: true, enumerable: true, writable: true };
          Object.defineProperties(console, { log: Y7({}, B, { value: xJ }), info: Y7({}, B, { value: QX }), warn: Y7({}, B, { value: XX }), error: Y7({}, B, { value: ZX }), group: Y7({}, B, { value: GX }), groupCollapsed: Y7({}, B, { value: YX }), groupEnd: Y7({}, B, { value: WX }) });
        }
        if (D0 < 0)
          z0("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var KX = K0.ReactCurrentDispatcher, HQ;
    function gJ(B, O, w) {
      {
        if (HQ === undefined)
          try {
            throw Error();
          } catch (C) {
            var L = C.stack.trim().match(/\n( *(at )?)/);
            HQ = L && L[1] || "";
          }
        return "\n" + HQ + B;
      }
    }
    var Z8 = false, vJ;
    {
      var oQ = typeof WeakMap === "function" ? WeakMap : Map;
      vJ = new oQ;
    }
    function nZ(B, O) {
      if (!B || Z8)
        return "";
      {
        var w = vJ.get(B);
        if (w !== undefined)
          return w;
      }
      var L;
      Z8 = true;
      var C = Error.prepareStackTrace;
      Error.prepareStackTrace = undefined;
      var J0;
      J0 = KX.current, KX.current = null, rZ();
      try {
        if (O) {
          var r = function() {
            throw Error();
          };
          if (Object.defineProperty(r.prototype, "props", { set: function() {
            throw Error();
          } }), typeof Reflect === "object" && Reflect.construct) {
            try {
              Reflect.construct(r, []);
            } catch (L1) {
              L = L1;
            }
            Reflect.construct(B, [], r);
          } else {
            try {
              r.call();
            } catch (L1) {
              L = L1;
            }
            B.call(r.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (L1) {
            L = L1;
          }
          B();
        }
      } catch (L1) {
        if (L1 && L && typeof L1.stack === "string") {
          var O0 = L1.stack.split("\n"), j0 = L.stack.split("\n"), f0 = O0.length - 1, n0 = j0.length - 1;
          while (f0 >= 1 && n0 >= 0 && O0[f0] !== j0[n0])
            n0--;
          for (;f0 >= 1 && n0 >= 0; f0--, n0--)
            if (O0[f0] !== j0[n0]) {
              if (f0 !== 1 || n0 !== 1)
                do
                  if (f0--, n0--, n0 < 0 || O0[f0] !== j0[n0]) {
                    var o0 = "\n" + O0[f0].replace(" at new ", " at ");
                    if (B.displayName && o0.includes("<anonymous>"))
                      o0 = o0.replace("<anonymous>", B.displayName);
                    if (typeof B === "function")
                      vJ.set(B, o0);
                    return o0;
                  }
                while (f0 >= 1 && n0 >= 0);
              break;
            }
        }
      } finally {
        Z8 = false, KX.current = J0, D4(), Error.prepareStackTrace = C;
      }
      var Q1 = B ? B.displayName || B.name : "", z1 = Q1 ? gJ(Q1) : "";
      if (typeof B === "function")
        vJ.set(B, z1);
      return z1;
    }
    function BX(B, O, w) {
      return nZ(B, false);
    }
    function E4(B) {
      var O = B.prototype;
      return !!(O && O.isReactComponent);
    }
    function CJ(B, O, w) {
      if (B == null)
        return "";
      if (typeof B === "function")
        return nZ(B, E4(B));
      if (typeof B === "string")
        return gJ(B);
      switch (B) {
        case h:
          return gJ("Suspense");
        case U0:
          return gJ("SuspenseList");
      }
      if (typeof B === "object")
        switch (B.$$typeof) {
          case n:
            return BX(B.render);
          case k:
            return CJ(B.type, O, w);
          case i: {
            var L = B, C = L._payload, J0 = L._init;
            try {
              return CJ(J0(C), O, w);
            } catch (r) {
            }
          }
        }
      return "";
    }
    var oZ = {}, tQ = K0.ReactDebugCurrentFrame;
    function eQ(B) {
      if (B) {
        var O = B._owner, w = CJ(B.type, B._source, O ? O.type : null);
        tQ.setExtraStackFrame(w);
      } else
        tQ.setExtraStackFrame(null);
    }
    function tZ(B, O, w, L, C) {
      {
        var J0 = Function.call.bind(P7);
        for (var r in B)
          if (J0(B, r)) {
            var O0 = undefined;
            try {
              if (typeof B[r] !== "function") {
                var j0 = Error((L || "React class") + ": " + w + " type `" + r + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof B[r] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw j0.name = "Invariant Violation", j0;
              }
              O0 = B[r](O, r, L, w, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (f0) {
              O0 = f0;
            }
            if (O0 && !(O0 instanceof Error))
              eQ(C), z0("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", L || "React class", w, r, typeof O0), eQ(null);
            if (O0 instanceof Error && !(O0.message in oZ))
              oZ[O0.message] = true, eQ(C), z0("Failed %s type: %s", w, O0.message), eQ(null);
          }
      }
    }
    function TJ(B) {
      if (B) {
        var O = B._owner, w = CJ(B.type, B._source, O ? O.type : null);
        g0(w);
      } else
        g0(null);
    }
    var VX = false;
    function s0() {
      if (y0.current) {
        var B = q1(y0.current.type);
        if (B)
          return "\n\nCheck the render method of `" + B + "`.";
      }
      return "";
    }
    function w4(B) {
      if (B !== undefined) {
        var O = B.fileName.replace(/^.*[\\\/]/, ""), w = B.lineNumber;
        return "\n\nCheck your code at " + O + ":" + w + ".";
      }
      return "";
    }
    function eZ(B) {
      if (B !== null && B !== undefined)
        return w4(B.__source);
      return "";
    }
    var q0 = {};
    function J9(B) {
      var O = s0();
      if (!O) {
        var w = typeof B === "string" ? B : B.displayName || B.name;
        if (w)
          O = "\n\nCheck the top-level render call using <" + w + ">.";
      }
      return O;
    }
    function V7(B, O) {
      if (!B._store || B._store.validated || B.key != null)
        return;
      B._store.validated = true;
      var w = J9(O);
      if (q0[w])
        return;
      q0[w] = true;
      var L = "";
      if (B && B._owner && B._owner !== y0.current)
        L = " It was passed a child from " + q1(B._owner.type) + ".";
      TJ(B), z0('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', w, L), TJ(null);
    }
    function kJ(B, O) {
      if (typeof B !== "object")
        return;
      if (z7(B))
        for (var w = 0;w < B.length; w++) {
          var L = B[w];
          if (M0(L))
            V7(L, O);
        }
      else if (M0(B)) {
        if (B._store)
          B._store.validated = true;
      } else if (B) {
        var C = k1(B);
        if (typeof C === "function") {
          if (C !== B.entries) {
            var J0 = C.call(B), r;
            while (!(r = J0.next()).done)
              if (M0(r.value))
                V7(r.value, O);
          }
        }
      }
    }
    function hJ(B) {
      {
        var O = B.type;
        if (O === null || O === undefined || typeof O === "string")
          return;
        var w;
        if (typeof O === "function")
          w = O.propTypes;
        else if (typeof O === "object" && (O.$$typeof === n || O.$$typeof === k))
          w = O.propTypes;
        else
          return;
        if (w) {
          var L = q1(O);
          tZ(w, B.props, "prop", L, B);
        } else if (O.PropTypes !== undefined && !VX) {
          VX = true;
          var C = q1(O);
          z0("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", C || "Unknown");
        }
        if (typeof O.getDefaultProps === "function" && !O.getDefaultProps.isReactClassApproved)
          z0("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function I4(B) {
      {
        var O = Object.keys(B.props);
        for (var w = 0;w < O.length; w++) {
          var L = O[w];
          if (L !== "children" && L !== "key") {
            TJ(B), z0("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", L), TJ(null);
            break;
          }
        }
        if (B.ref !== null)
          TJ(B), z0("Invalid attribute `ref` supplied to `React.Fragment`."), TJ(null);
      }
    }
    function f1(B, O, w) {
      var L = d(B);
      if (!L) {
        var C = "";
        if (B === undefined || typeof B === "object" && B !== null && Object.keys(B).length === 0)
          C += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
        var J0 = eZ(O);
        if (J0)
          C += J0;
        else
          C += s0();
        var r;
        if (B === null)
          r = "null";
        else if (z7(B))
          r = "array";
        else if (B !== undefined && B.$$typeof === D)
          r = "<" + (q1(B.type) || "Unknown") + " />", C = " Did you accidentally export a JSX literal instead of a component?";
        else
          r = typeof B;
        z0("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", r, C);
      }
      var O0 = t8.apply(this, arguments);
      if (O0 == null)
        return O0;
      if (L)
        for (var j0 = 2;j0 < arguments.length; j0++)
          kJ(arguments[j0], B);
      if (B === T)
        I4(O0);
      else
        hJ(O0);
      return O0;
    }
    var W1 = false;
    function R4(B) {
      var O = f1.bind(null, B);
      O.type = B;
      {
        if (!W1)
          W1 = true, J1("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
        Object.defineProperty(O, "type", { enumerable: false, get: function() {
          return J1("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", { value: B }), B;
        } });
      }
      return O;
    }
    function G8(B, O, w) {
      var L = t.apply(this, arguments);
      for (var C = 2;C < arguments.length; C++)
        kJ(arguments[C], L.type);
      return hJ(L), L;
    }
    function x7(B, O) {
      var w = _0.transition;
      _0.transition = {};
      var L = _0.transition;
      _0.transition._updatedFibers = new Set;
      try {
        B();
      } finally {
        if (_0.transition = w, w === null && L._updatedFibers) {
          var C = L._updatedFibers.size;
          if (C > 10)
            J1("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
          L._updatedFibers.clear();
        }
      }
    }
    var A8 = false, J5 = null;
    function $X(B) {
      if (J5 === null)
        try {
          var O = ("require" + Math.random()).slice(0, 7), w = z4 && z4[O];
          J5 = w.call(z4, "timers").setImmediate;
        } catch (L) {
          J5 = function(C) {
            if (A8 === false) {
              if (A8 = true, typeof MessageChannel === "undefined")
                z0("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
            }
            var J0 = new MessageChannel;
            J0.port1.onmessage = C, J0.port2.postMessage(undefined);
          };
        }
      return J5(B);
    }
    var QJ = 0, UX = false;
    function L4(B) {
      {
        var O = QJ;
        if (QJ++, G0.current === null)
          G0.current = [];
        var w = G0.isBatchingLegacy, L;
        try {
          if (G0.isBatchingLegacy = true, L = B(), !w && G0.didScheduleLegacyUpdate) {
            var C = G0.current;
            if (C !== null)
              G0.didScheduleLegacyUpdate = false, X5(C);
          }
        } catch (Q1) {
          throw Q5(O), Q1;
        } finally {
          G0.isBatchingLegacy = w;
        }
        if (L !== null && typeof L === "object" && typeof L.then === "function") {
          var J0 = L, r = false, O0 = { then: function(Q1, z1) {
            r = true, J0.then(function(L1) {
              if (Q5(O), QJ === 0)
                HX(L1, Q1, z1);
              else
                Q1(L1);
            }, function(L1) {
              Q5(O), z1(L1);
            });
          } };
          if (!UX && typeof Promise !== "undefined")
            Promise.resolve().then(function() {
            }).then(function() {
              if (!r)
                UX = true, z0("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
            });
          return O0;
        } else {
          var j0 = L;
          if (Q5(O), QJ === 0) {
            var f0 = G0.current;
            if (f0 !== null)
              X5(f0), G0.current = null;
            var n0 = { then: function(Q1, z1) {
              if (G0.current === null)
                G0.current = [], HX(j0, Q1, z1);
              else
                Q1(j0);
            } };
            return n0;
          } else {
            var o0 = { then: function(Q1, z1) {
              Q1(j0);
            } };
            return o0;
          }
        }
      }
    }
    function Q5(B) {
      {
        if (B !== QJ - 1)
          z0("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
        QJ = B;
      }
    }
    function HX(B, O, w) {
      {
        var L = G0.current;
        if (L !== null)
          try {
            X5(L), $X(function() {
              if (L.length === 0)
                G0.current = null, O(B);
              else
                HX(B, O, w);
            });
          } catch (C) {
            w(C);
          }
        else
          O(B);
      }
    }
    var bJ = false;
    function X5(B) {
      if (!bJ) {
        bJ = true;
        var O = 0;
        try {
          for (;O < B.length; O++) {
            var w = B[O];
            do
              w = w(true);
            while (w !== null);
          }
          B.length = 0;
        } catch (L) {
          throw B = B.slice(O + 1), L;
        } finally {
          bJ = false;
        }
      }
    }
    var Z5 = f1, Q9 = G8, X9 = R4, Z9 = { map: G1, forEach: jJ, count: BQ, toArray: VQ, only: aQ };
    if (kE.Children = Z9, kE.Component = W7, kE.Fragment = T, kE.Profiler = s, kE.PureComponent = O8, kE.StrictMode = v, kE.Suspense = h, kE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = K0, kE.cloneElement = Q9, kE.createContext = JX, kE.createElement = Z5, kE.createFactory = X9, kE.createRef = A7, kE.forwardRef = M, kE.isValidElement = M0, kE.lazy = h8, kE.memo = Q0, kE.startTransition = x7, kE.unstable_act = L4, kE.useCallback = b8, kE.useContext = T0, kE.useDebugValue = A4, kE.useDeferredValue = aZ, kE.useEffect = c0, kE.useId = F4, kE.useImperativeHandle = u7, kE.useInsertionEffect = R0, kE.useLayoutEffect = B7, kE.useMemo = UQ, kE.useReducer = P0, kE.useRef = $1, kE.useState = A0, kE.useSyncExternalStore = JJ, kE.useTransition = P4, kE.version = H, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function")
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error);
  })();
});
var v8 = M1((hE) => {
  var H = Z1(r7(), 1);
  (function() {
    var D = Symbol.for("react.element"), S = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), v = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), U = Symbol.for("react.provider"), $0 = Symbol.for("react.context"), n = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), U0 = Symbol.for("react.suspense_list"), k = Symbol.for("react.memo"), i = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), L0 = Symbol.iterator, w1 = "@@iterator";
    function k1(M) {
      if (M === null || typeof M !== "object")
        return null;
      var x = L0 && M[L0] || M[w1];
      if (typeof x === "function")
        return x;
      return null;
    }
    var I1 = H.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function _0(M) {
      {
        for (var x = arguments.length, d = new Array(x > 1 ? x - 1 : 0), Q0 = 1;Q0 < x; Q0++)
          d[Q0 - 1] = arguments[Q0];
        G0("error", M, d);
      }
    }
    function G0(M, x, d) {
      {
        var Q0 = I1.ReactDebugCurrentFrame, Y0 = Q0.getStackAddendum();
        if (Y0 !== "")
          x += "%s", d = d.concat([Y0]);
        var T0 = d.map(function(A0) {
          return String(A0);
        });
        T0.unshift("Warning: " + x), Function.prototype.apply.call(console[M], console, T0);
      }
    }
    var y0 = false, E0 = false, B1 = false, g0 = false, e0 = false, l0;
    l0 = Symbol.for("react.module.reference");
    function h1(M) {
      if (typeof M === "string" || typeof M === "function")
        return true;
      if (M === T || M === s || e0 || M === v || M === h || M === U0 || g0 || M === p || y0 || E0 || B1)
        return true;
      if (typeof M === "object" && M !== null) {
        if (M.$$typeof === i || M.$$typeof === k || M.$$typeof === U || M.$$typeof === $0 || M.$$typeof === n || M.$$typeof === l0 || M.getModuleId !== undefined)
          return true;
      }
      return false;
    }
    function R1(M, x, d) {
      var Q0 = M.displayName;
      if (Q0)
        return Q0;
      var Y0 = x.displayName || x.name || "";
      return Y0 !== "" ? d + "(" + Y0 + ")" : d;
    }
    function i0(M) {
      return M.displayName || "Context";
    }
    function K0(M) {
      if (M == null)
        return null;
      if (typeof M.tag === "number")
        _0("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
      if (typeof M === "function")
        return M.displayName || M.name || null;
      if (typeof M === "string")
        return M;
      switch (M) {
        case T:
          return "Fragment";
        case S:
          return "Portal";
        case s:
          return "Profiler";
        case v:
          return "StrictMode";
        case h:
          return "Suspense";
        case U0:
          return "SuspenseList";
      }
      if (typeof M === "object")
        switch (M.$$typeof) {
          case $0:
            var x = M;
            return i0(x) + ".Consumer";
          case U:
            var d = M;
            return i0(d._context) + ".Provider";
          case n:
            return R1(M, M.render, "ForwardRef");
          case k:
            var Q0 = M.displayName || null;
            if (Q0 !== null)
              return Q0;
            return K0(M.type) || "Memo";
          case i: {
            var Y0 = M, T0 = Y0._payload, A0 = Y0._init;
            try {
              return K0(A0(T0));
            } catch (P0) {
              return null;
            }
          }
        }
      return null;
    }
    var J1 = Object.assign, z0 = 0, q7, T8, c1, H8, Y7, n7, W7;
    function _7() {
    }
    _7.__reactDisabledLog = true;
    function NJ() {
      {
        if (z0 === 0) {
          q7 = console.log, T8 = console.info, c1 = console.warn, H8 = console.error, Y7 = console.group, n7 = console.groupCollapsed, W7 = console.groupEnd;
          var M = { configurable: true, enumerable: true, value: _7, writable: true };
          Object.defineProperties(console, { info: M, log: M, warn: M, error: M, group: M, groupCollapsed: M, groupEnd: M });
        }
        z0++;
      }
    }
    function k8() {
      {
        if (z0--, z0 === 0) {
          var M = { configurable: true, enumerable: true, writable: true };
          Object.defineProperties(console, { log: J1({}, M, { value: q7 }), info: J1({}, M, { value: T8 }), warn: J1({}, M, { value: c1 }), error: J1({}, M, { value: H8 }), group: J1({}, M, { value: Y7 }), groupCollapsed: J1({}, M, { value: n7 }), groupEnd: J1({}, M, { value: W7 }) });
        }
        if (z0 < 0)
          _0("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var o7 = I1.ReactCurrentDispatcher, O8;
    function f7(M, x, d) {
      {
        if (O8 === undefined)
          try {
            throw Error();
          } catch (Y0) {
            var Q0 = Y0.stack.trim().match(/\n( *(at )?)/);
            O8 = Q0 && Q0[1] || "";
          }
        return "\n" + O8 + M;
      }
    }
    var A7 = false, t7;
    {
      var z7 = typeof WeakMap === "function" ? WeakMap : Map;
      t7 = new z7;
    }
    function d7(M, x) {
      if (!M || A7)
        return "";
      {
        var d = t7.get(M);
        if (d !== undefined)
          return d;
      }
      var Q0;
      A7 = true;
      var Y0 = Error.prepareStackTrace;
      Error.prepareStackTrace = undefined;
      var T0;
      T0 = o7.current, o7.current = null, NJ();
      try {
        if (x) {
          var A0 = function() {
            throw Error();
          };
          if (Object.defineProperty(A0.prototype, "props", { set: function() {
            throw Error();
          } }), typeof Reflect === "object" && Reflect.construct) {
            try {
              Reflect.construct(A0, []);
            } catch (u7) {
              Q0 = u7;
            }
            Reflect.construct(M, [], A0);
          } else {
            try {
              A0.call();
            } catch (u7) {
              Q0 = u7;
            }
            M.call(A0.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (u7) {
            Q0 = u7;
          }
          M();
        }
      } catch (u7) {
        if (u7 && Q0 && typeof u7.stack === "string") {
          var P0 = u7.stack.split("\n"), $1 = Q0.stack.split("\n"), c0 = P0.length - 1, R0 = $1.length - 1;
          while (c0 >= 1 && R0 >= 0 && P0[c0] !== $1[R0])
            R0--;
          for (;c0 >= 1 && R0 >= 0; c0--, R0--)
            if (P0[c0] !== $1[R0]) {
              if (c0 !== 1 || R0 !== 1)
                do
                  if (c0--, R0--, R0 < 0 || P0[c0] !== $1[R0]) {
                    var B7 = "\n" + P0[c0].replace(" at new ", " at ");
                    if (M.displayName && B7.includes("<anonymous>"))
                      B7 = B7.replace("<anonymous>", M.displayName);
                    if (typeof M === "function")
                      t7.set(M, B7);
                    return B7;
                  }
                while (c0 >= 1 && R0 >= 0);
              break;
            }
        }
      } finally {
        A7 = false, o7.current = T0, k8(), Error.prepareStackTrace = Y0;
      }
      var b8 = M ? M.displayName || M.name : "", UQ = b8 ? f7(b8) : "";
      if (typeof M === "function")
        t7.set(M, UQ);
      return UQ;
    }
    function s1(M, x, d) {
      return d7(M, false);
    }
    function l1(M) {
      var x = M.prototype;
      return !!(x && x.isReactComponent);
    }
    function H1(M, x, d) {
      if (M == null)
        return "";
      if (typeof M === "function")
        return d7(M, l1(M));
      if (typeof M === "string")
        return f7(M);
      switch (M) {
        case h:
          return f7("Suspense");
        case U0:
          return f7("SuspenseList");
      }
      if (typeof M === "object")
        switch (M.$$typeof) {
          case n:
            return s1(M.render);
          case k:
            return H1(M.type, x, d);
          case i: {
            var Q0 = M, Y0 = Q0._payload, T0 = Q0._init;
            try {
              return H1(T0(Y0), x, d);
            } catch (A0) {
            }
          }
        }
      return "";
    }
    var i1 = Object.prototype.hasOwnProperty, p1 = {}, q1 = I1.ReactDebugCurrentFrame;
    function P7(M) {
      if (M) {
        var x = M._owner, d = H1(M.type, M._source, x ? x.type : null);
        q1.setExtraStackFrame(d);
      } else
        q1.setExtraStackFrame(null);
    }
    function SJ(M, x, d, Q0, Y0) {
      {
        var T0 = Function.call.bind(i1);
        for (var A0 in M)
          if (T0(M, A0)) {
            var P0 = undefined;
            try {
              if (typeof M[A0] !== "function") {
                var $1 = Error((Q0 || "React class") + ": " + d + " type `" + A0 + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof M[A0] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw $1.name = "Invariant Violation", $1;
              }
              P0 = M[A0](x, A0, Q0, d, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (c0) {
              P0 = c0;
            }
            if (P0 && !(P0 instanceof Error))
              P7(Y0), _0("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Q0 || "React class", d, A0, typeof P0), P7(null);
            if (P0 instanceof Error && !(P0.message in p1))
              p1[P0.message] = true, P7(Y0), _0("Failed %s type: %s", d, P0.message), P7(null);
          }
      }
    }
    var _J = Array.isArray;
    function e7(M) {
      return _J(M);
    }
    function K7(M) {
      {
        var x = typeof Symbol === "function" && Symbol.toStringTag, d = x && M[Symbol.toStringTag] || M.constructor.name || "Object";
        return d;
      }
    }
    function J8(M) {
      try {
        return F7(M), false;
      } catch (x) {
        return true;
      }
    }
    function F7(M) {
      return "" + M;
    }
    function Q8(M) {
      if (J8(M))
        return _0("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", K7(M)), F7(M);
    }
    var A1 = I1.ReactCurrentOwner, X8 = { key: true, ref: true, __self: true, __source: true }, M8, t8, f;
    f = {};
    function t(M) {
      if (i1.call(M, "ref")) {
        var x = Object.getOwnPropertyDescriptor(M, "ref").get;
        if (x && x.isReactWarning)
          return false;
      }
      return M.ref !== undefined;
    }
    function M0(M) {
      if (i1.call(M, "key")) {
        var x = Object.getOwnPropertyDescriptor(M, "key").get;
        if (x && x.isReactWarning)
          return false;
      }
      return M.key !== undefined;
    }
    function h0(M, x) {
      if (typeof M.ref === "string" && A1.current && x && A1.current.stateNode !== x) {
        var d = K0(A1.current.type);
        if (!f[d])
          _0('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', K0(A1.current.type), M.ref), f[d] = true;
      }
    }
    function p0(M, x) {
      {
        var d = function() {
          if (!M8)
            M8 = true, _0("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", x);
        };
        d.isReactWarning = true, Object.defineProperty(M, "key", { get: d, configurable: true });
      }
    }
    function b1(M, x) {
      {
        var d = function() {
          if (!t8)
            t8 = true, _0("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", x);
        };
        d.isReactWarning = true, Object.defineProperty(M, "ref", { get: d, configurable: true });
      }
    }
    var V1 = function(M, x, d, Q0, Y0, T0, A0) {
      var P0 = { $$typeof: D, type: M, key: x, ref: d, props: A0, _owner: T0 };
      if (P0._store = {}, Object.defineProperty(P0._store, "validated", { configurable: false, enumerable: false, writable: true, value: false }), Object.defineProperty(P0, "_self", { configurable: false, enumerable: false, writable: false, value: Q0 }), Object.defineProperty(P0, "_source", { configurable: false, enumerable: false, writable: false, value: Y0 }), Object.freeze)
        Object.freeze(P0.props), Object.freeze(P0);
      return P0;
    };
    function j7(M, x, d, Q0, Y0) {
      {
        var T0, A0 = {}, P0 = null, $1 = null;
        if (d !== undefined)
          Q8(d), P0 = "" + d;
        if (M0(x))
          Q8(x.key), P0 = "" + x.key;
        if (t(x))
          $1 = x.ref, h0(x, Y0);
        for (T0 in x)
          if (i1.call(x, T0) && !X8.hasOwnProperty(T0))
            A0[T0] = x[T0];
        if (M && M.defaultProps) {
          var c0 = M.defaultProps;
          for (T0 in c0)
            if (A0[T0] === undefined)
              A0[T0] = c0[T0];
        }
        if (P0 || $1) {
          var R0 = typeof M === "function" ? M.displayName || M.name || "Unknown" : M;
          if (P0)
            p0(A0, R0);
          if ($1)
            b1(A0, R0);
        }
        return V1(M, P0, $1, Y0, Q0, A1.current, A0);
      }
    }
    var { ReactCurrentOwner: a0, ReactDebugCurrentFrame: D7 } = I1;
    function r0(M) {
      if (M) {
        var x = M._owner, d = H1(M.type, M._source, x ? x.type : null);
        D7.setExtraStackFrame(d);
      } else
        D7.setExtraStackFrame(null);
    }
    var G1 = false;
    function BQ(M) {
      return typeof M === "object" && M !== null && M.$$typeof === D;
    }
    function jJ() {
      {
        if (a0.current) {
          var M = K0(a0.current.type);
          if (M)
            return "\n\nCheck the render method of `" + M + "`.";
        }
        return "";
      }
    }
    function VQ(M) {
      {
        if (M !== undefined) {
          var x = M.fileName.replace(/^.*[\\\/]/, ""), d = M.lineNumber;
          return "\n\nCheck your code at " + x + ":" + d + ".";
        }
        return "";
      }
    }
    var aQ = {};
    function JX(M) {
      {
        var x = jJ();
        if (!x) {
          var d = typeof M === "string" ? M : M.displayName || M.name;
          if (d)
            x = "\n\nCheck the top-level render call using <" + d + ">.";
        }
        return x;
      }
    }
    function q8(M, x) {
      {
        if (!M._store || M._store.validated || M.key != null)
          return;
        M._store.validated = true;
        var d = JX(x);
        if (aQ[d])
          return;
        aQ[d] = true;
        var Q0 = "";
        if (M && M._owner && M._owner !== a0.current)
          Q0 = " It was passed a child from " + K0(M._owner.type) + ".";
        r0(M), _0('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', d, Q0), r0(null);
      }
    }
    function e8(M, x) {
      {
        if (typeof M !== "object")
          return;
        if (e7(M))
          for (var d = 0;d < M.length; d++) {
            var Q0 = M[d];
            if (BQ(Q0))
              q8(Q0, x);
          }
        else if (BQ(M)) {
          if (M._store)
            M._store.validated = true;
        } else if (M) {
          var Y0 = k1(M);
          if (typeof Y0 === "function") {
            if (Y0 !== M.entries) {
              var T0 = Y0.call(M), A0;
              while (!(A0 = T0.next()).done)
                if (BQ(A0.value))
                  q8(A0.value, x);
            }
          }
        }
      }
    }
    function rQ(M) {
      {
        var x = M.type;
        if (x === null || x === undefined || typeof x === "string")
          return;
        var d;
        if (typeof x === "function")
          d = x.propTypes;
        else if (typeof x === "object" && (x.$$typeof === n || x.$$typeof === k))
          d = x.propTypes;
        else
          return;
        if (d) {
          var Q0 = K0(x);
          SJ(d, M.props, "prop", Q0, M);
        } else if (x.PropTypes !== undefined && !G1) {
          G1 = true;
          var Y0 = K0(x);
          _0("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Y0 || "Unknown");
        }
        if (typeof x.getDefaultProps === "function" && !x.getDefaultProps.isReactClassApproved)
          _0("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function nQ(M) {
      {
        var x = Object.keys(M.props);
        for (var d = 0;d < x.length; d++) {
          var Q0 = x[d];
          if (Q0 !== "children" && Q0 !== "key") {
            r0(M), _0("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Q0), r0(null);
            break;
          }
        }
        if (M.ref !== null)
          r0(M), _0("Invalid attribute `ref` supplied to `React.Fragment`."), r0(null);
      }
    }
    function $Q(M, x, d, Q0, Y0, T0) {
      {
        var A0 = h1(M);
        if (!A0) {
          var P0 = "";
          if (M === undefined || typeof M === "object" && M !== null && Object.keys(M).length === 0)
            P0 += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
          var $1 = VQ(Y0);
          if ($1)
            P0 += $1;
          else
            P0 += jJ();
          var c0;
          if (M === null)
            c0 = "null";
          else if (e7(M))
            c0 = "array";
          else if (M !== undefined && M.$$typeof === D)
            c0 = "<" + (K0(M.type) || "Unknown") + " />", P0 = " Did you accidentally export a JSX literal instead of a component?";
          else
            c0 = typeof M;
          _0("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", c0, P0);
        }
        var R0 = j7(M, x, d, Y0, T0);
        if (R0 == null)
          return R0;
        if (A0) {
          var B7 = x.children;
          if (B7 !== undefined)
            if (Q0)
              if (e7(B7)) {
                for (var b8 = 0;b8 < B7.length; b8++)
                  e8(B7[b8], M);
                if (Object.freeze)
                  Object.freeze(B7);
              } else
                _0("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              e8(B7, M);
        }
        if (M === T)
          nQ(R0);
        else
          rQ(R0);
        return R0;
      }
    }
    var h8 = $Q;
    hE.Fragment = T, hE.jsxDEV = h8;
  })();
});
var gz = M1((G2) => {
  var fE = function(H) {
    return H && H.__esModule ? H : { default: H };
  }, dE = function() {
    if (V4 > $4.length - 16)
      bE.default.randomFillSync($4), V4 = 0;
    return $4.slice(V4, V4 += 16);
  };
  Object.defineProperty(G2, "__esModule", { value: true });
  G2.default = dE;
  var bE = fE(import.meta.require("crypto")), $4 = new Uint8Array(256), V4 = $4.length;
});
var z2 = M1((Y2) => {
  Object.defineProperty(Y2, "__esModule", { value: true });
  Y2.default = undefined;
  var mE = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  Y2.default = mE;
});
var sZ = M1((K2) => {
  var cE = function(H) {
    return H && H.__esModule ? H : { default: H };
  }, sE = function(H) {
    return typeof H === "string" && yE.default.test(H);
  };
  Object.defineProperty(K2, "__esModule", { value: true });
  K2.default = undefined;
  var yE = cE(z2()), lE = sE;
  K2.default = lE;
});
var lZ = M1(($2) => {
  var pE = function(H) {
    return H && H.__esModule ? H : { default: H };
  }, V2 = function(H, D = 0) {
    return G7[H[D + 0]] + G7[H[D + 1]] + G7[H[D + 2]] + G7[H[D + 3]] + "-" + G7[H[D + 4]] + G7[H[D + 5]] + "-" + G7[H[D + 6]] + G7[H[D + 7]] + "-" + G7[H[D + 8]] + G7[H[D + 9]] + "-" + G7[H[D + 10]] + G7[H[D + 11]] + G7[H[D + 12]] + G7[H[D + 13]] + G7[H[D + 14]] + G7[H[D + 15]];
  }, aE = function(H, D = 0) {
    const S = V2(H, D);
    if (!iE.default(S))
      throw TypeError("Stringified UUID is invalid");
    return S;
  };
  Object.defineProperty($2, "__esModule", { value: true });
  $2.default = undefined;
  $2.unsafeStringify = V2;
  var iE = pE(sZ()), G7 = [];
  for (let H = 0;H < 256; ++H)
    G7.push((H + 256).toString(16).slice(1));
  var rE = aE;
  $2.default = rE;
});
var q2 = M1((O2) => {
  var eE = function(H) {
    return H && H.__esModule ? H : { default: H };
  }, Jw = function(H, D, S) {
    let T = D && S || 0;
    const v = D || new Array(16);
    H = H || {};
    let s = H.node || H2, U = H.clockseq !== undefined ? H.clockseq : vz;
    if (s == null || U == null) {
      const i = H.random || (H.rng || oE.default)();
      if (s == null)
        s = H2 = [i[0] | 1, i[1], i[2], i[3], i[4], i[5]];
      if (U == null)
        U = vz = (i[6] << 8 | i[7]) & 16383;
    }
    let $0 = H.msecs !== undefined ? H.msecs : Date.now(), n = H.nsecs !== undefined ? H.nsecs : Tz + 1;
    const h = $0 - Cz + (n - Tz) / 1e4;
    if (h < 0 && H.clockseq === undefined)
      U = U + 1 & 16383;
    if ((h < 0 || $0 > Cz) && H.nsecs === undefined)
      n = 0;
    if (n >= 1e4)
      throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    Cz = $0, Tz = n, vz = U, $0 += 12219292800000;
    const U0 = (($0 & 268435455) * 1e4 + n) % 4294967296;
    v[T++] = U0 >>> 24 & 255, v[T++] = U0 >>> 16 & 255, v[T++] = U0 >>> 8 & 255, v[T++] = U0 & 255;
    const k = $0 / 4294967296 * 1e4 & 268435455;
    v[T++] = k >>> 8 & 255, v[T++] = k & 255, v[T++] = k >>> 24 & 15 | 16, v[T++] = k >>> 16 & 255, v[T++] = U >>> 8 | 128, v[T++] = U & 255;
    for (let i = 0;i < 6; ++i)
      v[T + i] = s[i];
    return D || tE.unsafeStringify(v);
  };
  Object.defineProperty(O2, "__esModule", { value: true });
  O2.default = undefined;
  var oE = eE(gz()), tE = lZ(), H2, vz, Cz = 0, Tz = 0, Qw = Jw;
  O2.default = Qw;
});
var kz = M1((A2) => {
  var Zw = function(H) {
    return H && H.__esModule ? H : { default: H };
  }, Gw = function(H) {
    if (!Xw.default(H))
      throw TypeError("Invalid UUID");
    let D;
    const S = new Uint8Array(16);
    return S[0] = (D = parseInt(H.slice(0, 8), 16)) >>> 24, S[1] = D >>> 16 & 255, S[2] = D >>> 8 & 255, S[3] = D & 255, S[4] = (D = parseInt(H.slice(9, 13), 16)) >>> 8, S[5] = D & 255, S[6] = (D = parseInt(H.slice(14, 18), 16)) >>> 8, S[7] = D & 255, S[8] = (D = parseInt(H.slice(19, 23), 16)) >>> 8, S[9] = D & 255, S[10] = (D = parseInt(H.slice(24, 36), 16)) / 1099511627776 & 255, S[11] = D / 4294967296 & 255, S[12] = D >>> 24 & 255, S[13] = D >>> 16 & 255, S[14] = D >>> 8 & 255, S[15] = D & 255, S;
  };
  Object.defineProperty(A2, "__esModule", { value: true });
  A2.default = undefined;
  var Xw = Zw(sZ()), Yw = Gw;
  A2.default = Yw;
});
var hz = M1((E2) => {
  var Kw = function(H) {
    return H && H.__esModule ? H : { default: H };
  }, Bw = function(H) {
    H = unescape(encodeURIComponent(H));
    const D = [];
    for (let S = 0;S < H.length; ++S)
      D.push(H.charCodeAt(S));
    return D;
  }, Vw = function(H, D, S) {
    function T(v, s, U, $0) {
      var n;
      if (typeof v === "string")
        v = Bw(v);
      if (typeof s === "string")
        s = zw.default(s);
      if (((n = s) === null || n === undefined ? undefined : n.length) !== 16)
        throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
      let h = new Uint8Array(16 + v.length);
      if (h.set(s), h.set(v, s.length), h = S(h), h[6] = h[6] & 15 | D, h[8] = h[8] & 63 | 128, U) {
        $0 = $0 || 0;
        for (let U0 = 0;U0 < 16; ++U0)
          U[$0 + U0] = h[U0];
        return U;
      }
      return Ww.unsafeStringify(h);
    }
    try {
      T.name = H;
    } catch (v) {
    }
    return T.DNS = F2, T.URL = D2, T;
  };
  Object.defineProperty(E2, "__esModule", { value: true });
  E2.URL = E2.DNS = undefined;
  E2.default = Vw;
  var Ww = lZ(), zw = Kw(kz()), F2 = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
  E2.DNS = F2;
  var D2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  E2.URL = D2;
});
var L2 = M1((I2) => {
  var Ow = function(H) {
    return H && H.__esModule ? H : { default: H };
  }, Mw = function(H) {
    if (Array.isArray(H))
      H = Buffer.from(H);
    else if (typeof H === "string")
      H = Buffer.from(H, "utf8");
    return Hw.default.createHash("md5").update(H).digest();
  };
  Object.defineProperty(I2, "__esModule", { value: true });
  I2.default = undefined;
  var Hw = Ow(import.meta.require("crypto")), qw = Mw;
  I2.default = qw;
});
var j2 = M1((S2) => {
  var N2 = function(H) {
    return H && H.__esModule ? H : { default: H };
  };
  Object.defineProperty(S2, "__esModule", { value: true });
  S2.default = undefined;
  var Aw = N2(hz()), Pw = N2(L2()), Fw = Aw.default("v3", 48, Pw.default), Dw = Fw;
  S2.default = Dw;
});
var v2 = M1((x2) => {
  var ww = function(H) {
    return H && H.__esModule ? H : { default: H };
  };
  Object.defineProperty(x2, "__esModule", { value: true });
  x2.default = undefined;
  var Ew = ww(import.meta.require("crypto")), Iw = { randomUUID: Ew.default.randomUUID };
  x2.default = Iw;
});
var b2 = M1((k2) => {
  var T2 = function(H) {
    return H && H.__esModule ? H : { default: H };
  }, Nw = function(H, D, S) {
    if (C2.default.randomUUID && !D && !H)
      return C2.default.randomUUID();
    H = H || {};
    const T = H.random || (H.rng || Rw.default)();
    if (T[6] = T[6] & 15 | 64, T[8] = T[8] & 63 | 128, D) {
      S = S || 0;
      for (let v = 0;v < 16; ++v)
        D[S + v] = T[v];
      return D;
    }
    return Lw.unsafeStringify(T);
  };
  Object.defineProperty(k2, "__esModule", { value: true });
  k2.default = undefined;
  var C2 = T2(v2()), Rw = T2(gz()), Lw = lZ(), Sw = Nw;
  k2.default = Sw;
});
var u2 = M1((f2) => {
  var jw = function(H) {
    return H && H.__esModule ? H : { default: H };
  }, xw = function(H) {
    if (Array.isArray(H))
      H = Buffer.from(H);
    else if (typeof H === "string")
      H = Buffer.from(H, "utf8");
    return _w.default.createHash("sha1").update(H).digest();
  };
  Object.defineProperty(f2, "__esModule", { value: true });
  f2.default = undefined;
  var _w = jw(import.meta.require("crypto")), gw = xw;
  f2.default = gw;
});
var s2 = M1((y2) => {
  var m2 = function(H) {
    return H && H.__esModule ? H : { default: H };
  };
  Object.defineProperty(y2, "__esModule", { value: true });
  y2.default = undefined;
  var vw = m2(hz()), Cw = m2(u2()), Tw = vw.default("v5", 80, Cw.default), kw = Tw;
  y2.default = kw;
});
var p2 = M1((l2) => {
  Object.defineProperty(l2, "__esModule", { value: true });
  l2.default = undefined;
  var hw = "00000000-0000-0000-0000-000000000000";
  l2.default = hw;
});
var n2 = M1((a2) => {
  var fw = function(H) {
    return H && H.__esModule ? H : { default: H };
  }, dw = function(H) {
    if (!bw.default(H))
      throw TypeError("Invalid UUID");
    return parseInt(H.slice(14, 15), 16);
  };
  Object.defineProperty(a2, "__esModule", { value: true });
  a2.default = undefined;
  var bw = fw(sZ()), uw = dw;
  a2.default = uw;
});
var o2 = M1((C8) => {
  var LJ = function(H) {
    return H && H.__esModule ? H : { default: H };
  };
  Object.defineProperty(C8, "__esModule", { value: true });
  Object.defineProperty(C8, "NIL", { enumerable: true, get: function() {
    return lw.default;
  } });
  Object.defineProperty(C8, "parse", { enumerable: true, get: function() {
    return rw.default;
  } });
  Object.defineProperty(C8, "stringify", { enumerable: true, get: function() {
    return aw.default;
  } });
  Object.defineProperty(C8, "v1", { enumerable: true, get: function() {
    return mw.default;
  } });
  Object.defineProperty(C8, "v3", { enumerable: true, get: function() {
    return yw.default;
  } });
  Object.defineProperty(C8, "v4", { enumerable: true, get: function() {
    return cw.default;
  } });
  Object.defineProperty(C8, "v5", { enumerable: true, get: function() {
    return sw.default;
  } });
  Object.defineProperty(C8, "validate", { enumerable: true, get: function() {
    return pw.default;
  } });
  Object.defineProperty(C8, "version", { enumerable: true, get: function() {
    return iw.default;
  } });
  var mw = LJ(q2()), yw = LJ(j2()), cw = LJ(b2()), sw = LJ(s2()), lw = LJ(p2()), iw = LJ(n2()), pw = LJ(sZ()), aw = LJ(lZ()), rw = LJ(kz());
});
var WU = M1((QI) => {
  (function() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function")
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);
    var H = false, D = false, S = 5;
    function T(f, t) {
      var M0 = f.length;
      f.push(t), U(f, t, M0);
    }
    function v(f) {
      return f.length === 0 ? null : f[0];
    }
    function s(f) {
      if (f.length === 0)
        return null;
      var t = f[0], M0 = f.pop();
      if (M0 !== t)
        f[0] = M0, $0(f, M0, 0);
      return t;
    }
    function U(f, t, M0) {
      var h0 = M0;
      while (h0 > 0) {
        var p0 = h0 - 1 >>> 1, b1 = f[p0];
        if (n(b1, t) > 0)
          f[p0] = t, f[h0] = b1, h0 = p0;
        else
          return;
      }
    }
    function $0(f, t, M0) {
      var h0 = M0, p0 = f.length, b1 = p0 >>> 1;
      while (h0 < b1) {
        var V1 = (h0 + 1) * 2 - 1, j7 = f[V1], a0 = V1 + 1, D7 = f[a0];
        if (n(j7, t) < 0)
          if (a0 < p0 && n(D7, j7) < 0)
            f[h0] = D7, f[a0] = t, h0 = a0;
          else
            f[h0] = j7, f[V1] = t, h0 = V1;
        else if (a0 < p0 && n(D7, t) < 0)
          f[h0] = D7, f[a0] = t, h0 = a0;
        else
          return;
      }
    }
    function n(f, t) {
      var M0 = f.sortIndex - t.sortIndex;
      return M0 !== 0 ? M0 : f.id - t.id;
    }
    var h = 1, U0 = 2, k = 3, i = 4, p = 5;
    function L0(f, t) {
    }
    var w1 = typeof performance === "object" && typeof performance.now === "function";
    if (w1) {
      var k1 = performance;
      QI.unstable_now = function() {
        return k1.now();
      };
    } else {
      var I1 = Date, _0 = I1.now();
      QI.unstable_now = function() {
        return I1.now() - _0;
      };
    }
    var G0 = 1073741823, y0 = -1, E0 = 250, B1 = 5000, g0 = 1e4, e0 = G0, l0 = [], h1 = [], R1 = 1, i0 = null, K0 = k, J1 = false, z0 = false, q7 = false, T8 = typeof setTimeout === "function" ? setTimeout : null, c1 = typeof clearTimeout === "function" ? clearTimeout : null, H8 = typeof setImmediate !== "undefined" ? setImmediate : null, Y7 = typeof navigator !== "undefined" && navigator.scheduling !== undefined && navigator.scheduling.isInputPending !== undefined ? navigator.scheduling.isInputPending.bind(navigator.scheduling) : null;
    function n7(f) {
      var t = v(h1);
      while (t !== null) {
        if (t.callback === null)
          s(h1);
        else if (t.startTime <= f)
          s(h1), t.sortIndex = t.expirationTime, T(l0, t);
        else
          return;
        t = v(h1);
      }
    }
    function W7(f) {
      if (q7 = false, n7(f), !z0)
        if (v(l0) !== null)
          z0 = true, Q8(_7);
        else {
          var t = v(h1);
          if (t !== null)
            A1(W7, t.startTime - f);
        }
    }
    function _7(f, t) {
      if (z0 = false, q7)
        q7 = false, X8();
      J1 = true;
      var M0 = K0;
      try {
        if (D)
          try {
            return NJ(f, t);
          } catch (p0) {
            if (i0 !== null) {
              var h0 = QI.unstable_now();
              L0(i0, h0), i0.isQueued = false;
            }
            throw p0;
          }
        else
          return NJ(f, t);
      } finally {
        i0 = null, K0 = M0, J1 = false;
      }
    }
    function NJ(f, t) {
      var M0 = t;
      n7(M0), i0 = v(l0);
      while (i0 !== null && !H) {
        if (i0.expirationTime > M0 && (!f || P7()))
          break;
        var h0 = i0.callback;
        if (typeof h0 === "function") {
          i0.callback = null, K0 = i0.priorityLevel;
          var p0 = i0.expirationTime <= M0, b1 = h0(p0);
          if (M0 = QI.unstable_now(), typeof b1 === "function")
            i0.callback = b1;
          else if (i0 === v(l0))
            s(l0);
          n7(M0);
        } else
          s(l0);
        i0 = v(l0);
      }
      if (i0 !== null)
        return true;
      else {
        var V1 = v(h1);
        if (V1 !== null)
          A1(W7, V1.startTime - M0);
        return false;
      }
    }
    function k8(f, t) {
      switch (f) {
        case h:
        case U0:
        case k:
        case i:
        case p:
          break;
        default:
          f = k;
      }
      var M0 = K0;
      K0 = f;
      try {
        return t();
      } finally {
        K0 = M0;
      }
    }
    function o7(f) {
      var t;
      switch (K0) {
        case h:
        case U0:
        case k:
          t = k;
          break;
        default:
          t = K0;
          break;
      }
      var M0 = K0;
      K0 = t;
      try {
        return f();
      } finally {
        K0 = M0;
      }
    }
    function O8(f) {
      var t = K0;
      return function() {
        var M0 = K0;
        K0 = t;
        try {
          return f.apply(this, arguments);
        } finally {
          K0 = M0;
        }
      };
    }
    function f7(f, t, M0) {
      var h0 = QI.unstable_now(), p0;
      if (typeof M0 === "object" && M0 !== null) {
        var b1 = M0.delay;
        if (typeof b1 === "number" && b1 > 0)
          p0 = h0 + b1;
        else
          p0 = h0;
      } else
        p0 = h0;
      var V1;
      switch (f) {
        case h:
          V1 = y0;
          break;
        case U0:
          V1 = E0;
          break;
        case p:
          V1 = e0;
          break;
        case i:
          V1 = g0;
          break;
        case k:
        default:
          V1 = B1;
          break;
      }
      var j7 = p0 + V1, a0 = { id: R1++, callback: t, priorityLevel: f, startTime: p0, expirationTime: j7, sortIndex: -1 };
      if (p0 > h0) {
        if (a0.sortIndex = p0, T(h1, a0), v(l0) === null && a0 === v(h1)) {
          if (q7)
            X8();
          else
            q7 = true;
          A1(W7, p0 - h0);
        }
      } else if (a0.sortIndex = j7, T(l0, a0), !z0 && !J1)
        z0 = true, Q8(_7);
      return a0;
    }
    function A7() {
    }
    function t7() {
      if (!z0 && !J1)
        z0 = true, Q8(_7);
    }
    function z7() {
      return v(l0);
    }
    function d7(f) {
      f.callback = null;
    }
    function s1() {
      return K0;
    }
    var l1 = false, H1 = null, i1 = -1, p1 = S, q1 = -1;
    function P7() {
      var f = QI.unstable_now() - q1;
      if (f < p1)
        return false;
      return true;
    }
    function SJ() {
    }
    function _J(f) {
      if (f < 0 || f > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      if (f > 0)
        p1 = Math.floor(1000 / f);
      else
        p1 = S;
    }
    var e7 = function() {
      if (H1 !== null) {
        var f = QI.unstable_now();
        q1 = f;
        var t = true, M0 = true;
        try {
          M0 = H1(t, f);
        } finally {
          if (M0)
            K7();
          else
            l1 = false, H1 = null;
        }
      } else
        l1 = false;
    }, K7;
    if (typeof H8 === "function")
      K7 = function() {
        H8(e7);
      };
    else if (typeof MessageChannel !== "undefined") {
      var J8 = new MessageChannel, F7 = J8.port2;
      J8.port1.onmessage = e7, K7 = function() {
        F7.postMessage(null);
      };
    } else
      K7 = function() {
        T8(e7, 0);
      };
    function Q8(f) {
      if (H1 = f, !l1)
        l1 = true, K7();
    }
    function A1(f, t) {
      i1 = T8(function() {
        f(QI.unstable_now());
      }, t);
    }
    function X8() {
      c1(i1), i1 = -1;
    }
    var M8 = SJ, t8 = null;
    if (QI.unstable_IdlePriority = p, QI.unstable_ImmediatePriority = h, QI.unstable_LowPriority = i, QI.unstable_NormalPriority = k, QI.unstable_Profiling = t8, QI.unstable_UserBlockingPriority = U0, QI.unstable_cancelCallback = d7, QI.unstable_continueExecution = t7, QI.unstable_forceFrameRate = _J, QI.unstable_getCurrentPriorityLevel = s1, QI.unstable_getFirstCallbackNode = z7, QI.unstable_next = o7, QI.unstable_pauseExecution = A7, QI.unstable_requestPaint = M8, QI.unstable_runWithPriority = k8, QI.unstable_scheduleCallback = f7, QI.unstable_shouldYield = P7, QI.unstable_wrapCallback = O8, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function")
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error);
  })();
});
var zU = M1((XI) => {
  var H = Z1(r7(), 1), D = Z1(WU(), 1);
  (function() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function")
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);
    var S = H.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, T = false;
    function v(J) {
      T = J;
    }
    function s(J) {
      if (!T) {
        for (var Q = arguments.length, X = new Array(Q > 1 ? Q - 1 : 0), Z = 1;Z < Q; Z++)
          X[Z - 1] = arguments[Z];
        $0("warn", J, X);
      }
    }
    function U(J) {
      if (!T) {
        for (var Q = arguments.length, X = new Array(Q > 1 ? Q - 1 : 0), Z = 1;Z < Q; Z++)
          X[Z - 1] = arguments[Z];
        $0("error", J, X);
      }
    }
    function $0(J, Q, X) {
      {
        var Z = S.ReactDebugCurrentFrame, G = Z.getStackAddendum();
        if (G !== "")
          Q += "%s", X = X.concat([G]);
        var Y = X.map(function(W) {
          return String(W);
        });
        Y.unshift("Warning: " + Q), Function.prototype.apply.call(console[J], console, Y);
      }
    }
    var n = 0, h = 1, U0 = 2, k = 3, i = 4, p = 5, L0 = 6, w1 = 7, k1 = 8, I1 = 9, _0 = 10, G0 = 11, y0 = 12, E0 = 13, B1 = 14, g0 = 15, e0 = 16, l0 = 17, h1 = 18, R1 = 19, i0 = 21, K0 = 22, J1 = 23, z0 = 24, q7 = 25, T8 = true, c1 = false, H8 = false, Y7 = false, n7 = false, W7 = true, _7 = false, NJ = false, k8 = true, o7 = true, O8 = true, f7 = new Set, A7 = {}, t7 = {};
    function z7(J, Q) {
      d7(J, Q), d7(J + "Capture", Q);
    }
    function d7(J, Q) {
      if (A7[J])
        U("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", J);
      A7[J] = Q;
      {
        var X = J.toLowerCase();
        if (t7[X] = J, J === "onDoubleClick")
          t7.ondblclick = J;
      }
      for (var Z = 0;Z < Q.length; Z++)
        f7.add(Q[Z]);
    }
    var s1 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined", l1 = Object.prototype.hasOwnProperty;
    function H1(J) {
      {
        var Q = typeof Symbol === "function" && Symbol.toStringTag, X = Q && J[Symbol.toStringTag] || J.constructor.name || "Object";
        return X;
      }
    }
    function i1(J) {
      try {
        return p1(J), false;
      } catch (Q) {
        return true;
      }
    }
    function p1(J) {
      return "" + J;
    }
    function q1(J, Q) {
      if (i1(J))
        return U("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", Q, H1(J)), p1(J);
    }
    function P7(J) {
      if (i1(J))
        return U("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", H1(J)), p1(J);
    }
    function SJ(J, Q) {
      if (i1(J))
        return U("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", Q, H1(J)), p1(J);
    }
    function _J(J, Q) {
      if (i1(J))
        return U("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", Q, H1(J)), p1(J);
    }
    function e7(J) {
      if (i1(J))
        return U("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", H1(J)), p1(J);
    }
    function K7(J) {
      if (i1(J))
        return U("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", H1(J)), p1(J);
    }
    var J8 = 0, F7 = 1, Q8 = 2, A1 = 3, X8 = 4, M8 = 5, t8 = 6, f = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", t = f + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", M0 = new RegExp("^[" + f + "][" + t + "]*$"), h0 = {}, p0 = {};
    function b1(J) {
      if (l1.call(p0, J))
        return true;
      if (l1.call(h0, J))
        return false;
      if (M0.test(J))
        return p0[J] = true, true;
      return h0[J] = true, U("Invalid attribute name: `%s`", J), false;
    }
    function V1(J, Q, X) {
      if (Q !== null)
        return Q.type === J8;
      if (X)
        return false;
      if (J.length > 2 && (J[0] === "o" || J[0] === "O") && (J[1] === "n" || J[1] === "N"))
        return true;
      return false;
    }
    function j7(J, Q, X, Z) {
      if (X !== null && X.type === J8)
        return false;
      switch (typeof Q) {
        case "function":
        case "symbol":
          return true;
        case "boolean": {
          if (Z)
            return false;
          if (X !== null)
            return !X.acceptsBooleans;
          else {
            var G = J.toLowerCase().slice(0, 5);
            return G !== "data-" && G !== "aria-";
          }
        }
        default:
          return false;
      }
    }
    function a0(J, Q, X, Z) {
      if (Q === null || typeof Q === "undefined")
        return true;
      if (j7(J, Q, X, Z))
        return true;
      if (Z)
        return false;
      if (X !== null)
        switch (X.type) {
          case A1:
            return !Q;
          case X8:
            return Q === false;
          case M8:
            return isNaN(Q);
          case t8:
            return isNaN(Q) || Q < 1;
        }
      return false;
    }
    function D7(J) {
      return G1.hasOwnProperty(J) ? G1[J] : null;
    }
    function r0(J, Q, X, Z, G, Y, W) {
      this.acceptsBooleans = Q === Q8 || Q === A1 || Q === X8, this.attributeName = Z, this.attributeNamespace = G, this.mustUseProperty = X, this.propertyName = J, this.type = Q, this.sanitizeURL = Y, this.removeEmptyString = W;
    }
    var G1 = {}, BQ = ["children", "dangerouslySetInnerHTML", "defaultValue", "defaultChecked", "innerHTML", "suppressContentEditableWarning", "suppressHydrationWarning", "style"];
    BQ.forEach(function(J) {
      G1[J] = new r0(J, J8, false, J, null, false, false);
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(J) {
      var Q = J[0], X = J[1];
      G1[Q] = new r0(Q, F7, false, X, null, false, false);
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(J) {
      G1[J] = new r0(J, Q8, false, J.toLowerCase(), null, false, false);
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(J) {
      G1[J] = new r0(J, Q8, false, J, null, false, false);
    }), ["allowFullScreen", "async", "autoFocus", "autoPlay", "controls", "default", "defer", "disabled", "disablePictureInPicture", "disableRemotePlayback", "formNoValidate", "hidden", "loop", "noModule", "noValidate", "open", "playsInline", "readOnly", "required", "reversed", "scoped", "seamless", "itemScope"].forEach(function(J) {
      G1[J] = new r0(J, A1, false, J.toLowerCase(), null, false, false);
    }), ["checked", "multiple", "muted", "selected"].forEach(function(J) {
      G1[J] = new r0(J, A1, true, J, null, false, false);
    }), ["capture", "download"].forEach(function(J) {
      G1[J] = new r0(J, X8, false, J, null, false, false);
    }), ["cols", "rows", "size", "span"].forEach(function(J) {
      G1[J] = new r0(J, t8, false, J, null, false, false);
    }), ["rowSpan", "start"].forEach(function(J) {
      G1[J] = new r0(J, M8, false, J.toLowerCase(), null, false, false);
    });
    var jJ = /[\-\:]([a-z])/g, VQ = function(J) {
      return J[1].toUpperCase();
    };
    ["accent-height", "alignment-baseline", "arabic-form", "baseline-shift", "cap-height", "clip-path", "clip-rule", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "dominant-baseline", "enable-background", "fill-opacity", "fill-rule", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "glyph-name", "glyph-orientation-horizontal", "glyph-orientation-vertical", "horiz-adv-x", "horiz-origin-x", "image-rendering", "letter-spacing", "lighting-color", "marker-end", "marker-mid", "marker-start", "overline-position", "overline-thickness", "paint-order", "panose-1", "pointer-events", "rendering-intent", "shape-rendering", "stop-color", "stop-opacity", "strikethrough-position", "strikethrough-thickness", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-anchor", "text-decoration", "text-rendering", "underline-position", "underline-thickness", "unicode-bidi", "unicode-range", "units-per-em", "v-alphabetic", "v-hanging", "v-ideographic", "v-mathematical", "vector-effect", "vert-adv-y", "vert-origin-x", "vert-origin-y", "word-spacing", "writing-mode", "xmlns:xlink", "x-height"].forEach(function(J) {
      var Q = J.replace(jJ, VQ);
      G1[Q] = new r0(Q, F7, false, J, null, false, false);
    }), ["xlink:actuate", "xlink:arcrole", "xlink:role", "xlink:show", "xlink:title", "xlink:type"].forEach(function(J) {
      var Q = J.replace(jJ, VQ);
      G1[Q] = new r0(Q, F7, false, J, "http://www.w3.org/1999/xlink", false, false);
    }), ["xml:base", "xml:lang", "xml:space"].forEach(function(J) {
      var Q = J.replace(jJ, VQ);
      G1[Q] = new r0(Q, F7, false, J, "http://www.w3.org/XML/1998/namespace", false, false);
    }), ["tabIndex", "crossOrigin"].forEach(function(J) {
      G1[J] = new r0(J, F7, false, J.toLowerCase(), null, false, false);
    });
    var aQ = "xlinkHref";
    G1[aQ] = new r0("xlinkHref", F7, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false), ["src", "href", "action", "formAction"].forEach(function(J) {
      G1[J] = new r0(J, F7, false, J.toLowerCase(), null, true, true);
    });
    var JX = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, q8 = false;
    function e8(J) {
      if (!q8 && JX.test(J))
        q8 = true, U("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(J));
    }
    function rQ(J, Q, X, Z) {
      if (Z.mustUseProperty) {
        var G = Z.propertyName;
        return J[G];
      } else {
        if (q1(X, Q), Z.sanitizeURL)
          e8("" + X);
        var Y = Z.attributeName, W = null;
        if (Z.type === X8) {
          if (J.hasAttribute(Y)) {
            var z = J.getAttribute(Y);
            if (z === "")
              return true;
            if (a0(Q, X, Z, false))
              return z;
            if (z === "" + X)
              return X;
            return z;
          }
        } else if (J.hasAttribute(Y)) {
          if (a0(Q, X, Z, false))
            return J.getAttribute(Y);
          if (Z.type === A1)
            return X;
          W = J.getAttribute(Y);
        }
        if (a0(Q, X, Z, false))
          return W === null ? X : W;
        else if (W === "" + X)
          return X;
        else
          return W;
      }
    }
    function nQ(J, Q, X, Z) {
      {
        if (!b1(Q))
          return;
        if (!J.hasAttribute(Q))
          return X === undefined ? undefined : null;
        var G = J.getAttribute(Q);
        if (q1(X, Q), G === "" + X)
          return X;
        return G;
      }
    }
    function $Q(J, Q, X, Z) {
      var G = D7(Q);
      if (V1(Q, G, Z))
        return;
      if (a0(Q, X, G, Z))
        X = null;
      if (Z || G === null) {
        if (b1(Q)) {
          var Y = Q;
          if (X === null)
            J.removeAttribute(Y);
          else
            q1(X, Q), J.setAttribute(Y, "" + X);
        }
        return;
      }
      var W = G.mustUseProperty;
      if (W) {
        var z = G.propertyName;
        if (X === null) {
          var K = G.type;
          J[z] = K === A1 ? false : "";
        } else
          J[z] = X;
        return;
      }
      var { attributeName: V, attributeNamespace: $ } = G;
      if (X === null)
        J.removeAttribute(V);
      else {
        var A = G.type, q;
        if (A === A1 || A === X8 && X === true)
          q = "";
        else if (q1(X, V), q = "" + X, G.sanitizeURL)
          e8(q.toString());
        if ($)
          J.setAttributeNS($, V, q);
        else
          J.setAttribute(V, q);
      }
    }
    var h8 = Symbol.for("react.element"), M = Symbol.for("react.portal"), x = Symbol.for("react.fragment"), d = Symbol.for("react.strict_mode"), Q0 = Symbol.for("react.profiler"), Y0 = Symbol.for("react.provider"), T0 = Symbol.for("react.context"), A0 = Symbol.for("react.forward_ref"), P0 = Symbol.for("react.suspense"), $1 = Symbol.for("react.suspense_list"), c0 = Symbol.for("react.memo"), R0 = Symbol.for("react.lazy"), B7 = Symbol.for("react.scope"), b8 = Symbol.for("react.debug_trace_mode"), UQ = Symbol.for("react.offscreen"), u7 = Symbol.for("react.legacy_hidden"), A4 = Symbol.for("react.cache"), P4 = Symbol.for("react.tracing_marker"), aZ = Symbol.iterator, F4 = "@@iterator";
    function JJ(J) {
      if (J === null || typeof J !== "object")
        return null;
      var Q = aZ && J[aZ] || J[F4];
      if (typeof Q === "function")
        return Q;
      return null;
    }
    var D0 = Object.assign, xJ = 0, QX, XX, ZX, GX, YX, WX, zX;
    function rZ() {
    }
    rZ.__reactDisabledLog = true;
    function D4() {
      {
        if (xJ === 0) {
          QX = console.log, XX = console.info, ZX = console.warn, GX = console.error, YX = console.group, WX = console.groupCollapsed, zX = console.groupEnd;
          var J = { configurable: true, enumerable: true, value: rZ, writable: true };
          Object.defineProperties(console, { info: J, log: J, warn: J, error: J, group: J, groupCollapsed: J, groupEnd: J });
        }
        xJ++;
      }
    }
    function KX() {
      {
        if (xJ--, xJ === 0) {
          var J = { configurable: true, enumerable: true, writable: true };
          Object.defineProperties(console, { log: D0({}, J, { value: QX }), info: D0({}, J, { value: XX }), warn: D0({}, J, { value: ZX }), error: D0({}, J, { value: GX }), group: D0({}, J, { value: YX }), groupCollapsed: D0({}, J, { value: WX }), groupEnd: D0({}, J, { value: zX }) });
        }
        if (xJ < 0)
          U("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var HQ = S.ReactCurrentDispatcher, gJ;
    function Z8(J, Q, X) {
      {
        if (gJ === undefined)
          try {
            throw Error();
          } catch (G) {
            var Z = G.stack.trim().match(/\n( *(at )?)/);
            gJ = Z && Z[1] || "";
          }
        return "\n" + gJ + J;
      }
    }
    var vJ = false, oQ;
    {
      var nZ = typeof WeakMap === "function" ? WeakMap : Map;
      oQ = new nZ;
    }
    function BX(J, Q) {
      if (!J || vJ)
        return "";
      {
        var X = oQ.get(J);
        if (X !== undefined)
          return X;
      }
      var Z;
      vJ = true;
      var G = Error.prepareStackTrace;
      Error.prepareStackTrace = undefined;
      var Y;
      Y = HQ.current, HQ.current = null, D4();
      try {
        if (Q) {
          var W = function() {
            throw Error();
          };
          if (Object.defineProperty(W.prototype, "props", { set: function() {
            throw Error();
          } }), typeof Reflect === "object" && Reflect.construct) {
            try {
              Reflect.construct(W, []);
            } catch (E) {
              Z = E;
            }
            Reflect.construct(J, [], W);
          } else {
            try {
              W.call();
            } catch (E) {
              Z = E;
            }
            J.call(W.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (E) {
            Z = E;
          }
          J();
        }
      } catch (E) {
        if (E && Z && typeof E.stack === "string") {
          var z = E.stack.split("\n"), K = Z.stack.split("\n"), V = z.length - 1, $ = K.length - 1;
          while (V >= 1 && $ >= 0 && z[V] !== K[$])
            $--;
          for (;V >= 1 && $ >= 0; V--, $--)
            if (z[V] !== K[$]) {
              if (V !== 1 || $ !== 1)
                do
                  if (V--, $--, $ < 0 || z[V] !== K[$]) {
                    var A = "\n" + z[V].replace(" at new ", " at ");
                    if (J.displayName && A.includes("<anonymous>"))
                      A = A.replace("<anonymous>", J.displayName);
                    if (typeof J === "function")
                      oQ.set(J, A);
                    return A;
                  }
                while (V >= 1 && $ >= 0);
              break;
            }
        }
      } finally {
        vJ = false, HQ.current = Y, KX(), Error.prepareStackTrace = G;
      }
      var q = J ? J.displayName || J.name : "", I = q ? Z8(q) : "";
      if (typeof J === "function")
        oQ.set(J, I);
      return I;
    }
    function E4(J, Q, X) {
      return BX(J, true);
    }
    function CJ(J, Q, X) {
      return BX(J, false);
    }
    function oZ(J) {
      var Q = J.prototype;
      return !!(Q && Q.isReactComponent);
    }
    function tQ(J, Q, X) {
      if (J == null)
        return "";
      if (typeof J === "function")
        return BX(J, oZ(J));
      if (typeof J === "string")
        return Z8(J);
      switch (J) {
        case P0:
          return Z8("Suspense");
        case $1:
          return Z8("SuspenseList");
      }
      if (typeof J === "object")
        switch (J.$$typeof) {
          case A0:
            return CJ(J.render);
          case c0:
            return tQ(J.type, Q, X);
          case R0: {
            var Z = J, G = Z._payload, Y = Z._init;
            try {
              return tQ(Y(G), Q, X);
            } catch (W) {
            }
          }
        }
      return "";
    }
    function eQ(J) {
      var Q = J._debugOwner ? J._debugOwner.type : null, X = J._debugSource;
      switch (J.tag) {
        case p:
          return Z8(J.type);
        case e0:
          return Z8("Lazy");
        case E0:
          return Z8("Suspense");
        case R1:
          return Z8("SuspenseList");
        case n:
        case U0:
        case g0:
          return CJ(J.type);
        case G0:
          return CJ(J.type.render);
        case h:
          return E4(J.type);
        default:
          return "";
      }
    }
    function tZ(J) {
      try {
        var Q = "", X = J;
        do
          Q += eQ(X), X = X.return;
        while (X);
        return Q;
      } catch (Z) {
        return "\nError generating stack: " + Z.message + "\n" + Z.stack;
      }
    }
    function TJ(J, Q, X) {
      var Z = J.displayName;
      if (Z)
        return Z;
      var G = Q.displayName || Q.name || "";
      return G !== "" ? X + "(" + G + ")" : X;
    }
    function VX(J) {
      return J.displayName || "Context";
    }
    function s0(J) {
      if (J == null)
        return null;
      if (typeof J.tag === "number")
        U("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
      if (typeof J === "function")
        return J.displayName || J.name || null;
      if (typeof J === "string")
        return J;
      switch (J) {
        case x:
          return "Fragment";
        case M:
          return "Portal";
        case Q0:
          return "Profiler";
        case d:
          return "StrictMode";
        case P0:
          return "Suspense";
        case $1:
          return "SuspenseList";
      }
      if (typeof J === "object")
        switch (J.$$typeof) {
          case T0:
            var Q = J;
            return VX(Q) + ".Consumer";
          case Y0:
            var X = J;
            return VX(X._context) + ".Provider";
          case A0:
            return TJ(J, J.render, "ForwardRef");
          case c0:
            var Z = J.displayName || null;
            if (Z !== null)
              return Z;
            return s0(J.type) || "Memo";
          case R0: {
            var G = J, Y = G._payload, W = G._init;
            try {
              return s0(W(Y));
            } catch (z) {
              return null;
            }
          }
        }
      return null;
    }
    function w4(J, Q, X) {
      var Z = Q.displayName || Q.name || "";
      return J.displayName || (Z !== "" ? X + "(" + Z + ")" : X);
    }
    function eZ(J) {
      return J.displayName || "Context";
    }
    function q0(J) {
      var { tag: Q, type: X } = J;
      switch (Q) {
        case z0:
          return "Cache";
        case I1:
          var Z = X;
          return eZ(Z) + ".Consumer";
        case _0:
          var G = X;
          return eZ(G._context) + ".Provider";
        case h1:
          return "DehydratedFragment";
        case G0:
          return w4(X, X.render, "ForwardRef");
        case w1:
          return "Fragment";
        case p:
          return X;
        case i:
          return "Portal";
        case k:
          return "Root";
        case L0:
          return "Text";
        case e0:
          return s0(X);
        case k1:
          if (X === d)
            return "StrictMode";
          return "Mode";
        case K0:
          return "Offscreen";
        case y0:
          return "Profiler";
        case i0:
          return "Scope";
        case E0:
          return "Suspense";
        case R1:
          return "SuspenseList";
        case q7:
          return "TracingMarker";
        case h:
        case n:
        case l0:
        case U0:
        case B1:
        case g0:
          if (typeof X === "function")
            return X.displayName || X.name || null;
          if (typeof X === "string")
            return X;
          break;
      }
      return null;
    }
    var J9 = S.ReactDebugCurrentFrame, V7 = null, kJ = false;
    function hJ() {
      {
        if (V7 === null)
          return null;
        var J = V7._debugOwner;
        if (J !== null && typeof J !== "undefined")
          return q0(J);
      }
      return null;
    }
    function I4() {
      {
        if (V7 === null)
          return "";
        return tZ(V7);
      }
    }
    function f1() {
      J9.getCurrentStack = null, V7 = null, kJ = false;
    }
    function W1(J) {
      J9.getCurrentStack = J === null ? null : I4, V7 = J, kJ = false;
    }
    function R4() {
      return V7;
    }
    function G8(J) {
      kJ = J;
    }
    function x7(J) {
      return "" + J;
    }
    function A8(J) {
      switch (typeof J) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return J;
        case "object":
          return K7(J), J;
        default:
          return "";
      }
    }
    var J5 = { button: true, checkbox: true, image: true, hidden: true, radio: true, reset: true, submit: true };
    function $X(J, Q) {
      {
        if (!(J5[Q.type] || Q.onChange || Q.onInput || Q.readOnly || Q.disabled || Q.value == null))
          U("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.");
        if (!(Q.onChange || Q.readOnly || Q.disabled || Q.checked == null))
          U("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
      }
    }
    function QJ(J) {
      var { type: Q, nodeName: X } = J;
      return X && X.toLowerCase() === "input" && (Q === "checkbox" || Q === "radio");
    }
    function UX(J) {
      return J._valueTracker;
    }
    function L4(J) {
      J._valueTracker = null;
    }
    function Q5(J) {
      var Q = "";
      if (!J)
        return Q;
      if (QJ(J))
        Q = J.checked ? "true" : "false";
      else
        Q = J.value;
      return Q;
    }
    function HX(J) {
      var Q = QJ(J) ? "checked" : "value", X = Object.getOwnPropertyDescriptor(J.constructor.prototype, Q);
      K7(J[Q]);
      var Z = "" + J[Q];
      if (J.hasOwnProperty(Q) || typeof X === "undefined" || typeof X.get !== "function" || typeof X.set !== "function")
        return;
      var { get: G, set: Y } = X;
      Object.defineProperty(J, Q, { configurable: true, get: function() {
        return G.call(this);
      }, set: function(z) {
        K7(z), Z = "" + z, Y.call(this, z);
      } }), Object.defineProperty(J, Q, { enumerable: X.enumerable });
      var W = { getValue: function() {
        return Z;
      }, setValue: function(z) {
        K7(z), Z = "" + z;
      }, stopTracking: function() {
        L4(J), delete J[Q];
      } };
      return W;
    }
    function bJ(J) {
      if (UX(J))
        return;
      J._valueTracker = HX(J);
    }
    function X5(J) {
      if (!J)
        return false;
      var Q = UX(J);
      if (!Q)
        return true;
      var X = Q.getValue(), Z = Q5(J);
      if (Z !== X)
        return Q.setValue(Z), true;
      return false;
    }
    function Z5(J) {
      if (J = J || (typeof document !== "undefined" ? document : undefined), typeof J === "undefined")
        return null;
      try {
        return J.activeElement || J.body;
      } catch (Q) {
        return J.body;
      }
    }
    var Q9 = false, X9 = false, Z9 = false, B = false;
    function O(J) {
      var Q = J.type === "checkbox" || J.type === "radio";
      return Q ? J.checked != null : J.value != null;
    }
    function w(J, Q) {
      var X = J, Z = Q.checked, G = D0({}, Q, { defaultChecked: undefined, defaultValue: undefined, value: undefined, checked: Z != null ? Z : X._wrapperState.initialChecked });
      return G;
    }
    function L(J, Q) {
      {
        if ($X("input", Q), Q.checked !== undefined && Q.defaultChecked !== undefined && !X9)
          U("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", hJ() || "A component", Q.type), X9 = true;
        if (Q.value !== undefined && Q.defaultValue !== undefined && !Q9)
          U("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", hJ() || "A component", Q.type), Q9 = true;
      }
      var X = J, Z = Q.defaultValue == null ? "" : Q.defaultValue;
      X._wrapperState = { initialChecked: Q.checked != null ? Q.checked : Q.defaultChecked, initialValue: A8(Q.value != null ? Q.value : Z), controlled: O(Q) };
    }
    function C(J, Q) {
      var X = J, Z = Q.checked;
      if (Z != null)
        $Q(X, "checked", Z, false);
    }
    function J0(J, Q) {
      var X = J;
      {
        var Z = O(Q);
        if (!X._wrapperState.controlled && Z && !B)
          U("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), B = true;
        if (X._wrapperState.controlled && !Z && !Z9)
          U("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Z9 = true;
      }
      C(J, Q);
      var G = A8(Q.value), Y = Q.type;
      if (G != null) {
        if (Y === "number") {
          if (G === 0 && X.value === "" || X.value != G)
            X.value = x7(G);
        } else if (X.value !== x7(G))
          X.value = x7(G);
      } else if (Y === "submit" || Y === "reset") {
        X.removeAttribute("value");
        return;
      }
      if (Q.hasOwnProperty("value"))
        f0(X, Q.type, G);
      else if (Q.hasOwnProperty("defaultValue"))
        f0(X, Q.type, A8(Q.defaultValue));
      if (Q.checked == null && Q.defaultChecked != null)
        X.defaultChecked = !!Q.defaultChecked;
    }
    function r(J, Q, X) {
      var Z = J;
      if (Q.hasOwnProperty("value") || Q.hasOwnProperty("defaultValue")) {
        var G = Q.type, Y = G === "submit" || G === "reset";
        if (Y && (Q.value === undefined || Q.value === null))
          return;
        var W = x7(Z._wrapperState.initialValue);
        if (!X) {
          if (W !== Z.value)
            Z.value = W;
        }
        Z.defaultValue = W;
      }
      var z = Z.name;
      if (z !== "")
        Z.name = "";
      if (Z.defaultChecked = !Z.defaultChecked, Z.defaultChecked = !!Z._wrapperState.initialChecked, z !== "")
        Z.name = z;
    }
    function O0(J, Q) {
      var X = J;
      J0(X, Q), j0(X, Q);
    }
    function j0(J, Q) {
      var X = Q.name;
      if (Q.type === "radio" && X != null) {
        var Z = J;
        while (Z.parentNode)
          Z = Z.parentNode;
        q1(X, "name");
        var G = Z.querySelectorAll("input[name=" + JSON.stringify("" + X) + '][type="radio"]');
        for (var Y = 0;Y < G.length; Y++) {
          var W = G[Y];
          if (W === J || W.form !== J.form)
            continue;
          var z = l9(W);
          if (!z)
            throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
          X5(W), J0(W, z);
        }
      }
    }
    function f0(J, Q, X) {
      if (Q !== "number" || Z5(J.ownerDocument) !== J) {
        if (X == null)
          J.defaultValue = x7(J._wrapperState.initialValue);
        else if (J.defaultValue !== x7(X))
          J.defaultValue = x7(X);
      }
    }
    var n0 = false, o0 = false, Q1 = false;
    function z1(J, Q) {
      {
        if (Q.value == null) {
          if (typeof Q.children === "object" && Q.children !== null)
            H.Children.forEach(Q.children, function(X) {
              if (X == null)
                return;
              if (typeof X === "string" || typeof X === "number")
                return;
              if (!o0)
                o0 = true, U("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.");
            });
          else if (Q.dangerouslySetInnerHTML != null) {
            if (!Q1)
              Q1 = true, U("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.");
          }
        }
        if (Q.selected != null && !n0)
          U("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), n0 = true;
      }
    }
    function L1(J, Q) {
      if (Q.value != null)
        J.setAttribute("value", x7(A8(Q.value)));
    }
    var G5 = Array.isArray;
    function N1(J) {
      return G5(J);
    }
    var OX = false;
    function G9() {
      var J = hJ();
      if (J)
        return "\n\nCheck the render method of `" + J + "`.";
      return "";
    }
    var MX = ["value", "defaultValue"];
    function N4(J) {
      {
        $X("select", J);
        for (var Q = 0;Q < MX.length; Q++) {
          var X = MX[Q];
          if (J[X] == null)
            continue;
          var Z = N1(J[X]);
          if (J.multiple && !Z)
            U("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", X, G9());
          else if (!J.multiple && Z)
            U("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", X, G9());
        }
      }
    }
    function XJ(J, Q, X, Z) {
      var G = J.options;
      if (Q) {
        var Y = X, W = {};
        for (var z = 0;z < Y.length; z++)
          W["$" + Y[z]] = true;
        for (var K = 0;K < G.length; K++) {
          var V = W.hasOwnProperty("$" + G[K].value);
          if (G[K].selected !== V)
            G[K].selected = V;
          if (V && Z)
            G[K].defaultSelected = true;
        }
      } else {
        var $ = x7(A8(X)), A = null;
        for (var q = 0;q < G.length; q++) {
          if (G[q].value === $) {
            if (G[q].selected = true, Z)
              G[q].defaultSelected = true;
            return;
          }
          if (A === null && !G[q].disabled)
            A = G[q];
        }
        if (A !== null)
          A.selected = true;
      }
    }
    function qX(J, Q) {
      return D0({}, Q, { value: undefined });
    }
    function uz(J, Q) {
      var X = J;
      if (N4(Q), X._wrapperState = { wasMultiple: !!Q.multiple }, Q.value !== undefined && Q.defaultValue !== undefined && !OX)
        U("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), OX = true;
    }
    function $U(J, Q) {
      var X = J;
      X.multiple = !!Q.multiple;
      var Z = Q.value;
      if (Z != null)
        XJ(X, !!Q.multiple, Z, false);
      else if (Q.defaultValue != null)
        XJ(X, !!Q.multiple, Q.defaultValue, true);
    }
    function UU(J, Q) {
      var X = J, Z = X._wrapperState.wasMultiple;
      X._wrapperState.wasMultiple = !!Q.multiple;
      var G = Q.value;
      if (G != null)
        XJ(X, !!Q.multiple, G, false);
      else if (Z !== !!Q.multiple)
        if (Q.defaultValue != null)
          XJ(X, !!Q.multiple, Q.defaultValue, true);
        else
          XJ(X, !!Q.multiple, Q.multiple ? [] : "", false);
    }
    function HU(J, Q) {
      var X = J, Z = Q.value;
      if (Z != null)
        XJ(X, !!Q.multiple, Z, false);
    }
    var mz = false;
    function S4(J, Q) {
      var X = J;
      if (Q.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var Z = D0({}, Q, { value: undefined, defaultValue: undefined, children: x7(X._wrapperState.initialValue) });
      return Z;
    }
    function yz(J, Q) {
      var X = J;
      if ($X("textarea", Q), Q.value !== undefined && Q.defaultValue !== undefined && !mz)
        U("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", hJ() || "A component"), mz = true;
      var Z = Q.value;
      if (Z == null) {
        var { children: G, defaultValue: Y } = Q;
        if (G != null) {
          U("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (Y != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (N1(G)) {
              if (G.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              G = G[0];
            }
            Y = G;
          }
        }
        if (Y == null)
          Y = "";
        Z = Y;
      }
      X._wrapperState = { initialValue: A8(Z) };
    }
    function cz(J, Q) {
      var X = J, Z = A8(Q.value), G = A8(Q.defaultValue);
      if (Z != null) {
        var Y = x7(Z);
        if (Y !== X.value)
          X.value = Y;
        if (Q.defaultValue == null && X.defaultValue !== Y)
          X.defaultValue = Y;
      }
      if (G != null)
        X.defaultValue = x7(G);
    }
    function sz(J, Q) {
      var X = J, Z = X.textContent;
      if (Z === X._wrapperState.initialValue) {
        if (Z !== "" && Z !== null)
          X.value = Z;
      }
    }
    function OU(J, Q) {
      cz(J, Q);
    }
    var ZJ = "http://www.w3.org/1999/xhtml", MU = "http://www.w3.org/1998/Math/MathML", _4 = "http://www.w3.org/2000/svg";
    function j4(J) {
      switch (J) {
        case "svg":
          return _4;
        case "math":
          return MU;
        default:
          return ZJ;
      }
    }
    function x4(J, Q) {
      if (J == null || J === ZJ)
        return j4(Q);
      if (J === _4 && Q === "foreignObject")
        return ZJ;
      return J;
    }
    var qU = function(J) {
      if (typeof MSApp !== "undefined" && MSApp.execUnsafeLocalFunction)
        return function(Q, X, Z, G) {
          MSApp.execUnsafeLocalFunction(function() {
            return J(Q, X, Z, G);
          });
        };
      else
        return J;
    }, Y9, lz = qU(function(J, Q) {
      if (J.namespaceURI === _4) {
        if (!("innerHTML" in J)) {
          Y9 = Y9 || document.createElement("div"), Y9.innerHTML = "<svg>" + Q.valueOf().toString() + "</svg>";
          var X = Y9.firstChild;
          while (J.firstChild)
            J.removeChild(J.firstChild);
          while (X.firstChild)
            J.appendChild(X.firstChild);
          return;
        }
      }
      J.innerHTML = Q;
    }), g7 = 1, GJ = 3, P1 = 8, YJ = 9, g4 = 11, W9 = function(J, Q) {
      if (Q) {
        var X = J.firstChild;
        if (X && X === J.lastChild && X.nodeType === GJ) {
          X.nodeValue = Q;
          return;
        }
      }
      J.textContent = Q;
    }, AU = { animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"], background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"], backgroundPosition: ["backgroundPositionX", "backgroundPositionY"], border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"], borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"], borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"], borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"], borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"], borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"], borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"], borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"], borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"], borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"], borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"], borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"], borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"], borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"], columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"], columns: ["columnCount", "columnWidth"], flex: ["flexBasis", "flexGrow", "flexShrink"], flexFlow: ["flexDirection", "flexWrap"], font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"], fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"], gap: ["columnGap", "rowGap"], grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"], gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"], gridColumn: ["gridColumnEnd", "gridColumnStart"], gridColumnGap: ["columnGap"], gridGap: ["columnGap", "rowGap"], gridRow: ["gridRowEnd", "gridRowStart"], gridRowGap: ["rowGap"], gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"], listStyle: ["listStyleImage", "listStylePosition", "listStyleType"], margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"], marker: ["markerEnd", "markerMid", "markerStart"], mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"], maskPosition: ["maskPositionX", "maskPositionY"], outline: ["outlineColor", "outlineStyle", "outlineWidth"], overflow: ["overflowX", "overflowY"], padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"], placeContent: ["alignContent", "justifyContent"], placeItems: ["alignItems", "justifyItems"], placeSelf: ["alignSelf", "justifySelf"], textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"], textEmphasis: ["textEmphasisColor", "textEmphasisStyle"], transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"], wordWrap: ["overflowWrap"] }, AX = { animationIterationCount: true, aspectRatio: true, borderImageOutset: true, borderImageSlice: true, borderImageWidth: true, boxFlex: true, boxFlexGroup: true, boxOrdinalGroup: true, columnCount: true, columns: true, flex: true, flexGrow: true, flexPositive: true, flexShrink: true, flexNegative: true, flexOrder: true, gridArea: true, gridRow: true, gridRowEnd: true, gridRowSpan: true, gridRowStart: true, gridColumn: true, gridColumnEnd: true, gridColumnSpan: true, gridColumnStart: true, fontWeight: true, lineClamp: true, lineHeight: true, opacity: true, order: true, orphans: true, tabSize: true, widows: true, zIndex: true, zoom: true, fillOpacity: true, floodOpacity: true, stopOpacity: true, strokeDasharray: true, strokeDashoffset: true, strokeMiterlimit: true, strokeOpacity: true, strokeWidth: true };
    function PU(J, Q) {
      return J + Q.charAt(0).toUpperCase() + Q.substring(1);
    }
    var FU = ["Webkit", "ms", "Moz", "O"];
    Object.keys(AX).forEach(function(J) {
      FU.forEach(function(Q) {
        AX[PU(Q, J)] = AX[J];
      });
    });
    function v4(J, Q, X) {
      var Z = Q == null || typeof Q === "boolean" || Q === "";
      if (Z)
        return "";
      if (!X && typeof Q === "number" && Q !== 0 && !(AX.hasOwnProperty(J) && AX[J]))
        return Q + "px";
      return _J(Q, J), ("" + Q).trim();
    }
    var DU = /([A-Z])/g, EU = /^ms-/;
    function wU(J) {
      return J.replace(DU, "-$1").toLowerCase().replace(EU, "-ms-");
    }
    var iz = function() {
    };
    {
      var IU = /^(?:webkit|moz|o)[A-Z]/, RU = /^-ms-/, LU = /-(.)/g, pz = /;\s*$/, Y5 = {}, C4 = {}, az = false, rz = false, NU = function(J) {
        return J.replace(LU, function(Q, X) {
          return X.toUpperCase();
        });
      }, SU = function(J) {
        if (Y5.hasOwnProperty(J) && Y5[J])
          return;
        Y5[J] = true, U("Unsupported style property %s. Did you mean %s?", J, NU(J.replace(RU, "ms-")));
      }, _U = function(J) {
        if (Y5.hasOwnProperty(J) && Y5[J])
          return;
        Y5[J] = true, U("Unsupported vendor-prefixed style property %s. Did you mean %s?", J, J.charAt(0).toUpperCase() + J.slice(1));
      }, jU = function(J, Q) {
        if (C4.hasOwnProperty(Q) && C4[Q])
          return;
        C4[Q] = true, U(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, J, Q.replace(pz, ""));
      }, xU = function(J, Q) {
        if (az)
          return;
        az = true, U("`NaN` is an invalid value for the `%s` css style property.", J);
      }, gU = function(J, Q) {
        if (rz)
          return;
        rz = true, U("`Infinity` is an invalid value for the `%s` css style property.", J);
      };
      iz = function(J, Q) {
        if (J.indexOf("-") > -1)
          SU(J);
        else if (IU.test(J))
          _U(J);
        else if (pz.test(Q))
          jU(J, Q);
        if (typeof Q === "number") {
          if (isNaN(Q))
            xU(J, Q);
          else if (!isFinite(Q))
            gU(J, Q);
        }
      };
    }
    var vU = iz;
    function CU(J) {
      {
        var Q = "", X = "";
        for (var Z in J) {
          if (!J.hasOwnProperty(Z))
            continue;
          var G = J[Z];
          if (G != null) {
            var Y = Z.indexOf("--") === 0;
            Q += X + (Y ? Z : wU(Z)) + ":", Q += v4(Z, G, Y), X = ";";
          }
        }
        return Q || null;
      }
    }
    function nz(J, Q) {
      var X = J.style;
      for (var Z in Q) {
        if (!Q.hasOwnProperty(Z))
          continue;
        var G = Z.indexOf("--") === 0;
        if (!G)
          vU(Z, Q[Z]);
        var Y = v4(Z, Q[Z], G);
        if (Z === "float")
          Z = "cssFloat";
        if (G)
          X.setProperty(Z, Y);
        else
          X[Z] = Y;
      }
    }
    function TU(J) {
      return J == null || typeof J === "boolean" || J === "";
    }
    function oz(J) {
      var Q = {};
      for (var X in J) {
        var Z = AU[X] || [X];
        for (var G = 0;G < Z.length; G++)
          Q[Z[G]] = X;
      }
      return Q;
    }
    function kU(J, Q) {
      {
        if (!Q)
          return;
        var X = oz(J), Z = oz(Q), G = {};
        for (var Y in X) {
          var W = X[Y], z = Z[Y];
          if (z && W !== z) {
            var K = W + "," + z;
            if (G[K])
              continue;
            G[K] = true, U("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", TU(J[W]) ? "Removing" : "Updating", W, z);
          }
        }
      }
    }
    var hU = { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true }, bU = D0({ menuitem: true }, hU), fU = "__html";
    function T4(J, Q) {
      if (!Q)
        return;
      if (bU[J]) {
        if (Q.children != null || Q.dangerouslySetInnerHTML != null)
          throw new Error(J + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      }
      if (Q.dangerouslySetInnerHTML != null) {
        if (Q.children != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof Q.dangerouslySetInnerHTML !== "object" || !(fU in Q.dangerouslySetInnerHTML))
          throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
      }
      if (!Q.suppressContentEditableWarning && Q.contentEditable && Q.children != null)
        U("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
      if (Q.style != null && typeof Q.style !== "object")
        throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
    }
    function OQ(J, Q) {
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
    var z9 = { accept: "accept", acceptcharset: "acceptCharset", "accept-charset": "acceptCharset", accesskey: "accessKey", action: "action", allowfullscreen: "allowFullScreen", alt: "alt", as: "as", async: "async", autocapitalize: "autoCapitalize", autocomplete: "autoComplete", autocorrect: "autoCorrect", autofocus: "autoFocus", autoplay: "autoPlay", autosave: "autoSave", capture: "capture", cellpadding: "cellPadding", cellspacing: "cellSpacing", challenge: "challenge", charset: "charSet", checked: "checked", children: "children", cite: "cite", class: "className", classid: "classID", classname: "className", cols: "cols", colspan: "colSpan", content: "content", contenteditable: "contentEditable", contextmenu: "contextMenu", controls: "controls", controlslist: "controlsList", coords: "coords", crossorigin: "crossOrigin", dangerouslysetinnerhtml: "dangerouslySetInnerHTML", data: "data", datetime: "dateTime", default: "default", defaultchecked: "defaultChecked", defaultvalue: "defaultValue", defer: "defer", dir: "dir", disabled: "disabled", disablepictureinpicture: "disablePictureInPicture", disableremoteplayback: "disableRemotePlayback", download: "download", draggable: "draggable", enctype: "encType", enterkeyhint: "enterKeyHint", for: "htmlFor", form: "form", formmethod: "formMethod", formaction: "formAction", formenctype: "formEncType", formnovalidate: "formNoValidate", formtarget: "formTarget", frameborder: "frameBorder", headers: "headers", height: "height", hidden: "hidden", high: "high", href: "href", hreflang: "hrefLang", htmlfor: "htmlFor", httpequiv: "httpEquiv", "http-equiv": "httpEquiv", icon: "icon", id: "id", imagesizes: "imageSizes", imagesrcset: "imageSrcSet", innerhtml: "innerHTML", inputmode: "inputMode", integrity: "integrity", is: "is", itemid: "itemID", itemprop: "itemProp", itemref: "itemRef", itemscope: "itemScope", itemtype: "itemType", keyparams: "keyParams", keytype: "keyType", kind: "kind", label: "label", lang: "lang", list: "list", loop: "loop", low: "low", manifest: "manifest", marginwidth: "marginWidth", marginheight: "marginHeight", max: "max", maxlength: "maxLength", media: "media", mediagroup: "mediaGroup", method: "method", min: "min", minlength: "minLength", multiple: "multiple", muted: "muted", name: "name", nomodule: "noModule", nonce: "nonce", novalidate: "noValidate", open: "open", optimum: "optimum", pattern: "pattern", placeholder: "placeholder", playsinline: "playsInline", poster: "poster", preload: "preload", profile: "profile", radiogroup: "radioGroup", readonly: "readOnly", referrerpolicy: "referrerPolicy", rel: "rel", required: "required", reversed: "reversed", role: "role", rows: "rows", rowspan: "rowSpan", sandbox: "sandbox", scope: "scope", scoped: "scoped", scrolling: "scrolling", seamless: "seamless", selected: "selected", shape: "shape", size: "size", sizes: "sizes", span: "span", spellcheck: "spellCheck", src: "src", srcdoc: "srcDoc", srclang: "srcLang", srcset: "srcSet", start: "start", step: "step", style: "style", summary: "summary", tabindex: "tabIndex", target: "target", title: "title", type: "type", usemap: "useMap", value: "value", width: "width", wmode: "wmode", wrap: "wrap", about: "about", accentheight: "accentHeight", "accent-height": "accentHeight", accumulate: "accumulate", additive: "additive", alignmentbaseline: "alignmentBaseline", "alignment-baseline": "alignmentBaseline", allowreorder: "allowReorder", alphabetic: "alphabetic", amplitude: "amplitude", arabicform: "arabicForm", "arabic-form": "arabicForm", ascent: "ascent", attributename: "attributeName", attributetype: "attributeType", autoreverse: "autoReverse", azimuth: "azimuth", basefrequency: "baseFrequency", baselineshift: "baselineShift", "baseline-shift": "baselineShift", baseprofile: "baseProfile", bbox: "bbox", begin: "begin", bias: "bias", by: "by", calcmode: "calcMode", capheight: "capHeight", "cap-height": "capHeight", clip: "clip", clippath: "clipPath", "clip-path": "clipPath", clippathunits: "clipPathUnits", cliprule: "clipRule", "clip-rule": "clipRule", color: "color", colorinterpolation: "colorInterpolation", "color-interpolation": "colorInterpolation", colorinterpolationfilters: "colorInterpolationFilters", "color-interpolation-filters": "colorInterpolationFilters", colorprofile: "colorProfile", "color-profile": "colorProfile", colorrendering: "colorRendering", "color-rendering": "colorRendering", contentscripttype: "contentScriptType", contentstyletype: "contentStyleType", cursor: "cursor", cx: "cx", cy: "cy", d: "d", datatype: "datatype", decelerate: "decelerate", descent: "descent", diffuseconstant: "diffuseConstant", direction: "direction", display: "display", divisor: "divisor", dominantbaseline: "dominantBaseline", "dominant-baseline": "dominantBaseline", dur: "dur", dx: "dx", dy: "dy", edgemode: "edgeMode", elevation: "elevation", enablebackground: "enableBackground", "enable-background": "enableBackground", end: "end", exponent: "exponent", externalresourcesrequired: "externalResourcesRequired", fill: "fill", fillopacity: "fillOpacity", "fill-opacity": "fillOpacity", fillrule: "fillRule", "fill-rule": "fillRule", filter: "filter", filterres: "filterRes", filterunits: "filterUnits", floodopacity: "floodOpacity", "flood-opacity": "floodOpacity", floodcolor: "floodColor", "flood-color": "floodColor", focusable: "focusable", fontfamily: "fontFamily", "font-family": "fontFamily", fontsize: "fontSize", "font-size": "fontSize", fontsizeadjust: "fontSizeAdjust", "font-size-adjust": "fontSizeAdjust", fontstretch: "fontStretch", "font-stretch": "fontStretch", fontstyle: "fontStyle", "font-style": "fontStyle", fontvariant: "fontVariant", "font-variant": "fontVariant", fontweight: "fontWeight", "font-weight": "fontWeight", format: "format", from: "from", fx: "fx", fy: "fy", g1: "g1", g2: "g2", glyphname: "glyphName", "glyph-name": "glyphName", glyphorientationhorizontal: "glyphOrientationHorizontal", "glyph-orientation-horizontal": "glyphOrientationHorizontal", glyphorientationvertical: "glyphOrientationVertical", "glyph-orientation-vertical": "glyphOrientationVertical", glyphref: "glyphRef", gradienttransform: "gradientTransform", gradientunits: "gradientUnits", hanging: "hanging", horizadvx: "horizAdvX", "horiz-adv-x": "horizAdvX", horizoriginx: "horizOriginX", "horiz-origin-x": "horizOriginX", ideographic: "ideographic", imagerendering: "imageRendering", "image-rendering": "imageRendering", in2: "in2", in: "in", inlist: "inlist", intercept: "intercept", k1: "k1", k2: "k2", k3: "k3", k4: "k4", k: "k", kernelmatrix: "kernelMatrix", kernelunitlength: "kernelUnitLength", kerning: "kerning", keypoints: "keyPoints", keysplines: "keySplines", keytimes: "keyTimes", lengthadjust: "lengthAdjust", letterspacing: "letterSpacing", "letter-spacing": "letterSpacing", lightingcolor: "lightingColor", "lighting-color": "lightingColor", limitingconeangle: "limitingConeAngle", local: "local", markerend: "markerEnd", "marker-end": "markerEnd", markerheight: "markerHeight", markermid: "markerMid", "marker-mid": "markerMid", markerstart: "markerStart", "marker-start": "markerStart", markerunits: "markerUnits", markerwidth: "markerWidth", mask: "mask", maskcontentunits: "maskContentUnits", maskunits: "maskUnits", mathematical: "mathematical", mode: "mode", numoctaves: "numOctaves", offset: "offset", opacity: "opacity", operator: "operator", order: "order", orient: "orient", orientation: "orientation", origin: "origin", overflow: "overflow", overlineposition: "overlinePosition", "overline-position": "overlinePosition", overlinethickness: "overlineThickness", "overline-thickness": "overlineThickness", paintorder: "paintOrder", "paint-order": "paintOrder", panose1: "panose1", "panose-1": "panose1", pathlength: "pathLength", patterncontentunits: "patternContentUnits", patterntransform: "patternTransform", patternunits: "patternUnits", pointerevents: "pointerEvents", "pointer-events": "pointerEvents", points: "points", pointsatx: "pointsAtX", pointsaty: "pointsAtY", pointsatz: "pointsAtZ", prefix: "prefix", preservealpha: "preserveAlpha", preserveaspectratio: "preserveAspectRatio", primitiveunits: "primitiveUnits", property: "property", r: "r", radius: "radius", refx: "refX", refy: "refY", renderingintent: "renderingIntent", "rendering-intent": "renderingIntent", repeatcount: "repeatCount", repeatdur: "repeatDur", requiredextensions: "requiredExtensions", requiredfeatures: "requiredFeatures", resource: "resource", restart: "restart", result: "result", results: "results", rotate: "rotate", rx: "rx", ry: "ry", scale: "scale", security: "security", seed: "seed", shaperendering: "shapeRendering", "shape-rendering": "shapeRendering", slope: "slope", spacing: "spacing", specularconstant: "specularConstant", specularexponent: "specularExponent", speed: "speed", spreadmethod: "spreadMethod", startoffset: "startOffset", stddeviation: "stdDeviation", stemh: "stemh", stemv: "stemv", stitchtiles: "stitchTiles", stopcolor: "stopColor", "stop-color": "stopColor", stopopacity: "stopOpacity", "stop-opacity": "stopOpacity", strikethroughposition: "strikethroughPosition", "strikethrough-position": "strikethroughPosition", strikethroughthickness: "strikethroughThickness", "strikethrough-thickness": "strikethroughThickness", string: "string", stroke: "stroke", strokedasharray: "strokeDasharray", "stroke-dasharray": "strokeDasharray", strokedashoffset: "strokeDashoffset", "stroke-dashoffset": "strokeDashoffset", strokelinecap: "strokeLinecap", "stroke-linecap": "strokeLinecap", strokelinejoin: "strokeLinejoin", "stroke-linejoin": "strokeLinejoin", strokemiterlimit: "strokeMiterlimit", "stroke-miterlimit": "strokeMiterlimit", strokewidth: "strokeWidth", "stroke-width": "strokeWidth", strokeopacity: "strokeOpacity", "stroke-opacity": "strokeOpacity", suppresscontenteditablewarning: "suppressContentEditableWarning", suppresshydrationwarning: "suppressHydrationWarning", surfacescale: "surfaceScale", systemlanguage: "systemLanguage", tablevalues: "tableValues", targetx: "targetX", targety: "targetY", textanchor: "textAnchor", "text-anchor": "textAnchor", textdecoration: "textDecoration", "text-decoration": "textDecoration", textlength: "textLength", textrendering: "textRendering", "text-rendering": "textRendering", to: "to", transform: "transform", typeof: "typeof", u1: "u1", u2: "u2", underlineposition: "underlinePosition", "underline-position": "underlinePosition", underlinethickness: "underlineThickness", "underline-thickness": "underlineThickness", unicode: "unicode", unicodebidi: "unicodeBidi", "unicode-bidi": "unicodeBidi", unicoderange: "unicodeRange", "unicode-range": "unicodeRange", unitsperem: "unitsPerEm", "units-per-em": "unitsPerEm", unselectable: "unselectable", valphabetic: "vAlphabetic", "v-alphabetic": "vAlphabetic", values: "values", vectoreffect: "vectorEffect", "vector-effect": "vectorEffect", version: "version", vertadvy: "vertAdvY", "vert-adv-y": "vertAdvY", vertoriginx: "vertOriginX", "vert-origin-x": "vertOriginX", vertoriginy: "vertOriginY", "vert-origin-y": "vertOriginY", vhanging: "vHanging", "v-hanging": "vHanging", videographic: "vIdeographic", "v-ideographic": "vIdeographic", viewbox: "viewBox", viewtarget: "viewTarget", visibility: "visibility", vmathematical: "vMathematical", "v-mathematical": "vMathematical", vocab: "vocab", widths: "widths", wordspacing: "wordSpacing", "word-spacing": "wordSpacing", writingmode: "writingMode", "writing-mode": "writingMode", x1: "x1", x2: "x2", x: "x", xchannelselector: "xChannelSelector", xheight: "xHeight", "x-height": "xHeight", xlinkactuate: "xlinkActuate", "xlink:actuate": "xlinkActuate", xlinkarcrole: "xlinkArcrole", "xlink:arcrole": "xlinkArcrole", xlinkhref: "xlinkHref", "xlink:href": "xlinkHref", xlinkrole: "xlinkRole", "xlink:role": "xlinkRole", xlinkshow: "xlinkShow", "xlink:show": "xlinkShow", xlinktitle: "xlinkTitle", "xlink:title": "xlinkTitle", xlinktype: "xlinkType", "xlink:type": "xlinkType", xmlbase: "xmlBase", "xml:base": "xmlBase", xmllang: "xmlLang", "xml:lang": "xmlLang", xmlns: "xmlns", "xml:space": "xmlSpace", xmlnsxlink: "xmlnsXlink", "xmlns:xlink": "xmlnsXlink", xmlspace: "xmlSpace", y1: "y1", y2: "y2", y: "y", ychannelselector: "yChannelSelector", z: "z", zoomandpan: "zoomAndPan" }, tz = { "aria-current": 0, "aria-description": 0, "aria-details": 0, "aria-disabled": 0, "aria-hidden": 0, "aria-invalid": 0, "aria-keyshortcuts": 0, "aria-label": 0, "aria-roledescription": 0, "aria-autocomplete": 0, "aria-checked": 0, "aria-expanded": 0, "aria-haspopup": 0, "aria-level": 0, "aria-modal": 0, "aria-multiline": 0, "aria-multiselectable": 0, "aria-orientation": 0, "aria-placeholder": 0, "aria-pressed": 0, "aria-readonly": 0, "aria-required": 0, "aria-selected": 0, "aria-sort": 0, "aria-valuemax": 0, "aria-valuemin": 0, "aria-valuenow": 0, "aria-valuetext": 0, "aria-atomic": 0, "aria-busy": 0, "aria-live": 0, "aria-relevant": 0, "aria-dropeffect": 0, "aria-grabbed": 0, "aria-activedescendant": 0, "aria-colcount": 0, "aria-colindex": 0, "aria-colspan": 0, "aria-controls": 0, "aria-describedby": 0, "aria-errormessage": 0, "aria-flowto": 0, "aria-labelledby": 0, "aria-owns": 0, "aria-posinset": 0, "aria-rowcount": 0, "aria-rowindex": 0, "aria-rowspan": 0, "aria-setsize": 0 }, W5 = {}, dU = new RegExp("^(aria)-[" + t + "]*$"), uU = new RegExp("^(aria)[A-Z][" + t + "]*$");
    function mU(J, Q) {
      {
        if (l1.call(W5, Q) && W5[Q])
          return true;
        if (uU.test(Q)) {
          var X = "aria-" + Q.slice(4).toLowerCase(), Z = tz.hasOwnProperty(X) ? X : null;
          if (Z == null)
            return U("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", Q), W5[Q] = true, true;
          if (Q !== Z)
            return U("Invalid ARIA attribute `%s`. Did you mean `%s`?", Q, Z), W5[Q] = true, true;
        }
        if (dU.test(Q)) {
          var G = Q.toLowerCase(), Y = tz.hasOwnProperty(G) ? G : null;
          if (Y == null)
            return W5[Q] = true, false;
          if (Q !== Y)
            return U("Unknown ARIA attribute `%s`. Did you mean `%s`?", Q, Y), W5[Q] = true, true;
        }
      }
      return true;
    }
    function yU(J, Q) {
      {
        var X = [];
        for (var Z in Q) {
          var G = mU(J, Z);
          if (!G)
            X.push(Z);
        }
        var Y = X.map(function(W) {
          return "`" + W + "`";
        }).join(", ");
        if (X.length === 1)
          U("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", Y, J);
        else if (X.length > 1)
          U("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", Y, J);
      }
    }
    function cU(J, Q) {
      if (OQ(J, Q))
        return;
      yU(J, Q);
    }
    var ez = false;
    function sU(J, Q) {
      {
        if (J !== "input" && J !== "textarea" && J !== "select")
          return;
        if (Q != null && Q.value === null && !ez)
          if (ez = true, J === "select" && Q.multiple)
            U("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", J);
          else
            U("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", J);
      }
    }
    var JK = function() {
    };
    {
      var E7 = {}, QK = /^on./, lU = /^on[^A-Z]/, iU = new RegExp("^(aria)-[" + t + "]*$"), pU = new RegExp("^(aria)[A-Z][" + t + "]*$");
      JK = function(J, Q, X, Z) {
        if (l1.call(E7, Q) && E7[Q])
          return true;
        var G = Q.toLowerCase();
        if (G === "onfocusin" || G === "onfocusout")
          return U("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), E7[Q] = true, true;
        if (Z != null) {
          var { registrationNameDependencies: Y, possibleRegistrationNames: W } = Z;
          if (Y.hasOwnProperty(Q))
            return true;
          var z = W.hasOwnProperty(G) ? W[G] : null;
          if (z != null)
            return U("Invalid event handler property `%s`. Did you mean `%s`?", Q, z), E7[Q] = true, true;
          if (QK.test(Q))
            return U("Unknown event handler property `%s`. It will be ignored.", Q), E7[Q] = true, true;
        } else if (QK.test(Q)) {
          if (lU.test(Q))
            U("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", Q);
          return E7[Q] = true, true;
        }
        if (iU.test(Q) || pU.test(Q))
          return true;
        if (G === "innerhtml")
          return U("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), E7[Q] = true, true;
        if (G === "aria")
          return U("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), E7[Q] = true, true;
        if (G === "is" && X !== null && X !== undefined && typeof X !== "string")
          return U("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof X), E7[Q] = true, true;
        if (typeof X === "number" && isNaN(X))
          return U("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", Q), E7[Q] = true, true;
        var K = D7(Q), V = K !== null && K.type === J8;
        if (z9.hasOwnProperty(G)) {
          var $ = z9[G];
          if ($ !== Q)
            return U("Invalid DOM property `%s`. Did you mean `%s`?", Q, $), E7[Q] = true, true;
        } else if (!V && Q !== G)
          return U("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", Q, G), E7[Q] = true, true;
        if (typeof X === "boolean" && j7(Q, X, K, false)) {
          if (X)
            U('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', X, Q, Q, X, Q);
          else
            U('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', X, Q, Q, X, Q, Q, Q);
          return E7[Q] = true, true;
        }
        if (V)
          return true;
        if (j7(Q, X, K, false))
          return E7[Q] = true, false;
        if ((X === "false" || X === "true") && K !== null && K.type === A1)
          return U("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", X, Q, X === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', Q, X), E7[Q] = true, true;
        return true;
      };
    }
    var aU = function(J, Q, X) {
      {
        var Z = [];
        for (var G in Q) {
          var Y = JK(J, G, Q[G], X);
          if (!Y)
            Z.push(G);
        }
        var W = Z.map(function(z) {
          return "`" + z + "`";
        }).join(", ");
        if (Z.length === 1)
          U("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", W, J);
        else if (Z.length > 1)
          U("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", W, J);
      }
    };
    function rU(J, Q, X) {
      if (OQ(J, Q))
        return;
      aU(J, Q, X);
    }
    var XK = 1, k4 = 1 << 1, PX = 1 << 2, nU = XK | k4 | PX, FX = null;
    function oU(J) {
      if (FX !== null)
        U("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue.");
      FX = J;
    }
    function tU() {
      if (FX === null)
        U("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue.");
      FX = null;
    }
    function eU(J) {
      return J === FX;
    }
    function h4(J) {
      var Q = J.target || J.srcElement || window;
      if (Q.correspondingUseElement)
        Q = Q.correspondingUseElement;
      return Q.nodeType === GJ ? Q.parentNode : Q;
    }
    var b4 = null, z5 = null, K5 = null;
    function ZK(J) {
      var Q = lJ(J);
      if (!Q)
        return;
      if (typeof b4 !== "function")
        throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
      var X = Q.stateNode;
      if (X) {
        var Z = l9(X);
        b4(Q.stateNode, Q.type, Z);
      }
    }
    function JH(J) {
      b4 = J;
    }
    function GK(J) {
      if (z5)
        if (K5)
          K5.push(J);
        else
          K5 = [J];
      else
        z5 = J;
    }
    function QH() {
      return z5 !== null || K5 !== null;
    }
    function YK() {
      if (!z5)
        return;
      var J = z5, Q = K5;
      if (z5 = null, K5 = null, ZK(J), Q)
        for (var X = 0;X < Q.length; X++)
          ZK(Q[X]);
    }
    var WK = function(J, Q) {
      return J(Q);
    }, zK = function() {
    }, f4 = false;
    function XH() {
      var J = QH();
      if (J)
        zK(), YK();
    }
    function KK(J, Q, X) {
      if (f4)
        return J(Q, X);
      f4 = true;
      try {
        return WK(J, Q, X);
      } finally {
        f4 = false, XH();
      }
    }
    function ZH(J, Q, X) {
      WK = J, zK = X;
    }
    function GH(J) {
      return J === "button" || J === "input" || J === "select" || J === "textarea";
    }
    function YH(J, Q, X) {
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
          return !!(X.disabled && GH(Q));
        default:
          return false;
      }
    }
    function DX(J, Q) {
      var X = J.stateNode;
      if (X === null)
        return null;
      var Z = l9(X);
      if (Z === null)
        return null;
      var G = Z[Q];
      if (YH(Q, J.type, Z))
        return null;
      if (G && typeof G !== "function")
        throw new Error("Expected `" + Q + "` listener to be a function, instead got a value of `" + typeof G + "` type.");
      return G;
    }
    var d4 = false;
    if (s1)
      try {
        var EX = {};
        Object.defineProperty(EX, "passive", { get: function() {
          d4 = true;
        } }), window.addEventListener("test", EX, EX), window.removeEventListener("test", EX, EX);
      } catch (J) {
        d4 = false;
      }
    function BK(J, Q, X, Z, G, Y, W, z, K) {
      var V = Array.prototype.slice.call(arguments, 3);
      try {
        Q.apply(X, V);
      } catch ($) {
        this.onError($);
      }
    }
    var VK = BK;
    if (typeof window !== "undefined" && typeof window.dispatchEvent === "function" && typeof document !== "undefined" && typeof document.createEvent === "function") {
      var u4 = document.createElement("react");
      VK = function J(Q, X, Z, G, Y, W, z, K, V) {
        if (typeof document === "undefined" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var $ = document.createEvent("Event"), A = false, q = true, I = window.event, E = Object.getOwnPropertyDescriptor(window, "event");
        function R() {
          if (u4.removeEventListener(N, e, false), typeof window.event !== "undefined" && window.hasOwnProperty("event"))
            window.event = I;
        }
        var y = Array.prototype.slice.call(arguments, 3);
        function e() {
          A = true, R(), X.apply(Z, y), q = false;
        }
        var o, w0 = false, I0 = false;
        function P(F) {
          if (o = F.error, w0 = true, o === null && F.colno === 0 && F.lineno === 0)
            I0 = true;
          if (F.defaultPrevented) {
            if (o != null && typeof o === "object")
              try {
                o._suppressLogging = true;
              } catch (g) {
              }
          }
        }
        var N = "react-" + (Q ? Q : "invokeguardedcallback");
        if (window.addEventListener("error", P), u4.addEventListener(N, e, false), $.initEvent(N, false, false), u4.dispatchEvent($), E)
          Object.defineProperty(window, "event", E);
        if (A && q) {
          if (!w0)
            o = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`);
          else if (I0)
            o = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.");
          this.onError(o);
        }
        if (window.removeEventListener("error", P), !A)
          return R(), BK.apply(this, arguments);
      };
    }
    var WH = VK, B5 = false, K9 = null, B9 = false, m4 = null, zH = { onError: function(J) {
      B5 = true, K9 = J;
    } };
    function y4(J, Q, X, Z, G, Y, W, z, K) {
      B5 = false, K9 = null, WH.apply(zH, arguments);
    }
    function KH(J, Q, X, Z, G, Y, W, z, K) {
      if (y4.apply(this, arguments), B5) {
        var V = c4();
        if (!B9)
          B9 = true, m4 = V;
      }
    }
    function BH() {
      if (B9) {
        var J = m4;
        throw B9 = false, m4 = null, J;
      }
    }
    function VH() {
      return B5;
    }
    function c4() {
      if (B5) {
        var J = K9;
        return B5 = false, K9 = null, J;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function V5(J) {
      return J._reactInternals;
    }
    function $H(J) {
      return J._reactInternals !== undefined;
    }
    function UH(J, Q) {
      J._reactInternals = Q;
    }
    var X0 = 0, $5 = 1, F1 = 2, x0 = 4, MQ = 16, wX = 32, s4 = 64, k0 = 128, WJ = 256, fJ = 512, qQ = 1024, P8 = 2048, zJ = 4096, AQ = 8192, V9 = 16384, HH = P8 | x0 | s4 | fJ | qQ | V9, OH = 32767, IX = 32768, w7 = 65536, l4 = 131072, $K = 1048576, i4 = 2097152, PQ = 4194304, p4 = 8388608, KJ = 16777216, $9 = 33554432, a4 = x0 | qQ | 0, r4 = F1 | x0 | MQ | wX | fJ | zJ | AQ, RX = x0 | s4 | fJ | AQ, U5 = P8 | MQ, BJ = PQ | p4 | i4, MH = S.ReactCurrentOwner;
    function FQ(J) {
      var Q = J, X = J;
      if (!J.alternate) {
        var Z = Q;
        do {
          if (Q = Z, (Q.flags & (F1 | zJ)) !== X0)
            X = Q.return;
          Z = Q.return;
        } while (Z);
      } else
        while (Q.return)
          Q = Q.return;
      if (Q.tag === k)
        return X;
      return null;
    }
    function UK(J) {
      if (J.tag === E0) {
        var Q = J.memoizedState;
        if (Q === null) {
          var X = J.alternate;
          if (X !== null)
            Q = X.memoizedState;
        }
        if (Q !== null)
          return Q.dehydrated;
      }
      return null;
    }
    function HK(J) {
      return J.tag === k ? J.stateNode.containerInfo : null;
    }
    function qH(J) {
      return FQ(J) === J;
    }
    function AH(J) {
      {
        var Q = MH.current;
        if (Q !== null && Q.tag === h) {
          var X = Q, Z = X.stateNode;
          if (!Z._warnedAboutRefsInRender)
            U("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", q0(X) || "A component");
          Z._warnedAboutRefsInRender = true;
        }
      }
      var G = V5(J);
      if (!G)
        return false;
      return FQ(G) === G;
    }
    function OK(J) {
      if (FQ(J) !== J)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function MK(J) {
      var Q = J.alternate;
      if (!Q) {
        var X = FQ(J);
        if (X === null)
          throw new Error("Unable to find node on an unmounted component.");
        if (X !== J)
          return null;
        return J;
      }
      var Z = J, G = Q;
      while (true) {
        var Y = Z.return;
        if (Y === null)
          break;
        var W = Y.alternate;
        if (W === null) {
          var z = Y.return;
          if (z !== null) {
            Z = G = z;
            continue;
          }
          break;
        }
        if (Y.child === W.child) {
          var K = Y.child;
          while (K) {
            if (K === Z)
              return OK(Y), J;
            if (K === G)
              return OK(Y), Q;
            K = K.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (Z.return !== G.return)
          Z = Y, G = W;
        else {
          var V = false, $ = Y.child;
          while ($) {
            if ($ === Z) {
              V = true, Z = Y, G = W;
              break;
            }
            if ($ === G) {
              V = true, G = Y, Z = W;
              break;
            }
            $ = $.sibling;
          }
          if (!V) {
            $ = W.child;
            while ($) {
              if ($ === Z) {
                V = true, Z = W, G = Y;
                break;
              }
              if ($ === G) {
                V = true, G = W, Z = Y;
                break;
              }
              $ = $.sibling;
            }
            if (!V)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (Z.alternate !== G)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (Z.tag !== k)
        throw new Error("Unable to find node on an unmounted component.");
      if (Z.stateNode.current === Z)
        return J;
      return Q;
    }
    function qK(J) {
      var Q = MK(J);
      return Q !== null ? AK(Q) : null;
    }
    function AK(J) {
      if (J.tag === p || J.tag === L0)
        return J;
      var Q = J.child;
      while (Q !== null) {
        var X = AK(Q);
        if (X !== null)
          return X;
        Q = Q.sibling;
      }
      return null;
    }
    function PH(J) {
      var Q = MK(J);
      return Q !== null ? PK(Q) : null;
    }
    function PK(J) {
      if (J.tag === p || J.tag === L0)
        return J;
      var Q = J.child;
      while (Q !== null) {
        if (Q.tag !== i) {
          var X = PK(Q);
          if (X !== null)
            return X;
        }
        Q = Q.sibling;
      }
      return null;
    }
    var { unstable_scheduleCallback: FK, unstable_cancelCallback: FH, unstable_shouldYield: DH, unstable_requestPaint: EH, unstable_now: d1, unstable_getCurrentPriorityLevel: wH, unstable_ImmediatePriority: U9, unstable_UserBlockingPriority: n4, unstable_NormalPriority: DQ, unstable_LowPriority: IH, unstable_IdlePriority: o4, unstable_yieldValue: RH, unstable_setDisableYieldValue: LH } = D, EQ = null, a1 = null, m = null, f8 = false, F8 = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined";
    function NH(J) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined")
        return false;
      var Q = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (Q.isDisabled)
        return true;
      if (!Q.supportsFiber)
        return U("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), true;
      try {
        if (k8)
          J = D0({}, J, { getLaneLabelMap: vH, injectProfilingHooks: gH });
        EQ = Q.inject(J), a1 = Q;
      } catch (X) {
        U("React instrumentation encountered an error: %s.", X);
      }
      if (Q.checkDCE)
        return true;
      else
        return false;
    }
    function SH(J, Q) {
      if (a1 && typeof a1.onScheduleFiberRoot === "function")
        try {
          a1.onScheduleFiberRoot(EQ, J, Q);
        } catch (X) {
          if (!f8)
            f8 = true, U("React instrumentation encountered an error: %s", X);
        }
    }
    function _H(J, Q) {
      if (a1 && typeof a1.onCommitFiberRoot === "function")
        try {
          var X = (J.current.flags & k0) === k0;
          if (o7) {
            var Z;
            switch (Q) {
              case c7:
                Z = U9;
                break;
              case $J:
                Z = n4;
                break;
              case UJ:
                Z = DQ;
                break;
              case D9:
                Z = o4;
                break;
              default:
                Z = DQ;
                break;
            }
            a1.onCommitFiberRoot(EQ, J, Z, X);
          } else
            a1.onCommitFiberRoot(EQ, J, undefined, X);
        } catch (G) {
          if (!f8)
            f8 = true, U("React instrumentation encountered an error: %s", G);
        }
    }
    function jH(J) {
      if (a1 && typeof a1.onPostCommitFiberRoot === "function")
        try {
          a1.onPostCommitFiberRoot(EQ, J);
        } catch (Q) {
          if (!f8)
            f8 = true, U("React instrumentation encountered an error: %s", Q);
        }
    }
    function xH(J) {
      if (a1 && typeof a1.onCommitFiberUnmount === "function")
        try {
          a1.onCommitFiberUnmount(EQ, J);
        } catch (Q) {
          if (!f8)
            f8 = true, U("React instrumentation encountered an error: %s", Q);
        }
    }
    function u1(J) {
      {
        if (typeof RH === "function")
          LH(J), v(J);
        if (a1 && typeof a1.setStrictMode === "function")
          try {
            a1.setStrictMode(EQ, J);
          } catch (Q) {
            if (!f8)
              f8 = true, U("React instrumentation encountered an error: %s", Q);
          }
      }
    }
    function gH(J) {
      m = J;
    }
    function vH() {
      {
        var J = new Map, Q = 1;
        for (var X = 0;X < e4; X++) {
          var Z = tH(Q);
          J.set(Q, Z), Q *= 2;
        }
        return J;
      }
    }
    function CH(J) {
      if (m !== null && typeof m.markCommitStarted === "function")
        m.markCommitStarted(J);
    }
    function DK() {
      if (m !== null && typeof m.markCommitStopped === "function")
        m.markCommitStopped();
    }
    function LX(J) {
      if (m !== null && typeof m.markComponentRenderStarted === "function")
        m.markComponentRenderStarted(J);
    }
    function H5() {
      if (m !== null && typeof m.markComponentRenderStopped === "function")
        m.markComponentRenderStopped();
    }
    function TH(J) {
      if (m !== null && typeof m.markComponentPassiveEffectMountStarted === "function")
        m.markComponentPassiveEffectMountStarted(J);
    }
    function kH() {
      if (m !== null && typeof m.markComponentPassiveEffectMountStopped === "function")
        m.markComponentPassiveEffectMountStopped();
    }
    function hH(J) {
      if (m !== null && typeof m.markComponentPassiveEffectUnmountStarted === "function")
        m.markComponentPassiveEffectUnmountStarted(J);
    }
    function bH() {
      if (m !== null && typeof m.markComponentPassiveEffectUnmountStopped === "function")
        m.markComponentPassiveEffectUnmountStopped();
    }
    function fH(J) {
      if (m !== null && typeof m.markComponentLayoutEffectMountStarted === "function")
        m.markComponentLayoutEffectMountStarted(J);
    }
    function dH() {
      if (m !== null && typeof m.markComponentLayoutEffectMountStopped === "function")
        m.markComponentLayoutEffectMountStopped();
    }
    function EK(J) {
      if (m !== null && typeof m.markComponentLayoutEffectUnmountStarted === "function")
        m.markComponentLayoutEffectUnmountStarted(J);
    }
    function wK() {
      if (m !== null && typeof m.markComponentLayoutEffectUnmountStopped === "function")
        m.markComponentLayoutEffectUnmountStopped();
    }
    function uH(J, Q, X) {
      if (m !== null && typeof m.markComponentErrored === "function")
        m.markComponentErrored(J, Q, X);
    }
    function mH(J, Q, X) {
      if (m !== null && typeof m.markComponentSuspended === "function")
        m.markComponentSuspended(J, Q, X);
    }
    function yH(J) {
      if (m !== null && typeof m.markLayoutEffectsStarted === "function")
        m.markLayoutEffectsStarted(J);
    }
    function cH() {
      if (m !== null && typeof m.markLayoutEffectsStopped === "function")
        m.markLayoutEffectsStopped();
    }
    function sH(J) {
      if (m !== null && typeof m.markPassiveEffectsStarted === "function")
        m.markPassiveEffectsStarted(J);
    }
    function lH() {
      if (m !== null && typeof m.markPassiveEffectsStopped === "function")
        m.markPassiveEffectsStopped();
    }
    function IK(J) {
      if (m !== null && typeof m.markRenderStarted === "function")
        m.markRenderStarted(J);
    }
    function iH() {
      if (m !== null && typeof m.markRenderYielded === "function")
        m.markRenderYielded();
    }
    function RK() {
      if (m !== null && typeof m.markRenderStopped === "function")
        m.markRenderStopped();
    }
    function pH(J) {
      if (m !== null && typeof m.markRenderScheduled === "function")
        m.markRenderScheduled(J);
    }
    function aH(J, Q) {
      if (m !== null && typeof m.markForceUpdateScheduled === "function")
        m.markForceUpdateScheduled(J, Q);
    }
    function t4(J, Q) {
      if (m !== null && typeof m.markStateUpdateScheduled === "function")
        m.markStateUpdateScheduled(J, Q);
    }
    var Z0 = 0, N0 = 1, d0 = 2, D1 = 8, d8 = 16, LK = Math.clz32 ? Math.clz32 : oH, rH = Math.log, nH = Math.LN2;
    function oH(J) {
      var Q = J >>> 0;
      if (Q === 0)
        return 32;
      return 31 - (rH(Q) / nH | 0) | 0;
    }
    var e4 = 31, j = 0, m1 = 0, B0 = 1, O5 = 2, VJ = 4, wQ = 8, u8 = 16, NX = 32, M5 = 4194240, SX = 64, JG = 128, QG = 256, XG = 512, ZG = 1024, GG = 2048, YG = 4096, WG = 8192, zG = 16384, KG = 32768, BG = 65536, VG = 131072, $G = 262144, UG = 524288, HG = 1048576, OG = 2097152, H9 = 130023424, q5 = 4194304, MG = 8388608, qG = 16777216, AG = 33554432, PG = 67108864, NK = q5, _X = 134217728, SK = 268435455, jX = 268435456, IQ = 536870912, m7 = 1073741824;
    function tH(J) {
      {
        if (J & B0)
          return "Sync";
        if (J & O5)
          return "InputContinuousHydration";
        if (J & VJ)
          return "InputContinuous";
        if (J & wQ)
          return "DefaultHydration";
        if (J & u8)
          return "Default";
        if (J & NX)
          return "TransitionHydration";
        if (J & M5)
          return "Transition";
        if (J & H9)
          return "Retry";
        if (J & _X)
          return "SelectiveHydration";
        if (J & jX)
          return "IdleHydration";
        if (J & IQ)
          return "Idle";
        if (J & m7)
          return "Offscreen";
      }
    }
    var X1 = -1, O9 = SX, M9 = q5;
    function xX(J) {
      switch (RQ(J)) {
        case B0:
          return B0;
        case O5:
          return O5;
        case VJ:
          return VJ;
        case wQ:
          return wQ;
        case u8:
          return u8;
        case NX:
          return NX;
        case SX:
        case JG:
        case QG:
        case XG:
        case ZG:
        case GG:
        case YG:
        case WG:
        case zG:
        case KG:
        case BG:
        case VG:
        case $G:
        case UG:
        case HG:
        case OG:
          return J & M5;
        case q5:
        case MG:
        case qG:
        case AG:
        case PG:
          return J & H9;
        case _X:
          return _X;
        case jX:
          return jX;
        case IQ:
          return IQ;
        case m7:
          return m7;
        default:
          return U("Should have found matching lanes. This is a bug in React."), J;
      }
    }
    function q9(J, Q) {
      var X = J.pendingLanes;
      if (X === j)
        return j;
      var Z = j, G = J.suspendedLanes, Y = J.pingedLanes, W = X & SK;
      if (W !== j) {
        var z = W & ~G;
        if (z !== j)
          Z = xX(z);
        else {
          var K = W & Y;
          if (K !== j)
            Z = xX(K);
        }
      } else {
        var V = X & ~G;
        if (V !== j)
          Z = xX(V);
        else if (Y !== j)
          Z = xX(Y);
      }
      if (Z === j)
        return j;
      if (Q !== j && Q !== Z && (Q & G) === j) {
        var $ = RQ(Z), A = RQ(Q);
        if ($ >= A || $ === u8 && (A & M5) !== j)
          return Q;
      }
      if ((Z & VJ) !== j)
        Z |= X & u8;
      var q = J.entangledLanes;
      if (q !== j) {
        var I = J.entanglements, E = Z & q;
        while (E > 0) {
          var R = LQ(E), y = 1 << R;
          Z |= I[R], E &= ~y;
        }
      }
      return Z;
    }
    function eH(J, Q) {
      var X = J.eventTimes, Z = X1;
      while (Q > 0) {
        var G = LQ(Q), Y = 1 << G, W = X[G];
        if (W > Z)
          Z = W;
        Q &= ~Y;
      }
      return Z;
    }
    function JO(J, Q) {
      switch (J) {
        case B0:
        case O5:
        case VJ:
          return Q + 250;
        case wQ:
        case u8:
        case NX:
        case SX:
        case JG:
        case QG:
        case XG:
        case ZG:
        case GG:
        case YG:
        case WG:
        case zG:
        case KG:
        case BG:
        case VG:
        case $G:
        case UG:
        case HG:
        case OG:
          return Q + 5000;
        case q5:
        case MG:
        case qG:
        case AG:
        case PG:
          return X1;
        case _X:
        case jX:
        case IQ:
        case m7:
          return X1;
        default:
          return U("Should have found matching lanes. This is a bug in React."), X1;
      }
    }
    function QO(J, Q) {
      var { pendingLanes: X, suspendedLanes: Z, pingedLanes: G, expirationTimes: Y } = J, W = X;
      while (W > 0) {
        var z = LQ(W), K = 1 << z, V = Y[z];
        if (V === X1) {
          if ((K & Z) === j || (K & G) !== j)
            Y[z] = JO(K, Q);
        } else if (V <= Q)
          J.expiredLanes |= K;
        W &= ~K;
      }
    }
    function XO(J) {
      return xX(J.pendingLanes);
    }
    function FG(J) {
      var Q = J.pendingLanes & ~m7;
      if (Q !== j)
        return Q;
      if (Q & m7)
        return m7;
      return j;
    }
    function ZO(J) {
      return (J & B0) !== j;
    }
    function DG(J) {
      return (J & SK) !== j;
    }
    function _K(J) {
      return (J & H9) === J;
    }
    function GO(J) {
      var Q = B0 | VJ | u8;
      return (J & Q) === j;
    }
    function YO(J) {
      return (J & M5) === J;
    }
    function A9(J, Q) {
      var X = O5 | VJ | wQ | u8;
      return (Q & X) !== j;
    }
    function WO(J, Q) {
      return (Q & J.expiredLanes) !== j;
    }
    function jK(J) {
      return (J & M5) !== j;
    }
    function xK() {
      var J = O9;
      if (O9 <<= 1, (O9 & M5) === j)
        O9 = SX;
      return J;
    }
    function zO() {
      var J = M9;
      if (M9 <<= 1, (M9 & H9) === j)
        M9 = q5;
      return J;
    }
    function RQ(J) {
      return J & -J;
    }
    function gX(J) {
      return RQ(J);
    }
    function LQ(J) {
      return 31 - LK(J);
    }
    function EG(J) {
      return LQ(J);
    }
    function y7(J, Q) {
      return (J & Q) !== j;
    }
    function A5(J, Q) {
      return (J & Q) === Q;
    }
    function F0(J, Q) {
      return J | Q;
    }
    function P9(J, Q) {
      return J & ~Q;
    }
    function gK(J, Q) {
      return J & Q;
    }
    function F9(J) {
      return J;
    }
    function KO(J, Q) {
      return J !== m1 && J < Q ? J : Q;
    }
    function wG(J) {
      var Q = [];
      for (var X = 0;X < e4; X++)
        Q.push(J);
      return Q;
    }
    function vX(J, Q, X) {
      if (J.pendingLanes |= Q, Q !== IQ)
        J.suspendedLanes = j, J.pingedLanes = j;
      var Z = J.eventTimes, G = EG(Q);
      Z[G] = X;
    }
    function BO(J, Q) {
      J.suspendedLanes |= Q, J.pingedLanes &= ~Q;
      var X = J.expirationTimes, Z = Q;
      while (Z > 0) {
        var G = LQ(Z), Y = 1 << G;
        X[G] = X1, Z &= ~Y;
      }
    }
    function vK(J, Q, X) {
      J.pingedLanes |= J.suspendedLanes & Q;
    }
    function VO(J, Q) {
      var X = J.pendingLanes & ~Q;
      J.pendingLanes = Q, J.suspendedLanes = j, J.pingedLanes = j, J.expiredLanes &= Q, J.mutableReadLanes &= Q, J.entangledLanes &= Q;
      var { entanglements: Z, eventTimes: G, expirationTimes: Y } = J, W = X;
      while (W > 0) {
        var z = LQ(W), K = 1 << z;
        Z[z] = j, G[z] = X1, Y[z] = X1, W &= ~K;
      }
    }
    function IG(J, Q) {
      var X = J.entangledLanes |= Q, Z = J.entanglements, G = X;
      while (G) {
        var Y = LQ(G), W = 1 << Y;
        if (W & Q | Z[Y] & Q)
          Z[Y] |= Q;
        G &= ~W;
      }
    }
    function $O(J, Q) {
      var X = RQ(Q), Z;
      switch (X) {
        case VJ:
          Z = O5;
          break;
        case u8:
          Z = wQ;
          break;
        case SX:
        case JG:
        case QG:
        case XG:
        case ZG:
        case GG:
        case YG:
        case WG:
        case zG:
        case KG:
        case BG:
        case VG:
        case $G:
        case UG:
        case HG:
        case OG:
        case q5:
        case MG:
        case qG:
        case AG:
        case PG:
          Z = NX;
          break;
        case IQ:
          Z = jX;
          break;
        default:
          Z = m1;
          break;
      }
      if ((Z & (J.suspendedLanes | Q)) !== m1)
        return m1;
      return Z;
    }
    function CK(J, Q, X) {
      if (!F8)
        return;
      var Z = J.pendingUpdatersLaneMap;
      while (X > 0) {
        var G = EG(X), Y = 1 << G, W = Z[G];
        W.add(Q), X &= ~Y;
      }
    }
    function TK(J, Q) {
      if (!F8)
        return;
      var { pendingUpdatersLaneMap: X, memoizedUpdaters: Z } = J;
      while (Q > 0) {
        var G = EG(Q), Y = 1 << G, W = X[G];
        if (W.size > 0)
          W.forEach(function(z) {
            var K = z.alternate;
            if (K === null || !Z.has(K))
              Z.add(z);
          }), W.clear();
        Q &= ~Y;
      }
    }
    function kK(J, Q) {
      return null;
    }
    var c7 = B0, $J = VJ, UJ = u8, D9 = IQ, CX = m1;
    function D8() {
      return CX;
    }
    function y1(J) {
      CX = J;
    }
    function UO(J, Q) {
      var X = CX;
      try {
        return CX = J, Q();
      } finally {
        CX = X;
      }
    }
    function HO(J, Q) {
      return J !== 0 && J < Q ? J : Q;
    }
    function OO(J, Q) {
      return J === 0 || J > Q ? J : Q;
    }
    function RG(J, Q) {
      return J !== 0 && J < Q;
    }
    function hK(J) {
      var Q = RQ(J);
      if (!RG(c7, Q))
        return c7;
      if (!RG($J, Q))
        return $J;
      if (DG(Q))
        return UJ;
      return D9;
    }
    function E9(J) {
      var Q = J.current.memoizedState;
      return Q.isDehydrated;
    }
    var bK;
    function MO(J) {
      bK = J;
    }
    function qO(J) {
      bK(J);
    }
    var LG;
    function AO(J) {
      LG = J;
    }
    var fK;
    function PO(J) {
      fK = J;
    }
    var dK;
    function FO(J) {
      dK = J;
    }
    var uK;
    function DO(J) {
      uK = J;
    }
    var NG = false, w9 = [], dJ = null, uJ = null, mJ = null, TX = new Map, kX = new Map, yJ = [], EO = ["mousedown", "mouseup", "touchcancel", "touchend", "touchstart", "auxclick", "dblclick", "pointercancel", "pointerdown", "pointerup", "dragend", "dragstart", "drop", "compositionend", "compositionstart", "keydown", "keypress", "keyup", "input", "textInput", "copy", "cut", "paste", "click", "change", "contextmenu", "reset", "submit"];
    function wO(J) {
      return EO.indexOf(J) > -1;
    }
    function IO(J, Q, X, Z, G) {
      return { blockedOn: J, domEventName: Q, eventSystemFlags: X, nativeEvent: G, targetContainers: [Z] };
    }
    function mK(J, Q) {
      switch (J) {
        case "focusin":
        case "focusout":
          dJ = null;
          break;
        case "dragenter":
        case "dragleave":
          uJ = null;
          break;
        case "mouseover":
        case "mouseout":
          mJ = null;
          break;
        case "pointerover":
        case "pointerout": {
          var X = Q.pointerId;
          TX.delete(X);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var Z = Q.pointerId;
          kX.delete(Z);
          break;
        }
      }
    }
    function hX(J, Q, X, Z, G, Y) {
      if (J === null || J.nativeEvent !== Y) {
        var W = IO(Q, X, Z, G, Y);
        if (Q !== null) {
          var z = lJ(Q);
          if (z !== null)
            LG(z);
        }
        return W;
      }
      J.eventSystemFlags |= Z;
      var K = J.targetContainers;
      if (G !== null && K.indexOf(G) === -1)
        K.push(G);
      return J;
    }
    function RO(J, Q, X, Z, G) {
      switch (Q) {
        case "focusin": {
          var Y = G;
          return dJ = hX(dJ, J, Q, X, Z, Y), true;
        }
        case "dragenter": {
          var W = G;
          return uJ = hX(uJ, J, Q, X, Z, W), true;
        }
        case "mouseover": {
          var z = G;
          return mJ = hX(mJ, J, Q, X, Z, z), true;
        }
        case "pointerover": {
          var K = G, V = K.pointerId;
          return TX.set(V, hX(TX.get(V) || null, J, Q, X, Z, K)), true;
        }
        case "gotpointercapture": {
          var $ = G, A = $.pointerId;
          return kX.set(A, hX(kX.get(A) || null, J, Q, X, Z, $)), true;
        }
      }
      return false;
    }
    function yK(J) {
      var Q = _Q(J.target);
      if (Q !== null) {
        var X = FQ(Q);
        if (X !== null) {
          var Z = X.tag;
          if (Z === E0) {
            var G = UK(X);
            if (G !== null) {
              J.blockedOn = G, uK(J.priority, function() {
                fK(X);
              });
              return;
            }
          } else if (Z === k) {
            var Y = X.stateNode;
            if (E9(Y)) {
              J.blockedOn = HK(X);
              return;
            }
          }
        }
      }
      J.blockedOn = null;
    }
    function LO(J) {
      var Q = dK(), X = { blockedOn: null, target: J, priority: Q }, Z = 0;
      for (;Z < yJ.length; Z++)
        if (!RG(Q, yJ[Z].priority))
          break;
      if (yJ.splice(Z, 0, X), Z === 0)
        yK(X);
    }
    function I9(J) {
      if (J.blockedOn !== null)
        return false;
      var Q = J.targetContainers;
      while (Q.length > 0) {
        var X = Q[0], Z = jG(J.domEventName, J.eventSystemFlags, X, J.nativeEvent);
        if (Z === null) {
          var G = J.nativeEvent, Y = new G.constructor(G.type, G);
          oU(Y), G.target.dispatchEvent(Y), tU();
        } else {
          var W = lJ(Z);
          if (W !== null)
            LG(W);
          return J.blockedOn = Z, false;
        }
        Q.shift();
      }
      return true;
    }
    function cK(J, Q, X) {
      if (I9(J))
        X.delete(Q);
    }
    function NO() {
      if (NG = false, dJ !== null && I9(dJ))
        dJ = null;
      if (uJ !== null && I9(uJ))
        uJ = null;
      if (mJ !== null && I9(mJ))
        mJ = null;
      TX.forEach(cK), kX.forEach(cK);
    }
    function bX(J, Q) {
      if (J.blockedOn === Q) {
        if (J.blockedOn = null, !NG)
          NG = true, D.unstable_scheduleCallback(D.unstable_NormalPriority, NO);
      }
    }
    function fX(J) {
      if (w9.length > 0) {
        bX(w9[0], J);
        for (var Q = 1;Q < w9.length; Q++) {
          var X = w9[Q];
          if (X.blockedOn === J)
            X.blockedOn = null;
        }
      }
      if (dJ !== null)
        bX(dJ, J);
      if (uJ !== null)
        bX(uJ, J);
      if (mJ !== null)
        bX(mJ, J);
      var Z = function(z) {
        return bX(z, J);
      };
      TX.forEach(Z), kX.forEach(Z);
      for (var G = 0;G < yJ.length; G++) {
        var Y = yJ[G];
        if (Y.blockedOn === J)
          Y.blockedOn = null;
      }
      while (yJ.length > 0) {
        var W = yJ[0];
        if (W.blockedOn !== null)
          break;
        else if (yK(W), W.blockedOn === null)
          yJ.shift();
      }
    }
    var P5 = S.ReactCurrentBatchConfig, SG = true;
    function sK(J) {
      SG = !!J;
    }
    function SO() {
      return SG;
    }
    function _O(J, Q, X) {
      var Z = lK(Q), G;
      switch (Z) {
        case c7:
          G = jO;
          break;
        case $J:
          G = xO;
          break;
        case UJ:
        default:
          G = _G;
          break;
      }
      return G.bind(null, Q, X, J);
    }
    function jO(J, Q, X, Z) {
      var G = D8(), Y = P5.transition;
      P5.transition = null;
      try {
        y1(c7), _G(J, Q, X, Z);
      } finally {
        y1(G), P5.transition = Y;
      }
    }
    function xO(J, Q, X, Z) {
      var G = D8(), Y = P5.transition;
      P5.transition = null;
      try {
        y1($J), _G(J, Q, X, Z);
      } finally {
        y1(G), P5.transition = Y;
      }
    }
    function _G(J, Q, X, Z) {
      if (!SG)
        return;
      gO(J, Q, X, Z);
    }
    function gO(J, Q, X, Z) {
      var G = jG(J, Q, X, Z);
      if (G === null) {
        cG(J, Q, Z, R9, X), mK(J, Z);
        return;
      }
      if (RO(G, J, Q, X, Z)) {
        Z.stopPropagation();
        return;
      }
      if (mK(J, Z), Q & PX && wO(J)) {
        while (G !== null) {
          var Y = lJ(G);
          if (Y !== null)
            qO(Y);
          var W = jG(J, Q, X, Z);
          if (W === null)
            cG(J, Q, Z, R9, X);
          if (W === G)
            break;
          G = W;
        }
        if (G !== null)
          Z.stopPropagation();
        return;
      }
      cG(J, Q, Z, null, X);
    }
    var R9 = null;
    function jG(J, Q, X, Z) {
      R9 = null;
      var G = h4(Z), Y = _Q(G);
      if (Y !== null) {
        var W = FQ(Y);
        if (W === null)
          Y = null;
        else {
          var z = W.tag;
          if (z === E0) {
            var K = UK(W);
            if (K !== null)
              return K;
            Y = null;
          } else if (z === k) {
            var V = W.stateNode;
            if (E9(V))
              return HK(W);
            Y = null;
          } else if (W !== Y)
            Y = null;
        }
      }
      return R9 = Y, null;
    }
    function lK(J) {
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
          return c7;
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
          return $J;
        case "message": {
          var Q = wH();
          switch (Q) {
            case U9:
              return c7;
            case n4:
              return $J;
            case DQ:
            case IH:
              return UJ;
            case o4:
              return D9;
            default:
              return UJ;
          }
        }
        default:
          return UJ;
      }
    }
    function vO(J, Q, X) {
      return J.addEventListener(Q, X, false), X;
    }
    function CO(J, Q, X) {
      return J.addEventListener(Q, X, true), X;
    }
    function TO(J, Q, X, Z) {
      return J.addEventListener(Q, X, { capture: true, passive: Z }), X;
    }
    function kO(J, Q, X, Z) {
      return J.addEventListener(Q, X, { passive: Z }), X;
    }
    var dX = null, xG = null, uX = null;
    function hO(J) {
      return dX = J, xG = pK(), true;
    }
    function bO() {
      dX = null, xG = null, uX = null;
    }
    function iK() {
      if (uX)
        return uX;
      var J, Q = xG, X = Q.length, Z, G = pK(), Y = G.length;
      for (J = 0;J < X; J++)
        if (Q[J] !== G[J])
          break;
      var W = X - J;
      for (Z = 1;Z <= W; Z++)
        if (Q[X - Z] !== G[Y - Z])
          break;
      var z = Z > 1 ? 1 - Z : undefined;
      return uX = G.slice(J, z), uX;
    }
    function pK() {
      if ("value" in dX)
        return dX.value;
      return dX.textContent;
    }
    function L9(J) {
      var Q, X = J.keyCode;
      if ("charCode" in J) {
        if (Q = J.charCode, Q === 0 && X === 13)
          Q = 13;
      } else
        Q = X;
      if (Q === 10)
        Q = 13;
      if (Q >= 32 || Q === 13)
        return Q;
      return 0;
    }
    function N9() {
      return true;
    }
    function aK() {
      return false;
    }
    function s7(J) {
      function Q(X, Z, G, Y, W) {
        this._reactName = X, this._targetInst = G, this.type = Z, this.nativeEvent = Y, this.target = W, this.currentTarget = null;
        for (var z in J) {
          if (!J.hasOwnProperty(z))
            continue;
          var K = J[z];
          if (K)
            this[z] = K(Y);
          else
            this[z] = Y[z];
        }
        var V = Y.defaultPrevented != null ? Y.defaultPrevented : Y.returnValue === false;
        if (V)
          this.isDefaultPrevented = N9;
        else
          this.isDefaultPrevented = aK;
        return this.isPropagationStopped = aK, this;
      }
      return D0(Q.prototype, { preventDefault: function() {
        this.defaultPrevented = true;
        var X = this.nativeEvent;
        if (!X)
          return;
        if (X.preventDefault)
          X.preventDefault();
        else if (typeof X.returnValue !== "unknown")
          X.returnValue = false;
        this.isDefaultPrevented = N9;
      }, stopPropagation: function() {
        var X = this.nativeEvent;
        if (!X)
          return;
        if (X.stopPropagation)
          X.stopPropagation();
        else if (typeof X.cancelBubble !== "unknown")
          X.cancelBubble = true;
        this.isPropagationStopped = N9;
      }, persist: function() {
      }, isPersistent: N9 }), Q;
    }
    var F5 = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(J) {
      return J.timeStamp || Date.now();
    }, defaultPrevented: 0, isTrusted: 0 }, gG = s7(F5), mX = D0({}, F5, { view: 0, detail: 0 }), fO = s7(mX), vG, CG, yX;
    function dO(J) {
      if (J !== yX) {
        if (yX && J.type === "mousemove")
          vG = J.screenX - yX.screenX, CG = J.screenY - yX.screenY;
        else
          vG = 0, CG = 0;
        yX = J;
      }
    }
    var S9 = D0({}, mX, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: kG, button: 0, buttons: 0, relatedTarget: function(J) {
      if (J.relatedTarget === undefined)
        return J.fromElement === J.srcElement ? J.toElement : J.fromElement;
      return J.relatedTarget;
    }, movementX: function(J) {
      if ("movementX" in J)
        return J.movementX;
      return dO(J), vG;
    }, movementY: function(J) {
      if ("movementY" in J)
        return J.movementY;
      return CG;
    } }), rK = s7(S9), uO = D0({}, S9, { dataTransfer: 0 }), mO = s7(uO), yO = D0({}, mX, { relatedTarget: 0 }), TG = s7(yO), cO = D0({}, F5, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), sO = s7(cO), lO = D0({}, F5, { clipboardData: function(J) {
      return "clipboardData" in J ? J.clipboardData : window.clipboardData;
    } }), iO = s7(lO), pO = D0({}, F5, { data: 0 }), nK = s7(pO), aO = nK, rO = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, nO = { "8": "Backspace", "9": "Tab", "12": "Clear", "13": "Enter", "16": "Shift", "17": "Control", "18": "Alt", "19": "Pause", "20": "CapsLock", "27": "Escape", "32": " ", "33": "PageUp", "34": "PageDown", "35": "End", "36": "Home", "37": "ArrowLeft", "38": "ArrowUp", "39": "ArrowRight", "40": "ArrowDown", "45": "Insert", "46": "Delete", "112": "F1", "113": "F2", "114": "F3", "115": "F4", "116": "F5", "117": "F6", "118": "F7", "119": "F8", "120": "F9", "121": "F10", "122": "F11", "123": "F12", "144": "NumLock", "145": "ScrollLock", "224": "Meta" };
    function oO(J) {
      if (J.key) {
        var Q = rO[J.key] || J.key;
        if (Q !== "Unidentified")
          return Q;
      }
      if (J.type === "keypress") {
        var X = L9(J);
        return X === 13 ? "Enter" : String.fromCharCode(X);
      }
      if (J.type === "keydown" || J.type === "keyup")
        return nO[J.keyCode] || "Unidentified";
      return "";
    }
    var tO = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
    function eO(J) {
      var Q = this, X = Q.nativeEvent;
      if (X.getModifierState)
        return X.getModifierState(J);
      var Z = tO[J];
      return Z ? !!X[Z] : false;
    }
    function kG(J) {
      return eO;
    }
    var JM = D0({}, mX, { key: oO, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: kG, charCode: function(J) {
      if (J.type === "keypress")
        return L9(J);
      return 0;
    }, keyCode: function(J) {
      if (J.type === "keydown" || J.type === "keyup")
        return J.keyCode;
      return 0;
    }, which: function(J) {
      if (J.type === "keypress")
        return L9(J);
      if (J.type === "keydown" || J.type === "keyup")
        return J.keyCode;
      return 0;
    } }), QM = s7(JM), XM = D0({}, S9, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), oK = s7(XM), ZM = D0({}, mX, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: kG }), GM = s7(ZM), YM = D0({}, F5, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), WM = s7(YM), zM = D0({}, S9, { deltaX: function(J) {
      return "deltaX" in J ? J.deltaX : ("wheelDeltaX" in J) ? -J.wheelDeltaX : 0;
    }, deltaY: function(J) {
      return "deltaY" in J ? J.deltaY : ("wheelDeltaY" in J) ? -J.wheelDeltaY : ("wheelDelta" in J) ? -J.wheelDelta : 0;
    }, deltaZ: 0, deltaMode: 0 }), KM = s7(zM), BM = [9, 13, 27, 32], tK = 229, hG = s1 && "CompositionEvent" in window, cX = null;
    if (s1 && "documentMode" in document)
      cX = document.documentMode;
    var VM = s1 && "TextEvent" in window && !cX, eK = s1 && (!hG || cX && cX > 8 && cX <= 11), J3 = 32, Q3 = String.fromCharCode(J3);
    function $M() {
      z7("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), z7("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), z7("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), z7("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var X3 = false;
    function UM(J) {
      return (J.ctrlKey || J.altKey || J.metaKey) && !(J.ctrlKey && J.altKey);
    }
    function HM(J) {
      switch (J) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function OM(J, Q) {
      return J === "keydown" && Q.keyCode === tK;
    }
    function Z3(J, Q) {
      switch (J) {
        case "keyup":
          return BM.indexOf(Q.keyCode) !== -1;
        case "keydown":
          return Q.keyCode !== tK;
        case "keypress":
        case "mousedown":
        case "focusout":
          return true;
        default:
          return false;
      }
    }
    function G3(J) {
      var Q = J.detail;
      if (typeof Q === "object" && "data" in Q)
        return Q.data;
      return null;
    }
    function Y3(J) {
      return J.locale === "ko";
    }
    var D5 = false;
    function MM(J, Q, X, Z, G) {
      var Y, W;
      if (hG)
        Y = HM(Q);
      else if (!D5) {
        if (OM(Q, Z))
          Y = "onCompositionStart";
      } else if (Z3(Q, Z))
        Y = "onCompositionEnd";
      if (!Y)
        return null;
      if (eK && !Y3(Z)) {
        if (!D5 && Y === "onCompositionStart")
          D5 = hO(G);
        else if (Y === "onCompositionEnd") {
          if (D5)
            W = iK();
        }
      }
      var z = v9(X, Y);
      if (z.length > 0) {
        var K = new nK(Y, Q, null, Z, G);
        if (J.push({ event: K, listeners: z }), W)
          K.data = W;
        else {
          var V = G3(Z);
          if (V !== null)
            K.data = V;
        }
      }
    }
    function qM(J, Q) {
      switch (J) {
        case "compositionend":
          return G3(Q);
        case "keypress":
          var X = Q.which;
          if (X !== J3)
            return null;
          return X3 = true, Q3;
        case "textInput":
          var Z = Q.data;
          if (Z === Q3 && X3)
            return null;
          return Z;
        default:
          return null;
      }
    }
    function AM(J, Q) {
      if (D5) {
        if (J === "compositionend" || !hG && Z3(J, Q)) {
          var X = iK();
          return bO(), D5 = false, X;
        }
        return null;
      }
      switch (J) {
        case "paste":
          return null;
        case "keypress":
          if (!UM(Q)) {
            if (Q.char && Q.char.length > 1)
              return Q.char;
            else if (Q.which)
              return String.fromCharCode(Q.which);
          }
          return null;
        case "compositionend":
          return eK && !Y3(Q) ? null : Q.data;
        default:
          return null;
      }
    }
    function PM(J, Q, X, Z, G) {
      var Y;
      if (VM)
        Y = qM(Q, Z);
      else
        Y = AM(Q, Z);
      if (!Y)
        return null;
      var W = v9(X, "onBeforeInput");
      if (W.length > 0) {
        var z = new aO("onBeforeInput", "beforeinput", null, Z, G);
        J.push({ event: z, listeners: W }), z.data = Y;
      }
    }
    function FM(J, Q, X, Z, G, Y, W) {
      MM(J, Q, X, Z, G), PM(J, Q, X, Z, G);
    }
    var DM = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
    function W3(J) {
      var Q = J && J.nodeName && J.nodeName.toLowerCase();
      if (Q === "input")
        return !!DM[J.type];
      if (Q === "textarea")
        return true;
      return false;
    }
    function EM(J) {
      if (!s1)
        return false;
      var Q = "on" + J, X = Q in document;
      if (!X) {
        var Z = document.createElement("div");
        Z.setAttribute(Q, "return;"), X = typeof Z[Q] === "function";
      }
      return X;
    }
    function wM() {
      z7("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function z3(J, Q, X, Z) {
      GK(Z);
      var G = v9(Q, "onChange");
      if (G.length > 0) {
        var Y = new gG("onChange", "change", null, X, Z);
        J.push({ event: Y, listeners: G });
      }
    }
    var sX = null, lX = null;
    function IM(J) {
      var Q = J.nodeName && J.nodeName.toLowerCase();
      return Q === "select" || Q === "input" && J.type === "file";
    }
    function RM(J) {
      var Q = [];
      z3(Q, lX, J, h4(J)), KK(LM, Q);
    }
    function LM(J) {
      L3(J, 0);
    }
    function _9(J) {
      var Q = N5(J);
      if (X5(Q))
        return J;
    }
    function NM(J, Q) {
      if (J === "change")
        return Q;
    }
    var K3 = false;
    if (s1)
      K3 = EM("input") && (!document.documentMode || document.documentMode > 9);
    function SM(J, Q) {
      sX = J, lX = Q, sX.attachEvent("onpropertychange", V3);
    }
    function B3() {
      if (!sX)
        return;
      sX.detachEvent("onpropertychange", V3), sX = null, lX = null;
    }
    function V3(J) {
      if (J.propertyName !== "value")
        return;
      if (_9(lX))
        RM(J);
    }
    function _M(J, Q, X) {
      if (J === "focusin")
        B3(), SM(Q, X);
      else if (J === "focusout")
        B3();
    }
    function jM(J, Q) {
      if (J === "selectionchange" || J === "keyup" || J === "keydown")
        return _9(lX);
    }
    function xM(J) {
      var Q = J.nodeName;
      return Q && Q.toLowerCase() === "input" && (J.type === "checkbox" || J.type === "radio");
    }
    function gM(J, Q) {
      if (J === "click")
        return _9(Q);
    }
    function vM(J, Q) {
      if (J === "input" || J === "change")
        return _9(Q);
    }
    function CM(J) {
      var Q = J._wrapperState;
      if (!Q || !Q.controlled || J.type !== "number")
        return;
      f0(J, "number", J.value);
    }
    function TM(J, Q, X, Z, G, Y, W) {
      var z = X ? N5(X) : window, K, V;
      if (IM(z))
        K = NM;
      else if (W3(z))
        if (K3)
          K = vM;
        else
          K = jM, V = _M;
      else if (xM(z))
        K = gM;
      if (K) {
        var $ = K(Q, X);
        if ($) {
          z3(J, $, Z, G);
          return;
        }
      }
      if (V)
        V(Q, z, X);
      if (Q === "focusout")
        CM(z);
    }
    function kM() {
      d7("onMouseEnter", ["mouseout", "mouseover"]), d7("onMouseLeave", ["mouseout", "mouseover"]), d7("onPointerEnter", ["pointerout", "pointerover"]), d7("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function hM(J, Q, X, Z, G, Y, W) {
      var z = Q === "mouseover" || Q === "pointerover", K = Q === "mouseout" || Q === "pointerout";
      if (z && !eU(Z)) {
        var V = Z.relatedTarget || Z.fromElement;
        if (V) {
          if (_Q(V) || WZ(V))
            return;
        }
      }
      if (!K && !z)
        return;
      var $;
      if (G.window === G)
        $ = G;
      else {
        var A = G.ownerDocument;
        if (A)
          $ = A.defaultView || A.parentWindow;
        else
          $ = window;
      }
      var q, I;
      if (K) {
        var E = Z.relatedTarget || Z.toElement;
        if (q = X, I = E ? _Q(E) : null, I !== null) {
          var R = FQ(I);
          if (I !== R || I.tag !== p && I.tag !== L0)
            I = null;
        }
      } else
        q = null, I = X;
      if (q === I)
        return;
      var y = rK, e = "onMouseLeave", o = "onMouseEnter", w0 = "mouse";
      if (Q === "pointerout" || Q === "pointerover")
        y = oK, e = "onPointerLeave", o = "onPointerEnter", w0 = "pointer";
      var I0 = q == null ? $ : N5(q), P = I == null ? $ : N5(I), N = new y(e, w0 + "leave", q, Z, G);
      N.target = I0, N.relatedTarget = P;
      var F = null, g = _Q(G);
      if (g === X) {
        var l = new y(o, w0 + "enter", I, Z, G);
        l.target = P, l.relatedTarget = I0, F = l;
      }
      Wq(J, N, F, q, I);
    }
    function bM(J, Q) {
      return J === Q && (J !== 0 || 1 / J === 1 / Q) || J !== J && Q !== Q;
    }
    var l7 = typeof Object.is === "function" ? Object.is : bM;
    function iX(J, Q) {
      if (l7(J, Q))
        return true;
      if (typeof J !== "object" || J === null || typeof Q !== "object" || Q === null)
        return false;
      var X = Object.keys(J), Z = Object.keys(Q);
      if (X.length !== Z.length)
        return false;
      for (var G = 0;G < X.length; G++) {
        var Y = X[G];
        if (!l1.call(Q, Y) || !l7(J[Y], Q[Y]))
          return false;
      }
      return true;
    }
    function $3(J) {
      while (J && J.firstChild)
        J = J.firstChild;
      return J;
    }
    function fM(J) {
      while (J) {
        if (J.nextSibling)
          return J.nextSibling;
        J = J.parentNode;
      }
    }
    function U3(J, Q) {
      var X = $3(J), Z = 0, G = 0;
      while (X) {
        if (X.nodeType === GJ) {
          if (G = Z + X.textContent.length, Z <= Q && G >= Q)
            return { node: X, offset: Q - Z };
          Z = G;
        }
        X = $3(fM(X));
      }
    }
    function dM(J) {
      var Q = J.ownerDocument, X = Q && Q.defaultView || window, Z = X.getSelection && X.getSelection();
      if (!Z || Z.rangeCount === 0)
        return null;
      var { anchorNode: G, anchorOffset: Y, focusNode: W, focusOffset: z } = Z;
      try {
        G.nodeType, W.nodeType;
      } catch (K) {
        return null;
      }
      return uM(J, G, Y, W, z);
    }
    function uM(J, Q, X, Z, G) {
      var Y = 0, W = -1, z = -1, K = 0, V = 0, $ = J, A = null;
      J:
        while (true) {
          var q = null;
          while (true) {
            if ($ === Q && (X === 0 || $.nodeType === GJ))
              W = Y + X;
            if ($ === Z && (G === 0 || $.nodeType === GJ))
              z = Y + G;
            if ($.nodeType === GJ)
              Y += $.nodeValue.length;
            if ((q = $.firstChild) === null)
              break;
            A = $, $ = q;
          }
          while (true) {
            if ($ === J)
              break J;
            if (A === Q && ++K === X)
              W = Y;
            if (A === Z && ++V === G)
              z = Y;
            if ((q = $.nextSibling) !== null)
              break;
            $ = A, A = $.parentNode;
          }
          $ = q;
        }
      if (W === -1 || z === -1)
        return null;
      return { start: W, end: z };
    }
    function mM(J, Q) {
      var X = J.ownerDocument || document, Z = X && X.defaultView || window;
      if (!Z.getSelection)
        return;
      var G = Z.getSelection(), Y = J.textContent.length, W = Math.min(Q.start, Y), z = Q.end === undefined ? W : Math.min(Q.end, Y);
      if (!G.extend && W > z) {
        var K = z;
        z = W, W = K;
      }
      var V = U3(J, W), $ = U3(J, z);
      if (V && $) {
        if (G.rangeCount === 1 && G.anchorNode === V.node && G.anchorOffset === V.offset && G.focusNode === $.node && G.focusOffset === $.offset)
          return;
        var A = X.createRange();
        if (A.setStart(V.node, V.offset), G.removeAllRanges(), W > z)
          G.addRange(A), G.extend($.node, $.offset);
        else
          A.setEnd($.node, $.offset), G.addRange(A);
      }
    }
    function H3(J) {
      return J && J.nodeType === GJ;
    }
    function O3(J, Q) {
      if (!J || !Q)
        return false;
      else if (J === Q)
        return true;
      else if (H3(J))
        return false;
      else if (H3(Q))
        return O3(J, Q.parentNode);
      else if ("contains" in J)
        return J.contains(Q);
      else if (J.compareDocumentPosition)
        return !!(J.compareDocumentPosition(Q) & 16);
      else
        return false;
    }
    function yM(J) {
      return J && J.ownerDocument && O3(J.ownerDocument.documentElement, J);
    }
    function cM(J) {
      try {
        return typeof J.contentWindow.location.href === "string";
      } catch (Q) {
        return false;
      }
    }
    function M3() {
      var J = window, Q = Z5();
      while (Q instanceof J.HTMLIFrameElement) {
        if (cM(Q))
          J = Q.contentWindow;
        else
          return Q;
        Q = Z5(J.document);
      }
      return Q;
    }
    function bG(J) {
      var Q = J && J.nodeName && J.nodeName.toLowerCase();
      return Q && (Q === "input" && (J.type === "text" || J.type === "search" || J.type === "tel" || J.type === "url" || J.type === "password") || Q === "textarea" || J.contentEditable === "true");
    }
    function sM() {
      var J = M3();
      return { focusedElem: J, selectionRange: bG(J) ? iM(J) : null };
    }
    function lM(J) {
      var Q = M3(), X = J.focusedElem, Z = J.selectionRange;
      if (Q !== X && yM(X)) {
        if (Z !== null && bG(X))
          pM(X, Z);
        var G = [], Y = X;
        while (Y = Y.parentNode)
          if (Y.nodeType === g7)
            G.push({ element: Y, left: Y.scrollLeft, top: Y.scrollTop });
        if (typeof X.focus === "function")
          X.focus();
        for (var W = 0;W < G.length; W++) {
          var z = G[W];
          z.element.scrollLeft = z.left, z.element.scrollTop = z.top;
        }
      }
    }
    function iM(J) {
      var Q;
      if ("selectionStart" in J)
        Q = { start: J.selectionStart, end: J.selectionEnd };
      else
        Q = dM(J);
      return Q || { start: 0, end: 0 };
    }
    function pM(J, Q) {
      var { start: X, end: Z } = Q;
      if (Z === undefined)
        Z = X;
      if ("selectionStart" in J)
        J.selectionStart = X, J.selectionEnd = Math.min(Z, J.value.length);
      else
        mM(J, Q);
    }
    var aM = s1 && "documentMode" in document && document.documentMode <= 11;
    function rM() {
      z7("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var E5 = null, fG = null, pX = null, dG = false;
    function nM(J) {
      if ("selectionStart" in J && bG(J))
        return { start: J.selectionStart, end: J.selectionEnd };
      else {
        var Q = J.ownerDocument && J.ownerDocument.defaultView || window, X = Q.getSelection();
        return { anchorNode: X.anchorNode, anchorOffset: X.anchorOffset, focusNode: X.focusNode, focusOffset: X.focusOffset };
      }
    }
    function oM(J) {
      return J.window === J ? J.document : J.nodeType === YJ ? J : J.ownerDocument;
    }
    function q3(J, Q, X) {
      var Z = oM(X);
      if (dG || E5 == null || E5 !== Z5(Z))
        return;
      var G = nM(E5);
      if (!pX || !iX(pX, G)) {
        pX = G;
        var Y = v9(fG, "onSelect");
        if (Y.length > 0) {
          var W = new gG("onSelect", "select", null, Q, X);
          J.push({ event: W, listeners: Y }), W.target = E5;
        }
      }
    }
    function tM(J, Q, X, Z, G, Y, W) {
      var z = X ? N5(X) : window;
      switch (Q) {
        case "focusin":
          if (W3(z) || z.contentEditable === "true")
            E5 = z, fG = X, pX = null;
          break;
        case "focusout":
          E5 = null, fG = null, pX = null;
          break;
        case "mousedown":
          dG = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          dG = false, q3(J, Z, G);
          break;
        case "selectionchange":
          if (aM)
            break;
        case "keydown":
        case "keyup":
          q3(J, Z, G);
      }
    }
    function j9(J, Q) {
      var X = {};
      return X[J.toLowerCase()] = Q.toLowerCase(), X["Webkit" + J] = "webkit" + Q, X["Moz" + J] = "moz" + Q, X;
    }
    var w5 = { animationend: j9("Animation", "AnimationEnd"), animationiteration: j9("Animation", "AnimationIteration"), animationstart: j9("Animation", "AnimationStart"), transitionend: j9("Transition", "TransitionEnd") }, uG = {}, A3 = {};
    if (s1) {
      if (A3 = document.createElement("div").style, !("AnimationEvent" in window))
        delete w5.animationend.animation, delete w5.animationiteration.animation, delete w5.animationstart.animation;
      if (!("TransitionEvent" in window))
        delete w5.transitionend.transition;
    }
    function x9(J) {
      if (uG[J])
        return uG[J];
      else if (!w5[J])
        return J;
      var Q = w5[J];
      for (var X in Q)
        if (Q.hasOwnProperty(X) && X in A3)
          return uG[J] = Q[X];
      return J;
    }
    var P3 = x9("animationend"), F3 = x9("animationiteration"), D3 = x9("animationstart"), E3 = x9("transitionend"), w3 = new Map, I3 = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function cJ(J, Q) {
      w3.set(J, Q), z7(Q, [J]);
    }
    function eM() {
      for (var J = 0;J < I3.length; J++) {
        var Q = I3[J], X = Q.toLowerCase(), Z = Q[0].toUpperCase() + Q.slice(1);
        cJ(X, "on" + Z);
      }
      cJ(P3, "onAnimationEnd"), cJ(F3, "onAnimationIteration"), cJ(D3, "onAnimationStart"), cJ("dblclick", "onDoubleClick"), cJ("focusin", "onFocus"), cJ("focusout", "onBlur"), cJ(E3, "onTransitionEnd");
    }
    function Jq(J, Q, X, Z, G, Y, W) {
      var z = w3.get(Q);
      if (z === undefined)
        return;
      var K = gG, V = Q;
      switch (Q) {
        case "keypress":
          if (L9(Z) === 0)
            return;
        case "keydown":
        case "keyup":
          K = QM;
          break;
        case "focusin":
          V = "focus", K = TG;
          break;
        case "focusout":
          V = "blur", K = TG;
          break;
        case "beforeblur":
        case "afterblur":
          K = TG;
          break;
        case "click":
          if (Z.button === 2)
            return;
        case "auxclick":
        case "dblclick":
        case "mousedown":
        case "mousemove":
        case "mouseup":
        case "mouseout":
        case "mouseover":
        case "contextmenu":
          K = rK;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          K = mO;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          K = GM;
          break;
        case P3:
        case F3:
        case D3:
          K = sO;
          break;
        case E3:
          K = WM;
          break;
        case "scroll":
          K = fO;
          break;
        case "wheel":
          K = KM;
          break;
        case "copy":
        case "cut":
        case "paste":
          K = iO;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          K = oK;
          break;
      }
      var $ = (Y & PX) !== 0;
      {
        var A = !$ && Q === "scroll", q = Gq(X, z, Z.type, $, A);
        if (q.length > 0) {
          var I = new K(z, V, null, Z, G);
          J.push({ event: I, listeners: q });
        }
      }
    }
    eM(), kM(), wM(), rM(), $M();
    function Qq(J, Q, X, Z, G, Y, W) {
      Jq(J, Q, X, Z, G, Y);
      var z = (Y & nU) === 0;
      if (z)
        hM(J, Q, X, Z, G), TM(J, Q, X, Z, G), tM(J, Q, X, Z, G), FM(J, Q, X, Z, G);
    }
    var aX = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], mG = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(aX));
    function R3(J, Q, X) {
      var Z = J.type || "unknown-event";
      J.currentTarget = X, KH(Z, Q, undefined, J), J.currentTarget = null;
    }
    function Xq(J, Q, X) {
      var Z;
      if (X)
        for (var G = Q.length - 1;G >= 0; G--) {
          var Y = Q[G], W = Y.instance, z = Y.currentTarget, K = Y.listener;
          if (W !== Z && J.isPropagationStopped())
            return;
          R3(J, K, z), Z = W;
        }
      else
        for (var V = 0;V < Q.length; V++) {
          var $ = Q[V], A = $.instance, q = $.currentTarget, I = $.listener;
          if (A !== Z && J.isPropagationStopped())
            return;
          R3(J, I, q), Z = A;
        }
    }
    function L3(J, Q) {
      var X = (Q & PX) !== 0;
      for (var Z = 0;Z < J.length; Z++) {
        var G = J[Z], Y = G.event, W = G.listeners;
        Xq(Y, W, X);
      }
      BH();
    }
    function Zq(J, Q, X, Z, G) {
      var Y = h4(X), W = [];
      Qq(W, J, Z, X, Y, Q), L3(W, Q);
    }
    function Y1(J, Q) {
      if (!mG.has(J))
        U('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', J);
      var X = false, Z = CA(Q), G = zq(J, X);
      if (!Z.has(G))
        N3(Q, J, k4, X), Z.add(G);
    }
    function yG(J, Q, X) {
      if (mG.has(J) && !Q)
        U('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', J);
      var Z = 0;
      if (Q)
        Z |= PX;
      N3(X, J, Z, Q);
    }
    var g9 = "_reactListening" + Math.random().toString(36).slice(2);
    function rX(J) {
      if (!J[g9]) {
        J[g9] = true, f7.forEach(function(X) {
          if (X !== "selectionchange") {
            if (!mG.has(X))
              yG(X, false, J);
            yG(X, true, J);
          }
        });
        var Q = J.nodeType === YJ ? J : J.ownerDocument;
        if (Q !== null) {
          if (!Q[g9])
            Q[g9] = true, yG("selectionchange", false, Q);
        }
      }
    }
    function N3(J, Q, X, Z, G) {
      var Y = _O(J, Q, X), W = undefined;
      if (d4) {
        if (Q === "touchstart" || Q === "touchmove" || Q === "wheel")
          W = true;
      }
      J = J;
      var z;
      if (Z)
        if (W !== undefined)
          z = TO(J, Q, Y, W);
        else
          z = CO(J, Q, Y);
      else if (W !== undefined)
        z = kO(J, Q, Y, W);
      else
        z = vO(J, Q, Y);
    }
    function S3(J, Q) {
      return J === Q || J.nodeType === P1 && J.parentNode === Q;
    }
    function cG(J, Q, X, Z, G) {
      var Y = Z;
      if ((Q & XK) === 0 && (Q & k4) === 0) {
        var W = G;
        if (Z !== null) {
          var z = Z;
          J:
            while (true) {
              if (z === null)
                return;
              var K = z.tag;
              if (K === k || K === i) {
                var V = z.stateNode.containerInfo;
                if (S3(V, W))
                  break;
                if (K === i) {
                  var $ = z.return;
                  while ($ !== null) {
                    var A = $.tag;
                    if (A === k || A === i) {
                      var q = $.stateNode.containerInfo;
                      if (S3(q, W))
                        return;
                    }
                    $ = $.return;
                  }
                }
                while (V !== null) {
                  var I = _Q(V);
                  if (I === null)
                    return;
                  var E = I.tag;
                  if (E === p || E === L0) {
                    z = Y = I;
                    continue J;
                  }
                  V = V.parentNode;
                }
              }
              z = z.return;
            }
        }
      }
      KK(function() {
        return Zq(J, Q, X, Y);
      });
    }
    function nX(J, Q, X) {
      return { instance: J, listener: Q, currentTarget: X };
    }
    function Gq(J, Q, X, Z, G, Y) {
      var W = Q !== null ? Q + "Capture" : null, z = Z ? W : Q, K = [], V = J, $ = null;
      while (V !== null) {
        var A = V, q = A.stateNode, I = A.tag;
        if (I === p && q !== null) {
          if ($ = q, z !== null) {
            var E = DX(V, z);
            if (E != null)
              K.push(nX(V, E, $));
          }
        }
        if (G)
          break;
        V = V.return;
      }
      return K;
    }
    function v9(J, Q) {
      var X = Q + "Capture", Z = [], G = J;
      while (G !== null) {
        var Y = G, W = Y.stateNode, z = Y.tag;
        if (z === p && W !== null) {
          var K = W, V = DX(G, X);
          if (V != null)
            Z.unshift(nX(G, V, K));
          var $ = DX(G, Q);
          if ($ != null)
            Z.push(nX(G, $, K));
        }
        G = G.return;
      }
      return Z;
    }
    function I5(J) {
      if (J === null)
        return null;
      do
        J = J.return;
      while (J && J.tag !== p);
      if (J)
        return J;
      return null;
    }
    function Yq(J, Q) {
      var X = J, Z = Q, G = 0;
      for (var Y = X;Y; Y = I5(Y))
        G++;
      var W = 0;
      for (var z = Z;z; z = I5(z))
        W++;
      while (G - W > 0)
        X = I5(X), G--;
      while (W - G > 0)
        Z = I5(Z), W--;
      var K = G;
      while (K--) {
        if (X === Z || Z !== null && X === Z.alternate)
          return X;
        X = I5(X), Z = I5(Z);
      }
      return null;
    }
    function _3(J, Q, X, Z, G) {
      var Y = Q._reactName, W = [], z = X;
      while (z !== null) {
        if (z === Z)
          break;
        var K = z, V = K.alternate, $ = K.stateNode, A = K.tag;
        if (V !== null && V === Z)
          break;
        if (A === p && $ !== null) {
          var q = $;
          if (G) {
            var I = DX(z, Y);
            if (I != null)
              W.unshift(nX(z, I, q));
          } else if (!G) {
            var E = DX(z, Y);
            if (E != null)
              W.push(nX(z, E, q));
          }
        }
        z = z.return;
      }
      if (W.length !== 0)
        J.push({ event: Q, listeners: W });
    }
    function Wq(J, Q, X, Z, G) {
      var Y = Z && G ? Yq(Z, G) : null;
      if (Z !== null)
        _3(J, Q, Z, Y, false);
      if (G !== null && X !== null)
        _3(J, X, G, Y, true);
    }
    function zq(J, Q) {
      return J + "__" + (Q ? "capture" : "bubble");
    }
    var v7 = false, oX = "dangerouslySetInnerHTML", C9 = "suppressContentEditableWarning", sJ = "suppressHydrationWarning", j3 = "autoFocus", NQ = "children", SQ = "style", T9 = "__html", sG, k9, tX, x3, h9, g3, v3;
    sG = { dialog: true, webview: true }, k9 = function(J, Q) {
      cU(J, Q), sU(J, Q), rU(J, Q, { registrationNameDependencies: A7, possibleRegistrationNames: t7 });
    }, g3 = s1 && !document.documentMode, tX = function(J, Q, X) {
      if (v7)
        return;
      var Z = b9(X), G = b9(Q);
      if (G === Z)
        return;
      v7 = true, U("Prop `%s` did not match. Server: %s Client: %s", J, JSON.stringify(G), JSON.stringify(Z));
    }, x3 = function(J) {
      if (v7)
        return;
      v7 = true;
      var Q = [];
      J.forEach(function(X) {
        Q.push(X);
      }), U("Extra attributes from the server: %s", Q);
    }, h9 = function(J, Q) {
      if (Q === false)
        U("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", J, J, J);
      else
        U("Expected `%s` listener to be a function, instead got a value of `%s` type.", J, typeof Q);
    }, v3 = function(J, Q) {
      var X = J.namespaceURI === ZJ ? J.ownerDocument.createElement(J.tagName) : J.ownerDocument.createElementNS(J.namespaceURI, J.tagName);
      return X.innerHTML = Q, X.innerHTML;
    };
    var Kq = /\r\n?/g, Bq = /\u0000|\uFFFD/g;
    function b9(J) {
      e7(J);
      var Q = typeof J === "string" ? J : "" + J;
      return Q.replace(Kq, "\n").replace(Bq, "");
    }
    function f9(J, Q, X, Z) {
      var G = b9(Q), Y = b9(J);
      if (Y === G)
        return;
      if (Z) {
        if (!v7)
          v7 = true, U('Text content did not match. Server: "%s" Client: "%s"', Y, G);
      }
      if (X && T8)
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function C3(J) {
      return J.nodeType === YJ ? J : J.ownerDocument;
    }
    function Vq() {
    }
    function d9(J) {
      J.onclick = Vq;
    }
    function $q(J, Q, X, Z, G) {
      for (var Y in Z) {
        if (!Z.hasOwnProperty(Y))
          continue;
        var W = Z[Y];
        if (Y === SQ) {
          if (W)
            Object.freeze(W);
          nz(Q, W);
        } else if (Y === oX) {
          var z = W ? W[T9] : undefined;
          if (z != null)
            lz(Q, z);
        } else if (Y === NQ) {
          if (typeof W === "string") {
            var K = J !== "textarea" || W !== "";
            if (K)
              W9(Q, W);
          } else if (typeof W === "number")
            W9(Q, "" + W);
        } else if (Y === C9 || Y === sJ)
          ;
        else if (Y === j3)
          ;
        else if (A7.hasOwnProperty(Y)) {
          if (W != null) {
            if (typeof W !== "function")
              h9(Y, W);
            if (Y === "onScroll")
              Y1("scroll", Q);
          }
        } else if (W != null)
          $Q(Q, Y, W, G);
      }
    }
    function Uq(J, Q, X, Z) {
      for (var G = 0;G < Q.length; G += 2) {
        var Y = Q[G], W = Q[G + 1];
        if (Y === SQ)
          nz(J, W);
        else if (Y === oX)
          lz(J, W);
        else if (Y === NQ)
          W9(J, W);
        else
          $Q(J, Y, W, Z);
      }
    }
    function Hq(J, Q, X, Z) {
      var G, Y = C3(X), W, z = Z;
      if (z === ZJ)
        z = j4(J);
      if (z === ZJ) {
        if (G = OQ(J, Q), !G && J !== J.toLowerCase())
          U("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", J);
        if (J === "script") {
          var K = Y.createElement("div");
          K.innerHTML = "<script></script>";
          var V = K.firstChild;
          W = K.removeChild(V);
        } else if (typeof Q.is === "string")
          W = Y.createElement(J, { is: Q.is });
        else if (W = Y.createElement(J), J === "select") {
          var $ = W;
          if (Q.multiple)
            $.multiple = true;
          else if (Q.size)
            $.size = Q.size;
        }
      } else
        W = Y.createElementNS(z, J);
      if (z === ZJ) {
        if (!G && Object.prototype.toString.call(W) === "[object HTMLUnknownElement]" && !l1.call(sG, J))
          sG[J] = true, U("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", J);
      }
      return W;
    }
    function Oq(J, Q) {
      return C3(Q).createTextNode(J);
    }
    function Mq(J, Q, X, Z) {
      var G = OQ(Q, X);
      k9(Q, X);
      var Y;
      switch (Q) {
        case "dialog":
          Y1("cancel", J), Y1("close", J), Y = X;
          break;
        case "iframe":
        case "object":
        case "embed":
          Y1("load", J), Y = X;
          break;
        case "video":
        case "audio":
          for (var W = 0;W < aX.length; W++)
            Y1(aX[W], J);
          Y = X;
          break;
        case "source":
          Y1("error", J), Y = X;
          break;
        case "img":
        case "image":
        case "link":
          Y1("error", J), Y1("load", J), Y = X;
          break;
        case "details":
          Y1("toggle", J), Y = X;
          break;
        case "input":
          L(J, X), Y = w(J, X), Y1("invalid", J);
          break;
        case "option":
          z1(J, X), Y = X;
          break;
        case "select":
          uz(J, X), Y = qX(J, X), Y1("invalid", J);
          break;
        case "textarea":
          yz(J, X), Y = S4(J, X), Y1("invalid", J);
          break;
        default:
          Y = X;
      }
      switch (T4(Q, Y), $q(Q, J, Z, Y, G), Q) {
        case "input":
          bJ(J), r(J, X, false);
          break;
        case "textarea":
          bJ(J), sz(J);
          break;
        case "option":
          L1(J, X);
          break;
        case "select":
          $U(J, X);
          break;
        default:
          if (typeof Y.onClick === "function")
            d9(J);
          break;
      }
    }
    function qq(J, Q, X, Z, G) {
      k9(Q, Z);
      var Y = null, W, z;
      switch (Q) {
        case "input":
          W = w(J, X), z = w(J, Z), Y = [];
          break;
        case "select":
          W = qX(J, X), z = qX(J, Z), Y = [];
          break;
        case "textarea":
          W = S4(J, X), z = S4(J, Z), Y = [];
          break;
        default:
          if (W = X, z = Z, typeof W.onClick !== "function" && typeof z.onClick === "function")
            d9(J);
          break;
      }
      T4(Q, z);
      var K, V, $ = null;
      for (K in W) {
        if (z.hasOwnProperty(K) || !W.hasOwnProperty(K) || W[K] == null)
          continue;
        if (K === SQ) {
          var A = W[K];
          for (V in A)
            if (A.hasOwnProperty(V)) {
              if (!$)
                $ = {};
              $[V] = "";
            }
        } else if (K === oX || K === NQ)
          ;
        else if (K === C9 || K === sJ)
          ;
        else if (K === j3)
          ;
        else if (A7.hasOwnProperty(K)) {
          if (!Y)
            Y = [];
        } else
          (Y = Y || []).push(K, null);
      }
      for (K in z) {
        var q = z[K], I = W != null ? W[K] : undefined;
        if (!z.hasOwnProperty(K) || q === I || q == null && I == null)
          continue;
        if (K === SQ) {
          if (q)
            Object.freeze(q);
          if (I) {
            for (V in I)
              if (I.hasOwnProperty(V) && (!q || !q.hasOwnProperty(V))) {
                if (!$)
                  $ = {};
                $[V] = "";
              }
            for (V in q)
              if (q.hasOwnProperty(V) && I[V] !== q[V]) {
                if (!$)
                  $ = {};
                $[V] = q[V];
              }
          } else {
            if (!$) {
              if (!Y)
                Y = [];
              Y.push(K, $);
            }
            $ = q;
          }
        } else if (K === oX) {
          var E = q ? q[T9] : undefined, R = I ? I[T9] : undefined;
          if (E != null) {
            if (R !== E)
              (Y = Y || []).push(K, E);
          }
        } else if (K === NQ) {
          if (typeof q === "string" || typeof q === "number")
            (Y = Y || []).push(K, "" + q);
        } else if (K === C9 || K === sJ)
          ;
        else if (A7.hasOwnProperty(K)) {
          if (q != null) {
            if (typeof q !== "function")
              h9(K, q);
            if (K === "onScroll")
              Y1("scroll", J);
          }
          if (!Y && I !== q)
            Y = [];
        } else
          (Y = Y || []).push(K, q);
      }
      if ($)
        kU($, z[SQ]), (Y = Y || []).push(SQ, $);
      return Y;
    }
    function Aq(J, Q, X, Z, G) {
      if (X === "input" && G.type === "radio" && G.name != null)
        C(J, G);
      var Y = OQ(X, Z), W = OQ(X, G);
      switch (Uq(J, Q, Y, W), X) {
        case "input":
          J0(J, G);
          break;
        case "textarea":
          cz(J, G);
          break;
        case "select":
          UU(J, G);
          break;
      }
    }
    function Pq(J) {
      {
        var Q = J.toLowerCase();
        if (!z9.hasOwnProperty(Q))
          return null;
        return z9[Q] || null;
      }
    }
    function Fq(J, Q, X, Z, G, Y, W) {
      var z, K;
      switch (z = OQ(Q, X), k9(Q, X), Q) {
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
          for (var V = 0;V < aX.length; V++)
            Y1(aX[V], J);
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
          L(J, X), Y1("invalid", J);
          break;
        case "option":
          z1(J, X);
          break;
        case "select":
          uz(J, X), Y1("invalid", J);
          break;
        case "textarea":
          yz(J, X), Y1("invalid", J);
          break;
      }
      T4(Q, X);
      {
        K = new Set;
        var $ = J.attributes;
        for (var A = 0;A < $.length; A++) {
          var q = $[A].name.toLowerCase();
          switch (q) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              K.add($[A].name);
          }
        }
      }
      var I = null;
      for (var E in X) {
        if (!X.hasOwnProperty(E))
          continue;
        var R = X[E];
        if (E === NQ) {
          if (typeof R === "string") {
            if (J.textContent !== R) {
              if (X[sJ] !== true)
                f9(J.textContent, R, Y, W);
              I = [NQ, R];
            }
          } else if (typeof R === "number") {
            if (J.textContent !== "" + R) {
              if (X[sJ] !== true)
                f9(J.textContent, R, Y, W);
              I = [NQ, "" + R];
            }
          }
        } else if (A7.hasOwnProperty(E)) {
          if (R != null) {
            if (typeof R !== "function")
              h9(E, R);
            if (E === "onScroll")
              Y1("scroll", J);
          }
        } else if (W && true && typeof z === "boolean") {
          var y = undefined, e = z && _7 ? null : D7(E);
          if (X[sJ] === true)
            ;
          else if (E === C9 || E === sJ || E === "value" || E === "checked" || E === "selected")
            ;
          else if (E === oX) {
            var o = J.innerHTML, w0 = R ? R[T9] : undefined;
            if (w0 != null) {
              var I0 = v3(J, w0);
              if (I0 !== o)
                tX(E, o, I0);
            }
          } else if (E === SQ) {
            if (K.delete(E), g3) {
              var P = CU(R);
              if (y = J.getAttribute("style"), P !== y)
                tX(E, y, P);
            }
          } else if (z && !_7) {
            if (K.delete(E.toLowerCase()), y = nQ(J, E, R), R !== y)
              tX(E, y, R);
          } else if (!V1(E, e, z) && !a0(E, R, e, z)) {
            var N = false;
            if (e !== null)
              K.delete(e.attributeName), y = rQ(J, E, R, e);
            else {
              var F = Z;
              if (F === ZJ)
                F = j4(Q);
              if (F === ZJ)
                K.delete(E.toLowerCase());
              else {
                var g = Pq(E);
                if (g !== null && g !== E)
                  N = true, K.delete(g);
                K.delete(E);
              }
              y = nQ(J, E, R);
            }
            var l = _7;
            if (!l && R !== y && !N)
              tX(E, y, R);
          }
        }
      }
      if (W) {
        if (K.size > 0 && X[sJ] !== true)
          x3(K);
      }
      switch (Q) {
        case "input":
          bJ(J), r(J, X, true);
          break;
        case "textarea":
          bJ(J), sz(J);
          break;
        case "select":
        case "option":
          break;
        default:
          if (typeof X.onClick === "function")
            d9(J);
          break;
      }
      return I;
    }
    function Dq(J, Q, X) {
      var Z = J.nodeValue !== Q;
      return Z;
    }
    function lG(J, Q) {
      {
        if (v7)
          return;
        v7 = true, U("Did not expect server HTML to contain a <%s> in <%s>.", Q.nodeName.toLowerCase(), J.nodeName.toLowerCase());
      }
    }
    function iG(J, Q) {
      {
        if (v7)
          return;
        v7 = true, U('Did not expect server HTML to contain the text node "%s" in <%s>.', Q.nodeValue, J.nodeName.toLowerCase());
      }
    }
    function pG(J, Q, X) {
      {
        if (v7)
          return;
        v7 = true, U("Expected server HTML to contain a matching <%s> in <%s>.", Q, J.nodeName.toLowerCase());
      }
    }
    function aG(J, Q) {
      {
        if (Q === "")
          return;
        if (v7)
          return;
        v7 = true, U('Expected server HTML to contain a matching text node for "%s" in <%s>.', Q, J.nodeName.toLowerCase());
      }
    }
    function Eq(J, Q, X) {
      switch (Q) {
        case "input":
          O0(J, X);
          return;
        case "textarea":
          OU(J, X);
          return;
        case "select":
          HU(J, X);
          return;
      }
    }
    var eX = function() {
    }, JZ = function() {
    };
    {
      var wq = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], T3 = ["applet", "caption", "html", "table", "td", "th", "marquee", "object", "template", "foreignObject", "desc", "title"], Iq = T3.concat(["button"]), Rq = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], k3 = { current: null, formTag: null, aTagInScope: null, buttonTagInScope: null, nobrTagInScope: null, pTagInButtonScope: null, listItemTagAutoclosing: null, dlItemTagAutoclosing: null };
      JZ = function(J, Q) {
        var X = D0({}, J || k3), Z = { tag: Q };
        if (T3.indexOf(Q) !== -1)
          X.aTagInScope = null, X.buttonTagInScope = null, X.nobrTagInScope = null;
        if (Iq.indexOf(Q) !== -1)
          X.pTagInButtonScope = null;
        if (wq.indexOf(Q) !== -1 && Q !== "address" && Q !== "div" && Q !== "p")
          X.listItemTagAutoclosing = null, X.dlItemTagAutoclosing = null;
        if (X.current = Z, Q === "form")
          X.formTag = Z;
        if (Q === "a")
          X.aTagInScope = Z;
        if (Q === "button")
          X.buttonTagInScope = Z;
        if (Q === "nobr")
          X.nobrTagInScope = Z;
        if (Q === "p")
          X.pTagInButtonScope = Z;
        if (Q === "li")
          X.listItemTagAutoclosing = Z;
        if (Q === "dd" || Q === "dt")
          X.dlItemTagAutoclosing = Z;
        return X;
      };
      var Lq = function(J, Q) {
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
            return Rq.indexOf(Q) === -1;
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
      }, Nq = function(J, Q) {
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
      }, h3 = {};
      eX = function(J, Q, X) {
        X = X || k3;
        var Z = X.current, G = Z && Z.tag;
        if (Q != null) {
          if (J != null)
            U("validateDOMNesting: when childText is passed, childTag should be null");
          J = "#text";
        }
        var Y = Lq(J, G) ? null : Z, W = Y ? null : Nq(J, X), z = Y || W;
        if (!z)
          return;
        var K = z.tag, V = !!Y + "|" + J + "|" + K;
        if (h3[V])
          return;
        h3[V] = true;
        var $ = J, A = "";
        if (J === "#text")
          if (/\S/.test(Q))
            $ = "Text nodes";
          else
            $ = "Whitespace text nodes", A = " Make sure you don't have any extra whitespace between tags on each line of your source code.";
        else
          $ = "<" + J + ">";
        if (Y) {
          var q = "";
          if (K === "table" && J === "tr")
            q += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser.";
          U("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", $, K, A, q);
        } else
          U("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", $, K);
      };
    }
    var u9 = "suppressHydrationWarning", m9 = "$", y9 = "/$", QZ = "$?", XZ = "$!", Sq = "style", rG = null, nG = null;
    function _q(J) {
      var Q, X, Z = J.nodeType;
      switch (Z) {
        case YJ:
        case g4: {
          Q = Z === YJ ? "#document" : "#fragment";
          var G = J.documentElement;
          X = G ? G.namespaceURI : x4(null, "");
          break;
        }
        default: {
          var Y = Z === P1 ? J.parentNode : J, W = Y.namespaceURI || null;
          Q = Y.tagName, X = x4(W, Q);
          break;
        }
      }
      {
        var z = Q.toLowerCase(), K = JZ(null, z);
        return { namespace: X, ancestorInfo: K };
      }
    }
    function jq(J, Q, X) {
      {
        var Z = J, G = x4(Z.namespace, Q), Y = JZ(Z.ancestorInfo, Q);
        return { namespace: G, ancestorInfo: Y };
      }
    }
    function oG(J) {
      return J;
    }
    function xq(J) {
      rG = SO(), nG = sM();
      var Q = null;
      return sK(false), Q;
    }
    function gq(J) {
      lM(nG), sK(rG), rG = null, nG = null;
    }
    function vq(J, Q, X, Z, G) {
      var Y;
      {
        var W = Z;
        if (eX(J, null, W.ancestorInfo), typeof Q.children === "string" || typeof Q.children === "number") {
          var z = "" + Q.children, K = JZ(W.ancestorInfo, J);
          eX(null, z, K);
        }
        Y = W.namespace;
      }
      var V = Hq(J, Q, X, Y);
      return YZ(G, V), YY(V, Q), V;
    }
    function Cq(J, Q) {
      J.appendChild(Q);
    }
    function Tq(J, Q, X, Z, G) {
      switch (Mq(J, Q, X, Z), Q) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!X.autoFocus;
        case "img":
          return true;
        default:
          return false;
      }
    }
    function kq(J, Q, X, Z, G, Y) {
      {
        var W = Y;
        if (typeof Z.children !== typeof X.children && (typeof Z.children === "string" || typeof Z.children === "number")) {
          var z = "" + Z.children, K = JZ(W.ancestorInfo, Q);
          eX(null, z, K);
        }
      }
      return qq(J, Q, X, Z);
    }
    function tG(J, Q) {
      return J === "textarea" || J === "noscript" || typeof Q.children === "string" || typeof Q.children === "number" || typeof Q.dangerouslySetInnerHTML === "object" && Q.dangerouslySetInnerHTML !== null && Q.dangerouslySetInnerHTML.__html != null;
    }
    function hq(J, Q, X, Z) {
      {
        var G = X;
        eX(null, J, G.ancestorInfo);
      }
      var Y = Oq(J, Q);
      return YZ(Z, Y), Y;
    }
    function bq() {
      var J = window.event;
      if (J === undefined)
        return UJ;
      return lK(J.type);
    }
    var eG = typeof setTimeout === "function" ? setTimeout : undefined, fq = typeof clearTimeout === "function" ? clearTimeout : undefined, JY = -1, b3 = typeof Promise === "function" ? Promise : undefined, dq = typeof queueMicrotask === "function" ? queueMicrotask : typeof b3 !== "undefined" ? function(J) {
      return b3.resolve(null).then(J).catch(uq);
    } : eG;
    function uq(J) {
      setTimeout(function() {
        throw J;
      });
    }
    function mq(J, Q, X, Z) {
      switch (Q) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          if (X.autoFocus)
            J.focus();
          return;
        case "img": {
          if (X.src)
            J.src = X.src;
          return;
        }
      }
    }
    function yq(J, Q, X, Z, G, Y) {
      Aq(J, Q, X, Z, G), YY(J, G);
    }
    function f3(J) {
      W9(J, "");
    }
    function cq(J, Q, X) {
      J.nodeValue = X;
    }
    function sq(J, Q) {
      J.appendChild(Q);
    }
    function lq(J, Q) {
      var X;
      if (J.nodeType === P1)
        X = J.parentNode, X.insertBefore(Q, J);
      else
        X = J, X.appendChild(Q);
      var Z = J._reactRootContainer;
      if ((Z === null || Z === undefined) && X.onclick === null)
        d9(X);
    }
    function iq(J, Q, X) {
      J.insertBefore(Q, X);
    }
    function pq(J, Q, X) {
      if (J.nodeType === P1)
        J.parentNode.insertBefore(Q, X);
      else
        J.insertBefore(Q, X);
    }
    function aq(J, Q) {
      J.removeChild(Q);
    }
    function rq(J, Q) {
      if (J.nodeType === P1)
        J.parentNode.removeChild(Q);
      else
        J.removeChild(Q);
    }
    function QY(J, Q) {
      var X = Q, Z = 0;
      do {
        var G = X.nextSibling;
        if (J.removeChild(X), G && G.nodeType === P1) {
          var Y = G.data;
          if (Y === y9)
            if (Z === 0) {
              J.removeChild(G), fX(Q);
              return;
            } else
              Z--;
          else if (Y === m9 || Y === QZ || Y === XZ)
            Z++;
        }
        X = G;
      } while (X);
      fX(Q);
    }
    function nq(J, Q) {
      if (J.nodeType === P1)
        QY(J.parentNode, Q);
      else if (J.nodeType === g7)
        QY(J, Q);
      fX(J);
    }
    function oq(J) {
      J = J;
      var Q = J.style;
      if (typeof Q.setProperty === "function")
        Q.setProperty("display", "none", "important");
      else
        Q.display = "none";
    }
    function tq(J) {
      J.nodeValue = "";
    }
    function eq(J, Q) {
      J = J;
      var X = Q[Sq], Z = X !== undefined && X !== null && X.hasOwnProperty("display") ? X.display : null;
      J.style.display = v4("display", Z);
    }
    function JA(J, Q) {
      J.nodeValue = Q;
    }
    function QA(J) {
      if (J.nodeType === g7)
        J.textContent = "";
      else if (J.nodeType === YJ) {
        if (J.documentElement)
          J.removeChild(J.documentElement);
      }
    }
    function XA(J, Q, X) {
      if (J.nodeType !== g7 || Q.toLowerCase() !== J.nodeName.toLowerCase())
        return null;
      return J;
    }
    function ZA(J, Q) {
      if (Q === "" || J.nodeType !== GJ)
        return null;
      return J;
    }
    function GA(J) {
      if (J.nodeType !== P1)
        return null;
      return J;
    }
    function d3(J) {
      return J.data === QZ;
    }
    function XY(J) {
      return J.data === XZ;
    }
    function YA(J) {
      var Q = J.nextSibling && J.nextSibling.dataset, X, Z, G;
      if (Q)
        X = Q.dgst, Z = Q.msg, G = Q.stck;
      return { message: Z, digest: X, stack: G };
    }
    function WA(J, Q) {
      J._reactRetry = Q;
    }
    function c9(J) {
      for (;J != null; J = J.nextSibling) {
        var Q = J.nodeType;
        if (Q === g7 || Q === GJ)
          break;
        if (Q === P1) {
          var X = J.data;
          if (X === m9 || X === XZ || X === QZ)
            break;
          if (X === y9)
            return null;
        }
      }
      return J;
    }
    function ZZ(J) {
      return c9(J.nextSibling);
    }
    function zA(J) {
      return c9(J.firstChild);
    }
    function KA(J) {
      return c9(J.firstChild);
    }
    function BA(J) {
      return c9(J.nextSibling);
    }
    function VA(J, Q, X, Z, G, Y, W) {
      YZ(Y, J), YY(J, X);
      var z;
      {
        var K = G;
        z = K.namespace;
      }
      var V = (Y.mode & N0) !== Z0;
      return Fq(J, Q, X, z, Z, V, W);
    }
    function $A(J, Q, X, Z) {
      YZ(X, J);
      var G = (X.mode & N0) !== Z0;
      return Dq(J, Q);
    }
    function UA(J, Q) {
      YZ(Q, J);
    }
    function HA(J) {
      var Q = J.nextSibling, X = 0;
      while (Q) {
        if (Q.nodeType === P1) {
          var Z = Q.data;
          if (Z === y9)
            if (X === 0)
              return ZZ(Q);
            else
              X--;
          else if (Z === m9 || Z === XZ || Z === QZ)
            X++;
        }
        Q = Q.nextSibling;
      }
      return null;
    }
    function u3(J) {
      var Q = J.previousSibling, X = 0;
      while (Q) {
        if (Q.nodeType === P1) {
          var Z = Q.data;
          if (Z === m9 || Z === XZ || Z === QZ)
            if (X === 0)
              return Q;
            else
              X--;
          else if (Z === y9)
            X++;
        }
        Q = Q.previousSibling;
      }
      return null;
    }
    function OA(J) {
      fX(J);
    }
    function MA(J) {
      fX(J);
    }
    function qA(J) {
      return J !== "head" && J !== "body";
    }
    function AA(J, Q, X, Z) {
      var G = true;
      f9(Q.nodeValue, X, Z, G);
    }
    function PA(J, Q, X, Z, G, Y) {
      if (Q[u9] !== true) {
        var W = true;
        f9(Z.nodeValue, G, Y, W);
      }
    }
    function FA(J, Q) {
      if (Q.nodeType === g7)
        lG(J, Q);
      else if (Q.nodeType === P1)
        ;
      else
        iG(J, Q);
    }
    function DA(J, Q) {
      {
        var X = J.parentNode;
        if (X !== null)
          if (Q.nodeType === g7)
            lG(X, Q);
          else if (Q.nodeType === P1)
            ;
          else
            iG(X, Q);
      }
    }
    function EA(J, Q, X, Z, G) {
      if (G || Q[u9] !== true)
        if (Z.nodeType === g7)
          lG(X, Z);
        else if (Z.nodeType === P1)
          ;
        else
          iG(X, Z);
    }
    function wA(J, Q, X) {
      pG(J, Q);
    }
    function IA(J, Q) {
      aG(J, Q);
    }
    function RA(J, Q, X) {
      {
        var Z = J.parentNode;
        if (Z !== null)
          pG(Z, Q);
      }
    }
    function LA(J, Q) {
      {
        var X = J.parentNode;
        if (X !== null)
          aG(X, Q);
      }
    }
    function NA(J, Q, X, Z, G, Y) {
      if (Y || Q[u9] !== true)
        pG(X, Z);
    }
    function SA(J, Q, X, Z, G) {
      if (G || Q[u9] !== true)
        aG(X, Z);
    }
    function _A(J) {
      U("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", J.nodeName.toLowerCase());
    }
    function jA(J) {
      rX(J);
    }
    var R5 = Math.random().toString(36).slice(2), L5 = "__reactFiber$" + R5, ZY = "__reactProps$" + R5, GZ = "__reactContainer$" + R5, GY = "__reactEvents$" + R5, xA = "__reactListeners$" + R5, gA = "__reactHandles$" + R5;
    function vA(J) {
      delete J[L5], delete J[ZY], delete J[GY], delete J[xA], delete J[gA];
    }
    function YZ(J, Q) {
      Q[L5] = J;
    }
    function s9(J, Q) {
      Q[GZ] = J;
    }
    function m3(J) {
      J[GZ] = null;
    }
    function WZ(J) {
      return !!J[GZ];
    }
    function _Q(J) {
      var Q = J[L5];
      if (Q)
        return Q;
      var X = J.parentNode;
      while (X) {
        if (Q = X[GZ] || X[L5], Q) {
          var Z = Q.alternate;
          if (Q.child !== null || Z !== null && Z.child !== null) {
            var G = u3(J);
            while (G !== null) {
              var Y = G[L5];
              if (Y)
                return Y;
              G = u3(G);
            }
          }
          return Q;
        }
        J = X, X = J.parentNode;
      }
      return null;
    }
    function lJ(J) {
      var Q = J[L5] || J[GZ];
      if (Q)
        if (Q.tag === p || Q.tag === L0 || Q.tag === E0 || Q.tag === k)
          return Q;
        else
          return null;
      return null;
    }
    function N5(J) {
      if (J.tag === p || J.tag === L0)
        return J.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function l9(J) {
      return J[ZY] || null;
    }
    function YY(J, Q) {
      J[ZY] = Q;
    }
    function CA(J) {
      var Q = J[GY];
      if (Q === undefined)
        Q = J[GY] = new Set;
      return Q;
    }
    var y3 = {}, c3 = S.ReactDebugCurrentFrame;
    function i9(J) {
      if (J) {
        var Q = J._owner, X = tQ(J.type, J._source, Q ? Q.type : null);
        c3.setExtraStackFrame(X);
      } else
        c3.setExtraStackFrame(null);
    }
    function E8(J, Q, X, Z, G) {
      {
        var Y = Function.call.bind(l1);
        for (var W in J)
          if (Y(J, W)) {
            var z = undefined;
            try {
              if (typeof J[W] !== "function") {
                var K = Error((Z || "React class") + ": " + X + " type `" + W + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof J[W] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw K.name = "Invariant Violation", K;
              }
              z = J[W](Q, W, Z, X, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (V) {
              z = V;
            }
            if (z && !(z instanceof Error))
              i9(G), U("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Z || "React class", X, W, typeof z), i9(null);
            if (z instanceof Error && !(z.message in y3))
              y3[z.message] = true, i9(G), U("Failed %s type: %s", X, z.message), i9(null);
          }
      }
    }
    var WY = [], p9;
    p9 = [];
    var HJ = -1;
    function iJ(J) {
      return { current: J };
    }
    function $7(J, Q) {
      if (HJ < 0) {
        U("Unexpected pop.");
        return;
      }
      if (Q !== p9[HJ])
        U("Unexpected Fiber popped.");
      J.current = WY[HJ], WY[HJ] = null, p9[HJ] = null, HJ--;
    }
    function U7(J, Q, X) {
      HJ++, WY[HJ] = J.current, p9[HJ] = X, J.current = Q;
    }
    var s3 = {}, i7 = {};
    Object.freeze(i7);
    var OJ = iJ(i7), m8 = iJ(false), zY = i7;
    function S5(J, Q, X) {
      {
        if (X && y8(Q))
          return zY;
        return OJ.current;
      }
    }
    function l3(J, Q, X) {
      {
        var Z = J.stateNode;
        Z.__reactInternalMemoizedUnmaskedChildContext = Q, Z.__reactInternalMemoizedMaskedChildContext = X;
      }
    }
    function _5(J, Q) {
      {
        var X = J.type, Z = X.contextTypes;
        if (!Z)
          return i7;
        var G = J.stateNode;
        if (G && G.__reactInternalMemoizedUnmaskedChildContext === Q)
          return G.__reactInternalMemoizedMaskedChildContext;
        var Y = {};
        for (var W in Z)
          Y[W] = Q[W];
        {
          var z = q0(J) || "Unknown";
          E8(Z, Y, "context", z);
        }
        if (G)
          l3(J, Q, Y);
        return Y;
      }
    }
    function a9() {
      return m8.current;
    }
    function y8(J) {
      {
        var Q = J.childContextTypes;
        return Q !== null && Q !== undefined;
      }
    }
    function r9(J) {
      $7(m8, J), $7(OJ, J);
    }
    function KY(J) {
      $7(m8, J), $7(OJ, J);
    }
    function i3(J, Q, X) {
      {
        if (OJ.current !== i7)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        U7(OJ, Q, J), U7(m8, X, J);
      }
    }
    function p3(J, Q, X) {
      {
        var Z = J.stateNode, G = Q.childContextTypes;
        if (typeof Z.getChildContext !== "function") {
          {
            var Y = q0(J) || "Unknown";
            if (!s3[Y])
              s3[Y] = true, U("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", Y, Y);
          }
          return X;
        }
        var W = Z.getChildContext();
        for (var z in W)
          if (!(z in G))
            throw new Error((q0(J) || "Unknown") + ".getChildContext(): key \"" + z + "\" is not defined in childContextTypes.");
        {
          var K = q0(J) || "Unknown";
          E8(G, W, "child context", K);
        }
        return D0({}, X, W);
      }
    }
    function n9(J) {
      {
        var Q = J.stateNode, X = Q && Q.__reactInternalMemoizedMergedChildContext || i7;
        return zY = OJ.current, U7(OJ, X, J), U7(m8, m8.current, J), true;
      }
    }
    function a3(J, Q, X) {
      {
        var Z = J.stateNode;
        if (!Z)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (X) {
          var G = p3(J, Q, zY);
          Z.__reactInternalMemoizedMergedChildContext = G, $7(m8, J), $7(OJ, J), U7(OJ, G, J), U7(m8, X, J);
        } else
          $7(m8, J), U7(m8, X, J);
      }
    }
    function TA(J) {
      {
        if (!qH(J) || J.tag !== h)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var Q = J;
        do {
          switch (Q.tag) {
            case k:
              return Q.stateNode.context;
            case h: {
              var X = Q.type;
              if (y8(X))
                return Q.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          Q = Q.return;
        } while (Q !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var pJ = 0, o9 = 1, MJ = null, BY = false, VY = false;
    function r3(J) {
      if (MJ === null)
        MJ = [J];
      else
        MJ.push(J);
    }
    function kA(J) {
      BY = true, r3(J);
    }
    function n3() {
      if (BY)
        aJ();
    }
    function aJ() {
      if (!VY && MJ !== null) {
        VY = true;
        var J = 0, Q = D8();
        try {
          var X = true, Z = MJ;
          y1(c7);
          for (;J < Z.length; J++) {
            var G = Z[J];
            do
              G = G(X);
            while (G !== null);
          }
          MJ = null, BY = false;
        } catch (Y) {
          if (MJ !== null)
            MJ = MJ.slice(J + 1);
          throw FK(U9, aJ), Y;
        } finally {
          y1(Q), VY = false;
        }
      }
      return null;
    }
    var j5 = [], x5 = 0, t9 = null, e9 = 0, Y8 = [], W8 = 0, jQ = null, qJ = 1, AJ = "";
    function hA(J) {
      return gQ(), (J.flags & $K) !== X0;
    }
    function bA(J) {
      return gQ(), e9;
    }
    function fA() {
      var J = AJ, Q = qJ, X = Q & ~dA(Q);
      return X.toString(32) + J;
    }
    function xQ(J, Q) {
      gQ(), j5[x5++] = e9, j5[x5++] = t9, t9 = J, e9 = Q;
    }
    function o3(J, Q, X) {
      gQ(), Y8[W8++] = qJ, Y8[W8++] = AJ, Y8[W8++] = jQ, jQ = J;
      var Z = qJ, G = AJ, Y = J6(Z) - 1, W = Z & ~(1 << Y), z = X + 1, K = J6(Q) + Y;
      if (K > 30) {
        var V = Y - Y % 5, $ = (1 << V) - 1, A = (W & $).toString(32), q = W >> V, I = Y - V, E = J6(Q) + I, R = z << I, y = R | q, e = A + G;
        qJ = 1 << E | y, AJ = e;
      } else {
        var o = z << Y, w0 = o | W, I0 = G;
        qJ = 1 << K | w0, AJ = I0;
      }
    }
    function $Y(J) {
      gQ();
      var Q = J.return;
      if (Q !== null) {
        var X = 1, Z = 0;
        xQ(J, X), o3(J, X, Z);
      }
    }
    function J6(J) {
      return 32 - LK(J);
    }
    function dA(J) {
      return 1 << J6(J) - 1;
    }
    function UY(J) {
      while (J === t9)
        t9 = j5[--x5], j5[x5] = null, e9 = j5[--x5], j5[x5] = null;
      while (J === jQ)
        jQ = Y8[--W8], Y8[W8] = null, AJ = Y8[--W8], Y8[W8] = null, qJ = Y8[--W8], Y8[W8] = null;
    }
    function uA() {
      if (gQ(), jQ !== null)
        return { id: qJ, overflow: AJ };
      else
        return null;
    }
    function mA(J, Q) {
      gQ(), Y8[W8++] = qJ, Y8[W8++] = AJ, Y8[W8++] = jQ, qJ = Q.id, AJ = Q.overflow, jQ = J;
    }
    function gQ() {
      if (!n1())
        U("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var r1 = null, z8 = null, w8 = false, vQ = false, rJ = null;
    function yA() {
      if (w8)
        U("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function t3() {
      vQ = true;
    }
    function cA() {
      return vQ;
    }
    function sA(J) {
      var Q = J.stateNode.containerInfo;
      return z8 = KA(Q), r1 = J, w8 = true, rJ = null, vQ = false, true;
    }
    function lA(J, Q, X) {
      if (z8 = BA(Q), r1 = J, w8 = true, rJ = null, vQ = false, X !== null)
        mA(J, X);
      return true;
    }
    function e3(J, Q) {
      switch (J.tag) {
        case k: {
          FA(J.stateNode.containerInfo, Q);
          break;
        }
        case p: {
          var X = (J.mode & N0) !== Z0;
          EA(J.type, J.memoizedProps, J.stateNode, Q, X);
          break;
        }
        case E0: {
          var Z = J.memoizedState;
          if (Z.dehydrated !== null)
            DA(Z.dehydrated, Q);
          break;
        }
      }
    }
    function JB(J, Q) {
      e3(J, Q);
      var X = tD();
      X.stateNode = Q, X.return = J;
      var Z = J.deletions;
      if (Z === null)
        J.deletions = [X], J.flags |= MQ;
      else
        Z.push(X);
    }
    function HY(J, Q) {
      {
        if (vQ)
          return;
        switch (J.tag) {
          case k: {
            var X = J.stateNode.containerInfo;
            switch (Q.tag) {
              case p:
                var { type: Z, pendingProps: G } = Q;
                wA(X, Z);
                break;
              case L0:
                var Y = Q.pendingProps;
                IA(X, Y);
                break;
            }
            break;
          }
          case p: {
            var { type: W, memoizedProps: z, stateNode: K } = J;
            switch (Q.tag) {
              case p: {
                var { type: V, pendingProps: $ } = Q, A = (J.mode & N0) !== Z0;
                NA(W, z, K, V, $, A);
                break;
              }
              case L0: {
                var q = Q.pendingProps, I = (J.mode & N0) !== Z0;
                SA(W, z, K, q, I);
                break;
              }
            }
            break;
          }
          case E0: {
            var E = J.memoizedState, R = E.dehydrated;
            if (R !== null)
              switch (Q.tag) {
                case p:
                  var { type: y, pendingProps: e } = Q;
                  RA(R, y);
                  break;
                case L0:
                  var o = Q.pendingProps;
                  LA(R, o);
                  break;
              }
            break;
          }
          default:
            return;
        }
      }
    }
    function QB(J, Q) {
      Q.flags = Q.flags & ~zJ | F1, HY(J, Q);
    }
    function XB(J, Q) {
      switch (J.tag) {
        case p: {
          var { type: X, pendingProps: Z } = J, G = XA(Q, X);
          if (G !== null)
            return J.stateNode = G, r1 = J, z8 = zA(G), true;
          return false;
        }
        case L0: {
          var Y = J.pendingProps, W = ZA(Q, Y);
          if (W !== null)
            return J.stateNode = W, r1 = J, z8 = null, true;
          return false;
        }
        case E0: {
          var z = GA(Q);
          if (z !== null) {
            var K = { dehydrated: z, treeContext: uA(), retryLane: m7 };
            J.memoizedState = K;
            var V = eD(z);
            return V.return = J, J.child = V, r1 = J, z8 = null, true;
          }
          return false;
        }
        default:
          return false;
      }
    }
    function OY(J) {
      return (J.mode & N0) !== Z0 && (J.flags & k0) === X0;
    }
    function MY(J) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function qY(J) {
      if (!w8)
        return;
      var Q = z8;
      if (!Q) {
        if (OY(J))
          HY(r1, J), MY();
        QB(r1, J), w8 = false, r1 = J;
        return;
      }
      var X = Q;
      if (!XB(J, Q)) {
        if (OY(J))
          HY(r1, J), MY();
        Q = ZZ(X);
        var Z = r1;
        if (!Q || !XB(J, Q)) {
          QB(r1, J), w8 = false, r1 = J;
          return;
        }
        JB(Z, X);
      }
    }
    function iA(J, Q, X) {
      var Z = J.stateNode, G = !vQ, Y = VA(Z, J.type, J.memoizedProps, Q, X, J, G);
      if (J.updateQueue = Y, Y !== null)
        return true;
      return false;
    }
    function pA(J) {
      var { stateNode: Q, memoizedProps: X } = J, Z = $A(Q, X, J);
      if (Z) {
        var G = r1;
        if (G !== null)
          switch (G.tag) {
            case k: {
              var Y = G.stateNode.containerInfo, W = (G.mode & N0) !== Z0;
              AA(Y, Q, X, W);
              break;
            }
            case p: {
              var { type: z, memoizedProps: K, stateNode: V } = G, $ = (G.mode & N0) !== Z0;
              PA(z, K, V, Q, X, $);
              break;
            }
          }
      }
      return Z;
    }
    function aA(J) {
      var Q = J.memoizedState, X = Q !== null ? Q.dehydrated : null;
      if (!X)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      UA(X, J);
    }
    function rA(J) {
      var Q = J.memoizedState, X = Q !== null ? Q.dehydrated : null;
      if (!X)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return HA(X);
    }
    function ZB(J) {
      var Q = J.return;
      while (Q !== null && Q.tag !== p && Q.tag !== k && Q.tag !== E0)
        Q = Q.return;
      r1 = Q;
    }
    function Q6(J) {
      if (J !== r1)
        return false;
      if (!w8)
        return ZB(J), w8 = true, false;
      if (J.tag !== k && (J.tag !== p || qA(J.type) && !tG(J.type, J.memoizedProps))) {
        var Q = z8;
        if (Q)
          if (OY(J))
            GB(J), MY();
          else
            while (Q)
              JB(J, Q), Q = ZZ(Q);
      }
      if (ZB(J), J.tag === E0)
        z8 = rA(J);
      else
        z8 = r1 ? ZZ(J.stateNode) : null;
      return true;
    }
    function nA() {
      return w8 && z8 !== null;
    }
    function GB(J) {
      var Q = z8;
      while (Q)
        e3(J, Q), Q = ZZ(Q);
    }
    function g5() {
      r1 = null, z8 = null, w8 = false, vQ = false;
    }
    function YB() {
      if (rJ !== null)
        J$(rJ), rJ = null;
    }
    function n1() {
      return w8;
    }
    function AY(J) {
      if (rJ === null)
        rJ = [J];
      else
        rJ.push(J);
    }
    var oA = S.ReactCurrentBatchConfig, tA = null;
    function eA() {
      return oA.transition;
    }
    var I8 = { recordUnsafeLifecycleWarnings: function(J, Q) {
    }, flushPendingUnsafeLifecycleWarnings: function() {
    }, recordLegacyContextWarning: function(J, Q) {
    }, flushLegacyContextWarning: function() {
    }, discardPendingWarnings: function() {
    } };
    {
      var JP = function(J) {
        var Q = null, X = J;
        while (X !== null) {
          if (X.mode & D1)
            Q = X;
          X = X.return;
        }
        return Q;
      }, CQ = function(J) {
        var Q = [];
        return J.forEach(function(X) {
          Q.push(X);
        }), Q.sort().join(", ");
      }, zZ = [], KZ = [], BZ = [], VZ = [], $Z = [], UZ = [], TQ = new Set;
      I8.recordUnsafeLifecycleWarnings = function(J, Q) {
        if (TQ.has(J.type))
          return;
        if (typeof Q.componentWillMount === "function" && Q.componentWillMount.__suppressDeprecationWarning !== true)
          zZ.push(J);
        if (J.mode & D1 && typeof Q.UNSAFE_componentWillMount === "function")
          KZ.push(J);
        if (typeof Q.componentWillReceiveProps === "function" && Q.componentWillReceiveProps.__suppressDeprecationWarning !== true)
          BZ.push(J);
        if (J.mode & D1 && typeof Q.UNSAFE_componentWillReceiveProps === "function")
          VZ.push(J);
        if (typeof Q.componentWillUpdate === "function" && Q.componentWillUpdate.__suppressDeprecationWarning !== true)
          $Z.push(J);
        if (J.mode & D1 && typeof Q.UNSAFE_componentWillUpdate === "function")
          UZ.push(J);
      }, I8.flushPendingUnsafeLifecycleWarnings = function() {
        var J = new Set;
        if (zZ.length > 0)
          zZ.forEach(function(q) {
            J.add(q0(q) || "Component"), TQ.add(q.type);
          }), zZ = [];
        var Q = new Set;
        if (KZ.length > 0)
          KZ.forEach(function(q) {
            Q.add(q0(q) || "Component"), TQ.add(q.type);
          }), KZ = [];
        var X = new Set;
        if (BZ.length > 0)
          BZ.forEach(function(q) {
            X.add(q0(q) || "Component"), TQ.add(q.type);
          }), BZ = [];
        var Z = new Set;
        if (VZ.length > 0)
          VZ.forEach(function(q) {
            Z.add(q0(q) || "Component"), TQ.add(q.type);
          }), VZ = [];
        var G = new Set;
        if ($Z.length > 0)
          $Z.forEach(function(q) {
            G.add(q0(q) || "Component"), TQ.add(q.type);
          }), $Z = [];
        var Y = new Set;
        if (UZ.length > 0)
          UZ.forEach(function(q) {
            Y.add(q0(q) || "Component"), TQ.add(q.type);
          }), UZ = [];
        if (Q.size > 0) {
          var W = CQ(Q);
          U("Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n\nPlease update the following components: %s", W);
        }
        if (Z.size > 0) {
          var z = CQ(Z);
          U("Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state\n\nPlease update the following components: %s", z);
        }
        if (Y.size > 0) {
          var K = CQ(Y);
          U("Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n\nPlease update the following components: %s", K);
        }
        if (J.size > 0) {
          var V = CQ(J);
          s("componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", V);
        }
        if (X.size > 0) {
          var $ = CQ(X);
          s("componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state\n* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", $);
        }
        if (G.size > 0) {
          var A = CQ(G);
          s("componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", A);
        }
      };
      var X6 = new Map, WB = new Set;
      I8.recordLegacyContextWarning = function(J, Q) {
        var X = JP(J);
        if (X === null) {
          U("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (WB.has(J.type))
          return;
        var Z = X6.get(X);
        if (J.type.contextTypes != null || J.type.childContextTypes != null || Q !== null && typeof Q.getChildContext === "function") {
          if (Z === undefined)
            Z = [], X6.set(X, Z);
          Z.push(J);
        }
      }, I8.flushLegacyContextWarning = function() {
        X6.forEach(function(J, Q) {
          if (J.length === 0)
            return;
          var X = J[0], Z = new Set;
          J.forEach(function(Y) {
            Z.add(q0(Y) || "Component"), WB.add(Y.type);
          });
          var G = CQ(Z);
          try {
            W1(X), U("Legacy context API has been detected within a strict-mode tree.\n\nThe old API will be supported in all 16.x releases, but applications using it should migrate to the new version.\n\nPlease update the following components: %s\n\nLearn more about this warning here: https://reactjs.org/link/legacy-context", G);
          } finally {
            f1();
          }
        });
      }, I8.discardPendingWarnings = function() {
        zZ = [], KZ = [], BZ = [], VZ = [], $Z = [], UZ = [], X6 = new Map;
      };
    }
    function R8(J, Q) {
      if (J && J.defaultProps) {
        var X = D0({}, Q), Z = J.defaultProps;
        for (var G in Z)
          if (X[G] === undefined)
            X[G] = Z[G];
        return X;
      }
      return Q;
    }
    var PY = iJ(null), FY;
    FY = {};
    var Z6 = null, v5 = null, DY = null, G6 = false;
    function Y6() {
      Z6 = null, v5 = null, DY = null, G6 = false;
    }
    function zB() {
      G6 = true;
    }
    function KB() {
      G6 = false;
    }
    function BB(J, Q, X) {
      {
        U7(PY, Q._currentValue, J), Q._currentValue = X;
        {
          if (Q._currentRenderer !== undefined && Q._currentRenderer !== null && Q._currentRenderer !== FY)
            U("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
          Q._currentRenderer = FY;
        }
      }
    }
    function EY(J, Q) {
      var X = PY.current;
      $7(PY, Q), J._currentValue = X;
    }
    function wY(J, Q, X) {
      var Z = J;
      while (Z !== null) {
        var G = Z.alternate;
        if (!A5(Z.childLanes, Q)) {
          if (Z.childLanes = F0(Z.childLanes, Q), G !== null)
            G.childLanes = F0(G.childLanes, Q);
        } else if (G !== null && !A5(G.childLanes, Q))
          G.childLanes = F0(G.childLanes, Q);
        if (Z === X)
          break;
        Z = Z.return;
      }
      if (Z !== X)
        U("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function QP(J, Q, X) {
      XP(J, Q, X);
    }
    function XP(J, Q, X) {
      var Z = J.child;
      if (Z !== null)
        Z.return = J;
      while (Z !== null) {
        var G = undefined, Y = Z.dependencies;
        if (Y !== null) {
          G = Z.child;
          var W = Y.firstContext;
          while (W !== null) {
            if (W.context === Q) {
              if (Z.tag === h) {
                var z = gX(X), K = PJ(X1, z);
                K.tag = z6;
                var V = Z.updateQueue;
                if (V === null)
                  ;
                else {
                  var $ = V.shared, A = $.pending;
                  if (A === null)
                    K.next = K;
                  else
                    K.next = A.next, A.next = K;
                  $.pending = K;
                }
              }
              Z.lanes = F0(Z.lanes, X);
              var q = Z.alternate;
              if (q !== null)
                q.lanes = F0(q.lanes, X);
              wY(Z.return, X, J), Y.lanes = F0(Y.lanes, X);
              break;
            }
            W = W.next;
          }
        } else if (Z.tag === _0)
          G = Z.type === J.type ? null : Z.child;
        else if (Z.tag === h1) {
          var I = Z.return;
          if (I === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          I.lanes = F0(I.lanes, X);
          var E = I.alternate;
          if (E !== null)
            E.lanes = F0(E.lanes, X);
          wY(I, X, J), G = Z.sibling;
        } else
          G = Z.child;
        if (G !== null)
          G.return = Z;
        else {
          G = Z;
          while (G !== null) {
            if (G === J) {
              G = null;
              break;
            }
            var R = G.sibling;
            if (R !== null) {
              R.return = G.return, G = R;
              break;
            }
            G = G.return;
          }
        }
        Z = G;
      }
    }
    function C5(J, Q) {
      Z6 = J, v5 = null, DY = null;
      var X = J.dependencies;
      if (X !== null) {
        var Z = X.firstContext;
        if (Z !== null) {
          if (y7(X.lanes, Q))
            NZ();
          X.firstContext = null;
        }
      }
    }
    function E1(J) {
      if (G6)
        U("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var Q = J._currentValue;
      if (DY === J)
        ;
      else {
        var X = { context: J, memoizedValue: Q, next: null };
        if (v5 === null) {
          if (Z6 === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          v5 = X, Z6.dependencies = { lanes: j, firstContext: X };
        } else
          v5 = v5.next = X;
      }
      return Q;
    }
    var kQ = null;
    function IY(J) {
      if (kQ === null)
        kQ = [J];
      else
        kQ.push(J);
    }
    function ZP() {
      if (kQ !== null) {
        for (var J = 0;J < kQ.length; J++) {
          var Q = kQ[J], X = Q.interleaved;
          if (X !== null) {
            Q.interleaved = null;
            var Z = X.next, G = Q.pending;
            if (G !== null) {
              var Y = G.next;
              G.next = Z, X.next = Y;
            }
            Q.pending = X;
          }
        }
        kQ = null;
      }
    }
    function VB(J, Q, X, Z) {
      var G = Q.interleaved;
      if (G === null)
        X.next = X, IY(Q);
      else
        X.next = G.next, G.next = X;
      return Q.interleaved = X, W6(J, Z);
    }
    function GP(J, Q, X, Z) {
      var G = Q.interleaved;
      if (G === null)
        X.next = X, IY(Q);
      else
        X.next = G.next, G.next = X;
      Q.interleaved = X;
    }
    function YP(J, Q, X, Z) {
      var G = Q.interleaved;
      if (G === null)
        X.next = X, IY(Q);
      else
        X.next = G.next, G.next = X;
      return Q.interleaved = X, W6(J, Z);
    }
    function C7(J, Q) {
      return W6(J, Q);
    }
    var WP = W6;
    function W6(J, Q) {
      J.lanes = F0(J.lanes, Q);
      var X = J.alternate;
      if (X !== null)
        X.lanes = F0(X.lanes, Q);
      if (X === null && (J.flags & (F1 | zJ)) !== X0)
        U$(J);
      var Z = J, G = J.return;
      while (G !== null) {
        if (G.childLanes = F0(G.childLanes, Q), X = G.alternate, X !== null)
          X.childLanes = F0(X.childLanes, Q);
        else if ((G.flags & (F1 | zJ)) !== X0)
          U$(J);
        Z = G, G = G.return;
      }
      if (Z.tag === k) {
        var Y = Z.stateNode;
        return Y;
      } else
        return null;
    }
    var $B = 0, UB = 1, z6 = 2, RY = 3, K6 = false, LY, B6;
    LY = false, B6 = null;
    function NY(J) {
      var Q = { baseState: J.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: j }, effects: null };
      J.updateQueue = Q;
    }
    function HB(J, Q) {
      var X = Q.updateQueue, Z = J.updateQueue;
      if (X === Z) {
        var G = { baseState: Z.baseState, firstBaseUpdate: Z.firstBaseUpdate, lastBaseUpdate: Z.lastBaseUpdate, shared: Z.shared, effects: Z.effects };
        Q.updateQueue = G;
      }
    }
    function PJ(J, Q) {
      var X = { eventTime: J, lane: Q, tag: $B, payload: null, callback: null, next: null };
      return X;
    }
    function nJ(J, Q, X) {
      var Z = J.updateQueue;
      if (Z === null)
        return null;
      var G = Z.shared;
      if (B6 === G && !LY)
        U("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), LY = true;
      if (VD()) {
        var Y = G.pending;
        if (Y === null)
          Q.next = Q;
        else
          Q.next = Y.next, Y.next = Q;
        return G.pending = Q, WP(J, X);
      } else
        return YP(J, G, Q, X);
    }
    function V6(J, Q, X) {
      var Z = Q.updateQueue;
      if (Z === null)
        return;
      var G = Z.shared;
      if (jK(X)) {
        var Y = G.lanes;
        Y = gK(Y, J.pendingLanes);
        var W = F0(Y, X);
        G.lanes = W, IG(J, W);
      }
    }
    function SY(J, Q) {
      var { updateQueue: X, alternate: Z } = J;
      if (Z !== null) {
        var G = Z.updateQueue;
        if (X === G) {
          var Y = null, W = null, z = X.firstBaseUpdate;
          if (z !== null) {
            var K = z;
            do {
              var V = { eventTime: K.eventTime, lane: K.lane, tag: K.tag, payload: K.payload, callback: K.callback, next: null };
              if (W === null)
                Y = W = V;
              else
                W.next = V, W = V;
              K = K.next;
            } while (K !== null);
            if (W === null)
              Y = W = Q;
            else
              W.next = Q, W = Q;
          } else
            Y = W = Q;
          X = { baseState: G.baseState, firstBaseUpdate: Y, lastBaseUpdate: W, shared: G.shared, effects: G.effects }, J.updateQueue = X;
          return;
        }
      }
      var $ = X.lastBaseUpdate;
      if ($ === null)
        X.firstBaseUpdate = Q;
      else
        $.next = Q;
      X.lastBaseUpdate = Q;
    }
    function zP(J, Q, X, Z, G, Y) {
      switch (X.tag) {
        case UB: {
          var W = X.payload;
          if (typeof W === "function") {
            zB();
            var z = W.call(Y, Z, G);
            {
              if (J.mode & D1) {
                u1(true);
                try {
                  W.call(Y, Z, G);
                } finally {
                  u1(false);
                }
              }
              KB();
            }
            return z;
          }
          return W;
        }
        case RY:
          J.flags = J.flags & ~w7 | k0;
        case $B: {
          var K = X.payload, V;
          if (typeof K === "function") {
            zB(), V = K.call(Y, Z, G);
            {
              if (J.mode & D1) {
                u1(true);
                try {
                  K.call(Y, Z, G);
                } finally {
                  u1(false);
                }
              }
              KB();
            }
          } else
            V = K;
          if (V === null || V === undefined)
            return Z;
          return D0({}, Z, V);
        }
        case z6:
          return K6 = true, Z;
      }
      return Z;
    }
    function $6(J, Q, X, Z) {
      var G = J.updateQueue;
      K6 = false, B6 = G.shared;
      var { firstBaseUpdate: Y, lastBaseUpdate: W } = G, z = G.shared.pending;
      if (z !== null) {
        G.shared.pending = null;
        var K = z, V = K.next;
        if (K.next = null, W === null)
          Y = V;
        else
          W.next = V;
        W = K;
        var $ = J.alternate;
        if ($ !== null) {
          var A = $.updateQueue, q = A.lastBaseUpdate;
          if (q !== W) {
            if (q === null)
              A.firstBaseUpdate = V;
            else
              q.next = V;
            A.lastBaseUpdate = K;
          }
        }
      }
      if (Y !== null) {
        var I = G.baseState, E = j, R = null, y = null, e = null, o = Y;
        do {
          var { lane: w0, eventTime: I0 } = o;
          if (!A5(Z, w0)) {
            var P = { eventTime: I0, lane: w0, tag: o.tag, payload: o.payload, callback: o.callback, next: null };
            if (e === null)
              y = e = P, R = I;
            else
              e = e.next = P;
            E = F0(E, w0);
          } else {
            if (e !== null) {
              var N = { eventTime: I0, lane: m1, tag: o.tag, payload: o.payload, callback: o.callback, next: null };
              e = e.next = N;
            }
            I = zP(J, G, o, I, Q, X);
            var F = o.callback;
            if (F !== null && o.lane !== m1) {
              J.flags |= s4;
              var g = G.effects;
              if (g === null)
                G.effects = [o];
              else
                g.push(o);
            }
          }
          if (o = o.next, o === null)
            if (z = G.shared.pending, z === null)
              break;
            else {
              var l = z, u = l.next;
              l.next = null, o = u, G.lastBaseUpdate = l, G.shared.pending = null;
            }
        } while (true);
        if (e === null)
          R = I;
        G.baseState = R, G.firstBaseUpdate = y, G.lastBaseUpdate = e;
        var W0 = G.shared.interleaved;
        if (W0 !== null) {
          var H0 = W0;
          do
            E = F0(E, H0.lane), H0 = H0.next;
          while (H0 !== W0);
        } else if (Y === null)
          G.shared.lanes = j;
        fZ(E), J.lanes = E, J.memoizedState = I;
      }
      B6 = null;
    }
    function KP(J, Q) {
      if (typeof J !== "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + J));
      J.call(Q);
    }
    function OB() {
      K6 = false;
    }
    function U6() {
      return K6;
    }
    function MB(J, Q, X) {
      var Z = Q.effects;
      if (Q.effects = null, Z !== null)
        for (var G = 0;G < Z.length; G++) {
          var Y = Z[G], W = Y.callback;
          if (W !== null)
            Y.callback = null, KP(W, X);
        }
    }
    var _Y = {}, qB = new H.Component().refs, jY, xY, gY, vY, CY, AB, H6, TY, kY, hY;
    {
      jY = new Set, xY = new Set, gY = new Set, vY = new Set, TY = new Set, CY = new Set, kY = new Set, hY = new Set;
      var PB = new Set;
      H6 = function(J, Q) {
        if (J === null || typeof J === "function")
          return;
        var X = Q + "_" + J;
        if (!PB.has(X))
          PB.add(X), U("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", Q, J);
      }, AB = function(J, Q) {
        if (Q === undefined) {
          var X = s0(J) || "Component";
          if (!CY.has(X))
            CY.add(X), U("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", X);
        }
      }, Object.defineProperty(_Y, "_processChildContext", { enumerable: false, value: function() {
        throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
      } }), Object.freeze(_Y);
    }
    function bY(J, Q, X, Z) {
      var G = J.memoizedState, Y = X(Z, G);
      {
        if (J.mode & D1) {
          u1(true);
          try {
            Y = X(Z, G);
          } finally {
            u1(false);
          }
        }
        AB(Q, Y);
      }
      var W = Y === null || Y === undefined ? G : D0({}, G, Y);
      if (J.memoizedState = W, J.lanes === j) {
        var z = J.updateQueue;
        z.baseState = W;
      }
    }
    var fY = { isMounted: AH, enqueueSetState: function(J, Q, X) {
      var Z = V5(J), G = L7(), Y = GQ(Z), W = PJ(G, Y);
      if (W.payload = Q, X !== undefined && X !== null)
        H6(X, "setState"), W.callback = X;
      var z = nJ(Z, W, Y);
      if (z !== null)
        T1(z, Z, Y, G), V6(z, Z, Y);
      t4(Z, Y);
    }, enqueueReplaceState: function(J, Q, X) {
      var Z = V5(J), G = L7(), Y = GQ(Z), W = PJ(G, Y);
      if (W.tag = UB, W.payload = Q, X !== undefined && X !== null)
        H6(X, "replaceState"), W.callback = X;
      var z = nJ(Z, W, Y);
      if (z !== null)
        T1(z, Z, Y, G), V6(z, Z, Y);
      t4(Z, Y);
    }, enqueueForceUpdate: function(J, Q) {
      var X = V5(J), Z = L7(), G = GQ(X), Y = PJ(Z, G);
      if (Y.tag = z6, Q !== undefined && Q !== null)
        H6(Q, "forceUpdate"), Y.callback = Q;
      var W = nJ(X, Y, G);
      if (W !== null)
        T1(W, X, G, Z), V6(W, X, G);
      aH(X, G);
    } };
    function FB(J, Q, X, Z, G, Y, W) {
      var z = J.stateNode;
      if (typeof z.shouldComponentUpdate === "function") {
        var K = z.shouldComponentUpdate(Z, Y, W);
        {
          if (J.mode & D1) {
            u1(true);
            try {
              K = z.shouldComponentUpdate(Z, Y, W);
            } finally {
              u1(false);
            }
          }
          if (K === undefined)
            U("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", s0(Q) || "Component");
        }
        return K;
      }
      if (Q.prototype && Q.prototype.isPureReactComponent)
        return !iX(X, Z) || !iX(G, Y);
      return true;
    }
    function BP(J, Q, X) {
      var Z = J.stateNode;
      {
        var G = s0(Q) || "Component", Y = Z.render;
        if (!Y)
          if (Q.prototype && typeof Q.prototype.render === "function")
            U("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", G);
          else
            U("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", G);
        if (Z.getInitialState && !Z.getInitialState.isReactClassApproved && !Z.state)
          U("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", G);
        if (Z.getDefaultProps && !Z.getDefaultProps.isReactClassApproved)
          U("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", G);
        if (Z.propTypes)
          U("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", G);
        if (Z.contextType)
          U("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", G);
        {
          if (Z.contextTypes)
            U("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", G);
          if (Q.contextType && Q.contextTypes && !kY.has(Q))
            kY.add(Q), U("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", G);
        }
        if (typeof Z.componentShouldUpdate === "function")
          U("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", G);
        if (Q.prototype && Q.prototype.isPureReactComponent && typeof Z.shouldComponentUpdate !== "undefined")
          U("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", s0(Q) || "A pure component");
        if (typeof Z.componentDidUnmount === "function")
          U("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", G);
        if (typeof Z.componentDidReceiveProps === "function")
          U("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", G);
        if (typeof Z.componentWillRecieveProps === "function")
          U("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", G);
        if (typeof Z.UNSAFE_componentWillRecieveProps === "function")
          U("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", G);
        var W = Z.props !== X;
        if (Z.props !== undefined && W)
          U("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", G, G);
        if (Z.defaultProps)
          U("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", G, G);
        if (typeof Z.getSnapshotBeforeUpdate === "function" && typeof Z.componentDidUpdate !== "function" && !gY.has(Q))
          gY.add(Q), U("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", s0(Q));
        if (typeof Z.getDerivedStateFromProps === "function")
          U("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", G);
        if (typeof Z.getDerivedStateFromError === "function")
          U("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", G);
        if (typeof Q.getSnapshotBeforeUpdate === "function")
          U("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", G);
        var z = Z.state;
        if (z && (typeof z !== "object" || N1(z)))
          U("%s.state: must be set to an object or null", G);
        if (typeof Z.getChildContext === "function" && typeof Q.childContextTypes !== "object")
          U("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", G);
      }
    }
    function DB(J, Q) {
      Q.updater = fY, J.stateNode = Q, UH(Q, J), Q._reactInternalInstance = _Y;
    }
    function EB(J, Q, X) {
      var Z = false, G = i7, Y = i7, W = Q.contextType;
      if ("contextType" in Q) {
        var z = W === null || W !== undefined && W.$$typeof === T0 && W._context === undefined;
        if (!z && !hY.has(Q)) {
          hY.add(Q);
          var K = "";
          if (W === undefined)
            K = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.";
          else if (typeof W !== "object")
            K = " However, it is set to a " + typeof W + ".";
          else if (W.$$typeof === Y0)
            K = " Did you accidentally pass the Context.Provider instead?";
          else if (W._context !== undefined)
            K = " Did you accidentally pass the Context.Consumer instead?";
          else
            K = " However, it is set to an object with keys {" + Object.keys(W).join(", ") + "}.";
          U("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", s0(Q) || "Component", K);
        }
      }
      if (typeof W === "object" && W !== null)
        Y = E1(W);
      else {
        G = S5(J, Q, true);
        var V = Q.contextTypes;
        Z = V !== null && V !== undefined, Y = Z ? _5(J, G) : i7;
      }
      var $ = new Q(X, Y);
      if (J.mode & D1) {
        u1(true);
        try {
          $ = new Q(X, Y);
        } finally {
          u1(false);
        }
      }
      var A = J.memoizedState = $.state !== null && $.state !== undefined ? $.state : null;
      DB(J, $);
      {
        if (typeof Q.getDerivedStateFromProps === "function" && A === null) {
          var q = s0(Q) || "Component";
          if (!xY.has(q))
            xY.add(q), U("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", q, $.state === null ? "null" : "undefined", q);
        }
        if (typeof Q.getDerivedStateFromProps === "function" || typeof $.getSnapshotBeforeUpdate === "function") {
          var I = null, E = null, R = null;
          if (typeof $.componentWillMount === "function" && $.componentWillMount.__suppressDeprecationWarning !== true)
            I = "componentWillMount";
          else if (typeof $.UNSAFE_componentWillMount === "function")
            I = "UNSAFE_componentWillMount";
          if (typeof $.componentWillReceiveProps === "function" && $.componentWillReceiveProps.__suppressDeprecationWarning !== true)
            E = "componentWillReceiveProps";
          else if (typeof $.UNSAFE_componentWillReceiveProps === "function")
            E = "UNSAFE_componentWillReceiveProps";
          if (typeof $.componentWillUpdate === "function" && $.componentWillUpdate.__suppressDeprecationWarning !== true)
            R = "componentWillUpdate";
          else if (typeof $.UNSAFE_componentWillUpdate === "function")
            R = "UNSAFE_componentWillUpdate";
          if (I !== null || E !== null || R !== null) {
            var y = s0(Q) || "Component", e = typeof Q.getDerivedStateFromProps === "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            if (!vY.has(y))
              vY.add(y), U("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://reactjs.org/link/unsafe-component-lifecycles", y, e, I !== null ? "\n  " + I : "", E !== null ? "\n  " + E : "", R !== null ? "\n  " + R : "");
          }
        }
      }
      if (Z)
        l3(J, G, Y);
      return $;
    }
    function VP(J, Q) {
      var X = Q.state;
      if (typeof Q.componentWillMount === "function")
        Q.componentWillMount();
      if (typeof Q.UNSAFE_componentWillMount === "function")
        Q.UNSAFE_componentWillMount();
      if (X !== Q.state)
        U("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", q0(J) || "Component"), fY.enqueueReplaceState(Q, Q.state, null);
    }
    function wB(J, Q, X, Z) {
      var G = Q.state;
      if (typeof Q.componentWillReceiveProps === "function")
        Q.componentWillReceiveProps(X, Z);
      if (typeof Q.UNSAFE_componentWillReceiveProps === "function")
        Q.UNSAFE_componentWillReceiveProps(X, Z);
      if (Q.state !== G) {
        {
          var Y = q0(J) || "Component";
          if (!jY.has(Y))
            jY.add(Y), U("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Y);
        }
        fY.enqueueReplaceState(Q, Q.state, null);
      }
    }
    function dY(J, Q, X, Z) {
      BP(J, Q, X);
      var G = J.stateNode;
      G.props = X, G.state = J.memoizedState, G.refs = qB, NY(J);
      var Y = Q.contextType;
      if (typeof Y === "object" && Y !== null)
        G.context = E1(Y);
      else {
        var W = S5(J, Q, true);
        G.context = _5(J, W);
      }
      {
        if (G.state === X) {
          var z = s0(Q) || "Component";
          if (!TY.has(z))
            TY.add(z), U("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", z);
        }
        if (J.mode & D1)
          I8.recordLegacyContextWarning(J, G);
        I8.recordUnsafeLifecycleWarnings(J, G);
      }
      G.state = J.memoizedState;
      var K = Q.getDerivedStateFromProps;
      if (typeof K === "function")
        bY(J, Q, K, X), G.state = J.memoizedState;
      if (typeof Q.getDerivedStateFromProps !== "function" && typeof G.getSnapshotBeforeUpdate !== "function" && (typeof G.UNSAFE_componentWillMount === "function" || typeof G.componentWillMount === "function"))
        VP(J, G), $6(J, X, G, Z), G.state = J.memoizedState;
      if (typeof G.componentDidMount === "function") {
        var V = x0;
        if (V |= PQ, (J.mode & d8) !== Z0)
          V |= KJ;
        J.flags |= V;
      }
    }
    function $P(J, Q, X, Z) {
      var { stateNode: G, memoizedProps: Y } = J;
      G.props = Y;
      var W = G.context, z = Q.contextType, K = i7;
      if (typeof z === "object" && z !== null)
        K = E1(z);
      else {
        var V = S5(J, Q, true);
        K = _5(J, V);
      }
      var $ = Q.getDerivedStateFromProps, A = typeof $ === "function" || typeof G.getSnapshotBeforeUpdate === "function";
      if (!A && (typeof G.UNSAFE_componentWillReceiveProps === "function" || typeof G.componentWillReceiveProps === "function")) {
        if (Y !== X || W !== K)
          wB(J, G, X, K);
      }
      OB();
      var q = J.memoizedState, I = G.state = q;
      if ($6(J, X, G, Z), I = J.memoizedState, Y === X && q === I && !a9() && !U6()) {
        if (typeof G.componentDidMount === "function") {
          var E = x0;
          if (E |= PQ, (J.mode & d8) !== Z0)
            E |= KJ;
          J.flags |= E;
        }
        return false;
      }
      if (typeof $ === "function")
        bY(J, Q, $, X), I = J.memoizedState;
      var R = U6() || FB(J, Q, Y, X, q, I, K);
      if (R) {
        if (!A && (typeof G.UNSAFE_componentWillMount === "function" || typeof G.componentWillMount === "function")) {
          if (typeof G.componentWillMount === "function")
            G.componentWillMount();
          if (typeof G.UNSAFE_componentWillMount === "function")
            G.UNSAFE_componentWillMount();
        }
        if (typeof G.componentDidMount === "function") {
          var y = x0;
          if (y |= PQ, (J.mode & d8) !== Z0)
            y |= KJ;
          J.flags |= y;
        }
      } else {
        if (typeof G.componentDidMount === "function") {
          var e = x0;
          if (e |= PQ, (J.mode & d8) !== Z0)
            e |= KJ;
          J.flags |= e;
        }
        J.memoizedProps = X, J.memoizedState = I;
      }
      return G.props = X, G.state = I, G.context = K, R;
    }
    function UP(J, Q, X, Z, G) {
      var Y = Q.stateNode;
      HB(J, Q);
      var W = Q.memoizedProps, z = Q.type === Q.elementType ? W : R8(Q.type, W);
      Y.props = z;
      var K = Q.pendingProps, V = Y.context, $ = X.contextType, A = i7;
      if (typeof $ === "object" && $ !== null)
        A = E1($);
      else {
        var q = S5(Q, X, true);
        A = _5(Q, q);
      }
      var I = X.getDerivedStateFromProps, E = typeof I === "function" || typeof Y.getSnapshotBeforeUpdate === "function";
      if (!E && (typeof Y.UNSAFE_componentWillReceiveProps === "function" || typeof Y.componentWillReceiveProps === "function")) {
        if (W !== K || V !== A)
          wB(Q, Y, Z, A);
      }
      OB();
      var R = Q.memoizedState, y = Y.state = R;
      if ($6(Q, Z, Y, G), y = Q.memoizedState, W === K && R === y && !a9() && !U6() && !H8) {
        if (typeof Y.componentDidUpdate === "function") {
          if (W !== J.memoizedProps || R !== J.memoizedState)
            Q.flags |= x0;
        }
        if (typeof Y.getSnapshotBeforeUpdate === "function") {
          if (W !== J.memoizedProps || R !== J.memoizedState)
            Q.flags |= qQ;
        }
        return false;
      }
      if (typeof I === "function")
        bY(Q, X, I, Z), y = Q.memoizedState;
      var e = U6() || FB(Q, X, z, Z, R, y, A) || H8;
      if (e) {
        if (!E && (typeof Y.UNSAFE_componentWillUpdate === "function" || typeof Y.componentWillUpdate === "function")) {
          if (typeof Y.componentWillUpdate === "function")
            Y.componentWillUpdate(Z, y, A);
          if (typeof Y.UNSAFE_componentWillUpdate === "function")
            Y.UNSAFE_componentWillUpdate(Z, y, A);
        }
        if (typeof Y.componentDidUpdate === "function")
          Q.flags |= x0;
        if (typeof Y.getSnapshotBeforeUpdate === "function")
          Q.flags |= qQ;
      } else {
        if (typeof Y.componentDidUpdate === "function") {
          if (W !== J.memoizedProps || R !== J.memoizedState)
            Q.flags |= x0;
        }
        if (typeof Y.getSnapshotBeforeUpdate === "function") {
          if (W !== J.memoizedProps || R !== J.memoizedState)
            Q.flags |= qQ;
        }
        Q.memoizedProps = Z, Q.memoizedState = y;
      }
      return Y.props = Z, Y.state = y, Y.context = A, e;
    }
    var uY, mY, yY, cY, sY, IB = function(J, Q) {
    };
    uY = false, mY = false, yY = {}, cY = {}, sY = {}, IB = function(J, Q) {
      if (J === null || typeof J !== "object")
        return;
      if (!J._store || J._store.validated || J.key != null)
        return;
      if (typeof J._store !== "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      J._store.validated = true;
      var X = q0(Q) || "Component";
      if (cY[X])
        return;
      cY[X] = true, U('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.');
    };
    function HZ(J, Q, X) {
      var Z = X.ref;
      if (Z !== null && typeof Z !== "function" && typeof Z !== "object") {
        if ((J.mode & D1 || NJ) && !(X._owner && X._self && X._owner.stateNode !== X._self)) {
          var G = q0(J) || "Component";
          if (!yY[G])
            U('A string ref, "%s", has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', Z), yY[G] = true;
        }
        if (X._owner) {
          var Y = X._owner, W;
          if (Y) {
            var z = Y;
            if (z.tag !== h)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            W = z.stateNode;
          }
          if (!W)
            throw new Error("Missing owner for string ref " + Z + ". This error is likely caused by a bug in React. Please file an issue.");
          var K = W;
          SJ(Z, "ref");
          var V = "" + Z;
          if (Q !== null && Q.ref !== null && typeof Q.ref === "function" && Q.ref._stringRef === V)
            return Q.ref;
          var $ = function(A) {
            var q = K.refs;
            if (q === qB)
              q = K.refs = {};
            if (A === null)
              delete q[V];
            else
              q[V] = A;
          };
          return $._stringRef = V, $;
        } else {
          if (typeof Z !== "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!X._owner)
            throw new Error("Element ref was specified as a string (" + Z + ") but no owner was set. This could happen for one of the following reasons:\n1. You may be adding a ref to a function component\n2. You may be adding a ref to a component that was not created inside a component's render method\n3. You have multiple copies of React loaded\nSee https://reactjs.org/link/refs-must-have-owner for more information.");
        }
      }
      return Z;
    }
    function O6(J, Q) {
      var X = Object.prototype.toString.call(Q);
      throw new Error("Objects are not valid as a React child (found: " + (X === "[object Object]" ? "object with keys {" + Object.keys(Q).join(", ") + "}" : X) + "). If you meant to render a collection of children, use an array instead.");
    }
    function M6(J) {
      {
        var Q = q0(J) || "Component";
        if (sY[Q])
          return;
        sY[Q] = true, U("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function RB(J) {
      var { _payload: Q, _init: X } = J;
      return X(Q);
    }
    function LB(J) {
      function Q(P, N) {
        if (!J)
          return;
        var F = P.deletions;
        if (F === null)
          P.deletions = [N], P.flags |= MQ;
        else
          F.push(N);
      }
      function X(P, N) {
        if (!J)
          return null;
        var F = N;
        while (F !== null)
          Q(P, F), F = F.sibling;
        return null;
      }
      function Z(P, N) {
        var F = new Map, g = N;
        while (g !== null) {
          if (g.key !== null)
            F.set(g.key, g);
          else
            F.set(g.index, g);
          g = g.sibling;
        }
        return F;
      }
      function G(P, N) {
        var F = cQ(P, N);
        return F.index = 0, F.sibling = null, F;
      }
      function Y(P, N, F) {
        if (P.index = F, !J)
          return P.flags |= $K, N;
        var g = P.alternate;
        if (g !== null) {
          var l = g.index;
          if (l < N)
            return P.flags |= F1, N;
          else
            return l;
        } else
          return P.flags |= F1, N;
      }
      function W(P) {
        if (J && P.alternate === null)
          P.flags |= F1;
        return P;
      }
      function z(P, N, F, g) {
        if (N === null || N.tag !== L0) {
          var l = Fz(F, P.mode, g);
          return l.return = P, l;
        } else {
          var u = G(N, F);
          return u.return = P, u;
        }
      }
      function K(P, N, F, g) {
        var l = F.type;
        if (l === x)
          return $(P, N, F.props.children, g, F.key);
        if (N !== null) {
          if (N.elementType === l || q$(N, F) || typeof l === "object" && l !== null && l.$$typeof === R0 && RB(l) === N.type) {
            var u = G(N, F.props);
            return u.ref = HZ(P, N, F), u.return = P, u._debugSource = F._source, u._debugOwner = F._owner, u;
          }
        }
        var W0 = Pz(F, P.mode, g);
        return W0.ref = HZ(P, N, F), W0.return = P, W0;
      }
      function V(P, N, F, g) {
        if (N === null || N.tag !== i || N.stateNode.containerInfo !== F.containerInfo || N.stateNode.implementation !== F.implementation) {
          var l = Dz(F, P.mode, g);
          return l.return = P, l;
        } else {
          var u = G(N, F.children || []);
          return u.return = P, u;
        }
      }
      function $(P, N, F, g, l) {
        if (N === null || N.tag !== w1) {
          var u = WQ(F, P.mode, g, l);
          return u.return = P, u;
        } else {
          var W0 = G(N, F);
          return W0.return = P, W0;
        }
      }
      function A(P, N, F) {
        if (typeof N === "string" && N !== "" || typeof N === "number") {
          var g = Fz("" + N, P.mode, F);
          return g.return = P, g;
        }
        if (typeof N === "object" && N !== null) {
          switch (N.$$typeof) {
            case h8: {
              var l = Pz(N, P.mode, F);
              return l.ref = HZ(P, null, N), l.return = P, l;
            }
            case M: {
              var u = Dz(N, P.mode, F);
              return u.return = P, u;
            }
            case R0: {
              var { _payload: W0, _init: H0 } = N;
              return A(P, H0(W0), F);
            }
          }
          if (N1(N) || JJ(N)) {
            var m0 = WQ(N, P.mode, F, null);
            return m0.return = P, m0;
          }
          O6(P, N);
        }
        if (typeof N === "function")
          M6(P);
        return null;
      }
      function q(P, N, F, g) {
        var l = N !== null ? N.key : null;
        if (typeof F === "string" && F !== "" || typeof F === "number") {
          if (l !== null)
            return null;
          return z(P, N, "" + F, g);
        }
        if (typeof F === "object" && F !== null) {
          switch (F.$$typeof) {
            case h8:
              if (F.key === l)
                return K(P, N, F, g);
              else
                return null;
            case M:
              if (F.key === l)
                return V(P, N, F, g);
              else
                return null;
            case R0: {
              var { _payload: u, _init: W0 } = F;
              return q(P, N, W0(u), g);
            }
          }
          if (N1(F) || JJ(F)) {
            if (l !== null)
              return null;
            return $(P, N, F, g, null);
          }
          O6(P, F);
        }
        if (typeof F === "function")
          M6(P);
        return null;
      }
      function I(P, N, F, g, l) {
        if (typeof g === "string" && g !== "" || typeof g === "number") {
          var u = P.get(F) || null;
          return z(N, u, "" + g, l);
        }
        if (typeof g === "object" && g !== null) {
          switch (g.$$typeof) {
            case h8: {
              var W0 = P.get(g.key === null ? F : g.key) || null;
              return K(N, W0, g, l);
            }
            case M: {
              var H0 = P.get(g.key === null ? F : g.key) || null;
              return V(N, H0, g, l);
            }
            case R0:
              var { _payload: m0, _init: v0 } = g;
              return I(P, N, F, v0(m0), l);
          }
          if (N1(g) || JJ(g)) {
            var O1 = P.get(F) || null;
            return $(N, O1, g, l, null);
          }
          O6(N, g);
        }
        if (typeof g === "function")
          M6(N);
        return null;
      }
      function E(P, N, F) {
        {
          if (typeof P !== "object" || P === null)
            return N;
          switch (P.$$typeof) {
            case h8:
            case M:
              IB(P, F);
              var g = P.key;
              if (typeof g !== "string")
                break;
              if (N === null) {
                N = new Set, N.add(g);
                break;
              }
              if (!N.has(g)) {
                N.add(g);
                break;
              }
              U("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be " + "duplicated and/or omitted \u2014 the behavior is unsupported and " + "could change in a future version.", g);
              break;
            case R0:
              var { _payload: l, _init: u } = P;
              E(u(l), N, F);
              break;
          }
        }
        return N;
      }
      function R(P, N, F, g) {
        {
          var l = null;
          for (var u = 0;u < F.length; u++) {
            var W0 = F[u];
            l = E(W0, l, P);
          }
        }
        var H0 = null, m0 = null, v0 = N, O1 = 0, C0 = 0, U1 = null;
        for (;v0 !== null && C0 < F.length; C0++) {
          if (v0.index > C0)
            U1 = v0, v0 = null;
          else
            U1 = v0.sibling;
          var O7 = q(P, v0, F[C0], g);
          if (O7 === null) {
            if (v0 === null)
              v0 = U1;
            break;
          }
          if (J) {
            if (v0 && O7.alternate === null)
              Q(P, v0);
          }
          if (O1 = Y(O7, O1, C0), m0 === null)
            H0 = O7;
          else
            m0.sibling = O7;
          m0 = O7, v0 = U1;
        }
        if (C0 === F.length) {
          if (X(P, v0), n1()) {
            var Z7 = C0;
            xQ(P, Z7);
          }
          return H0;
        }
        if (v0 === null) {
          for (;C0 < F.length; C0++) {
            var a7 = A(P, F[C0], g);
            if (a7 === null)
              continue;
            if (O1 = Y(a7, O1, C0), m0 === null)
              H0 = a7;
            else
              m0.sibling = a7;
            m0 = a7;
          }
          if (n1()) {
            var N7 = C0;
            xQ(P, N7);
          }
          return H0;
        }
        var S7 = Z(P, v0);
        for (;C0 < F.length; C0++) {
          var M7 = I(S7, P, C0, F[C0], g);
          if (M7 !== null) {
            if (J) {
              if (M7.alternate !== null)
                S7.delete(M7.key === null ? C0 : M7.key);
            }
            if (O1 = Y(M7, O1, C0), m0 === null)
              H0 = M7;
            else
              m0.sibling = M7;
            m0 = M7;
          }
        }
        if (J)
          S7.forEach(function(n5) {
            return Q(P, n5);
          });
        if (n1()) {
          var RJ = C0;
          xQ(P, RJ);
        }
        return H0;
      }
      function y(P, N, F, g) {
        var l = JJ(F);
        if (typeof l !== "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          if (typeof Symbol === "function" && F[Symbol.toStringTag] === "Generator") {
            if (!mY)
              U("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers.");
            mY = true;
          }
          if (F.entries === l) {
            if (!uY)
              U("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
            uY = true;
          }
          var u = l.call(F);
          if (u) {
            var W0 = null, H0 = u.next();
            for (;!H0.done; H0 = u.next()) {
              var m0 = H0.value;
              W0 = E(m0, W0, P);
            }
          }
        }
        var v0 = l.call(F);
        if (v0 == null)
          throw new Error("An iterable object provided no iterator.");
        var O1 = null, C0 = null, U1 = N, O7 = 0, Z7 = 0, a7 = null, N7 = v0.next();
        for (;U1 !== null && !N7.done; Z7++, N7 = v0.next()) {
          if (U1.index > Z7)
            a7 = U1, U1 = null;
          else
            a7 = U1.sibling;
          var S7 = q(P, U1, N7.value, g);
          if (S7 === null) {
            if (U1 === null)
              U1 = a7;
            break;
          }
          if (J) {
            if (U1 && S7.alternate === null)
              Q(P, U1);
          }
          if (O7 = Y(S7, O7, Z7), C0 === null)
            O1 = S7;
          else
            C0.sibling = S7;
          C0 = S7, U1 = a7;
        }
        if (N7.done) {
          if (X(P, U1), n1()) {
            var M7 = Z7;
            xQ(P, M7);
          }
          return O1;
        }
        if (U1 === null) {
          for (;!N7.done; Z7++, N7 = v0.next()) {
            var RJ = A(P, N7.value, g);
            if (RJ === null)
              continue;
            if (O7 = Y(RJ, O7, Z7), C0 === null)
              O1 = RJ;
            else
              C0.sibling = RJ;
            C0 = RJ;
          }
          if (n1()) {
            var n5 = Z7;
            xQ(P, n5);
          }
          return O1;
        }
        var cZ = Z(P, U1);
        for (;!N7.done; Z7++, N7 = v0.next()) {
          var n8 = I(cZ, P, Z7, N7.value, g);
          if (n8 !== null) {
            if (J) {
              if (n8.alternate !== null)
                cZ.delete(n8.key === null ? Z7 : n8.key);
            }
            if (O7 = Y(n8, O7, Z7), C0 === null)
              O1 = n8;
            else
              C0.sibling = n8;
            C0 = n8;
          }
        }
        if (J)
          cZ.forEach(function(xE) {
            return Q(P, xE);
          });
        if (n1()) {
          var jE = Z7;
          xQ(P, jE);
        }
        return O1;
      }
      function e(P, N, F, g) {
        if (N !== null && N.tag === L0) {
          X(P, N.sibling);
          var l = G(N, F);
          return l.return = P, l;
        }
        X(P, N);
        var u = Fz(F, P.mode, g);
        return u.return = P, u;
      }
      function o(P, N, F, g) {
        var l = F.key, u = N;
        while (u !== null) {
          if (u.key === l) {
            var W0 = F.type;
            if (W0 === x) {
              if (u.tag === w1) {
                X(P, u.sibling);
                var H0 = G(u, F.props.children);
                return H0.return = P, H0._debugSource = F._source, H0._debugOwner = F._owner, H0;
              }
            } else if (u.elementType === W0 || q$(u, F) || typeof W0 === "object" && W0 !== null && W0.$$typeof === R0 && RB(W0) === u.type) {
              X(P, u.sibling);
              var m0 = G(u, F.props);
              return m0.ref = HZ(P, u, F), m0.return = P, m0._debugSource = F._source, m0._debugOwner = F._owner, m0;
            }
            X(P, u);
            break;
          } else
            Q(P, u);
          u = u.sibling;
        }
        if (F.type === x) {
          var v0 = WQ(F.props.children, P.mode, g, F.key);
          return v0.return = P, v0;
        } else {
          var O1 = Pz(F, P.mode, g);
          return O1.ref = HZ(P, N, F), O1.return = P, O1;
        }
      }
      function w0(P, N, F, g) {
        var l = F.key, u = N;
        while (u !== null) {
          if (u.key === l)
            if (u.tag === i && u.stateNode.containerInfo === F.containerInfo && u.stateNode.implementation === F.implementation) {
              X(P, u.sibling);
              var W0 = G(u, F.children || []);
              return W0.return = P, W0;
            } else {
              X(P, u);
              break;
            }
          else
            Q(P, u);
          u = u.sibling;
        }
        var H0 = Dz(F, P.mode, g);
        return H0.return = P, H0;
      }
      function I0(P, N, F, g) {
        var l = typeof F === "object" && F !== null && F.type === x && F.key === null;
        if (l)
          F = F.props.children;
        if (typeof F === "object" && F !== null) {
          switch (F.$$typeof) {
            case h8:
              return W(o(P, N, F, g));
            case M:
              return W(w0(P, N, F, g));
            case R0:
              var { _payload: u, _init: W0 } = F;
              return I0(P, N, W0(u), g);
          }
          if (N1(F))
            return R(P, N, F, g);
          if (JJ(F))
            return y(P, N, F, g);
          O6(P, F);
        }
        if (typeof F === "string" && F !== "" || typeof F === "number")
          return W(e(P, N, "" + F, g));
        if (typeof F === "function")
          M6(P);
        return X(P, N);
      }
      return I0;
    }
    var T5 = LB(true), NB = LB(false);
    function HP(J, Q) {
      if (J !== null && Q.child !== J.child)
        throw new Error("Resuming work not yet implemented.");
      if (Q.child === null)
        return;
      var X = Q.child, Z = cQ(X, X.pendingProps);
      Q.child = Z, Z.return = Q;
      while (X.sibling !== null)
        X = X.sibling, Z = Z.sibling = cQ(X, X.pendingProps), Z.return = Q;
      Z.sibling = null;
    }
    function OP(J, Q) {
      var X = J.child;
      while (X !== null)
        pD(X, Q), X = X.sibling;
    }
    var OZ = {}, oJ = iJ(OZ), MZ = iJ(OZ), q6 = iJ(OZ);
    function A6(J) {
      if (J === OZ)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return J;
    }
    function SB() {
      var J = A6(q6.current);
      return J;
    }
    function lY(J, Q) {
      U7(q6, Q, J), U7(MZ, J, J), U7(oJ, OZ, J);
      var X = _q(Q);
      $7(oJ, J), U7(oJ, X, J);
    }
    function k5(J) {
      $7(oJ, J), $7(MZ, J), $7(q6, J);
    }
    function iY() {
      var J = A6(oJ.current);
      return J;
    }
    function _B(J) {
      var Q = A6(q6.current), X = A6(oJ.current), Z = jq(X, J.type);
      if (X === Z)
        return;
      U7(MZ, J, J), U7(oJ, Z, J);
    }
    function pY(J) {
      if (MZ.current !== J)
        return;
      $7(oJ, J), $7(MZ, J);
    }
    var MP = 0, jB = 1, xB = 1, qZ = 2, L8 = iJ(MP);
    function aY(J, Q) {
      return (J & Q) !== 0;
    }
    function h5(J) {
      return J & jB;
    }
    function rY(J, Q) {
      return J & jB | Q;
    }
    function qP(J, Q) {
      return J | Q;
    }
    function tJ(J, Q) {
      U7(L8, Q, J);
    }
    function b5(J) {
      $7(L8, J);
    }
    function AP(J, Q) {
      var X = J.memoizedState;
      if (X !== null) {
        if (X.dehydrated !== null)
          return true;
        return false;
      }
      var Z = J.memoizedProps;
      return true;
    }
    function P6(J) {
      var Q = J;
      while (Q !== null) {
        if (Q.tag === E0) {
          var X = Q.memoizedState;
          if (X !== null) {
            var Z = X.dehydrated;
            if (Z === null || d3(Z) || XY(Z))
              return Q;
          }
        } else if (Q.tag === R1 && Q.memoizedProps.revealOrder !== undefined) {
          var G = (Q.flags & k0) !== X0;
          if (G)
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
    var T7 = 0, S1 = 1, c8 = 2, _1 = 4, o1 = 8, nY = [];
    function oY() {
      for (var J = 0;J < nY.length; J++) {
        var Q = nY[J];
        Q._workInProgressVersionPrimary = null;
      }
      nY.length = 0;
    }
    function PP(J, Q) {
      var X = Q._getVersion, Z = X(Q._source);
      if (J.mutableSourceEagerHydrationData == null)
        J.mutableSourceEagerHydrationData = [Q, Z];
      else
        J.mutableSourceEagerHydrationData.push(Q, Z);
    }
    var { ReactCurrentDispatcher: c, ReactCurrentBatchConfig: AZ } = S, tY, f5;
    tY = new Set;
    var hQ = j, u0 = null, j1 = null, x1 = null, F6 = false, PZ = false, FZ = 0, FP = 0, DP = 25, _ = null, K8 = null, eJ = -1, eY = false;
    function b0() {
      {
        var J = _;
        if (K8 === null)
          K8 = [J];
        else
          K8.push(J);
      }
    }
    function b() {
      {
        var J = _;
        if (K8 !== null) {
          if (eJ++, K8[eJ] !== J)
            EP(J);
        }
      }
    }
    function d5(J) {
      if (J !== undefined && J !== null && !N1(J))
        U("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", _, typeof J);
    }
    function EP(J) {
      {
        var Q = q0(u0);
        if (!tY.has(Q)) {
          if (tY.add(Q), K8 !== null) {
            var X = "", Z = 30;
            for (var G = 0;G <= eJ; G++) {
              var Y = K8[G], W = G === eJ ? J : Y, z = G + 1 + ". " + Y;
              while (z.length < Z)
                z += " ";
              z += W + "\n", X += z;
            }
            U("React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks\n\n   Previous render            Next render\n   ------------------------------------------------------\n%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n", Q, X);
          }
        }
      }
    }
    function H7() {
      throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
    }
    function JW(J, Q) {
      if (eY)
        return false;
      if (Q === null)
        return U("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", _), false;
      if (J.length !== Q.length)
        U("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", _, "[" + Q.join(", ") + "]", "[" + J.join(", ") + "]");
      for (var X = 0;X < Q.length && X < J.length; X++) {
        if (l7(J[X], Q[X]))
          continue;
        return false;
      }
      return true;
    }
    function u5(J, Q, X, Z, G, Y) {
      if (hQ = Y, u0 = Q, K8 = J !== null ? J._debugHookTypes : null, eJ = -1, eY = J !== null && J.type !== Q.type, Q.memoizedState = null, Q.updateQueue = null, Q.lanes = j, J !== null && J.memoizedState !== null)
        c.current = tB;
      else if (K8 !== null)
        c.current = oB;
      else
        c.current = nB;
      var W = X(Z, G);
      if (PZ) {
        var z = 0;
        do {
          if (PZ = false, FZ = 0, z >= DP)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          z += 1, eY = false, j1 = null, x1 = null, Q.updateQueue = null, eJ = -1, c.current = eB, W = X(Z, G);
        } while (PZ);
      }
      c.current = T6, Q._debugHookTypes = K8;
      var K = j1 !== null && j1.next !== null;
      if (hQ = j, u0 = null, j1 = null, x1 = null, _ = null, K8 = null, eJ = -1, J !== null && (J.flags & BJ) !== (Q.flags & BJ) && (J.mode & N0) !== Z0)
        U("Internal React error: Expected static flag was missing. Please notify the React team.");
      if (F6 = false, K)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return W;
    }
    function m5() {
      var J = FZ !== 0;
      return FZ = 0, J;
    }
    function gB(J, Q, X) {
      if (Q.updateQueue = J.updateQueue, (Q.mode & d8) !== Z0)
        Q.flags &= ~($9 | KJ | P8 | x0);
      else
        Q.flags &= ~(P8 | x0);
      J.lanes = P9(J.lanes, X);
    }
    function vB() {
      if (c.current = T6, F6) {
        var J = u0.memoizedState;
        while (J !== null) {
          var Q = J.queue;
          if (Q !== null)
            Q.pending = null;
          J = J.next;
        }
        F6 = false;
      }
      hQ = j, u0 = null, j1 = null, x1 = null, K8 = null, eJ = -1, _ = null, lB = false, PZ = false, FZ = 0;
    }
    function s8() {
      var J = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
      if (x1 === null)
        u0.memoizedState = x1 = J;
      else
        x1 = x1.next = J;
      return x1;
    }
    function B8() {
      var J;
      if (j1 === null) {
        var Q = u0.alternate;
        if (Q !== null)
          J = Q.memoizedState;
        else
          J = null;
      } else
        J = j1.next;
      var X;
      if (x1 === null)
        X = u0.memoizedState;
      else
        X = x1.next;
      if (X !== null)
        x1 = X, X = x1.next, j1 = J;
      else {
        if (J === null)
          throw new Error("Rendered more hooks than during the previous render.");
        j1 = J;
        var Z = { memoizedState: j1.memoizedState, baseState: j1.baseState, baseQueue: j1.baseQueue, queue: j1.queue, next: null };
        if (x1 === null)
          u0.memoizedState = x1 = Z;
        else
          x1 = x1.next = Z;
      }
      return x1;
    }
    function CB() {
      return { lastEffect: null, stores: null };
    }
    function QW(J, Q) {
      return typeof Q === "function" ? Q(J) : Q;
    }
    function XW(J, Q, X) {
      var Z = s8(), G;
      if (X !== undefined)
        G = X(Q);
      else
        G = Q;
      Z.memoizedState = Z.baseState = G;
      var Y = { pending: null, interleaved: null, lanes: j, dispatch: null, lastRenderedReducer: J, lastRenderedState: G };
      Z.queue = Y;
      var W = Y.dispatch = RP.bind(null, u0, Y);
      return [Z.memoizedState, W];
    }
    function ZW(J, Q, X) {
      var Z = B8(), G = Z.queue;
      if (G === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      G.lastRenderedReducer = J;
      var Y = j1, W = Y.baseQueue, z = G.pending;
      if (z !== null) {
        if (W !== null) {
          var K = W.next, V = z.next;
          W.next = V, z.next = K;
        }
        if (Y.baseQueue !== W)
          U("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React.");
        Y.baseQueue = W = z, G.pending = null;
      }
      if (W !== null) {
        var $ = W.next, A = Y.baseState, q = null, I = null, E = null, R = $;
        do {
          var y = R.lane;
          if (!A5(hQ, y)) {
            var e = { lane: y, action: R.action, hasEagerState: R.hasEagerState, eagerState: R.eagerState, next: null };
            if (E === null)
              I = E = e, q = A;
            else
              E = E.next = e;
            u0.lanes = F0(u0.lanes, y), fZ(y);
          } else {
            if (E !== null) {
              var o = { lane: m1, action: R.action, hasEagerState: R.hasEagerState, eagerState: R.eagerState, next: null };
              E = E.next = o;
            }
            if (R.hasEagerState)
              A = R.eagerState;
            else {
              var w0 = R.action;
              A = J(A, w0);
            }
          }
          R = R.next;
        } while (R !== null && R !== $);
        if (E === null)
          q = A;
        else
          E.next = I;
        if (!l7(A, Z.memoizedState))
          NZ();
        Z.memoizedState = A, Z.baseState = q, Z.baseQueue = E, G.lastRenderedState = A;
      }
      var I0 = G.interleaved;
      if (I0 !== null) {
        var P = I0;
        do {
          var N = P.lane;
          u0.lanes = F0(u0.lanes, N), fZ(N), P = P.next;
        } while (P !== I0);
      } else if (W === null)
        G.lanes = j;
      var F = G.dispatch;
      return [Z.memoizedState, F];
    }
    function GW(J, Q, X) {
      var Z = B8(), G = Z.queue;
      if (G === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      G.lastRenderedReducer = J;
      var { dispatch: Y, pending: W } = G, z = Z.memoizedState;
      if (W !== null) {
        G.pending = null;
        var K = W.next, V = K;
        do {
          var $ = V.action;
          z = J(z, $), V = V.next;
        } while (V !== K);
        if (!l7(z, Z.memoizedState))
          NZ();
        if (Z.memoizedState = z, Z.baseQueue === null)
          Z.baseState = z;
        G.lastRenderedState = z;
      }
      return [z, Y];
    }
    function YW(J, Q, X) {
      return;
    }
    function D6(J, Q, X) {
      return;
    }
    function WW(J, Q, X) {
      var Z = u0, G = s8(), Y, W = n1();
      if (W) {
        if (X === undefined)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        if (Y = X(), !f5) {
          if (Y !== X())
            U("The result of getServerSnapshot should be cached to avoid an infinite loop"), f5 = true;
        }
      } else {
        if (Y = Q(), !f5) {
          var z = Q();
          if (!l7(Y, z))
            U("The result of getSnapshot should be cached to avoid an infinite loop"), f5 = true;
        }
        var K = t6();
        if (K === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        if (!A9(K, hQ))
          TB(Z, Q, Y);
      }
      G.memoizedState = Y;
      var V = { value: Y, getSnapshot: Q };
      return G.queue = V, L6(hB.bind(null, Z, V, J), [J]), Z.flags |= P8, DZ(S1 | o1, kB.bind(null, Z, V, Y, Q), undefined, null), Y;
    }
    function E6(J, Q, X) {
      var Z = u0, G = B8(), Y = Q();
      if (!f5) {
        var W = Q();
        if (!l7(Y, W))
          U("The result of getSnapshot should be cached to avoid an infinite loop"), f5 = true;
      }
      var z = G.memoizedState, K = !l7(z, Y);
      if (K)
        G.memoizedState = Y, NZ();
      var V = G.queue;
      if (wZ(hB.bind(null, Z, V, J), [J]), V.getSnapshot !== Q || K || x1 !== null && x1.memoizedState.tag & S1) {
        Z.flags |= P8, DZ(S1 | o1, kB.bind(null, Z, V, Y, Q), undefined, null);
        var $ = t6();
        if ($ === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        if (!A9($, hQ))
          TB(Z, Q, Y);
      }
      return Y;
    }
    function TB(J, Q, X) {
      J.flags |= V9;
      var Z = { getSnapshot: Q, value: X }, G = u0.updateQueue;
      if (G === null)
        G = CB(), u0.updateQueue = G, G.stores = [Z];
      else {
        var Y = G.stores;
        if (Y === null)
          G.stores = [Z];
        else
          Y.push(Z);
      }
    }
    function kB(J, Q, X, Z) {
      if (Q.value = X, Q.getSnapshot = Z, bB(Q))
        fB(J);
    }
    function hB(J, Q, X) {
      var Z = function() {
        if (bB(Q))
          fB(J);
      };
      return X(Z);
    }
    function bB(J) {
      var { getSnapshot: Q, value: X } = J;
      try {
        var Z = Q();
        return !l7(X, Z);
      } catch (G) {
        return true;
      }
    }
    function fB(J) {
      var Q = C7(J, B0);
      if (Q !== null)
        T1(Q, J, B0, X1);
    }
    function w6(J) {
      var Q = s8();
      if (typeof J === "function")
        J = J();
      Q.memoizedState = Q.baseState = J;
      var X = { pending: null, interleaved: null, lanes: j, dispatch: null, lastRenderedReducer: QW, lastRenderedState: J };
      Q.queue = X;
      var Z = X.dispatch = LP.bind(null, u0, X);
      return [Q.memoizedState, Z];
    }
    function zW(J) {
      return ZW(QW);
    }
    function KW(J) {
      return GW(QW);
    }
    function DZ(J, Q, X, Z) {
      var G = { tag: J, create: Q, destroy: X, deps: Z, next: null }, Y = u0.updateQueue;
      if (Y === null)
        Y = CB(), u0.updateQueue = Y, Y.lastEffect = G.next = G;
      else {
        var W = Y.lastEffect;
        if (W === null)
          Y.lastEffect = G.next = G;
        else {
          var z = W.next;
          W.next = G, G.next = z, Y.lastEffect = G;
        }
      }
      return G;
    }
    function BW(J) {
      var Q = s8();
      {
        var X = { current: J };
        return Q.memoizedState = X, X;
      }
    }
    function I6(J) {
      var Q = B8();
      return Q.memoizedState;
    }
    function EZ(J, Q, X, Z) {
      var G = s8(), Y = Z === undefined ? null : Z;
      u0.flags |= J, G.memoizedState = DZ(S1 | Q, X, undefined, Y);
    }
    function R6(J, Q, X, Z) {
      var G = B8(), Y = Z === undefined ? null : Z, W = undefined;
      if (j1 !== null) {
        var z = j1.memoizedState;
        if (W = z.destroy, Y !== null) {
          var K = z.deps;
          if (JW(Y, K)) {
            G.memoizedState = DZ(Q, X, W, Y);
            return;
          }
        }
      }
      u0.flags |= J, G.memoizedState = DZ(S1 | Q, X, W, Y);
    }
    function L6(J, Q) {
      if ((u0.mode & d8) !== Z0)
        return EZ($9 | P8 | p4, o1, J, Q);
      else
        return EZ(P8 | p4, o1, J, Q);
    }
    function wZ(J, Q) {
      return R6(P8, o1, J, Q);
    }
    function VW(J, Q) {
      return EZ(x0, c8, J, Q);
    }
    function N6(J, Q) {
      return R6(x0, c8, J, Q);
    }
    function $W(J, Q) {
      var X = x0;
      if (X |= PQ, (u0.mode & d8) !== Z0)
        X |= KJ;
      return EZ(X, _1, J, Q);
    }
    function S6(J, Q) {
      return R6(x0, _1, J, Q);
    }
    function dB(J, Q) {
      if (typeof Q === "function") {
        var X = Q, Z = J();
        return X(Z), function() {
          X(null);
        };
      } else if (Q !== null && Q !== undefined) {
        var G = Q;
        if (!G.hasOwnProperty("current"))
          U("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(G).join(", ") + "}");
        var Y = J();
        return G.current = Y, function() {
          G.current = null;
        };
      }
    }
    function UW(J, Q, X) {
      if (typeof Q !== "function")
        U("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", Q !== null ? typeof Q : "null");
      var Z = X !== null && X !== undefined ? X.concat([J]) : null, G = x0;
      if (G |= PQ, (u0.mode & d8) !== Z0)
        G |= KJ;
      return EZ(G, _1, dB.bind(null, Q, J), Z);
    }
    function _6(J, Q, X) {
      if (typeof Q !== "function")
        U("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", Q !== null ? typeof Q : "null");
      var Z = X !== null && X !== undefined ? X.concat([J]) : null;
      return R6(x0, _1, dB.bind(null, Q, J), Z);
    }
    function j6(J, Q) {
    }
    var x6 = j6;
    function HW(J, Q) {
      var X = s8(), Z = Q === undefined ? null : Q;
      return X.memoizedState = [J, Z], J;
    }
    function g6(J, Q) {
      var X = B8(), Z = Q === undefined ? null : Q, G = X.memoizedState;
      if (G !== null) {
        if (Z !== null) {
          var Y = G[1];
          if (JW(Z, Y))
            return G[0];
        }
      }
      return X.memoizedState = [J, Z], J;
    }
    function OW(J, Q) {
      var X = s8(), Z = Q === undefined ? null : Q, G = J();
      return X.memoizedState = [G, Z], G;
    }
    function v6(J, Q) {
      var X = B8(), Z = Q === undefined ? null : Q, G = X.memoizedState;
      if (G !== null) {
        if (Z !== null) {
          var Y = G[1];
          if (JW(Z, Y))
            return G[0];
        }
      }
      var W = J();
      return X.memoizedState = [W, Z], W;
    }
    function MW(J) {
      var Q = s8();
      return Q.memoizedState = J, J;
    }
    function uB(J) {
      var Q = B8(), X = j1, Z = X.memoizedState;
      return yB(Q, Z, J);
    }
    function mB(J) {
      var Q = B8();
      if (j1 === null)
        return Q.memoizedState = J, J;
      else {
        var X = j1.memoizedState;
        return yB(Q, X, J);
      }
    }
    function yB(J, Q, X) {
      var Z = !GO(hQ);
      if (Z) {
        if (!l7(X, Q)) {
          var G = xK();
          u0.lanes = F0(u0.lanes, G), fZ(G), J.baseState = true;
        }
        return Q;
      } else {
        if (J.baseState)
          J.baseState = false, NZ();
        return J.memoizedState = X, X;
      }
    }
    function wP(J, Q, X) {
      var Z = D8();
      y1(HO(Z, $J)), J(true);
      var G = AZ.transition;
      AZ.transition = {};
      var Y = AZ.transition;
      AZ.transition._updatedFibers = new Set;
      try {
        J(false), Q();
      } finally {
        if (y1(Z), AZ.transition = G, G === null && Y._updatedFibers) {
          var W = Y._updatedFibers.size;
          if (W > 10)
            s("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
          Y._updatedFibers.clear();
        }
      }
    }
    function qW() {
      var J = w6(false), Q = J[0], X = J[1], Z = wP.bind(null, X), G = s8();
      return G.memoizedState = Z, [Q, Z];
    }
    function cB() {
      var J = zW(), Q = J[0], X = B8(), Z = X.memoizedState;
      return [Q, Z];
    }
    function sB() {
      var J = KW(), Q = J[0], X = B8(), Z = X.memoizedState;
      return [Q, Z];
    }
    var lB = false;
    function IP() {
      return lB;
    }
    function AW() {
      var J = s8(), Q = t6(), X = Q.identifierPrefix, Z;
      if (n1()) {
        var G = fA();
        Z = ":" + X + "R" + G;
        var Y = FZ++;
        if (Y > 0)
          Z += "H" + Y.toString(32);
        Z += ":";
      } else {
        var W = FP++;
        Z = ":" + X + "r" + W.toString(32) + ":";
      }
      return J.memoizedState = Z, Z;
    }
    function C6() {
      var J = B8(), Q = J.memoizedState;
      return Q;
    }
    function RP(J, Q, X) {
      if (typeof arguments[3] === "function")
        U("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var Z = GQ(J), G = { lane: Z, action: X, hasEagerState: false, eagerState: null, next: null };
      if (iB(J))
        pB(Q, G);
      else {
        var Y = VB(J, Q, G, Z);
        if (Y !== null) {
          var W = L7();
          T1(Y, J, Z, W), aB(Y, Q, Z);
        }
      }
      rB(J, Z);
    }
    function LP(J, Q, X) {
      if (typeof arguments[3] === "function")
        U("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var Z = GQ(J), G = { lane: Z, action: X, hasEagerState: false, eagerState: null, next: null };
      if (iB(J))
        pB(Q, G);
      else {
        var Y = J.alternate;
        if (J.lanes === j && (Y === null || Y.lanes === j)) {
          var W = Q.lastRenderedReducer;
          if (W !== null) {
            var z;
            z = c.current, c.current = N8;
            try {
              var K = Q.lastRenderedState, V = W(K, X);
              if (G.hasEagerState = true, G.eagerState = V, l7(V, K)) {
                GP(J, Q, G, Z);
                return;
              }
            } catch (q) {
            } finally {
              c.current = z;
            }
          }
        }
        var $ = VB(J, Q, G, Z);
        if ($ !== null) {
          var A = L7();
          T1($, J, Z, A), aB($, Q, Z);
        }
      }
      rB(J, Z);
    }
    function iB(J) {
      var Q = J.alternate;
      return J === u0 || Q !== null && Q === u0;
    }
    function pB(J, Q) {
      PZ = F6 = true;
      var X = J.pending;
      if (X === null)
        Q.next = Q;
      else
        Q.next = X.next, X.next = Q;
      J.pending = Q;
    }
    function aB(J, Q, X) {
      if (jK(X)) {
        var Z = Q.lanes;
        Z = gK(Z, J.pendingLanes);
        var G = F0(Z, X);
        Q.lanes = G, IG(J, G);
      }
    }
    function rB(J, Q, X) {
      t4(J, Q);
    }
    var T6 = { readContext: E1, useCallback: H7, useContext: H7, useEffect: H7, useImperativeHandle: H7, useInsertionEffect: H7, useLayoutEffect: H7, useMemo: H7, useReducer: H7, useRef: H7, useState: H7, useDebugValue: H7, useDeferredValue: H7, useTransition: H7, useMutableSource: H7, useSyncExternalStore: H7, useId: H7, unstable_isNewReconciler: c1 }, nB = null, oB = null, tB = null, eB = null, l8 = null, N8 = null, k6 = null;
    {
      var PW = function() {
        U("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, V0 = function() {
        U("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      nB = { readContext: function(J) {
        return E1(J);
      }, useCallback: function(J, Q) {
        return _ = "useCallback", b0(), d5(Q), HW(J, Q);
      }, useContext: function(J) {
        return _ = "useContext", b0(), E1(J);
      }, useEffect: function(J, Q) {
        return _ = "useEffect", b0(), d5(Q), L6(J, Q);
      }, useImperativeHandle: function(J, Q, X) {
        return _ = "useImperativeHandle", b0(), d5(X), UW(J, Q, X);
      }, useInsertionEffect: function(J, Q) {
        return _ = "useInsertionEffect", b0(), d5(Q), VW(J, Q);
      }, useLayoutEffect: function(J, Q) {
        return _ = "useLayoutEffect", b0(), d5(Q), $W(J, Q);
      }, useMemo: function(J, Q) {
        _ = "useMemo", b0(), d5(Q);
        var X = c.current;
        c.current = l8;
        try {
          return OW(J, Q);
        } finally {
          c.current = X;
        }
      }, useReducer: function(J, Q, X) {
        _ = "useReducer", b0();
        var Z = c.current;
        c.current = l8;
        try {
          return XW(J, Q, X);
        } finally {
          c.current = Z;
        }
      }, useRef: function(J) {
        return _ = "useRef", b0(), BW(J);
      }, useState: function(J) {
        _ = "useState", b0();
        var Q = c.current;
        c.current = l8;
        try {
          return w6(J);
        } finally {
          c.current = Q;
        }
      }, useDebugValue: function(J, Q) {
        return _ = "useDebugValue", b0(), j6();
      }, useDeferredValue: function(J) {
        return _ = "useDeferredValue", b0(), MW(J);
      }, useTransition: function() {
        return _ = "useTransition", b0(), qW();
      }, useMutableSource: function(J, Q, X) {
        return _ = "useMutableSource", b0(), YW();
      }, useSyncExternalStore: function(J, Q, X) {
        return _ = "useSyncExternalStore", b0(), WW(J, Q, X);
      }, useId: function() {
        return _ = "useId", b0(), AW();
      }, unstable_isNewReconciler: c1 }, oB = { readContext: function(J) {
        return E1(J);
      }, useCallback: function(J, Q) {
        return _ = "useCallback", b(), HW(J, Q);
      }, useContext: function(J) {
        return _ = "useContext", b(), E1(J);
      }, useEffect: function(J, Q) {
        return _ = "useEffect", b(), L6(J, Q);
      }, useImperativeHandle: function(J, Q, X) {
        return _ = "useImperativeHandle", b(), UW(J, Q, X);
      }, useInsertionEffect: function(J, Q) {
        return _ = "useInsertionEffect", b(), VW(J, Q);
      }, useLayoutEffect: function(J, Q) {
        return _ = "useLayoutEffect", b(), $W(J, Q);
      }, useMemo: function(J, Q) {
        _ = "useMemo", b();
        var X = c.current;
        c.current = l8;
        try {
          return OW(J, Q);
        } finally {
          c.current = X;
        }
      }, useReducer: function(J, Q, X) {
        _ = "useReducer", b();
        var Z = c.current;
        c.current = l8;
        try {
          return XW(J, Q, X);
        } finally {
          c.current = Z;
        }
      }, useRef: function(J) {
        return _ = "useRef", b(), BW(J);
      }, useState: function(J) {
        _ = "useState", b();
        var Q = c.current;
        c.current = l8;
        try {
          return w6(J);
        } finally {
          c.current = Q;
        }
      }, useDebugValue: function(J, Q) {
        return _ = "useDebugValue", b(), j6();
      }, useDeferredValue: function(J) {
        return _ = "useDeferredValue", b(), MW(J);
      }, useTransition: function() {
        return _ = "useTransition", b(), qW();
      }, useMutableSource: function(J, Q, X) {
        return _ = "useMutableSource", b(), YW();
      }, useSyncExternalStore: function(J, Q, X) {
        return _ = "useSyncExternalStore", b(), WW(J, Q, X);
      }, useId: function() {
        return _ = "useId", b(), AW();
      }, unstable_isNewReconciler: c1 }, tB = { readContext: function(J) {
        return E1(J);
      }, useCallback: function(J, Q) {
        return _ = "useCallback", b(), g6(J, Q);
      }, useContext: function(J) {
        return _ = "useContext", b(), E1(J);
      }, useEffect: function(J, Q) {
        return _ = "useEffect", b(), wZ(J, Q);
      }, useImperativeHandle: function(J, Q, X) {
        return _ = "useImperativeHandle", b(), _6(J, Q, X);
      }, useInsertionEffect: function(J, Q) {
        return _ = "useInsertionEffect", b(), N6(J, Q);
      }, useLayoutEffect: function(J, Q) {
        return _ = "useLayoutEffect", b(), S6(J, Q);
      }, useMemo: function(J, Q) {
        _ = "useMemo", b();
        var X = c.current;
        c.current = N8;
        try {
          return v6(J, Q);
        } finally {
          c.current = X;
        }
      }, useReducer: function(J, Q, X) {
        _ = "useReducer", b();
        var Z = c.current;
        c.current = N8;
        try {
          return ZW(J, Q, X);
        } finally {
          c.current = Z;
        }
      }, useRef: function(J) {
        return _ = "useRef", b(), I6();
      }, useState: function(J) {
        _ = "useState", b();
        var Q = c.current;
        c.current = N8;
        try {
          return zW(J);
        } finally {
          c.current = Q;
        }
      }, useDebugValue: function(J, Q) {
        return _ = "useDebugValue", b(), x6();
      }, useDeferredValue: function(J) {
        return _ = "useDeferredValue", b(), uB(J);
      }, useTransition: function() {
        return _ = "useTransition", b(), cB();
      }, useMutableSource: function(J, Q, X) {
        return _ = "useMutableSource", b(), D6();
      }, useSyncExternalStore: function(J, Q, X) {
        return _ = "useSyncExternalStore", b(), E6(J, Q);
      }, useId: function() {
        return _ = "useId", b(), C6();
      }, unstable_isNewReconciler: c1 }, eB = { readContext: function(J) {
        return E1(J);
      }, useCallback: function(J, Q) {
        return _ = "useCallback", b(), g6(J, Q);
      }, useContext: function(J) {
        return _ = "useContext", b(), E1(J);
      }, useEffect: function(J, Q) {
        return _ = "useEffect", b(), wZ(J, Q);
      }, useImperativeHandle: function(J, Q, X) {
        return _ = "useImperativeHandle", b(), _6(J, Q, X);
      }, useInsertionEffect: function(J, Q) {
        return _ = "useInsertionEffect", b(), N6(J, Q);
      }, useLayoutEffect: function(J, Q) {
        return _ = "useLayoutEffect", b(), S6(J, Q);
      }, useMemo: function(J, Q) {
        _ = "useMemo", b();
        var X = c.current;
        c.current = k6;
        try {
          return v6(J, Q);
        } finally {
          c.current = X;
        }
      }, useReducer: function(J, Q, X) {
        _ = "useReducer", b();
        var Z = c.current;
        c.current = k6;
        try {
          return GW(J, Q, X);
        } finally {
          c.current = Z;
        }
      }, useRef: function(J) {
        return _ = "useRef", b(), I6();
      }, useState: function(J) {
        _ = "useState", b();
        var Q = c.current;
        c.current = k6;
        try {
          return KW(J);
        } finally {
          c.current = Q;
        }
      }, useDebugValue: function(J, Q) {
        return _ = "useDebugValue", b(), x6();
      }, useDeferredValue: function(J) {
        return _ = "useDeferredValue", b(), mB(J);
      }, useTransition: function() {
        return _ = "useTransition", b(), sB();
      }, useMutableSource: function(J, Q, X) {
        return _ = "useMutableSource", b(), D6();
      }, useSyncExternalStore: function(J, Q, X) {
        return _ = "useSyncExternalStore", b(), E6(J, Q);
      }, useId: function() {
        return _ = "useId", b(), C6();
      }, unstable_isNewReconciler: c1 }, l8 = { readContext: function(J) {
        return PW(), E1(J);
      }, useCallback: function(J, Q) {
        return _ = "useCallback", V0(), b0(), HW(J, Q);
      }, useContext: function(J) {
        return _ = "useContext", V0(), b0(), E1(J);
      }, useEffect: function(J, Q) {
        return _ = "useEffect", V0(), b0(), L6(J, Q);
      }, useImperativeHandle: function(J, Q, X) {
        return _ = "useImperativeHandle", V0(), b0(), UW(J, Q, X);
      }, useInsertionEffect: function(J, Q) {
        return _ = "useInsertionEffect", V0(), b0(), VW(J, Q);
      }, useLayoutEffect: function(J, Q) {
        return _ = "useLayoutEffect", V0(), b0(), $W(J, Q);
      }, useMemo: function(J, Q) {
        _ = "useMemo", V0(), b0();
        var X = c.current;
        c.current = l8;
        try {
          return OW(J, Q);
        } finally {
          c.current = X;
        }
      }, useReducer: function(J, Q, X) {
        _ = "useReducer", V0(), b0();
        var Z = c.current;
        c.current = l8;
        try {
          return XW(J, Q, X);
        } finally {
          c.current = Z;
        }
      }, useRef: function(J) {
        return _ = "useRef", V0(), b0(), BW(J);
      }, useState: function(J) {
        _ = "useState", V0(), b0();
        var Q = c.current;
        c.current = l8;
        try {
          return w6(J);
        } finally {
          c.current = Q;
        }
      }, useDebugValue: function(J, Q) {
        return _ = "useDebugValue", V0(), b0(), j6();
      }, useDeferredValue: function(J) {
        return _ = "useDeferredValue", V0(), b0(), MW(J);
      }, useTransition: function() {
        return _ = "useTransition", V0(), b0(), qW();
      }, useMutableSource: function(J, Q, X) {
        return _ = "useMutableSource", V0(), b0(), YW();
      }, useSyncExternalStore: function(J, Q, X) {
        return _ = "useSyncExternalStore", V0(), b0(), WW(J, Q, X);
      }, useId: function() {
        return _ = "useId", V0(), b0(), AW();
      }, unstable_isNewReconciler: c1 }, N8 = { readContext: function(J) {
        return PW(), E1(J);
      }, useCallback: function(J, Q) {
        return _ = "useCallback", V0(), b(), g6(J, Q);
      }, useContext: function(J) {
        return _ = "useContext", V0(), b(), E1(J);
      }, useEffect: function(J, Q) {
        return _ = "useEffect", V0(), b(), wZ(J, Q);
      }, useImperativeHandle: function(J, Q, X) {
        return _ = "useImperativeHandle", V0(), b(), _6(J, Q, X);
      }, useInsertionEffect: function(J, Q) {
        return _ = "useInsertionEffect", V0(), b(), N6(J, Q);
      }, useLayoutEffect: function(J, Q) {
        return _ = "useLayoutEffect", V0(), b(), S6(J, Q);
      }, useMemo: function(J, Q) {
        _ = "useMemo", V0(), b();
        var X = c.current;
        c.current = N8;
        try {
          return v6(J, Q);
        } finally {
          c.current = X;
        }
      }, useReducer: function(J, Q, X) {
        _ = "useReducer", V0(), b();
        var Z = c.current;
        c.current = N8;
        try {
          return ZW(J, Q, X);
        } finally {
          c.current = Z;
        }
      }, useRef: function(J) {
        return _ = "useRef", V0(), b(), I6();
      }, useState: function(J) {
        _ = "useState", V0(), b();
        var Q = c.current;
        c.current = N8;
        try {
          return zW(J);
        } finally {
          c.current = Q;
        }
      }, useDebugValue: function(J, Q) {
        return _ = "useDebugValue", V0(), b(), x6();
      }, useDeferredValue: function(J) {
        return _ = "useDeferredValue", V0(), b(), uB(J);
      }, useTransition: function() {
        return _ = "useTransition", V0(), b(), cB();
      }, useMutableSource: function(J, Q, X) {
        return _ = "useMutableSource", V0(), b(), D6();
      }, useSyncExternalStore: function(J, Q, X) {
        return _ = "useSyncExternalStore", V0(), b(), E6(J, Q);
      }, useId: function() {
        return _ = "useId", V0(), b(), C6();
      }, unstable_isNewReconciler: c1 }, k6 = { readContext: function(J) {
        return PW(), E1(J);
      }, useCallback: function(J, Q) {
        return _ = "useCallback", V0(), b(), g6(J, Q);
      }, useContext: function(J) {
        return _ = "useContext", V0(), b(), E1(J);
      }, useEffect: function(J, Q) {
        return _ = "useEffect", V0(), b(), wZ(J, Q);
      }, useImperativeHandle: function(J, Q, X) {
        return _ = "useImperativeHandle", V0(), b(), _6(J, Q, X);
      }, useInsertionEffect: function(J, Q) {
        return _ = "useInsertionEffect", V0(), b(), N6(J, Q);
      }, useLayoutEffect: function(J, Q) {
        return _ = "useLayoutEffect", V0(), b(), S6(J, Q);
      }, useMemo: function(J, Q) {
        _ = "useMemo", V0(), b();
        var X = c.current;
        c.current = N8;
        try {
          return v6(J, Q);
        } finally {
          c.current = X;
        }
      }, useReducer: function(J, Q, X) {
        _ = "useReducer", V0(), b();
        var Z = c.current;
        c.current = N8;
        try {
          return GW(J, Q, X);
        } finally {
          c.current = Z;
        }
      }, useRef: function(J) {
        return _ = "useRef", V0(), b(), I6();
      }, useState: function(J) {
        _ = "useState", V0(), b();
        var Q = c.current;
        c.current = N8;
        try {
          return KW(J);
        } finally {
          c.current = Q;
        }
      }, useDebugValue: function(J, Q) {
        return _ = "useDebugValue", V0(), b(), x6();
      }, useDeferredValue: function(J) {
        return _ = "useDeferredValue", V0(), b(), mB(J);
      }, useTransition: function() {
        return _ = "useTransition", V0(), b(), sB();
      }, useMutableSource: function(J, Q, X) {
        return _ = "useMutableSource", V0(), b(), D6();
      }, useSyncExternalStore: function(J, Q, X) {
        return _ = "useSyncExternalStore", V0(), b(), E6(J, Q);
      }, useId: function() {
        return _ = "useId", V0(), b(), C6();
      }, unstable_isNewReconciler: c1 };
    }
    var JQ = D.unstable_now, JV = 0, h6 = -1, IZ = -1, b6 = -1, FW = false, f6 = false;
    function QV() {
      return FW;
    }
    function NP() {
      f6 = true;
    }
    function SP() {
      FW = false, f6 = false;
    }
    function _P() {
      FW = f6, f6 = false;
    }
    function XV() {
      return JV;
    }
    function ZV() {
      JV = JQ();
    }
    function DW(J) {
      if (IZ = JQ(), J.actualStartTime < 0)
        J.actualStartTime = JQ();
    }
    function GV(J) {
      IZ = -1;
    }
    function d6(J, Q) {
      if (IZ >= 0) {
        var X = JQ() - IZ;
        if (J.actualDuration += X, Q)
          J.selfBaseDuration = X;
        IZ = -1;
      }
    }
    function i8(J) {
      if (h6 >= 0) {
        var Q = JQ() - h6;
        h6 = -1;
        var X = J.return;
        while (X !== null) {
          switch (X.tag) {
            case k:
              var Z = X.stateNode;
              Z.effectDuration += Q;
              return;
            case y0:
              var G = X.stateNode;
              G.effectDuration += Q;
              return;
          }
          X = X.return;
        }
      }
    }
    function EW(J) {
      if (b6 >= 0) {
        var Q = JQ() - b6;
        b6 = -1;
        var X = J.return;
        while (X !== null) {
          switch (X.tag) {
            case k:
              var Z = X.stateNode;
              if (Z !== null)
                Z.passiveEffectDuration += Q;
              return;
            case y0:
              var G = X.stateNode;
              if (G !== null)
                G.passiveEffectDuration += Q;
              return;
          }
          X = X.return;
        }
      }
    }
    function p8() {
      h6 = JQ();
    }
    function wW() {
      b6 = JQ();
    }
    function IW(J) {
      var Q = J.child;
      while (Q)
        J.actualDuration += Q.actualDuration, Q = Q.sibling;
    }
    function bQ(J, Q) {
      return { value: J, source: Q, stack: tZ(Q), digest: null };
    }
    function RW(J, Q, X) {
      return { value: J, source: null, stack: X != null ? X : null, digest: Q != null ? Q : null };
    }
    function jP(J, Q) {
      return true;
    }
    function LW(J, Q) {
      try {
        var X = jP(J, Q);
        if (X === false)
          return;
        var { value: Z, source: G, stack: Y } = Q, W = Y !== null ? Y : "";
        if (Z != null && Z._suppressLogging) {
          if (J.tag === h)
            return;
          console.error(Z);
        }
        var z = G ? q0(G) : null, K = z ? "The above error occurred in the <" + z + "> component:" : "The above error occurred in one of your React components:", V;
        if (J.tag === k)
          V = "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://reactjs.org/link/error-boundaries to learn more about error boundaries.";
        else {
          var $ = q0(J) || "Anonymous";
          V = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + $ + ".");
        }
        var A = K + "\n" + W + "\n\n" + ("" + V);
        console.error(A);
      } catch (q) {
        setTimeout(function() {
          throw q;
        });
      }
    }
    var xP = typeof WeakMap === "function" ? WeakMap : Map;
    function YV(J, Q, X) {
      var Z = PJ(X1, X);
      Z.tag = RY, Z.payload = { element: null };
      var G = Q.value;
      return Z.callback = function() {
        SD(G), LW(J, Q);
      }, Z;
    }
    function NW(J, Q, X) {
      var Z = PJ(X1, X);
      Z.tag = RY;
      var G = J.type.getDerivedStateFromError;
      if (typeof G === "function") {
        var Y = Q.value;
        Z.payload = function() {
          return G(Y);
        }, Z.callback = function() {
          A$(J), LW(J, Q);
        };
      }
      var W = J.stateNode;
      if (W !== null && typeof W.componentDidCatch === "function")
        Z.callback = function z() {
          if (A$(J), LW(J, Q), typeof G !== "function")
            LD(this);
          var { value: K, stack: V } = Q;
          if (this.componentDidCatch(K, { componentStack: V !== null ? V : "" }), typeof G !== "function") {
            if (!y7(J.lanes, B0))
              U("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", q0(J) || "Unknown");
          }
        };
      return Z;
    }
    function WV(J, Q, X) {
      var Z = J.pingCache, G;
      if (Z === null)
        Z = J.pingCache = new xP, G = new Set, Z.set(Q, G);
      else if (G = Z.get(Q), G === undefined)
        G = new Set, Z.set(Q, G);
      if (!G.has(X)) {
        G.add(X);
        var Y = _D.bind(null, J, Q, X);
        if (F8)
          dZ(J, X);
        Q.then(Y, Y);
      }
    }
    function gP(J, Q, X, Z) {
      var G = J.updateQueue;
      if (G === null) {
        var Y = new Set;
        Y.add(X), J.updateQueue = Y;
      } else
        G.add(X);
    }
    function vP(J, Q) {
      var X = J.tag;
      if ((J.mode & N0) === Z0 && (X === n || X === G0 || X === g0)) {
        var Z = J.alternate;
        if (Z)
          J.updateQueue = Z.updateQueue, J.memoizedState = Z.memoizedState, J.lanes = Z.lanes;
        else
          J.updateQueue = null, J.memoizedState = null;
      }
    }
    function zV(J) {
      var Q = J;
      do {
        if (Q.tag === E0 && AP(Q))
          return Q;
        Q = Q.return;
      } while (Q !== null);
      return null;
    }
    function KV(J, Q, X, Z, G) {
      if ((J.mode & N0) === Z0) {
        if (J === Q)
          J.flags |= w7;
        else {
          if (J.flags |= k0, X.flags |= l4, X.flags &= ~(HH | IX), X.tag === h) {
            var Y = X.alternate;
            if (Y === null)
              X.tag = l0;
            else {
              var W = PJ(X1, B0);
              W.tag = z6, nJ(X, W, B0);
            }
          }
          X.lanes = F0(X.lanes, B0);
        }
        return J;
      }
      return J.flags |= w7, J.lanes = G, J;
    }
    function CP(J, Q, X, Z, G) {
      if (X.flags |= IX, F8)
        dZ(J, G);
      if (Z !== null && typeof Z === "object" && typeof Z.then === "function") {
        var Y = Z;
        if (vP(X), n1() && X.mode & N0)
          t3();
        var W = zV(Q);
        if (W !== null) {
          if (W.flags &= ~WJ, KV(W, Q, X, J, G), W.mode & N0)
            WV(J, Y, G);
          gP(W, J, Y);
          return;
        } else {
          if (!ZO(G)) {
            WV(J, Y, G), Wz();
            return;
          }
          var z = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          Z = z;
        }
      } else if (n1() && X.mode & N0) {
        t3();
        var K = zV(Q);
        if (K !== null) {
          if ((K.flags & w7) === X0)
            K.flags |= WJ;
          KV(K, Q, X, J, G), AY(bQ(Z, X));
          return;
        }
      }
      Z = bQ(Z, X), AD(Z);
      var V = Q;
      do {
        switch (V.tag) {
          case k: {
            var $ = Z;
            V.flags |= w7;
            var A = gX(G);
            V.lanes = F0(V.lanes, A);
            var q = YV(V, $, A);
            SY(V, q);
            return;
          }
          case h:
            var I = Z, E = V.type, R = V.stateNode;
            if ((V.flags & k0) === X0 && (typeof E.getDerivedStateFromError === "function" || R !== null && typeof R.componentDidCatch === "function" && !K$(R))) {
              V.flags |= w7;
              var y = gX(G);
              V.lanes = F0(V.lanes, y);
              var e = NW(V, I, y);
              SY(V, e);
              return;
            }
            break;
        }
        V = V.return;
      } while (V !== null);
    }
    function TP() {
      return null;
    }
    var RZ = S.ReactCurrentOwner, S8 = false, SW, LZ, _W, jW, xW, fQ, gW, u6;
    SW = {}, LZ = {}, _W = {}, jW = {}, xW = {}, fQ = false, gW = {}, u6 = {};
    function I7(J, Q, X, Z) {
      if (J === null)
        Q.child = NB(Q, null, X, Z);
      else
        Q.child = T5(Q, J.child, X, Z);
    }
    function kP(J, Q, X, Z) {
      Q.child = T5(Q, J.child, null, Z), Q.child = T5(Q, null, X, Z);
    }
    function BV(J, Q, X, Z, G) {
      if (Q.type !== Q.elementType) {
        var Y = X.propTypes;
        if (Y)
          E8(Y, Z, "prop", s0(X));
      }
      var W = X.render, z = Q.ref, K, V;
      C5(Q, G), LX(Q);
      {
        if (RZ.current = Q, G8(true), K = u5(J, Q, W, Z, z, G), V = m5(), Q.mode & D1) {
          u1(true);
          try {
            K = u5(J, Q, W, Z, z, G), V = m5();
          } finally {
            u1(false);
          }
        }
        G8(false);
      }
      if (H5(), J !== null && !S8)
        return gB(J, Q, G), FJ(J, Q, G);
      if (n1() && V)
        $Y(Q);
      return Q.flags |= $5, I7(J, Q, K, G), Q.child;
    }
    function VV(J, Q, X, Z, G) {
      if (J === null) {
        var Y = X.type;
        if (lD(Y) && X.compare === null && X.defaultProps === undefined) {
          var W = Y;
          return W = r5(Y), Q.tag = g0, Q.type = W, TW(Q, Y), $V(J, Q, W, Z, G);
        }
        {
          var z = Y.propTypes;
          if (z)
            E8(z, Z, "prop", s0(Y));
        }
        var K = Az(X.type, null, Z, Q, Q.mode, G);
        return K.ref = Q.ref, K.return = Q, Q.child = K, K;
      }
      {
        var V = X.type, $ = V.propTypes;
        if ($)
          E8($, Z, "prop", s0(V));
      }
      var A = J.child, q = uW(J, G);
      if (!q) {
        var I = A.memoizedProps, E = X.compare;
        if (E = E !== null ? E : iX, E(I, Z) && J.ref === Q.ref)
          return FJ(J, Q, G);
      }
      Q.flags |= $5;
      var R = cQ(A, Z);
      return R.ref = Q.ref, R.return = Q, Q.child = R, R;
    }
    function $V(J, Q, X, Z, G) {
      if (Q.type !== Q.elementType) {
        var Y = Q.elementType;
        if (Y.$$typeof === R0) {
          var W = Y, z = W._payload, K = W._init;
          try {
            Y = K(z);
          } catch (A) {
            Y = null;
          }
          var V = Y && Y.propTypes;
          if (V)
            E8(V, Z, "prop", s0(Y));
        }
      }
      if (J !== null) {
        var $ = J.memoizedProps;
        if (iX($, Z) && J.ref === Q.ref && Q.type === J.type) {
          if (S8 = false, Q.pendingProps = Z = $, !uW(J, G))
            return Q.lanes = J.lanes, FJ(J, Q, G);
          else if ((J.flags & l4) !== X0)
            S8 = true;
        }
      }
      return vW(J, Q, X, Z, G);
    }
    function UV(J, Q, X) {
      var Z = Q.pendingProps, G = Z.children, Y = J !== null ? J.memoizedState : null;
      if (Z.mode === "hidden" || Y7)
        if ((Q.mode & N0) === Z0) {
          var W = { baseLanes: j, cachePool: null, transitions: null };
          Q.memoizedState = W, e6(Q, X);
        } else if (!y7(X, m7)) {
          var z = null, K;
          if (Y !== null) {
            var V = Y.baseLanes;
            K = F0(V, X);
          } else
            K = X;
          Q.lanes = Q.childLanes = F9(m7);
          var $ = { baseLanes: K, cachePool: z, transitions: null };
          return Q.memoizedState = $, Q.updateQueue = null, e6(Q, K), null;
        } else {
          var A = { baseLanes: j, cachePool: null, transitions: null };
          Q.memoizedState = A;
          var q = Y !== null ? Y.baseLanes : X;
          e6(Q, q);
        }
      else {
        var I;
        if (Y !== null)
          I = F0(Y.baseLanes, X), Q.memoizedState = null;
        else
          I = X;
        e6(Q, I);
      }
      return I7(J, Q, G, X), Q.child;
    }
    function hP(J, Q, X) {
      var Z = Q.pendingProps;
      return I7(J, Q, Z, X), Q.child;
    }
    function bP(J, Q, X) {
      var Z = Q.pendingProps.children;
      return I7(J, Q, Z, X), Q.child;
    }
    function fP(J, Q, X) {
      {
        Q.flags |= x0;
        {
          var Z = Q.stateNode;
          Z.effectDuration = 0, Z.passiveEffectDuration = 0;
        }
      }
      var G = Q.pendingProps, Y = G.children;
      return I7(J, Q, Y, X), Q.child;
    }
    function HV(J, Q) {
      var X = Q.ref;
      if (J === null && X !== null || J !== null && J.ref !== X)
        Q.flags |= fJ, Q.flags |= i4;
    }
    function vW(J, Q, X, Z, G) {
      if (Q.type !== Q.elementType) {
        var Y = X.propTypes;
        if (Y)
          E8(Y, Z, "prop", s0(X));
      }
      var W;
      {
        var z = S5(Q, X, true);
        W = _5(Q, z);
      }
      var K, V;
      C5(Q, G), LX(Q);
      {
        if (RZ.current = Q, G8(true), K = u5(J, Q, X, Z, W, G), V = m5(), Q.mode & D1) {
          u1(true);
          try {
            K = u5(J, Q, X, Z, W, G), V = m5();
          } finally {
            u1(false);
          }
        }
        G8(false);
      }
      if (H5(), J !== null && !S8)
        return gB(J, Q, G), FJ(J, Q, G);
      if (n1() && V)
        $Y(Q);
      return Q.flags |= $5, I7(J, Q, K, G), Q.child;
    }
    function OV(J, Q, X, Z, G) {
      {
        switch (WE(Q)) {
          case false: {
            var { stateNode: Y, type: W } = Q, z = new W(Q.memoizedProps, Y.context), K = z.state;
            Y.updater.enqueueSetState(Y, K, null);
            break;
          }
          case true: {
            Q.flags |= k0, Q.flags |= w7;
            var V = new Error("Simulated error coming from DevTools"), $ = gX(G);
            Q.lanes = F0(Q.lanes, $);
            var A = NW(Q, bQ(V, Q), $);
            SY(Q, A);
            break;
          }
        }
        if (Q.type !== Q.elementType) {
          var q = X.propTypes;
          if (q)
            E8(q, Z, "prop", s0(X));
        }
      }
      var I;
      if (y8(X))
        I = true, n9(Q);
      else
        I = false;
      C5(Q, G);
      var E = Q.stateNode, R;
      if (E === null)
        y6(J, Q), EB(Q, X, Z), dY(Q, X, Z, G), R = true;
      else if (J === null)
        R = $P(Q, X, Z, G);
      else
        R = UP(J, Q, X, Z, G);
      var y = CW(J, Q, X, R, I, G);
      {
        var e = Q.stateNode;
        if (R && e.props !== Z) {
          if (!fQ)
            U("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", q0(Q) || "a component");
          fQ = true;
        }
      }
      return y;
    }
    function CW(J, Q, X, Z, G, Y) {
      HV(J, Q);
      var W = (Q.flags & k0) !== X0;
      if (!Z && !W) {
        if (G)
          a3(Q, X, false);
        return FJ(J, Q, Y);
      }
      var z = Q.stateNode;
      RZ.current = Q;
      var K;
      if (W && typeof X.getDerivedStateFromError !== "function")
        K = null, GV();
      else {
        LX(Q);
        {
          if (G8(true), K = z.render(), Q.mode & D1) {
            u1(true);
            try {
              z.render();
            } finally {
              u1(false);
            }
          }
          G8(false);
        }
        H5();
      }
      if (Q.flags |= $5, J !== null && W)
        kP(J, Q, K, Y);
      else
        I7(J, Q, K, Y);
      if (Q.memoizedState = z.state, G)
        a3(Q, X, true);
      return Q.child;
    }
    function MV(J) {
      var Q = J.stateNode;
      if (Q.pendingContext)
        i3(J, Q.pendingContext, Q.pendingContext !== Q.context);
      else if (Q.context)
        i3(J, Q.context, false);
      lY(J, Q.containerInfo);
    }
    function dP(J, Q, X) {
      if (MV(Q), J === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var { pendingProps: Z, memoizedState: G } = Q, Y = G.element;
      HB(J, Q), $6(Q, Z, null, X);
      var { memoizedState: W, stateNode: z } = Q, K = W.element;
      if (G.isDehydrated) {
        var V = { element: K, isDehydrated: false, cache: W.cache, pendingSuspenseBoundaries: W.pendingSuspenseBoundaries, transitions: W.transitions }, $ = Q.updateQueue;
        if ($.baseState = V, Q.memoizedState = V, Q.flags & WJ) {
          var A = bQ(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), Q);
          return qV(J, Q, K, X, A);
        } else if (K !== Y) {
          var q = bQ(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), Q);
          return qV(J, Q, K, X, q);
        } else {
          sA(Q);
          var I = NB(Q, null, K, X);
          Q.child = I;
          var E = I;
          while (E)
            E.flags = E.flags & ~F1 | zJ, E = E.sibling;
        }
      } else {
        if (g5(), K === Y)
          return FJ(J, Q, X);
        I7(J, Q, K, X);
      }
      return Q.child;
    }
    function qV(J, Q, X, Z, G) {
      return g5(), AY(G), Q.flags |= WJ, I7(J, Q, X, Z), Q.child;
    }
    function uP(J, Q, X) {
      if (_B(Q), J === null)
        qY(Q);
      var { type: Z, pendingProps: G } = Q, Y = J !== null ? J.memoizedProps : null, W = G.children, z = tG(Z, G);
      if (z)
        W = null;
      else if (Y !== null && tG(Z, Y))
        Q.flags |= wX;
      return HV(J, Q), I7(J, Q, W, X), Q.child;
    }
    function mP(J, Q) {
      if (J === null)
        qY(Q);
      return null;
    }
    function yP(J, Q, X, Z) {
      y6(J, Q);
      var G = Q.pendingProps, Y = X, W = Y._payload, z = Y._init, K = z(W);
      Q.type = K;
      var V = Q.tag = iD(K), $ = R8(K, G), A;
      switch (V) {
        case n:
          return TW(Q, K), Q.type = K = r5(K), A = vW(null, Q, K, $, Z), A;
        case h:
          return Q.type = K = $z(K), A = OV(null, Q, K, $, Z), A;
        case G0:
          return Q.type = K = Uz(K), A = BV(null, Q, K, $, Z), A;
        case B1: {
          if (Q.type !== Q.elementType) {
            var q = K.propTypes;
            if (q)
              E8(q, $, "prop", s0(K));
          }
          return A = VV(null, Q, K, R8(K.type, $), Z), A;
        }
      }
      var I = "";
      if (K !== null && typeof K === "object" && K.$$typeof === R0)
        I = " Did you wrap a component in React.lazy() more than once?";
      throw new Error("Element type is invalid. Received a promise that resolves to: " + K + ". " + ("Lazy element type must resolve to a class or function." + I));
    }
    function cP(J, Q, X, Z, G) {
      y6(J, Q), Q.tag = h;
      var Y;
      if (y8(X))
        Y = true, n9(Q);
      else
        Y = false;
      return C5(Q, G), EB(Q, X, Z), dY(Q, X, Z, G), CW(null, Q, X, true, Y, G);
    }
    function sP(J, Q, X, Z) {
      y6(J, Q);
      var G = Q.pendingProps, Y;
      {
        var W = S5(Q, X, false);
        Y = _5(Q, W);
      }
      C5(Q, Z);
      var z, K;
      LX(Q);
      {
        if (X.prototype && typeof X.prototype.render === "function") {
          var V = s0(X) || "Unknown";
          if (!SW[V])
            U("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", V, V), SW[V] = true;
        }
        if (Q.mode & D1)
          I8.recordLegacyContextWarning(Q, null);
        G8(true), RZ.current = Q, z = u5(null, Q, X, G, Y, Z), K = m5(), G8(false);
      }
      if (H5(), Q.flags |= $5, typeof z === "object" && z !== null && typeof z.render === "function" && z.$$typeof === undefined) {
        var $ = s0(X) || "Unknown";
        if (!LZ[$])
          U("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", $, $, $), LZ[$] = true;
      }
      if (typeof z === "object" && z !== null && typeof z.render === "function" && z.$$typeof === undefined) {
        {
          var A = s0(X) || "Unknown";
          if (!LZ[A])
            U("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", A, A, A), LZ[A] = true;
        }
        Q.tag = h, Q.memoizedState = null, Q.updateQueue = null;
        var q = false;
        if (y8(X))
          q = true, n9(Q);
        else
          q = false;
        return Q.memoizedState = z.state !== null && z.state !== undefined ? z.state : null, NY(Q), DB(Q, z), dY(Q, X, G, Z), CW(null, Q, X, true, q, Z);
      } else {
        if (Q.tag = n, Q.mode & D1) {
          u1(true);
          try {
            z = u5(null, Q, X, G, Y, Z), K = m5();
          } finally {
            u1(false);
          }
        }
        if (n1() && K)
          $Y(Q);
        return I7(null, Q, z, Z), TW(Q, X), Q.child;
      }
    }
    function TW(J, Q) {
      {
        if (Q) {
          if (Q.childContextTypes)
            U("%s(...): childContextTypes cannot be defined on a function component.", Q.displayName || Q.name || "Component");
        }
        if (J.ref !== null) {
          var X = "", Z = hJ();
          if (Z)
            X += "\n\nCheck the render method of `" + Z + "`.";
          var G = Z || "", Y = J._debugSource;
          if (Y)
            G = Y.fileName + ":" + Y.lineNumber;
          if (!xW[G])
            xW[G] = true, U("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", X);
        }
        if (typeof Q.getDerivedStateFromProps === "function") {
          var W = s0(Q) || "Unknown";
          if (!jW[W])
            U("%s: Function components do not support getDerivedStateFromProps.", W), jW[W] = true;
        }
        if (typeof Q.contextType === "object" && Q.contextType !== null) {
          var z = s0(Q) || "Unknown";
          if (!_W[z])
            U("%s: Function components do not support contextType.", z), _W[z] = true;
        }
      }
    }
    var kW = { dehydrated: null, treeContext: null, retryLane: m1 };
    function hW(J) {
      return { baseLanes: J, cachePool: TP(), transitions: null };
    }
    function lP(J, Q) {
      var X = null;
      return { baseLanes: F0(J.baseLanes, Q), cachePool: X, transitions: J.transitions };
    }
    function iP(J, Q, X, Z) {
      if (Q !== null) {
        var G = Q.memoizedState;
        if (G === null)
          return false;
      }
      return aY(J, qZ);
    }
    function pP(J, Q) {
      return P9(J.childLanes, Q);
    }
    function AV(J, Q, X) {
      var Z = Q.pendingProps;
      if (zE(Q))
        Q.flags |= k0;
      var G = L8.current, Y = false, W = (Q.flags & k0) !== X0;
      if (W || iP(G, J))
        Y = true, Q.flags &= ~k0;
      else if (J === null || J.memoizedState !== null)
        G = qP(G, xB);
      if (G = h5(G), tJ(Q, G), J === null) {
        qY(Q);
        var z = Q.memoizedState;
        if (z !== null) {
          var K = z.dehydrated;
          if (K !== null)
            return tP(Q, K);
        }
        var { children: V, fallback: $ } = Z;
        if (Y) {
          var A = aP(Q, V, $, X), q = Q.child;
          return q.memoizedState = hW(X), Q.memoizedState = kW, A;
        } else
          return bW(Q, V);
      } else {
        var I = J.memoizedState;
        if (I !== null) {
          var E = I.dehydrated;
          if (E !== null)
            return eP(J, Q, W, Z, E, I, X);
        }
        if (Y) {
          var { fallback: R, children: y } = Z, e = nP(J, Q, y, R, X), o = Q.child, w0 = J.child.memoizedState;
          return o.memoizedState = w0 === null ? hW(X) : lP(w0, X), o.childLanes = pP(J, X), Q.memoizedState = kW, e;
        } else {
          var I0 = Z.children, P = rP(J, Q, I0, X);
          return Q.memoizedState = null, P;
        }
      }
    }
    function bW(J, Q, X) {
      var Z = J.mode, G = { mode: "visible", children: Q }, Y = fW(G, Z);
      return Y.return = J, J.child = Y, Y;
    }
    function aP(J, Q, X, Z) {
      var { mode: G, child: Y } = J, W = { mode: "hidden", children: Q }, z, K;
      if ((G & N0) === Z0 && Y !== null) {
        if (z = Y, z.childLanes = j, z.pendingProps = W, J.mode & d0)
          z.actualDuration = 0, z.actualStartTime = -1, z.selfBaseDuration = 0, z.treeBaseDuration = 0;
        K = WQ(X, G, Z, null);
      } else
        z = fW(W, G), K = WQ(X, G, Z, null);
      return z.return = J, K.return = J, z.sibling = K, J.child = z, K;
    }
    function fW(J, Q, X) {
      return F$(J, Q, j, null);
    }
    function PV(J, Q) {
      return cQ(J, Q);
    }
    function rP(J, Q, X, Z) {
      var G = J.child, Y = G.sibling, W = PV(G, { mode: "visible", children: X });
      if ((Q.mode & N0) === Z0)
        W.lanes = Z;
      if (W.return = Q, W.sibling = null, Y !== null) {
        var z = Q.deletions;
        if (z === null)
          Q.deletions = [Y], Q.flags |= MQ;
        else
          z.push(Y);
      }
      return Q.child = W, W;
    }
    function nP(J, Q, X, Z, G) {
      var Y = Q.mode, W = J.child, z = W.sibling, K = { mode: "hidden", children: X }, V;
      if ((Y & N0) === Z0 && Q.child !== W) {
        var $ = Q.child;
        if (V = $, V.childLanes = j, V.pendingProps = K, Q.mode & d0)
          V.actualDuration = 0, V.actualStartTime = -1, V.selfBaseDuration = W.selfBaseDuration, V.treeBaseDuration = W.treeBaseDuration;
        Q.deletions = null;
      } else
        V = PV(W, K), V.subtreeFlags = W.subtreeFlags & BJ;
      var A;
      if (z !== null)
        A = cQ(z, Z);
      else
        A = WQ(Z, Y, G, null), A.flags |= F1;
      return A.return = Q, V.return = Q, V.sibling = A, Q.child = V, A;
    }
    function m6(J, Q, X, Z) {
      if (Z !== null)
        AY(Z);
      T5(Q, J.child, null, X);
      var G = Q.pendingProps, Y = G.children, W = bW(Q, Y);
      return W.flags |= F1, Q.memoizedState = null, W;
    }
    function oP(J, Q, X, Z, G) {
      var Y = Q.mode, W = { mode: "visible", children: X }, z = fW(W, Y), K = WQ(Z, Y, G, null);
      if (K.flags |= F1, z.return = Q, K.return = Q, z.sibling = K, Q.child = z, (Q.mode & N0) !== Z0)
        T5(Q, J.child, null, G);
      return K;
    }
    function tP(J, Q, X) {
      if ((J.mode & N0) === Z0)
        U("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), J.lanes = F9(B0);
      else if (XY(Q))
        J.lanes = F9(wQ);
      else
        J.lanes = F9(m7);
      return null;
    }
    function eP(J, Q, X, Z, G, Y, W) {
      if (!X) {
        if (yA(), (Q.mode & N0) === Z0)
          return m6(J, Q, W, null);
        if (XY(G)) {
          var z, K, V;
          {
            var $ = YA(G);
            z = $.digest, K = $.message, V = $.stack;
          }
          var A;
          if (K)
            A = new Error(K);
          else
            A = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var q = RW(A, z, V);
          return m6(J, Q, W, q);
        }
        var I = y7(W, J.childLanes);
        if (S8 || I) {
          var E = t6();
          if (E !== null) {
            var R = $O(E, W);
            if (R !== m1 && R !== Y.retryLane) {
              Y.retryLane = R;
              var y = X1;
              C7(J, R), T1(E, J, R, y);
            }
          }
          Wz();
          var e = RW(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return m6(J, Q, W, e);
        } else if (d3(G)) {
          Q.flags |= k0, Q.child = J.child;
          var o = jD.bind(null, J);
          return WA(G, o), null;
        } else {
          lA(Q, G, Y.treeContext);
          var w0 = Z.children, I0 = bW(Q, w0);
          return I0.flags |= zJ, I0;
        }
      } else if (Q.flags & WJ) {
        Q.flags &= ~WJ;
        var P = RW(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return m6(J, Q, W, P);
      } else if (Q.memoizedState !== null)
        return Q.child = J.child, Q.flags |= k0, null;
      else {
        var { children: N, fallback: F } = Z, g = oP(J, Q, N, F, W), l = Q.child;
        return l.memoizedState = hW(W), Q.memoizedState = kW, g;
      }
    }
    function FV(J, Q, X) {
      J.lanes = F0(J.lanes, Q);
      var Z = J.alternate;
      if (Z !== null)
        Z.lanes = F0(Z.lanes, Q);
      wY(J.return, Q, X);
    }
    function JF(J, Q, X) {
      var Z = Q;
      while (Z !== null) {
        if (Z.tag === E0) {
          var G = Z.memoizedState;
          if (G !== null)
            FV(Z, X, J);
        } else if (Z.tag === R1)
          FV(Z, X, J);
        else if (Z.child !== null) {
          Z.child.return = Z, Z = Z.child;
          continue;
        }
        if (Z === J)
          return;
        while (Z.sibling === null) {
          if (Z.return === null || Z.return === J)
            return;
          Z = Z.return;
        }
        Z.sibling.return = Z.return, Z = Z.sibling;
      }
    }
    function QF(J) {
      var Q = J, X = null;
      while (Q !== null) {
        var Z = Q.alternate;
        if (Z !== null && P6(Z) === null)
          X = Q;
        Q = Q.sibling;
      }
      return X;
    }
    function XF(J) {
      if (J !== undefined && J !== "forwards" && J !== "backwards" && J !== "together" && !gW[J])
        if (gW[J] = true, typeof J === "string")
          switch (J.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              U('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', J, J.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              U('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', J, J.toLowerCase());
              break;
            }
            default:
              U('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', J);
              break;
          }
        else
          U('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', J);
    }
    function ZF(J, Q) {
      if (J !== undefined && !u6[J]) {
        if (J !== "collapsed" && J !== "hidden")
          u6[J] = true, U('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', J);
        else if (Q !== "forwards" && Q !== "backwards")
          u6[J] = true, U('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', J);
      }
    }
    function DV(J, Q) {
      {
        var X = N1(J), Z = !X && typeof JJ(J) === "function";
        if (X || Z) {
          var G = X ? "array" : "iterable";
          return U("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", G, Q, G), false;
        }
      }
      return true;
    }
    function GF(J, Q) {
      if ((Q === "forwards" || Q === "backwards") && J !== undefined && J !== null && J !== false)
        if (N1(J)) {
          for (var X = 0;X < J.length; X++)
            if (!DV(J[X], X))
              return;
        } else {
          var Z = JJ(J);
          if (typeof Z === "function") {
            var G = Z.call(J);
            if (G) {
              var Y = G.next(), W = 0;
              for (;!Y.done; Y = G.next()) {
                if (!DV(Y.value, W))
                  return;
                W++;
              }
            }
          } else
            U('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', Q);
        }
    }
    function dW(J, Q, X, Z, G) {
      var Y = J.memoizedState;
      if (Y === null)
        J.memoizedState = { isBackwards: Q, rendering: null, renderingStartTime: 0, last: Z, tail: X, tailMode: G };
      else
        Y.isBackwards = Q, Y.rendering = null, Y.renderingStartTime = 0, Y.last = Z, Y.tail = X, Y.tailMode = G;
    }
    function EV(J, Q, X) {
      var Z = Q.pendingProps, G = Z.revealOrder, Y = Z.tail, W = Z.children;
      XF(G), ZF(Y, G), GF(W, G), I7(J, Q, W, X);
      var z = L8.current, K = aY(z, qZ);
      if (K)
        z = rY(z, qZ), Q.flags |= k0;
      else {
        var V = J !== null && (J.flags & k0) !== X0;
        if (V)
          JF(Q, Q.child, X);
        z = h5(z);
      }
      if (tJ(Q, z), (Q.mode & N0) === Z0)
        Q.memoizedState = null;
      else
        switch (G) {
          case "forwards": {
            var $ = QF(Q.child), A;
            if ($ === null)
              A = Q.child, Q.child = null;
            else
              A = $.sibling, $.sibling = null;
            dW(Q, false, A, $, Y);
            break;
          }
          case "backwards": {
            var q = null, I = Q.child;
            Q.child = null;
            while (I !== null) {
              var E = I.alternate;
              if (E !== null && P6(E) === null) {
                Q.child = I;
                break;
              }
              var R = I.sibling;
              I.sibling = q, q = I, I = R;
            }
            dW(Q, true, q, null, Y);
            break;
          }
          case "together": {
            dW(Q, false, null, null, undefined);
            break;
          }
          default:
            Q.memoizedState = null;
        }
      return Q.child;
    }
    function YF(J, Q, X) {
      lY(Q, Q.stateNode.containerInfo);
      var Z = Q.pendingProps;
      if (J === null)
        Q.child = T5(Q, null, Z, X);
      else
        I7(J, Q, Z, X);
      return Q.child;
    }
    var wV = false;
    function WF(J, Q, X) {
      var Z = Q.type, G = Z._context, Y = Q.pendingProps, W = Q.memoizedProps, z = Y.value;
      {
        if (!("value" in Y)) {
          if (!wV)
            wV = true, U("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?");
        }
        var K = Q.type.propTypes;
        if (K)
          E8(K, Y, "prop", "Context.Provider");
      }
      if (BB(Q, G, z), W !== null) {
        var V = W.value;
        if (l7(V, z)) {
          if (W.children === Y.children && !a9())
            return FJ(J, Q, X);
        } else
          QP(Q, G, X);
      }
      var $ = Y.children;
      return I7(J, Q, $, X), Q.child;
    }
    var IV = false;
    function zF(J, Q, X) {
      var Z = Q.type;
      if (Z._context === undefined) {
        if (Z !== Z.Consumer) {
          if (!IV)
            IV = true, U("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
        }
      } else
        Z = Z._context;
      var G = Q.pendingProps, Y = G.children;
      if (typeof Y !== "function")
        U("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it.");
      C5(Q, X);
      var W = E1(Z);
      LX(Q);
      var z;
      return RZ.current = Q, G8(true), z = Y(W), G8(false), H5(), Q.flags |= $5, I7(J, Q, z, X), Q.child;
    }
    function NZ() {
      S8 = true;
    }
    function y6(J, Q) {
      if ((Q.mode & N0) === Z0) {
        if (J !== null)
          J.alternate = null, Q.alternate = null, Q.flags |= F1;
      }
    }
    function FJ(J, Q, X) {
      if (J !== null)
        Q.dependencies = J.dependencies;
      if (GV(), fZ(Q.lanes), !y7(X, Q.childLanes))
        return null;
      return HP(J, Q), Q.child;
    }
    function KF(J, Q, X) {
      {
        var Z = Q.return;
        if (Z === null)
          throw new Error("Cannot swap the root fiber.");
        if (J.alternate = null, Q.alternate = null, X.index = Q.index, X.sibling = Q.sibling, X.return = Q.return, X.ref = Q.ref, Q === Z.child)
          Z.child = X;
        else {
          var G = Z.child;
          if (G === null)
            throw new Error("Expected parent to have a child.");
          while (G.sibling !== Q)
            if (G = G.sibling, G === null)
              throw new Error("Expected to find the previous sibling.");
          G.sibling = X;
        }
        var Y = Z.deletions;
        if (Y === null)
          Z.deletions = [J], Z.flags |= MQ;
        else
          Y.push(J);
        return X.flags |= F1, X;
      }
    }
    function uW(J, Q) {
      var X = J.lanes;
      if (y7(X, Q))
        return true;
      return false;
    }
    function BF(J, Q, X) {
      switch (Q.tag) {
        case k:
          MV(Q);
          var Z = Q.stateNode;
          g5();
          break;
        case p:
          _B(Q);
          break;
        case h: {
          var G = Q.type;
          if (y8(G))
            n9(Q);
          break;
        }
        case i:
          lY(Q, Q.stateNode.containerInfo);
          break;
        case _0: {
          var Y = Q.memoizedProps.value, W = Q.type._context;
          BB(Q, W, Y);
          break;
        }
        case y0:
          {
            var z = y7(X, Q.childLanes);
            if (z)
              Q.flags |= x0;
            {
              var K = Q.stateNode;
              K.effectDuration = 0, K.passiveEffectDuration = 0;
            }
          }
          break;
        case E0: {
          var V = Q.memoizedState;
          if (V !== null) {
            if (V.dehydrated !== null)
              return tJ(Q, h5(L8.current)), Q.flags |= k0, null;
            var $ = Q.child, A = $.childLanes;
            if (y7(X, A))
              return AV(J, Q, X);
            else {
              tJ(Q, h5(L8.current));
              var q = FJ(J, Q, X);
              if (q !== null)
                return q.sibling;
              else
                return null;
            }
          } else
            tJ(Q, h5(L8.current));
          break;
        }
        case R1: {
          var I = (J.flags & k0) !== X0, E = y7(X, Q.childLanes);
          if (I) {
            if (E)
              return EV(J, Q, X);
            Q.flags |= k0;
          }
          var R = Q.memoizedState;
          if (R !== null)
            R.rendering = null, R.tail = null, R.lastEffect = null;
          if (tJ(Q, L8.current), E)
            break;
          else
            return null;
        }
        case K0:
        case J1:
          return Q.lanes = j, UV(J, Q, X);
      }
      return FJ(J, Q, X);
    }
    function RV(J, Q, X) {
      if (Q._debugNeedsRemount && J !== null)
        return KF(J, Q, Az(Q.type, Q.key, Q.pendingProps, Q._debugOwner || null, Q.mode, Q.lanes));
      if (J !== null) {
        var Z = J.memoizedProps, G = Q.pendingProps;
        if (Z !== G || a9() || Q.type !== J.type)
          S8 = true;
        else {
          var Y = uW(J, X);
          if (!Y && (Q.flags & k0) === X0)
            return S8 = false, BF(J, Q, X);
          if ((J.flags & l4) !== X0)
            S8 = true;
          else
            S8 = false;
        }
      } else if (S8 = false, n1() && hA(Q)) {
        var W = Q.index, z = bA();
        o3(Q, z, W);
      }
      switch (Q.lanes = j, Q.tag) {
        case U0:
          return sP(J, Q, Q.type, X);
        case e0: {
          var K = Q.elementType;
          return yP(J, Q, K, X);
        }
        case n: {
          var { type: V, pendingProps: $ } = Q, A = Q.elementType === V ? $ : R8(V, $);
          return vW(J, Q, V, A, X);
        }
        case h: {
          var { type: q, pendingProps: I } = Q, E = Q.elementType === q ? I : R8(q, I);
          return OV(J, Q, q, E, X);
        }
        case k:
          return dP(J, Q, X);
        case p:
          return uP(J, Q, X);
        case L0:
          return mP(J, Q);
        case E0:
          return AV(J, Q, X);
        case i:
          return YF(J, Q, X);
        case G0: {
          var { type: R, pendingProps: y } = Q, e = Q.elementType === R ? y : R8(R, y);
          return BV(J, Q, R, e, X);
        }
        case w1:
          return hP(J, Q, X);
        case k1:
          return bP(J, Q, X);
        case y0:
          return fP(J, Q, X);
        case _0:
          return WF(J, Q, X);
        case I1:
          return zF(J, Q, X);
        case B1: {
          var { type: o, pendingProps: w0 } = Q, I0 = R8(o, w0);
          if (Q.type !== Q.elementType) {
            var P = o.propTypes;
            if (P)
              E8(P, I0, "prop", s0(o));
          }
          return I0 = R8(o.type, I0), VV(J, Q, o, I0, X);
        }
        case g0:
          return $V(J, Q, Q.type, Q.pendingProps, X);
        case l0: {
          var { type: N, pendingProps: F } = Q, g = Q.elementType === N ? F : R8(N, F);
          return cP(J, Q, N, g, X);
        }
        case R1:
          return EV(J, Q, X);
        case i0:
          break;
        case K0:
          return UV(J, Q, X);
      }
      throw new Error("Unknown unit of work tag (" + Q.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function y5(J) {
      J.flags |= x0;
    }
    function LV(J) {
      J.flags |= fJ, J.flags |= i4;
    }
    var NV, mW, SV, _V;
    NV = function(J, Q, X, Z) {
      var G = Q.child;
      while (G !== null) {
        if (G.tag === p || G.tag === L0)
          Cq(J, G.stateNode);
        else if (G.tag === i)
          ;
        else if (G.child !== null) {
          G.child.return = G, G = G.child;
          continue;
        }
        if (G === Q)
          return;
        while (G.sibling === null) {
          if (G.return === null || G.return === Q)
            return;
          G = G.return;
        }
        G.sibling.return = G.return, G = G.sibling;
      }
    }, mW = function(J, Q) {
    }, SV = function(J, Q, X, Z, G) {
      var Y = J.memoizedProps;
      if (Y === Z)
        return;
      var W = Q.stateNode, z = iY(), K = kq(W, X, Y, Z, G, z);
      if (Q.updateQueue = K, K)
        y5(Q);
    }, _V = function(J, Q, X, Z) {
      if (X !== Z)
        y5(Q);
    };
    function SZ(J, Q) {
      if (n1())
        return;
      switch (J.tailMode) {
        case "hidden": {
          var X = J.tail, Z = null;
          while (X !== null) {
            if (X.alternate !== null)
              Z = X;
            X = X.sibling;
          }
          if (Z === null)
            J.tail = null;
          else
            Z.sibling = null;
          break;
        }
        case "collapsed": {
          var G = J.tail, Y = null;
          while (G !== null) {
            if (G.alternate !== null)
              Y = G;
            G = G.sibling;
          }
          if (Y === null)
            if (!Q && J.tail !== null)
              J.tail.sibling = null;
            else
              J.tail = null;
          else
            Y.sibling = null;
          break;
        }
      }
    }
    function t1(J) {
      var Q = J.alternate !== null && J.alternate.child === J.child, X = j, Z = X0;
      if (!Q) {
        if ((J.mode & d0) !== Z0) {
          var { actualDuration: G, selfBaseDuration: Y, child: W } = J;
          while (W !== null)
            X = F0(X, F0(W.lanes, W.childLanes)), Z |= W.subtreeFlags, Z |= W.flags, G += W.actualDuration, Y += W.treeBaseDuration, W = W.sibling;
          J.actualDuration = G, J.treeBaseDuration = Y;
        } else {
          var z = J.child;
          while (z !== null)
            X = F0(X, F0(z.lanes, z.childLanes)), Z |= z.subtreeFlags, Z |= z.flags, z.return = J, z = z.sibling;
        }
        J.subtreeFlags |= Z;
      } else {
        if ((J.mode & d0) !== Z0) {
          var { selfBaseDuration: K, child: V } = J;
          while (V !== null)
            X = F0(X, F0(V.lanes, V.childLanes)), Z |= V.subtreeFlags & BJ, Z |= V.flags & BJ, K += V.treeBaseDuration, V = V.sibling;
          J.treeBaseDuration = K;
        } else {
          var $ = J.child;
          while ($ !== null)
            X = F0(X, F0($.lanes, $.childLanes)), Z |= $.subtreeFlags & BJ, Z |= $.flags & BJ, $.return = J, $ = $.sibling;
        }
        J.subtreeFlags |= Z;
      }
      return J.childLanes = X, Q;
    }
    function VF(J, Q, X) {
      if (nA() && (Q.mode & N0) !== Z0 && (Q.flags & k0) === X0)
        return GB(Q), g5(), Q.flags |= WJ | IX | w7, false;
      var Z = Q6(Q);
      if (X !== null && X.dehydrated !== null)
        if (J === null) {
          if (!Z)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (aA(Q), t1(Q), (Q.mode & d0) !== Z0) {
            var G = X !== null;
            if (G) {
              var Y = Q.child;
              if (Y !== null)
                Q.treeBaseDuration -= Y.treeBaseDuration;
            }
          }
          return false;
        } else {
          if (g5(), (Q.flags & k0) === X0)
            Q.memoizedState = null;
          if (Q.flags |= x0, t1(Q), (Q.mode & d0) !== Z0) {
            var W = X !== null;
            if (W) {
              var z = Q.child;
              if (z !== null)
                Q.treeBaseDuration -= z.treeBaseDuration;
            }
          }
          return false;
        }
      else
        return YB(), true;
    }
    function jV(J, Q, X) {
      var Z = Q.pendingProps;
      switch (UY(Q), Q.tag) {
        case U0:
        case e0:
        case g0:
        case n:
        case G0:
        case w1:
        case k1:
        case y0:
        case I1:
        case B1:
          return t1(Q), null;
        case h: {
          var G = Q.type;
          if (y8(G))
            r9(Q);
          return t1(Q), null;
        }
        case k: {
          var Y = Q.stateNode;
          if (k5(Q), KY(Q), oY(), Y.pendingContext)
            Y.context = Y.pendingContext, Y.pendingContext = null;
          if (J === null || J.child === null) {
            var W = Q6(Q);
            if (W)
              y5(Q);
            else if (J !== null) {
              var z = J.memoizedState;
              if (!z.isDehydrated || (Q.flags & WJ) !== X0)
                Q.flags |= qQ, YB();
            }
          }
          return mW(J, Q), t1(Q), null;
        }
        case p: {
          pY(Q);
          var K = SB(), V = Q.type;
          if (J !== null && Q.stateNode != null) {
            if (SV(J, Q, V, Z, K), J.ref !== Q.ref)
              LV(Q);
          } else {
            if (!Z) {
              if (Q.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return t1(Q), null;
            }
            var $ = iY(), A = Q6(Q);
            if (A) {
              if (iA(Q, K, $))
                y5(Q);
            } else {
              var q = vq(V, Z, K, $, Q);
              if (NV(q, Q, false, false), Q.stateNode = q, Tq(q, V, Z, K))
                y5(Q);
            }
            if (Q.ref !== null)
              LV(Q);
          }
          return t1(Q), null;
        }
        case L0: {
          var I = Z;
          if (J && Q.stateNode != null) {
            var E = J.memoizedProps;
            _V(J, Q, E, I);
          } else {
            if (typeof I !== "string") {
              if (Q.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            }
            var R = SB(), y = iY(), e = Q6(Q);
            if (e) {
              if (pA(Q))
                y5(Q);
            } else
              Q.stateNode = hq(I, R, y, Q);
          }
          return t1(Q), null;
        }
        case E0: {
          b5(Q);
          var o = Q.memoizedState;
          if (J === null || J.memoizedState !== null && J.memoizedState.dehydrated !== null) {
            var w0 = VF(J, Q, o);
            if (!w0)
              if (Q.flags & w7)
                return Q;
              else
                return null;
          }
          if ((Q.flags & k0) !== X0) {
            if (Q.lanes = X, (Q.mode & d0) !== Z0)
              IW(Q);
            return Q;
          }
          var I0 = o !== null, P = J !== null && J.memoizedState !== null;
          if (I0 !== P) {
            if (I0) {
              var N = Q.child;
              if (N.flags |= AQ, (Q.mode & N0) !== Z0) {
                var F = J === null && (Q.memoizedProps.unstable_avoidThisFallback !== true || !n7);
                if (F || aY(L8.current, xB))
                  qD();
                else
                  Wz();
              }
            }
          }
          var g = Q.updateQueue;
          if (g !== null)
            Q.flags |= x0;
          if (t1(Q), (Q.mode & d0) !== Z0) {
            if (I0) {
              var l = Q.child;
              if (l !== null)
                Q.treeBaseDuration -= l.treeBaseDuration;
            }
          }
          return null;
        }
        case i:
          if (k5(Q), mW(J, Q), J === null)
            jA(Q.stateNode.containerInfo);
          return t1(Q), null;
        case _0:
          var u = Q.type._context;
          return EY(u, Q), t1(Q), null;
        case l0: {
          var W0 = Q.type;
          if (y8(W0))
            r9(Q);
          return t1(Q), null;
        }
        case R1: {
          b5(Q);
          var H0 = Q.memoizedState;
          if (H0 === null)
            return t1(Q), null;
          var m0 = (Q.flags & k0) !== X0, v0 = H0.rendering;
          if (v0 === null)
            if (!m0) {
              var O1 = PD() && (J === null || (J.flags & k0) === X0);
              if (!O1) {
                var C0 = Q.child;
                while (C0 !== null) {
                  var U1 = P6(C0);
                  if (U1 !== null) {
                    m0 = true, Q.flags |= k0, SZ(H0, false);
                    var O7 = U1.updateQueue;
                    if (O7 !== null)
                      Q.updateQueue = O7, Q.flags |= x0;
                    return Q.subtreeFlags = X0, OP(Q, X), tJ(Q, rY(L8.current, qZ)), Q.child;
                  }
                  C0 = C0.sibling;
                }
              }
              if (H0.tail !== null && d1() > oV())
                Q.flags |= k0, m0 = true, SZ(H0, false), Q.lanes = NK;
            } else
              SZ(H0, false);
          else {
            if (!m0) {
              var Z7 = P6(v0);
              if (Z7 !== null) {
                Q.flags |= k0, m0 = true;
                var a7 = Z7.updateQueue;
                if (a7 !== null)
                  Q.updateQueue = a7, Q.flags |= x0;
                if (SZ(H0, true), H0.tail === null && H0.tailMode === "hidden" && !v0.alternate && !n1())
                  return t1(Q), null;
              } else if (d1() * 2 - H0.renderingStartTime > oV() && X !== m7)
                Q.flags |= k0, m0 = true, SZ(H0, false), Q.lanes = NK;
            }
            if (H0.isBackwards)
              v0.sibling = Q.child, Q.child = v0;
            else {
              var N7 = H0.last;
              if (N7 !== null)
                N7.sibling = v0;
              else
                Q.child = v0;
              H0.last = v0;
            }
          }
          if (H0.tail !== null) {
            var S7 = H0.tail;
            H0.rendering = S7, H0.tail = S7.sibling, H0.renderingStartTime = d1(), S7.sibling = null;
            var M7 = L8.current;
            if (m0)
              M7 = rY(M7, qZ);
            else
              M7 = h5(M7);
            return tJ(Q, M7), S7;
          }
          return t1(Q), null;
        }
        case i0:
          break;
        case K0:
        case J1: {
          Yz(Q);
          var RJ = Q.memoizedState, n5 = RJ !== null;
          if (J !== null) {
            var cZ = J.memoizedState, n8 = cZ !== null;
            if (n8 !== n5 && !Y7)
              Q.flags |= AQ;
          }
          if (!n5 || (Q.mode & N0) === Z0)
            t1(Q);
          else if (y7(r8, m7)) {
            if (t1(Q), Q.subtreeFlags & (F1 | x0))
              Q.flags |= AQ;
          }
          return null;
        }
        case z0:
          return null;
        case q7:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + Q.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function $F(J, Q, X) {
      switch (UY(Q), Q.tag) {
        case h: {
          var Z = Q.type;
          if (y8(Z))
            r9(Q);
          var G = Q.flags;
          if (G & w7) {
            if (Q.flags = G & ~w7 | k0, (Q.mode & d0) !== Z0)
              IW(Q);
            return Q;
          }
          return null;
        }
        case k: {
          var Y = Q.stateNode;
          k5(Q), KY(Q), oY();
          var W = Q.flags;
          if ((W & w7) !== X0 && (W & k0) === X0)
            return Q.flags = W & ~w7 | k0, Q;
          return null;
        }
        case p:
          return pY(Q), null;
        case E0: {
          b5(Q);
          var z = Q.memoizedState;
          if (z !== null && z.dehydrated !== null) {
            if (Q.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            g5();
          }
          var K = Q.flags;
          if (K & w7) {
            if (Q.flags = K & ~w7 | k0, (Q.mode & d0) !== Z0)
              IW(Q);
            return Q;
          }
          return null;
        }
        case R1:
          return b5(Q), null;
        case i:
          return k5(Q), null;
        case _0:
          var V = Q.type._context;
          return EY(V, Q), null;
        case K0:
        case J1:
          return Yz(Q), null;
        case z0:
          return null;
        default:
          return null;
      }
    }
    function xV(J, Q, X) {
      switch (UY(Q), Q.tag) {
        case h: {
          var Z = Q.type.childContextTypes;
          if (Z !== null && Z !== undefined)
            r9(Q);
          break;
        }
        case k: {
          var G = Q.stateNode;
          k5(Q), KY(Q), oY();
          break;
        }
        case p: {
          pY(Q);
          break;
        }
        case i:
          k5(Q);
          break;
        case E0:
          b5(Q);
          break;
        case R1:
          b5(Q);
          break;
        case _0:
          var Y = Q.type._context;
          EY(Y, Q);
          break;
        case K0:
        case J1:
          Yz(Q);
          break;
      }
    }
    var gV = null;
    gV = new Set;
    var c6 = false, e1 = false, UF = typeof WeakSet === "function" ? WeakSet : Set, a = null, c5 = null, s5 = null;
    function HF(J) {
      y4(null, function() {
        throw J;
      }), c4();
    }
    var OF = function(J, Q) {
      if (Q.props = J.memoizedProps, Q.state = J.memoizedState, J.mode & d0)
        try {
          p8(), Q.componentWillUnmount();
        } finally {
          i8(J);
        }
      else
        Q.componentWillUnmount();
    };
    function vV(J, Q) {
      try {
        QQ(_1, J);
      } catch (X) {
        t0(J, Q, X);
      }
    }
    function yW(J, Q, X) {
      try {
        OF(J, X);
      } catch (Z) {
        t0(J, Q, Z);
      }
    }
    function MF(J, Q, X) {
      try {
        X.componentDidMount();
      } catch (Z) {
        t0(J, Q, Z);
      }
    }
    function CV(J, Q) {
      try {
        hV(J);
      } catch (X) {
        t0(J, Q, X);
      }
    }
    function l5(J, Q) {
      var X = J.ref;
      if (X !== null)
        if (typeof X === "function") {
          var Z;
          try {
            if (o7 && O8 && J.mode & d0)
              try {
                p8(), Z = X(null);
              } finally {
                i8(J);
              }
            else
              Z = X(null);
          } catch (G) {
            t0(J, Q, G);
          }
          if (typeof Z === "function")
            U("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", q0(J));
        } else
          X.current = null;
    }
    function s6(J, Q, X) {
      try {
        X();
      } catch (Z) {
        t0(J, Q, Z);
      }
    }
    var TV = null, kV = false;
    function qF(J, Q) {
      TV = xq(J.containerInfo), a = Q, AF();
      var X = kV;
      return kV = false, TV = null, X;
    }
    function AF() {
      while (a !== null) {
        var J = a, Q = J.child;
        if ((J.subtreeFlags & a4) !== X0 && Q !== null)
          Q.return = J, a = Q;
        else
          PF();
      }
    }
    function PF() {
      while (a !== null) {
        var J = a;
        W1(J);
        try {
          FF(J);
        } catch (X) {
          t0(J, J.return, X);
        }
        f1();
        var Q = J.sibling;
        if (Q !== null) {
          Q.return = J.return, a = Q;
          return;
        }
        a = J.return;
      }
    }
    function FF(J) {
      var { alternate: Q, flags: X } = J;
      if ((X & qQ) !== X0) {
        switch (W1(J), J.tag) {
          case n:
          case G0:
          case g0:
            break;
          case h: {
            if (Q !== null) {
              var { memoizedProps: Z, memoizedState: G } = Q, Y = J.stateNode;
              if (J.type === J.elementType && !fQ) {
                if (Y.props !== J.memoizedProps)
                  U("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", q0(J) || "instance");
                if (Y.state !== J.memoizedState)
                  U("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", q0(J) || "instance");
              }
              var W = Y.getSnapshotBeforeUpdate(J.elementType === J.type ? Z : R8(J.type, Z), G);
              {
                var z = gV;
                if (W === undefined && !z.has(J.type))
                  z.add(J.type), U("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", q0(J));
              }
              Y.__reactInternalSnapshotBeforeUpdate = W;
            }
            break;
          }
          case k: {
            {
              var K = J.stateNode;
              QA(K.containerInfo);
            }
            break;
          }
          case p:
          case L0:
          case i:
          case l0:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        f1();
      }
    }
    function _8(J, Q, X) {
      var Z = Q.updateQueue, G = Z !== null ? Z.lastEffect : null;
      if (G !== null) {
        var Y = G.next, W = Y;
        do {
          if ((W.tag & J) === J) {
            var z = W.destroy;
            if (W.destroy = undefined, z !== undefined) {
              if ((J & o1) !== T7)
                hH(Q);
              else if ((J & _1) !== T7)
                EK(Q);
              if ((J & c8) !== T7)
                uZ(true);
              if (s6(Q, X, z), (J & c8) !== T7)
                uZ(false);
              if ((J & o1) !== T7)
                bH();
              else if ((J & _1) !== T7)
                wK();
            }
          }
          W = W.next;
        } while (W !== Y);
      }
    }
    function QQ(J, Q) {
      var X = Q.updateQueue, Z = X !== null ? X.lastEffect : null;
      if (Z !== null) {
        var G = Z.next, Y = G;
        do {
          if ((Y.tag & J) === J) {
            if ((J & o1) !== T7)
              TH(Q);
            else if ((J & _1) !== T7)
              fH(Q);
            var W = Y.create;
            if ((J & c8) !== T7)
              uZ(true);
            if (Y.destroy = W(), (J & c8) !== T7)
              uZ(false);
            if ((J & o1) !== T7)
              kH();
            else if ((J & _1) !== T7)
              dH();
            {
              var z = Y.destroy;
              if (z !== undefined && typeof z !== "function") {
                var K = undefined;
                if ((Y.tag & _1) !== X0)
                  K = "useLayoutEffect";
                else if ((Y.tag & c8) !== X0)
                  K = "useInsertionEffect";
                else
                  K = "useEffect";
                var V = undefined;
                if (z === null)
                  V = " You returned null. If your effect does not require clean up, return undefined (or nothing).";
                else if (typeof z.then === "function")
                  V = "\n\nIt looks like you wrote " + K + "(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\n" + K + "(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching";
                else
                  V = " You returned: " + z;
                U("%s must not return anything besides a function, which is used for clean-up.%s", K, V);
              }
            }
          }
          Y = Y.next;
        } while (Y !== G);
      }
    }
    function DF(J, Q) {
      if ((Q.flags & x0) !== X0)
        switch (Q.tag) {
          case y0: {
            var X = Q.stateNode.passiveEffectDuration, Z = Q.memoizedProps, G = Z.id, Y = Z.onPostCommit, W = XV(), z = Q.alternate === null ? "mount" : "update";
            if (QV())
              z = "nested-update";
            if (typeof Y === "function")
              Y(G, z, X, W);
            var K = Q.return;
            J:
              while (K !== null) {
                switch (K.tag) {
                  case k:
                    var V = K.stateNode;
                    V.passiveEffectDuration += X;
                    break J;
                  case y0:
                    var $ = K.stateNode;
                    $.passiveEffectDuration += X;
                    break J;
                }
                K = K.return;
              }
            break;
          }
        }
    }
    function EF(J, Q, X, Z) {
      if ((X.flags & RX) !== X0)
        switch (X.tag) {
          case n:
          case G0:
          case g0: {
            if (!e1)
              if (X.mode & d0)
                try {
                  p8(), QQ(_1 | S1, X);
                } finally {
                  i8(X);
                }
              else
                QQ(_1 | S1, X);
            break;
          }
          case h: {
            var G = X.stateNode;
            if (X.flags & x0) {
              if (!e1)
                if (Q === null) {
                  if (X.type === X.elementType && !fQ) {
                    if (G.props !== X.memoizedProps)
                      U("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", q0(X) || "instance");
                    if (G.state !== X.memoizedState)
                      U("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", q0(X) || "instance");
                  }
                  if (X.mode & d0)
                    try {
                      p8(), G.componentDidMount();
                    } finally {
                      i8(X);
                    }
                  else
                    G.componentDidMount();
                } else {
                  var Y = X.elementType === X.type ? Q.memoizedProps : R8(X.type, Q.memoizedProps), W = Q.memoizedState;
                  if (X.type === X.elementType && !fQ) {
                    if (G.props !== X.memoizedProps)
                      U("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", q0(X) || "instance");
                    if (G.state !== X.memoizedState)
                      U("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", q0(X) || "instance");
                  }
                  if (X.mode & d0)
                    try {
                      p8(), G.componentDidUpdate(Y, W, G.__reactInternalSnapshotBeforeUpdate);
                    } finally {
                      i8(X);
                    }
                  else
                    G.componentDidUpdate(Y, W, G.__reactInternalSnapshotBeforeUpdate);
                }
            }
            var z = X.updateQueue;
            if (z !== null) {
              if (X.type === X.elementType && !fQ) {
                if (G.props !== X.memoizedProps)
                  U("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", q0(X) || "instance");
                if (G.state !== X.memoizedState)
                  U("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", q0(X) || "instance");
              }
              MB(X, z, G);
            }
            break;
          }
          case k: {
            var K = X.updateQueue;
            if (K !== null) {
              var V = null;
              if (X.child !== null)
                switch (X.child.tag) {
                  case p:
                    V = oG(X.child.stateNode);
                    break;
                  case h:
                    V = X.child.stateNode;
                    break;
                }
              MB(X, K, V);
            }
            break;
          }
          case p: {
            var $ = X.stateNode;
            if (Q === null && X.flags & x0) {
              var { type: A, memoizedProps: q } = X;
              mq($, A, q);
            }
            break;
          }
          case L0:
            break;
          case i:
            break;
          case y0: {
            {
              var I = X.memoizedProps, E = I.onCommit, R = I.onRender, y = X.stateNode.effectDuration, e = XV(), o = Q === null ? "mount" : "update";
              if (QV())
                o = "nested-update";
              if (typeof R === "function")
                R(X.memoizedProps.id, o, X.actualDuration, X.treeBaseDuration, X.actualStartTime, e);
              {
                if (typeof E === "function")
                  E(X.memoizedProps.id, o, y, e);
                ID(X);
                var w0 = X.return;
                J:
                  while (w0 !== null) {
                    switch (w0.tag) {
                      case k:
                        var I0 = w0.stateNode;
                        I0.effectDuration += y;
                        break J;
                      case y0:
                        var P = w0.stateNode;
                        P.effectDuration += y;
                        break J;
                    }
                    w0 = w0.return;
                  }
              }
            }
            break;
          }
          case E0: {
            jF(J, X);
            break;
          }
          case R1:
          case l0:
          case i0:
          case K0:
          case J1:
          case q7:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      if (!e1) {
        if (X.flags & fJ)
          hV(X);
      }
    }
    function wF(J) {
      switch (J.tag) {
        case n:
        case G0:
        case g0: {
          if (J.mode & d0)
            try {
              p8(), vV(J, J.return);
            } finally {
              i8(J);
            }
          else
            vV(J, J.return);
          break;
        }
        case h: {
          var Q = J.stateNode;
          if (typeof Q.componentDidMount === "function")
            MF(J, J.return, Q);
          CV(J, J.return);
          break;
        }
        case p: {
          CV(J, J.return);
          break;
        }
      }
    }
    function IF(J, Q) {
      var X = null;
      {
        var Z = J;
        while (true) {
          if (Z.tag === p) {
            if (X === null) {
              X = Z;
              try {
                var G = Z.stateNode;
                if (Q)
                  oq(G);
                else
                  eq(Z.stateNode, Z.memoizedProps);
              } catch (W) {
                t0(J, J.return, W);
              }
            }
          } else if (Z.tag === L0) {
            if (X === null)
              try {
                var Y = Z.stateNode;
                if (Q)
                  tq(Y);
                else
                  JA(Y, Z.memoizedProps);
              } catch (W) {
                t0(J, J.return, W);
              }
          } else if ((Z.tag === K0 || Z.tag === J1) && Z.memoizedState !== null && Z !== J)
            ;
          else if (Z.child !== null) {
            Z.child.return = Z, Z = Z.child;
            continue;
          }
          if (Z === J)
            return;
          while (Z.sibling === null) {
            if (Z.return === null || Z.return === J)
              return;
            if (X === Z)
              X = null;
            Z = Z.return;
          }
          if (X === Z)
            X = null;
          Z.sibling.return = Z.return, Z = Z.sibling;
        }
      }
    }
    function hV(J) {
      var Q = J.ref;
      if (Q !== null) {
        var X = J.stateNode, Z;
        switch (J.tag) {
          case p:
            Z = oG(X);
            break;
          default:
            Z = X;
        }
        if (typeof Q === "function") {
          var G;
          if (J.mode & d0)
            try {
              p8(), G = Q(Z);
            } finally {
              i8(J);
            }
          else
            G = Q(Z);
          if (typeof G === "function")
            U("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", q0(J));
        } else {
          if (!Q.hasOwnProperty("current"))
            U("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", q0(J));
          Q.current = Z;
        }
      }
    }
    function RF(J) {
      var Q = J.alternate;
      if (Q !== null)
        Q.return = null;
      J.return = null;
    }
    function bV(J) {
      var Q = J.alternate;
      if (Q !== null)
        J.alternate = null, bV(Q);
      {
        if (J.child = null, J.deletions = null, J.sibling = null, J.tag === p) {
          var X = J.stateNode;
          if (X !== null)
            vA(X);
        }
        J.stateNode = null, J._debugOwner = null, J.return = null, J.dependencies = null, J.memoizedProps = null, J.memoizedState = null, J.pendingProps = null, J.stateNode = null, J.updateQueue = null;
      }
    }
    function LF(J) {
      var Q = J.return;
      while (Q !== null) {
        if (fV(Q))
          return Q;
        Q = Q.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function fV(J) {
      return J.tag === p || J.tag === k || J.tag === i;
    }
    function dV(J) {
      var Q = J;
      J:
        while (true) {
          while (Q.sibling === null) {
            if (Q.return === null || fV(Q.return))
              return null;
            Q = Q.return;
          }
          Q.sibling.return = Q.return, Q = Q.sibling;
          while (Q.tag !== p && Q.tag !== L0 && Q.tag !== h1) {
            if (Q.flags & F1)
              continue J;
            if (Q.child === null || Q.tag === i)
              continue J;
            else
              Q.child.return = Q, Q = Q.child;
          }
          if (!(Q.flags & F1))
            return Q.stateNode;
        }
    }
    function NF(J) {
      var Q = LF(J);
      switch (Q.tag) {
        case p: {
          var X = Q.stateNode;
          if (Q.flags & wX)
            f3(X), Q.flags &= ~wX;
          var Z = dV(J);
          sW(J, Z, X);
          break;
        }
        case k:
        case i: {
          var G = Q.stateNode.containerInfo, Y = dV(J);
          cW(J, Y, G);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function cW(J, Q, X) {
      var Z = J.tag, G = Z === p || Z === L0;
      if (G) {
        var Y = J.stateNode;
        if (Q)
          pq(X, Y, Q);
        else
          lq(X, Y);
      } else if (Z === i)
        ;
      else {
        var W = J.child;
        if (W !== null) {
          cW(W, Q, X);
          var z = W.sibling;
          while (z !== null)
            cW(z, Q, X), z = z.sibling;
        }
      }
    }
    function sW(J, Q, X) {
      var Z = J.tag, G = Z === p || Z === L0;
      if (G) {
        var Y = J.stateNode;
        if (Q)
          iq(X, Y, Q);
        else
          sq(X, Y);
      } else if (Z === i)
        ;
      else {
        var W = J.child;
        if (W !== null) {
          sW(W, Q, X);
          var z = W.sibling;
          while (z !== null)
            sW(z, Q, X), z = z.sibling;
        }
      }
    }
    var J7 = null, j8 = false;
    function SF(J, Q, X) {
      {
        var Z = Q;
        J:
          while (Z !== null) {
            switch (Z.tag) {
              case p: {
                J7 = Z.stateNode, j8 = false;
                break J;
              }
              case k: {
                J7 = Z.stateNode.containerInfo, j8 = true;
                break J;
              }
              case i: {
                J7 = Z.stateNode.containerInfo, j8 = true;
                break J;
              }
            }
            Z = Z.return;
          }
        if (J7 === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        uV(J, Q, X), J7 = null, j8 = false;
      }
      RF(X);
    }
    function XQ(J, Q, X) {
      var Z = X.child;
      while (Z !== null)
        uV(J, Q, Z), Z = Z.sibling;
    }
    function uV(J, Q, X) {
      switch (xH(X), X.tag) {
        case p:
          if (!e1)
            l5(X, Q);
        case L0: {
          {
            var Z = J7, G = j8;
            if (J7 = null, XQ(J, Q, X), J7 = Z, j8 = G, J7 !== null)
              if (j8)
                rq(J7, X.stateNode);
              else
                aq(J7, X.stateNode);
          }
          return;
        }
        case h1: {
          if (J7 !== null)
            if (j8)
              nq(J7, X.stateNode);
            else
              QY(J7, X.stateNode);
          return;
        }
        case i: {
          {
            var Y = J7, W = j8;
            J7 = X.stateNode.containerInfo, j8 = true, XQ(J, Q, X), J7 = Y, j8 = W;
          }
          return;
        }
        case n:
        case G0:
        case B1:
        case g0: {
          if (!e1) {
            var z = X.updateQueue;
            if (z !== null) {
              var K = z.lastEffect;
              if (K !== null) {
                var V = K.next, $ = V;
                do {
                  var A = $, q = A.destroy, I = A.tag;
                  if (q !== undefined) {
                    if ((I & c8) !== T7)
                      s6(X, Q, q);
                    else if ((I & _1) !== T7) {
                      if (EK(X), X.mode & d0)
                        p8(), s6(X, Q, q), i8(X);
                      else
                        s6(X, Q, q);
                      wK();
                    }
                  }
                  $ = $.next;
                } while ($ !== V);
              }
            }
          }
          XQ(J, Q, X);
          return;
        }
        case h: {
          if (!e1) {
            l5(X, Q);
            var E = X.stateNode;
            if (typeof E.componentWillUnmount === "function")
              yW(X, Q, E);
          }
          XQ(J, Q, X);
          return;
        }
        case i0: {
          XQ(J, Q, X);
          return;
        }
        case K0: {
          if (X.mode & N0) {
            var R = e1;
            e1 = R || X.memoizedState !== null, XQ(J, Q, X), e1 = R;
          } else
            XQ(J, Q, X);
          break;
        }
        default: {
          XQ(J, Q, X);
          return;
        }
      }
    }
    function _F(J) {
      var Q = J.memoizedState;
    }
    function jF(J, Q) {
      var X = Q.memoizedState;
      if (X === null) {
        var Z = Q.alternate;
        if (Z !== null) {
          var G = Z.memoizedState;
          if (G !== null) {
            var Y = G.dehydrated;
            if (Y !== null)
              MA(Y);
          }
        }
      }
    }
    function mV(J) {
      var Q = J.updateQueue;
      if (Q !== null) {
        J.updateQueue = null;
        var X = J.stateNode;
        if (X === null)
          X = J.stateNode = new UF;
        Q.forEach(function(Z) {
          var G = xD.bind(null, J, Z);
          if (!X.has(Z)) {
            if (X.add(Z), F8)
              if (c5 !== null && s5 !== null)
                dZ(s5, c5);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            Z.then(G, G);
          }
        });
      }
    }
    function xF(J, Q, X) {
      c5 = X, s5 = J, W1(Q), yV(Q, J), W1(Q), c5 = null, s5 = null;
    }
    function x8(J, Q, X) {
      var Z = Q.deletions;
      if (Z !== null)
        for (var G = 0;G < Z.length; G++) {
          var Y = Z[G];
          try {
            SF(J, Q, Y);
          } catch (K) {
            t0(Y, Q, K);
          }
        }
      var W = R4();
      if (Q.subtreeFlags & r4) {
        var z = Q.child;
        while (z !== null)
          W1(z), yV(z, J), z = z.sibling;
      }
      W1(W);
    }
    function yV(J, Q, X) {
      var { alternate: Z, flags: G } = J;
      switch (J.tag) {
        case n:
        case G0:
        case B1:
        case g0: {
          if (x8(Q, J), a8(J), G & x0) {
            try {
              _8(c8 | S1, J, J.return), QQ(c8 | S1, J);
            } catch (W0) {
              t0(J, J.return, W0);
            }
            if (J.mode & d0) {
              try {
                p8(), _8(_1 | S1, J, J.return);
              } catch (W0) {
                t0(J, J.return, W0);
              }
              i8(J);
            } else
              try {
                _8(_1 | S1, J, J.return);
              } catch (W0) {
                t0(J, J.return, W0);
              }
          }
          return;
        }
        case h: {
          if (x8(Q, J), a8(J), G & fJ) {
            if (Z !== null)
              l5(Z, Z.return);
          }
          return;
        }
        case p: {
          if (x8(Q, J), a8(J), G & fJ) {
            if (Z !== null)
              l5(Z, Z.return);
          }
          {
            if (J.flags & wX) {
              var Y = J.stateNode;
              try {
                f3(Y);
              } catch (W0) {
                t0(J, J.return, W0);
              }
            }
            if (G & x0) {
              var W = J.stateNode;
              if (W != null) {
                var z = J.memoizedProps, K = Z !== null ? Z.memoizedProps : z, V = J.type, $ = J.updateQueue;
                if (J.updateQueue = null, $ !== null)
                  try {
                    yq(W, $, V, K, z, J);
                  } catch (W0) {
                    t0(J, J.return, W0);
                  }
              }
            }
          }
          return;
        }
        case L0: {
          if (x8(Q, J), a8(J), G & x0) {
            if (J.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var { stateNode: A, memoizedProps: q } = J, I = Z !== null ? Z.memoizedProps : q;
            try {
              cq(A, I, q);
            } catch (W0) {
              t0(J, J.return, W0);
            }
          }
          return;
        }
        case k: {
          if (x8(Q, J), a8(J), G & x0) {
            if (Z !== null) {
              var E = Z.memoizedState;
              if (E.isDehydrated)
                try {
                  OA(Q.containerInfo);
                } catch (W0) {
                  t0(J, J.return, W0);
                }
            }
          }
          return;
        }
        case i: {
          x8(Q, J), a8(J);
          return;
        }
        case E0: {
          x8(Q, J), a8(J);
          var R = J.child;
          if (R.flags & AQ) {
            var { stateNode: y, memoizedState: e } = R, o = e !== null;
            if (y.isHidden = o, o) {
              var w0 = R.alternate !== null && R.alternate.memoizedState !== null;
              if (!w0)
                MD();
            }
          }
          if (G & x0) {
            try {
              _F(J);
            } catch (W0) {
              t0(J, J.return, W0);
            }
            mV(J);
          }
          return;
        }
        case K0: {
          var I0 = Z !== null && Z.memoizedState !== null;
          if (J.mode & N0) {
            var P = e1;
            e1 = P || I0, x8(Q, J), e1 = P;
          } else
            x8(Q, J);
          if (a8(J), G & AQ) {
            var { stateNode: N, memoizedState: F } = J, g = F !== null, l = J;
            if (N.isHidden = g, g) {
              if (!I0) {
                if ((l.mode & N0) !== Z0) {
                  a = l;
                  var u = l.child;
                  while (u !== null)
                    a = u, vF(u), u = u.sibling;
                }
              }
            }
            IF(l, g);
          }
          return;
        }
        case R1: {
          if (x8(Q, J), a8(J), G & x0)
            mV(J);
          return;
        }
        case i0:
          return;
        default: {
          x8(Q, J), a8(J);
          return;
        }
      }
    }
    function a8(J) {
      var Q = J.flags;
      if (Q & F1) {
        try {
          NF(J);
        } catch (X) {
          t0(J, J.return, X);
        }
        J.flags &= ~F1;
      }
      if (Q & zJ)
        J.flags &= ~zJ;
    }
    function gF(J, Q, X) {
      c5 = X, s5 = Q, a = J, cV(J, Q, X), c5 = null, s5 = null;
    }
    function cV(J, Q, X) {
      var Z = (J.mode & N0) !== Z0;
      while (a !== null) {
        var G = a, Y = G.child;
        if (G.tag === K0 && Z) {
          var W = G.memoizedState !== null, z = W || c6;
          if (z) {
            lW(J, Q, X);
            continue;
          } else {
            var K = G.alternate, V = K !== null && K.memoizedState !== null, $ = V || e1, A = c6, q = e1;
            if (c6 = z, e1 = $, e1 && !q)
              a = G, CF(G);
            var I = Y;
            while (I !== null)
              a = I, cV(I, Q, X), I = I.sibling;
            a = G, c6 = A, e1 = q, lW(J, Q, X);
            continue;
          }
        }
        if ((G.subtreeFlags & RX) !== X0 && Y !== null)
          Y.return = G, a = Y;
        else
          lW(J, Q, X);
      }
    }
    function lW(J, Q, X) {
      while (a !== null) {
        var Z = a;
        if ((Z.flags & RX) !== X0) {
          var G = Z.alternate;
          W1(Z);
          try {
            EF(Q, G, Z, X);
          } catch (W) {
            t0(Z, Z.return, W);
          }
          f1();
        }
        if (Z === J) {
          a = null;
          return;
        }
        var Y = Z.sibling;
        if (Y !== null) {
          Y.return = Z.return, a = Y;
          return;
        }
        a = Z.return;
      }
    }
    function vF(J) {
      while (a !== null) {
        var Q = a, X = Q.child;
        switch (Q.tag) {
          case n:
          case G0:
          case B1:
          case g0: {
            if (Q.mode & d0)
              try {
                p8(), _8(_1, Q, Q.return);
              } finally {
                i8(Q);
              }
            else
              _8(_1, Q, Q.return);
            break;
          }
          case h: {
            l5(Q, Q.return);
            var Z = Q.stateNode;
            if (typeof Z.componentWillUnmount === "function")
              yW(Q, Q.return, Z);
            break;
          }
          case p: {
            l5(Q, Q.return);
            break;
          }
          case K0: {
            var G = Q.memoizedState !== null;
            if (G) {
              sV(J);
              continue;
            }
            break;
          }
        }
        if (X !== null)
          X.return = Q, a = X;
        else
          sV(J);
      }
    }
    function sV(J) {
      while (a !== null) {
        var Q = a;
        if (Q === J) {
          a = null;
          return;
        }
        var X = Q.sibling;
        if (X !== null) {
          X.return = Q.return, a = X;
          return;
        }
        a = Q.return;
      }
    }
    function CF(J) {
      while (a !== null) {
        var Q = a, X = Q.child;
        if (Q.tag === K0) {
          var Z = Q.memoizedState !== null;
          if (Z) {
            lV(J);
            continue;
          }
        }
        if (X !== null)
          X.return = Q, a = X;
        else
          lV(J);
      }
    }
    function lV(J) {
      while (a !== null) {
        var Q = a;
        W1(Q);
        try {
          wF(Q);
        } catch (Z) {
          t0(Q, Q.return, Z);
        }
        if (f1(), Q === J) {
          a = null;
          return;
        }
        var X = Q.sibling;
        if (X !== null) {
          X.return = Q.return, a = X;
          return;
        }
        a = Q.return;
      }
    }
    function TF(J, Q, X, Z) {
      a = Q, kF(Q, J, X, Z);
    }
    function kF(J, Q, X, Z) {
      while (a !== null) {
        var G = a, Y = G.child;
        if ((G.subtreeFlags & U5) !== X0 && Y !== null)
          Y.return = G, a = Y;
        else
          hF(J, Q, X, Z);
      }
    }
    function hF(J, Q, X, Z) {
      while (a !== null) {
        var G = a;
        if ((G.flags & P8) !== X0) {
          W1(G);
          try {
            bF(Q, G, X, Z);
          } catch (W) {
            t0(G, G.return, W);
          }
          f1();
        }
        if (G === J) {
          a = null;
          return;
        }
        var Y = G.sibling;
        if (Y !== null) {
          Y.return = G.return, a = Y;
          return;
        }
        a = G.return;
      }
    }
    function bF(J, Q, X, Z) {
      switch (Q.tag) {
        case n:
        case G0:
        case g0: {
          if (Q.mode & d0) {
            wW();
            try {
              QQ(o1 | S1, Q);
            } finally {
              EW(Q);
            }
          } else
            QQ(o1 | S1, Q);
          break;
        }
      }
    }
    function fF(J) {
      a = J, dF();
    }
    function dF() {
      while (a !== null) {
        var J = a, Q = J.child;
        if ((a.flags & MQ) !== X0) {
          var X = J.deletions;
          if (X !== null) {
            for (var Z = 0;Z < X.length; Z++) {
              var G = X[Z];
              a = G, yF(G, J);
            }
            {
              var Y = J.alternate;
              if (Y !== null) {
                var W = Y.child;
                if (W !== null) {
                  Y.child = null;
                  do {
                    var z = W.sibling;
                    W.sibling = null, W = z;
                  } while (W !== null);
                }
              }
            }
            a = J;
          }
        }
        if ((J.subtreeFlags & U5) !== X0 && Q !== null)
          Q.return = J, a = Q;
        else
          uF();
      }
    }
    function uF() {
      while (a !== null) {
        var J = a;
        if ((J.flags & P8) !== X0)
          W1(J), mF(J), f1();
        var Q = J.sibling;
        if (Q !== null) {
          Q.return = J.return, a = Q;
          return;
        }
        a = J.return;
      }
    }
    function mF(J) {
      switch (J.tag) {
        case n:
        case G0:
        case g0: {
          if (J.mode & d0)
            wW(), _8(o1 | S1, J, J.return), EW(J);
          else
            _8(o1 | S1, J, J.return);
          break;
        }
      }
    }
    function yF(J, Q) {
      while (a !== null) {
        var X = a;
        W1(X), sF(X, Q), f1();
        var Z = X.child;
        if (Z !== null)
          Z.return = X, a = Z;
        else
          cF(J);
      }
    }
    function cF(J) {
      while (a !== null) {
        var Q = a, X = Q.sibling, Z = Q.return;
        if (bV(Q), Q === J) {
          a = null;
          return;
        }
        if (X !== null) {
          X.return = Z, a = X;
          return;
        }
        a = Z;
      }
    }
    function sF(J, Q) {
      switch (J.tag) {
        case n:
        case G0:
        case g0: {
          if (J.mode & d0)
            wW(), _8(o1, J, Q), EW(J);
          else
            _8(o1, J, Q);
          break;
        }
      }
    }
    function lF(J) {
      switch (J.tag) {
        case n:
        case G0:
        case g0: {
          try {
            QQ(_1 | S1, J);
          } catch (X) {
            t0(J, J.return, X);
          }
          break;
        }
        case h: {
          var Q = J.stateNode;
          try {
            Q.componentDidMount();
          } catch (X) {
            t0(J, J.return, X);
          }
          break;
        }
      }
    }
    function iF(J) {
      switch (J.tag) {
        case n:
        case G0:
        case g0: {
          try {
            QQ(o1 | S1, J);
          } catch (Q) {
            t0(J, J.return, Q);
          }
          break;
        }
      }
    }
    function pF(J) {
      switch (J.tag) {
        case n:
        case G0:
        case g0: {
          try {
            _8(_1 | S1, J, J.return);
          } catch (X) {
            t0(J, J.return, X);
          }
          break;
        }
        case h: {
          var Q = J.stateNode;
          if (typeof Q.componentWillUnmount === "function")
            yW(J, J.return, Q);
          break;
        }
      }
    }
    function aF(J) {
      switch (J.tag) {
        case n:
        case G0:
        case g0:
          try {
            _8(o1 | S1, J, J.return);
          } catch (Q) {
            t0(J, J.return, Q);
          }
      }
    }
    var rF = 0, nF = 1, oF = 2, tF = 3, eF = 4;
    if (typeof Symbol === "function" && Symbol.for) {
      var _Z = Symbol.for;
      rF = _Z("selector.component"), nF = _Z("selector.has_pseudo_class"), oF = _Z("selector.role"), tF = _Z("selector.test_id"), eF = _Z("selector.text");
    }
    var JD = [];
    function QD() {
      JD.forEach(function(J) {
        return J();
      });
    }
    var XD = S.ReactCurrentActQueue;
    function ZD(J) {
      {
        var Q = typeof IS_REACT_ACT_ENVIRONMENT !== "undefined" ? IS_REACT_ACT_ENVIRONMENT : undefined, X = typeof jest !== "undefined";
        return X && Q !== false;
      }
    }
    function iV() {
      {
        var J = typeof IS_REACT_ACT_ENVIRONMENT !== "undefined" ? IS_REACT_ACT_ENVIRONMENT : undefined;
        if (!J && XD.current !== null)
          U("The current testing environment is not configured to support act(...)");
        return J;
      }
    }
    var GD = Math.ceil, iW = S.ReactCurrentDispatcher, pW = S.ReactCurrentOwner, Q7 = S.ReactCurrentBatchConfig, g8 = S.ReactCurrentActQueue, g1 = 0, pV = 1, X7 = 2, V8 = 4, DJ = 0, jZ = 1, dQ = 2, l6 = 3, xZ = 4, aV = 5, aW = 6, S0 = g1, R7 = null, K1 = null, v1 = j, r8 = j, rW = iJ(j), C1 = DJ, gZ = null, nW = j, i6 = j, vZ = j, p6 = j, CZ = null, k7 = null, oW = 0, rV = 500, nV = Infinity, YD = 500, EJ = null;
    function TZ() {
      nV = d1() + YD;
    }
    function oV() {
      return nV;
    }
    var a6 = false, tW = null, i5 = null, uQ = false, ZQ = null, kZ = j, eW = [], Jz = null, WD = 50, hZ = 0, Qz = null, Xz = false, r6 = false, zD = 50, p5 = 0, n6 = null, bZ = X1, o6 = j, tV = false;
    function t6() {
      return R7;
    }
    function L7() {
      if ((S0 & (X7 | V8)) !== g1)
        return d1();
      if (bZ !== X1)
        return bZ;
      return bZ = d1(), bZ;
    }
    function GQ(J) {
      var Q = J.mode;
      if ((Q & N0) === Z0)
        return B0;
      else if ((S0 & X7) !== g1 && v1 !== j)
        return gX(v1);
      var X = eA() !== tA;
      if (X) {
        if (Q7.transition !== null) {
          var Z = Q7.transition;
          if (!Z._updatedFibers)
            Z._updatedFibers = new Set;
          Z._updatedFibers.add(J);
        }
        if (o6 === m1)
          o6 = xK();
        return o6;
      }
      var G = D8();
      if (G !== m1)
        return G;
      var Y = bq();
      return Y;
    }
    function KD(J) {
      var Q = J.mode;
      if ((Q & N0) === Z0)
        return B0;
      return zO();
    }
    function T1(J, Q, X, Z) {
      if (vD(), tV)
        U("useInsertionEffect must not schedule updates.");
      if (Xz)
        r6 = true;
      if (vX(J, X, Z), (S0 & X7) !== j && J === R7)
        kD(Q);
      else {
        if (F8)
          CK(J, Q, X);
        if (hD(Q), J === R7) {
          if ((S0 & X7) === g1)
            vZ = F0(vZ, X);
          if (C1 === xZ)
            YQ(J, v1);
        }
        if (h7(J, Z), X === B0 && S0 === g1 && (Q.mode & N0) === Z0 && !g8.isBatchingLegacy)
          TZ(), n3();
      }
    }
    function BD(J, Q, X) {
      var Z = J.current;
      Z.lanes = Q, vX(J, Q, X), h7(J, X);
    }
    function VD(J) {
      return (S0 & X7) !== g1;
    }
    function h7(J, Q) {
      var X = J.callbackNode;
      QO(J, Q);
      var Z = q9(J, J === R7 ? v1 : j);
      if (Z === j) {
        if (X !== null)
          O$(X);
        J.callbackNode = null, J.callbackPriority = m1;
        return;
      }
      var G = RQ(Z), Y = J.callbackPriority;
      if (Y === G && !(g8.current !== null && X !== Bz)) {
        if (X == null && Y !== B0)
          U("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      if (X != null)
        O$(X);
      var W;
      if (G === B0) {
        if (J.tag === pJ) {
          if (g8.isBatchingLegacy !== null)
            g8.didScheduleLegacyUpdate = true;
          kA(Q$.bind(null, J));
        } else
          r3(Q$.bind(null, J));
        if (g8.current !== null)
          g8.current.push(aJ);
        else
          dq(function() {
            if ((S0 & (X7 | V8)) === g1)
              aJ();
          });
        W = null;
      } else {
        var z;
        switch (hK(Z)) {
          case c7:
            z = U9;
            break;
          case $J:
            z = n4;
            break;
          case UJ:
            z = DQ;
            break;
          case D9:
            z = o4;
            break;
          default:
            z = DQ;
            break;
        }
        W = Vz(z, eV.bind(null, J));
      }
      J.callbackPriority = G, J.callbackNode = W;
    }
    function eV(J, Q) {
      if (SP(), bZ = X1, o6 = j, (S0 & (X7 | V8)) !== g1)
        throw new Error("Should not already be working.");
      var X = J.callbackNode, Z = IJ();
      if (Z) {
        if (J.callbackNode !== X)
          return null;
      }
      var G = q9(J, J === R7 ? v1 : j);
      if (G === j)
        return null;
      var Y = !A9(J, G) && !WO(J, G) && !Q, W = Y ? DD(J, G) : J4(J, G);
      if (W !== DJ) {
        if (W === dQ) {
          var z = FG(J);
          if (z !== j)
            G = z, W = Zz(J, z);
        }
        if (W === jZ) {
          var K = gZ;
          throw mQ(J, j), YQ(J, G), h7(J, d1()), K;
        }
        if (W === aW)
          YQ(J, G);
        else {
          var V = !A9(J, G), $ = J.current.alternate;
          if (V && !UD($)) {
            if (W = J4(J, G), W === dQ) {
              var A = FG(J);
              if (A !== j)
                G = A, W = Zz(J, A);
            }
            if (W === jZ) {
              var q = gZ;
              throw mQ(J, j), YQ(J, G), h7(J, d1()), q;
            }
          }
          J.finishedWork = $, J.finishedLanes = G, $D(J, W, G);
        }
      }
      if (h7(J, d1()), J.callbackNode === X)
        return eV.bind(null, J);
      return null;
    }
    function Zz(J, Q) {
      var X = CZ;
      if (E9(J)) {
        var Z = mQ(J, Q);
        Z.flags |= WJ, _A(J.containerInfo);
      }
      var G = J4(J, Q);
      if (G !== dQ) {
        var Y = k7;
        if (k7 = X, Y !== null)
          J$(Y);
      }
      return G;
    }
    function J$(J) {
      if (k7 === null)
        k7 = J;
      else
        k7.push.apply(k7, J);
    }
    function $D(J, Q, X) {
      switch (Q) {
        case DJ:
        case jZ:
          throw new Error("Root did not complete. This is a bug in React.");
        case dQ: {
          yQ(J, k7, EJ);
          break;
        }
        case l6: {
          if (YQ(J, X), _K(X) && !M$()) {
            var Z = oW + rV - d1();
            if (Z > 10) {
              var G = q9(J, j);
              if (G !== j)
                break;
              var Y = J.suspendedLanes;
              if (!A5(Y, X)) {
                var W = L7();
                vK(J, Y);
                break;
              }
              J.timeoutHandle = eG(yQ.bind(null, J, k7, EJ), Z);
              break;
            }
          }
          yQ(J, k7, EJ);
          break;
        }
        case xZ: {
          if (YQ(J, X), YO(X))
            break;
          if (!M$()) {
            var z = eH(J, X), K = z, V = d1() - K, $ = gD(V) - V;
            if ($ > 10) {
              J.timeoutHandle = eG(yQ.bind(null, J, k7, EJ), $);
              break;
            }
          }
          yQ(J, k7, EJ);
          break;
        }
        case aV: {
          yQ(J, k7, EJ);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function UD(J) {
      var Q = J;
      while (true) {
        if (Q.flags & V9) {
          var X = Q.updateQueue;
          if (X !== null) {
            var Z = X.stores;
            if (Z !== null)
              for (var G = 0;G < Z.length; G++) {
                var Y = Z[G], W = Y.getSnapshot, z = Y.value;
                try {
                  if (!l7(W(), z))
                    return false;
                } catch (V) {
                  return false;
                }
              }
          }
        }
        var K = Q.child;
        if (Q.subtreeFlags & V9 && K !== null) {
          K.return = Q, Q = K;
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
    function YQ(J, Q) {
      Q = P9(Q, p6), Q = P9(Q, vZ), BO(J, Q);
    }
    function Q$(J) {
      if (_P(), (S0 & (X7 | V8)) !== g1)
        throw new Error("Should not already be working.");
      IJ();
      var Q = q9(J, j);
      if (!y7(Q, B0))
        return h7(J, d1()), null;
      var X = J4(J, Q);
      if (J.tag !== pJ && X === dQ) {
        var Z = FG(J);
        if (Z !== j)
          Q = Z, X = Zz(J, Z);
      }
      if (X === jZ) {
        var G = gZ;
        throw mQ(J, j), YQ(J, Q), h7(J, d1()), G;
      }
      if (X === aW)
        throw new Error("Root did not complete. This is a bug in React.");
      var Y = J.current.alternate;
      return J.finishedWork = Y, J.finishedLanes = Q, yQ(J, k7, EJ), h7(J, d1()), null;
    }
    function HD(J, Q) {
      if (Q !== j) {
        if (IG(J, F0(Q, B0)), h7(J, d1()), (S0 & (X7 | V8)) === g1)
          TZ(), aJ();
      }
    }
    function Gz(J, Q) {
      var X = S0;
      S0 |= pV;
      try {
        return J(Q);
      } finally {
        if (S0 = X, S0 === g1 && !g8.isBatchingLegacy)
          TZ(), n3();
      }
    }
    function OD(J, Q, X, Z, G) {
      var Y = D8(), W = Q7.transition;
      try {
        return Q7.transition = null, y1(c7), J(Q, X, Z, G);
      } finally {
        if (y1(Y), Q7.transition = W, S0 === g1)
          TZ();
      }
    }
    function wJ(J) {
      if (ZQ !== null && ZQ.tag === pJ && (S0 & (X7 | V8)) === g1)
        IJ();
      var Q = S0;
      S0 |= pV;
      var X = Q7.transition, Z = D8();
      try {
        if (Q7.transition = null, y1(c7), J)
          return J();
        else
          return;
      } finally {
        if (y1(Z), Q7.transition = X, S0 = Q, (S0 & (X7 | V8)) === g1)
          aJ();
      }
    }
    function X$() {
      return (S0 & (X7 | V8)) !== g1;
    }
    function e6(J, Q) {
      U7(rW, r8, J), r8 = F0(r8, Q), nW = F0(nW, Q);
    }
    function Yz(J) {
      r8 = rW.current, $7(rW, J);
    }
    function mQ(J, Q) {
      J.finishedWork = null, J.finishedLanes = j;
      var X = J.timeoutHandle;
      if (X !== JY)
        J.timeoutHandle = JY, fq(X);
      if (K1 !== null) {
        var Z = K1.return;
        while (Z !== null) {
          var G = Z.alternate;
          xV(G, Z), Z = Z.return;
        }
      }
      R7 = J;
      var Y = cQ(J.current, null);
      return K1 = Y, v1 = r8 = nW = Q, C1 = DJ, gZ = null, i6 = j, vZ = j, p6 = j, CZ = null, k7 = null, ZP(), I8.discardPendingWarnings(), Y;
    }
    function Z$(J, Q) {
      do {
        var X = K1;
        try {
          if (Y6(), vB(), f1(), pW.current = null, X === null || X.return === null) {
            C1 = jZ, gZ = Q, K1 = null;
            return;
          }
          if (o7 && X.mode & d0)
            d6(X, true);
          if (k8)
            if (H5(), Q !== null && typeof Q === "object" && typeof Q.then === "function") {
              var Z = Q;
              mH(X, Z, v1);
            } else
              uH(X, Q, v1);
          CP(J, X.return, X, Q, v1), z$(X);
        } catch (G) {
          if (Q = G, K1 === X && X !== null)
            X = X.return, K1 = X;
          else
            X = K1;
          continue;
        }
        return;
      } while (true);
    }
    function G$() {
      var J = iW.current;
      if (iW.current = T6, J === null)
        return T6;
      else
        return J;
    }
    function Y$(J) {
      iW.current = J;
    }
    function MD() {
      oW = d1();
    }
    function fZ(J) {
      i6 = F0(J, i6);
    }
    function qD() {
      if (C1 === DJ)
        C1 = l6;
    }
    function Wz() {
      if (C1 === DJ || C1 === l6 || C1 === dQ)
        C1 = xZ;
      if (R7 !== null && (DG(i6) || DG(vZ)))
        YQ(R7, v1);
    }
    function AD(J) {
      if (C1 !== xZ)
        C1 = dQ;
      if (CZ === null)
        CZ = [J];
      else
        CZ.push(J);
    }
    function PD() {
      return C1 === DJ;
    }
    function J4(J, Q) {
      var X = S0;
      S0 |= X7;
      var Z = G$();
      if (R7 !== J || v1 !== Q) {
        if (F8) {
          var G = J.memoizedUpdaters;
          if (G.size > 0)
            dZ(J, v1), G.clear();
          TK(J, Q);
        }
        EJ = kK(), mQ(J, Q);
      }
      IK(Q);
      do
        try {
          FD();
          break;
        } catch (Y) {
          Z$(J, Y);
        }
      while (true);
      if (Y6(), S0 = X, Y$(Z), K1 !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return RK(), R7 = null, v1 = j, C1;
    }
    function FD() {
      while (K1 !== null)
        W$(K1);
    }
    function DD(J, Q) {
      var X = S0;
      S0 |= X7;
      var Z = G$();
      if (R7 !== J || v1 !== Q) {
        if (F8) {
          var G = J.memoizedUpdaters;
          if (G.size > 0)
            dZ(J, v1), G.clear();
          TK(J, Q);
        }
        EJ = kK(), TZ(), mQ(J, Q);
      }
      IK(Q);
      do
        try {
          ED();
          break;
        } catch (Y) {
          Z$(J, Y);
        }
      while (true);
      if (Y6(), Y$(Z), S0 = X, K1 !== null)
        return iH(), DJ;
      else
        return RK(), R7 = null, v1 = j, C1;
    }
    function ED() {
      while (K1 !== null && !DH())
        W$(K1);
    }
    function W$(J) {
      var Q = J.alternate;
      W1(J);
      var X;
      if ((J.mode & d0) !== Z0)
        DW(J), X = zz(Q, J, r8), d6(J, true);
      else
        X = zz(Q, J, r8);
      if (f1(), J.memoizedProps = J.pendingProps, X === null)
        z$(J);
      else
        K1 = X;
      pW.current = null;
    }
    function z$(J) {
      var Q = J;
      do {
        var { alternate: X, return: Z } = Q;
        if ((Q.flags & IX) === X0) {
          W1(Q);
          var G = undefined;
          if ((Q.mode & d0) === Z0)
            G = jV(X, Q, r8);
          else
            DW(Q), G = jV(X, Q, r8), d6(Q, false);
          if (f1(), G !== null) {
            K1 = G;
            return;
          }
        } else {
          var Y = $F(X, Q);
          if (Y !== null) {
            Y.flags &= OH, K1 = Y;
            return;
          }
          if ((Q.mode & d0) !== Z0) {
            d6(Q, false);
            var { actualDuration: W, child: z } = Q;
            while (z !== null)
              W += z.actualDuration, z = z.sibling;
            Q.actualDuration = W;
          }
          if (Z !== null)
            Z.flags |= IX, Z.subtreeFlags = X0, Z.deletions = null;
          else {
            C1 = aW, K1 = null;
            return;
          }
        }
        var K = Q.sibling;
        if (K !== null) {
          K1 = K;
          return;
        }
        Q = Z, K1 = Q;
      } while (Q !== null);
      if (C1 === DJ)
        C1 = aV;
    }
    function yQ(J, Q, X) {
      var Z = D8(), G = Q7.transition;
      try {
        Q7.transition = null, y1(c7), wD(J, Q, X, Z);
      } finally {
        Q7.transition = G, y1(Z);
      }
      return null;
    }
    function wD(J, Q, X, Z) {
      do
        IJ();
      while (ZQ !== null);
      if (CD(), (S0 & (X7 | V8)) !== g1)
        throw new Error("Should not already be working.");
      var { finishedWork: G, finishedLanes: Y } = J;
      if (CH(Y), G === null)
        return DK(), null;
      else if (Y === j)
        U("root.finishedLanes should not be empty during a commit. This is a bug in React.");
      if (J.finishedWork = null, J.finishedLanes = j, G === J.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      J.callbackNode = null, J.callbackPriority = m1;
      var W = F0(G.lanes, G.childLanes);
      if (VO(J, W), J === R7)
        R7 = null, K1 = null, v1 = j;
      if ((G.subtreeFlags & U5) !== X0 || (G.flags & U5) !== X0) {
        if (!uQ)
          uQ = true, Jz = X, Vz(DQ, function() {
            return IJ(), null;
          });
      }
      var z = (G.subtreeFlags & (a4 | r4 | RX | U5)) !== X0, K = (G.flags & (a4 | r4 | RX | U5)) !== X0;
      if (z || K) {
        var V = Q7.transition;
        Q7.transition = null;
        var $ = D8();
        y1(c7);
        var A = S0;
        S0 |= V8, pW.current = null;
        var q = qF(J, G);
        ZV(), xF(J, G, Y), gq(J.containerInfo), J.current = G, yH(Y), gF(G, J, Y), cH(), EH(), S0 = A, y1($), Q7.transition = V;
      } else
        J.current = G, ZV();
      var I = uQ;
      if (uQ)
        uQ = false, ZQ = J, kZ = Y;
      else
        p5 = 0, n6 = null;
      if (W = J.pendingLanes, W === j)
        i5 = null;
      if (!I)
        $$(J.current, false);
      if (_H(G.stateNode, Z), F8)
        J.memoizedUpdaters.clear();
      if (QD(), h7(J, d1()), Q !== null) {
        var E = J.onRecoverableError;
        for (var R = 0;R < Q.length; R++) {
          var y = Q[R], e = y.stack, o = y.digest;
          E(y.value, { componentStack: e, digest: o });
        }
      }
      if (a6) {
        a6 = false;
        var w0 = tW;
        throw tW = null, w0;
      }
      if (y7(kZ, B0) && J.tag !== pJ)
        IJ();
      if (W = J.pendingLanes, y7(W, B0))
        if (NP(), J === Qz)
          hZ++;
        else
          hZ = 0, Qz = J;
      else
        hZ = 0;
      return aJ(), DK(), null;
    }
    function IJ() {
      if (ZQ !== null) {
        var J = hK(kZ), Q = OO(UJ, J), X = Q7.transition, Z = D8();
        try {
          return Q7.transition = null, y1(Q), RD();
        } finally {
          y1(Z), Q7.transition = X;
        }
      }
      return false;
    }
    function ID(J) {
      if (eW.push(J), !uQ)
        uQ = true, Vz(DQ, function() {
          return IJ(), null;
        });
    }
    function RD() {
      if (ZQ === null)
        return false;
      var J = Jz;
      Jz = null;
      var Q = ZQ, X = kZ;
      if (ZQ = null, kZ = j, (S0 & (X7 | V8)) !== g1)
        throw new Error("Cannot flush passive effects while already rendering.");
      Xz = true, r6 = false, sH(X);
      var Z = S0;
      S0 |= V8, fF(Q.current), TF(Q, Q.current, X, J);
      {
        var G = eW;
        eW = [];
        for (var Y = 0;Y < G.length; Y++) {
          var W = G[Y];
          DF(Q, W);
        }
      }
      lH(), $$(Q.current, true), S0 = Z, aJ();
      {
        if (r6)
          if (Q === n6)
            p5++;
          else
            p5 = 0, n6 = Q;
        else
          p5 = 0;
        Xz = false, r6 = false;
      }
      jH(Q);
      {
        var z = Q.current.stateNode;
        z.effectDuration = 0, z.passiveEffectDuration = 0;
      }
      return true;
    }
    function K$(J) {
      return i5 !== null && i5.has(J);
    }
    function LD(J) {
      if (i5 === null)
        i5 = new Set([J]);
      else
        i5.add(J);
    }
    function ND(J) {
      if (!a6)
        a6 = true, tW = J;
    }
    var SD = ND;
    function B$(J, Q, X) {
      var Z = bQ(X, Q), G = YV(J, Z, B0), Y = nJ(J, G, B0), W = L7();
      if (Y !== null)
        vX(Y, B0, W), h7(Y, W);
    }
    function t0(J, Q, X) {
      if (HF(X), uZ(false), J.tag === k) {
        B$(J, J, X);
        return;
      }
      var Z = null;
      Z = Q;
      while (Z !== null) {
        if (Z.tag === k) {
          B$(Z, J, X);
          return;
        } else if (Z.tag === h) {
          var { type: G, stateNode: Y } = Z;
          if (typeof G.getDerivedStateFromError === "function" || typeof Y.componentDidCatch === "function" && !K$(Y)) {
            var W = bQ(X, J), z = NW(Z, W, B0), K = nJ(Z, z, B0), V = L7();
            if (K !== null)
              vX(K, B0, V), h7(K, V);
            return;
          }
        }
        Z = Z.return;
      }
      U("Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.\n\nError message:\n\n%s", X);
    }
    function _D(J, Q, X) {
      var Z = J.pingCache;
      if (Z !== null)
        Z.delete(Q);
      var G = L7();
      if (vK(J, X), bD(J), R7 === J && A5(v1, X))
        if (C1 === xZ || C1 === l6 && _K(v1) && d1() - oW < rV)
          mQ(J, j);
        else
          p6 = F0(p6, X);
      h7(J, G);
    }
    function V$(J, Q) {
      if (Q === m1)
        Q = KD(J);
      var X = L7(), Z = C7(J, Q);
      if (Z !== null)
        vX(Z, Q, X), h7(Z, X);
    }
    function jD(J) {
      var Q = J.memoizedState, X = m1;
      if (Q !== null)
        X = Q.retryLane;
      V$(J, X);
    }
    function xD(J, Q) {
      var X = m1, Z;
      switch (J.tag) {
        case E0:
          Z = J.stateNode;
          var G = J.memoizedState;
          if (G !== null)
            X = G.retryLane;
          break;
        case R1:
          Z = J.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      if (Z !== null)
        Z.delete(Q);
      V$(J, X);
    }
    function gD(J) {
      return J < 120 ? 120 : J < 480 ? 480 : J < 1080 ? 1080 : J < 1920 ? 1920 : J < 3000 ? 3000 : J < 4320 ? 4320 : GD(J / 1960) * 1960;
    }
    function vD() {
      if (hZ > WD)
        throw hZ = 0, Qz = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      if (p5 > zD)
        p5 = 0, n6 = null, U("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.");
    }
    function CD() {
      I8.flushLegacyContextWarning(), I8.flushPendingUnsafeLifecycleWarnings();
    }
    function $$(J, Q) {
      {
        if (W1(J), Q4(J, KJ, pF), Q)
          Q4(J, $9, aF);
        if (Q4(J, KJ, lF), Q)
          Q4(J, $9, iF);
        f1();
      }
    }
    function Q4(J, Q, X) {
      {
        var Z = J, G = null;
        while (Z !== null) {
          var Y = Z.subtreeFlags & Q;
          if (Z !== G && Z.child !== null && Y !== X0)
            Z = Z.child;
          else {
            if ((Z.flags & Q) !== X0)
              X(Z);
            if (Z.sibling !== null)
              Z = Z.sibling;
            else
              Z = G = Z.return;
          }
        }
      }
    }
    var X4 = null;
    function U$(J) {
      {
        if ((S0 & X7) !== g1)
          return;
        if (!(J.mode & N0))
          return;
        var Q = J.tag;
        if (Q !== U0 && Q !== k && Q !== h && Q !== n && Q !== G0 && Q !== B1 && Q !== g0)
          return;
        var X = q0(J) || "ReactComponent";
        if (X4 !== null) {
          if (X4.has(X))
            return;
          X4.add(X);
        } else
          X4 = new Set([X]);
        var Z = V7;
        try {
          W1(J), U("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          if (Z)
            W1(J);
          else
            f1();
        }
      }
    }
    var zz;
    {
      var TD = null;
      zz = function(J, Q, X) {
        var Z = D$(TD, Q);
        try {
          return RV(J, Q, X);
        } catch (Y) {
          if (cA() || Y !== null && typeof Y === "object" && typeof Y.then === "function")
            throw Y;
          if (Y6(), vB(), xV(J, Q), D$(Q, Z), Q.mode & d0)
            DW(Q);
          if (y4(null, RV, null, J, Q, X), VH()) {
            var G = c4();
            if (typeof G === "object" && G !== null && G._suppressLogging && typeof Y === "object" && Y !== null && !Y._suppressLogging)
              Y._suppressLogging = true;
          }
          throw Y;
        }
      };
    }
    var H$ = false, Kz;
    Kz = new Set;
    function kD(J) {
      if (kJ && !IP())
        switch (J.tag) {
          case n:
          case G0:
          case g0: {
            var Q = K1 && q0(K1) || "Unknown", X = Q;
            if (!Kz.has(X)) {
              Kz.add(X);
              var Z = q0(J) || "Unknown";
              U("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", Z, Q, Q);
            }
            break;
          }
          case h: {
            if (!H$)
              U("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), H$ = true;
            break;
          }
        }
    }
    function dZ(J, Q) {
      if (F8) {
        var X = J.memoizedUpdaters;
        X.forEach(function(Z) {
          CK(J, Z, Q);
        });
      }
    }
    var Bz = {};
    function Vz(J, Q) {
      {
        var X = g8.current;
        if (X !== null)
          return X.push(Q), Bz;
        else
          return FK(J, Q);
      }
    }
    function O$(J) {
      if (J === Bz)
        return;
      return FH(J);
    }
    function M$() {
      return g8.current !== null;
    }
    function hD(J) {
      {
        if (J.mode & N0) {
          if (!iV())
            return;
        } else {
          if (!ZD())
            return;
          if (S0 !== g1)
            return;
          if (J.tag !== n && J.tag !== G0 && J.tag !== g0)
            return;
        }
        if (g8.current === null) {
          var Q = V7;
          try {
            W1(J), U("An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act", q0(J));
          } finally {
            if (Q)
              W1(J);
            else
              f1();
          }
        }
      }
    }
    function bD(J) {
      if (J.tag !== pJ && iV() && g8.current === null)
        U("A suspended resource finished loading inside a test, but the event was not wrapped in act(...).\n\nWhen testing, code that resolves suspended data should be wrapped into act(...):\n\nact(() => {\n  /* finish loading suspended data */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act");
    }
    function uZ(J) {
      tV = J;
    }
    var $8 = null, a5 = null, fD = function(J) {
      $8 = J;
    };
    function r5(J) {
      {
        if ($8 === null)
          return J;
        var Q = $8(J);
        if (Q === undefined)
          return J;
        return Q.current;
      }
    }
    function $z(J) {
      return r5(J);
    }
    function Uz(J) {
      {
        if ($8 === null)
          return J;
        var Q = $8(J);
        if (Q === undefined) {
          if (J !== null && J !== undefined && typeof J.render === "function") {
            var X = r5(J.render);
            if (J.render !== X) {
              var Z = { $$typeof: A0, render: X };
              if (J.displayName !== undefined)
                Z.displayName = J.displayName;
              return Z;
            }
          }
          return J;
        }
        return Q.current;
      }
    }
    function q$(J, Q) {
      {
        if ($8 === null)
          return false;
        var X = J.elementType, Z = Q.type, G = false, Y = typeof Z === "object" && Z !== null ? Z.$$typeof : null;
        switch (J.tag) {
          case h: {
            if (typeof Z === "function")
              G = true;
            break;
          }
          case n: {
            if (typeof Z === "function")
              G = true;
            else if (Y === R0)
              G = true;
            break;
          }
          case G0: {
            if (Y === A0)
              G = true;
            else if (Y === R0)
              G = true;
            break;
          }
          case B1:
          case g0: {
            if (Y === c0)
              G = true;
            else if (Y === R0)
              G = true;
            break;
          }
          default:
            return false;
        }
        if (G) {
          var W = $8(X);
          if (W !== undefined && W === $8(Z))
            return true;
        }
        return false;
      }
    }
    function A$(J) {
      {
        if ($8 === null)
          return;
        if (typeof WeakSet !== "function")
          return;
        if (a5 === null)
          a5 = new WeakSet;
        a5.add(J);
      }
    }
    var dD = function(J, Q) {
      {
        if ($8 === null)
          return;
        var { staleFamilies: X, updatedFamilies: Z } = Q;
        IJ(), wJ(function() {
          Hz(J.current, Z, X);
        });
      }
    }, uD = function(J, Q) {
      {
        if (J.context !== i7)
          return;
        IJ(), wJ(function() {
          mZ(Q, J, null, null);
        });
      }
    };
    function Hz(J, Q, X) {
      {
        var { alternate: Z, child: G, sibling: Y, tag: W, type: z } = J, K = null;
        switch (W) {
          case n:
          case g0:
          case h:
            K = z;
            break;
          case G0:
            K = z.render;
            break;
        }
        if ($8 === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var V = false, $ = false;
        if (K !== null) {
          var A = $8(K);
          if (A !== undefined) {
            if (X.has(A))
              $ = true;
            else if (Q.has(A))
              if (W === h)
                $ = true;
              else
                V = true;
          }
        }
        if (a5 !== null) {
          if (a5.has(J) || Z !== null && a5.has(Z))
            $ = true;
        }
        if ($)
          J._debugNeedsRemount = true;
        if ($ || V) {
          var q = C7(J, B0);
          if (q !== null)
            T1(q, J, B0, X1);
        }
        if (G !== null && !$)
          Hz(G, Q, X);
        if (Y !== null)
          Hz(Y, Q, X);
      }
    }
    var mD = function(J, Q) {
      {
        var X = new Set, Z = new Set(Q.map(function(G) {
          return G.current;
        }));
        return Oz(J.current, Z, X), X;
      }
    };
    function Oz(J, Q, X) {
      {
        var { child: Z, sibling: G, tag: Y, type: W } = J, z = null;
        switch (Y) {
          case n:
          case g0:
          case h:
            z = W;
            break;
          case G0:
            z = W.render;
            break;
        }
        var K = false;
        if (z !== null) {
          if (Q.has(z))
            K = true;
        }
        if (K)
          yD(J, X);
        else if (Z !== null)
          Oz(Z, Q, X);
        if (G !== null)
          Oz(G, Q, X);
      }
    }
    function yD(J, Q) {
      {
        var X = cD(J, Q);
        if (X)
          return;
        var Z = J;
        while (true) {
          switch (Z.tag) {
            case p:
              Q.add(Z.stateNode);
              return;
            case i:
              Q.add(Z.stateNode.containerInfo);
              return;
            case k:
              Q.add(Z.stateNode.containerInfo);
              return;
          }
          if (Z.return === null)
            throw new Error("Expected to reach root first.");
          Z = Z.return;
        }
      }
    }
    function cD(J, Q) {
      {
        var X = J, Z = false;
        while (true) {
          if (X.tag === p)
            Z = true, Q.add(X.stateNode);
          else if (X.child !== null) {
            X.child.return = X, X = X.child;
            continue;
          }
          if (X === J)
            return Z;
          while (X.sibling === null) {
            if (X.return === null || X.return === J)
              return Z;
            X = X.return;
          }
          X.sibling.return = X.return, X = X.sibling;
        }
      }
      return false;
    }
    var Mz;
    {
      Mz = false;
      try {
        var P$ = Object.preventExtensions({});
      } catch (J) {
        Mz = true;
      }
    }
    function sD(J, Q, X, Z) {
      if (this.tag = J, this.key = X, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = Q, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = Z, this.flags = X0, this.subtreeFlags = X0, this.deletions = null, this.lanes = j, this.childLanes = j, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = false, this._debugHookTypes = null, !Mz && typeof Object.preventExtensions === "function")
        Object.preventExtensions(this);
    }
    var p7 = function(J, Q, X, Z) {
      return new sD(J, Q, X, Z);
    };
    function qz(J) {
      var Q = J.prototype;
      return !!(Q && Q.isReactComponent);
    }
    function lD(J) {
      return typeof J === "function" && !qz(J) && J.defaultProps === undefined;
    }
    function iD(J) {
      if (typeof J === "function")
        return qz(J) ? h : n;
      else if (J !== undefined && J !== null) {
        var Q = J.$$typeof;
        if (Q === A0)
          return G0;
        if (Q === c0)
          return B1;
      }
      return U0;
    }
    function cQ(J, Q) {
      var X = J.alternate;
      if (X === null)
        X = p7(J.tag, Q, J.key, J.mode), X.elementType = J.elementType, X.type = J.type, X.stateNode = J.stateNode, X._debugSource = J._debugSource, X._debugOwner = J._debugOwner, X._debugHookTypes = J._debugHookTypes, X.alternate = J, J.alternate = X;
      else
        X.pendingProps = Q, X.type = J.type, X.flags = X0, X.subtreeFlags = X0, X.deletions = null, X.actualDuration = 0, X.actualStartTime = -1;
      X.flags = J.flags & BJ, X.childLanes = J.childLanes, X.lanes = J.lanes, X.child = J.child, X.memoizedProps = J.memoizedProps, X.memoizedState = J.memoizedState, X.updateQueue = J.updateQueue;
      var Z = J.dependencies;
      switch (X.dependencies = Z === null ? null : { lanes: Z.lanes, firstContext: Z.firstContext }, X.sibling = J.sibling, X.index = J.index, X.ref = J.ref, X.selfBaseDuration = J.selfBaseDuration, X.treeBaseDuration = J.treeBaseDuration, X._debugNeedsRemount = J._debugNeedsRemount, X.tag) {
        case U0:
        case n:
        case g0:
          X.type = r5(J.type);
          break;
        case h:
          X.type = $z(J.type);
          break;
        case G0:
          X.type = Uz(J.type);
          break;
      }
      return X;
    }
    function pD(J, Q) {
      J.flags &= BJ | F1;
      var X = J.alternate;
      if (X === null)
        J.childLanes = j, J.lanes = Q, J.child = null, J.subtreeFlags = X0, J.memoizedProps = null, J.memoizedState = null, J.updateQueue = null, J.dependencies = null, J.stateNode = null, J.selfBaseDuration = 0, J.treeBaseDuration = 0;
      else {
        J.childLanes = X.childLanes, J.lanes = X.lanes, J.child = X.child, J.subtreeFlags = X0, J.deletions = null, J.memoizedProps = X.memoizedProps, J.memoizedState = X.memoizedState, J.updateQueue = X.updateQueue, J.type = X.type;
        var Z = X.dependencies;
        J.dependencies = Z === null ? null : { lanes: Z.lanes, firstContext: Z.firstContext }, J.selfBaseDuration = X.selfBaseDuration, J.treeBaseDuration = X.treeBaseDuration;
      }
      return J;
    }
    function aD(J, Q, X) {
      var Z;
      if (J === o9) {
        if (Z = N0, Q === true)
          Z |= D1, Z |= d8;
      } else
        Z = Z0;
      if (F8)
        Z |= d0;
      return p7(k, null, null, Z);
    }
    function Az(J, Q, X, Z, G, Y) {
      var W = U0, z = J;
      if (typeof J === "function")
        if (qz(J))
          W = h, z = $z(z);
        else
          z = r5(z);
      else if (typeof J === "string")
        W = p;
      else
        J:
          switch (J) {
            case x:
              return WQ(X.children, G, Y, Q);
            case d:
              if (W = k1, G |= D1, (G & N0) !== Z0)
                G |= d8;
              break;
            case Q0:
              return rD(X, G, Y, Q);
            case P0:
              return nD(X, G, Y, Q);
            case $1:
              return oD(X, G, Y, Q);
            case UQ:
              return F$(X, G, Y, Q);
            case u7:
            case B7:
            case A4:
            case P4:
            case b8:
            default: {
              if (typeof J === "object" && J !== null)
                switch (J.$$typeof) {
                  case Y0:
                    W = _0;
                    break J;
                  case T0:
                    W = I1;
                    break J;
                  case A0:
                    W = G0, z = Uz(z);
                    break J;
                  case c0:
                    W = B1;
                    break J;
                  case R0:
                    W = e0, z = null;
                    break J;
                }
              var K = "";
              {
                if (J === undefined || typeof J === "object" && J !== null && Object.keys(J).length === 0)
                  K += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
                var V = Z ? q0(Z) : null;
                if (V)
                  K += "\n\nCheck the render method of `" + V + "`.";
              }
              throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (J == null ? J : typeof J) + "." + K));
            }
          }
      var $ = p7(W, X, Q, G);
      return $.elementType = J, $.type = z, $.lanes = Y, $._debugOwner = Z, $;
    }
    function Pz(J, Q, X) {
      var Z = null;
      Z = J._owner;
      var { type: G, key: Y, props: W } = J, z = Az(G, Y, W, Z, Q, X);
      return z._debugSource = J._source, z._debugOwner = J._owner, z;
    }
    function WQ(J, Q, X, Z) {
      var G = p7(w1, J, Z, Q);
      return G.lanes = X, G;
    }
    function rD(J, Q, X, Z) {
      if (typeof J.id !== "string")
        U('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof J.id);
      var G = p7(y0, J, Z, Q | d0);
      return G.elementType = Q0, G.lanes = X, G.stateNode = { effectDuration: 0, passiveEffectDuration: 0 }, G;
    }
    function nD(J, Q, X, Z) {
      var G = p7(E0, J, Z, Q);
      return G.elementType = P0, G.lanes = X, G;
    }
    function oD(J, Q, X, Z) {
      var G = p7(R1, J, Z, Q);
      return G.elementType = $1, G.lanes = X, G;
    }
    function F$(J, Q, X, Z) {
      var G = p7(K0, J, Z, Q);
      G.elementType = UQ, G.lanes = X;
      var Y = { isHidden: false };
      return G.stateNode = Y, G;
    }
    function Fz(J, Q, X) {
      var Z = p7(L0, J, null, Q);
      return Z.lanes = X, Z;
    }
    function tD() {
      var J = p7(p, null, null, Z0);
      return J.elementType = "DELETED", J;
    }
    function eD(J) {
      var Q = p7(h1, null, null, Z0);
      return Q.stateNode = J, Q;
    }
    function Dz(J, Q, X) {
      var Z = J.children !== null ? J.children : [], G = p7(i, Z, J.key, Q);
      return G.lanes = X, G.stateNode = { containerInfo: J.containerInfo, pendingChildren: null, implementation: J.implementation }, G;
    }
    function D$(J, Q) {
      if (J === null)
        J = p7(U0, null, null, Z0);
      return J.tag = Q.tag, J.key = Q.key, J.elementType = Q.elementType, J.type = Q.type, J.stateNode = Q.stateNode, J.return = Q.return, J.child = Q.child, J.sibling = Q.sibling, J.index = Q.index, J.ref = Q.ref, J.pendingProps = Q.pendingProps, J.memoizedProps = Q.memoizedProps, J.updateQueue = Q.updateQueue, J.memoizedState = Q.memoizedState, J.dependencies = Q.dependencies, J.mode = Q.mode, J.flags = Q.flags, J.subtreeFlags = Q.subtreeFlags, J.deletions = Q.deletions, J.lanes = Q.lanes, J.childLanes = Q.childLanes, J.alternate = Q.alternate, J.actualDuration = Q.actualDuration, J.actualStartTime = Q.actualStartTime, J.selfBaseDuration = Q.selfBaseDuration, J.treeBaseDuration = Q.treeBaseDuration, J._debugSource = Q._debugSource, J._debugOwner = Q._debugOwner, J._debugNeedsRemount = Q._debugNeedsRemount, J._debugHookTypes = Q._debugHookTypes, J;
    }
    function JE(J, Q, X, Z, G) {
      this.tag = Q, this.containerInfo = J, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = JY, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = m1, this.eventTimes = wG(j), this.expirationTimes = wG(X1), this.pendingLanes = j, this.suspendedLanes = j, this.pingedLanes = j, this.expiredLanes = j, this.mutableReadLanes = j, this.finishedLanes = j, this.entangledLanes = j, this.entanglements = wG(j), this.identifierPrefix = Z, this.onRecoverableError = G, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = new Set;
        var Y = this.pendingUpdatersLaneMap = [];
        for (var W = 0;W < e4; W++)
          Y.push(new Set);
      }
      switch (Q) {
        case o9:
          this._debugRootType = X ? "hydrateRoot()" : "createRoot()";
          break;
        case pJ:
          this._debugRootType = X ? "hydrate()" : "render()";
          break;
      }
    }
    function E$(J, Q, X, Z, G, Y, W, z, K, V) {
      var $ = new JE(J, Q, X, z, K), A = aD(Q, Y);
      $.current = A, A.stateNode = $;
      {
        var q = { element: Z, isDehydrated: X, cache: null, transitions: null, pendingSuspenseBoundaries: null };
        A.memoizedState = q;
      }
      return NY(A), $;
    }
    var Ez = "18.2.0";
    function QE(J, Q, X) {
      var Z = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      return P7(Z), { $$typeof: M, key: Z == null ? null : "" + Z, children: J, containerInfo: Q, implementation: X };
    }
    var wz, Iz;
    wz = false, Iz = {};
    function w$(J) {
      if (!J)
        return i7;
      var Q = V5(J), X = TA(Q);
      if (Q.tag === h) {
        var Z = Q.type;
        if (y8(Z))
          return p3(Q, Z, X);
      }
      return X;
    }
    function XE(J, Q) {
      {
        var X = V5(J);
        if (X === undefined)
          if (typeof J.render === "function")
            throw new Error("Unable to find node on an unmounted component.");
          else {
            var Z = Object.keys(J).join(",");
            throw new Error("Argument appears to not be a ReactComponent. Keys: " + Z);
          }
        var G = qK(X);
        if (G === null)
          return null;
        if (G.mode & D1) {
          var Y = q0(X) || "Component";
          if (!Iz[Y]) {
            Iz[Y] = true;
            var W = V7;
            try {
              if (W1(G), X.mode & D1)
                U("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", Q, Q, Y);
              else
                U("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", Q, Q, Y);
            } finally {
              if (W)
                W1(W);
              else
                f1();
            }
          }
        }
        return G.stateNode;
      }
    }
    function I$(J, Q, X, Z, G, Y, W, z) {
      var K = false, V = null;
      return E$(J, Q, K, V, X, Z, G, Y, W);
    }
    function R$(J, Q, X, Z, G, Y, W, z, K, V) {
      var $ = true, A = E$(X, Z, $, J, G, Y, W, z, K);
      A.context = w$(null);
      var q = A.current, I = L7(), E = GQ(q), R = PJ(I, E);
      return R.callback = Q !== undefined && Q !== null ? Q : null, nJ(q, R, E), BD(A, E, I), A;
    }
    function mZ(J, Q, X, Z) {
      SH(Q, J);
      var G = Q.current, Y = L7(), W = GQ(G);
      pH(W);
      var z = w$(X);
      if (Q.context === null)
        Q.context = z;
      else
        Q.pendingContext = z;
      if (kJ && V7 !== null && !wz)
        wz = true, U("Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.", q0(V7) || "Unknown");
      var K = PJ(Y, W);
      if (K.payload = { element: J }, Z = Z === undefined ? null : Z, Z !== null) {
        if (typeof Z !== "function")
          U("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", Z);
        K.callback = Z;
      }
      var V = nJ(G, K, W);
      if (V !== null)
        T1(V, G, W, Y), V6(V, G, W);
      return W;
    }
    function Z4(J) {
      var Q = J.current;
      if (!Q.child)
        return null;
      switch (Q.child.tag) {
        case p:
          return oG(Q.child.stateNode);
        default:
          return Q.child.stateNode;
      }
    }
    function ZE(J) {
      switch (J.tag) {
        case k: {
          var Q = J.stateNode;
          if (E9(Q)) {
            var X = XO(Q);
            HD(Q, X);
          }
          break;
        }
        case E0: {
          wJ(function() {
            var G = C7(J, B0);
            if (G !== null) {
              var Y = L7();
              T1(G, J, B0, Y);
            }
          });
          var Z = B0;
          Rz(J, Z);
          break;
        }
      }
    }
    function L$(J, Q) {
      var X = J.memoizedState;
      if (X !== null && X.dehydrated !== null)
        X.retryLane = KO(X.retryLane, Q);
    }
    function Rz(J, Q) {
      L$(J, Q);
      var X = J.alternate;
      if (X)
        L$(X, Q);
    }
    function GE(J) {
      if (J.tag !== E0)
        return;
      var Q = _X, X = C7(J, Q);
      if (X !== null) {
        var Z = L7();
        T1(X, J, Q, Z);
      }
      Rz(J, Q);
    }
    function YE(J) {
      if (J.tag !== E0)
        return;
      var Q = GQ(J), X = C7(J, Q);
      if (X !== null) {
        var Z = L7();
        T1(X, J, Q, Z);
      }
      Rz(J, Q);
    }
    function N$(J) {
      var Q = PH(J);
      if (Q === null)
        return null;
      return Q.stateNode;
    }
    var S$ = function(J) {
      return null;
    };
    function WE(J) {
      return S$(J);
    }
    var _$ = function(J) {
      return false;
    };
    function zE(J) {
      return _$(J);
    }
    var j$ = null, x$ = null, g$ = null, v$ = null, C$ = null, T$ = null, k$ = null, h$ = null, b$ = null;
    {
      var f$ = function(J, Q, X) {
        var Z = Q[X], G = N1(J) ? J.slice() : D0({}, J);
        if (X + 1 === Q.length) {
          if (N1(G))
            G.splice(Z, 1);
          else
            delete G[Z];
          return G;
        }
        return G[Z] = f$(J[Z], Q, X + 1), G;
      }, d$ = function(J, Q) {
        return f$(J, Q, 0);
      }, u$ = function(J, Q, X, Z) {
        var G = Q[Z], Y = N1(J) ? J.slice() : D0({}, J);
        if (Z + 1 === Q.length) {
          var W = X[Z];
          if (Y[W] = Y[G], N1(Y))
            Y.splice(G, 1);
          else
            delete Y[G];
        } else
          Y[G] = u$(J[G], Q, X, Z + 1);
        return Y;
      }, m$ = function(J, Q, X) {
        if (Q.length !== X.length) {
          s("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var Z = 0;Z < X.length - 1; Z++)
            if (Q[Z] !== X[Z]) {
              s("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return u$(J, Q, X, 0);
      }, y$ = function(J, Q, X, Z) {
        if (X >= Q.length)
          return Z;
        var G = Q[X], Y = N1(J) ? J.slice() : D0({}, J);
        return Y[G] = y$(J[G], Q, X + 1, Z), Y;
      }, c$ = function(J, Q, X) {
        return y$(J, Q, 0, X);
      }, Lz = function(J, Q) {
        var X = J.memoizedState;
        while (X !== null && Q > 0)
          X = X.next, Q--;
        return X;
      };
      j$ = function(J, Q, X, Z) {
        var G = Lz(J, Q);
        if (G !== null) {
          var Y = c$(G.memoizedState, X, Z);
          G.memoizedState = Y, G.baseState = Y, J.memoizedProps = D0({}, J.memoizedProps);
          var W = C7(J, B0);
          if (W !== null)
            T1(W, J, B0, X1);
        }
      }, x$ = function(J, Q, X) {
        var Z = Lz(J, Q);
        if (Z !== null) {
          var G = d$(Z.memoizedState, X);
          Z.memoizedState = G, Z.baseState = G, J.memoizedProps = D0({}, J.memoizedProps);
          var Y = C7(J, B0);
          if (Y !== null)
            T1(Y, J, B0, X1);
        }
      }, g$ = function(J, Q, X, Z) {
        var G = Lz(J, Q);
        if (G !== null) {
          var Y = m$(G.memoizedState, X, Z);
          G.memoizedState = Y, G.baseState = Y, J.memoizedProps = D0({}, J.memoizedProps);
          var W = C7(J, B0);
          if (W !== null)
            T1(W, J, B0, X1);
        }
      }, v$ = function(J, Q, X) {
        if (J.pendingProps = c$(J.memoizedProps, Q, X), J.alternate)
          J.alternate.pendingProps = J.pendingProps;
        var Z = C7(J, B0);
        if (Z !== null)
          T1(Z, J, B0, X1);
      }, C$ = function(J, Q) {
        if (J.pendingProps = d$(J.memoizedProps, Q), J.alternate)
          J.alternate.pendingProps = J.pendingProps;
        var X = C7(J, B0);
        if (X !== null)
          T1(X, J, B0, X1);
      }, T$ = function(J, Q, X) {
        if (J.pendingProps = m$(J.memoizedProps, Q, X), J.alternate)
          J.alternate.pendingProps = J.pendingProps;
        var Z = C7(J, B0);
        if (Z !== null)
          T1(Z, J, B0, X1);
      }, k$ = function(J) {
        var Q = C7(J, B0);
        if (Q !== null)
          T1(Q, J, B0, X1);
      }, h$ = function(J) {
        S$ = J;
      }, b$ = function(J) {
        _$ = J;
      };
    }
    function KE(J) {
      var Q = qK(J);
      if (Q === null)
        return null;
      return Q.stateNode;
    }
    function BE(J) {
      return null;
    }
    function VE() {
      return V7;
    }
    function $E(J) {
      var Q = J.findFiberByHostInstance, X = S.ReactCurrentDispatcher;
      return NH({ bundleType: J.bundleType, version: J.version, rendererPackageName: J.rendererPackageName, rendererConfig: J.rendererConfig, overrideHookState: j$, overrideHookStateDeletePath: x$, overrideHookStateRenamePath: g$, overrideProps: v$, overridePropsDeletePath: C$, overridePropsRenamePath: T$, setErrorHandler: h$, setSuspenseHandler: b$, scheduleUpdate: k$, currentDispatcherRef: X, findHostInstanceByFiber: KE, findFiberByHostInstance: Q || BE, findHostInstancesForRefresh: mD, scheduleRefresh: dD, scheduleRoot: uD, setRefreshHandler: fD, getCurrentFiber: VE, reconcilerVersion: Ez });
    }
    var s$ = typeof reportError === "function" ? reportError : function(J) {
      console.error(J);
    };
    function Nz(J) {
      this._internalRoot = J;
    }
    G4.prototype.render = Nz.prototype.render = function(J) {
      var Q = this._internalRoot;
      if (Q === null)
        throw new Error("Cannot update an unmounted root.");
      {
        if (typeof arguments[1] === "function")
          U("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
        else if (Y4(arguments[1]))
          U("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.");
        else if (typeof arguments[1] !== "undefined")
          U("You passed a second argument to root.render(...) but it only accepts one argument.");
        var X = Q.containerInfo;
        if (X.nodeType !== P1) {
          var Z = N$(Q.current);
          if (Z) {
            if (Z.parentNode !== X)
              U("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
          }
        }
      }
      mZ(J, Q, null, null);
    }, G4.prototype.unmount = Nz.prototype.unmount = function() {
      if (typeof arguments[0] === "function")
        U("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var J = this._internalRoot;
      if (J !== null) {
        this._internalRoot = null;
        var Q = J.containerInfo;
        if (X$())
          U("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition.");
        wJ(function() {
          mZ(null, J, null, null);
        }), m3(Q);
      }
    };
    function UE(J, Q) {
      if (!Y4(J))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      l$(J);
      var X = false, Z = false, G = "", Y = s$, W = null;
      if (Q !== null && Q !== undefined) {
        if (Q.hydrate)
          s("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.");
        else if (typeof Q === "object" && Q !== null && Q.$$typeof === h8)
          U("You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:\n\n  let root = createRoot(domContainer);\n  root.render(<App />);");
        if (Q.unstable_strictMode === true)
          X = true;
        if (Q.identifierPrefix !== undefined)
          G = Q.identifierPrefix;
        if (Q.onRecoverableError !== undefined)
          Y = Q.onRecoverableError;
        if (Q.transitionCallbacks !== undefined)
          W = Q.transitionCallbacks;
      }
      var z = I$(J, o9, null, X, Z, G, Y);
      s9(z.current, J);
      var K = J.nodeType === P1 ? J.parentNode : J;
      return rX(K), new Nz(z);
    }
    function G4(J) {
      this._internalRoot = J;
    }
    function HE(J) {
      if (J)
        LO(J);
    }
    G4.prototype.unstable_scheduleHydration = HE;
    function OE(J, Q, X) {
      if (!Y4(J))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      if (l$(J), Q === undefined)
        U("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var Z = X != null ? X : null, G = X != null && X.hydratedSources || null, Y = false, W = false, z = "", K = s$;
      if (X !== null && X !== undefined) {
        if (X.unstable_strictMode === true)
          Y = true;
        if (X.identifierPrefix !== undefined)
          z = X.identifierPrefix;
        if (X.onRecoverableError !== undefined)
          K = X.onRecoverableError;
      }
      var V = R$(Q, null, J, o9, Z, Y, W, z, K);
      if (s9(V.current, J), rX(J), G)
        for (var $ = 0;$ < G.length; $++) {
          var A = G[$];
          PP(V, A);
        }
      return new G4(V);
    }
    function Y4(J) {
      return !!(J && (J.nodeType === g7 || J.nodeType === YJ || J.nodeType === g4 || !W7));
    }
    function yZ(J) {
      return !!(J && (J.nodeType === g7 || J.nodeType === YJ || J.nodeType === g4 || J.nodeType === P1 && J.nodeValue === " react-mount-point-unstable "));
    }
    function l$(J) {
      {
        if (J.nodeType === g7 && J.tagName && J.tagName.toUpperCase() === "BODY")
          U("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app.");
        if (WZ(J))
          if (J._reactRootContainer)
            U("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.");
          else
            U("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it.");
      }
    }
    var ME = S.ReactCurrentOwner, i$;
    i$ = function(J) {
      if (J._reactRootContainer && J.nodeType !== P1) {
        var Q = N$(J._reactRootContainer.current);
        if (Q) {
          if (Q.parentNode !== J)
            U("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
        }
      }
      var X = !!J._reactRootContainer, Z = Sz(J), G = !!(Z && lJ(Z));
      if (G && !X)
        U("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render.");
      if (J.nodeType === g7 && J.tagName && J.tagName.toUpperCase() === "BODY")
        U("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function Sz(J) {
      if (!J)
        return null;
      if (J.nodeType === YJ)
        return J.documentElement;
      else
        return J.firstChild;
    }
    function p$() {
    }
    function qE(J, Q, X, Z, G) {
      if (G) {
        if (typeof Z === "function") {
          var Y = Z;
          Z = function() {
            var q = Z4(W);
            Y.call(q);
          };
        }
        var W = R$(Q, Z, J, pJ, null, false, false, "", p$);
        J._reactRootContainer = W, s9(W.current, J);
        var z = J.nodeType === P1 ? J.parentNode : J;
        return rX(z), wJ(), W;
      } else {
        var K;
        while (K = J.lastChild)
          J.removeChild(K);
        if (typeof Z === "function") {
          var V = Z;
          Z = function() {
            var q = Z4($);
            V.call(q);
          };
        }
        var $ = I$(J, pJ, null, false, false, "", p$);
        J._reactRootContainer = $, s9($.current, J);
        var A = J.nodeType === P1 ? J.parentNode : J;
        return rX(A), wJ(function() {
          mZ(Q, $, X, Z);
        }), $;
      }
    }
    function AE(J, Q) {
      if (J !== null && typeof J !== "function")
        U("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", Q, J);
    }
    function W4(J, Q, X, Z, G) {
      i$(X), AE(G === undefined ? null : G, "render");
      var Y = X._reactRootContainer, W;
      if (!Y)
        W = qE(X, Q, J, G, Z);
      else {
        if (W = Y, typeof G === "function") {
          var z = G;
          G = function() {
            var K = Z4(W);
            z.call(K);
          };
        }
        mZ(Q, W, J, G);
      }
      return Z4(W);
    }
    function PE(J) {
      {
        var Q = ME.current;
        if (Q !== null && Q.stateNode !== null) {
          var X = Q.stateNode._warnedAboutRefsInRender;
          if (!X)
            U("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", s0(Q.type) || "A component");
          Q.stateNode._warnedAboutRefsInRender = true;
        }
      }
      if (J == null)
        return null;
      if (J.nodeType === g7)
        return J;
      return XE(J, "findDOMNode");
    }
    function FE(J, Q, X) {
      if (U("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !yZ(Q))
        throw new Error("Target container is not a DOM element.");
      {
        var Z = WZ(Q) && Q._reactRootContainer === undefined;
        if (Z)
          U("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return W4(null, J, Q, true, X);
    }
    function DE(J, Q, X) {
      if (U("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !yZ(Q))
        throw new Error("Target container is not a DOM element.");
      {
        var Z = WZ(Q) && Q._reactRootContainer === undefined;
        if (Z)
          U("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return W4(null, J, Q, false, X);
    }
    function EE(J, Q, X, Z) {
      if (U("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !yZ(X))
        throw new Error("Target container is not a DOM element.");
      if (J == null || !$H(J))
        throw new Error("parentComponent must be a valid React Component");
      return W4(J, Q, X, false, Z);
    }
    function wE(J) {
      if (!yZ(J))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var Q = WZ(J) && J._reactRootContainer === undefined;
        if (Q)
          U("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (J._reactRootContainer) {
        {
          var X = Sz(J), Z = X && !lJ(X);
          if (Z)
            U("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return wJ(function() {
          W4(null, null, J, false, function() {
            J._reactRootContainer = null, m3(J);
          });
        }), true;
      } else {
        {
          var G = Sz(J), Y = !!(G && lJ(G)), W = J.nodeType === g7 && yZ(J.parentNode) && !!J.parentNode._reactRootContainer;
          if (Y)
            U("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", W ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return false;
      }
    }
    if (MO(ZE), AO(GE), PO(YE), FO(D8), DO(UO), typeof Map !== "function" || Map.prototype == null || typeof Map.prototype.forEach !== "function" || typeof Set !== "function" || Set.prototype == null || typeof Set.prototype.clear !== "function" || typeof Set.prototype.forEach !== "function")
      U("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
    JH(Eq), ZH(Gz, OD, wJ);
    function IE(J, Q) {
      var X = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (!Y4(Q))
        throw new Error("Target container is not a DOM element.");
      return QE(J, Q, null, X);
    }
    function RE(J, Q, X, Z) {
      return EE(J, Q, X, Z);
    }
    var _z = { usingClientEntryPoint: false, Events: [lJ, N5, l9, GK, YK, Gz] };
    function LE(J, Q) {
      if (!_z.usingClientEntryPoint)
        U('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".');
      return UE(J, Q);
    }
    function NE(J, Q, X) {
      if (!_z.usingClientEntryPoint)
        U('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".');
      return OE(J, Q, X);
    }
    function SE(J) {
      if (X$())
        U("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.");
      return wJ(J);
    }
    var _E = $E({ findFiberByHostInstance: _Q, bundleType: 1, version: Ez, rendererPackageName: "react-dom" });
    if (!_E && s1 && window.top === window.self) {
      if (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1) {
        var a$ = window.location.protocol;
        if (/^(https?|file):$/.test(a$))
          console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (a$ === "file:" ? "\nYou might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq" : ""), "font-weight:bold");
      }
    }
    if (XI.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = _z, XI.createPortal = IE, XI.createRoot = LE, XI.findDOMNode = PE, XI.flushSync = SE, XI.hydrate = FE, XI.hydrateRoot = NE, XI.render = DE, XI.unmountComponentAtNode = wE, XI.unstable_batchedUpdates = Gz, XI.unstable_renderSubtreeIntoContainer = RE, XI.version = Ez, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function")
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error);
  })();
});
var KU = M1((ZI) => {
  var e5 = Z1(zU(), 1);
  iZ = e5.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ZI.createRoot = function(H, D) {
    iZ.usingClientEntryPoint = true;
    try {
      return e5.createRoot(H, D);
    } finally {
      iZ.usingClientEntryPoint = false;
    }
  }, ZI.hydrateRoot = function(H, D, S) {
    iZ.usingClientEntryPoint = true;
    try {
      return e5.hydrateRoot(H, D, S);
    } finally {
      iZ.usingClientEntryPoint = false;
    }
  };
  var iZ;
});
var n$ = function(H, D, S = []) {
  const T = S ?? [], v = H.length.valueOf();
  T.length = v;
  for (let s = 0;s < v; s++) {
    const U = H.at(s);
    T[s] = D(U, s);
  }
  return T;
};
var lQ = Z1(r7(), 1);
var U8 = Z1(r7(), 1);
var B4 = Z1(r7(), 1);
var K4 = Z1(r7(), 1);

class o5 {
  #J = new Set;
  onUp() {
    for (let H of this.#J)
      H.onUp?.();
  }
  onDown() {
    for (let H of this.#J)
      H.onDown?.();
  }
  onLeft() {
    for (let H of this.#J)
      H.onLeft?.();
  }
  onRight() {
    for (let H of this.#J)
      H.onRight?.();
  }
  onAction() {
    for (let H of this.#J)
      H.onAction?.();
  }
  addListener(H) {
    this.#J.add(H);
  }
  removeListener(H) {
    this.#J.delete(H);
  }
}
var t$ = { popupControl: new o5, setControlsLock() {
}, removeControlsLock() {
} };
var sQ = Z1(r7(), 1);
var X2 = Z1(v8(), 1);
var J2 = K4.default.createContext(t$);
var jz = ({ children: H, popupControl: D }) => {
  const S = e$({ popupControl: D });
  return X2.jsxDEV(J2.Provider, { value: S, children: H }, undefined, false, undefined, null);
};
var Q2 = () => {
  const H = K4.useContext(J2);
  if (!H)
    throw new Error("useControlContext must be used within a Provider");
  return H;
};
var zQ;
(function(S) {
  S[S["UNLOCKED"] = 0] = "UNLOCKED";
  S[S["LOCKED"] = 1] = "LOCKED";
})(zQ || (zQ = {}));
var KQ = Z1(r7(), 1);
var o8 = Z1(o2(), 1);
var RR = o8.default.v1;
var LR = o8.default.v3;
var t2 = o8.default.v4;
var NR = o8.default.v5;
var SR = o8.default.NIL;
var _R = o8.default.version;
var jR = o8.default.validate;
var xR = o8.default.stringify;
var gR = o8.default.parse;
var M4 = Z1(r7(), 1);
var U4 = Z1(r7(), 1);
var e2 = { layoutReplacementCallbacks: {}, getLayout: (H) => typeof H === "object" ? H : {} };
var QU = Z1(v8(), 1);
var JU = U4.default.createContext(e2);
var bz = ({ children: H, context: D }) => {
  return QU.jsxDEV(JU.Provider, { value: D, children: H }, undefined, false, undefined, null);
};
var H4 = () => {
  const H = U4.useContext(JU);
  if (!H)
    throw new Error("useDialogContext must be used within a Provider");
  return H;
};
var XU = 100;
var ZU = 50;
var t5 = Z1(r7(), 1);
var O4 = Z1(v8(), 1);
var nw = { position: "absolute" };
var ow = { outline: "3px solid #fff", backgroundColor: "black", borderRadius: 12, padding: 3, boxShadow: "10px 10px 0px #000000cc", transition: "outline-color .3s" };
var tw = { border: "3px solid white", borderRadius: 10, outline: "3px solid black", color: "white", padding: 10, cursor: "pointer", transition: "border-color .3s" };
var ew = 27;
var JI = 24;
var b7 = Z1(v8(), 1);
var BU = Z1(KU(), 1);
var pQ = Z1(r7(), 1);
var pZ = Z1(v8(), 1);

class VU {
  constructor(H) {
    let D = false;
    document.addEventListener("keyup", (S) => {
      D = false;
    }), document.addEventListener("keydown", (S) => {
      if (D)
        return;
      switch (D = true, S.code) {
        case "KeyS":
        case "ArrowDown":
          H.onDown();
          break;
        case "KeyW":
        case "ArrowUp":
          H.onUp();
          break;
        case "Space":
          H.onAction();
          break;
      }
      S.preventDefault();
    });
  }
}

// src/index.ts
function showMenu() {
  const { popupControl } = YI(document.body, {
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
  return { keyboard: new VU(popupControl) };
}
export {
  showMenu
};
