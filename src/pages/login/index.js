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
import { useDispatch } from 'react-redux';
import { BsGoogle } from 'react-icons/bs';
import GoogleLogin from 'react-google-login';
import { signInRequest } from '../../store/modules/auth/actions';
import { useToast } from '@chakra-ui/react';
import { store } from '../../store';

export default function Login() {
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const responseGoogleError = response => {
    if (response) {
      toast({
        title: 'Não foi possível logar com o Google',
        description: 'A janela de login do Google foi fechada',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  async function onSignIn(googleUser) {
    setIsLoading(true);
    const tokenID = googleUser.getAuthResponse().id_token;
    dispatch(
      signInRequest({
        tokenGoogle: tokenID,
      })
    );
    setTimeout(() => {
      const { signed } = store.getState().auth;
      console.log(signed);
      if (!signed) {
        toast({
          title: 'Erro ao logar',
          description: 'Erro ao autenticar o usuário',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }, 800);
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
              onFailure={responseGoogleError}
              isSignedIn={true}
              cookiePolicy={'single_host_origin'}
            />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
