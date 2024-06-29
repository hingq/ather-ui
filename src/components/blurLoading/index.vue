<script setup>
import { onMounted } from 'vue'
import { run } from '.'

defineOptions({
  name: 'blurLoading'
})
onMounted(() => {
  run()
})
</script>

<template>
  <div class="body">
    <div class="bg">
      <section
        style="
          background-image: url('https://images.unsplash.com/photo-1576161787924-01bb08dad4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2104&q=80');
        "
      ></section>
      <!-- <slot name="background">
            
            </slot> -->
    </div>

    <div class="loading-text">0%</div>
  </div>
</template>

<style scoped src="./style.css"></style>
