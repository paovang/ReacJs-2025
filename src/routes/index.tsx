import { createBrowserRouter } from "react-router-dom";
import UserLists from "../pages/user";
import FormUpdateUser from "../pages/components/update.component";
import AuthGuard from "../middleware/auth.guar";
import RoleGuard from '../middleware/role.guard';

const router = createBrowserRouter([
  {
    path: '/home',
    element: <UserLists/>,
    // children: [
    //   {
    //     path: '',
    //     element: ''
    //   }
    // ]
  },
  {
    path: '/user',
    element: (
      <RoleGuard allowedRoles={["user"]}>
        <UserLists/>
      </RoleGuard>
    )
  },
  {
    path: '',
    element: <AuthGuard/>,
    children: [
      {
        path: '/',
        element: (
          <RoleGuard allowedRoles={["super-admin", "admin"]}>
            <UserLists/>
          </RoleGuard>
        )
      },
      {
        path: '/create',
        element: (
          <RoleGuard allowedRoles={["admin", "user"]}>
            <FormUpdateUser/>
          </RoleGuard>
        )
      },
      {
        path: '/edit/:id',
        element: <FormUpdateUser/>
      }
    ]
  }
])
export default router;
