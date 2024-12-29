import logo from '../../../../assets/images/image3.jpg'
import pre from '../../../../assets/images/pre.png'
const Sponser = () => {
    return (
        <div style={{ textAlign: "center", padding: "20px", color: "#00ffff", fontFamily: "Arial, sans-serif" }}>
            <h2 className="fontclass2" style={{ fontSize: '30px' }}>Organizers</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "10px 0",alignItems:'center' }}>
                {/* <div style={{ fontSize: "20px", fontWeight: "bold",color:'white' }}>DISAI</div> */}
                <img src={logo} alt='' width={120} height={50} />
                <div style={{ fontSize: "30px", fontWeight: "bold", color: 'white' }}>DIGINEXES</div>
            </div>
            <h2 className="fontclass2" style={{ fontSize: '30px' }}>Presenting Sponsors</h2>
            <a
                href="https://www.linkedin.com/company/eidolon-ai/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ffffff", textDecoration: "none", fontSize: "25px", fontWeight: "bold",display:'flex',alignItems:'center',justifyContent:'center',gap:'10px' }}
            >
                <img src={pre} alt='' width={40} height={40} style={{borderRadius:'50%'}} />
                eidolon-ai
            </a>
        </div>
    );
};

export default Sponser;
