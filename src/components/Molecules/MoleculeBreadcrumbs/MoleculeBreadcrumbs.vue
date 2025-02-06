<template>
  <a-breadcrumb
    separator=""
    class="mb-4"
    :routes="breadcrumbData"
  >
    <template #itemRender="{ route, paths }">
      <router-link
        v-if="breadcrumbData.indexOf(route) === 0"
        :to="{
          path: '/admin/dashboard'
        }"
        class="text-[#a9a7a7]"
      >
        <v-icon name="ri-home-6-line" scale="1" class="text-[#a9a7a7]" />
      </router-link>

      <span v-if="breadcrumbData.indexOf(route) === 0">
        &nbsp;
        <v-icon name="pr-chevron-right" scale="1" class="text-[#a9a7a7]" />
        &nbsp;
      </span>

      <router-link
        v-if="route.isTitle"
        :to="`${ basePath }`"
        class="text-white"
      >
        {{ route.breadcrumbName }}
      </router-link>

      <span
        v-else-if="breadcrumbData.indexOf(route) === breadcrumbData.length - 1"
        class="text-[#a9a7a7]"
      >
        {{ route.breadcrumbName }}
      </span>

      <router-link
        v-else
        :to="computeLink(basePath, paths)"
      >
        <span class="text-white">{{ route.breadcrumbName }}</span>
        <v-icon name="pr-chevron-right" scale="1" class="text-[#a9a7a7]" />
      </router-link>
    </template>
  </a-breadcrumb>

  <hr
    v-if="isWithBottomLine"
    class="h-px my-5 bg-gray-200 border-0 dark:bg-[#E4E7EC]"
  >
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from 'vue';

import type { IBreadcrumbData } from './model';

// ///////////////////////////

interface IProps {
  basePath: string;
  isWithBottomLine: boolean;
  breadcrumbData: IBreadcrumbData[];
}

// ///////////////////////////

withDefaults(defineProps<IProps>(), {
  isWithBottomLine: false,
  breadcrumbData: () => [] as IBreadcrumbData[]
});

const computeLink = (basePath: string, paths: any): string =>  {
  let result = `${ basePath }/${ paths.join('/') }`;
  return result;
};

</script>
