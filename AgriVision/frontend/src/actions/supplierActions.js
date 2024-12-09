// supplierActions.js
import axios from 'axios';
import {
    SUPPLIER_LIST_REQUEST,
    SUPPLIER_LIST_SUCCESS,
    SUPPLIER_LIST_FAIL,
} from '../constants/supplierConstants';

export const listSupplierProducts = () => async (dispatch) => {
    try {
        dispatch({ type: SUPPLIER_LIST_REQUEST });

        const { data } = await axios.get('/api/suppliers'); // Adjust the endpoint to match your backend API

        dispatch({
            type: SUPPLIER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SUPPLIER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
