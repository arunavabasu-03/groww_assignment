import NavBar from './NavBar';
import { Loader } from 'lucide-react';

function Loading() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          height: "80vh",
          width: "100vw",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Loader
          style={{
            color: "red",
            fontWeight: "bold",
            height: 100,
            width: 100,
          }}
        />
        <h4>Loading!! Hold tight.</h4>
      </div>
    </div>
  );
}

export default Loading