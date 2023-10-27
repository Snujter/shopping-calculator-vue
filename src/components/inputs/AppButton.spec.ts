import { describe, it, expect } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import AppButton from '@/components/inputs/AppButton.vue'

describe('AppButton.vue', () => {
  it('renders button as disabled when prop is true', () => {
    const wrapper = shallowMount(AppButton, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.find('[data-test="button"]').element.hasAttribute('disabled')).toBe(true)
  })

  it('renders button as not disabled when prop is false', () => {
    const wrapper = shallowMount(AppButton, {
      props: {
        disabled: false
      }
    })
    expect(wrapper.find('[data-test="button"]').element.hasAttribute('disabled')).toBe(false)
  })

  it('renders default slot content', () => {
    const wrapper = shallowMount(AppButton, {
      slots: {
        default: 'Button Text'
      }
    })
    expect(wrapper.text()).toContain('Button Text')
  })

  it('renders leading-icon slot content', () => {
    const wrapper = shallowMount(AppButton, {
      slots: {
        'leading-icon': '<span class="some-test-class">Icon</span>'
      }
    })
    expect(wrapper.find('.some-test-class').text()).toBe('Icon')
  })
})
