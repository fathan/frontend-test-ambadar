<template>
  <div class="bg-white rounded-3xl p-6 shadow-lg flex flex-col h-full">
    <div class="w-full py-2 mb-4">
      <h3 class="font-bold text-gray-800">
        {{ title }}
      </h3>
      <hr class="border-1 mt-2 border-gray-800 w-24">
    </div>

    <div class="flex flex-col gap-5 flex-1 justify-center">
      <slot name="content-wrapper" />
    </div>
    
    <div class="mt-6">
      <a-button type="primary" size="large" block>
        See More
      </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  title: string;
  linkSeeMore: string;
}

// ///////////////////////////

withDefaults(defineProps<IProps>(), {
  title: '',
  linkSeeMore: ''
});
</script>