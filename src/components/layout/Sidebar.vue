<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { HomeIcon, UsersIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const route = useRoute();

const navigateTo = (path: string) => {
  router.push(path);
};

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { name: 'Users', path: '/dashboard/users', icon: UsersIcon },
  { name: 'Products', path: '/dashboard/products', icon: ShoppingBagIcon },
];

const isActive = (path: string) => {
  if (path === '/dashboard') {
    // Only highlight Dashboard when exactly on /dashboard
    return route.path === '/dashboard';
  } else {
    // For other items, use startsWith to match nested routes
    return route.path.startsWith(path);
  }
};
</script>

<template>
  <aside class="w-64 bg-black border-r border-transparent flex flex-col h-full">
    <div class="p-4 border-b border-transparent flex items-center justify-between">
      <h1 class="text-xl font-bold text-white w-full text-center">Latihan Vue</h1>
    </div>
    
    <nav class="flex-1 overflow-y-auto py-4">
      <ul class="space-y-2 px-3">
        <li v-for="item in menuItems" :key="item.path">
          <a 
            @click="navigateTo(item.path)" 
            :class="[
              'flex items-center px-4 py-2.5 rounded-lg cursor-pointer transition-colors',
              isActive(item.path) 
                ? 'bg-white text-black font-medium' 
                : 'text-gray-300 hover:bg-white hover:text-black'
            ]"
          >
            <span class="mr-3">
              <component :is="item.icon" class="h-5 w-5" />
            </span>
            <span>{{ item.name }}</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template> 