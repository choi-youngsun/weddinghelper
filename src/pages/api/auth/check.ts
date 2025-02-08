import { NextApiResponse } from 'next';
import authenticate, { ExtendedNextApiRequest } from '@/api/authenticate';

const handler = (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (!req.user) {
    return res.status(401).json({ isAuthenticated: false, user: null });
  }

  return res.status(200).json({ isAuthenticated: true, user: req.user });
};

export default authenticate(handler);
