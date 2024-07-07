<script setup>
import { onMounted, ref } from 'vue'
// import hoverCard from './components/hoverCard/hoverCard.vue';
// import ProgressBar from './components/progress/index.vue'
// import Tab from './components/Tab/Tab.vue'
// import expandCard from '@/components/expandCard/index.vue'
// import bgSilder from '@/components/bgSilder/index.vue'
// import blurLoad from '@/components/blurLoading/index.vue'
// import bgPlaceholder from '@/components/content-placeholder/index.vue'
import Upload from '@/components/upload/index.vue'
const flag = ref(false)
onMounted(() => {
  setTimeout(() => {
    flag.value = true
  }, 1000)
})
</script>

<template>
  <!-- <div>
        <Tab ></Tab>
    </div> -->
  <!-- <hoverCard>
            <template #info>
                o i o i
            </template>
</hoverCard> -->
  <!-- <Loading ></Loading> -->
  <!-- asdasdasdas -->
  <!-- <button v-loading="flag" style="height: 50px; width: 100px;display: block;">asdsd</button> -->
  <!-- <Progress-Bar></Progress-Bar> -->
  <!-- <expandCard></expandCard> -->
  <!-- <bgSilder></bgSilder> -->

  <!-- <bgPlaceholder :hidden="flag"></bgPlaceholder> -->
  <Upload></Upload>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: content-box;
}

:root {
  --hue: 223;
  --bg: hsl(var(--hue), 10%, 85%);
  --fg: hsl(var(--hue), 10%, 5%);
  --trans-dur: 0.3s;
  font-size: calc(16px + (20 - 16) * (100vw - 320px) / (2560 - 320));
}
</style>
