interface ContentProps {
  children: React.ReactNode;
}

export const Content = ({ children }: ContentProps) => {
  return <div className="flex h-full p-5">{children}</div>;
};
