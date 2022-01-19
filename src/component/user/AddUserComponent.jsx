import React, { Component } from 'react';
import ApiService from "../../ApiService";
import { useNavigate } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function withHook (Component) {
  return function WrappedComponent (props){
    let navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }
}

class AddUserComponent extends Component{

  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      age: '',
      salary: '',
      message: null
    }

  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  back = () => {
    let navigate = this.props.navigate;
    navigate('/users')
  }
  
  saveUser = (e) => {
    e.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      salary: this.state.salary,
    }

    ApiService.addUser(user)
    .then( res => {
      let navigate = this.props.navigate;
        this.setState({
          message: user.username + '님이 성공적으로 등록되었습니다.'
        })
        console.log(this.state.message);
        // this.props.history.push('/users');
        navigate('/users')
    })
    .catch( err => {
      console.log('saveUser() 에러:', err);
    });

  }

  render(){
    return(
      <div>
        <Typography variant="h4" style={style}>Add User</Typography>
        <form style={formContainer}>
         
            <TextField type="text" placeholder="please input your username" name="username" 
fullWidth margin="normal" value={this.state.username} onChange={this.onChange} />

            <TextField type="password" placeholder="please input your password" name="password" 
fullWidth margin="normal" value={this.state.password} onChange={this.onChange} />

            <TextField placeholder="please input your first name" name="firstName" 
fullWidth margin="normal" value={this.state.firstName} onChange={this.onChange} />

            <TextField placeholder="please input your last name" name="lastName" 
fullWidth margin="normal" value={this.state.lastName} onChange={this.onChange} />

            <TextField type="number" placeholder="please input your age" name="age" 
fullWidth margin="normal" value={this.state.age} onChange={this.onChange} />

            <TextField type="number" placeholder="please input your salary" name="salary" 
fullWidth margin="normal" value={this.state.salary} onChange={this.onChange} />

          <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>
          
          <Button variant="contained" color="primary" style={backButton} onClick={this.back}>홈으로</Button>

        </form>
      </div>
    );
  }
}

const formContainer = {
  display: 'flex',
  flexFlow: 'row wrap'
}

const style = {
  display: 'flex',
  justifyContent: 'center'
}
const backButton = {
  marginLeft: '10px' // 여긴 margin-left가 아니라 marginLeft넹 ㅎㅎ;
}

export default withHook(AddUserComponent);