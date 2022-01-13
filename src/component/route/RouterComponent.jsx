import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import UserListComponent from "../user/UserListComponent";
import AddUserComponent from "../user/AddUserComponent";
import EditUserComponent from "../user/EditUserComponent";

const AppRouter = () => {
   return(
     <div>
       <BrowserRouter>
        <div style={style}>
          <Routes>
            <Route path="/" element={<UserListComponent/>}></Route>
            <Route path="/users" element={<UserListComponent/>}></Route>
            <Route path="/add-user" element={<AddUserComponent/>}></Route>
            <Route path="/edit-user" element={<EditUserComponent/>}></Route>
          </Routes>
        </div>
       </BrowserRouter>
     </div>
   );
}

const style = {
  color: 'red',
  margin: '10px'
}

export default AppRouter;