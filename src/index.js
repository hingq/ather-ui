import { version } from '../package.json'
import { components } from './components/index.js'
import { directives } from './lib/index'
const install = (app) => {
  Object.keys(components).forEach((key) => {
    const component = components[key]
    if (component && component.install) {
      component.install(app)
    } else {
      console.log(component[key])
      console.error(`Component ${key} is missing an install method`)
    }
  })
  for (const directiveKey in directives) {
    const directive = directives[directiveKey]
    app.directive(directiveKey, directive)
  }
}

const he = {
  version,
  install
}

// export   install };
export * from './components/index'
export * from './lib/index'
export default he
