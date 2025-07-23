<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import Button from '@/components/ui/Button.vue';
import CartItem from '@/components/features/cart/CartItem.vue';
import type { CartItem as CartItemType } from '@/stores/cartStore';

const props = defineProps<{
  items: CartItemType[];
}>();

const emit = defineEmits<{
  (e: 'increment', id: number): void;
  (e: 'decrement', id: number): void;
  (e: 'remove', id: number): void;
  (e: 'continueShopping'): void;
}>();
</script>

<template>
  <div class="lg:col-span-2 space-y-4">
    <CartItem 
      v-for="item in items" 
      :key="item.product.id"
      :item="item"
      @increment="id => emit('increment', id)"
      @decrement="id => emit('decrement', id)"
      @remove="id => emit('remove', id)"
    />
    
    <div class="mt-6">
      <Button 
        variant="secondary" 
        @click="emit('continueShopping')"
        class="flex items-center"
      >
        <ArrowLeftIcon class="h-4 w-4 mr-2" />
        Continue Shopping
      </Button>
    </div>
  </div>
</template> 