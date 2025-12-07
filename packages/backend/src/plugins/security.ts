import {importPKCS8, importSPKI, JWTPayload, jwtVerify, SignJWT} from 'jose'
import {
	JWT_ALGORITHM,
	JWT_MAX_AGE_SECONDS,
	JWT_PRIVATE_KEY,
	JWT_PUBLIC_KEY,
	OAUTH_CSRF_PARAM_VALUE,
	SYMMETRIC_ENCRYPTION_KEY_ALGORITHM,
	SYMMETRIC_ENCRYPTION_KEY_IV,
	SYMMETRIC_ENCRYPTION_KEY_SECRET
} from "../config";
import {createCipheriv, createDecipheriv} from 'node:crypto';
import {Elysia} from "elysia";
import {USER_JWT_COOKIE_NAME} from "../constants";

export const createSecurityPlugin = async () => {
    // 1. Await all your async dependencies first
    const signer = await generateSigner();
    const verifier = await generateVerifier();

    // security plugin
    return new Elysia({ name: "security" })
        .decorate("signJWT", signer)
        .decorate("setJWTCookie", setJWTCookie)
        .decorate("verifyJWT", verifier)
        .decorate("decodeJWT", decodePayload);
};

export async function generateSigner() {
	const privateKey = await importPKCS8(JWT_PRIVATE_KEY.trim(), JWT_ALGORITHM);
	const encodeBase64 = (str: string) => Buffer.from(str).toString('base64');
    const signer = new SignJWT({alg: JWT_ALGORITHM});
	return async (payload: UserData) => signer
        .setExpirationTime(Math.floor(Date.now()/1000) + JWT_MAX_AGE_SECONDS)
        .setSubject(encodeBase64(JSON.stringify(payload)))
        .setProtectedHeader({alg: JWT_ALGORITHM})
        .sign(privateKey);
}

export async function generateVerifier() {
	const publicCryptoKey = await importSPKI(JWT_PUBLIC_KEY.trim(), JWT_ALGORITHM);
	return async (jwt: string) => jwtVerify(jwt, publicCryptoKey)
}

export function decodePayload(jwt: JWTPayload) {
	const subject = jwt.sub
	if (!isFilledString(subject)) {
		throw new JWTSubjectEmpty(`JWT subject/sub is empty!`)
	}
	const decodedSubject = Buffer.from(subject, 'base64').toString()
	try {
		return JSON.parse(decodedSubject) as UserData
	} catch (e) {
		if (e instanceof SyntaxError) {
			throw new JWTSubjectInvalid(`JWT subject/sub is invalid! Expected json of UserData, found ${decodedSubject}. JSON.parse error: ${e.message}`)
		} else {
			throw e
		}
	}
}

export function generateCSRFToken() {
	return encrypt(OAUTH_CSRF_PARAM_VALUE)
}

export function isCSRFTokenValid(token: string): boolean {
	try {
		const decrypted = decrypt(token)
		return decrypted === OAUTH_CSRF_PARAM_VALUE
	} catch (e) {
		if ((e as Error).message.includes('BAD_DECRYPT')) {
			console.warn("Security Alert!!! CSRF failed. Someone is pretending to be oauth provider and attempted to log in")
		}
		return false
	}
}

export function encrypt(text: string): string {
	const cipher = createCipheriv(SYMMETRIC_ENCRYPTION_KEY_ALGORITHM, SYMMETRIC_ENCRYPTION_KEY_SECRET, SYMMETRIC_ENCRYPTION_KEY_IV);
	let encrypted = cipher.update(text, 'utf8', 'hex');
	encrypted += cipher.final('hex');
	return encrypted;
}

export function decrypt(encryptedText: string): string {
	const decipher = createDecipheriv(SYMMETRIC_ENCRYPTION_KEY_ALGORITHM, SYMMETRIC_ENCRYPTION_KEY_SECRET, SYMMETRIC_ENCRYPTION_KEY_IV);
	let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
}

export function setJWTCookie(cookie: Record<string, { value: string }>, jwt: string) {
    cookie[USER_JWT_COOKIE_NAME].value = jwt
}

function isFilledString(str: string | null | undefined): str is string {
	if (str === undefined || str === null) return false
	return String(str).trim().length > 0;
}

export type UserData = {
	email: string
}

export class JWTSubjectEmpty extends Error {
	constructor(message: string) {
		super(message);
	}
}

export class JWTSubjectInvalid extends Error {
	constructor(message: string) {
		super(message);
	}
}
