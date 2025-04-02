import { createBrowserRouter } from "react-router-dom";
import UserLists from "../pages/user";
import FormUpdateUser from "../pages/components/update.component";
import AuthGuard from "../middleware/auth.guar";
import RoleGuard from '../middleware/role.guard';
import AppLayOut from "../layouts/layout";
import HomePage from "../pages/home";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthGuard />, 
    children: [
      {
        path: '',
        element: <AppLayOut />, 
        children: [
          { 
            path: 'dashboard', 
            element: <HomePage /> 
          },
          { 
            path: 'user',
            element: (
              <RoleGuard allowedRoles={["user"]}>
                <UserLists />
              </RoleGuard>
            )
          },
          { 
            path: 'list/users',
            element: (
              <RoleGuard allowedRoles={["super-admin", "admin"]}>
                <UserLists />
              </RoleGuard>
            )
          },
          { 
            path: 'create',
            element: (
              <RoleGuard allowedRoles={["admin", "user"]}>
                <FormUpdateUser />
              </RoleGuard>
            )
          },
          { path: 'edit/:id', element: <FormUpdateUser /> }
        ]
      }
    ]
  }
]);

export default router;