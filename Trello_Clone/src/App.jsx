import { useRef,useReducer,createContext } from 'react'
import CardList from './components/CardList'
import AddList from './components/AddList'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd'
import './App.css'
import cover_Img from './assets/cover_Img.jpg'

export const context = createContext();
function App() {
  const reducerFn = (state,action)=>{
    switch(action.type) {
      case 'ADD_TO_LIST':
        return {
          ...state,
          [action.payload.listName]: {...state[action.payload.listName],ar: [...state[action.payload.listName].ar, action.payload.task]}
        }
      case 'DELETE_ITEM':
        const list = state[action.payload.listName].ar
        const finalList = list.filter((_,idx)=> idx!=action.payload.idx)
        return {
          ...state,
          [action.payload.listName]: {...state[action.payload.listName],ar:finalList},
        }
      case 'EDIT_ITEM':
        const newList = [...state[action.payload.listName].ar]
        newList[action.payload.idx] = action.payload.updatedTask
        return {
          ...state,
          [action.payload.listName]: {...state[action.payload.listName],ar:newList}
        }

      case 'ADD_ANOTHER_LIST':
          return {
            ...state,
            [action.payload+Math.random()*10000] : {ar:[],title: action.payload}
          }

      case 'MOVE_CARD':    
          const {fromList, toList, idx} = action.payload;
          const fromListCopy = [...state[fromList].ar];
          const toListCopy = [...state[toList].ar];
          const [movedCard] = fromListCopy.splice(idx, 1);
          if(!toListCopy.includes(movedCard)) {
            toListCopy.push(movedCard);
          }
          return {
              ...state,
              [fromList]: { ...state[fromList], ar: fromListCopy },
              [toList]: { ...state[toList], ar: toListCopy }
          };

      case 'MOVE_ALL_CARDS':
        const modList = [];
        Object.keys(state).forEach(key=>{
          const ar = state[key].ar;
          modList.push(...ar)
          state[key].ar = []
        })
        return {
         ...state,
          [action.payload]: {...state[action.payload], ar: modList}
        }

      case 'DELETE_ALL_CARDS':
        return {
          ...state,
          [action.payload]: {...state[action.payload], ar: []}
        }
      case 'DELETE_LIST':
        const newState = {...state}
        delete newState[action.payload]
        return newState;
    }
  }
  
  const [state, dispatch] = useReducer(reducerFn, {
    todoList: {ar:['This is a sample task.','This is another sample task.','This is another task.'],title: 'To Do'},
    inProgressList: {ar:['This is another sample task.'], title: 'In Progress'},
    completedList: {ar:['This is another task'], title: 'Completed'},
  })
  console.log(state);
  const sideRef = useRef(null);

  const handleAbout = ()=>{
    sideRef.current.style.display = 'block'
    console.log(sideRef.current);
    
  }

  const closeAbout = ()=>{
    sideRef.current.style.display = 'none'
  }

  // utils.js
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };


  const dndBackend = isTouchDevice() ? TouchBackend : HTML5Backend;
  return (
    <>
      <nav>
        <img src="https://trello-clone-rts.vercel.app/trello-logo.gif" alt="" />
        <button onClick={handleAbout}>About</button>
      </nav>
      <div ref={sideRef} className="sidebar">
        <div className="sidebar-head">
          <h4>About</h4>
          <button onClick={closeAbout}>X</button>
        </div>
        <div className="author">
          <div className="author-head">
            <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="profile-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            <p>Made by</p>
          </div>
          <div className="author-cont">
              <img src={cover_Img} alt="" />
              <div className="author-cont-wrap">
                <p>Piyush Raj</p>
                <p><a target='_blank' href="https://github.com/elixirpoison">GitHub</a>-<a href="mailto:therajpiyush@gmail.com">Contact</a></p>
              </div>
          </div>
          <div className="description">
            <div className="desc-head">
              <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="profile-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
              <p>Description</p>
            </div>
            <div className="desc-cont">
              <p>
              An effort to replicate Trello's user interface and core functionalities. </p>
              <p>Built with <strong>React</strong> &amp; <strong>JavaScript</strong>.</p>
            </div>
          </div>
        </div>
      </div>
      <DndProvider backend={dndBackend}>
        <div className="container">
          <context.Provider value={{state,dispatch}} >
            {
              Object.keys(state)?.map((key,idx)=>
                <CardList  key={Math.random()+Date.now()+idx+""} id={key}/>
              )
            }
            <AddList />
          </context.Provider>
        </div>
      </DndProvider>
    </>
  )
}

export default App
