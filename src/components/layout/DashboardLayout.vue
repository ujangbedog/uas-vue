<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from './Sidebar.vue';
import Navbar from './Navbar.vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

const isMobileSidebarOpen = ref(false);

const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
};
</script>

<template>
  <div class="flex h-screen bg-black text-white">
    <div class="hidden md:block">
      <Sidebar />
    </div>
    
    <div 
      v-if="isMobileSidebarOpen" 
      class="fixed inset-0 z-40 flex md:hidden"
      @click="isMobileSidebarOpen = false"
    >
      <transition name="fade">
        <div class="fixed inset-0 bg-black opacity-75"></div>
      </transition>
      
      <transition name="slide">
        <div 
          class="relative flex-1 flex flex-col max-w-xs w-full bg-black"
          @click.stop
        >
          <div class="absolute top-0 right-0 -mr-12 pt-2">
            <button 
              @click="isMobileSidebarOpen = false" 
              class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span class="sr-only">Close sidebar</span>
              <XMarkIcon class="h-6 w-6 text-white" />
            </button>
          </div>
          
          <Sidebar />
        </div>
      </transition>
    </div>
    
    <div class="flex flex-col flex-1 overflow-hidden">
      <Navbar @toggle-sidebar="toggleMobileSidebar" :isSidebarOpen="isMobileSidebarOpen" />
      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <slot></slot>
      </main>
    </div>
  </div>
</template> 