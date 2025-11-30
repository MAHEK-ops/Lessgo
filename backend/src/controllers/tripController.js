const prisma = require("../prismaClient");


// CREATE TRIP

exports.createTrip = async (req, res) => {
  try {
    const { title, destination, startDate, endDate, interests, maxTravelers } =
      req.body;

    if (!title || !destination || !startDate || !endDate || !maxTravelers) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create trip
    const trip = await prisma.trip.create({
      data: {
        title,
        destination,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        interests: interests || [],
        maxTravelers: Number(maxTravelers),
        createdAt: new Date(),
      },
    });

    // Auto-join the creator
    await prisma.tripParticipant.create({
      data: {
        tripId: trip.id,
        userId: req.user.id,
        role: "creator",
      },
    });

    res.status(201).json({
      message: "Trip created successfully",
      trip,
    });
  } catch (err) {
    console.error("Create Trip Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET ALL TRIPS
exports.getTrips = async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      include: {
        participants: {
          include: { user: true },
        },
      },
      orderBy: { startDate: "asc" },
    });

    res.json(trips);
  } catch (err) {
    console.error("Get Trips Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET TRIP BY ID

exports.getTripById = async (req, res) => {
  try {
    const tripId = Number(req.params.id);

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        participants: {
          include: { user: true },
        },
        chatMessages: {
          include: { user: { select: { id: true, name: true } } },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.json(trip);
  } catch (err) {
    console.error("Get Trip Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET TRIPS BY DESTINATION (string)

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
    });

    res.json(trips);
  } catch (err) {
    console.error("Get Trips By Destination Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// JOIN TRIP

exports.joinTrip = async (req, res) => {
  try {
    const tripId = Number(req.params.id);
    const userId = req.user.id;

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: { participants: true },
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Already joined?
    const already = await prisma.tripParticipant.findUnique({
      where: { tripId_userId: { tripId, userId } },
    });

    if (already) {
      return res.status(400).json({ message: "User already joined this trip" });
    }

    // Check capacity
    if (trip.participants.length >= trip.maxTravelers) {
      return res.status(400).json({ message: "Trip is full" });
    }

    // Add user
    await prisma.tripParticipant.create({
      data: {
        tripId,
        userId,
      },
    });

    res.json({ message: "Joined trip successfully" });
  } catch (err) {
    console.error("Join Trip Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// LEAVE TRIP

exports.leaveTrip = async (req, res) => {
  try {
    const tripId = Number(req.params.id);
    const userId = req.user.id;

    const existing = await prisma.tripParticipant.findUnique({
      where: { tripId_userId: { tripId, userId } },
    });

    if (!existing) {
      return res
        .status(400)
        .json({ message: "User is not part of this trip" });
    }

    await prisma.tripParticipant.delete({
      where: { id: existing.id },
    });

    res.json({ message: "Left trip successfully" });
  } catch (err) {
    console.error("Leave Trip Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
