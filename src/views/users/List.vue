<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';
import Table from '@/components/ui/Table.vue'
import Input from '@/components/ui/Input.vue';
import ConfirmDeleteModal from '@/components/ui/ConfirmDelete.vue';
import Spinner from '@/components/ui/Spinner.vue';
import { UserIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon, ArrowPathIcon, EyeIcon } from '@heroicons/vue/24/outline';
import { useToast } from '@/composables/useToast';
import { userService } from '@/services';
import type { User } from '@/services';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();
const users = ref<User[]>([]);
const isLoadingUsers = ref(true);

const columns = [
  { key: 'avatar', label: 'Avatar' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
];

const rowsPerPageOptions = [5, 10, 25, 50];
const searchQuery = ref('');
const isSearchVisible = ref(false);

const showDeleteModal = ref(false);
const userToDelete = ref<User | null>(null);
const isDeleting = ref(false);

const fetchUsers = async () => {
  isLoadingUsers.value = true;
  try {
    users.value = await userService.getAll();
    toast.success('Users loaded successfully');
  } catch (error) {
    toast.error('Failed to load users');
    console.error('Error fetching users:', error);
  } finally {
    isLoadingUsers.value = false;
  }
};

onMounted(() => {
  fetchUsers();
});

const handleEdit = (row: any) => {
  if (row && row.id) {
    router.push({ name: 'EditUser', params: { id: row.id } });
  } else {
    toast.error('Invalid user data');
  }
};

const handleDelete = (row: any) => {
  if (!row || !row.id) return;
  
  userToDelete.value = row;
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  if (!userToDelete.value || !userToDelete.value.id) return;
  
  isDeleting.value = true;
  
  try {
    await userService.delete(userToDelete.value.id);
    toast.success(`User ${userToDelete.value.name} deleted successfully`);
    users.value = users.value.filter(u => u.id !== userToDelete.value!.id);
    showDeleteModal.value = false;
  } catch (error) {
    toast.error('Failed to delete user');
    console.error('Error deleting user:', error);
  } finally {
    isDeleting.value = false;
  }
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  userToDelete.value = null;
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
  fetchUsers();
};

const addNewUser = () => {
  router.push({ name: 'AddUser' });
};

const viewUserDetail = (row: any) => {
  if (row && row.id) {
    router.push({ name: 'DetailUser', params: { id: row.id } });
  } else {
    toast.error('Invalid user data');
  }
};
</script>

<template>
  <DashboardLayout>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-white">Users</h1>
      <p class="text-gray-400 mt-1">Manage Users</p>
    </div>
    
    <Card bordered>
      <div class="mb-4 pb-3 border-b border-gray-800/60 flex justify-between items-center">
        <h3 class="font-medium text-white">User List</h3>
        <div class="text-sm text-gray-400">Total: {{ users.length }} users</div>
      </div>
      
      <div v-if="isLoadingUsers" class="flex justify-center items-center py-10">
        <Spinner size="md" color="white" text="Loading users..." />
      </div>
      
      <Table 
        v-else
        :columns="columns" 
        :data="users" 
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
                    placeholder="Search users..."
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
              <Button variant="primary" rounded @click="addNewUser">
                <UserIcon class="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </template>
        
        <template #cell-avatar="{ row }">
          <img 
            v-if="row.avatar" 
            :src="row.avatar" 
            :alt="row.name" 
            class="w-8 h-8 rounded-full object-cover" 
          />
          <div v-else class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
            {{ row.name.charAt(0).toUpperCase() }}
          </div>
        </template>
        
        <template #cell-name="{ value }">
          <div class="font-medium text-white">{{ value }}</div>
        </template>
        
        <template #actions="{ row }">
          <div class="flex space-x-4">
            <button 
              @click="viewUserDetail(row)"
              class="text-white hover:text-blue-400 transition-all hover:scale-110"
              title="View user details"
            >
              <EyeIcon class="h-5 w-5" />
            </button>
            <button 
              @click="handleEdit(row)"
              class="text-white hover:text-blue-400 transition-all hover:scale-110"
              title="Edit user"
            >
              <PencilIcon class="h-5 w-5" />
            </button>
            <button 
              @click="handleDelete(row)"
              class="text-white hover:text-red-500 transition-all hover:scale-110"
              title="Delete user"
            >
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </template>
      </Table>
    </Card>
    
    <ConfirmDeleteModal
      :show="showDeleteModal"
      :item-name="userToDelete?.name || 'this user'"
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