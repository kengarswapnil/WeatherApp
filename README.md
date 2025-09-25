# 🌤️ Weather Now App

## Overview

**Weather Now** is a responsive, user-friendly web application built using **React (Vite)** and **Tailwind CSS v3**.  

It addresses the user need of **Jamie, an outdoor enthusiast**, who wants to **quickly check current weather conditions** for any city. The application fetches live weather data from the **Open-Meteo API** and displays it with an attractive interface.

---

## User Persona

- **Name:** Jamie  
- **Occupation:** Outdoor Enthusiast  
- **Need:** Quickly check the current weather conditions for any city.  

---

## Features

1. **Search Functionality**  
   - Users can enter any city name to fetch its current weather.  
   - Gracefully handles invalid city names with user-friendly error messages.

2. **Current Weather Display**  
   - Temperature (°C)  
   - Wind speed (km/h)  
   - Exact local time of weather data  
   - Dynamic weather icon representing current conditions (sunny, cloudy, rain, snow, thunderstorm, fog).

3. **Dynamic UI & Animation**  
   - Animated gradient background changes according to weather conditions.  
   - Weather icons have subtle animations (e.g., pulsing rain and thunderstorm).  
   - Responsive design works on both mobile and desktop devices.

4. **Technical Implementation**  
   - **React 19** with Vite for fast development.  
   - **Tailwind CSS v3** for clean, modern, and responsive styling.  
   - **React Icons (Weather Icons)** for clear weather representation.  
   - Fetching **city coordinates** via **Open-Meteo Geocoding API**.  
   - Fetching **current weather** via **Open-Meteo Forecast API**.

5. **Error Handling**  
   - Displays meaningful messages if the city is not found.  
   - Handles network errors gracefully.

---

## Live Demo

Deployed on **Netlify**:

[🌐 Weather Now Live](https://weather4003.netlify.app/)
