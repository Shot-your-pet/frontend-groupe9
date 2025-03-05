import React, {useState} from 'react';
import { Card, Button, Typography } from 'antd';
import { Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';


const { Title, Text } = Typography;

interface Post {
  id: string;
  imageUrl: string;
  description: string;
  author: string;
  likes: number;
  isLiked: boolean;
}

const Timeline: React.FC = () => {
  const navigate = useNavigate();
  const todayChallenge = "Montrez votre espace de travail !";

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Mon espace de travail aujourd'hui !",
      author: "John Doe",
      likes: 12,
      isLiked: false
    },
    {
      id: '2',
      imageUrl: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Setup minimaliste",
      author: "Jane Smith",
      likes: 8,
      isLiked: false
    }
  ]);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 max-w-xl mx-auto"
    >
      <Card className="mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <div className="flex items-center justify-between">
          <div>
            <Title level={4} className="!text-white m-0">
              Challenge du jour
            </Title>
            <Text className="text-white">{todayChallenge}</Text>
          </div>
          <Button
            type="primary"
            icon={<Camera size={20} />}
            onClick={() => navigate('/shooter')}
            className="bg-white text-green-500 hover:bg-green-50 border-none"
          >
            Shooter
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        <Card>
          <Text className="text-gray-500">
            Aucune publication pour le moment. Soyez le premier à partager votre moment !
          </Text>
        </Card>
      </div>
      <div className="space-y-4">
        {posts.map(post => (
            <Card
                key={post.id}
                cover={
                  <img
                      alt={post.description}
                      src={post.imageUrl}
                      className="object-cover w-full h-64"
                  />
                }
                actions={[
                  <Button
                      type="text"
                      icon={post.isLiked ? <HeartFilled className="text-red-500" /> : <HeartOutlined />}
                      onClick={() => handleLike(post.id)}
                  >
                    {post.likes} likes
                  </Button>
                ]}
            >
              <Card.Meta
                  title={post.author}
                  description={post.description}
              />
            </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default Timeline;