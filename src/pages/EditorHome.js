import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function EditorHome() {

    const navigate = useNavigate();

    const [ roomId, setRoomId ] = useState('');
    const [ username, setUsername ] = useState('');

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success("Crear Sesión de Clase");
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error("Necesario un Código de Clase y Nombre de Usuario");
            return;
        }

        // redirect
        navigate(`/editor/${roomId}`, {
            state: {
                username
            },
        });
    };

    const handleInputEnter = (e) => {
        if (e.code === "Ingresar") {
            joinRoom();
        }
    };

    return (
        <div className="homePageWrapper">

            <div className="formWrapper">
                <img className="homePageLogo" src="/logo.png" alt="code-sync-logo" />
                <h4 className="mainLabel">Código de Sesión</h4>

                <div className="inputGroup">
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="ID Sesion"
                        onChange={(e) => { setRoomId(e.target.value) }}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                    />

                    <input
                        type="text"
                        className="inputBox"
                        placeholder="Nombre"
                        onChange={(e) => { setUsername(e.target.value) }}
                        value={username}
                        onKeyUp={handleInputEnter}
                    />

                    <button className="btn joinBtn" onClick={joinRoom}>JOIN</button>

                    <span className="createInfo">SOLO SI ERES PROFE &nbsp;
                        <a
                            onClick={createNewRoom}
                            href="google.com"
                            className="createNewBtn">Crear Código de aula
                        </a>
                    </span>
                </div>
            </div>


            <footer>
                <h4>
                    &nbsp; <a href="https://github.com/eviediaz" target='_blank' rel="noreferrer">Dennis Ceballos</a>
                    &nbsp;,
                    &nbsp; <a href="https://github.com/DennisCeballos" target='_blank' rel="noreferrer">Evie Diaz</a>
                </h4>
            </footer>

        </div>
    )
}

export default EditorHome;