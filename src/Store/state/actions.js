export const ADD_CONTACT = text => (
  {
    type: 'ADD_CONTACT',
    text,
  }
);
export const UPDATE_CONTACT = index => (
  {
    type: 'UPDATE_CONTACT',
    index,
  }
);
export const DELETE_CONTACT = index => (
  {
    type: 'DELETE_CONTACT',
    index,
  }
);