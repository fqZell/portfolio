import { Container, Row, Col, Tab, Pagination } from "react-bootstrap";
import colorSharp2 from "../assets/img/projects/color-sharp2.png";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import AddProjectButton from "../components/addProject/AddProjectButton";

const cats = [
  { name: 'Все' },
  { name: 'React' },
  { name: 'PHP' },
  { name: 'JS' },
  { name: 'Laravel' },
];

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://646bafb47d3c1cae4ce42749.mockapi.io/Projects?${
          categoryId ? `categories=${categoryId}` : ""
        }`
      )
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, [categoryId]);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

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
              <AddProjectButton />
              <div className="categories">
                {cats.map((obj, i) => (
                  <li
                    onClick={() => setCategoryId(i)}
                    className={categoryId === i ? "active" : ""}
                    key={obj.name}
                  >
                    {obj.name}
                  </li>
                ))}
              </div>
              <Tab.Container id="projects-tabs" defaultActiveKey="first">
                <Tab.Content id="slideInUp" className="project-card">
                  <Tab.Pane eventKey="first">
                    <Row>
                      {isLoading ? (
                        <h2>Идет загрузка...</h2>
                      ) : (
                        currentProjects.map((project) => (
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
                        ))
                      )}
                    </Row>
                    <div className="pagination-container">
                      <Pagination className="pagination justify-content-center">
                        <Pagination.First
                          onClick={() => paginate(1)}
                          disabled={currentPage === 1}
                        />
                        {Array.from(
                          Array(Math.ceil(projects.length / projectsPerPage)),
                          (item, index) => (
                            <Pagination.Item
                              key={index + 1}
                              active={index + 1 === currentPage}
                              onClick={() => paginate(index + 1)}
                            >
                              {index + 1}
                            </Pagination.Item>
                          )
                        )}
                        <Pagination.Last
                          onClick={() =>
                            paginate(
                              Math.ceil(projects.length / projectsPerPage)
                            )
                          }
                          disabled={
                            currentPage ===
                            Math.ceil(projects.length / projectsPerPage)
                          }
                        />
                      </Pagination>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
        <img
          className="background-image-right"
          src={colorSharp2}
          alt="Background"
        ></img>
      </section>
    </>
  );
};

export default ProjectsPage;