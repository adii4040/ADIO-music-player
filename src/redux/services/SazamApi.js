import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const apiKey = import.meta.env.VITE_SAZAM_API_KEY;

export const sazamApi = createApi({
    reducerPath: 'sazamApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://shazam-core.p.rapidapi.com/v1/",
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', apiKey)
            headers.set('x-rapidapi-host', 'shazam-core.p.rapidapi.com');
            return headers
        }
    }),

    endpoints: (builder) => ({
        getWorldChart: builder.query({
            query: () => 'charts/world?country_code=DZ',
        })
    })
})

export const { useGetWorldChartQuery } = sazamApi