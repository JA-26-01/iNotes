import React,{useContext,useEffect,useRef,useState} from 'react'
import NoteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom'
import NoteItem from './NoteItem';

function Notes() {
    const order =-1;
    const context =  useContext(NoteContext);
    let navigate = useNavigate();
    const {notes,getNotes,editNote} = context;
    useEffect(() => {
      if(localStorage.getItem('token'))
       {
        getNotes(order)
       }  
      else
      {
        navigate("/")
      }  
      // eslint-disable-next-line
  }, [])

  const ref =useRef(null);
  const close = useRef(null)
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""});

  const updateNote = (curr_note) =>
  {
    ref.current.click();
    setNote({id:curr_note._id,etitle:curr_note.title,edescription:curr_note.description,etag:curr_note.tag})
  }

  const onchange = (e) =>
  {
   setNote({...note,[e.target.name]: e.target.value})
  }
  const editNoteClick = (e) =>
  {
    e.preventDefault()
    console.log("Updating the note with title: "+note.etitle)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    close.current.click()
  }

  return (
      <div className="container">
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-body">
                <form>
            <div className="form-group my-3">
              <input type="text" className="form-control title" id="etitle" name="etitle" value={note.etitle.toUpperCase()} minLength={5} onChange={onchange} required />
            </div>
            <div className="form-group my-3">
            {/* <input type="text" className="form-control tag" id="etag" name="etag" value={note.etag} onChange={onchange}/> */}
            <select className="form-control tag" id="etag" name="etag" value={note.etag} onChange={onchange}>
                  <option value="work">work</option>
                  <option value="study">study</option>
                  <option value="misc">misc</option>
              </select>
            </div>
            <div className="form-group my-3">
              <input type="text" className="form-control desc" id="edescription" name="edescription" minLength={10} value={note.edescription} onChange={onchange} required/>
            </div>
            </form>
                </div>
                <div className="modal-footer">
                  <button ref={close} disabled={note.etitle.length<5 || note.edescription.length<10 } type="button" className="btn btn-primary submit" data-bs-dismiss="modal" onClick={editNoteClick}>Save changes</button>
                </div>
              </div>
            </div>
          </div>

        <h2>Your notes</h2>
        <div className="row my-3">
        {/* <select className='date' onClick={sortDate}>
          <option value="">sort by - </option>
          <option value="ascending">ascending</option>
          <option value="descending">descending</option>
        </select> */}
        <div className="container mx-2">
        {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note)=>
        {
        return <NoteItem key={note._id} note={note} updateNote={updateNote}/>
        }
        )}
        </div>
      </div>
  )
}

export default Notes
