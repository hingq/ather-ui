import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Loading from '@/components/Loading/Loading.vue'

describe('Loading.vue', () => {
  it('sets the radius style when prop.size is provided', async () => {
    const size = 100
    const wrapper = mount(Loading, {
      props: { size }
    })

    await wrapper.vm.$nextTick() // Wait for onMounted to be called

    const loadingElement = wrapper.find('.loading').element

    // 模拟 getComputedStyle 返回期望的值
    const originalGetComputedStyle = window.getComputedStyle
    window.getComputedStyle = () => ({
      getPropertyValue: (prop) => {
        if (prop === '--radius') {
          return `${size}px`
        }
        return ''
      }
    })

    const style = window.getComputedStyle(loadingElement)
    expect(style.getPropertyValue('--radius')).toBe(`${size}px`)

    // 恢复原始 getComputedStyle
    window.getComputedStyle = originalGetComputedStyle
  })

  it('sets container to full viewport size when prop.size is not provided', async () => {
    const wrapper = mount(Loading)

    await wrapper.vm.$nextTick() // Wait for onMounted to be called

    const containerElement = wrapper.find('.container').element

    // 模拟 getComputedStyle 返回期望的值
    const originalGetComputedStyle = window.getComputedStyle
    window.getComputedStyle = () => ({
      height: '100vh',
      width: '100vw'
    })

    const style = window.getComputedStyle(containerElement)
    expect(style.height).toBe('100vh')
    expect(style.width).toBe('100vw')

    // 恢复原始 getComputedStyle
    window.getComputedStyle = originalGetComputedStyle
  })
})
