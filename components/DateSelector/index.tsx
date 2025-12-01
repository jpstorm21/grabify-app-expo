import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { Button, Modal, Portal, TextInput, useTheme } from 'react-native-paper';

import { styles } from './styles';

interface DateSelectorProps {
    value: string;
    onDateChange: (date: Date) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({ value, onDateChange }) => {
    const theme = useTheme();
    const [showPicker, setShowPicker] = useState(false);
    const [tempDate, setTempDate] = useState<Date>(value ? new Date(value) : new Date());

    const formatDate = (date: Date): string => {
        const d = date.getDate().toString().padStart(2, '0');
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const y = date.getFullYear();
        return `${d}/${m}/${y}`;
    };

    const handleDateChange = (event: any, date?: Date) => {
        if (Platform.OS === 'android') {
            setShowPicker(false);
            if (event.type === 'dismissed') {
                return;
            }
            if (date) {
                const today = new Date();
                today.setHours(23, 59, 59, 999);
                if (date <= today) {
                    onDateChange(date);
                }
            }
        } else {
            if (date) {
                setTempDate(date);
            }
        }
    };

    const handleConfirm = () => {
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        if (tempDate <= today) {
            onDateChange(tempDate);
        }
        setShowPicker(false);
    };

    const displayValue = value ? formatDate(new Date(value)) : formatDate(new Date());

    return (
        <>
            <TextInput
                label="Fecha"
                value={displayValue}
                onPressIn={() => {
                    setTempDate(value ? new Date(value) : new Date());
                    setShowPicker(true);
                }}
                mode="outlined"
                style={styles.input}
                editable={false}
                right={
                    <TextInput.Icon
                        icon="calendar"
                        onPress={() => {
                            setTempDate(value ? new Date(value) : new Date());
                            setShowPicker(true);
                        }}
                    />
                }
            />
            {Platform.OS === 'ios' && showPicker ? (
                <Portal>
                    <Modal
                        visible={showPicker}
                        onDismiss={() => setShowPicker(false)}
                        contentContainerStyle={[
                            styles.modalContent,
                            { backgroundColor: theme.colors.surface },
                        ]}
                    >
                        <View style={styles.pickerContainer}>
                            <DateTimePicker
                                value={tempDate}
                                mode="date"
                                display="spinner"
                                onChange={handleDateChange}
                                maximumDate={new Date()}
                                style={styles.picker}
                            />
                            <View style={styles.buttonContainer}>
                                <Button
                                    mode="outlined"
                                    onPress={() => setShowPicker(false)}
                                    style={styles.button}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    mode="contained"
                                    onPress={handleConfirm}
                                    style={styles.button}
                                    buttonColor={theme.colors.primary}
                                >
                                    Confirmar
                                </Button>
                            </View>
                        </View>
                    </Modal>
                </Portal>
            ) : (
                showPicker && (
                    <DateTimePicker
                        value={tempDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                        maximumDate={new Date()}
                    />
                )
            )}
        </>
    );
};
