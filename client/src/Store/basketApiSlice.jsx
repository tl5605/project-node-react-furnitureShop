import apiSlice from "./apiSlice"


const basketApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getBaskets: build.query({
            query: () => ({
                url: '/api/basket'
            })
        }),
        getBasketsUser: build.query({
            query: (user) => ({
                url: `/api/basket/${user}`,
            }),
            providesTags: ["Basket"]
        }),
        AddFurnitureForBasket: build.mutation({
            query: (basketData) => ({
                url: `/api/basket/${basketData.user}`,
                method: "PUT",
                body: basketData
            }),
            invalidatesTags: ["Basket"]
        }),
        UpdateQuantity: build.mutation({
            query: (basketData) => ({
                url: `/api/basket/${basketData._id}/furniture/${basketData.furniture}`,
                method: "PUT",
                body: basketData
            }),
            invalidatesTags: ["Basket"]
        }),
        DeleteFurnitureFromBasket: build.mutation({
            query: (basketData) => ({
                url: `/api/basket/${basketData._id}/furniture/${basketData.furniture}`,
                method: "DELETE",
            }),

            invalidatesTags: ["Basket"]
        }),
        DeleteBasket: build.mutation({
            query: (_id) => ({
                url: `/api/basket/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Basket"]
        }),
    })
})


export const { useGetBasketsQuery, useGetBasketsUserQuery, useAddFurnitureForBasketMutation, useUpdateQuantityMutation, useDeleteFurnitureFromBasketMutation, useDeleteBasketMutation } = basketApiSlice