import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
  const a = useContext(noteContext)
  useEffect(()=>{
    a.update()
  },[a]);
  return (
    <>
    <div className="container d-flex justify-content-center align-items-center login-container mt-4">
    <div className="text-center mt-5">
            <h2 className="fs-bold"><mark><strong>iNotebook</strong></mark></h2>
            <p className="lead text-secondary mt-4">iNotebook is a<strong><mark>secure way</mark></strong>to takes a notes.it store all your notes and categories.morever these notes are <strong><mark>store in the cloud.</mark></strong><br />Hence, you can<strong><mark>access it from anywhere </mark></strong>and from any device you wish.Notes can be <strong><mark>edited and deleted</mark></strong>with just a single click.the best part is this service is <strong><mark>completly free.</mark></strong></p>
          </div>
    </div>
    
    </>
  )
}

export default About
