import React from 'react'
import {
  useEffect
} from 'react'
import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {
  useParams
} from "react-router-dom"
import cors from 'cors'

export default function Report({
  id,
  accessToken,
  setAccessToken,
  refreshToken
}) {
  const [arr, setarr] = useState([]);
  const axiosJWT=axios.create();
  axiosJWT.interceptors.request.use(async function (config) {
    const decodedToken=jwt_decode(accessToken);
    if(decodedToken.exp < Date.now()/1000){
      const res=await axios.get('https://authserver-4m3k.onrender.com/requestNewAccessToken',{
        headers:{'auth-token-refresh':refreshToken} 
      })

    setAccessToken(res.headers['auth-token-access']);
    config.headers['auth-token-access']= res.headers['auth-token-access'];
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 
  //  const { id } = useParams()
  useEffect(() => {async function fet(){
    const res = await axiosJWT.get(`https://appserver-zwla.onrender.com/report/${id}`, {
      headers: {
        'auth-token-access': accessToken
      }
    })
     setarr(res.data); };
    fet();
    }, [id])
 
  return ( 
    <div >
     <h2>Report {id} :</h2>  
     <div>
      { arr.map((item)=>{
          return  <h3  key={item.date}>  Date: {item.date } ; UniqueUserCount: {item.uniqueUserCount}</h3>
        }) }
      </div>
    </div>
  )
}