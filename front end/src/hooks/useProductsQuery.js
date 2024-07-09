import { useQuery } from "@tanstack/react-query"
import axios from "axios"
// import peek from "../utils/peek";

function getProducts() {
    return axios.get("/api/products").then(({data})=> data);
}

const useProductsQuery = () => {
    const { data: products = [], isLoading} = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
        refetchOnWindowFocus: false
    })

    return { products, isLoading }
}

export default useProductsQuery