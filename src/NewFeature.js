import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: white;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #333;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #333;
  border-radius: 4px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 10px 15px 10px 15px;
  margin-right: 10px;   
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const Error = styled.p`
  color: rgb(255, 24, 23);
  margin-bottom: 10px;
`;

function NewFeature({ onSave, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
        setErrorMessage('I\'m sorry, but a Title is required.');
        return;
    }
    
    if (!description.trim()) {
        setErrorMessage('My apologies, but a Description is required.');
        return;
    }

    onSave({ title, description });
    setErrorMessage('');  // Clear error message upon successful validation

    
  };

  return (
    <Container>
      {errorMessage && <Error>{errorMessage}</Error>}  {/* Display error message if it exists */}
      <form onSubmit={handleSubmit}>
        <Label>Title:</Label>
        <Input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <Label>Description:</Label>
        <Textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          rows="5"
        />
        <Button type="submit">Save</Button>
        <Button type="button" onClick={onClose}>Cancel</Button>
      </form>
    </Container>
  );

}

export default NewFeature;
