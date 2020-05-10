<template>
  <div class="app-header-root fulful">
    <h1 class="text-border">FULFUL-NEKO-CHAN</h1>
    <div class="subtitle text-border">ふるふるうごく ゆるGIF メーカー</div>
    <span class="ver">ver: 2020.5.10.2</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {},
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import url(../assets/colors.scss);
.app-header-root {
  position: relative;
  height: 100%;
  background-color: var(--theme-fill-color);
  margin: 4px;
  width: calc(100% - 12px);
  padding: 10px;
  background-image: linear-gradient(90deg,
    transparent 50%, rgb(213, 241, 229) 50%
  );
  background-size: 40px;
  h1 {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 6px;
    color: var(--theme-text-color);
  }
  .subtitle {
    color: var(--theme-text-color);
  }
  .text-border {
    text-shadow: #fff 2px 2px 1px, #fff -2px -2px 1px;
  }
  .ver {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 10px;
  }
}
</style>
