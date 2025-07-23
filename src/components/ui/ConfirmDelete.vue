<script setup lang="ts">
import Modal from './Modal.vue';
import Button from './Button.vue';
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
  show: boolean;
  itemName: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
}>();

</script>

<template>
  <Modal :show="props.show" title="Confirm Delete" size="sm" @close="() => emit('close')">
    <div class="flex flex-col items-center text-center">
      <ExclamationTriangleIcon class="h-12 w-12 text-red-500 mb-4" />
      <h3 class="text-lg font-medium text-white mb-2">Delete</h3>
      <p class="text-gray-400 mb-4">
        Are you sure you want to delete <span class="text-white font-medium">{{ props.itemName }}</span>?
        <br>This action cannot be undone.
      </p>
    </div>

    <template #footer>
      <Button variant="secondary" @click="() => emit('close')" :disabled="props.loading">
        Cancel
      </Button>
      <Button variant="danger" @click="() => emit('confirm')" :loading="props.loading" :disabled="props.loading">
        Delete
        <template #loading>
          Deleting...
        </template>
      </Button>
    </template>
  </Modal>
</template>
