import {AuthService} from "./services/auth";
import {ServiceProvider, Services} from "./hooks/useServices";
import {Routes} from "./routes";
import {useAuthStore} from "./stores/authStore";
import {StatisticsService} from "./services/stats";
import {useEffect} from "react";
import {Toaster} from "sonner";

const services: Services = {
    authService: new AuthService(),
    statisticsService: new StatisticsService()
}

export default function App() {
    const {fetchUser, isLoading} = useAuthStore()
    const {authService} = services

    useEffect(() => {
        fetchUser(authService).catch()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <ServiceProvider services={services}>
            <Toaster/>
            <Routes/>
        </ServiceProvider>
    )
}
