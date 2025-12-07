import {create} from "zustand";
import {IAuthService} from "../services/types";
import {User} from "../types";

export type AuthState = {
    user: User | null,
    setUser: (user: User | null) => void,
    isLoading: boolean,
    fetchUser: (authService: IAuthService) => Promise<void>,
    isAuthenticated: boolean,
    setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: true,
    setUser: (user) => set({user}),
    fetchUser: async (authService) => {
        set({isLoading: true})
        const user = await authService.getCurrentUser()
        set({user})
        set({isLoading: false})
        set({isAuthenticated: user !== null})
    },
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated) => set({isAuthenticated})
}))