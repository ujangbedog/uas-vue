<script setup lang="ts">
const contactMethods = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>`,
    title: 'Email',
    content: 'info@brickbybrick.id',
    link: 'mailto:info@brickbybrick.id'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>`,
    title: 'Phone',
    content: '+62 812 3456 7890',
    link: 'tel:+6281234567890'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>`,
    title: 'Store Location',
    content: 'Jl. Braga No. 123, Bandung, Indonesia<br>Open: Mon-Sat, 10:00 - 20:00',
    link: null
  }
];
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto">
        <div class="bg-zync-900 bg-opacity-5 p-10 rounded-lg border border-gray-800">
          <h2 class="text-2xl font-bold mb-8 text-center">Get in Touch</h2>
          
          <div class="space-y-8">
            <div v-for="(method, index) in contactMethods" :key="index" class="flex items-center">
              <div class="w-16 h-16 bg-black bg-opacity-10 rounded-full flex items-center justify-center mr-6 flex-shrink-0" v-html="method.icon"></div>
              <div>
                <h3 class="text-xl font-semibold mb-2">{{ method.title }}</h3>
                <a 
                  v-if="method.link" 
                  :href="method.link" 
                  class="text-gray-300 hover:text-white transition-colors"
                  v-html="method.content"
                ></a>
                <p v-else class="text-gray-300" v-html="method.content"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template> 