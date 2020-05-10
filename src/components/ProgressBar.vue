<template>
<div class="progress-bar-root fulful">
  <div class="box">
    <div class="bar" :style="{
      width: `${value * 100}%`
    }"></div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    value: { type: Number, default: 0 }
  },
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import url(../assets/colors.scss);
.progress-bar-root {
  position: relative;
  width: 100%;
  height: 28px;
  padding: 4px;
  .box {
    position: relative;
    height: 100%;
    border: 2px solid var(--theme-border-color);
    border-radius: 6px;
    padding: 2px;
    .bar {
      position: relative;
      height: 100%;
      border-radius: 3px;
      background-color: var(--theme-border-color);
      transform: width 0.2s;
    }
  }
}
</style>
