import { useState, useEffect, createContext } from "react";
let logoutTimer;

const AuthContext = createContext({
  token: "",
  login: () => {},
  logout: () => {},
  userId: null
});

const calculateTimer = (exp) => {
    const currentTime = new Date().getTime()
    const expTime = exp
    const remainingTime = expTime - currentTime
    return remainingTime
}

const getLocalStorage = () => {
    const storedToken = localStorage.getItem('token')
    const storedExp = localStorage.getItem('exp')
    const storedUserId = localStorage.getItem('userId')

    const remainingTime = calculateTimer(storedExp)
    
    if( remainingTime <= 500 * 60 * 30) {
        localStorage.removeItem('token')
        localStorage.removeItem('exp')
        localStorage.removeItem('userId')
        return null
    }

    return {
        token: storedToken,
        duration: remainingTime,
        userId: +storedUserId
    }
}


export const AuthContextProvider = (props) => {
    const LocalStorage = getLocalStorage()

    let initialToken

    if(localStorage) {
        initialToken = localStorage.token
    }

  const [token, setToken] = useState(initialToken)
  const [userId, setUserId] = useState(null)


  const logout = () => {
    setToken(null)
    setUserId(null)
    if(localStorage.getItem('exp')){
      clearTimeout(logoutTimer)
    } 
    localStorage.clear()

    
  }

  const login = (token, exp, userId) => {
    setToken(token)
    setUserId(userId)

    localStorage.setItem('token', token)
    localStorage.setItem('exp', exp)
    localStorage.setItem('userId', userId)

    const remainingTime = calculateTimer(exp)

    logoutTimer = setTimeout(logout, remainingTime)
    console.log("Login Ran")

  }
  useEffect(() => {
    if(LocalStorage) {
      logoutTimer = setTimeout(logout, LocalStorage.duration)
    }
  }, [LocalStorage, logout]
  )


  const contextValue = {
    token,
    login,
    logout, 
    userId
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext