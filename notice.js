import { runer as u, picker as m } from "@soei/util";
import { resize as c, position as l, observer as a } from "@soei/util/position";
import { withDirectives as d, openBlock as v, createElementBlock as p, normalizeClass as y, normalizeStyle as h, withKeys as b, createElementVNode as f, renderSlot as k, vShow as w } from "vue";
const E = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [o, i] of t)
    s[o] = i;
  return s;
}, x = {
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
    this.esc(!0), u("hasAttribute", this.room = this.$refs.refNotice, "fly") && document.documentElement.appendChild(this.room);
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
      this.M[m(e, "key|code|keyCode=>k").k] && this.leave(10);
    },
    draw: c,
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
}, z = { class: "notice-content" };
function N(e, t, s, o, i, n) {
  return d((v(), p("div", {
    ref: "refNotice",
    class: y(["notice", { "ex-animating": i.has && s.animate }]),
    style: h(s.filter(i.css)),
    onMouseleave: t[0] || (t[0] = (r) => n.leave(s.lazy)),
    onMouseenter: t[1] || (t[1] = (...r) => n.enter && n.enter(...r)),
    onKeyup: t[2] || (t[2] = b((r) => n.leave(10), ["esc"]))
  }, [
    f("div", z, [
      k(e.$slots, "default", {}, void 0, !0)
    ]),
    f("div", {
      style: h({ top: "-" + i.css.top, left: "-" + i.css.left })
    }, null, 4)
  ], 38)), [
    [w, i.show]
  ]);
}
const S = /* @__PURE__ */ E(x, [["render", N], ["__scopeId", "data-v-0b592e48"]]), _ = [S], L = {
  install(e) {
    _.forEach((t) => {
      e.component("S" + t.name, t);
    });
  }
};
export {
  S as Notice,
  L as default
};
