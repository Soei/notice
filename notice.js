import { runer as m, picker as u } from "@soei/util";
import { resize as d, position as l, observer as a } from "@soei/util/position";
import { withDirectives as c, openBlock as p, createElementBlock as v, normalizeClass as y, normalizeStyle as h, withKeys as b, createElementVNode as f, renderSlot as k, vShow as w } from "vue";
const E = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [o, i] of t)
    s[o] = i;
  return s;
}, N = {
  name: "Notice",
  props: {
    visible: {
      type: Boolean,
      default: !1
    },
    /* 延迟消失 */
    lazy: {
      type: [Number, String],
      default: 1e3
    },
    start: {
      type: [Number, String],
      default: 80
    },
    position: {
      type: String,
      default: "bottom"
    },
    bind: {
      type: Object
    },
    animate: {
      type: Boolean,
      default: !0
    },
    resize: {
      type: Boolean,
      default: !0
    },
    filter: {
      type: Function,
      default: (e) => e
    }
  },
  data() {
    return {
      show: !1,
      target: null,
      room: this.$refs.refNotice,
      css: {
        left: 0,
        top: 0
      },
      mark: "emx-leave",
      M: {
        Escape: !0,
        27: !0
      },
      has: !1
    };
  },
  mounted() {
    this.esc(!0), m("hasAttribute", this.room = this.$refs.refNotice, "fly") && document.documentElement.appendChild(this.room);
  },
  unmounted() {
    var e;
    this.esc(!1), (e = this.room) != null && e.parentNode && this.room.parentNode.removeChild(this.room);
  },
  methods: {
    esc(e) {
      try {
        document.documentElement[e ? "addEventListener" : "removeEventListener"]("keyup", this.escfx);
      } catch {
      }
    },
    escfx(e) {
      this.M[u(e, "key|code|keyCode=>k").k] && this.leave(10);
    },
    draw: d,
    reDraw(e) {
      setTimeout(() => {
        let t = this.room.style, s = this.room.offsetHeight, o = t.display;
        e && e.offsetHeight ? (s || (t.display = "block"), l(this), s || (t.display = o)) : this.$visible(!1);
      }, +this.start);
    },
    enter() {
      clearTimeout(this.showmark);
    },
    leave(e) {
      this.enter(), !(e <= -1) && (this.showmark = setTimeout(() => {
        this.$emit("update:visible", !1), this.$emit("update:bind", null);
      }, e));
    },
    listener(e) {
      e.hasAttribute(this.mark) || (e.setAttribute(this.mark, ""), e.addEventListener("mouseleave", () => {
        this.leave(this.lazy);
      }), e.addEventListener("mouseenter", () => {
        this.enter();
      }));
    },
    $visible(e) {
      setTimeout(() => {
        this.has = !/^0\w*$/.test(this.room.style.top), this.has || (this.target && l(this), this.has = !0), this.show = e;
      }, +this.start);
    }
  },
  watch: {
    visible(e) {
      this.$visible(e);
    },
    bind(e, t) {
      e && (this.target = e), this.$visible(e && e.offsetHeight), e && (this.enter(), this.listener(e), this.resize && a.observe(e), this.$nextTick(() => {
        this.reDraw(e);
      })), t && a.unobserve(t);
    }
  }
}, x = { class: "notice-content" };
function z(e, t, s, o, i, r) {
  return c((p(), v("div", {
    ref: "refNotice",
    class: y(["notice", { "ex-animating": i.has && s.animate }]),
    style: h(s.filter(i.css)),
    onMouseleave: t[0] || (t[0] = (n) => r.leave(s.lazy)),
    onMouseenter: t[1] || (t[1] = (...n) => r.enter && r.enter(...n)),
    onKeyup: t[2] || (t[2] = b((n) => r.leave(10), ["esc"]))
  }, [
    f("div", x, [
      k(e.$slots, "default", {}, void 0, !0)
    ]),
    f("div", {
      style: h({ top: "-" + i.css.top, left: "-" + i.css.left })
    }, null, 4)
  ], 38)), [
    [w, i.show]
  ]);
}
const S = /* @__PURE__ */ E(N, [["render", z], ["__scopeId", "data-v-94bde5b3"]]), _ = [S], C = {
  install(e) {
    _.forEach((t) => {
      e.component("S" + t.name, t);
    });
  }
};
export {
  S as Notice,
  C as default
};
