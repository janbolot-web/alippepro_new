import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { deleteModule, fetchModules } from '../../store/slices/course'
import { AiOutlineDelete } from 'react-icons/ai'

import './EditPage.scss'

const EditPage = () => {
  const modules = useSelector(state => state.courses.modules)
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchModules(id))
  }, [])

  const removeModule = ({ moduleId, title }) => {
    if (window.confirm("Вы хотите удалить модуль: " + title)) {
      dispatch(deleteModule({ moduleId, id }))
    }
  }

  return (
    <div className='edit'>
      <div className="container">
        <ul className="edit__list">
          {modules?.map(module => (
            <li key={module._id} className="edit__item">
              <h3 className="edit__name">{module.name}</h3>
              <span className='edit__delete' onClick={() => removeModule({ moduleId: module._id, title: module.name })}>
                <AiOutlineDelete color='tomato' />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div >
  )
}

export default EditPage