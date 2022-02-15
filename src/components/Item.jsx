import React, { useState } from 'react';

export default function Item({ item, onChange, onDelete }) {
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
        <p style={{ textDecoration: item.done ? 'line-through' : null }}>
          {item.text}
        </p>
        <button type="button" onClick={() => setEdit(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <div>
      <input
        type="checkbox"
        checked={item.done}
        onChange={(e) => {
          onChange({ ...item, done: e.target.checked });
        }}
      />
      {itemDesc}
      <button type="button" onClick={() => onDelete(item.id)}>
        X{' '}
      </button>
    </div>
  );
}
