<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useLayoutDetection } from '@/composables/useLayoutDetection';
import LandingLayout from '@/components/layout/LandingLayout.vue';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';

const router = useRouter();
const { isDashboardRoute } = useLayoutDetection();

const goBack = () => {
  if (isDashboardRoute.value) {
    router.push('/dashboard');
  } else {
    router.push('/');
  }
};
</script>

<template>
  <!-- Dashboard Layout -->
  <DashboardLayout v-if="isDashboardRoute">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-white">Error</h1>
      <p class="text-gray-400 mt-1">Page not found</p>
    </div>
    <Card bordered class="mb-4">
      <div class="p-6 text-center">
        <h1 class="text-4xl font-bold text-white mb-4">404</h1>
        <h2 class="text-xl font-medium text-white mb-6">
          The requested page could not be found
        </h2>
        <Button @click="goBack" variant="primary" size="lg">
          Back to Dashboard
        </Button>
      </div>
    </Card>
  </DashboardLayout>

  <!-- Landing Layout -->
  <LandingLayout v-else>
    <div class="container mx-auto px-4 py-20 text-center">
      <h1 class="text-6xl font-bold text-white mb-4">404</h1>
      <h2 class="text-3xl font-medium text-white mb-8">Page Not Found</h2>
      <p class="text-xl text-gray-300 mb-10 max-w-lg mx-auto">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button @click="goBack" variant="primary" size="lg">
        Back to Home
      </Button>
    </div>
  </LandingLayout>
</template> 