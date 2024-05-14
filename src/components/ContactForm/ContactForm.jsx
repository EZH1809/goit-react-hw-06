import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useId } from "react";
import * as Yup from "yup"
import css from './ContactForm.module.css'

const ContactSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
    number: Yup.string().matches(/^\d{3}-\d{2}-\d{2}$/, {message: "Enter correct phone number: 111-11-11", excludeEmptyString: false,}).required("Required"),
  });

const initialValues = {
    name: "",
    number: "",
  };

const ContactForm = () => {
    
    const dispatch = useDispatch();

    const nameFieldId = useId();
    const numberFieldId = useId();

    const handleSubmit = (values, actions) => {
        dispatch(addContact(values.name, values.number));
        actions.resetForm();
      };

    return (
            <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={ContactSchema}
            >
                <Form className={css.contactForm}>
                    <div className={css.formFieldsContainer}>
                        <label htmlFor={nameFieldId}>Name</label>
                        <Field className={css.formInput} type="text" name="name" id={nameFieldId} />
                        <ErrorMessage name="name" component="div" className={css.formErrorMsg} />
                    </div>
                    <div className={css.formFieldsContainer}>
                        <label htmlFor={numberFieldId}>Number</label>
                        <Field className={css.formInput} type="text" name="number" id={numberFieldId} placeholder="123-45-67" />
                        <ErrorMessage name="number" component="div" className={css.formErrorMsg} />
                    </div>
                    <button type="submit">Add Contact</button>
                </Form>
            </Formik>
    )
}

export default ContactForm