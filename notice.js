import { picker as l } from "@soei/util";
import { resize as c, position as u, observer as a } from "@soei/util/position";
import { withDirectives as m, openBlock as d, createElementBlock as f, normalizeClass as h, normalizeStyle as v, withKeys as p, createElementVNode as y, renderSlot as k, vShow as b } from "vue";
const _ = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [r, o] of t)
    s[r] = o;
  return s;
}, w = {
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
    filter: {
      type: Function,
      default: (e) => e
    }
  },
  data() {
    return {
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
    draw: c,
    reDraw(e) {
      this.target = e, u(this);
    },
    enter() {
      clearTimeout(this.showmark);
    },
    leave(e) {
      clearTimeout(this.showmark), this.showmark = setTimeout(() => {
        this.$emit("update:visible", !1);
      }, +e ? e : this.lazy);
    },
    appendEx(e) {
      e.hasAttribute(this.mark) || (e.setAttribute(this.mark, ""), e.addEventListener("mouseleave", () => {
        this.$emit("update:bind", null), this.leave();
      }));
    }
  },
  watch: {
    bind(e, t) {
      e && (clearTimeout(this.showmark), this.appendEx(e), a.observe(e), this.$nextTick(() => {
        this.reDraw(e);
      })), t && a.unobserve(t);
    }
  }
}, x = { class: "notice-content" };
function E(e, t, s, r, o, i) {
  return m((d(), f("div", {
    ref: "refNotice",
    class: h(["notice", { "ex-animating": s.animate }]),
    style: v(s.filter(o.css)),
    onMouseleave: t[0] || (t[0] = (n) => i.leave(300)),
    onMouseenter: t[1] || (t[1] = (...n) => i.enter && i.enter(...n)),
    onKeyup: t[2] || (t[2] = p((n) => i.leave(10), ["esc"]))
  }, [
    y("div", x, [
      k(e.$slots, "default", {}, void 0, !0)
    ])
  ], 38)), [
    [b, s.visible]
  ]);
}
const N = /* @__PURE__ */ _(w, [["render", E], ["__scopeId", "data-v-74b7c05f"]]), S = [N], M = {
  install(e) {
    S.forEach((t) => {
      e.component("S" + t.name, t);
    });
  }
};
export {
  N as Notice,
  M as default
};
