import { createContext, useContext, useState } from "react"
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService"
import { apiClient } from "../api/ApiClient"
import { GET_USER_BY_TOKEN } from "../api/UserApiService"

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}){

    const [cart, setCart] = useState([])

    const [isAuthenticated, setAuthenticated] = useState(false)

    const [token, setToken] = useState(null)

    const [username, setUsername] = useState(null)

    function addToCart(item, size, amount){
        // setCart([...cart,item])
        const exist = cart.find( (x) => x.id === item.id)           
        if(exist != null){
             setCart(
                cart.map( (x) => 
                    x.id === item.id ? {...exist, amount: exist.amount + amount,sizes: size } : x
                )
            )
            console.log(cart)
        }else{
            setCart([...cart, {...item,amount: amount,sizes: size}])
            console.log(cart)
        }
    }

    async function login (username, password){
        console.log('username : {0} password {1}', username,password)
        try{
            const response = await executeJwtAuthenticationService(username, password)
            if(response.status == 200){
                const jwtToken = 'Bearer ' + response.data.token
                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )
                return true
            }else{
                logout()
                return false
            }
        }catch(error){
            console.log(error)
            return false
        }
    }

    async function loginWithGoogle( token){
        try{
            const jwtToken = 'Bearer ' + token
            setAuthenticated(true)
            // setUsername(username)
            setToken(jwtToken)

            const reponse = await GET_USER_BY_TOKEN(token)
                            .then(reponse => setUsername(reponse.data))

            setUsername(reponse.data)

            apiClient.interceptors.request.use(
                (config) => {
                    console.log('intercepting and adding a token')
                    config.headers.Authorization = jwtToken
                    return config
                }
            )
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }

    function logout() {
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return (
        <AuthContext.Provider value={ {addToCart, cart, setCart, isAuthenticated, login,logout,username,token, loginWithGoogle}} >
            {children}
        </AuthContext.Provider>
    )
}