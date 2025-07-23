<script setup lang="ts">
const features = [
  {
    icon: '✓',
    title: 'Authentic Products',
    description: '100% genuine Lego sets with manufacturer warranty'
  },
  {
    icon: '🚚',
    title: 'Fast Shipping',
    description: 'Quick delivery to your doorstep nationwide'
  },
  {
    icon: '💰',
    title: 'Best Prices',
    description: 'Competitive pricing on all our Lego collections'
  },
  {
    icon: '🎁',
    title: 'Exclusive Sets',
    description: 'Access to limited edition and hard-to-find sets'
  }
];
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-12">Why Choose Our Lego Store?</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="(feature, index) in features" :key="index" class="p-4">
          <div class="w-16 h-16 mx-auto bg-white bg-opacity-10 rounded-full flex items-center justify-center mb-4">
            <span class="text-2xl">{{ feature.icon }}</span>
          </div>
          <h3 class="text-xl font-bold mb-2">{{ feature.title }}</h3>
          <p class="text-gray-400">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template> 