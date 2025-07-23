<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { ArrowUpIcon, ArrowDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import Input from './Input.vue';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

const props = defineProps<{
  columns: Column[];
  data: Record<string, any>[];
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  searchable?: boolean;
  paginated?: boolean;
  rowsPerPageOptions?: number[];
  initialRowsPerPage?: number;
  searchValue?: string;
}>();

const emit = defineEmits(['sort', 'search', 'page-change', 'rows-per-page-change']);

const internalSearchQuery = ref('');
const sortKey = ref('');
const sortDirection = ref<'asc' | 'desc' | ''>('');
const currentPage = ref(1);
const rowsPerPage = ref(props.initialRowsPerPage || 5);

const searchQuery = computed(() => {
  return props.searchValue !== undefined ? props.searchValue : internalSearchQuery.value;
});

const tableClasses = computed(() => [
  'min-w-full divide-y divide-gray-800/60 rounded-lg overflow-hidden',
  props.bordered ? 'border border-gray-800/60' : '',
]);

const trClasses = computed(() => [
  props.hoverable ? 'hover:bg-black/50 transition-colors duration-150' : '',
]);

const tdClasses = computed(() => [
  'px-6 py-4 whitespace-nowrap text-sm text-gray-200',
  props.compact ? 'px-3 py-2' : '',
]);

const thClasses = computed(() => [
  'px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider',
  props.compact ? 'px-3 py-2' : '',
]);

const filteredData = computed(() => {
  let result = [...props.data];
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(item => {
      return Object.keys(item).some(key => {
        const value = item[key];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(query);
      });
    });
  }
  
  if (sortKey.value && sortDirection.value) {
    result.sort((a, b) => {
      const aValue = a[sortKey.value];
      const bValue = b[sortKey.value];
      
      if (aValue === bValue) return 0;
      
      const comparison = aValue > bValue ? 1 : -1;
      return sortDirection.value === 'asc' ? comparison : -comparison;
    });
  }
  
  return result;
});

const paginatedData = computed(() => {
  if (!props.paginated) return filteredData.value;
  
  const startIndex = (currentPage.value - 1) * rowsPerPage.value;
  return filteredData.value.slice(startIndex, startIndex + rowsPerPage.value);
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / rowsPerPage.value);
});

const pageNumbers = computed(() => {
  const pages = [];
  const maxPagesToShow = 5;
  
  if (totalPages.value <= maxPagesToShow) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    
    const startPage = Math.max(2, currentPage.value - 1);
    const endPage = Math.min(totalPages.value - 1, currentPage.value + 1);
    
    if (startPage > 2) {
      pages.push('...');
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    if (endPage < totalPages.value - 1) {
      pages.push('...');
    }
    
    pages.push(totalPages.value);
  }
  
  return pages;
});

const handleSort = (column: Column) => {
  if (!column.sortable) return;
  
  if (sortKey.value === column.key) {
    if (sortDirection.value === 'asc') {
      sortDirection.value = 'desc';
    } else if (sortDirection.value === 'desc') {
      sortDirection.value = '';
      sortKey.value = '';
    } else {
      sortDirection.value = 'asc';
    }
  } else {
    sortKey.value = column.key;
    sortDirection.value = 'asc';
  }
  
  if (props.paginated) {
    currentPage.value = 1;
  }
  
  emit('sort', { key: sortKey.value, direction: sortDirection.value });
};

const changePage = (page: number) => {
  currentPage.value = page;
  emit('page-change', page);
};

const changeRowsPerPage = (event: Event) => {
  const select = event.target as HTMLSelectElement;
  rowsPerPage.value = parseInt(select.value);
  currentPage.value = 1;
  emit('rows-per-page-change', rowsPerPage.value);
};

const handleSearchInput = (value: string | number) => {
  internalSearchQuery.value = value.toString();
  
  if (props.paginated) {
    currentPage.value = 1;
  }
  
  emit('search', internalSearchQuery.value);
};

watch(() => props.searchValue, (newValue) => {
  if (newValue !== undefined) {
    if (props.paginated) {
      currentPage.value = 1;
    }
  }
}, { immediate: true });

watch(() => props.data.length, () => {
  if (props.paginated && currentPage.value > totalPages.value) {
    currentPage.value = Math.max(1, totalPages.value);
  }
});
</script>

<template>
  <div>
    <div v-if="props.searchable" class="mb-4">
      <div class="relative">
        <slot name="search-area">
          <Input
            :modelValue="searchQuery"
            type="search"
            placeholder="Search..."
            @update:modelValue="handleSearchInput"
            showCount
            class="mb-0"
          >
            <template #counter>
              {{ filteredData.length }} results
            </template>
          </Input>
        </slot>
      </div>
    </div>
    
    <div class="overflow-x-auto rounded-lg shadow-lg">
      <table :class="tableClasses">
        <thead class="bg-black/70">
          <tr>
            <th 
              v-for="column in columns" 
              :key="column.key"
              scope="col"
              :class="[thClasses, column.sortable ? 'cursor-pointer hover:bg-black/80' : '']"
              @click="handleSort(column)"
              style="font-weight: bold;"
            >
              <div class="flex items-center space-x-1">
                <span>{{ column.label }}</span>
                <span v-if="column.sortable && sortKey === column.key" class="inline-block">
                  <ArrowUpIcon v-if="sortDirection === 'asc'" class="h-4 w-4" />
                  <ArrowDownIcon v-if="sortDirection === 'desc'" class="h-4 w-4" />
                </span>
              </div>
            </th>
            <th v-if="$slots.actions" scope="col" :class="thClasses">
              <span>Actions</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-black/60 backdrop-blur-sm divide-y divide-gray-800/60">
          <tr 
            v-for="(row, index) in paginatedData" 
            :key="index" 
            :class="[trClasses, striped && index % 2 === 1 ? 'bg-black/40' : '']"
          >
            <td 
              v-for="column in columns" 
              :key="column.key"
              :class="tdClasses"
            >
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                {{ row[column.key] }}
              </slot>
            </td>
            <td v-if="$slots.actions" :class="tdClasses">
              <slot name="actions" :row="row"></slot>
            </td>
          </tr>
          <tr v-if="filteredData.length === 0">
            <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="px-6 py-4 text-center text-gray-400">
              No data found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div v-if="props.paginated && totalPages > 0" class="mt-4 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
      <div class="text-sm text-gray-400">
        Showing {{ Math.min((currentPage - 1) * rowsPerPage + 1, filteredData.length) }} to 
        {{ Math.min(currentPage * rowsPerPage, filteredData.length) }} of 
        {{ filteredData.length }} entries
        <span v-if="searchQuery" class="ml-2">(filtered from {{ data.length }} total entries)</span>
      </div>
      
      <div class="flex items-center space-x-2">
        <div v-if="props.rowsPerPageOptions && props.rowsPerPageOptions.length" class="flex items-center space-x-2">
          <label for="rows-per-page" class="text-sm text-gray-400">Show</label>
          <select 
            id="rows-per-page" 
            :value="rowsPerPage"
            @change="changeRowsPerPage"
            class="bg-black/40 border border-gray-800/60 rounded text-white text-sm py-1 px-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            <option v-for="option in props.rowsPerPageOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
          <span class="text-sm text-gray-400">entries</span>
        </div>
        
        <div class="flex space-x-1">
          <button 
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            :class="[
              'px-2 py-1 rounded border border-gray-800/60 focus:outline-none',
              currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-black/50'
            ]"
          >
            <ChevronLeftIcon class="h-4 w-4" />
          </button>
          
          <button 
            v-for="(page, index) in pageNumbers" 
            :key="index"
            @click="typeof page === 'number' ? changePage(page) : null"
            :disabled="typeof page !== 'number'"
            :class="[
              'px-3 py-1 rounded border border-gray-800/60 focus:outline-none',
              page === currentPage ? 'bg-white text-black' : 'text-white hover:bg-black/50',
              typeof page !== 'number' ? 'cursor-default' : ''
            ]"
          >
            {{ page }}
          </button>
          
          <button 
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            :class="[
              'px-2 py-1 rounded border border-gray-800/60 focus:outline-none',
              currentPage === totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-black/50'
            ]"
          >
            <ChevronRightIcon class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template> 