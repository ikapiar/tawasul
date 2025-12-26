import {Redirect, Route} from "wouter";
import {ReactNode, useEffect} from "react";
import {useAuthStore} from "@/stores/authStore";
import {useServices} from "@/hooks/useServices";
import {AuthorizedUser} from "backend/src/services/UserService";

export function AuthorizedRoute({children, path, roles = []}: {children: ReactNode, path: string, roles?: string[]}) {
    const {authService} = useServices()
    const {user, isAuthenticated, isLoading, fetchUser} = useAuthStore()

    useEffect(() => {
        // If we haven’t checked auth yet, do it now
        if (isLoading) {
            fetchUser(authService).catch(() => {})
        }
    }, [isLoading, fetchUser, authService])

    // While verifying, you can render a small placeholder
    if (isLoading) {
        return (
            <Route path={path}>
                <div className="p-8 text-center">Checking your session…</div>
            </Route>
        )
    }

    const hasRole = userHasRole(user, roles)

    return (
        <Route path={path}>
            {isAuthenticated && hasRole ? (
                children
            ) : (
                <Redirect to="/login" />
            )}
        </Route>
    );
}

function userHasRole(user: AuthorizedUser | null, requiredRoles: string[]): boolean {
    if (!user) {
        return false
    }
    if (!requiredRoles) {
        return true
    }
    if (requiredRoles.length === 0) {
        return true
    }
    const {roles} = user;
    for (const requiredRole of requiredRoles) {
        for (const role of roles) {
            if (requiredRole === role) {
                return true
            }
        }
    }
    return false
}