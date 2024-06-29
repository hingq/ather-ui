<script setup>
import { onMounted, defineOptions, onUnmounted } from 'vue'
defineOptions({
  name: 'bgSilder'
})
function removeBgToBody() {
  document.body.style.backgroundImage = ""
}
onMounted(() => {
  const body = document.body
  const slides = document.querySelectorAll('.slide')
  const leftBtn = document.getElementById('left')
  const rightBtn = document.getElementById('right')

  let activeSlide = 0

  rightBtn.addEventListener('click', () => {
    activeSlide++

    if (activeSlide > slides.length - 1) {
      activeSlide = 0
    }

    setBgToBody()
    setActiveSlide()
  })

  leftBtn.addEventListener('click', () => {
    activeSlide--

    if (activeSlide < 0) {
      activeSlide = slides.length - 1
    }

    setBgToBody()
    setActiveSlide()
  })

  setBgToBody()

  function setBgToBody() {
    body.style.backgroundImage = slides[activeSlide].style.backgroundImage
  }

  function setActiveSlide() {
    slides.forEach((slide) => slide.classList.remove('active'))

    slides[activeSlide].classList.add('active')
  }
})
onUnmounted(() => {
  removeBgToBody()
})
</script>

<template>
  <div class="body">
    <div class="slider-container">
      <div class="slide active" style="
          background-image: url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80');
        "></div>
      <div class="slide" style="
          background-image: url('https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80');
        "></div>

      <div class="slide" style="
          background-image: url('https://images.unsplash.com/photo-1495467033336-2effd8753d51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80');
        "></div>

      <div class="slide" style="
          background-image: url('https://images.unsplash.com/photo-1522735338363-cc7313be0ae0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80');
        "></div>

      <div class="slide" style="
          background-image: url('https://images.unsplash.com/photo-1559087867-ce4c91325525?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80');
        "></div>

      <button class="arrow left-arrow" id="left">
        <i class="fas fa-arrow-left"></i>
      </button>

      <button class="arrow right-arrow" id="right">
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<style scoped src="./style.css"></style>
