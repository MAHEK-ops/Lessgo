const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTrips = async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      include: {
        participants: { include: { user: { select: { id: true, name: true, travelStyle: true } } } }
      },
      orderBy: { startDate: 'asc' }
    });
    res.json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const createTrip = async (req, res) => {
  const { title, destination, startDate, endDate, interests } = req.body;
  if (!title || !destination || !startDate || !endDate) return res.status(400).json({ error: 'Missing fields' });
  try {
    const trip = await prisma.trip.create({
      data: {
        title,
        destination,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        interests,
        participants: { create: { user: { connect: { id: req.user.id } } } } 
      },
      include: { participants: true }
    });
    res.json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const joinTrips = async (req, res) => {
  const tripId = parseInt(req.params.id, 10);
  const userId = req.user.id;
  try {
    const existing = await prisma.tripParticipant.findFirst({ where: { userId, tripId } });
    if (existing) return res.status(400).json({ error: 'Already joined' });

    const join = await prisma.tripParticipant.create({
      data: {
        trip: { connect: { id: tripId } },
        user: { connect: { id: userId } }
      }
    });
    res.json({ message: 'Joined', join });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getTrips, createTrip, joinTrips };
