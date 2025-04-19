import React, { useState, useContext } from 'react';
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
    const { addNote } = useContext(noteContext);
    const [note, setNote] = useState({ title: "", description: "" });

    const handleClick = async (e) => {
        e.preventDefault();

        if (!note.title || !note.description) {
            alert("Please fill in both fields.");
            return;
        }

        // Call addNote from context
        await addNote(note.title, note.description);

        // Reset input fields
        setNote({ title: "", description: "" });
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={note.title}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={note.description}
                        onChange={onChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}
  disabled={note.title.length < 3 || note.description.length < 5}>
  Add Note
</button>

            </form>
        </div>
    );
};

export default AddNote;
