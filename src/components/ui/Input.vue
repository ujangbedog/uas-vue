<script setup lang="ts">
import { computed, ref } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
  modelValue: string | number | undefined;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  id?: string;
  name?: string;
  autocomplete?: string;
  icon?: boolean | string;
  iconPosition?: 'left' | 'right';
  showCount?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
}>();

const inputId = computed(() => props.id || `input-${Math.random().toString(36).substring(2, 9)}`);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', props.type === 'number' ? Number(target.value) : target.value);
};

const handleFocus = () => emit('focus');
const handleBlur = () => emit('blur');

const hasLeftIcon = computed(() => props.icon !== false && (props.icon || props.type === 'search'));
const hasRightIcon = computed(() => props.iconPosition === 'right' && props.icon !== false && props.icon);

const inputRef = ref<HTMLInputElement | null>(null);
defineExpose({
  focus: () => inputRef.value?.focus(),
});
</script>

<template>
  <div :class="[label ? 'mb-4' : '']">
    <label 
      v-if="label" 
      :for="inputId" 
      class="block text-sm font-medium text-gray-300 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <div class="relative w-full">
      <div v-if="hasLeftIcon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon v-if="type === 'search' || icon === true" class="h-5 w-5 text-gray-500" />
        <slot v-else name="icon"></slot>
      </div>

      <input 
        ref="inputRef"
        :id="inputId"
        :name="name"
        :type="type || 'text'"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :autocomplete="autocomplete"
        class="block w-full border rounded-md bg-transparent text-white placeholder-gray-400"
        :class="[
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : 'border-gray-800 focus:border-gray-600',
          disabled ? 'opacity-60 cursor-not-allowed' : '',
          hasLeftIcon ? 'pl-10' : 'pl-3',
          hasRightIcon ? 'pr-10' : 'pr-3',
          'py-2 focus:outline-none focus:ring-1 focus:ring-offset-1'
        ]"
        @input="updateValue"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <div 
        v-if="hasRightIcon || (showCount && modelValue !== undefined && modelValue.toString().length > 0)" 
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <slot v-if="hasRightIcon" name="icon-right"></slot>
        <span v-else-if="showCount" class="text-xs text-gray-400">
          <slot name="counter">
            {{ modelValue?.toString().length }}
          </slot>
        </span>
      </div>
    </div>

    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
  </div>
</template>
