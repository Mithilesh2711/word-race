import React, { Component } from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Play from './PlayComponent';
import LeaderBoard from './LeaderBoardComponent';
import Stats from './StatsComponent'


class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data:{}
        }

        this.getData = this.getData.bind(this);
    }

    getData(){
        
        fetch('https://api.npoint.io/f784a82eb1a30eee30e8')
        .then(response => {
            if (response.ok) {
                return response;
            } 
        })  
        .then(response => {
            if(response){
                this.setState({data: response.json()})
                window.var = response.json();
            }
        })
    }

    render() {
        return (
          <div className="container">
                <BrowserRouter>
                        <Header/>
                        <Routes>
                                <Route exact path="/" element={<Home/>} />
                                <Route exact path="/home" element={<Home/>} />
                                <Route exact path='/play' element={<Play/>}/>
                                <Route exact path='/leaderboard' element={<LeaderBoard data={this.state.data}/>}/>
                                <Route exact path='/stats' element={<Stats data={this.state.data}/>}/>
                        </Routes>
                </BrowserRouter>
                
          </div>
        );
    }
}

export default Main;