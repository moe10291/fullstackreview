const initialState={
    customer:{}
}
const UPDATE_CUSTOMER='UPDATE_CUSTOMER'


export const updateCustomer=(userData)=> {
    return {
        type: UPDATE_CUSTOMER,
        payload: userData
    }
}

export default function reducer(state= initialState, action) {
    switch(action.type) {
        case UPDATE_CUSTOMER:
            return {...state, customer: action.payload}
        default:
        return state
    }
}