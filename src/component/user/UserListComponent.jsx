import React, { Component } from 'react';
import ApiService from "../../ApiService";
import { useNavigate } from 'react-router-dom';


import {Table, TableBody, TableCell, TableHead, TableRow, Button, Typography} from '@material-ui/core'
// import {CreateIcon, DeleteIcon} from '@material-ui/icons'
// import DeleteIcon from '@mui/icons-material/Delete';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

function withHook (Component) {
  return function WrappedComponent (props){
    let navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }
}

class UserListComponent extends Component{
  

  constructor(props){
    super(props);

    this.state = {
      users: [],
      message: null
      
    }
  }

  componentDidMount(){
    this.reloadUserList();
    
  }

  reloadUserList = () => {
    ApiService.fetchUsers()
      .then( res => {
        this.setState({
          users: res.data
        })
      })
      .catch(err => {
        console.log('reloadUserList() Error!', err);
      })
  }

  deleteUser = (userID) => {
    ApiService.deleteUser(userID)
      .then( res => {
        this.setState({
          message: 'User Deleted Successfully.'
        });
        this.setState({
          users: this.state.users.filter( user =>
            user.id !== userID)
          });
        })
      .catch(err => {
        console.log('deleteUser() Error!', err);
      })
  }
  
  editUser = (ID) => {
    // let navigate = useNavigate();
    let navigate = this.props.navigate;
    window.localStorage.setItem("userID", ID);
    // this.props.history.push('/edit-user');
    // useNavigate('/edit-user');
    navigate('/edit-user')
  }

  addUser = () => {
    // let navigate = useNavigate();
    let navigate = this.props.navigate;
    window.localStorage.removeItem("userID");
    // this.props.history.push('/add-user');
    // useNavigate('/add-user');
    navigate('/add-user')
  }

  render(){

    console.log(this.state.users)
    return(
      <div>
        <Typography variant="h4" style={style}>User List</Typography>
        <Button variant="contained" color="primary" onClick={this.addUser}> Add User </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>FistName</TableCell>
              <TableCell align="right">LastName</TableCell>
              <TableCell align="right">UserName</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Salary</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.users.map( user => 
              <TableRow key={user.id}>
                <TableCell component="th" scope="user">{user.id}</TableCell>
                <TableCell align="right">{user.firstName}</TableCell>
                <TableCell align="right">{user.lastName}</TableCell>
                <TableCell align="right">{user.username}</TableCell>
                <TableCell align="right">{user.age}</TableCell>
                <TableCell align="right">{user.salary}</TableCell>
                <TableCell align="right" onClick={()=> this.editUser(user.id)}>
                  <CreateIcon />
                </TableCell>
                <TableCell align="right" onClick={()=> this.deleteUser(user.id)}>
                  <DeleteIcon />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
    
  }

}

const style = {
  display: 'flex',
  justifyContent: 'center'
}
export default withHook(UserListComponent);
