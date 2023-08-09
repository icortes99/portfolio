import * as React from 'react'
import Seo from '../components/seo'
import Background from '../components/background'
import * as styles from '../styles/index.module.scss'
import { LanguageProvider } from '../components/languageContext'
import Header from '../components/header'
import Hero from '../components/hero'
import About from '../components/about'
import Projects from '../components/projects'
import Contact from '../components/contact'
import Footer from '../components/footer'

export default function IndexPage() {
  return(
    <div className={styles.index}>
      <LanguageProvider>
        <Header/>
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
        <Background />
      </LanguageProvider>
    </div>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />