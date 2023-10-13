import React,{useState, useRef, useEffect} from 'react';
import { 
  Button,
  useToast, Box,Alert,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import {Icon} from '@chakra-ui/icons'
import Navbar from '../component/Navbar';
import ReactPlayer from 'react-player';
import LoginForm from '../component/LoginForm';
import cat from '../cat.gif'
export default function Home(){
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isPlaying, setIsPlaying] = useState<string>();
  const togglePlay = () => {
    // setIsPlaying(!isPlaying);
  };
  setTimeout(() => {
    onOpen();
  }, 3000)
  useEffect(() => {
    console.log(isPlaying)
  },[isPlaying])
  return (
    <Box>
      <img src={cat} />
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalBody pb={6} px={0}>
            <LoginForm />
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}