import { Button, TextField, DialogTitle, DialogContent, DialogActions, Dialog } from '@material-ui/core';
import React from 'react';
import { FormDiscipline, useStyles } from './DisciplineUtils';

type Props = {
    selectedValue: FormDiscipline
    open: boolean
    onClose: (obj: FormDiscipline) => void
}

function DialogDiscipline({ selectedValue, open, onClose }: Props) {

    const classes = useStyles();

    const handleClose = () => {
        console.log(selectedValue);
        onClose(selectedValue);
    };

    const [codeDisc, setCodeDisc] = React.useState('');
    const [nameDisc, setNameDisc] = React.useState('');
    const [workloadDisc, setWorkloadDisc] = React.useState(0);

    function handleSubmit(){
        const data = {
            code: codeDisc,
            name: nameDisc,
            workload: workloadDisc
        }
        console.log(data)
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