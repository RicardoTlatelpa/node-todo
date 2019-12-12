import axios from 'axios';
import {FETCH_USER} from './types';
 export const fetchUser = () => async (dispatch) =>{
    let res = await axios.get('/api/user');
    dispatch({
        type: FETCH_USER,
        payload: res.data
    })
}