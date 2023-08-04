import * as React from 'react'
import {Particles} from 'react-tsparticles'
import particlesConfig from './particlesConfig'
import {loadFull} from 'tsparticles'

export default function Background({children}){
  const particlesInit = async (engine) => {
    await loadFull(engine)
  }

  return(<Particles init={particlesInit} options={particlesConfig}>
    {children}
  </Particles>)
}