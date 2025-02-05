<template>
  <div
    :class="`flex flex-row gap-4 rounded-lg p-4 ${ backgroundColor }`"
  >
    <div class="bg-white rounded-full w-24 h-24 flex justify-center items-center">
      <v-icon
        :name="icon"
        scale="3"
        :fill="iconColor"
      />
    </div>

    <div class="ml-2 flex justify-center flex-col text-left">
      <div class="font-bold text-lg mb-1 text-[#1b1b19]">
        {{ title }}
      </div>
      <div class="text-[#848c98]">
        {{ subtitle }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
  backgroundColor: string;
}

// ///////////////////////////

withDefaults(defineProps<IProps>(), {
  icon: '',
  iconColor: '',
  title: '',
  subtitle: '',
  backgroundColor: 'bg-blue-100'
});
</script>