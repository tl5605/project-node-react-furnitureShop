import { useSelector } from "react-redux"
import { selectToken } from "../../Store/authSlice"
import { jwtDecode } from "jwt-decode"


const useAuth = () => {
    const token = useSelector(selectToken)
    let isManager = false
    let isCustomer = false
    if (token) {
        const userDecoded = jwtDecode(token)
        isManager = userDecoded.role === "Manager"
        isCustomer = userDecoded.role === "Customer"
        return {role: userDecoded.role, isManager, isCustomer, _id: userDecoded._id}
    }
    return { role: "", isManager, isCustomer, _id: "" }
}

export default useAuth