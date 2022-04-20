interface startButtonProps {
  hide?: boolean;
  onClick(): void;
}

export function StartButton({ onClick, hide}: startButtonProps) {
  return (
    <button onClick={() => onClick()} className={hide ? 'hidden' : ''}>
      START
    </button>
  );
}
