import { Button, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Discipline } from '../../models/discipline.model';
import api from '../../services/discipline.service';
import { columns, useStyles, initForm, FormDiscipline } from './DisciplineUtils';
import DialogDiscipline  from './DialogDiscipline';

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
                                {columns.map((column) => (
                                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {disciplines.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
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
            <React.StrictMode>
                <DialogDiscipline selectedValue={selectedValue} open={open} onClose={handleClose} />
            </React.StrictMode>
        </>
    );
}

export default DisciplineComponent;