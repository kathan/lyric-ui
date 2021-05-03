import React from 'react';
import SetlistService from './services/setlists';
import PersistentDrawerLeft from './components/NavigationDrawer';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            setlists: [],
            drawerState: true
        };
    }
    
    render(){
        const { setlists } = this.state;
        return (
            <React.Fragment>
                <PersistentDrawerLeft></PersistentDrawerLeft>
            </React.Fragment>
        );
    }
}

export default App;