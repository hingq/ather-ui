<script setup>
import { onMounted, ref } from 'vue'
// import hoverCard from './components/hoverCard/hoverCard.vue';
// import ProgressBar from './components/progress/index.vue'
// import Tab from './components/Tab/Tab.vue'
// import expandCard from '@/components/expandCard/index.vue'
import bgSilder from '@/components/bgSilder/index.vue'
// import blurLoad from '@/components/blurLoading/index.vue'
// import bgPlaceholder from '@/components/content-placeholder/index.vue'

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
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: content-box;
}
</style>
