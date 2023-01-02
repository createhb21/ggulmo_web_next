import { QueryClient } from "react-query";

function queryErrorHandler(error: unknown): void {
  console.log(error);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      cacheTime: 1000 * 60 * 15,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      keepPreviousData: true,
      retry: 0,
      onError: (err) => queryErrorHandler(err),
    },
    mutations: {
      onError: (err) => queryErrorHandler(err),
    },
  },
});
