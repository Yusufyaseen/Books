import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  paper: {
    padding: '20px',
    borderRadius: '15px',
  },
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    height: '300px',
  },
  media2: {
    borderRadius: '10px',
    objectFit: 'cover',
    width: '100%',
    height: '200px',
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginBottom: '50px',
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  cardContetnt: {
    padding: '0px',
    marginLeft: '0px',
    marginTop: '10px',
  },
  chip: {
    margin: '3px',
    fontWeight: 'bold',
  },
  commentOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  commentInnerContainer: {
    marginRight: '30px',
    height: '200px',
    overflow: 'auto',
  },
  commentDiv: {
    display: 'flex',
    marginBottom: '5px',
  },
  commentDiv2: {
    display: 'flex',
    marginBottom: '2px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
    },
  },
  avatar: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: '#aa0505',
    marginRight: '5px',
    marginBottom: '20px',
    width: '35px',
    height: '35px',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: '#33489f',
    width: '30px',
    height: '30px',
    marginRight: '10px',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  typography: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#808184',
  },
}));
