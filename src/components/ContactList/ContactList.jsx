import { useSelector } from 'react-redux';
import Contact from "../Contact/Contact"
import { selectContacts, selectNameFilter } from '../../redux/selectors';
import css from './ContactList.module.css'

const getVisibleContacts = (contacts, filter) => {
  if(filter.length > 0){
    return contacts.filter(({name}) => name.toLowerCase().includes(filter.toLowerCase()));
  }else{
    return contacts;
  }
};

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  const visibleContacts = getVisibleContacts(contacts, filter);

  return (
    <ul className={css.contactList}>
        {visibleContacts.map((contact) => {
            return <Contact key={contact.id} contact={contact} />
        })}
    </ul>
  )
}


export default ContactList