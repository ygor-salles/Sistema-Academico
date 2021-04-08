import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormDiscipline, useStyles } from './DisciplineUtils';

type Props = {
    selectedValue: FormDiscipline
    open: boolean
    onClose: (obj: FormDiscipline) => void
}

function DialogDiscipline({ selectedValue, open, onClose }: Props) {

    const classes = useStyles();

    const handleClose = () => {
        onClose(selectedValue);
      };

    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Cadastro de Disciplina</DialogTitle>
                <DialogContent>
                    <TextField className={classes.inputForm} margin="dense" id="code" label="Code discipline" fullWidth />
                    <TextField className={classes.inputForm} margin="dense" id="name" label="Name discipline" fullWidth />
                    <TextField className={classes.inputForm} margin="dense" id="workload" label="Workload discipline" fullWidth />
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