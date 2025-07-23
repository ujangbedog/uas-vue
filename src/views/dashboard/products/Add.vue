<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';
import Input from '@/components/ui/Input.vue';
import Select from '@/components/ui/Select.vue';
import ImageUploader from '@/components/features/upload/ImageUploader.vue';
import { useToast } from '@/composables/useToast';
import { productService } from '@/services';
import type { Product } from '@/services';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const toast = useToast();
const isSubmitting = ref(false);

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

const handleSubmit = async () => {
  if (!product.value.name || !product.value.price || !product.value.category) {
    toast.error('Please fill all required fields');
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    await productService.create(product.value);
    toast.success('Product created successfully');
    router.push({ name: 'ProductList' });
  } catch (error) {
    toast.error('Failed to create product');
    console.error('Error creating product:', error);
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
        <h1 class="text-2xl font-bold text-white">Add New Product</h1>
        <p class="text-gray-400 mt-1">Create a new product in the catalog</p>
      </div>
    </div>
    
    <Card bordered>
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
            Create Product
          </Button>
        </div>
      </form>
    </Card>
  </DashboardLayout>
</template> 