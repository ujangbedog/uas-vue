<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  rounded?: boolean;
  size?: 'sm' | 'md' | 'lg';
}>();

const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-gray-700 text-white',
    secondary: 'bg-gray-600 text-white',
    success: 'bg-green-600 text-white',
    danger: 'bg-red-600 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-gray-500 text-white',
  };
  return variants[props.variant || 'primary'];
});

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };
  return sizes[props.size || 'md'];
});

const badgeClasses = computed(() => [
  'inline-flex items-center font-medium',
  variantClasses.value,
  sizeClasses.value,
  props.rounded ? 'rounded-full' : 'rounded',
]);
</script>

<template>
  <span :class="badgeClasses">
    <slot></slot>
  </span>
</template> 