import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import { ScoopOptions } from './ScoopOptions';
import { ToppingOptions } from './ToppingOptions';

export const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        // TODO
      });
  }, [optionType]);

  const ItemComponent = optionType === 'scoops' ? ScoopOptions : ToppingOptions;

  const optionItens = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItens}</Row>;
};
