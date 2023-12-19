import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';

import { fetchRegister, selectIsAuth } from '../../store/slices/auth'
import './RegistrationPage.scss'
import { Link, Navigate } from 'react-router-dom'

const RegistrationPage = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: ""
    }, mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))
    if (!data.payload) {
      return
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
    toast.success("Вы успешно зарегистрировались")
  }

  if (isAuth) {
    return <Navigate to='/' />
  }
  return (
    <div className='registration'>
      <div className="container registration__container">
        <div className="registration__block">
          <div className="registration__title">Регистрация</div>
          <form className="registration__form" onSubmit={handleSubmit(onSubmit)}>
            <input type="text"
              className="name"
              {...register('name', { required: 'Полное имя' })}
              placeholder='Введите ваше имя' />
            {errors.name?.message && <span>{errors.name?.message}</span>}
            <input type="email"
              className="email"
              {...register('email', { required: 'Укажите почту' })}
              placeholder='Введите ваш email' />
            {errors.email?.message && <span>{errors.email?.message}</span>}
            <input type="password"
              {...register('password', { required: 'Укажите пароль',minLength:6 })}
              className="password" placeholder='Придумайте пароль' />
            {errors.password?.message && <span>{errors.password?.message}</span>}

            <button disabled={!isValid} type='submit' className="registration__btn" >Зарегистрироваться</button>
          </form>
          <p className='registration__forgot'>Уже есть аккаунт? <Link to='/login' style={{color:"#0099f8"}}>Войти</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage