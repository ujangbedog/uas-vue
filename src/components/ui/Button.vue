<script setup lang="ts">
import { computed } from 'vue';
import Spinner from './Spinner.vue';

const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  outlined?: boolean;
  rounded?: boolean;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
}>();

const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-white text-black hover:bg-gray-200 hover:shadow-md hover:scale-105 active:scale-100',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow hover:scale-105 active:scale-100',
    success: 'bg-green-500 text-white hover:bg-green-600 hover:shadow hover:scale-105 active:scale-100',
    danger: 'bg-red-500 text-white hover:bg-red-600 hover:shadow hover:scale-105 active:scale-100',
    warning: 'bg-yellow-400 text-gray-900 hover:bg-yellow-500 hover:shadow hover:scale-105 active:scale-100',
    info: 'bg-gray-100 text-gray-800 hover:bg-gray-300 hover:shadow hover:scale-105 active:scale-100',
  };

  const outlinedVariants = {
    primary: 'border-2 border-white text-white hover:bg-white/20 hover:shadow hover:scale-105 active:scale-100',
    secondary: 'border-2 border-gray-300 text-gray-300 hover:bg-gray-700 hover:shadow hover:scale-105 active:scale-100',
    success: 'border-2 border-green-500 text-green-500 hover:bg-green-500/20 hover:shadow hover:scale-105 active:scale-100',
    danger: 'border-2 border-red-500 text-red-500 hover:bg-red-500/20 hover:shadow hover:scale-105 active:scale-100',
    warning: 'border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400/20 hover:shadow hover:scale-105 active:scale-100',
    info: 'border-2 border-gray-300 text-gray-300 hover:bg-gray-300/20 hover:shadow hover:scale-105 active:scale-100',
  };

  return props.outlined 
    ? outlinedVariants[props.variant || 'primary'] 
    : variants[props.variant || 'primary'];
});

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'py-1 px-2 text-xs',
    md: 'py-1.5 px-3 text-sm',
    lg: 'py-2 px-4 text-base',
  };
  return sizes[props.size || 'md'];
});

const buttonClasses = computed(() => [
  'inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-black focus:ring-gray-400',
  variantClasses.value,
  sizeClasses.value,
  props.rounded ? 'rounded-lg' : 'rounded',
  props.block ? 'w-full' : '',
  props.disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
]);
</script>

<template>
  <button 
    :class="buttonClasses" 
    :disabled="disabled || loading"
  >
    <div v-if="loading" class="flex items-center">
      <div class="inline-flex mr-2 -ml-1">
        <Spinner size="sm" :color="variant === 'primary' ? 'black' : 'white'" />
      </div>
      <slot name="loading">
        <span>Loading...</span>
      </slot>
    </div>
    <template v-else>
      <span v-if="icon && iconPosition !== 'right'" class="mr-2">
        <slot name="icon-left"></slot>
      </span>
      <slot></slot>
      <span v-if="icon && iconPosition === 'right'" class="ml-2">
        <slot name="icon-right"></slot>
      </span>
    </template>
  </button>
</template> 