<template>
  <div>
    <MoleculeBreadcrumbs
      :base-path="'/admin/user'"
      :breadcrumb-data="state.breadcrumbs"
    />

    <section class="grid grid-cols-3 gap-4">
      <MoleculeCardDashboard title="Your IP Projects">
        <template #content-wrapper>
          <MoleculeCardInfoDashboard
            title="10"
            subtitle="Patent"
            background-color="bg-sky-100"
          />

          <MoleculeCardInfoDashboard
            title="3"
            subtitle="Trademark"
            background-color="bg-orange-100"
          />

          <MoleculeCardInfoDashboard
            title="3"
            subtitle="Industrial Design"
            background-color="bg-purple-100"
          />

          <MoleculeCardInfoDashboard
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
            title="PT.123-123-123"
            subtitle="Certified Copy of JP Patent"
            background-color="bg-sky-100"
          />

          <MoleculeCardInfoDashboard
            title="PT.123-123-123"
            subtitle="Waiting of Requitment"
            background-color="bg-sky-100"
          />

          <MoleculeCardInfoDashboard
            title="PT.123-123-123"
            subtitle="Assignment Document"
            background-color="bg-purple-100"
          />

          <MoleculeCardInfoDashboard
            title="PT.123-123-123"
            subtitle="Waiting of Requitment"
            background-color="bg-sky-100"
          />
        </template>
      </MoleculeCardDashboard>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';

import { DoughnutChart, useDoughnutChart } from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

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
        '#77CEFF',
        '#0079AF',
        '#123E6B'
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

</script>