import apiSlice from "./apiSlice"


const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getOrders: build.query({
            query: () => ({
                url: '/api/order'
            }),
            providesTags: ["Order"]
        }),
        getOrdersOfUser: build.query({
            query: (user) => ({
                url: `/api/order/${user}`,
            }),
            providesTags: ["Order"]
        }),
        createOrder: build.mutation({
            query: (orderData) => ({
                url: '/api/order',
                method: "POST",
                body: orderData
            }),
            invalidatesTags: ["Order"]
        }),
        UpdateStatus: build.mutation({
            query: (orderData) => ({
                url: `/api/order/${orderData._id}`,
                method: "PUT",
                body: orderData
            }),
            invalidatesTags: ["Order"]
        }),
        DeleteOrder: build.mutation({
            query: (_id) => ({
                url: `/api/order/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Order"]
        }),
    })
})

export const { useGetOrdersQuery, useGetOrdersOfUserQuery, useCreateOrderMutation, useUpdateStatusMutation, useDeleteOrderMutation} = orderApiSlice