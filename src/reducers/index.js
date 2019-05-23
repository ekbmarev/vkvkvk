let defaultState = {
    geo: null,
    events: []
}

const mainReducer = (state = defaultState, action) => {
    if(action.type === "CHANGE_RAFFLES") {
        return {
            ...state,
            events: action.data.events
        }
    }

    if(action.type === "CHANGE_GEO") {
        return {
            ...state,
            geo: action.data
        }
    }
}

export default mainReducer;