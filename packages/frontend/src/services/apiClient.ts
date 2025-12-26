import {BACKEND_BASE_URL} from "@/constants";
import type { Backend } from 'backend/src'
import {treaty} from "@elysiajs/eden";
import {toast} from "sonner";

export const {api: {v1: backend}} = treaty<Backend>(
    BACKEND_BASE_URL,
    {
        fetch: {credentials: 'include'},
        onResponse: async (response) => {
            if (window.location.pathname === "/") {
                return
            }
            if (response.status >= 400) {
                const text = await response.text()
                toast.error(`${response.statusText}: ${text}`)
            }
        }
    }
)

export type ApiClient = typeof backend