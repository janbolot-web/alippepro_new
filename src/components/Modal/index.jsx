import React, { useState } from 'react'
import { createCourse } from '../../store/slices/course'

import './Modal.scss'

const Modal = ({ setShowModal, dispatch, serCourseData }) => {
  const [title, setTitle] = useState('Шар окуу мугалими')
  const [duration, setDuration] = useState('4 модуля / 10 уроков')
  const [description, setDescription] = useState('Учурдагы билим берүү системасы азыркы балдардын табиятына жооп бере албай калганына күндөн күнгө күбө болуудабыз. Азыркы Z жана альфа муунунун талаптары, кызыгуусу таптакыр башка. Бул көйгөйлүү маселеге чечим катары "шар окуу" курсу негизделип чыкты. Азыркы балдардын табиятын (психология, физиология ж.б.) эске алуу менен түзүлгөн, окуучулардын шар окуп кетүүсүнө кыска убакытта эффективдүү жыйынтык берген методиканы сунуштайбыз. Ар бир мугалим бул методиканы үйрөнө алат. Аны окуучуларга өтүү менен бирге кошумча киреше булагы катары дагы пайдаланса болот.')
  const [price, setPrice] = useState('20 000')
  const [previewImgUrl, setPreviewImgUrl] = useState('https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gPqbM1bRYDt_FnXJuysP8TcKcADJjNN4ffixGvghUEIbJGG-iZLupIQsNwt4wbA67TbUBrrn34XrzT4KmHmBpXVcuPTGA=w1960-h2236')
  const [previewVideoUrl, setPreviewVideoUrl] = useState('4621ca9f-d33a-4ac2-a2a8-e9db21bdb583')
  const [authorName, setAuthorName] = useState('Арзыкул кызы Мээрим')
  const [authorProfession, setAuthorProfession] = useState('Мугалим, методист')
  const [authors, setAuthors] = useState([])
  const [modules, setModules] = useState([
    {
      name: "",
      lessons: [
        {
          name: "",
          videoUrl: "",
          description: ""
        }
      ]
    }
  ])

  const addCourseHandler = () => {
    setAuthors({
      name: "Арзыкул кызы Мээрим",
      profession: "Мугалим, методист",
      avatarUrl: "https://drive.google.com/file/d/1xo6VFYSnX5Ano2jki4HPhReYhnsYg-7L/view?usp=share_link",
    })
    const courseData = {
      title,
      duration,
      description,
      price,
      previewImgUrl,
      previewVideoUrl,
      authorName,
      authorProfession,
      authors: [{
        name: "Екатерина Никитина",
        profession: "Бизнес-ментор, коуч команд продаж",
        avatarUrl: "https://drive.google.com/file/d/1xo6VFYSnX5Ano2jki4HPhReYhnsYg-7L/view?usp=share_link",
      }],
      // lessons: lessons,
    }

    dispatch(createCourse(courseData))
    // console.log(courseData);
    setShowModal(false)
  }

  // useEffect(() => {
  //   setLessons([
  //     ...lessons, { name: lessonName, videoUrl: lessonVideoUrl, description: lessonDescription }
  //   ])
  // }, [lessonName, lessonVideoUrl, lessonDescription])

  return (
    <div className='modal'>
      <div className="container modal__container">
        <h2 className="modal__title">Новый курс: {title}</h2>
        <div className="modal__block">
          <div className="modal__preview">
            <img src={previewImgUrl} alt="" />
            <h3>Описание</h3>
            <p>{description}</p>
            <span>Цена: {price} сом</span>
          </div>
          <div action="" className='modal__form'>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Название курса' />
            <textarea name="" id="" cols="30" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Описание' rows="10"></textarea>
            <input value={duration} onChange={(e) => setDuration(e.target.value)} type="text" placeholder='Продолжителность курса' />
            <input value={previewImgUrl} onChange={(e) => setPreviewImgUrl(e.target.value)} type="text" placeholder='Ссылка на изоброжение (превью)' />
            <input value={previewVideoUrl} onChange={(e) => setPreviewVideoUrl(e.target.value)} type="text" placeholder='Ссылка на видео (превью)' />
            <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder='Цена курса' />
            <input value={authorName} onChange={(e) => setAuthorName(e.target.value)} type="text" placeholder='ФИО автора' />
            <input value={authorProfession} onChange={(e) => setAuthorProfession(e.target.value)} type="text" placeholder='Профессия автора' />
          </div>
        </div>

        {/* <input type="text" className='modal__module' />
        <div className="modal__btn">
          <button onClick={() => setModuleTitle()}>
            <BsPlusLg />
            <span>
              Добавить модуль
            </span>
          </button>
        </div> */}
        <div className="modal__btns">
          <div className="modal__btn ">
            <button onClick={() => setShowModal(false)} className='cancel_btn'>
              Отмена
            </button>
          </div>
          <div className="modal__btn">
            <button onClick={addCourseHandler} className='succes_btn'>
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal