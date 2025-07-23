import { computed } from "vue";
import { useRoute } from "vue-router";

export function useLayoutDetection() {
  const route = useRoute();

  const isDashboardRoute = computed(() => {
    return route.path.startsWith("/dashboard");
  });

  const isLandingRoute = computed(() => {
    return !isDashboardRoute.value;
  });

  return {
    isDashboardRoute,
    isLandingRoute,
  };
}
