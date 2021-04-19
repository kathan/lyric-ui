import React from 'react';
import SetlistService from './services/setlists';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            setlists: []
        };
    }

    render(){
        const { setlists } = this.state;
        return (
            <ul>
                <li>All Songs</li>
            {setlists.map(setlist => {
                return this.renderSetlist(setlist);
            })}
            </ul>
        );
    }

    renderSetlist = setlist => <li>{setlist.name}</li>;

    componentDidMount (){
        this.getSetlists(setlists => {
            this.setState({
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