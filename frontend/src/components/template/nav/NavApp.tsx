import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import BookIcon from '@material-ui/icons/Book';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import GridOnIcon from '@material-ui/icons/GridOn';
import SchoolIcon from '@material-ui/icons/School';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import { withRouter } from "react-router-dom";
import GroupIcon from '@material-ui/icons/Group';

type Props = {
  history: any;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#444e83',
        color: '#fff'
      },
      drawerContainer: {
        overflow: 'auto',
        backgroundColor: '#444e83'
      },
  }),
);

function NavApp(props: Props) {
    const classes = useStyles();

      const { history } = props;
      const itemsList = [
        {
          text: 'Disciplina',
          icon: <BookIcon htmlColor="#fff" />,
          onclick: () => history.push('/disciplines')
        },
        {
          text: 'Curso',
          icon: <MenuBookIcon htmlColor="#fff" />,
          onclick: () => history.push('/courses')
        },
        {
          text: 'Grade',
          icon: <GridOnIcon htmlColor="#fff" />,
          onclick: () => history.push('/grids')
        },
        {
          text: 'Aluno',
          icon: <SchoolIcon htmlColor="#fff" />,
          onclick: () => history.push('/students')
        },
        {
          text: 'Historico',
          icon: <FolderSharedIcon htmlColor="#fff" />,
          onclick: () => history.push('/historics')
        },
        {
          text: 'Usuários',
          icon: <GroupIcon htmlColor="#fff" />,
          onclick: () => history.push('/users')
        },
      ]
    

    return (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              {itemsList.map((item, index) => {
                const { text, icon, onclick } = item;
                return (
                  <ListItem button key={text} onClick={onclick}>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    <ListItemText primary={text} />
                  </ListItem>
                )
              })}
            </List>
          </div>
        </Drawer>
    );
}

export default withRouter(NavApp);