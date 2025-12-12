import {AuthService} from "./services/auth";
import {ServiceProvider, Services} from "./hooks/useServices";
import {Routes} from "./routes";
import {StatisticsService} from "./services/stats";
import {Toaster} from "sonner";

const services: Services = {
    authService: new AuthService(),
    statisticsService: new StatisticsService()
}

export default function App() {
    return (
        <ServiceProvider services={services}>
            <Toaster/>
            <Routes/>
        </ServiceProvider>
    )
}
