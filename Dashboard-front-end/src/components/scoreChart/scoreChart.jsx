import styles from "./scoreChart.module.css"
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, PolarAngleAxis } from "recharts"

export default function ScoreChart({ score }) {

    return (
        <>
            <div className={styles.legend}>
                <span>{score[0].value}%</span>de votre objectif
            </div>
            <ResponsiveContainer width="100%" height={263}>
                <RadialBarChart
                    margin={{ top: 35, right: 5, bottom: 0, left: 5 }}
                    innerRadius="85%"
                    outerRadius="100%"
                    data={score}
                    startAngle={200}
                    endAngle={-160}
                    fill="#FF0000"
                >
                    <PolarAngleAxis type="number" domain={[0, 100]} dataKey={'value'} angleAxisId={0} tick={false} />
                    <RadialBar clockWise={true} dataKey='value' cornerRadius={10} angleAxisId={0} />
                    <Legend iconSize={0} wrapperStyle={{ top: '10%', left: '-22%' }} />
                </RadialBarChart>
            </ResponsiveContainer>
        </>
    )
}