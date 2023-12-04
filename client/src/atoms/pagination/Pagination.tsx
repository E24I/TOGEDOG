import React from "react";
import styled from "styled-components";
import { ReactComponent as LeftArrow } from "../../assets/images/icons/LeftArrow.svg";
import { ReactComponent as RightArrow } from "../../assets/images/icons/RightArrow.svg";

interface OwnProps {
  isPage: number;
  totalPage: number;
  handleFunc: (page: number) => void;
}

const Pagination: React.FC<OwnProps> = ({ isPage, totalPage, handleFunc }) => {
  // const [isPage, setPage] = useState<number>(1); 현재 페이지
  // const [totalPage, setTotalPage] = useState<number>(10); 전체 페이지 수
  // const handleChangePage = (page: number) => {if (page >= 1 && page <= totalPage) setPage(page);};

  const pageList = [];
  if (isPage <= 3) {
    for (let i = 1; i <= 5; i++) {
      pageList.push(i);
    }
  } else if (3 < isPage && isPage < totalPage - 2) {
    for (let i = isPage - 2; i <= isPage + 2; i++) {
      pageList.push(i);
    }
  } else {
    for (let i = totalPage - 4; i <= totalPage; i++) {
      pageList.push(i);
    }
  }

  return (
    <PaginationContainer>
      <PaginationBtn>
        {isPage !== 1 && <LeftArrow onClick={() => handleFunc(isPage - 1)} />}
      </PaginationBtn>
      {pageList.map((el, idx) => {
        if (el >= 1 && el <= totalPage) {
          return (
            <PaginationBtn
              key={idx}
              onClick={() => handleFunc(el)}
              page={isPage === el}
            >
              {el}
            </PaginationBtn>
          );
        } else {
          return <PaginationBtn key={idx} />;
        }
      })}
      <PaginationBtn>
        {isPage !== totalPage && (
          <RightArrow onClick={() => handleFunc(isPage + 1)} />
        )}
      </PaginationBtn>
    </PaginationContainer>
  );
};

export default Pagination;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PaginationBtn = styled.button<{ page?: boolean }>`
  width: 30px;
  height: 30px;
  margin: 5px;
  font-size: 16px;
  font-weight: ${(props) => (props.page ? "600" : "400")};
  display: flex;
  justify-content: center;
  align-items: center;
`;
