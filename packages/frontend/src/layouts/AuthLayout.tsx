import {Link, useSearchParams} from 'wouter'
import {buttonVariants} from "@/components/ui/button";
import {AlertCircleIcon, Home} from "lucide-react";
import {Logo} from "@/components/ui/logo";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {ReactNode} from "react";

export default function AuthLayout({children}: { children: ReactNode }) {
    const [searchParams] = useSearchParams()
    const errorMessage = searchParams.get('error');

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div
                className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-success/10">
                <div className="max-w-md p-10 text-center">
                    <Logo className='mx-auto'/>
                    <h2 className="text-3xl font-semibold">Welcome to Tawasul</h2>
                    <p className="text-muted-foreground mt-2">Connect alumni, share stories, and explore
                        opportunities.</p>
                    <div className="ml-auto mx-auto items-center gap-2 mt-4">
                        <Link href="/" className={buttonVariants({variant: 'outline'})}>
                            <span className="inline-flex items-center gap-2"><Home/> Back to Landing page </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center p-6">
                <div className="w-full max-w-sm">
                    {
                        errorMessage && <Alert variant="destructive" className="mb-4">
                            <AlertCircleIcon/>
                            <AlertTitle>Unable to process your login.</AlertTitle>
                            <AlertDescription>
                                <p>{errorMessage}</p>
                            </AlertDescription>
                        </Alert>
                    }
                    <Link href="/" className="inline-flex items-center gap-2 mb-6 mx-auto">
                        <Logo size={8}/>
                        <span className="font-semibold my-auto">Tawasul</span>
                    </Link>
                    {children}
                </div>
            </div>
        </div>
    )
}
