<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';
import Spinner from '@/components/ui/Spinner.vue';
import { useToast } from '@/composables/useToast';
import { productService } from '@/services';
import type { Product } from '@/services';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const route = useRoute();
const toast = useToast();
const isLoading = ref(true);
const product = ref<Product | null>(null);

const productId = Number(route.params.id);

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
    router.push({ name: 'ProductList' });
    return;
  }
  
  fetchProduct();
});

const goBack = () => {
  router.push({ name: 'ProductList' });
};

const editProduct = () => {
  router.push({ name: 'EditProduct', params: { id: productId } });
};

// Format price as currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};
</script>

<template>
  <DashboardLayout>
    <div class="mb-6 flex items-center">
      <Button variant="secondary" rounded class="mr-3" @click="goBack">
        <ArrowLeftIcon class="h-4 w-4" />
      </Button>
      <div>
        <h1 class="text-2xl font-bold text-white">Product Details</h1>
        <p class="text-gray-400 mt-1">View product information</p>
      </div>
    </div>
    
    <div v-if="isLoading" class="flex justify-center items-center py-10">
      <Spinner size="md" color="white" text="Loading product details..." />
    </div>
    
    <Card v-else-if="product" bordered>
      <div class="flex justify-between items-start mb-6">
        <h2 class="text-xl font-bold text-white">{{ product.name }}</h2>
        <Button variant="primary" rounded @click="editProduct">
          <PencilIcon class="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-1">
          <div class="rounded-lg overflow-hidden bg-gray-800 aspect-square">
            <img 
              v-if="product.image" 
              :src="product.image" 
              :alt="product.name" 
              class="w-full h-full object-cover" 
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400">
              No Image
            </div>
          </div>
        </div>
        
        <div class="md:col-span-2 space-y-4">
          <div>
            <h3 class="text-sm font-medium text-gray-400">Price</h3>
            <p class="text-lg font-semibold text-white">{{ formatPrice(product.price) }}</p>
          </div>
          
          <div>
            <h3 class="text-sm font-medium text-gray-400">Category</h3>
            <p class="text-white">{{ product.category }}</p>
          </div>
          
          <div>
            <h3 class="text-sm font-medium text-gray-400">Description</h3>
            <p class="text-white whitespace-pre-line">{{ product.description }}</p>
          </div>
        </div>
      </div>
    </Card>
    
    <div v-else class="text-center py-10">
      <p class="text-red-500">Product not found</p>
      <Button variant="primary" class="mt-4" @click="goBack">
        Back to Products
      </Button>
    </div>
  </DashboardLayout>
</template> 