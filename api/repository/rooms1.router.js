import  express from "express"
const router = express.Router();
import {getAllRooms,
    getRoomById,
    createRoom,
    changeRoomInfo,
    deleteRoomById}
    from"../repository/rooms1.repository.js"


router.get('/rooms', (reqest, response) => {
    const customers = getAllRooms();
    response.json(customers)
});
router.get('/rooms/:id', async (request, response) => {
    const roomId = request.params.id;
    const searchedRoom = await getRoomById(roomId)
    response.status(200).json(searchedRoom)
});

router.post('/rooms', async (request, response) => {
    const anRoom = request.body;
    await createRoom(anRoom);
    response.status(201).json();
});

router.put('/rooms/:id', async (request, response) => {
    const RoomId = request.params.id;
    const anRoom = request.body;
    await changeRoomInfo(RoomId, anRoom);
    response.status(200).json();
});

router.delete('/rooms/:id', async (request, response) => {
    const RoomId = request.params.id;
    await deleteRoomById(RoomId);
    response.status(200).json();
});
export default router