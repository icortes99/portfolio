import React from 'react'
import * as styles from '../styles/footer.module.scss'
import { useLanguage } from './languageContext'
import { graphql, useStaticQuery } from 'gatsby'

export default function Footer(){
  const { language } = useLanguage()

  const data = useStaticQuery(graphql`
    query {
      contentJson {
        en {
          footer
        }
        es {
          footer
        }
      }
    }
  `)

  const footer = data.contentJson[language].footer

  return(<footer className={styles.footer}>
    <p>{footer}</p>
  </footer>)
}