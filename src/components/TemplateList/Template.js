import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Modal from "react-modal";
import config from "../../config";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import axios from "axios";

//material UI components
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

/**
 * Component Declaration
 */
export default function Template(props) {
  const [deleteTemplateModalOpen, setDeleteTemplateModalOpen] = useState(false);
  const history = useHistory();

  const modalCustomStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const { data } = props;

  const handleDeleteTemplate = (id) => {
    axios
      .delete(config.SERVER_URL + `/api/template/${id}`)
      .then((res) => {
        alert(res.data);
        window.location.reload();
        setDeleteTemplateModalOpen(false);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <TableRow>
        <TableCell>{data.templateName}</TableCell>
        <TableCell>{data.sections}</TableCell>
        <TableCell>
          <Button
            size="small"
            variant="outlined"
            onClick={() => history.push(`/edit/${data["_id"]}`)}
          >
            Edit
          </Button>
        </TableCell>
        <TableCell>
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() => setDeleteTemplateModalOpen(true)}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <Modal
        isOpen={deleteTemplateModalOpen}
        onRequestClose={() => setDeleteTemplateModalOpen(false)}
        ariaHideApp={false}
        style={modalCustomStyles}
      >
        <p>Are you sure you want to delete this Template?</p>
        <Buttons onClick={() => handleDeleteTemplate(data["_id"])}>
          Delete
        </Buttons>
        <Buttons onClick={() => setDeleteTemplateModalOpen(false)}>
          Cancel
        </Buttons>
      </Modal>
    </>
  );
}

/**
 * Styled components declaration
 */
const Buttons = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 0.2rem;
  width: 6em;
  background: white;
  color: black;
  border: 2px solid lightblue;
`;
