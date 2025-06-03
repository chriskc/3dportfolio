// src/components/Loader.tsx

const Loader = () => {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f8f9fa",
                zIndex: 1000,
            }}>
            <div style={{ textAlign: "center" }}>
                <div
                    style={{
                        width: "50px",
                        height: "50px",
                        border: "5px solid #f3f3f3",
                        borderTop: "5px solid #3498db",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                        margin: "0 auto 1rem",
                    }}></div>
                <p>Loading 3D projects...</p>
            </div>
            <style jsx>{`
                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    )
}

export default Loader
