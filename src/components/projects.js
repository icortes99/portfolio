import React from 'react'
import * as styles from '../styles/projects.module.scss'
import { useLanguage } from './languageContext'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, StaticImage, getImage } from 'gatsby-plugin-image'

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
              image {
                childImageSharp {
                  fluid {
                    ImageSharpFluid
                  }
                }
              }
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
              image {
                childImageSharp {
                  fluid {
                    ImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const projects = data.contentJson[language].projects
  //const testImage = getImage(projects.list[0].image.childImageSharp.fluid.src)
  const testImage = getImage(projects.list[0].image.childImageSharp.fluid)

  return(<section className={styles.projects}>
    <div className={styles.projects_container}>
      <div className={styles.projects_title}>
        <h2>{projects.title}</h2>
        <hr className={styles.projects_line} />
      </div>
      <article>
        {console.log(projects.list[0])}
        <GatsbyImage image={testImage} alt='project image'/>
        {/*<StaticImage 
          src={projects.list[0].image}
          alt='project image'
          loading='lazy'
        />*/}
        article
      </article>
    </div>
  </section>)
}