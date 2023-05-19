import React from 'react'
import { Col } from 'react-bootstrap'

const Project = ({ project }) => {
  return (
    <>
      <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={project.preview} />
        <div className="proj-txtx">
          <h4>{project.title}</h4>
          <span>{project.skills}</span>
        </div>
      </div>
    </Col>
    </>
  )
}

export default Project