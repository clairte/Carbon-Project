import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import Modal from 'react-modal';
import axios from 'axios';
import config from "../../config";

// Component declaration

const CreateTemplate = (props) => {

  const [template, setTemplate] = useState([]);
  const [CreateTemplatetModalOpen, setCreateTemplateModalOpen] = useState(false);
  
  useEffect(() => {
    function getTemplate() {
      axios
        .get(config.SERVER_URL + '/api/template/')
        .then((res) => {
          setTemplate(res.data)
        })
        .catch((err) => console.log(err));
    }
    getTemplate();
  }, []);


  const modalCustomStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div>
        <Buttons align = "center"
          label="Create template"
          onClick = {() => setCreateTemplateModalOpen(true)}
        >
          Create Template
        </Buttons>

        <Modal
        isOpen ={CreateTemplatetModalOpen}
        onRequestClose = {() => setCreateTemplateModalOpen(false)}
        ariaHideApp={false}
        style={modalCustomStyles}
        >

        <Formik
        initialValues={{ templateName: '' }}
        validate={(values) => {
            const errors = {};
            if (!values.templateName)
              errors.templateName = 'Template Name required';
            return errors;
          }}

          onSubmit={(values, { setSubmitting }) => {
            axios
              .post(config.SERVER_URL + '/api/template/create', {
                templateName: values.templateName,
              })
              .then((res) => {
                alert(`template ${values.templateName} successfully created!`);
                window.location.reload();
                setTemplate((prevState) => [...prevState, res.data.template]);
                setCreateTemplateModalOpen(false);
                setSubmitting(false);
              })
              .catch((err) => {
                //alert(err);
              });
          }}

        >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
          <label>
            Create a Template
            <br />
            <Input
            name = "templateName"
            type = "text"
            onChange={formik.handleChange}
              onBlur={formik.handleBlur}
                value={formik.values.templateName}
                label = "Create a template"

            />
          </label>
          <Button type="submit">Submit</Button>
          <Button align="right" onClick={() => setCreateTemplateModalOpen(false)}>Cancel</Button>
          <br />
          {formik.touched.templateName && formik.errors.templateName ? (
                <div>{formik.errors.templateName}</div>
              ) : null}
          </form>

        )

        }

        </Formik>

        </Modal>
    </div>
  );
};

const Button = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 0.2rem;
  width: 6em;
  background: white;
  color: black;
  border: 2px solid palevioletred;
`;

const Buttons = styled.button`
  display: inline-block;
  border-radius: 10px;
  padding: 0.5rem 0;
  margin: 1rem 0.5rem;
  width: 10em;
  height: 5em;
  fontSize: 14pt;
  background: white;
  color: black;
  border: 2px solid black;
  font-size: 16px;

`;



const Input = styled.input`
  display: inline-block;
  padding: 0.5rem 0;

  width: 11em;
  background: white;
  color: black;
  border: 2px solid black;
  
`;

export default CreateTemplate;