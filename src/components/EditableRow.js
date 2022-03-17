import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="fullName"
          onChange={handleEditFormChange}
          value={editFormData.fullName}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an address..."
          name="address"
          onChange={handleEditFormChange}
          value={editFormData.address}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a phone number..."
          name="phoneNumber"
          onChange={handleEditFormChange}
          value={editFormData.phoneNumber}
        ></input>
      </td>
      <td>
        <input
          type="email"
          required="required"
          placeholder="Enter an email..."
          name="email"
          onChange={handleEditFormChange}
          value={editFormData.email}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
