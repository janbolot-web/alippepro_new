import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdOutlineClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { addModuleToUser, fetchUserById, removeUserModule } from '../../store/slices/auth'
import { clearModules, fetchModules } from '../../store/slices/course'


import './Users.scss'

const ModalCourse = ({ setShowModal, userId, userCourses }) => {
  const modules = useSelector(state => state.courses.modules)
  const user = useSelector(state => state.auth.user)
  const [idCourse, setIdCourse] = useState('')

  const dispatch = useDispatch()
  const searchModules = () => {
    dispatch(fetchModules(idCourse))
    dispatch(fetchUserById(userId))
  }

  // dispatch(()=>{
  //   dispatch(fetchModules('63a5ad8056d0489148c360e4'))
  //   dispatch(fetchUserById(userId))
  // },[])

  useEffect(() => {
    
  
    dispatch(fetchModules('63a5ad8056d0489148c360e4'))
    
  }, [])
  

  const onAddModuleToUser = ({ moduleId }) => {
    // userCourses?.map(course => {
    //   setModuleIds([...moduleIds, course.moduleId])
    // });
    dispatch(addModuleToUser({ moduleId, userId, courseId: "63a5ad8056d0489148c360e4" }))
  }
  console.log(
    user
  );
  let modulesIds = [];
  let lessonIds = [];
  modulesIds = user?.courses?.map(item => item)
  lessonIds = modules && modules?.map(item => item)
  let arrayIds = modulesIds?.concat(lessonIds)
  // let arrayIds = [...modulesIds, ...lessonIds]
  let modulesData = []
  for (let i = 0; i < arrayIds?.length; i++) {
    for (let k = 0; k < arrayIds?.length; k++) {
      if (k != i) {
        if (arrayIds[i]?._id == arrayIds[k]?._id) arrayIds[k] = ''
      }
    }
  }
  for (let i = 0; i < arrayIds?.length; i++) {
    if (arrayIds[i] == '') continue
    else modulesData.push(arrayIds[i])
  }

  const deleteModule = (moduleId) => {
    const params = { moduleId, userId }
    // console.log(params);
    dispatch(removeUserModule(params))
  }

  const closeBtn = () => {
    setShowModal(false)
    dispatch(clearModules())
  }

  return (
    <div className='modal'>
      <div className="modal__container container">
        <div className="modal__close" onClick={closeBtn}><MdOutlineClose color='tomato' size={24} /></div>
        <div className="modal__header">
          <input value={"63a5ad8056d0489148c360e4"} onChange={(e) => setIdCourse(e.target.value)} type="text" placeholder='Введите ID курса' className="modal__idCourse" />
          <div className="modal__searchBtn"><FiSearch size={22} color="#0099f8" onClick={searchModules} /></div>
        </div>
        <ul className="modal__list">
          {modules && modulesData?.map((module, i) => module?.isAccess === false ? (
            <li key={module._id} onClick={() => console.log(module._id)} className="modal__item"><p>{module.name}</p> <div className="modal__banBtn" onClick={() => deleteModule(module._id)}>
              Закрыть доступ
            </div>
            </li>
          ) : (
            <li key={module?._id} onClick={() => console.log('!!!!!!!'+module?._id)} className="modal__item"><p>{module?.name}</p> <div className="modal__lockBtn" onClick={() => onAddModuleToUser({ moduleId: module._id })}>
              Открыть доступ
            </div>
            </li>
          ))}
        </ul>
      </div>
    </div >
  )
}

export default ModalCourse