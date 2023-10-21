import { describe, it, assert } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import TableRow from '@/components/TableRow.vue'
import { PAYMENT_TYPES } from '@/globals'

describe('TableRow', () => {
  it('has default prop values', () => {
    // Mount the component without props (will use default values)
    const wrapper = shallowMount(TableRow, {
      props: {
        id: 1,
        paymentGroup: { type: PAYMENT_TYPES.Equal, payments: [{ payerId: 1, isEqualPayer: true, quantity: 0, percentage: 0 }] }
      }
    })

    // Validate default prop values
    assert.equal(wrapper.props().name, '', 'Default name is not an empty string')
    assert.equal(wrapper.props().quantity, 1, 'Default quantity is not 0')
    assert.equal(wrapper.props().price, 0, 'Default price is not 0')
  })
})
