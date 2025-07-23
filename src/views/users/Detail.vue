<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';
import Spinner from '@/components/ui/Spinner.vue';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/vue/24/outline';
import { useToast } from '@/composables/useToast';
import { userService } from '@/services';
import type { User } from '@/services';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const user = ref<User | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  await fetchUserData();
});

const fetchUserData = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    const userId = Number(route.params.id);
    if (isNaN(userId)) {
      throw new Error('Invalid user ID');
    }
    
    user.value = await userService.getById(userId);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load user details';
    toast.error(error.value);
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  router.push({ name: 'UserList' });
};

const editUser = () => {
  if (user.value && user.value.id) {
    router.push({ name: 'EditUser', params: { id: user.value.id } });
  }
};
</script>

<template>
  <DashboardLayout>
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center">
        <Button 
          variant="secondary" 
          rounded 
          @click="goBack" 
          class="mr-4"
          title="Back to users"
        >
          <ArrowLeftIcon class="h-5 w-5" />
        </Button>
        <div>
          <h1 class="text-2xl font-bold text-white">User Details</h1>
          <p class="text-gray-400 mt-1">View detailed information about the user</p>
        </div>
      </div>
      
      <Button 
        v-if="user" 
        variant="primary" 
        @click="editUser"
        title="Edit user"
      >
        <PencilIcon class="h-5 w-5 mr-2" />
        Edit User
      </Button>
    </div>
    
    <div v-if="isLoading" class="flex justify-center items-center py-10">
      <Spinner size="md" color="white" text="Loading user details..." />
    </div>
    
    <div v-else-if="error" class="bg-red-900/30 border border-red-500/50 rounded-lg p-6 text-center">
      <p class="text-red-400 mb-4">{{ error }}</p>
      <Button variant="secondary" @click="goBack">Back to Users</Button>
    </div>
    
    <div v-else-if="user" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <Card bordered class="md:col-span-1">
        <div class="flex flex-col items-center text-center">
          <div class="w-full aspect-square mb-4">
            <img 
              v-if="user.avatar" 
              :src="user.avatar" 
              :alt="user.name" 
              class="w-full h-full object-cover rounded-lg border-4 border-gray-700" 
            />
            <div 
              v-else 
              class="w-full h-full rounded-lg bg-gray-700 flex items-center justify-center text-white text-8xl font-bold"
            >
              {{ user.name.charAt(0).toUpperCase() }}
            </div>
          </div>
        </div>
      </Card>
      
      <Card bordered class="md:col-span-2">
        
        <div class="space-y-6">
          <div class="grid grid-cols-1 gap-4">
            <div class="bg-gray-800/50 rounded-lg p-4">
              <p class="text-sm text-gray-400 mb-1">User ID</p>
              <p class="text-white text-lg font-medium">{{ user.id }}</p>
            </div>
            
            <div class="bg-gray-800/50 rounded-lg p-4">
              <p class="text-sm text-gray-400 mb-1">Name</p>
              <p class="text-white text-lg font-medium">{{ user.name }}</p>
            </div>
            
            <div class="bg-gray-800/50 rounded-lg p-4">
              <p class="text-sm text-gray-400 mb-1">Email Address</p>
              <p class="text-white text-lg font-medium">{{ user.email }}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
    
    <div v-else class="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-6 text-center">
      <p class="text-yellow-400 mb-4">User not found</p>
      <Button variant="secondary" @click="goBack">Back to Users</Button>
    </div>
  </DashboardLayout>
</template> 