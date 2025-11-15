import {
	GOOGLE_OAUTH_CLIENT_ID,
	GOOGLE_OAUTH_CLIENT_SECRET,
	GOOGLE_OAUTH_REDIRECT_URL,
	OAUTH_CSRF_PARAM_NAME
} from "../config";
import {Elysia} from "elysia";
import {generateCSRFToken} from "../plugins/security";

export class GoogleClient {

	constructor(
		private readonly googleOauthClientId: string,
		private readonly googleOauthClientSecret: string,
		private readonly googleOauthRedirectURL: string,
	) {}

	private readonly googleOauthLoginPageURL = 'https://accounts.google.com/o/oauth2/auth'
	private readonly googleOauthTokenExchangeURL = 'https://oauth2.googleapis.com/token';
	private readonly googleAPIUserInfoURL = 'https://www.googleapis.com/userinfo/v2/me'
	private readonly googleOauthScopes = [
		'https://www.googleapis.com/auth/userinfo.email'
	]
	private googleAPIRunScriptURL = (scriptId: string) => `https://script.googleapis.com/v1/scripts/${scriptId}:run`
	private static PLUGIN_NAME = 'googleClient' as const

	public static googleClientPlugin = () => {
		return new Elysia()
			.decorate(this.PLUGIN_NAME, new GoogleClient(
				GOOGLE_OAUTH_CLIENT_ID,
				GOOGLE_OAUTH_CLIENT_SECRET,
				GOOGLE_OAUTH_REDIRECT_URL,
			))
	}

	public generateGoogleLoginURL = (): string => {
		const csrfValue = generateCSRFToken()
		const csrfState = `${OAUTH_CSRF_PARAM_NAME}=${csrfValue}`
		// 2025-11-03
		// https://developers.google.com/identity/protocols/oauth2/web-server#httprest_1
		const googleURL = new URL(this.googleOauthLoginPageURL);
		googleURL.searchParams.set('client_id', this.googleOauthClientId)
		googleURL.searchParams.set('redirect_uri', this.googleOauthRedirectURL)
		googleURL.searchParams.set('scope', this.googleOauthScopes.join(' '))
		googleURL.searchParams.set('response_type', 'code')
		googleURL.searchParams.set('access_type', 'online')
		googleURL.searchParams.set('state', csrfState)
		return googleURL.toString()
	}

	// combines getPersonalAccessToken and getUserInfo to get user email
	public getUserEmail = async (oauthConsentCode: string): Promise<string> => {
		const accessToken = await this.getPersonalAccessToken(oauthConsentCode)
		const userInfo = await this.getUserInfo(accessToken)
		return userInfo.email
	}

	// authorize to get access token, docs:
	// https://developers.google.com/identity/protocols/oauth2/web-server#exchange-authorization-code
	public getPersonalAccessToken = async (oauthConsentCode: string): Promise<string> => {
		const authorizeGoogleTokenURL = new URL(this.googleOauthTokenExchangeURL)
		authorizeGoogleTokenURL.searchParams.set('client_id', this.googleOauthClientId)
		authorizeGoogleTokenURL.searchParams.set('client_secret', this.googleOauthClientSecret)
		authorizeGoogleTokenURL.searchParams.set('code', oauthConsentCode)
		authorizeGoogleTokenURL.searchParams.set('grant_type', 'authorization_code')
		authorizeGoogleTokenURL.searchParams.set('redirect_uri', this.googleOauthRedirectURL)
		const googleAPITokenResponse = await fetch(authorizeGoogleTokenURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		const {access_token}: GoogleAuthTokenResponse = await googleAPITokenResponse.json()
		return access_token
	}

	// get user's info
	public getUserInfo = async (accessToken: string): Promise<GoogleUserInfoResponse> => {
		const getUserInfoHeader = {
			Authorization: `Bearer ${accessToken}`
		}
		const getUserInfoResponse = await fetch(this.googleAPIUserInfoURL, {headers: getUserInfoHeader})
		return (await getUserInfoResponse.json()) as GoogleUserInfoResponse
	}

	public runUserScript = async (accessToken: string , scriptId: string): Promise<void> => {
		fetch(this.googleAPIRunScriptURL(scriptId), {headers: { Authorization: `Bearer ${accessToken}` }}).then(() => {
			console.log(`Triggered google script ${scriptId}`)
		})
	}
}

// https://developers.google.com/identity/protocols/oauth2/web-server#exchange-authorization-code
export type GoogleAuthTokenResponse = {
	access_token: string
}

export type GoogleUserInfoResponse = {
	email: string
	id: string
	verified_email: boolean
	picture: string
}
