import React from "react";
import { CircleBtn, PaginationContainer } from "./Pagination.style";

interface OwnProps {
  isPage: number;
  totalPage: number;
  handleFunc: (page: number) => void;
}

const PaginationCircle: React.FC<OwnProps> = ({
  isPage,
  totalPage,
  handleFunc,
}) => {
  // const [isPage, setPage] = useState<number>(1); 현재 페이지
  // const [totalPage, setTotalPage] = useState<number>(10); 전체 페이지 수
  // const handleChangePage = (page: number) => {if (page >= 1 && page <= totalPage) setPage(page);};

  const pageList = [];
  for (let i = 1; i <= totalPage; i++) {
    pageList.push(i);
  }

  return (
    <PaginationContainer>
      {pageList.map((el, idx) => (
        <CircleBtn
          key={idx}
          onClick={() => handleFunc(el)}
          page={isPage === idx}
        />
      ))}
    </PaginationContainer>
  );
};

export default PaginationCircle;
