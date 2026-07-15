import express from 'express';
import cors from 'cors';
import { restaurants } from './restaurants.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Haversine formula for straight-line distance (meters)
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Earth radius in meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Fetch road distance from OSRM (Open Source Routing Machine)
async function getRoadDistance(customerLat, customerLng, restLat, restLng) {
  // Route FROM restaurant TO customer
  const url = `https://router.project-osrm.org/route/v1/driving/${restLng},${restLat};${customerLng},${customerLat}?overview=full&geometries=geojson`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.code === 'Ok' && data.routes.length > 0) {
      return {
        distance: data.routes[0].distance, // meters
        duration: data.routes[0].duration, // seconds
        geometry: data.routes[0].geometry
      };
    }
  } catch (error) {
    console.error('OSRM error:', error.message);
  }
  return null;
}

// API endpoint to find 5 nearest restaurants
app.post('/api/nearest-restaurants', async (req, res) => {
  const { lat, lng } = req.body;
  
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing lat or lng' });
  }

  // Calculate distances for all restaurants
  const restaurantsWithDistance = await Promise.all(
    restaurants.map(async (rest) => {
      let road = await getRoadDistance(lat, lng, rest.lat, rest.lng);
      if (!road) {
        // Fallback to Haversine if OSRM fails
        const haversine = haversineDistance(lat, lng, rest.lat, rest.lng);
        road = { distance: haversine, duration: haversine / 40, geometry: null };
      }
      return { ...rest, distance: road.distance, duration: road.duration, geometry: road.geometry };
    })
  );

  // Sort by road distance and take top 5
  const nearest5 = restaurantsWithDistance
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5);

  res.json({ nearestRestaurants: nearest5 });
});

// Get all restaurants
app.get('/api/restaurants', (req, res) => {
  res.json({ restaurants });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', restaurantCount: restaurants.length });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT}/index.html to use the app`);
});