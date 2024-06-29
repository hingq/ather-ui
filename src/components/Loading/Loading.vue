<script setup>
import { onMounted } from 'vue'
const prop = defineProps({
  size: {
    tyepe: Number
  }
})
onMounted(() => {
  if (prop.size) {
    const el = document.querySelector('.loading')
    if (el) {
      el.style.setProperty('--radius', `${prop.size}px`)
    }
  } else {
    const con = document.querySelector('.container')
    if (con) {
      con.style.height = '100vh'
      con.style.width = '100vw'
    }
  }
})
</script>
<template>
  <div class="container">
    <span class="loading"></span>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.loading {
  --radius: 50px;
  display: inline-block;
  width: var(--radius);
  height: var(--radius);
  border: 2px solid #893535;
  border-top-color: transparent;
  border-radius: 100%;
  /* display: none; */
  animation: circle infinite 1s cubic-bezier(0.53, 0.26, 0.47, 0.79);
}

@keyframes circle {
  /*  动画 */
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
