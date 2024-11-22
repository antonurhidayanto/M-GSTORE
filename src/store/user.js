const DEFAULT_STATE = {
    username: "",
    id:"",
    role:""
}

export const userReducer = (state = DEFAULT_STATE, action) => {
    if (action.type === "USER_LOGIN"){
        const prevUser = {...state}
        prevUser.username = action.payload.username
        prevUser.id = action.payload.id
        prevUser.role = action.payload.role
        return prevUser
    }else if (action.type === "USER_LOGOUT"){
       return DEFAULT_STATE
    }
    
    
    return state;
}