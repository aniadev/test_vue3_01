<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="flex h-full items-center justify-start">
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
import { ref, type Component, computed, onMounted, shallowRef } from 'vue'
import BlockBuilder from '@/components/BlockBuilder.vue'
import ListExam from '@/components/ListExam.vue'
import TextFileChecker from '@/components/TextFileChecker.vue'
import BubbleMessenger from '@/components/BubbleMessenger.vue'
import HomeView from './HomeView.vue'
import OrdersManager from '@/components/OrdersManager.vue'
import { useRoute, useRouter } from 'vue-router'

export interface Tree {
  label: string
  slug: string
  component?: Component
  children?: Tree[]
}

const tree = ref<Tree>({
  label: 'Home',
  slug: 'home',
  component: HomeView,
  children: [
    {
      label: 'Test 01',
      slug: 'test-01',
      component: HomeView,
      children: [
        {
          label: 'Text File Checker',
          slug: 'text-file-checker',
          component: TextFileChecker
        },
        {
          label: 'Bubble Messenger',
          slug: 'bubble-messenger',
          component: BubbleMessenger
        }
      ]
    },
    {
      label: 'Test 02',
      slug: 'test-02',
      component: HomeView,
      children: [
        {
          label: 'Block Builder',
          slug: 'block-builder',
          component: BlockBuilder
        },
        {
          label: 'Orders Manager',

          slug: 'orders-manager',
          component: OrdersManager
        }
      ]
    }
  ]
})

const componentActive = shallowRef<Tree>(tree.value)
const componentView = computed<Component | null>(() => componentActive.value.component || null)
const treePath = computed<Tree[]>(() => {
  const path = getChildrenPathName(tree.value, componentActive.value.slug)
  return path
})

function setComponentActive(value: Tree): void {
  componentActive.value = value
  router.push({ name: 'home', params: { slug: value.slug } })
}

function getChildrenPathName(tree: Tree, searchSlug: string): Tree[] {
  // console.log('>>> / file: ExamsView.vue:93 / searchSlug:', searchSlug, tree.label)
  let path: Tree[] = []
  if (searchSlug === tree.slug) {
    path = [{ slug: tree.slug, component: tree.component, label: tree.label }]
    // console.log('>>> / file: ExamsView.vue:97 / path:', path)
    return path
  } else {
    if (tree.children) {
      let _childPath: Tree[] = []
      tree.children.forEach((item) => {
        _childPath = getChildrenPathName(item, searchSlug)
        if (_childPath.length) {
          path = [{ slug: tree.slug, component: tree.component, label: tree.label }, ..._childPath]
        }
      })
      // console.log('>>> / file: ExamsView.vue:128 / _childPath:', _childPath)
      return path
    } else {
      return []
    }
  }
}

const router = useRouter()
const route = useRoute()

onMounted((): void => {
  // const path = getChildrenPathName(tree.value, 'Exams')
  // console.log('>>> / file: ExamsView.vue:86 / path:', path)
  if (route.params?.slug) {
    const path = getChildrenPathName(tree.value, route.params.slug as string)
    if (path.length) setComponentActive(path[path.length - 1])
    else {
      router.push({ name: 'home' })
      setComponentActive(tree.value)
    }
  }
})
</script>
