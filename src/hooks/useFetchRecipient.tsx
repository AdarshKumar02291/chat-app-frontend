import { useState, useEffect } from "react";
import { BASE_URL, getRequest } from "../utils/services";

interface User {
  id: string;
  // Add other relevant fields if necessary
}

interface Chat {
  members: string[];
  // Add other relevant fields if necessary
}

interface RecipientUser {
  firstName: string;
  // Add other relevant fields if necessary
}

export const useFetchRecipient = (chat: Chat, user: User) => {
  const [recipientUser, setRecipientUser] = useState<RecipientUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recipientId = chat?.members?.find((id) => id !== user.id.toString());

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return;
      const res = await getRequest(`${BASE_URL}/v1/user/find/${recipientId}`);

      if (res.error) {
        setError(res.error);
      } else {
        setRecipientUser(res as RecipientUser);
      }
    };

    getUser();
  }, [recipientId]);

  return { recipientUser, error };
};
