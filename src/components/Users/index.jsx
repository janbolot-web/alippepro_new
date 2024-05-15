import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  fetchUserById,
  fetchUsers,
  searchUser,
} from "../../store/slices/auth";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai";
import "./Users.scss";
import "moment/locale/ru";
import ModalCourse from "./ModalCourse";

moment.locale("ru");

const Users = () => {
  const { users, data } = useSelector((state) => state.auth);
  const userCourses = useSelector((state) => state.auth.user?.courses);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  let moduleIds = [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const removeUser = ({ id, name }) => {
    if (
      window.confirm("Вы действительно хотите удалит пользователя " + name, id)
    )
      dispatch(deleteUser(id));
  };

  const showModalHandle = ({ id }) => {
    setUserId(id);
    dispatch(fetchUserById(id));
    setShowModal(true);
  };

  return (
    <div className="users">
      <div className="users__container">
        <div className="users__header-block">
          <h3 className="users__title"  onClick={() => {
                console.log(users);
              }}>Список пользовательей</h3>
          <div style={{ display: "flex" }}>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{
                height: 30,
                width: 300,
                padding: "0 10px",
                outline: "none",
                border: "none",
                borderRadius: "10px",
              }}
            />
            <div
              onClick={() => dispatch(searchUser(searchValue))}
              style={{
                width: 30,
                height: 30,
                marginLeft: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
            >
              <AiOutlineSearch color="#000" />
            </div>
          </div>
        </div>
        <div className="users__block">
          <ul className="users__header">
            <li
              className="users__header-name"
             
            >
              Имя
            </li>
            <li className="users__header-name">Почта</li>
            <li className="users__header-name">Номер телефона</li>
            <li className="users__header-name">Дата регистрации</li>
          </ul>
          <ul className="users__list">
            {users?.map((user) =>
              data?.id === user._id ? null : (
                <li key={user._id} className="users__item">
                  <div className="users__left">
                    <p
                      className={`users__item-name ${
                        data.id === user._id && "users-active"
                      }`}
                    >
                      {user.name}
                    </p>
                    <p
                      className={`users__item-name ${
                        data.id === user._id && "users-active"
                      }`}
                    >
                      {user.email}
                    </p>
                    <p
                      className={`users__item-name ${
                        data.id === user._id && "users-active"
                      }`}
                    >
                      {user.phoneNumber}
                    </p>
                    <span
                      className={`users__item-date ${
                        data.id === user._id && "users-active"
                      }`}
                    >
                      {moment(user.createdAt).calendar()}
                    </span>
                  </div>
                  <div className="users__right">
                    <span
                      className="admin__courses-add"
                      onClick={() => showModalHandle({ id: user._id })}
                    >
                      {/* <Link to={`/createLesson/${course.id}`}> */}
                      <div className="admin__btn-user">
                        <AiOutlinePlus color="#fff" size={24} />
                        Добавить модуль
                      </div>
                      {/* </Link> */}
                    </span>
                    <span
                      className="admin__courses-delete"
                      onClick={() =>
                        removeUser({ id: user._id, name: user.name })
                      }
                    >
                      <AiOutlineDelete color="tomato" size={22} />
                    </span>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      {showModal && (
        <ModalCourse
          setShowModal={setShowModal}
          userCourses={userCourses}
          userId={userId}
        />
      )}
    </div>
  );
};

export default Users;
