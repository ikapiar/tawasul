import { createContext, useContext, ReactNode } from 'react'
import {IAuthService, IStatisticsService} from '../services/types'

export type Services = {
    authService: IAuthService,
    statisticsService: IStatisticsService,
}

const ServicesContext = createContext<Services | undefined>(undefined)

export function ServiceProvider({ children, services }: { children: ReactNode, services: Services }) {
    return (
        <ServicesContext.Provider value={services}>
            {children}
        </ServicesContext.Provider>
    )
}

export function useServices(): Services {
    const context = useContext(ServicesContext)
    if (!context) {
        throw new Error('useServices must be used within ServiceProvider')
    }
    return context
}