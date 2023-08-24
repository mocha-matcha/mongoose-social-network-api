const { Schema, model } = require('mongoose');



const thoughtSchema = new Schema(
  {
    id: { type: ObjectId, required: true },
    createdAt:{      type: Date,
        default: Date.now,},
    username:{},
    reactions: [this]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
