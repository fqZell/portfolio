import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Project = ({ project }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('https://646bafb47d3c1cae4ce42749.mockapi.io/Projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {projects.map(project => (
      <Col key={project.id} size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={project.preview} alt={project.title} />
        <div className="proj-txtx">
          <NavLink to={`/project/${project.id}`}>
            <h4>{project.title}</h4>
          </NavLink>
        </div>
      </div>
    </Col>
    ))}
    </>
  )
}

export default Project