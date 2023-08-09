import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { useLanguage } from './languageContext'
import * as styles from '../styles/hero.module.scss'

export default function Hero({ sectionRef }){
  const {language} = useLanguage()

  const data = useStaticQuery(graphql`
    query {
      contentJson {
        en {
          hero {
            title
            subtitle
          }
        }
        es {
          hero {
            title
            subtitle
          }
        }
      }
    }
  `)

  const hero = data.contentJson[language].hero

  return(<section className={styles.hero} ref={sectionRef}>
    <div>
      <h1>{hero.title}</h1>
      <h2>{hero.subtitle}</h2>
    </div>
  </section>)
}