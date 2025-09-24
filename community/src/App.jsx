import { useState } from 'react'
import Header from './components/Header';
import FoodTruckCard from './components/FoodTruckCard';
import Footer from './components/Footer';
import './App.css'

const foodTrucks = [
  {
    "id": 1,
    "name": "Hyderabadi Biryani Express",
    "region": "Telangana",
    "description": "Authentic Hyderabadi dum biryani with tender mutton and aromatic basmati rice",
    "location": "Downtown Plaza",
    "hours": "11AM - 10PM",
    "rating": "4.9",
    "image": "/hyderabadi.jpg",
    "speciality": "Mutton Biryani",
    "website": "#",
    "dishes": ["Chicken 65", "Haleem", "Qubani Ka Meetha"]
  },
  {
    "id": 2,
    "name": "Andhra Spice Kitchen",
    "region": "Andhra Pradesh",
    "description": "Fiery Andhra cuisine with signature biryanis, curries, and pickles",
    "location": "Tech District",
    "hours": "12PM - 9PM",
    "rating": "4.8",
    "image": "/andhra.jpeg",
    "speciality": "Gongura Mutton",
    "website": "#",
    "dishes": ["Pesarattu", "Andhra Chicken Curry", "Pulihora"]
  },
  {
    "id": 3,
    "name": "Kerala Backwater Bites",
    "region": "Kerala",
    "description": "Coconut-rich Kerala delicacies including appam, fish curry, and sadya",
    "location": "University Ave",
    "hours": "10AM - 8PM",
    "rating": "4.7",
    "image": "kerala.jpg",
    "speciality": "Fish Curry & Appam",
    "website": "#",
    "dishes": ["Puttu", "Kerala Parotta", "Payasam"]
  },
  {
    "id": 4,
    "name": "Tamil Nadu Tiffin Center",
    "region": "Tamil Nadu",
    "description": "Traditional Tamil breakfast and tiffin items with authentic sambar and chutney",
    "location": "Arts Quarter",
    "hours": "6AM - 11AM, 4PM - 8PM",
    "rating": "4.8",
    "image": "tamil.jpg",
    "speciality": "Masala Dosa",
    "website": "#",
    "dishes": ["Idli Sambar", "Vada", "Pongal"]
  },
  {
    "id": 5,
    "name": "Rajasthani Royal Kitchen",
    "region": "Rajasthan",
    "description": "Royal Rajasthani thali with dal bati churma and traditional sweets",
    "location": "River Park",
    "hours": "11AM - 9PM",
    "rating": "4.6",
    "image": "👑",
    "speciality": "Dal Bati Churma",
    "website": "#",
    "dishes": ["Laal Maas", "Ghevar", "Kachori"]
  },
  {
    "id": 6,
    "name": "Bengali Fish & Rice Co.",
    "region": "West Bengal",
    "description": "Fresh fish preparations, rosogulla, and traditional Bengali sweets",
    "location": "Sports Complex",
    "hours": "12PM - 8PM",
    "rating": "4.7",
    "image": "🐟",
    "speciality": "Hilsa Fish Curry",
    "website": "#",
    "dishes": ["Machher Jhol", "Rosogulla", "Mishti Doi"]
  },
  {
    "id": 7,
    "name": "Punjabi Dhaba Express",
    "region": "Punjab",
    "description": "Hearty Punjabi cuisine with butter chicken, naan, and lassi",
    "location": "Business District",
    "hours": "11AM - 10PM",
    "rating": "4.8",
    "image": "🧈",
    "speciality": "Butter Chicken",
    "website": "#",
    "dishes": ["Sarson ka Saag", "Makki di Roti", "Kulfi"]
  },
  {
    "id": 8,
    "name": "Gujarat Thali Junction",
    "region": "Gujarat",
    "description": "Unlimited Gujarati thali with dhokla, thepla, and traditional sweets",
    "location": "City Center",
    "hours": "11AM - 9PM",
    "rating": "4.6",
    "image": "🍽️",
    "speciality": "Gujarati Thali",
    "website": "#",
    "dishes": ["Dhokla", "Thepla", "Khandvi"]
  },
  {
    "id": 9,
    "name": "Mumbai Street Chaat",
    "region": "Maharashtra",
    "description": "Authentic Mumbai street food including vada pav, bhel puri, and pav bhaji",
    "location": "Shopping Mall",
    "hours": "3PM - 11PM",
    "rating": "4.7",
    "image": "🍞",
    "speciality": "Vada Pav",
    "website": "#",
    "dishes": ["Bhel Puri", "Pav Bhaji", "Misal Pav"]
  },
  {
    "id": 10,
    "name": "Kashmiri Valley Flavors",
    "region": "Kashmir",
    "description": "Aromatic Kashmiri cuisine with wazwan specialties and kehwa",
    "location": "Food Truck Row",
    "hours": "12PM - 8PM",
    "rating": "4.8",
    "image": "🏔️",
    "speciality": "Rogan Josh",
    "website": "#",
    "dishes": ["Yakhni", "Kehwa", "Sheer Chai"]
  },
  {
    "id": 11,
    "name": "Goan Coastal Kitchen",
    "region": "Goa",
    "description": "Coastal Goan delicacies with fish curry, sorpotel, and bebinca",
    "location": "Marina District",
    "hours": "11AM - 9PM",
    "rating": "4.5",
    "image": "🏖️",
    "speciality": "Fish Curry Rice",
    "website": "#",
    "dishes": ["Sorpotel", "Bebinca", "Prawn Balchão"]
  },
  {
    "id": 12,
    "name": "Karnataka Filter Coffee Co.",
    "region": "Karnataka",
    "description": "South Indian filter coffee, dosas, and Mysore pak specialties",
    "location": "Farmer's Market",
    "hours": "6AM - 10PM",
    "rating": "4.7",
    "image": "☕",
    "speciality": "Filter Coffee",
    "website": "#",
    "dishes": ["Bisi Bele Bath", "Mysore Pak", "Rava Idli"]
  }
];

function App() {
  // const [count, setCount] = useState(0)

  return (
      <div className="app-container">
      <Header />
      <div className="main-content">
        <div className="cards-grid">
          {foodTrucks.map((truck) => (
            <FoodTruckCard key={truck.id} truck={truck} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default App
