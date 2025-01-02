import classes from "./Popup.module.css"
import { useState } from 'react'
 
 
 
export default function Popup(props) {
  let [hideMe, setHideMe] = useState(false)
 
  if(props.hide) { /* Move the show / hide code to the component itself: */
    return null
  }
 
  if(hideMe) { /* Move the show / hide code to the component itself: */
    return null
  }
 
  return (
    <div className={classes.mainDiv} onClick={() => setHideMe(true)} >
      <div className={classes.thePopup}>
        <h1>{props.text}</h1>  
        <div className={classes.actions}>
            <button onClick={props.clickedOK}>OK</button>
        </div>
      </div>
    </div>
  )
}