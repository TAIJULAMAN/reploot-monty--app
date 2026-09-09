import { QueryClient } from "@tanstack/react-query";

/**
 * Shared TanStack QueryClient instance configured for mobile performance.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours in cache
      retry: (failureCount, error) => {
        // Don't retry on 4xx client errors
        const status = (error as { statusCode?: number })?.statusCode;
        if (status && status >= 400 && status < 500) {
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});
