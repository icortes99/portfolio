import React from'react'
import * as styles from '../styles/contact.module.scss'
import { useLanguage } from './languageContext'
import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { useState } from 'react'
import { useRef } from 'react'
import Message from './messages'

export default function Contact({ sectionRef }){
  const { language } = useLanguage()
  const api = `${process.env.GATSBY_API}email/send`
  const codeApi = process.env.GATSBY_API_CODE
  const vercelToken = process.env.VERCEL_TOKEN
  const [isLoading, setIsLoading] = useState(false)
  const [popUp, setPopUp] = useState({
    visible: false,
    status: 'ok',
    message: 'Email sent'
  })
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

    setIsLoading(true)

    const contactData = {
      'name': e.target.elements.name.value,
      'email': e.target.elements.email.value,
      'message': e.target.elements.message.value,
      'language': language,
      'code': codeApi
    }
    
    formRef.current.reset()

    fetch(api, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${vercelToken}`
      },
      body: JSON.stringify(contactData)
    }).then(res => {
      setIsLoading(false)
      console.log('respusta del api: ', res)
      if (res.ok){
        setPopUp({
          ...popUp,
          visible: true,
          status: 'ok',
          message: 'Email sent'
        })
      } else {
        setPopUp({
          ...popUp,
          visible: true,
          status: 'bad',
          message: 'Email was not sent'
        })
      }
    })
    .catch(err => {
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
          <input name='name' required placeholder={contact.placeholder[0]}/>
          <input 
            name='email' 
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