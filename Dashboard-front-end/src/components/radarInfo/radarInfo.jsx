import styles from "./radarInfo.module.css"
import { useState, useEffect } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Text } from "recharts"
import { getUserData } from "../../api/userApiService";
import { formatPerformance } from "../../formatData";


export default function RadarInfo({ id }) {

    const [data, setData] = useState(null);

    useEffect(() => {
        let ignore = false;

        // Fetch data when the component mounts
        const fetchData = async () => {
            const result = await getUserData(id, "performance");
            if (!ignore) {
                let performance = result.data
                formatPerformance(performance)
                setData(performance)
            }
        }
        fetchData();

        //clean up first fetch in dev env
        return () => {
            ignore = true;
        };
    }, []);

    const RenderPolarAngleAxis = ({ payload, x, y, cx, cy, ...rest }) => {
        return (
            <Text className={styles.legend}
                {...rest}
                verticalAnchor="middle"
                y={y + (y - cy) / 12}
                x={x}
                fontSize={14}
                fontWeight={500}
                fill= "white"
            >
                {payload.value}
            </Text>
        );
    }

    return (data &&
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={80} data={data.data}>
                <PolarGrid gridType="polygon" color="white" radialLines={false} />
                <PolarAngleAxis dataKey="kind" stroke="white" tickLine={false} tick={<RenderPolarAngleAxis />} />
                <PolarRadiusAxis tickCount={6} tick={false} axisLine={false} />
                <Radar dataKey="value" stroke="none" fill="rgba(255, 1, 1)" fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
    )
}