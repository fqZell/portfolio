import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
// import PROJECTS from "../data/projects";
import colorSharp2 from "../assets/img/projects/color-sharp2.png";
// import { useState } from "react";
import Project from "../components/project/Project";

const ProjectsPage = () => {
  // const [projects, setProjects] = useState(PROJECTS);

  return (
    <>
      <section className="project">
        <Container>
          <Row>
            <Col size={12}>
              <h2>Проекты</h2>
              <p>
                Я стремлюсь создавать превосходные пользовательские
                интерфейсы, уделяя внимание деталям и использованию передовых
                технологий. Каждый проект – это возможность продемонстрировать
                мои навыки в HTML, CSS, JavaScript, React и других современных
                инструментах разработки.
              </p>
              <Tab.Container id="projects-tabs" defaultActiveKey="first">
                <Nav
                  variant="pills"
                  className="nav-pills mb-5 justify-content-center align-items-center"
                  id="pills-tab"
                >
                  <Nav.Item>
                    <Nav.Link eventKey="first" className="rounded-left">
                      Вкладка 1
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second" className="rounded">
                    Вкладка 2
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third" className="rounded-right">
                    Вкладка 3
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content id="slideInUp" className="project-card">
                  <Tab.Pane eventKey="first">
                    <Row>
                      {/* {projects
                        .filter((project) => project.id >= 4 && project.id <= 7)
                        .map((project) => ( */}
                          <Project 
                          // project={project} 
                          />
                        {/* // ))} */}
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Row>
                      {/* {projects
                        .filter((project) => project.id >= 1 && project.id <= 3)
                        .map((project) => (
                          <Project key={project.id} project={project} />
                        ))} */}
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <Row>
                      {/* {projects
                        .filter((project) => project.id >= 8 && project.id <= 9)
                        .map((project) => (
                          <Project key={project.id} project={project} />
                        ))} */}
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Col> 
          </Row>
        </Container>
        <img className="background-image-right" src={colorSharp2}></img>
      </section>
    </>
  );
};

export default ProjectsPage;