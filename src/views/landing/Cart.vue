<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import LandingLayout from '@/components/layout/LandingLayout.vue';
import { useCartStore } from '@/stores/cartStore';
import { useToast } from '@/composables/useToast';
import EmptyCart from '@/components/features/cart/EmptyCart.vue';
import CartList from '@/components/features/cart/CartList.vue';
import OrderSummary from '@/components/features/cart/OrderSummary.vue';

const router = useRouter();
const cartStore = useCartStore();
const toast = useToast();
const isProcessing = ref(false);

const incrementQuantity = (productId: number) => {
  const item = cartStore.items.value.find(item => item.product.id === productId);
  if (item) {
    cartStore.updateQuantity(productId, item.quantity + 1);
  }
};

const decrementQuantity = (productId: number) => {
  const item = cartStore.items.value.find(item => item.product.id === productId);
  if (item && item.quantity > 1) {
    cartStore.updateQuantity(productId, item.quantity - 1);
  }
};

const removeItem = (productId: number) => {
  cartStore.removeFromCart(productId);
  toast.success('Item removed from cart');
};

const continueShopping = () => {
  router.push({ name: 'Products' });
};

const checkout = () => {
  isProcessing.value = true;
  
  // Simulate processing time
  setTimeout(() => {
    router.push({ name: 'OrderSuccess' });
  }, 1500);
};

const isEmpty = computed(() => cartStore.items.value.length === 0);
</script>

<template>
  <LandingLayout>
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <EmptyCart 
        v-if="isEmpty" 
        @continueShopping="continueShopping" 
      />
      
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CartList 
          :items="cartStore.items.value"
          @increment="incrementQuantity"
          @decrement="decrementQuantity"
          @remove="removeItem"
          @continueShopping="continueShopping"
        />
        
        <OrderSummary 
          :total="cartStore.totalPrice.value"
          :isProcessing="isProcessing"
          @checkout="checkout"
        />
      </div>
    </div>
  </LandingLayout>
</template> 