<script setup lang="ts">
defineProps<{
  title?: string;
  subtitle?: string;
  noPadding?: boolean;
  bordered?: boolean;
  elevated?: boolean;
}>();
</script>

<template>
  <div 
    class="bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden transition-shadow duration-200" 
    :class="{ 
      'border border-gray-800/60': bordered,
      'shadow-lg': elevated || bordered,
      'shadow-md': !elevated && !bordered
    }"
  >
    <div v-if="title || subtitle" class="px-6 py-4 border-b border-gray-800/60">
      <h3 v-if="title" class="text-lg font-medium text-white">{{ title }}</h3>
      <p v-if="subtitle" class="text-sm text-gray-400 mt-1">{{ subtitle }}</p>
    </div>
    <div :class="{ 'p-6': !noPadding }">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="px-6 py-4 bg-black/90 border-t border-gray-800/60">
      <slot name="footer"></slot>
    </div>
  </div>
</template> 