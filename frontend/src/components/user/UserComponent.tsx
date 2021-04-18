import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { User } from '../../models/user.model';
import api from '../../services/api';
import { useStyles } from './UserUtils';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function UserComponent() {
    const classes = useStyles();
    
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        api.get('users')
            .then(response => setUsers(response.data))
            .catch(error => console.log(error))
    }, []);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell>Administrador</TableCell>
                                <TableCell>Data de Criação</TableCell>
                                <TableCell>Atualizar</TableCell>
                                <TableCell>Deletar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.email}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.admin === true ? 'admin' : 'user'}</TableCell>
                                        <TableCell>{row.created_at}</TableCell>
                                        <TableCell align="center"> <EditIcon htmlColor="#d9cd26" /> </TableCell>
                                        <TableCell align="center"> <DeleteIcon htmlColor="#e35e6b" /> </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <Button variant="contained" color="primary" className={classes.butonContainer}>
                Cadastrar
            </Button>
        </>
    );
}

export default UserComponent