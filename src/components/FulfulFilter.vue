<template>
  <!-- 手描き感のあるラフな表現を加えるフィルターの定義 -->
  <filter :id="filterId" :filterUnits="filterUnits" x="0" y="0" :width="areaW" :height="areaH">
    <!-- ノイズを生成する原始フィルター -->
    <feTurbulence type="turbulence" :baseFrequency="`${frequency} ${frequency}`" :numOctaves="octaves" :seed="noiseSeed" stitchTiles="stitch">
      <!-- ノイズのシードを変化させる -->
      <animate
        v-if="animated"
        attributeName="seed"
        from="1"
        to="100"
        dur="10s"
        repeatCount="indefinite"
      />
    </feTurbulence>
    <!-- ノイズを元に画像を歪める -->
    <feDisplacementMap in="SourceGraphic" :scale="scale"/>
  </filter>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    filterId: { type: String, required: true },
    animated: { type: Boolean, default: false },
    noiseSeed: { type: Number, default: 1 },
    frequency: { type: Number, default: 0.1 },
    octaves: { type: Number, default: 5 },
    scale: { type: Number, default: 10 },
    areaW: { type: String, default: '105%' },
    areaH: { type: String, default: '105%' },
    filterUnits: { type: String, default: 'objectBoundingBox' }
  },
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
</style>
