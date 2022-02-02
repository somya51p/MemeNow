import React, { useState } from 'react';
import styles from './styles.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useClipboard } from 'use-clipboard-copy';
import { saveAs, } from 'file-saver';
import { FacebookShareButton, LinkedinShareButton,TelegramShareButton,WhatsappShareButton, } from 'react-share';
import { FacebookIcon,LinkedinIcon,TelegramIcon, WhatsappIcon, } from 'react-share';

export const MemeGenerated = () => {

  const clipboard = useClipboard();
  const history = useHistory();
  const location = useLocation();
  const url = new URLSearchParams(location.search).get('url');
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    clipboard.copy(url);
    setCopied(true);
  };

  const saveMeme = () => {
    saveAs(url, "image.png");
  };

  return(
    <div className={styles.header}>
      <button onClick={() => history.push('/')} className={styles.btn}>
        Return back!
      </button>
      { url && <img alt='meme' id='memee' src={url} /> }
      <button onClick={copyLink} className={styles.copy}>
        {copied ? 'Link copied!' : 'Copy link'}
      </button>
      <button className={styles.btn}>
        <a onClick={saveMeme} >
          Click to download
        </a>
      </button>
      <div className={styles.icons}>
        <FacebookShareButton url={url}>
            <FacebookIcon logoFillColor="white" round={true}></FacebookIcon>
        </FacebookShareButton>

        <TelegramShareButton url={url}>
            <TelegramIcon logoFillColor="white" round={true}></TelegramIcon>
        </TelegramShareButton>

        <LinkedinShareButton url={url}>
            <LinkedinIcon logoFillColor="white" round={true}></LinkedinIcon>
        </LinkedinShareButton>

        <WhatsappShareButton url={url}>
            <WhatsappIcon logoFillColor="white" round={true}></WhatsappIcon>
        </WhatsappShareButton>
      </div>
    </div>
  );
};
