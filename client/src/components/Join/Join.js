import React,{useState} from 'react';
import {Link} from 'react-router-dom';


const Join = () =>{
    
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');



    return(
            <>
                <div><input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /> </div>
                <div><input type="text" placeholder="Room" value={room} onChange={(e) => setRoom(e.target.value)} /> </div>
                <Link onClick={e => (!room || !name) ? e.preventDefault() : null} to={`/Chat?name=${name}&room=${room}`}>
                    <button type="submit">Signin</button>
                </Link>
            </>
        )
}

export default Join;