<template>
  <div class="inline-block mb-6">
    <div class="flex flex-row gap-3 bg-[#edeff1] rounded-lg p-1">
      <div
        v-for="tab in tabs"
        :key="tab.value"
        class="text-sm py-2 px-4 cursor-pointer"
        :class="{
          'text-[#5b5b5b] bg-white rounded-lg': tab.value === activeTab,
          'text-[#a8aeb8] bg-transparent': tab.value !== activeTab
        }"
        @click="() => emit('update:activeTab', tab.value)"
      >
        {{ tab.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface ITab {
  label: string;
  value: string;
}

defineProps<{
  tabs: ITab[];
  activeTab: string
}>();

const emit = defineEmits(['update:activeTab']);
</script>
