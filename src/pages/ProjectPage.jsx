import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';
import PROJECTS from '../data/projects';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { ArrowRightCircle } from 'react-bootstrap-icons';

const ProjectPage = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    // const [currentImageIndex, setCurrentImageIndex] = useState(0); 
  
    useEffect(() => {
      // Найти проект с нужным id из массива PROJECTS
      const selectedProject = PROJECTS.find((proj) => proj.id === Number(id));
      setProject(selectedProject);
    }, [id]);
  
    if (!project) {
      // Если проект не найден, можно показать сообщение или перенаправить пользователя
      return <p>Проект не найден</p>;
    }

  return (
    <>
    <section className="singleProject">
      <Container>
        <NavLink to={'/projects'}><button className="button-NavLink">Назад <ArrowRightCircle size={25} /> </button></NavLink>
        <div className="project-details">
          <h2>{project.title}</h2>
          <div className="gallery">
            <Carousel
              infiniteLoop
              showThumbs={false}
              autoPlay
              interval={3000}
              className="img-slider"
            >
              <div>
                <img src={project.photo} alt={project.title} />
              </div>
              <div>
                <img src={project.photo2} alt={project.title} />
              </div>
              <div>
                <img src={project.photo3} alt={project.title} />
              </div>
              <div>
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
        </div>
      </Container>
    </section>
    </>
  )
}

export default ProjectPage