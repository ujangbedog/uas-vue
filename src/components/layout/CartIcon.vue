<script setup lang="ts">
import { ShoppingCartIcon } from '@heroicons/vue/24/outline';
import { useCartStore } from '@/stores/cartStore';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();

const goToCart = () => {
  router.push({ name: 'Cart' });
};
</script>

<template>
  <button 
    @click="goToCart"
    class="relative p-2 rounded-full hover:bg-white/10 transition-colors"
    aria-label="Shopping Cart"
  >
    <ShoppingCartIcon class="h-6 w-6 text-white" />
    <span 
      v-if="cartStore.totalItems.value > 0" 
      class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
    >
      {{ cartStore.totalItems.value > 9 ? '9+' : cartStore.totalItems.value }}
    </span>
  </button>
</template> 