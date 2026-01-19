import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';

import { styles } from './styles';

interface Supplier {
    id: string;
    name: string;
}

interface SupplierSelectorProps {
    value: string;
    onChangeText: (text: string) => void;
    onFocus: () => void;
    onBlur: () => void;
    onSelect: (supplier: Supplier) => void;
    onClear: () => void;
    showDropdown: boolean;
    filteredSuppliers: Supplier[];
    label?: string;
}

export const SupplierSelector: React.FC<SupplierSelectorProps> = ({
    value,
    onChangeText,
    onFocus,
    onBlur,
    onSelect,
    onClear,
    showDropdown,
    filteredSuppliers,
    label = 'Selección Proveedor',
}) => {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <TextInput
                label={label}
                value={value}
                onChangeText={onChangeText}
                onFocus={onFocus}
                onBlur={onBlur}
                right={value ? <TextInput.Icon icon="close" onPress={onClear} /> : null}
                style={styles.input}
                mode="outlined"
            />
            {showDropdown && filteredSuppliers.length > 0 && (
                <View style={styles.dropdown}>
                    <ScrollView
                        nestedScrollEnabled
                        keyboardShouldPersistTaps="handled"
                        style={styles.scrollView}
                    >
                        {filteredSuppliers.map((supplier) => (
                            <Button
                                key={supplier.id}
                                onPress={() => onSelect(supplier)}
                                style={styles.dropdownItem}
                                textColor={theme.colors.onSurface}
                            >
                                {supplier.name}
                            </Button>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};
