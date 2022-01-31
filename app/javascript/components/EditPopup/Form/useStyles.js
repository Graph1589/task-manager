import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  preview: {
    display: 'block',
    maxWidth: 300,
    maxHeight: 300,
  },
}));

export default useStyles;
