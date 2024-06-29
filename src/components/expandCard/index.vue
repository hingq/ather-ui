<script setup>
import { defineOptions, onMounted } from 'vue'
import { throttle } from '@/util/throttle'
defineOptions({
  name: 'expandCard'
})

onMounted(() => {
  const panels = document.querySelectorAll('.panel')
  const handleClick = (panel) => {
    removeActiveClasses()
    panel.classList.add('active')
  }
  const throttledHandleClick = throttle(handleClick, 100) // 100毫秒的节流时间间隔
  panels.forEach((panel) => {
    panel.addEventListener('click', () => {
      throttledHandleClick(panel)
    })
  })

  function removeActiveClasses() {
    panels.forEach((panel) => {
      panel.classList.remove('active')
    })
  }
})
</script>

<template>
  <div class="body">
    <div class="container">
      <div
        class="panel active"
        style="
          background-image: url('https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
        "
      >
        <h3>Explore The World</h3>
      </div>
      <div
        class="panel"
        style="
          background-image: url('https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
        "
      >
        <h3>Wild Forest</h3>
      </div>
      <div
        class="panel"
        style="
          background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80');
        "
      >
        <h3>Sunny Beach</h3>
      </div>
      <div
        class="panel"
        style="
          background-image: url('https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80');
        "
      >
        <h3>City on Winter</h3>
      </div>
      <div
        class="panel"
        style="
          background-image: url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
        "
      >
        <h3>Mountains - Clouds</h3>
      </div>
    </div>
  </div>
</template>

<style scoped src="./style.css"></style>
