import * as actionTypes from './actionTypes';
import Toast from '../../../shared/Toast';
import Axios from '../../../axios/Axios';

export const getUserBookings = (userId, token, page = 1, filterBy = '') => dispatch => {
    Axios.get(`bookings/user_bookings/${userId}?page=${page}&filterBy=${filterBy}`, { headers: { "Authorization": `Bearer ${token}` } })
        .then(response => {
            dispatch({
                type: actionTypes.ALL_BOOKING,
                payload: response.data
            });
        })
        .catch(error => {
            Toast.error(error.response.data.message);
            console.log(error.response.data);
        });
};

export const getOwnerBookings = (userId, token, page = 1, filterBy = '') => dispatch => {
    Axios.get(`bookings/owner_bookings/${userId}?page=${page}&filterBy=${filterBy}`, { headers: { "Authorization": `Bearer ${token}` } })
        .then(response => {
            dispatch({
                type: actionTypes.ALL_BOOKING,
                payload: response.data
            });
        })
        .catch(error => {
            Toast.error(error.response.data.message);
            console.log(error.response.data);
        });
};

export const getManagerBookings = (userId, token, page = 1, filterBy = '') => dispatch => {
    Axios.get(`bookings/manager_bookings/${userId}?page=${page}&filterBy=${filterBy}`, { headers: { "Authorization": `Bearer ${token}` } })
        .then(response => {
            dispatch({
                type: actionTypes.ALL_BOOKING,
                payload: response.data
            });
        })
        .catch(error => {
            Toast.error(error.response.data.message);
            console.log(error.response.data);
        });
};

export const createBooking = (data, token, onHide) => dispatch => {
    Axios.post('bookings/create_booking', data, { headers: { "Authorization": `Bearer ${token}` } })
        .then(response => {
            onHide();
            dispatch(getUserBookings(data.userId, token));
            dispatch(getOwnerBookings(data.userId, token));
            Toast.success(response.data.message);
        })
        .catch(error => {
            Toast.error(error.response.data.message);
            console.log(error.response.data);
        });
};