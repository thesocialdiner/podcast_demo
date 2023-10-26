import '../app/globals.css';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      {children}
    </div>
  );
};

export default Layout;
