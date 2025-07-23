<script setup lang="ts">
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline';
import type { CartItem } from '@/stores/cartStore';

defineProps<{
  item: CartItem;
}>();

const emit = defineEmits<{
  (e: 'increment', id: number): void;
  (e: 'decrement', id: number): void;
  (e: 'remove', id: number): void;
}>();

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};
</script>

<template>
  <div class="bg-gray-900 border border-gray-800 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
    <!-- Product Image -->
    <div class="w-24 h-24 bg-gray-800 rounded overflow-hidden flex-shrink-0">
      <img 
        v-if="item.product.image" 
        :src="item.product.image" 
        :alt="item.product.name" 
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-gray-600">
        No Image
      </div>
    </div>
    
    <!-- Product Info -->
    <div class="flex-grow">
      <h3 class="font-bold text-lg">{{ item.product.name }}</h3>
      <div class="text-gray-400 text-sm mb-2">{{ item.product.category }}</div>
      <div class="font-semibold">{{ formatPrice(item.product.price) }}</div>
    </div>
    
    <!-- Quantity Controls -->
    <div class="flex items-center space-x-2">
      <button 
        @click="emit('decrement', item.product.id!)"
        class="p-1 rounded-full hover:bg-gray-800"
        :disabled="item.quantity <= 1"
      >
        <MinusIcon class="h-4 w-4" />
      </button>
      
      <span class="w-8 text-center">{{ item.quantity }}</span>
      
      <button 
        @click="emit('increment', item.product.id!)"
        class="p-1 rounded-full hover:bg-gray-800"
      >
        <PlusIcon class="h-4 w-4" />
      </button>
    </div>
    
    <!-- Item Total -->
    <div class="font-bold text-right">
      {{ formatPrice(item.product.price * item.quantity) }}
    </div>
    
    <!-- Remove Button -->
    <button 
      @click="emit('remove', item.product.id!)"
      class="text-red-500 hover:text-red-400 p-1"
      title="Remove item"
    >
      <TrashIcon class="h-5 w-5" />
    </button>
  </div>
</template> 