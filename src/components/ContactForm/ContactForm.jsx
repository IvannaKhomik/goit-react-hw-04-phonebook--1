import React, { Component } from 'react';
import shortid from 'shortid';
import { Form, FormLabel, InputField, SubmitBtn } from './ContactForm.styled';

const CONTACT_STATE = {
  name: '',
  number: '',
};

export class ContactForm extends Component {
  state = { ...CONTACT_STATE };

  nameInputId = shortid.generate();
  telInputId = shortid.generate();

  changeInput = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addContact(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ ...CONTACT_STATE });
  };

  render() {
    const { name, number } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormLabel htmlFor={this.nameInputId}>Name</FormLabel>
        <InputField
          type="text"
          name="name"
          value={name}
          id={this.nameInputId}
          onChange={this.changeInput}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <FormLabel htmlFor={this.telInputId}>Number</FormLabel>
        <InputField
          type="tel"
          name="number"
          value={number}
          id={this.telInputId}
          onChange={this.changeInput}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <SubmitBtn type="submit">Add contact</SubmitBtn>
      </Form>
    );
  }
}
