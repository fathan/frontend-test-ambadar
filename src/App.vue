<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <AtomBadgeHelpSupport @click="onClickHelp" />
  </div>
</template>

<script setup lang="ts">
import AtomBadgeHelpSupport from '@components/Atoms/AtomBadgeHelpSupport';

const onClickHelp = () => {
  window.alert('Please contact us to administrator or developer');
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>