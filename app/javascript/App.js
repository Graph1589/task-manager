import { Provider } from 'react-redux';
import React from 'react';

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { dark } from '@material-ui/core/styles/createPalette';

import TaskBoard from 'containers/TaskBoard';
import store from 'store';

const theme = createTheme({
  palette: {
    mode: dark,
  },
});

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <TaskBoard />
    </ThemeProvider>
  </Provider>
);

export default App;
