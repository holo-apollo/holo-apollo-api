import styled, { css } from 'styled-components';
import palette from 'common/palette';

const getFormStyles = ({ isSubmitting }) => css`
  ${isSubmitting && 'position: absolute; top: -9999px; left: -9999px;'}
`;

export const StyledForm = styled.form`
  ${getFormStyles};
`;

export const StepsControlsCont = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 55px;

  & > div {
    flex: 1 1 0;
  }
`;

export const FieldCont = styled.div`
  margin-bottom: 40px;
`;

export const SpinnerCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoadingTextCont = styled.div`
  font-size: 14px;
  margin-top: 20px;
`;

export const ErrorCont = styled.div`
  margin-bottom: 20px;
  color: ${palette.red};
  text-align: center;
  font-size: 10px;
`;

export const StepOneCont = styled.div`
  display: ${({ visible }) => (visible ? 'initial' : 'none')};
`;
