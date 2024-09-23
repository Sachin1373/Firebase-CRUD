import React from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Config/Firebase';

function ContactCard({ contact, onEdit }) {
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, 'contacts', id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex'>
      <div key={contact.id} className='flex justify-between items-center bg-yellow-200 w-[461px] h-[60px] rounded-lg p-5'>
        <FaRegCircleUser className='text-4xl text-orange-400' />
        <div>
          <h2>{contact.name}</h2>
          <p>{contact.email}</p>
        </div>
        <div className='flex'>
          <FaEdit className='h-10 w-10 cursor-pointer' onClick={onEdit} />
          <AiFillDelete className='h-10 w-10 cursor-pointer' onClick={() => deleteContact(contact.id)} />
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
