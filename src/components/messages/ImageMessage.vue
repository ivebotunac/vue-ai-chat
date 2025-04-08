<template>
  <img
    class="d-block mt-3"
    v-if="image"
    :src="image"
  />
</template>

<script setup>
import { fetchFile } from '@/services/localStorage'
const props = defineProps({
  fileName: String,
})

const image = ref()

onMounted(() => {
  fetchFile({ fileName: props.fileName }).then(img => (image.value = img))
})
</script>
