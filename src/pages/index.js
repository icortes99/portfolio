import React from 'react'
import { useRef, lazy, Suspense } from 'react'
import * as styles from '../styles/index.module.scss'
import { LanguageProvider } from '../components/languageContext'
import Seo from '../components/seo'
//import Background from '../components/background'
//import Header from '../components/header'
//import Hero from '../components/hero'
//import About from '../components/about'
//import Projects from '../components/projects'
//import Contact from '../components/contact'
//import Footer from '../components/footer'
//import SocialMedia from '../components/socialMedia'

const Background = lazy(()=> import('../components/background'))
const Header = lazy(()=> import('../components/header'))
const Hero = lazy(()=> import('../components/hero'))
const About = lazy(()=> import('../components/about'))
const Projects = lazy(()=> import('../components/projects'))
const Contact = lazy(()=> import('../components/contact'))
const Footer = lazy(()=> import('../components/footer'))
const SocialMedia = lazy(()=> import('../components/socialMedia'))

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

  return(
    <div className={styles.index}>
      <LanguageProvider>
        <Header scrollSection={scrollSection}/>
        <Hero scrollSection={scrollSection} sectionRef={sectionRefs.hero}/>
        <Suspense fallback={<h2>Loading...</h2>}>
          <About sectionRef={sectionRefs.about}/>
          <div ref={sectionRefs.projects}></div>
          <Projects />
          <div ref={sectionRefs.contact}></div>
          <Contact />
          <Footer />
          <SocialMedia />
        </Suspense>
        <Background />
      </LanguageProvider>
    </div>
  )
}

export const Head = () => <Seo title='Ivan Cortes Solis' />