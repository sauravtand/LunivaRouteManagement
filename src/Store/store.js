import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import counterSlice from './Slices/counterSlice'

export default configureStore({
  reducer: combineReducers(
    {
        counter: counterSlice,
    }
  ),
})