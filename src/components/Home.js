import React from 'react'
import Notes from './Notes'
import Alert from './Alert';
import Navbar from './Navbar';

export default function Home(props) 
{
  const {showAlert} = props
  return (
    <>
    <div>
    <div className="row">
   <div className="col-md-2">
     <Navbar/> 
   </div>
   <div className="col-md-10">
   <Alert alert={alert}/>
   <Notes showAlert={showAlert}/> 
   </div>
 </div>
 </div>   
    </>
  )
}
