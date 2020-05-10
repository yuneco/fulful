<template>
  <div class="app-footer-root fulful">
    <a href="https://pf.nekobooks.com/" target="_blank">nekobooks.com</a> |
    <a href="https://twitter.com/yuneco" target="_blank">@yuneco</a>
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
$text-color: rgb(228, 223, 215);
.app-footer-root {
  position: relative;
  background-color: var(--theme-border-color);
  margin: 4px;
  width: calc(100% - 12px);
  height: calc(100% - 12px);
  padding: 5px;
  color: $text-color;
  a {
    color: $text-color;
  }
}
</style>
