<!-- eslint-disable max-len -->
<template>
  <div>
    <div class="bg-[#0d1628] h-80 w-full" />

    <div class="p-4 px-4 lg:px-8 -mt-80">
      <MoleculeBreadcrumbs
        :base-path="'/admin/user'"
        :breadcrumb-data="state.breadcrumbs"
      />
  
      <div class="bg-white rounded-lg shadow-lg p-3 lg:p-6">
        <div class="flex justify-between my-4">
          <div class="text-2xl font-semibold text-gray-700">
            IP Project
          </div>

          <div>
            <a-button size="large" class="border border-gray-500" @click="onClickExportData">
              <template #icon>
                <v-icon name="md-filedownload-outlined" class="mr-2" />
              </template>
              <span class="text-sm">
                Export
              </span>
            </a-button>
          </div>
        </div>

        <MoleculeTabBar
          :tabs="[
            { label: 'All', value: 'all' },
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Pending', value: 'pending' },
            { label: 'Completed', value: 'completed' }
          ]"
          :activeTab="state.activeTab"
          @update:active-tab="state.activeTab = $event"
        />

        <div class="flex flex-col lg:flex-row lg:justify-between bg-[#f5f5f5] rounded-md p-3 mb-4">
          <div class="mb-4 lg:mb-0">
            <a-input
              v-model:value="searchQuery"
              size="large"
              placeholder="Search project name"
              @keyup.enter="searchProjectName"
            >
              <template #prefix>
                <v-icon name="md-search-outlined" class="mr-2 text-gray-300" />
              </template>
            </a-input>
          </div>

          <div class="flex flexx-row gap-4">
            <a-select
              v-model:value="valueSearchPrimary"
              show-search
              placeholder="Choose IP"
              size="large"
              style="width: 300px"
              :options="primaryOptions"
              :filter-option="filterOptionSelectPrimary"
              @focus="handleFocusSelectPrimary"
              @blur="handleBlurSelectPrimary"
              @change="handleChangeSelectPrimary"
            />
            <a-select
              v-model:value="valueSearchSecondary"
              show-search
              placeholder="Select Columns"
              size="large"
              style="width: 500px"
              :options="secondaryOptions"
              :filter-option="filterOptionSelectSecondary"
              @focus="handleFocusSelectSecondary"
              @blur="handleBlurSelectSecondary"
              @change="handleChangeSelectSecondary"
            />
          </div>
        </div>

        <DataTable
          v-model:selection="selectedRows" 
          dataKey="id"
          :value="ipprojects" 
          :loading="loading" 
          :paginator="false" 
          :rows="perPage" 
          :totalRecords="totalRecords"
          :lazy="true"
          :first="(currentPage - 1) * perPage"
          :sortField="sortField"
          :sortOrder="sortOrder"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          class="border border-gray-200 rounded-lg overflow-hidden"
          @page="onPageChange"
          @sort="onSortChange"
          @selection-change="onSelectionChange"
          @row-select="onSelectionChange"
          @row-unselect="onSelectionChange"
        >
          <template #loading>
            <div class="flex items-center justify-center p-4">
              <svg class="animate-spin h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="40 14" />
              </svg>
              <span class="ml-2 text-white text-sm">
                Loading data, please wait...
              </span>
            </div>
          </template>

          <Column selectionMode="multiple" headerStyle="width: 3rem" />
          <Column field="id" header="No" headerClass="bg-gray-100 text-center text-gray-500" />
          <Column field="" header="Project Name" sortable headerClass="bg-gray-100 text-center text-gray-500">
            <template #body="slotProps">
              {{ slotProps.data.company.name }}
            </template>
          </Column>
          <Column field="" header="IP Type" sortable headerClass="bg-gray-100 text-center text-gray-500">
            <template #body>
              -
            </template>
          </Column>
          <Column field="phone" header="Project No" sortable headerClass="bg-gray-100 text-center text-gray-500" />
          <Column field="" header="Filling No" headerClass="bg-gray-100 text-center text-gray-500">
            <template #body="slotProps">
              {{ slotProps.data.address.zipcode }}
            </template>
          </Column>
          <Column field="" header="Registered No" headerClass="bg-gray-100 text-center text-gray-500">
            <template #body="slotProps">
              {{ slotProps.data.address.suite }}
            </template>
          </Column>
          <Column field="" header="Order Type" headerClass="bg-gray-100 text-center text-gray-500">
            <template #body>
              -
            </template>
          </Column>
          <Column field="name" header="PIC" sortable headerClass="bg-gray-100 text-center text-gray-500" />
          <Column field="" header="Status" headerClass="bg-gray-100 text-center text-gray-500">
            <template #body="slotProps">
              <span 
                :class="[
                  'px-2 py-1 rounded-lg bg-transparent border text-sm',
                  slotProps.index % 2 === 0 ? 'border-yellow-500 text-yellow-500' : 'border-blue-500 text-blue-500'
                ]"
              >
                {{ slotProps.index % 2 === 0 ? 'Pending' : 'In Progress' }}
              </span>
            </template>
          </Column>
          <Column header="Action" headerClass="bg-gray-100 text-center text-gray-500">
            <template #body="slotProps">
              <a-button
                type="primary"
                class="px-2"
                @click="onClickEditData(slotProps.data)"
              >
                <v-icon name="bi-eye" scale="1" />
              </a-button>
            </template>
          </Column>
        </DataTable>

        <MoleculePaginationDatatable 
          v-model:perPage="perPage"
          :selectedRows="selectedRows"
          :totalRecords="totalRecords"
          :currentPage="currentPage"
          @page-change="onPageChangeCustom"
        />

        <a-alert
          message="Note:"
          description="XHR HTTP request fetch data dalam datatable sengaja saya buat server side agar terlihat proses fetch data ke API nya. untuk export data saya sertakan dalam bentuk dummy mock JSON file agar bisa di download."
          type="warning"
        />
      </div>
    </div>

    <contextHolder />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';
import type { Ref } from 'vue';
import type { SelectProps } from 'ant-design-vue';
import { notification } from 'ant-design-vue';

import MockIpProjects from '@/__mock__/ip-project.json';

import { generateFileName, exportJsonToCSV } from '@utils/app';

import UserService from '@services/user';

import type { IBreadcrumbData } from '@/components/Molecules/MoleculeBreadcrumbs/model';

import MoleculeTabBar from '@components/Molecules/MoleculeTabBar';
import MoleculePaginationDatatable from '@/components/Molecules/MoleculePaginationDatatable';

interface IState {
  breadcrumbs: IBreadcrumbData[];
  activeTab: string;
}

interface INotification {
  type: 'success' | 'failed';
  content: string
}

const [
  api, contextHolder
] = notification.useNotification();

const state = reactive<IState>({
  breadcrumbs: [
    {
      path: '',
      breadcrumbName: 'IP Projects'
    }
  ],
  activeTab: 'all'
});

const primaryOptions = ref<SelectProps['options']>([
  { value: 'ip #1', label: 'Option IP #1' },
  { value: 'ip #2', label: 'Option IP #2' },
  { value: 'ip #3', label: 'Option IP #3' }
]);

const secondaryOptions = ref<SelectProps['options']>([
  { value: '1', label: 'Option #1' },
  { value: '2', label: 'Option #2' },
  { value: '3', label: 'Option #3' }
]);

const ipprojects = ref([]);
const totalRecords: Ref<number> = ref(0);
const loading: Ref<boolean> = ref(false);
const currentPage: Ref<number> = ref(1);
const perPage: Ref<number> = ref(5);
const sortField: Ref<string> = ref('');
const sortOrder: Ref<number> = ref(1);
const selectedRows: Ref<any[]> = ref([]);
const searchQuery: Ref<string> = ref('');

// /////////////////////////////////////

const valueSearchPrimary = ref<string | undefined>(undefined);
const valueSearchSecondary = ref<string | undefined>(undefined);

const handleChangeSelectPrimary = (value: any) => {
  console.log(`selected ${ value }`);
};

const handleBlurSelectPrimary = () => {
  console.log('blur');
};

const handleFocusSelectPrimary = () => {
  console.log('focus');
};

const filterOptionSelectPrimary = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

// /////////////////////////////////////

const handleChangeSelectSecondary = (value: any) => {
  console.log(`selected ${ value }`);
};

const handleBlurSelectSecondary = () => {
  console.log('blur');
};

const handleFocusSelectSecondary = () => {
  console.log('focus');
};

const filterOptionSelectSecondary = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

// /////////////////////////////////////

const openNotification = (param: INotification) => {
  if (param.type === 'success') {
    api.info({
      message: '',
      description: param.content,
      placement: 'bottomRight'
    });
  }
  else if (param.type === 'failed') {
    api.error({
      message: '',
      description: param.content,
      placement: 'bottomRight'
    });
  }
};

const xhrFetchData = async () => {
  loading.value = true;
  
  const _sortOrder = sortOrder.value === 1 ? 'asc' : 'desc';

  const objData = {
    _page: currentPage.value.toString(),
    _limit: perPage.value.toString(),
    _sort: sortField.value,
    _order: _sortOrder
  };

  if (searchQuery.value) {
    objData['q'] = searchQuery.value;
  }

  const queryParams = new URLSearchParams(objData);

  try {
    const response = await UserService.getList(queryParams.toString());
    const total = response.headers.get('x-total-count');

    ipprojects.value = response.data;
    totalRecords.value = total ? parseInt(total) : 10;
  }
  catch (error: any) {
    openNotification({
      type: 'failed',
      content: error.message
    });
  }
  finally {
    loading.value = false;
  }
};

const onClickEditData = (data: any) => {
  console.log('edit data:', data);
};

const onPageChange = (event: any) => {
  currentPage.value = event.page + 1;
  perPage.value = event.rows;

  xhrFetchData();
};

const onSortChange = (event: any) => {
  sortField.value = event.sortField;
  sortOrder.value = event.sortOrder;

  xhrFetchData();
};

const onSelectionChange = (event: any) => {
  const filtered = selectedRows.value.filter((row: any) => row.id === event.data.id);

  if (!filtered) {
    selectedRows.value.push(event.data);
  }

};

const searchProjectName = () => {
  currentPage.value = 1;
  selectedRows.value = [];
  xhrFetchData();
};

onMounted(xhrFetchData);

const totalPages = computed(() => Math.ceil(totalRecords.value / perPage.value));

const onPageChangeCustom = (page: number) => {
  if (page < 1) {
    page = 1;
  }

  if (page > totalPages.value) {
    page = totalPages.value;
  }

  currentPage.value = page;

  xhrFetchData();
};

const onClickExportData = () => {
  const fileName = generateFileName('ip-projects', 'csv');
  const finalData = MockIpProjects.data;

  exportJsonToCSV(finalData, fileName, (success, message) => {
    if (success) {
      openNotification({
        type: 'success',
        content: message
      });
    }
    else {
      openNotification({
        type: 'failed',
        content: message
      });
    }
  });
};
</script>
