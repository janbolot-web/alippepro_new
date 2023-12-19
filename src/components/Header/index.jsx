import React, { useState } from 'react'
import { FiSun } from 'react-icons/fi'
import { HiOutlineSun } from 'react-icons/hi'
import { HiOutlineMenuAlt1, HiOutlineX } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout, selectIsAuth } from '../../store/slices/auth'
import logoPng from '../../assets/icon/logo3.png'

import './Header.scss'

const Header = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  const [showMenu, setShowMenu] = useState(false)
  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout())
      setShowMenu(false)
      window.localStorage.removeItem('token')
    }
  }
  return (
    <>
      <div className='header'>
        <div className="header__container container">
          <h1 className="header__logo"><Link to='/'><img className='header__logo-img' src={logoPng} /></Link></h1>
          <div className="header__menu">
            <nav className="header__nav">
              <ul className="header__list">
                <li className="header__item"><Link to="/" className="header__link active">Башкы бет</Link></li>
                <li className="header__item"><Link to="/courses" className="header__link">Курстар</Link></li>
                <li className="header__item"><Link to="/otzuvy" className="header__link">Бүтүрүүчүлөрдөн ой-пикир</Link></li>
              </ul>
            </nav>

            <div className="header__auth">

              {isAuth ? <>
                {isAuth === "ADMIN" && <Link className="header__personal" to='/adminPanel'>Личный кабинет</Link>}
                <p className="header__logout" onClick={onClickLogout}>Выйти</p>
              </> : <><Link to='/registration' className="header__register">Регистрация</Link>
                <Link to='/login' className="header__login">Войти</Link></>}
            </div>
          </div>
          <div className="header__menu-icon">
            <i onClick={() => setShowMenu(!showMenu)}>{showMenu ? <HiOutlineX size={32} color={'#fff'} /> : <HiOutlineMenuAlt1 color={'#fff'} size={32} />}</i>
            {showMenu && <div className="header__menu-mobile">
              {/* {isAuth && <Link onClick={() => setShowMenu(false)} className="header__menu-personal" to='/adminPanel'>Личный кабинет</Link>} */}
              <nav className="header__menu-nav">
                <ul className="header__menu-list">
                  <li onClick={() => setShowMenu(false)} className="header__menu-item"><Link to="/" className="header__menu-link active">Башкы бет</Link></li>
                  <li onClick={() => setShowMenu(false)} className="header__menu-item"><Link to="/courses" className="header__menu-link">Курстар</Link></li>
                  <li onClick={() => setShowMenu(false)} className="header__item"><Link to="/otzuvy" className="header__link">Бүтүрүүчүлөрдөн ой-пикир</Link></li>
                </ul>
              </nav>
              <div className="header__menu-switch" >

              </div>
              <div className="header__menu-auth">
                {isAuth ? <>

                  <p className="header__menu-logout" onClick={onClickLogout}>Выйти</p>
                </> : <><Link to='/registration' onClick={() => setShowMenu(!showMenu)} className="header__menu-register">Регистрация</Link>
                  <Link to='/login' onClick={() => setShowMenu(!showMenu)} className="header__menu-login">Войти</Link></>}
              </div>
            </div>}
          </div>

        </div>

      </div>
      <div className="header__block"></div>
    </>
  )
}

export default Header