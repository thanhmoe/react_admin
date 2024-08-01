import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
   const navigate = useNavigate()

   const handleLogin = () => {
      navigate('/login');
   };

   return (
      <div style={styles.container}>
         <h1 style={styles.heading}>Unauthorized Access</h1>
         <p style={styles.message}>You do not have access to this page.</p>
         <div style={styles.buttonContainer}>
            <Button type="primary" onClick={handleLogin} style={styles.button}>
               Back to Login
            </Button>
         </div>
      </div>
   );
};

const styles = {
   container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
      textAlign: 'center',
   },
   heading: {
      // fontSize: '2em',
      marginBottom: '0.5em',
   },
   message: {
      fontSize: '1.2em',
      marginBottom: '1.5em',
   },
   buttonContainer: {
      display: 'flex',
      gap: '1em',
   },
   button: {
      padding: '0.5em 1.5em',
   },
};

export default UnauthorizedPage;
