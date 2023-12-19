import React, { useEffect, useState } from 'react'
import './AddLessonPage.scss'
import { BsPlusLg } from 'react-icons/bs'
import Input from '../../components/Input'
import { useDispatch } from 'react-redux'
import { createModule } from '../../store/slices/course'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { MdOutlineClose } from 'react-icons/md'


const AddLessonPage = () => {
  const [moduleTitle, setModuleTitle] = useState('')
  const [modulePrice, setModulePrice] = useState('')
  const [inputList, setInputList] = useState([]);
  const [lessonData, setLessonData] = useState([])
  const { id } = useParams()

  const dispatch = useDispatch()
  const navigation = useNavigate()

  const addModule = () => {
    const module = {
      name: moduleTitle,
      price: modulePrice,
      lessons: lessonData
    }
    console.log(lessonData);
    dispatch(createModule({ id, module }))
    navigation(-1)
  }
  const onDeleteItem = (id) => {
    const updateData = inputList.filter(item => { return item.id !== id })
    setInputList(updateData);
    // console.log(updateData);
  }

  const onAddBtnClick = event => {
    setInputList(inputList.concat({ id: new Date().toLocaleTimeString().split(':').join(''), item: <Input onDeleteItem={onDeleteItem} key={inputList.length} setLessonData={setLessonData} lessonData={lessonData} /> }));
  };
  return (
    <div className='lesson'>
      <div className="container lesson__container">
        <div className="lesson__create-block">
          <div className="lesson__module">
            <h2>Создать модуль</h2>
            <input type="text" value={moduleTitle} onChange={(e) => setModuleTitle(e.target.value)} placeholder='Введите название модулья' className="lesson__name" />
            <input type="text" value={modulePrice} onChange={(e) => setModulePrice(e.target.value)} placeholder='Стоимость курса' className="lesson__name" />

            <div className="lesson__create-btn" onClick={addModule}>Создать</div>
          </div>
        </div>
        <div className="lesson__preview-block">
          {/* {inputList} */}
          {inputList.map((el, i) => (
            <div className='lesson__forms' key={el.id}>
              <span onClick={() => onDeleteItem(el.id)}>
                <MdOutlineClose size={28} color={'red'} onClick={() => {
                }} />
              </span>{el.item}</div>
          ))}
          <div className="lesson__btn">
            <button onClick={onAddBtnClick}>
              <BsPlusLg />
              <span>
                Добавить видео файл
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddLessonPage