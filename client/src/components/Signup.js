import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as signupActions from '../modules/Signup'


class Signup extends Component {

    // 1. 값의 변화 상태 감지 핸들

    handleChange = (e) =>{
        const {signupActions} = this.props;
        const {user_id,user_password,user_name, result} = this.props;
        console.log("SignupHandle");
        console.log(user_id);
        console.log(user_password);
        console.log(user_name);
        console.log(result);
        signupActions.showSignup({
            'user_id':e.target.name,
            'user_password':e.target.value,
            'user_name' : e.target.user_name,
            'result': ''

    })
        // signupActions.showSignup({'property':e.target.name,'value':e.target.value});
    }

    // 2. 회원가입 제출 핸들
    handleSubmit = (e) =>{
        e.preventDefault();
        const {signupActions} = this.props;
        const {user_id,user_password,user_name, result} = this.props;
        const user = {
            user_id : user_id,
            user_password: user_password,
            user_name : user_name,
            result : "200 OK"
        }
        console.log("user=>" + user);
        signupActions.setSignup(user);
    }
    render() {
        const {handleSubmit, handleChange} = this; 
        const {signupActions} = this.props;
        const {user_id, user_password, user_name, result} = this.props;
        return (
            <div>
            <form onSubmit={handleSubmit} >
            <p>회원가입</p>

            <div className="form-group">
              <label htmlFor="user_id">ID</label>
              <input type="text" id="user_id" className="form-control" name="user_id" placeholder="Enter ID" onChange={handleChange} defaultValue={user_id} />
            </div>
            <div className="form-group">
              <label htmlFor="user_password">Password</label>
              <input type="password" className="form-control" name="user_password" placeholder="Enter Password" onChange={handleChange} defaultValue={user_password}/>
            </div>
            <div className="form-group">
              <label htmlFor="user_name">Name</label>
              <input type="text" className="form-control" name="user_name" placeholder="Enter your name" onChange={handleChange} defaultValue={user_name}/>
            </div>
            
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        
            </div>
        );
    }
}
export default connect(
    // 리덕스랑 연결이 되면 그 값들을 
    // user_id , user_password, user_name , result 값으로 세팅을 한다
    (state) => ({
        user_id : state.Signup.get('user_id'),
        user_password : state.Signup.get('user_password'),
        user_name : state.Signup.get('user_name'),
        result : state.Signup.get('result')
    }),
    (dispatch) =>({
        signupActions: bindActionCreators(signupActions,dispatch)
    })
)(Signup);