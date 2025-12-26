import {Route, Switch} from 'wouter'
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/Landing";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/Login";
import {AuthorizedRoute} from "./routes/authorized";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/Home";
import DashboardStats from "./pages/dashboard/Stats";
import { NotFound } from './routes/not_found';

export const Routes = () => (
    <div className="min-h-screen">
        <Switch>
            <Route path="/">
                <MainLayout>
                    <LandingPage />
                </MainLayout>
            </Route>
            <Route path="/login">
                <AuthLayout>
                    <LoginPage />
                </AuthLayout>
            </Route>
            <AuthorizedRoute path="/dashboard">
                <DashboardLayout>
                    <DashboardHome />
                </DashboardLayout>
            </AuthorizedRoute>
            <AuthorizedRoute path="/dashboard/stats">
                <DashboardLayout>
                    <DashboardStats />
                </DashboardLayout>
            </AuthorizedRoute>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    </div>
)