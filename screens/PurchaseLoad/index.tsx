import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Loading } from '@/components';
import { globalStyles } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { fecthWarehousesThunk, warehouseState } from '@/redux/warehouse/warehouseSlice';
import { WAREHOUSE_TYPE } from '@/utils/warehouse';
import { styles } from './styles';

export const PurchaseLoadScreen: React.FC = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const { status: warehousesStatus, options: warehousesOptions } = useAppSelector(warehouseState);
    const isLoading = warehousesStatus === 'loading';

    useEffect(() => {
        (async () => {
            await dispatch(fecthWarehousesThunk(WAREHOUSE_TYPE.WAREHOUSE));
        })();
    }, [dispatch]);

    console.log(warehousesOptions);

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.content}>
                <Text
                    variant="headlineMedium"
                    style={[styles.title, { color: theme.colors.onSurface }]}
                >
                    Carga de Compra
                </Text>
                <Text
                    variant="bodyMedium"
                    style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
                >
                    Esta pantalla estará disponible próximamente
                </Text>
            </View>
            {isLoading && <Loading />}
        </SafeAreaView>
    );
};

export default PurchaseLoadScreen;
