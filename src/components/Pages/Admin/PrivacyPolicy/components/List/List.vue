<!-- eslint-disable max-len -->
<template>
  <div>
    <div class="bg-[#0d1628] h-80 w-full" />

    <div class="p-4 px-8 -mt-80">
      <MoleculeBreadcrumbs
        :base-path="'/admin/user'"
        :breadcrumb-data="state.breadcrumbs"
      />
  
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="flex justify-between my-4">
          <div class="text-2xl font-semibold text-gray-700">
            Privacy Policy
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import type { IBreadcrumbData } from '@/components/Molecules/MoleculeBreadcrumbs/model';

interface IState {
  breadcrumbs: IBreadcrumbData[];
}

const state = reactive<IState>({
  breadcrumbs: [
    {
      path: '',
      breadcrumbName: 'Privacy Policy'
    }
  ]
});

</script>
