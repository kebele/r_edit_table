// THANKS TO CHRIS BLAKELY
// https://www.youtube.com/watch?v=dYjdzpZv5yc
import React, { useState, Fragment } from "react";
import "./App.css";
import data from "./mock-data.json";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

function App() {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });
  const [editContactId, setEditContactId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  // METHODLAR

  // ADD
  // tabloya contact/satır ekleme
  // bunun görevi input form alanlarına girilen bilgileri kendi alanalrına isimlendiririp atayıp tek bir nesne halinde tutulması

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };

    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  // addFormData state, input formdaki bilgileri tutacak object, bilgiler girllip submit, handleAddFormSubmit çalışıyor, formdaki bilgileri newContact adında bir nesneye koyuyor, bu nesne ile önceki contacts nesnesini birleştiriyor, newContacts olarak sonrada bunu setContacts olarak contacts olarak atıyor. BU arada bu contacts'ın initial'ı da mock-data.json'dan geliyor.
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.email,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  // EDIT
  // tablodaki satırların editlenmesi
  // tabloda girili bulunan verilerin kendi isimlerine göre editFormData state'ine atıyor
  const handleEditClick = (event, item) => {
    event.preventDefault();
    setEditContactId(item.id);

    const formValues = {
      fullName: item.fullName,
      address: item.address,
      phoneNumber: item.phoneNumber,
      email: item.email,
    };

    setEditFormData(formValues);
  };
  // editFormData içindeki editlenmiş yeni contact bilgisini editFormData state'ine atıyor,
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  // editFormData olan yeni editlenmiş data'nın contacts'a geçirilmesi
  // editContactId bilgisi önemli aynı id'li yere kaydetmeli
  // butun table'i form'içine almıştık, oraya onSubmit olarak bunu koy
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };
    // contacts array'ini newContacts olarak al
    const newContacts = [...contacts];
    //editlediğimiz satırın id'sini al ve contacts'da index'ini bul
    const index = contacts.findIndex((contact) => contact.id === editContactId);
    // newContacs içindeki o id'li bilgiye editlenmiş datayı ata
    newContacts[index] = editedContact;
    //newContacts'ı contacts olarak ana state'e ata
    setContacts(newContacts);
    //editlemek için aldığımız id'yi null'a çek
    setEditContactId(null);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === contactId);
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>address</th>
              <th>phone</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((item) => (
              <Fragment key={item.id}>
                {editContactId === item.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    item={item}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <h2>add a contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullName"
          required
          placeholder="enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="address"
          required
          placeholder="enter a address..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phoneNumber"
          required
          placeholder="enter a phoneNumber..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="email"
          required
          placeholder="enter a email..."
          onChange={handleAddFormChange}
        />
        <button type="submit">add</button>
      </form>
    </div>
  );
}

export default App;
