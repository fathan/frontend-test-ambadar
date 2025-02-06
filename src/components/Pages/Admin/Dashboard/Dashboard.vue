<template>
  <div class="pt-6 px-4 lg:px-8">
    <MoleculeBreadcrumbs
      :base-path="'/admin/user'"
      :breadcrumb-data="state.breadcrumbs"
    />

    <section class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      <MoleculeCardDashboard title="Your IP Projects">
        <template #content-wrapper>
          <MoleculeCardInfoDashboard
            icon="oi-light-bulb"
            icon-color="#00b5cd"
            title="10"
            subtitle="Patent"
            background-color="bg-sky-100"
          />

          <MoleculeCardInfoDashboard
            icon="io-document"
            icon-color="#fe7b00"
            title="3"
            subtitle="Trademark"
            background-color="bg-orange-100"
          />

          <MoleculeCardInfoDashboard
            icon="io-prism-sharp"
            icon-color="#7d31f7"
            title="3"
            subtitle="Industrial Design"
            background-color="bg-purple-100"
          />

          <MoleculeCardInfoDashboard
            icon="ri-leaf-line"
            icon-color="#00a64e"
            title="3"
            subtitle="PVT"
            background-color="bg-green-100"
          />
        </template>
      </MoleculeCardDashboard>

      <MoleculeCardDashboard title="IP Project Status">
        <template #content-wrapper>
          <DoughnutChart v-bind="doughnutChartProps" />
        </template>
      </MoleculeCardDashboard>
      
      <MoleculeCardDashboard title="Your Pending Tasks">
        <template #content-wrapper>
          <MoleculeCardInfoDashboard
            icon="oi-light-bulb"
            icon-color="#00b5cd"
            title="PT.123-123-123"
            subtitle="Certified Copy of JP Patent"
            background-color="bg-sky-100"
          />

          <MoleculeCardInfoDashboard
            icon="oi-light-bulb"
            icon-color="#00b5cd"
            title="PT.123-123-123"
            subtitle="Waiting fo Requitment"
            background-color="bg-sky-100"
          />

          <MoleculeCardInfoDashboard
            icon="io-prism-sharp"
            icon-color="#7d31f7"
            title="PT.123-123-123"
            subtitle="Assignment Document"
            background-color="bg-purple-100"
          />

          <MoleculeCardInfoDashboard
            icon="oi-light-bulb"
            icon-color="#00b5cd"
            title="PT.123-123-123"
            subtitle="Waiting fo Requitment"
            background-color="bg-sky-100"
          />
        </template>
      </MoleculeCardDashboard>
    </section>

    <section class="bg-white border border-gray-200 rounded-md shadow-sm p-6 mt-10">
      <div class="flex flex-row justify-between mb-6">
        <div class="text-2xl font-semibold">
          Last Update
        </div>

        <div>
          <a-button type="primary" size="large">
            See More
          </a-button>
        </div>
      </div>

      <DataTable 
        :value="projects" 
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
      >
        <Column field="name" header="Name Company" sortable headerClass="bg-gray-100 text-center text-gray-500" />
        <Column field="" header="IP Type" sortable headerClass="bg-gray-100 text-center text-gray-500">
          <template #body>
            -
          </template>
        </Column>
        <Column field="" header="Project No" sortable headerClass="bg-gray-100 text-center text-gray-500">
          <template #body>
            -
          </template>
        </Column>
        <Column field="" header="Client Ref" sortable headerClass="bg-gray-100 text-center text-gray-500">
          <template #body>
            -
          </template>
        </Column>
        <Column field="" header="Last Update" sortable headerClass="bg-gray-100 text-center text-gray-500">
          <template #body>
            -
          </template>
        </Column>
        <Column header="Action" headerClass="bg-gray-100 text-center text-gray-500">
          <template #body="slotProps">
            <a-button
              type="primary"
              class="px-2"
              @click="onClickDetailData(slotProps.data)"
            >
              <v-icon name="bi-eye" scale="1" />
            </a-button>
          </template>
        </Column>
      </DataTable>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue';
import type { Ref } from 'vue';

import { DoughnutChart, useDoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';

import type { IBreadcrumbData } from '@/components/Molecules/MoleculeBreadcrumbs/model';
import MoleculeCardInfoDashboard from '@/components/Molecules/MoleculeCardInfoDashboard';
import MoleculeCardDashboard from '@/components/Molecules/MoleculeCardDashboard';

interface IState {
  breadcrumbs: IBreadcrumbData[];
}

Chart.register(...registerables);

const state = reactive<IState>({
  breadcrumbs: [
    {
      path: '',
      breadcrumbName: 'Dashboard'
    }
  ]
});

// //////////////////////////////

const projects = ref([]);
const totalRecords: Ref<number> = ref(0);
const loading: Ref<boolean> = ref(false);
const currentPage: Ref<number> = ref(1);
const perPage: Ref<number> = ref(5);
const sortField: Ref<string> = ref('');
const sortOrder: Ref<number> = ref(1);
const selectedRows: Ref<any[]> = ref([]);

// //////////////////////////////

const dataValues = ref([
  30, 40, 60
]);

const dataLabels = ref([
  'In Progress', 'Pending', 'Completed'
]);

const testData = computed<ChartData<'doughnut'>>(() => ({
  labels: dataLabels.value,
  datasets: [
    {
      data: dataValues.value,
      backgroundColor: [
        '#0036ac',
        '#961e6e',
        '#00b4a5'
      ]
    }
  ]
}));

const options = computed<ChartOptions<'doughnut'>>(() => ({
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 20,
        boxHeight: 20,
        borderRadius: 100,
        usePointStyle: false,
        pointStyle: 'circle'
      }
    },
    title: {
      display: true,
      text: ''
    }
  }
}));

const { doughnutChartProps } = useDoughnutChart({
  chartData: testData,
  options
});

// /////////////////////////////////////

const xhrFetchData = async () => {
  loading.value = true;
  
  const _sortOrder = sortOrder.value === 1 ? 'asc' : 'desc';
  const queryParams = new URLSearchParams({
    _page: currentPage.value.toString(),
    _limit: perPage.value.toString(),
    _sort: sortField.value,
    _order: _sortOrder
  });

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?${ queryParams }`);
    const data = await response.json();
    const total = response.headers.get('x-total-count');

    projects.value = data;
    totalRecords.value = total ? parseInt(total) : 10;
  }
  catch (error) {
    console.error('Failed to fetch data:', error);
  }
  finally {
    loading.value = false;
  }
};

const onClickDetailData = (data: any) => {
  console.log('detail data:', data);
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
  selectedRows.value = event.value;
};

onMounted(xhrFetchData);

</script>