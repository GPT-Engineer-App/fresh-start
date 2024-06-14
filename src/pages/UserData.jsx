import { useState } from 'react';
import { Container, Heading, VStack, Button, Input, Textarea, Box, Text } from "@chakra-ui/react";
import { useUserDataById, useAddUserData, useUpdateUserData, useDeleteUserData } from '../integrations/supabase/index.js';
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';

const UserData = () => {
  const { session } = useSupabaseAuth();
  const userId = session?.user?.id;
  const { data, isLoading, isError } = useUserDataById(userId);
  const addUserData = useAddUserData();
  const updateUserData = useUpdateUserData();
  const deleteUserData = useDeleteUserData();

  const [newData, setNewData] = useState({ user_data: '', user_id: userId });
  const [updateData, setUpdateData] = useState({ id: '', user_data: '', user_id: userId });

  const handleAdd = () => {
    addUserData.mutate(newData);
    setNewData({ user_data: '', user_id: userId });
  };

  const handleUpdate = () => {
    updateUserData.mutate(updateData);
    setUpdateData({ id: '', user_data: '', user_id: userId });
  };

  const handleDelete = (user_id) => {
    deleteUserData.mutate(user_id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <Container centerContent>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">User Data</Heading>
        
        <Box width="100%">
          <Heading as="h2" size="md">Add New Data</Heading>
          <Textarea
            placeholder="Enter new user data"
            value={newData.user_data}
            onChange={(e) => setNewData({ user_data: e.target.value, user_id: userId })}
          />
          <Button onClick={handleAdd} colorScheme="teal" mt={2}>Add Data</Button>
        </Box>

        <Box width="100%">
          <Heading as="h2" size="md">Update Data</Heading>
          <Input
            placeholder="Enter ID to update"
            value={updateData.id}
            onChange={(e) => setUpdateData({ ...updateData, id: e.target.value })}
          />
          <Textarea
            placeholder="Enter updated user data"
            value={updateData.user_data}
            onChange={(e) => setUpdateData({ ...updateData, user_data: e.target.value })}
          />
          <Button onClick={handleUpdate} colorScheme="teal" mt={2}>Update Data</Button>
        </Box>

        <Box width="100%">
          <Heading as="h2" size="md">Existing Data</Heading>
          {data.map((item) => (
            <Box key={item.id} p={4} borderWidth={1} borderRadius="md" width="100%">
              <Text>ID: {item.id}</Text>
              <Text>Data: {item.user_data}</Text>
              <Button onClick={() => handleDelete(item.user_id)} colorScheme="red" mt={2}>Delete</Button>
            </Box>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default UserData;