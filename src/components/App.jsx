import { Component } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Container } from './Container';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

export class App extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    const saveContacs = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(saveContacs);
    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmit = data => {
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    const contactName = contact.name;
    const isInclude = this.state.contacts.some(
      item => contactName === item.name
    );

    Notify.init({
      position: 'center-top',
    });

    isInclude
      ? Notify.failure(`${contactName} is already in contacts.`)
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));
  };

  onChangeFilter = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  onFilteredList = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  onDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.onFilteredList();

    return (
      <>
        <Container title="Phonebook">
          <ContactForm addContact={this.formSubmit} />
        </Container>

        <Container title="Contacts">
          <Filter value={filter} onChangeFilter={this.onChangeFilter} />
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.onDeleteContact}
          />
        </Container>
      </>
    );
  }
}
