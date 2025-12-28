import { FormEvent, useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useServices } from "@/hooks/useServices";
import { AlumniSurvey, IStatisticsService } from "@/services/types";
import { useAuthStore } from "@/stores/authStore";
import { SuperAdminRole } from "backend/src/constants";
import { Button, buttonVariants } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldError } from "@/components/ui/field";
import { UploadProgress } from 'backend/src/services/AlumniService';
import { Progress } from '@/components/ui/progress';

export default function DashboardStats() {
    const { statisticsService } = useServices()
    const [surveyData, setSurveyData] = useState<AlumniSurvey[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuthStore()
    const isSuperAdmin = user?.roles.includes(SuperAdminRole)

    useEffect(() => {
        let mounted = true
            ; (async () => {
                try {
                    const data = await statisticsService.getAlumniSurvey()
                    if (mounted) setSurveyData(data)
                } catch (e: any) {
                    setError(e?.message ?? 'Failed to load survey data')
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
                        {isSuperAdmin && <DialogUploadSurveyData statisticsService={statisticsService} />}
                    </div>
                    <CardDescription>Basic metrics. Charts will be added later.</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading && <div className="text-sm text-muted-foreground">Loading...</div>}
                    {error && <div className="text-sm text-destructive">{error}</div>}
                    {!loading && !error && (
                        <div className="grid gap-4 md:grid-cols-3">
                            <Metric label="Total Surveyed Alumni" value={surveyData.length} />
                        </div>
                    )}
                </CardContent>
            </Card>
            <div>

            </div>
        </div>
    )
}

function Metric({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="rounded-lg border p-4 bg-card">
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="text-2xl font-semibold">{value}</div>
        </div>
    )
}

function DialogUploadSurveyData({ statisticsService }: { statisticsService: IStatisticsService }) {
    const [isValid, setIsValid] = useState(false)
    const [csvFile, setCsvFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null)
    const [hasUploaded, setHasUploaded] = useState(false)
    const [open, setOpen] = useState(false)

    const onHandleOpenChange = (newOpenState: boolean) => {
        if (!newOpenState) {
            // Reset state on close
            setIsValid(false)
            setCsvFile(null)
            setError(null)
            setUploadProgress(null)
            setHasUploaded(false)
        }
        setOpen(newOpenState)
    }

    const validateInput = (e: FormEvent<HTMLInputElement>) => {
        setError(validateInputUploadSurvey(e))
        setIsValid(error === null)
        if (error) return
        setCsvFile(e.currentTarget.files![0])
    }

    const processUpload = () => {
        if (csvFile) {
            setHasUploaded(false)
            statisticsService.uploadSurveyData(csvFile).then(async ({data: generator, error}) => {
                if (error) {
                    setError(`Upload failed: ${error.status} - ${JSON.stringify(error.value)}. Please try again.`)
                    setIsValid(false)
                    return
                }
                if (generator) {
                    for await (const event of generator) {
                        if (event.event === 'message') {
                            setUploadProgress(event.data)
                            if (event.data.percentage === 100) {
                                setHasUploaded(true)
                            }
                        }
                    }
                }
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={onHandleOpenChange}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <UploadIcon className="mr-2" />
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
                    <Input id="survey-csv-upload" type="file" accept="text/csv" className={buttonVariants({ variant: 'outline' })} onInput={(e) => validateInput(e)} aria-invalid={!isValid} />
                    {!isValid && <FieldError>{error}</FieldError>}
                    {uploadProgress && <UploadProgressDisplay progress={uploadProgress} />}
                </Field>
                <DialogFooter>
                    <DialogClose asChild>
                        {hasUploaded
                            ? (<Button variant="default">OK</Button>)
                            : (<Button variant="outline">Cancel</Button>)
                        }
                    </DialogClose>
                    {!hasUploaded && (
                        <Button variant="destructive" onClick={() => processUpload()} disabled={uploadProgress !== null || !isValid}>Upload</Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function UploadProgressDisplay({ progress }: { progress: UploadProgress }) {
    return (
        <div className="space-y-2">
            <div className="text-sm">{progress.percentage === 100 ? "Upload complete!" : progress.message}</div>
            <div className="text-sm">Uploading: {progress.percentage}%</div>
            <div className="text-sm">Processed: {progress.current} / {progress.total}</div>
            <Progress value={progress.percentage} />
        </div>
    )
}

function validateInputUploadSurvey(e: FormEvent<HTMLInputElement>): string | null {
    if (!e.currentTarget.files) return 'No file selected'
    if (e.currentTarget.files.length > 1) return 'Only one file can be uploaded'
    if (e.currentTarget.files[0].type !== 'text/csv') return 'Only CSV files are supported'
    return null
}