
import profile from "../../assets/logo(3).png";

import "./index.css";

interface Props {
  status: string;
}

export default function Ticket({ status }: Props) {
  const statusColor = status === "active" ? "green" : "red"; // Exemplo de uso

  return (
    <div>
      <div className="ticket-container">
        {/* Exibe o status */}
        <div
          style={{
            backgroundColor: statusColor,
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
          {status.toUpperCase()}
        </div>
        <button className="accept">Aceitar</button>
        <div className="profilepick-container">
          <img
            className="profile-pick"
            src={profile}
            alt="profile-pick"
          />
        </div>
        {/* Resto do componente permanece o mesmo */}
      </div>
      <hr />
    </div>
  );
}

