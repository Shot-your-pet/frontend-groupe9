import React from 'react';
import {Button, Typography} from 'antd';
import {Camera} from 'lucide-react';
import {motion} from 'framer-motion';
import {useKeycloak} from "@react-keycloak/web";
import {useNavigate} from "react-router-dom";

const {Title, Text} = Typography;

const LandingPage: React.FC = () => {

    const {keycloak} = useKeycloak()
    const navigate = useNavigate()

    if (keycloak.authenticated) {
        navigate('/timeline')
    }

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 flex flex-col items-center justify-center p-4"
        >
            <div className="flex justify-center items-center flex-col">
                <Camera size={64} className="text-white mb-6 "/>
                <Title level={1} className="!text-white mb-2">
                    Shot Your Pet
                </Title>
                <Text className="text-white text-lg mb-8 block">
                    Capture ton ou tes animaux selon le challenge du jour, et partage avec le avec le monde entier
                </Text>
                <Button
                    type="primary"
                    size="large"
                    onClick={() => keycloak.login()}
                    className="bg-white text-green-500 hover:bg-green-50 border-none"
                >
                    Commencer à shooter
                </Button>
            </div>
        </motion.div>
    );
};

export default LandingPage;