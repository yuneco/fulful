<template>
  <div class="slider-bar-root">
    <label><span class="caption">{{ caption }}</span><input type="range" ref="inputRef" class="fulful" :min="min" :max="max" :value="value" @input="change" @change="change" /></label>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
export default defineComponent({
  props: {
    caption: { type: String, default: 'label' },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    value: { type: Number, default: 50 }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  setup (props, ctx) {
    const inputRef = ref<HTMLInputElement>()
    const change = () => {
      ctx.emit('change', Number(inputRef.value?.value ?? 0))
    }
    return {
      inputRef,
      change
    }
  }
})
</script>

<style lang="scss" scoped>
.slider-bar-root {
  margin-bottom: 16px;
  .caption {
    display: inline-block;
    width: 45%;
    text-align: right;
    padding-right: 16px;
    font-size: 20px;
  }
}
</style>
