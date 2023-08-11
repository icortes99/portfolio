import React from 'react'
import * as styles from '../styles/socialMedia.module.scss'
import { GitHub, LinkedIn, WhatsApp } from './svgIcons'

export default function SocialMedia(){
  return(<>
    <section className={styles.social}>
      <a href='https://github.com/icortes99' target='_blank' rel="noreferrer">
        <GitHub />
      </a>
      <a href='https://wa.me/72768391' className={styles.social_whats} target='_blank' rel="noreferrer">
        <WhatsApp />
      </a>
      <a href='https://www.linkedin.com/in/icortes99/' target='_blank' rel="noreferrer">
        <LinkedIn />
      </a>
      <hr />
    </section>
    <hr className={styles.social_line} />
  </>)
}