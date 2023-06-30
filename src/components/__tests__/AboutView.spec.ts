import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import ExamsView from '../../views/ExamsView.vue'
const wrapper = mount(ExamsView)

describe('ExamsView', () => {
  it('Mounted component', () => {
    expect(wrapper).toBeTruthy()
    expect(wrapper.text()).toContain('Draw')
  })
})
