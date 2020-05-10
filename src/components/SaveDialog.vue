<template>
  <transition name="pop" appear>
    <div class="save-dialog-wrapper">
      <div class="save-dialog-root fulful-box" :class="{ progress: !dataUri }">
        <template v-if="!dataUri">
          <ProgressBar v-if="!dataUri || 1" :value="progress" />
          <div class="prog-msg">{{ progressMessage }}</div>
        </template>
        <div v-if="dataUri" class="download">
          <div class="dl-msg">Press image to download!<br />画像を長押しして保存できます</div>
          <div class="img-box">
            <img :src="dataUri" alt="result animation gif">
          </div>
          <div class="btns">
            <button class="fulful" @click="$emit('close')">Close</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import ProgressBar from '@/components/ProgressBar.vue'

export default defineComponent({
  props: {
    progress: { type: Number, default: 0 },
    dataUri: { type: String, default: '' }
  },
  components: { ProgressBar },
  setup (props) {
    const progressMessage = computed<string>(() => {
      if (!props.progress) {
        return 'Rendering image...'
      }
      if (props.progress < 1) {
        const percent = Math.round(props.progress * 100)
        return `Encoding animation gif : ${percent}%`
      }
      return 'Finished!'
    })
    return {
      progressMessage
    }
  }
})
</script>

<style lang="scss" scoped>
@import url(../assets/colors.scss);
.save-dialog-wrapper {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  backdrop-filter: blur(10px);
}
.save-dialog-root {
  position: relative;
  margin: auto;
  width: 80%;
  height: 650px;
  padding: 20px 10px 20px 20px;
  transition: height 0.3s;
  overflow: hidden;
  &.progress {
    height: 150px;
  }
  .prog-msg {
    text-align: center;
  }
  .download {
    position: relative;
    height: 100%;
    .dl-msg {
      padding-top: 20px;
    }
    .img-box {
      height: calc(100% - 140px);
      display: flex;
      align-items: center;
      img {
        display: inline-block;
        max-width: calc(100% - 20px);
        margin: auto;
      }
    }
    .btns {
      position: absolute;
      width: 100%;
      bottom: 15px;
    }
  }
}

.pop-enter-active {
  transition: all .5s ease;
  .save-dialog-root {
    animation: .5s 1 bounce;
  }
}
.pop-leave-active {
  transition: all .5s ease;
  .save-dialog-root {
    animation: .5s 1 reverse bounce;
  }
}
.pop-enter, .pop-leave-to {
  opacity: 0;
}

@keyframes bounce {
  0% {
    transform: scale(0.6);
  }
  75% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1.0);
  }
}
</style>
