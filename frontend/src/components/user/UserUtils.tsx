import { makeStyles } from '@material-ui/core/styles';

interface Column {
    id: 'name' | 'email' | 'admin' | 'created_at';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'name', label: 'Nome', minWidth: 170 },
    { id: 'email', label: 'E-mail', minWidth: 170 },
    { id: 'admin', label: 'Administrador', minWidth: 100 },
    { id: 'created_at', label: 'Data de Criação', minWidth: 150 },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    butonContainer: {
        marginTop: 20
    }
});

export { columns, useStyles };
