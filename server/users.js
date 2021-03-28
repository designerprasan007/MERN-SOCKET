const users = [];


const addUser = ({id, room, name}) =>{
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    const existing = users.find((user) => user.room === room && user.name === name);
    if(existing) return {error:'User Name Already Taken'};
    const user = {id, room, name};
    users.push(user);
    return {user}
}


const removeUser = (id) =>{
    const index = users.findIndex((user) =>  user.id === id );

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}


const getUser = (id) => users.find((user ) =>user.id === id);


const getUserInRoom = (room) => users.filter((user) => user.room === room)


module.exports = { addUser, removeUser, getUser, getUserInRoom}