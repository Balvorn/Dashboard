import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import styles from "./sessionsChart.module.css"
import { useState, useEffect } from 'react';
import { getUserData } from '../../api/userApiService'

export default function SessionsChart() {


    const [data, setData] = useState(null);

    useEffect(() => {
        let ignore = false;

        // Fetch data when the component mounts
        const fetchData = async () => {
            const result = await getUserData(12, "activity");
            if (!ignore) {
                setData(result.data);
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
        <ResponsiveContainer width="75%" height={320}><text>Activité quotidienne</text>
            <BarChart barSize={10} barGap={10} data={data.sessions}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis tickMargin={15} tickLine={false}  dataKey="day" name={data.sessions} />
                <YAxis tickMargin={40} tickLine={false} axisLine={false} orientation='right' yAxisId={"kgY"} domain={['dataMin -2', 'auto']} tickCount={3} dataKey="kilogram" />
                <YAxis hide yAxisId={"kcalY"} tickCount={3} domain={[0, "dataMax+100"]} dataKey="calories" />
                <Tooltip cursor={{ fill: "rgba(196, 196, 196, 0.5)" }} allowEscapeViewBox={{ x: true, y: true }} position={{ y: 40}} offset={45} animationEasing="ease-in-out" content={<CustomTooltip />} />
                <Legend iconSize={8} chartWidth={39} margin={{ top: 60, left: 0, right: 0, bottom: 60 }} align="right" verticalAlign="top" wrapperStyle={{
                    paddingBottom: "60px"
                }} />
                <Bar  radius={[20, 20, 0, 0]} yAxisId={"kgY"} name="Poids (Kg)" unit={"kg"} legendType='circle' dataKey="kilogram" fill="#282D30" />
                <Bar radius={[20, 20, 0, 0]} yAxisId={"kcalY"} name="Calories brûlées (Kcal)" unit={"Kcal"} legendType='circle' dataKey="calories" fill="#E60000" />
            </BarChart>
        </ResponsiveContainer>
    )
}