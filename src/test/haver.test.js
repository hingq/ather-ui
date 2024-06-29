import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import hoverCard from '@/components/hoverCard/hoverCard.vue'

describe('Loading.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(hoverCard, {
      attachTo: document.body // 让组件挂载到真实 DOM 中，便于事件触发测试
    })
  })

  it(' on mouseover', async () => {
    const liElement = wrapper.find('li')
    liElement.trigger('mouseover')
    await wrapper.vm.$nextTick()
    expect(liElement.classes()).toContain('in-right')
  })

  it(' on mouseout', async () => {
    const liElement = wrapper.find('li')
    liElement.trigger('mouseout')
    await wrapper.vm.$nextTick()
    expect(liElement.classes()).toContain('out-right')
  })

  // 清理挂载的元素
  afterEach(() => {
    wrapper.unmount()
  })
})
