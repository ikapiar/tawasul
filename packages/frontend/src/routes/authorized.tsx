import {Redirect, Route} from "wouter";
import {ReactNode} from "react";
import {useAuthStore} from "../stores/authStore";
import {User} from "../types";

export function AuthorizedRoute({children, path, roles = []}: {children: ReactNode, path: string, roles?: string[]}) {
    const {user, isAuthenticated} = useAuthStore()

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

function userHasRole(user: User | null, requiredRoles: string[]): boolean {
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