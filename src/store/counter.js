const DEFAULT_STATE = {
    count: 0
}

export const counterReducer = (state = DEFAULT_STATE, action) => {
    // if(action.type === "INCREMENT"){
    //    const prevCount = {...state}
    //    prevCount.count = state.count += 1
    //    return prevCount
    // }else if(action.type === "DECREMENT"){
    //     const prevCount = {...state}
    //     if (state.count > 0){
    //         prevCount.count = state.count -= 1
    //     }
    //     return prevCount
    // }else if(action.type === "INPUT_COUNTER"){
    //     const prevCount = {...state}
    //     prevCount.count = action.payload
    //     return prevCount
    // }
    switch (action.type) {
        case "INCREMENT":
            const increCount = {...state}
            increCount.count = state.count += 1
            return increCount
        case "DECREMENT":
            const decreCount = {...state}
            if (state.count > 0){
                decreCount.count = state.count -= 1
                return decreCount
            }else{
                return state
            }
        case "INPUT_COUNTER":
            const inpCount = {...state}
            inpCount.count = action.payload
            return inpCount

        default:
            return state
    }
}