import { picker as l } from "@soei/util";
import { resize as u, position as m, observer as a } from "@soei/util/position";
import { withDirectives as c, openBlock as d, createElementBlock as f, normalizeClass as h, normalizeStyle as p, withKeys as v, createElementVNode as y, renderSlot as k, vShow as b } from "vue";
const w = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [i, o] of t)
    s[i] = o;
  return s;
}, E = {
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
      default: 800
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
    mouseleave: {
      type: [Number, String],
      default: 300
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
      }
    };
  },
  mounted() {
    this.room = this.$refs.refNotice, this.esc(!0);
  },
  unmounted() {
    this.esc(!1);
  },
  methods: {
    esc(e) {
      try {
        document.documentElement[e ? "addEventListener" : "removeEventListener"]("keyup", this.escfx);
      } catch {
      }
    },
    escfx(e) {
      this.M[l(e, "key|code|keyCode=>k").k] && this.leave(10);
    },
    draw: u,
    reDraw(e) {
      setTimeout(() => {
        this.target = e;
        let t = this.room.style, s = this.room.offsetHeight, i = t.display;
        s || (t.display = "block"), m(this), s || (t.display = i);
      }, +this.start);
    },
    enter() {
      clearTimeout(this.showmark);
    },
    leave(e) {
      e <= -1 || (clearTimeout(this.showmark), this.showmark = setTimeout(() => {
        this.$emit("update:visible", !1);
      }, +e ? e : this.lazy));
    },
    appendEx(e) {
      e.hasAttribute(this.mark) || (e.setAttribute(this.mark, ""), e.addEventListener("mouseleave", () => {
        this.mouseleave <= -1 || (this.$emit("update:bind", null), this.leave());
      }));
    }
  },
  watch: {
    visible(e) {
      setTimeout(() => {
        this.show = e;
      }, +this.start);
    },
    bind(e, t) {
      e && (clearTimeout(this.showmark), this.appendEx(e), this.resize && a.observe(e), this.$nextTick(() => {
        this.reDraw(e);
      })), t && a.unobserve(t);
    }
  }
}, x = { class: "notice-content" };
function N(e, t, s, i, o, r) {
  return c((d(), f("div", {
    ref: "refNotice",
    class: h(["notice", { "ex-animating": s.animate }]),
    style: p(s.filter(o.css)),
    onMouseleave: t[0] || (t[0] = (n) => r.leave(s.mouseleave)),
    onMouseenter: t[1] || (t[1] = (...n) => r.enter && r.enter(...n)),
    onKeyup: t[2] || (t[2] = v((n) => r.leave(10), ["esc"]))
  }, [
    y("div", x, [
      k(e.$slots, "default", {}, void 0, !0)
    ])
  ], 38)), [
    [b, o.show]
  ]);
}
const S = /* @__PURE__ */ w(E, [["render", N], ["__scopeId", "data-v-496437c1"]]), z = [S], B = {
  install(e) {
    z.forEach((t) => {
      e.component("S" + t.name, t);
    });
  }
};
export {
  S as Notice,
  B as default
};
