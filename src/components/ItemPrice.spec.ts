import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ItemPrice from '@/components/ItemPrice.vue'

describe('ItemPrice', () => {
  it('renders price', () => {
    const wrapper = mount(ItemPrice, {
      props: {
        price: 2500
      }
    })

    expect(wrapper.html()).toContain('£2,500.00')
  })
})
