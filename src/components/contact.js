import React from'react'
import * as styles from '../styles/contact.module.scss'
import { useLanguage } from './languageContext'
import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { useState } from 'react'
import { useRef } from 'react'
import Message from './messages'
import emailjs from '@emailjs/browser'

export default function Contact({ sectionRef }){
  const { language } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [popUp, setPopUp] = useState({
    visible: false,
    status: 'ok',
    message: 'Email sent'
  })
  const emailService = netlifyConfig.build.environment.EMAIL_SERVICE //process.env.EMAIL_SERVICE
  const emailPublicKey = netlifyConfig.build.environment.EMAIL_PUBLIC_KEY //process.env.EMAIL_PUBLIC_KEY
  const formRef = useRef(null)
  
  const data = useStaticQuery(graphql`
      query {
      contentJson {
        en {
          contact {
            content
            title
            placeholder
          }
        }
        es {
          contact {
            content
            title
            placeholder
          }
        }
      }
    }
  `)

  const handleSubmit = (e)=>{
    e.preventDefault()

    console.log('process: ', process.env, process)

    setIsLoading(true)

    emailjs.sendForm(emailService, `${language}_template`, formRef.current, emailPublicKey)
    .then((result) => {
      console.log(result)
        formRef.current.reset()
        setIsLoading(false)
        setPopUp({
          ...popUp,
          visible: true,
          status: 'ok',
          message: 'Email sent'
        })
    }, (error) => {
      console.log(error)
      console.log('env 1: ', emailService, ' env 2: ', emailPublicKey)
      setIsLoading(false)
      setPopUp({
        ...popUp,
        visible: true,
        status: 'bad',
        message: 'Email was not sent'
      })
    })
  }
  
  const contact = data.contentJson[language].contact

  return(<section className={styles.contact} ref={sectionRef}>
    <div className={styles.contact_container}>
      <div className={styles.contact_title}>
        <h2>{contact.title}</h2>
        <hr className={styles.contact_line} />
      </div>
      <p>{contact.content}</p>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className={styles.contact_double}>
          <input name='user_name' required placeholder={contact.placeholder[0]}/>
          <input 
            name='user_email' 
            required 
            placeholder={contact.placeholder[1]}
            pattern='/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/'
          />
        </div>
        <div className={styles.contact_send}>
          <textarea name='message' required placeholder={contact.placeholder[2]}></textarea>
          <button type='submit'>{
            !isLoading ?
            contact.placeholder[3] :
            <span className={styles.contact_loader}></span>
          }</button>
        </div>
      </form>
      <div className={styles.contact_logo_container}>
        <StaticImage className={styles.contact_logo}
          src='../images/logoWebWhite.png'
          alt='logo home'
          loading='lazy'
        />
      </div>
    </div>
    <Message 
      data ={popUp}
      setData={setPopUp}
    />
  </section>)
}