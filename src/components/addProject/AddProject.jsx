import { useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

const AddProject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectSkills, setProjectSkills] = useState("");
  const [projectPreview, setProjectPreview] = useState("");
  const [projectGitHubLink, setProjectGitHubLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://646bafb47d3c1cae4ce42749.mockapi.io/Projects", {
        title: projectName,
        skills: projectSkills,
        preview: projectPreview,
        githubLink: projectGitHubLink,
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
  };

  return (
    <>
    <Container>
        <div className="add">
      {/* Форма для добавления проекта */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Название проекта"
        />
        <input
          type="text"
          value={projectSkills}
          onChange={(e) => setProjectSkills(e.target.value)}
          placeholder="Использованные навыки"
        />
        <input
          type="text"
          value={projectPreview}
          onChange={(e) => setProjectPreview(e.target.value)}
          placeholder="Превью"
        />
        <input
          type="text"
          value={projectGitHubLink}
          onChange={(e) => setProjectGitHubLink(e.target.value)}
          placeholder="Ссылка на GitHub репозиторий"
        />
        <button type="submit">Добавить проект</button>
      </form>

      {/* Вывод списка проектов */}
      {/* ... */}
      </div>
    </Container>
    </>
  );
};

export default AddProject;