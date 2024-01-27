import React from 'react'
import { useContext } from 'react';
import notesContext from '../contexts/notes/notesContext';
const Noteitem = (props) => {
    const context = useContext(notesContext);
    const {deleteNote} = context;

    const {note,updatenote}  = props;
  return (
    <>
    <div className='col-md-4'>
      <div className="card my-3">
  <div className="card-body">
    <div className="d-flex align-item-center">
    <h5 className="card-title">{note.title}</h5>
    <i className="fa-solid fa-trash-can mx-3 my-1" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted successfully","success")
}}></i>
    <i className="fa-solid fa-pen-to-square mx-3 my-1" onClick={()=>{updatenote(note)}}></i>
    </div>
    <p className="card-text">{note.description}</p>
 
  </div>
</div>
    </div>
    </>
  )
}

export default Noteitem
