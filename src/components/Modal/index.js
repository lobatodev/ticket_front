import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  HStack,
} from '@chakra-ui/react';

const ModalComponent = ({
  isOpen,
  onClose,
  children,
  title,
  type,
  focusFull,
  functionHandler,
  ...rest
}) => {
  type = type || 'info';

  const OverlayFocusFull = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  return (
    <Modal
      closeOnOverlayClick={false}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      {...rest}
    >
      {focusFull || type === 'delete' ? <OverlayFocusFull /> : <ModalOverlay />}
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{children}</ModalBody>
        <ModalFooter>
          <HStack>
            {type === 'delete' && (
              <Button onClick={() => functionHandler()} colorScheme="red">
                Deletar
              </Button>
            )}
            {type === 'form' && (
              <Button onClick={() => functionHandler()} colorScheme="blue">
                Salvar
              </Button>
            )}
            <Button onClick={onClose}>Fechar</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalComponent;
