const ADD_CONTACT = 'ADD_CONTACT';
const UPDATE_CONTACT = 'UPDATE_CONTACT';
const DELETE_CONTACT = 'DELETE_CONTACT';

const initialState = {
    contacts: [],
};

const ContactReducer = ({state = initialState, action}) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        contacts: [
            ...state.contacts,
            action.contact
        ],
      };
    case UPDATE_CONTACT:
        let contacts = [...state.contacts];
        let indexOfUpdate = contacts.findIndex((contact) =>{
            return contact.title == action.contact.title;
        });
        contacts[indexOfUpdate] = action.contact;
        return {
            ...state,
            contacts: contacts,
        }
    case DELETE_CONTACT:
        return {
            contacts: state.contacts.filter(function(contact) {
                return contact.title != action.contact.title;
            })
        }
    default:
      return state;
  }
};


const addContact = ({contact}) => {
    return {
        type: ADD_CONTACT,
        contact,
    };
};

const updateContact = ({contact}) => {
    return {
        type: UPDATE_CONTACT,
        contact,
    }
};

const deleteContact = ({contact}) => {
    return {
        type: DELETE_CONTACT,
        contact,
    }
};

export default ContactReducer;