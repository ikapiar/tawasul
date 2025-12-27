import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {useServices} from "@/hooks/useServices";
import {useState, useEffect} from "react";
import {AlumniSurvey} from "@/services/types";
import type {Angkatan} from "backend/src/db/schemas";
import {AlumniStatusPie} from "@/components/charts/AlumniStatusPie";

export default function DashboardHome() {
    const {statisticsService} = useServices()
    const [surveyData, setSurveyData] = useState<AlumniSurvey[]>([])
    const [angkatanData, setAngkatanData] = useState<Angkatan[]>([])
    const [kelengkapanData, setKelengkapanData] = useState<number>(0)
    const [loading, setLoading] = useState(true)

    const loadData = async () => {
        setSurveyData(await statisticsService.getAlumniSurvey())
        setAngkatanData(await statisticsService.getAngkatanData())
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        const totalAlumniTercatat = surveyData.length
        const totalAlumniSeharusnya = angkatanData.map(angkt => angkt.memberCount).reduce((a,b) => a + b, 0)
        setKelengkapanData(
            totalAlumniTercatat / totalAlumniSeharusnya
        )
    }, [surveyData, angkatanData])

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                {[
                    {label: 'Alumni Tercatat', value: loading ? '-' : surveyData.length},
                    {label: 'Angkatan Tercatat', value: loading ? '-' : angkatanData.length},
                    {label: 'Kelengkapan Data Alumni', value: loading ? '-' : `${(kelengkapanData*100).toFixed(2)}%`}
                ].map((s) => (
                    <Card key={s.label}>
                        <CardHeader>
                            <CardDescription>{s.label}</CardDescription>
                            <CardTitle className="text-3xl">{s.value}</CardTitle>
                        </CardHeader>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CardTitle>Ringkasan Statistik Alumni</CardTitle>
                    </div>
                    <CardDescription>Berdasarkan Survei Tahunan IKAPIAR</CardDescription>
                </CardHeader>
                <CardContent>
                    <AlumniStatusPie props={{alumniStatuses: surveyData.map(s => s.formValues.Status)}}/>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Recent activity</CardTitle>
                    <CardDescription>Latest articles, news, and events</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="rounded-md border p-3">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                    <Badge>Article</Badge>
                                    <span>Dec 5, 2025</span>
                                </div>
                                <div className="font-medium">Sample post {i}</div>
                                <div className="text-sm text-muted-foreground">Short preview text for the content
                                    item.
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
