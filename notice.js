import { resize as l, position as c, observer as a } from "@soei/util/position";
import { withDirectives as d, openBlock as m, createElementBlock as u, normalizeStyle as f, createElementVNode as v, renderSlot as h, vShow as p } from "vue";
const _ = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [i, s] of t)
    o[i] = s;
  return o;
}, b = {
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
    }
  },
  data() {
    return {
      target: null,
      room: this.$refs.refNotice,
      css: {
        left: 0,
        top: 0
      }
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
        this.$emit("update:visiable", !1), this.$emit("update:bind", null);
      }, +e ? e : this.lazy);
    }
  },
  watch: {
    bind(e, t) {
      e && (clearTimeout(this.showmark), e.addEventListener("mouseleave", this.leave), a.observe(e), this.reDraw(e)), t && (t.removeEventListener("mouseleave", this.leave), a.unobserve(t));
    }
  }
}, w = { class: "notice-content" };
function y(e, t, o, i, s, r) {
  return d((m(), u("div", {
    ref: "refNotice",
    class: "notice",
    style: f(s.css),
    onMouseleave: t[0] || (t[0] = (n) => r.leave(100)),
    onMouseenter: t[1] || (t[1] = (...n) => r.enter && r.enter(...n))
  }, [
    v("div", w, [
      h(e.$slots, "default", {}, void 0, !0)
    ])
  ], 36)), [
    [p, o.visiable]
  ]);
}
const N = /* @__PURE__ */ _(b, [["render", y], ["__scopeId", "data-v-8cbbc4cd"]]), k = [N], $ = {
  install(e) {
    k.forEach((t) => {
      e.component("s-" + t.name.toLowerCase(), t);
    });
  }
};
export {
  N as Notice,
  $ as default
};
