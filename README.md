# Weather App (Expo)

## Overview
This is a **Weather App** built using **Expo**, providing real-time weather information. It fetches data based on **location permissions** or allows users to **search for locations manually** (e.g., "Kandivali").

## Features
- **Current Weather Conditions**: Temperature, wind speed, wind direction, gust speed.
- **Air Quality Index (AQI)**: Specialized reports including NO₂, SO₂, and other pollutants.
- **Additional Insights**: Heat index, dew point, real feel, and pressure.
- **Location-Based Data**: Uses GPS to fetch real-time weather or allows searching by city name.
- **User-Friendly UI**: Simple and clean interface for easy access to weather data.

## Tech Stack
- **Frontend**: React Native (Expo)
- **API**: Weather API (e.g., OpenWeatherMap, AirVisual API)
- **State Management**: React Hooks / Context API

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Abhijit-Jha/Weather-App.git
   cd Weather-App
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   expo start
   ```

## Usage
- Allow **location permissions** for automatic weather updates.
- Manually **search** for a city to get weather details.
- View **air quality data** and specialized reports.

## API Configuration
- Sign up for an API key from **OpenWeatherMap** or any other weather API provider.
- Create a `.env` file in the root directory and add:
  ```sh
  API_KEY=your_api_key_here
  ```

## Contributions
Contributions are welcome! Feel free to submit a **pull request**.

## License
This project is licensed under the **MIT License**.

---

**Author:** Abhijit Jha

