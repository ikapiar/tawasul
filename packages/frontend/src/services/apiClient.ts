import {BACKEND_BASE_URL} from "../constants";
import type { Backend } from '../../../backend/src'
import {treaty} from "@elysiajs/eden";

export const {api: {v1: backend}} = treaty<Backend>(BACKEND_BASE_URL, {fetch: {credentials: 'include'}})

export type ApiClient = typeof backend