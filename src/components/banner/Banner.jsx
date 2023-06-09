import React, { useEffect, useState } from 'react'
import 'animate.css'
import TrackVisibility from 'react-on-screen';

import { Col, Container, Row } from 'react-bootstrap'
import { ArrowRightCircle } from 'react-bootstrap-icons';
import headerImg from '../../assets/img/banner/header-img.svg';

const Banner = () => {

  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Веб Разработчик", "Веб Дизайнер", "UI/UX Дизайнер" ];
  const period = 200;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length -1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <>
      <section className='banner'>
        <Container>
          <Row className='aligh-items-center'>
            <Col xs={12} md={6} xl={7}>
              <TrackVisibility>
              {({ isVisible }) => 
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Добро пожаловать в мое портфолио</span>
                <h1>{`Я `}
                <span className='txt-rotate' data-period="1000" 
                data-rotate='[ "Веб Разработчик", "Веб Дизайнер", "UI/UX Дизайнер" ]'>
                <span className="wrap">{text}</span>
                </span>
                </h1>
                <p>Привет, я веб-разработчик, специализирующийся на создании красивых и эффективных веб-сайтов. Мой опыт включает работу с различными языками программирования и фреймворками, такими как React js, Vue.js, Node.js и другие. Будь то построение отдельной веб-страницы, интернет-магазина или полноценного веб-приложения, я всегда стремлюсь к созданию продуктов, которые станут наилучшими в своем классе, с учетом потребностей клиента и конечных пользователей.</p>
                <a href="#connect"><button onClick={() => console.log('connect')}>Давайте свяжемся <ArrowRightCircle size={25} /></button></a>
              </div>}
              </TrackVisibility>
            </Col>

            <Col xs={12} md={6} xl={5}>
              <TrackVisibility>
              {({ isVisible }) => 
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <img src={headerImg} alt="Header Img" />
              </div>}
              </TrackVisibility>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Banner;