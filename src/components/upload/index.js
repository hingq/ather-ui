import Upload from './index.vue'

Upload.install = (app) => {
  app.component('hUpload', Upload)
}
export default Upload
