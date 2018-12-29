import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import {updateCustomer} from './../../ducks/customers';
import {Link} from 'react-router-dom';
import './Private.css'



class Private extends Component {
    async componentDidMount(){
        let res= await axios.get('/api/user-data')
        this.props.updateCustomer(res.data)
        
    }

    balance(){
        return Math.floor((Math.random()+ 100)*2000)
    }


    render() {
        console.log(this.props)
        let {customer}= this.props;
        return (
            <div>
            
            <h1>Account Info</h1>
            <hr></hr>
            <hr></hr>
            <hr></hr>
            {
                customer.id? (
                    <div>
                        
                        <p>Account Number: 1236548215</p>
                        <p> Account Email: {customer.email}</p>
                        <p>Balance: {`$${this.balance()}.00`}</p>

                        <a href='http://localhost:3000/logout'>
                            <button >Logout</button>
                            </a>
                        </div>
                ) : (
                    <div>
                        <p>Please login</p>
                       <Link to='/' ><button>Go Login</button></Link>
                     </div>
                )
            }
            </div>
        )
    }
}


const mapState=(state)=>state
export default connect(mapState, {updateCustomer})(Private);