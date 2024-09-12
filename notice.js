import { resize as l, position as c, observer as a } from "@soei/util/position";
import { withDirectives as m, openBlock as d, createElementBlock as u, normalizeClass as f, normalizeStyle as h, createElementVNode as p, renderSlot as v, vShow as _ } from "vue";
const b = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [n, s] of t)
    o[n] = s;
  return o;
}, y = {
  name: "Notice",
  props: {
    visiable: {
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
      mark: "emx-leave"
    };
  },
  mounted() {
    this.room = this.$refs.refNotice;
  },
  methods: {
    draw: l,
    reDraw(e) {
      this.target = e, c(this);
    },
    enter() {
      clearTimeout(this.showmark);
    },
    leave(e) {
      clearTimeout(this.showmark), this.showmark = setTimeout(() => {
        this.$emit("update:visiable", !1);
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
      e && (clearTimeout(this.showmark), this.appendEx(e), a.observe(e), this.reDraw(e)), t && a.unobserve(t);
    }
  }
}, w = { class: "notice-content" };
function k(e, t, o, n, s, i) {
  return m((d(), u("div", {
    ref: "refNotice",
    class: f(["notice", { "ex-animating": o.animate }]),
    style: h(s.css),
    onMouseleave: t[0] || (t[0] = (r) => i.leave(100)),
    onMouseenter: t[1] || (t[1] = (...r) => i.enter && i.enter(...r))
  }, [
    p("div", w, [
      v(e.$slots, "default", {}, void 0, !0)
    ])
  ], 38)), [
    [_, o.visiable]
  ]);
}
const x = /* @__PURE__ */ b(y, [["render", k], ["__scopeId", "data-v-0712d224"]]), N = [x], S = {
  install(e) {
    N.forEach((t) => {
      e.component("s-" + t.name.toLowerCase(), t);
    });
  }
};
export {
  x as Notice,
  S as default
};
