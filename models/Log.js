import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  action: {
    type: String,
    enum: ['play', 'pause'],
    required: true,
  },
  trackName: String,
  artist: String,
  uri: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Log', logSchema);