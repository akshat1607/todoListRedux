import Header from "./Components/Header";
import Input from "./Components/Input";
import React, { useState } from "react";
import List from "./Components/List";
import {useSelector,useDispatch} from 'react-redux'
import FooterList from "./Components/FooterList";
import { addTodo, checkAllTodos, checkTodo, clearCompleted, deleteTodo, editTodo } from "./redux/todo/Action";
import produce from "immer";

function App() {
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState(1);
  const list = useSelector(state => state.list);
  const dispatch=useDispatch();
    
  const onPressEnter = (latestValue) => {
    dispatch(addTodo(latestValue))
    setCount(count + 1);
  };

  const deleteElement = (stringInd) => {
    let index = parseInt(stringInd.slice(1, stringInd.length));
    
    if (list[index].isChecked === false) setCount(count - 1);
    
    const arr = produce(list,draft => {
      draft.splice(index, 1);
      return draft;
    }
      )
    dispatch(deleteTodo(index))
    if (index !== arr.length) {
      var element = document.getElementById(stringInd);
      element.checked = arr[index].ischecked;
    }
  };

  const changeHandler = (index, cont) => {
    let ind=index;
    let content=cont
    dispatch(editTodo(ind,content))
  };
  
  const checkHandler = (stringInd, ischecked) => {
    let index = parseInt(stringInd.slice(1, stringInd.length));
    const arr = [...list];
    if (ischecked) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
    dispatch(checkTodo(index,ischecked));
  };
  var i = -1;

  const modeChanger = (reqMode) => {
    const rMode = parseInt(reqMode.slice(1, reqMode.length));
    if (rMode !== mode) {
      setMode(rMode);
    }
  };

  const clearHandler = () => {
    for(let i=0;i<list.length;i++)
      dispatch(clearCompleted(i))  
    setCount(list.length);
  };

  const arrowHandler = () => {
    for(let i=0;i<list.length;i++)
      dispatch(checkAllTodos(i))
    setCount(0);
  };
  console.log("list :" +list)

  return (
    <div className="App">
      <Header />
      <Input onPressEnter={onPressEnter} arrowHandler={arrowHandler} />
      {list.length?list.map((element) => {
        i = i + 1;
        if (mode === 1) {
          return (
            <List
              key={i}
              content={element.content}
              isChecked={element.isChecked}
              index={i}
              deleteElement={deleteElement}
              changeHandler={changeHandler}
              checkHandler={checkHandler}
            ></List>
          );
        } else if (mode === 2 && element.isChecked === false) {
          return (
            <List
              key={i}
              content={element.content}
              isChecked={element.isChecked}
              index={i}
              deleteElement={deleteElement}
              changeHandler={changeHandler}
              checkHandler={checkHandler}
            ></List>
          );
        } else if (mode === 3 && element.isChecked === true) {
          return (
            <List
              key={i}
              content={element.content}
              isChecked={element.isChecked}
              index={i}
              deleteElement={deleteElement}
              changeHandler={changeHandler}
              checkHandler={checkHandler}
            ></List>
          );
        }
      }):console.log("")
      }
      {list.length ? (
        <FooterList
          length={list.length}
          count={count}
          modeChanger={modeChanger}
          mode={mode}
          clearHandler={clearHandler}
        ></FooterList>
      ) : (
        console.log("")
      )}
    </div>
  );
}

export default App;
