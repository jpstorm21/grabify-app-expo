import React from 'react';
import ToastManager from 'toastify-react-native';

import { globalColors } from '@/constants';

export const ToastifyManager: React.FC = () => {
    return (
        <ToastManager
            position="bottom"
            duration={4000}
            width="90%"
            minHeight={61}
            bottomOffset={40}
            theme="light"
            showCloseIcon={false}
            showProgressBar
            useModal={false}
            iconFamily="MaterialCommunityIcons"
            closeIconFamily="MaterialIcons"
            iconSize={22}
            closeIconSize={20}
            closeIconColor={globalColors.textSecondary}
            textStyle={{
                color: globalColors.text,
            }}
        />
    );
};
