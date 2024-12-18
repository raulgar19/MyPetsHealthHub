import React, { useState } from 'react';
import SplashScreen from "../components/screens/SplashScreen";
import LoginScreen from '../components/screens/LoginScreen';

export default function Index() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  const handleSplashFinish = () => {
    setIsSplashFinished(true);
  };

  return isSplashFinished ? (
    <LoginScreen />
  ) : (
    <SplashScreen onAnimationFinish={handleSplashFinish} />
  );
}