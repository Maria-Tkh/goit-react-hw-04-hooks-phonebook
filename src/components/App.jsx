import { useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ContactForm } from './СontactForm/СontactForm';
import { ContactList } from './СontactList/СontactList';
import { Filter } from './Filter/Filter';
import { PhonebookTitle, ContactTitle } from './App.styled';

export const App = () => {
  const defaultValue = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];
  
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {

    return (
      JSON.parse(window.localStorage.getItem("contacts")) ?? defaultValue
    );
  });
 
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = ( name, number ) => {
    const newContact = {
      id: uuidv4(),
      name,
      number,
    };

    contacts.some(contact => contact.name === newContact.name)
      ? alert(`${newContact.name} is already in contacts`)
      : setContacts( prevState => [newContact, ...prevState],
      );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
    // console.log(e.currentTarget.value);
  };


  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(contact =>
      contact.id !== contactId)
    )};

  
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div>
      <PhonebookTitle>Phonebook</PhonebookTitle>
      <ContactForm onSubmit={formSubmitHandler} />
      <ContactTitle>Contacts</ContactTitle>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
}

