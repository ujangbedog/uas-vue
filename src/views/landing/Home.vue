<script setup lang="ts">
import LandingLayout from '@/components/layout/LandingLayout.vue';
import HeroSection from '@/components/features/home/HeroSection.vue';
import FeaturedCollections from '@/components/features/home/FeaturedCollections.vue';
import WhyChooseUs from '@/components/features/home/WhyChooseUs.vue';
</script>

<template>
  <LandingLayout>
    <HeroSection />
    <FeaturedCollections />
    <WhyChooseUs />
  </LandingLayout>
</template> 