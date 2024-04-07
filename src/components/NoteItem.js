import React, { useContext } from 'react';
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    const { note, updateNote } = props;

    const handleDeleteNote = () => {
        deleteNote(note._id);
        if (props.showAlert) {
            props.showAlert("Deleted successfully", "success");
        }
    };

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-item-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i
                            className="fa-solid fa-trash mx-1"
                            onClick={handleDeleteNote}
                            style={{ cursor: "pointer" }}
                        ></i>
                        <i className="fa-solid fa-file-pen mx-1" onClick = {() =>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
