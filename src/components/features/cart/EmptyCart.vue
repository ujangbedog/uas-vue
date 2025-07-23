<script setup lang="ts">
import Button from '@/components/ui/Button.vue';
import { ShoppingBagIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits<{
  (e: 'continueShopping'): void;
}>();
</script>

<template>
  <div class="text-center py-16">
    <div class="flex justify-center mb-4">
      <ShoppingBagIcon class="h-16 w-16 text-gray-600" />
    </div>
    <div class="text-gray-400 text-xl mb-8">Your cart is empty</div>
    <Button variant="primary" @click="emit('continueShopping')">
      Continue Shopping
    </Button>
  </div>
</template> 