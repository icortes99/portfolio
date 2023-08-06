import * as React from 'react'
import { Link, graphql } from 'gatsby'
import * as styles from '../styles/header.module.scss'
import { StaticImage } from 'gatsby-plugin-image'
import { useLanguage } from './languageContext'

export default function Header ({ data }){
  const { language, setLanguage } = useLanguage()

  const handleLanguage = ()=>{
    setLanguage(language === 'en' ? 'es' : 'en')
  }

  return(
  <header className={styles.header} >
    <StaticImage 
      src='../images/logo.png'
      loading='eager'
      width={64}
      quality={95}
      formats={['auto', 'webp', 'avif']}
      alt=''
    />
    <button onClick={handleLanguage}>Change</button>
    {
      /*map(navigator => {
        <Link
          to='/'
          lclassName={styles.link}
        >
          navigator
        </Link>
      })*/
      console.log('language', language)
    }
  </header>)
}

/*export const headerData = graphql `
  //
`*/