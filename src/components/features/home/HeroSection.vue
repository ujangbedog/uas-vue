<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from '@/components/ui/Button.vue';

const router = useRouter();
</script>

<template>
  <section class="pt-24 pb-20 px-4">
    <div class="container mx-auto flex flex-col items-center text-center">
      <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
        Premium <br class="hidden md:block" />
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Lego Collections</span>
      </h1>
      <p class="text-xl text-gray-300 max-w-2xl mb-10">
        Discover our exclusive selection of Lego sets for collectors, enthusiasts, and builders of all ages.
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <Button @click="router.push('/products')" variant="primary" size="lg">
          Explore Products
        </Button>
        <Button @click="router.push('/contact')" variant="secondary" size="lg">
          Contact Us
        </Button>
      </div>
    </div>
  </section>
</template> 