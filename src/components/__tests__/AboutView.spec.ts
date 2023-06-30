import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import AboutView from '../../views/AboutView.vue'
const wrapper = mount(AboutView)

describe('AboutView', () => {
  it('Mounted component', () => {
    expect(wrapper).toBeTruthy()
    expect(wrapper.text()).toContain('Draw')
  })
})
