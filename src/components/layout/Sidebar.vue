<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { HomeIcon, UsersIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const currentRoute = ref(router.currentRoute.value.path);

const navigateTo = (path: string) => {
  router.push(path);
  currentRoute.value = path;
};

const menuItems = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Users', path: '/users', icon: UsersIcon },
];
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
              currentRoute === item.path 
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