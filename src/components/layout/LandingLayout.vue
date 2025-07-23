<script setup lang="ts">
import LandingNavbar from './LandingNavbar.vue';
import { HeartIcon } from '@heroicons/vue/24/solid';
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
    <LandingNavbar />
    
    <!-- Main content with padding for the fixed navbar -->
    <main class="pt-16">
      <slot></slot>
    </main>
    
    <!-- Footer -->
    <footer class="bg-black py-12 border-t border-gray-800">
      <div class="container mx-auto px-4 text-center">
        <p class="text-gray-400 text-sm">
          Made with 
          <HeartIcon class="h-4 w-4 inline-block mx-1 text-white" />
          by <a href="https://github.com/ujangbedog" target="_blank" class="text-white hover:text-gray-300">ilham alfath</a>
        </p>
      </div>
    </footer>
  </div>
</template> 