import styled from 'styled-components';

export const Input = styled.input`
  background: rgba(10, 10, 10, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 16px;
  color: #FFFFFF;
  font-family: 'Univa Nova', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #00FF88;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const Textarea = styled.textarea`
  background: rgba(10, 10, 10, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 16px;
  color: #FFFFFF;
  font-family: 'Univa Nova', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #00FF88;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;
