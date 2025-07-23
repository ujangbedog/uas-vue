<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import LandingLayout from '@/components/layout/LandingLayout.vue';
import Button from '@/components/ui/Button.vue';
import { CheckCircleIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline';
import { useCartStore } from '@/stores/cartStore';

const router = useRouter();
const cartStore = useCartStore();

onMounted(() => {
  // Clear the cart after successful order
  cartStore.clearCart();
});

const continueShopping = () => {
  router.push({ name: 'Products' });
};

const goToHome = () => {
  router.push({ name: 'Home' });
};
</script>

<template>
  <LandingLayout>
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
        <div class="flex justify-center mb-6">
          <CheckCircleIcon class="h-20 w-20 text-green-500" />
        </div>
        
        <h1 class="text-3xl font-bold mb-4">Order Successful!</h1>
        
        <p class="text-gray-300 mb-8">
          Thank you for your purchase. Your order has been received and is being processed.
          Your LEGO sets will be shipped soon!
        </p>
        
        <div class="bg-gray-800 rounded-lg p-6 mb-8">
          <div class="flex items-center justify-center mb-4">
            <ShoppingBagIcon class="h-6 w-6 mr-2 text-blue-400" />
            <h2 class="text-xl font-bold">Order Details</h2>
          </div>
          
          <div class="space-y-2 text-left">
            <div class="flex justify-between">
              <span class="text-gray-400">Order Number:</span>
              <span class="font-medium">#LE{{ Math.floor(Math.random() * 10000).toString().padStart(4, '0') }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Order Date:</span>
              <span class="font-medium">{{ new Date().toLocaleDateString() }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Estimated Delivery:</span>
              <span class="font-medium">
                {{ new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString() }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" @click="goToHome">
            Return to Home
          </Button>
          <Button variant="primary" @click="continueShopping">
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  </LandingLayout>
</template> 