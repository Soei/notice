import { picker as h } from "@soei/util";
import { resize as u, position as n, observer as a } from "@soei/util/position";
import { withDirectives as f, openBlock as m, createElementBlock as c, normalizeClass as d, normalizeStyle as v, withKeys as p, createElementVNode as y, renderSlot as b, vShow as k } from "vue";
const w = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [o, i] of t)
    s[o] = i;
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
      },
      has: !1
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
      this.M[h(e, "key|code|keyCode=>k").k] && this.leave(10);
    },
    draw: u,
    reDraw(e) {
      setTimeout(() => {
        let t = this.room.style, s = this.room.offsetHeight, o = t.display;
        e && e.offsetHeight ? (s || (t.display = "block"), n(this), s || (t.display = o)) : this.$visible(!1);
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
    },
    $visible(e) {
      setTimeout(() => {
        this.has = !/^0\w*$/.test(this.room.style.top), this.has || (this.target && n(this), this.has = !0), this.show = e;
      }, +this.start);
    }
  },
  watch: {
    visible(e) {
      this.$visible(e);
    },
    bind(e, t) {
      e && (this.target = e), this.$visible(e && e.offsetHeight), e && (clearTimeout(this.showmark), this.appendEx(e), this.resize && a.observe(e), this.$nextTick(() => {
        this.reDraw(e);
      })), t && a.unobserve(t);
    }
  }
}, x = { class: "notice-content" };
function N(e, t, s, o, i, r) {
  return f((m(), c("div", {
    ref: "refNotice",
    class: d(["notice", { "ex-animating": i.has && s.animate }]),
    style: v(s.filter(i.css)),
    onMouseleave: t[0] || (t[0] = (l) => r.leave(s.mouseleave)),
    onMouseenter: t[1] || (t[1] = (...l) => r.enter && r.enter(...l)),
    onKeyup: t[2] || (t[2] = p((l) => r.leave(10), ["esc"]))
  }, [
    y("div", x, [
      b(e.$slots, "default", {}, void 0, !0)
    ])
  ], 38)), [
    [k, i.show]
  ]);
}
const S = /* @__PURE__ */ w(E, [["render", N], ["__scopeId", "data-v-ff1b6c93"]]), z = [S], B = {
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
