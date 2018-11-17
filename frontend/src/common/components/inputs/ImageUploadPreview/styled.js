import styled from 'styled-components';

import palette from 'common/palette';

export const Cont = styled.div``;

export const StyledLabel = styled.label`
  color: ${palette.blue};
  cursor: pointer;
`;

export const StyledInput = styled.input`
  display: none;
`;

export const ButtonTextCont = styled.div`
  display: flex;

  svg {
    margin-right: 5px;
  }
`;

export const HelpTextCont = styled.div`
  font-size: 10px;
  color: ${palette.grey};
`;

export const ImagesCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 25px;
`;

export const ImageCont = styled.div`
  margin-right: 20px;
  margin-bottom: 20px;
  position: relative;

  &:nth-child(4n) {
    margin-right: 0;
  }
`;

export const StyledImg = styled.img`
  width: 88px;
  height: 88px;
  object-fit: cover;
  border: 1px solid ${palette.extraDarkGrey};
`;

export const CloseCont = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;
