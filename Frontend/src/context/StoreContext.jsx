import axios from "axios";
import { createContext, useEffect, useState } from "react"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState("{}");
    const [iteminfo, setIteminfo] = useState([])
    const url = "http://localhost:4000";
    const [token, setToken] = useState("")
    const [list, setList] = useState([]);

    const fetchList = async () => {
    const response = await axios.get(`${url}/api/medicine/list`);
    if (response.data.success) {
      setList(response.data.data)
      console.log(response.data.data)
    }
    else {
      toast.error("Error")
    }
  }
  useEffect(() => {
    fetchList();
  }, [])


    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;  
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let iteminfo = []
                list.map((data, index) => {
                    if (data._id === item) {
                        totalAmount += data.price * cartItems[item];
                    }
                })
            }
        }
        return totalAmount;
    }

    const loadCartData = async (token) => {
        const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } })
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            // await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])


    const contextValue = {
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        url,
        list,
        setList,
        getTotalCartAmount,
        token,
        setToken,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider