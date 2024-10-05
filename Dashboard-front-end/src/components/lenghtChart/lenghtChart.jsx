import styles from "./lenghtChart.module.css"
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
import { getUserData } from '../../api/userApiService'
import { formatDay } from '../../formatData';
import { curveNatural } from 'd3-shape';

export default function LengthChart({ id }) {

    const [data, setData] = useState(null);

    useEffect(() => {
        let ignore = false;

        // Fetch data when the component mounts
        const fetchData = async () => {
            const result = await getUserData(id, "average-sessions");

            if (!ignore) {
                let sessions = result.data.sessions
                formatDay(sessions)
                setData(sessions)
            }
        }

        fetchData();
        //clean up first fetch in dev env
        return () => {
            ignore = true;
        };
    }, []);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className={styles.customTooltip}>
                    <p>{`${payload[0].value} min`}</p>
                </div>
            );
        }

        return null;
    };

    const CustomCursor = (props) => {
        const { points, width } = props;
        const { x, y } = points[0];
        return (
          <Rectangle
            fill="rgba(0, 0, 0, 0.1)"
            stroke="rgba(0, 0, 0, 0.1)"
            x={x}
            width={width}
            height={263}
          />
        );
      };

    return (
        <>
            <h2>Durée moyenne des sessions</h2>
            <ResponsiveContainer height={263} margin={{ top: 30, right: 30, left: 30, bottom: 30 }}>

                <LineChart data={data}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="100%" y2="0">
                            <stop offset="40%" stopColor="#FFFF" stopOpacity={0.5} />
                            <stop offset="100%" stopColor="#FFFF" stopOpacity={1} />
                        </linearGradient>
                    </defs>
                    <YAxis hide dataKey="sessionLength" domain={['dataMin-20', 'dataMax+50']} />
                    <XAxis padding={{ left: 5, right: 5 }} tickLine={false} axisLine={false} dataKey="day" />
                    <Tooltip cursor={<CustomCursor />} position={{ y: 50 }} offset={10} animationEasing="ease-in-out" content={<CustomTooltip />} />

                    <Line strokeWidth={2} dot={false} type={curveNatural} dataKey="sessionLength" stroke="url(#colorUv)" />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}