import { useState } from 'react';
import { Form, Input, Button } from './СontactForm.styled';

export const ContactForm = ({ onSubmit}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

   
  const handleContact = e => {

    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      
       case 'number':
        setNumber(value);
        break;
      
      default:
        return;
    }
      };

  const handleSubmitContact = e => {
    e.preventDefault();
    onSubmit(name, number);
    // e.target.reset();
    setName('');
    setNumber('');
  };

  
    return (
      <Form onSubmit={handleSubmitContact}>
        <label htmlFor="name">
          Name
          <Input
            value={name}
            onChange={handleContact}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов.
             Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>
        <label htmlFor="number">
          Number
          <Input
            value={number}
            onChange={handleContact}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы,
             тире, круглые скобки и может начинаться с +"
            required
          />
        </label>
        <div>
          <Button type="submit">Add contact</Button>
        </div>
      </Form>
    );
  }

