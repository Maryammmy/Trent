interface CustomDotProps {
  active: boolean;
  onClick: () => void;
}

const CustomDots = ({ active, onClick }: CustomDotProps) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: "8px",
        height: "8px",
        margin: "0 5px",
        borderRadius: "50%",
        backgroundColor: active ? "white" : "rgba(255, 255, 255, 0.6)", // Active dot is red, inactive is blue
        cursor: "pointer",
        transition: "background-color 0.3s",
        position: "absolute",
        top: "-20px",
      }}
    ></div>
  );
};

export default CustomDots;
