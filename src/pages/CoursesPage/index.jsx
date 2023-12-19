import React from 'react'
import Courses from '../../components/Courses'

import './CoursesPage.scss'

const CoursesPage = () => {
    return (
        <div className='courses'>
            <div className="courses__container container">
                <div className="courses__banner">
                    <div className="courses__banner-content"> <div className="courses__banner-title">Все курсы проекта</div>
                        <p className="courses__banner-descr">Здесь находятся все курсы программы, которые помогут вам стать востребованным на рынке труда уже сегодня. Вы можете выбрать любое количество из представленных курсов. Все курсы полностью бесплатные, сделаны в формате видеоуроков и доступны в любое удобное для вас время.</p></div>
                    <div className="courses__banner-img"><img src="https://fs-thb03.getcourse.ru/fileservice/file/thumbnail/h/7e7d4a0a96be8e6d78e60418356be153.png/s/s1200x/a/248212/sc/159" alt="" /></div>
                </div>
                <Courses />
            </div>
        </div>
    )
}

export default CoursesPage