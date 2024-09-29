![安装](https://img.shields.io/badge/安装-npm_i_@soei/notice-ffc107?style=flat) [![Latest Version on NPM](https://img.shields.io/badge/✔-线上实例-ae8aff?style=flat)](https://alwbg.github.io)

# 提示框 [![Latest Version on NPM](https://img.shields.io/npm/v/@soei/notice?label=npm&style=flat-square)](https://npmjs.com/package/@soei/notice) ![Software License](https://img.shields.io/badge/license-ISC-brightgreen?label=&style=flat-square) [![npm](https://img.shields.io/npm/dw/@soei/notice?label=Downloads&style=flat-square)](https://www.npmjs.com/package/@soei/notice) ![npm bundle size](https://img.shields.io/bundlephobia/min/%40soei%2Fnotice?label=Size&color=&style=flat-square)

![依赖](https://img.shields.io/badge/依赖-npm_i_@soei/util-ffc107?style=flat-square)[![Latest Version on NPM](https://img.shields.io/npm/v/@soei/util?label=&style=flat-square)](https://npmjs.com/package/@soei/util)

```html
<template>
  <s-notice ...></s-notice>
</template>
<style scoped>
  /* vite vue3 scoped */
  :deep(.notice) {
    /* 边宽线宽 */
    --border: 3px;
    /* 最大宽度 */
    --notice-width: 200px;
    /* 最大高度 */
    --notice-height: 200px;
    /* 边框颜色 */
    --notice-line-color: #c1c1c1;
    /* 背景颜色 */
    --notice-bg-color: #251e1e;
    /* 文字颜色 */
    --notice-color: #f3f3f3;
    /* 圆角 */
    --notice-border-radius: 30px;
    /* 三角位置, 仅限三角在上下时, 如果配置了,相对位置固定*/
    --notice-position-left: 20px;
  }
</style>
```

## 更新日志

### `0.0.7`

- #### `start` 延迟显示

```html
<s-notice :start="300"></s-notice>
```

`Vue3` 引入方式

```html
<script>
  import { Notice } from "@soei/notice";
</script>
<!-- 非 <style scoped>  scoped-->
<style>
  @import "@soei/notice/style.css";
</style>
```

`或`

```javascript
// main.js
import "@soei/notice/style.css";
import notice from "@soei/notice";
Vue.use(notice);
// use.vue
<s-notice ...></s-notice>
```

## `安装`

```
npm i @soei/notice

```

## `引用`

```javascript
import { Notice } from "@soei/notice";
```

## `使用`

```html
<Notice> ... </Notice>
```

```html
<Notice [attrs]></Notice>
```

### _`bind`_ 目标对象

### _`visible`_ 是否显示

### _`lazy`_ 延迟隐藏

```html
<div @scroll="scroll">
  <!-- :bind="ref | DOMElement"; -->
  <span ref="notice"></span>
</div>
<!-- VUE3 -->
<Notice v-model:bind="notice" v-model:visible="visible" :lazy="3000">
  提示内容~
</Notice>
...
<script setup>
  let notice = ref(null);
  let visible = ref(false);
  let refNotice = ref(null);

  /* 所在容器重新绘制位置 */
  let scroll = () => {
    refNotice.value?.draw();
  };
</script>

<!-- VUE2 -->
<Notice :bind.sync="notice" :visible.sync="visible" :lazy="3000">
  提示内容~
</Notice>
...
<script>
  //...
    data() {
        return {
            bind: this.$refs.notice,
            visible: false,
        }
    }
  // ...
</script>
```
