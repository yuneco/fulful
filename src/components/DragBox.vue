<template>
  <div class="dragbox-root"
  @mousedown="onmousedown"
  @touchstart="ontouchstart"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from '@vue/composition-api'
import { Point } from '@/core/Point'

export default defineComponent({
  props: {
    pos: { type: Object as PropType<Point> }
  },
  model: {
    prop: 'pos',
    event: 'move'
  },
  setup (props, ctx) {
    const state = reactive({
      startX: 0,
      startY: 0,
      startPos: new Point(0, 0)
    })
    const move = (x: number, y: number) => {
      ctx.emit('move', new Point(state.startPos.x + x - state.startX, state.startPos.y + y - state.startY))
    }
    const onmove = (ev: MouseEvent) => {
      ev.preventDefault()
      move(ev.screenX, ev.screenY)
    }
    const ontouchmove = (ev: TouchEvent) => {
      ev.preventDefault()
      move(ev.touches[0].screenX, ev.touches[0].screenY)
    }
    const cleanup = () => {
      document.removeEventListener('mousemove', onmove)
      document.removeEventListener('touchmove', ontouchmove)
    }
    const start = (x: number, y: number) => {
      state.startX = x
      state.startY = y
      state.startPos = props.pos?.clone() || new Point(0, 0)
      document.addEventListener('mousemove', onmove, { passive: false })
      document.addEventListener('touchmove', ontouchmove, { passive: false })
      document.addEventListener('touchend', cleanup, { once: true })
      document.addEventListener('mouseup', cleanup, { once: true })
    }
    const onmousedown = (ev: MouseEvent) => {
      start(ev.screenX, ev.screenY)
      ctx.emit('click')
    }
    const ontouchstart = (ev: TouchEvent) => {
      ev.preventDefault()
      start(ev.touches[0].screenX, ev.touches[0].screenY)
      ctx.emit('click')
    }

    return {
      onmousedown,
      ontouchstart
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
