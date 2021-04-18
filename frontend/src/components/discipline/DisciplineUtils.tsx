import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    butonContainer: {
        marginTop: 20
    },
    inputForm: {
        marginBottom: 20
    } 
});

export type FormDiscipline = { code: string, name: string, workload: number };
const initForm: FormDiscipline = { code: '', name: '', workload: 0 };

export { useStyles, initForm };
