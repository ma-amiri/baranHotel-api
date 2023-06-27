import Room from "../models/room1.model.js"
async function getAllRooms(){
    return await Room.findAll(); 
}

async function getRoomById(pRoomId){
    return await Room.findByPk(pRoomId); 
}

async function createRoom({name,maxCount, location,rentPerDay,imgUrl,currentBooking,description}){
    await Room.create({firstName, lastName, email}); 
}


async function changeRoomInfo(pRoomId, pRoom){
    await Room.update(pRoom, {
            where: {
                id: pRoomId
            }
       });       
}

async function deleteRoomById(pRoomId){
    await Room.destroy({
        where: {
          id: pRoomId
        }
       }); 
}

export {
    getAllRooms,
    getRoomById,
    createRoom,
    changeRoomInfo,
    deleteRoomById
}