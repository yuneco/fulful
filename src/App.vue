<template>
  <div id="app">
    <header><AppHeader /></header>
    <main>
      <svg class="invisible">
        <defs><FulfulFilter filterId="ui-default-filter" :frequency="0.001" :scale="5" :animated="!state.isMobile" /></defs>
      </svg>
      <router-view/>
    </main>
    <footer><AppFooter /></footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import FulfulFilter from '@/components/FulfulFilter.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default defineComponent({
  props: {},
  components: { FulfulFilter, AppHeader, AppFooter },
  setup () {
    const state = reactive({
      isMobile: !!navigator.userAgent.match(/iPhone|Android.+Mobile/)
    })
    return {
      state
    }
  }
})
</script>

<style lang="scss">
@import url(./assets/colors.scss);
* {
  box-sizing: border-box;
}
html, body {
  margin: 0;
  position: relative;
  width: 100%;
  height: 100%;
  font-family: "ヒラギノ丸ゴ Pro W4","ヒラギノ丸ゴ Pro","Hiragino Maru Gothic Pro","ヒラギノ角ゴ Pro W3","Hiragino Kaku Gothic Pro","HG丸ｺﾞｼｯｸM-PRO","HGMaruGothicMPRO",Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 20px;
  overflow: hidden;
}
#app {
  text-align: center;
  color: var(--theme-text-color);
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 1fr 50px;
  grid-template-areas: "head" "main" "foot";
  header {
    grid-area: head;
  }
  main {
    grid-area: main;
  }
  footer {
    grid-area: foot;
  }
}
.invisible {
  display: none;
}
.fulful {
  filter: url(#ui-default-filter);
}
.fulful-box {
  position: relative;
  &::before {
    position: absolute;
    z-index: -1;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    top: 10px;
    left: 10px;
    content: "";
    background-color: #fff;
    border: 2px solid var(--theme-border-color);
    filter: url(#ui-default-filter);
  }
}
button {
  font-family: "ヒラギノ丸ゴ Pro W4","ヒラギノ丸ゴ Pro","Hiragino Maru Gothic Pro","ヒラギノ角ゴ Pro W3","Hiragino Kaku Gothic Pro","HG丸ｺﾞｼｯｸM-PRO","HGMaruGothicMPRO",Arial, Helvetica, sans-serif;
  border: 3px solid var(--theme-border-color);
  font-weight: bold;
  font-size: 24px;
  background-color: #fff;
  border-radius: 7px;
  color: var(--theme-text-color);
  cursor: pointer;
  &:disabled {
    color: rgb(124, 120, 118);
    border-color: rgb(124, 120, 118);
    border-style: dashed;
  }
}

label {
  cursor: pointer;
}
input[type=file] {
  cursor: pointer;
}

input[type=range] {
  -webkit-appearance: none;
  margin: 0;
  position: relative;
  top: 8px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    width: 100%;
    height: 32px;
    background-color: var(--theme-border-color);
    border-radius: 16px;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 28px;
    width: 28px;
    border-radius: 20px;
    border: 2px solid var(--theme-border-color);
    background-color :var(--theme-fill-color);
    margin-top: 2px;
  }
}
</style>
