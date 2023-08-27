const { Schema, model } = require('mongoose');


const reactionSchema = new Schema(
    {
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: { type: Schema.Types.String, ref: 'user' },
        reactionBody: { type: String, required: true, maxLength: 280 }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: true,
    }
);


module.exports = reactionSchema;
