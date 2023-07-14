import React,{useState} from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
import Navbar from './Navbar'
import Alert from './Alert'
import "../App.css"

function AddNote(props) 
{
  const context =  useContext(NoteContext);
  const {addNote} = context;
  const [note, setNote] = useState({title:"",description:"",tag:"default"});
  const onchange = (e) =>
  {
   setNote({...note,[e.target.name]: e.target.value})
  }
  const addNoteClick = (e) =>
  {
    addNote(note.title,note.description,note.tag)
    props.showAlert("Note added to list","success")
  }
  return (
    <>
    <div>
       <div className="row">
      <div className="col-md-2">
        <Navbar/> 
      </div>
      <div className="col-md-10">
      <Alert alert={alert}/>
      <div className="container">
      <h2>Add a note</h2>
      <form className='formdesign2'>
            <div className="form-group my-3">
              <label htmlFor="title">Title</label>
              <input type="text" className="form-control" id="title" name="title" onChange={onchange} minLength={5} required/>
            </div>
            <div className="form-group my-3">
              <label htmlFor="description">Description</label>
              <input type="text" className="form-control" id="description" name="description" minLength={10} onChange={onchange} required/>
            </div>
            <div className="form-group my-3">
              <label htmlFor="tag">Tag</label>
              <select className="form-control" id="tag" name="tag" onChange={onchange}>
                  <option value="default">--select--</option>
                  <option value="work">work</option>
                  <option value="study">study</option>
                  <option value="misc">misc</option>
              </select>
            </div>
            <button type="submit" disabled={note.title.length<5 || note.description.length<10 } className="btnbtn-create" onClick={addNoteClick}>Create</button>
      </form>
      </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default AddNote








//const a = useContext(NoteContext)
  // useEffect(() => {
  //   return () => {
  //     a.update()
  //   };
  // }, []);