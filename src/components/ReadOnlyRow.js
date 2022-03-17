import React from "react";

const ReadOnlyRow = ({ item, handleEditClick, handleDeleteClick }) => {
  return (
    <tr key={item.id}>
      <td>{item.fullName}</td>
      <td>{item.address}</td>
      <td>{item.phoneNumber}</td>
      <td>{item.email}</td>
      <td>
        <button type="button" onClick={(event) => handleEditClick(event, item)}>
          edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(item.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
