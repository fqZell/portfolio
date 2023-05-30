import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Form, Container, Row, Col } from "react-bootstrap";

const Calculator = () => {
  const [websiteType, setWebsiteType] = useState("");
  const [websitePages, setWebsitePages] = useState(0);
  const [websiteFeatures, setWebsiteFeatures] = useState("");
  const [contactForm, setContactForm] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState(false);
  const [onlineChat, setOnlineChat] = useState(false);
  const [designType, setDesignType] = useState("");
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [sliderProgress, setSliderProgress] = useState(0);

  const handleWebsiteTypeChange = (event) => {
    const selectedType = event.target.value;

    if (selectedType === "landing") {
      setWebsitePages(1);
      setSliderProgress(0);
    } else if (selectedType === "multi") {
      setWebsitePages(1);
      setSliderProgress(10);
      if (designType === "custom") {
        setEstimatedCost(5000);
      } else {
        setEstimatedCost(0);
      }
    }

    setWebsiteType(selectedType);
  };

  const handleWebsitePagesChange = (event) => {
    const value = parseInt(event.target.value);
    setWebsitePages(value);
    setSliderProgress((value / 10) * 100);
  };

  const handleWebsiteFeaturesChange = (event) => {
    setWebsiteFeatures(event.target.value);
  };

  const handleContactFormChange = () => {
    setContactForm(!contactForm);
  };

  const handleFeedbackFormChange = () => {
    setFeedbackForm(!feedbackForm);
  };

  const handleOnlineChatChange = () => {
    setOnlineChat(!onlineChat);
  };

  const handleDesignTypeChange = (event) => {
    setDesignType(event.target.value);
    if (websiteType === "multi" && event.target.value === "custom") {
      setEstimatedCost(5000);
    } else {
      setEstimatedCost(0);
    }
  };

  const calculateCost = () => {
    const typeCost = websiteType === "landing" ? 5000 : 0;
    const pagesCost = websitePages * 3000;
    const featuresCost = websiteFeatures * 1000;
    const contactFormCost = contactForm ? 2000 : 0;
    const feedbackFormCost = feedbackForm ? 1500 : 0;
    const onlineChatCost = onlineChat ? 3000 : 0;
    const designCost = designType === "custom" ? 5000 : 0;
    const totalCost =
      typeCost +
      pagesCost +
      featuresCost +
      contactFormCost +
      feedbackFormCost +
      onlineChatCost +
      designCost;
    setEstimatedCost(totalCost);
  };

  useEffect(() => {
    calculateCost();
  }, [websiteType, websitePages, websiteFeatures, contactForm, feedbackForm, onlineChat, designType]);

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="calculator">
              <h2>Калькулятор</h2>
              <Form className="form-calculator">
                <Form.Group>
                  <Form.Label>Тип веб-сайта:</Form.Label>
                  <Form.Control as="select" value={websiteType} onChange={handleWebsiteTypeChange}>
                    <option value="">Выберите тип</option>
                    <option value="landing">Одностраничный веб-сайт</option>
                    <option value="multi">Многостроничный веб-сайт</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Количество страниц:</Form.Label>
                  <div className="slider-container">
                    <Form.Range
                      min={0}
                      max={10}
                      value={websitePages}
                      onChange={handleWebsitePagesChange}
                      disabled={websiteType === "landing"}
                    />
                    <div className="slider-progress" style={{ width: `${sliderProgress}%` }} />
                  </div>
                  <p>{websitePages}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Тип дизайна:</Form.Label>
                  <div className="design-type">
                    <Form.Check
                      type="radio"
                      label="Авторский дизайн"
                      name="designType"
                      value="custom"
                      checked={designType === "custom"}
                      onChange={handleDesignTypeChange}
                    />
                    <Form.Check
                      type="radio"
                      label="Шаблонный дизайн"
                      name="designType"
                      value="template"
                      checked={designType === "template"}
                      onChange={handleDesignTypeChange}
                    />
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Дополнительные функции:</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="Контактная форма"
                    checked={contactForm}
                    onChange={handleContactFormChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Форма обратной связи"
                    checked={feedbackForm}
                    onChange={handleFeedbackFormChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Онлайн-чат"
                    checked={onlineChat}
                    onChange={handleOnlineChatChange}
                  />
                </Form.Group>
              </Form>
              {estimatedCost > 0 && (
                <motion.div
                  className="result"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3>Примерная стоимость:</h3>
                  <p>{estimatedCost} ℗</p>
                  <p className="calculator-warning">*указанная стоимость является приблизительной и может изменяться в зависимости от сложности работы.</p>
                </motion.div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Calculator;