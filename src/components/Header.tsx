import "./Header.css";

type HeaderProps = {
  headerTitle: string;
};

export default function Header({ headerTitle }: HeaderProps) {
  return (
    <div className="container-header">
      <p className="header-text">{headerTitle}</p>
    </div>
  );
}
