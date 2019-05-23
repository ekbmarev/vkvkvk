import axios from 'axios';

let host = 'https://dev-api.checkpot.fun';
let defaultPhoto = '';

export function getRaffles() {
    return (dispatch) => {
        return axios.get(host + '/place/60.6125/56.7125/400000').then((response) => {
            dispatch(changeRaffles(response.data))
        })
    }
}

export function setGeo(data) {
    return (dispatch) => {
        return dispatch(changeGeo(data))
    }
}



export function changeRaffles(data) {
    var result = [];
    data.map(function(item) {
        item.events.map(function(event) 
        {
            result.push({
                uuid: event.uuid,
                end: event.end,
                membersCount: event.membersCount,
                placeName: item.name,
                prizesCount: event.prizes.length,
                prizes: 
                    event.prizes.map(function(prize) 
                    {
                        return({
                            uuid: prize.uuid,
                            name: prize.name,
                            photo: prize.photos ? prize.photos[0] : defaultPhoto
                        })
                    })                         
            })                   
        })
    })
    return {
        type: "CHANGE_RAFFLES",
        data: { events: result }
    }
}

export function changeGeo(data) {
    return {
        type: "CHANGE_GEO",
        data: data
    }
}