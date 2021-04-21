import React from 'react';
import SetlistService from './services/setlists';
import SetlistItem from './components/setlistItem'
import PersistentDrawerLeft from './components/persistentDrawerLeft';

const NEW_SETLIST = 'NEW_SETLIST';

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
                <PersistentDrawerLeft setlists={setlists}></PersistentDrawerLeft>
            </React.Fragment>
        );
    }

    renderSetlist = setlist => <SetlistItem setlist={setlist}></SetlistItem>;

    componentDidMount (){
        this.getSetlists(setlists => {
            this.setState({
                ...this.state,
                setlists
            });
        })
    }

    getSetlists(callback){
        SetlistService.getSetlists()
        .then(setlists => {
            if(setlists.data && setlists.data.setlists){
                callback(setlists.data.setlists);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
}

export default App;