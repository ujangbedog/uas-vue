<script setup lang="ts">
import { ref, watch } from 'vue';
import Button from '@/components/ui/Button.vue';
import { LinkIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { useToast } from '@/composables/useToast';
import { isValidImageUrl } from '@/lib/imageUtils';

const props = defineProps<{
  modelValue?: string;
  label?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const toast = useToast();
const imageUrl = ref(props.modelValue || '');
const inputUrl = ref('');
const isValidating = ref(false);

watch(() => props.modelValue, (newVal) => {
  if (newVal !== imageUrl.value) {
    imageUrl.value = newVal || '';
  }
});

watch(imageUrl, (newVal) => {
  emit('update:modelValue', newVal);
});

const validateAndSetUrl = async () => {
  if (!inputUrl.value) {
    toast.error('Please enter an image URL');
    return;
  }
  
  try {
    isValidating.value = true;
    
    // Validate if URL is an image
    const isImage = await isValidImageUrl(inputUrl.value);
    if (!isImage) {
      toast.error('URL is not a valid image');
      return;
    }
    
    imageUrl.value = inputUrl.value;
    inputUrl.value = '';
    toast.success('Image URL added successfully');
  } catch (error) {
    console.error('Error validating URL:', error);
    toast.error('Failed to validate image URL');
  } finally {
    isValidating.value = false;
  }
};

const removeImage = () => {
  imageUrl.value = '';
  inputUrl.value = '';
};
</script>

<template>
  <div class="space-y-2">
    <label v-if="label" class="block text-sm font-medium text-white">{{ label }}</label>
    
    <div class="mt-1 flex flex-col items-center">
      <!-- Image preview -->
      <div 
        v-if="imageUrl" 
        class="w-full h-48 bg-gray-800 rounded-lg overflow-hidden relative mb-2"
      >
        <img 
          :src="imageUrl" 
          alt="Image" 
          class="w-full h-full object-contain"
        />
        <button 
          @click="removeImage"
          class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
          type="button"
        >
          <TrashIcon class="h-4 w-4" />
        </button>
      </div>
      
      <!-- URL input -->
      <div v-else class="w-full">
        <div class="flex gap-2">
          <input
            v-model="inputUrl"
            type="text"
            placeholder="Enter image URL"
            class="w-full px-3 py-2 bg-transparent rounded-lg border border-gray-700 text-white"
            @keyup.enter="validateAndSetUrl"
          />
          <Button
            type="button"
            variant="secondary"
            :loading="isValidating"
            :disabled="isValidating || !inputUrl"
            @click="validateAndSetUrl"
          >
            <LinkIcon v-if="!isValidating" class="h-4 w-4 mr-2" />
            <span>Add</span>
          </Button>
        </div>
        <p class="mt-1 text-xs text-gray-400">Enter a valid image URL (JPG, PNG, GIF, etc.)</p>
      </div>
      
      <!-- Image URL display -->
      <div v-if="imageUrl" class="mt-2 w-full">
        <div class="text-xs text-gray-400 truncate">
          {{ imageUrl }}
        </div>
      </div>
    </div>
  </div>
</template> 