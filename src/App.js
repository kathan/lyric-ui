import React from 'react';
import NavigationWrapper from './components/NavigationWrapper';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main:"#fff",
            contrastText: "#fff"
        },
    },   
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