import React, { useEffect } from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'
import { FaPlay } from 'react-icons/fa'

import './HomePage.scss'
import mainImg from '../../assets/img/main-banner.svg'
import Courses from '../../components/Courses'
import { Link } from 'react-router-dom'

const HomePage = () => {

  return (
    <div className='home'>
      <div className="home__container container">
        <div className="home__banner">
          <div className="home__banner-content">
            <h1 className="home__title">Учурдун талабына жооп берген билим берүү аянтчасы</h1>
            <div className="home__buttons">
              <Link to='/about-us' className="home__about">
                <AiFillInfoCircle size={22} />
                <span >Биз жөнүндө</span>
              </Link>
              <div className="home__start">
                <FaPlay />
                <a href='#courses'><span>Биздин курстар</span></a></div>
            </div>
            <div className="home__description">
              <span>150+</span>
              <p>мугалим катышкан</p>
            </div>
          </div>
          <div className="home__img">
            <img src={mainImg} />
          </div>
        </div>
        <div className="otzuvy">
          
        </div>
        <div id="courses">

          <Courses />
        </div>
      </div>
    </div>
  )
}

export default HomePage