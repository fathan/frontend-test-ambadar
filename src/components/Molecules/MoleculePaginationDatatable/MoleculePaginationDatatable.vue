<template>
  <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 mt-2">
    <span class="text-xs lg:text-sm text-gray-700 mb-4 lg:mb-0">
      {{ selectedRows.length }} of {{ totalRecords }} row(s) selected.
    </span>

    <div class="flex flex-col lg:flex-row gap-4">
      <div class="flex items-center space-x-2 mr-8">
        <span class="text-xs lg:text-sm font-semibold text-gray-700">
          Rows per page
        </span>
        <select 
          v-model="localPerPage"
          class="border rounded px-2 py-1 text-xs lg:text-sm" 
          @change="onPerPageChange"
        >
          <option
            v-for="option in perPageOptions"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>

      <div class="text-xs lg:text-sm text-gray-700 font-semibold flex lg:justify-center lg:items-center mr-8">
        Page {{ currentPage }} of {{ totalPages }}
      </div>

      <div class="flex items-center space-x-2">
        <a-button 
          :disabled="currentPage === 1" 
          class="px-2 text-xs lg:text-sm border rounded-md disabled:opacity-50"
          @click="onPageChangeCustom(1)"
        >
          <v-icon name="pr-angle-double-left" scale="1" />
        </a-button>
        <a-button 
          :disabled="currentPage === 1" 
          class="px-2 text-xs lg:text-sm border rounded-md disabled:opacity-50"
          @click="onPageChangeCustom(currentPage - 1)"
        >
          <v-icon name="pr-chevron-left" scale="1" />
        </a-button>
        <a-button 
          :disabled="currentPage >= totalPages" 
          class="px-2 text-xs lg:text-sm border rounded-md disabled:opacity-50"
          @click="onPageChangeCustom(currentPage + 1)"
        >
          <v-icon name="pr-chevron-right" scale="1" />
        </a-button>
        <a-button 
          :disabled="currentPage >= totalPages" 
          class="px-2 text-xs lg:text-sm border rounded-md disabled:opacity-50"
          @click="onPageChangeCustom(totalPages)"
        >
          <v-icon name="pr-angle-double-right" scale="1" />
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

interface IProps {
  selectedRows: any;
  totalRecords: number;
  currentPage: number;
  perPage: number;
  perPageOptions: number[];
}

// ///////////////////////////

const emit = defineEmits([
  'page-change', 'update:perPage'
]);

const props = withDefaults(defineProps<IProps>(), {
  selectedRows: [],
  totalRecords: 0,
  currentPage: 1,
  perPage: 10,
  perPageOptions: () => [
    5, 10, 20, 50
  ]
});

const localPerPage = ref(props.perPage);

watch(() => props.perPage, (newVal) => {
  localPerPage.value = newVal;
});

const totalPages = computed(() => Math.ceil(props.totalRecords / props.perPage));

const onPageChangeCustom = (page) => {
  emit('page-change', page);
};

const onPerPageChange = () => {
  emit('update:perPage', localPerPage.value);
  emit('page-change', 1);
};
</script>