import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import * as styles from '../styles/header.module.scss'
import { StaticImage } from 'gatsby-plugin-image'
import { useLanguage } from './languageContext'
import { useState } from 'react'

export default function Header ({ scrollSection }){
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)

  const handleLanguage = ()=>{
    setLanguage(language === 'en' ? 'es' : 'en')
  }

  const data = useStaticQuery(graphql`
    query {
      contentJson {
        en {
          navbar {
            label
            link
          }
        }
        es {
          navbar {
            label
            link
          }
        }
      }
    }
  `)

  const about = data.contentJson[language].navbar

  const goToSection = (sectionName, e)=>{
    e.preventDefault()
    scrollSection(sectionName)
    if (open)
      setOpen(false)
  }

  return(<>
    <div className={ !open ? styles.header_toggle : `${styles.header_toggle} ${styles.header_toggle_open}`} onClick={()=>setOpen(!open)}>
      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <header className={!open ? styles.header : styles.header_open} >
        <div>
          <StaticImage className={styles.logo}
            src='../images/logoWebWhite.png'
            alt='logo home'
          />
      </div>
      <div className={!open ? styles.links : styles.links_open}>
        {
          about.map((navigator, i) => {
            return(
            <a
              key={i}
              href='#'
              className={!open ? styles.link : styles.link_open}
              onClick={(e)=> goToSection(navigator.link, e)}
            >
              {navigator.label}
            </a>)
          })
        }
        <button onClick={handleLanguage} className={!open ? styles.language : styles.language_open}>
          {language === 'en' ? 'Español' : 'English'}
        </button>
      </div>
    </header>
  </>)
}