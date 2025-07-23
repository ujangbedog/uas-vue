<script setup lang="ts">
import { computed } from 'vue';

interface Option {
  value: string | number;
  label: string;
}

const props = defineProps<{
  modelValue: string | number | undefined;
  options: Option[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  id?: string;
  name?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const inputId = computed(() => props.id || `select-${Math.random().toString(36).substring(2, 9)}`);

const updateValue = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="mb-4">
    <label 
      v-if="label" 
      :for="inputId" 
      class="block text-sm font-medium text-gray-300 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    
    <select
      :id="inputId"
      :name="name"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      class="w-full px-3 py-2 bg-transparent border rounded-md text-white focus:bg-white focus:text-black focus:outline-none focus:ring-1 focus:ring-gray-500 transition-colors appearance-none"
      :class="[
        error ? 'border-red-500' : 'border-gray-700',
        disabled ? 'opacity-60 cursor-not-allowed' : ''
      ]"
      @change="updateValue"
    >
      <option v-if="placeholder" value=""  disabled selected class="text-gray-400">{{ placeholder }}</option>
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
  </div>
</template> 