import * as React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'
import Background from '../components/background'
import * as styles from '../styles/index.module.scss'
import { graphql } from 'gatsby'
import { LanguageProvider, useLanguage } from '../components/languageContext'
import Header from '../components/header'

export default function IndexPage({data}) {
  return(
    <LanguageProvider>
      <div className={styles.particles}>
        {/*console.log('data: ', data.allMarkdownRemark.edges[0].node.frontmatter.title)*/}
        <StaticImage
          src='../images/logo.png'
          loading='eager'
          width={64}
          quality={95}
          formats={['auto', 'webp', 'avif']}
          alt=''
          style={{ background: '#000000', borderRadius: '50%'}}
        />
        <h1>
          Welcome to <b>Gatsby!</b>
        </h1>
        <p className={styles.intro}>
          <b>Example pages:</b>{' '}
          <br />
          Edit <code>src/pages/index.js</code> to update this page.
        </p>
      </div>
      <ul className={styles.list}></ul>
      <Header/>
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