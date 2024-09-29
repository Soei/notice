"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const c=require("@soei/util"),a=require("@soei/util/position"),s=require("vue");const d=(e,t)=>{const i=e.__vccOpts||e;for(const[o,r]of t)i[o]=r;return i},h={name:"Notice",props:{visible:{type:Boolean,default:!1},lazy:{type:[Number,String],default:1e3},start:{type:[Number,String],default:800},position:{type:String,default:"bottom"},bind:{type:Object},animate:{type:Boolean,default:!0},filter:{type:Function,default:e=>e}},data(){return{show:!1,target:null,room:this.$refs.refNotice,css:{left:0,top:0},mark:"emx-leave",M:{Escape:!0,27:!0}}},mounted(){this.room=this.$refs.refNotice,this.esc(!0)},unmounted(){this.esc(!1)},methods:{esc(e){try{document.documentElement[e?"addEventListener":"removeEventListener"]("keyup",this.escfx)}catch{}},escfx(e){this.M[c.picker(e,"key|code|keyCode=>k").k]&&this.leave(10)},draw:a.resize,reDraw(e){setTimeout(()=>{this.target=e;let t=this.room.style,i=this.room.offsetHeight,o=t.display;i||(t.display="block"),a.position(this),i||(t.display=o)},+this.start)},enter(){clearTimeout(this.showmark)},leave(e){clearTimeout(this.showmark),this.showmark=setTimeout(()=>{this.$emit("update:visible",!1)},+e?e:this.lazy)},appendEx(e){e.hasAttribute(this.mark)||(e.setAttribute(this.mark,""),e.addEventListener("mouseleave",()=>{this.$emit("update:bind",null),this.leave()}))}},watch:{visible(e){setTimeout(()=>{this.show=e},+this.start)},bind(e,t){e&&(clearTimeout(this.showmark),this.appendEx(e),a.observer.observe(e),this.$nextTick(()=>{this.reDraw(e)})),t&&a.observer.unobserve(t)}}},m={class:"notice-content"};function f(e,t,i,o,r,n){return s.withDirectives((s.openBlock(),s.createElementBlock("div",{ref:"refNotice",class:s.normalizeClass(["notice",{"ex-animating":i.animate}]),style:s.normalizeStyle(i.filter(r.css)),onMouseleave:t[0]||(t[0]=l=>n.leave(300)),onMouseenter:t[1]||(t[1]=(...l)=>n.enter&&n.enter(...l)),onKeyup:t[2]||(t[2]=s.withKeys(l=>n.leave(10),["esc"]))},[s.createElementVNode("div",m,[s.renderSlot(e.$slots,"default",{},void 0,!0)])],38)),[[s.vShow,r.show]])}const u=d(h,[["render",f],["__scopeId","data-v-7f5ec7f9"]]),v=[u],p={install(e){v.forEach(t=>{e.component("S"+t.name,t)})}};exports.Notice=u;exports.default=p;
