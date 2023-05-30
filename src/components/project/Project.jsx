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
          <NavLink to={`/project/${project.id}`}>
            <h4>{project.title}</h4>
          </NavLink>
        </div>
      </div>
    </Col>
    </>
  )
}

export default Project