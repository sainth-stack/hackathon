const Repo = () => {
    return (
        <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#000", color: "#00FFFF", marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'center', width: '100%' }}>
            <h2 style={{ fontSize: "38px" }} className='fontclass'>The Repo</h2>
            <p style={{ fontSize: '18px', alignItems: 'center', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '600px' }} className='fontclass'>
                    Stay updated with cutting-edge developments, new tutorials, and community insights!
                </div>
            </p>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <button style={{ backgroundColor: "#00FFFF", color: "#000", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", width: 'fit-content', display: 'flex', justifyContent: 'center' }} className='fontclass'>
                    Join the Worlds First GenAI Newsletter of DISAI
                </button>
            </div>
        </div>
    );
}

export default Repo;
