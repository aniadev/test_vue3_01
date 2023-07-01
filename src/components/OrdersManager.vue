<template>
  <h3 class="mt-2">
    Description:
    <a
      href="/images/orders-manager.png"
      target="_blank"
      rel="noopener noreferrer"
      class="text-[16px] font-[700] leading-[24px] underline"
      >Test requirement</a
    >
  </h3>
  <img src="/images/orders-manager.png" alt="" />
  <hr />
  <div class="mx-auto mt-8 h-full w-full">
    <div
      v-html="markdown.render(content)"
      class="prose prose-stone mx-auto !w-full !max-w-[80%] prose-img:m-0 prose-img:inline-block"
    />
  </div>
</template>

<script lang="ts" setup>
import MarkdownIt from 'markdown-it'
import content from '@/static/order-manager.md'
const markdown = new MarkdownIt()
</script>

<style lang="scss" scoped></style>
