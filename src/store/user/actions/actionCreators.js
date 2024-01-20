import * as actionTypes from "./actionTypes";
import * as catTypes from "../../category/actions/actionTypes";
import * as chatTypes from "../../chat/actions/actionTypes";
import * as spaceTypes from "../../space/actions/actionTypes";
import * as vehTypes from "../../vehicle/actions/actionTypes";
import Toast from "../../../shared/Toast";
import Axios from "../../../axios/Axios";

export const userLogin = (data, navigation) => (dispatch) => {
  Axios.post("users/login", data)
    .then((response) => {
      dispatch({
        type: actionTypes.USER_LOGIN,
        payload: response.data,
      });
      navigation("/");
      Toast.success(response.data.status);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
    });
};

export const userLogout = (navigation) => (dispatch) => {
  dispatch({
    type: actionTypes.USER_LOGOUT,
  });
  dispatch({
    type: catTypes.CLEAR_CATEGORIES,
  });
  dispatch({
    type: chatTypes.CLEAR_CHAT,
  });
  dispatch({
    type: spaceTypes.CLEAR_SPACES,
  });
  dispatch({
    type: vehTypes.CLEAR_VEHICLES,
  });
  navigation("/auth/login");
  Toast.success("User logout successful");
};

export const forgetPassword = (data, navigate, moveTo) => (dispatch) => {
  Axios.post("users/forgotpassword", data)
    .then((response) => {
      navigate("/auth/customer/verify-otp", {
        state: {
          email: data.email,
          moveTo,
        },
      });
      Toast.success(response.data.status);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const verifyOtp =
  (data, navigate, moveTo = "/auth/customer/reset-password", role) =>
    (dispatch) => {
      Axios.post("users/verifyotp", data)
        .then((response) => {
          dispatch({
            type: actionTypes.OTP_TOKEN,
            payload: response.data,
          });
          navigate(moveTo, {
            state: {
              email: data.email,
              role,
            },
          });
          Toast.success(response.data.status);
        })
        .catch((error) => {
          Toast.error(error.response.data.message);
          console.log(error.response.data);
        });
    };

export const resetPassword = (data, navigate) => (dispatch) => {
  Axios.patch("users/resetPassword", data)
    .then((response) => {
      navigate("/auth/customer/login");
      Toast.success(response.data.status);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const signupUser = (data, navigate, moveTo, role) => (dispatch) => {
  Axios.post("users/signup", data)
    .then((response) => {
      if (moveTo === "/auth/personal-information" && role === "Business") {
        navigate("/auth/service-provider/verify-otp", {
          state: {
            email: data.email,
            moveTo,
            role,
          },
        });
      } else {
        navigate("/auth/customer/verify-otp", {
          state: {
            email: data.email,
            moveTo,
            role,
          },
        });
      }
      Toast.success(response.data.status);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const updateUserProfile =
  (data, navigate, token, role) => (dispatch) => {
    Axios.patch("users/UpdateUserProfile", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (role && role === "Business") {
          navigate("/auth/service-provider/company-information");
        } else if (role && role === "Truck Driver") {
          navigate("/auth/driver/company-information");
        } else {
          navigate("/auth/login");
        }
        Toast.success(response.data.message);
      })
      .catch((error) => {
        Toast.error(error.response.data.message);
        console.log(error.response.data);
      });
  };

export const updateCompanyProfile =
  (data, navigate, token, role) => (dispatch) => {
    Axios.patch("users/UpdateCompanyProfile", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        navigate("/auth/login");
        Toast.success(response.data.message);
      })
      .catch((error) => {
        Toast.error(error.response.data.message);
        console.log(error.response.data);
      });
  };

export const sendManagerInvitation = (data, token, onHide) => (dispatch) => {
  Axios.post("users/manager-invitation", data, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      onHide();
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const signupManager = (data, navigate, moveTo, role) => (dispatch) => {
  Axios.patch("users/manager_resgister", data)
    .then((response) => {
      navigate("/auth/customer/verify-otp", {
        state: {
          email: data.email,
          moveTo,
          role,
        },
      });
      Toast.success(response.data.status);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const getUserCards = (userId, token) => (dispatch) => {
  Axios.get(`users/user-cards/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      dispatch({
        type: actionTypes.USER_CARDS,
        payload: response.data.cards.data,
      });
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const addUserCard = (data, token, onHide) => (dispatch) => {
  Axios.post("users/add_card", data, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      onHide();               
      dispatch(getUserCards(data.userId, token));
      Toast.success(response.data.message);
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const getOwnerManagers = (id, token, page = 1, filterBy = '') => dispatch => {
  Axios.get(`users/owner-managers/${id}?page=${page}&filterBy=${filterBy}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(response => {
      dispatch({
        type: actionTypes.USER_MANAGERS,
        payload: response.data
      });
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};
export const deleteManager = (userId, managerId, token, handleClose) => dispatch => {
  Axios.delete(`owner-managers/${managerId}`, { headers: { "Authorization": `Bearer ${token}` } })
      .then(response => {
          dispatch(getOwnerManagers(userId, token));
          handleClose();                                                              
          Toast.success(response.data.message);
      })
      .catch(error => {
          Toast.error(error.response.data.message);
          console.log(error.response.data);
      });
};
export const getPayments = (id, token, page = 1) => dispatch => {
  Axios.get(`users/owner-managers/${id}?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(response => {
      dispatch({                                        
        type: actionTypes.USER_PAYMENT,
        payload: response.data
      });                      
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};

export const updateUserAccount = (data, token) => dispatch => {
  Axios.patch('users/updateMe', data, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(response => {
      console.log(response.data.data.user);
      dispatch({
        type: actionTypes.UPDATE_ACCOUNT,
        payload: response.data.data.user
      });
      Toast.success('Update successful');
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
}

export const updateUserPassword = (data, token) => dispatch => {
  Axios.patch('users/updatePassword', data, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(response => {
      dispatch({
        type: actionTypes.UPDATE_PASSWORD,
        payload: response.data.token
      });
      Toast.success('Update successful');
    })
    .catch((error) => {
      Toast.error(error.response.data.message);
      console.log(error.response.data);
    });
};