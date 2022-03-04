import React, { Component } from 'react';
import { Media, Modal, Button, ModalBody, ModalHeader } from 'reactstrap';
import {Navbar, Nav, Container} from "react-bootstrap"


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }


    render() {

        return (
          <div className="container">
                <div class="card-header play-btn mx-auto">
                        <h1 class="play-font">Let's Play</h1>
                            
                        <a href='/play' class="play-link fas fa-play"></a>

                        <Button color="primary" outline onClick={this.toggleModal}>
                            Read Instructions
                        </Button>

                        <div className='modal-center'>
                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Instructions</ModalHeader>
                        <ModalBody>
                            <p>New words will be displayed one by one.</p><br></br>
                        
                            <p>You have to type the words as fast as you can.</p><br></br>
                        
                            <p>For every missed word, your health meter will become more reddish.</p><br></br>
                        
                            <p>Once the meter is fully red, Game is Over!</p><br></br>

                            <p>For every correct typing, multipler increases by 1.1 times and for missed one it is reset to default value.</p><br></br>

                            <p>As score increases, level increases.</p><br></br>

                            <p>NOTE: Make sure Internet connection is on.</p>
                        </ModalBody>
                        </Modal>
                        </div>

                        

                    

                       
                </div>
        </div>
          
        );
    }
}

export default Home;