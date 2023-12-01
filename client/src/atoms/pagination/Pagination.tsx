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
  // const [isPage, setPage] = useState<number>(1);
  // const [totalPage, setTotalPage] = useState<number>(10);
  // const handleChangePage = (page: number) => {setPage(page);};

  const pageList = [];
  for (let i = isPage - 2; i <= isPage + 2; i++) {
    pageList.push(i);
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
              Page={isPage === el}
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

export const PaginationBtn = styled.button<{ Page?: boolean }>`
  width: 30px;
  height: 30px;
  margin: 5px;
  font-size: 16px;
  font-weight: ${(props) => (props.Page ? "600" : "400")};
  display: flex;
  justify-content: center;
  align-items: center;
`;
