import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsPlusLg } from 'react-icons/bs'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai'

import { createCourse, deleteCourse, fetchAllCourses } from '../../store/slices/course'
import './AdminPanel.scss'
import Modal from '../../components/Modal'
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'
import Users from '../../components/Users'
import moment from 'moment'

const AdminPanel = () => {
  const admin = useSelector(state => state.auth.data)
  const courses = useSelector(state => state.courses.courses)
  const status = useSelector(state => state.courses.status)
  const [showModal, setShowModal] = useState(false)
  // const [courseData, serCourseData] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllCourses())
  }, [])

  const removeCourse = (id, title) => {
    if (window.confirm("Вы хотите удалить курс: " + title)) {
      dispatch(deleteCourse(id))
    }
  }

  return (
    <div className='admin'>
      <div className="container admin__container">
        <h1 className="admin__title">Добро пожаловать в админ панель!</h1>
        <div className="admin__block">
          <h3 className="admin__block-title">
            Список курсов
          </h3>
          <ul className="admin__header">
            <li className='admin__header-name'>Название</li>
            <li className='admin__header-name'>ID курса</li>
            <li className='admin__header-name'>Дата создание</li>
          </ul>
          <ul className="admin__courses-list">

            {
              courses?.map((course, i) => (
                <li key={course.id} className="admin__courses-item">
                  <div className="admin__left">
                    <p><Link to={'/course/' + course.id}>{course.title}</Link></p>
                    <p>{course.id}</p>
                    <span>{moment(course.createdAt).calendar()}</span>
                  </div>
                  <div className='admin__courses-icons'>
                    <span className="admin__courses-add">
                      <Link to={`/createLesson/${course.id}`}>
                        <AiOutlinePlus color='#fff' size={24} />
                      </Link>
                    </span>
                    <span className='admin__courses-edit'>
                      <Link to={`/edit/${course.id}`}>
                        <AiOutlineEdit size={28} color='white' />
                      </Link>
                    </span>
                    <span className='admin__courses-delete' onClick={() => removeCourse(course.id, course.title)}>
                      <AiOutlineDelete color='tomato' size={22} />
                    </span>
                  </div>
                </li>
              ))
            }
          </ul>
          <div className="admin__btn">
            <button onClick={() => setShowModal(true)}>
              <BsPlusLg />
              <span>
                Добавить новый курс
              </span>
            </button>
          </div>
          {showModal && <Modal setShowModal={setShowModal} dispatch={dispatch} />}
        </div>
        <Users />
      </div>
    </div>
  )
}

export default AdminPanel