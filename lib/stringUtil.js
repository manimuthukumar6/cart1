export const lowerCase = input => input ? input.toLowerCase() : '';

export const upperCase = input => input ? input.toUpperCase() : '';

export const capitalizeFirstLetter = input => input ? (input.charAt(0).toUpperCase() + input.slice(1)) : '';

export const trimMaxLength = (input, maxChars) => input ? input.substring(0, maxChars) : '';

export const randomPassword = () => {
  let password = '';
  const possibleAlphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < 4; i++) {
    password += possibleAlphabets.charAt(Math.floor(Math.random() * possibleAlphabets.length));
  }
  for (let i = 0; i < 4; i++) {
    password += Math.floor(Math.random() * 9);
  }
  return password;
};

export const getFirstName = (fullName) => {
  const firstName = fullName.substr(0, fullName.indexOf(' ')) || fullName;
  return firstName;
};

export const getLastName = (fullName) => {
  const lastName = fullName.split(' ').slice(1).join(' ') || '.';
  return lastName;
};
