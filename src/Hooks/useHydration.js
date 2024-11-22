import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { axiosInstance } from '../lib/axios'

export const useHydration = () => {
const dispatch = useDispatch()

  const [ishydrated, setIshydrated] = useState(false)

  const hydrateAuth = async () => {
    try {
      const user = localStorage.getItem('current-user')
      if(!user) return
      const userResponse = await axiosInstance.get("/users/" + user)

      dispatch({
        type: "USER_LOGIN", 
        payload: {
          username: userResponse.data.username,
          id: userResponse.data.id,
          role: userResponse.data.role
        }
      });
    }catch(err) {
      console.log(err)
    }finally {
      setIshydrated(true)
    }
    
  };

  useEffect(() => {
    hydrateAuth()
  }, [])

  return {
    ishydrated: ishydrated,
  }
}