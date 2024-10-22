import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import styles from "./sessionsChart.module.css"
import { useState, useEffect } from 'react';
import { getUserData } from '../../api/userApiService'
import { formatDate } from '../../formatData';

export default function SessionsChart({ id }) {

    const [data, setData] = useState(null);
    let ignore = false;
    useEffect(() => {


        // Fetch data when the component mounts
        const fetchData = async () => {

            if (!ignore) {
                const result = await getUserData(id, "activity");
                let sessions = result.data.sessions
                formatDate(sessions)
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
                    <p>{`${payload[0].value}${payload[0].unit}`}</p>
                    <p>{`${payload[1].value}${payload[1].unit}`}</p>
                </div>
            );
        }

        return null;
    };

    return (data &&
        <ResponsiveContainer width="100%" margin={{ top: 30, right: 30, left: 30, bottom: 30 }}>
            <BarChart height={270} barSize={10} barGap={10} data={data}>
                <text x={0} y={20} fill="black" textAnchor="start" dominantBaseline="">
                    <tspan fontSize="15">Activité quotidienne</tspan>
                </text>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis padding={{ left: 0, right: 0 }} tickMargin={15} tickLine={false} dataKey="day" name={data} />
                <YAxis tickMargin={35} tickLine={false} axisLine={false} orientation='right' yAxisId={"kgY"} domain={['dataMin -2', 'auto']} tickCount={3} dataKey="kilogram" />
                <YAxis hide yAxisId={"kcalY"} tickCount={3} domain={[0, "dataMax+50"]} dataKey="calories" />
                <Tooltip cursor={{ fill: "rgba(196, 196, 196, 0.5)" }} allowEscapeViewBox={{ x: true, y: true }} position={{ y: 40 }} offset={45} animationEasing="ease-in-out" content={<CustomTooltip />} />
                <Legend iconSize={8} chartWidth={39} margin={{ top: 60, left: 0, right: 0, bottom: 60 }} align="right" verticalAlign="top" wrapperStyle={{
                    paddingBottom: "60px"
                }} />
                <Bar radius={[20, 20, 0, 0]} yAxisId={"kgY"} name="Poids (Kg)" unit={"kg"} legendType='circle' dataKey="kilogram" fill="#282D30" />
                <Bar radius={[20, 20, 0, 0]} yAxisId={"kcalY"} name="Calories brûlées (Kcal)" unit={"Kcal"} legendType='circle' dataKey="calories" fill="#E60000" />
            </BarChart>
        </ResponsiveContainer>
    )
}