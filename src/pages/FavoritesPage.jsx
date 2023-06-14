import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const FavoritesPage = () => {
  const [favoriteProjects, setFavoriteProjects] = useState([]);

  useEffect(() => {
    const fetchFavoriteProjects = async () => {
      try {
        const favoriteProjectsIds = JSON.parse(localStorage.getItem('favoriteProjects')) || [];

        const requests = favoriteProjectsIds.map(async (id) => {
          try {
            const response = await axios.get(`https://646bafb47d3c1cae4ce42749.mockapi.io/Projects/${id}`);
            return response.data;
          } catch (error) {
            console.error('Error fetching project:', error);
            throw error; // Пробросить ошибку для обработки внешним обработчиком
          }
        });

        const responses = await Promise.all(requests);
        setFavoriteProjects(responses);
      } catch (error) {
        console.error('Error fetching favorite projects:', error);
      }
    };

    fetchFavoriteProjects();
  }, []);

  if (favoriteProjects.length === 0) {
    return <p className='singleProject'>У вас нет избранных проектов.</p>;
  }

  return (
    <>
      <section className="projects-favorites">
        <Container>
          <h2>Избранные проекты</h2>
          <div className="projects-favorit d-flex flex-wrap">
            {favoriteProjects.map((project) => (
              <div key={project.id} className="proj-imgbx">
                <img src={project.preview} alt={project.title} />
                <div className="proj-txtx">
                  <NavLink to={`/project/${project.id}`}>
                    <h4>{project.title}</h4>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default FavoritesPage;