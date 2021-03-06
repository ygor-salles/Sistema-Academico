import { Button, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Discipline } from '../../models/discipline.model';
import api from '../../services/api';
import { useStyles, initForm, FormDiscipline } from './DisciplineUtils';
import DialogDiscipline  from './DialogDiscipline';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function DisciplineComponent() {
    // Componente de estilização
    const classes = useStyles();
    
    // Ao inicializar o componente, carrega todas as displinas
    const [disciplines, setDisciplines] = useState<Discipline[]>([]);
    useEffect(() => {
        api.get('disciplines')
            .then(response => setDisciplines(response.data))
            .catch(error => console.log(error))
    }, []);

    // Usado para a paginação: pagina, itens por página
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Usado para componente do modal de cadastro
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(initForm);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (obj: FormDiscipline) => {
        setOpen(false);
        setSelectedValue(obj);
        console.log(obj);
    };

    
    return (
        <>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Código</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Carga Horária</TableCell>
                                <TableCell>Data de Criação</TableCell>
                                <TableCell>Editar</TableCell>
                                <TableCell>Deletar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {disciplines.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        <TableCell>{row.code}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.workload}</TableCell>
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
                    count={disciplines.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <Button variant="contained" color="primary" onClick={handleClickOpen} className={classes.butonContainer}>
                Cadastrar
            </Button>
            <DialogDiscipline selectedValue={selectedValue} open={open} onClose={handleClose} />
        </>
    );
}

export default DisciplineComponent;