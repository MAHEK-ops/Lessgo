const prisma = require("../prismaClient");


// GET ALL MESSAGES FOR A TRIP

exports.getMessagesForTrip = async (req, res) => {
  try {
    const tripId = Number(req.params.tripId);

    // Check if trip exists
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Fetch messages
    const messages = await prisma.chatMessage.findMany({
      where: { tripId },
      include: {
        user: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    res.json(messages);
  } catch (err) {
    console.error("Get Messages Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// SEND MESSAGE TO TRIP (REST API fallback)

exports.sendMessageToTrip = async (req, res) => {
  try {
    const tripId = Number(req.params.tripId);
    const userId = req.user.id;
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    // Check if the user is part of this trip
    const isMember = await prisma.tripParticipant.findUnique({
      where: {
        tripId_userId: { tripId, userId },
      },
    });

    if (!isMember) {
      return res
        .status(403)
        .json({ message: "You are not a participant in this trip" });
    }

    // Save message
    const savedMessage = await prisma.chatMessage.create({
      data: {
        tripId,
        userId,
        message,
      },
      include: {
        user: {
          select: { id: true, name: true },
        },
      },
    });

    res.status(201).json({
      message: "Message sent",
      chat: savedMessage,
    });
  } catch (err) {
    console.error("Send Message Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
