interface HeaderProps {
  readonly value: string;
}

export const Header = ({ value }: HeaderProps) => {
  return <h1 className="text-2xl font-bold text-gray-900">{value}</h1>;
};
