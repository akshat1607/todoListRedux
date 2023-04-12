import React from "react";
import list from "../../Components/List";
import produce from "immer";
export const initialState = {
    list:[]
};
function todoReducer(state = initialState, action) {
    console.log('action : '+action.type,action.payload)
  switch (action.type) {
    case "ADD_TODO":
      return {...state,list:[...state.list,{content:action.payload,isChecked:false}]};
    case "CHECK_TODO": {
        const arr = produce(state, draft => {
            draft.list[action.payload.id].isChecked=action.payload.isChecked
        })
        return arr
    }
    case "CHECK_ALL_TODOS": {
        const arr = produce(state, draft => {
            draft.list[action.payload].isChecked=true
        })
      return arr;
    }
    case "EDIT_TODO": {
      state.list[action.payload.id].content = action.payload.content;
      return state;
    }
    case 'DELELTE_TODO': {
        const arr = produce(state.list, draft => {
            draft.splice(action.payload, 1)
        })
        return {...state,list:arr};
    }
    case 'CLEAR_COMPLETED':{
        const arr = produce(state, draft => {
            draft.list[action.payload].isChecked=false
        })
        return arr;
    }
    default:
        return state;

  }
}
export default todoReducer
