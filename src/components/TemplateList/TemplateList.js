import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import config from "../../config";
import Template from "./Template";

//material UI components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

// Component declaration

const Temp = (props) => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    function getTemplate() {
      axios
        .get(config.SERVER_URL + '/api/template/')
        .then((res) => {
          setTemplates(res.data.allTemplates)
        })
        .catch((err) => console.log(err));
    }
    getTemplate();
  }, []);

  const handleUpdateTemplate = () => {
    setTemplates(templates.map());
  };

  return (
    <div>
      <Header>{templates.length !== 0 && <></>}</Header>
      {templates.length === 0 ? (
        <NoTemplateContainer>
          {/* <h1>You haven't created any templates</h1> */}
        </NoTemplateContainer>
      ) : (
        <Container>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>TemplateName</TableCell>
                  <TableCell>Section</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {templates.map((template, index) => {
                  return (
                    <Template
                      key={index}
                      data={template}
                      handleUpdateTemplate={handleUpdateTemplate}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
    </div>
  );
};

// styled components declaration

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Buttons = styled.button`
  background-color: white;
  color: black;
  padding: 2em;
  cursor: pointer;
`;

const Container = styled.div`
  ${
    "" /* background: #444444;
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 2em 0;
  row-gap: 2em;
  min-height: 80vh;
  ${mediaQueries.mobile} {
    grid-template-columns: 100%; */
  }
  }
`;

const NoTemplateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 20vh);
`;
export default Temp;
