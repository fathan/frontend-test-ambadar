<!-- eslint-disable max-len -->
<template>
  <aside
    :class="[
      'fixed z-20 h-full top-0 left-0 flex flex-shrink-0 flex-col transition-width duration-75',
      isSidebarOpen ? 'w-60' : 'w-0'
    ]"
  >
    <div class="relative flex-1 flex flex-col min-h-0 bg-[#020203] pt-0">
      <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div class="flex px-5 mb-5 items-center justify-center">
          <div class="mb-4 mr-2">
            <img src="https://ambadar.com/storage/2023/08/Logo-Ambadar-White-250x100.png" style="width: 150px;">
          </div>
        </div>

        <div class="flex-1 px-3 bg-[#020203] space-y-1">
          <div class="text-base font-light text-white ml-2 mb-3">
            Menu
          </div>
          <ul class="space-y-2 pb-2">
            <li
              v-for="(item, index) in menuData"
              :key="index"
            >
              <div>
                <div
                  v-if="hasAccess(item.access)"
                  class="flex items-center"
                >
                  <router-link
                    v-if="item.icon"
                    :to="{
                      path: item.link
                    }"
                    class="w-full flex p-2 text-white text-base font-bold rounded-lg hover:bg-[#3a3c42]"
                    :class="{'bg-[#3a3c42]': $route.path === item.link}"
                  >
                    <v-icon :name="item.icon" scale="1" />
                    <span class="ml-3 text-[#ffffff] font-light text-sm">
                      {{ item.title }}
                    </span>
                  </router-link>
                  <div v-else class="mt-2 mb-2">
                    <img :src="item.icon">
                    <span class="ml-0 text-[#ffffff] mt-4 text-sm font-light uppercase">
                      {{ item.title }}
                    </span>
                  </div>
                </div>

                <ul class="space-y-2">
                  <li
                    v-for="(child, childIndex) in item.children"
                    :key="childIndex"
                  >
                    <router-link
                      v-if="!child.children && hasAccess(child.access)" 
                      :to="{
                        path: child.link
                      }" 
                      class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-[#ffffff] group"
                      :class="{'bg-[#3a3c42]': $route.path === child.link}"
                    >
                      <img :src="child.icon">
                      <span class="ml-3 text-white font-light">
                        {{ child.title }}
                      </span>
                    </router-link>

                    <div v-else>
                      <button 
                        v-if="hasAccess(child.access)"
                        class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-[#ffffff] group w-full text-left"
                        @click="toggleDropdown(`${index}-${childIndex}`)" 
                      >
                        <img :src="child.icon">
                        <span class="ml-3 text-white font-light">
                          {{ child.title }}
                        </span>
                        <img
                          src="~@assets/icons/icon-chevron-down.svg"
                          :class="{ 'rotate-180': isOpen[`${index}-${childIndex}`] }" 
                          class="ml-auto transition-transform duration-200"
                        >
                      </button>

                      <ul
                        v-if="isOpen[`${index}-${childIndex}`]"
                        class="pl-10 space-y-2"
                      >
                        <li
                          v-for="(subChild, subChildIndex) in child.children"
                          :key="subChildIndex"
                        >
                          <template v-if="hasAccess(subChild.access)">
                            <router-link
                              :to="{
                                path: subChild.link
                              }"
                              class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-[#ffffff] group"
                            >
                              <span class="text-white font-light">
                                {{ subChild.title }}
                              </span>
                            </router-link>
                          </template>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div class="px-3">
          <ul class="space-y-2 pb-2">
            <li
              v-for="(item, idx) in footerMenuData"
              :key="idx"
            >
              <div class="flex items-center">
                <router-link
                  :to="{
                    path: item.link
                  }"
                  class="w-full flex p-2 text-white text-base font-bold rounded-lg hover:bg-[#3a3c42]"
                >
                  <v-icon :name="item.icon" scale="1" />
                  <span class="ml-3 text-[#ffffff] font-light text-sm">
                    {{ item.title }}
                  </span>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import type { Emitter } from '@interfaces/app';

import { useAppStore } from '@stores/app';

import * as Constant from '@configurations/constants';

enum UserRole {
  SuperAdmin = Constant.ROLE_SUPERADMIN,
  Admin = Constant.ROLE_ADMIN,
  User = Constant.ROLE_USER
}

interface MenuItem {
  title: string;
  icon?: string;
  link?: string;
  children?: IChildrenMenu[];
  access?: UserRole[];
}

interface IChildrenMenu extends MenuItem {}

const emitter = inject<Emitter>('$emitter') as Emitter;
const appStore = useAppStore();

const menuData: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'ri-dashboard-line',
    link: '/admin/dashboard',
    access: [
      UserRole.SuperAdmin, UserRole.Admin, UserRole.User
    ]
  },
  {
    title: 'IP Projects',
    icon: 'oi-light-bulb',
    link: '/admin/ip-projects',
    access: [
      UserRole.SuperAdmin, UserRole.Admin, UserRole.User
    ]
  },
  {
    title: 'Case Management',
    icon: 'ri-scales-3-line',
    link: '/admin/case-management',
    access: [
      UserRole.SuperAdmin, UserRole.Admin, UserRole.User
    ]
  },
  {
    title: 'Billing & Payment',
    icon: 'hi-currency-dollar',
    link: '/admin/billing-and-payment',
    access: [
      UserRole.SuperAdmin, UserRole.Admin, UserRole.User
    ]
  },
  {
    title: 'Reports',
    icon: 'ri-pie-chart-line',
    link: '/admin/reports',
    access: [
      UserRole.SuperAdmin, UserRole.Admin, UserRole.User
    ]
  }
];

const footerMenuData: MenuItem[] = [
  {
    title: 'Privacy Policy',
    icon: 'bi-file-earmark-lock',
    link: '/admin/privacy-policy',
    access: [
      UserRole.SuperAdmin, UserRole.Admin, UserRole.User
    ]
  },
  {
    title: 'Support',
    icon: 'bi-question-circle',
    link: '/admin/support',
    access: [
      UserRole.SuperAdmin, UserRole.Admin, UserRole.User
    ]
  }
];

const { isSidebarOpen } = storeToRefs(appStore);
const isOpen = ref<{ [key: string]: boolean }>({});

const toggleDropdown = (key: string) => {
  isOpen.value[key] = !isOpen.value[key];
};

const userRole = ref<UserRole>(UserRole.SuperAdmin);

const hasAccess = (accessRoles: UserRole[] | undefined) => {
  return accessRoles ? accessRoles.includes(userRole.value) : true;
};

onMounted(() => {
  emitter.on('sidebar:open-close', () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  });
});

</script>

<style scoped>
.router-link-exact-active {
  @apply bg-[#3a3c42];
}
</style>