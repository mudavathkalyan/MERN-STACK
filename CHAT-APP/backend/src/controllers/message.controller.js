import Message from "../models/message.model.js";
import User from "../models/user.model.js";

//show all user except loged one
export const getUsersForSidebar=async(req,res)=>{

    try{
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    }catch(error)
    {
        console.log("Error in getUserFor side bar",error.message);
        res.status(500).json({error:"Internal server error"});
    }

};

//show all messages when click on user
export const getMessages=async(req,res)=>{
    try{
        const {id:otherUser}=req.params;
        const myId=req.user._id;

        const message=await Message.find({
            //filter i.e sender and reciver msg show
            $or:[
                {senderId:myId,reciverId:otherUser},
                {senderId:otherUser,reciverId:myId}
            ]
        })

        res.status(200).json(message)        
    }catch(error){
        console.log("Error in getMessage controller:",error.message);
        res.status(500).json({error:"Internal error"});
    }
};

export const sendMessage=async(req,res)=>{
    try{
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        let imageUrl;
        if(image){
            //upload to cloudinary
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }
        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });
        await newMessage.save();
        res.status(201).json(newMessage);
    }
    catch(error){
        console.log("Error in send message controller:",error.message);
        res.status(500).json({error:"Internal error"});
    }

}