import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Card, Typography, Button, Calendar} from 'antd';
import {Settings, LogOut, Camera} from 'lucide-react';
import {motion} from 'framer-motion';
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import {useKeycloak} from "@react-keycloak/web";
import {API_URL} from "../constantes.ts";
import {ProfileDTO} from "../entity/ProfileDTO.tsx";
import {getProfileUtilisateur, savePhoto} from "../services/profileService.tsx";

const {Title, Text} = Typography;

// Mock data for demonstration - replace with actual data from your backend
const mockUserShots = {
    '2025-03-10': {imageUrl: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'},
    '2025-03-15': {imageUrl: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'},
    '2025-03-20': {imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'},
};

dayjs.locale('fr');

const Profile: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    // const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [profile, setProfile] = useState<ProfileDTO>();
    const [erreur, setErreur] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const {keycloak} = useKeycloak();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const loadProfile = async () => {
        try {
            const data: ProfileDTO = await getProfileUtilisateur();
            setProfile(data);
        } catch (err) {
            console.log(err)
            setErreur("Erreur lors de la récupération du profile");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProfile();
    }, [])

    const handleAccountSettings = () => {
        keycloak?.accountManagement();
    };

    const handleLogout = () => {
        keycloak?.logout()
    };

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageClick = (imageUrl: string, date: string) => {
        setSelectedImage(imageUrl);
        setSelectedDate(date);
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            const file = files[0];
            try {
                // Appel de votre service pour mettre à jour la photo de profil
                const newAvatar = await savePhoto(file);
                // Par exemple, on met à jour le profile avec la nouvelle image
                setProfile((prev) => prev ? {...prev, avatar: newAvatar} : prev);
                console.log("Nouvelle photo de profil enregistrée :", newAvatar);
            } catch (error) {
                console.error("Erreur lors de la mise à jour de la photo de profil", error);
            }
        }
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
                            src={API_URL + "/images/" + profile?.avatar}
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
                            {profile ? profile?.prenom + " " + profile?.nom.toUpperCase() : 'Chargement...'}
                        </Title>
                        <Text className="text-gray-500">{profile ? profile.pseudo : 'Chargement...'}</Text>
                    </div>
                </div>
            </Card>

            <Card className="mb-4 relative z-10" title="Historique de participation">
                <Calendar
                    fullscreen={false}
                    className="custom-calendar"
                    fullCellRender={(value: Dayjs) => {
                        const dateStr = value.format('YYYY-MM-DD');
                        const shot = mockUserShots[dateStr];
                        return (
                            <div
                                style={{
                                    height: '100%',
                                    position: 'relative',
                                    backgroundImage: shot ? `url(${shot.imageUrl})` : undefined,
                                    backgroundSize: 'cover',
                                    // backgroundPosition: 'center',
                                }}
                            >
                                {/* Vous pouvez choisir d'afficher le numéro du jour par exemple dans un overlay */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: 4,
                                        right: 4,
                                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                        padding: '2px 4px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                    }}
                                >
                                    {value.date()}
                                </div>
                            </div>
                        );
                    }}
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

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={handleFileChange}
            />

            {/*<Modal*/}
            {/*    title="Changer votre photo de profil"*/}
            {/*    open={isProfileModalOpen}*/}
            {/*    onCancel={() => setIsProfileModalOpen(false)}*/}
            {/*    footer={null}*/}
            {/*>*/}
            {/*    <p>Pour changer votre photo de profil, rendez-vous dans les paramètres de votre compte.</p>*/}
            {/*    <div className="mt-4 flex justify-end">*/}
            {/*        <Button type="primary" onClick={handleAccountSettings}>*/}
            {/*            Aller aux paramètres*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*</Modal>*/}

            {/*<Modal*/}
            {/*    open={!!selectedImage}*/}
            {/*    onCancel={() => {*/}
            {/*        setSelectedImage(null);*/}
            {/*        setSelectedDate(null);*/}
            {/*    }}*/}
            {/*    footer={null}*/}
            {/*    width={800}*/}
            {/*    className="shot-preview-modal"*/}
            {/*    closeIcon={<X className="text-white"/>}*/}
            {/*>*/}
            {/*    <div className="relative">*/}
            {/*        {selectedImage && (*/}
            {/*            <>*/}
            {/*                <img*/}
            {/*                    src={selectedImage}*/}
            {/*                    alt={`Photo du ${selectedDate}`}*/}
            {/*                    className="w-full rounded-lg"*/}
            {/*                />*/}
            {/*                <div className="absolute top-4 left-4">*/}
            {/*                    <Text className="text-white text-lg font-semibold drop-shadow-lg">*/}
            {/*                        {selectedDate && dayjs(selectedDate).format('DD MMMM YYYY')}*/}
            {/*                    </Text>*/}
            {/*                </div>*/}
            {/*            </>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</Modal>*/}
        </motion.div>
    );
};

export default Profile;