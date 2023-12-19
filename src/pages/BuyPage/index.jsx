import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { fetchModule } from '../../store/slices/course'
import { BsInstagram, BsTelegram, BsWhatsapp } from 'react-icons/bs'

import './BuyPage.scss'
import { useRef } from 'react'
import { method } from 'lodash'

const BuyPage = () => {
  const module = useSelector(state => state.courses?.module)
  const dispatch = useDispatch()
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const radio = useRef()

  const methods = [{ name: "О! Деньги", img: "https://play-lh.googleusercontent.com/ZNZIBhYLAFKo5dZVTcLq5bLGKGyQXysxJrbrXZyeB6APYJWIs4zn1Ju9P3diZbhOIj0", requisites: "0705089710", isSelect: false }, { name: "MBank Кыргызстан", img: "https://play-lh.googleusercontent.com/dh-5T6Q39QNz0jDWcL0ezZLOn4apU7Aui0_RGA0vQpGNCo5gMno6VUF8ZHQxHNqvldnX", requisites: "996709194214", isSelect: false }]
  const [selectName, isSelectName] = useState('')

  useEffect(() => {
    dispatch(fetchModule({ courseId: id, moduleId: searchParams.get('moduleId') }))
  }, [])

  const selectMethod = (name) => {
    // isSelectName(name)
    // methods.map(method => {
    //   if (method.name === selectName) {
    //     method.isSelect = true
    //   } else {
    //     method.isSelect = false
    //   }
    // })
    // console.log(methods);
  }

  return (
    <div className='buy'>
      <div className="container buy__container">
        <div className="buy__header">
          <p className="buy__descr">Курстун аталышы: </p>
          <h2 className="buy__title">{module?.name}</h2>
        </div>
        <div className="buy__info">
          <div className="buy__price">
            <p>Курстун баасы: <span>{module?.price} сом</span> </p>
          </div> <div className="buy__lessons">
            <p>Сабактардын тизмеси:  </p><ol>{module?.lessons?.map(lesson => (
              <li key={lesson._id}>{lesson.name}</li>
            ))}</ol>
          </div>
        </div>
        <div className="buy__methods">
          {/* <p className="buy__methods-title">Реквизиты для оплаты</p> */}
          {methods?.map(method => (
            <div key={method.name} className={`buy__method odengi ${method.name === selectName && "active"}`} onClick={() => selectMethod(method.name)}>
              <div className="buy__method-img">
                <img src={method.img} alt="" /></div>
              <div className="buy__method-content">
                <div className="buy__method-title">{method.name}</div>
                <p className="buy__method-requisites">Реквизиты - {method.requisites} </p>
              </div>
            </div>
          ))}
          <p className="buy__methods-descr">*Төлөм жүргүзгөндөн кийин чекти төмөнкү ватсап аркылуу жибериниз</p>
        </div>
        {/* <p className="buy__btn-decr">Свяжитесь с контактами ниже, чтобы купить курс</p> */}
        <div className="buy__btn-list">
          <a href='https://wa.me/996705089710' target={"_blank"} className="buy__btn-social">
            <BsWhatsapp />
            <p>0705089710</p>
          </a>
          {/* <div className="buy__btn-social insta">
            <BsInstagram />
            <p>alippe_pro</p>
          </div> <div className="buy__btn-social telegram">
            <BsTelegram />
            <p>0705089710</p>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default BuyPage