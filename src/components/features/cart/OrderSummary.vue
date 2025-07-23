<script setup lang="ts">
import Button from '@/components/ui/Button.vue';

defineProps<{
  total: number;
  isProcessing: boolean;
}>();

const emit = defineEmits<{
  (e: 'checkout'): void;
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
  <div class="bg-gray-900 border border-gray-800 rounded-lg p-6 h-fit">
    <h2 class="text-xl font-bold mb-4">Order Summary</h2>
    
    <div class="space-y-3 mb-6">
      <div class="flex justify-between">
        <span class="text-gray-400">Subtotal</span>
        <span>{{ formatPrice(total) }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-400">Shipping</span>
        <span>Free</span>
      </div>
      <div class="border-t border-gray-800 my-3"></div>
      <div class="flex justify-between font-bold">
        <span>Total</span>
        <span>{{ formatPrice(total) }}</span>
      </div>
    </div>
    
    <Button 
      variant="primary" 
      class="w-full py-3"
      @click="emit('checkout')"
      :loading="isProcessing"
    >
      Proceed to Checkout
    </Button>
  </div>
</template> 