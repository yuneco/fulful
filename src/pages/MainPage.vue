<template>
  <div class="main-page-root page">
    <FilterStage
      class="stage"
      @renderStart="renderState.isActive = true"
      @renderProgress="onProgress"
      @renderFinished="onFinished"
    />
    <SaveDialog
      v-if="renderState.isActive"
      :progress="renderState.progress"
      :dataUri="renderState.resultDataUri"
      @close="closeSaveDialog"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import FilterStage from '@/components/FilterStage.vue'
import FulfulFilter from '@/components/FulfulFilter.vue'
import SaveDialog from '@/components/SaveDialog.vue'
import { blob2uri } from '../core/Blob2Uri'

export default defineComponent({
  props: {},
  components: { FilterStage, FulfulFilter, SaveDialog },
  setup () {
    const renderState = reactive({
      isActive: false,
      progress: 0,
      resultDataUri: ''
    })
    const onProgress = (prog: number) => {
      renderState.progress = prog || 0
    }
    const onFinished = async (blob: Blob) => {
      renderState.resultDataUri = await blob2uri(blob)
    }
    const closeSaveDialog = () => {
      renderState.isActive = false
      renderState.progress = 0
      renderState.resultDataUri = ''
    }
    return {
      renderState,
      onProgress,
      onFinished,
      closeSaveDialog
    }
  }
})
</script>

<style lang="scss" scoped>
.page {
  padding: 20px 10px;
}
</style>
