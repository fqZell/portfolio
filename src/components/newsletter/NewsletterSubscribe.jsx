import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { NewsletterForm } from './NewsletterForm';

const NewsletterSubscribe = () => {

  const MAILCHIMP_URL = `https://gmail.us21.list-manage.com/subscribe/post?u=3e5d03a3cff7bca69bc415b0a&amp;id=64c83101d2&amp;f_id=00f355e1f0;`

  return (
    <MailchimpSubscribe
      url={ MAILCHIMP_URL }
      render={ ( props ) => {
        const { subscribe, status, message } = props || {};
        return (
          <NewsletterForm
            status={ status }
            message={ message }
            onValidated={ formData => subscribe( formData ) }
          />
        );
      } }
    />
  );
};

export default NewsletterSubscribe;