import { uniq } from 'lodash'
import React, { useEffect, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { FaHandPointRight,FaHandPointDown } from 'react-icons/fa'
import { FiLock } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { fetchLesson, fetchLessons, fetchModules, removeLesson } from '../../store/slices/course'

import './VideoPage.scss'
import { AiFillInfoCircle } from 'react-icons/ai'

const VideoPage = () => {
  const [testUrl, setTestUrl] = useState('')
  const lessons = useSelector(state => state.courses.lessons)
  const lesson = useSelector(state => state.courses.lesson)
  const userModules = useSelector(state => state.auth.data.courses)
  const userId = useSelector(state => state.auth.data.id)
  const [active, setActive] = useState(lessons?.modules[0]?.lessons[0]?._id)
  // const [modulesIds, setModulesIds] = useState([])
  // const [lessonIds, setLessonIds] = useState([])
  let modulesIds = [];
  let lessonIds = [];
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchLessons({ id, userId }))
    dispatch(removeLesson())
    window.scrollTo(0, 0)
      // setModulesIds(userModules.map(item => item))
    // setLessonIds(lessons && lessons.modules.map(item => item))


    // dispatch(fetchLesson(lessons?.lessons[0]._id))
  }, [dispatch])

  modulesIds = userModules.map(item => item)
  lessonIds = lessons && lessons.modules.map(item => item)
  let arrayIds = modulesIds?.concat(lessonIds)
  // let arrayIds = [...modulesIds, ...lessonIds]
  let modules = []
  for (let i = 0; i < arrayIds?.length; i++) {
    for (let k = 0; k < arrayIds?.length; k++) {
      if (k != i) {
        if (arrayIds[i]?._id == arrayIds[k]?._id) arrayIds[k] = ''
      }
    }
  }
  for (let i = 0; i < arrayIds?.length; i++) {
    if (arrayIds[i] == '') continue
    else modules.push(arrayIds[i])
  }
  const getLesson = (params) => {
    setActive(params.lessonId)
    dispatch(fetchLesson(params))
  }

  return (
    <div className='video'>
      {modules.length > 0 ? <div className="container video__container">
        <div onClick={() => navigation(-1)} className="video__back">
          <MdArrowBackIosNew />
          <span>Все курсы</span>
        </div>
        <div className="video__main">
          <div className="video__content">
            <h1 className="video__title">{lesson ? lesson.name : lessons?.modules[0]?.lessons[0]?.name}</h1>
            <p style={{backgroundColor:'red'}}>Урматтуу мугалимдер, сабактар аманат☝️ <br/>
Сиз алып жаткан билим менен методикалар окуучуларды гана окутканга уруксат берилет. Методика автордук укукка ээ.</p>
            <div className="video__player">
             
             
              {/* {lesson ? <iframe width="100%" height="100%" src={`https://rutube.ru/play/embed/${lesson?.videoUrl}`} frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
                : <>
                  <div className="video__not-video "><p>Выберите видеоурок справа</p><span><FaHandPointRight size={34} /></span></div>
                  <div className="video__not-video-mobile "><p>Выберите видеоурок внизу</p><span><FaHandPointRight size={34} /></span></div>
                </>
              } */}
               {lesson ? <iframe width="100%" height="100%" src={lesson?.youtubeUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                : <>
                  <div className="video__not-video "><p>Выберите видеоурок справа</p><span><FaHandPointRight size={34} /></span></div>
                  <div className="video__not-video-mobile "><p>Выберите видеоурок внизу</p><span><FaHandPointRight size={34} /></span></div>
                </>
              }
              

              </div>
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', }}> <p >Бул курсту биздин тиркемеден көрүү учун бул шилтемени басыныз</p> <a href="https://play.google.com/store/apps/details?id=com.alippe.alippepro_v1&hl=ru" style={{marginTop:10,padding:10,borderRadius:10, textAlign:'center',display:'block', backgroundColor:'green',width:200}}>Тиркемени көчүрүү</a></div>
          
            {lesson?.pdfBook && <div className="dwn">
              <AiFillInfoCircle size={22} />
              <a  href="https://drive.google.com/file/d/1ZsFEToRapvPIAbnssRSNXouR7QONUQ8U/view?usp=share_link" target={'_blank'} download>Шар окуу китебинин pdf форматы <span> көчүрүү</span></a>
            </div>}
            <div className="video__descr">
              <h3>Мазмуну</h3>
              <p>{lesson ? lesson.description : lessons?.modules[0]?.lessons[0]?.description}</p>
            </div>
           
          </div>
          <div className="video__sidebar">
            <div className="video__sidebar-title">{lessons?.title}</div>
            <ul className="video__list">
              {modules?.map((module, i) => module?.isAccess === false ?
                module?.courseId === id && (
                  <li className='video__module' key={i}>
                    <p className='video__module-name'>{module?.name}</p>
                    <ol className='video__lessons'>
                      {module?.lessons.map((lesson, i) => (
                        <li key={lesson._id} className={`video__lessons-name ${active === lesson._id && 'active'}`} onClick={() => getLesson({ courseId: lessons._id, lessonId: lesson._id })}>
                          {lesson.name}  </li>
                      ))}
                    </ol>
                  </li>) :
                <li className='video__module disabled' key={i}>
                  <div className="video__header">
                    <p className='video__module-name disabled'>{module?.name}</p>
                    <div className="video__right">
                      <Link className="video__lock-btn" to={'/buyCourse/' + id + '?moduleId=' + module?._id} >Сатып алуу</Link>
                      <FiLock />
                    </div>
                  </div>
                  <ol className='video__lessons'>
                    {module?.lessons.map((lesson, i) => (
                      <li key={lesson._id} className={`video__lessons-name`} disabled >
                        {lesson.name}  </li>

                    ))}
                  </ol>
                  <div className="video__right-mobile">
                    <div className="video__lock-btn">Купить</div>
                    <FiLock />
                  </div>
                </li>

              )
              }
              {/* {lessons?.modules.map(module => userModules.map(item => item._id === module._id ? accessModules.push([item]) : notAccessModules.push(item))
              )} */}
            </ul>
            {/* <div className="video__sidebar-title test-title">Тесты</div>
            <ol className="video__list">
              <li className="video__item">Тест введение в профессию</li>
            </ol> */}
          </div>
        </div>
      </div>
        : <div className='container not-found'>
          <h1>
            Вы еще не приобрели ни одного курса
          </h1>
          <p>Курсы, которые вы купили, будут отображаться здесь</p>
          <span>
            <MdArrowBackIosNew size={16} />
            <Link to='/courses'>Перейти к курсам</Link></span>
        </div>}
    </div >
  )
}

export default VideoPage

  // < li className = 'video__module' key = { module._id } >
  //                 <p className='video__module-name'>{module.name}</p>
  //                 <ul className='video__lessons'>
  //                   {module.lessons.map((lesson, i) => (
  //                     <li className={`video__lessons-name ${active === lesson._id && 'active'}`} key={lesson._id} onClick={() => getLesson({ courseId: lessons._id, lessonId: lesson._id })}>
  //                       {lesson.name}
  //                     </li>
  //                   ))}
  //                 </ul>
  //               <li/>