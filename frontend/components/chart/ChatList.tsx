import dynamic from 'next/dynamic'
import { ChartColor } from '../../enums/chart-color.enum'
const ChartArea = dynamic(() => import('./ChartArea'), {
    ssr: false,
})

export default function ChatList({ color }: { color: ChartColor }) {
    return (
        <>
            <ChartArea color={color} />
        </>
    )
}
