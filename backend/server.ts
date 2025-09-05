import {Elysia} from 'elysia'
import {staticPlugin} from '@elysiajs/static'
import {join} from 'path'

// Simple HMAC signing using Bun's crypto
function b64url(input: ArrayBuffer | string) {
  const bytes = typeof input === 'string' ? new TextEncoder().encode(input) : new Uint8Array(input)
  let str = Buffer.from(bytes).toString('base64')
  return str.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

async function hmac(data: string, secret: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return b64url(sig)
}

async function signSession(payload: Record<string, any>, secret: string) {
  const body = b64url(JSON.stringify(payload))
  const sig = await hmac(body, secret)
  return `${body}.${sig}`
}

async function verifySession(token: string, secret: string) {
  const idx = token.lastIndexOf('.')
  if (idx <= 0) return null
  const body = token.slice(0, idx)
  const sig = token.slice(idx + 1)
  const expect = await hmac(body, secret)
  if (sig !== expect) return null
  const json = Buffer.from(body.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8')
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

function parseCookies(header?: string | null) {
  const out: Record<string, string> = {}
  if (!header) return out
  header.split(';').forEach((part) => {
    const idx = part.indexOf('=')
    if (idx > -1) {
      const k = part.slice(0, idx).trim()
        out[k] = decodeURIComponent(part.slice(idx + 1).trim())
    }
  })
  return out
}

const PORT = Number(process.env.PORT || 3000)
const ROOT = join(process.cwd(), 'static')
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-secret-change-me'
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ''
const OAUTH_REDIRECT_URL = process.env.OAUTH_REDIRECT_URL || `http://localhost:${PORT}/api/auth/callback`

const app = new Elysia()
  .use(staticPlugin({ assets: ROOT, prefix: '/' }))
  // OAuth: start
  .get('/api/auth/google', ({ set }) => {
    if (!GOOGLE_CLIENT_ID) {
      set.status = 500
      return { error: 'Missing GOOGLE_CLIENT_ID' }
    }

    const state = Math.random().toString(36).slice(2)
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: OAUTH_REDIRECT_URL,
      response_type: 'code',
      scope: 'openid email profile',
      include_granted_scopes: 'true',
      state,
      prompt: 'select_account',
    })

    set.headers = {
      'Set-Cookie': `oauth_state=${state}; HttpOnly; Path=/; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
      Location: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
    }
    set.status = 302
    return 'Redirecting...'
  })
  // OAuth: callback
  .get('/api/auth/callback', async ({ set, request }) => {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')

    const cookies = parseCookies(request.headers.get('cookie'))
    if (!code || !state || !cookies['oauth_state'] || cookies['oauth_state'] !== state) {
      set.status = 400
      return { error: 'Invalid OAuth state or missing code' }
    }

    // Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: OAUTH_REDIRECT_URL,
        grant_type: 'authorization_code',
      }).toString(),
    })

    if (!tokenRes.ok) {
      const text = await tokenRes.text()
      set.status = 500
      return { error: 'Failed to exchange token', detail: text }
    }

    const tokenJson: any = await tokenRes.json()
    const idToken = tokenJson.id_token as string
    if (!idToken) {
      set.status = 500
      return { error: 'Missing id_token' }
    }

    // Decode ID token payload (without verifying Google signature; for MVP only)
    const parts = idToken.split('.')
    const payload = JSON.parse(Buffer.from(parts[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'))
    const sessionUser = {
      id: payload.sub as string,
      email: payload.email as string,
      name: payload.name as string | undefined,
      picture: payload.picture as string | undefined,
      iat: Date.now(),
    }

    const token = await signSession(sessionUser, SESSION_SECRET)
    const week = 7 * 24 * 60 * 60
    set.headers = {
      'Set-Cookie': [
        `session=${token}; HttpOnly; Path=/; Max-Age=${week}; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
        'oauth_state=deleted; Path=/; Max-Age=0; SameSite=Lax'
      ],
      Location: '/',
    } as any
    set.status = 302
    return 'Signed in. Redirecting...'
  })
  // Session endpoints
  .get('/api/me', async ({ request }) => {
    const cookies = parseCookies(request.headers.get('cookie'))
    const token = cookies['session']
    if (!token) return { user: null }
    const user = await verifySession(token, SESSION_SECRET)
    return { user: user ? { id: user.id, email: user.email, name: user.name, picture: user.picture } : null }
  })
  .post('/api/logout', ({ set }) => {
    set.headers = {
      'Set-Cookie': 'session=deleted; Path=/; Max-Age=0; HttpOnly; SameSite=Lax'
    }
    return { ok: true }
  })
  // SPA fallback: serve index.html for non-API routes
  .get('*', async ({ request, set }) => {
    const url = new URL(request.url)
    if (url.pathname.startsWith('/api')) {
      set.status = 404
      return { error: 'Not found' }
    }
    try {
      const file = Bun.file(join(ROOT, 'index.html'))
      if (await file.exists()) {
        set.headers = { 'Content-Type': 'text/html; charset=utf-8' }
        return file
      }
    } catch {}
    set.status = 404
    return 'Not Found'
  })

app.listen(PORT)
console.log(`Elysia server running at http://localhost:${PORT}`)
