<script setup lang="ts">
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import Card from '@/components/ui/Card.vue';

</script>

<template>
  <DashboardLayout>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-white">Error</h1>
    </div>
    <Card bordered class="mb-4">
      <div class="p-2">
        <h1 class="font-medium text-white text-center">404</h1>
        <h1 class="font-medium text-white text-center">Not Found</h1>
      </div>
    </Card>
  </DashboardLayout>
</template>