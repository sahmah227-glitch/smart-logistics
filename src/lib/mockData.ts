// ============================================================
// MOCK DATA - Smart Logistics Navigator
// ============================================================

export type CityKey =
  | "Los Angeles" | "Phoenix" | "Denver" | "Dallas" | "Houston"
  | "Chicago" | "Atlanta" | "New York" | "Miami" | "Seattle"
  | "Nashville" | "Kansas City" | "Memphis" | "Salt Lake City"
  | "Las Vegas" | "San Francisco" | "Portland" | "Albuquerque"
  | "Oklahoma City" | "St. Louis";

export type City = {
  lat: number;
  lng: number;
  state: string;
  abbr: string;
};

export const US_CITIES: Record<CityKey, City> = {
  "Los Angeles":    { lat: 34.0522,  lng: -118.2437, state: "California",    abbr: "LA"  },
  "San Francisco":  { lat: 37.7749,  lng: -122.4194, state: "California",    abbr: "SF"  },
  "Seattle":        { lat: 47.6062,  lng: -122.3321, state: "Washington",    abbr: "SEA" },
  "Portland":       { lat: 45.5051,  lng: -122.6750, state: "Oregon",        abbr: "PDX" },
  "Salt Lake City": { lat: 40.7608,  lng: -111.8910, state: "Utah",          abbr: "SLC" },
  "Las Vegas":      { lat: 36.1699,  lng: -115.1398, state: "Nevada",        abbr: "LAS" },
  "Phoenix":        { lat: 33.4484,  lng: -112.0740, state: "Arizona",       abbr: "PHX" },
  "Albuquerque":    { lat: 35.0844,  lng: -106.6504, state: "New Mexico",    abbr: "ABQ" },
  "Denver":         { lat: 39.7392,  lng: -104.9903, state: "Colorado",      abbr: "DEN" },
  "Dallas":         { lat: 32.7767,  lng: -96.7970,  state: "Texas",         abbr: "DAL" },
  "Houston":        { lat: 29.7604,  lng: -95.3698,  state: "Texas",         abbr: "HOU" },
  "Oklahoma City":  { lat: 35.4676,  lng: -97.5164,  state: "Oklahoma",      abbr: "OKC" },
  "Kansas City":    { lat: 39.0997,  lng: -94.5786,  state: "Missouri",      abbr: "KC"  },
  "St. Louis":      { lat: 38.6270,  lng: -90.1994,  state: "Missouri",      abbr: "STL" },
  "Chicago":        { lat: 41.8781,  lng: -87.6298,  state: "Illinois",      abbr: "CHI" },
  "Memphis":        { lat: 35.1495,  lng: -90.0490,  state: "Tennessee",     abbr: "MEM" },
  "Nashville":      { lat: 36.1627,  lng: -86.7816,  state: "Tennessee",     abbr: "BNA" },
  "Atlanta":        { lat: 33.7490,  lng: -84.3880,  state: "Georgia",       abbr: "ATL" },
  "New York":       { lat: 40.7128,  lng: -74.0060,  state: "New York",      abbr: "NYC" },
  "Miami":          { lat: 25.7617,  lng: -80.1918,  state: "Florida",       abbr: "MIA" },
};

export type DriverStatus = "available" | "on-route" | "break" | "off-duty";

export type Driver = {
  id: string;
  name: string;
  initials: string;
  location: CityKey;
  status: DriverStatus;
  totalMiles: number;
  weeklyProfit: number;
  monthlyProfit: number;
  efficiency: number;
  deadheadMiles: number;
  deadheadPct: number;
  currentRoute?: string;
  hoursOfService: number;
  truckId: string;
  rating: number;
};

export const DRIVERS: Driver[] = [
  {
    id: "D001", name: "Marcus Johnson",   initials: "MJ",
    location: "Los Angeles", status: "on-route",
    totalMiles: 124500, weeklyProfit: 4820, monthlyProfit: 19280,
    efficiency: 94.2, deadheadMiles: 234, deadheadPct: 6.8,
    currentRoute: "LA → Phoenix → Dallas", hoursOfService: 62, truckId: "TRK-441", rating: 4.9,
  },
  {
    id: "D002", name: "Sarah Chen",       initials: "SC",
    location: "Dallas", status: "available",
    totalMiles: 98700, weeklyProfit: 3960, monthlyProfit: 15840,
    efficiency: 91.5, deadheadMiles: 312, deadheadPct: 9.4,
    hoursOfService: 54, truckId: "TRK-228", rating: 4.7,
  },
  {
    id: "D003", name: "Robert Martinez",  initials: "RM",
    location: "Chicago", status: "on-route",
    totalMiles: 156200, weeklyProfit: 5340, monthlyProfit: 21360,
    efficiency: 96.1, deadheadMiles: 142, deadheadPct: 4.2,
    currentRoute: "Chicago → Nashville → Atlanta", hoursOfService: 68, truckId: "TRK-112", rating: 5.0,
  },
  {
    id: "D004", name: "Amanda Foster",    initials: "AF",
    location: "Atlanta", status: "break",
    totalMiles: 87300, weeklyProfit: 3120, monthlyProfit: 12480,
    efficiency: 88.3, deadheadMiles: 445, deadheadPct: 12.1,
    hoursOfService: 70, truckId: "TRK-387", rating: 4.4,
  },
  {
    id: "D005", name: "David Kim",        initials: "DK",
    location: "Seattle", status: "available",
    totalMiles: 112800, weeklyProfit: 4380, monthlyProfit: 17520,
    efficiency: 93.7, deadheadMiles: 198, deadheadPct: 7.2,
    hoursOfService: 45, truckId: "TRK-556", rating: 4.8,
  },
  {
    id: "D006", name: "Lisa Torres",      initials: "LT",
    location: "Houston", status: "on-route",
    totalMiles: 203400, weeklyProfit: 5780, monthlyProfit: 23120,
    efficiency: 97.4, deadheadMiles: 89, deadheadPct: 3.1,
    currentRoute: "Houston → Memphis → Nashville", hoursOfService: 58, truckId: "TRK-089", rating: 4.9,
  },
  {
    id: "D007", name: "James Wilson",     initials: "JW",
    location: "Denver", status: "available",
    totalMiles: 76500, weeklyProfit: 2890, monthlyProfit: 11560,
    efficiency: 85.9, deadheadMiles: 567, deadheadPct: 14.7,
    hoursOfService: 30, truckId: "TRK-773", rating: 4.2,
  },
  {
    id: "D008", name: "Emily Rodriguez",  initials: "ER",
    location: "Miami", status: "off-duty",
    totalMiles: 141700, weeklyProfit: 0, monthlyProfit: 14420,
    efficiency: 89.6, deadheadMiles: 0, deadheadPct: 0,
    hoursOfService: 70, truckId: "TRK-614", rating: 4.6,
  },
];

// Alias used by the dashboard — extends Driver with dashboard-specific fields
export type MockDriver = {
  id: string;
  name: string;
  status: "available" | "on-route" | "break";
  currentCity: string;
  route?: string;
  weeklyProfit: number;
  weeklyMiles: number;
  efficiency: number;
};

export const MOCK_DRIVERS: MockDriver[] = [
  { id: "D001", name: "Marcus Johnson",  status: "on-route",  currentCity: "Los Angeles", route: "LA → Phoenix → Dallas",          weeklyProfit: 4820, weeklyMiles: 2340, efficiency: 94 },
  { id: "D002", name: "Sarah Chen",      status: "available", currentCity: "Dallas",      route: undefined,                        weeklyProfit: 3960, weeklyMiles: 1870, efficiency: 91 },
  { id: "D003", name: "Robert Martinez", status: "on-route",  currentCity: "Chicago",     route: "Chicago → Nashville → Atlanta",   weeklyProfit: 5340, weeklyMiles: 2810, efficiency: 96 },
  { id: "D004", name: "Amanda Foster",   status: "break",     currentCity: "Atlanta",     route: undefined,                        weeklyProfit: 3120, weeklyMiles: 1540, efficiency: 88 },
  { id: "D005", name: "David Kim",       status: "available", currentCity: "Seattle",     route: undefined,                        weeklyProfit: 4380, weeklyMiles: 2100, efficiency: 93 },
  { id: "D006", name: "Lisa Torres",     status: "on-route",  currentCity: "Houston",     route: "Houston → Memphis → Nashville",   weeklyProfit: 5780, weeklyMiles: 3020, efficiency: 97 },
  { id: "D007", name: "James Wilson",    status: "available", currentCity: "Denver",      route: undefined,                        weeklyProfit: 2890, weeklyMiles: 1320, efficiency: 85 },
  { id: "D008", name: "Emily Rodriguez", status: "break",     currentCity: "Miami",       route: undefined,                        weeklyProfit: 3450, weeklyMiles: 1680, efficiency: 89 },
  { id: "D009", name: "Carlos Nguyen",   status: "on-route",  currentCity: "Phoenix",     route: "Phoenix → Albuquerque → Dallas", weeklyProfit: 4100, weeklyMiles: 1950, efficiency: 92 },
  { id: "D010", name: "Tanya Brooks",    status: "available", currentCity: "Nashville",   route: undefined,                        weeklyProfit: 3700, weeklyMiles: 1780, efficiency: 90 },
];

export type OptimizationMethod = "chain" | "triangle";

export type Route = {
  id: string;
  driverId: string;
  origin: CityKey;
  destination: CityKey;
  distance: number;
  profit: number;
  deadheadMiles: number;
  loadWeight: number;
  commodity: string;
  pickupTime: string;
  deliveryTime: string;
  score: number;
  method: OptimizationMethod;
};

export const RECOMMENDED_ROUTES: Route[] = [
  {
    id: "R001", driverId: "D002",
    origin: "Dallas", destination: "Nashville",
    distance: 643, profit: 2840, deadheadMiles: 45,
    loadWeight: 42000, commodity: "Automotive Parts",
    pickupTime: "2024-01-15 08:00", deliveryTime: "2024-01-16 14:00",
    score: 96.4, method: "triangle",
  },
  {
    id: "R002", driverId: "D005",
    origin: "Seattle", destination: "Salt Lake City",
    distance: 840, profit: 3120, deadheadMiles: 22,
    loadWeight: 38000, commodity: "Electronics",
    pickupTime: "2024-01-15 10:00", deliveryTime: "2024-01-16 20:00",
    score: 94.1, method: "chain",
  },
  {
    id: "R003", driverId: "D007",
    origin: "Denver", destination: "Kansas City",
    distance: 600, profit: 2450, deadheadMiles: 78,
    loadWeight: 44000, commodity: "Food & Beverage",
    pickupTime: "2024-01-15 09:30", deliveryTime: "2024-01-16 18:00",
    score: 89.7, method: "triangle",
  },
  {
    id: "R004", driverId: "D002",
    origin: "Dallas", destination: "Atlanta",
    distance: 781, profit: 3560, deadheadMiles: 130,
    loadWeight: 40000, commodity: "Retail Goods",
    pickupTime: "2024-01-15 12:00", deliveryTime: "2024-01-17 06:00",
    score: 82.3, method: "chain",
  },
  {
    id: "R005", driverId: "D005",
    origin: "Seattle", destination: "Las Vegas",
    distance: 1120, profit: 4100, deadheadMiles: 200,
    loadWeight: 35000, commodity: "Construction Materials",
    pickupTime: "2024-01-15 06:00", deliveryTime: "2024-01-17 02:00",
    score: 76.8, method: "chain",
  },
];

export type KPIData = {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  color: "blue" | "cyan" | "emerald" | "amber";
  prefix?: string;
  suffix?: string;
};

export const KPI_DATA: KPIData[] = [
  {
    label: "Total Revenue (MTD)",
    value: "284,720",
    change: 12.4,
    changeLabel: "vs last month",
    color: "emerald",
    prefix: "$",
  },
  {
    label: "Active Routes",
    value: "47",
    change: 8.2,
    changeLabel: "vs yesterday",
    color: "blue",
  },
  {
    label: "Fleet Efficiency",
    value: "94.2",
    change: 3.1,
    changeLabel: "vs last week",
    color: "cyan",
    suffix: "%",
  },
  {
    label: "Deadhead Reduction",
    value: "41.3",
    change: 5.7,
    changeLabel: "vs last month",
    color: "amber",
    suffix: "%",
  },
];

// Profit trend data (last 30 days)
export const PROFIT_TREND = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  chain: Math.round(8000 + Math.sin(i * 0.4) * 2000 + i * 150 + Math.random() * 1000),
  triangle: Math.round(7200 + Math.sin(i * 0.3 + 1) * 1500 + i * 180 + Math.random() * 800),
  traditional: Math.round(5800 + Math.sin(i * 0.5) * 1200 + i * 80 + Math.random() * 600),
}));

// Decision matrix comparison data
export const DECISION_MATRIX_DATA = [
  { label: "Week 1", pathA: 12400, pathB: 9800,  cumA: 12400, cumB: 9800  },
  { label: "Week 2", pathA: 11800, pathB: 10200, cumA: 24200, cumB: 20000 },
  { label: "Week 3", pathA: 10900, pathB: 12800, cumA: 35100, cumB: 32800 },
  { label: "Week 4", pathA: 10200, pathB: 14600, cumA: 45300, cumB: 47400 },
  { label: "Week 5", pathA: 9800,  pathB: 15200, cumA: 55100, cumB: 62600 },
  { label: "Week 6", pathA: 9400,  pathB: 16100, cumA: 64500, cumB: 78700 },
  { label: "Week 7", pathA: 9100,  pathB: 16800, cumA: 73600, cumB: 95500 },
  { label: "Week 8", pathA: 8900,  pathB: 17400, cumA: 82500, cumB: 112900},
];

// Route efficiency by method
export const EFFICIENCY_BY_METHOD = [
  { method: "Chain 3-Driver",    efficiency: 94.2, deadhead: 6.8,  profit: 5200, routes: 847  },
  { method: "Triangle 7-Driver", efficiency: 97.1, deadhead: 3.4,  profit: 5840, routes: 1204 },
  { method: "Traditional",       efficiency: 71.3, deadhead: 28.7, profit: 3100, routes: 623  },
];

// Hourly activity heatmap data
export const HOURLY_ACTIVITY = Array.from({ length: 24 }, (_, h) => ({
  hour: h,
  label: h === 0 ? "12am" : h < 12 ? `${h}am` : h === 12 ? "12pm" : `${h - 12}pm`,
  pickups: Math.round(
    (Math.sin((h - 6) * Math.PI / 12) * 25 + 25) * (h >= 6 && h <= 20 ? 1 : 0.3) +
    Math.random() * 8
  ),
  deliveries: Math.round(
    (Math.sin((h - 8) * Math.PI / 12) * 22 + 22) * (h >= 8 && h <= 22 ? 1 : 0.2) +
    Math.random() * 6
  ),
}));

// Hourly volume — alias used by the dashboard analytics tab (stable, no random)
export const HOURLY_VOLUME = [
  { hour: "12am", pickups:  3, deliveries:  1 },
  { hour:  "1am", pickups:  2, deliveries:  0 },
  { hour:  "2am", pickups:  1, deliveries:  0 },
  { hour:  "3am", pickups:  1, deliveries:  0 },
  { hour:  "4am", pickups:  3, deliveries:  1 },
  { hour:  "5am", pickups:  7, deliveries:  3 },
  { hour:  "6am", pickups: 14, deliveries:  8 },
  { hour:  "7am", pickups: 22, deliveries: 15 },
  { hour:  "8am", pickups: 34, deliveries: 28 },
  { hour:  "9am", pickups: 42, deliveries: 38 },
  { hour: "10am", pickups: 48, deliveries: 45 },
  { hour: "11am", pickups: 51, deliveries: 49 },
  { hour: "12pm", pickups: 47, deliveries: 46 },
  { hour:  "1pm", pickups: 44, deliveries: 43 },
  { hour:  "2pm", pickups: 40, deliveries: 41 },
  { hour:  "3pm", pickups: 38, deliveries: 40 },
  { hour:  "4pm", pickups: 36, deliveries: 42 },
  { hour:  "5pm", pickups: 30, deliveries: 38 },
  { hour:  "6pm", pickups: 22, deliveries: 30 },
  { hour:  "7pm", pickups: 15, deliveries: 22 },
  { hour:  "8pm", pickups: 10, deliveries: 14 },
  { hour:  "9pm", pickups:  7, deliveries:  9 },
  { hour: "10pm", pickups:  5, deliveries:  6 },
  { hour: "11pm", pickups:  4, deliveries:  3 },
];

// Map routes for visualization
export type MapRoute = {
  id: string;
  cities: CityKey[];
  color: string;
  method: OptimizationMethod;
  driverName: string;
  profit: number;
  active: boolean;
};

export const MAP_ROUTES: MapRoute[] = [
  {
    id: "MR001",
    cities: ["Los Angeles", "Phoenix", "Albuquerque", "Dallas"],
    color: "#3b82f6",
    method: "chain",
    driverName: "Marcus Johnson",
    profit: 4820,
    active: true,
  },
  {
    id: "MR002",
    cities: ["Chicago", "Memphis", "Nashville", "Atlanta", "Chicago"],
    color: "#10b981",
    method: "triangle",
    driverName: "Robert Martinez",
    profit: 5340,
    active: true,
  },
  {
    id: "MR003",
    cities: ["Houston", "Memphis", "Nashville"],
    color: "#8b5cf6",
    method: "chain",
    driverName: "Lisa Torres",
    profit: 3980,
    active: true,
  },
  {
    id: "MR004",
    cities: ["Seattle", "Portland", "Salt Lake City", "Las Vegas"],
    color: "#06b6d4",
    method: "chain",
    driverName: "David Kim",
    profit: 3120,
    active: false,
  },
  {
    id: "MR005",
    cities: ["Atlanta", "Nashville", "St. Louis", "Kansas City", "Atlanta"],
    color: "#f59e0b",
    method: "triangle",
    driverName: "Amanda Foster",
    profit: 4200,
    active: false,
  },
];
