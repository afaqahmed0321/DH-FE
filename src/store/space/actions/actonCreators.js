import * as actionTypes from "./actionTypes";
import Toast from "../../../shared/Toast";
import Axios from "../../../axios/Axios";

export const getUserSpaces =
  (userId, token, page = 1, filterby = "") =>
  (dispatch) => {
    Axios.get(`spaces/space/${userId}?page=${page}&filterby=${filterby}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        dispatch({
          type: actionTypes.USER_SPACES,
          payload: response.data,
        });
      })
      .catch((error) => {
        Toast.error(error.response.data.message);
        console.log(error.response.data);
      });
  };

export const getAllSpaces =
  (token, page = 1, filterby = "") =>
  (dispatch) => {
    Axios.get(`spaces?page=${page}&filterby=${filterby}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        dispatch({
          type: actionTypes.ALL_SPACES,
          payload: response.data,
        });
      })
      .catch((error) => {
        Toast.error(error.response.data.message);
        console.log(error.response.data);
      });
  };

export const getSingleSpace = (id, token) => (dispatch) => {
  Axios.get(`spaces/single_space/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      dispatch({
        type: actionTypes.SINGLE_SPACE,
        payload: response.data.space,                           
      });
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const addUserSpace = (userId, data, token, onHide) => (dispatch) => {
  Axios.post("spaces/add_space", data, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      dispatch(getUserSpaces(userId, token));
      onHide();
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const changeAvailability = (userId, data, token) => (dispatch) => {
  Axios.post("spaces/change-availability", data, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      dispatch(getUserSpaces(userId, token));
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const deleteSpace = (userId, spaceId, token, handleClose) => (dispatch) => {
  Axios.delete(`spaces/delete-space/${spaceId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      dispatch(getUserSpaces(userId, token));
      handleClose();
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const getAreaSpace = (id, token) => (dispatch) => {
  Axios.post(`spaces/area-spaces`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      // dispatch({
      //   type: actionTypes.SINGLE_SPACE,
      //   payload: response.data.space,
      // });
      console.log(response.data);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

