const { Thought,User,reactionSchema } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
        const thought = await Thought.findOne({_id:req.params.thoughtId})

        if (!thought) {
            return res.status(404).json({message: 'There was no thought found with the given id.'});
            
        }

        res.json(thought);

    } catch (error) {
        console.log(error);
      res.status(500).json(error);
    }
  },
  async createThought(req, res) {
    try {
        const dbThoughtData = await Thought.create(req.body);
        res.json(dbThoughtData);
    } catch (err) {
        console.log(error);
      res.status(500).json(error);
    }
  },
  async updateThought(req,res){

try {
    const thoughtToUpdate = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$set: req.body},
        {runValidators:true,new:true}

    );
    if (!thoughtToUpdate) {
        return res.status(404).json({message: 'There was no thought found with the given id.'});
    }
    res.json(thoughtToUpdate);

} catch (error) {
    console.log(error);
    res.status(500).json(error);
}
  },
  async deleteThought(req,res){

    try {
        const thoughtToDelete = await Thought.findByIdAndRemove({_id:req.params.thoughtId});
        if (!thoughtToDelete) {
            return res.status(404).json({message:'There was no thought found with this given id.'});
            
        }

        res.json({message: 'Thought was deleted!'}) ;
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

  },
  async addReaction(req,res){
    try {
        const thought = await Thought.findOne({_id:req.params.thoughtId})
        const reaction = await reactionSchema.create(req.body);
        thought.reactions.push(reaction);
        thought.save(done);
        res.json(thought);
    } catch (err) {
        console.log(error);
      res.status(500).json(error);
    }


},
async removeReaction(req,res){
    try {
        const thought = await Thought.findOne({_id:req.params.userId})
        const reaction = await thought.reactions.find({_id:req.params.reactionId})
        thought.reactions.pull(reaction);
        thought.save(done);
        res.json(thought);
    } catch (err) {
        console.log(error);
      res.status(500).json(error);
    }



}

};
