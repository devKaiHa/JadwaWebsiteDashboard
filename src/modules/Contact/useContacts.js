import {
  useGetContactsQuery,
  useGetContactByIdQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} from "../../rtk/contact/ContactApi";

export const useContacts = (filters = {}) => {
  const { data, isLoading, error, refetch } = useGetContactsQuery(filters);

  return {
    contacts: data?.data || [],
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useContactById = (id) => {
  const { data, isLoading, error, refetch } = useGetContactByIdQuery(id, {
    skip: !id,
  });

  return {
    contact: data?.data || null,
    response: data,
    isLoading,
    error,
    refetch,
  };
};

export const useUpdateContact = () => {
  const [updateContact, { isLoading, error, data }] =
    useUpdateContactMutation();

  const handleUpdateContact = async ({ id, payload }) => {
    return await updateContact({ id, data: payload }).unwrap();
  };

  return {
    handleUpdateContact,
    isLoading,
    error,
    data,
  };
};

export const useDeleteContact = () => {
  const [deleteContact, { isLoading, error, data }] =
    useDeleteContactMutation();

  const handleDeleteContact = async (id) => {
    return await deleteContact(id).unwrap();
  };

  return {
    handleDeleteContact,
    isLoading,
    error,
    data,
  };
};
