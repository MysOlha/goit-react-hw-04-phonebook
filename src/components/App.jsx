import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import Form from './Form';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('contacts')) ?? [];
    } catch (error) {
      return [];
    }
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (contacts !== setContacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const onAddContact = newName => {
    if (
      contacts.some(
        ({ name }) => name.toLowerCase() === newName.name.toLowerCase()
      )
    ) {
      toast.error(`${newName.name} is alredy in contacts`);
      return;
    }
    setContacts(prevName => [...prevName, newName]);
  };

  const onFilterContact = evt => {
    setFilter(evt.currentTarget.value);
  };

  const getContactList = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const onRemoveContact = idContact => {
    setContacts(contacts.filter(({ id }) => id !== idContact));
  };

  return (
    <>
      <h1
        style={{
          marginTop: '25px',
          textAlign: 'center',
          color: 'rgb(145, 122, 122)',
        }}
      >
        Phonebook
      </h1>
      <Form addToContact={onAddContact} />

      <h2
        style={{
          marginTop: '20px',
          textAlign: 'center',
          color: 'rgb(145, 122, 122)',
        }}
      >
        Contacts:
      </h2>

      {contacts.length !== 0 && (
        <Filter value={filter} filterContacts={onFilterContact} />
      )}

      {contacts.length !== 0 && (
        <Contacts contacts={getContactList()} onRemove={onRemoveContact} />
      )}

      <ToastContainer />
    </>
  );
};

export default App;
