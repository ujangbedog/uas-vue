<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Button from '@/components/ui/Button.vue';
import { productService } from '@/services';
import type { Product } from '@/services/productService';
import { useToast } from '@/composables/useToast';
import { useCartStore } from '@/stores/cartStore';
import Spinner from '@/components/ui/Spinner.vue';

const props = defineProps<{
  selectedCategory?: string;
}>();

const router = useRouter();
const toast = useToast();
const cartStore = useCartStore();
const isLoading = ref(true);
const apiProducts = ref<Product[]>([]);
const categories = ref(['All']);
const selectedCategory = ref(props.selectedCategory || 'All');

// Format price as currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

const fetchProducts = async () => {
  isLoading.value = true;
  try {
    const products = await productService.getAll();
    apiProducts.value = products;
    
    // Extract unique categories from products
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    categories.value = ['All', ...uniqueCategories];
  } catch (error) {
    console.error('Error fetching products:', error);
    toast.error('Failed to load products');
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'All') {
    return apiProducts.value;
  }
  return apiProducts.value.filter(product => product.category === selectedCategory.value);
});

const setCategory = (category: string) => {
  selectedCategory.value = category;
};

const viewProductDetails = (productId: number) => {
  router.push({ name: 'ProductDetail', params: { id: productId } });
};

const addToCart = (product: Product) => {
  cartStore.addToCart(product);
  toast.success(`${product.name} added to cart`);
};
</script>

<template>
  <section class="py-8">
    <div class="container mx-auto px-4">
      
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <Spinner size="lg" color="white" text="Loading products..." />
      </div>
      
      <div v-else>
        <!-- Category Filter -->
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="setCategory(category)"
            class="px-4 py-2 rounded-full transition-colors"
            :class="selectedCategory === category ? 'bg-white text-black' : 'bg-white/10 text-gray-300 hover:bg-white/20'"
          >
            {{ category }}
          </button>
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="text-center py-12">
          <p class="text-xl text-gray-400">No products found in this category.</p>
        </div>
        
        <!-- Products Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="product in filteredProducts" 
            :key="product.id"
            class="bg-black bg-opacity-5 rounded-lg overflow-hidden border border-gray-800 transition-all duration-300 hover:border-white/30 hover:shadow-lg"
          >
            <div 
              class="w-full h-48 bg-gray-800 overflow-hidden cursor-pointer"
              @click="product.id && viewProductDetails(product.id)"
            >
              <img 
                v-if="product.image" 
                :src="product.image" 
                :alt="product.name" 
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-600">
                No Image Available
              </div>
            </div>
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 
                    class="text-xl font-bold mb-1 cursor-pointer hover:text-blue-400 transition-colors"
                    @click="product.id && viewProductDetails(product.id)"
                  >
                    {{ product.name }}
                  </h3>
                  <span class="text-xs bg-white/10 px-2 py-1 rounded">{{ product.category }}</span>
                </div>
                <div class="text-lg font-bold">{{ formatPrice(product.price) }}</div>
              </div>
              <p class="text-gray-400 text-sm mb-6 line-clamp-2">{{ product.description }}</p>
              <div class="flex space-x-3">
                <Button 
                  variant="primary" 
                  size="sm" 
                  class="flex-1"
                  @click="product.id && viewProductDetails(product.id)"
                >
                  View Details
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  class="flex-1"
                  @click="addToCart(product)"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template> 