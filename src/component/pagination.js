import { get } from "mobx";
import Pagination from "react-bootstrap/Pagination";
import { observer } from "mobx-react-lite";

const range_ = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

function Pagin(props) {
  const page = props.page;
  const totalPages = props.totalPages;
  const max = props.max;
  const maxPages = totalPages > max ? max : totalPages;
  const displayedNumber =
    Math.floor(totalPages / maxPages) !== Math.floor(page / maxPages)
      ? maxPages
      : totalPages % maxPages;
  const range = range_(
    page - (page % maxPages),
    page - (page % maxPages) + displayedNumber - 1,
    1
  );
  const getPage = props.getPage;
  const onClickPage = (e) => {
    getPage(e.target.name);
  };
  const onClickNext = () => {
    if (page + 1 < totalPages) getPage(page + 1);
  };
  const onClickPrev = () => {
    if (page > 0) getPage(page - 1);
  };
  return (
    <Pagination>
      <Pagination.Prev onClick={onClickPrev} />
      {range.map((num) => (
        <Pagination.Item
          name={num}
          active={num === page ? true : false}
          onClick={onClickPage}
        >
          {num}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={onClickNext} />
    </Pagination>
  );
}

export default observer(Pagin);
