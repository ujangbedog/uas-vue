<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import Card from '@/components/ui/Card.vue';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { useToast } from '@/composables/useToast';
import { userService } from '@/services';
import type { User } from '@/services';

const router = useRouter();
const toast = useToast();

const isSubmitting = ref(false);

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
  if (!validateForm()) {
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
    
    await userService.create(userData);
    toast.success(`User ${userData.name} created successfully`);
    
    router.push({ name: 'UserList' });
  } catch (error) {
    toast.error('Failed to create user');
    console.error('Error creating user:', error);
    isSubmitting.value = false;
  }
};

const goBack = () => {
  router.push({ name: 'UserList' });
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
        <h1 class="text-2xl font-bold text-white">Create User</h1>
        <p class="text-gray-400 mt-1">Add a new user to the system</p>
      </div>
    </div>
    
    <Card bordered>
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
        
        <div class="flex justify-end space-x-3 mt-6">
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
            Create User
            <template #loading>
              Creating...
            </template>
          </Button>
        </div>
      </form>
    </Card>
  </DashboardLayout>
</template>
