import axios from 'axios';
import React from 'react';

const Delete = ({id}) => {
  
  const handleDelete = () => {

    axios.delete("http://localhost:3003/articles/" + id);
    window.location.reload(); 

  }


  
  return (

    <button onClick={() => {
      if(window.confirm("Êtes-vous sûr de supprimer cet article")) 
      {handleDelete()}}}>Supprimer</button>
    
  );
};

export default Delete;
