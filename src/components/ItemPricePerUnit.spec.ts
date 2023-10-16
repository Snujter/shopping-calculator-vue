import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ItemPricePerUnit from '@/components/ItemPricePerUnit.vue'

describe('ItemPrice', () => {
  it('renders price per unit', () => {
    const wrapper = mount(ItemPricePerUnit, {
      props: {
        price: 2500
      }
    })

    expect(wrapper.html()).toContain('£2,500.00 per unit')
  })
})
