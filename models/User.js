const { Schema, model } = require('mongoose');

// Schema to create Post model
const userSchema = new Schema(
  {
    id: { type: ObjectId, required: true },
    username: {type: String},
    email: {type:String},
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
    friends: [this]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `commentCount` that gets the amount of comments per post
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Initialize our Post model
const User = model('user', userSchema);

module.exports = Post;
