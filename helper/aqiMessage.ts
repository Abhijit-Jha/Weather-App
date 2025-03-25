export const getAQIAdvice = (aqi:number) => {
    if (aqi <= 50) {
        return {
            message: "Air quality is excellent! Enjoy the fresh air. 🌿",
            level: "Good"
        };
    }
    if (aqi <= 100) {
        return {
            message: "Air quality is moderate. Sensitive individuals should limit outdoor activities. 🌤️",
            level: "Moderate"
        };
    }
    if (aqi <= 200) {
        return {
            message: "Air is unhealthy for sensitive groups. Consider wearing a mask outdoors. 😷",
            level: "High"
        };
    }
    if (aqi <= 300) {
        return {
            message: "Air quality is unhealthy! Avoid prolonged outdoor exposure. 😷💨",
            level: "Danegerous"
        };
    }
    if (aqi <= 400) {
        return {
            message: "Very unhealthy air! Everyone should limit outdoor activities. 🏠",
            level: "Severe"
        };
    }
    return {
        message: "Hazardous air quality! Stay indoors and use air purifiers if possible. 🚫",
        level: "Extreme"
    };
};
