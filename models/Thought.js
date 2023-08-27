const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    createdAt:{      type: Date,
        default: Date.now,},
        thoughtText:{required:true,type:String,      maxlength: 280,
            minlength: 1,},
    username:{ required:true,type: Schema.Types.String, ref: 'user'},
    reactions: [reactionSchema]
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
