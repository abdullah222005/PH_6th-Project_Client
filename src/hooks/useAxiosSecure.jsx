import axios from 'axios';
import React, { use, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
const instance = axios.create({
    baseURL: 'http://localhost:3333'
})
const useAxiosSecure = () => {
    const {user, logOut} = use(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        //request interceptor
        const requestInterceptor = instance.interceptors.request.use((config) => {
          const token = user.accessToken;
          if(token){
            config.headers.authorization = `Bearer ${user.accessToken}`;
          }
            return config;
        })
        //response interceptor 
        const responseInterceptor = instance.interceptors.response.use(res =>{
            return res;
        }, 
        err=>{
            const status = err.status;
            if(status === 401 || status === 403){
                logOut()
                .then(res=> {
                    toast.warning('Logged Out for Unauthorized Access.')
                    navigate('/login')})
                .catch(err=> console.log(err)
                )
            }
        })

        return ()=>{
            instance.interceptors.request.eject(requestInterceptor);
            instance.interceptors.response.eject(responseInterceptor);
        }
    },[user, logOut, navigate])

    return instance;
};

export default useAxiosSecure;