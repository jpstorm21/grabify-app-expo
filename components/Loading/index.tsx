import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { globalColors } from '@/constants';
import { styles } from './styles';

export const Loading: React.FC = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator animating={true} color={globalColors.secondary} size="large" />
        </View>
    );
};
