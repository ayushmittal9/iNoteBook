 import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];
 
  // get all notes..........
  const getNotes = async () => {
    // Make API request to update the note
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {

      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    console.log("Token:", localStorage.getItem("token"));
    const json = await response.json();
    
    setNotes(json); // Update state with the notes array
  };
  
  const addNote = async (title, description, tag = "General") => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      console.log("Sending token:", localStorage.getItem("token"));
      const data = await response.json();
  
      if (!response.ok) {
        console.error("Response:", data); // log error response
        throw new Error("Failed to add note");
      }
  
      console.log("Note added:", data);
      setNotes(notes.concat(data));
    } catch (err) {
      console.error("Failed to add note", err);
    }
  };
  

  // Delete note.......
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = response.json();
    console.log(json);
    // Filter out the note with the given id
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };



  // Edit note (not implemented yet)........
  const editNote = async (id, title, description) => {
    // Make API request to update the note
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
       "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description }),
    });

    // Update state after successful API request
    const updatedNotes = notes.map((note) => {
      if (note._id === id) {
        return { ...note, title: title, description: description };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  // State for demonstration
  const s1 = {
    name: "harry",
    class: "5b",
  };
  const [state, setState] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setState({
        name: "ayush",
        class: "5h",
      });
    }, 3000);
  };

  // Using a different name for the state variable to avoid conflict
  const [notes, setNotes] = useState(notesInitial);

  return (
    <NoteContext.Provider
      value={{
        state,
        update,
        notes,
        setNotes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;  


