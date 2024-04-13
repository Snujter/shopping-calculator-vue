import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TableHeader from '../../src/components/TableHeader.vue'

describe('TableHeader', () => {
  it('renders slot content', () => {
    const wrapper = mount(TableHeader, {
      slots: {
        default: 'Test header'
      }
    })

    expect(wrapper.html()).toContain('Test header')
  })
})
