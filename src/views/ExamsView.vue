<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="flex h-full items-center justify-center">
          <img src="/icons/logo.png" alt="" class="mr-3 h-10 w-10 object-contain" />
          <h1 class="text-center text-[24px] font-[700] leading-[32px]">Aniadev Examination</h1>
        </div>
      </el-header>
      <el-main>
        <div class="border-b">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="(item, index) in treePath"
              :key="index"
              @click="setComponentActive(item)"
            >
              <span
                class="text-[16px] font-[700] leading-[24px] hover:cursor-pointer hover:text-[#686de0]"
                >{{ item.label }}</span
              >
            </el-breadcrumb-item>
            <!-- <el-breadcrumb-item><a href="./page-header.html">route 1</a></el-breadcrumb-item>
            <el-breadcrumb-item>route 2</el-breadcrumb-item> -->
          </el-breadcrumb>
          <ListExam :tree="tree" @select="setComponentActive" />
        </div>
        <div class="main">
          <component :is="componentView"></component>
        </div>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, type Component, computed, onMounted } from 'vue'
import BlockBuilder from '@/components/BlockBuilder.vue'
import ListExam from '@/components/ListExam.vue'
import TextFileChecker from '@/components/TextFileChecker.vue'
import BubbleMessenger from '@/components/BubbleMessenger.vue'
import HomeView from './HomeView.vue'
import OrdersManager from '@/components/OrdersManager.vue'

export interface Tree {
  label: string
  component?: Component
  children?: Tree[]
}

const tree = ref<Tree>({
  label: 'Home',
  component: HomeView,
  children: [
    {
      label: 'Test 01',
      children: [
        {
          label: 'Text File Checker',
          component: TextFileChecker
        },
        {
          label: 'Bubble Messenger',
          component: BubbleMessenger
        }
      ]
    },
    {
      label: 'Test 02',
      children: [
        {
          label: 'Block Builder',
          component: BlockBuilder
        },
        {
          label: 'Orders Manager',
          component: OrdersManager
        }
      ]
    }
  ]
})

const componentActive = ref<Tree>(tree.value)
const componentView = computed(() => componentActive.value.component)
const treePath = computed<Tree[]>(() => {
  const path = getChildrenPathName(tree.value, componentActive.value.label)
  return path
})

function setComponentActive(value: Tree): void {
  componentActive.value = value
}

function getChildrenPathName(tree: Tree, searchLabel: string): Tree[] {
  // console.log('>>> / file: ExamsView.vue:93 / searchLabel:', searchLabel, tree.label)

  let path: Tree[] = []

  if (searchLabel === tree.label) {
    path = [{ label: tree.label, component: tree.component }]
    // console.log('>>> / file: ExamsView.vue:97 / path:', path)
    return path
  } else {
    if (tree.children) {
      let _childPath: Tree[] = []
      tree.children.forEach((item) => {
        _childPath = getChildrenPathName(item, searchLabel)
        if (_childPath.length) {
          path = [{ label: tree.label, component: tree.component }, ..._childPath]
        }
      })
      // console.log('>>> / file: ExamsView.vue:128 / _childPath:', _childPath)
      return path
    } else {
      return []
    }
  }
}

onMounted((): void => {
  // const path = getChildrenPathName(tree.value, 'Exams')
  // console.log('>>> / file: ExamsView.vue:86 / path:', path)
})
</script>
