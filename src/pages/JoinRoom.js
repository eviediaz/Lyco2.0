import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generate } from 'randomstring';
import { Toaster, toast } from "react-hot-toast";

import "./JoinRoom.css";

export default function JoinRoom() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState(() => "");
  const [username, setUsername] = useState(() => "");

  function validarRoom(id){
    //Hay que intentar llamar a la DB para solicitar un RoomId
    return true;
  }

  function handleRoomSubmit(e) {
    e.preventDefault();
    //Validar que existe el room ID

    if (!validarRoom(roomId)) {
      toast.error("Room ID inexistente");
      return;
    }

    if ( !username ){
      toast.error("Tienes que ingresar un nombre para ingresar");
      return;
    }

    navigate(`/room/${roomId}`, { state: { username } });
  }

  function createRoomId(e) {
    try {
      setRoomId( generate(6) );
      toast.success("Se creo una Sesion");

    } catch (exp) {
      console.error(exp);
    }
  }  

  return (
    <div className="joinBoxWrapper">
      <form className="joinBox" onSubmit={handleRoomSubmit}>
        <div className="titulo">
          <img className="elementoTitulo" src="/logo.png" alt="code-sync-logo"/>
          <h1 className="elementoTitulo">SESIONES LYCO</h1>
        </div>
        <div className="joinBoxWarning"></div>
        <p>Codigo de Sesion</p>

        <div className="joinBoxInputWrapper">
          <input
            className="joinBoxInput"
            id="roomIdInput"
            type="text"
            placeholder="Ingresa el ID de Sesion"
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
            value={roomId}
            autoSave="off"
            autoComplete="off"
          />
        </div>

        <div className="joinBoxInputWrapper">
          <input
            className="joinBoxInput"
            id="usernameInput"
            type="text"
            placeholder="Ingresa tu nombre de invitado"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            autoSave="off"
            autoComplete="off"
          />
        </div>

        <button className="joinBoxBtn" type="submit">
          Join
        </button>
        <p>
          Si no tienes codigo de sesion, crea una{" "}
          <span
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={createRoomId}
          >
            sesion propia
          </span>
        </p>
      </form>
      {toast ? '' : <><Toaster/></>}
    </div>
  );
}
