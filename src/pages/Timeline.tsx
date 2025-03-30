import React, {useEffect, useState} from 'react';
import {Card, Button, Typography} from 'antd';
import {Camera} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import {PublicationDTO} from "../entity/PublicationDTO.ts";
import {getDernierChallenge, getTimeline} from "../services/timelineService.tsx";
import {ChallengeHistoriqueDTO} from "../entity/ChallengeHistoriqueDTO.ts";
import {API_URL} from "../constantes.ts";
import {useKeycloak} from "@react-keycloak/web";
import {TimelineDTO} from "../entity/TimelineDTO.ts";


const {Title, Text} = Typography;

const Timeline: React.FC = () => {
    const navigate = useNavigate();
    const [publications, setPublications] = useState<PublicationDTO[]>([]);
    const [timeline, setTimeline] = useState<TimelineDTO | undefined>(undefined);
    const [challengeHistorique, setChallengeHistorique] = useState<ChallengeHistoriqueDTO | undefined>();
    const [erreur, setErreur] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const {keycloak} = useKeycloak();

    const loadTimeline = async () => {
        if (!keycloak.token) {
            return;
        }
        try {
            const data: TimelineDTO = await getTimeline(keycloak.token);
            setTimeline(data);
            setPublications(data.content);
        } catch (err) {
            console.log(err)
            setErreur("Erreur lors de la récupération de la timeline");
        } finally {
            setLoading(false);
        }
    }

    const loadChallenge = async () => {
        if (!keycloak.token) {
            return
        }
        try {
            const data: ChallengeHistoriqueDTO = await getDernierChallenge(keycloak.token);
            setChallengeHistorique(data);
        } catch (err) {
            console.log(err)
            setErreur("Erreur lors de la récupération du challenge");
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        loadTimeline();
        loadChallenge();
    }, [])

    const handleLike = (postId: string) => {
        // setPosts(posts.map(post => {
        //     if (post.id === postId) {
        //         return {
        //             ...post,
        //             likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        //             isLiked: !post.isLiked
        //         };
        //     }
        //     return post;
        // }));
    };


    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="p-4 max-w-xl mx-auto"
        >
            <Card className="mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <Title level={4} className="!text-white m-0">
                            Challenge du jour
                        </Title>
                        <Text
                            className="text-white">{challengeHistorique?.challenge?.titre} - {challengeHistorique?.challenge?.description}</Text>
                    </div>
                    <Button
                        type="primary"
                        icon={<Camera size={20}/>}
                        onClick={() => navigate('/shooter')}
                        className="bg-white text-green-500 hover:bg-green-50 border-none"
                    >
                        Shooter
                    </Button>
                </div>
            </Card>

            {publications.length === 0 ? (
                <div className="space-y-4">
                    <Card>
                        <Text className="text-gray-500">
                            Aucune publication pour le moment. Soyez le premier à partager votre moment !
                        </Text>
                    </Card>
                </div>) : (
                <div className="space-y-4">
                    {publications.map(publication => (
                        <Card
                            key={publication.id}
                            cover={
                                <img
                                    alt={publication.content}
                                    src={API_URL + "/images/" + BigInt(publication.image_id).toString()}
                                    className="object-cover w-full h-64"
                                />
                            }
                            actions={[
                                <Button
                                    type="text"
                                    icon={publication.likeUtilisateur ? <HeartFilled className="text-red-500"/> :
                                        <HeartOutlined/>}
                                    onClick={() => handleLike(publication.id)}
                                >
                                    {publication.likeUtilisateur || 0} likes
                                </Button>
                            ]}
                        >
                            <Card.Meta
                                title={publication.author.pseudo}
                                description={publication.content + '\n publié à ' + new Date(publication.published_at || "").toLocaleTimeString('fr-FR', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                })}
                            />
                        </Card>
                    ))}
                </div>)}
        </motion.div>
    );
};

export default Timeline;