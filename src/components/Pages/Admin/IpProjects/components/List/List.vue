<template>
  <div>
    <MoleculeBreadcrumbs
      :base-path="'/admin/user'"
      :breadcrumb-data="state.breadcrumbs"
    />

    <div>
      @TODO
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

interface IState {
  breadcrumbs: IBreadcrumbData[];
}

const state = reactive<IState>({
  breadcrumbs: [
    {
      path: '',
      breadcrumbName: 'IP Projects'
    }
  ]
});

</script>