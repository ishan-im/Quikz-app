import Toast from 'react-native-toast-message';

export const showToast = (type, message) => {
    Toast.show({
        type: type,
        position: 'top',
        text1: message,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
    });
    }