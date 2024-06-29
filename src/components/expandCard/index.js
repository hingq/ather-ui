import expandCard from './index.vue'

expandCard.install = (app) => {
  app.component('hExpandCard', expandCard)
}

export default expandCard
