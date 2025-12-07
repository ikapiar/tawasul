import {Route, Link, Switch} from 'wouter'
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/Landing";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/Login";
import {AuthorizedRoute} from "./routes/authorized";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/Home";
import DashboardStats from "./pages/dashboard/Stats";

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
            <Route path="/:rest*">
                <div className="flex min-h-screen items-center justify-center text-center p-8">
                    <div>
                        <h1 className="text-2xl font-semibold">Page not found</h1>
                        <p className="text-muted-foreground mt-2">The page you are looking for does not exist.</p>
                        <Link href="/" className="text-primary underline inline-block mt-4">Go to home</Link>
                    </div>
                </div>
            </Route>
        </Switch>
    </div>
)