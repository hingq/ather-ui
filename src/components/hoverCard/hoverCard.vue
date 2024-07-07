<script setup>
import { onMounted } from 'vue'
defineOptions({
  name: 'hoverCard'
})
const getDirection = function (ev, obj) {
  let w = obj.offsetWidth,
    h = obj.offsetHeight,
    x = ev.pageX - obj.offsetLeft - (w / 2) * (w > h ? h / w : 1),
    y = ev.pageY - obj.offsetTop - (h / 2) * (h > w ? w / h : 1),
    d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4
  return d
}

const addClass = function (ev, obj, state) {
  var direction = getDirection(ev, obj),
    class_suffix = ''

  obj.className = ''

  switch (direction) {
    case 0:
      class_suffix = '-top'
      break
    case 1:
      class_suffix = '-right'
      break
    case 2:
      class_suffix = '-bottom'
      break
    case 3:
      class_suffix = '-left'
      break
  }

  obj.classList.add(state + class_suffix)
}
onMounted(() => {
  const nodes = document.querySelectorAll('li')
  const _nodes = [].slice.call(nodes, 0)
  // 伪数组转数组
  _nodes.forEach(function (el) {
    el.addEventListener(
      'mouseover',
      function (ev) {
        addClass(ev, this, 'in')
      },
      false
    )

    el.addEventListener(
      'mouseout',
      function (ev) {
        addClass(ev, this, 'out')
      },
      false
    )
  })
})
</script>

<template>
  <div class="container">
    <ul>
      <li>
        <a class="normal" href="#">
          <slot name="svg">
            <svg viewBox="0 0 80 76" x="0px" y="0px">
              <g>
                <path
                  d="M 68.9708 24.8623 L 60.4554 2.3018 C 59.9641 0.7017 58.1628 -0.2583 56.5252 0.3817 L 1.9822 20.2222 C 0.3822 20.7022 -0.4179 22.6222 0.2222 24.2223 L 8.8624 47.7797 L 8.8624 35.1484 C 8.8624 29.5024 13.3425 24.8623 18.8857 24.8623 L 32.9442 24.8623 L 50.63 12.862 L 60.7829 24.8623 L 68.9708 24.8623 L 68.9708 24.8623 ZM 77.098 32.0625 L 18.8857 32.0625 C 17.2512 32.0625 16.0625 33.4511 16.0625 35.1484 L 16.0625 72.8491 C 16.0625 74.5477 17.2512 75.9375 18.8857 75.9375 L 77.098 75.9375 C 78.742 75.9375 79.9376 74.5477 79.9376 72.8491 L 79.9376 35.1484 C 79.9376 33.4511 78.742 32.0625 77.098 32.0625 L 77.098 32.0625 ZM 73.0626 68.0625 L 23.9375 68.0625 L 23.9375 61.0852 L 31.4704 43.7232 L 42.7696 57.6777 L 53.4138 46.8062 L 67.1695 41.9375 L 73.0626 55.0815 L 73.0626 68.0625 L 73.0626 68.0625 Z"
                ></path>
              </g>
            </svg>
          </slot>
        </a>
        <div class="info">
          <slot name="info">
            <h3>in a rapidly deleloping society</h3>
            <p>what can i say</p>
          </slot>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped src="./style.css"></style>
