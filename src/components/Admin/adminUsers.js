import axios from 'axios';
import config from '../../config';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import CreateSection from './Sections/CreateSections';
import {
  Grid,
  Typography,
  Box,
  tableCellClasses,
  Button,
  Paper,
  Container,
  TableCell,
  TableRow,
  TableContainer,
  TableBody,
  Table,
  TableHead,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Style table header
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#78C6A3',
    color: '#26532b',
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Style Table Rows
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#FDFCDC',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

/**
 * Component Declaration
 **/

function User(props) {
  const { data } = props;

  const handleSectionChange = (e, menuData) => {
    console.log(props.sectionChoices);
    console.log(menuData.props.value);
    console.log(props.sectionChoices.filter(section => {return section.sectionName === menuData.props.value}));
    
    axios
      .post(config.SERVER_URL + `/api/section/assign`, {
        sectionId: props.sectionChoices.filter(section => {return section.sectionName === menuData.props.value})[0]['_id'],
        userId: data['_id'],
      })
      .then((res) => {
        alert(res.data);
        window.location.reload();
      })
      .catch((err) => alert(err.message));
  };

  console.log(props.sectionChoices);
  const sectionChoice = Object.entries(props.sectionChoices).map((section) => (
    <MenuItem key={section['_id']} value={section.sectionName}>
      {section.sectionName}
    </MenuItem>
  ));

  const promoteRequest = (id) => {
    axios
      .post(config.SERVER_URL + `/api/admin/promote`, { id })
      .then((res) => {
        alert(res.data);
        window.location.reload();
      })
      .catch((err) => alert(err.message));
  };

  const demoteRequest = (id) => {
    axios
      .post(config.SERVER_URL + `/api/admin/demote`, { id })
      .then((res) => {
        alert(res.data);
        window.location.reload();
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <TableRow>
        <TableCell>{data.email}</TableCell>
        <TableCell>
          {!data.admin && !data.superAdmin && <>Member</>}
          {data.admin && !data.superAdmin && <>Admin</>}
          {data.superAdmin && data.admin && <>Super Admin</>}
        </TableCell>
        <TableCell>
          <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
            <Select value={0} onChange={handleSectionChange}>
              {props.sectionChoices.map((section) => {
                return (
                  <MenuItem key={section['_id']} value={section.sectionName}>
                    {section.sectionName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {/* {data.section ? <>{data.section}</> : 'N/A'} */}
        </TableCell>
        <TableCell>
          <Button
            size="small"
            variant="outlined"
            color="success"
            onClick={() => promoteRequest(data['_id'])}
          >
            Promote
          </Button>
        </TableCell>
        <TableCell>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => demoteRequest(data['_id'])}
          >
            Demote
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

// Component Declaration

const AdminUsers = (props) => {
  const [users, setUsers] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    function getSection() {
      axios
        .get(config.SERVER_URL + '/api/section/sections')
        .then((res) => {
          setSections(res.data.allSections);
        })
        .catch((err) => console.log(err));
    }
    getSection();
  }, []);

  useEffect(() => {
    function getUser() {
      axios
        .get(config.SERVER_URL + '/api/admin/users/')
        .then((res) => setUsers(res.data.allUsers.reverse()))
        .catch((err) => console.log(err));
    }
    getUser();
  }, []);

  const handleUpdateUser = () => {
    console.log(users);
    setUsers([...users]);
  };

  const handleUpdateSection = () => {
    setSections(sections.map());
  };

  return (
    <>
      <Grid Container spacing={2}>
        <Container sx={{ p: 2 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 500,
                        fontFamily: 'Gill Sans',
                      }}
                    >
                      User Name
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>Position</StyledTableCell>
                  <StyledTableCell>Section</StyledTableCell>
                  <StyledTableCell>Promote</StyledTableCell>
                  <StyledTableCell>Demote</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => {
                  return (
                    <User
                      key={index}
                      data={user}
                      handleUpdateUser={handleUpdateUser}
                      sectionChoices={sections}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Grid>
    </>
  );
};

export default withRouter(AdminUsers);
