import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import * as styles from '../styles/header.module.scss'
import { StaticImage } from 'gatsby-plugin-image'
import { useLanguage } from './languageContext'

export default function Header ({ scrollSection }){
  const { language, setLanguage } = useLanguage()

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
    console.log('section name: ', sectionName)
    scrollSection(sectionName)
  }

  return(
  <header className={styles.header} >
      <div>
        <StaticImage className={styles.logo}
          src='../images/logoWebWhite.png'
          alt='logo home'
        />
    </div>
    <div className={styles.links}>
      {
        about.map((navigator, i) => {
          return(
          <a
            key={i}
            href='#'
            className={styles.link}
            onClick={(e)=> goToSection(navigator.link, e)}
          >
            {navigator.label}
          </a>)
        })
      }
      <button onClick={handleLanguage}>Change</button>
    </div>
  </header>)
}