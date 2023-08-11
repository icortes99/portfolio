import React, { useEffect } from 'react'
import * as styles from '../styles/message.module.scss'

export default function Message({ data, setData }){
  useEffect(()=>{
    if(data.visible){
      setTimeout(()=>{
        setData({
          ...data,
          visible: false
        })
      }, 5000)
    }
  }, [data, setData])
  
  return(<div className={data.visible ? styles.message : styles.message_hidden}>
    <hr className={data.status === 'ok' ? styles.message_ok : styles.message_bad} />
    <p className={data.status === 'ok' ? styles.message_okP : styles.message_badP}>{data.message}</p>
    <hr className={data.status === 'ok' ? styles.message_ok : styles.message_bad} />
  </div>)
}