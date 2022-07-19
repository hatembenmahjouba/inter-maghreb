import React from 'react';
import { Link } from 'react-router-dom';
import { deleteUser } from '../../redux/user/userActions';
import { useDispatch } from 'react-redux';
import { ReactComponent as Remove } from '../../assets/img/SVG/bin.svg';
import { ReactComponent as Edit } from '../../assets/img/SVG/pencil.svg';

const UsersList = ({ users }) => {
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <table className='data-table'>
      <thead className='data-table__header'>
        <tr>
          <th>PHOTO</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>USER</th>
          <th></th>
        </tr>
      </thead>
      <tbody className='data-table__body'>
        {users.map((user) => (
          <tr key={user._id}>
            <td>
              <img
                className='data-table__img'
                src={user.photo}
                alt={user._id}
              />
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              {user.role === 'admin' ? <span>Admin</span> : <span>Client</span>}
            </td>
            <td>
              <Link to={`/admin/users/${user._id}`}>
                <Edit className='data-table__icon'>Edit</Edit>
              </Link>
              <div onClick={() => deleteHandler(user._id)}>
                <Remove className='data-table__icon' />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default UsersList;
