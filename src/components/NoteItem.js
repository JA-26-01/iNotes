import React from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

function NoteItem(props)
{
  const context =  useContext(NoteContext);
  const {deleteNote} = context;
  const {note, updateNote} = props;
  return (
    <div className='col-md-4'>
    <div className="card my-3">
        <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description.slice(0,100)}</p>
            <p className="tag">{note.tag}</p>
            <div className="options">
            <i className="fa-regular fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i> 
            </div>
    </div>
    </div>
    </div>
  )
}

export default NoteItem
