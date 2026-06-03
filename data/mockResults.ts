export type ProductListing = {
  id: number;
  cropName: string;
  farmerName: string;
  location: string;
  quantityKg: number;
  pricePerKg: number;
  harvestDate: string;
  deliveryOption: "Pickup" | "Farmer Delivery" | "Transport Partner";
  status: "Available" | "Ordered" | "Delivered";
  rating: number;
};

export const initialProductListings: ProductListing[] = [
  {
    id: 1,
    cropName: "Tomato",
    farmerName: "Bappy",
    location: "Rajshahi, Bangladesh",
    quantityKg: 500,
    pricePerKg: 32,
    harvestDate: "2026-06-05",
    deliveryOption: "Farmer Delivery",
    status: "Available",
    rating: 4.8,
  },
  {
    id: 2,
    cropName: "Boro Rice",
    farmerName: "Rahim Uddin",
    location: "Naogaon, Bangladesh",
    quantityKg: 1200,
    pricePerKg: 31,
    harvestDate: "2026-06-12",
    deliveryOption: "Transport Partner",
    status: "Available",
    rating: 4.6,
  },
  {
    id: 3,
    cropName: "Potato",
    farmerName: "Karim Ali",
    location: "Bogura, Bangladesh",
    quantityKg: 800,
    pricePerKg: 25,
    harvestDate: "2026-06-02",
    deliveryOption: "Pickup",
    status: "Ordered",
    rating: 4.7,
  },
];


