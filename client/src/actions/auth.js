import * as api from '../api/index';
import { AUTH, LOGOUT } from '../constants/actionTypes';

export const signup = async (formdata, navigator, dispatch) => {
  try {
    const { data } = await api.signup(formdata);
    dispatch({ type: AUTH, data });
    navigator('/');
  } catch (error) {
    console.log(error);
  }
};
export const signin = async (formdata, navigator, dispatch) => {
  try {
    const { data } = await api.signin(formdata);
    dispatch({ type: AUTH, data });
    navigator('/');
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (dispatch) => {
  try {
    dispatch({ type: LOGOUT });
    navigator('/');
  } catch (error) {
    console.log(error);
  }
};
