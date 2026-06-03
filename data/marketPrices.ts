export type MarketPrice = {
  crop: string;
  market: string;
  location: string;
  pricePerKg: number;
  demand: "Low" | "Medium" | "High";
  distanceKm: number;
  buyerType: "Local Market" | "District Market" | "Wholesale Buyer";
};

export const marketPrices: MarketPrice[] = [
  {
    crop: "Boro Rice",
    market: "Local Hat Market",
    location: "Rajshahi Local",
    pricePerKg: 28,
    demand: "Medium",
    distanceKm: 4,
    buyerType: "Local Market",
  },
  {
    crop: "Boro Rice",
    market: "Rajshahi District Market",
    location: "Rajshahi Sadar",
    pricePerKg: 32,
    demand: "High",
    distanceKm: 18,
    buyerType: "District Market",
  },
  {
    crop: "Boro Rice",
    market: "Bulk Rice Wholesaler",
    location: "Naogaon",
    pricePerKg: 31,
    demand: "High",
    distanceKm: 34,
    buyerType: "Wholesale Buyer",
  },
  {
    crop: "Tomato",
    market: "Local Vegetable Market",
    location: "Rajshahi Local",
    pricePerKg: 25,
    demand: "Medium",
    distanceKm: 5,
    buyerType: "Local Market",
  },
  {
    crop: "Tomato",
    market: "District Vegetable Hub",
    location: "Rajshahi Sadar",
    pricePerKg: 34,
    demand: "High",
    distanceKm: 20,
    buyerType: "District Market",
  },
  {
    crop: "Tomato",
    market: "Restaurant Buyer Network",
    location: "Dhaka Supply Chain",
    pricePerKg: 32,
    demand: "High",
    distanceKm: 42,
    buyerType: "Wholesale Buyer",
  },
  {
    crop: "Potato",
    market: "Local Potato Market",
    location: "Rajshahi Local",
    pricePerKg: 20,
    demand: "Medium",
    distanceKm: 6,
    buyerType: "Local Market",
  },
  {
    crop: "Potato",
    market: "District Cold Storage Buyer",
    location: "Rajshahi Sadar",
    pricePerKg: 25,
    demand: "High",
    distanceKm: 22,
    buyerType: "District Market",
  },
  {
    crop: "Potato",
    market: "Wholesale Potato Buyer",
    location: "Bogura",
    pricePerKg: 27,
    demand: "High",
    distanceKm: 55,
    buyerType: "Wholesale Buyer",
  },
  {
    crop: "Onion",
    market: "Local Onion Market",
    location: "Rajshahi Local",
    pricePerKg: 40,
    demand: "Medium",
    distanceKm: 5,
    buyerType: "Local Market",
  },
  {
    crop: "Onion",
    market: "District Onion Hub",
    location: "Rajshahi Sadar",
    pricePerKg: 46,
    demand: "High",
    distanceKm: 19,
    buyerType: "District Market",
  },
  {
    crop: "Onion",
    market: "Wholesale Onion Buyer",
    location: "Pabna",
    pricePerKg: 48,
    demand: "High",
    distanceKm: 60,
    buyerType: "Wholesale Buyer",
  },
];


