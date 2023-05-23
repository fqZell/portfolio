import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';
import PROJECTS from '../data/projects';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
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
  
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };

  return (
    <>
    <section className="singleProject">
      <Container>
        <NavLink to={'/projects'}><button className="button-NavLink">Назад <ArrowRightCircle size={25} /> </button></NavLink>
        <div className="project-details">
          <h2>{project.title}</h2>
          <div className="gallery">
            <Carousel responsive={responsive} infinite className='img-slider'>
                <img src={project.photo} alt={project.title} />
                <img src={project.photo2} alt={project.title} />
                <img src={project.photo3} alt={project.title} />
                <img src={project.photo4} alt={project.title} />
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