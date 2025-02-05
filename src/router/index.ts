import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores/auth';

import AuthTemplate from '@components/Templates/Auth';
import AdminTemplate from '@components/Templates/Admin';
import PageNotFound from '@components/Templates/PageNotFound';

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/admin/dashboard'
  },
  {
    path: '/admin',
    component: AdminTemplate,
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Admin Dashboard',
        component: defineAsyncComponent(() => import('@components/Pages/Admin/Dashboard')),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'ip-projects',
        name: 'Admin Ip Projects',
        component: defineAsyncComponent(() => import('@/components/Pages/Admin/IpProjects')),
        redirect: '/admin/ip-projects',
        children: [
          {
            path: '',
            name: 'Admin Ip Projects List',
            component: defineAsyncComponent(() => import('@/components/Pages/Admin/IpProjects/components/List')),
            meta: {
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'profile',
        name: 'Admin Profile',
        component: defineAsyncComponent(() => import('@components/Pages/Admin/Profile')),
        redirect: '/admin/profile',
        children: [
          {
            path: '',
            name: 'Admin Profile  View',
            component: defineAsyncComponent(() => import('@components/Pages/Admin/Profile/components/ViewProfile')),            
            meta: {
              requiresAuth: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/auth',
    component: AuthTemplate,
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        name: 'Auth Login',
        component: defineAsyncComponent(() => import('@components/Pages/Auth/Login')),
        meta: {
          requiresAuth: false
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Page Not Found',
    component: PageNotFound
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  window.scrollTo(0, 0);

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.getIsAuthenticated) {
      next({
        path: '/auth/login'
      });
      return;
    }
    else {
      next();
      return;
    }
  }
  else {
    if (authStore.getIsAuthenticated) {
      if (to.name !== 'Page Not Found') {
        next({
          path: '/admin/dashboard'
        });
        return;
      }
      else {
        next();
        return;
      }
    }
    else {
      next();
      return;
    }
  }

});

export default router;
