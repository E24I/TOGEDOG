import React from "react";
import styled from "styled-components";

interface OwnProps {
  isPage: number;
  totalPage: number;
  handleFunc: (page: number) => void;
}

const Pagination: React.FC<OwnProps> = ({ isPage, totalPage, handleFunc }) => {
  // const [isPage, setPage] = useState<number>(1);
  // const handleChangePage = (e) => {setPage(e.currentTarget.textContent)}
  return (
    <PaginationContainer>
      {[1, 2, 3, 4, 5].map((el, idx) => (
        <PaginationBtn key={idx} onClick={() => handleFunc(el)}>
          {el}
        </PaginationBtn>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;

export const PaginationContainer = styled.div`
  border: 1px solid black;
`;

export const PaginationBtn = styled.button`
  border: 1px solid black;
  width: 20px;
  height: 20px;
`;
