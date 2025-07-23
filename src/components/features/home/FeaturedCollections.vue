<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from '@/components/ui/Button.vue';

const router = useRouter();

const collections = [
  {
    icon: '🏙️',
    title: 'City Sets',
    description: 'Build your own urban landscape with our premium city collection.'
  },
  {
    icon: '🚀',
    title: 'Space & Sci-Fi',
    description: 'Explore the universe with our space-themed Lego collections.'
  },
  {
    icon: '🏰',
    title: 'Fantasy & Adventure',
    description: 'Embark on epic adventures with our fantasy Lego sets.'
  }
];
</script>

<template>
  <section class="py-16 bg-black bg-opacity-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-12 text-center">Featured Collections</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="(collection, index) in collections" 
          :key="index" 
          class="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gray-800 text-center"
        >
          <div class="w-20 h-20 mx-auto bg-white bg-opacity-10 rounded-full flex items-center justify-center mb-4">
            <span class="text-3xl">{{ collection.icon }}</span>
          </div>
          <h3 class="text-xl font-bold mb-3">{{ collection.title }}</h3>
          <p class="text-gray-400 mb-4">{{ collection.description }}</p>
          <Button @click="router.push('/products')" variant="secondary" size="sm">View Collection</Button>
        </div>
      </div>
    </div>
  </section>
</template> 