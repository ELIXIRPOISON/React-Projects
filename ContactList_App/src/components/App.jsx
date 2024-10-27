import { useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './ContactForm/ContactForm.module.css';
import {
  addContact,
  deleteContact,
} from '../redux/slices/contactsSlice';
import { setFilter } from '../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectFilters,
} from '../redux/selectors/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector(selectContacts);
  const { filter } = useSelector(selectFilters);

  useEffect(() => {
    localStorage.setItem(
      'contactList',
      JSON.stringify(contacts)
    );
  }, [contacts]);

  const handleChange = e => {
    const { value } = e.target;
    dispatch(
      setFilter({
        filter: value,
      })
    );
  };

  const handleSubmit = e => {
    const name = e.name;
    const number = e.number;
    dispatch(
      addContact({
        name,
        number,
      })
    );
  };

  const handleDelete = id => {
    dispatch(
      deleteContact({
        id,
      })
    );
  };

  const getFilteredContacts = () => {
    const filteredContactList = contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(filter.toLowerCase());
    });
    return filteredContactList;
  };

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#333',
        background: 'lightgrey',
        margin: 20,
        borderRadius: 10,
        paddingBottom: 30,
      }}>
      <h1 className={css.header}>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit} />
      <h2 className={css.contacts}>Contacts</h2>
      <Filter filter={filter} handleChange={handleChange} />
      <ContactList
        contacts={getFilteredContacts()}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
