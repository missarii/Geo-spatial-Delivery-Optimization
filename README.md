# Geo-spatial Delivery Optimization - Colombo, Sri Lanka

A geofencing-based restaurant discovery and delivery dispatch system using real road routing.

## Features

- **15 Restaurant Locations** - Pre-loaded Colombo establishments across the metropolitan area
- **Draggable Customer Pin** - Click to place 📍, drag to fine-tune your location
- **Road-Based Routing** - Uses OSRM API to calculate actual driving distances (not straight-line)
- **Nearest Restaurant Detection** - Automatically finds the closest restaurant
- **Single Rider Dispatch** - Only the nearest restaurant sends their rider 🏍️
- **Live Rider Animation** - Rider moves along the road path in real-time
- **Top 5 Ranking** - Shows 5 nearest restaurants for reference
- **Auto-Fallback** - Haversine formula used if OSRM unavailable

## System Logic Rules

```
1. CUSTOMER ACTION:
   - Clicks anywhere on Colombo map to place 📍 pin
   - Pin is draggable for location fine-tuning

2. SYSTEM ACTION (on "Call" button):
   - Calculates ROAD distance to all 15 🏨 restaurants
   - Ranks restaurants by distance (shortest first)
   - Displays top 5 in side panel

3. RIDER DISPATCH:
   - ONLY the #1 nearest restaurant sends a rider
   - Rider 🏍️ travels FROM restaurant TO customer
   - Route follows actual roads via OSRM

4. FALLBACK BEHAVIOR:
   - If OSRM fails, uses Haversine (straight-line) distance
   - Rider still animates along calculated path
```

## Emoji Legend

| Emoji | Meaning |
|-------|---------|
| 📍 | Your location (customer) - draggable |
| 🏨 | Restaurant/Hotels (15 locations) |
| 🏍️ | Delivery rider - follows road path |

## Restaurant Locations

| # | Name | Area |
|---|------|------|
| 1 | Ministry of Crab | Colombo 01 |
| 2 | Nuga Gama | Colombo 03 |
| 3 | The Lagoon | Colombo 03 |
| 4 | Upali's by Nawaloka | Colombo 03 |
| 5 | Barefoot Garden Cafe | Colombo 07 |
| 6 | Cricket Club Cafe | Colombo |
| 7 | Cafe Kumbuk | Colombo 07 |
| 8 | The Commons Coffee Shop | Colombo 01 |
| 9 | Elephant House | Colombo 01 |
| 10 | Street Burger | Colombo 01 |
| 11 | Pizza Hut - Bambalapitiya | Galle Road |
| 12 | McDonald's - Marino Mall | Colombo 01 |
| 13 | Subway - Crescat | Colombo 03 |
| 14 | Domino's - Nugegoda | Nugegoda |
| 15 | KFC - Maharagama | Maharagama |

## Use Cases & Services

### 1. Food Delivery Platforms
- Real-time restaurant discovery based on customer location
- Automatic rider dispatch to nearest location
- Live tracking of rider position

### 2. Ride-Hailing Services
- Find nearest driver/vehicle to customer
- Route optimization along actual roads
- Multi-service provider support

### 3. Emergency Services
- Find nearest hospital/clinic
- Dispatch ambulance via optimal roads
- Location-based service discovery

### 4. E-commerce Delivery
- Nearest warehouse/stores to customer
- Last-mile delivery optimization
- Real-time tracking integration

### 5. Logistics Management
- Fleet positioning based on demand clusters
- Route planning for multiple deliveries
- Geofencing for service zones

## Running the App

```bash
# Install dependencies
npm install

# Start the server
npm start

# Open in browser
http://localhost:3000/index.html
```

## Future Flutter Integration

To integrate with Flutter mobile app:

1. **Maps**: Use `flutter_map` with OpenStreetMap tiles
2. **Location**: Use `geolocator` package
3. **API**: Call `/api/nearest-restaurants` endpoint
4. **Riders**: Use `latlong2` for route decoding

## Technologies

- **Backend**: Node.js + Express
- **Frontend**: Leaflet.js + OpenStreetMap
- **Routing**: OSRM (Open Source Routing Machine) API
- **Geospatial**: Haversine formula fallback