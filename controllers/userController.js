const { User } = require('../models');

module.exports = {

    async getUsers(req, res) { 

        try {
            const user = await User.find();
            res.json(user);
          } catch (err) {
            res.status(500).json(err);
          }        
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({_id:req.params.userId})
    
            if (!user) {
                return res.status(404).json({message: 'There was no user found with the given id.'});
                
            }
    
            res.json(user);
    
        } catch (error) {
            console.log(error);
          res.status(500).json(error);
        }

     },
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            console.log(error);
          res.status(500).json(error);
        }


     },
    async updateUser(req, res) { 
        try {
            const userToUpdate = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {runValidators:true,new:true}
        
            );
            if (!userToUpdate) {
                return res.status(404).json({message: 'There was no user found with the given id.'});
            }
            res.json(userToUpdate);
        
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }


    },
    async deleteUser(req, res) { 

        try {
            const userToDelete = await User.findByIdAndRemove({_id:req.params.userId});
            if (!userToDelete) {
                return res.status(404).json({message:'There was no user found with this given id.'});
                
            }
    
            res.json({message: 'User was deleted!'}) ;
            
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    


    },
    async addFriend(req,res){
        try {
            const user = await User.findOne({_id:req.params.userId})
            const friend = await User.findOne({_id:req.params.friendId})
            user.friends.push(friend);
            user.save(done);
            res.json(user);
        } catch (err) {
            console.log(error);
          res.status(500).json(error);
        }


    },
    async removeFriend(req,res){
        try {
            const user = await User.findOne({_id:req.params.userId})
            const friend = await User.findOne({_id:req.params.friendId})
            user.friends.pull(friend);
            user.save(done);
            res.json(user);
        } catch (err) {
            console.log(error);
          res.status(500).json(error);
        }



    }




};