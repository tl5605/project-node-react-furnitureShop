import apiSlice from "./apiSlice"


const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query({
            query: () => ({
                url: '/api/user'
            })
        })
    }),
})


export const { useGetAllUsersQuery} = userApiSlice
