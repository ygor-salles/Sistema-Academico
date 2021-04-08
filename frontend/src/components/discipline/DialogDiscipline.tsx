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
    const [workloadDisc, setWorkloadDisc] = React.useState('');

    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Cadastro de Disciplina</DialogTitle>
                <DialogContent>
                    <form noValidate autoComplete="off">
                        <TextField className={classes.inputForm} id="code" label="Code discipline"
                            value={codeDisc} onChange={(event) => setCodeDisc(event.target.value)} fullWidth />
                        <TextField className={classes.inputForm} id="name" label="Name discipline"
                            value={nameDisc} onChange={(event) => setNameDisc(event.target.value)} fullWidth />
                        <TextField className={classes.inputForm} id="workload" label="Workload discipline"
                            value={workloadDisc} onChange={(event) => setWorkloadDisc(event.target.value)} fullWidth />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                </Button>
                    <Button onClick={handleClose} variant="contained" color="primary">
                        Subscribe
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DialogDiscipline;