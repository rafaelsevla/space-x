import {
  Button,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  Badge,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import clsx from 'clsx';
import { useStyles } from './styles';
import { routes } from '../routes';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';


const Sidebar = ({ title }: { title: string }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <AppBar position='absolute' className={clsx(classes.appBar, classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Typography component='h1' variant='h6' color='inherit' noWrap className={classes.title}>
            {title}
          </Typography>
          <Button
            color='inherit'
            title='Sair'
            onClick={() => {}}
          >
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        classes={{
          paper: clsx(classes.drawerPaper)
        }}
        open
      >
        <div className={classes.toolbarIcon}>
          <Button onClick={() => {}}>
            <span>
              SPACE-X
            </span>
          </Button>
        </div>
        <Divider />
        <List>
          {routes.map(route => (
            <ListItem
              button
              selected={history.location.pathname === route.url}
              component={props => <Link to={route.url} {...props} />}
            >
              <ListItemText secondary={route.title} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </>
  )
}

export default Sidebar
