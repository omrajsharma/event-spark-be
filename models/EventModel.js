const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    imgUrl : {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['TECH', 'MOVIE', 'STANDUP', 'MUSIC'],
        required: true
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'COMPLETED', 'CANCELLED'],
        default: 'ACTIVE',
        required: true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Event', EventSchema)