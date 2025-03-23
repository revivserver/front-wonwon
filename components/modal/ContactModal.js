import React from 'react';
import {
  faInstagram,
  faFacebook,
  faLine
} from '@fortawesome/free-brands-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContactModal = ({ contact, onClose }) => {
  const icon =
    contact.name === 'instagram'
      ? faInstagram
      : contact.name === 'line'
      ? faLine
      : faFacebook;

  const style =
    contact.name === 'instagram'
      ? { color: '#E4405F' }
      : contact.name === 'line'
      ? { color: '#00B900' }
      : { color: '#1877F2' };

  return (
    <div
      className="relative z-10 w-full"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 transition-opacity bg-opacity-75 backdrop-blur-lg"></div>
      <div className="fixed inset-0 z-10 ">
        <div className="flex items-end justify-center h-full ">
          <div className="flex flex-col overflow-hidden bg-butter-light rounded-t-[24px] shadow-md w-full p-8 h-48">
            <div className="relative ml-auto ">
              <FontAwesomeIcon
                icon={faXmark}
                size="lg"
                className="absolute -top-4 "
                onClick={onClose}
              />
            </div>
            <h3 className="mt-2 mb-4 ml-2 text-xs font-medium leading-6 text-brown-mid font-kanit">
              เลือกช่องทางติดต่อ
            </h3>
            <div className="flex w-full justify-evenly">
              {contact.map((info, index) => {
                const linkToContact =
                  contact.name === 'line'
                    ? `https://line.me/R/ti/p/${info}`
                    : info;

                return (
                  <a
                    key={`contact-info-${index}`}
                    className="flex flex-col"
                    href={linkToContact}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      size="xl"
                      inverse
                      style={style}
                      className="m-2"
                    />
                    <p className="text-base font-medium text-brown-default font-kanit">
                      {info}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
