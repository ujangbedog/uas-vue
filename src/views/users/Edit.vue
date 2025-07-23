<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import Card from '@/components/ui/Card.vue';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import Spinner from '@/components/ui/Spinner.vue';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { useToast } from '@/composables/useToast';
import { userService } from '@/services';
import type { User } from '@/services';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const userId = ref<number | null>(null);
const isLoading = ref(true);
const isSubmitting = ref(false);
const error = ref<string | null>(null);

const formData = reactive<User>({
  name: '',
  email: '',
  avatar: ''
});

const errors = reactive({
  name: '',
  email: '',
  avatar: ''
});

onMounted(async () => {
  if (route.params.id) {
    userId.value = Number(route.params.id);
    await fetchUserData();
  } else {
    error.value = 'No user ID provided';
    isLoading.value = false;
  }
});

const fetchUserData = async () => {
  if (!userId.value) return;
  
  isLoading.value = true;
  error.value = null;
  
  try {
    const userData = await userService.getById(userId.value);
    formData.name = userData.name;
    formData.email = userData.email;
    formData.avatar = userData.avatar || '';
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load user data';
    toast.error(error.value);
  } finally {
    isLoading.value = false;
  }
};

const validateForm = (): boolean => {
  let isValid = true;
  
  errors.name = '';
  errors.email = '';
  errors.avatar = '';
  
  if (!formData.name.trim()) {
    errors.name = 'Name is required';
    isValid = false;
  }
  
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }
  
  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm() || !userId.value) {
    toast.error('Please correct the errors in the form');
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    const userData: User = {
      name: formData.name,
      email: formData.email,
    };
    
    if (formData.avatar) {
      userData.avatar = formData.avatar;
    }
    
    await userService.update(userId.value, userData);
    toast.success(`User ${userData.name} updated successfully`);
    
    router.push({ name: 'UserList' });
  } catch (error) {
    toast.error('Failed to update user');
    console.error('Error updating user:', error);
    isSubmitting.value = false;
  }
};

const goBack = () => {
  router.push({ name: 'UserList' });
};

const viewUserDetails = () => {
  if (userId.value) {
    router.push({ name: 'DetailUser', params: { id: userId.value } });
  }
};
</script>

<template>
  <DashboardLayout>
    <div class="mb-6 flex items-center">
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
        <h1 class="text-2xl font-bold text-white">Edit User</h1>
        <p class="text-gray-400 mt-1">Update user information</p>
      </div>
    </div>
    
    <div v-if="isLoading" class="flex justify-center items-center py-10">
      <Spinner size="md" color="white" text="Loading user data..." />
    </div>
    
    <div v-else-if="error" class="bg-red-900/30 border border-red-500/50 rounded-lg p-6 text-center">
      <p class="text-red-400 mb-4">{{ error }}</p>
      <Button variant="secondary" @click="goBack">Back to Users</Button>
    </div>
    
    <Card v-else bordered>
      <form @submit.prevent="handleSubmit">
        <Input
          v-model="formData.name"
          label="Name"
          placeholder="Enter user name"
          required
          :error="errors.name"
          :icon="false"
        />
        
        <Input
          v-model="formData.email"
          label="Email"
          type="email"
          placeholder="Enter email address"
          required
          :error="errors.email"
          :icon="false"
        />
        
        <Input
          v-model="formData.avatar"
          label="Avatar URL"
          placeholder="Enter avatar URL"
          :error="errors.avatar"
          :icon="false"
        />
        
        <div class="flex justify-between mt-6">
          <Button 
            variant="secondary" 
            @click="viewUserDetails"
            type="button"
          >
            View User Details
          </Button>
          
          <div class="flex space-x-3">
            <Button 
              variant="secondary" 
              @click="goBack"
              :disabled="isSubmitting"
              type="button"
            >
              Cancel
            </Button>
            
            <Button 
              variant="primary" 
              type="submit"
              :loading="isSubmitting"
              :disabled="isSubmitting"
            >
              Update User
              <template #loading>
                Updating...
              </template>
            </Button>
          </div>
        </div>
      </form>
    </Card>
  </DashboardLayout>
</template>
