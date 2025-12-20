import {FormEvent, useEffect, useState} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {useServices} from "@/hooks/useServices";
import {IStatisticsService, SummaryStats} from "@/services/types";
import {useAuthStore} from "@/stores/authStore";
import {SuperAdminRole} from "backend/src/constants";
import {Button, buttonVariants} from "@/components/ui/button";
import {UploadIcon} from "lucide-react";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Field, FieldError} from "@/components/ui/field";

export default function DashboardStats() {
    const {statisticsService} = useServices()
    const [stats, setStats] = useState<SummaryStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const {user} = useAuthStore()
    const isSuperAdmin = user?.roles.includes(SuperAdminRole)

    useEffect(() => {
        let mounted = true
        ;(async () => {
            try {
                const data = await statisticsService.getSummaryStats()
                if (mounted) setStats(data)
            } catch (e: any) {
                setError(e?.message ?? 'Failed to load stats')
            } finally {
                if (mounted) setLoading(false)
            }
        })()
        return () => {
            mounted = false
        }
    }, [statisticsService])

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CardTitle>Alumni statistics</CardTitle>
                        <Badge variant="secondary">Early preview</Badge>
                        {isSuperAdmin && <DialogUploadSurveyData statisticsService={statisticsService}/>}
                    </div>
                    <CardDescription>Basic metrics. Charts will be added later.</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading && <div className="text-sm text-muted-foreground">Loading...</div>}
                    {error && <div className="text-sm text-destructive">{error}</div>}
                    {!loading && !error && (
                        <div className="grid gap-4 md:grid-cols-3">
                            <Metric label="Total Alumni" value={stats?.totalAlumni ?? '—'}/>
                            <Metric label="Active This Month" value={stats?.activeThisMonth ?? '—'}/>
                            <Metric label="New Articles" value={stats?.newArticles ?? '—'}/>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

function Metric({label, value}: { label: string; value: string | number }) {
    return (
        <div className="rounded-lg border p-4 bg-card">
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="text-2xl font-semibold">{value}</div>
        </div>
    )
}

function DialogUploadSurveyData({statisticsService}: { statisticsService: IStatisticsService}) {
    const [isValid, setIsValid] = useState(true)
    const [csvFile, setCsvFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)

    const validateInput = (e: FormEvent<HTMLInputElement>) => {
        setError(validateInputUploadSurvey(e))
        setIsValid(error === null)
        if (error) return
        setCsvFile(e.currentTarget.files![0])
    }

    const processUpload = async () => {
        if (csvFile) {
            await statisticsService.uploadSurveyData(csvFile)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm">
                    <UploadIcon className="mr-2"/>
                    Override
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Override Survey Data</DialogTitle>
                    <DialogDescription>
                        Upload Alumni Survey Data CSV and replace existing data.
                    </DialogDescription>
                </DialogHeader>
                <Field data-invalid={!isValid}>
                    <Input id="survey-csv-upload" type="file" accept="text/csv" className={buttonVariants({ variant: 'outline' })} onInput={(e) => validateInput(e)} aria-invalid={!isValid}/>
                    {!isValid && <FieldError>{error}</FieldError>}
                </Field>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={() => processUpload()}>Upload</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function validateInputUploadSurvey(e: FormEvent<HTMLInputElement>): string | null {
    if (!e.currentTarget.files) return 'No file selected'
    if (e.currentTarget.files.length > 1) return 'Only one file can be uploaded'
    if (e.currentTarget.files[0].type !== 'text/csv') return 'Only CSV files are supported'
    return null
}