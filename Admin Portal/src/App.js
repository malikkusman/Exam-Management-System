import './App.css';
import {Switch,Route} from 'react-router-dom';
import Home from './Components/Admin/home';
import Login from './Components/login';
import Mangaeusers from './Components/Admin/mangausers';
import Addusers from './Components/Admin/addusers';
import UpdateUsers from './Components/Admin/updateusers';
import Addrooms from './Components/Admin/addroom';
import Roomdetails from './Components/Admin/roomdetails';
import Bookingdetails from './Components/Admin/bookingdetails';
import Updaterooms from './Components/Admin/updateroom';
import RoomHistory from './Components/Admin/roomhistory';
import ChangePassword from './Components/Admin/changepassword';
import PrivateRoute from './Components/Admin/private';
import Adddesks from './Components/Admin/adddesk';
import Deskdetails from './Components/Admin/deskdetails';
import UpdateDesk from './Components/Admin/updatedesk';
import Mangaeadmins from './Components/Admin/manageadmins';
import AddAdmin from './Components/Admin/addadmin';
import RoomDetailsUser from './Components/Users/roomdetails';
import Bookroom from './Components/Users/bookroom';
import PrivateUser from './Components/Users/private';
import Deskdetailsuser from './Components/Users/deskdetails';
import Bookdesk from './Components/Users/bookDesk';
import UserPassword from './Components/Users/changecredentials';
import DeskHistory from './Components/Admin/deskHistory';
import Updateadmin from './Components/Admin/updateadmin';
import PrivateAdmin from './Components/Admin/privateadmin';
import Error from './Components/404';
import ManageTeachers from './Components/Admin/manageteachers';
import ManageCourses from './Components/Admin/managecourses';
import ManageScheduling from './Components/Admin/managescheduling';
import TeacherHome from './Components/Users/home';
import Attendance from './Components/Users/attendance';
import CreateAssignment from './Components/Users/createassignment';
import AssignMarks from './Components/Users/assignmarks';
import GenerateReports from './Components/Users/generatereports';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Login}/>
        <PrivateRoute
          path="/home"
          component={Home}
        />
        <PrivateRoute path="/manage-users" component={Mangaeusers}/>
        <PrivateRoute path="/add-users" component={Addusers}/>
        <PrivateRoute path="/update-users" component={UpdateUsers}/>
        <PrivateRoute path="/manage-teachers" component={ManageTeachers}/>
        <PrivateRoute path="/add-desks" component={Adddesks}/>
        <PrivateRoute path="/add-rooms" component={Addrooms}/>
        <PrivateRoute path="/room-details" component={Roomdetails}/>
        <PrivateRoute path="/manage-scheduling" component={ManageScheduling}/>
        <PrivateRoute path="/booking-details" component={Bookingdetails}/>
        <PrivateRoute path="/update-room" component={Updaterooms}/>
        <PrivateRoute path="/room-history" component={RoomHistory}/>
        <PrivateRoute path="/manage-courses" component={ManageCourses}/>
        <PrivateRoute path="/change-credentials" component={ChangePassword}/>
        <PrivateRoute path="/desk-details" component={Deskdetails}/>
        <PrivateRoute path="/update-desk" component={UpdateDesk}/>
        <PrivateRoute path="/desk-history" component={DeskHistory}/>
        <PrivateAdmin path="/manage-admins" component={Mangaeadmins}/>
        <PrivateAdmin path="/add-admin" component={AddAdmin}/>
        <PrivateAdmin path="/update-admin" component={Updateadmin}/>
        <PrivateUser path="/teacher-home" component={TeacherHome}/>
        <PrivateUser path="/attendance" component={Attendance}/>
        <PrivateUser path="/room-details-user" component={RoomDetailsUser}/>
        <PrivateUser path="/create-assignment" component={CreateAssignment}/>
        <PrivateUser path="/desk-details-user" component={Deskdetailsuser}/>
        <PrivateUser path="/book-room" component={Bookroom}/>
        <PrivateUser path="/book-desk" component={Bookdesk}/>
        <PrivateUser path="/assign-marks" component={AssignMarks}/>
        <PrivateUser path="/generate-reports" component={GenerateReports}/>
        <PrivateUser path="/user-credentials" component={UserPassword}/>
        <Route exact path="/404" component={Error}/>
      </Switch>
    </div>
  );
}

export default App;
