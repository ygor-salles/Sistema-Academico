import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootCard: {
      minWidth: 275,
    },
    title: {
      fontSize: 50,
    },
    pos: {
      marginBottom: 12,
    },
  }),
);

function MainApp() {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.rootCard}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Bem vindo ao Sistema Academico
              </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Resumo
              </Typography>
          <Typography variant="body2" component="p">
            Cadastro, consulta, alteração e deleção de dados do sistema.
                <br />
                Entidades: Disciplinas, Alunos, Cursos, Grades, Historicos.
              </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">SAIBA MAIS</Button>
        </CardActions>
      </Card>
    </>
  );
}

export default MainApp;