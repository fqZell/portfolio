import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PROJECTS from '../data/projects';

const SingleProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 

  useEffect(() => {
    // Найти проект с нужным id из массива PROJECTS
    const selectedProject = PROJECTS.find((proj) => proj.id === Number(id));
    setProject(selectedProject);
  }, [id]);

  if (!project) {
    // Если проект не найден, можно показать сообщение или перенаправить пользователя
    return <p>Проект не найден</p>;
  }

  const handleClickPrev = () => {
    setCurrentImageIndex((prevIndex) => prevIndex - 1);
  };

  const handleClickNext = () => {
    setCurrentImageIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <>
    <section className="singleProject">
      <Container>
        <div className="project-details">
          <h2>{project.title}</h2>
          <div className="gallery">
            <img src={project.preview} alt={project.title} />
            <div className="controls">
                <button onClick={handleClickPrev}>Предыдущая</button>
                <button onClick={handleClickNext}>Следующая</button>
            </div>
          </div>
        </div>
      </Container>
    </section>
    </>
  );
};

export default SingleProjectPage;