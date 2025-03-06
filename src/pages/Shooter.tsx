import React, {useEffect, useState} from 'react';
import {Button, Input, Typography} from 'antd';
import {Camera, X} from 'lucide-react';
import Webcam from 'react-webcam';
import {useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import {posterPublication, savePhoto} from "../services/shootService.tsx";
import {CreerPublicationDTO} from "../entity/CreerPublicationDTO.ts";
import {ChallengeDTO} from "../entity/Challenge.ts";
import {getDernierChallenge} from "../services/timelineService.tsx";

const {Title, Text} = Typography;
const {TextArea} = Input;

const Shooter: React.FC = () => {
    const navigate = useNavigate();
    const [photo, setPhoto] = useState<string | null>(null);
    const [idPhoto, setIdPhoto] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState('');
    const webcamRef = React.useRef<Webcam>(null);
    const [challenge, setChallenge] = useState<ChallengeDTO | undefined>();
    const [erreur, setErreur] = useState<string | null>();
    const [loadingCreationPublication, setLoadingCreationPublication] = useState<boolean>(false);
    const [loadingEnvoiePhoto, setLoadingEnvoiePhoto] = useState<boolean>(false);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setPhoto(imageSrc);
        }
    }, [webcamRef]);

    const loadChallenge = async () => {
        try {
            const data: ChallengeDTO = await getDernierChallenge();
            setChallenge(data);
        } catch (err) {
            console.log(err)
            setErreur("Erreur lors de la récupération du challenge");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadChallenge();
    }, [])

    const handleSubmit = async () => {
        if (photo) {
            setLoadingEnvoiePhoto(true)
            try {
                let idPhotoPrise = idPhoto
                if (!idPhoto) {
                    const response = await fetch(photo);
                    const blob = await response.blob();
                    const file = new File([blob], 'photo.jpg', {type: 'image/jpeg'});
                    idPhotoPrise = await savePhoto(file);
                    setIdPhoto(idPhotoPrise);
                }
                setLoadingEnvoiePhoto(false);
                setLoadingCreationPublication(true);
                if (idPhotoPrise) {
                    const creerPublication: CreerPublicationDTO = {
                        idPhoto: idPhotoPrise,
                        datePublication: new Date().toISOString(),
                        description: description
                    }
                    const success = await posterPublication(creerPublication);
                    if (success) {
                        setIdPhoto(undefined);
                        setLoadingCreationPublication(false)
                        navigate('/timeline');
                    } else {
                        console.error("Erreur lors de l'enregistrement de la publication");
                    }
                }
            } catch (e) {
                console.error("Erreur lors de l'envoi de la photo", e);
            } finally {
                setLoadingCreationPublication(false);
                setLoadingEnvoiePhoto(false);
            }
        }
    };

    return (

        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="min-h-screen bg-black"
        >

            <div className="relative">
                {!photo ? (
                    <>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="w-full h-screen object-cover z-50"
                            videoConstraints={{facingMode: "user"}}
                            playsInline
                        />

                        <div
                            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                            <Text className="text-white mb-4 block">{challenge?.intitule}</Text>
                            <Button
                                type="primary"
                                size="large"
                                icon={<Camera size={24}/>}
                                onClick={capture}
                                className="w-16 h-16 rounded-full flex items-center justify-center"
                            />
                        </div>
                    </>
                ) : (
                    <div className="p-4">
                        <img src={photo} alt="Captured" className="w-full rounded-lg mb-4"/>
                        <TextArea
                            placeholder="Ajoutez une description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mb-4"
                            rows={4}
                        />
                        <div className="flex space-x-4">
                            <Button
                                danger
                                icon={<X size={20}/>}
                                onClick={() => setPhoto(null)}
                            >
                                Annuler
                            </Button>
                            <Button
                                type="primary"
                                onClick={handleSubmit}
                                className="flex-1"
                            >
                                Publier
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Shooter;