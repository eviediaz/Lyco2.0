import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import JoinRoom from './pages/JoinRoom'
import Room from './pages/Room';
import SocketWrapper from './components/SocketWrapper';
import Contact from './pages/Contact';

import { Drawer } from './components/index';
import { StyledEngineProvider } from '@mui/material/styles';

function App() {
    return (
        <>
            <StyledEngineProvider injectFirst>
                <div>
                    <Drawer/>
                </div>
            </StyledEngineProvider>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<JoinRoom />}></Route>
                    <Route path="/contact" element={<Contact />}></Route>
                    <Route path="/room" element={<JoinRoom />}></Route>
                    <Route path="/room/:roomId" element={ <SocketWrapper> <Room/> </SocketWrapper> }></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;