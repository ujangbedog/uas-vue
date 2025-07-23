<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';
import Input from '@/components/ui/Input.vue';
import Select from '@/components/ui/Select.vue';
import Spinner from '@/components/ui/Spinner.vue';
import ImageUploader from '@/components/features/upload/ImageUploader.vue';
import { useToast } from '@/composables/useToast';
import { productService } from '@/services';
import type { Product } from '@/services';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const route = useRoute();
const toast = useToast();
const isLoading = ref(true);
const isSubmitting = ref(false);

const productId = Number(route.params.id);

const product = ref<Product>({
  name: '',
  price: 0,
  description: '',
  image: '',
  category: ''
});

const categories = [
  { value: 'Star Wars', label: 'Star Wars' },
  { value: 'Harry Potter', label: 'Harry Potter' },
  { value: 'Technic', label: 'Technic' },
  { value: 'City', label: 'City' },
  { value: 'Marvel', label: 'Marvel' },
  { value: 'Lord of the Rings', label: 'Lord of the Rings' }
];

const fetchProduct = async () => {
  isLoading.value = true;
  try {
    const data = await productService.getById(productId);
    product.value = data;
  } catch (error) {
    toast.error('Failed to load product');
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

const handleSubmit = async () => {
  if (!product.value.name || !product.value.price || !product.value.category) {
    toast.error('Please fill all required fields');
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    await productService.update(productId, product.value);
    toast.success('Product updated successfully');
    router.push({ name: 'ProductList' });
  } catch (error) {
    toast.error('Failed to update product');
    console.error('Error updating product:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const goBack = () => {
  router.push({ name: 'ProductList' });
};
</script>

<template>
  <DashboardLayout>
    <div class="mb-6 flex items-center">
      <Button variant="secondary" rounded class="mr-3" @click="goBack">
        <ArrowLeftIcon class="h-4 w-4" />
      </Button>
      <div>
        <h1 class="text-2xl font-bold text-white">Edit Product</h1>
        <p class="text-gray-400 mt-1">Update product information</p>
      </div>
    </div>
    
    <div v-if="isLoading" class="flex justify-center items-center py-10">
      <Spinner size="md" color="white" text="Loading product data..." />
    </div>
    
    <Card v-else bordered>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              v-model="product.name"
              label="Product Name"
              placeholder="Enter product name"
              required
            />
          </div>
          
          <div>
            <Input
              v-model="product.price"
              label="Price"
              type="number"
              min="0"
              placeholder="Enter product price"
              required
            />
          </div>
          
          <div>
            <Select
              v-model="product.category"
              label="Category"
              :options="categories"
              placeholder="Select a category"
              required
            />
          </div>
          
          <div class="md:col-span-2">
            <ImageUploader
              v-model="product.image"
              label="Product Image"
            />
          </div>
          
          <div class="md:col-span-2">
            <Input
              v-model="product.description"
              label="Description"
              type="textarea"
              rows="4"
              placeholder="Enter product description"
              required
            />
          </div>
        </div>
        
        <div class="flex justify-end">
          <Button 
            type="button" 
            variant="secondary" 
            class="mr-3"
            @click="goBack"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            :loading="isSubmitting"
          >
            Update Product
          </Button>
        </div>
      </form>
    </Card>
  </DashboardLayout>
</template> 