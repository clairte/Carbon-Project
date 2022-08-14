import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import Modal from 'react-modal';
import axios from 'axios';
import Tab from '@mui/material/Tab';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import config from '../../config';

// Component declaration

const Create = (props) => {
  const [projects, setProjects] = useState([]);
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);

  useEffect(() => {
    function getProject() {
      axios
        .get(config.SERVER_URL + '/api/projects/')
        .then((res) => {
          setProjects(res.data)
         // window.location.reload();
        })
        .catch((err) => console.log(err));
    }
    getProject();
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
          onClick={() => setCreateProjectModalOpen(true)}
        >
          Create a Blank Project
        </Buttons>

      <Modal
        isOpen={createProjectModalOpen}
        onRequestClose={() => setCreateProjectModalOpen(false)}
        ariaHideApp={false}
        style={modalCustomStyles}
      >
        
        <Formik
          initialValues={{ projectName: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.projectName)
              errors.projectName = 'Project Name required';
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .post(config.SERVER_URL + '/api/projects/create', {
                name: values.projectName,
              })
              .then((res) => {
                alert(`Project ${values.projectName} successfully created!`);
                location.href = '/';
                setProjects((prevState) => [...prevState, res.data.project]);
                setCreateProjectModalOpen(false);
                setSubmitting(false);
              })
              .catch((err) => {
                alert(err);
              });
          }}
        >
          {(formik) => (
            
            <form onSubmit={formik.handleSubmit}>
            <label>
              Create a Project
            <br/>
              <Input
                name="projectName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.projectName}
                label = "Create a Project"
              >
              </Input>
              </label>
              <Button type="submit" >Submit</Button>
              <Button align="right" onClick={() => setCreateProjectModalOpen(false)}>Cancel</Button>
              <br />
              {formik.touched.projectName && formik.errors.projectName ? (
                <div>{formik.errors.projectName}</div>
              ) : null}
              
            </form>
          )}
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

export default Create;
