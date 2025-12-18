import React, { useState } from 'react';
import { Text } from 'react-native';
import { Popup as BasePopup, PopupType } from '@/components/Popup';

export const usePopup = () => {
    const [visible, setVisible] = useState(false);
    const [config, setConfig] = useState<{ type: PopupType, title: string, message: string }>({
        type: 'info',
        title: '',
        message: '',
    });

    const showPopup = (type: PopupType, title: string, message: string) => {
        setConfig({ type, title, message });
        setVisible(true);
    };

    const hidePopup = () => {
        setVisible(false);
    };

    const PopupComponent = () => (
        <BasePopup
            visible={visible}
            type={config.type}
            title={config.title}
            onClose={hidePopup}
        >
            <Text style={{ color: '#fff', fontFamily: 'VT323_400Regular', fontSize: 18 }}>
                {config.message}
            </Text>
        </BasePopup>
    );

    return {
        showPopup,
        hidePopup,
        Popup: PopupComponent,
    };
};

