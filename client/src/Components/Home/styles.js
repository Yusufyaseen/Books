import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSerach: {
    borderRadius: 4,
    padding: '16px',
    display: 'flex',
    marginBottom: '1rem',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
}));
