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

const Statistics = ()=>{
    const scores = data.score;
    var level = data.level;
    scores.sort(function(a, b){return a-b});
    scores.reverse()
    var max = scores[0];
    var sum=0;

    for(var i=0;i<scores.length;i++){
        sum+=scores[i]
    }
    var avg = sum/scores.length;

    return(
        <ul>
        <li key={1}>Best Score: {max}</li>
        <li key={2}>Average Score: {avg.toFixed(1)}</li>
        <li key={3}>Best Level: {level}</li>
        </ul>
    );      

}




class Stats extends Component {
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
        this.getData();
        return (
          <div className="container">
                <div class="card-header play-btn mx-auto">
                    <h1>Statistics</h1>
                        {this.state.fetching?<Loading/>:<Statistics/>}
                </div>
        </div>
          
        );
    }
}

export default Stats;