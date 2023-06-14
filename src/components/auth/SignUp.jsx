import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Container, Button, Modal, Form } from 'react-bootstrap';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Проверка на заполненность полей
    if (!firstName || !lastName || !phone || !email || !password || !confirmPassword) {
      setErrors(['Пожалуйста, заполните все поля.']);
      setShowModal(true);
      return;
    }

    // Валидация полей
    const formDetails = {
      firstName,
      lastName,
      phone,
      email,
      password,
      confirmPassword
    };

    const validationErrors = validateForm(formDetails);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setShowModal(true);
      return;
    }

    try {
      if (password !== confirmPassword) {
        setErrors(['Пароли не совпадают']);
        setShowModal(true);
        return;
      }

      // Регистрация пользователя с использованием электронной почты и пароля
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

      // Установка дополнительных данных пользователя
      const user = userCredential.user;
      await user.updateProfile({
        appName: `${firstName}`,
        displayName: `${lastName}`,
        phoneNumber: `${phone}`,
      });

      navigate('/'); // Перенаправление на главную страницу
    } catch (error) {
      console.log(error);
    }
  };

  // Функция для валидации полей формы
  const validateForm = (formDetails) => {
    const errors = [];

    if (!formDetails.firstName.match(/^[а-яА-Я]+$/)) {
      errors.push('Имя должно содержать только символы на кириллице без использования цифр');
    }

    if (!formDetails.lastName.match(/^[а-яА-Я]+$/)) {
      errors.push('Фамилия должна содержать только символы на кириллице без использования цифр');
    }

    if (!formDetails.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      errors.push('Введите действительный адрес электронной почты.');
    }

    if (!formDetails.phone.match(/^[+0-9]+$/) || formDetails.phone.length < 11 || formDetails.phone.length > 13) {
      errors.push('Поле с телефоном должно содержать только цифры и знак \'+\', также должно содержать 11 символов');
    }

    if (formDetails.password.length < 6) {
      errors.push('Пароль должен содержать не менее 6 символов');
    }

    return errors;
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <div className='add'>
        <h2>Регистрация</h2>
        <Form onSubmit={handleSignUp}>
          <Form.Group controlId='formFirstName'>
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type='text'
              placeholder='Введите имя'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='formLastName'>
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type='text'
              placeholder='Введите фамилию'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='formPhone'>
            <Form.Label>Телефон</Form.Label>
            <Form.Control
              type='text'
              placeholder='Введите телефон'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='formEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Введите email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='formPassword'>
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type='password'
              placeholder='Введите пароль'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='formConfirmPassword'>
            <Form.Label>Повторите пароль</Form.Label>
            <Form.Control
              type='password'
              placeholder='Повторите пароль'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Зарегистрироваться
          </Button>

          <p>
            Уже есть аккаунт? <NavLink to={'/SignIn'}>Войти</NavLink>
          </p>
        </Form>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="modal_title">Ошибка</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal_body">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SignUp;