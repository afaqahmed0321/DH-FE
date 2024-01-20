import * as actionTypes from './actionTypes';
import Toast from '../../../shared/Toast';
import Axios from '../../../axios/Axios';

export const getAllVehicles = (userId, token, page = 1) => dispatch => {
    Axios.get(`vehicle/user/${userId}?page=${page}`, { headers: { "Authorization": `Bearer ${token}` } })
        .then(response => {
            dispatch({
                type: actionTypes.ALL_VEHICLES,
                payload: response.data
            });
        })
        .catch(error => {
            Toast.error(error.response.data.message);
            console.log(error.response.data);
        });
};

export const addVehicle = (userId, data, token, onHide) => dispatch => {
    Axios.post('vehicle/add_vehicle', data, { headers: { "Authorization": `Bearer ${token}` } })
        .then(response => {
            dispatch(getAllVehicles(userId, token));
            onHide();
            Toast.success(response.data.message);
        })
        .catch(error => {
            Toast.error(error.response.data.message);
            console.log(error.response.data);
        });
};
export const deleteVehicle = (userId, vehicleId, token, handleClose) => dispatch => {
    Axios.delete(`vehicle/${vehicleId}`, { headers: { "Authorization": `Bearer ${token}` } })
        .then(response => {
            dispatch(getAllVehicles(userId, token));
            handleClose();
            Toast.success(response.data.message);
        })
        .catch(error => {
            Toast.error(error.response.data.message);
            console.log(error.response.data);
        });
};