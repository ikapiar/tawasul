import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import React from "react";
import {GOOGLE_LOGIN_URL} from "@/constants";

export default function LoginPage() {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Continue with your Google account</CardDescription>
      </CardHeader>
      <CardContent>
        <a
          href={GOOGLE_LOGIN_URL}
          className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'w-full justify-center')}
        >
          <GoogleIcon className="mr-2 h-5 w-5" /> Continue with Google
        </a>
        <p className="mt-4 text-xs text-muted-foreground">
          You will be redirected to Google and back to the dashboard on success.
        </p>
      </CardContent>
    </Card>
  )
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 533.5 544.3" aria-hidden="true" {...props}>
      <path fill="#4285F4" d="M533.5 278.4c0-18.5-1.7-36.3-4.9-53.6H272.1v101.5h147.1c-6.3 34.1-25.2 63-53.7 82.3v68h86.7c50.8-46.8 81.3-115.7 81.3-198.2z"/>
      <path fill="#34A853" d="M272.1 544.3c73.5 0 135.3-24.4 180.4-66.1l-86.7-68c-24.1 16.2-55 25.8-93.7 25.8-71.9 0-132.9-48.6-154.7-113.9h-90.3v71.5c45.1 89.3 137.8 151 245 151z"/>
      <path fill="#FBBC05" d="M117.4 322.1c-10.8-32.3-10.8-67.5 0-99.8v-71.5H27.1c-39.5 77.9-39.5 165 0 242.9l90.3-71.6z"/>
      <path fill="#EA4335" d="M272.1 106.9c40 0 76 13.8 104.3 40.9l78.1-78.1C407.2 24.2 345.4 0 272.1 0 164.9 0 72.2 61.7 27.1 151l90.3 71.5c21.8-65.3 82.8-113.8 154.7-113.8z"/>
    </svg>
  )
}
