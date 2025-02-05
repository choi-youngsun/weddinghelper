import { NextApiResponse } from 'next';
import authenticate, { ExtendedNextApiRequest } from '@/api/authenticate';

const handler = (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({ isAuthenticated: true, user: req.user });
};

export default authenticate(handler);
