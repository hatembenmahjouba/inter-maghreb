import React from 'react';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../../redux/product/productActions';
import { useDispatch } from 'react-redux';
import { ReactComponent as Remove } from '../../assets/img/SVG/bin.svg';
import { ReactComponent as Edit } from '../../assets/img/SVG/pencil.svg';

const ProductsList = ({ products, count }) => {
  const dispatch = useDispatch();
  const deleteHandler = (slug) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(slug));
    }
  };
  return (
    <table className='data-table'>
      <thead className='data-table__header'>
        <tr>
          <th>Image</th>
          <th>NAME</th>
          <th>Price</th>
          <th>Brand</th>
          <th>Quantity</th>
          <th>{count}</th>
        </tr>
      </thead>
      <tbody className='data-table__body'>
        {products.map((product) => (
          <tr key={product._id}>
            <td>
              <img
                className='data-table__img'
                src={product.image}
                alt={product._id}
              />
            </td>
            <td>
              <Link to={`/products/${product.slug}`} className='btn-text'>
                {product.name}
              </Link>
            </td>
            <td>{product.price}dt</td>
            <td>{product.brand}</td>
            <td>{product.countInStock}</td>

            <td>
              <Link to={`/admin/products/${product.slug}`}>
                <Edit className='data-table__icon'>Edit</Edit>
              </Link>
              <div onClick={() => deleteHandler(product.slug)}>
                <Remove className='data-table__icon' />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ProductsList;
