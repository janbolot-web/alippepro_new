import React, { useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useDispatch, useSelector } from "react-redux";

import './Courses.scss'
import { Link } from 'react-router-dom'
import { fetchAllCourses } from '../../store/slices/course';


const Courses = () => {
  const courses = useSelector(state => state.courses.courses)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllCourses())
  }, [])

  return (
    <div className='courses'>
      <div className="courses__container">
        <div className="courses__header">
          <h2>Биздин курстар</h2>
          <div className="courses__search">
            <span>
              <FiSearch size={20} />
            </span>
            <input type="text" placeholder='Что вы ищите?' />
          </div>
        </div>
        <ul className="courses__items">
          {courses && courses.map(course => (
            <Link to={'/course/' + course.id} key={course.id} className="courses__item">
              <div className="courses__item-header">
                <div className="courses__content">
                  <div className="courses__name">{course.title}</div>
                  <div className="courses__desc">{course.duration}</div>
                  {/* <div className="courses__price">{course.price} сом</div> */}
                </div>
                <div className="courses__img">
                  <img src={course.previewImgUrl} alt="" />
                </div>
              </div>
            </Link>
          ))}
        </ul>
        {/* <ul className="courses__cards">
          {courses && courses.map(course => (
            <li key={course.id} className="courses__card">
              <div className="courses__img">
                <img src={course.previewImgUrl} alt="" />
              </div>
              <h2 className='courses__title'>{course.title}</h2>

              <div className="courses__content">
                <p className="courses__price">
                  {course.duration}
                </p>
                <p className='courses__descr'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, quibusdam. Molestias error, obcaecati nihil illo fugiat numquam quam animi ex provident saepe maxime ab eum aperiam porro, nisi cumque nulla?</p>
                <Link to={'/course/'+course.id} className="courses__btn">
                  <span className='span-1'></span>
                  <span className='span-2'></span>
                  <span className='span-3'></span>
                  <span className='span-4'></span>
                  Подробнее
                </Link>
              </div>
            </li>
          ))}
        </ul> */}

      </div>
    </div>
  )
}

export default Courses