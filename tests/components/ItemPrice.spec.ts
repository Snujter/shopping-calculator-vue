import { describe, it, expect } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import ItemPrice from '../../src/components/ItemPrice.vue'

describe('ItemPrice', () => {
  it('renders formatted price', () => {
    const wrapper = shallowMount(ItemPrice, {
      props: {
        price: 2500
      }
    })

    expect(wrapper.html()).toContain('£2,500.00')
  })

  it('has default styling', () => {
    const wrapper = shallowMount(ItemPrice, {
      props: {
        price: 2500,
      }
    })

    expect(wrapper.classes()).toContain('text-xl')
  })

  it('has faded color option', () => {
    const wrapper = shallowMount(ItemPrice, {
      props: {
        price: 2500,
        color: 'faded',
      }
    })

    expect(wrapper.classes()).toContain('text-gray-500')
  })

  it('has small text size option', () => {
    const wrapper = shallowMount(ItemPrice, {
      props: {
        price: 2500,
        fontSize: 'small'
      }
    })

    // check for secondary style classes
    expect(wrapper.classes()).toContain('text-xs')
  })

  it('renders slots when passed', () => {
    const wrapper = shallowMount(ItemPrice, {
      props: {
        price: 2500
      },
      slots: {
        prefix: '<div id="prefix_test">test prefix</div>',
        suffix: '<div id="suffix_test">test suffix</div>'
      }
    })

    // check slot content
    expect(wrapper.find('#prefix_test').text()).toBe('test prefix')
    expect(wrapper.find('#suffix_test').text()).toBe('test suffix')
  })
})
