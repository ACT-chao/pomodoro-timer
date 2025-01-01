import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF6B6B',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF6B6B',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
}); 