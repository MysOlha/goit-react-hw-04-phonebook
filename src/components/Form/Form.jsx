import { useState } from 'react';
import shortid from 'shortid';
import css from './Form.module.css';

const Form = ({ addToContact }) => {
  const nameFormId = shortid.generate();
  const numberFormId = shortid.generate();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const onHandleInputChangeName = evt => {
    setName(evt.currentTarget.value);
  };

  const onHandleInputChangeNumber = evt => {
    setNumber(evt.currentTarget.value);
  };

  const onSubmitForm = evt => {
    evt.preventDefault();

    addToContact({
      id: shortid.generate(),
      name,
      number,
    });

    // console.log(this.state)
    resetForm();
  };

  return (
    <form onSubmit={onSubmitForm} className={css.form}>
      <label htmlFor={nameFormId} className={css.labelForm}>
        Name{' '}
      </label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onHandleInputChangeName}
        id={nameFormId}
        className={css.inputForm}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <label htmlFor={numberFormId} className={css.labelForm}>
        Number
      </label>
      <input
        type="tel"
        name="number"
        value={number}
        onChange={onHandleInputChangeNumber}
        id={numberFormId}
        className={css.inputForm}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit" className={css.btnForm}>
        Add to contact
      </button>
    </form>
  );
};

export default Form;
