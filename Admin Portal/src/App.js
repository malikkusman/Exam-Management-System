import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Admin/home';
import Login from './Components/login';
import Mangaeusers from './Components/Admin/mangausers';
import Addusers from './Components/Admin/addusers';
import UpdateUsers from './Components/Admin/updateusers';
import ChangePassword from './Components/Admin/changepassword';
import PrivateRoute from './Components/Admin/private';
import Mangaeadmins from './Components/Admin/manageadmins';
import AddAdmin from './Components/Admin/addadmin';
import PrivateUser from './Components/Users/private';
import UserPassword from './Components/Users/changecredentials';
import Updateadmin from './Components/Admin/updateadmin';
import PrivateAdmin from './Components/Admin/privateadmin';
import Error from './Components/404';
import ManageTeachers from './Components/Admin/manageteachers';
import ManageCourses from './Components/Admin/managecourses';
import ManageScheduling from './Components/Admin/managescheduling';
import TeacherHome from './Components/Users/home';
import CreateAssignment from './Components/Users/createassignment';
import AssignMarks from './Components/Users/assignmarks';
import GenerateReports from './Components/Users/generatereports';
import Adddcourse from './Components/Admin/addcourse';
import Addinstructor from './Components/Admin/addinstructor';
import Addschedule from './Components/Admin/addschedule';
import Addassignment from './Components/Users/addassignment';
import Addassignmentmarks from './Components/Users/addassignmentmarks';
import AddAttendance from './Components/Users/addattendance';
import Attendance from './Components/Users/attendance';
import { useEffect, useState } from 'react';

function App() {
  const [isLoggedIn, setaIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  )
  const [uisLoggedIn, setuIsLoggedIn] = useState(
    localStorage.getItem('uisLoggedIn') === 'true'
  )
  return (
    <div className="app">
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Login {...props} setaIsLoggedIn={setaIsLoggedIn} setuIsLoggedIn={setuIsLoggedIn} />
          )}
        />
        <PrivateRoute
          path="/home"
          component={Home}
          isLoggedIn={isLoggedIn}
        />
        <PrivateRoute path="/manage-users" component={Mangaeusers} isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/add-users" component={Addusers} isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/add-schedule" component={Addschedule} isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/update-users" component={UpdateUsers} isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/manage-teachers" component={ManageTeachers} isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/add-course" component={Adddcourse} isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/add-instructor" component={Addinstructor} isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/manage-scheduling" component={ManageScheduling} isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/manage-courses" component={ManageCourses} isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/change-credentials" component={ChangePassword} isLoggedIn={isLoggedIn} />
        <PrivateAdmin path="/manage-admins" component={Mangaeadmins} />
        <PrivateAdmin path="/add-admin" component={AddAdmin} />
        <PrivateAdmin path="/update-admin" component={Updateadmin} />
        <PrivateUser path="/teacher-home" component={TeacherHome} uisLoggedIn={uisLoggedIn} />
        <PrivateUser path="/add-attendance" component={AddAttendance} uisLoggedIn={uisLoggedIn} />
        <PrivateUser path="/attendance" component={Attendance} uisLoggedIn={uisLoggedIn} />
        <PrivateUser path="/create-assignment" component={CreateAssignment} uisLoggedIn={uisLoggedIn} />
        <PrivateUser path="/add-assignment" component={Addassignment} uisLoggedIn={uisLoggedIn} />
        <PrivateUser path="/add-assignment-marks" component={Addassignmentmarks} uisLoggedIn={uisLoggedIn} />
        <PrivateUser path="/assign-marks" component={AssignMarks} uisLoggedIn={uisLoggedIn} />
        <PrivateUser path="/generate-reports" component={GenerateReports} uisLoggedIn={uisLoggedIn} />
        <PrivateUser path="/user-credentials" component={UserPassword} uisLoggedIn={uisLoggedIn} />
        <Route path="/*" component={Error} />
      </Switch>
    </div>
  );
}

export default App;
