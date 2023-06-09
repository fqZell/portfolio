import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Проверка на заполненность полей
    if (!email || !password) {
      setErrors(['Пожалуйста, заполните все поля.']);
      setShowModal(true);
      return;
    }

    try {
      // Вход пользователя с использованием электронной почты и пароля
      await firebase.auth().signInWithEmailAndPassword(email, password);

      navigate('/'); // Перенаправление на главную страницу
    } catch (error) {
      console.log(error);
      setErrors(['Неверный адрес электронной почты или пароль.']);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <div className='add'>
        <h2>Вход в систему</h2>
        <Form onSubmit={handleSignIn}>
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

          <Button variant='primary' type='submit'>
            Войти
          </Button>
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

export default SignIn;