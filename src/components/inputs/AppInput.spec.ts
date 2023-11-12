import { describe, it, expect } from 'vitest'

import { DOMWrapper, mount } from '@vue/test-utils'
import AppInput from './AppInput.vue'

describe('AppInput.vue', () => {
  it('has a default value of empty string', () => {
    const wrapper = mount(AppInput)
    const input = wrapper.find('[data-test="input"]') as DOMWrapper<HTMLInputElement>
    expect(wrapper.props().modelValue).toBe('')
    expect(input.element.value).toBe('')
  })

  it('can have a value', () => {
    const wrapper = mount(AppInput, {
      props: {
        modelValue: 'user1'
      }
    })
    const input = wrapper.find('[data-test="input"]') as DOMWrapper<HTMLInputElement>

    expect(wrapper.props().modelValue).toBe('user1')
    expect(input.element.value).toBe('user1')
  })
})
