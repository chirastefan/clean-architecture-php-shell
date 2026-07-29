var ie = Object.defineProperty;
var oe = (t, e, n) => e in t ? ie(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var O = (t, e, n) => oe(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as a, jsxs as d } from "react/jsx-runtime";
import A, { createContext as Q, useContext as V, useState as N, useCallback as k, useRef as ae, useEffect as B } from "react";
import { createRoot as ce } from "react-dom/client";
const le = {
  stringify: (t) => t ? "true" : "false",
  parse: (t) => /^[ty1-9]/i.test(t)
}, de = {
  stringify: (t) => t.name,
  parse: (t, e, n) => {
    const r = (() => {
      if (typeof window < "u" && t in window)
        return window[t];
      if (typeof global < "u" && t in global)
        return global[t];
    })();
    return typeof r == "function" ? r.bind(n) : void 0;
  }
}, ue = {
  stringify: (t) => JSON.stringify(t),
  parse: (t) => JSON.parse(t)
};
function me(t) {
  return t.replace(
    /([a-z0-9])([A-Z])/g,
    (e, n, r) => `${n}-${r.toLowerCase()}`
  );
}
function pe(t) {
  return t.replace(/[-:]([a-z])/g, (e, n) => `${n.toUpperCase()}`);
}
const _ = /* @__PURE__ */ Symbol.for("r2wc.bound"), he = {
  parse: (t, e, n) => {
    const r = pe(e), s = n;
    if (typeof s < "u" && r in s && typeof s[r] < "u") {
      let i = s[r];
      return _ in s[r] || (i = i.bind(s), Object.defineProperty(i, _, { value: !0 })), i;
    } else
      return;
  }
}, fe = {
  stringify: (t) => `${t}`,
  parse: (t) => parseFloat(t)
}, ge = {
  stringify: (t) => t,
  parse: (t) => t
}, F = {
  string: ge,
  number: fe,
  boolean: le,
  function: de,
  method: he,
  json: ue
}, P = /* @__PURE__ */ Symbol.for("r2wc.render"), T = /* @__PURE__ */ Symbol.for("r2wc.connected"), E = /* @__PURE__ */ Symbol.for("r2wc.context"), C = /* @__PURE__ */ Symbol.for("r2wc.props");
function be(t, e, n) {
  var w, x, f;
  e.props || (e.props = t.propTypes ? Object.keys(t.propTypes) : []), e.events || (e.events = []);
  const r = Array.isArray(e.props) ? e.props.slice() : Object.keys(e.props), s = Array.isArray(e.events) ? e.events.slice() : Object.keys(e.events), i = {}, h = {}, m = {}, g = {};
  for (const l of r) {
    i[l] = Array.isArray(e.props) ? "string" : e.props[l];
    const o = me(l);
    m[l] = o, g[o] = l;
  }
  for (const l of s)
    h[l] = Array.isArray(e.events) ? {} : e.events[l];
  class b extends HTMLElement {
    constructor() {
      super();
      O(this, f, !0);
      O(this, x);
      O(this, w, {});
      O(this, "container");
      e.shadow ? this.container = this.attachShadow({
        mode: e.shadow
      }) : this.container = this, this[C].container = this.container;
      for (const c of r) {
        const y = m[c], p = this.getAttribute(y), v = i[c], S = v ? F[v] : null;
        S != null && S.parse && (p || v === "method") && (this[C][c] = S.parse(p, y, this));
      }
      for (const c of s)
        this[C][c] = (y) => {
          const p = c.replace(/^on/, "").toLowerCase();
          this.dispatchEvent(
            new CustomEvent(p, { detail: y, ...h[c] })
          );
        };
    }
    static get observedAttributes() {
      return Object.keys(g);
    }
    connectedCallback() {
      this[T] = !0, this[P]();
    }
    disconnectedCallback() {
      this[T] = !1, this[E] && n.unmount(this[E]), delete this[E];
    }
    attributeChangedCallback(c, y, p) {
      const v = g[c], S = i[v], I = S ? F[S] : null;
      v in i && (I != null && I.parse) && (p || S === "method") && (this[C][v] = I.parse(p, c, this), this[P]());
    }
    [(f = T, x = E, w = C, P)]() {
      this[T] && (this[E] ? n.update(this[E], this[C]) : this[E] = n.mount(
        this.container,
        t,
        this[C]
      ));
    }
  }
  for (const l of r) {
    const o = m[l], c = i[l];
    Object.defineProperty(b.prototype, l, {
      enumerable: !0,
      configurable: !0,
      get() {
        return this[C][l];
      },
      set(y) {
        this[C][l] = y;
        const p = c ? F[c] : null;
        if (p != null && p.stringify) {
          const v = p.stringify(y, o, this);
          this.getAttribute(o) !== v && (v == null ? this.removeAttribute(o) : this.setAttribute(o, v));
        } else
          l in i && (p != null && p.parse) && (y || c === "method") && (this[C][l] = p.parse(y, o, this)), this[P]();
      }
    });
  }
  return b;
}
function ye(t, e, n) {
  const r = ce(t), s = A.createElement(e, n);
  return r.render(s), {
    root: r,
    ReactComponent: e
  };
}
function ve({ root: t, ReactComponent: e }, n) {
  const r = A.createElement(e, n);
  t.render(r);
}
function we({ root: t }) {
  t.unmount();
}
function xe(t, e = {}) {
  return be(t, e, { mount: ye, update: ve, unmount: we });
}
const z = (t) => Symbol.iterator in t, K = (t) => (
  // HACK: avoid checking entries type
  "entries" in t
), H = (t, e) => {
  const n = t instanceof Map ? t : new Map(t.entries()), r = e instanceof Map ? e : new Map(e.entries());
  if (n.size !== r.size)
    return !1;
  for (const [s, i] of n)
    if (!r.has(s) || !Object.is(i, r.get(s)))
      return !1;
  return !0;
}, Se = (t, e) => {
  const n = t[Symbol.iterator](), r = e[Symbol.iterator]();
  let s = n.next(), i = r.next();
  for (; !s.done && !i.done; ) {
    if (!Object.is(s.value, i.value))
      return !1;
    s = n.next(), i = r.next();
  }
  return !!s.done && !!i.done;
};
function Ce(t, e) {
  return Object.is(t, e) ? !0 : typeof t != "object" || t === null || typeof e != "object" || e === null || Object.getPrototypeOf(t) !== Object.getPrototypeOf(e) ? !1 : z(t) && z(e) ? K(t) && K(e) ? H(t, e) : Se(t, e) : H(
    { entries: () => Object.entries(t) },
    { entries: () => Object.entries(e) }
  );
}
function Ne(t) {
  const e = A.useRef(void 0);
  return (n) => {
    const r = t(n);
    return Ce(e.current, r) ? e.current : e.current = r;
  };
}
const U = (t) => ({
  ok: !0,
  value: t
}), R = (t) => ({
  ok: !1,
  error: t
});
class G extends Error {
  constructor(n, r = "DOMAIN_ERROR") {
    super(n);
    O(this, "code");
    this.name = this.constructor.name, this.code = r, Object.setPrototypeOf(this, new.target.prototype);
  }
}
class Ie extends G {
  constructor(e) {
    super(e), this.name = "BudgetExceededError";
  }
}
class q extends G {
  constructor(e) {
    super(e), this.name = "InvalidBudgetLimitError";
  }
}
class M {
  constructor(e, n = 300, r = []) {
    this.id = e, this.limit = n, this.items = r;
  }
  getTotalSpent() {
    return this.items.reduce((e, n) => e + n.price, 0);
  }
  getRemainingBudget() {
    return this.limit - this.getTotalSpent();
  }
  setLimit(e) {
    return e < 0 ? R(new q("Budget limit cannot be negative.")) : (this.limit = e, U(void 0));
  }
  addItem(e) {
    return e.price <= 0 ? R(new q("Item price must be greater than zero.")) : this.getTotalSpent() + e.price > this.limit ? R(
      new Ie(
        `Adding "${e.name}" ($${e.price.toFixed(2)}) exceeds monthly limit of $${this.limit.toFixed(2)}. Remaining: $${this.getRemainingBudget().toFixed(2)}`
      )
    ) : (this.items.push(e), U(this));
  }
  removeItem(e) {
    this.items = this.items.filter((n) => n.id !== e);
  }
}
class Oe {
  constructor(e) {
    this.repository = e;
  }
  async execute(e) {
    try {
      const n = await this.repository.getCart(e);
      return U(n);
    } catch (n) {
      return R(new G(n.message || "Failed to retrieve budget cart state."));
    }
  }
}
class ke {
  constructor(e, n, r, s, i) {
    this.repository = e, this.notificationAdapter = n, this.idGenerator = r, this.clock = s, this.logger = i;
  }
  async execute(e, n, r, s) {
    var g, b;
    (g = this.logger) == null || g.info("Executing AddItemUseCase...", { cartId: e, name: n, price: r });
    const i = await this.repository.getCart(e), h = {
      id: this.idGenerator.generateId(),
      name: n,
      price: r,
      category: s,
      timestamp: this.clock.now()
    }, m = i.addItem(h);
    return m.ok ? (await this.repository.saveCart(i), this.notificationAdapter.notify(
      `Added "${n}" ($${r.toFixed(2)}) to planner.`,
      "success"
    ), m) : ((b = this.logger) == null || b.warn("Failed to add item to cart", { error: m.error.message }), this.notificationAdapter.notify(m.error.message, "error"), R(m.error));
  }
}
class Ee {
  constructor(e, n) {
    this.repository = e, this.notificationAdapter = n;
  }
  async execute(e, n) {
    const r = await this.repository.getCart(e), s = r.setLimit(n);
    return s.ok ? (await this.repository.saveCart(r), this.notificationAdapter.notify(
      `Updated monthly budget limit to $${n.toFixed(2)}.`,
      "info"
    ), U(r)) : (this.notificationAdapter.notify(s.error.message, "error"), R(s.error));
  }
}
class Ae {
  constructor(e, n) {
    this.repository = e, this.notificationAdapter = n;
  }
  async execute(e, n) {
    const r = await this.repository.getCart(e), s = r.items.find((i) => i.id === n);
    return r.removeItem(n), await this.repository.saveCart(r), s && this.notificationAdapter.notify(`Removed "${s.name}" from planner.`, "info"), U(r);
  }
}
class $e {
  info(e, n) {
    console.log(`[INFO] ${e}`, n ? JSON.stringify(n) : "");
  }
  error(e, n, r) {
    console.error(`[ERROR] ${e}`, n, r ? JSON.stringify(r) : "");
  }
  warn(e, n) {
    console.warn(`[WARN] ${e}`, n ? JSON.stringify(n) : "");
  }
}
const W = "budget_cart_";
class Re {
  async getCart(e) {
    const n = localStorage.getItem(`${W}${e}`);
    if (!n) {
      const r = new M(e, 250, []);
      return await this.saveCart(r), r;
    }
    try {
      const r = JSON.parse(n);
      return new M(r.id, r.limit, r.items || []);
    } catch {
      return new M(e, 250, []);
    }
  }
  async saveCart(e) {
    const n = {
      id: e.id,
      limit: e.limit,
      items: e.items
    };
    localStorage.setItem(`${W}${e.id}`, JSON.stringify(n));
  }
}
class Ue {
  constructor() {
    O(this, "subscribers", /* @__PURE__ */ new Set());
  }
  notify(e, n) {
    this.subscribers.forEach((r) => r(e, n));
  }
  subscribe(e) {
    return this.subscribers.add(e), () => {
      this.subscribers.delete(e);
    };
  }
}
class Le {
  generateId() {
    return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `item-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  }
}
class Pe {
  now() {
    return Date.now();
  }
}
const j = new Re(), D = new Ue(), Te = new Le(), je = new Pe(), De = new $e(), Fe = new Oe(j), Me = new ke(
  j,
  D,
  Te,
  je,
  De
), Be = new Ee(j, D), Ge = new Ae(j, D), ee = {
  notificationAdapter: D,
  cartUseCase: Fe,
  addItemUseCase: Me,
  updateLimitUseCase: Be,
  removeItemUseCase: Ge
}, te = Q(null);
function Je({ children: t }) {
  return /* @__PURE__ */ a(te.Provider, { value: ee, children: t });
}
function _e() {
  const t = V(te);
  if (!t)
    throw new Error("useDependencies must be used within DependencyProvider");
  return t;
}
function ze({ options: t, selectedValue: e, onChange: n }) {
  const [r, s] = N(!1), [i, h] = N(0), m = k(() => {
    s((o) => {
      if (!o) {
        const c = t.findIndex((y) => y.value === e);
        h(c !== -1 ? c : 0);
      }
      return !o;
    });
  }, [t, e]), g = k(() => {
    s(!1);
  }, []), b = k(
    (o) => {
      const c = t[o];
      c && n(c.value), g();
    },
    [t, n, g]
  ), w = k(
    (o) => {
      if (!r) {
        (o.key === "ArrowDown" || o.key === "ArrowUp" || o.key === " " || o.key === "Enter") && (o.preventDefault(), m());
        return;
      }
      switch (o.key) {
        case "ArrowDown":
          o.preventDefault(), h((c) => (c + 1) % t.length);
          break;
        case "ArrowUp":
          o.preventDefault(), h((c) => (c - 1 + t.length) % t.length);
          break;
        case "Enter":
        case " ":
          o.preventDefault(), b(i);
          break;
        case "Escape":
          o.preventDefault(), g();
          break;
      }
    },
    [r, t, i, m, b, g]
  ), x = k(() => {
    const o = t.find((c) => c.value === e);
    return {
      role: "combobox",
      "aria-expanded": r,
      "aria-haspopup": "listbox",
      "aria-controls": "headless-select-listbox",
      tabIndex: 0,
      onClick: m,
      onKeyDown: w,
      "data-selected-label": o ? o.label : "Select category..."
    };
  }, [r, e, t, m, w]), f = k(() => ({
    id: "headless-select-listbox",
    role: "listbox",
    "aria-activedescendant": r ? `select-option-${i}` : void 0,
    tabIndex: -1,
    onKeyDown: w
  }), [r, i, w]), l = k(
    (o) => {
      const y = t[o].value === e, p = o === i;
      return {
        id: `select-option-${o}`,
        role: "option",
        "aria-selected": y,
        "data-highlighted": p ? "" : void 0,
        onClick: (v) => {
          v.stopPropagation(), b(o);
        },
        onMouseEnter: () => {
          h(o);
        }
      };
    },
    [t, e, i, b]
  );
  return {
    isOpen: r,
    highlightedIndex: i,
    getTriggerProps: x,
    getListboxProps: f,
    getOptionProps: l,
    close: g
  };
}
const ne = Q(void 0);
function J() {
  const t = V(ne);
  if (!t)
    throw new Error("Select subcomponents must be used inside a <Select> component.");
  return t;
}
function $({ options: t, selectedValue: e, onChange: n, children: r, className: s }) {
  const i = ze({ options: t, selectedValue: e, onChange: n }), h = ae(null);
  return B(() => {
    function m(g) {
      h.current && !h.current.contains(g.target) && i.close();
    }
    return document.addEventListener("mousedown", m), () => {
      document.removeEventListener("mousedown", m);
    };
  }, [i]), /* @__PURE__ */ a(ne.Provider, { value: { ...i, options: t, selectedValue: e }, children: /* @__PURE__ */ a("div", { ref: h, className: `select-root ${s || ""}`, children: r }) });
}
function Ke({ className: t }) {
  const { getTriggerProps: e } = J(), n = e();
  return /* @__PURE__ */ d("div", { ...n, className: `select-trigger ${t || ""}`, children: [
    /* @__PURE__ */ a("span", { children: n["data-selected-label"] }),
    /* @__PURE__ */ a("span", { className: "select-arrow", children: "▼" })
  ] });
}
function He({
  children: t,
  className: e
}) {
  const { isOpen: n, getListboxProps: r } = J(), s = r();
  return n ? /* @__PURE__ */ a("ul", { ...s, className: `select-options-list ${e || ""}`, children: t }) : null;
}
function qe({
  value: t,
  index: e,
  children: n,
  className: r
}) {
  const { getOptionProps: s } = J(), i = s(e);
  return /* @__PURE__ */ a("li", { ...i, className: `select-option-item ${r || ""}`, "data-value": t, children: n });
}
$.Trigger = Ke;
$.Options = He;
$.Option = qe;
const Y = [
  { value: "utilities", label: "⚡ Utilities" },
  { value: "grocery", label: "🛒 Grocery" },
  { value: "entertainment", label: "🍿 Entertainment" },
  { value: "education", label: "📚 Education" },
  { value: "other", label: "💡 Other" }
];
function We({
  cart: t,
  loading: e,
  toasts: n,
  onAddItem: r,
  onUpdateLimit: s,
  onRemoveItem: i
}) {
  const [h, m] = N(""), [g, b] = N(""), [w, x] = N("utilities"), [f, l] = N(""), [o, c] = N(!1), y = t ? t.getTotalSpent() : 0, p = t ? t.limit : 300, v = t ? t.getRemainingBudget() : 300, S = Math.min(Math.round(y / p * 100), 100), I = v < 0, re = (u) => {
    u.preventDefault();
    const L = parseFloat(g);
    !h.trim() || isNaN(L) || (r(h.trim(), L, w), m(""), b(""));
  }, se = () => {
    const u = parseFloat(f);
    isNaN(u) || s(u), c(!1);
  };
  return /* @__PURE__ */ d("div", { className: "dashboard-layout", children: [
    /* @__PURE__ */ a("div", { className: "toast-container", children: n.map((u) => /* @__PURE__ */ d("div", { className: `toast-card toast-${u.type}`, children: [
      /* @__PURE__ */ a("span", { className: "toast-icon", children: u.type === "error" ? "⚠️" : u.type === "success" ? "✅" : "ℹ️" }),
      /* @__PURE__ */ a("span", { className: "toast-text", children: u.message })
    ] }, u.id)) }),
    /* @__PURE__ */ d("div", { className: "dashboard-grid", children: [
      /* @__PURE__ */ d("section", { className: "card glass-panel summary-card", children: [
        /* @__PURE__ */ d("div", { className: "card-header", children: [
          /* @__PURE__ */ a("h2", { children: "Monthly Budget Planner" }),
          e && /* @__PURE__ */ a("span", { className: "spinner-badge", children: "Syncing..." })
        ] }),
        /* @__PURE__ */ d("div", { className: "budget-progress-box", children: [
          /* @__PURE__ */ d("div", { className: "progress-labels", children: [
            /* @__PURE__ */ d("span", { children: [
              "Spent: $",
              y.toFixed(2)
            ] }),
            /* @__PURE__ */ d("span", { children: [
              "Limit:",
              " ",
              o ? /* @__PURE__ */ d("span", { className: "limit-inline-edit", children: [
                /* @__PURE__ */ a(
                  "input",
                  {
                    type: "number",
                    value: f,
                    onChange: (u) => l(u.target.value),
                    placeholder: p.toString(),
                    className: "input-limit-sm"
                  }
                ),
                /* @__PURE__ */ a("button", { onClick: se, className: "btn-save-sm", type: "button", children: "Save" })
              ] }) : /* @__PURE__ */ d(
                "button",
                {
                  onClick: () => {
                    l(p.toString()), c(!0);
                  },
                  className: "btn-link-limit",
                  type: "button",
                  children: [
                    "$",
                    p.toFixed(2),
                    " ✏️"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ a("div", { className: "progress-track", children: /* @__PURE__ */ a(
            "div",
            {
              className: `progress-fill ${I ? "progress-exceeded" : ""}`,
              style: { width: `${S}%` }
            }
          ) }),
          /* @__PURE__ */ d("div", { className: "remaining-stat", children: [
            "Remaining:",
            " ",
            /* @__PURE__ */ d("strong", { className: I ? "text-danger" : "text-success", children: [
              "$",
              v.toFixed(2)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ d("form", { onSubmit: re, className: "add-item-form", children: [
          /* @__PURE__ */ a("h3", { children: "Add Planned Expense" }),
          /* @__PURE__ */ d("div", { className: "form-group", children: [
            /* @__PURE__ */ a("label", { htmlFor: "expense-name", children: "Expense Name" }),
            /* @__PURE__ */ a(
              "input",
              {
                id: "expense-name",
                type: "text",
                value: h,
                onChange: (u) => m(u.target.value),
                placeholder: "e.g. Ergonomic Keyboard",
                className: "form-input",
                required: !0
              }
            )
          ] }),
          /* @__PURE__ */ d("div", { className: "form-row", children: [
            /* @__PURE__ */ d("div", { className: "form-group flex-1", children: [
              /* @__PURE__ */ a("label", { htmlFor: "expense-price", children: "Amount ($)" }),
              /* @__PURE__ */ a(
                "input",
                {
                  id: "expense-price",
                  type: "number",
                  step: "0.01",
                  value: g,
                  onChange: (u) => b(u.target.value),
                  placeholder: "0.00",
                  className: "form-input",
                  required: !0
                }
              )
            ] }),
            /* @__PURE__ */ d("div", { className: "form-group flex-1", children: [
              /* @__PURE__ */ a("label", { children: "Category" }),
              /* @__PURE__ */ d($, { options: Y, selectedValue: w, onChange: x, children: [
                /* @__PURE__ */ a($.Trigger, {}),
                /* @__PURE__ */ a($.Options, { children: Y.map((u, L) => /* @__PURE__ */ a($.Option, { value: u.value, index: L, children: u.label }, u.value)) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ a("button", { type: "submit", className: "btn-primary-action", children: "+ Add to Monthly Budget" })
        ] })
      ] }),
      /* @__PURE__ */ d("section", { className: "card glass-panel items-card", children: [
        /* @__PURE__ */ a("div", { className: "card-header", children: /* @__PURE__ */ d("h2", { children: [
          "Planned Items (",
          (t == null ? void 0 : t.items.length) || 0,
          ")"
        ] }) }),
        !t || t.items.length === 0 ? /* @__PURE__ */ d("div", { className: "empty-state", children: [
          /* @__PURE__ */ a("div", { className: "empty-icon", children: "📝" }),
          /* @__PURE__ */ a("p", { children: "No expenses added yet this month." }),
          /* @__PURE__ */ a("span", { className: "empty-subtitle", children: "Use the form to plan your monthly budget items." })
        ] }) : /* @__PURE__ */ a("ul", { className: "expense-list", children: t.items.map((u) => /* @__PURE__ */ d("li", { className: "expense-item-row", children: [
          /* @__PURE__ */ d("div", { className: "item-meta", children: [
            /* @__PURE__ */ a("span", { className: "item-name", children: u.name }),
            /* @__PURE__ */ a("span", { className: "item-category-badge", children: u.category })
          ] }),
          /* @__PURE__ */ d("div", { className: "item-actions", children: [
            /* @__PURE__ */ d("span", { className: "item-price", children: [
              "$",
              u.price.toFixed(2)
            ] }),
            /* @__PURE__ */ a(
              "button",
              {
                onClick: () => i(u.id),
                className: "btn-delete-icon",
                title: "Remove Item",
                type: "button",
                children: "🗑️"
              }
            )
          ] })
        ] }, u.id)) })
      ] })
    ] })
  ] });
}
const X = (t) => {
  let e;
  const n = /* @__PURE__ */ new Set(), r = (b, w) => {
    const x = typeof b == "function" ? b(e) : b;
    if (!Object.is(x, e)) {
      const f = e;
      e = w ?? (typeof x != "object" || x === null) ? x : Object.assign({}, e, x), n.forEach((l) => l(e, f));
    }
  }, s = () => e, m = { setState: r, getState: s, getInitialState: () => g, subscribe: (b) => (n.add(b), () => n.delete(b)) }, g = e = t(r, s, m);
  return m;
}, Ye = ((t) => t ? X(t) : X), Xe = (t) => t;
function Ze(t, e = Xe) {
  const n = A.useSyncExternalStore(
    t.subscribe,
    A.useCallback(() => e(t.getState()), [t, e]),
    A.useCallback(() => e(t.getInitialState()), [t, e])
  );
  return A.useDebugValue(n), n;
}
const Z = (t) => {
  const e = Ye(t), n = (r) => Ze(e, r);
  return Object.assign(n, e), n;
}, Qe = ((t) => t ? Z(t) : Z), Ve = (t = ee) => Qe((e) => ({
  cart: null,
  loading: !1,
  error: null,
  fetchCart: async (n) => {
    e({ loading: !0, error: null });
    const r = await t.cartUseCase.execute(n);
    r.ok ? e({ cart: r.value, loading: !1 }) : e({ error: r.error.message, loading: !1 });
  },
  addItem: async (n, r, s, i) => {
    e({ loading: !0, error: null });
    const h = await t.addItemUseCase.execute(n, r, s, i);
    h.ok ? e({ cart: h.value, loading: !1 }) : e({ error: h.error.message, loading: !1 });
  },
  updateLimit: async (n, r) => {
    e({ loading: !0, error: null });
    const s = await t.updateLimitUseCase.execute(n, r);
    s.ok ? e({ cart: s.value, loading: !1 }) : e({ error: s.error.message, loading: !1 });
  },
  removeItem: async (n, r) => {
    e({ loading: !0, error: null });
    const s = await t.removeItemUseCase.execute(n, r);
    s.ok ? e({ cart: s.value, loading: !1 }) : e({ error: s.error.message, loading: !1 });
  }
})), et = Ve();
function tt() {
  const { notificationAdapter: t } = _e(), { cart: e, loading: n, fetchCart: r, addItem: s, updateLimit: i, removeItem: h } = et(
    Ne((f) => ({
      cart: f.cart,
      loading: f.loading,
      fetchCart: f.fetchCart,
      addItem: f.addItem,
      updateLimit: f.updateLimit,
      removeItem: f.removeItem
    }))
  ), [m, g] = N([]);
  return B(() => {
    r("default-planner");
  }, [r]), B(() => t.subscribe((l, o) => {
    const c = { id: Math.random().toString(), message: l, type: o };
    g((y) => [...y, c]), setTimeout(() => {
      g((y) => y.filter((p) => p.id !== c.id));
    }, 4e3);
  }), [t]), /* @__PURE__ */ a(
    We,
    {
      cart: e,
      loading: n,
      toasts: m,
      onAddItem: (f, l, o) => {
        s("default-planner", f, l, o);
      },
      onUpdateLimit: (f) => {
        i("default-planner", f);
      },
      onRemoveItem: (f) => {
        h("default-planner", f);
      }
    }
  );
}
const nt = () => /* @__PURE__ */ a(Je, { children: /* @__PURE__ */ a(tt, {}) }), rt = xe(nt, {
  props: {}
  // Add any props here that you expect host applications
});
customElements.define("budget-tracker-widget", rt);
