<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Bars3Icon, HomeIcon } from "@heroicons/vue/24/outline";
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";

const router = useRouter();
const searchQuery = ref("");
const showSearchResults = ref(false);
const searchInputRef = ref<HTMLInputElement | null>(null);
const isMobile = ref(false);

const availablePages = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Users", path: "/dashboard/users" },
];

const filteredPages = computed(() => {
  if (!searchQuery.value) return [];
  const query = searchQuery.value.toLowerCase();
  return availablePages.filter((page) =>
    page.name.toLowerCase().includes(query)
  );
});

const navigateToPage = (path: string) => {
  router.push(path);
  searchQuery.value = "";
  showSearchResults.value = false;
};

const goToLandingPage = () => {
  router.push("/");
};

const handleSearchFocus = () => {
  showSearchResults.value = true;
};

const handleSearchBlur = () => {
  setTimeout(() => {
    showSearchResults.value = false;
  }, 200);
};

const checkMobile = () => {
  isMobile.value = window.innerWidth < 640;
};

onMounted(() => {
  window.addEventListener("keydown", (event) => {
    if (
      event.key === "/" &&
      !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName || "")
    ) {
      event.preventDefault();
      searchInputRef.value?.focus();
    }
  });
  
  checkMobile();
  window.addEventListener('resize', checkMobile);
});
</script>

<template>
  <header class="bg-black border-b border-transparent shadow-md">
    <div class="px-4 py-3 flex items-center justify-between">
      <div class="flex items-center">
        <button
          @click="$emit('toggle-sidebar')"
          class="md:hidden text-gray-300 hover:text-white focus:outline-none mr-3"
        >
          <Bars3Icon class="h-6 w-6" />
        </button>

        <div class="md:hidden mr-4">
          <img src="/brand-lego.svg" alt="Lego Logo" class="h-8 w-auto" />
        </div>

        <!-- Search moved to the left -->
        <div class="relative w-64 hidden sm:block">
          <Input
            ref="searchInputRef"
            v-model="searchQuery"
            type="search"
            placeholder="Search pages..."
            @focus="handleSearchFocus"
            @blur="handleSearchBlur"
          />

          <div
            v-if="showSearchResults && filteredPages.length > 0"
            class="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10 border border-gray-300"
          >
            <ul class="py-1">
              <li
                v-for="page in filteredPages"
                :key="page.path"
                @mousedown="navigateToPage(page.path)"
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
              >
                {{ page.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <Button 
          @click="goToLandingPage" 
          variant="primary" 
          :size="isMobile ? 'sm' : 'md'" 
          class="flex items-center"
        >
          <HomeIcon class="h-4 w-4 mr-1 sm:mr-2" />
          <span class="hidden xs:inline">Back to Home</span>
          <span class="xs:hidden">Home</span>
        </Button>
      </div>
    </div>
  </header>
</template>

<style scoped>
@media (max-width: 480px) {
  .xs\:hidden {
    display: none;
  }
}
@media (min-width: 481px) {
  .xs\:inline {
    display: inline;
  }
}
</style>
