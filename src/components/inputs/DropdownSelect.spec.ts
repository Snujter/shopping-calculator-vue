import { describe, it, assert, expect } from 'vitest'

import { markRaw } from 'vue'
import { shallowMount } from '@vue/test-utils'
import DropdownSelect from '@/components/inputs/DropdownSelect.vue'
import ShareEqual from '../icons/IconShareEqual.vue'

describe('DropdownSelect', () => {
  const basicMountOptions = {
    directives: {
      'click-outside'() {
      }
    },
    props: {
      items: [
        { label: 'Test 1', value: 'test_1', icon: markRaw(ShareEqual) },
        { label: 'Test 2', value: 'test_2', icon: markRaw(ShareEqual) },
        { label: 'Test 3', value: 'test_3', icon: markRaw(ShareEqual) }
      ]
    }
  }

  it('has default prop values', () => {
    const wrapper = shallowMount(DropdownSelect, basicMountOptions)

    assert.equal(wrapper.props().selectedValue, 'test_1', 'Default selectedValue is not the value of the first item in props.items')
  })

  it('renders all items', () => {
    const wrapper = shallowMount(DropdownSelect, basicMountOptions)

    expect(wrapper.findAll('[data-test="item"]')).toHaveLength(3)
  })

  it('clicking on toggle button should make the list of items visible', async () => {
    const wrapper = shallowMount(DropdownSelect, basicMountOptions)

    // get elements
    const $container = wrapper.find('[data-test="item-list-container"]')
    const $toggle = wrapper.find('[data-test="toggle"]')

    // items should be hidden before clicking the toggle
    expect($container.classes()).toContain("grid-rows-[0fr]")

    // click on toggle
    await $toggle.trigger('click')
    await wrapper.vm.$nextTick() // wait for click

    // items should be visible
    expect($container.classes()).toContain("grid-rows-[1fr]")
  })

  it('emits events', async () => {
    const wrapper = shallowMount(DropdownSelect, basicMountOptions)

    // events to emit
    wrapper.vm.$emit('update:selected-item', 'asd')

    // wait until emitted
    await wrapper.vm.$nextTick()

    // check if emitted values are correct
    expect(wrapper.emitted('update:selected-item')?.[0]).toStrictEqual(['asd'])
  })
})
