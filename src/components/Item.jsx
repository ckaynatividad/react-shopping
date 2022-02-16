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
