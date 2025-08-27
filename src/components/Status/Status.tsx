export interface StatusProps {
  color?: string;
  size?: number;
}

export const Status = ({ color, size = 10 }: StatusProps) => {
  return (
    <span
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        borderRadius: '50%'
      }}
    />
  );
};
