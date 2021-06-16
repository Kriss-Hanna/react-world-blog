import React from 'react';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import Article from '../components/Article';
import axios from 'axios';
import { useEffect, useState } from 'react';

const News = () => {

  const [newsData, setNewsData] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {

    getData()
    
  }, [])

  const getData = () => {
    axios.get("http://localhost:3003/articles")
    .then((res) => setNewsData(res.data))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(content.length < 140 || author.length < 3){
      setError(true)
    } else {       
        axios.post("http://localhost:3003/articles", {
        author: author,
        content: content,
        date: Date.now()
      }).then(() => {
        setError(false)
        setAuthor("");
        setContent("");
        getData();
      }) 
      }
  }
  
  return (
    <div className="news-container">
      <Navigation />
      <Logo />
      <h1>News</h1>

      <form onSubmit={handleSubmit}>

        <input 
        style={{ border: error ? "1px solid red" : "1px solid #61dafb"}}
        type="text" 
        placeholder="Votre nom" 
        onChange={(e) => setAuthor(e.target.value)} 
        value={author} 
        />
        {error && <p>Veuillez renseigner un nom</p>}

        <textarea 
        style={{ border: error ? "1px solid red" : "1px solid #61dafb"}} 
        placeholder="Votre message" 
        onChange={(e) => setContent(e.target.value)}
        value={content}
        ></textarea>
        {error && <p>Veuillez écrire un minimum de 140 caractères</p>}

        <input 
        type="submit" 
        value="Envoyer votre message" 
        />
  
      </form>

      <ul>{newsData
      .sort((a,b) => b.date - a.date)
      .map((article) => (
        <Article article={article} key={article.id} />
      ))}</ul>
      
    </div>
  );
};

export default News;
