<script setup lang="ts">
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import Card from '@/components/ui/Card.vue';

</script>

<template>
  <DashboardLayout>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-white">Dashboard</h1>
      <p class="text-gray-400 mt-1">This is dashboard.</p>
    </div>
    <Card bordered class="mb-4">
      <div class="p-2">
        <h1 class="font-medium text-white mb-3 text-center">Hello World!</h1>
      </div>
    </Card>
  </DashboardLayout>
</template>