import React from 'react';
import NavigationDrawer from './components/NavigationDrawer';

class App extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render(){
        return (
            <React.Fragment>
                <NavigationDrawer/>
            </React.Fragment>
        );
    }
}

export default App;