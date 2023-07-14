import NoteContext from "./NoteContext";
import { useState } from "react";


const NoteState = (props) =>
{
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes
  const getNotes = async (order) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchall`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "authtoken": localStorage.getItem('token')
      },
    });
    const json = await response.json() 
    setNotes(json)
    console.log(json)
  }


      //Add a note
      const addNote = async (title,description,tag) =>
      {
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "authtoken" : localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag})
        });
        const note = await response.json()
        setNotes(notes.concat(note))
        console.log("Note added")
        console.log(notes)
      }

      // Edit a note
      const editNote = async (id,title,description,tag) =>
      {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            "authtoken" : localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}) //important
        });
        const json = await response.json()
        console.log(json)
        
        let newNotes=JSON.parse(JSON.stringify(notes))
        for(let i=0;i<newNotes.length;i++)
        {
          if(notes[i]._id===id)
          {
            newNotes[i].title=title;
            newNotes[i].description=description;
            newNotes[i].tag=tag;
          }
        }
        setNotes(newNotes)
        console.log("Note updated")
        console.log(notes)
      }

      //Delete a node

      const deleteNote = async (id) =>
      {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "authtoken" : localStorage.getItem('token')
          },
        });
       const json=response.json();
       console.log(json)
       console.log("Deleting node with id: "+ id)
       const newnotes=notes.filter((note)=>{return note._id!==id})
       setNotes(newnotes)
      }

 return (
    <NoteContext.Provider value={{notes,addNote,getNotes,editNote,deleteNote}}>
        {props.children}
    </NoteContext.Provider>
 )
}

export default NoteState;













//const s1 = 
    // {
    //     "Name":"Jesmine",
    // }
    // const [state,setstate] = useState(s1);
    // const update = () =>
    // {
    //     setTimeout(() =>{
    //         setstate({
    //         "Name":"Akhter"
    //     })},1000);
    // }