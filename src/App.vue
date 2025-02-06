<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <AtomBadgeHelpSupport
      v-if="visibleBadge"
      @click="onClickHelp"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import AtomBadgeHelpSupport from '@components/Atoms/AtomBadgeHelpSupport';

const route = useRoute();
const visibleBadge = ref(true);

const onClickHelp = () => {
  window.alert('Please contact us to administrator or developer');
};

const onCheckHandleVisibleBadge = () => {
  if (route.name === 'Admin Dashboard') {
    visibleBadge.value = true;
  }
  else {
    visibleBadge.value = false;
  }
};

watch(route, () => {
  onCheckHandleVisibleBadge();
});

onMounted(() => {
  onCheckHandleVisibleBadge();
});
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>