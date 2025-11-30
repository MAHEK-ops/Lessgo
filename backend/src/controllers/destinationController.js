const prisma = require("../prismaClient");

// STATIC DESTINATION LIST (since no table)

const DESTINATIONS = [
  {
    name: "Spiti",
    imageUrl: "https://example.com/spiti.jpg",
    description: "A high-altitude cold desert valley with monasteries and adventure roads."
  },
  {
    name: "Goa",
    imageUrl: "https://example.com/goa.jpg",
    description: "India’s beach paradise with nightlife, shacks, and water sports."
  },
  {
    name: "Kerala",
    imageUrl: "https://example.com/kerala.jpg",
    description: "Backwaters, greenery, hill stations and serene houseboats."
  },
  {
    name: "Rajasthan",
    imageUrl: "https://example.com/rajasthan.jpg",
    description: "The royal desert state with forts, cities, culture and camel safaris."
  }
];


// GET ALL DESTINATIONS

exports.getAllDestinations = async (req, res) => {
  try {
    res.json(DESTINATIONS);
  } catch (err) {
    console.error("Get Destinations Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET TRIPS BY DESTINATION NAME

exports.getTripsByDestination = async (req, res) => {
  try {
    const { destination } = req.params;

    const trips = await prisma.trip.findMany({
      where: {
        destination: {
          equals: destination,
          mode: "insensitive",
        },
      },
      include: {
        participants: {
          include: { user: true },
        },
      },
      orderBy: {
        startDate: "asc",
      },
    });

    res.json(trips);
  } catch (err) {
    console.error("Get Trips by Destination Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
