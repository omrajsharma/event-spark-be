const EventModel = require("../models/EventModel");

const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

const createEvent = async (req, res) => {
  const {
    title,
    desc,
    imgUrl,
    location,
    startDate,
    startTime,
    endDate,
    endTime,
    category,
  } = req.body;

  if (
    title == null ||
    title == undefined ||
    title.length < 5 ||
    title.length > 100
  ) {
    res.status(400).json({
      error:
        "Invalid Title. Add title with more than 5 characters and less than equal 100 characters",
    });
    return;
  }
  if (
    desc == null ||
    desc == undefined ||
    desc.length < 100 ||
    desc.length > 5000
  ) {
    res.status(400).json({
      error:
        "Invalid Description. Add title with more than 100 characters and less than equal 5000 characters",
    });
    return;
  }
  if (!urlPattern.test(imgUrl)) {
    res.status(400).json({ error: "Invalid image url" });
    return;
  }
  if (
    location == null ||
    location == undefined ||
    location.length < 3 ||
    location.length > 100
  ) {
    res.status(400).json({
      error:
        "Invalid Location. Add title with more than 3 characters and less than equal 100 characters",
    });
    return;
  }
  if (startDate == undefined || startDate == null || startDate == "") {
    res.status(400).json({ error: "Invalid Start Date" });
    return;
  }
  const currentDate = new Date();
  const startDateObj = new Date(startDate);
  if (currentDate >= startDateObj) {
    res.status(400).json({
      error:
        "Invalid Start Date. Start date can not be less than equal to today date",
    });
    return;
  }
  if (endDate == undefined || endDate == null || endDate == "") {
    res.status(400).json({ error: "Invalid End Date" });
    return;
  }
  const endDateObj = new Date(endDate);
  if (currentDate >= endDateObj) {
    res.status(400).json({
      error:
        "Invalid End Date. Start date can not be less than equal to today date",
    });
    return;
  }

  try {
    const eventDoc = await EventModel.create({
      title,
      desc,
      imgUrl,
      location,
      startDate,
      startTime,
      endDate,
      endTime,
      category,
    });
    res.status(201).json({
      success: "Event Created",
      data: eventDoc,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "error occured" });
  }

  console.log(req.body);
  res.end();
};

const getEvents = async (req, res) => {
  console.log(req.query);
  const { status } = req.query;

  if (!status) {
    const allEvents = await EventModel.find();

    res.status(200).json({
      data: allEvents,
    });
    return;
  }

  if (status == "ACTIVE") {
    const currentDate = new Date();

    const activeEvents = await EventModel.find({
      status: "ACTIVE",
      startDate: { $gte: currentDate.toISOString() },
      $or: [
        {
          startDate: currentDate.toISOString(),
          startTime: { $gte: currentDate.toLocaleTimeString() },
        },
        { startDate: { $gt: currentDate.toISOString() } },
      ],
    });

    console.log(activeEvents);
    res.status(200).json({
      data: activeEvents,
    });
  }

  if (status === "COMPLETED") {
    const currentDate = new Date();

    const completedEvents = await EventModel.find({
      status: "ACTIVE",
      endDate: { $lt: currentDate.toISOString() },
      $or: [
        {
          endDate: currentDate.toISOString(),
          endTime: { $lt: currentDate.toLocaleTimeString() },
        },
        { endDate: { $lt: currentDate.toISOString() } },
      ],
    });

    console.log(completedEvents);
    res.status(200).json({
      data: completedEvents,
    });
    return;
  }

  if (status === "CANCELLED") {
    const cancelledEvents = await EventModel.find({
        status: "CANCELLED",
    })

    console.log(cancelledEvents);
    res.status(200).json({
      data: cancelledEvents,
    });
    return;
  }
};

const updateEvent = () => {};

module.exports = { createEvent, getEvents, updateEvent };
