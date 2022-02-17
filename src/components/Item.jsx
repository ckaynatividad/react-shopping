import React, { useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useItems } from '../context/ListContext';

export default function Item({ onChange, onDelete }) {
  const { item } = useParams();
  const [edit, setEdit] = useState(false);
  let itemDesc;
  if (edit) {
    itemDesc = (
      <>
        <input
          value={item.text}
          onChange={(e) => {
            onChange({
              ...item,
              text: e.target.value,
            });
          }}
        />
        <button type="button" onClick={() => setEdit(false)}>
          Save
        </button>
      </>
    );
  } else {
    itemDesc = (
      <>
        <p className={item.done ? 'done' : null}>
          {item.text}
          <button type="button" onClick={() => setEdit(true)}>
            Edit
          </button>
          <button type="button" onClick={() => onDelete(item.id)}>
            X{' '}
          </button>
        </p>
      </>
    );
  }
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        type="checkbox"
        checked={item.done}
        onChange={(e) => {
          onChange({ ...item, done: e.target.checked });
        }}
      />
      {itemDesc}
    </div>
  );
}
