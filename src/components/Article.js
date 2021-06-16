import axios from 'axios';
import React, { useState } from 'react';
import Delete from './Delete';

const Article = (props) => {

  const {author, content, date, id} = props.article;

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("")

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR")
    return newDate
  };

  const handleEdit = () => {

    const data = {
      author: author,
      content : editedContent ? editedContent : content,
      date: Date.now(),
    }
    
    axios.put("http://localhost:3003/articles/" + id, data)
    .then(() => {
      setEditedContent(false)
    })
    setIsEditing(false)
  }
  

  return (
    <div className="article" style={{background: isEditing ? "#f3feff" : "white"}}>
      <div className="card-header">
        <h3>{author}</h3>
        <em>Posté le {dateParser(date)}</em>
      </div>

      {isEditing ? (
      <textarea onChange={(e) => setEditedContent(e.target.value)} autoFocus defaultValue={editedContent ? editedContent : content}></textarea>
      ) : (
      <p>{editedContent ? editedContent : content}</p>
      )} 

      <div className="btn-container">
        {isEditing ? (
          <button onClick={handleEdit}>Valider</button>
        ) : <button onClick={() => setIsEditing(true)}>Edit</button> }
        
        <Delete id={id}/>
      </div>
    </div>
  );
};

export default Article;
