import React, { useState } from "react";
import axios from "axios";
import {
  Center,
  Heading,
  HStack,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Input,
  Checkbox,
  Text,
  ModalFooter
} from "@chakra-ui/react";

const Signup = () => {
  const init = {
    name: '',
    email: '',
    password: '',
    number: '',
    age: '',
    gender: '',
  };

  const [userData, setUserData] = useState(init);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [popoverMessage, setPopoverMessage] = useState('');
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/user/register', userData);
      setPopoverMessage(response.data.message);
      onModalClose(); 
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setPopoverMessage(error.response ? error.response.data.message : 'An error occurred.');
      onModalOpen(); // Open modal on error
    }
  };

  if (loading) {
    return <h1>Data is loading.....</h1>;
  }

  return (
    <div>
      <Center onClick={onOpen} fontWeight={"400"} fontSize="15px" w="60px">
        Sign Up
      </Center>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent w="lg" pt="5" rounded="3xl">
          <ModalCloseButton />
          <ModalBody p={"0px 0px "}>
            <Box m={"5px 45px 20px 45px"}>
              <Heading
                fontFamily={"Times, serif"}
                fontWeight="100"
                fontSize={"26px"}
                mb="20px"
                color={"#333368"}
              >
                Create an Account
              </Heading>

              <form onSubmit={handleSubmit}>
                <InputGroup mb="4">
                  <InputLeftAddon children="Name" />
                  <Input name="name" value={userData.name} onChange={handleChange} required />
                </InputGroup>
                <InputGroup mb="4">
                  <InputLeftAddon children="Email" />
                  <Input name="email" type="email" value={userData.email} onChange={handleChange} required />
                </InputGroup>
                <InputGroup mb="4">
                  <InputLeftAddon children="Password" />
                  <Input name="password" type="password" value={userData.password} onChange={handleChange} required minLength='6' />
                </InputGroup>
                <InputGroup mb="4">
                  <InputLeftAddon children="Phone" />
                  <Input name="number" value={userData.number} onChange={handleChange} required  minLength={'10'} maxLength={'10'}/>
                </InputGroup>
                <InputGroup mb="4">
                  <InputLeftAddon children="Age" />
                  <Input name="age" type="number" value={userData.age} onChange={handleChange} required />
                </InputGroup>
                <InputGroup mb="4">
                  <InputLeftAddon children="Gender" />
                  <Input name="gender" value={userData.gender} onChange={handleChange} required />
                </InputGroup>
                <Button type="submit" colorScheme="teal" width="full" onClick={onModalClose}>Create an Account</Button>
              </form>

              {/* Checkbox */}
              <HStack>
                <Checkbox mb={"20px"} mt="20px" size="sm">
                  Get Updates on WhatsApp
                </Checkbox>
                <Image src="https://static.lenskart.com/media/desktop/img/25-July-19/whatsapp.png" w={"22px"} h="22px" />
              </HStack>

              <Center mt={"14px"} fontSize="15px" gap="2">
                Have an account?{" "}
                <Center fontWeight={"500"} textDecoration="underline">
                  Sign In
                </Center>
              </Center>
            </Box>
          </ModalBody>
          <ModalFooter>
            {/* Display the popoverMessage in the footer */}
            <Text mr={4}>{popoverMessage}</Text> {/* Added Text component for styling */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Signup;

