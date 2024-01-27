import { useState } from "react";
import notesContext from "./notesContext";

const NotesState=(props)=>{
 const host = "http://localhost:5000"
    const notesInitial = []
      

    const [notes , setNotes] = useState(notesInitial);
     //Add get all note 
     const getNotes=async()=>{
      //TODO : API call
      const response = await fetch(`${host}/api/notes/getnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
      });
      
      const json  = await response.json();
      //json mai jo bhi hoga as notes set ho jayga
      setNotes(json);
    }


    //Add note 
    const addNote=async(title,description,tag)=>{
      //TODO : API call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      const note = await response.json();
      setNotes(notes.concat(note))

    }


    //Delete note
    const deleteNote=async(id)=>{
        //TODO : API call
        //to delete from front end 
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({})
        });
        const json = response.json();
        console.log(json);
        //it will delete only from frontend 
         console.log("Deleting the note of id " + id)
        const newNotes = notes.filter((note)=>{
          return note._id!==id
        })
         setNotes(newNotes);

    }


    //Edit note
    const editNote=async(id,title,description,tag)=>{
// API Call 
const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    "auth-token": localStorage.getItem('token')
  },
  body: JSON.stringify({title, description, tag})
});
const json = await response.json();
console.log(json);

let newNotes = JSON.parse(JSON.stringify(notes))
          // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id===id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setNotes(newNotes);
    }

   
    return (
    <notesContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
        {props.children}
    </notesContext.Provider>
    )
}

export default NotesState;

// const NoteState = (props) => {
//   const host = "http://localhost:5000"
//   const notesInitial = []
//   const [notes, setNotes] = useState(notesInitial)
//   // Get all Notes
//   const getNotes = async () => {
//     // API Call 
//     const response = await fetch(`${host}/api/notes/getnotes`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": localStorage.getItem('token')
//       }

//     });
//     const json = await response.json()
//     console.log(json)
//     setNotes(json)
//   }
//   // Add a Note
//   const addNote = async (title, description, tag) => {
//     // TODO: API Call
//     // API Call 
//     const response = await fetch(`${host}/api/notes/addnote`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": localStorage.getItem('token')
//       },
      
//       body: JSON.stringify({title, description, tag})
//     });

//     const json = await response.json();
//     console.log(json)


//     console.log("Adding a new note")
//     const note = {
//       "_id": "61322f119553781a8ca8d0e08",
//       "user": "6131dc5e3e4037cd4734a0664",
//       "title": title,
//       "description": description,
//       "tag": tag,
//       "date": "2021-09-03T14:20:09.668Z",
//       "__v": 0
//     };
//     setNotes(notes.concat(note))
//   }
//   // Delete a Note
//   const deleteNote = async (id) => {
//     // API Call
//     const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": localStorage.getItem('token')
//       }
//     });
//     const json = response.json();
//     console.log(json)
//     console.log("Deleting the note with id" + id);
//     const newNotes = notes.filter((note) => { return note._id !== id })
//     setNotes(newNotes)
//   }
//   // Edit a Note
//   const editNote = async (id, title, description, tag) => {
//     // API Call 
//     const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": localStorage.getItem('token')
//       },
//       body: JSON.stringify({title, description, tag})
//     });
// const json = await response.json();
//     console.log(json)

//      let newNotes = JSON.parse(JSON.stringify(notes))
//     // Logic to edit in client
//      for (let index = 0; index < newNotes.length; index++) {
//       const element = newNotes[index];
//       if (element._id === id) {
//         newNotes[index].title = title;
//         newNotes[index].description = description;
//         newNotes[index].tag = tag; 
//         break; 
//       }
//        }  
//     setNotes(newNotes);
//   }

//   return (
//     <notesContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
//       {props.children}
//     </notesContext.Provider>
//   )
// }
// export default NoteState;




















