<template>
  <div class="filter-stage-root">
    <FulfulFilter filterId="mainStageFilter" />
    <DragBox class="main-stage" v-model="state.imageOffset" @click="selectImage">
      <svg viewBox="0 0 500 500" ref="svgRef">
        <defs>
          <FulfulFilter
            filterId="main-filter"
            :noiseSeed="filterState.seed"
            :animated="false"
            :scale="filterState.noiseScale"
            :frequency="filterState.noiseFrequency / 1000"
            filterUnits="userSpaceOnUse"
            areaW="500px"
            areaH="500px"
          />
        </defs>
        <rect v-if="state.imageDataUrl" x=0 y=0 width=100% height=100% fill=#fff />
        <g :filter="filterState.visible ? 'url(#main-filter)' : 'none'">
          <image
            v-if="state.imageDataUrl"
            :href="state.imageDataUrl"
            :width="imageStyle.width"
            :height="imageStyle.height"
            :style="imageStyle"
            x=0
            y=0
          />
        </g>
      </svg>
      <div v-if="!state.imageDataUrl" class="no-img">Select a Image<br />画像を選択してください
        <div class="info">
          🐱📱iPhoneをお使いの場合は、画像選択時に<br />「イメージサイズを選択」→「小」<br />を指定するとスムーズに動きます
        </div>
        <div class="info">
          🐱✨色数の少ないイラストやSVG画像だと<br />きれいなGIFになります
        </div>
      </div>
    </DragBox>
    <div class="conts">
      <img ref="imageRef" v-if="state.imageDataUrl" class="ref-image" :src="state.imageDataUrl" @load="fitImage" />
      <div class="btns" >
        <label class="file-selector fulful">Select Image File
          <input type="file" @change="fileSelected" ref="fileSelectorRef" />
        </label>
        <div class="save-btn-box">
          <button class="fulful" @click="saveImage" :disabled="!state.imageDataUrl">Save</button>
        </div>
      </div>
      <sliderBar caption="image size" :min="state.imageMinScale" :max="state.imageMaxScale" v-model="state.imageScale" />
      <sliderBar caption="noise scale" :min="1" :max="20" v-model="filterState.noiseScale" />
      <sliderBar caption="noise frequency" :min="1" :max="100" v-model="filterState.noiseFrequency" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, onMounted, watch, onUnmounted } from '@vue/composition-api'
import DragBox from '@/components/DragBox.vue'
import FulfulFilter from '@/components/FulfulFilter.vue'
import SliderBar from '@/components/SliderBar.vue'
import { Point } from '../core/Point'
import { Svg2Gif } from '../core/Svg2Gif'
import { blob2uri } from '../core/Blob2Uri'
import wait from '../core/wait'
const STAGESIZE = 500

export default defineComponent({
  props: {
  },
  components: {
    DragBox,
    FulfulFilter,
    SliderBar
  },
  setup (props, ctx) {
    const state = reactive({
      imageDataUrl: '',
      imageSize: { w: 0, h: 0 },
      imageMinScale: 10,
      imageMaxScale: 150,
      imageScale: 0,
      imageOffset: new Point()
    })

    const filterState = reactive({
      seed: 1,
      animated: true,
      noiseScale: 6,
      noiseFrequency: 10,
      stopAutoAnimateUntil: 0,
      animationTimer: 0,
      visible: true,
      visibleResumeTimer: 0
    })

    const svgRef = ref<HTMLElement>()
    const imageRef = ref<HTMLImageElement>()
    const fileSelectorRef = ref<HTMLInputElement>()
    const fileSelected = async () => {
      const file = fileSelectorRef.value?.files?.[0]
      if (!file) { return }
      state.imageDataUrl = await blob2uri(file)
    }

    const fitImage = () => {
      const elm = imageRef.value
      if (!elm) { return }
      state.imageSize.w = elm.naturalWidth
      state.imageSize.h = elm.naturalHeight
      const scale = Math.max(STAGESIZE / state.imageSize.w, STAGESIZE / state.imageSize.h)
      state.imageScale = scale * 100
      state.imageMinScale = scale * 100 / 2
      state.imageMaxScale = scale * 100 * 2
    }

    const imageStyle = computed(() => {
      const iw = state.imageScale / 100 * state.imageSize.w
      const ih = state.imageScale / 100 * state.imageSize.h
      const center = new Point(
        (STAGESIZE - iw) / 2,
        (STAGESIZE - ih) / 2
      )
      const offset = center.add(state.imageOffset)
      return {
        width: iw + 'px',
        height: ih + 'px',
        transform: `translate(${offset.x}px, ${offset.y}px)`
      }
    })

    const selectImage = () => {
      const sel = fileSelectorRef.value
      if (!sel || state.imageDataUrl) {
        return
      }
      sel.click()
    }

    const saveImage = async () => {
      const elm = svgRef.value
      if (!elm) { return }
      ctx.emit('renderStart')
      filterState.animated = false
      const gif = new Svg2Gif(elm, 500, 500)
      const FRAME_COUNT = 10
      for (let i = 0; i < FRAME_COUNT; i++) {
        filterState.seed = i
        await wait(100)
        await gif.add()
      }
      const blob = await gif.render((progress) => {
        ctx.emit('renderProgress', progress)
      })
      filterState.animated = true
      ctx.emit('renderFinished', blob)
    }

    // UIからリアルタイムに変更されるパラメータは変更している間アニメーションを一時的に止める
    watch(
      () => [
        filterState.noiseScale,
        filterState.noiseFrequency
      ],
      () => {
        const SUSPEND_TIME = 800 // 800ms
        filterState.stopAutoAnimateUntil = Date.now() + SUSPEND_TIME
      }
    )

    // フィルタがかかっている要素の移動・リサイズはiOSだと重いので、これらの処理中は一時的にフィルタを解除する
    watch(
      () => [
        state.imageScale,
        state.imageOffset
      ],
      () => {
        clearTimeout(filterState.visibleResumeTimer)
        const SUSPEND_TIME = 800 // 800ms
        filterState.visible = false
        setTimeout(() => {
          filterState.visible = true
        }, SUSPEND_TIME)
      }
    )

    onMounted(() => {
      filterState.animationTimer = setInterval(() => {
        if (!filterState.animated) { return }
        if (Date.now() < filterState.stopAutoAnimateUntil) { return }
        filterState.seed += 1
        if (filterState.seed > 10) {
          filterState.seed = 1
        }
      }, 100)
    })

    onUnmounted(() => {
      clearInterval(filterState.animationTimer)
    })

    return {
      state,
      filterState,
      svgRef,
      imageRef,
      fileSelectorRef,
      fileSelected,
      fitImage,
      imageStyle,
      selectImage,
      saveImage
    }
  }
})
</script>

<style lang="scss" scoped>
@import url(../assets/colors.scss);
.filter-stage-root {
  svg {
    position: absolute;
    top: 0;
    left: 0;
  }
  .ref-image {
    position: absolute;
    visibility: hidden;
  }
  .no-img {
    position: absolute;
    top: 130px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 30px;
    opacity: .5;
    .info {
      padding-top: 15px;
      font-size: 16px;
    }
  }
  .conts {
    padding: 20px;
    .file-selector {
      display: block;
      background-color: var(--theme-border-color);
      padding: 10px;
      border-radius: 6px;
      color: #fff;
      font-weight: bold;
      input {
        display: none;
      }
    }
    .btns {
      display: flex;
      position: relative;
      height: 90px;
      padding: 20px;
      display: flex;
      text-align: center;
      > * {
        position: relative;
        height: 100%;
        width: 50%;
      }
      button {
        display: inline-block;
        position: relative;
        height: 100%;
        width: 85%;
      }
    }
  }
}
.main-stage {
  position: relative;
  width: 500px;
  height: 500px;
  // overflow: hidden;
  margin: auto;
  // border: 2px solid var(--theme-border-color);
  &::before {
    position: absolute;
    content: "";
    z-index: -1;
    width: calc(100% + 5px);
    height: calc(100% + 5px);
    top: -6px;
    left: -6px;
    background-color: #fff;
    border: 4px solid var(--theme-border-color);
    filter: url(#ui-default-filter);
  }
}
</style>
