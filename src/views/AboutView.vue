<template>
  <div class="w-full mt-20 flex flex-col items-center">
    <canvas :width="CV_WIDTH" :height="CV_HEIGHT" id="main-cvs" class="mx-auto border"></canvas>
    <div class="mt-5 w-[600px] flex items-center">
      <el-input v-model="input" placeholder="0,1,4,2,..." class="flex-grow"></el-input>
      <el-button class="ml-2" @click="handleDraw">Draw</el-button>
    </div>
    <div class="mt-5 w-full max-w-[600px] mx-auto">
      <p class="text-[16px] font-[400] leading-[24px] text-left">
        <span class="font-bold">Volume:</span> <span>{{ volume }} m³</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'

const input = ref<string>('1,4,5,2,8,4,5,6,4,5,5,4,5,0,7,6,9')
const canvas = ref<HTMLCanvasElement | null>(null)
const volume = ref<number>(0)

const CV_WIDTH = 800
const CV_HEIGHT = 600

onMounted(() => {
  canvas.value = document.getElementById('main-cvs') as HTMLCanvasElement
})

function getArrayNumber(input: string): number[] {
  const regex = /^[0-9,]*$/
  if (!regex.test(input)) {
    ElMessage({
      message: 'Input must be included 0-9 and ,',
      type: 'error'
    })
    return []
  } else {
    return input.split(',').map((n) => +n)
  }
}

function handleDraw() {
  // @ts-ignore
  input.value = input.value.replaceAll(' ', '')
  const arrNum = getArrayNumber(input.value)
  const cols = arrNum.length
  const rows = Math.max(...arrNum)
  const blockSize = CV_HEIGHT / rows < CV_WIDTH / cols ? CV_HEIGHT / rows : CV_WIDTH / cols

  console.log('>>> / file: AboutView.vue:43 / cols:::', cols, '::rows:::', rows)
  console.log('>>> / file: AboutView.vue:43 / blockSize:', blockSize)
  console.log('>>> / file: AboutView.vue:23 / arrNum:', arrNum)

  if (!canvas.value) return
  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  ctx.fillStyle = 'white'
  ctx.clearRect(0, 0, CV_WIDTH, CV_HEIGHT)
  console.log(`Clear rect`)

  ctx.strokeStyle = 'black'
  //
  arrNum.forEach((val, col) => {
    console.log(`Draw block`)
    // x-loop
    for (let row = 0; row < val; row++) {
      ctx.strokeRect(col * blockSize, CV_HEIGHT - blockSize * (row + 1), blockSize, blockSize)
    }
  })
}
</script>

<style lang="scss" scoped></style>
