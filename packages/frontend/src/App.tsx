import {AuthService} from "./services/auth";
import {ServiceProvider, Services} from "./hooks/useServices";
import {Routes} from "./routes";
import {useAuthStore} from "./stores/authStore";
import {useLocation} from "wouter";
import {StatisticsService} from "./services/stats";
import {useEffect} from "react";
import {useDebounce} from "./hooks/useDebounce";

const services: Services = {
    authService: new AuthService(),
    statisticsService: new StatisticsService()
}

export default function App() {
    const {fetchUser, isLoading, isAuthenticated} = useAuthStore()
    const {authService} = services
    const [location, navigate] = useLocation()
    const debouncedNavigate = useDebounce((to: string) => navigate(to, {replace: true}), 150)

    useEffect(() => {
        fetchUser(authService).catch()
    }, [])

    useEffect(() => {
        if (isLoading) return
        const target = isAuthenticated ? '/dashboard' : '/'
        if (location === target) return;
        debouncedNavigate(target)
    }, [isLoading, isAuthenticated, location, navigate]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <ServiceProvider services={services}>
            <Routes/>
        </ServiceProvider>
    )
}
