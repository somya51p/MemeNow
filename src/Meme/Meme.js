import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useHistory } from 'react-router-dom';

export const Meme = () => {

  const [memes, setMemes] = useState([]);
  const [memeNumber, setMemeNumber] = useState(0);
  const [messages, setMessage] = useState([]);

  const history = useHistory();

  const setCaption = (e, index) => {
    const text = e.target.value || '';
    setMessage(
      messages.map((c, i) => {
        if(index === i) {
          return text;
        } else {
          return c;
        }
      })
    );
  };

  const createMeme = () => {
    const currentMeme = memes[memeNumber];
    const formData = new FormData();

    formData.append('username', 'somya51p');
    formData.append('password', 'somya123');
    formData.append('template_id', currentMeme.id);
    messages.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));

    fetch('https://api.imgflip.com/caption_image', {
      method: 'POST',
      body: formData
    }).then(res => {
      res.json().then(res => {
        history.push(`/generated?url=${res.data.url}`);
      });
    });
  };

  const shuffleMemes = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes').then(res => {
      res.json().then(res => {
        const data = res.data.memes;
        shuffleMemes(data);
        setMemes(data);
      });
    });
  }, []);

  useEffect(() => {
    if(memes.length) {
       setMessage(Array(memes[memeNumber].box_count).fill(''));
    }
  }, [memeNumber, memes]);

  return(
    memes.length ? 
    <div className={styles.header}>
      <button onClick={createMeme} className={styles.generate}>Generate</button>
      <button onClick={() => setMemeNumber(memeNumber + 1)} className={styles.skip}>Next</button>
      {
        messages.map((c, index) => (
          <input onChange={(e) => setCaption(e, index)} key={index} />
        ))
      }
      <img alt= 'meme' src={memes[memeNumber].url} />
    </div> : 
    <></>
  );
};
