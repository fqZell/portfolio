import { useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

const AddProject = () => {
  const [projectName, setProjectName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://646bafb47d3c1cae4ce42749.mockapi.io/Projects", {
        title: projectName,
      })
      .then((response) => {
        console.log("Проект успешно добавлен:", response.data);
        // Обновление списка проектов или другие действия
      })
      .catch((error) => {
        console.error("Ошибка при добавлении проекта:", error);
      });

    setProjectName(""); // Сброс поля ввода
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