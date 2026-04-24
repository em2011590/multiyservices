import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiService = createApi({
  reducerPath: 'apiService',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['History', 'Endpoints', 'Assets'],
  endpoints: (builder) => ({
    getHistory: builder.query<any[], void>({
      query: () => 'history',
      providesTags: ['History'],
    }),
    deleteHistory: builder.mutation<void, string>({
      query: (id) => ({
        url: `history/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['History'],
    }),
    getEndpoints: builder.query<any[], void>({
      query: () => 'endpoints',
      providesTags: ['Endpoints'],
    }),
    saveEndpoint: builder.mutation<any, any>({
      query: (body) => ({
        url: 'endpoints',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Endpoints'],
    }),
    deleteEndpoint: builder.mutation<void, string>({
      query: (id) => ({
        url: `endpoints/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Endpoints'],
    }),
    getAssets: builder.query<any[], void>({
      query: () => 'assets',
      providesTags: ['Assets'],
    }),
    deleteAsset: builder.mutation<void, string>({
      query: (id) => ({
        url: `assets/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Assets'],
    }),
    translateCode: builder.mutation<any, any>({
      query: (body) => ({
        url: 'translate',
        method: 'POST',
        body,
      }),
    }),
    searchDev: builder.query<any, { query: string; platform: string; language?: string }>({
      query: (params) => ({
        url: 'search',
        params,
      }),
    }),
  }),
});

export const {
  useGetHistoryQuery,
  useDeleteHistoryMutation,
  useGetEndpointsQuery,
  useSaveEndpointMutation,
  useDeleteEndpointMutation,
  useGetAssetsQuery,
  useDeleteAssetMutation,
  useTranslateCodeMutation,
  useLazySearchDevQuery,
} = apiService;
