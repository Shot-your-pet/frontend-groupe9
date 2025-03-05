import React, { useState } from 'react';
import { Button, Input, Typography } from 'antd';
import { Camera, X } from 'lucide-react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;
const { TextArea } = Input;

const Shooter: React.FC = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const webcamRef = React.useRef<Webcam>(null);
  const todayChallenge = "Montrez votre espace de travail !";

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPhoto(imageSrc);
    }
  }, [webcamRef]);

  const handleSubmit = () => {
    // TODO: Implement photo upload
    navigate('/timeline');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black"
    >
      <div className="relative">
        {!photo ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-screen object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
              <Text className="text-white mb-4 block">{todayChallenge}</Text>
              <Button
                type="primary"
                size="large"
                icon={<Camera size={24} />}
                onClick={capture}
                className="w-16 h-16 rounded-full flex items-center justify-center"
              />
            </div>
          </>
        ) : (
          <div className="p-4">
            <img src={photo} alt="Captured" className="w-full rounded-lg mb-4" />
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
                icon={<X size={20} />}
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