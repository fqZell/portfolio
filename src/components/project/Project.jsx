import React from 'react'
import { Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Project = ({ project }) => {
  return (
    <>
      <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={project.preview} alt={project.title} />
        <div className="proj-txtx">
          <h4>{project.title}</h4>
          <span>{project.skills}</span>
          <button><NavLink to={project.githubLink} target="_blank" rel="noopener noreferrer">
              <span>Перейти к репозиторию на GitHub</span>
          </NavLink></button>
        </div>
      </div>
    </Col>
    </>
  )
}

export default Project