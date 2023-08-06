import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { useLanguage } from './languageContext'

export default function Hero(){
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

  return(<section>
    <h1>{hero.title}</h1>
    <h2>{hero.subtitle}</h2>
  </section>)
}