import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { fetchAuth, selectIsAuth } from '../../store/slices/auth'

import './LoginPage.scss'

const LoginPage = () => {
  const isAuth = useSelector(selectIsAuth)
  const error = useSelector(state => state.auth.error)

  const dispatch = useDispatch()

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }, mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))
    if (!data.payload) {
      return
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }


  if (isAuth) {
    return <Navigate to='/' />
  }
  return (
    <div className='login'>
      <div className="login__container container">
        <div className="login__block">
          <div className="login__title">Войти</div>
          <form action="" className="login__form" onSubmit={handleSubmit(onSubmit)}>
            <input type="email" className="email" placeholder='Введите e-mail'
              {...register('email', { required: 'Укажите почту' })}
            />
            {errors.email?.message && <span>{errors.email?.message}</span>}

            <input type="password" className="password" placeholder='Введите пароль'
              {...register('password', { required: 'Укажите пароль' })}
            />
            {errors.password?.message && <span>{errors.password?.message}</span>}
            <button disabled={!isValid} type='submit' className="login__btn">Войти</button>
          </form>
          <p className='login__forgot'>Нет аккаунта? <Link to={'/registration'} style={{color:"#0099f8"}}>Зарегистроваться</Link></p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage