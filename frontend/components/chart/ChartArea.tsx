'use client';
import Chart from 'react-apexcharts';
import { ChartColor } from '../../enums/chart-color.enum';

export default function ChartArea({ color }: { color: ChartColor }) {
    const options: ApexCharts.ApexOptions | undefined = {
        colors: [color],
        chart: {
            type: "area",
            width: 100,
            height: 40,
            sparkline: { enabled: !0 },
        },
        plotOptions: { bar: { columnWidth: "50%" } },
        xaxis: { crosshairs: { width: 1 } },

        stroke: {
            show: true,
            curve: "smooth",
            lineCap: "butt",
            colors: undefined,
            width: 2,
            dashArray: 0,
        },

        tooltip: {
            fixed: { enabled: !1 },
            x: { show: !1 },
            y: {
                title: {
                    formatter: function () {
                        return "";
                    },
                },
            },
            marker: { show: !1 },
        },
        states: {
            hover: {
                filter: {
                    type: "none",
                },
            },
        },
    };
    const series = [
        {
            data: [
                25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54, 89, 63, 25, 80,
            ],
        },
    ];
    return (
        <>
            <Chart options={options} series={series} type="area" height={40} width={100} />
        </>
    );
}
