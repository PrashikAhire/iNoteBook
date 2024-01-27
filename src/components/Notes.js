import React, { useEffect , useRef, useState} from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'


import notesContext from '../contexts/notes/notesContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Notes = (props) => {
    const context = useContext(notesContext);
    const {notes,getNotes,editNote} = context;
    let navigate = useNavigate();

    useEffect(() => {
      if (localStorage.getItem('token')) {
        getNotes();
      } else {
        navigate('/login');

        // Redirect to login if no token
      }
      //eslint-disable-next-line
    }, []);
    
    const ref = useRef(null)
    const refClose = useRef(null)

    const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:""})

    const updatenote = (currentnote)=>{
       ref.current.click()
       setNote({id:currentnote._id,etitle:currentnote.title, edescription:currentnote.description, etag:currentnote.tag});
    }
    const handleClick = (e)=>{
      console.log("updating notes",note);
      editNote(note.id,note.etitle,note.edescription,note.etag)
      refClose.current.click()
      props.showAlert("Updated successfully","success")

        
    }
    const onChange = (e)=>{
       setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <>
     <Addnote showAlert={props.showAlert}/>
     <button ref = {ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div>
      <div className='container my-3'>
      <h2>Add a note </h2>
      <form className='my-3'>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription"  value={note.edescription} name='edescription' onChange={onChange}  minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" value={note.etag}  id="etag" name='etag' onChange={onChange}/>
  </div>
 
</form>
    </div>
    </div>
      </div>
      <div className="modal-footer">
        <button ref = {refClose}type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">Update notes</button>
      </div>
    </div>
  </div>
</div>

       <div className='row my-3'>
      <h2>Your notes</h2>
      <div className="container">
        {notes.length===0 && ' No notes to display'}
      </div>
      {notes.map((note)=>{
         return <Noteitem key={`note_${note._id}`} showAlert={props.showAlert} updatenote={updatenote} note={note}></Noteitem>;
      })}
      </div>
    </>
  )
}

export default Notes












