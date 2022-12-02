import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';

export const cartSlice = createSlice({
		name: 'cart',
    initialState: [],
    reducers: {
        setCar( state, action ){
          return action.payload
        }
    }
})

export const CheckoutCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  axios.post(`https://e-commerce-api.academlo.tech/api/v1/purchases`, {}, getConfig())
    .then(res => dispatch(setCar([])))
    .finally(() => dispatch(setIsLoading(false)))
}

export const addCartThunk = (data) => (dispatch) => {
  dispatch(setIsLoading(true));
  axios.post(`https://e-commerce-api.academlo.tech/api/v1/cart`, data, getConfig())
    .then(res => dispatch(getCarThunk()))
    .finally(() => dispatch(setIsLoading(false)))
}

export const getCarThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  axios.get(`https://e-commerce-api.academlo.tech/api/v1/cart`, getConfig())
    .then(res => dispatch(setCar(res.data.data.cart)))
    .finally(() => dispatch(setIsLoading(false)))
}

export const { setCar } = cartSlice.actions;

export default cartSlice.reducer;