const aqiBreakpointsPM25 = [
    { range: [0, 30], aqi: [0, 50] },
    { range: [31, 60], aqi: [51, 100] },
    { range: [61, 90], aqi: [101, 200] },
    { range: [91, 120], aqi: [201, 300] },
    { range: [121, 250], aqi: [301, 400] },
    { range: [251, Infinity], aqi: [401, 500] }
];

const aqiBreakpointsPM10 = [
    { range: [0, 50], aqi: [0, 50] },
    { range: [51, 100], aqi: [51, 100] },
    { range: [101, 250], aqi: [101, 200] },
    { range: [251, 350], aqi: [201, 300] },
    { range: [351, 430], aqi: [301, 400] },
    { range: [431, Infinity], aqi: [401, 500] }
];

function calculateAQI(concentration: number, breakpoints: any) {
    for (let i = 0; i < breakpoints.length; i++) {
        const [BP_L, BP_H] = breakpoints[i].range;
        const [I_L, I_H] = breakpoints[i].aqi;

        if (concentration >= BP_L && (concentration <= BP_H || BP_H === Infinity)) {
            // Handle the case where BP_H is Infinity
            if (BP_H === Infinity) return I_H;

            return Math.round(((I_H - I_L) / (BP_H - BP_L)) * (concentration - BP_L) + I_L);
        }
    }
    return 500; // Max AQI (Failsafe)
}


export function getAQI(pm2_5: number, pm10: number) {
    const aqiPm25 = calculateAQI(pm2_5, aqiBreakpointsPM25);
    const aqiPm10 = calculateAQI(pm10, aqiBreakpointsPM10);

    return Math.max(aqiPm25, aqiPm10); // Final AQI is the max of both
}
