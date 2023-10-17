interface ButtonProps {
  text: String;
  handleClick: () => void;
}

export default function Button({ text, handleClick }: ButtonProps) {
  return (
    <>
      <button type="button" onClick={handleClick}>
        {text}
      </button>
    </>
  );
}
