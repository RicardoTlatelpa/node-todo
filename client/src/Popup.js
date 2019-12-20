import React from 'react';
import './styles/Popup.css';
function Popup(props) {
  
  return (
  <div className = "popup">
      <div className = "popupinner">
      <h1>Upload Files</h1>
      <form>
          <input type = "file"/>
      </form>
      <button id = "popupBtn" onClick = {() => props.popup()}>Done</button>
      </div>
  </div>)
  
}
export default Popup;