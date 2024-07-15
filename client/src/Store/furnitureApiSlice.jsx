import apiSlice from "./apiSlice"


const furnitureApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllFurniture: build.query({
            query: () => ({
                url: '/api/furniture'
            }),
            providesTags: ["Furnitures"]
        }),
        getFurnitureByCategory: build.query({
            query: (category) => ({
                url: `/api/furniture/${category}`
            }),
            providesTags: ["Furnitures"]
        }),
        addFurniture: build.mutation({
            query: (furniture) => ({
                url: "api/furniture",
                method: "POST",
                body: furniture
            }),
            invalidatesTags: ["Furnitures"]
        }),
        updateFurniture: build.mutation({
            query: (furniture) => ({
                url: `api/furniture/${furniture._id}`,
                method: "PUT",
                body: furniture
            }),
            invalidatesTags: ["Furnitures"]
        }),
        updateStock: build.mutation({
            query: (furniture) => ({
                url: `api/furniture/${furniture._id}/stock`,
                method: "PUT",
                body: furniture
            }),
            invalidatesTags: ["Furnitures"]
        }),
        deleteFurniture: build.mutation({
            query: (_id) => ({
                url: `api/furniture/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Furnitures"]
        }),
    }),
})


export const { useGetAllFurnitureQuery, useGetFurnitureByCategoryQuery, useAddFurnitureMutation, useUpdateFurnitureMutation, useUpdateStockMutation, useDeleteFurnitureMutation } = furnitureApiSlice