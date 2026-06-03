export type MachineItem = {
  id: number;
  machineName: string;
  machineType: "Tractor" | "Harvester" | "Irrigation Pump" | "Drone" | "Thresher";
  ownerName: string;
  location: string;
  pricePerHour: number;
  distanceKm: number;
  rating: number;
  status: "Available" | "Booked" | "In Service";
  capacity: string;
};

export const machines: MachineItem[] = [
  {
    id: 1,
    machineName: "Mini Tractor 45HP",
    machineType: "Tractor",
    ownerName: "Rahim Machinery Service",
    location: "Rajshahi Sadar",
    pricePerHour: 850,
    distanceKm: 3.5,
    rating: 4.8,
    status: "Available",
    capacity: "1.5 acre/hour",
  },
  {
    id: 2,
    machineName: "Combine Harvester",
    machineType: "Harvester",
    ownerName: "Green Harvest Agro",
    location: "Naogaon",
    pricePerHour: 2200,
    distanceKm: 18,
    rating: 4.7,
    status: "Available",
    capacity: "2 acre/hour",
  },
  {
    id: 3,
    machineName: "Diesel Irrigation Pump",
    machineType: "Irrigation Pump",
    ownerName: "Bappy Pump Service",
    location: "Rajshahi Local",
    pricePerHour: 450,
    distanceKm: 2.2,
    rating: 4.9,
    status: "Available",
    capacity: "High flow pump",
  },
  {
    id: 4,
    machineName: "Crop Spraying Drone",
    machineType: "Drone",
    ownerName: "AgriDrone BD",
    location: "Rajshahi Sadar",
    pricePerHour: 1500,
    distanceKm: 9,
    rating: 4.6,
    status: "Booked",
    capacity: "10 liter tank",
  },
  {
    id: 5,
    machineName: "Rice Thresher Machine",
    machineType: "Thresher",
    ownerName: "Karim Agro Tools",
    location: "Bogura",
    pricePerHour: 700,
    distanceKm: 25,
    rating: 4.5,
    status: "Available",
    capacity: "900 kg/hour",
  },
];



