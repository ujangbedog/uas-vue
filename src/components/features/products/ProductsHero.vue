<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { productService } from '@/services';

const productCount = ref(0);
const isLoading = ref(true);

const fetchProductCount = async () => {
  try {
    const products = await productService.getAll();
    productCount.value = products.length;
  } catch (error) {
    console.error('Error fetching product count:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchProductCount();
});

const countText = computed(() => {
  if (isLoading.value) return 'Loading...';
  return `${productCount.value} sets available`;
});
</script>

<template>
  <section class="py-8 px-4 border-b border-gray-800 bg-gray-900">
    <div class="container mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <h1 class="text-3xl font-bold mb-2 md:mb-0">LEGO Collection</h1>
        <div class="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
          <span class="text-sm font-medium">{{ countText }}</span>
        </div>
      </div>
    </div>
  </section>
</template> 