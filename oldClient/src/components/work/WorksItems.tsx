const WorksItems = ({
  item,
}: {
  item: {
    id: number;
    image: string;
    title: string;
    category: string;
    website: string;
  };
}) => {
  return (
    <div className="work__card" key={item.id}>
      <img src={item.image} alt="" className="work__img"></img>
      <h3 className="work__title">{item.title}</h3>
      <a href={item.website} target="_blank" className="work__button">
        Website <i className="bx bx-right-arrow-alt work__button-icon"></i>
      </a>

    </div>
  );
};

export default WorksItems;
