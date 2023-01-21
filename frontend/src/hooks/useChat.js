/* eslint-disable import/prefer-default-export */

import { useContext } from 'react';
import { ChatApiContext } from '../context/index.js';

export const useChat = () => useContext(ChatApiContext);
