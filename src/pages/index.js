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
import { useRef } from 'react'
import SocialMedia from '../components/socialMedia'

export default function IndexPage() {
  const sectionRefs = {
    hero: useRef(null),
    about: useRef(null),
    projects: useRef(null),
    contact: useRef(null)
  }

  const scrollSection = (sectionName)=>{
    let offsetY = 0
    let blockValue = 'start'
    let inlineValue = 'nearest'

    if (sectionName === 'about')
      blockValue = 'center'
    else if (sectionName === 'projects' || sectionName === 'contact'){
      inlineValue = 'start'
      offsetY = -100
    }

    sectionRefs[sectionName].current.scrollIntoView({
      behavior: 'smooth',
      block: blockValue,
      inline: inlineValue,
      top: offsetY
    })
  }

  //console.log('process: ', emailService, ', env 2: ', emailPublicKey)

  return(
    <div className={styles.index}>
      <LanguageProvider>
        <Header scrollSection={scrollSection}/>
        <Hero scrollSection={scrollSection} sectionRef={sectionRefs.hero}/>
        <About sectionRef={sectionRefs.about}/>
        <div ref={sectionRefs.projects}></div>
        <Projects />
        <div ref={sectionRefs.contact}></div>
        <Contact />
        <Footer />
        <SocialMedia />
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
export const Head = () => <Seo title='Ivan Cortes Solis' />