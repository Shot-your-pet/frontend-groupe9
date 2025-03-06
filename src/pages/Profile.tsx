import React, {useEffect, useState} from 'react';
import {Avatar, Card, Typography, Button, Modal, Calendar} from 'antd';
import {Settings, LogOut, Camera, X} from 'lucide-react';
import {motion} from 'framer-motion';
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import {useKeycloak} from "@react-keycloak/web";
import {KeycloakProfile} from "keycloak-js";

const {Title, Text} = Typography;

// Mock data for demonstration - replace with actual data from your backend
const mockUserShots = {
    '2024-03-10': {imageUrl: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'},
    '2024-03-15': {imageUrl: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'},
    '2024-03-20': {imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'},
};

dayjs.locale('fr');

const Profile: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<KeycloakProfile>(null);
    const {keycloak} = useKeycloak();

    useEffect(() => {
        if (keycloak.authenticated) {
            keycloak.loadUserInfo().then(userInfo => {
                setUserInfo(userInfo);
            });
        }
    }, [keycloak]);

    const handleAccountSettings = () => {
        keycloak?.accountManagement();
    };

    const handleLogout = () => {
        keycloak?.logout()
    };

    const handleAvatarClick = () => {
        setIsProfileModalOpen(true);
    };

    const handleImageClick = (imageUrl: string, date: string) => {
        setSelectedImage(imageUrl);
        setSelectedDate(date);
    };

    const dateCellRender = (date: Dayjs) => {
        const dateStr = date.format('YYYY-MM-DD');
        const shot = mockUserShots[dateStr];

        if (shot) {
            return (
                <div
                    className="calendar-cell-with-image cursor-pointer"
                    onClick={() => handleImageClick(shot.imageUrl, dateStr)}
                    style={{
                        '--bg-image': `url(${shot.imageUrl})`
                    } as React.CSSProperties}
                >
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
            <span className="text-white font-bold text-lg drop-shadow-lg">
              {date.format('D')}
            </span>
                    </div>
                </div>
            );
        }

        return (
            <div className="w-full h-full min-h-[80px] flex items-center justify-center">
                <span className="text-gray-500">{date.format('D')}</span>
            </div>
        );
    };

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="p-4 max-w-xl mx-auto"
        >
            <Card className="mb-4">
                <div className="flex items-center space-x-4">
                    <div
                        className="relative cursor-pointer"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={handleAvatarClick}
                    >
                        <Avatar
                            size={64}
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80"
                        />
                        {isHovered && (
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                <Camera size={24} className="text-white"/>
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <Title level={4} className="m-0">
                            {userInfo ? userInfo.name : 'Chargement...'}
                        </Title>
                        <Text className="text-gray-500">{userInfo ? userInfo.email : 'Chargement...'}</Text>
                    </div>
                </div>
            </Card>

            <Card className="mb-4 relative z-10" title="Historique de participation">
                <Calendar
                    fullscreen={false}
                    cellRender={dateCellRender}
                    className="custom-calendar"
                />
            </Card>

            <div className="space-y-4">
                <Button
                    icon={<Settings size={20}/>}
                    block
                    className="text-left h-auto py-3"
                    onClick={handleAccountSettings}
                >
                    Paramètres du compte
                </Button>
                <Button
                    icon={<LogOut size={20}/>}
                    block
                    danger
                    className="text-left h-auto py-3"
                    onClick={handleLogout}
                >
                    Déconnexion
                </Button>
            </div>

            <Modal
                title="Changer votre photo de profil"
                open={isProfileModalOpen}
                onCancel={() => setIsProfileModalOpen(false)}
                footer={null}
            >
                <p>Pour changer votre photo de profil, rendez-vous dans les paramètres de votre compte.</p>
                <div className="mt-4 flex justify-end">
                    <Button type="primary" onClick={handleAccountSettings}>
                        Aller aux paramètres
                    </Button>
                </div>
            </Modal>

            <Modal
                open={!!selectedImage}
                onCancel={() => {
                    setSelectedImage(null);
                    setSelectedDate(null);
                }}
                footer={null}
                width={800}
                className="shot-preview-modal"
                closeIcon={<X className="text-white"/>}
            >
                <div className="relative">
                    {selectedImage && (
                        <>
                            <img
                                src={selectedImage}
                                alt={`Photo du ${selectedDate}`}
                                className="w-full rounded-lg"
                            />
                            <div className="absolute top-4 left-4">
                                <Text className="text-white text-lg font-semibold drop-shadow-lg">
                                    {selectedDate && dayjs(selectedDate).format('DD MMMM YYYY')}
                                </Text>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </motion.div>
    );
};

export default Profile;