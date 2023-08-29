import React from 'react'
import * as styles from '../styles/projects.module.scss'
import { useLanguage } from './languageContext'
import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { GitHub, GoTo } from './svgIcons'

export default function Projects(){
  const {language} = useLanguage()
  
  const data = useStaticQuery(graphql`
    query {
      contentJson {
        en {
          projects {
            list {
              title
              type
              tech
              repo
              link
              description
              image
            }
            title
          }
        }
        es {
          projects {
            title
            list {
              description
              link
              repo
              tech
              title
              type
              image
            }
          }
        }
      }
    }
  `)

  const projects = data.contentJson[language].projects

  return(<section className={styles.projects}>
    <div className={styles.projects_container}>
      <div className={styles.projects_title}>
        <h2>{projects.title}</h2>
        <hr className={styles.projects_line} />
      </div>
      {projects.list.map((project, i)=>{
        return(<article className={i % 2 === 0? `${styles.projects_art}` : `${styles.projects_art_reverse}`} key={i}>
          <div className={styles.projects_image_container}>
            { 
              i === 0 ? 
              <StaticImage 
                className={`${styles.projects_image}`}
                src='../images/todosapp.png'
                alt='project image'
                loading='lazy'
              /> : 
              <StaticImage 
                className={`${styles.projects_image}`}
                src='../images/disneytravel.png'
                alt='project image'
                loading='lazy'
              />
            }
          </div>
          <div className={styles.projects_data_container}>
            <div className={i % 2 === 0? `${styles.projects_data_title}` : `${styles.projects_data_title_left}`}>
              <p>{project.type}</p>
              <h3>{project.title}</h3>
            </div>
            <div className={i % 2 === 0? `${styles.projects_data_description}` : `${styles.projects_data_description_left}`}>
              <p>{project.description}</p>
            </div>
            <div>
              <ul className={i % 2 === 0? `${styles.projects_data_skills}` : `${styles.projects_data_skills_left}`}>
                {project.tech.map((technology, i)=>{
                  return(<li key={i}>
                    {technology}
                  </li>)
                })}
              </ul>
              <div className={i % 2 === 0? `${styles.projects_data_links}` : `${styles.projects_data_links_left}`}>
                <a href={`${project.repo}`} target='_blank' rel='noreferrer'>
                  <GitHub />
                </a>
                <a href={`${project.link}`} target='_blank' rel='noreferrer'>
                  <GoTo />
                </a>
              </div>
            </div>
          </div>
        </article>)
      })}
    </div>
  </section>)
}