import React from 'react';
import NavigationWrapper from './components/NavigationWrapper';

class App extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render(){
        return (
            <React.Fragment>
                <NavigationWrapper/>
            </React.Fragment>
        );
    }
}

export default App;