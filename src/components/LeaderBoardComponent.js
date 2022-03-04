import React, { Component } from 'react';
import { Media, Modal, Button, ModalBody, ModalHeader } from 'reactstrap';
import {Navbar, Nav, Container} from "react-bootstrap"

var data = null;

const Loading = ()=>{
        return(
                <div>
                        <div class="loader"></div>
                </div>
        );
}

const TopTen = ()=>{
    const scores = data.score;
    scores.sort(function(a, b){return a-b});
    scores.reverse()
    var score = [];
    for(var i=0;i<10 && i<scores.length;i++){
        score.push(scores[i]);
    }
    return score.map((d) => <li key={d}>{d}</li>);
}




class LeaderBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
                fetching: true
        }


        this.getData = this.getData.bind(this);

        this.getData();

    }

    

    

    getData(){
        
        fetch('https://api.npoint.io/f784a82eb1a30eee30e8')
        .then(response => {
            if (response.ok) {
                return response;
            } 
        })  
        .then(response => response.json())
        .then((response)=>{
            if(response){
                data = response;
                console.log("data: ",data);
                this.setState({fetching:false})
            }
        })
    }


    render() {
        
        return (
          <div className="container">
                <div class="card-header play-btn mx-auto">
                    <h1>Top Scores</h1>
                        {this.state.fetching?<Loading/>:<TopTen/>}
                </div>
        </div>
          
        );
    }
}

export default LeaderBoard;