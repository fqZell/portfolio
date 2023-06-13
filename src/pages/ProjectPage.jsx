import React, { useState, useEffect } from 'react';
import { Container, Row, Modal, Button } from 'react-bootstrap';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ArrowRightCircle, Trash, HeartFill } from 'react-bootstrap-icons';
import axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useLocalStorage } from 'react-use'; // Импортируем хук useLocalStorage

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useLocalStorage('liked', false); // Используем хук useLocalStorage
  const [favoriteProjects, setFavoriteProjects] = useLocalStorage('favoriteProjects', []); // Используем хук useLocalStorage
  const currentUser = firebase.auth().currentUser;
  const allowedUserId = 'P5pckmI1iDh7VIfIFywUrKRzsvU2'; // Идентификатор разрешенного пользователя
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`https://646bafb47d3c1cae4ce42749.mockapi.io/Projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProject();
  }, [id]);

  const handleDeleteProject = async () => {
    // Проверяем, что текущий пользователь совпадает с разрешенным пользователем
    if (currentUser && currentUser.uid === allowedUserId) {
      try {
        // Отправляем DELETE-запрос для удаления проекта
        await axios.delete(`https://646bafb47d3c1cae4ce42749.mockapi.io/Projects/${id}`);
        console.log('Проект успешно удален');
        setShowModal(false); // Закрываем модальное окно после удаления
        navigate('/projects'); // Перенаправляем пользователя на главную страницу
      } catch (error) {
        console.error('Ошибка удаления проекта:', error);
      }
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLike = () => {
    setLiked(!liked);

    // Добавляем или удаляем проект из избранного
    if (!liked) {
      setFavoriteProjects((prevProjects) => [...prevProjects, id]);
    } else {
      setFavoriteProjects((prevProjects) => prevProjects.filter((projectId) => projectId !== id));
    }
  };

  if (!project) {
    return <p>Загрузка проекта...</p>;
  }

  return (
    <>
      <section className="singleProject">
        <Container>
          <NavLink to={'/projects'}>
            <button className="button-NavLink">
              Назад <ArrowRightCircle size={25} />
            </button>
          </NavLink>
          <div className="project-details">
          <div className="project-header text-align: center">
            <h2>
              {project.title}
            </h2>
            {currentUser && currentUser.uid === allowedUserId && (
                <button className={`button-like ${liked ? 'active' : ''}`} onClick={handleLike}>
                  <HeartFill size={20} />
                </button>
            )}
          </div>
            <div className="gallery">
              <Carousel infiniteLoop showThumbs={false} autoPlay interval={3000} className="img-slider">
                <div>
                  <img src={project.photo} alt={project.title} />
                </div>
                <div onClick={() => openFullscreen('image2')}>
                  <img src={project.photo2} alt={project.title} />
                </div>
                <div onClick={() => openFullscreen('image3')}>
                  <img src={project.photo3} alt={project.title} />
                </div>
                <div onClick={() => openFullscreen('image4')}>
                  <img src={project.photo4} alt={project.title} />
                </div>
              </Carousel>
            </div>
            <Row>
              <span className="project-skills">Использованные навыки: {project.skills}</span>
              <NavLink to={project.githubLink} target="_blank" rel="noopener noreferrer">
                <button className="button-GitLink">
                  <span>Перейти к репозиторию на GitHub</span>
                </button>
              </NavLink>
            </Row>
            {/* Проверяем, что текущий пользователь совпадает с разрешенным пользователем */}
            {currentUser && currentUser.uid === allowedUserId && (
              <button className="button-Delete" onClick={handleShowModal}>
                <Trash size={20} /> Удалить проект
              </button>
            )}
          </div>
        </Container>
      </section>

      {/* Модальное окно для подтверждения удаления проекта */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="modal_title">Удаление проекта</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal_body">
          <p>Вы уверены, что хотите удалить проект?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Отмена
          </Button>
          <Button variant="danger" onClick={handleDeleteProject}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProjectPage;