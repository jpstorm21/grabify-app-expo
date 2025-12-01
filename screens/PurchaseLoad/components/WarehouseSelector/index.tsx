import React from 'react';
import { View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';

import { styles } from './styles';

interface Warehouse {
    id: number;
    name: string;
}

interface WarehouseSelectorProps {
    value: string;
    onChangeText: (text: string) => void;
    onFocus: () => void;
    onBlur: () => void;
    onSelect: (warehouse: Warehouse) => void;
    onClear: () => void;
    showDropdown: boolean;
    filteredWarehouses: Warehouse[];
}

export const WarehouseSelector: React.FC<WarehouseSelectorProps> = ({
    value,
    onChangeText,
    onFocus,
    onBlur,
    onSelect,
    onClear,
    showDropdown,
    filteredWarehouses,
}) => {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <TextInput
                label="Selección Bodega"
                value={value}
                onChangeText={onChangeText}
                onFocus={onFocus}
                onBlur={onBlur}
                right={value ? <TextInput.Icon icon="close" onPress={onClear} /> : null}
                style={styles.input}
                mode="outlined"
            />
            {showDropdown && filteredWarehouses.length > 0 && (
                <View style={styles.dropdown}>
                    {filteredWarehouses.map((warehouse) => (
                        <Button
                            key={warehouse.id}
                            onPress={() => onSelect(warehouse)}
                            style={styles.dropdownItem}
                            textColor={theme.colors.onSurface}
                        >
                            {warehouse.name}
                        </Button>
                    ))}
                </View>
            )}
        </View>
    );
};
