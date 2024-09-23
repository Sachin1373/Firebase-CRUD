import React from 'react';
import { ImCross } from 'react-icons/im';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../Config/Firebase';

function Modal({ onClose, onSubmit, contactToEdit }) {
  const formik = useFormik({
    initialValues: {
      name: contactToEdit ? contactToEdit.name : '', 
      email: contactToEdit ? contactToEdit.email : '', 
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: (values) => {
      if (contactToEdit) {
        onSubmit({ ...values, id: contactToEdit.id }); 
      } else {
        onSubmit(values); 
      }
      onClose(); 
    },
  });

  return (
    <div className='flex flex-col h-[200px] w-[350px] bg-white p-5 rounded-lg shadow-lg absolute top-[100px] left-1/2 transform -translate-x-1/2'>
      <ImCross className='h-[20px] w-[20px] cursor-pointer absolute top-2 right-2' onClick={onClose} />
      <div className='flex-grow'>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="border border-gray-300 p-1 rounded w-full text-sm"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-xs">{formik.errors.name}</div>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="border border-gray-300 p-1 rounded w-full text-sm"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs">{formik.errors.email}</div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600 text-sm"
          >
            {contactToEdit ? 'Update Contact' : 'Add Contact'} 
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
