import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebook,
  faLine
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Contact = ({ contact, onIconClick }) => {
  const contactsMethods = [
    {
      name: 'instagram',
      data: contact.instagram?.length > 0 ? contact.instagram : null
    },
    { name: 'line', data: contact.line?.length > 0 ? contact.line : null },
    {
      name: 'facebook',
      data: contact.facebook?.length > 0 ? contact.facebook : null
    },
    {
      name: 'webpage',
      data: contact.webpage?.length > 0 ? contact.webpage : null
    },
    {
      name: 'email',
      data: contact.webpage?.length > 0 ? contact.webpage : null
    }
  ];
  const isContactsMethodsNull = contactsMethods.every(
    (contactsMethod) => contactsMethod.data === null
  );

  return (
    <div className="pt-4">
      <p className="text-xs font-bold text-brown-default font-kanit">
        ช่องทางติดต่อ
      </p>
      {isContactsMethodsNull ? (
        <div className="pt-4 text-xs text-brown-default font-kanit text-center">
          ไม่มีข้อมูล
        </div>
      ) : (
        <div className="flex justify-around mt-2 p-4">
          {contactsMethods.map((contactMethod, index) => {
            if (!contactMethod.data) return null;
            const icon =
              contactMethod.name === 'instagram'
                ? faInstagram
                : contactMethod.name === 'line'
                ? faLine
                : contactMethod.name === 'webpage'
                ? faGlobe
                : contactMethod.name === 'email'
                ? faEnvelope
                : faFacebook;

            const style =
              contactMethod.name === 'instagram'
                ? { color: '#E4405F' }
                : contactMethod.name === 'line'
                ? { color: '#00B900' }
                : contactMethod.name === 'webpage'
                ? { color: '#443616' }
                : contactMethod.name === 'email'
                ? { color: '#443616' }
                : { color: '#1877F2' };

            const linkToContact =
              contactMethod.name === 'line'
                ? `https://line.me/R/ti/p/${contactMethod.data[0]}`
                : contactMethod.name === 'webpage'
                ? `http://${contactMethod.data[0]}`
                : contactMethod.name === 'email'
                ? `mailto:${contactMethod.data[0]}`
                : contactMethod.data[0];

            if (contactMethod.data.length > 1) {
              return (
                <FontAwesomeIcon
                  key={`contact-icon-${index}`}
                  className="cursor-pointer "
                  icon={icon}
                  size="xl"
                  inverse
                  style={style}
                  onClick={() => onIconClick(contactMethod.name)}
                />
              );
            } else {
              return (
                <a
                  key={`contact-icon-${index}`}
                  href={linkToContact}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon
                    icon={icon}
                    size="xl"
                    inverse
                    style={style}
                  />
                </a>
              );
            }
          })}
          {/* {emails ? (
          <a href={`mailto:${emails[0]}`}>
            <FontAwesomeIcon icon={faEnvelope} size="xl" />
          </a>
        ) : null}
        {webpages ? (
          <a href={webpages[0]} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGlobe} size="xl" />
          </a>
        ) : null} */}
        </div>
      )}
    </div>
  );
};

export default Contact;
