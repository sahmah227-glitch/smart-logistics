// ============================================================
// ROUTING ALGORITHMS - Smart Logistics Navigator
// ============================================================

import { US_CITIES, CityKey } from "./mockData";

/**
 * Haversine Formula
 * Calculates the great-circle distance between two points on earth (in miles)
 */
export function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 3958.8; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Calculate distance between two US cities by name
 */
export function cityDistance(from: CityKey, to: CityKey): number {
  const c1 = US_CITIES[from];
  const c2 = US_CITIES[to];
  if (!c1 || !c2) return 0;
  return haversineDistance(c1.lat, c1.lng, c2.lat, c2.lng);
}

/**
 * Calculate total route distance for a sequence of cities
 */
export function routeDistance(cities: CityKey[]): number {
  let total = 0;
  for (let i = 0; i < cities.length - 1; i++) {
    total += cityDistance(cities[i], cities[i + 1]);
  }
  return total;
}

/**
 * Estimate profit for a route
 * Base rate: $2.50 per mile loaded
 * Deadhead cost: $0.80 per mile empty
 * Fuel: $0.45 per mile
 * Driver: $0.55 per mile
 */
export type RouteEstimate = {
  distance: number;
  deadheadMiles: number;
  grossRevenue: number;
  fuelCost: number;
  driverCost: number;
  netProfit: number;
  profitPerMile: number;
  deadheadPct: number;
  score: number;
};

const RATE_PER_MILE = 2.50;
const DEADHEAD_COST = 0.80;
const FUEL_COST = 0.45;
const DRIVER_COST = 0.55;
const OVERHEAD_PER_MILE = 0.25;

export function estimateRouteProfit(
  loadedMiles: number,
  deadheadMiles: number = 0
): RouteEstimate {
  const grossRevenue = loadedMiles * RATE_PER_MILE;
  const totalMiles = loadedMiles + deadheadMiles;
  const fuelCost = totalMiles * FUEL_COST;
  const driverCost = totalMiles * DRIVER_COST;
  const deadheadCost = deadheadMiles * DEADHEAD_COST;
  const overhead = loadedMiles * OVERHEAD_PER_MILE;
  const netProfit = grossRevenue - fuelCost - driverCost - deadheadCost - overhead;
  const profitPerMile = loadedMiles > 0 ? netProfit / loadedMiles : 0;
  const deadheadPct = totalMiles > 0 ? (deadheadMiles / totalMiles) * 100 : 0;

  // Scoring: 0-100 based on profit/mile and deadhead %
  const profitScore = Math.min(100, (profitPerMile / 1.5) * 70);
  const deadheadScore = Math.max(0, 30 - deadheadPct * 1.5);
  const score = Math.round(profitScore + deadheadScore);

  return {
    distance: loadedMiles,
    deadheadMiles,
    grossRevenue: Math.round(grossRevenue),
    fuelCost: Math.round(fuelCost),
    driverCost: Math.round(driverCost),
    netProfit: Math.round(netProfit),
    profitPerMile: Math.round(profitPerMile * 100) / 100,
    deadheadPct: Math.round(deadheadPct * 10) / 10,
    score,
  };
}

/**
 * Chain Method Optimizer
 * Finds the optimal sequence of 3 stops that maximizes cumulative profit.
 * Uses a depth-limited tree search approach (Dijkstra-inspired).
 */
export type ChainRoute = {
  cities: CityKey[];
  estimates: RouteEstimate[];
  totalProfit: number;
  totalDistance: number;
  avgScore: number;
};

export function optimizeChainMethod(
  startCity: CityKey,
  availableCities: CityKey[],
  maxDeadheadMiles: number = 200,
  minProfitPerMile: number = 0.8
): ChainRoute[] {
  const results: ChainRoute[] = [];
  const others = availableCities.filter(c => c !== startCity);

  for (const city1 of others) {
    const deadhead1 = cityDistance(startCity, city1);
    if (deadhead1 > maxDeadheadMiles) continue;

    for (const city2 of others.filter(c => c !== city1)) {
      const leg1 = cityDistance(city1, city2);
      const est1 = estimateRouteProfit(leg1, deadhead1);
      if (est1.profitPerMile < minProfitPerMile) continue;

      for (const city3 of others.filter(c => c !== city1 && c !== city2)) {
        const leg2 = cityDistance(city2, city3);
        const est2 = estimateRouteProfit(leg2, 0);
        if (est2.profitPerMile < minProfitPerMile) continue;

        const chain: ChainRoute = {
          cities: [startCity, city1, city2, city3],
          estimates: [est1, est2],
          totalProfit: est1.netProfit + est2.netProfit,
          totalDistance: leg1 + leg2,
          avgScore: Math.round((est1.score + est2.score) / 2),
        };

        results.push(chain);
      }
    }
  }

  return results
    .filter(r => r.totalProfit > 0)
    .sort((a, b) => b.totalProfit - a.totalProfit)
    .slice(0, 10);
}

/**
 * Triangle Method Optimizer
 * Finds closed-loop triangle routes that guarantee driver returns to origin.
 * Optimizes for lower deadhead by ensuring all legs are loaded.
 */
export type TriangleRoute = {
  cities: [CityKey, CityKey, CityKey, CityKey]; // A → B → C → A
  estimates: RouteEstimate[];
  totalProfit: number;
  totalDistance: number;
  avgScore: number;
  homeCityReturn: boolean;
};

export function optimizeTriangleMethod(
  homeCity: CityKey,
  availableCities: CityKey[],
  maxLegDistance: number = 800,
  minProfitPerMile: number = 0.7
): TriangleRoute[] {
  const results: TriangleRoute[] = [];
  const others = availableCities.filter(c => c !== homeCity);

  for (const city1 of others) {
    const leg1Distance = cityDistance(homeCity, city1);
    if (leg1Distance > maxLegDistance) continue;

    for (const city2 of others.filter(c => c !== city1)) {
      const leg2Distance = cityDistance(city1, city2);
      if (leg2Distance > maxLegDistance) continue;

      const returnDistance = cityDistance(city2, homeCity);
      if (returnDistance > maxLegDistance) continue;

      const est1 = estimateRouteProfit(leg1Distance, 0);
      const est2 = estimateRouteProfit(leg2Distance, 0);
      const est3 = estimateRouteProfit(returnDistance, 0);

      const totalProfit = est1.netProfit + est2.netProfit + est3.netProfit;
      if (totalProfit < 1000) continue;

      const avgScore = Math.round((est1.score + est2.score + est3.score) / 3);
      if (avgScore < 60) continue;

      results.push({
        cities: [homeCity, city1, city2, homeCity],
        estimates: [est1, est2, est3],
        totalProfit,
        totalDistance: leg1Distance + leg2Distance + returnDistance,
        avgScore,
        homeCityReturn: true,
      });
    }
  }

  return results
    .filter(r => r.totalProfit > 0)
    .sort((a, b) => b.totalProfit - a.totalProfit)
    .slice(0, 10);
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format miles
 */
export function formatMiles(miles: number): string {
  return `${miles.toLocaleString()} mi`;
}
