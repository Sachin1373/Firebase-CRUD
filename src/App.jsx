import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "./Config/Firebase";
import ContactCard from './Components/ContactCard';
import Modal from './Components/Modal';

function App() {
  const [data, setdata] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [editContact, setEditContact] = useState(null);

  const openModal = () => {
    setEditContact(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

 
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const contactSnapshot = await getDocs(contactsRef);
        const contactData = contactSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactData);
        setFilteredContacts(contactData); 
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);


  const handleFormSubmit = async (contact) => {
    try {
      if (contact.id) {
        
        const contactRef = doc(db, 'contacts', contact.id);
        await updateDoc(contactRef, {
          name: contact.name,
          email: contact.email,
        });
      } else {
       
        await addDoc(collection(db, 'contacts'), contact);
      }

      
      const contactsRef = collection(db, 'contacts');
      const contactSnapshot = await getDocs(contactsRef);
      const contactData = contactSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContacts(contactData);
      setFilteredContacts(contactData); 
    } catch (error) {
      console.error('Error adding/updating document: ', error);
    }
  };

 
  const openEditModal = (contact) => {
    setEditContact(contact);
    setShowModal(true);
  };

  
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = contacts.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(query) || 
        contact.email.toLowerCase().includes(query)
      );
    });

    setFilteredContacts(filtered); 
  };

  return (
    <>
      <div className='max-w-[461px] mx-auto'>
        <Navbar />
        <div className='flex h-28 gap-5 justify-center'>
          <div className="flex items-center mt-5 gap-5 bg-gray-500 w-[390px] h-[40px] border-solid border-2 border-white rounded-lg px-3">
            <img src="../../Search.png" alt="search-icon" className="w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search Contact" 
              className="bg-transparent text-white w-full outline-none" 
              value={searchQuery}
              onChange={handleSearchChange} 
            />
          </div>
          <div className='mt-3 cursor-pointer' onClick={openModal}>
            <img src="../../add.png" alt="add-icon" />
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          {filteredContacts.map((contact) => (
            <ContactCard 
              key={contact.id} 
              contact={contact} 
              onEdit={() => openEditModal(contact)}
            />
          ))}
        </div>
        {showModal && (
          <Modal 
            onClose={closeModal} 
            onSubmit={handleFormSubmit} 
            contactToEdit={editContact} 
          />
        )}
      </div>
    </>
  );
}

export default App;
