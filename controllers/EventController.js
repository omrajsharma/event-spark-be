const EventModel = require('../models/EventModel')

const eventResponseGenerator = (events) => {
    return events.map(
        event => ({
            id: event._id,
            img: event.imgUrl, 
            title: event.title,
        })
    );
}

const getHome = async (req, res) => {
    const currentDate = new Date();
    try {
        const techEvents = await EventModel.find({category: "TECH", endDate: { $gt: currentDate.toISOString() }, status: "ACTIVE"})
        const moviesEvents = await EventModel.find({category: "MOVIE", endDate: { $gt: currentDate.toISOString() }, status: "ACTIVE"})
        const standUpEvents = await EventModel.find({category: "STANDUP", endDate: { $gt: currentDate.toISOString() }, status: "ACTIVE"})
        const musicEvents = await EventModel.find({category: "MUSIC", endDate: { $gt: currentDate.toISOString() }, status: "ACTIVE"})

        const techEventsResponse = eventResponseGenerator(techEvents);
        const moviesEventsResponse = eventResponseGenerator(moviesEvents);;
        const standupEventsResponse = eventResponseGenerator(standUpEvents);;
        const musicEventsResponse = eventResponseGenerator(musicEvents);;

        res.status(200).json({
            data: {
                sections: {
                    tech: techEventsResponse,
                    movie: moviesEventsResponse,
                    standup: standupEventsResponse,
                    music: musicEventsResponse,
                }
            }
        })
    } catch (err) {
        console.log(err);
    }
}

const getEvent = async (req, res) => {
    const eventId = req.params.eventId;

    try {
        const eventDoc = await EventModel.findOne({_id: eventId});

        res.status(200).json({
            data: {title: eventDoc.title,
            desc: eventDoc.desc,
            img: eventDoc.imgUrl,
            location: eventDoc.location,
            startTime: eventDoc.startDate + ' ' + eventDoc.startTime,
            endTime: eventDoc.endDate + ' ' + eventDoc.endTime ,}
        })
    } catch (err) {
        console.log(err);
    }

    res.end();
}

module.exports = {getHome, getEvent}