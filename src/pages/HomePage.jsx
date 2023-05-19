import { useState } from "react";

import SKILLS from "../data/skills";
import { Col, Container, Row } from 'react-bootstrap';
import { Skills } from "../components/skill/Skill";
import  Banner  from "../components/banner/banner";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const HomePage = () => {

    const [skills, setSkills] = useState(SKILLS);

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    return (
        <>

            <Banner />

            <section className="skill">
                <Container>
                <Row>
                    <Col>
                    <div className="skill-bx">
                        <h2>Навыки</h2>
                        <p>Список моих навыков и знаний в области создания веб-приложений. Я работаю с различными языками программирования, технологиями и системами управления контентом для создания уникальных веб-решений. Я постоянно обучаюсь, чтобы обеспечить оптимальные результаты для ваших проектов.</p>
                        <Carousel responsive={responsive} infinite className='skill-slider'>
                        {skills.map((skill) => (
                            <Skills key={skill} skill={skill} />
                        ))}
                        </Carousel>
                    </div>
                    </Col>
                </Row>
                </Container>
            </section>

        </>
    )
}

export default HomePage;