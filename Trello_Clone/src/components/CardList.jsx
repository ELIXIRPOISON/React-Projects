import Card from "./Card";
import { useContext,useEffect,useRef } from "react";
import {useState} from 'react'
import { context } from "../App";
import { useDrop } from "react-dnd";
const CardList = ({title,id})=>{
    const ctx = useContext(context)
    const txtRef = useRef(null);
    const popupReF = useRef(null);
    const [showPopUp, setShowPopUp] = useState(false); 
    const [showActions, setShowActions] = useState(false);
    const [{isOver}, dropRef] = useDrop(()=>({
        accept: 'CARD',
        drop: (item)=>{
            ctx.dispatch({
                type:"MOVE_CARD",
                payload: {idx: item.idx, fromList: item.listName, toList: id},
            });
        },
        collect: (monitor)=>({
            isOver: monitor.isOver(),
        }),
    }))

    const addCard = ()=>{
        if(txtRef.current.value != '') {
            ctx.dispatch({type: 'ADD_TO_LIST', payload:{task: txtRef.current.value,listName: id}})
            setShowPopUp(false)
        }  
        return;
    }
    const handleOutsideClick = (e)=>{
        if(popupReF.current && !popupReF.current.contains(e.target)) {
            setShowPopUp(false)  
        }
    }
    useEffect(()=>{
        if(showPopUp) {
            document.addEventListener('mousedown', handleOutsideClick)
        }
        else {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
        txtRef.current?.focus()
        return ()=>{
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    },[showPopUp])

    const handlePopUp = ()=>{
        setShowPopUp(true)
    }

    const moveAllCards = ()=>{
        ctx.dispatch({type: 'MOVE_ALL_CARDS', payload: id})
    }
    const deleteAllCards = ()=>{
        ctx.dispatch({type: 'DELETE_ALL_CARDS', payload: id})
    }
    const deleteList = ()=>{
        ctx.dispatch({type: 'DELETE_LIST', payload: id})
    }    
    return (
        <div ref={dropRef} style={{ backgroundColor: isOver ? '#f0f0f0' : 'white' }} className="list">
            <div className="list-name">
                <p>{ctx.state[id].title}</p>
                <svg onClick={()=>setShowActions(true)} stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="dots-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
            </div>
            {
                showActions?(<div className="actions">
                <div className="actions-head">
                    <p>List Actions</p>
                    <button onClick={()=>setShowActions(false)}>x</button>
                </div>
                <p onClick={moveAllCards} className="actions-btn">Move all cards in this list...</p>
                <p onClick={deleteAllCards} className="actions-btn">Delete All cards in this list...</p>
                <p onClick={deleteList} className="actions-btn">Delete this list...</p>   
            </div>):""
            }
            
            <div className="list-cards">
                {
                    ctx.state[id].ar.map((item,idx)=><Card key={Date.now()+""+Math.random()} description={item} idx={idx} listName={id}/>)
                }
            </div>
            {
                !showPopUp?<p onClick={handlePopUp} className="add">+ Add Another Card</p>:
                <div ref={popupReF} className="popup">
                    <textarea ref={txtRef} name="add card" id="" placeholder="Enter Task Details..."></textarea>
                    <div className="popup-btns">
                        <button onClick={addCard}>Add Card</button>
                        <svg onClick={(e)=>setShowPopUp(false)

                        } stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="x-sign" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>                   
                </div>
            }
            
        </div>
    )
}

export default CardList;