import { drizzle } from 'drizzle-orm/node-postgres';
import {POSTGRESQL_URI} from "../config";
import * as schema from "./schemas"

export const db = drizzle(POSTGRESQL_URI, {schema})