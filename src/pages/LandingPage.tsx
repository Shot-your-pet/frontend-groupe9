import React from 'react';
import { Button, Typography } from 'antd';
import { useKeycloak } from '@react-keycloak/web';
import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

const LandingPage: React.FC = () => {
  const { keycloak } = useKeycloak();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 flex flex-col items-center justify-center p-4"
    >
      <div className="text-center">
        <Camera size={64} className="text-white mb-6" />
        <Title level={1} className="!text-white mb-2">
          BeReal Clone
        </Title>
        <Text className="text-white text-lg mb-8 block">
          Partagez vos moments authentiques avec vos amis
        </Text>
        <Button
          type="primary"
          size="large"
          onClick={() => keycloak.login()}
          className="bg-white text-green-500 hover:bg-green-50 border-none"
        >
          Commencer l'aventure
        </Button>
      </div>
    </motion.div>
  );
};

export default LandingPage;