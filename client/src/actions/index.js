import axios from 'axios';
import { FETCH_USER } from './types';

//when redux thunk sees a function returns a func, it will call
//the function and pass in the dispatch function
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};
