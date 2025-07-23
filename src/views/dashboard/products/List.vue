<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';
import Table from '@/components/ui/Table.vue'
import Input from '@/components/ui/Input.vue';
import ConfirmDeleteModal from '@/components/ui/ConfirmDelete.vue';
import Spinner from '@/components/ui/Spinner.vue';
import { ShoppingBagIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon, ArrowPathIcon, EyeIcon } from '@heroicons/vue/24/outline';
import { useToast } from '@/composables/useToast';
import { productService } from '@/services';
import type { Product } from '@/services';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();
const products = ref<Product[]>([]);
const isLoadingProducts = ref(true);

const columns = [
  { key: 'image', label: 'Image' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'price', label: 'Price', sortable: true },
  { key: 'category', label: 'Category', sortable: true },
];

const rowsPerPageOptions = [5, 10, 25, 50];
const searchQuery = ref('');
const isSearchVisible = ref(false);

const showDeleteModal = ref(false);
const productToDelete = ref<Product | null>(null);
const isDeleting = ref(false);

const fetchProducts = async () => {
  isLoadingProducts.value = true;
  try {
    products.value = await productService.getAll();
    toast.success('Products loaded successfully');
  } catch (error) {
    toast.error('Failed to load products');
    console.error('Error fetching products:', error);
  } finally {
    isLoadingProducts.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});

const handleEdit = (row: any) => {
  if (row && row.id) {
    router.push({ name: 'EditProduct', params: { id: row.id } });
  } else {
    toast.error('Invalid product data');
  }
};

const handleDelete = (row: any) => {
  if (!row || !row.id) return;
  
  productToDelete.value = row;
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  if (!productToDelete.value || !productToDelete.value.id) return;
  
  isDeleting.value = true;
  
  try {
    await productService.delete(productToDelete.value.id);
    toast.success(`Product ${productToDelete.value.name} deleted successfully`);
    products.value = products.value.filter(p => p.id !== productToDelete.value!.id);
    showDeleteModal.value = false;
  } catch (error) {
    toast.error('Failed to delete product');
    console.error('Error deleting product:', error);
  } finally {
    isDeleting.value = false;
  }
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  productToDelete.value = null;
};

const updateSearchQuery = (value: string | number) => {
  searchQuery.value = typeof value === 'string' ? value : value.toString();
};

const toggleSearch = () => {
  isSearchVisible.value = !isSearchVisible.value;
  if (!isSearchVisible.value) {
    searchQuery.value = '';
  }
};

const refreshData = () => {
  fetchProducts();
};

const addNewProduct = () => {
  router.push({ name: 'AddProduct' });
};

const viewProductDetail = (row: any) => {
  if (row && row.id) {
    router.push({ name: 'DetailProduct', params: { id: row.id } });
  } else {
    toast.error('Invalid product data');
  }
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
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-white">Products</h1>
      <p class="text-gray-400 mt-1">Manage Products</p>
    </div>
    
    <Card bordered>
      <div class="mb-4 pb-3 border-b border-gray-800/60 flex justify-between items-center">
        <h3 class="font-medium text-white">Product List</h3>
        <div class="text-sm text-gray-400">Total: {{ products.length }} products</div>
      </div>
      
      <div v-if="isLoadingProducts" class="flex justify-center items-center py-10">
        <Spinner size="md" color="white" text="Loading products..." />
      </div>
      
      <Table 
        v-else
        :columns="columns" 
        :data="products" 
        striped 
        hoverable
        bordered
        searchable
        paginated
        :rowsPerPageOptions="rowsPerPageOptions"
        :initialRowsPerPage="5"
        :searchValue="searchQuery"
      >
        <template #search-area>
          <div class="flex items-center space-x-2">
            <div class="flex-1 relative overflow-hidden transition-all duration-300" :class="{ 'w-0 flex-grow-0': !isSearchVisible, 'flex-1': isSearchVisible }">
              <transition name="slide-right">
                <div v-if="isSearchVisible" class="w-full">
                  <Input
                    v-model="searchQuery"
                    type="search"
                    placeholder="Search products..."
                    @update:modelValue="updateSearchQuery"
                    class="focus:outline-none focus:ring-1 focus:ring-offset-1"
                  />
                </div>
              </transition>
            </div>
            <div class="flex items-center space-x-2 flex-shrink-0">
              <Button variant="secondary" rounded @click="toggleSearch">
                <MagnifyingGlassIcon class="h-5 w-5" />
              </Button>
              <Button variant="secondary" rounded @click="refreshData">
                <ArrowPathIcon class="h-5 w-5" />
              </Button>
              <Button variant="primary" rounded @click="addNewProduct">
                <ShoppingBagIcon class="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
        </template>
        
        <template #cell-image="{ row }">
          <img 
            v-if="row.image" 
            :src="row.image" 
            :alt="row.name" 
            class="w-12 h-12 rounded object-cover" 
          />
          <div v-else class="w-12 h-12 rounded bg-gray-700 flex items-center justify-center text-white">
            <ShoppingBagIcon class="h-6 w-6" />
          </div>
        </template>
        
        <template #cell-name="{ value }">
          <div class="font-medium text-white">{{ value }}</div>
        </template>
        
        <template #cell-price="{ row }">
          <div class="text-white">{{ formatPrice(row.price) }}</div>
        </template>
        
        <template #cell-category="{ value }">
          <div class="text-white">{{ value }}</div>
        </template>
        
        <template #actions="{ row }">
          <div class="flex space-x-4">
            <button 
              @click="viewProductDetail(row)"
              class="text-white hover:text-blue-400 transition-all hover:scale-110"
              title="View product details"
            >
              <EyeIcon class="h-5 w-5" />
            </button>
            <button 
              @click="handleEdit(row)"
              class="text-white hover:text-blue-400 transition-all hover:scale-110"
              title="Edit product"
            >
              <PencilIcon class="h-5 w-5" />
            </button>
            <button 
              @click="handleDelete(row)"
              class="text-white hover:text-red-500 transition-all hover:scale-110"
              title="Delete product"
            >
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </template>
      </Table>
    </Card>
    
    <ConfirmDeleteModal
      :show="showDeleteModal"
      :item-name="productToDelete?.name || 'this product'"
      :loading="isDeleting"
      @close="cancelDelete"
      @confirm="confirmDelete"
    />
  </DashboardLayout>
</template>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style> 