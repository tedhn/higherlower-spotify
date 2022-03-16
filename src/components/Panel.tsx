import "./Panel.scss";

interface Props {
  render: () => JSX.Element;
}

const Panel: React.FC<Props> = ({ render }) => {
  return <div className="Panel">{render()}</div>;
};

export default Panel;
