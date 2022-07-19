import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$12$.LImbiQCHYqeAw1GIFbkquv2zVBnhrKrn821fVSvOjkF/wBg8fXVO',
    passwordConfirm:
      '$2a$12$.LImbiQCHYqeAw1GIFbkquv2zVBnhrKrn821fVSvOjkF/wBg8fXVO',
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$12$.LImbiQCHYqeAw1GIFbkquv2zVBnhrKrn821fVSvOjkF/wBg8fXVO',
    passwordConfirm:
      '$2a$12$.LImbiQCHYqeAw1GIFbkquv2zVBnhrKrn821fVSvOjkF/wBg8fXVO',
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: '$2a$12$.LImbiQCHYqeAw1GIFbkquv2zVBnhrKrn821fVSvOjkF/wBg8fXVO',
    passwordConfirm:
      '$2a$12$.LImbiQCHYqeAw1GIFbkquv2zVBnhrKrn821fVSvOjkF/wBg8fXVO',
  },
];

export default users;
