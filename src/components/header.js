import * as React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import * as styles from '../styles/header.module.scss'
import { StaticImage } from 'gatsby-plugin-image'
import { useLanguage } from './languageContext'

export default function Header (){
  const { language, setLanguage } = useLanguage()

  const handleLanguage = ()=>{
    setLanguage(language === 'en' ? 'es' : 'en')
    console.log('changed to: ', language)
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
          <Link
            key={i}
            to={`${navigator.link}`}
            className={styles.link}
          >
            {navigator.label}
          </Link>)
        })
      }
      <button onClick={handleLanguage}>Change</button>
    </div>
  </header>)
}