import React from "react";
import hand from "../../../../assets/images/hand.png";

const When = ({scrollToForm}) => {
    return (
        <div className="fontclass"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(to right, #000, #1b1b1b)",
                padding: "40px 20px",
                color: "#fff",
                textAlign: "center",
                position: "relative",
                marginBottom: '20px'
            }}
        >
            <h1 className="fontclass" style={{ fontSize: "2.5rem", color: "#00e8ff", marginBottom: "20px" }}>
                When
            </h1>
            <div className="fontclass"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "50px",
                    marginBottom: "30px",
                    flexWrap: "wrap",
                }}
            >
                <div>
                    <h2 className="fontclass" style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                        Hackathon Kickoff
                    </h2>
                    <p className='fontclass' style={{ fontSize: "1rem" }}>6:00 PM - Dec 7th 2024</p>
                </div>
                <div>
                    <h2 className="fontclass" style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                        Competition Ends
                    </h2>
                    <p className="fontclass" style={{ fontSize: "1rem" }}>11:00 AM Dec 8th 2024</p>
                </div>
            </div>
            <button
                style={{
                    padding: "10px 30px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#000",
                    backgroundColor: "#00e8ff",
                    borderRadius: "25px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                }}
                onClick={()=>scrollToForm()}
                className="fontclass"
                onMouseOver={(e) => (e.target.style.backgroundColor = "#00c6d8")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#00e8ff")}
            >
                Register Now
            </button>
            <img
                src={hand}
                alt="Hand pointing"
                style={{
                    position: "absolute",
                    right: "10%",
                    bottom: "5%",
                    maxHeight: "350px",
                }}
            />
        </div>
    );
};

export default When;
