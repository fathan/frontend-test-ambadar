<template>
  <div
    :class="`flex flex-row gap-4 rounded-lg p-4 ${ backgroundColor }`"
  >
    <div class="bg-white rounded-full w-24 h-24 flex justify-center items-center">
      icon
    </div>

    <div class="ml-2 flex justify-center flex-col text-left">
      <div class="font-bold text-lg mb-1">
        {{ title }}
      </div>
      <div class="text-gray-400">
        {{ subtitle }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  title: string;
  subtitle: string;
  backgroundColor: string;
}

// ///////////////////////////

withDefaults(defineProps<IProps>(), {
  title: '',
  subtitle: '',
  backgroundColor: 'bg-blue-100'
});
</script>