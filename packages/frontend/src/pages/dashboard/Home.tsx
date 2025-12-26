import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {[
            { label: 'Alumni Tercatat', value: '—' },
            { label: 'Angkatan Tercatat', value: '—' },
            { label: 'Kelengkapan Data Alumni', value: '—' }
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
            <CardTitle>Alumni statistics</CardTitle>
            <Badge variant="secondary">Charts coming soon</Badge>
          </div>
          <CardDescription>We will add interactive charts for alumni statistics here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 rounded-md border border-dashed grid place-items-center text-sm text-muted-foreground">
            Placeholder area for charts
          </div>
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
                <div className="text-sm text-muted-foreground">Short preview text for the content item.</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
