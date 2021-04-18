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
        if(Array.isArray(setlists)){
            return (
                <ul>
                {setlists.map(setlist => {
                    return this.renderSetlist(setlist);
                })}
                </ul>
            );
        }
        return <div>No setlists</div>;
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