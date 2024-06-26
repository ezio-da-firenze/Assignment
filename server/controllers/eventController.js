const Event = require("../models/Event");
const Registration = require("../models/Registration");
const User = require("../models/User");

// Controller for admins to add events
const addEvent = async (req, res) => {
    try {
        const { name, location, description, time, category } = req.body;
        // req.user is set in the middleware
        const user = req.user;

        // These four fields are necessary for event
        if (!name || !category || !time || !location) {
            return res
                .status(400)
                .json({ message: "Please enter all necessary fields." });
        }
        const event = await Event.create({
            name,
            location,
            description,
            time,
            category,
            college: user.college,
            createdBy: user.username,
        });

        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        console.error("Error adding event:", error);
        res.status(500).json({
            message: "Failed to add event",
            error: error.message,
        });
    }
};

// Fetch all events
const allEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch events",
            error: error.message,
        });
    }
};

// Fetch event by its id
const getEventById = async (req, res) => {
    const eventId = req.params.id;
    try {
        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch event",
            error: error.message,
        });
    }
};

// Fetch events that user has regietered for
const getMyEvents = async (req, res) => {
    try {
        // req.user is set in the middleware
        const userId = req.user.id;

        // Fetch all events in the registrations table for the user: userId
        const registrations = await Registration.findAll({
            where: { userId },
            attributes: ["eventId"],
        });

        const eventIds = registrations.map(
            (registration) => registration.eventId
        );

        const events = await Event.findAll({
            where: { id: eventIds },
        });

        res.status(200).json({ events });
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Failed to fetch events" });
    }
};

module.exports = { addEvent, allEvents, getEventById, getMyEvents };
