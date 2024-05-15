import React, { useEffect } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";

import "./DetailPage.scss";
import ResultImg1 from "../../assets/img/1.svg";
import ResultImg2 from "../../assets/img/2.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourse } from "../../store/slices/course";
import { selectIsAuth } from "../../store/slices/auth";
import imgAuthor from "../../assets/img/m.jpg";

const DetailPage = () => {
  const course = useSelector((state) => state.courses.courseDetail);
  const userModules = useSelector((state) => state.auth.data?.courses);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigation = useNavigate();
  useEffect(() => {
    dispatch(fetchCourse(id));
    window.scrollTo(0, 0);
  }, []);

  let modulesIds = [];
  let lessonIds = [];

  modulesIds = userModules?.map((item) => item);
  lessonIds = course && course.modules.map((item) => item);
  let arrayIds = modulesIds?.concat(lessonIds);
  // let arrayIds = [...modulesIds, ...lessonIds]

  let modules = [];
  let modulesData = [];
  for (let i = 0; i < arrayIds?.length; i++) {
    for (let k = 0; k < arrayIds?.length; k++) {
      if (k != i) {
        if (arrayIds[i]?._id == arrayIds[k]?._id) arrayIds[k] = "";
      }
    }
  }

  for (let i = 0; i < arrayIds?.length; i++) {
    if (arrayIds[i] == "") continue;
    else modules.push(arrayIds[i]);
  }

  for (let i = 0; i < course?.modules.length; i++) {
    for (let j = 0; j < modules.length; j++) {
      if (modules[j]?._id === course?.modules[i]?._id) {
        modulesData.push(modules[j]);
      }
    }
  }
  return (
    <div className="detail">
      <div className="detail__container container">
        <div onClick={() => navigation(-1)} className="detail__back">
          <MdArrowBackIosNew />
          <span>Башкы бетке</span>
        </div>
        <div className="detail__banner">
          <div className="detail__content">
            <h1 className="detail__title">{course?.title}</h1>
            <div className="detail__duration">
              <span>{course?.duration}</span>
            </div>
            <p className="detail__desc">{course?.description}</p>
            <div className="detail__bottom">
              <a href="#modules" className="detail__btn">
                <FaPlay color="#fff" />
                <span>Курска катышуу</span>
              </a>
              <div className="detail__price">
                {" "}
                {course?.price} сом <span>50 000 сом</span>
              </div>
            </div>
          </div>
          <div className="detail__img">
            <img src={course?.previewImgUrl} alt="" />
          </div>
        </div>
      </div>
      <div className="detail__greet">
        <div className="container">
          <h2 className="detail__greet-title">
            "Шар окуу мугалими" курсунун жемиши
          </h2>
          <div className="detail__greet-content">
            <div className="detail__greet-video">
              {course ? (
                <iframe
                  src={`https://veed.io/embed/${course?.previewVideoUrl}?watermark=0&color=&sharing=0&title=0`}
                  width="100%"
                  height="100%"
                  frameborder="0"
                  title="video5325932779035171283"
                  webkitallowfullscreen
                  mozallowfullscreen
                  allowfullscreen="allowfullscreen"
                ></iframe>
              ) : null}
            </div>
            <div className="detail__greet-text">
              {/* <h3>{course?.authorName}</h3> */}
              <h2>Башкалар кыла алды, сиз дагы кыла аласыз!</h2>
              <p>
                "Шар окуу мугалими" курсун учурда 150+ мугалим ийгиликтүү окуп
                бүтүрдү. Айжан эже сыяктуу башка бүтүрүүчүлөр дагы өзүнүн
                айылында же шаардында бул методика менен натыйжалуу иштеп
                жатышат. Окууну аяктагандардын 90% сөзсүз өз ишин ачып, пайдалуу
                жана кирешелүү иш менен алектенишүүдө. Айрым мугалимдер айына
                100 миң сом пайда табууда. Бул методиканы сиз дагы өздөштүрүп
                кете аласыз. Ал үчүн сизден кызыгуу жана чечкиндүүлүк талап
                кылынат. Курстан жолугушканга чейин. Ийгилик каалайбыз.
              </p>
              {/* <a href='#modules' className="detail__greet-btn">
                <FaPlay color='#fff' />
                <span>Курска катышуу</span>
              </a> */}
            </div>
          </div>
        </div>
      </div>
      <div className="training" id="modules">
        <div className="container">
          <div className="training__block">
            <h2 className="training__title">Окуу программасы</h2>
            {isAuth ? (
              modulesData?.map((module, index) =>
                module?.courseId !== id ? (
                  <div key={module?._id} className="training__header">
                    <div className="training__header-title">
                      <div
                        className="training__header-left"
                        onClick={() =>
                          console.log( )
                        }
                      >
                        <span>
                          <MdArrowBackIosNew />
                        </span>
                        <h3>{module?.name}</h3>
                      </div>

                      <Link
                        to={"/buyCourse/" + id + "?moduleId=" + module?._id}
                        className="training__header-right buy"
                      >
                        <div>
                          <GiTwoCoins />
                        </div>
                        Сатып алуу {module?.price} сом
                      </Link>
                    </div>
                    <ol className="training__list">
                      {module?.lessons.map((lesson) => (
                        <li key={lesson?._id} className="training__item">
                          {lesson?.name}
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : (
                  <div key={module?._id} className="training__header">
                    <div className="training__header-title">
                      <div className="training__header-left">
                        <span>
                          <MdArrowBackIosNew />
                        </span>
                        <h3>{module?.name}</h3>
                      </div>

                      <Link
                        to={"/video/" + course?._id}
                        className="training__header-right"
                      >
                        <div>
                          <FaPlay />
                        </div>
                        Курсту көрүү
                      </Link>
                    </div>
                    <ol className="training__list">
                      {module?.lessons.map((lesson) => (
                        <li key={lesson?._id} className="training__item">
                          {lesson?.name}
                        </li>
                      ))}
                    </ol>
                  </div>
                )
              )
            ) : (
              <div style={{ color: "tomato" }}>
                *Чтобы посмотреть учебный план, сначала авторизуйтесь.
              </div>
            )}

            {/* <Link to={isAuth ? '/video/' + course?._id : '/login'} className="training__btn">
              {isAuth ? <>
                <FaPlay color='#fff' />
                <span>Курска катышуу</span></> :
                null:
                <span>Войти в личный кабинет</span>
              }
              </Link> */}
          </div>
        </div>
      </div>
      <div className="result">
        <div className="container result__container">
          <h2 className="result__title">Жыйынтыгында эмнеге ээ болосуз?</h2>
          <ul className="result__list">
            <li className="result__item">
              <div className="result__img">
                <img
                  src="https://media.tproger.ru/uploads/2022/04/icon-cover-icon-1-original.png"
                  alt=""
                />
              </div>
              <h3 className="result__name">Жеке өнүгүү</h3>
              <div className="result__desc">
                Заманбап жана эффективдүү методикалар менен билим куржунуңузду
                толтурасыз.
              </div>
            </li>
            <li className="result__item">
              <div className="result__img">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3029/3029269.png"
                  alt=""
                />
              </div>
              <h3 className="result__name">
                Киреше булагы же өзүңүздүн бизнесиңиз
              </h3>
              <div className="result__desc">
                Элде жок методика менен окуучуларды билимге сугарып жатып жеке
                ишкердик менен алектенүүгө мүмкүнчүлүк аласыз.
              </div>
            </li>
            <li className="result__item">
              <div className="result__img">
                <img
                  src="https://t1.daumcdn.net/cfile/tistory/993E494F5EC7CCB30E"
                  alt=""
                />
              </div>
              <h3 className="result__name">Сертификат</h3>
              <div className="result__desc">
                Курстун акырында "шар окуу" методикасын үйрөнгөндүгүңүздү
                тастыктаган сертификатка ээ болосуз.
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="authors">
        <div className="container authors__container">
          <h2 className="authors__title">Курстун автору</h2>
          {/* <span className="wistia_embed wistia_async_cj8fjg9olh popover=true popoverAnimateThumbnail=true" style={{ display: 'inline-block', height: "84px", position: 'relative', width: '150px' }}>&nbsp;</span> */}

          <ul className="authors__list">
            {course?.authors.map((author) => (
              <li key={author._id} className="authors__item">
                <div className="authors__img">
                  <img src={imgAuthor} alt="" />
                </div>
                <div className="authors__name">{author.name}</div>
                <p className="authors__profi">{author.profession}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
