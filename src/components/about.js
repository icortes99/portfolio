import React from 'react'
import * as styles from '../styles/about.module.scss'
import { graphql, useStaticQuery } from 'gatsby'
import { useLanguage } from './languageContext'
import { StaticImage } from 'gatsby-plugin-image'

export default function About({ sectionRef }){
  const data = useStaticQuery(graphql`
    query Header {
      contentJson {
        en {
          about {
            content
            cta
            skills
            title
          }
        }
        es {
          about {
            content
            cta
            skills
            title
          }
        }
      }
    }
  `)

  const { language } = useLanguage()

  const about = data.contentJson[language].about

  return(<section className={styles.about} ref={sectionRef}>
    <div className={styles.about_container}>
      <div className={styles.about_text}>
        <div className={styles.about_title_container}>
          <h2>{about.title}</h2>
          <hr className={styles.about_line} />
        </div>
        <p>{about.content}</p>
        <span>{about.cta}</span>
        <div className={styles.about_skills}>
          <ul className={styles.about_skills_list}>{
            about.skills.map((skill, i)=>{
              if(i < 3){
                return(
                  <li key={i}>{skill}</li>
                )
              } else {
                return(null)
              }
            })
          }</ul>
          <ul className={styles.about_skills_list}>{
            about.skills.map((skill, i)=>{
              if(i >= 3){
                return(
                  <li key={i}>{skill}</li>
                )
              } else {
                return(null)
              }
            })
          }</ul>
        </div>
      </div>
      <div className={styles.about_image_container}>
        <StaticImage
          className={styles.about_image}
          src='../images/perfil.jpg'
          alt='my picture'
          loading='lazy'
        />
        <div className={`${styles.about_corner_border} ${styles.about_top_right}`}></div>
        <div className={`${styles.about_corner_border} ${styles.about_bottom_left}`}></div>
      </div>
    </div>
  </section>)
}