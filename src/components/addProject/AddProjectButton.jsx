import React from "react";
import { NavLink } from "react-router-dom";
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

const AddProjectButton = () => {
  const currentUser = firebase.auth().currentUser;
  const allowedUserId = "P5pckmI1iDh7VIfIFywUrKRzsvU2"; // Идентификатор разрешенного пользователя

  // Если текущий пользователь совпадает с разрешенным пользователем,
  // отображаем кнопку "Добавить проект"
  if (currentUser && currentUser.uid === allowedUserId) {
    return (
      <NavLink
        to={"/addProject"}
      >
        Добавить проект
      </NavLink>
    );
  }

  // Если пользователь не авторизован или не совпадает с разрешенным пользователем,
  // не отображаем кнопку
  return null;
};

export default AddProjectButton;