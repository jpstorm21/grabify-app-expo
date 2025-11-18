import { ReactNode } from 'react';
import { IconButton } from 'react-native-paper';
import { Toast } from 'toastify-react-native';

import { globalColors } from '@/constants';

export type NativeToastPosition = 'top' | 'center' | 'bottom';

export interface NativeToastOptions {
    position?: NativeToastPosition;
    visibilityTime?: number;
    useModal?: boolean;
    onClose?: () => void;
    icon?: string | ReactNode;
    closeIcon?: string | ReactNode;
}

type NotifyMessages = {
    pending?: string;
    success?: string;
    error?: string;
};

const base = {
    position: 'bottom' as NativeToastPosition,
    visibilityTime: 4000,
    useModal: false,
};

export const notify = {
    success: (msg: string, opts?: NativeToastOptions) => {
        const position = opts?.position ?? base.position;
        const visibilityTime = opts?.visibilityTime ?? base.visibilityTime;
        const useModal = opts?.useModal ?? base.useModal;

        Toast.show({
            type: 'success',
            text1: msg,
            position,
            visibilityTime,
            useModal,
            onHide: () => {
                opts?.onClose?.();
            },
        });
    },

    error: (msg: string, opts?: NativeToastOptions) => {
        const position = opts?.position ?? base.position;
        const visibilityTime = opts?.visibilityTime ?? base.visibilityTime;
        const useModal = opts?.useModal ?? base.useModal;

        Toast.show({
            type: 'error',
            text1: msg,
            position,
            visibilityTime,
            useModal,
            onHide: () => {
                opts?.onClose?.();
            },
        });
    },

    info: (msg: string, opts?: NativeToastOptions) => {
        const position = opts?.position ?? base.position;
        const visibilityTime = opts?.visibilityTime ?? base.visibilityTime;
        const useModal = opts?.useModal ?? base.useModal;

        Toast.show({
            type: 'info',
            text1: msg,
            position,
            visibilityTime,
            useModal,
            onHide: () => {
                opts?.onClose?.();
            },
        });
    },

    warn: (msg: string, opts?: NativeToastOptions) => {
        const position = opts?.position ?? base.position;
        const visibilityTime = opts?.visibilityTime ?? base.visibilityTime;
        const useModal = opts?.useModal ?? base.useModal;

        Toast.show({
            type: 'warn',
            text1: msg,
            position,
            visibilityTime,
            useModal,
            onHide: () => {
                opts?.onClose?.();
            },
        });
    },

    async promise<T>(
        promise: Promise<T>,
        messages: NotifyMessages,
        opts?: NativeToastOptions,
    ): Promise<T | undefined> {
        const position = opts?.position ?? base.position;
        const visibilityTime = opts?.visibilityTime ?? base.visibilityTime;
        const useModal = opts?.useModal ?? base.useModal;

        if (messages.pending) {
            Toast.show({
                type: 'info',
                text1: messages.pending,
                position,
                visibilityTime,
                useModal,
                closeIcon: <IconButton icon="close" size={22} />,
                icon: (
                    <IconButton
                        icon="information-outline"
                        size={26}
                        iconColor={globalColors.info}
                    />
                ),
            });
        }

        try {
            const result = await promise;

            Toast.show({
                type: 'success',
                text1: messages.success ?? 'Completado',
                position,
                visibilityTime,
                useModal,
                onHide: () => {
                    opts?.onClose?.();
                },
                icon: <IconButton icon="check-circle" size={26} iconColor={globalColors.success} />,
                closeIcon: <IconButton icon="close" size={22} />,
            });

            return result;
        } catch (err: unknown) {
            const msgFromError =
                (err as { message?: string })?.message ||
                (err as any)?.data?.message ||
                (typeof err === 'string' ? err : undefined);

            const finalMessage = msgFromError ?? messages.error ?? 'Ocurrió un error';
            Toast.show({
                type: 'error',
                text1: finalMessage,
                position,
                visibilityTime,
                useModal,
                onHide: () => {
                    opts?.onClose?.();
                },
                icon: <IconButton icon="alert-circle" size={26} iconColor={globalColors.danger} />,
                closeIcon: <IconButton icon="close" size={22} />,
            });
        }
    },
};
