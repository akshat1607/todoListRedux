import {createStore} from 'redux'
import todoReducer from './todo/todoReducer'
import { initialState } from './todo/todoReducer'
const store=createStore(todoReducer)
store.subscribe(()=>console.log(initialState))
export default store