import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    type ChartConfig, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"
import {AlumniFormValue, ProfessionalStatus} from "backend/src/db/schemas";
import {generateLabeledGradientHexes, groupBy} from "@/utils";

export function AlumniStatusPie({props}: {props: {alumniStatuses: AlumniFormValue['Status'][]}}) {
    const realStatusData: ProfessionalStatus[] = props.alumniStatuses.map(status => {
        const filledStatuses = status.filter(status => status.trim() !== '')
        return filledStatuses[filledStatuses.length - 1] as ProfessionalStatus
    })

    const groupedStatuses = groupBy(realStatusData, (status) => status)
    const groupedStatusKeysOrderedByMostData = Object.keys(groupedStatuses).sort((a, b) => groupedStatuses[b as keyof typeof groupedStatuses]!.length - groupedStatuses[a as keyof typeof groupedStatuses]!.length) as ProfessionalStatus[]
    const baseColors = generateLabeledGradientHexes('blue', groupedStatusKeysOrderedByMostData.length, groupedStatusKeysOrderedByMostData)

    const chartData = Object.entries(groupedStatuses).map(([key, value]) => ({
        status: key,
        alumniCount: value.length,
        fill: baseColors[groupedStatusKeysOrderedByMostData.indexOf(key as ProfessionalStatus)].color
    }))

    const chartConfig: ChartConfig = {
        alumniCount: {
            label: "Alumni",
        },
    }

    for (const key of groupedStatusKeysOrderedByMostData) {
        chartConfig[key] = {label: key}
    }

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Status Alumni</CardTitle>
                <CardDescription>Bekerja / Kuliah</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px]"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel/>}/>
                        <Pie data={chartData} dataKey="alumniCount" nameKey="status" label/>
                        <ChartLegend
                            content={<ChartLegendContent nameKey="status" />}
                            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
