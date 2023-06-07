import { useState } from "react";
import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";

const cats = [
  { name: 'React' },
  { name: 'PHP' },
  { name: 'JS' },
  { name: 'Laravel' },  
]

const AddProject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectSkills, setProjectSkills] = useState("");
  const [projectPreview, setProjectPreview] = useState("");
  const [projectGitHubLink, setProjectGitHubLink] = useState("");
  const [projectPhoto, setProjectPhoto] = useState("");
  const [projectPhoto2, setProjectPhoto2] = useState("");
  const [projectPhoto3, setProjectPhoto3] = useState("");
  const [projectPhoto4, setProjectPhoto4] = useState("");
  const [projectCats, setProjectCats] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://646bafb47d3c1cae4ce42749.mockapi.io/Projects", {
        title: projectName,
        skills: projectSkills,
        preview: projectPreview,
        githubLink: projectGitHubLink,
        photo: projectPhoto,
        photo2: projectPhoto2,
        photo3: projectPhoto3,
        photo4: projectPhoto4,
        categories: projectCats,
      })
      .then((response) => {
        console.log("Проект успешно добавлен:", response.data);
        // Обновление списка проектов или другие действия
      })
      .catch((error) => {
        console.error("Ошибка при добавлении проекта:", error);
      });

    setProjectName(""); // Сброс поля ввода
    setProjectSkills(""); // Сброс поля ввода
    setProjectPreview(""); // Сброс поля ввода
    setProjectGitHubLink("");
    setProjectPhoto("");
    setProjectPhoto2("");
    setProjectPhoto3("");
    setProjectPhoto4("");
    setProjectCats("");
  };

  return (
    <>
    <Container>
      <div className="add">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="projectName">
            <Form.Control
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Название проекта"
            />
          </Form.Group>

          <Form.Group controlId="projectSkills">
            <Form.Control
              type="text"
              value={projectSkills}
              onChange={(e) => setProjectSkills(e.target.value)}
              placeholder="Использованные навыки"
            />
          </Form.Group>

          <Form.Group controlId="projectPreview">
            <Form.Control
              type="text"
              value={projectPreview}
              onChange={(e) => setProjectPreview(e.target.value)}
              placeholder="Превью"
            />
          </Form.Group>

          <Form.Group controlId="projectGitHubLink">
            <Form.Control
              type="text"
              value={projectGitHubLink}
              onChange={(e) => setProjectGitHubLink(e.target.value)}
              placeholder="Ссылка на GitHub репозиторий"
            />
          </Form.Group>

          <Form.Group controlId="projectPhoto">
            <Form.Control
              type="text"
              value={projectPhoto}
              onChange={(e) => setProjectPhoto(e.target.value)}
              placeholder="Добавить первую фотографию"
            />
          </Form.Group>

          <Form.Group controlId="projectPhoto2">
            <Form.Control
              type="text"
              value={projectPhoto2}
              onChange={(e) => setProjectPhoto2(e.target.value)}
              placeholder="Добавить вторую фотографию"
            />
          </Form.Group>

          <Form.Group controlId="projectPhoto3">
            <Form.Control
              type="text"
              value={projectPhoto3}
              onChange={(e) => setProjectPhoto3(e.target.value)}
              placeholder="Добавить третью фотографию"
            />
          </Form.Group>

          <Form.Group controlId="projectPhoto4">
            <Form.Control
              type="text"
              value={projectPhoto4}
              onChange={(e) => setProjectPhoto4(e.target.value)}
              placeholder="Добавить четвертую фотографию"
            />
          </Form.Group>

          <Form.Group controlId="projectCats">
            <Form.Control
              type="number"
              min="1"
              max="4"
              value={projectCats}
              onChange={(e) => setProjectCats(e.target.value)}
              placeholder="Выберите категорию (от 1 до 4)"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Добавить проект
          </Button>
        </Form>
      </div>
    </Container>
    </>
  );
};

export default AddProject;