<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Button from "@/components/ui/Button.vue";
import CartIcon from "@/components/layout/CartIcon.vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

const router = useRouter();
const isMobileMenuOpen = ref(false);

const navigateTo = (path: string) => {
  router.push(path);
  isMobileMenuOpen.value = false;
};

const navigateToDashboard = () => {
  router.push("/dashboard");
  isMobileMenuOpen.value = false;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
  <header
    class="bg-gray-900 fixed w-full z-50 shadow-md border-b border-gray-800"
  >
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <img src="/brand-lego.svg" alt="Lego Logo" class="h-10 w-auto" />
          </router-link>
        </div>

        <!-- Desktop Navigation - Centered -->
        <nav
          class="hidden md:flex items-center space-x-6 mx-auto absolute left-1/2 transform -translate-x-1/2"
        >
          <router-link
            to="/"
            class="nav-link relative px-2 py-1 rounded-md font-medium"
            :class="{ 'active': $route.path === '/' }"
          >
            Home
          </router-link>
          <router-link
            to="/about"
            class="nav-link relative px-2 py-1 rounded-md font-medium"
            :class="{ 'active': $route.path === '/about' }"
          >
            About
          </router-link>
          <router-link
            to="/products"
            class="nav-link relative px-2 py-1 rounded-md font-medium"
            :class="{ 'active': $route.path === '/products' }"
          >
            Products
          </router-link>
          <router-link
            to="/contact"
            class="nav-link relative px-2 py-1 rounded-md font-medium"
            :class="{ 'active': $route.path === '/contact' }"
          >
            Contact
          </router-link>
        </nav>

        <!-- Dashboard Button and Cart Icon - Only visible on desktop -->
        <div class="hidden md:flex items-center space-x-4">
          <CartIcon />
          <Button
            @click="navigateToDashboard"
            variant="primary"
            size="md"
            class="px-4 py-1"
          >
            Dashboard
          </Button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center space-x-2">
          <CartIcon />
          <button
            @click="toggleMobileMenu"
            class="text-gray-300 hover:text-white focus:outline-none"
          >
            <Bars3Icon v-if="!isMobileMenuOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden mt-4 py-4 border-t border-gray-800"
      >
        <div class="flex flex-col space-y-4">
          <a
            @click="navigateTo('/')"
            class="text-gray-300 hover:bg-white/5 transition-all py-2 px-3 rounded-md"
            :class="{ 'text-white': $route.path === '/' }"
          >
            Home
          </a>
          <a
            @click="navigateTo('/about')"
            class="text-gray-300 hover:bg-white/5 transition-all py-2 px-3 rounded-md"
            :class="{ 'text-white': $route.path === '/about' }"
          >
            About
          </a>
          <a
            @click="navigateTo('/products')"
            class="text-gray-300 hover:bg-white/5 transition-all py-2 px-3 rounded-md"
            :class="{ 'text-white': $route.path === '/products' }"
          >
            Products
          </a>
          <a
            @click="navigateTo('/contact')"
            class="text-gray-300 hover:bg-white/5 transition-all py-2 px-3 rounded-md"
            :class="{ 'text-white': $route.path === '/contact' }"
          >
            Contact
          </a>
          <Button
            @click="navigateToDashboard"
            variant="primary"
            size="md"
            class="mt-2 py-1"
          >
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-link {
  color: #a0aec0; /* text-gray-300 */
  transition: all 0.2s ease;
}

.nav-link:hover:not(.active) {
  color: white;
  background-color: rgba(255, 255, 255, 0.05);
}

.nav-link.active {
  color: white;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: white;
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.nav-link:hover:not(.active)::after {
  width: 70%;
}
</style>
