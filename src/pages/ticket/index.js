import React, { useState } from 'react';
import {
  HStack,
  Text,
  IconButton,
  useDisclosure,
  Heading,
  CircularProgress,
  Avatar,
  Badge,
  Box,
  Flex,
  Tooltip,
  keyframes,
} from '@chakra-ui/react';
import { HiStatusOnline, HiLocationMarker } from 'react-icons/hi';
import { ViewIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import Table from '../../components/Table';
import Modal from '../../components/Modal';

const Ticket = () => {
  const Indicator = ({ status }) => {
    const greenColor = 'red.500';
    const redColor = 'red.500';
    const blueColor = 'blue.500';
    const orangeColor = 'orange.300';
    const grayColor = 'gray.400';
    const ringScaleMin = 0.33;
    const ringScaleMax = 0.66;
    console.log(status);
    let color;

    if (status) {
      if (status === 1) {
        color = redColor;
      } else if (status === 2) {
        color = blueColor;
      } else if (status === 3) {
        color = grayColor;
      } else if (status === 4) {
        color = orangeColor;
      } else if (status === 5) {
        color = greenColor;
      } else {
        color = blueColor;
      }
    }

    const pulseRing = keyframes`
	0% {
    transform: scale(${ringScaleMin});
  }
	30% {
		transform: scale(${ringScaleMax});
	},
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }`;

    const pulseDot = keyframes`
	0% {
    transform: scale(0.9);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(0.9);
  }
	`;

    return (
      <Tooltip label={`Status: Active`} textTransform="capitalize">
        <Box
          as="div"
          h="24px"
          w="24px"
          position="relative"
          bgColor={color}
          borderRadius="50%"
          _before={
            status === 1 && {
              content: "''",
              position: 'relative',
              display: 'block',
              width: '300%',
              height: '300%',
              boxSizing: 'border-box',
              marginLeft: '-100%',
              marginTop: '-100%',
              borderRadius: '50%',
              bgColor: color,
              animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
            }
          }
          _after={
            status === 1 && {
              animation: `2.25s ${pulseDot} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
            }
          }
        />
      </Tooltip>
    );
  };
  const columns = [
    {
      name: 'Título',
      cell: row => {
        return (
          <Flex align="center">
            <Indicator status={row.id_status} style={{ paddingTop: 15 }} />
            <Box ml="3">
              <Text fontWeight="bold" color="gray.600">
                {row.title}
                {row.id_status === 1 && (
                  <Badge ml="1" fontSize={'.5rem'} colorScheme={'red'}>
                    Novo
                  </Badge>
                )}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {row.description}
              </Text>
            </Box>
          </Flex>
        );
      },
      sortable: true,
    },
    {
      name: 'Soliciado por',
      selector: row => row.id_requester,
      sortable: true,
      omit: true,
    },
    {
      name: 'Prioridade',
      cell: row => {
        return (
          <>
            <Text>
              <Badge
                ml="1"
                colorScheme={row.id_criticidad === 1 ? 'green' : 'orange'}
              >
                {row.id_criticidad === 1 ? (
                  <HiStatusOnline />
                ) : (
                  <HiLocationMarker />
                )}
                {row.id_criticidad}
              </Badge>
            </Text>
          </>
        );
      },
      sortable: true,
    },
    {
      name: 'Ações',
      cell: row => {
        return (
          <HStack spacing={2}>
            <IconButton
              aria-label="Ver paciente"
              icon={<ViewIcon w={4} h={4} color="blue.500" />}
            />
            <IconButton
              aria-label="Editar paciente"
              icon={<EditIcon w={4} h={4} color="yellow.500" />}
            />
            <IconButton
              aria-label="Deletar paciente"
              icon={<DeleteIcon w={4} h={4} color="red.500" />}
              onClick={onOpen}
            />
          </HStack>
        );
      },
    },
  ];
  const data = [
    {
      id: 1,
      title: 'Deu Merda',
      description: '7 dias atrás',
      id_requester: 1,
      id_criticidad: 1,
      id_status: 1,
    },
    {
      id: 2,
      title: 'Muita bosta',
      description: '23 horas atrás',
      id_criticidad: 1,
      id_requester: 1,
      id_status: 2,
    },
    {
      id: 3,
      title: 'deu RUim',
      description: 'Alguns segundos atrás',
      id_requester: 1,
      id_criticidad: 1,
      id_status: 3,
    },
    {
      id: 4,
      title: 'explodiu o pc',
      description: 'Há 1 hora atrás',
      id_requester: 1,
      id_criticidad: 1,
      id_status: 4,
    },
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pending, setPending] = useState(false);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        type="delete"
        title={'Deletar Lucas'}
      >
        <Text>Deseja deletar o paciente?</Text>
      </Modal>
      <Heading as="h4" size="md" pb={3}>
        Lista de Tickets
      </Heading>
      <Table
        columns={columns}
        data={data}
        progressPending={pending}
        progressComponent={
          <CircularProgress p={5} isIndeterminate color="blue.300" />
        }
      />
    </>
  );
};
export default Ticket;
