<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import Spinner from './Spinner.vue';

const props = defineProps<{
  show: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hideCloseButton?: boolean;
  persistent?: boolean;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
}>();

const modalRef = ref<HTMLElement | null>(null);

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

const handleBackdropClick = (event: MouseEvent) => {
  if (!props.persistent && event.target === event.currentTarget) {
    emit('close');
  }
};

const handleEscape = (event: KeyboardEvent) => {
  if (!props.persistent && event.key === 'Escape' && props.show) {
    emit('close');
  }
};

watch(() => props.show, (newVal) => {
  if (newVal) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }
});

onMounted(() => {
  document.addEventListener('keydown', handleEscape);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscape);
  document.body.classList.remove('overflow-hidden');
});
</script>

<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div 
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        @click="handleBackdropClick"
      >
        <transition name="modal-scale">
          <div 
            v-if="show"
            ref="modalRef"
            :class="[
              'relative w-full bg-black border border-gray-800 rounded-lg shadow-xl',
              'transform transition-all duration-300',
              sizeClasses[size || 'md']
            ]"
            @click.stop
          >
            <div class="flex items-center justify-between p-4 border-b border-gray-800">
              <h3 class="text-lg font-medium text-white">{{ title || 'Modal' }}</h3>
              <button 
                v-if="!hideCloseButton" 
                class="text-gray-400 hover:text-white transition-colors"
                @click="emit('close')"
              >
                <XMarkIcon class="h-5 w-5" />
              </button>
            </div>
            
            <div class="p-6">
              <slot></slot>
            </div>
            
            <div v-if="$slots.footer" class="p-4 border-t border-gray-800 flex justify-end space-x-3">
              <slot name="footer"></slot>
            </div>
            
            <div v-if="loading" class="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
              <slot name="loading">
                <Spinner size="lg" color="white" text="Loading..." />
              </slot>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-scale-enter-active,
.modal-scale-leave-active {
  transition: all 0.3s ease;
}

.modal-scale-enter-from,
.modal-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style> 