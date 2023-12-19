import { useEffect, useState } from "react";
import { MdOutlineClose } from 'react-icons/md'

const Input = ({ setLessonData, lessonData, onDeleteItem }) => {
    const [name, setName] = useState("Урок 1")
    const [videoUrl, setVideoUrl] = useState("4lv6yuh36n")
    const [description, setDescription] = useState("Выпуск шикарный, больше видео и лайков добавили бы)")

    useEffect(() => {
        setLessonData([...lessonData, { name, videoUrl, description }])
    }, [name, videoUrl, description])

    return <form className="lesson__video-form">
        
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Название видео' />
        <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} type="text" placeholder='Ссылка на видео' />
        <textarea name="" value={description} onChange={(e) => setDescription(e.target.value)} id="" cols="30" placeholder='Описание' rows="10"></textarea>
    </form>;
};

export default Input