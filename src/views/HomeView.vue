<template>
  <div class="h-full w-full md:mx-auto md:mt-[120px] md:max-w-[680px]">
    <article
      v-html="markdown.render(content)"
      class="prose prose-stone mx-auto lg:prose prose-img:m-0 prose-img:inline-block"
    />
  </div>
</template>

<script lang="ts" setup>
import MarkdownIt from 'markdown-it'
import content from '@/static/home.md'
const markdown = new MarkdownIt()
</script>

<style lang="scss" scoped>
.mardown-custom {
  margin: auto;
  p {
    margin: 0 !important;
  }

  img {
  }
}
</style>
