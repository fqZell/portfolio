import React from 'react'

export const Skills = ({ skill }) => {

  return (
    <>
          <div className="item">
            <img src={skill.preview} alt="" />
            <h5>{skill.title}</h5>
          </div>
    </>
  )
}
