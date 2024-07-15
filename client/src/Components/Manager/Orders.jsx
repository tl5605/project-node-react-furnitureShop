import React from "react";
import { useGetOrdersQuery, useUpdateStatusMutation } from "../../Store/orderApiSlice";


const Orders = () => {

    const { data } = useGetOrdersQuery()
    const [updateStatusFunc] = useUpdateStatusMutation()

    return (
        <>

        </>
    )
}

export default Orders