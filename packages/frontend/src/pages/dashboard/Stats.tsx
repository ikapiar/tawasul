import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import {useServices} from "../../hooks/useServices";
import {SummaryStats} from "../../services/types";

export default function DashboardStats() {
    const {statisticsService} = useServices()
  const [stats, setStats] = useState<SummaryStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
          </div>
          <CardDescription>Basic metrics. Charts will be added later.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading && <div className="text-sm text-muted-foreground">Loading...</div>}
          {error && <div className="text-sm text-destructive">{error}</div>}
          {!loading && !error && (
            <div className="grid gap-4 md:grid-cols-3">
              <Metric label="Total Alumni" value={stats?.totalAlumni ?? '—'} />
              <Metric label="Active This Month" value={stats?.activeThisMonth ?? '—'} />
              <Metric label="New Articles" value={stats?.newArticles ?? '—'} />
            </div>
          )}
        </CardContent>
      </Card>
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
