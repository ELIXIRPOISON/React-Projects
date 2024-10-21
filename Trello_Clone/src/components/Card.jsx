import { useState,useContext,useEffect,useRef } from "react";
import { context } from "../App";
import { useDrag } from "react-dnd";
const Card = (props)=>{
    const ctx = useContext(context);
    const txtRef = useRef(null)
    const  popupRef = useRef(null);
    const [showEdit,setEdit] = useState(false);

    const [{isDragging}, dragRef] = useDrag(()=>({
        type: 'CARD',
        item: {idx: props.idx, listName: props.listName},
        collect: (monitor)=>({
            isDragging: monitor.isDragging(),
        }),
    }))
    
    const onDelete = ()=>{
        ctx.dispatch({type: 'DELETE_ITEM', payload: {idx: props.idx,listName: props.listName}})
    }

    const onUpdate = ()=>{
        setEdit(true);
    }

    const handleOutsideClick = (e)=>{
        if(popupRef.current && !popupRef.current.contains(e.target)) {
            setEdit(false)  
        }
    }

    useEffect(() => {
        if (showEdit && txtRef.current) {
            txtRef.current.focus();
            txtRef.current.value = props.description  
        }
    }, [showEdit]);
    
    useEffect(()=>{
        if(showEdit) {
            document.addEventListener('mousedown', handleOutsideClick)
        }
        else {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
        return ()=> {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    },[showEdit])

    const handleUpdate = ()=>{
        ctx.dispatch({type: 'EDIT_ITEM',payload: {updatedTask: txtRef.current.value, idx: props.idx, listName: props.listName}})
    }
    return (
        <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }} className="card">
            {
                !showEdit?
                <div>
                    <p>{props.description}</p>
                    <div className="options">
                        <svg onClick={onUpdate} stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        <svg onClick={onDelete} stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </div>
                </div>:
                <div ref={popupRef} className="edit-options">
                    <textarea ref={txtRef} name="updateCard" id=""></textarea>
                    <div className="popup-btns edit">
                        <button onClick={handleUpdate}>Add</button>
                        <svg onClick={()=>setEdit(false)} stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="x-sign" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                </div>
            }
        </div>
    )
}

export default Card;