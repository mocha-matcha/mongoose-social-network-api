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

        // const user = await User.findOne({username:req.body.username})

        // user.thoughts.push(dbThoughtData._id);

        res.json(dbThoughtData);


    } catch (error) {
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
        const thought = await Thought.findOneAndUpdate(
          {_id:req.params.thoughtId},
          {$addToSet:{reactions:req.body}},
          {runValidators:true,new:true}
          
          
          )

          if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }

        await thought.save();
        res.json(thought);
    } catch (error) {
        console.log(error);
      res.status(500).json(error);
    }


},
async removeReaction(req,res){
    try {
        
      const thought = await Thought.findOneAndUpdate(
        {_id:req.params.thoughtId},
        {$pull:{reactions:{_id:req.params.reactionId}}},
        {runValidators:true,new:true}
        
        
        )

        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        await thought.save();
        res.json(thought);


    } catch (error) {
        console.log(error);
      res.status(500).json(error);
    }



}

};
