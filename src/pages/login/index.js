import React, { useState } from 'react';
import {
  Flex,
  Box,
  Stack,
  Link,
  Center,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsGoogle } from 'react-icons/bs';
import GoogleLogin from 'react-google-login';

export default function Login() {
  const responseGoogle = response => {
    console.log(response);
  };
  const [isLoading, setIsLoading] = useState(false);

  async function onSignIn(googleUser) {
    setIsLoading(true);
    const user = {};
    const profile = googleUser.getBasicProfile();
    user.id = profile.getId();
    user.name = profile.getName();
    user.photoUrl = profile.getImageUrl();
    user.email = profile.getEmail();
    // await handleAuthToken(user)
    localStorage.setItem('user', JSON.stringify(user));
    console.log(user);
    console.log(googleUser);
    setIsLoading(false);
  }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Faça login em sua conta</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            sou novo aqui quero <Link color={'blue.400'}>criar uma conta</Link>
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <GoogleLogin
              clientId="743676595291-9ro9uieed6tt0ng9fhdjofoa0o0um1dp.apps.googleusercontent.com"
              render={renderProps => (
                <Button
                  w={'full'}
                  colorScheme={'red'}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  leftIcon={<BsGoogle fill="#fff" />}
                >
                  <Center>
                    <Text>Entrar com Google</Text>
                  </Center>
                </Button>
              )}
              onSuccess={onSignIn}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
