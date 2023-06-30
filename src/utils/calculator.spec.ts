import { describe, it, expect, vi } from 'vitest'

import { calculateVolume } from './calculator'

function getArrayNumber(input: string): number[] {
  const regex = /^[0-9,]*$/
  if (!regex.test(input)) {
    // ElMessage({
    //   message: 'Input must be included 0-9 and ,',
    //   type: 'error'
    // })
    return []
  } else {
    return input.split(',').map((n) => +n)
  }
}

describe('Calculate volume', () => {
  it('increase', () => {
    const input = '1,2,3,4,5'
    expect(calculateVolume(getArrayNumber(input))).toEqual(0)
  })

  it('decrease', () => {
    const input = '6,5,4,3,2,1'
    expect(calculateVolume(getArrayNumber(input))).toEqual(0)
  })

  it('zeroo', () => {
    const input = '0,0,0,0,0'
    expect(calculateVolume(getArrayNumber(input))).toEqual(0)
  })

  it('all equal', () => {
    const input = '7,7,7,7,7'
    expect(calculateVolume(getArrayNumber(input))).toEqual(0)
  })

  it('10101', () => {
    const input = '7,0,7,0,7'
    expect(calculateVolume(getArrayNumber(input))).toEqual(14)
  })

  it('10101', () => {
    const input = '7,0,7,0,7'
    expect(calculateVolume(getArrayNumber(input))).toEqual(14)
  })

  it('random-01', () => {
    const input = '1,4,5,2,8,4,5,6,4,5,5,4,15,0,7,6,2,0,3'
    expect(calculateVolume(getArrayNumber(input))).toEqual(37)
  })

  it('wall-end', () => {
    const input = '1,2,3,0,5,7,0,0,2,0,9'
    expect(calculateVolume(getArrayNumber(input))).toEqual(29)
  })

  it('2zero-end', () => {
    const input = '1,2,3,0,5,7,0,0,2,0,0'
    expect(calculateVolume(getArrayNumber(input))).toEqual(7)
  })

  it('2zero-revert', () => {
    const input = '0,0,2,0,0,7,5,0,3,2,1'
    expect(calculateVolume(getArrayNumber(input))).toEqual(7)
  })

  it('2zero-revert', () => {
    const input = '0,0,2,0,0,7,5,0,3,2,1'
    expect(calculateVolume(getArrayNumber(input))).toEqual(7)
  })
})
