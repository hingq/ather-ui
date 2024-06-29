import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import loading from '@/lib/loading'
import { ref } from 'vue'

describe('loadingDirective', () => {
  let wrapper
  const flag = ref(true)

  const TestComponent = {
    template: `<div v-loading="flag"></div>`,
    directives: {
      loading: loading
    },
    setup() {
      return { flag }
    }
  }

  beforeEach(() => {
    wrapper = mount(TestComponent, {
      attachTo: document.body
      // 组件挂载到真实的dom
    })
  })

  it('should add styles and render loading component on mount', async () => {
    await wrapper.vm.$nextTick()

    const el = wrapper.element
    const style = window.getComputedStyle(el)
    expect(style.position).toBe('relative')

    const loadingComponent = el.querySelector('span.loading')
    expect(loadingComponent).not.toBeNull()
    expect(window.getComputedStyle(loadingComponent).display).toBe('block')
  })

  it('should hide loading component when binding value is false', async () => {
    flag.value = false
    await wrapper.vm.$nextTick()

    const loadingComponent = wrapper.element.querySelector('span.loading')
    expect(window.getComputedStyle(loadingComponent).display).toBe('none')
  })

  afterEach(() => {
    wrapper.unmount()
  })
})
