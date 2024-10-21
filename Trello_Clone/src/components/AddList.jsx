import { useState,useRef,useEffect,useContext } from "react"
import { context } from "../App";
const AddList = ()=>{
    const popRef = useRef(null);
    const [popup, showPopUp] = useState(false);
    const txtRef = useRef(null);
    const ctx = useContext(context);
    const handlePopUp = ()=>{
        showPopUp(true);
    }
    const handleOutsideClick = (e) => {
        if(popRef.current && !popRef.current.contains(e.target)) {
            showPopUp(false);
        }
    }    
    useEffect(()=>{
        if(popup) {
            document.addEventListener('mousedown', handleOutsideClick);
        }
        else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
        return ()=>{
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    },[popup])

    useEffect(()=>{
        txtRef.current?.focus();
    },[popup])
    const handleUpdate = ()=>{
        if(txtRef.current.value == "") {
            return;
        }
        ctx.dispatch({type: 'ADD_ANOTHER_LIST',payload: txtRef.current.value})
        showPopUp(false)   
    }

    return (
        <>
        {!popup?<p className="add-card" onClick={handlePopUp}>+ Add Another List</p>:
        <div ref={popRef} className="popup add-pop-style">
                <textarea ref={txtRef} name="updateCard" placeholder="Enter Title..." id=""></textarea>
                <div className="popup-btns">
                    <button onClick={handleUpdate}>Add</button>
                    <svg onClick={()=>showPopUp(false)} stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="x-sign" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
            </div>
        }     
        </>
    )
}

export default AddList;