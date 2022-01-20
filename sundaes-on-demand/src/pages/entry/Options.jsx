import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import { ScoopOptions } from './ScoopOptions';
import { ToppingOptions } from './ToppingOptions';
import { AlertBanner } from '../common/AlertBanner';
import { pricePerItem } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetail';

export const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => setError(true));
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOptions : ToppingOptions;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItens = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItens}</Row>
    </>
  );
};
