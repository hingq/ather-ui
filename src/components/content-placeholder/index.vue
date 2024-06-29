<script setup>
import { watch } from 'vue'
defineOptions({
  name: 'bg-placeholder'
})
const hide = () => {
  const animated_bgs = document.querySelectorAll('.animated-bg')
  const animated_bg_texts = document.querySelectorAll('.animated-bg-text')

  animated_bgs.forEach((bg) => bg.classList.remove('animated-bg'))
  animated_bg_texts.forEach((bg) => bg.classList.remove('animated-bg-text'))
}
const props = defineProps({
  hidden: {
    type: Boolean,
    default: false
  }
})
watch(
  () => props.hidden,
  (newVal, oldVal) => {
    console.log('Hidden changed from', oldVal, 'to', newVal)
    if (newVal) {
      hide()
    }
  }
)
</script>

<template>
  <div class="body">
    <div class="card">
      <div class="card-header animated-bg" id="header">&nbsp;</div>

      <div class="card-content">
        <h3 class="card-title animated-bg animated-bg-text" id="title">&nbsp;</h3>
        <p class="card-excerpt" id="excerpt">
          &nbsp;
          <span class="animated-bg animated-bg-text">&nbsp;</span>
          <span class="animated-bg animated-bg-text">&nbsp;</span>
          <span class="animated-bg animated-bg-text">&nbsp;</span>
        </p>
        <div class="author">
          <div class="profile-img animated-bg" id="profile_img">&nbsp;</div>
          <div class="author-info">
            <strong class="animated-bg animated-bg-text" id="name">&nbsp;</strong>
            <small class="animated-bg animated-bg-text" id="date">&nbsp;</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./style.css"></style>
