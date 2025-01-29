import React from 'react';

const ContactModal: React.FC = () => {
  return (
    <div>
      <h2>Contact Us</h2>
      <div className="flex flex-col space-y-4">
        <a href="mailto:example@example.com" className="text-blue-500 underline">
          Email Us
        </a>
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-green-500 underline">
          WhatsApp Us
        </a>
      </div>
    </div>
  );
};

export default ContactModal;