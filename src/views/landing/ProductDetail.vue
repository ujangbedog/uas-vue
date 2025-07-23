<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LandingLayout from '@/components/layout/LandingLayout.vue';
import Button from '@/components/ui/Button.vue';
import Spinner from '@/components/ui/Spinner.vue';
import { productService } from '@/services';
import type { Product } from '@/services/productService';
import { useToast } from '@/composables/useToast';
import { useCartStore } from '@/stores/cartStore';
import { ArrowLeftIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const cartStore = useCartStore();
const isLoading = ref(true);
const product = ref<Product | null>(null);
const quantity = ref(1);

const productId = Number(route.params.id);

// Format price as currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

const fetchProduct = async () => {
  isLoading.value = true;
  try {
    product.value = await productService.getById(productId);
  } catch (error) {
    toast.error('Failed to load product details');
    console.error('Error fetching product:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (isNaN(productId)) {
    toast.error('Invalid product ID');
    router.push({ name: 'Products' });
    return;
  }
  
  fetchProduct();
});

const goBack = () => {
  router.push({ name: 'Products' });
};

const incrementQuantity = () => {
  quantity.value++;
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value, quantity.value);
    toast.success(`${quantity.value} x ${product.value.name} added to cart`);
  }
};
</script>

<template>
  <LandingLayout>
    <div class="container mx-auto px-4 py-12">
      <button 
        @click="goBack" 
        class="flex items-center text-white mb-8 hover:text-blue-400 transition-colors"
      >
        <ArrowLeftIcon class="h-5 w-5 mr-2" />
        Back to Products
      </button>
      
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <Spinner size="lg" color="white" text="Loading product details..." />
      </div>
      
      <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Product Image -->
        <div class="rounded-lg overflow-hidden bg-gray-800">
          <img 
            v-if="product.image" 
            :src="product.image" 
            :alt="product.name" 
            class="w-full h-full object-contain" 
          />
          <div v-else class="w-full h-96 flex items-center justify-center bg-gray-700 text-gray-400">
            No Image Available
          </div>
        </div>
        
        <!-- Product Details -->
        <div>
          <div class="mb-6">
            <div class="inline-block bg-white/10 px-3 py-1 rounded text-sm mb-4">
              {{ product.category }}
            </div>
            <h1 class="text-4xl font-bold mb-4">{{ product.name }}</h1>
            <div class="text-2xl font-bold text-white mb-6">
              {{ formatPrice(product.price) }}
            </div>
            
            <div class="border-t border-gray-800 my-6"></div>
            
            <div class="mb-8">
              <h3 class="text-lg font-medium mb-3">Description</h3>
              <p class="text-gray-300 whitespace-pre-line">{{ product.description }}</p>
            </div>
            
            <!-- Quantity Selector -->
            <div class="mb-6">
              <h3 class="text-lg font-medium mb-3">Quantity</h3>
              <div class="flex items-center">
                <button 
                  @click="decrementQuantity"
                  class="bg-gray-800 hover:bg-gray-700 text-white w-10 h-10 rounded-l flex items-center justify-center"
                >
                  -
                </button>
                <div class="bg-gray-800 text-white w-16 h-10 flex items-center justify-center border-x border-gray-700">
                  {{ quantity }}
                </div>
                <button 
                  @click="incrementQuantity"
                  class="bg-gray-800 hover:bg-gray-700 text-white w-10 h-10 rounded-r flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
            
            <Button variant="primary" class="w-full py-3" @click="addToCart">
              <ShoppingCartIcon class="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-12">
        <p class="text-xl text-red-500 mb-4">Product not found</p>
        <Button variant="primary" @click="goBack">
          Back to Products
        </Button>
      </div>
    </div>
  </LandingLayout>
</template> 