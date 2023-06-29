<template>
  <div class="w-full h-full md:max-w-[680px] md:mx-auto md:mt-[120px]">
    <h1 class="text-[24px] font-[600] leading-[32px]">Danh sách:</h1>
    <el-table :data="tableData" style="width: 100%" @row-click="handleRowClick">
      <el-table-column prop="id" label="STT" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="link" label="Link" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
const tableData = [
  {
    id: 1,
    name: 'Drag N Drop container',
    link: ''
  }
]

function handleRowClick(row: any, column: any, event: any): void {
  console.log('>>> / file: HomeView.vue:22 / row:', row, column, event)
}
</script>

<style lang="scss" scoped></style>
