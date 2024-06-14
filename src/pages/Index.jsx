import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Text, VStack, Heading, Button, Box } from "@chakra-ui/react";
import { SupabaseAuthUI, useSupabaseAuth } from '../integrations/supabase/auth.jsx';
import { FaRocket } from "react-icons/fa";

const Index = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/user-data');
    }
  }, [session, navigate]);
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Welcome to Your New Project</Heading>
        <Text fontSize="lg">This is your starting point. Let's build something amazing!</Text>
        <Button rightIcon={<FaRocket />} colorScheme="teal" size="lg">
          Get Started
        </Button>
        {!session && (
          <Box width="100%" maxWidth="md" mt={8}>
            <SupabaseAuthUI />
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;