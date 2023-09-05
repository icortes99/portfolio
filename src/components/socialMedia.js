import React from 'react'
import * as styles from '../styles/socialMedia.module.scss'
import { GitHub, LinkedIn, WhatsApp } from './svgIcons'
import { useState } from 'react'

export default function SocialMedia(){
  const [open, setOpen] = useState(false)

  return(<>
    <div className={ !open ? styles.social_toggle : `${styles.social_toggle} ${styles.social_toggle_open}`} onClick={()=>setOpen(!open)}>
      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <section className={!open ? styles.social : `${styles.social} ${styles.social_open}`}>
      <a 
        href='https://github.com/icortes99' 
        target='_blank' 
        rel='noreferrer'
        aria-label='Github'
      >
        <GitHub />
      </a>
      <a 
        href='https://wa.me/72768391' 
        className={styles.social_whats} 
        target='_blank' 
        rel='noreferrer'
        aria-label='Whatsapp'
      >
        <WhatsApp />
      </a>
      <a 
        href='https://www.linkedin.com/in/icortes99/' 
        target='_blank' 
        rel='noreferrer'
        aria-label='Linked In'
      >
        <LinkedIn />
      </a>
      <hr />
    </section>
    <hr className={styles.social_line} />
  </>)
}