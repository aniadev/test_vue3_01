import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AboutView from '../../views/AboutView.vue'
const wrapper = mount(AboutView)

describe('AboutView', () => {
  it('Test if data is a function', () => {
    console.log('>>> / file: AboutView.spec.ts:10 / wrapper.setup:', wrapper.data)
    expect(typeof wrapper.calculateVolume).toBe('function')
  })
})
