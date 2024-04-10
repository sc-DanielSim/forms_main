import type { NextApiRequest, NextApiResponse } from 'next';
import SgMail from '@sendgrid/mail';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'text/plain' || '');
  SgMail.setApiKey(process.env.SENDGRID_API_TOKEN || '');
  const DEFAULT_CATEGORY = 'Corporate Contact - Prod';

  try {
    const content = JSON.parse(req.body);
    content['categories'] = [process.env.SENDGRID_CONTACT_CATEGORY || DEFAULT_CATEGORY];
    // console.log('_____________ Send email content:', content);

    SgMail.send(content);

    return res.status(200).send({ status: 'success', msg: 'Message sent successfully.' });
  } catch (error) {
    return res.status(405).send({ status: 'fail', msg: 'Message not sent.' });
  }
};

export default handler;
