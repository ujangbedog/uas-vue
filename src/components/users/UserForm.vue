<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import { useToast } from '@/composables/useToast';
import type { User } from '@/services';

interface Props {
  user?: User;
  isEditing?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  user: undefined,
  isEditing: false
});

const emit = defineEmits<{
  (e: 'submit', user: User): void;
  (e: 'cancel'): void;
}>();

const toast = useToast();

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

const isSubmitting = ref(false);

const loadingText = computed(() => props.isEditing ? 'Updating...' : 'Creating...');

watch(() => props.user, (newUser) => {
  if (newUser) {
    formData.name = newUser.name;
    formData.email = newUser.email;
    formData.avatar = newUser.avatar || '';
  }
}, { immediate: true });

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
    
    emit('submit', userData);
  } catch (error) {
    toast.error('An error occurred. Please try again.');
    isSubmitting.value = false;
  }
};

const handleCancel = () => {
  emit('cancel');
};

const resetSubmitting = () => {
  isSubmitting.value = false;
};

defineExpose({
  resetSubmitting
});
</script>

<template>
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
        @click="handleCancel"
        :disabled="isSubmitting"
      >
        Cancel
      </Button>
      
      <Button 
        variant="primary" 
        @click="handleSubmit"
        :loading="isSubmitting"
        :disabled="isSubmitting"
      >
        {{ props.isEditing ? 'Update' : 'Create' }} User
        <template #loading>
          {{ loadingText }}
        </template>
      </Button>
    </div>
  </form>
</template> 