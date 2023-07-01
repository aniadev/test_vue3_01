<template>
  <el-tree
    :data="[{ label: 'All test exams', children: tree.children }]"
    @node-click="handleNodeClick"
  />
</template>

<script lang="ts" setup>
import type { Tree } from '@/views/ExamsView.vue'

defineProps<{
  tree: Tree
}>()
const emit = defineEmits(['select'])

function handleNodeClick(item: Tree) {
  if (item.children) return
  emit('select', item)
}
</script>

<style lang="scss" scoped></style>
