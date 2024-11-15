// @ts-nocheck

import { jsxs as tn, jsx as T, Fragment as fo } from "react/jsx-runtime";
import g from "react";
import {
  Cell as u,
  Signal as S,
  throttleTime as Vt,
  map as f,
  mapTo as V,
  debounceTime as be,
  filter as d,
  scan as G,
  withLatestFrom as I,
  delayWithMicrotask as Ft,
  onNext as nn,
  Action as _t,
  useRealm as Wt,
  useCellValue as B,
  Realm as ho,
  RealmContext as go,
  useCellValues as vo,
} from "@mdxeditor/gurx";
function ke(e, t) {
  const n = u(e, (o) => {
    o.link(t(o), n);
  });
  return n;
}
const Te = { lvl: 0 };
function on(e, t, n, o = Te, s = Te) {
  return { k: e, l: o, lvl: n, r: s, v: t };
}
function k(e) {
  return e === Te;
}
function Re() {
  return Te;
}
function Tt(e, t) {
  if (k(e)) return Te;
  const { k: n, l: o, r: s } = e;
  if (t === n) {
    if (k(o)) return s;
    if (k(s)) return o;
    {
      const [i, r] = sn(o);
      return tt(M(e, { k: i, l: rn(o), v: r }));
    }
  } else return t < n ? tt(M(e, { l: Tt(o, t) })) : tt(M(e, { r: Tt(s, t) }));
}
function ce(e, t, n = "k") {
  if (k(e)) return [-1 / 0, void 0];
  if (e[n] === t) return [e.k, e.v];
  if (e[n] < t) {
    const o = ce(e.r, t, n);
    return o[0] === -1 / 0 ? [e.k, e.v] : o;
  }
  return ce(e.l, t, n);
}
function F(e, t, n) {
  return k(e)
    ? on(t, n, 1)
    : t === e.k
      ? M(e, { k: t, v: n })
      : t < e.k
        ? Gt(M(e, { l: F(e.l, t, n) }))
        : Gt(M(e, { r: F(e.r, t, n) }));
}
function $t(e, t, n) {
  if (k(e)) return [];
  const { k: o, v: s, l: i, r } = e;
  let l = [];
  return (
    o > t && (l = l.concat($t(i, t, n))),
    o >= t && o <= n && l.push({ k: o, v: s }),
    o <= n && (l = l.concat($t(r, t, n))),
    l
  );
}
function bo(e, t, n, o) {
  if (k(e)) return Te;
  let s = Re();
  for (const { k: i, v: r } of me(e)) i > t && i <= n ? (s = F(s, ...o(i, r))) : (s = F(s, i, r));
  return s;
}
function mo(e, t, n) {
  let o = Re(),
    s = -1;
  for (const { start: i, end: r, value: l } of Io(e))
    i < t
      ? ((o = F(o, i, l)), (s = l))
      : i > t + n
        ? (o = F(o, i - n, l))
        : r >= t + n && s !== l && (o = F(o, t, l));
  return o;
}
function me(e) {
  return k(e) ? [] : [...me(e.l), { k: e.k, v: e.v }, ...me(e.r)];
}
function sn(e) {
  return k(e.r) ? [e.k, e.v] : sn(e.r);
}
function rn(e) {
  return k(e.r) ? e.l : tt(M(e, { r: rn(e.r) }));
}
function M(e, t) {
  return on(t.k ?? e.k, t.v ?? e.v, t.lvl ?? e.lvl, t.l ?? e.l, t.r ?? e.r);
}
function xt(e) {
  return k(e) || e.lvl > e.r.lvl;
}
function Gt(e) {
  return Et(an(e));
}
function tt(e) {
  const { l: t, r: n, lvl: o } = e;
  if (n.lvl >= o - 1 && t.lvl >= o - 1) return e;
  if (o > n.lvl + 1) {
    if (xt(t)) return an(M(e, { lvl: o - 1 }));
    if (!k(t) && !k(t.r))
      return M(t.r, {
        l: M(t, { r: t.r.l }),
        lvl: o,
        r: M(e, {
          l: t.r.r,
          lvl: o - 1,
        }),
      });
    throw new Error("Unexpected empty nodes");
  } else {
    if (xt(e)) return Et(M(e, { lvl: o - 1 }));
    if (!k(n) && !k(n.l)) {
      const s = n.l,
        i = xt(s) ? n.lvl - 1 : n.lvl;
      return M(s, {
        l: M(e, {
          lvl: o - 1,
          r: s.l,
        }),
        lvl: s.lvl + 1,
        r: Et(M(n, { l: s.r, lvl: i })),
      });
    } else throw new Error("Unexpected empty nodes");
  }
}
function Io(e) {
  return cn(me(e));
}
function ln(e, t, n) {
  if (k(e)) return [];
  const o = ce(e, t)[0];
  return cn($t(e, o, n));
}
function un(e, t) {
  const n = e.length;
  if (n === 0) return [];
  let { index: o, value: s } = t(e[0]);
  const i = [];
  for (let r = 1; r < n; r++) {
    const { index: l, value: c } = t(e[r]);
    i.push({ end: l - 1, start: o, value: s }), (o = l), (s = c);
  }
  return i.push({ end: 1 / 0, start: o, value: s }), i;
}
function cn(e) {
  return un(e, ({ k: t, v: n }) => ({ index: t, value: n }));
}
function Et(e) {
  const { r: t, lvl: n } = e;
  return !k(t) && !k(t.r) && t.lvl === n && t.r.lvl === n
    ? M(t, { l: M(e, { r: t.l }), lvl: n + 1 })
    : e;
}
function an(e) {
  const { l: t } = e;
  return !k(t) && t.lvl === e.lvl ? M(t, { r: M(e, { l: t.r }) }) : e;
}
function ko(e) {
  const { size: t, startIndex: n, endIndex: o } = e;
  return (s) => s.start === n && (s.end === o || s.end === 1 / 0) && s.value === t;
}
function xo(e, t) {
  let n = k(e) ? 0 : 1 / 0;
  for (const o of t) {
    const { size: s, startIndex: i, endIndex: r } = o;
    if (((n = Math.min(n, i)), k(e))) {
      e = F(e, 0, s);
      continue;
    }
    const l = ln(e, i - 1, r + 1);
    if (l.some(ko(o))) continue;
    let c = !1,
      a = !1;
    for (const { start: p, end: v, value: m } of l)
      c ? (r >= p || s === m) && (e = Tt(e, p)) : ((a = m !== s), (c = !0)),
        v > r && r >= p && m !== s && (e = F(e, r + 1, m));
    a && (e = F(e, i, s));
  }
  return [e, n];
}
const ht = [Re(), 0];
function So(e, [t, n]) {
  if (n.length > 0 && k(e) && t.length === 2) {
    const o = t[0].size,
      s = t[1].size;
    return [n.reduce((i, r) => F(F(i, r, o), r + 1, s), Re()), 0];
  } else return xo(e, t);
}
function ct(e, t, n, o = 0) {
  let s = e.length - 1;
  for (; o <= s; ) {
    const i = Math.floor((o + s) / 2),
      r = e[i],
      l = n(r, t);
    if (l === 0) return i;
    if (l === -1) {
      if (s - o < 2) return i - 1;
      s = i - 1;
    } else {
      if (s === o) return i;
      o = i + 1;
    }
  }
  throw new Error(`Failed binary finding record in array - ${e.join(",")}, searched for ${t}`);
}
function pn(e, t, n) {
  return e[ct(e, t, n)];
}
function yo(e, t, n, o) {
  const s = ct(e, t, o),
    i = ct(e, n, o, s);
  return e.slice(s, i + 1);
}
function Pt({ index: e }, t) {
  return t === e ? 0 : t < e ? -1 : 1;
}
function To({ offset: e }, t) {
  return t === e ? 0 : t < e ? -1 : 1;
}
function $o(e) {
  return { index: e.index, value: e };
}
function Eo(e, t, n, o = 0) {
  return (
    o > 0 && (t = Math.max(t, pn(e, o, Pt).offset)), (t = Math.max(0, t)), un(yo(e, t, n, To), $o)
  );
}
const $e = [[], 0, 0, 0];
function wo(e, [t, n]) {
  let o = 0,
    s = 0,
    i = 0,
    r = 0;
  if (n !== 0) {
    (r = ct(e, n - 1, Pt)), (i = e[r].offset);
    const c = ce(t, n - 1);
    (o = c[0]),
      (s = c[1]),
      e.length && e[r].height === ce(t, n)[1] && (r -= 1),
      (e = e.slice(0, r + 1));
  } else e = [];
  for (const { start: l, value: c } of ln(t, n, 1 / 0)) {
    const a = (l - o) * s + i;
    e.push({ height: c, index: l, offset: a }), (o = l), (i = a), (s = c);
  }
  return [e, s, i, o];
}
function fn(e, t) {
  if (t.length === 0) return [0, 0];
  const { offset: n, index: o, height: s } = pn(t, e, Pt);
  return [s * (e - o) + n, s];
}
function wt(e, t) {
  return fn(e, t)[0];
}
function hn(e, t) {
  return Math.abs(e - t) < 1.01;
}
function gn() {
  return typeof navigator > "u"
    ? !1
    : (/Macintosh/i.test(navigator.userAgent) &&
        navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 1) ||
        (/iP(ad|od|hone)/i.test(navigator.userAgent) && /WebKit/i.test(navigator.userAgent));
}
function dn(e) {
  return !e;
}
function Lo(e) {
  return e === 1 ? 1 : 1 - Math.pow(2, -10 * e);
}
function vn(e = 1) {
  return (t, n) => {
    const o = n.signalInstance();
    return (
      n.sub(t, (s) => {
        let i = e;
        function r() {
          i > 0 ? (i--, requestAnimationFrame(r)) : n.pub(o, s);
        }
        r();
      }),
      o
    );
  };
}
const bn = "up",
  St = "down",
  Mo = "none",
  Ro = {
    atBottom: !1,
    notAtBottomBecause: "NOT_SHOWING_LAST_ITEM",
    state: {
      offsetBottom: 0,
      scrollTop: 0,
      viewportHeight: 0,
      viewportWidth: 0,
      scrollHeight: 0,
    },
  },
  Ao = 0,
  Co = 4;
function Zt(e) {
  return (t, n) => {
    const o = n.signalInstance();
    return (
      n.sub(t, (s) => {
        e > 0 ? e-- : n.pub(o, s);
      }),
      o
    );
  };
}
u(!1);
const mn = u(!0);
S();
const ge = u(!1),
  Do = S((e) => {
    e.link(e.pipe(mn, Vt(50)), Do);
  }),
  In = u(Co),
  Oo = u(Ao, (e) => {
    e.link(
      e.pipe(
        e.combine($, Oo),
        f(([t, n]) => t <= n),
      ),
      mn,
    );
  }),
  Ne = u(!1, (e) => {
    e.link(e.pipe($, Zt(1), V(!0)), Ne), e.link(e.pipe($, Zt(1), V(!1), be(100)), Ne);
  }),
  Lt = u(!1, (e) => {
    e.link(e.pipe(se, V(!0)), Lt), e.link(e.pipe(se, V(!1), be(200)), Lt);
  }),
  kn = u(!1),
  nt = u(
    null,
    (e) => {
      e.link(
        e.pipe(
          e.combine(K, $, J, Ln, In, ft, vt, Z),
          d(([, , , , , , , t]) => !k(t)),
          G((t, [n, o, s, i, r, l]) => {
            const a = o + s - n + l > -r,
              p = {
                viewportWidth: i,
                viewportHeight: s,
                scrollTop: o,
                scrollHeight: n,
                listMarginTop: l,
              };
            if (a) {
              let m, y;
              return (
                o > t.state.scrollTop
                  ? ((m = "SCROLLED_DOWN"), (y = t.state.scrollTop - o))
                  : ((m = n === s ? "LIST_TOO_SHORT" : "SIZE_DECREASED"),
                    (y = t.state.scrollTop - o || t.scrollTopDelta)),
                {
                  atBottom: !0,
                  state: p,
                  atBottomBecause: m,
                  scrollTopDelta: y,
                }
              );
            }
            let v;
            return (
              s < t.state.viewportHeight
                ? (v = "VIEWPORT_HEIGHT_DECREASING")
                : i < t.state.viewportWidth
                  ? (v = "VIEWPORT_WIDTH_DECREASING")
                  : o < t.state.scrollTop
                    ? (v = "SCROLLING_UPWARDS")
                    : p.scrollHeight > t.state.scrollHeight ||
                        p.listMarginTop < t.state.listMarginTop
                      ? t.atBottom
                        ? (v = "SIZE_INCREASED")
                        : (v = t.notAtBottomBecause)
                      : t.atBottom
                        ? (v = "NOT_FULLY_SCROLLED_TO_LAST_ITEM_BOTTOM")
                        : (v = t.notAtBottomBecause),
              {
                atBottom: !1,
                notAtBottomBecause: v,
                state: p,
              }
            );
          }, Ro),
        ),
        nt,
      ),
        e.link(
          e.pipe(
            nt,
            G(
              ({ prev: t }, n) => {
                const o = !!(
                  t &&
                  n &&
                  t.atBottom &&
                  !n.atBottom &&
                  n.notAtBottomBecause === "SIZE_INCREASED"
                );
                return {
                  prev: n,
                  shouldScroll: o,
                };
              },
              { prev: null, shouldScroll: !1 },
            ),
            f(({ shouldScroll: t }) => t),
          ),
          kn,
        ),
        e.sub(
          e.pipe(
            J,
            I(nt),
            G(
              (t, [n, o]) => {
                let s = 0;
                return (
                  t.viewportHeight > n &&
                    o &&
                    !o.atBottom &&
                    o.notAtBottomBecause === "VIEWPORT_HEIGHT_DECREASING" &&
                    (s = t.viewportHeight - n),
                  { viewportHeight: n, delta: s }
                );
              },
              { viewportHeight: 0, delta: 0 },
            ),
          ),
          (t) => {
            t.delta && e.pub(se, t.delta);
          },
        );
    },
    (e, t) =>
      !e || e.atBottom !== (t == null ? void 0 : t.atBottom)
        ? !1
        : !e.atBottom && !t.atBottom
          ? e.notAtBottomBecause === t.notAtBottomBecause
          : !0,
  ),
  xn = u(0, (e) => {
    e.link(
      e.pipe(
        e.combine($, K, J),
        G(
          (t, [n, o, s]) => {
            if (hn(t.scrollHeight, o))
              return {
                scrollTop: n,
                scrollHeight: o,
                jump: 0,
                changed: !1,
              };
            {
              const i = o - (n + s) < 1;
              return t.scrollTop !== n && i
                ? {
                    scrollHeight: o,
                    scrollTop: n,
                    jump: t.scrollTop - n,
                    changed: !0,
                  }
                : {
                    scrollHeight: o,
                    scrollTop: n,
                    jump: 0,
                    changed: !0,
                  };
            }
          },
          { scrollHeight: 0, jump: 0, scrollTop: 0, changed: !1 },
        ),
        d((t) => t.changed),
        f((t) => t.jump),
      ),
      xn,
    );
  }),
  Mt = u(St, (e) => {
    e.link(
      e.pipe(
        $,
        G(
          (t, n) =>
            e.getValue(Lt)
              ? { direction: t.direction, prevScrollTop: n }
              : { direction: n < t.prevScrollTop ? bn : St, prevScrollTop: n },
          { direction: St, prevScrollTop: 0 },
        ),
        f((t) => t.direction),
      ),
      Mt,
    ),
      e.link(e.pipe($, be(100), V(Mo)), Mt);
  }),
  Jt = u(0, (e) => {
    e.link(e.pipe(Ne, d(dn), V(0)), Jt),
      e.link(
        e.pipe(
          $,
          Vt(100),
          I(Ne),
          d(([, t]) => !!t),
          G(([, t], [n]) => [t, n], [0, 0]),
          f(([t, n]) => n - t),
        ),
        Jt,
      );
  });
function Nt(e, t) {
  if (typeof e == "number")
    return {
      index: e,
      offset: 0,
      behavior: "auto",
      align: "start-no-overflow",
    };
  const n = {
    index: NaN,
    align: e.align ?? "start-no-overflow",
    behavior: e.behavior ?? "auto",
    offset: e.offset ?? 0,
  };
  return (
    e.index === "LAST"
      ? (n.index = t)
      : e.index < 0
        ? (n.index = t + e.index)
        : (n.index = e.index),
    n
  );
}
function Sn({
  location: e,
  sizeTree: t,
  offsetTree: n,
  totalHeight: o,
  totalCount: s,
  viewportHeight: i,
  headerHeight: r,
  stickyHeaderHeight: l,
  stickyFooterHeight: c,
}) {
  const { align: a, behavior: p, offset: v, index: m } = Nt(e, s - 1);
  function y() {
    const P = ce(t, m)[1];
    if (P === void 0) throw new Error(`Item at index ${m} not found`);
    return P;
  }
  i -= l + c;
  let x = wt(m, n) + r - l;
  a === "end" ? (x = x - i + y()) : a === "center" && (x = x - i / 2 + y() / 2), v && (x += v);
  let b = 0;
  return (
    a === "start" && (b = Math.max(0, Math.min(x - (o - i)))),
    (x = Math.max(0, x)),
    { top: x, behavior: p, align: a, forceBottomSpace: b }
  );
}
const Be = u(null),
  Ho = u(!1),
  ot = u(!0),
  Rt = S((e) => {
    e.link(
      e.pipe(
        Rt,
        f(() => !0),
      ),
      ot,
    ),
      e.link(
        e.pipe(
          Rt,
          f(() => null),
        ),
        Be,
      );
  }),
  yn = S((e) => {
    e.link(
      e.pipe(
        yn,
        I(xe, Le, Ge),
        f(([t, n, o, s]) => {
          let { align: i, behavior: r, offset: l, index: c } = Nt(t, n - 1);
          const a = typeof t != "number" ? t.done : void 0,
            [p, v] = fn(c, o);
          return p < -s.listOffset
            ? ((typeof t == "number" || t.align === void 0) && (i = "start-no-overflow"),
              { index: c, align: i, behavior: r, offset: l, done: a })
            : p + v > -s.listOffset + s.visibleListHeight
              ? ((typeof t == "number" || t.align === void 0) && (i = "end"),
                { index: c, align: i, behavior: r, offset: l, done: a })
              : null;
        }),
        d((t) => t !== null),
      ),
      // @ts-expect-error contra variance
      ne,
    );
  }),
  ne = S((e) => {
    const t = e.pipe(
      ne,
      I(Z, Le, xe, J, dt, Ke, qe, Ie),
      f(([n, o, s, i, r, l, c, a, p]) => {
        try {
          return Sn({
            location: n,
            totalHeight: p,
            sizeTree: o,
            offsetTree: s,
            totalCount: i,
            viewportHeight: r,
            headerHeight: l,
            stickyHeaderHeight: c,
            stickyFooterHeight: a,
          });
        } catch {
          return null;
        }
      }),
      d((n) => n !== null),
    );
    e.link(ne, Be),
      e.link(t, Me),
      e.link(
        e.pipe(
          ne,
          d((n) => typeof n != "number" && n.index === "LAST"),
          V(!0),
        ),
        ge,
      ),
      e.link(e.pipe(t, V(!1)), ot),
      e.link(e.pipe(t, V(!1)), Ho),
      e.link(
        e.pipe(
          Z,
          // wait for the list to render with the specified sizeTree, so that enough space is available to scroll by
          be(0),
          I(ot, Be),
          d(([, n, o]) => !n && o !== null),
          f(([, , n]) => n),
        ),
        ne,
      ),
      e.sub(e.pipe(je, be(10)), () => {
        const n = e.getValue(Be);
        n !== null && typeof n != "number" && n.done !== void 0 && n.done(),
          e.pubIn({
            [Be]: null,
            [ot]: !0,
          });
      }),
      e.link(
        e.pipe(
          rt,
          // wait for the list to render with the specified scrollOffset, so that enough space is available to scroll by
          Ft(),
          d((n) => n !== 0),
        ),
        se,
      ),
      e.link(
        e.pipe(
          rt,
          nn($),
          f(() => 0),
        ),
        rt,
      );
  }),
  Fe = u(null),
  Ee = u(null, (e) => {
    e.link(
      e.pipe(
        Ee,
        d((n) => n !== null),
      ),
      Fe,
    );
    const t = e.pipe(
      e.combine(Ee, Z),
      I(Fe),
      d(([[n, o], s]) => n !== null && !k(o) && s !== null),
      f(([[n]]) => n),
    );
    e.link(e.pipe(t, Ft()), ne),
      e.link(
        e.pipe(
          t,
          nn(e.pipe(Ye, d(dn))),
          V(null),
          // unset the location after the scroll completes
        ),
        Fe,
      );
  });
function Bo(e, t) {
  const n = t.slice();
  let o = 0;
  const s = [];
  me(e).forEach(({ k: r, v: l }) => {
    var p, v;
    for (; n.length && n[0] < r; ) n.shift(), o++;
    const c = Math.max(0, r - o),
      a = ((p = s.at(-1)) == null ? void 0 : p.k) ?? -1;
    c === a
      ? (((v = s.at(-2)) == null ? void 0 : v.v) ?? -1) === l
        ? s.pop()
        : (s[s.length - 1].v = l)
      : s.push({ k: c, v: l });
  });
  let i = Re();
  return (
    s.forEach(({ k: r, v: l }) => {
      i = F(i, r, l);
    }),
    i
  );
}
function Vo(e, t) {
  return [
    {
      data: t == null ? void 0 : t[e],
      prevData: (t == null ? void 0 : t[e - 1]) ?? null,
      nextData: (t == null ? void 0 : t[e + 1]) ?? null,
      height: 0,
      index: e,
      offset: 0,
      type: "flat",
    },
  ];
}
const Fo = [],
  Ve = {
    items: Fo,
    listBottom: 0,
    listTop: 0,
    offsetTree: [],
    paddingBottom: 0,
    paddingTop: 0,
    totalCount: 0,
    data: null,
  },
  Ae = u(Ve, (e) => {
    e.link(
      e.pipe(
        e.combine(_o, An, Z, Le, xe, Ie, w, rt, Ee, Fe, Ue, Ke, qe, W, ve, q),
        d((t) => {
          const n = t[t.length - 2],
            o = t[t.length - 1];
          return !n && !o;
        }),
        G((t, [n, o, s, i, r, l, c, a, p, v, m, y, x, b]) => {
          var Je;
          if ((c == null ? void 0 : c.length) === 0) return Ve;
          if (k(s)) {
            let z = 0;
            return (
              p !== null && (z = Nt(p, r - 1).index),
              { ...Ve, items: Vo(z, c), offsetTree: i, totalCount: r, data: c }
            );
          }
          let P = 0;
          v !== null &&
            n === 0 &&
            (P =
              Sn({
                totalHeight: l,
                location: v,
                sizeTree: s,
                offsetTree: i,
                totalCount: r,
                viewportHeight: e.getValue(J),
                headerHeight: e.getValue(dt),
                stickyHeaderHeight: y,
                stickyFooterHeight: x,
              }).top ?? 0);
          const U = Math.min(Math.max(n + P + a - b - m, 0), l - o),
            X = U + o;
          if (
            t.offsetTree === i &&
            t.totalCount === r &&
            t.data === c &&
            U >= t.listTop &&
            X <= t.listBottom
          )
            return t;
          const Q = [],
            ee = r - 1,
            N = 0,
            R = Eo(i, U, X, N);
          let A = 0,
            pe = 0,
            Ze = !1;
          for (const z of R) {
            const {
              value: { offset: Se, height: ie },
            } = z;
            let te = z.start;
            (A = Se),
              Se < U && ((te += Math.floor((U - Se) / ie)), (A += (te - z.start) * ie)),
              te < N && ((A += (N - te) * ie), (te = N));
            const Ce = Math.min(z.end, ee);
            for (let re = te; re <= Ce && !(A >= X); re++) {
              const De = {
                data: c == null ? void 0 : c[re],
                prevData: (c == null ? void 0 : c[re - 1]) ?? null,
                nextData: (c == null ? void 0 : c[re + 1]) ?? null,
                height: ie,
                index: re,
                offset: A,
                type: "flat",
              };
              Ze || ((Ze = !0), (pe = A)), Q.push(De), (A += ie);
            }
          }
          const E = l - A,
            oe = ((Je = Q[0]) == null ? void 0 : Je.offset) || 0;
          return {
            items: Q,
            listBottom: A,
            listTop: pe,
            offsetTree: i,
            paddingBottom: E,
            paddingTop: oe,
            totalCount: r,
            data: c,
          };
        }, Ve),
      ),
      Ae,
    );
  }),
  at = ke([], (e) =>
    e.pipe(
      e.combine(Ae, $),
      f(([t, n]) => {
        const o = t.items.slice();
        for (; o.length > 0 && o[0].offset + o[0].height < n; ) o.shift();
        return o.map((s) => s.data);
      }),
    ),
  ),
  q = u(!1),
  _e = u(!1),
  st = S((e) => {
    e.link(
      e.pipe(
        Ae,
        I(xn, ve),
        d(([, , t]) => !t),
        G(
          ([, t, n, o], [{ items: s, totalCount: i, listBottom: r, paddingBottom: l }, c]) => {
            const a = r + l;
            let p = 0;
            return (
              n === i && t.length > 0 && s.length > 0 && ((p = a - o), p !== 0 && (p += c)),
              [p, s, i, a]
            );
          },
          [0, [], 0, 0],
        ),
        d(([t]) => t !== 0),
        I($, Mt, Ye),
        d(([, t, n, o]) => !o && t !== 0 && n === bn),
        f(([[t]]) => t),
      ),
      st,
    ),
      gn()
        ? (e.sub(e.pipe(st, I(W, $)), ([t, n]) => {
            e.pub(W, n - t);
          }),
          e.sub(e.pipe(e.combine($, W, ve, _e)), ([t, n, o, s]) => {
            o ||
              s ||
              (n > 0 && t < n
                ? (e.pub(q, !0),
                  e.pub(Me, { top: 0, behavior: "instant" }),
                  setTimeout(() => {
                    e.pubIn({
                      [q]: !1,
                      [W]: 0,
                    });
                  }))
                : n < 0 &&
                  t <= 0 &&
                  (e.pubIn({
                    [q]: !0,
                    [W]: 0,
                  }),
                  setTimeout(() => {
                    e.pub(Me, { top: 0, behavior: "instant" }), e.pub(q, !1);
                  })));
          }),
          e.sub(
            e.pipe(
              e.combine(Ne, W, q, ve, _e),
              d(([t, n, o, s, i]) => !t && n !== 0 && !o && !s && !i),
              Vt(100),
            ),
            ([, t]) => {
              e.pub(q, !0),
                t < 0
                  ? requestAnimationFrame(() => {
                      e.pub(se, -t),
                        e.pub(W, 0),
                        requestAnimationFrame(() => {
                          e.pub(q, !1);
                        });
                    })
                  : requestAnimationFrame(() => {
                      e.pub(se, -t),
                        e.pub(W, 0),
                        requestAnimationFrame(() => {
                          e.pub(q, !1);
                        });
                    });
            },
          ))
        : e.link(st, se);
  }),
  xe = u(0),
  ze = u(null),
  w = u(null, (e) => {
    e.link(
      e.pipe(
        w,
        d((t) => t !== null),
        f((t) => t.length),
      ),
      xe,
    );
  }),
  He = u(null),
  le = S((e) => {
    e.link(
      e.pipe(
        le,
        I(we),
        f(([n, o]) => -(o * n.length)),
      ),
      W,
    ),
      e.link(e.pipe(le, V(!0)), _e),
      e.link(e.pipe(le, Ft()), He);
    function t(n, o) {
      e.pubIn({
        [se]: n,
        [ut]: n,
      }),
        o
          ? requestAnimationFrame(() => {
              e.pubIn({
                [W]: 0,
                [ut]: 0,
                [He]: null,
                [_e]: !1,
              });
            })
          : e.pubIn({
              [W]: 0,
              [ut]: 0,
              [He]: null,
              [_e]: !1,
            });
    }
    e.sub(
      e.pipe(
        Le,
        I(He),
        d(([, n]) => n !== null),
        f(([n, o]) => {
          if (o === null) throw new Error("Unexpected null items");
          return wt(o.length, n);
        }),
      ),
      (n) => {
        t(n, !1);
      },
    ),
      e.sub(
        e.pipe(
          le,
          vn(2),
          I(Le, He),
          d(([, , n]) => n !== null),
          f(([n, o]) => wt(n.length, o)),
        ),
        (n) => {
          t(n, !0);
        },
      ),
      e.changeWith(w, le, (n, o) => (n ? [...o, ...n] : o.slice())),
      e.link(
        e.pipe(
          le,
          I(Z, we),
          f(([n, o, s]) => {
            const i = n.length,
              r = s;
            return me(o).reduce(
              (c, { k: a, v: p }) => ({
                ranges: [
                  ...c.ranges,
                  { startIndex: c.prevIndex, endIndex: a + i - 1, size: c.prevSize },
                ],
                prevIndex: a + i,
                prevSize: p,
              }),
              {
                ranges: [],
                prevIndex: 0,
                prevSize: r,
              },
            ).ranges;
          }),
        ),
        de,
      );
  }),
  gt = S((e) => {
    const t = e.pipe(
      gt,
      I(Ge, zt, ze, Z),
      d(([, , , , o]) => !k(o)),
      f(([{ data: o, scrollToBottom: s }, i, r, l]) => {
        if (s === !1 || s === void 0) return null;
        let c = "auto";
        const a = i.isAtBottom;
        if (typeof s == "function") {
          const p = s({ data: o, scrollLocation: i, scrollInProgress: r, context: l, atBottom: a });
          if (!p) return null;
          if (typeof p == "object") return p;
          if (typeof p == "number") return { index: p, align: "end", behavior: "auto" };
          c = p;
        } else {
          if (!a) return null;
          c = s;
        }
        return c === !0 && (c = "auto"), { index: "LAST", align: "end", behavior: c };
      }),
    );
    e.link(
      e.pipe(
        t,
        d((o) => o !== null),
        f(() => !0),
      ),
      ge,
    ),
      e.link(
        e.pipe(
          je,
          I(ge),
          d(([o, s]) => s),
          f(() => !1),
        ),
        ge,
      );
    const n = e.pipe(
      jt,
      I(ge),
      d(([o, s]) => o === "up" && s),
    );
    e.link(
      e.pipe(
        n,
        f(() => !1),
      ),
      ge,
    ),
      e.link(e.pipe(n, V(!0)), Rt),
      e.link(
        e.pipe(
          t,
          d((o) => o !== null),
          be(20),
        ),
        ne,
      );
  }),
  pt = S((e) => {
    e.changeWith(w, pt, (t, n) => (t ? [...t, ...n.data] : n.data.slice())), e.link(pt, gt);
  }),
  it = S((e) => {
    e.changeWith(w, it, (t, n) =>
      t ? [...t.slice(0, n.offset), ...n.data, ...t.slice(n.offset)] : n.data.slice(),
    ),
      e.changeWith(ae, it, ([t], n) => {
        const s = ce(t, n.offset, "k")[0],
          i = n.data.length;
        return [bo(t, s, 1 / 0, (l, c) => [l + i, c]), s];
      }),
      e.link(it, gt);
  }),
  At = S((e) => {
    e.changeWith(w, At, (t, { offset: n, count: o }) =>
      t ? t.slice(0, n).concat(t.slice(n + o)) : [],
    ),
      e.changeWith(ae, At, ([t], { offset: n, count: o }) => [mo(t, n, o), n]);
  }),
  yt = u(null),
  We = S((e) => {
    e.sub(
      e.pipe(
        We,
        I(w),
        d(([{ purgeItemSizes: t }, n]) => !!t || n === null || n.length === 0),
      ),
      ([t, n]) => {
        n === null || n.length === 0
          ? e.pubIn({
              ...(t.initialLocation ? { [Ee]: t.initialLocation } : {}),
              [w]: t.data.slice(),
            })
          : e.pubIn({
              ...(t.initialLocation ? { [Ee]: t.initialLocation } : {}),
              [ae]: ht,
              [Ae]: Ve,
              [yt]: t.data.slice(),
            });
      },
    ),
      e.sub(
        e.pipe(
          On,
          I(yt),
          d(([, t]) => t !== null),
        ),
        ([, t]) => {
          e.pubIn({
            [w]: t,
            [yt]: null,
          });
        },
      ),
      e.link(
        e.pipe(
          We,
          d(({ purgeItemSizes: t }) => !t),
          I(we),
          d(([, t]) => t > 0),
          f(([{ data: t }, n]) => [
            {
              size: n,
              startIndex: t.length,
              endIndex: 1 / 0,
            },
          ]),
        ),
        de,
      ),
      e.sub(
        e.pipe(
          We,
          d(({ purgeItemSizes: t }) => !t),
        ),
        ({ data: t, initialLocation: n, suppressItemMeasure: o }) => {
          requestAnimationFrame(() => {
            o || e.pub(Dn),
              requestAnimationFrame(() => {
                n &&
                  e.pubIn({
                    [ne]: n,
                  });
              });
          }),
            e.pubIn({
              [w]: t.slice(),
            });
        },
      );
  }),
  Xt = S((e) => {
    e.changeWith(w, Xt, (t, n) => (t ? t.slice(n) : [])),
      e.changeWith(ae, Xt, ([t], n) => [
        me(t).reduce((s, { k: i, v: r }) => F(s, Math.max(0, i - n), r), Re()),
        0,
      ]);
  }),
  Qt = S((e) => {
    e.changeWith(w, Qt, (t, n) => (t ? t.slice(0, t.length - n) : [])),
      e.link(
        e.pipe(
          Qt,
          I(xe, we),
          f(([, t, n]) => [
            {
              size: n,
              startIndex: t,
              endIndex: 1 / 0,
            },
          ]),
        ),
        de,
      );
  }),
  Tn = S((e) => {
    const t = e.pipe(
      Tn,
      I(w),
      f(([n, o]) => {
        if (!o) return [];
        const s = [];
        return (
          o.forEach((i, r) => {
            n(i, r) && s.push(r);
          }),
          s
        );
      }),
    );
    e.changeWith(w, t, (n, o) => (n ? n.filter((s, i) => !o.includes(i)) : [])),
      e.changeWith(ae, t, ([n], o) => [Bo(n, o), 0]);
  }),
  Ct = S((e) => {
    e.changeWith(w, Ct, (t, { mapper: n }) => (t ? t.map(n) : [])),
      e.link(
        e.pipe(
          Ct,
          vn(3),
          I(kn),
          d(([{ autoscrollToBottomBehavior: t }, n]) => n && !!t),
          f(([{ autoscrollToBottomBehavior: t }]) =>
            typeof t == "object" ? t.location() : { index: "LAST", align: "end", behavior: t },
          ),
          d((t) => !!t),
        ),
        ne,
      );
  }),
  de = S();
u([]);
u([]);
u(0);
u(null);
u(NaN);
const ve = u(!1),
  ae = u(ht, (e) => {
    e.link(
      e.pipe(
        de,
        d((t) => t.length > 0),
        I(Z),
        f(([t, n]) => So(n, [t, []])),
      ),
      ae,
    );
  }),
  Z = u(ht[0], (e) => {
    e.link(
      e.pipe(
        ae,
        f(([t]) => t),
      ),
      Z,
    );
  }),
  $n = u(ht[1], (e) => {
    e.link(
      e.pipe(
        ae,
        f(([, t]) => t),
      ),
      $n,
    );
  }),
  we = u($e[1]),
  Le = u($e[0]),
  Pe = u($e, (e) => {
    e.link(
      e.pipe(
        Z,
        I($n),
        G(([t], [n, o]) => wo(t, [n, o]), $e),
      ),
      Pe,
    ),
      e.link(
        e.pipe(
          Pe,
          f(([, t]) => t),
        ),
        we,
      ),
      e.link(
        e.pipe(
          Pe,
          f(([t]) => t),
        ),
        Le,
      );
  }),
  En = u($e[2], (e) => {
    e.link(
      e.pipe(
        Pe,
        f(([, , t]) => t),
      ),
      En,
    );
  }),
  wn = u($e[3], (e) => {
    e.link(
      e.pipe(
        Pe,
        f(([, , , t]) => t),
      ),
      wn,
    );
  }),
  Ie = u(0, (e) => {
    e.link(
      e.pipe(
        e.combine(xe, wn, En, we),
        f(([t, n, o, s]) => o + (t - n) * s),
      ),
      Ie,
    );
  }),
  Ye = S(),
  zt = u(!1),
  je = S((e) => {
    e.link(e.pipe(je, V(!1)), Ye);
  }, !1),
  $ = u(0),
  J = u(0),
  Ln = u(0),
  K = u(0),
  _o = $,
  rt = u(0),
  Ke = u(0),
  Ue = u(0),
  qe = u(0),
  Yt = u(0),
  Dt = u(null),
  Mn = _t(),
  Wo = Lo,
  Po = 50,
  dt = ke(0, (e) =>
    e.pipe(
      e.combine(Ke, Ue),
      f(([t, n]) => t + n),
    ),
  ),
  Rn = ke(0, (e) =>
    e.pipe(
      e.combine(qe, Yt),
      f(([t, n]) => t + n),
    ),
  ),
  No = ke(0, (e) =>
    e.pipe(
      e.combine(Ke, Ue, $),
      f(([t, n, o]) => t + Math.max(n - o, 0)),
    ),
  ),
  zo = ke(0, (e) =>
    e.pipe(
      e.combine(qe, Yt, $, J, K),
      f(([t, n, o, s, i]) => {
        o = Math.min(o, i - s);
        const r = Math.max(n - (i - (o + s)), 0);
        return t + r;
      }),
    ),
  ),
  An = ke(0, (e) =>
    e.pipe(
      e.combine(J, No, zo),
      f(([t, n, o]) => t - n - o),
    ),
  ),
  vt = u(0),
  lt = u(0, (e) => {
    e.link(
      e.pipe(
        Ie,
        I(lt),
        G(
          (t, [n, o]) => {
            if (t.prevTotalHeight === null) return { prevTotalHeight: n, adjustedMinScrollTop: o };
            const s = Math.min(n - t.prevTotalHeight, 0),
              i = o === 0 ? 0 : o + s;
            return { prevTotalHeight: n, adjustedMinScrollTop: i };
          },
          { prevTotalHeight: null, adjustedMinScrollTop: 0 },
        ),
        f(({ adjustedMinScrollTop: t }) => t),
      ),
      lt,
    ),
      e.link(
        e.pipe(
          e.combine(lt, Ie, J),
          f(([t, n, o]) => (t === 0 ? 0 : Math.max(0, Math.min(t - (n - o))))),
        ),
        vt,
      );
  }),
  Me = S((e) => {
    e.link(
      e.pipe(
        Me,
        f((t) => (t.align === "start" ? t.top ?? 0 : 0)),
      ),
      lt,
    ),
      e.link(
        e.pipe(
          Me,
          I($),
          d(([t, n]) => t.top !== n),
          V(!0),
        ),
        Ye,
      );
  }),
  Ge = ke(
    {
      listOffset: 0,
      visibleListHeight: 0,
      scrollHeight: 0,
      bottomOffset: 0,
      isAtBottom: !1,
    },
    (e) =>
      e.pipe(
        e.combine($, dt, Rn, Ue, An, K, vt, ve, Fe, q, ge),
        d(([, , , , , , , t, n, o]) => !t && n === null && !o),
        f(([t, n, o, s, i, r, l, c, a, p, v]) => {
          const m = e.getValue(In),
            y = r - n - o,
            x = -t + s,
            b = y + Math.min(0, x) - i - l;
          return {
            scrollHeight: y,
            listOffset: x,
            visibleListHeight: i,
            bottomOffset: b,
            isAtBottom: v || b <= m,
          };
        }),
      ),
  ),
  Ot = S((e) => {
    e.link(
      e.pipe(
        $,
        be(0),
        I(Ge),
        d(([, t]) => t.scrollHeight > 0),
        f(([, t]) => t),
      ),
      Ot,
    );
  }),
  se = S(),
  W = u(0),
  ut = u(0),
  ft = u(0),
  Cn = u(""),
  jt = S(),
  Dn = _t(),
  On = _t(),
  Hn = ({ index: e }) => /* @__PURE__ */ tn("div", { children: ["Item ", e] }),
  Bn = ({ index: e }) => e,
  Ht = u(Hn),
  Vn = u(Bn),
  Fn = u(null),
  _n = u(null),
  Wn = u(null),
  Pn = u(null),
  Nn = u(null),
  zn = u("div"),
  Yo = {
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  Qe = {
    overflowAnchor: "none",
  },
  jo = {
    position: "sticky",
    bottom: 0,
  },
  Yn = g.forwardRef((e, t) => /* @__PURE__ */ T("div", { style: { zIndex: 1 }, ...e, ref: t })),
  jn = g.forwardRef((e, t) => /* @__PURE__ */ T("div", { ...e, ref: t })),
  Kn = g.forwardRef(({ style: e, ...t }, n) =>
    /* @__PURE__ */ T("div", { ...t, style: { ...Yo, ...e }, ref: n }),
  ),
  Un = g.forwardRef(({ style: e, ...t }, n) =>
    /* @__PURE__ */ T("div", { ...t, style: { ...jo, ...e }, ref: n }),
  ),
  qn = u(Yn),
  Gn = u(Kn),
  Zn = u(jn),
  Jn = u(Un),
  Bt = u("top", (e) => {
    e.link(
      e.pipe(
        e.combine(Bt, Ie, J, dt, Rn),
        d(([t]) => t === "bottom" || t === "bottom-smooth"),
        f(([, t, n, o, s]) => Math.max(0, n - t - o - s)),
      ),
      ft,
    ),
      e.link(
        e.pipe(
          e.combine(ft, Bt),
          d(([, t]) => t === "bottom-smooth"),
          G((t, [n]) => [t[1], n], [0, 0]),
          f(([t, n]) => (t > 0 && n > 0 ? "margin-top 0.2s ease-out" : "")),
        ),
        Cn,
      );
  });
function Ko(e) {
  return Uo(Go(Zo(qo(e), 8 * e.length))).toLowerCase();
}
function Uo(e) {
  for (var t, n = "0123456789ABCDEF", o = "", s = 0; s < e.length; s++)
    (t = e.charCodeAt(s)), (o += n.charAt((t >>> 4) & 15) + n.charAt(15 & t));
  return o;
}
function qo(e) {
  for (var t = Array(e.length >> 2), n = 0; n < t.length; n++) t[n] = 0;
  for (n = 0; n < 8 * e.length; n += 8) t[n >> 5] |= (255 & e.charCodeAt(n / 8)) << n % 32;
  return t;
}
function Go(e) {
  for (var t = "", n = 0; n < 32 * e.length; n += 8)
    t += String.fromCharCode((e[n >> 5] >>> n % 32) & 255);
  return t;
}
function Zo(e, t) {
  (e[t >> 5] |= 128 << t % 32), (e[14 + (((t + 64) >>> 9) << 4)] = t);
  for (
    var n = 1732584193, o = -271733879, s = -1732584194, i = 271733878, r = 0;
    r < e.length;
    r += 16
  ) {
    const l = n,
      c = o,
      a = s,
      p = i;
    (o = H(
      (o = H(
        (o = H(
          (o = H(
            (o = O(
              (o = O(
                (o = O(
                  (o = O(
                    (o = D(
                      (o = D(
                        (o = D(
                          (o = D(
                            (o = C(
                              (o = C(
                                (o = C(
                                  (o = C(
                                    o,
                                    (s = C(
                                      s,
                                      (i = C(
                                        i,
                                        (n = C(n, o, s, i, e[r + 0], 7, -680876936)),
                                        o,
                                        s,
                                        e[r + 1],
                                        12,
                                        -389564586,
                                      )),
                                      n,
                                      o,
                                      e[r + 2],
                                      17,
                                      606105819,
                                    )),
                                    i,
                                    n,
                                    e[r + 3],
                                    22,
                                    -1044525330,
                                  )),
                                  (s = C(
                                    s,
                                    (i = C(
                                      i,
                                      (n = C(n, o, s, i, e[r + 4], 7, -176418897)),
                                      o,
                                      s,
                                      e[r + 5],
                                      12,
                                      1200080426,
                                    )),
                                    n,
                                    o,
                                    e[r + 6],
                                    17,
                                    -1473231341,
                                  )),
                                  i,
                                  n,
                                  e[r + 7],
                                  22,
                                  -45705983,
                                )),
                                (s = C(
                                  s,
                                  (i = C(
                                    i,
                                    (n = C(n, o, s, i, e[r + 8], 7, 1770035416)),
                                    o,
                                    s,
                                    e[r + 9],
                                    12,
                                    -1958414417,
                                  )),
                                  n,
                                  o,
                                  e[r + 10],
                                  17,
                                  -42063,
                                )),
                                i,
                                n,
                                e[r + 11],
                                22,
                                -1990404162,
                              )),
                              (s = C(
                                s,
                                (i = C(
                                  i,
                                  (n = C(n, o, s, i, e[r + 12], 7, 1804603682)),
                                  o,
                                  s,
                                  e[r + 13],
                                  12,
                                  -40341101,
                                )),
                                n,
                                o,
                                e[r + 14],
                                17,
                                -1502002290,
                              )),
                              i,
                              n,
                              e[r + 15],
                              22,
                              1236535329,
                            )),
                            (s = D(
                              s,
                              (i = D(
                                i,
                                (n = D(n, o, s, i, e[r + 1], 5, -165796510)),
                                o,
                                s,
                                e[r + 6],
                                9,
                                -1069501632,
                              )),
                              n,
                              o,
                              e[r + 11],
                              14,
                              643717713,
                            )),
                            i,
                            n,
                            e[r + 0],
                            20,
                            -373897302,
                          )),
                          (s = D(
                            s,
                            (i = D(
                              i,
                              (n = D(n, o, s, i, e[r + 5], 5, -701558691)),
                              o,
                              s,
                              e[r + 10],
                              9,
                              38016083,
                            )),
                            n,
                            o,
                            e[r + 15],
                            14,
                            -660478335,
                          )),
                          i,
                          n,
                          e[r + 4],
                          20,
                          -405537848,
                        )),
                        (s = D(
                          s,
                          (i = D(
                            i,
                            (n = D(n, o, s, i, e[r + 9], 5, 568446438)),
                            o,
                            s,
                            e[r + 14],
                            9,
                            -1019803690,
                          )),
                          n,
                          o,
                          e[r + 3],
                          14,
                          -187363961,
                        )),
                        i,
                        n,
                        e[r + 8],
                        20,
                        1163531501,
                      )),
                      (s = D(
                        s,
                        (i = D(
                          i,
                          (n = D(n, o, s, i, e[r + 13], 5, -1444681467)),
                          o,
                          s,
                          e[r + 2],
                          9,
                          -51403784,
                        )),
                        n,
                        o,
                        e[r + 7],
                        14,
                        1735328473,
                      )),
                      i,
                      n,
                      e[r + 12],
                      20,
                      -1926607734,
                    )),
                    (s = O(
                      s,
                      (i = O(
                        i,
                        (n = O(n, o, s, i, e[r + 5], 4, -378558)),
                        o,
                        s,
                        e[r + 8],
                        11,
                        -2022574463,
                      )),
                      n,
                      o,
                      e[r + 11],
                      16,
                      1839030562,
                    )),
                    i,
                    n,
                    e[r + 14],
                    23,
                    -35309556,
                  )),
                  (s = O(
                    s,
                    (i = O(
                      i,
                      (n = O(n, o, s, i, e[r + 1], 4, -1530992060)),
                      o,
                      s,
                      e[r + 4],
                      11,
                      1272893353,
                    )),
                    n,
                    o,
                    e[r + 7],
                    16,
                    -155497632,
                  )),
                  i,
                  n,
                  e[r + 10],
                  23,
                  -1094730640,
                )),
                (s = O(
                  s,
                  (i = O(
                    i,
                    (n = O(n, o, s, i, e[r + 13], 4, 681279174)),
                    o,
                    s,
                    e[r + 0],
                    11,
                    -358537222,
                  )),
                  n,
                  o,
                  e[r + 3],
                  16,
                  -722521979,
                )),
                i,
                n,
                e[r + 6],
                23,
                76029189,
              )),
              (s = O(
                s,
                (i = O(
                  i,
                  (n = O(n, o, s, i, e[r + 9], 4, -640364487)),
                  o,
                  s,
                  e[r + 12],
                  11,
                  -421815835,
                )),
                n,
                o,
                e[r + 15],
                16,
                530742520,
              )),
              i,
              n,
              e[r + 2],
              23,
              -995338651,
            )),
            (s = H(
              s,
              (i = H(
                i,
                (n = H(n, o, s, i, e[r + 0], 6, -198630844)),
                o,
                s,
                e[r + 7],
                10,
                1126891415,
              )),
              n,
              o,
              e[r + 14],
              15,
              -1416354905,
            )),
            i,
            n,
            e[r + 5],
            21,
            -57434055,
          )),
          (s = H(
            s,
            (i = H(
              i,
              (n = H(n, o, s, i, e[r + 12], 6, 1700485571)),
              o,
              s,
              e[r + 3],
              10,
              -1894986606,
            )),
            n,
            o,
            e[r + 10],
            15,
            -1051523,
          )),
          i,
          n,
          e[r + 1],
          21,
          -2054922799,
        )),
        (s = H(
          s,
          (i = H(i, (n = H(n, o, s, i, e[r + 8], 6, 1873313359)), o, s, e[r + 15], 10, -30611744)),
          n,
          o,
          e[r + 6],
          15,
          -1560198380,
        )),
        i,
        n,
        e[r + 13],
        21,
        1309151649,
      )),
      (s = H(
        s,
        (i = H(i, (n = H(n, o, s, i, e[r + 4], 6, -145523070)), o, s, e[r + 11], 10, -1120210379)),
        n,
        o,
        e[r + 2],
        15,
        718787259,
      )),
      i,
      n,
      e[r + 9],
      21,
      -343485551,
    )),
      (n = ue(n, l)),
      (o = ue(o, c)),
      (s = ue(s, a)),
      (i = ue(i, p));
  }
  return [n, o, s, i];
}
function bt(e, t, n, o, s, i) {
  return ue(Jo(ue(ue(t, e), ue(o, i)), s), n);
}
function C(e, t, n, o, s, i, r) {
  return bt((t & n) | (~t & o), e, t, s, i, r);
}
function D(e, t, n, o, s, i, r) {
  return bt((t & o) | (n & ~o), e, t, s, i, r);
}
function O(e, t, n, o, s, i, r) {
  return bt(t ^ n ^ o, e, t, s, i, r);
}
function H(e, t, n, o, s, i, r) {
  return bt(n ^ (t | ~o), e, t, s, i, r);
}
function ue(e, t) {
  const n = (65535 & e) + (65535 & t);
  return (((e >> 16) + (t >> 16) + (n >> 16)) << 16) | (65535 & n);
}
function Jo(e, t) {
  return (e << t) | (e >>> (32 - t));
}
const Xn = Symbol("INVALID_KEY");
function Xo(e) {
  const t = e.slice(0, 32),
    n = e.slice(32),
    o = atob(n);
  if (t !== Ko(n)) return Xn;
  const [s, i] = o.split(";"),
    r = s.slice(2),
    l = new Date(Number(i.slice(2)));
  return { orderNumber: r, expiryDate: l };
}
const Qo = {
    valid: !1,
    consoleMessage:
      "The VirtuosoMessageList license wrapper component is missing. Enclose the VirtuosoMessageList with VirtuosoMessageListLicense and add your key at the lisenceKey property.",
    watermarkMessage:
      "The VirtuosoMessageList license wrapper component is missing. Enclose the VirtuosoMessageList with VirtuosoMessageListLicense and add your key at the lisenceKey property.",
  },
  es = {
    valid: !1,
    consoleMessage:
      "Your VirtuosoMessageListLicense is missing a license key. Purchase one from https://virtuoso.",
    watermarkMessage:
      "Your VirtuosoMessageListLicense is missing a license key. Purchase one from https://virtuoso.",
  },
  ts = {
    valid: !1,
    consoleMessage:
      "Your VirtuosoMessageListLicense component is missing a license key - this component will not work if deployed in production. Purchase a key from https://virtuoso.dev/pricing/   before you deploy to production.",
  },
  Qn = {
    valid: !0,
  },
  ns = {
    valid: !1,
    consoleMessage:
      "Your Virtuoso Message List license key is invalid. Ensure that you have copy-pasted the key from the purchase email correctly.",
    watermarkMessage: "Your Virtuoso Message List license key is invalid",
  },
  os = {
    valid: !1,
    consoleMessage:
      "Your annual license key to use Virtuoso Message List in non-production environments has expired. You can still use it in production. To keep using it in development, purchase a new key from https://virtuoso.",
    watermarkMessage:
      "Your annual license key to use Virtuoso Message List in non-production environments has expired. You can still use it in production. To keep using it in development, purchase a new key from https://virtuoso.",
  },
  ss = {
    valid: !1,
    consoleMessage:
      "You have installed a version of `@virtuoso.dev/message-list` that is newer than the period of your license key. Either downgrade to a supported version, or purchase a new license from https://virtuoso.",
    watermarkMessage: "",
  },
  is = Qn,
  rs = /^(?:127\.0\.0\.1|localhost|0\.0\.0\.0|.+\.local)$/,
  ls = ["virtuoso.dev", "csb.app", "codesandbox.io"];
function us({ licenseKey: e, now: t, hostname: n, packageTimestamp: o }) {
  const s = n.match(rs),
    i = ls.some((r) => n.endsWith(r));
  if (e) {
    const r = Xo(e);
    if (r === Xn) return ns;
    if (r.expiryDate.getTime() < t.getTime()) {
      if (s) return os;
      if (r.expiryDate.getTime() < o) return ss;
    }
  } else return i ? is : s ? ts : es;
  console.log("Qn", Qn);
  return Qn;
}
const eo = g.createContext(Qo),
  cs = ({ licenseKey: e, children: t }) => {
    const n = us({
      licenseKey: e,
      hostname: typeof window < "u" ? window.location.hostname : "localhost",
      now: /* @__PURE__ */ new Date(),
      packageTimestamp: 1731400751838,
    });
    return /* @__PURE__ */ T(eo.Provider, { value: n, children: t });
  };
cs.displayName = Math.random().toString(36).slice(2, 8);
const as = g.createContext(void 0);
function ps(e, t, n) {
  const o = Wt(),
    s = g.useRef(null),
    i = g.useRef(null);
  function r() {
    s.current && (cancelAnimationFrame(s.current), (s.current = null), (i.current = null));
  }
  g.useEffect(
    () =>
      o.sub(jt, (a) => {
        a !== i.current && r();
      }),
    [o],
  ),
    g.useEffect(() => o.sub(Mn, r), [o]);
  const l = g.useCallback(
    (a, p, v) => {
      var P;
      s.current && r();
      const m = ((P = e.current) == null ? void 0 : P.scrollTop) ?? 0;
      i.current = m < a ? "down" : "up";
      let y = 0,
        x = 0;
      function b() {
        var X, Q;
        const U = m + (a - m) * p(y);
        (X = e.current) == null || X.scrollTo({ top: U, behavior: "instant" }),
          (y += 1 / v),
          (x += 1),
          x < v
            ? (s.current = requestAnimationFrame(b))
            : ((Q = e.current) == null || Q.scrollTo({ top: a, behavior: "instant" }),
              (s.current = null),
              (i.current = null));
      }
      b();
    },
    [e],
  );
  return g.useCallback(
    (a) => {
      var p, v, m, y;
      if (a.top === ((p = e.current) == null ? void 0 : p.scrollTop)) {
        o.pub(je, (v = e.current) == null ? void 0 : v.scrollTop);
        return;
      }
      if (
        (a.top !== void 0 && ((n.current = a.top), o.pub(zt, !0)),
        a.forceBottomSpace !== void 0 &&
          t.current &&
          (t.current.style.paddingBottom = `${a.forceBottomSpace}px`),
        a.behavior === "smooth")
      )
        l(a.top ?? 0, Wo, Po);
      else if (a.behavior === "auto" || a.behavior === "instant" || a.behavior === void 0)
        r(), (m = e.current) == null || m.scrollTo(a);
      else {
        const { easing: x, animationFrameCount: b } = a.behavior(
          ((y = e.current) == null ? void 0 : y.scrollTop) ?? 0,
          a.top ?? 0,
        );
        l(a.top ?? 0, x, b);
      }
    },
    [o, l, t, e, n],
  );
}
function to(e) {
  return {
    data: {
      prepend: (t) => {
        e.pub(le, t);
      },
      append: (t, n) => {
        e.pub(pt, {
          data: t,
          scrollToBottom: n,
        });
      },
      replace: (t, n) => {
        e.pub(We, {
          ...n,
          data: t,
        });
      },
      map: (t, n) => {
        e.pub(Ct, {
          mapper: t,
          autoscrollToBottomBehavior: n,
        });
      },
      findAndDelete: (t) => {
        e.pub(Tn, t);
      },
      findIndex: (t) => e.getValue(w).findIndex(t),
      find: (t) => e.getValue(w).find(t),
      insert: function (t, n, o) {
        e.pub(it, {
          data: t,
          offset: n,
          scrollToBottom: o,
        });
      },
      deleteRange: function (t, n) {
        e.pub(At, {
          offset: t,
          count: n,
        });
      },
      batch: (t, n) => {
        e.pub(ve, !0), t(), e.pub(ve, !1), e.pub(gt, { data: [], scrollToBottom: n });
      },
      get: () => e.getValue(w).slice(),
      getCurrentlyRendered: () => e.getValue(at),
    },
    scrollToItem: (t) => {
      e.pub(ne, t);
    },
    scrollIntoView: (t) => {
      e.pub(yn, t);
    },
    scrollerElement: () => e.getValue(Dt),
    getScrollLocation() {
      return e.getValue(Ge);
    },
    cancelSmoothScroll() {
      e.pub(Mn);
    },
    height: (t) => {
      var s;
      const n = ((s = e.getValue(w)) == null ? void 0 : s.indexOf(t)) ?? -1;
      if (n === -1) return 0;
      const o = e.getValue(Z);
      return ce(o, n)[1] ?? 0;
    },
  };
}
const fs = ({ item: e, ItemContent: t, mount: n, unmount: o }) => {
  const s = B(ze),
    i = g.useRef(null),
    r = g.useCallback(
      (l) => {
        l ? ((i.current = l), n(l)) : i.current && (o(i.current), (i.current = null));
      },
      [n, o],
    );
  return /* @__PURE__ */ T("div", {
    ref: r,
    "data-index": e.index,
    "data-known-size": e.height,
    style: {
      overflowAnchor: "none",
      position: "absolute",
      width: "100%",
      top: e.offset,
    },
    children: /* @__PURE__ */ T(t, {
      index: e.index,
      prevData: e.prevData,
      nextData: e.nextData,
      data: e.data,
      context: s,
    }),
  });
};
function et(e) {
  const t = g.useRef(null);
  return [
    g.useCallback(
      (o) => {
        o
          ? ((t.current = o), e == null || e.observe(o, { box: "border-box" }))
          : t.current && (e == null || e.unobserve(t.current), (t.current = null));
      },
      [e],
    ),
    t,
  ];
}
let en = !1;
const hs = g.forwardRef(
  (
    {
      initialData: e = [],
      computeItemKey: t = Bn,
      context: n = null,
      initialLocation: o = null,
      shortSizeAlign: s = "top",
      onScroll: i,
      onRenderedDataChange: r,
      ItemContent: l = Hn,
      Header: c = null,
      StickyHeader: a = null,
      Footer: p = null,
      StickyFooter: v = null,
      EmptyPlaceholder: m = null,
      HeaderWrapper: y = Yn,
      StickyHeaderWrapper: x = Kn,
      FooterWrapper: b = jn,
      StickyFooterWrapper: P = Un,
      ScrollElement: U = "div",
      ...X
    },
    Q,
  ) => {
    const ee = g.useMemo(() => {
      const R = new ho();
      return (
        R.register(Ae),
        R.register(Ye),
        R.register(st),
        R.register(nt),
        R.register(pt),
        R.register(le),
        R.register(We),
        R.pubIn({
          [w]: e.slice(),
          [ze]: n,
          [Vn]: t,
          [Ee]: o,
          [Ht]: l,
          [Fn]: c,
          [Wn]: p,
          [_n]: a,
          [Pn]: v,
          [Nn]: m,
          [zn]: U,
          [Jn]: P,
          [Gn]: x,
          [Zn]: b,
          [qn]: y,
          [Bt]: s,
        }),
        R.singletonSub(Ot, i),
        R.singletonSub(at, r),
        R
      );
    }, []);
    g.useImperativeHandle(Q, () => to(ee), [ee]),
      g.useEffect(() => {
        ee.pubIn({
          [ze]: n,
          [Ht]: l,
        }),
          ee.singletonSub(Ot, i),
          ee.singletonSub(at, r);
      });
    const N = g.useContext(eo);
    return (
      g.useEffect(() => {
        N.consoleMessage && (en || ((en = !0), console.error(N.consoleMessage)));
      }, [N]),
      g.useEffect(() => {
        const R = (A) => {
          var pe;
          (pe = A.message) != null &&
            pe.includes("ResizeObserver loop") &&
            (A.preventDefault(), A.stopPropagation(), A.stopImmediatePropagation());
        };
        return (
          window.addEventListener("error", R, { capture: !0 }),
          () => {
            window.removeEventListener("error", R);
          }
        );
      }, []),
      typeof window < "u" && N.watermarkMessage
        ? /* @__PURE__ */ T("div", {
            style: {
              color: "red",
              pointerEvents: "none",
            },
            children: N.watermarkMessage,
          })
        : /* @__PURE__ */ T(go.Provider, { value: ee, children: /* @__PURE__ */ T(gs, { ...X }) })
    );
  },
);
hs.displayName = "VirtuosoMessageList";
const gs = ({ style: e, ...t }) => {
  const n = Wt(),
    o = g.useContext(as),
    [s, i, r, l, c, a, p, v, m, y, x] = vo(Fn, _n, qn, Gn, Wn, Pn, Zn, Jn, Ht, Nn, zn),
    [b] = g.useState(() => {
      if (typeof ResizeObserver > "u")
        throw new Error(
          "ResizeObserver not found. Please ensure that you have a polyfill installed.",
        );
      return new ResizeObserver((h) => {
        var Xe, ye, Oe, Ut;
        const Y = h.length,
          _ = [];
        let L = {};
        for (let mt = 0; mt < Y; mt++) {
          const he = h[mt],
            j = he.target;
          if (j === N.current) {
            L = {
              ...L,
              [Ue]: he.contentRect.height,
              [K]: (Xe = E.current) == null ? void 0 : Xe.scrollHeight,
            };
            continue;
          } else if (j === A.current) {
            L = {
              ...L,
              [Ke]: he.contentRect.height,
              [K]: (ye = E.current) == null ? void 0 : ye.scrollHeight,
            };
            continue;
          } else if (j === U.current) {
            L = {
              ...L,
              [Yt]: he.contentRect.height,
              [K]: (Oe = E.current) == null ? void 0 : Oe.scrollHeight,
            };
            continue;
          } else if (j === Q.current) {
            L = {
              ...L,
              [qe]: he.contentRect.height,
              [K]: (Ut = E.current) == null ? void 0 : Ut.scrollHeight,
            };
            continue;
          } else if (j === E.current) {
            L = {
              ...L,
              [$]: j.scrollTop,
              [K]: j.scrollHeight,
              [J]: he.contentRect.height,
              [Ln]: j.clientWidth,
            };
            continue;
          } else if (j === oe.current) {
            E.current &&
              (L = {
                ...L,
                [K]: E.current.scrollHeight,
              });
            continue;
          }
          if (j.dataset.index === void 0) continue;
          const It = parseInt(j.dataset.index),
            po = parseFloat(j.dataset.knownSize ?? ""),
            kt = he.contentRect.height;
          if (kt === po) continue;
          const qt = _[_.length - 1];
          _.length === 0 || qt.size !== kt || qt.endIndex !== It - 1
            ? _.push({ endIndex: It, size: kt, startIndex: It })
            : _[_.length - 1].endIndex++;
        }
        _.length > 0 &&
          (L = {
            ...L,
            [de]: _,
          }),
          n.pubIn(L);
      });
    }),
    [P, U] = et(b),
    [X, Q] = et(b),
    [ee, N] = et(b),
    [R, A] = et(b),
    pe = g.useCallback(
      (h) => {
        if (o) {
          const Y = parseInt(h.dataset.index ?? "");
          n.pub(de, [
            {
              startIndex: Y,
              endIndex: Y,
              size: o.itemHeight,
            },
          ]);
        }
        b.observe(h);
      },
      [b, n, o],
    ),
    Ze = g.useCallback(
      (h) => {
        b.unobserve(h);
      },
      [b],
    ),
    E = g.useRef(null),
    oe = g.useRef(null),
    Je = g.useCallback(
      (h) => {
        h
          ? ((oe.current = h), b.observe(h, { box: "border-box" }))
          : oe.current && (b.unobserve(oe.current), (oe.current = null));
      },
      [b],
    ),
    z = g.useRef(null),
    Se = ps(E, oe, z),
    ie = g.useCallback((h) => {
      E.current && (E.current.scrollTop += h);
    }, []),
    te = g.useCallback(() => {
      const h = E.current;
      if (h !== null) {
        if (z.current !== null) {
          const Y = h.scrollHeight - h.clientHeight;
          hn(h.scrollTop, Math.min(Y, z.current)) &&
            ((z.current = null), n.pub(zt, !1), n.pub(je, h.scrollTop));
        }
        n.pub($, h.scrollTop);
      }
    }, [n]),
    Ce = g.useCallback(
      (h) => {
        n.pub(jt, h.deltaY > 0 ? "down" : "up");
      },
      [n],
    ),
    re = g.useCallback(
      (h) => {
        h
          ? (n.pub(Dt, h),
            (E.current = h),
            h.addEventListener("scroll", te),
            h.addEventListener("wheel", Ce),
            o &&
              n.pubIn({
                [J]: o.viewportHeight,
                [K]: o.viewportHeight,
                [$]: 0,
              }),
            b.observe(h, { box: "border-box" }))
          : E.current &&
            (E.current.removeEventListener("scroll", te),
            E.current.removeEventListener("wheel", Ce),
            n.pub(Dt, null),
            b.unobserve(E.current),
            (E.current = null));
      },
      [b, n, te, Ce, o],
    ),
    { items: De } = B(Ae);
  g.useLayoutEffect(() => {
    if (!gn()) return;
    const h = setInterval(() => {
      var Y;
      n.pub(K, (Y = E.current) == null ? void 0 : Y.scrollHeight);
    }, 1e3);
    return () => {
      clearInterval(h);
    };
  }, [n]),
    g.useLayoutEffect(() => n.sub(Me, Se), [Se, n]),
    g.useLayoutEffect(() => n.sub(se, ie), [ie, n]);
  const Kt = g.useCallback(() => {
    var Y;
    const h = [];
    for (const _ of ((Y = oe.current) == null ? void 0 : Y.children) ?? []) {
      if (_.dataset.index === void 0) continue;
      const L = parseInt(_.dataset.index),
        Xe = parseFloat(_.dataset.knownSize ?? ""),
        ye = _.getBoundingClientRect().height;
      if (ye === Xe) continue;
      const Oe = h[h.length - 1];
      h.length === 0 || Oe.size !== ye || Oe.endIndex !== L - 1
        ? h.push({ endIndex: L, size: ye, startIndex: L })
        : h[h.length - 1].endIndex++;
    }
    n.pub(de, h);
  }, [n]);
  g.useLayoutEffect(() => n.sub(Dn, Kt), [Kt, n]);
  const no = B(W),
    oo = B(ut),
    so = B(q),
    io = B(ft),
    ro = B(vt),
    lo = B(Cn),
    fe = B(ze),
    uo = B(Vn),
    co = B(xe),
    ao = B(Ie);
  return (
    g.useLayoutEffect(() => {
      De.length === 0 && n.pub(On);
    }, [De, n]),
    /* @__PURE__ */ T(fo, {
      children: /* @__PURE__ */ tn(x, {
        ...t,
        ref: re,
        "data-testid": "virtuoso-scroller",
        style: {
          overflowY: so ? "hidden" : "scroll",
          boxSizing: "border-box",
          ...e,
        },
        ...(x === "div" ? { context: fe } : {}),
        children: [
          i &&
            /* @__PURE__ */ T(l, {
              ref: R,
              style: Qe,
              children: /* @__PURE__ */ T(i, { context: fe }),
            }),
          s &&
            /* @__PURE__ */ T(r, {
              ref: ee,
              style: Qe,
              children: /* @__PURE__ */ T(s, { context: fe }),
            }),
          co > 0
            ? /* @__PURE__ */ T("div", {
                ref: Je,
                "data-testid": "virtuoso-list",
                style: {
                  boxSizing: "content-box",
                  height: ao,
                  paddingBottom: ro,
                  overflowAnchor: "none",
                  marginTop: io,
                  transition: lo,
                  position: "relative",
                  transform: `translateY(${no + oo}px)`,
                },
                children: De.map((h) =>
                  /* @__PURE__ */ T(
                    fs,
                    {
                      mount: pe,
                      unmount: Ze,
                      item: h,
                      ItemContent: m,
                    },
                    uo({ index: h.index, data: h.data, context: fe }),
                  ),
                ),
              })
            : y
              ? /* @__PURE__ */ T(y, { context: fe })
              : null,
          c &&
            /* @__PURE__ */ T(p, {
              ref: P,
              style: Qe,
              children: /* @__PURE__ */ T(c, { context: fe }),
            }),
          a &&
            /* @__PURE__ */ T(v, {
              ref: X,
              style: Qe,
              children: /* @__PURE__ */ T(a, { context: fe }),
            }),
        ],
      }),
    })
  );
};
function ms() {
  return B(Ge);
}
function Is() {
  return B(at);
}
function ks() {
  const e = Wt();
  return g.useMemo(() => to(e), [e]);
}
export {
  hs as VirtuosoMessageList,
  cs as VirtuosoMessageListLicense,
  as as VirtuosoMessageListTestingContext,
  Is as useCurrentlyRenderedData,
  ms as useVirtuosoLocation,
  ks as useVirtuosoMethods,
};
