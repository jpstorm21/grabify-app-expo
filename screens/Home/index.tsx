import React from 'react';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './styles';
import { useAppSelector } from '../../redux/store/hooks';

export const HomeScreen: React.FC = () => {
    const { appName } = useAppSelector((state) => state.ui);
    return (
        <SafeAreaView style={styles.container}>
            <Text>{appName}</Text>
        </SafeAreaView>
    );
};
