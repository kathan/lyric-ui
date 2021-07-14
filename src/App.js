import React from 'react';
import NavigationWrapper from './components/NavigationWrapper';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
    palette: {
      background: {
        default: "black"
      },
      text: {
        primary: "#ffffff"
      }
    }
});

class App extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render(){
        return (
            <React.Fragment>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <NavigationWrapper/>
                </MuiThemeProvider>
            </React.Fragment>
        );
    }
}

export default App;