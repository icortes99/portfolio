import * as React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'
import Background from '../components/background'
import * as styles from '../styles/index.module.scss'
import { graphql } from 'gatsby'
import { LanguageProvider, useLanguage } from '../components/languageContext'
import Header from '../components/header'
import Hero from '../components/hero'

export default function IndexPage({data}) {
  return(
    <LanguageProvider>
      <Header/>
      <Hero />
      <Background />
    </LanguageProvider>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title='Home' />

/*export const query = graphql`
  query MyQuery {
    allMarkdownRemark {
      edges {
        node {
          html
          frontmatter {
            date
            title
          }
        }
      }
    }
  }
`*/