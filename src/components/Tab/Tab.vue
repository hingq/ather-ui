<script setup>
import { onMounted, ref } from 'vue'
defineOptions({
    name:'Tab'
})
const con = ref()
const toogle = () => {
  con.value.classList.toggle('cross')
}
const props = defineProps({
  width: {
    type: Number,
    default: 100
  },
  height: {
    type: Number,
    default: 70
  }
})
onMounted(() => {
  if (props.width) {
    con.value.style.setProperty('--h-width', `${props.width}px`)
  }
  if (props.height) {
    con.value.style.setProperty('--h-height', `${props.height}px`)
  }
})
</script>

<template>
  <div ref="con" @click="toogle">
    <svg id="icon" viewBox="0 0 800 600">
      <path
        d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200"
        id="top"
      ></path>
      <path d="M300,320 L540,320" id="middle"></path>
      <path
        d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
        id="bottom"
        transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
      ></path>
    </svg>
  </div>
</template>

<style scoped src="./style.css"></style>
