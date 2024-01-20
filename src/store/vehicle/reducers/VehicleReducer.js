import * as actionTypes from '../actions/actionTypes';

const initialState = {
    vehicles: {}
};

const VehicleReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ALL_VEHICLES:
            return {
                vehicles: action.payload
            };
        case actionTypes.CLEAR_VEHICLES:
            return {
                vehicles: {}
            };
        default:
            return state;
    }
}

export default VehicleReducer;
