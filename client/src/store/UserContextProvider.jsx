import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'

import axios from 'axios'

function UserContextProvider({children}){
    const[token,setToken] = useState(localStorage.getItem('token'))
    const[user,setUser] = useState({})
    
    let isLoggedIn = !!token

    const storeTokenInLS = (serverToken)=>{
        setToken(serverToken)
        return localStorage.setItem('token',serverToken)
    }

    const LogoutUser = ()=>{
        setUser('')
        setToken('')
        return localStorage.removeItem('token')
    }

    const userAuthentication = async ()=>{
        try {
            const res = await axios.get('http://localhost:3000/api/auth/profile',{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })

            
            if(res){
                const data = await res.data
                setUser(data)
            } else {
                console.log('something went wrong',error)
            }
        } catch (error) {   
            console.log('something went wrong',error)
        }   
    }

    useEffect(()=>{
        if(token){
            userAuthentication()
        }
    },[token])
    return(
        <>
            <UserContext.Provider value={{user,token,storeTokenInLS,isLoggedIn,LogoutUser}}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export default UserContextProvider