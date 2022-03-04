import React, {Component } from 'react';
import { Media, Modal, Button, ModalBody, ModalHeader } from 'reactstrap';
import {Link} from 'react-router-dom'
import { useState } from 'react';
import { Prev } from 'react-bootstrap/esm/PageItem';
var wordList = require('../words')
var key = "";
var pos = 0;
var flag = 0;
var isModalOpen = false;
var time=4000



function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
}

const Keys = function(){
        return(
                <div>
                        <section class="keyboard">
                                <button id='q' class="key">q</button>
                                <button id='w' class="key">w</button>
                                <button id='e' class="key">e</button>
                                <button id='r' class="key">r</button>
                                <button id='t' class="key">t</button>
                                <button id='y' class="key">y</button>
                                <button id='u' class="key">u</button>
                                <button id='i' class="key">i</button>
                                <button id='o' class="key">o</button>
                                <button id='p' class="key">p</button>
                                <button id='a' class="key">a</button>
                                <button id='s' class="key">s</button>
                                <button id='d' class="key">d</button>
                                <button id='f' class="key">f</button>
                                <button id='g' class="key">g</button>
                                <button id='h' class="key">h</button>
                                <button id='j' class="key">j</button>
                                <button id='k' class="key">k</button>
                                <button id='l' class="key">l</button>
                                <button id='z' class="key">z</button>
                                <button id='x' class="key">x</button>
                                <button id='c' class="key">c</button>
                                <button id='v' class="key">v</button>
                                <button id='b' class="key">b</button>
                                <button id='n' class="key">n</button>
                                <button id='m' class="key">m</button>
                        </section>
                </div>
        );
}




class Play extends Component {   
    constructor(props) {
        super(props);

        this.state = { 
                inputText: "",
                stackSize: 0,
                score: 0,
                index:0,
                level: 1,
                multiplier: 1.05,
                isGameOver: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleScore = this.handleScore.bind(this);
        this.handleTime = this.handleTime.bind(this);
    }


        componentDidUpdate(){
                if(this.state.stackSize>90) {
                        this.toggleModal();
                        this.setState({stackSize: 0})
                }
        }
    
      handleTime() {
                if(flag==0) {
                        this.setState({stackSize: this.state.stackSize+10})
                        this.setState({multiplier: 1.05});
                }
                pos=0
                this.setState({index:this.state.index+1})
                this.setState({inputText:""})
                flag=0


        
      }

      componentWillUnmount() {
        clearInterval(this.interval);
      }
    
      

    handleInputChange(e) {
        this.setState({ inputText: e.target.value });
    }

    toggleModal() {
        isModalOpen = !isModalOpen;

    }

    handleScore(){
        this.toggleModal();
        fetch('https://api.npoint.io/f784a82eb1a30eee30e8')
        .then(response => {
            if (response.ok) {
                return response;
            } 
        })  
        .then(response => {
            if(response)
            return response.json();
        })
        .then(res=>{
            var level = res.level;
            var scores = res.score;

            scores.push(parseInt(this.state.score));
            res.score = scores;
            if(level<this.state.level) res.level = this.state.level;
            fetch('https://api.npoint.io/f784a82eb1a30eee30e8', {
                method: 'POST',
                body: JSON.stringify(res),
                headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                      },
            })
            .then(response => {
                if (response.ok) {
                    console.log("success");
                    return response;
                } else {
                    console.log("err1");
                    var error = new Error('Error Occurred');
                    error.response = response;
                    throw error;
                }
                },
                error => {
                    console.log("Err",error);
                    throw error;
             })
             .catch((e)=>console.log("Error: ",e))
        })
    }

    handleKeyPress(e){
        if(key!=""){
                var s=document.getElementById(key);
                if(s){
                        s.setAttribute("class","key")
                }    
            }
            key = e.key
            console.log(wordList[this.state.index], wordList[this.state.index].length, wordList[this.state.index][pos],pos, key,this.state.score);
            if(wordList[this.state.index][pos]===key){
                    
                if(pos>=wordList[this.state.index].length-1){
                        if(this.state.score==0)
                        this.setState({score: (this.state.score+1)*this.state.multiplier})
                        else this.setState({score: (this.state.score)*this.state.multiplier})
                        this.setState({multiplier: this.state.multiplier*1.1})
                        if(this.state.score===0){
                                time=4000
                                clearInterval(this.interval)
                                this.interval = setInterval(this.handleTime,time);
                                
                                this.setState({level: 1})
                        }
                        else if(this.state.score>=100 && this.state.score<1000){
                                time=2000
                                if(this.state.level===1){
                                        clearInterval(this.interval)
                                        this.interval = setInterval(this.handleTime,time);
                                }
                                
                                this.setState({level: 2})
                        }
                        else if(this.state.score>=500){
                                time=500
                                if(this.state.level===1){
                                        clearInterval(this.interval)
                                        this.interval = setInterval(this.handleTime,time);
                                }
                                this.setState({level: 3})
                        }
                        flag = 1;
                        pos=0
                }
                else{
                        if(this.state.score===0){
                                time=4000
                                clearInterval(this.interval)
                                this.interval = setInterval(this.handleTime,time);
                                
                                this.setState({level: 1})
                        }
                        else if(this.state.score>=100 && this.state.score<500){
                                time=2000
                                if(this.state.level===1){
                                        clearInterval(this.interval)
                                        this.interval = setInterval(this.handleTime,time);
                                }
                                
                                this.setState({level: 2})
                        }
                        else if(this.state.score>=500){
                                time=500
                                if(this.state.level===1){
                                        clearInterval(this.interval)
                                        this.interval = setInterval(this.handleTime,time);
                                }
                                this.setState({level: 3})
                        }
                        pos+=1;
                }

            }

            if(key!=""){
                var s=document.getElementById(key);
                console.log(s,key);
                if(s){
                        s.setAttribute("class","btn-lg btn-primary")
                }    
            }
    }


    wordList = shuffle(wordList);



    render() {
        return (
          <div className="container">
                <div class="card-header play-btn mx-auto mt-auto">

                        <div className="container">
                                <div class="card-header">
                                <div style={{clear: 'both'}}>
                                        <span className='score-font'>SCORE: {this.state.score.toFixed(1)}</span>  <span className='score-font'>LEVEL: {this.state.level}</span>  <span className='score-font'>Multiplier: {this.state.multiplier.toFixed(2)}X</span>
                                </div>  
                                </div>
                        </div>

                        <meter min="0" low="30" optimum="50" high="100" max="100" value={this.state.stackSize} >Health</meter>

                        <div style={{clear: 'both'}}>
                                <h1 style={{display:'inline-block'}}>{wordList[this.state.index].substring(0,pos)}</h1>
                                <h2 style={{display:'inline-block'}}>{wordList[this.state.index].substring(pos)}</h2>
                        </div>
                        
                        <input
                        type="text"
                        id='inp'
                        value={this.state.inputText}
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleKeyPress} 
                        />

                        <Keys />

                        <div  className='modal-center'>
                        <Modal isOpen={isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>GAME OVER</ModalHeader>
                        <ModalBody className='ml-auto'>
                            <h3>Save Score</h3>
                            <Link to='/home'>
                            <Button color="primary" outline onClick={this.handleScore}>
                                Save
                            </Button>
                            </Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Link to='/home'>
                            <Button color="primary" outline >
                                Don't Save
                            </Button>
                            </Link>
                            
                            
                        </ModalBody>
                        </Modal>
                        </div>
                        


                        


                </div>
        </div>
          
        );
    }
}

export default Play;