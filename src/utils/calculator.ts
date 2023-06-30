export function calculateVolume(array: number[]) {
  let totalVol = 0
  const length = array.length
  // console.log(`length[${length}]`)

  let breakPoint = 0
  const holes = []

  for (let i = 0; i < length; i++) {
    // console.log(`array[${i}]::${array[i]}`)
    if (i < breakPoint) continue
    const max1 = array[i]
    let max2 = array[i]
    let max1_index = i
    let max2_index = i

    // find the big hole
    if (array[i] > array[i + 1]) {
      max1_index = i
      // console.log(`TOP-01`, max1, `index::${i}`)
      for (let jx = i; jx < length; jx++) {
        if (max1 < array[jx]) {
          max2 = array[jx]
          max2_index = jx
          // console.log(`TOP-02`, max2, `index::${max2_index}`)
          breakPoint = max2_index
          break
        } else {
          //
        }
      }
      // end loop and do not find max2
      if (max2_index == max1_index) {
        // console.log(`Endloop => find max2'`)
        // find second max_2 = max(index_1, end)
        max2_index = max1_index + 1
        max2 = array[max2_index]
        for (let jiv = max1_index + 1; jiv < length; jiv++) {
          // console.log('>>> / file: calculator:39 / jiv:', jiv)
          if (max2 <= array[jiv]) {
            max2 = array[jiv]
            max2_index = jiv
            breakPoint = max2_index
          }
        }
        // console.log(`TOP-02>>>'`, max2, `index::${max2_index}`)
      }
    } else {
      //
    }

    if (max1_index != max2_index) holes.push([max1_index, max2_index])
  }

  // calculate volume from holes
  // console.log('>>> / file: AboutView.vue:101 / holes:', holes)
  holes.forEach(([x1, x2]) => {
    const min_height = Math.min(array[x1], array[x2])
    const _vol =
      min_height * (x2 - x1 - 1) -
      array.slice(x1 + 1, x2 - 1 + 1).reduce((sum, value) => sum + value, 0)

    // console.log('>>> / file: AboutView.vue:104 / _vol:', _vol)
    totalVol += _vol
  })

  return totalVol
}
