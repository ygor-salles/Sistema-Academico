import { Button, TextField, DialogTitle, DialogContent, DialogActions, Dialog } from '@material-ui/core';
import React from 'react';
import api from '../../services/api';
import { FormDiscipline, useStyles } from './DisciplineUtils';

type Props = {
    selectedValue: FormDiscipline
    open: boolean
    onClose: (obj: FormDiscipline) => void
}

function DialogDiscipline(props: Props) {
    const { selectedValue, open, onClose } = props;

    const classes = useStyles();

    const handleClose = () => {
        console.log(selectedValue);
        onClose(selectedValue);
    };

    const [codeDisc, setCodeDisc] = React.useState(selectedValue.code);
    const [nameDisc, setNameDisc] = React.useState(selectedValue.name);
    const [workloadDisc, setWorkloadDisc] = React.useState(selectedValue.workload);

    async function handleSubmit(){
        const data = {
            code: codeDisc,
            name: nameDisc,
            workload: workloadDisc
        }
        const response = await api.post('disciplines', data);
        console.log(response);
        if(response.status===201 || response.status===200){
            window.location.href='/disciplines';
        } else {
            alert('Erro ao cadastrar disciplina!');
        }
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Cadastro de Disciplina</DialogTitle>
                <DialogContent>
                    <form noValidate autoComplete="off">
                        <TextField className={classes.inputForm} id="code" label="Code discipline"
                            value={codeDisc} fullWidth color="secondary"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCodeDisc(e.target.value)}  />
                        <TextField className={classes.inputForm} id="name" label="Name discipline"
                            value={nameDisc} fullWidth color="secondary"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameDisc(e.target.value)} />
                        <TextField className={classes.inputForm} id="workload" label="Workload discipline"
                            value={workloadDisc} fullWidth color="secondary"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWorkloadDisc(+e.target.value)} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancelar
                </Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Salvar
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DialogDiscipline;