import { createContext, useContext, useState } from "react"

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}){

    const [cart, setCart] = useState([])

    function addToCart(item){
        // setCart([...cart,item])
        const exist = cart.find( (x) => x.id === item.id)           
        if(exist != null){
            setCart(
                cart.map( (x) => 
                    x.id === item.id ? {...exist, amount: exist.amount + 1} : x
                )
            )
            console.log(cart)
        }else{
            setCart([...cart, {...item,amount: 1}])
            console.log(cart)
        }
    }

    return (
        <AuthContext.Provider value={ {addToCart, cart, setCart}} >
            {children}
        </AuthContext.Provider>
    )
}