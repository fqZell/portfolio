import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
// import PROJECTS from "../data/projects";
import colorSharp2 from "../assets/img/projects/color-sharp2.png";
// import Project from "../components/project/Project";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const cats = [
  { name: 'Все' },
  { name: 'React' },
  { name: 'PHP' },
  { name: 'JS' },
  { name: 'Laravel' },  
]

const ProjectsPage = () => {
  // const [projects, setProjects] = useState(PROJECTS);
  const [projects, setProjects] = useState([]);
  const [categoryId, setcategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://646bafb47d3c1cae4ce42749.mockapi.io/Projects?${categoryId ? `categories=${categoryId}` : ''}`)
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error(error);
      }).finally(() => setIsLoading(false))
  }, [categoryId]);

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
              <div className="categories">
                {cats.map((obj, i) => (
                    <li onClick={() => setcategoryId(i)} className={categoryId === i ? 'active' : ''} key={obj.name}>
                      {obj.name}
                    </li>
                ))}
              </div>
              <Tab.Container id="projects-tabs" defaultActiveKey="first">

                {/* <Nav
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
                </Nav> */}
                <Tab.Content id="slideInUp" className="project-card">
                  <Tab.Pane eventKey="first">
                    <Row>
                      {/* {projects
                        .filter((project) => project.id >= 4 && project.id <= 7)
                        .map((project) => ( */}
                        {isLoading ? (<h2>Идет загрузка...</h2>) 
                        : 
                        (projects.map(project => (
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
                        )))}
                        {/* // ))} */}
                    </Row>
                  </Tab.Pane>
                  {/* <Tab.Pane eventKey="second">
                    <Row>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <Row>
                    </Row>
                  </Tab.Pane> */}
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